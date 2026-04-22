// 精彩团购页面逻辑
Page({
  data: {
    grouponProducts: [
      {
        id: 1,
        name: '华锦-尿素氮肥 适用于多种植物',
        grouponPrice: 45.00,
        originalPrice: 60.00,
        participants: 128,
        image: 'D:\\M\\新建相册\\化肥1.png'
      },
      {
        id: 2,
        name: '鲁西-复合肥 硝硫基氮磷钾化肥 花卉盆栽硫酸钾三元通用型',
        grouponPrice: 70.00,
        originalPrice: 95.00,
        participants: 86,
        image: 'D:\\M\\新建相册\\化肥1.png'
      },
      {
        id: 3,
        name: '巴斯夫-格力高溴虫氟苯双酰胺 杀虫剂农药',
        grouponPrice: 90.00,
        originalPrice: 120.00,
        participants: 54,
        image: 'D:\\M\\新建相册\\农药1.png'
      },
      {
        id: 4,
        name: '国光-根宝 生根壮苗剂',
        grouponPrice: 8.00,
        originalPrice: 15.00,
        participants: 210,
        image: 'D:\\M\\新建相册\\农药1.png'
      }
    ]
  },
  
  onLoad: function(options) {
    // 页面加载时执行
    console.log('精彩团购页面加载');
    this.loadGrouponProducts();
  },
  
  loadGrouponProducts: function() {
    // 加载团购商品数据
    console.log('加载团购商品数据');
    // 实际项目中这里会调用API获取数据
  },
  
  goBack: function() {
    // 返回上一页
    wx.navigateBack();
  },
  
  onProductTap: function(e) {
    // 点击产品
    const productId = e.currentTarget.dataset.id;
    console.log('点击团购产品:', productId);
    // 跳转到产品详情页
    wx.navigateTo({
      url: '../productDetail/productDetail?id=' + productId
    });
  },
  
  onJoinGroupon: function(e) {
    // 加入团购
    const productId = e.currentTarget.dataset.id;
    console.log('加入团购:', productId);
    wx.showToast({
      title: '加入团购成功',
      icon: 'success'
    });
  }
});