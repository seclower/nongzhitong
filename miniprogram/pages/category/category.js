// 分类页面逻辑
Page({
  data: {
    activeCategory: 2,
    currentCategoryName: '化肥',
    categories: [
      { id: 1, name: '种子' },
      { id: 2, name: '化肥' },
      { id: 3, name: '农药' },
      { id: 4, name: '农具' }
    ],
    categoryProducts: [
      {
        id: 1,
        name: '华锦-尿素氮肥',
        price: 50.00,
        description: '适用于多种植物，涵盖家庭园艺植物、观花植物、观叶植物、多肉植物、瓜果植物、果树等'
      },
      {
        id: 2,
        name: '鲁西-复合肥 硝硫基氮磷钾化肥 花卉盆栽硫酸钾三元通用型',
        price: 80.00
      },
      {
        id: 3,
        name: '罗布泊-钾肥',
        price: 60.00
      },
      {
        id: 4,
        name: '迪米佳-复合肥料-高塔硝硫基15-5-25',
        price: 90.00
      },
      {
        id: 5,
        name: '渤海-水溶复合肥料 水溶性天然植提物授释长效肥-高塔造粒',
        price: 120.00,
        description: '适用于玉米、小麦、水稻等大田农作物'
      },
      {
        id: 6,
        name: '鲁西-复合肥料15-15-15',
        price: 75.00
      }
    ]
  },
  
  onLoad: function(options) {
    // 页面加载时执行
    console.log('分类页面加载');
    this.loadCategories();
    this.loadCategoryProducts(this.data.activeCategory);
  },
  
  onShow: function() {
    // 页面显示时执行
    console.log('分类页面显示');
  },
  
  loadCategories: function() {
    // 加载分类数据
    console.log('加载分类数据');
    // 从全局数据中获取分类信息
    const app = getApp();
    const categories = app.globalData.categories;
    
    this.setData({
      categories: categories
    });
  },
  
  loadCategoryProducts: function(categoryId) {
    // 加载分类产品数据
    console.log('加载分类产品数据:', categoryId);
    
    // 从全局数据中获取产品信息
    const app = getApp();
    const products = app.globalData.products.filter(product => product.categoryId === categoryId);
    
    this.setData({
      categoryProducts: products
    });
  },
  
  onCategoryTap: function(e) {
    // 点击分类
    const categoryId = e.currentTarget.dataset.id;
    const categoryName = this.data.categories.find(c => c.id === categoryId).name;
    
    this.setData({
      activeCategory: categoryId,
      currentCategoryName: categoryName
    });
    
    this.loadCategoryProducts(categoryId);
  },
  
  onProductTap: function(e) {
    // 点击产品
    const productId = e.currentTarget.dataset.id;
    console.log('点击产品:', productId);
    // 跳转到产品详情页
    wx.navigateTo({
      url: '../productDetail/productDetail?id=' + productId
    });
  }
});