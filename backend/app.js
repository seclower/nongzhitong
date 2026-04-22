// 后端服务入口
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

console.log('开始启动农智通后端服务...');

// 创建Express应用
const app = express();

// 安全中间件
app.use(helmet({
  contentSecurityPolicy: false, // 允许内联脚本
  crossOriginEmbedderPolicy: false
}));

// CORS配置
app.use(cors({
  origin: '*', // 允许所有来源，生产环境应限制
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 请求体解析
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 静态文件服务
app.use(express.static('../user'));

// 速率限制
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100, // 每个IP最多100个请求
  message: { message: '请求过于频繁，请稍后再试' }
});
app.use('/api/', limiter);

// API路由
try {
  const authRoutes = require('./routes/auth');
  const paymentRoutes = require('./routes/payment');
  const userRoutes = require('./routes/user');
  const productRoutes = require('./routes/product');
  const orderRoutes = require('./routes/order');
  const categoryRoutes = require('./routes/category');
  const adminRoutes = require('./routes/admin');
  
  app.use('/api/auth', authRoutes);
  app.use('/api/payment', paymentRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/orders', orderRoutes);
  app.use('/api/categories', categoryRoutes);
  app.use('/api/admin', adminRoutes);
  
  console.log('API路由注册成功');
} catch (error) {
  console.error('路由注册失败:', error);
}

// 健康检查
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: '农智通后端服务运行正常',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    uptime: process.uptime()
  });
});

// 404处理
app.use((req, res) => {
  res.status(404).json({ message: '请求的资源不存在' });
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error('服务器错误:', err);
  res.status(err.status || 500).json({
    message: err.message || '服务器内部错误',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// 导入数据库模型并初始化
const db = require('./models');
const { syncDatabase } = db;

// 启动服务器
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

async function startServer() {
  try {
    // 初始化数据库（使用SQLite，无需额外安装）
    await syncDatabase();
    
    const server = app.listen(PORT, HOST, () => {
      console.log('='.repeat(50));
      console.log('农智通后端服务启动成功');
      console.log('='.repeat(50));
      console.log(`服务器地址: http://localhost:${PORT}`);
      console.log(`健康检查: http://localhost:${PORT}/health`);
      console.log(`前端界面: http://localhost:${PORT}/user/index.html`);
      console.log('='.repeat(50));
    });
    
    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`端口 ${PORT} 已被占用，请先关闭占用该端口的程序或修改端口`);
      } else {
        console.error('服务器启动失败:', error);
      }
      process.exit(1);
    });
    
    // 优雅关闭
    process.on('SIGTERM', () => {
      console.log('收到关闭信号，正在停止服务器...');
      server.close(() => {
        console.log('服务器已停止');
        process.exit(0);
      });
    });
    
    process.on('SIGINT', () => {
      console.log('收到关闭信号，正在停止服务器...');
      server.close(() => {
        console.log('服务器已停止');
        process.exit(0);
      });
    });
  } catch (error) {
    console.error('服务器启动失败:', error);
    process.exit(1);
  }
}

startServer();

module.exports = app;