import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Category, MenuItem } from '../types';

export function useMenuData() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const { data: catData, error: catError } = await supabase
        .from('categories')
        .select('*');

      const { data: itemData, error: itemError } = await supabase
        .from('menu_items')
        .select('*');

      if (catError) console.error('Category fetch error:', catError);
      if (itemError) console.error('Menu items fetch error:', itemError);

      setCategories(catData || []);
      setMenuItems(
        (itemData || []).map((item: any) => ({
          ...item,
          image: item.image,
        }))
      );

      setLoading(false);
    };

    fetchData();
  }, []);

  return { categories, menuItems, loading };
}