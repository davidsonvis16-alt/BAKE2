const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => /\.(jpe?g|png|webp|gif|svg)$/i.test(f));

const menuDataPath = path.join(__dirname, 'src/data/menuData.ts');
const menuData = fs.readFileSync(menuDataPath, 'utf8');

const itemMatches = [...menuData.matchAll(/id:\s*'([^']+)',\s*name:\s*'([^']+)',\s*category:\s*'[^']+',\s*price:\s*\d+[^}]*/g)];

const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9]+/gi, '').trim();

const fileMap = new Map();
files.forEach(f => {
  const key = normalize(f);
  if (!fileMap.has(key)) fileMap.set(key, f);
});

const results = [];
itemMatches.forEach(m => {
  const id = m[1];
  const name = m[2];
  const key = normalize(name);
  const matchedFile = fileMap.get(key);
  results.push({ id, name, matchedFile });
});

console.log('=== Matched images ===');
results.filter(r => r.matchedFile).forEach(r => console.log(`${r.id}: ${r.name} => ${r.matchedFile}`));

console.log('\n=== Missing images ===');
results.filter(r => !r.matchedFile).forEach(r => console.log(`${r.id}: ${r.name}`));

console.log(`\nTotal: ${results.length}, Matched: ${results.filter(r => r.matchedFile).length}, Missing: ${results.filter(r => !r.matchedFile).length}`);
