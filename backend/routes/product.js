// 产品路由
const express = require('express');
const router = express.Router();
const { Product, Category } = require('../models');
const { Op } = require('sequelize');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

// 获取产品列表
router.get('/list', async (req, res) => {
  try {
    const { page = 1, pageSize = 10, categoryId, keyword } = req.query;
    
    const where = {};
    if (categoryId) {
      where.categoryId = categoryId;
    }
    if (keyword) {
      where.name = { [Op.like]: `%${keyword}%` };
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

// 获取产品详情
router.get('/detail/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const product = await Product.findByPk(id, {
      include: [{ model: Category }]
    });
    
    if (!product) {
      return res.status(404).json({ message: '产品不存在' });
    }
    
    res.json({
      message: '获取产品详情成功',
      data: product
    });
  } catch (error) {
    res.status(500).json({ message: '服务器错误', error });
  }
});

// 获取热销产品
router.get('/hot', async (req, res) => {
  try {
    const products = await Product.findAll({
      order: [['sales', 'DESC']],
      limit: 10
    });
    
    res.json({
      message: '获取热销产品成功',
      data: products
    });
  } catch (error) {
    res.status(500).json({ message: '服务器错误', error });
  }
});

// 添加产品
router.post('/create', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { name, description, price, stock, categoryId, imageUrl } = req.body;
    
    const product = await Product.create({
      name,
      description,
      price,
      stock,
      categoryId,
      imageUrl
    });
    
    res.json({
      message: '添加产品成功',
      data: product
    });
  } catch (error) {
    res.status(500).json({ message: '服务器错误', error });
  }
});

// 修改产品
router.put('/update/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, categoryId, imageUrl, status } = req.body;
    
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: '产品不存在' });
    }
    
    await product.update({
      name,
      description,
      price,
      stock,
      categoryId,
      imageUrl,
      status
    });
    
    res.json({
      message: '修改产品成功',
      data: product
    });
  } catch (error) {
    res.status(500).json({ message: '服务器错误', error });
  }
});

// 删除产品
router.delete('/delete/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: '产品不存在' });
    }
    
    await product.destroy();
    
    res.json({
      message: '删除产品成功'
    });
  } catch (error) {
    res.status(500).json({ message: '服务器错误', error });
  }
});

module.exports = router;