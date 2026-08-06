const fs = require('fs');
const content = fs.readFileSync('src/data/menuData.ts', 'utf8');
const categorySection = content.substring(0, content.indexOf('export const MENU_ITEMS'));
const categories = categorySection.match(/{[^}]+}/g) || [];
const categoryIds = new Set();
categories.forEach(c => {
  const match = c.match(/id:\s*'([^']+)'/);
  if (match) categoryIds.add(match[1]);
});

console.log('Category IDs in CATEGORIES:');
console.log([...categoryIds].sort().join(', '));

const menuItemsSection = content.substring(content.indexOf('export const MENU_ITEMS'));
// Split by items - each item is an object between { and }
// But some items span multiple lines, so let's use a different approach
// Find all lines that have id: and check if the same object has image:
const lines = menuItemsSection.split('\n');
let currentItem = null;
const itemsWithoutImage = [];
const itemsWithUnknownCategory = [];

lines.forEach(line => {
  const idMatch = line.match(/id:\s*'([^']+)'/);
  const categoryMatch = line.match(/category:\s*'([^']+)'/);
  const imageMatch = line.match(/image:\s*'([^']+)'/);
  const priceMatch = line.match(/price:\s*(\d+)/);
  
  if (idMatch && priceMatch) {
    // New item started (has id and price on same line)
    if (currentItem && !currentItem.hasImage) {
      itemsWithoutImage.push(currentItem.id);
    }
    if (currentItem && !categoryIds.has(currentItem.category)) {
      itemsWithUnknownCategory.push({ id: currentItem.id, category: currentItem.category });
    }
    currentItem = {
      id: idMatch[1],
      category: categoryMatch ? categoryMatch[1] : null,
      hasImage: !!imageMatch,
    };
  } else if (idMatch && !currentItem) {
    // Multi-line item
    currentItem = {
      id: idMatch[1],
      category: categoryMatch ? categoryMatch[1] : null,
      hasImage: !!imageMatch,
    };
  } else if (imageMatch && currentItem) {
    currentItem.hasImage = true;
  } else if (categoryMatch && currentItem && !currentItem.category) {
    currentItem.category = categoryMatch[1];
  }
});

// Don't forget the last item
if (currentItem && !currentItem.hasImage) {
  itemsWithoutImage.push(currentItem.id);
}
if (currentItem && currentItem.category && !categoryIds.has(currentItem.category)) {
  itemsWithUnknownCategory.push({ id: currentItem.id, category: currentItem.category });
}

console.log('\n=== Items WITHOUT image property ===');
itemsWithoutImage.forEach(id => console.log('  ' + id));

console.log('\n=== Items with UNKNOWN category (not in CATEGORIES) ===');
itemsWithUnknownCategory.forEach(i => console.log('  ' + i.id + ' -> ' + i.category));
