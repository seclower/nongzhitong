// 我的收藏页面逻辑
Page({
  data: {
    favorites: [
      {
        id: 1,
        name: '三浦百灵6%春雷霉素番茄叶霉黄瓜角斑病 溃疡青枯软腐病杀菌剂农药',
        price: 6.00,
        originalPrice: 8.00,
        sales: 50,
        image: 'D:\\M\\新建相册\\农药1.png'
      },
      {
        id: 2,
        name: '瀚生品星40%氟硅唑乳油黄瓜黑星病农药 内吸性杀菌剂保护治疗铲除',
        price: 40.00,
        originalPrice: 50.00,
        sales: 30,
        image: 'D:\\M\\新建相册\\农药1.png'
      },
      {
        id: 3,
        name: '巴斯夫格力高溴虫氟苯双酰胺 黄条跳甲棉铃虫蓟马青虫杀虫剂农药',
        price: 100.00,
        originalPrice: 120.00,
        sales: 20,
        image: 'D:\\M\\新建相册\\农药1.png'
      }
    ]
  },
  
  onLoad: function(options) {
    // 页面加载时执行
    console.log('我的收藏页面加载');
  },
  
  goBack: function() {
    // 返回上一页
    wx.navigateBack();
  },
  
  goToProductDetail: function(e) {
    // 跳转到产品详情页
    const productId = e.currentTarget.dataset.id;
    console.log('跳转到产品详情页:', productId);
    wx.navigateTo({
      url: '../productDetail/productDetail?id=' + productId
    });
  }
});