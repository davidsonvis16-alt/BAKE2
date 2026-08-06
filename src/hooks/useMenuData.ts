import { useState, useEffect } from 'react';
import { CATEGORIES, MENU_ITEMS } from '../data/menuData';
import { Category, MenuItem } from '../types';

const normalize = (value: string): string =>
  value.toLowerCase().replace(/[^a-z0-9]+/gi, '').trim();

const buildImageMap = (): string[] => {
  try {
    const fs = require('fs');
    const path = require('path');
    const publicDir = path.join(__dirname, '../../public');
    const files = fs.readdirSync(publicDir).filter(f => /\.(jpe?g|png|webp|gif|svg)$/i.test(f));
    return files.sort();
  } catch {
    return [];
  }
};

const matchImage = (name: string, files: string[], used: Set<string>): string | undefined => {
  const itemKey = normalize(name);
  if (!itemKey) return undefined;

  for (const file of files) {
    if (used.has(file)) continue;
    const fileKey = normalize(file.replace(/\.(jpe?g|png|webp|gif|svg)$/i, ''));
    if (fileKey.length < 4) continue;
    if (fileKey === itemKey || fileKey.includes(itemKey) || itemKey.includes(fileKey)) {
      return '/' + file;
    }
  }
  return undefined;
};

export function useMenuData() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCategories(CATEGORIES);
    const files = buildImageMap();
    const used = new Set<string>();
    const itemsWithImages: MenuItem[] = [];

    for (const item of MENU_ITEMS) {
      if (item.image) {
        itemsWithImages.push(item);
        continue;
      }
      const matched = matchImage(item.name, files, used);
      if (matched) {
        used.add(matched.slice(1));
        itemsWithImages.push({ ...item, image: matched });
      } else {
        const { image: _image, ...rest } = item as any;
        itemsWithImages.push(rest as MenuItem);
      }
    }

    setMenuItems(itemsWithImages);
    setLoading(false);
  }, []);

  return { categories, menuItems, loading };
}
