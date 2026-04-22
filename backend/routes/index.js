// API路由
const express = require('express');
const router = express.Router();

// 导入路由
const authRoutes = require('./auth');
const userRoutes = require('./user');
const productRoutes = require('./product');
const orderRoutes = require('./order');
const categoryRoutes = require('./category');
const adminRoutes = require('./admin');

// 注册路由
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/product', productRoutes);
router.use('/order', orderRoutes);
router.use('/category', categoryRoutes);
router.use('/admin', adminRoutes);

module.exports = router;