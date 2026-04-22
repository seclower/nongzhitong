// 设置页面逻辑
Page({
  data: {
    notificationEnabled: true,
    locationEnabled: true,
    cacheSize: '12.3MB'
  },
  
  onLoad: function(options) {
    // 页面加载时执行
    console.log('设置页面加载');
  },
  
  goBack: function() {
    // 返回上一页
    wx.navigateBack();
  },
  
  onNotificationToggle: function(e) {
    // 切换消息通知
    const enabled = e.detail.value;
    this.setData({
      notificationEnabled: enabled
    });
  },
  
  onLocationToggle: function(e) {
    // 切换位置权限
    const enabled = e.detail.value;
    this.setData({
      locationEnabled: enabled
    });
  },
  
  onClearCache: function() {
    // 清除缓存
    wx.showModal({
      title: '清除缓存',
      content: '确定要清除缓存吗？',
      success: (res) => {
        if (res.confirm) {
          // 模拟清除缓存
          this.setData({
            cacheSize: '0MB'
          });
          wx.showToast({
            title: '缓存已清除',
            icon: 'success'
          });
        }
      }
    });
  },
  
  onAbout: function() {
    // 关于我们
    console.log('关于我们');
    wx.showToast({
      title: '关于我们',
      icon: 'success'
    });
  },
  
  onPrivacyPolicy: function() {
    // 隐私政策
    console.log('隐私政策');
    wx.showToast({
      title: '隐私政策',
      icon: 'success'
    });
  },
  
  onTerms: function() {
    // 用户协议
    console.log('用户协议');
    wx.showToast({
      title: '用户协议',
      icon: 'success'
    });
  }
});