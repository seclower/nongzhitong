const http = require('http');
const fs = require('fs');
const path = require('path');

console.log('农智通服务器启动中...');
console.log('当前工作目录:', process.cwd());
console.log('Node.js版本:', process.version);
console.log('监听端口:', process.env.PORT || 8080);

const server = http.createServer((req, res) => {
  const url = req.url;

  if (url === '/health' || url === '/healthcheck') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }));
    return;
  }

  console.log('收到请求:', url);

  let filePath = '.' + url;
  if (filePath === './') {
    filePath = './user/index.html';
  }
  filePath = decodeURIComponent(filePath);

  if (!filePath.startsWith('./user') && !fs.existsSync(filePath)) {
    const decodedUrl = decodeURIComponent(req.url);
    const userFilePath = path.join(__dirname, 'user', decodedUrl);
    if (fs.existsSync(userFilePath)) {
      filePath = userFilePath;
    }
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
  };

  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if(error.code == 'ENOENT') {
        fs.readFile('./user/index.html', (error, content) => {
          if (error) {
            res.writeHead(500);
            res.end('Server error');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
          }
        });
      } else {
        res.writeHead(500);
        res.end('Server error');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`农智通服务器运行中: http://0.0.0.0:${PORT}/`);
});