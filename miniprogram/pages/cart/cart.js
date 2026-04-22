// 购物车页面逻辑
Page({
  data: {
    cartItems: [],
    selectAll: false,
    totalPrice: 0.00,
    selectedCount: 0
  },
  
  onLoad: function(options) {
    // 页面加载时执行
    console.log('购物车页面加载');
    this.loadCartItems();
  },
  
  onShow: function() {
    // 页面显示时执行
    console.log('购物车页面显示');
    this.loadCartItems();
  },
  
  loadCartItems: function() {
    // 从全局数据中加载购物车商品
    const app = getApp();
    const cartItems = app.globalData.cartItems;
    
    this.setData({
      cartItems: cartItems
    });
    
    this.calculateTotal();
  },
  
  calculateTotal: function() {
    // 计算总价和选中数量
    const cartItems = this.data.cartItems;
    let totalPrice = 0;
    let selectedCount = 0;
    let selectAll = true;
    
    cartItems.forEach(item => {
      if (item.checked) {
        totalPrice += item.price * item.quantity;
        selectedCount++;
      } else {
        selectAll = false;
      }
    });
    
    this.setData({
      totalPrice: totalPrice.toFixed(2),
      selectedCount: selectedCount,
      selectAll: selectAll
    });
  },
  
  onCheckboxChange: function(e) {
    // 复选框变化
    const productId = e.currentTarget.dataset.id;
    const cartItems = this.data.cartItems;
    const app = getApp();
    
    cartItems.forEach(item => {
      if (item.id === productId) {
        item.checked = !item.checked;
      }
    });
    
    // 更新全局数据
    app.globalData.cartItems = cartItems;
    
    this.setData({
      cartItems: cartItems
    });
    
    this.calculateTotal();
  },
  
  onSelectAllChange: function(e) {
    // 全选变化
    const selectAll = e.detail.value[0] !== undefined;
    const cartItems = this.data.cartItems;
    const app = getApp();
    
    cartItems.forEach(item => {
      item.checked = selectAll;
    });
    
    // 更新全局数据
    app.globalData.cartItems = cartItems;
    
    this.setData({
      cartItems: cartItems,
      selectAll: selectAll
    });
    
    this.calculateTotal();
  },
  
  onDecrease: function(e) {
    // 减少数量
    const productId = e.currentTarget.dataset.id;
    const cartItems = this.data.cartItems;
    const app = getApp();
    
    cartItems.forEach(item => {
      if (item.id === productId && item.quantity > 1) {
        item.quantity--;
      }
    });
    
    // 更新全局数据
    app.globalData.cartItems = cartItems;
    
    this.setData({
      cartItems: cartItems
    });
    
    this.calculateTotal();
  },
  
  onIncrease: function(e) {
    // 增加数量
    const productId = e.currentTarget.dataset.id;
    const cartItems = this.data.cartItems;
    const app = getApp();
    
    cartItems.forEach(item => {
      if (item.id === productId) {
        item.quantity++;
      }
    });
    
    // 更新全局数据
    app.globalData.cartItems = cartItems;
    
    this.setData({
      cartItems: cartItems
    });
    
    this.calculateTotal();
  },
  
  onDelete: function(e) {
    // 删除商品
    const productId = e.currentTarget.dataset.id;
    const cartItems = this.data.cartItems.filter(item => item.id !== productId);
    const app = getApp();
    
    // 更新全局数据
    app.globalData.cartItems = cartItems;
    
    this.setData({
      cartItems: cartItems
    });
    
    this.calculateTotal();
  },
  
  onCheckout: function() {
    // 结算
    const selectedItems = this.data.cartItems.filter(item => item.checked);
    
    if (selectedItems.length === 0) {
      wx.showToast({
        title: '请选择商品',
        icon: 'none'
      });
      return;
    }
    
    console.log('结算商品:', selectedItems);
    // 跳转到订单页面
    wx.navigateTo({
      url: '../order/order'
    });
  }
});