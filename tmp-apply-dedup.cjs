const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const allFiles = fs.readdirSync(publicDir).filter(f => /\.(jpe?g|png|webp|gif|svg)$/i.test(f));

const excludePatterns = [/^gallery-\d+/, /^favicon/, /^logo/, /^open-kitchen/, /^breakfast \(2\)/];
const menuFiles = allFiles.filter(f => !excludePatterns.some(p => p.test(f)));

const menuDataPath = path.join(__dirname, 'src/data/menuData.ts');
let menuData = fs.readFileSync(menuDataPath, 'utf8');

const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9]+/gi, '').trim();

const fileMap = new Map();
menuFiles.forEach(f => {
  const key = normalize(f.replace(/\.(jpe?g|png|webp|gif|svg)$/i, ''));
  if (!fileMap.has(key)) {
    fileMap.set(key, f);
  }
});

const categoryRegex = /\{\s*\n\s*id:\s*'([^']+)',\s*\n\s*name:\s*'([^']+)',\s*\n[^}]*?image:\s*'([^']+)'/g;
const itemRegex = /id:\s*'([^']+)',\s*name:\s*'([^']+)',\s*category:\s*'[^']+',\s*price:\s*\d+(?:,\s*badge:\s*'[^']+')?,\s*description:\s*'[^']+'/g;

function findMatch(name, usedImages) {
  const itemKey = normalize(name);
  if (!itemKey) return null;

  // Exact match
  const exact = fileMap.get(itemKey);
  if (exact && !usedImages.has(exact)) return exact;

  // Partial match - find best fit
  let bestMatch = null;
  let bestScore = 0;
  
  for (const [fileKey, fileName] of fileMap) {
    if (usedImages.has(fileName)) continue;
    if (fileKey.length < 4 || itemKey.length < 4) continue;
    
    // Check if one contains the other
    if (fileKey.includes(itemKey) || itemKey.includes(fileKey)) {
      const score = Math.min(fileKey.length, itemKey.length);
      if (score > bestScore) {
        bestScore = score;
        bestMatch = fileName;
      }
    }
  }
  
  return bestMatch;
}

const usedImages = new Set();
const assignments = new Map();

// Categories first
let catMatch;
while ((catMatch = categoryRegex.exec(menuData)) !== null) {
  const id = catMatch[1];
  const name = catMatch[2];
  const match = findMatch(name, usedImages);
  if (match) {
    assignments.set(id, '/' + match);
    usedImages.add(match);
  }
}

// Then items
let itemMatch;
const items = [];
while ((itemMatch = itemRegex.exec(menuData)) !== null) {
  items.push({ id: itemMatch[1], name: itemMatch[2] });
}

items.forEach(item => {
  if (assignments.has(item.id)) return;
  const match = findMatch(item.name, usedImages);
  if (match) {
    assignments.set(item.id, '/' + match);
    usedImages.add(match);
  }
});

console.log('Total assignments:', assignments.size);
console.log('Categories:', [...assignments.keys()].filter(k => !k.match(/^[a-z]+\d/)).length);
console.log('Items:', [...assignments.keys()].filter(k => k.match(/^[a-z]+\d/)).length);

// Generate new menuData.ts
let newMenuData = menuData;

// Remove all existing image assignments
newMenuData = newMenuData.replace(/,\s*image:\s*'[^']+'/g, '');
newMenuData = newMenuData.replace(/image:\s*'[^']+',\s*/g, '');

// Add new assignments
assignments.forEach((img, id) => {
  // For categories: add image field
  const catRegex = new RegExp(`(id:\\s*'${id}',\\s*\\n\\s*name:\\s*'[^']+',\\s*\\n\\s*icon:\\s*'[^']+',\\s*\\n\\s*description:\\s*'[^']+')`, 'g');
  newMenuData = newMenuData.replace(catRegex, `$1,\\n    image: '${img}'`);
  
  // For items: add image field
  const itemRegex2 = new RegExp(`(id:\\s*'${id}',\\s*name:\\s*'[^']+',\\s*category:\\s*'[^']+',\\s*price:\\s*\\d+(?:,\\s*badge:\\s*'[^']+')?,\\s*description:\\s*'[^']+)`, 'g');
  newMenuData = newMenuData.replace(itemRegex2, `$1,\\n    image: '${img}'`);
});

fs.writeFileSync(menuDataPath, newMenuData);
console.log('\nWrote new menuData.ts with', assignments.size, 'unique image assignments');
