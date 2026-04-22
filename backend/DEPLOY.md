# 农智通后端部署和集成指南

## 1. 环境准备

### 1.1 系统要求
- Node.js 14.0+ 
- MySQL 5.7+ 
- Redis (可选，用于缓存)

### 1.2 依赖安装

1. 进入后端目录
   ```bash
   cd d:\三创\nongzhitong\backend
   ```

2. 安装依赖
   ```bash
   npm install
   ```

## 2. 数据库配置

### 2.1 创建数据库

1. 登录MySQL
   ```bash
   mysql -u root -p
   ```

2. 创建数据库
   ```sql
   CREATE DATABASE nongzhitong CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

3. 创建用户并授权
   ```sql
   CREATE USER 'nongzhitong'@'localhost' IDENTIFIED BY 'password';
   GRANT ALL PRIVILEGES ON nongzhitong.* TO 'nongzhitong'@'localhost';
   FLUSH PRIVILEGES;
   ```

### 2.2 配置数据库连接

创建 `.env` 文件，配置数据库连接信息：

```env
# 服务器配置
PORT=3000
HOST=0.0.0.0

# 数据库配置
DB_HOST=localhost
DB_PORT=3306
DB_USER=nongzhitong
DB_PASSWORD=password
DB_NAME=nongzhitong

# JWT配置
JWT_SECRET=nongzhitong-secret-key
JWT_EXPIRES_IN=24h

# Redis配置（可选）
REDIS_HOST=localhost
REDIS_PORT=6379

# 日志配置
LOG_LEVEL=info
```

## 3. 启动服务

### 3.1 开发环境

```bash
npm run dev
```

### 3.2 生产环境

```bash
npm start
```

### 3.3 检查服务状态

服务启动后，可以通过以下地址检查服务状态：
- 健康检查：`http://localhost:3000/health`
- API接口：`http://localhost:3000/api`

## 4. 与前端集成

### 4.1 微信小程序集成

1. 在微信小程序的 `app.json` 中配置合法域名：

   ```json
   {
     "networkTimeout": {
       "request": 10000,
       "downloadFile": 10000
     },
     "permission": {
       "scope.userLocation": {
         "desc": "用于获取用户位置，以便推荐附近的门店"
       }
     },
     "requiredBackgroundModes": ["audio"],
     "plugins": {},
     "subPackages": [],
     "sitemapLocation": "sitemap.json",
     "domainList": ["https://your-backend-domain.com"]
   }
   ```

2. 在微信小程序的 `utils/request.js` 中封装API请求：

   ```javascript
   // utils/request.js
   const baseUrl = 'https://your-backend-domain.com/api';
   
   function request(url, method, data) {
     return new Promise((resolve, reject) => {
       wx.request({
         url: baseUrl + url,
         method: method,
         data: data,
         header: {
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + wx.getStorageSync('token')
         },
         success: (res) => {
           if (res.statusCode === 200) {
             resolve(res.data);
           } else {
             reject(res.data);
           }
         },
         fail: (error) => {
           reject(error);
         }
       });
     });
   }
   
   module.exports = {
     get: (url, data) => request(url, 'GET', data),
     post: (url, data) => request(url, 'POST', data),
     put: (url, data) => request(url, 'PUT', data),
     delete: (url, data) => request(url, 'DELETE', data)
   };
   ```

3. 使用API请求：

   ```javascript
   // 登录
   const request = require('../../utils/request');
   
   request.post('/auth/login', {
     username: '111',
     password: '123456'
   }).then(res => {
     wx.setStorageSync('token', res.token);
     wx.setStorageSync('user', res.user);
     wx.navigateTo({ url: '/pages/index/index' });
   }).catch(err => {
     wx.showToast({ title: err.message, icon: 'none' });
   });
   ```

### 4.2 商户后台集成

1. 在商户后台的 `src/api/index.js` 中封装API请求：

   ```javascript
   // src/api/index.js
   import axios from 'axios';
   
   const baseURL = 'https://your-backend-domain.com/api';
   
   const api = axios.create({
     baseURL,
     timeout: 10000,
     headers: {
       'Content-Type': 'application/json'
     }
   });
   
   // 请求拦截器
   api.interceptors.request.use(config => {
     const token = localStorage.getItem('token');
     if (token) {
       config.headers.Authorization = `Bearer ${token}`;
     }
     return config;
   });
   
   // 响应拦截器
   api.interceptors.response.use(
     response => response.data,
     error => {
       if (error.response.status === 401) {
         // 未授权，跳转到登录页
         window.location.href = '/login';
       }
       return Promise.reject(error.response.data);
     }
   );
   
   export default api;
   ```

2. 使用API请求：

   ```javascript
   // 登录
   import api from './api';
   
   api.post('/auth/login', {
     username: 'admin',
     password: '123456'
   }).then(res => {
     localStorage.setItem('token', res.token);
     localStorage.setItem('user', JSON.stringify(res.user));
     window.location.href = '/dashboard';
   }).catch(err => {
     alert(err.message);
   });
   ```

## 5. 部署到云服务器

### 5.1 服务器准备

1. 购买云服务器（推荐阿里云、腾讯云等）
2. 安装Node.js、MySQL、Nginx等
3. 配置防火墙，开放3000端口（后端服务）和80/443端口（Nginx）

### 5.2 部署步骤

1. 上传代码到服务器
   ```bash
   scp -r d:\三创\nongzhitong\backend root@your-server-ip:/opt/nongzhitong
   ```

2. 安装依赖
   ```bash
   cd /opt/nongzhitong
   npm install
   ```

3. 配置环境变量
   ```bash
   cp .env.example .env
   # 编辑.env文件，配置数据库连接等信息
   ```

4. 启动服务（使用PM2管理进程）
   ```bash
   npm install -g pm2
   pm2 start app.js --name nongzhitong
   pm2 save
   pm2 startup
   ```

5. 配置Nginx反向代理
   ```bash
   # 编辑nginx配置文件
   vi /etc/nginx/conf.d/nongzhitong.conf
   ```

   配置内容：
   ```nginx
   server {
     listen 80;
     server_name your-domain.com;
     
     location / {
       proxy_pass http://localhost:3000;
       proxy_set_header Host $host;
       proxy_set_header X-Real-IP $remote_addr;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
     }
   }
   ```

6. 重启Nginx
   ```bash
   nginx -t
   systemctl restart nginx
   ```

7. 配置HTTPS（可选）
   使用Let's Encrypt或其他SSL证书服务配置HTTPS。

## 6. 数据库初始化

### 6.1 初始化管理员账号

1. 连接数据库
   ```bash
   mysql -u nongzhitong -p nongzhitong
   ```

2. 插入管理员账号
   ```sql
   INSERT INTO users (username, password, name, phone, role, status) VALUES
   ('admin', '$2b$10$eJ5e4E5e4E5e4E5e4E5e4E5e4E5e4E5e4E5e4E5e4E5e4E5e4E5e4E5', '管理员', '13800138000', 'admin', 'active');
   ```

   注意：密码是使用bcrypt加密后的，上面的密码对应明文是 `123456`。

### 6.2 初始化分类数据

```sql
INSERT INTO categories (name, parentId, level, status) VALUES
('杀菌剂', NULL, 1, 'active'),
('杀虫剂', NULL, 1, 'active'),
('除草剂', NULL, 1, 'active'),
('肥料', NULL, 1, 'active'),
('种子', NULL, 1, 'active');
```

### 6.3 初始化产品数据

```sql
INSERT INTO products (name, description, price, stock, categoryId, status) VALUES
('三浦百灵6%春雷霉素', '番茄叶霉黄瓜角斑病 溃疡青枯软腐病杀菌剂农药', 6.00, 100, 1, 'active'),
('瀚生品星40%氟硅唑乳油', '黄瓜黑星病农药 内吸性杀菌剂保护治疗铲除', 40.00, 50, 1, 'active'),
('巴斯夫格力高溴虫氟苯双酰胺', '黄条跳甲棉铃虫蓟马青虫杀虫剂农药', 100.00, 30, 2, 'active'),
('国光毒箭5%氯氰菊酯', '果树烟草地 老虎青虫地下害虫钻心虫农药杀虫剂', 6.00, 200, 2, 'active'),
('翰生金甲钢拳7%甲维盐顺氯杀虫剂', '顺式氯氰菊酯甲氨基阿维菌素农药农用', 12.00, 150, 2, 'active'),
('国光络佳钙高含量钙肥', '果树增加果实硬度 缓解缺钙裂果干烧心叶面肥', 15.00, 100, 4, 'active');
```

## 7. 监控和维护

### 7.1 日志管理

后端服务的日志可以通过PM2查看：

```bash
# 安装PM2
npm install -g pm2

# 安装日志轮换插件
npm install pm2-logrotate

# 配置日志轮换
pm set pm2-logrotate:max_size 10M
npm set pm2-logrotate:retain 7
npm set pm2-logrotate:compress true
npm set pm2-logrotate:rotateInterval "0 0 * * *"
npm set pm2-logrotate:rotateModule true
npm set pm2-logrotate:workerInterval 3600

# 查看日志
npm logs nongzhitong

# 查看实时日志
npm logs nongzhitong --lines 100 --follow
```

### 7.2 数据库维护

定期备份数据库，防止数据丢失：

```bash
# 备份数据库
mysqldump -u nongzhitong -p nongzhitong > nongzhitong_backup_$(date +%Y%m%d).sql

# 恢复数据库
mysql -u nongzhitong -p nongzhitong < nongzhitong_backup.sql

# 优化数据库表
mysql -u nongzhitong -p nongzhitong -e "OPTIMIZE TABLE users, products, orders, order_items, categories;"
```

### 7.3 安全配置

1. 配置HTTPS：使用Let's Encrypt或其他SSL证书服务
2. 定期更新依赖：运行 `npm update` 保持依赖包最新
3. 配置防火墙，限制访问端口：只开放必要的端口（如80/443/3306）
4. 使用强密码和定期密码更换：避免使用简单密码
5. 定期检查日志，发现异常及时处理：监控系统运行状态
6. 禁用不必要的服务和端口：减少攻击面
7. 定期更新系统和软件：修复安全漏洞

### 7.4 性能优化

1. 使用Redis缓存：提高数据访问速度
2. 优化数据库查询：添加适当的索引
3. 合理配置Node.js进程数：根据服务器性能调整
4. 使用CDN加速静态资源：提高前端访问速度
5. 启用Gzip压缩：减少传输数据大小
6. 优化图片资源：使用适当的图片格式和大小

### 7.5 故障排查

1. 查看服务状态：`pm2 status nongzhitong`
2. 查看服务日志：`pm2 logs nongzhitong`
3. 检查数据库连接：使用MySQL客户端连接测试
4. 检查网络连接：使用ping和telnet测试网络连通性
5. 检查端口占用：使用`netstat -tuln`查看端口使用情况
6. 检查系统资源：使用`top`或`htop`查看CPU和内存使用情况