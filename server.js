const http = require('http');
const fs = require('fs');
const path = require('path');

console.log('Current working directory:', process.cwd());

const server = http.createServer((req, res) => {
  console.log('Request received:', req.url);
  // 解析请求URL
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './user/index.html';
  }
  // 解码URL编码的路径
  filePath = decodeURIComponent(filePath);
  // 处理静态资源请求 - 如果请求路径不以/user开头但文件不存在，尝试在user目录下查找
  if (!filePath.startsWith('./user') && !fs.existsSync(filePath)) {
    // 先解码req.url，然后构建user目录下的完整路径
    const decodedUrl = decodeURIComponent(req.url);
    const userFilePath = path.join(__dirname, 'user', decodedUrl);
    console.log('Trying userFilePath:', userFilePath);
    if (fs.existsSync(userFilePath)) {
      filePath = userFilePath;
      console.log('Found file at userFilePath:', filePath);
    }
  }
  console.log('Resolved filePath:', filePath);
  
  // 检查文件是否存在
  fs.existsSync(filePath) ? console.log('File exists:', filePath) : console.log('File does not exist:', filePath);

  // 确定文件扩展名
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

  // 读取文件
  fs.readFile(filePath, (error, content) => {
    if (error) {
      console.log('Error reading file:', error.code, filePath);
      if(error.code == 'ENOENT') {
        // 文件不存在
        fs.readFile('./user/index.html', (error, content) => {
          if (error) {
            console.log('Error reading fallback file:', error.code);
            res.writeHead(500);
            res.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
          }
        });
      } else {
        // 服务器错误
        res.writeHead(500);
        res.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
      }
    } else {
      // 文件存在，返回文件内容
      console.log('File found, returning:', filePath);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});