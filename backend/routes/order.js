// 订单路由
const express = require('express');
const router = express.Router();
const { Order, OrderItem, Product, User } = require('../models');
const { Op } = require('sequelize');
const { verifyToken, verifyUser } = require('../middleware/auth');

// 创建订单
router.post('/create', verifyToken, async (req, res) => {
  try {
    const { userId, items, totalAmount, shippingAddress, shippingPhone, notes, paymentMethod } = req.body;
    
    // 验证用户权限
    if (req.user.role !== 'admin' && req.user.id !== userId) {
      return res.status(403).json({ message: '权限不足' });
    }
    
    // 开始事务
    const transaction = await Order.sequelize.transaction();
    
    try {
      // 创建订单
      const order = await Order.create({
        userId,
        totalAmount,
        shippingAddress,
        shippingPhone,
        notes,
        paymentMethod
      }, { transaction });
      
      // 创建订单项
      for (const item of items) {
        const product = await Product.findByPk(item.productId, { transaction });
        if (!product) {
          throw new Error(`产品 ${item.productId} 不存在`);
        }
        
        // 检查库存
        if (product.stock < item.quantity) {
          throw new Error(`产品 ${product.name} 库存不足`);
        }
        
        // 扣减库存
        await product.update({ stock: product.stock - item.quantity }, { transaction });
        
        // 增加销量
        await product.update({ sales: product.sales + item.quantity }, { transaction });
        
        // 创建订单项
        await OrderItem.create({
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price
        }, { transaction });
      }
      
      // 提交事务
      await transaction.commit();
      
      res.json({
        message: '创建订单成功',
        data: order
      });
    } catch (error) {
      // 回滚事务
      await transaction.rollback();
      res.status(400).json({ message: error.message });
    }
  } catch (error) {
    res.status(500).json({ message: '服务器错误', error });
  }
});

// 获取订单列表
router.get('/list', verifyToken, async (req, res) => {
  try {
    const { page = 1, pageSize = 10, userId, status } = req.query;
    
    const where = {};
    if (userId) {
      where.userId = userId;
    }
    if (status) {
      where.status = status;
    }
    
    // 非管理员只能查看自己的订单
    if (req.user.role !== 'admin' && !userId) {
      where.userId = req.user.id;
    }
    
    const { count, rows } = await Order.findAndCountAll({
      where,
      include: [
        { model: User },
        { model: OrderItem, include: [{ model: Product }] }
      ],
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

// 获取订单详情
router.get('/detail/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const order = await Order.findByPk(id, {
      include: [
        { model: User },
        { model: OrderItem, include: [{ model: Product }] }
      ]
    });
    
    if (!order) {
      return res.status(404).json({ message: '订单不存在' });
    }
    
    // 验证用户权限
    if (req.user.role !== 'admin' && req.user.id !== order.userId) {
      return res.status(403).json({ message: '权限不足' });
    }
    
    res.json({
      message: '获取订单详情成功',
      data: order
    });
  } catch (error) {
    res.status(500).json({ message: '服务器错误', error });
  }
});

// 更新订单状态
router.put('/update/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, paymentStatus } = req.body;
    
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: '订单不存在' });
    }
    
    // 验证用户权限
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: '权限不足' });
    }
    
    // 更新订单状态
    await order.update({ status, paymentStatus });
    
    res.json({
      message: '更新订单状态成功',
      data: order
    });
  } catch (error) {
    res.status(500).json({ message: '服务器错误', error });
  }
});

module.exports = router;