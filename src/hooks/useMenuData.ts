import { useState, useEffect } from 'react';
import { CATEGORIES, MENU_ITEMS } from '../data/menuData';
import { Category, MenuItem } from '../types';

export function useMenuData() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCategories(CATEGORIES);
    setMenuItems(MENU_ITEMS);
    setLoading(false);
  }, []);

  return { categories, menuItems, loading };
}