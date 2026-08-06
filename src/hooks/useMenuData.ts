import { useState, useEffect } from 'react';
import { CATEGORIES, MENU_ITEMS } from '../data/menuData';
import { Category, MenuItem } from '../types';

const IMAGE_OVERRIDE_KEY = 'bakemart_menu_image_overrides';

export function useMenuData() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCategories(CATEGORIES);
    let overrides: Record<string, string> = {};
    try {
      const raw = localStorage.getItem(IMAGE_OVERRIDE_KEY);
      if (raw) overrides = JSON.parse(raw);
    } catch {
      overrides = {};
    }

    const merged: MenuItem[] = MENU_ITEMS.map((item) => {
      const override = overrides[item.id];
      if (override) {
        return { ...item, image: override };
      }
      return item;
    });

    setMenuItems(merged);
    setLoading(false);
  }, []);

  return { categories, menuItems, loading };
}
