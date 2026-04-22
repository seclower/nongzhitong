// 管理员路由
const express = require('express');
const router = express.Router();
const { User, Product, Order, Category } = require('../models');
const { Op } = require('sequelize');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

// 获取用户列表
router.get('/users', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { page = 1, pageSize = 10, keyword } = req.query;
    
    const where = {};
    if (keyword) {
      where[Op.or] = [
        { username: { [Op.like]: `%${keyword}%` } },
        { name: { [Op.like]: `%${keyword}%` } },
        { phone: { [Op.like]: `%${keyword}%` } }
      ];
    }
    
    const { count, rows } = await User.findAndCountAll({
      where,
      limit: parseInt(pageSize),
      offset: (parseInt(page) - 1) * parseInt(pageSize),
      order: [['createdAt', 'DESC']]
    });
    
    res.json({
      message: '获取用户列表成功',
      data: {
        list: rows,
        total: count,
        page: parseInt(page),
        pageSize: parseInt(pageSize)
      }
    });
  } catch (error) {
    res.status(500).json({ message: '服务器错误', error });
  }
});

// 管理产品
router.get('/products', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { page = 1, pageSize = 10, keyword, categoryId } = req.query;
    
    const where = {};
    if (keyword) {
      where.name = { [Op.like]: `%${keyword}%` };
    }
    if (categoryId) {
      where.categoryId = categoryId;
    }
    
    const { count, rows } = await Product.findAndCountAll({
      where,
      include: [{ model: Category }],
      limit: parseInt(pageSize),
      offset: (parseInt(page) - 1) * parseInt(pageSize),
      order: [['createdAt', 'DESC']]
    });
    
    res.json({
      message: '获取产品列表成功',
      data: {
        list: rows,
        total: count,
        page: parseInt(page),
        pageSize: parseInt(pageSize)
      }
    });
  } catch (error) {
    res.status(500).json({ message: '服务器错误', error });
  }
});

// 管理订单
router.get('/orders', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { page = 1, pageSize = 10, orderNo, status, userId } = req.query;
    
    const where = {};
    if (orderNo) {
      where.orderNo = { [Op.like]: `%${orderNo}%` };
    }
    if (status) {
      where.status = status;
    }
    if (userId) {
      where.userId = userId;
    }
    
    const { count, rows } = await Order.findAndCountAll({
      where,
      include: [{ model: User }],
      limit: parseInt(pageSize),
      offset: (parseInt(page) - 1) * parseInt(pageSize),
      order: [['createdAt', 'DESC']]
    });
    
    res.json({
      message: '获取订单列表成功',
      data: {
        list: rows,
        total: count,
        page: parseInt(page),
        pageSize: parseInt(pageSize)
      }
    });
  } catch (error) {
    res.status(500).json({ message: '服务器错误', error });
  }
});

// 获取数据统计
router.get('/stats', verifyToken, verifyAdmin, async (req, res) => {
  try {
    // 总用户数
    const userCount = await User.count({ where: { role: 'user' } });
    
    // 总产品数
    const productCount = await Product.count();
    
    // 总订单数
    const orderCount = await Order.count();
    
    // 总销售额
    const totalSales = await Order.sum('totalAmount', {
      where: { status: 'completed' }
    });
    
    // 今日订单数
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const todayOrderCount = await Order.count({
      where: {
        createdAt: {
          [Op.gte]: today,
          [Op.lt]: tomorrow
        }
      }
    });
    
    res.json({
      message: '获取数据统计成功',
      data: {
        userCount,
        productCount,
        orderCount,
        totalSales: totalSales || 0,
        todayOrderCount
      }
    });
  } catch (error) {
    res.status(500).json({ message: '服务器错误', error });
  }
});

module.exports = router;