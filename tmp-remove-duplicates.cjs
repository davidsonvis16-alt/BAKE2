const fs = require('fs');
const path = require('path');

const menuDataPath = path.join(__dirname, 'src/data/menuData.ts');
let menuData = fs.readFileSync(menuDataPath, 'utf8');

// Count image usage
const imageUsage = new Map();
const imageRegex = /image:\s*'([^']+)'/g;
let match;
while ((match = imageRegex.exec(menuData)) !== null) {
  const img = match[1];
  if (!imageUsage.has(img)) imageUsage.set(img, []);
  imageUsage.get(img).push({ index: match.index, full: match[0] });
}

// Find duplicates
const duplicates = new Map();
imageUsage.forEach((occurrences, img) => {
  if (occurrences.length > 1) {
    duplicates.set(img, occurrences);
  }
});

console.log('=== DUPLICATE IMAGES ===');
duplicates.forEach((occurrences, img) => {
  console.log(`\n${img} (${occurrences.length} times):`);
  occurrences.forEach((occ, i) => {
    const context = menuData.substring(Math.max(0, occ.index - 50), occ.index + 50);
    const nameMatch = context.match(/name:\s*'([^']+)'/);
    const idMatch = context.match(/id:\s*'([^']+)'/);
    console.log(`  ${i + 1}. ${idMatch ? idMatch[1] : 'unknown'}: ${nameMatch ? nameMatch[1] : 'unknown'}`);
  });
});

console.log('\n=== SUMMARY ===');
console.log('Total unique images:', imageUsage.size);
console.log('Total references:', [...imageUsage.values()].reduce((sum, occs) => sum + occs.length, 0));
console.log('Duplicated images:', duplicates.size);
console.log('Extra references to remove:', [...duplicates.values()].reduce((sum, occs) => sum + occs.length - 1, 0));

// Remove duplicates (keep first occurrence only)
let removalCount = 0;
duplicates.forEach((occurrences, img) => {
  // Sort by index descending so we can remove from end to start
  const sorted = [...occurrences].sort((a, b) => b.index - a.index);
  for (let i = 1; i < sorted.length; i++) {
    const occ = sorted[i];
    // Find the comma before or after this image field
    const before = menuData.substring(Math.max(0, occ.index - 20), occ.index);
    const after = menuData.substring(occ.index, occ.index + 20);
    
    // Remove ", image: '...'" or "image: '...',"
    const fullMatch = menuData.match(new RegExp(`,\\s*${occ.full.replace(/'/g, "\\'")}`));
    if (fullMatch) {
      menuData = menuData.replace(fullMatch[0], '');
      removalCount++;
    } else {
      // Try removing just the field
      const fieldMatch = menuData.match(new RegExp(`,\\s*${occ.full.replace(/'/g, "\\'")}\\s*,?`));
      if (fieldMatch) {
        menuData = menuData.replace(fieldMatch[0], fieldMatch[0].includes(',') ? ',' : '');
        removalCount++;
      }
    }
  }
});

// Write back
fs.writeFileSync(menuDataPath, menuData);
console.log(`\nRemoved ${removalCount} duplicate image references`);
console.log('File updated successfully');
