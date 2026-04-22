// 登录页面逻辑
Page({
  data: {
    username: '',
    password: ''
  },
  
  onLoad: function(options) {
    // 页面加载时执行
    console.log('登录页面加载');
  },
  
  onInputChange: function(e) {
    // 输入变化
    const key = e.currentTarget.dataset.key;
    const value = e.detail.value;
    this.setData({
      [key]: value
    });
  },
  
  onLogin: function(e) {
    // 登录提交
    const { username, password } = this.data;
    
    if (!username) {
      wx.showToast({
        title: '请输入用户名',
        icon: 'none'
      });
      return;
    }
    
    if (!password) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none'
      });
      return;
    }
    
    // 模拟登录验证
    if (username === '111' && password === '123456') {
      // 登录成功
      const app = getApp();
      app.globalData.isLoggedIn = true;
      app.globalData.token = 'mock-token';
      app.globalData.userInfo = {
        name: '测试用户',
        phone: '13800138000',
        avatar: ''
      };
      
      // 存储登录状态
      wx.setStorageSync('token', 'mock-token');
      wx.setStorageSync('userInfo', {
        name: '测试用户',
        phone: '13800138000',
        avatar: ''
      });
      
      wx.showToast({
        title: '登录成功',
        icon: 'success'
      });
      
      // 跳转到个人中心页面
      setTimeout(() => {
        wx.navigateBack();
      }, 1000);
    } else {
      // 登录失败
      wx.showToast({
        title: '用户名或密码错误',
        icon: 'none'
      });
    }
  }
});