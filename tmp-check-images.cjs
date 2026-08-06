const fs = require('fs');
const content = fs.readFileSync('src/data/menuData.ts', 'utf8');
const categoryContent = content.substring(0, content.indexOf('export const MENU_ITEMS'));
const categoryImagePaths = Array.from(new Set((categoryContent.match(/image: '([^']+)'/g) || []).map(m => m.match(/image: '([^']+)'/)[1])));
const menuItemContent = content.substring(content.indexOf('export const MENU_ITEMS'));
const menuItemImagePaths = Array.from(new Set((menuItemContent.match(/image: '([^']+)'/g) || []).map(m => m.match(/image: '([^']+)'/)[1])));
const allPaths = [...new Set([...categoryImagePaths, ...menuItemImagePaths])];
const publicFiles = fs.readdirSync('public').filter(f => f.match(/\.(jpe?g|png|gif|webp|svg)$/i));
const missing = allPaths.filter(p => !publicFiles.includes(p.substring(1)));

console.log('=== Category image paths ===');
categoryImagePaths.forEach(p => {
  const exists = publicFiles.includes(p.substring(1));
  console.log(`  ${exists ? 'OK' : 'MISSING'}: ${p}`);
});

console.log('=== Missing item image paths ===');
menuItemImagePaths.filter(p => !publicFiles.includes(p.substring(1))).forEach(p => {
  console.log(`  MISSING: ${p}`);
});
