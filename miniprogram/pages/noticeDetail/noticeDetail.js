// 公告详情页面逻辑
Page({
  onLoad: function(options) {
    // 页面加载时执行
    console.log('公告详情页面加载', options);
  },
  
  goBack: function() {
    // 返回上一页
    wx.navigateBack();
  }
});