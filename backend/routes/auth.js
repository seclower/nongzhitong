// 认证路由
const express = require('express');
const router = express.Router();
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../config');

// 验证码存储（生产环境应使用Redis）
const verificationCodes = new Map();

// 发送验证码
router.post('/send-code', async (req, res) => {
  try {
    const { phone } = req.body;
    
    // 验证手机号格式
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      return res.status(400).json({ message: '手机号格式不正确' });
    }
    
    // 生成6位验证码
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    // 存储验证码，5分钟有效
    verificationCodes.set(phone, {
      code,
      expiresAt: Date.now() + 5 * 60 * 1000
    });
    
    // 清理过期验证码
    setTimeout(() => {
      verificationCodes.delete(phone);
    }, 5 * 60 * 1000);
    
    // 这里应该调用短信服务商API发送验证码
    // 示例：阿里云、腾讯云、网易云信等
    console.log(`验证码发送到 ${phone}: ${code}`);
    
    res.json({
      message: '验证码已发送',
      // 开发环境返回验证码，生产环境应删除
      code: process.env.NODE_ENV === 'development' ? code : undefined
    });
  } catch (error) {
    console.error('发送验证码失败:', error);
    res.status(500).json({ message: '发送验证码失败', error });
  }
});

// 重置密码
router.post('/reset-password', async (req, res) => {
  try {
    const { phone, code, password } = req.body;
    
    // 检查数据库是否初始化
    if (!User) {
      return res.status(503).json({ message: '数据库服务不可用，请稍后再试' });
    }
    
    // 验证手机号格式
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      return res.status(400).json({ message: '手机号格式不正确' });
    }
    
    // 验证密码长度
    if (password.length < 6 || password.length > 20) {
      return res.status(400).json({ message: '密码长度应为6-20位' });
    }
    
    // 验证验证码
    const storedCode = verificationCodes.get(phone);
    if (!storedCode) {
      return res.status(400).json({ message: '验证码不存在或已过期' });
    }
    
    if (storedCode.code !== code) {
      return res.status(400).json({ message: '验证码不正确' });
    }
    
    if (storedCode.expiresAt < Date.now()) {
      verificationCodes.delete(phone);
      return res.status(400).json({ message: '验证码已过期' });
    }
    
    // 查找用户
    const user = await User.findOne({ where: { phone } });
    if (!user) {
      return res.status(404).json({ message: '该手机号未注册' });
    }
    
    // 更新密码
    user.password = password;
    await user.save();
    
    // 清除验证码
    verificationCodes.delete(phone);
    
    res.json({ message: '密码重置成功' });
  } catch (error) {
    console.error('重置密码失败:', error);
    res.status(500).json({ message: '重置密码失败', error });
  }
});

// 登录
router.post('/login', async (req, res) => {
  try {
    // 检查数据库是否初始化
    if (!User) {
      return res.status(503).json({ message: '数据库服务不可用，请稍后再试' });
    }
    
    const { username, password } = req.body;
    
    // 查找用户
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: '用户名或密码错误' });
    }
    
    // 验证密码
    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ message: '用户名或密码错误' });
    }
    
    // 生成JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );
    
    res.json({
      message: '登录成功',
      token,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: '服务器错误', error });
  }
});

// 注册
router.post('/register', async (req, res) => {
  try {
    // 检查数据库是否初始化
    if (!User) {
      return res.status(503).json({ message: '数据库服务不可用，请稍后再试' });
    }
    
    const { username, password, name, phone, address, code } = req.body;
    
    // 验证手机号格式
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      return res.status(400).json({ message: '手机号格式不正确' });
    }
    
    // 验证验证码
    const storedCode = verificationCodes.get(phone);
    if (!storedCode) {
      return res.status(400).json({ message: '验证码不存在或已过期' });
    }
    
    if (storedCode.code !== code) {
      return res.status(400).json({ message: '验证码不正确' });
    }
    
    if (storedCode.expiresAt < Date.now()) {
      verificationCodes.delete(phone);
      return res.status(400).json({ message: '验证码已过期' });
    }
    
    // 检查用户名是否已存在
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: '用户名已存在' });
    }
    
    // 检查手机号是否已存在
    const existingPhone = await User.findOne({ where: { phone } });
    if (existingPhone) {
      return res.status(400).json({ message: '该手机号已注册' });
    }
    
    // 创建用户
    const user = await User.create({
      username,
      password,
      name,
      phone,
      address,
      role: 'user'
    });
    
    // 清除验证码
    verificationCodes.delete(phone);
    
    // 生成JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );
    
    res.json({
      message: '注册成功',
      token,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: '服务器错误', error });
  }
});

// 验证token
router.post('/verify', async (req, res) => {
  try {
    // 检查数据库是否初始化
    if (!User) {
      return res.status(503).json({ message: '数据库服务不可用，请稍后再试' });
    }
    
    const { token } = req.body;
    
    // 验证token
    const decoded = jwt.verify(token, config.jwt.secret);
    
    // 查找用户
    const user = await User.findOne({ where: { id: decoded.id } });
    if (!user) {
      return res.status(401).json({ message: '用户不存在' });
    }
    
    res.json({
      message: 'token有效',
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error) {
    res.status(401).json({ message: 'token无效' });
  }
});

module.exports = router;