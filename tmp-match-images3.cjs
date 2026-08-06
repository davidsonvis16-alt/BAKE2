const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => /\.(jpe?g|png|webp|gif|svg)$/i.test(f));

const menuDataPath = path.join(__dirname, 'src/data/menuData.ts');
let menuData = fs.readFileSync(menuDataPath, 'utf8');

const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9]+/gi, '').trim();

const fileKeys = files.map(f => ({ file: f, key: normalize(f) }));

function findImageForItem(itemName) {
  const itemKey = normalize(itemName);
  
  const exact = fileKeys.find(f => f.key === itemKey);
  if (exact) return exact.file;
  
  const partial = fileKeys.filter(f => {
    const fk = f.key;
    if (ik.length < 4 || fk.length < 4) return false;
    return fk.includes(ik) || ik.includes(fk);
  });
  
  if (partial.length === 1) return partial[0].file;
  
  return null;
}

const itemRegex = /id:\s*'([^']+)',\s*name:\s*'([^']+)',\s*category:\s*'[^']+',\s*price:\s*\d+(?:,\s*badge:\s*'[^']+')?,\s*description:\s*'[^']+'/g;

let match;
const items = [];
while ((match = itemRegex.exec(menuData)) !== null) {
  items.push({
    id: match[1],
    name: match[2],
  });
}

items.forEach(item => {
  const matchedFile = findImageForItem(item.name);
  if (matchedFile) {
    console.log(`${item.id} | ${item.name} | ${matchedFile}`);
  } else {
    console.log(`${item.id} | ${item.name} | NO MATCH`);
  }
});
