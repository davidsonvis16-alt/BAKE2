const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => /\.(jpe?g|png|webp|gif|svg)$/i.test(f));

// Read current menuData.ts
const menuDataPath = path.join(__dirname, 'src/data/menuData.ts');
let menuData = fs.readFileSync(menuDataPath, 'utf8');

// Extract current image assignments
const categoryImageMatches = [...menuData.matchAll(/id:\s*'([^']+)',[^}]*image:\s*'([^']+)'/g)];
const categoryImages = new Map();
categoryImageMatches.forEach(m => {
  categoryImages.set(m[1], m[2]);
});

console.log('Category images:');
categoryImages.forEach((img, id) => console.log(`  ${id}: ${img}`));

// Get unique category images
const uniqueCategoryImages = new Set(categoryImages.values());
console.log('\nUnique category images:', uniqueCategoryImages.size);
console.log([...uniqueCategoryImages].join('\n'));

// Available images for menu items (not used by categories)
const availableImages = files.filter(f => !uniqueCategoryImages.has('/' + f));
console.log('\nAvailable images for menu items:', availableImages.length);
console.log(availableImages.join('\n'));

// Current menu item images
const itemImageMatches = [...menuData.matchAll(/id:\s*'([^']+)',\s*name:\s*'([^']+)',[^}]*image:\s*'([^']+)'/g)];
console.log('\nCurrent menu item images:', itemImageMatches.length);

// Find duplicates
const imageUsage = new Map();
itemImageMatches.forEach(m => {
  const img = m[3];
  if (!imageUsage.has(img)) imageUsage.set(img, []);
  imageUsage.get(img).push({ id: m[1], name: m[2] });
});

console.log('\nDuplicated images:');
imageUsage.forEach((items, img) => {
  if (items.length > 1) {
    console.log(`\n${img} (${items.length} items):`);
    items.forEach(i => console.log(`  ${i.id}: ${i.name}`));
  }
});

console.log('\nTotal unique menu item images:', imageUsage.size);
console.log('Total duplicated:', [...imageUsage.values()].filter(items => items.length > 1).length);
