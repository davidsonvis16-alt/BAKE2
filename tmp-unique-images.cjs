const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => /\.(jpe?g|png|webp|gif|svg)$/i.test(f));

const menuDataPath = path.join(__dirname, 'src/data/menuData.ts');
let menuData = fs.readFileSync(menuDataPath, 'utf8');

const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9]+/gi, '').trim();

const fileMap = new Map();
files.forEach(f => {
  const key = normalize(f.replace(/\.(jpe?g|png|webp|gif|svg)$/i, ''));
  if (!fileMap.has(key)) {
    fileMap.set(key, f);
  }
});

const categoryRegex = /\{\s*\n\s*id:\s*'([^']+)',\s*\n\s*name:\s*'([^']+)',\s*\n[^}]*?image:\s*'([^']+)'/g;
const itemRegex = /id:\s*'([^']+)',\s*name:\s*'([^']+)',\s*category:\s*'[^']+',\s*price:\s*\d+(?:,\s*badge:\s*'[^']+')?,\s*description:\s*'[^']+'/g;

function findImageForItem(itemName, usedImages) {
  const itemKey = normalize(itemName);
  if (!itemKey) return null;

  const exact = fileMap.get(itemKey);
  if (exact && !usedImages.has(exact)) return exact;

  for (const [fileKey, fileName] of fileMap) {
    if (usedImages.has(fileName)) continue;
    if (fileKey.length < 4 || itemKey.length < 4) continue;
    if (fileKey === itemKey || fileKey.includes(itemKey) || itemKey.includes(fileKey)) {
      return fileName;
    }
  }
  return null;
}

// First pass: collect all items and categories
let catMatch;
const categories = [];
while ((catMatch = categoryRegex.exec(menuData)) !== null) {
  categories.push({ id: catMatch[1], name: catMatch[2], fullMatch: catMatch[0] });
}

let itemMatch;
const items = [];
while ((itemMatch = itemRegex.exec(menuData)) !== null) {
  items.push({ id: itemMatch[1], name: itemMatch[2], fullMatch: itemMatch[0] });
}

// Second pass: assign images, one per file
const usedImages = new Set();
const newMenuData = menuData;

// Assign to categories first
categories.forEach(cat => {
  const matchedFile = findImageForItem(cat.name, usedImages);
  if (matchedFile) {
    usedImages.add(matchedFile);
    const oldImage = cat.fullMatch.match(/image:\s*'[^']+'/);
    if (oldImage) {
      newMenuData.replace(oldImage[0], `image: '/${matchedFile}'`);
    } else {
      // Add image field after description
      const descMatch = cat.fullMatch.match(/description:\s*'[^']+'/);
      if (descMatch) {
        const insertPoint = descMatch.index + descMatch[0].length;
        newMenuData = newMenuData.substring(0, insertPoint) + `,\n    image: '/${matchedFile}'` + newMenuData.substring(insertPoint);
      }
    }
  }
});

// Assign to items
items.forEach(item => {
  const matchedFile = findImageForItem(item.name, usedImages);
  if (matchedFile) {
    usedImages.add(matchedFile);
    const oldImage = item.fullMatch.match(/image:\s*'[^']+'/);
    if (oldImage) {
      // Replace existing image
      const regex = new RegExp(`(id:\\s*'${item.id}',[^}]*?)image:\\s*'[^']+'`);
      newMenuData.replace(regex, `$1image: '/${matchedFile}'`);
    } else {
      // Add image field
      const descMatch = item.fullMatch.match(/description:\s*'[^']+'/);
      if (descMatch) {
        const insertPoint = descMatch.index + descMatch[0].length;
        newMenuData = newMenuData.substring(0, insertPoint) + `,\n    image: '/${matchedFile}'` + newMenuData.substring(insertPoint);
      }
    }
  } else {
    // Remove existing image if no match
    const regex = new RegExp(`(id:\\s*'${item.id}',[^}]*?)\\s*,\\s*image:\\s*'[^']+'`);
    newMenuData.replace(regex, '$1');
  }
});

fs.writeFileSync(menuDataPath, newMenuData);
console.log('Updated menuData.ts with unique image assignments');
console.log('Used images:', usedImages.size);
console.log('Items without images:', items.length - usedImages.size);
