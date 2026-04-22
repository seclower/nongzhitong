// 活动页面逻辑
Page({
  data: {
    activityProducts: [
      {
        id: 1,
        name: '三浦百灵6%春雷霉素番茄叶霉黄瓜角斑病 溃疡青枯软腐病杀菌剂农药',
        price: 6.00,
        originalPrice: 8.00,
        image: 'D:\\M\\新建相册\\农药1.png'
      },
      {
        id: 2,
        name: '瀚生品星40%氟硅唑乳油黄瓜黑星病农药 内吸性杀菌剂保护治疗铲除',
        price: 40.00,
        originalPrice: 50.00,
        image: 'D:\\M\\新建相册\\农药1.png'
      },
      {
        id: 3,
        name: '巴斯夫格力高溴虫氟苯双酰胺 黄条跳甲棉铃虫蓟马青虫杀虫剂农药',
        price: 100.00,
        originalPrice: 120.00,
        image: 'D:\\M\\新建相册\\农药1.png'
      },
      {
        id: 4,
        name: '国光毒箭5%氯氰菊酯果树烟草地 老虎青虫地下害虫钻心虫农药杀虫剂',
        price: 6.00,
        originalPrice: 8.00,
        image: 'D:\\M\\新建相册\\农药1.png'
      }
    ]
  },
  
  onLoad: function(options) {
    // 页面加载时执行
    console.log('活动页面加载');
  },
  
  onBack: function() {
    // 返回上一页
    wx.navigateBack({
      delta: 1
    });
  },
  
  goToProductDetail: function(e) {
    // 跳转到产品详情页面
    const id = e.currentTarget.dataset.id;
    console.log('产品点击:', id);
    wx.navigateTo({
      url: '../productDetail/productDetail?id=' + id
    });
  }
});