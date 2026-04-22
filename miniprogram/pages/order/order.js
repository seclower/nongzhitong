// 订单页面逻辑
Page({
  data: {
    activeTab: 'all',
    orders: [
      {
        id: '20260413001',
        status: 'completed',
        statusText: '已完成',
        total: 128.00,
        time: '2026-04-13 10:30',
        products: [
          {
            productId: 1,
            name: '三浦百灵6%春雷霉素番茄叶霉黄瓜角斑病 溃疡青枯软腐病杀菌剂农药',
            price: 6.00,
            quantity: 2
          },
          {
            productId: 2,
            name: '瀚生品星40%氟硅唑乳油黄瓜黑星病农药 内吸性杀菌剂保护治疗铲除',
            price: 40.00,
            quantity: 3
          }
        ]
      },
      {
        id: '20260413002',
        status: 'pending',
        statusText: '待处理',
        total: 86.50,
        time: '2026-04-13 09:15',
        products: [
          {
            productId: 3,
            name: '巴斯夫格力高溴虫氟苯双酰胺 黄条跳甲棉铃虫蓟马青虫杀虫剂农药',
            price: 100.00,
            quantity: 1
          }
        ]
      },
      {
        id: '20260413003',
        status: 'shipping',
        statusText: '配送中',
        total: 256.00,
        time: '2026-04-13 08:45',
        products: [
          {
            productId: 4,
            name: '国光毒箭5%氯氰菊酯果树烟草地 老虎青虫地下害虫钻心虫农药杀虫剂',
            price: 6.00,
            quantity: 4
          },
          {
            productId: 5,
            name: '翰生金甲钢拳7%甲维盐顺氯杀虫剂 顺式氯氰菊酯甲氨基阿维菌素农药农用',
            price: 12.00,
            quantity: 20
          }
        ]
      }
    ]
  },
  
  onLoad: function(options) {
    // 页面加载时执行
    console.log('订单页面加载', options);
    if (options.type) {
      this.setData({
        activeTab: options.type
      });
    }
    this.loadOrders();
  },
  
  onShow: function() {
    // 页面显示时执行
    console.log('订单页面显示');
    this.loadOrders();
  },
  
  loadOrders: function() {
    // 加载订单数据
    console.log('加载订单数据');
    // 从全局数据中获取订单信息
    const app = getApp();
    const orders = app.globalData.orders.map(order => ({
      id: order.id,
      status: order.status,
      statusText: order.status,
      total: order.totalAmount,
      time: order.createTime,
      products: order.products.map(product => ({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: product.quantity
      }))
    }));
    
    this.setData({
      orders: orders
    });
  },
  
  onTabChange: function(e) {
    // 切换订单状态标签
    const tab = e.currentTarget.dataset.tab;
    this.setData({
      activeTab: tab
    });
    // 实际项目中这里会根据状态过滤订单
  },
  
  onOrderTap: function(e) {
    // 点击订单
    const orderId = e.currentTarget.dataset.id;
    console.log('点击订单:', orderId);
    // 跳转到订单详情页
    wx.navigateTo({
      url: '../orderDetail/orderDetail?id=' + orderId
    });
  }
});