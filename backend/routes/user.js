// 用户路由
const express = require('express');
const router = express.Router();
const { User } = require('../models');
const { verifyToken, verifyUser } = require('../middleware/auth');

// 获取用户信息
router.get('/info/:id', verifyToken, verifyUser, async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findByPk(id, {
      attributes: ['id', 'username', 'name', 'phone', 'address', 'role', 'status', 'createdAt']
    });
    
    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }
    
    res.json({
      message: '获取用户信息成功',
      data: user
    });
  } catch (error) {
    res.status(500).json({ message: '服务器错误', error });
  }
});

// 更新用户信息
router.put('/update/:id', verifyToken, verifyUser, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, address } = req.body;
    
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }
    
    await user.update({ name, phone, address });
    
    res.json({
      message: '更新用户信息成功',
      data: user
    });
  } catch (error) {
    res.status(500).json({ message: '服务器错误', error });
  }
});

// 修改密码
router.put('/change-password/:id', verifyToken, verifyUser, async (req, res) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;
    
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }
    
    // 验证旧密码
    const isValidPassword = await user.validatePassword(oldPassword);
    if (!isValidPassword) {
      return res.status(400).json({ message: '旧密码错误' });
    }
    
    // 更新密码
    await user.update({ password: newPassword });
    
    res.json({
      message: '修改密码成功'
    });
  } catch (error) {
    res.status(500).json({ message: '服务器错误', error });
  }
});

module.exports = router;