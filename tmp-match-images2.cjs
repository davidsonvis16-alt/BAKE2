const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => /\.(jpe?g|png|webp|gif|svg)$/i.test(f));

const menuDataPath = path.join(__dirname, 'src/data/menuData.ts');
const menuData = fs.readFileSync(menuDataPath, 'utf8');

const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9]+/gi, '').trim();

const fileKeys = files.map(f => ({ file: f, key: normalize(f) }));

const itemRegex = /id:\s*'([^']+)',\s*name:\s*'([^']+)',\s*category:\s*'[^']+',\s*price:\s*(\d+)(?:,\s*badge:\s*'[^']+')?(?:,\s*image:\s*'[^']+')?,\s*description:\s*'([^']+)'/g;

let match;
const items = [];
while ((match = itemRegex.exec(menuData)) !== null) {
  items.push({
    id: match[1],
    name: match[2],
    category: match[3],
    description: match[4],
  });
}

function findImageForItem(item) {
  const itemKey = normalize(item.name);
  
  const exact = fileKeys.find(f => f.key === itemKey);
  if (exact) return exact.file;
  
  const contains = fileKeys.find(f => {
    const fk = f.key;
    const ik = itemKey;
    if (ik.length < 4 || fk.length < 4) return false;
    return fk.includes(ik) || ik.includes(fk);
  });
  if (contains) return contains.file;
  
  return null;
}

const results = [];
items.forEach(item => {
  const matchedFile = findImageForItem(item);
  results.push({ ...item, matchedFile });
});

console.log('=== Matched images ===');
results.filter(r => r.matchedFile).forEach(r => console.log(`${r.id} | ${r.name} | ${r.matchedFile}`));

console.log('\n=== Missing images (no match found) ===');
results.filter(r => !r.matchedFile).forEach(r => console.log(`${r.id} | ${r.name}`));

console.log(`\nTotal: ${results.length}, Matched: ${results.filter(r => r.matchedFile).length}, Missing: ${results.filter(r => !r.matchedFile).length}`);
