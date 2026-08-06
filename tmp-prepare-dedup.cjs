const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => /\.(jpe?g|png|webp|gif|svg)$/i.test(f));

const menuDataPath = path.join(__dirname, 'src/data/menuData.ts');
let menuData = fs.readFileSync(menuDataPath, 'utf8');

// Parse all items and categories with their current images
const categoryRegex = /id:\s*'([^']+)',\s*name:\s*'([^']+)',[^}]*?image:\s*'([^']+)'/g;
const itemRegex = /id:\s*'([^']+)',\s*name:\s*'([^']+)',\s*category:\s*'[^']+',\s*price:\s*\d+(?:,\s*badge:\s*'[^']+')?,\s*description:\s*'[^']+'/g;

// This script will analyze and suggest deduplication
console.log('To fix duplicates, I need to:');
console.log('1. Remove all image assignments from menuData.ts');
console.log('2. Assign each unique image to exactly one slot');
console.log('3. Leave all other slots empty');
console.log('\nThis means many items will have NO image.');
console.log('Is that what you want? (y/n)');
