const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => /\.(jpe?g|png|webp|gif|svg)$/i.test(f));

const menuDataPath = path.join(__dirname, 'src/data/menuData.ts');
let menuData = fs.readFileSync(menuDataPath, 'utf8');

// Extract all image assignments
const allImageMatches = [...menuData.matchAll(/image:\s*'([^']+)'/g)];
const imageCounts = {};
allImageMatches.forEach(m => {
  const img = m[1];
  imageCounts[img] = (imageCounts[img] || 0) + 1;
});

console.log('=== IMAGE USAGE COUNTS ===');
Object.entries(imageCounts)
  .sort((a, b) => b[1] - a[1])
  .forEach(([img, count]) => {
    console.log(`${count}x ${img}`);
  });

console.log('\n=== SUMMARY ===');
console.log('Total unique images used:', Object.keys(imageCounts).length);
console.log('Total image references:', Object.values(imageCounts).reduce((a, b) => a + b, 0));
console.log('Duplicated images:', Object.values(imageCounts).filter(c => c > 1).length);
