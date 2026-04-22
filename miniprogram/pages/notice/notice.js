// 公告页面逻辑
Page({
  onLoad: function(options) {
    // 页面加载时执行
    console.log('公告页面加载');
  },
  
  goBack: function() {
    // 返回上一页
    wx.navigateBack();
  },
  
  onNoticeTap: function(e) {
    // 点击公告
    const noticeId = e.currentTarget.dataset.id;
    console.log('点击公告:', noticeId);
    // 跳转到公告详情页面
    wx.navigateTo({
      url: '../noticeDetail/noticeDetail?id=' + noticeId
    });
  }
});