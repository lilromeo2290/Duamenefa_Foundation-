const http = require('http');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'out');
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.pdf': 'application/pdf',
  '.map': 'application/json',
  '.txt': 'text/plain',
};

const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];

  // Serve index.html for root
  if (urlPath === '/') urlPath = '/index.html';

  let fp = path.join(dir, urlPath);

  // Security: prevent directory traversal
  if (!fp.startsWith(dir)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(fp, (err, data) => {
    if (err) {
      // SPA fallback: try .html version
      if (!urlPath.endsWith('.html')) {
        const htmlPath = path.join(dir, urlPath + '.html');
        fs.readFile(htmlPath, (err2, data2) => {
          if (err2) {
            // Final fallback to index.html for SPA routing
            fs.readFile(path.join(dir, 'index.html'), (err3, data3) => {
              if (err3) { res.writeHead(404); res.end('Not found'); return; }
              res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
              res.end(data3);
            });
            return;
          }
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(data2);
        });
        return;
      }
      res.writeHead(404);
      res.end('Not found');
      return;
    }

    const ext = path.extname(fp);
    const contentType = mime[ext] || 'application/octet-stream';
    const headers = {
      'Content-Type': contentType,
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable',
    };
    res.writeHead(200, headers);
    res.end(data);
  });
});

server.listen(3000, '0.0.0.0', () => {
  console.log('Static server running on http://localhost:3000');
});
