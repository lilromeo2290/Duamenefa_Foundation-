import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, 'out');
const PORT = 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.map': 'application/json',
  '.txt': 'text/plain; charset=utf-8',
};

const CACHE_CONTROL = {
  '.html': 'public, max-age=0, must-revalidate',
  '.css': 'public, max-age=31536000, immutable',
  '.js': 'public, max-age=31536000, immutable',
  '.woff': 'public, max-age=31536000, immutable',
  '.woff2': 'public, max-age=31536000, immutable',
  '.ttf': 'public, max-age=31536000, immutable',
  '.png': 'public, max-age=86400',
  '.jpg': 'public, max-age=86400',
  '.webp': 'public, max-age=86400',
  '.svg': 'public, max-age=86400',
};

function serve(req, res) {
  let urlPath = req.url.split('?')[0];

  // Handle SPA routing - all non-file requests serve index.html
  if (urlPath === '/' || urlPath === '') {
    urlPath = '/index.html';
  }

  // Security: prevent directory traversal
  const safePath = path.normalize(urlPath).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(OUT_DIR, safePath);

  // If file doesn't exist, try adding .html extension
  if (!fs.existsSync(filePath)) {
    const htmlPath = filePath + '.html';
    if (fs.existsSync(htmlPath)) {
      filePath = htmlPath;
    } else {
      // SPA fallback: serve index.html for unknown routes
      filePath = path.join(OUT_DIR, 'index.html');
    }
  }

  // If path is a directory, serve index.html inside it
  try {
    if (fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }
  } catch {
    filePath = path.join(OUT_DIR, 'index.html');
  }

  // Read and serve the file
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  const cacheControl = CACHE_CONTROL[ext] || 'public, max-age=3600';

  try {
    const data = fs.readFileSync(filePath);
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': cacheControl,
      'X-Content-Type-Options': 'nosniff',
    });
    res.end(data);
  } catch {
    // 404 fallback - serve index.html for SPA
    try {
      const indexData = fs.readFileSync(path.join(OUT_DIR, 'index.html'));
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=0, must-revalidate',
      });
      res.end(indexData);
    } catch {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  }
}

const server = http.createServer(serve);
server.listen(PORT, () => {
  console.log(`Static server running at http://localhost:${PORT}`);
  console.log(`Serving files from: ${OUT_DIR}`);
});
