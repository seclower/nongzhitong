// 分区页面逻辑
Page({
  data: {
    section: '',
    sectionTitle: '',
    sectionProducts: []
  },
  
  onLoad: function(options) {
    // 页面加载时执行
    console.log('分区页面加载');
    if (options.section) {
      this.setData({
        section: options.section
      });
      this.loadSectionProducts(options.section);
    }
  },
  
  onBack: function() {
    // 返回上一页
    wx.navigateBack({
      delta: 1
    });
  },
  
  loadSectionProducts: function(section) {
    // 模拟加载分区产品
    console.log('加载分区产品:', section);
    
    // 设置分区标题
    let sectionTitle = '';
    switch(section) {
      case 'hot':
        sectionTitle = '热销产品';
        break;
      case 'recommended':
        sectionTitle = '推荐产品';
        break;
      default:
        sectionTitle = '产品分区';
    }
    
    // 模拟分区产品
    const sectionProducts = [
      {
        id: 1,
        name: '三浦百灵6%春雷霉素番茄叶霉黄瓜角斑病 溃疡青枯软腐病杀菌剂农药',
        price: 6.00,
        originalPrice: 8.00,
        sales: 50,
        image: 'D:\\M\\新建相册\\图片1.png'
      },
      {
        id: 2,
        name: '瀚生品星40%氟硅唑乳油黄瓜黑星病农药 内吸性杀菌剂保护治疗铲除',
        price: 40.00,
        originalPrice: 50.00,
        sales: 30,
        image: 'D:\\M\\新建相册\\图片14.png'
      },
      {
        id: 3,
        name: '巴斯夫格力高溴虫氟苯双酰胺 黄条跳甲棉铃虫蓟马青虫杀虫剂农药',
        price: 100.00,
        originalPrice: 120.00,
        sales: 20,
        image: 'D:\\M\\新建相册\\图片13.png'
      },
      {
        id: 4,
        name: '国光毒箭5%氯氰菊酯果树烟草地 老虎青虫地下害虫钻心虫农药杀虫剂',
        price: 6.00,
        originalPrice: 8.00,
        sales: 45,
        image: 'D:\\M\\新建相册\\图片12.png'
      }
    ];
    
    this.setData({
      sectionTitle: sectionTitle,
      sectionProducts: sectionProducts
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