// 分类路由
const express = require('express');
const router = express.Router();
const { Category } = require('../models');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

// 获取分类列表
router.get('/list', async (req, res) => {
  try {
    const categories = await Category.findAll({
      order: [['level', 'ASC'], ['id', 'ASC']]
    });
    
    res.json({
      message: '获取分类列表成功',
      data: categories
    });
  } catch (error) {
    res.status(500).json({ message: '服务器错误', error });
  }
});

// 获取分类详情
router.get('/detail/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: '分类不存在' });
    }
    
    res.json({
      message: '获取分类详情成功',
      data: category
    });
  } catch (error) {
    res.status(500).json({ message: '服务器错误', error });
  }
});

// 创建分类
router.post('/create', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { name, parentId, level } = req.body;
    
    const category = await Category.create({
      name,
      parentId,
      level
    });
    
    res.json({
      message: '创建分类成功',
      data: category
    });
  } catch (error) {
    res.status(500).json({ message: '服务器错误', error });
  }
});

// 更新分类
router.put('/update/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, parentId, level, status } = req.body;
    
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: '分类不存在' });
    }
    
    await category.update({ name, parentId, level, status });
    
    res.json({
      message: '更新分类成功',
      data: category
    });
  } catch (error) {
    res.status(500).json({ message: '服务器错误', error });
  }
});

// 删除分类
router.delete('/delete/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: '分类不存在' });
    }
    
    await category.destroy();
    
    res.json({
      message: '删除分类成功'
    });
  } catch (error) {
    res.status(500).json({ message: '服务器错误', error });
  }
});

module.exports = router;