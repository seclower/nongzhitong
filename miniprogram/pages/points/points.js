// 积分商城页面逻辑
Page({
  onLoad: function(options) {
    // 页面加载时执行
    console.log('积分商城页面加载');
  },
  
  goBack: function() {
    // 返回上一页
    wx.navigateBack();
  }
});