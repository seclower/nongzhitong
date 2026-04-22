# 农智通 - 快速启动指南

## 简介

农智通是一个免费的农资产品销售和农技服务平台。本地运行，无需服务器，无需外网。

## 前置要求

- **Node.js v14或更高版本** ([下载地址](https://nodejs.org/))
- **npm** (随Node.js自动安装)

验证安装：
```bash
node -v    # 应显示 v14.x.x 或更高
npm -v     # 应显示 6.x.x 或更高
```

## 快速启动（10分钟搞定）

### 方式A：本地运行

1. **安装依赖**
   ```bash
   cd d:\三创\nongzhitong\backend
   npm install
   ```

2. **启动服务**
   ```bash
   npm start
   ```

3. **打开浏览器**
   访问：**http://localhost:3000/user/index.html**

### 方式B：公网部署（全球访问）

1. **查看部署指南**：`PUBLIC_DEPLOY.md`
2. **推荐平台**：Railway（完全免费）
3. **部署时间**：约5分钟
4. **访问方式**：获得一个全球可访问的链接

详细步骤请参考：[公网部署指南](./PUBLIC_DEPLOY.md)

## 访问地址

| 页面 | 本地地址 | 公网地址 |
|------|---------|----------|
| 首页 | http://localhost:3000/user/index.html | https://你的域名/user/index.html |
| 分类 | http://localhost:3000/user/category.html | https://你的域名/user/category.html |
| 购物车 | http://localhost:3000/user/cart.html | https://你的域名/user/cart.html |
| 登录/注册 | http://localhost:3000/user/login.html | https://你的域名/user/login.html |
| 支付页面 | http://localhost:3000/user/payment.html | https://你的域名/user/payment.html |
| 二维码分享 | http://localhost:3000/user/qr.html | https://你的域名/user/qr.html |
| 个人中心 | http://localhost:3000/user/profile.html | https://你的域名/user/profile.html |

## 功能说明

### 已实现功能

| 功能 | 说明 | 是否免费 |
|------|------|----------|
| 用户注册/登录 | 本地验证，无需手机号 | ✅ 免费 |
| 商品浏览 | 化肥、农药、种子等分类 | ✅ 免费 |
| 购物车 | 添加、删除、修改数量 | ✅ 免费 |
| 秒杀活动 | 限时特价商品 | ✅ 免费 |
| 拼团活动 | 邀请好友一起购买 | ✅ 免费 |
| 农事日历 | 每日农业小贴士 | ✅ 免费 |
| 支付模拟 | 模拟支付流程 | ✅ 免费 |

### 关于验证码

开发环境下，验证码会在**命令行窗口**输出。登录页面点击获取验证码后，查看启动服务的命令行窗口。

### 关于支付

当前为**模拟支付**，不会产生真实扣款。适合演示和测试。

## 常见问题

### ❌ 端口3000被占用

```bash
# 方法1：关闭占用端口的程序
netstat -ano | findstr :3000
taskkill /PID <进程ID> /F

# 方法2：更换端口
set PORT=3001 && npm start
```

### ❌ npm install 失败

```bash
# 方法1：清理缓存后重试
npm cache clean --force
npm install

# 方法2：使用淘宝镜像
npm install --registry=https://registry.npmmirror.com
```

### ❌ 页面打不开

1. 确认服务已启动（命令行窗口无报错）
2. 确认访问地址正确：http://localhost:3000/user/index.html
3. 尝试清理浏览器缓存
4. 尝试更换浏览器

### ❌ 数据库错误

SQLite数据库会自动创建在 `backend/nongzhitong.db`。如果出现问题，删除该文件后重启服务会自动重建。

## 本地网络访问

### 手机访问（同一WiFi）

1. 查看电脑IP：`ipconfig`（IPv4地址）
2. 手机连接同一WiFi
3. 浏览器访问：`http://电脑IP:3000/user/index.html`

示例：如果电脑IP是 `192.168.1.100`，手机访问 `http://192.168.1.100:3000/user/index.html`

### 关闭防火墙（可选）

如果手机无法访问，需要允许Node.js通过防火墙：
```bash
# Windows Defender 防火墙
netsh advfirewall firewall add rule name="Node.js" dir=in action=allow program="C:\Program Files\nodejs\node.exe"
```

## 项目结构

```
nongzhitong/
├── backend/              # 后端服务
│   ├── models/           # 数据模型
│   ├── routes/           # API路由
│   ├── app.js           # 服务入口
│   └── package.json      # 依赖配置
├── user/                 # 用户端网页
│   ├── index.html       # 首页
│   ├── cart.html        # 购物车
│   ├── category.html    # 分类页
│   └── ...              # 其他页面
├── admin/                # 管理后台
└── README.md            # 项目说明
```

## 技术支持

遇到问题先检查：
1. Node.js是否正确安装（`node -v`）
2. 依赖是否安装成功（无报错）
3. 端口是否被占用
4. 浏览器控制台是否有错误

## 许可证

MIT License