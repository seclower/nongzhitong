# 农智通 - 公网部署指南

## 目标

将农智通应用部署到公网，让所有人不论在哪里、使用什么设备都能通过链接访问。

## 方案选择

### 推荐方案：Railway 免费部署

**优势：**
- 🆓 完全免费
- 🚀 部署简单，无需配置服务器
- 📦 支持Node.js和SQLite
- 🌐 自动分配域名
- 🔄 支持自动部署

### 备选方案：
- **Render**：类似Railway，免费额度充足
- **Fly.io**：适合全球访问，有免费额度
- **Vercel**：适合静态网站，后端需要使用Serverless Functions

## 部署步骤

### 步骤1：准备项目

1. **确保项目结构完整**：
   - 后端：`d:\三创\nongzhitong\backend`
   - 前端：`d:\三创\nongzhitong\user`

2. **检查依赖**：
   ```bash
   cd d:\三创\nongzhitong\backend
   npm install
   ```

3. **测试本地运行**：
   ```bash
   npm start
   ```
   确保服务能正常启动。

### 步骤2：部署到 Railway

#### 方法A：通过GitHub部署（推荐）

1. **创建GitHub仓库**：
   - 登录 GitHub：https://github.com
   - 创建新仓库：`nongzhitong`
   - 上传项目文件

2. **部署到Railway**：
   - 访问：https://railway.app
   - 登录（使用GitHub账号）
   - 点击「New Project」→「Deploy from GitHub repo」
   - 选择你的 `nongzhitong` 仓库
   - 选择 `backend` 目录作为根目录
   - 点击「Deploy」

#### 方法B：直接部署

1. **访问Railway**：https://railway.app
2. **创建新项目**：
   - 点击「New Project」→「Empty Project」
   - 点击「Add Service」→「Upload」
   - 上传 `backend` 目录的压缩包

### 步骤3：配置Railway

1. **设置环境变量**（如果需要）：
   - 点击「Variables」
   - 添加：
     - `PORT` = `3000`
     - `NODE_ENV` = `production`

2. **配置启动命令**：
   - 点击「Settings」
   - 确保「Start Command」为：`npm start`

3. **等待部署完成**：
   Railway会自动构建和部署你的应用。

### 步骤4：获取访问链接

部署完成后，Railway会为你分配一个域名，例如：
`https://nongzhitong.up.railway.app`

这个链接就是你的公网访问地址！

## 访问地址

| 页面 | 访问地址 |
|------|----------|
| 首页 | `https://你的域名/user/index.html` |
| 分类 | `https://你的域名/user/category.html` |
| 购物车 | `https://你的域名/user/cart.html` |
| 登录 | `https://你的域名/user/login.html` |
| 秒杀 | `https://你的域名/user/seckill.html` |
| 拼团 | `https://你的域名/user/groupon.html` |
| 日历 | `https://你的域名/user/calendar.html` |

## 测试验证

1. **访问首页**：打开分配的域名
2. **测试功能**：
   - 浏览商品
   - 测试登录（验证码在Railway日志中查看）
   - 测试购买流程
   - 测试秒杀和拼团功能

## 常见问题

### ❌ 部署失败

- **检查日志**：Railway控制台查看构建日志
- **检查依赖**：确保 `package.json` 正确
- **检查端口**：确保使用端口3000

### ❌ 数据库错误

- Railway支持SQLite，数据会存储在应用实例中
- 如果需要持久化存储，可以考虑使用Railway的数据库服务

### ❌ 访问速度慢

- Railway的免费服务可能有一定延迟
- 可以考虑升级到付费计划获得更好的性能

## 自定义域名（可选）

1. **购买域名**：从阿里云、腾讯云等购买
2. **配置DNS**：
   - 登录域名管理控制台
   - 添加CNAME记录指向Railway分配的域名
3. **在Railway中添加域名**：
   - 点击「Settings」→「Domains」
   - 添加你的自定义域名

## 监控和维护

### 查看日志
- Railway控制台 → 你的项目 → 「Logs」

### 重启服务
- Railway控制台 → 你的项目 → 「More」→ 「Restart」

### 更新代码
- 如果使用GitHub部署，直接推送代码到仓库即可自动更新
- 如果手动部署，重新上传代码包

## 注意事项

1. **免费额度**：Railway的免费计划有使用限制，适合小流量应用
2. **数据备份**：定期备份SQLite数据库文件
3. **安全性**：确保使用强密码，定期更新依赖
4. **性能**：对于大流量应用，建议升级到付费计划

## 技术支持

如果遇到问题：
1. 查看Railway文档：https://docs.railway.app
2. 检查项目日志
3. 确认依赖安装正确
4. 确保端口配置正确

## 成功部署后

部署成功后，你将获得一个全球可访问的链接，例如：
`https://nongzhitong.up.railway.app`

任何人都可以通过这个链接访问你的农智通应用！