// 搜索结果页面逻辑
Page({
  data: {
    keyword: '',
    searchResults: []
  },
  
  onLoad: function(options) {
    // 页面加载时执行
    console.log('搜索结果页面加载');
    if (options.keyword) {
      this.setData({
        keyword: options.keyword
      });
      this.searchProducts(options.keyword);
    }
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
      keyword: e.detail.value
    });
  },
  
  onSearch: function() {
    // 搜索
    const keyword = this.data.keyword;
    console.log('搜索:', keyword);
    this.searchProducts(keyword);
  },
  
  searchProducts: function(keyword) {
    // 模拟搜索产品
    console.log('搜索产品:', keyword);
    
    // 模拟搜索结果
    const searchResults = [
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
      }
    ];
    
    // 过滤搜索结果
    const filteredResults = searchResults.filter(product => 
      product.name.toLowerCase().includes(keyword.toLowerCase())
    );
    
    this.setData({
      searchResults: filteredResults
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