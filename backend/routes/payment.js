// 支付路由
const express = require('express');
const router = express.Router();
const { Order } = require('../models');
const { authenticateToken } = require('../middleware/auth');

// 支付配置（实际使用时需要替换为真实的支付配置）
const paymentConfig = {
    // 微信支付配置
    wechat: {
        appId: process.env.WECHAT_APP_ID || '',
        mchId: process.env.WECHAT_MCH_ID || '',
        apiKey: process.env.WECHAT_API_KEY || '',
        notifyUrl: process.env.WECHAT_NOTIFY_URL || ''
    },
    // 支付宝配置
    alipay: {
        appId: process.env.ALIPAY_APP_ID || '',
        privateKey: process.env.ALIPAY_PRIVATE_KEY || '',
        publicKey: process.env.ALIPAY_PUBLIC_KEY || '',
        notifyUrl: process.env.ALIPAY_NOTIFY_URL || ''
    }
};

// 创建支付订单
router.post('/create', authenticateToken, async (req, res) => {
  try {
    const { orderId, amount, paymentMethod, returnUrl, notifyUrl } = req.body;
    
    // 验证订单
    const order = await Order.findOne({ where: { id: orderId, userId: req.user.id } });
    if (!order) {
      return res.status(404).json({ message: '订单不存在' });
    }
    
    if (order.status !== 'pending') {
      return res.status(400).json({ message: '订单状态不允许支付' });
    }
    
    // 验证金额
    if (Math.abs(amount - order.totalAmount) > 0.01) {
      return res.status(400).json({ message: '支付金额不正确' });
    }
    
    // 根据支付方式创建支付
    let paymentResult;
    switch (paymentMethod) {
      case 'wechat':
        paymentResult = await createWechatPayment(order, amount, notifyUrl);
        break;
      case 'alipay':
        paymentResult = await createAlipayPayment(order, amount, returnUrl, notifyUrl);
        break;
      case 'balance':
        paymentResult = await createBalancePayment(order, amount, req.user.id);
        break;
      default:
        return res.status(400).json({ message: '不支持的支付方式' });
    }
    
    // 更新订单支付信息
    order.paymentMethod = paymentMethod;
    order.paymentStatus = 'processing';
    await order.save();
    
    res.json({
      message: '支付订单创建成功',
      payment: paymentResult
    });
  } catch (error) {
    console.error('创建支付订单失败:', error);
    res.status(500).json({ message: '创建支付订单失败', error });
  }
});

// 创建微信支付（模拟）
async function createWechatPayment(order, amount, notifyUrl) {
  // 实际使用时需要调用微信支付API
  // 这里返回模拟数据
  return {
    method: 'wechat',
    paymentId: `WX${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
    amount: amount,
    qrCode: `weixin://wxpay/bizpayurl?pr=${encodeURIComponent(JSON.stringify({
      appId: paymentConfig.wechat.appId,
      timeStamp: Date.now(),
      nonceStr: Math.random().toString(36).substr(2),
      package: `prepay_id=wx${Date.now()}`,
      signType: 'MD5'
    }))}`,
    // 实际使用时需要返回真实的支付参数
    params: {
      appId: paymentConfig.wechat.appId,
      timeStamp: Date.now().toString(),
      nonceStr: Math.random().toString(36).substr(2),
      package: `prepay_id=wx${Date.now()}`,
      signType: 'MD5',
      paySign: 'mock_sign' // 实际使用时需要生成真实签名
    }
  };
}

// 创建支付宝支付（模拟）
async function createAlipayPayment(order, amount, returnUrl, notifyUrl) {
  // 实际使用时需要调用支付宝API
  return {
    method: 'alipay',
    paymentId: `ALI${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
    amount: amount,
    qrCode: `https://qr.alipay.com/${amount}`,
    formUrl: `https://openapi.alipay.com/gateway.do?${encodeURIComponent(JSON.stringify({
      app_id: paymentConfig.alipay.appId,
      method: 'alipay.trade.page.pay',
      charset: 'utf-8',
      sign_type: 'RSA2',
      timestamp: new Date().toISOString(),
      version: '1.0',
      notify_url: notifyUrl,
      return_url: returnUrl,
      biz_content: JSON.stringify({
        out_trade_no: order.id,
        product_code: 'FAST_INSTANT_TRADE_PAY',
        total_amount: amount,
        subject: order.orderNo,
        body: '农智通订单支付'
      })
    }))}`,
    // 实际使用时需要返回真实的支付表单
    params: {
      appId: paymentConfig.alipay.appId,
      method: 'alipay.trade.page.pay',
      charset: 'utf-8',
      signType: 'RSA2',
      timestamp: new Date().toISOString(),
      version: '1.0',
      notifyUrl: notifyUrl,
      returnUrl: returnUrl,
      bizContent: {
        outTradeNo: order.id,
        productCode: 'FAST_INSTANT_TRADE_PAY',
        totalAmount: amount,
        subject: order.orderNo,
        body: '农智通订单支付'
      }
    }
  };
}

// 创建余额支付
async function createBalancePayment(order, amount, userId) {
  const { User } = require('../models');
  
  const user = await User.findOne({ where: { id: userId } });
  if (!user) {
    throw new Error('用户不存在');
  }
  
  if (user.balance < amount) {
    throw new Error('余额不足');
  }
  
  // 扣除余额
  user.balance -= amount;
  await user.save();
  
  return {
    method: 'balance',
    paymentId: `BAL${Date.now()}`,
    amount: amount,
    status: 'success'
  };
}

// 支付回调（微信）
router.post('/notify/wechat', async (req, res) => {
  try {
    // 验证签名
    const isValid = verifyWechatSign(req.body);
    if (!isValid) {
      return res.status(400).send('FAIL');
    }
    
    // 处理支付结果
    const { out_trade_no, transaction_id, total_fee, result_code } = req.body;
    
    if (result_code === 'SUCCESS') {
      await handlePaymentSuccess(out_trade_no, transaction_id, total_fee / 100, 'wechat');
    }
    
    res.send('SUCCESS');
  } catch (error) {
    console.error('微信支付回调处理失败:', error);
    res.status(500).send('FAIL');
  }
});

// 支付回调（支付宝）
router.post('/notify/alipay', async (req, res) => {
  try {
    // 验证签名
    const isValid = verifyAlipaySign(req.body);
    if (!isValid) {
      return res.send('failure');
    }
    
    // 处理支付结果
    const { out_trade_no, trade_no, total_amount, trade_status } = req.body;
    
    if (trade_status === 'TRADE_SUCCESS' || trade_status === 'TRADE_FINISHED') {
      await handlePaymentSuccess(out_trade_no, trade_no, parseFloat(total_amount), 'alipay');
    }
    
    res.send('success');
  } catch (error) {
    console.error('支付宝回调处理失败:', error);
    res.send('failure');
  }
});

// 处理支付成功
async function handlePaymentSuccess(orderId, transactionId, amount, paymentMethod) {
  const order = await Order.findOne({ where: { id: orderId } });
  if (!order) {
    throw new Error('订单不存在');
  }
  
  // 更新订单状态
  order.paymentStatus = 'paid';
  order.paymentId = transactionId;
  order.paidAmount = amount;
  order.status = 'paid';
  order.paidAt = new Date();
  await order.save();
  
  console.log(`订单 ${orderId} 支付成功，金额: ${amount}，方式: ${paymentMethod}`);
}

// 验证微信签名（模拟）
function verifyWechatSign(data) {
  // 实际使用时需要实现真实的签名验证
  return true;
}

// 验证支付宝签名（模拟）
function verifyAlipaySign(data) {
  // 实际使用时需要实现真实的签名验证
  return true;
}

// 查询支付状态
router.get('/status/:orderId', authenticateToken, async (req, res) => {
  try {
    const { orderId } = req.params;
    
    const order = await Order.findOne({ 
      where: { id: orderId, userId: req.user.id } 
    });
    
    if (!order) {
      return res.status(404).json({ message: '订单不存在' });
    }
    
    res.json({
      orderId: order.id,
      orderNo: order.orderNo,
      paymentStatus: order.paymentStatus,
      paidAmount: order.paidAmount,
      status: order.status
    });
  } catch (error) {
    console.error('查询支付状态失败:', error);
    res.status(500).json({ message: '查询支付状态失败', error });
  }
});

// 退款
router.post('/refund', authenticateToken, async (req, res) => {
  try {
    const { orderId, amount, reason } = req.body;
    
    const order = await Order.findOne({ 
      where: { id: orderId, userId: req.user.id } 
    });
    
    if (!order) {
      return res.status(404).json({ message: '订单不存在' });
    }
    
    if (order.paymentStatus !== 'paid') {
      return res.status(400).json({ message: '订单未支付，无法退款' });
    }
    
    if (amount > order.paidAmount) {
      return res.status(400).json({ message: '退款金额不能超过支付金额' });
    }
    
    // 根据支付方式调用退款API
    let refundResult;
    switch (order.paymentMethod) {
      case 'wechat':
        refundResult = await wechatRefund(order, amount, reason);
        break;
      case 'alipay':
        refundResult = await alipayRefund(order, amount, reason);
        break;
      default:
        return res.status(400).json({ message: '不支持的退款方式' });
    }
    
    // 更新订单状态
    order.status = 'refunded';
    order.refundAmount = (order.refundAmount || 0) + amount;
    order.refundReason = reason;
    await order.save();
    
    res.json({
      message: '退款申请成功',
      refund: refundResult
    });
  } catch (error) {
    console.error('退款失败:', error);
    res.status(500).json({ message: '退款失败', error });
  }
});

// 微信退款（模拟）
async function wechatRefund(order, amount, reason) {
  return {
    refundId: `WXREF${Date.now()}`,
    amount: amount,
    status: 'processing'
  };
}

// 支付宝退款（模拟）
async function alipayRefund(order, amount, reason) {
  return {
    refundId: `ALIREF${Date.now()}`,
    amount: amount,
    status: 'processing'
  };
}

module.exports = router;