import { useState, useEffect } from 'react';
import { CATEGORIES, MENU_ITEMS } from '../data/menuData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Category, MenuItem } from '../types';

export function useMenuData() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCategories(CATEGORIES);
    const base = MENU_ITEMS;

    if (!isSupabaseConfigured || !supabase) {
      setMenuItems(base);
      setLoading(false);
      return;
    }

    let cancelled = false;

    supabase
      .from('menu_items')
      .select('id, image')
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error || !data) {
          setMenuItems(base);
          setLoading(false);
          return;
        }
        const remoteImages: Record<string, string> = {};
        for (const row of data) {
          if (row.id && row.image) {
            remoteImages[row.id] = row.image;
          }
        }
        const merged: MenuItem[] = base.map((item) => {
          const remote = remoteImages[item.id];
          if (remote) {
            return { ...item, image: remote };
          }
          return item;
        });
        setMenuItems(merged);
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setMenuItems(base);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { categories, menuItems, loading };
}
