// 优惠券页面逻辑
Page({
  data: {
    validCoupons: [
      {
        id: 1,
        title: '满100元减20元',
        value: 20,
        minAmount: 100,
        expiryDate: '2026-12-31',
        status: 'valid'
      },
      {
        id: 2,
        title: '满50元减10元',
        value: 10,
        minAmount: 50,
        expiryDate: '2026-06-30',
        status: 'valid'
      }
    ],
    expiredCoupons: [
      {
        id: 3,
        title: '满80元减15元',
        value: 15,
        minAmount: 80,
        expiryDate: '2026-03-31',
        status: 'expired'
      }
    ]
  },
  
  onLoad: function(options) {
    // 页面加载时执行
    console.log('优惠券页面加载');
  },
  
  goBack: function() {
    // 返回上一页
    wx.navigateBack();
  }
});