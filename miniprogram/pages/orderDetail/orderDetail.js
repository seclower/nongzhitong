// 订单详情页面逻辑
Page({
  data: {
    order: {}
  },
  
  onLoad: function(options) {
    // 页面加载时执行
    console.log('订单详情页面加载', options);
    const orderId = options.id;
    this.loadOrderDetail(orderId);
  },
  
  loadOrderDetail: function(orderId) {
    // 加载订单详情
    console.log('加载订单详情:', orderId);
    
    // 从全局数据中获取订单信息
    const app = getApp();
    const order = app.globalData.orders.find(order => order.id === Number(orderId));
    
    if (order) {
      // 构建订单详情数据
      const orderDetail = {
        id: order.id,
        status: order.status,
        statusText: {
          'pending': '待处理',
          'processing': '处理中',
          'completed': '已完成',
          'cancelled': '已取消'
        }[order.status],
        statusDesc: {
          'pending': '订单等待处理',
          'processing': '订单正在处理',
          'completed': '订单已完成，感谢您的购买',
          'cancelled': '订单已取消'
        }[order.status],
        total: order.totalAmount,
        subtotal: order.totalAmount,
        shippingFee: 0,
        time: order.createdAt,
        paymentMethod: '微信支付',
        shippingMethod: '快递配送',
        address: {
          name: '张三',
          phone: '13800138000',
          detail: '北京市朝阳区建国路88号SOHO现代城'
        },
        products: order.items.map(item => ({
          productId: item.id,
          name: item.productName,
          price: item.price,
          quantity: item.quantity
        }))
      };
      
      this.setData({
        order: orderDetail
      });
    } else {
      wx.showToast({
        title: '订单不存在',
        icon: 'none'
      });
    }
  },
  
  onCancelOrder: function() {
    // 取消订单
    wx.showModal({
      title: '取消订单',
      content: '确定要取消这个订单吗？',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '订单已取消',
            icon: 'success'
          });
          // 实际项目中这里会调用API取消订单
        }
      }
    });
  },
  
  onPayOrder: function() {
    // 支付订单
    wx.showToast({
      title: '支付功能开发中',
      icon: 'none'
    });
    // 实际项目中这里会调用支付API
  }
});