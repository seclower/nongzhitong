// 超值拼团页面逻辑
Page({
  data: {
    groupBuyProducts: [
      {
        id: 1,
        name: '三浦百灵6%春雷霉素番茄叶霉黄瓜角斑病 溃疡青枯软腐病杀菌剂农药',
        groupPrice: 5.00,
        originalPrice: 8.00,
        progress: 70,
        image: 'D:\\M\\新建相册\\农药1.png'
      },
      {
        id: 2,
        name: '瀚生品星40%氟硅唑乳油黄瓜黑星病农药 内吸性杀菌剂保护治疗铲除',
        groupPrice: 35.00,
        originalPrice: 50.00,
        progress: 50,
        image: 'D:\\M\\新建相册\\农药1.png'
      },
      {
        id: 3,
        name: '华锦-尿素氮肥 适用于多种植物',
        groupPrice: 45.00,
        originalPrice: 60.00,
        progress: 80,
        image: 'D:\\M\\新建相册\\化肥1.png'
      },
      {
        id: 4,
        name: '国光络佳钙高含量钙肥 果树增加果实硬度 缓解缺钙裂果干烧心叶面肥',
        groupPrice: 12.00,
        originalPrice: 20.00,
        progress: 30,
        image: 'D:\\M\\新建相册\\农药1.png'
      }
    ]
  },
  
  onLoad: function(options) {
    // 页面加载时执行
    console.log('超值拼团页面加载');
    this.loadGroupBuyProducts();
  },
  
  loadGroupBuyProducts: function() {
    // 加载拼团商品数据
    console.log('加载拼团商品数据');
    // 实际项目中这里会调用API获取数据
  },
  
  goBack: function() {
    // 返回上一页
    wx.navigateBack();
  },
  
  onProductTap: function(e) {
    // 点击产品
    const productId = e.currentTarget.dataset.id;
    console.log('点击拼团产品:', productId);
    // 跳转到产品详情页
    wx.navigateTo({
      url: '../productDetail/productDetail?id=' + productId
    });
  },
  
  onJoinGroupBuy: function(e) {
    // 加入拼团
    const productId = e.currentTarget.dataset.id;
    console.log('加入拼团:', productId);
    wx.showToast({
      title: '加入拼团成功',
      icon: 'success'
    });
  }
});