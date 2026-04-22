# 农智通 - 完善指南

## 已完成功能

### 1. 用户认证系统
✅ 登录注册页面（login.html）
✅ 验证码发送功能（后端API）
✅ 密码重置功能
✅ JWT Token认证
✅ 用户会话管理

### 2. 支付系统
✅ 支付页面（payment.html）
✅ 支付API（backend/routes/payment.js）
✅ 支持微信支付、支付宝、余额支付
✅ 支付状态查询
✅ 退款功能

### 3. 二维码访问
✅ 二维码页面（qr.html）
✅ 动态生成访问二维码
✅ 复制网址功能

### 4. 后端服务
✅ Express服务器
✅ API路由
✅ CORS配置
✅ 安全中间件
✅ 错误处理

## 需要完善的功能

### 1. 真实短信验证码发送

**问题**：
当前验证码只在控制台输出，没有真正发送到用户手机。

**解决方案**：

#### 方案一：使用阿里云短信服务
1. 注册阿里云账号：https://www.aliyun.com
2. 开通短信服务
3. 创建签名和模板
4. 获取AccessKey ID和AccessKey Secret
5. 安装阿里云SDK：
```bash
npm install @alicloud/dysmsapi20170525 @alicloud/openapi-client
```

6. 修改backend/routes/auth.js中的send-code路由：
```javascript
const Dysmsapi = require('@alicloud/dysmsapi20170525');
const OpenApi = require('@alicloud/openapi-client');

router.post('/send-code', async (req, res) => {
  try {
    const { phone } = req.body;
    
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      return res.status(400).json({ message: '手机号格式不正确' });
    }
    
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    verificationCodes.set(phone, {
      code,
      expiresAt: Date.now() + 5 * 60 * 1000
    });
    
    // 发送短信
    const config = new OpenApi.Config({
      accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID,
      accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET,
    });
    config.endpoint = 'dysmsapi.aliyuncs.com';
    
    const client = new Dysmsapi(config);
    const request = new Dysmsapi.SendSmsRequest({
      phoneNumbers: phone,
      signName: process.env.ALIYUN_SIGN_NAME,
      templateCode: process.env.ALIYUN_TEMPLATE_CODE,
      templateParam: JSON.stringify({ code })
    });
    
    await client.sendSms(request);
    
    res.json({ message: '验证码已发送' });
  } catch (error) {
    console.error('发送验证码失败:', error);
    res.status(500).json({ message: '发送验证码失败', error });
  }
});
```

7. 在.env文件中配置：
```
ALIYUN_ACCESS_KEY_ID=your_access_key_id
ALIYUN_ACCESS_KEY_SECRET=your_access_key_secret
ALIYUN_SIGN_NAME=农智通
ALIYUN_TEMPLATE_CODE=SMS_123456789
```

#### 方案二：使用腾讯云短信服务
1. 注册腾讯云账号：https://cloud.tencent.com
2. 开通短信服务
3. 创建签名和模板
4. 获取SDK AppID和AppKey
5. 安装腾讯云SDK：
```bash
npm install tencentcloud-sdk-nodejs
```

6. 修改send-code路由，使用腾讯云API发送短信

#### 方案三：使用网易云信
1. 注册网易云信账号：https://yunxin.163.com
2. 开通短信服务
3. 获取AppKey和AppSecret
4. 安装SDK并实现短信发送

### 2. 真实支付功能

**问题**：
当前支付功能只是模拟，没有真正接入支付平台。

**解决方案**：

#### 微信支付接入
1. 注册微信支付商户账号：https://pay.weixin.qq.com
2. 获取商户号、API密钥、证书
3. 配置支付回调URL
4. 安装微信支付SDK：
```bash
npm install wechatpay-node-v3
```

5. 修改backend/routes/payment.js中的createWechatPayment函数：
```javascript
const { Wechatpay, Formatter } = require('wechatpay-node-v3');

const pay = new Wechatpay({
  appid: process.env.WECHAT_APP_ID,
  mchid: process.env.WECHAT_MCH_ID,
  publicKey: fs.readFileSync('./apiclient_cert.pem'),
  privateKey: fs.readFileSync('./apiclient_key.pem'),
});

async function createWechatPayment(order, amount, notifyUrl) {
  const params = {
    appid: process.env.WECHAT_APP_ID,
    mchid: process.env.WECHAT_MCH_ID,
    description: '农智通订单支付',
    out_trade_no: order.id,
    notify_url: notifyUrl,
    amount: {
      total: Math.round(amount * 100), // 转换为分
      currency: 'CNY'
    },
    scene_info: {
      payer_client_ip: req.ip
    }
  };
  
  const result = await pay.transactions_native(params);
  
  return {
    method: 'wechat',
    paymentId: result.prepay_id,
    amount: amount,
    qrCode: result.code_url,
    params: result
  };
}
```

6. 在.env文件中配置：
```
WECHAT_APP_ID=your_app_id
WECHAT_MCH_ID=your_mch_id
WECHAT_API_KEY=your_api_key
WECHAT_NOTIFY_URL=https://yourdomain.com/api/payment/notify/wechat
```

#### 支付宝接入
1. 注册支付宝商户账号：https://open.alipay.com
2. 创建应用并获取AppID
3. 配置应用公钥和私钥
4. 安装支付宝SDK：
```bash
npm install alipay-sdk
```

5. 修改backend/routes/payment.js中的createAlipayPayment函数：
```javascript
const AlipaySdk = require('alipay-sdk').default;
const AlipayFormData = require('alipay-sdk/lib/form').default;

const alipaySdk = new AlipaySdk({
  appId: process.env.ALIPAY_APP_ID,
  privateKey: process.env.ALIPAY_PRIVATE_KEY,
  alipayPublicKey: process.env.ALIPAY_PUBLIC_KEY,
  gateway: 'https://openapi.alipay.com/gateway.do',
});

async function createAlipayPayment(order, amount, returnUrl, notifyUrl) {
  const formData = new AlipayFormData();
  formData.setMethod('get');
  formData.addField('returnUrl', returnUrl);
  formData.addField('bizContent', {
    outTradeNo: order.id,
    productCode: 'FAST_INSTANT_TRADE_PAY',
    totalAmount: amount,
    subject: order.orderNo,
    body: '农智通订单支付'
  });
  
  const result = await alipaySdk.exec(
    'alipay.trade.page.pay',
    {},
    { formData: formData.getParams() }
  );
  
  return {
    method: 'alipay',
    paymentId: order.id,
    amount: amount,
    formUrl: result,
    params: formData.getParams()
  };
}
```

6. 在.env文件中配置：
```
ALIPAY_APP_ID=your_app_id
ALIPAY_PRIVATE_KEY=your_private_key
ALIPAY_PUBLIC_KEY=your_public_key
ALIPAY_NOTIFY_URL=https://yourdomain.com/api/payment/notify/alipay
```

### 3. 外网访问配置

**问题**：
当前服务器只监听本地，无法从外网访问。

**解决方案**：

#### 方案一：使用云服务器
1. 购买云服务器（阿里云、腾讯云、华为云等）
2. 配置安全组，开放3000端口
3. 部署应用到云服务器
4. 配置域名解析

#### 方案二：使用内网穿透工具

##### 使用ngrok
1. 下载ngrok：https://ngrok.com/download
2. 注册账号并获取authtoken
3. 运行：
```bash
ngrok authtoken your_authtoken
ngrok http 3000
```
4. 获取公网URL，如：https://abc123.ngrok.io

##### 使用frp
1. 下载frp：https://github.com/fatedier/frp/releases
2. 配置frpc.ini：
```ini
[common]
server_addr = your_server_ip
server_port = 7000

[web]
type = http
local_port = 3000
custom_domains = yourdomain.com
```
3. 运行：
```bash
./frpc -c frpc.ini
```

##### 使用花生壳
1. 下载花生壳客户端：https://hsk.oray.com
2. 注册账号
3. 配置内网穿透映射
4. 获取外网访问地址

### 4. 数据库优化

**问题**：
当前使用内存存储验证码，重启后丢失。

**解决方案**：

#### 使用Redis存储验证码
1. 安装Redis：
```bash
npm install redis
```

2. 创建Redis客户端：
```javascript
const redis = require('redis');
const client = redis.createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD
});

client.on('error', (err) => console.error('Redis Error:', err));
```

3. 修改验证码存储：
```javascript
await client.setex(`verify_code:${phone}`, 300, code); // 5分钟过期
```

#### 使用MySQL替代SQLite
1. 安装MySQL驱动：
```bash
npm install mysql2
```

2. 修改数据库配置：
```javascript
const sequelize = new Sequelize(
  process.env.DB_NAME || 'nongzhitong',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false
  }
);
```

### 5. 部署到生产环境

**解决方案**：

#### 使用PM2管理进程
1. 安装PM2：
```bash
npm install -g pm2
```

2. 创建ecosystem.config.js：
```javascript
module.exports = {
  apps: [{
    name: 'nongzhitong',
    script: './backend/app.js',
    instances: 2,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
```

3. 启动应用：
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

#### 使用Nginx反向代理
1. 安装Nginx
2. 配置nginx.conf：
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

3. 重启Nginx：
```bash
sudo nginx -s reload
```

#### 配置HTTPS
1. 使用Let's Encrypt免费证书：
```bash
sudo certbot --nginx -d yourdomain.com
```

2. 自动续期：
```bash
sudo certbot renew --dry-run
```

## 启动指南

### 开发环境
```bash
cd backend
npm install
npm run dev
```

### 生产环境
```bash
cd backend
npm install --production
pm2 start ecosystem.config.js
```

## 环境变量配置

创建.env文件：
```
NODE_ENV=production
PORT=3000
HOST=0.0.0.0

# 数据库配置
DB_HOST=localhost
DB_PORT=3306
DB_NAME=nongzhitong
DB_USER=root
DB_PASSWORD=your_password

# Redis配置
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# JWT配置
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# 阿里云短信配置
ALIYUN_ACCESS_KEY_ID=your_access_key_id
ALIYUN_ACCESS_KEY_SECRET=your_access_key_secret
ALIYUN_SIGN_NAME=农智通
ALIYUN_TEMPLATE_CODE=SMS_123456789

# 微信支付配置
WECHAT_APP_ID=your_app_id
WECHAT_MCH_ID=your_mch_id
WECHAT_API_KEY=your_api_key
WECHAT_NOTIFY_URL=https://yourdomain.com/api/payment/notify/wechat

# 支付宝配置
ALIPAY_APP_ID=your_app_id
ALIPAY_PRIVATE_KEY=your_private_key
ALIPAY_PUBLIC_KEY=your_public_key
ALIPAY_NOTIFY_URL=https://yourdomain.com/api/payment/notify/alipay
```

## 总结

### 已实现功能
- ✅ 完整的登录注册系统
- ✅ 验证码发送（开发环境）
- ✅ 密码重置功能
- ✅ 支付系统框架
- ✅ 二维码访问
- ✅ 用户认证和会话管理
- ✅ 后端API服务

### 需要第三方服务支持的功能
- ⚠️ 真实短信发送（需要短信服务商）
- ⚠️ 真实支付功能（需要支付平台）
- ⚠️ 外网访问（需要云服务器或内网穿透）

### 可以继续完善的功能
- 📝 数据库优化（使用MySQL和Redis）
- 📝 部署到生产环境
- 📝 配置HTTPS
- 📝 添加更多支付方式
- 📝 完善订单管理
- 📝 添加数据统计和分析

## 技术支持

如有问题，请参考：
- 阿里云文档：https://help.aliyun.com
- 腾讯云文档：https://cloud.tencent.com/document
- 微信支付文档：https://pay.weixin.qq.com/wiki/doc/api/index.html
- 支付宝文档：https://opendocs.alipay.com/open