import { useState, useEffect, useRef } from 'react';
import { CATEGORIES, MENU_ITEMS } from '../data/menuData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Category, MenuItem } from '../types';
import { getCachedData, getCachedDataSync, setCachedData, invalidateCache } from '../lib/dataCache';

const MENU_CACHE_KEY = 'menu-data';
const MENU_TTL = 5 * 60 * 1000;

export function useMenuData() {
  const cachedMenuItems = getCachedDataSync<MenuItem[]>(MENU_CACHE_KEY, MENU_TTL);

  const [categories, setCategories] = useState<Category[]>(CATEGORIES);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(cachedMenuItems || []);
  const [loading, setLoading] = useState(!cachedMenuItems);
  const [refreshToken, setRefreshToken] = useState(0);

  useEffect(() => {
    setCategories(CATEGORIES);
    const base = MENU_ITEMS;

    if (!isSupabaseConfigured || !supabase) {
      setMenuItems(base);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchRemoteImages = async () => {
      try {
        const data = await getCachedData<MenuItem[]>(MENU_CACHE_KEY, async () => {
          const { data, error } = await supabase
            .from('menu_items')
            .select('id, name, price, description, badge, category, available, image');

          if (error || !data) {
            return base;
          }

          const remoteMap: Record<string, Record<string, unknown>> = {};
          for (const row of data) {
            if (row.id) {
              remoteMap[row.id] = row;
            }
          }

          const baseIds = new Set(base.map((item) => item.id));
          const newRemoteItems: MenuItem[] = [];

          const merged: MenuItem[] = base.map((item) => {
            const remote = remoteMap[item.id];
            if (remote) {
              return {
                ...item,
                name: (remote.name as string) || item.name,
                price: (remote.price as number) || item.price,
                description: (remote.description as string) ?? item.description,
                badge: ((remote.badge as string) || item.badge || null) as MenuItem['badge'],
                category: (remote.category as string) || item.category,
                image: (remote.image as string) || item.image,
              };
            }
            return item;
          });

          for (const row of data) {
            if (row.id && !baseIds.has(row.id)) {
              newRemoteItems.push({
                id: row.id as string,
                name: (row.name as string) || 'Untitled Item',
                price: (row.price as number) || 0,
                description: (row.description as string) || '',
                badge: ((row.badge as string) || null) as MenuItem['badge'],
                category: (row.category as string) || '',
                image: (row.image as string) || '',
                options: [],
              });
            }
          }

          return [...merged, ...newRemoteItems];
        });

        if (cancelled) return;
        setMenuItems(data);
        setLoading(false);
      } catch {
        if (cancelled) return;
        setMenuItems(base);
        setLoading(false);
      }
    };

    fetchRemoteImages();

    const handleMenuUpdated = () => {
      invalidateCache(MENU_CACHE_KEY);
      setRefreshToken((t) => t + 1);
    };

    window.addEventListener('menu-updated', handleMenuUpdated);

    return () => {
      cancelled = true;
      window.removeEventListener('menu-updated', handleMenuUpdated);
    };
  }, [refreshToken]);

  return { categories, menuItems, loading };
}
