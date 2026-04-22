// 收货地址页面逻辑
Page({
  data: {
    addresses: [
      {
        id: 1,
        name: '张三',
        phone: '138****8888',
        province: '辽宁省',
        city: '沈阳市',
        district: '皇姑区',
        detail: '长江街123号，辽宁大学，110036',
        isDefault: true
      },
      {
        id: 2,
        name: '李四',
        phone: '139****9999',
        province: '辽宁省',
        city: '沈阳市',
        district: '浑南区',
        detail: '浑南大道456号，沈阳理工大学，110168',
        isDefault: false
      }
    ]
  },
  
  onLoad: function(options) {
    // 页面加载时执行
    console.log('收货地址页面加载');
  },
  
  goBack: function() {
    // 返回上一页
    wx.navigateBack();
  },
  
  addAddress: function() {
    // 添加新地址
    console.log('添加新地址');
    wx.showToast({
      title: '添加新地址功能',
      icon: 'success'
    });
  },
  
  editAddress: function(e) {
    // 编辑地址
    const addressId = e.currentTarget.dataset.id;
    console.log('编辑地址:', addressId);
    wx.showToast({
      title: '编辑地址功能',
      icon: 'success'
    });
  },
  
  deleteAddress: function(e) {
    // 删除地址
    const addressId = e.currentTarget.dataset.id;
    console.log('删除地址:', addressId);
    
    wx.showModal({
      title: '删除地址',
      content: '确定要删除这个地址吗？',
      success: (res) => {
        if (res.confirm) {
          // 模拟删除地址
          this.setData({
            addresses: this.data.addresses.filter(item => item.id !== addressId)
          });
          wx.showToast({
            title: '地址已删除',
            icon: 'success'
          });
        }
      }
    });
  },
  
  setDefault: function(e) {
    // 设置默认地址
    const addressId = e.currentTarget.dataset.id;
    console.log('设置默认地址:', addressId);
    
    // 模拟设置默认地址
    const addresses = this.data.addresses.map(item => ({
      ...item,
      isDefault: item.id === addressId
    }));
    
    this.setData({
      addresses: addresses
    });
    
    wx.showToast({
      title: '已设置为默认地址',
      icon: 'success'
    });
  }
});