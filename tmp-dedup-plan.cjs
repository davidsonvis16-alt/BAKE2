const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const allFiles = fs.readdirSync(publicDir).filter(f => /\.(jpe?g|png|webp|gif|svg)$/i.test(f));

// Filter out non-menu images
const excludePatterns = [/^gallery-\d+/, /^favicon/, /^logo/, /^open-kitchen/, /^breakfast \(2\)/];
const menuFiles = allFiles.filter(f => !excludePatterns.some(p => p.test(f)));

console.log('Total images in public/:', allFiles.length);
console.log('Menu-related images:', menuFiles.length);
console.log('Excluded:', allFiles.length - menuFiles.length);

// Read current menuData.ts
const menuDataPath = path.join(__dirname, 'src/data/menuData.ts');
let menuData = fs.readFileSync(menuDataPath, 'utf8');

// Parse categories and items
const categoryMatches = [...menuData.matchAll(/\{\s*\n\s*id:\s*'([^']+)',\s*\n\s*name:\s*'([^']+)',\s*\n[^}]*?image:\s*'([^']+)'/g)];
console.log('\nCategories with images:', categoryMatches.length);

// Each image can only be used ONCE
// Strategy: assign images greedily to the best matching slots
const usedImages = new Set();
const assignments = new Map(); // id -> image

const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9]+/gi, '').trim();

// Build file map
const fileMap = new Map();
menuFiles.forEach(f => {
  const key = normalize(f.replace(/\.(jpe?g|png|webp|gif|svg)$/i, ''));
  if (!fileMap.has(key)) {
    fileMap.set(key, f);
  }
});

console.log('\nFile map size:', fileMap.size);

// First pass: assign to categories (they're more important)
categoryMatches.forEach(([full, id, name]) => {
  const key = normalize(name);
  const match = fileMap.get(key);
  if (match && !usedImages.has(match)) {
    assignments.set(id, '/' + match);
    usedImages.add(match);
    console.log(`Category ${id} -> ${match}`);
  }
});

// Second pass: assign to menu items
const itemRegex = /id:\s*'([^']+)',\s*name:\s*'([^']+)',\s*category:\s*'[^']+',\s*price:\s*\d+(?:,\s*badge:\s*'[^']+')?,\s*description:\s*'[^']+'/g;
let itemMatch;
const items = [];
while ((itemMatch = itemRegex.exec(menuData)) !== null) {
  items.push({ id: itemMatch[1], name: itemMatch[2] });
}

console.log('\nMenu items:', items.length);

items.forEach(item => {
  if (assignments.has(item.id)) return; // already assigned
  
  const key = normalize(item.name);
  const match = fileMap.get(key);
  if (match && !usedImages.has(match)) {
    assignments.set(item.id, '/' + match);
    usedImages.add(match);
  }
});

console.log('\nTotal assignments:', assignments.size);
console.log('Items with images:', [...assignments.keys()].filter(k => k.startsWith('b') || k.startsWith('d') || k.startsWith('w') || k.startsWith('tr') || k.startsWith('mj') || k.startsWith('lm') || k.startsWith('dt') || k.startsWith('fj') || k.startsWith('jb') || k.startsWith('fl') || k.startsWith('sm') || k.startsWith('hb') || k.startsWith('cd') || k.startsWith('br') || k.startsWith('m') || k.startsWith('s') || k.startsWith('k') || k.startsWith('bbq') || k.startsWith('wr') || k.startsWith('sw') || k.startsWith('pas') || k.startsWith('p') || k.startsWith('sl') || k.startsWith('sp')).length);
console.log('Categories with images:', [...assignments.keys()].filter(k => !k.startsWith('b') && !k.startsWith('d') && !k.startsWith('w') && !k.startsWith('tr') && !k.startsWith('mj') && !k.startsWith('lm') && !k.startsWith('dt') && !k.startsWith('fj') && !k.startsWith('jb') && !k.startsWith('fl') && !k.startsWith('sm') && !k.startsWith('hb') && !k.startsWith('cd') && !k.startsWith('br') && !k.startsWith('m') && !k.startsWith('s') && !k.startsWith('k') && !k.startsWith('bbq') && !k.startsWith('wr') && !k.startsWith('sw') && !k.startsWith('pas') && !k.startsWith('p') && !k.startsWith('sl') && !k.startsWith('sp')).length);

// Show what's assigned
console.log('\n=== ASSIGNED IMAGES ===');
assignments.forEach((img, id) => {
  console.log(`${id}: ${img}`);
});
