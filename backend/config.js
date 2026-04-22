// 配置文件
require('dotenv').config();

module.exports = {
  // 服务器配置
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || '0.0.0.0',
    env: process.env.NODE_ENV || 'development'
  },
  // 数据库配置
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USER || 'nongzhitong',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'nongzhitong',
    dialect: process.env.DB_DIALECT || 'sqlite',
    storage: process.env.DB_STORAGE || './nongzhitong.db',
    logging: process.env.DB_LOGGING === 'true' || false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  // JWT配置
  jwt: {
    secret: process.env.JWT_SECRET || 'nongzhitong-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    algorithm: process.env.JWT_ALGORITHM || 'HS256'
  },
  // Redis配置
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD || '',
    db: process.env.REDIS_DB || 0
  },
  // 日志配置
  logger: {
    level: process.env.LOG_LEVEL || 'info',
    format: process.env.LOG_FORMAT || 'json'
  },
  // 安全配置
  security: {
    rateLimit: {
      windowMs: process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000,
      max: process.env.RATE_LIMIT_MAX || 100
    },
    cors: {
      origin: process.env.CORS_ORIGIN || '*'
    }
  },
  // 文件上传配置
  upload: {
    maxSize: process.env.UPLOAD_MAX_SIZE || 10 * 1024 * 1024, // 10MB
    allowedTypes: process.env.UPLOAD_ALLOWED_TYPES || ['image/jpeg', 'image/png', 'image/gif']
  }
};