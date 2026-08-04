import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { MenuItem, PastOrder, ReservationFormData } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey && supabaseUrl !== 'https://your-supabase-url.supabase.co');

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// SQL Migration script for user to copy-paste into Supabase SQL Editor
export const SUPABASE_SQL_SCHEMA = `-- BakeMart Coffee House Supabase Schema setup
-- Run this script in your Supabase SQL Editor to provision tables

-- 1. Create Categories Table (required by seed.js & app)
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT
);

-- 2. Create Menu Items Table
CREATE TABLE IF NOT EXISTS public.menu_items (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC NOT NULL,
  description TEXT,
  badge TEXT,
  image TEXT,
  options JSONB,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  date TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'In Kitchen',
  order_type TEXT NOT NULL,
  items JSONB NOT NULL,
  total_amount NUMERIC NOT NULL,
  delivery_address TEXT,
  table_number TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create Reservations Table
CREATE TABLE IF NOT EXISTS public.reservations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  guests INTEGER NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  area TEXT,
  special_notes TEXT,
  status TEXT DEFAULT 'Pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security & Allow Public Read/Write for demo applet
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read/Write Categories" ON public.categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Read/Write Menu" ON public.menu_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Read/Write Orders" ON public.orders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Read/Write Reservations" ON public.reservations FOR ALL USING (true) WITH CHECK (true);
`;

export const SUPABASE_STORAGE_SETUP = `-- Supabase Storage setup for menu item images
-- Run this in the Supabase SQL Editor after creating the storage bucket manually via the UI,
-- or use the Supabase CLI: supabase storage create-bucket menu-images --public

-- Create the storage bucket (run via Supabase UI or CLI)
-- Bucket name: menu-images
-- Public: true

-- Storage policies (run after bucket exists)
CREATE POLICY "Public Read Access" ON storage.objects FOR SELECT USING (bucket_id = 'menu-images');
CREATE POLICY "Public Insert Access" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'menu-images');
CREATE POLICY "Public Update Access" ON storage.objects FOR UPDATE USING (bucket_id = 'menu-images');
CREATE POLICY "Public Delete Access" ON storage.objects FOR DELETE USING (bucket_id = 'menu-images');`;

// For existing databases that still have the old is_available column, use this migration instead:
export const SUPABASE_MIGRATION_SCRIPT = `-- Migration: fix menu_items column name and add missing tables/columns

-- 1. Create categories table if missing
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT
);

-- 2. Add available if missing, migrate from is_available if present
ALTER TABLE public.menu_items ADD COLUMN IF NOT EXISTS available BOOLEAN DEFAULT true;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'menu_items' AND column_name = 'is_available'
  ) THEN
    UPDATE public.menu_items SET available = is_available WHERE available IS NULL;
    ALTER TABLE public.menu_items DROP COLUMN is_available;
  END IF;
END $$;

-- 3. Ensure other expected columns exist
ALTER TABLE public.menu_items ADD COLUMN IF NOT EXISTS options JSONB;
ALTER TABLE public.menu_items ADD COLUMN IF NOT EXISTS badge TEXT;
ALTER TABLE public.menu_items ADD COLUMN IF NOT EXISTS image TEXT;

-- 4. Enable RLS on categories
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- 5. Re-create policies safely
DROP POLICY IF EXISTS "Public Read/Write Categories" ON public.categories;
DROP POLICY IF EXISTS "Public Read/Write Menu" ON public.menu_items;
DROP POLICY IF EXISTS "Public Read/Write Orders" ON public.orders;
DROP POLICY IF EXISTS "Public Read/Write Reservations" ON public.reservations;

CREATE POLICY "Public Read/Write Categories" ON public.categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Read/Write Menu" ON public.menu_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Read/Write Orders" ON public.orders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Read/Write Reservations" ON public.reservations FOR ALL USING (true) WITH CHECK (true);
`;

// ===============================================
// API HELPERS (WITH SUPABASE + LOCALSTORAGE FALLBACK)
// ===============================================

export async function getSupabaseOrders(): Promise<PastOrder[] | null> {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch orders error:', error.message);
      return null;
    }

    if (data && data.length > 0) {
      return data.map((d) => ({
        id: d.id,
        date: d.date,
        status: d.status,
        orderType: d.order_type,
        items: typeof d.items === 'string' ? JSON.parse(d.items) : d.items,
        totalAmount: Number(d.total_amount),
        deliveryAddress: d.delivery_address,
        tableNumber: d.table_number,
      }));
    }
    return [];
  } catch (err) {
    console.error('Error in getSupabaseOrders:', err);
    return null;
  }
}

export async function syncOrderToSupabase(order: PastOrder): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase.from('orders').upsert({
      id: order.id,
      date: order.date,
      status: order.status,
      order_type: order.orderType,
      items: order.items,
      total_amount: order.totalAmount,
      delivery_address: order.deliveryAddress,
      table_number: order.tableNumber,
    });

    if (error) {
      console.error('Failed to sync order to Supabase:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error syncing order to Supabase:', err);
    return false;
  }
}

export async function updateSupabaseOrderStatus(orderId: string, status: string): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId);

    if (error) {
      console.error('Failed to update order status in Supabase:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error updating order status in Supabase:', err);
    return false;
  }
}

export async function getSupabaseReservations(): Promise<any[] | null> {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch reservations error:', error.message);
      return null;
    }
    return data || [];
  } catch (err) {
    console.error('Error in getSupabaseReservations:', err);
    return null;
  }
}
export async function uploadMenuItemImage(file: File, itemId: string): Promise<string | null> {
  if (!supabase) return null;
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${itemId}-${Date.now()}.${fileExt}`;
    const filePath = `${itemId}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('menu-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type,
      });

    if (uploadError) {
      console.error('Upload error:', uploadError.message);
      return null;
    }

    const { data } = supabase.storage.from('menu-images').getPublicUrl(filePath);
    return data?.publicUrl || null;
  } catch (err) {
    console.error('Error uploading image:', err);
    return null;
  }
}

export async function deleteMenuItemImage(imageUrl: string): Promise<boolean> {
  if (!supabase) return false;
  try {
    const url = new URL(imageUrl);
    const filePath = url.pathname.split('/').slice(-2).join('/');
    const { error } = await supabase.storage.from('menu-images').remove([filePath]);
    if (error) {
      console.error('Error deleting image:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error parsing image URL:', err);
    return false;
  }
}
