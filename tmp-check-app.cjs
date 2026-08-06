const fs = require('fs');
const content = fs.readFileSync('src/App.tsx', 'utf8');
const lines = content.split('\n');
lines.forEach((line, i) => {
  if (line.includes('useMenuData') || line.includes('MENU_ITEMS') || line.includes('<MenuSection') || line.includes('menuItems')) {
    console.log((i + 1) + ': ' + line.trim());
  }
});
