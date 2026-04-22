// 个人中心页面逻辑
Page({
  data: {
    isLoggedIn: false,
    userInfo: {
      name: '',
      phone: '',
      avatar: ''
    }
  },
  
  onLoad: function(options) {
    // 页面加载时执行
    console.log('个人中心页面加载');
    this.checkLoginStatus();
  },
  
  onShow: function() {
    // 页面显示时执行
    console.log('个人中心页面显示');
    this.checkLoginStatus();
  },
  
  checkLoginStatus: function() {
    // 检查登录状态
    const app = getApp();
    this.setData({
      isLoggedIn: app.globalData.isLoggedIn,
      userInfo: app.globalData.userInfo || {
        name: '',
        phone: '',
        avatar: ''
      }
    });
  },
  
  onUserInfoTap: function() {
    // 点击用户信息区域
    if (!this.data.isLoggedIn) {
      // 未登录，跳转到登录页面
      wx.navigateTo({
        url: '../login/login'
      });
    } else {
      // 已登录，跳转到个人信息编辑页面
      console.log('跳转到个人信息编辑页面');
    }
  },
  
  onOrderTypeTap: function(e) {
    // 点击订单类型
    const type = e.currentTarget.dataset.type;
    console.log('点击订单类型:', type);
    // 跳转到订单页面
    wx.navigateTo({
      url: '../order/order?type=' + type
    });
  },
  
  onFunctionTap: function(e) {
    // 点击功能项
    const key = e.currentTarget.dataset.key;
    console.log('点击功能项:', key);
    
    if (!this.data.isLoggedIn) {
      // 未登录，跳转到登录页面
      wx.navigateTo({
        url: '../login/login'
      });
      return;
    }
    
    // 根据不同的功能项跳转到不同的页面
    switch (key) {
      case 'address':
        console.log('跳转到收货地址页面');
        wx.navigateTo({
          url: '../address/address'
        });
        break;
      case 'favorites':
        console.log('跳转到我的收藏页面');
        wx.navigateTo({
          url: '../favorites/favorites'
        });
        break;
      case 'coupons':
        console.log('跳转到优惠券页面');
        wx.navigateTo({
          url: '../coupons/coupons'
        });
        break;
      case 'help':
        console.log('跳转到帮助中心页面');
        wx.navigateTo({
          url: '../help/help'
        });
        break;
      case 'settings':
        console.log('跳转到设置页面');
        wx.navigateTo({
          url: '../settings/settings'
        });
        break;
      case 'aiAssistant':
        wx.showToast({
          title: 'AI语音助手功能',
          icon: 'success'
        });
        console.log('打开AI语音助手');
        break;
      case 'sowingReminder':
        wx.showToast({
          title: '播种提醒功能',
          icon: 'success'
        });
        console.log('打开播种提醒');
        break;
      case 'plantingScience':
        wx.showToast({
          title: '种植科普功能',
          icon: 'success'
        });
        console.log('打开种植科普');
        break;
      case 'digitalExhibition':
        wx.showToast({
          title: '数字展览馆功能',
          icon: 'success'
        });
        console.log('打开数字展览馆');
        break;
      case 'blockchainTrace':
        wx.showToast({
          title: '区块链溯源查询',
          icon: 'success'
        });
        console.log('打开区块链溯源查询');
        break;
      default:
        break;
    }
  },
  
  onLogout: function() {
    // 退出登录
    wx.showModal({
      title: '退出登录',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          // 清除登录状态
          const app = getApp();
          app.globalData.isLoggedIn = false;
          app.globalData.token = '';
          app.globalData.userInfo = null;
          
          // 清除本地存储
          wx.removeStorageSync('token');
          wx.removeStorageSync('userInfo');
          
          // 更新页面状态
          this.setData({
            isLoggedIn: false,
            userInfo: {
              name: '',
              phone: '',
              avatar: ''
            }
          });
          
          wx.showToast({
            title: '退出登录成功',
            icon: 'success'
          });
        }
      }
    });
  }
});