// 门店选择页面逻辑
Page({
  data: {
    searchText: ''
  },
  
  onLoad: function(options) {
    // 页面加载时执行
    console.log('门店选择页面加载');
  },
  
  onBack: function() {
    // 返回上一页
    wx.navigateBack({
      delta: 1
    });
  },
  
  onSearchInput: function(e) {
    // 搜索输入
    this.setData({
      searchText: e.detail.value
    });
  },
  
  onSearch: function() {
    // 搜索门店
    console.log('搜索门店:', this.data.searchText);
    // 实际项目中这里会调用API搜索门店
  },
  
  onStoreSelect: function(e) {
    // 选择门店
    const storeId = e.currentTarget.dataset.storeId;
    console.log('选择门店:', storeId);
    
    // 模拟选择门店后返回首页
    wx.showToast({
      title: '已选择门店',
      icon: 'success',
      duration: 1500,
      success: function() {
        setTimeout(function() {
          wx.navigateBack({
            delta: 1
          });
        }, 1500);
      }
    });
  }
});