const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;
const PUBLIC_DIR = path.join(__dirname);

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
  let filePath = '.' + req.url;
  if (filePath === './') filePath = './dist/index.html';
  
  // Check if requesting an image
  if (req.url.startsWith('/')) {
    const publicPath = path.join(PUBLIC_DIR, 'public', '.' + req.url);
    const distPath = path.join(PUBLIC_DIR, 'dist', '.' + req.url);
    
    if (fs.existsSync(publicPath)) {
      filePath = publicPath;
    } else if (fs.existsSync(distPath)) {
      filePath = distPath;
    } else {
      const ext = path.parse(filePath).ext;
      const mime = mimeTypes[ext] || 'application/octet-stream';
      if (ext.match(/\.(jpe?g|png|gif|svg)$/i)) {
        // Image file - check public dir
        const testPath = path.join(PUBLIC_DIR, 'public', req.url);
        if (fs.existsSync(testPath)) {
          const stats = fs.statSync(testPath);
          const content = fs.readFileSync(testPath);
          res.writeHead(200, { 'Content-Type': mime, 'Content-Length': stats.size });
          res.end(content);
          return;
        }
      }
    }
  }
  
  const ext = path.parse(filePath).ext;
  const mime = mimeTypes[ext] || 'application/octet-stream';
  
  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(404);
      res.end('Not found: ' + req.url);
    } else {
      res.writeHead(200, { 'Content-Type': mime });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log('Server running at http://localhost:' + PORT + '/');
  console.log('Public dir: ' + path.join(PUBLIC_DIR, 'public'));
  
  // Check a few key image files
  const testFiles = ['bakery-desserts.jpeg', 'Cold-Cheese-Cake.jpg', 'Chicken-Biriani.jpg'];
  testFiles.forEach(f => {
    const p = path.join(PUBLIC_DIR, 'public', f);
    console.log(f + ': ' + (fs.existsSync(p) ? 'EXISTS' : 'MISSING'));
  });
});
