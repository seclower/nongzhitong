// 首页逻辑
Page({
  data: {
    activeTab: 0,
    searchText: '',
    platformData: {
      registeredUsers: '1,820',
      activeUsers: '420',
      demoUsers: '25',
      serviceClosedLoops: '45'
    },
    hotProducts: [
      {
        id: 1,
        name: '三浦百灵6%春雷霉素番茄叶霉黄瓜角斑病 溃疡青枯软腐病杀菌剂农药',
        price: 6.00,
        originalPrice: 8.00,
        sales: 50,
        category: '农药',
        image: 'D:\\M\\新建相册\\农药1.png'
      },
      {
        id: 2,
        name: '瀚生品星40%氟硅唑乳油黄瓜黑星病农药 内吸性杀菌剂保护治疗铲除',
        price: 40.00,
        originalPrice: 50.00,
        sales: 30,
        category: '农药',
        image: 'D:\M\新建相册\农药2.png'
      },
      {
        id: 3,
        name: '巴斯夫格力高溴虫氟苯双酰胺 黄条跳甲棉铃虫蓟马青虫杀虫剂农药',
        price: 100.00,
        originalPrice: 120.00,
        sales: 20,
        category: '农药',
        image: 'D:\M\新建相册\农药3.png'
      },
      {
        id: 4,
        name: '国光毒箭5%氯氰菊酯果树烟草地 老虎青虫地下害虫钻心虫农药杀虫剂',
        price: 6.00,
        originalPrice: 8.00,
        sales: 45,
        category: '农药',
        image: 'D:\M\新建相册\农药4.png'
      }
    ],
    recommendedProducts: [
      {
        id: 5,
        name: '翰生金甲钢拳7%甲维盐顺氯杀虫剂 顺式氯氰菊酯甲氨基阿维菌素农药农用',
        price: 12.00,
        originalPrice: 18.00,
        sales: 35,
        category: '农药',
        image: 'D:\M\新建相册\农药5.png'
      },
      {
        id: 6,
        name: '国光络佳钙高含量钙肥 果树增加果实硬度 缓解缺钙裂果干烧心叶面肥',
        price: 15.00,
        originalPrice: 20.00,
        sales: 25,
        category: '农药',
        image: 'D:\\M\\新建相册\\农药1.png'
      },
      {
        id: 7,
        name: '渤海-水溶复合肥料 水溶性天然植提物授释长效肥-高塔造粒',
        price: 120.00,
        originalPrice: 140.00,
        sales: 20,
        category: '化肥',
        image: 'D:\\M\\新建相册\\化肥1.png'
      },
      {
        id: 8,
        name: '华锦-尿素氮肥 适用于多种植物',
        price: 50.00,
        originalPrice: 60.00,
        sales: 30,
        category: '化肥',
        image: 'D:\\M\\新建相册\\化肥1.png'
      }
    ]
  },
  
  onLoad: function(options) {
    // 页面加载时执行
    console.log('首页加载');
    this.loadProducts();
  },
  
  onShow: function() {
    // 页面显示时执行
    console.log('首页显示');
  },
  
  loadProducts: function() {
    // 加载产品数据
    console.log('加载产品数据');
    // 从全局数据中获取产品信息
    const app = getApp();
    const products = app.globalData.products;
    
    // 提取热门产品和推荐产品
    const hotProducts = products.slice(0, 4);
    const recommendedProducts = products.slice(4, 8);
    
    // 更新平台数据
    const platformData = {
      registeredUsers: app.globalData.users.total.toLocaleString(),
      activeUsers: app.globalData.users.active.toLocaleString(),
      demoUsers: app.globalData.users.new.toLocaleString(),
      serviceClosedLoops: '45'
    };
    
    this.setData({
      hotProducts: hotProducts,
      recommendedProducts: recommendedProducts,
      platformData: platformData
    });
  },
  
  onStoreSelect: function() {
    console.log('选择门店');
    // 跳转到门店选择页面
    wx.navigateTo({
      url: '../storeSelect/storeSelect'
    });
  },
  
  onTabChange: function(e) {
    // 导航标签切换
    const index = e.currentTarget.dataset.index;
    this.setData({
      activeTab: index
    });
    console.log('切换到标签:', index);
    
    // 根据标签索引执行不同的操作
    switch(index) {
      case 0:
        // 超值拼团
        wx.navigateTo({
          url: '../groupBuy/groupBuy'
        });
        break;
      case 1:
        // 精彩团购
        wx.navigateTo({
          url: '../groupon/groupon'
        });
        break;
      case 2:
        // 限时秒杀
        wx.navigateTo({
          url: '../seckill/seckill'
        });
        break;
      case 3:
        // 积分商城
        wx.navigateTo({
          url: '../points/points'
        });
        break;
      case 4:
        // 公告
        wx.navigateTo({
          url: '../notice/notice'
        });
        break;
    }
  },
  
  onSearchInput: function(e) {
    // 搜索输入
    this.setData({
      searchText: e.detail.value
    });
  },
  
  onSearch: function() {
    // 搜索
    console.log('搜索:', this.data.searchText);
    // 跳转到搜索结果页面
    wx.navigateTo({
      url: '../search/search?keyword=' + this.data.searchText
    });
  },
  
  onBannerClick: function() {
    // 点击轮播图
    console.log('点击轮播图');
    // 跳转到活动页面
    wx.navigateTo({
      url: '../activity/activity'
    });
  },
  
  onSectionTitleClick: function(e) {
    // 点击分区标题
    const section = e.currentTarget.dataset.section;
    console.log('点击分区标题:', section);
    // 跳转到对应分区页面
    wx.navigateTo({
      url: '../section/section?section=' + section
    });
  },
  
  onSectionMoreClick: function(e) {
    // 点击查看更多
    const section = e.currentTarget.dataset.section;
    console.log('查看更多点击:', section);
    // 跳转到对应分区页面
    wx.navigateTo({
      url: '../section/section?section=' + section
    });
  },
  
  goToProductDetail: function(e) {
    // 点击产品
    const productId = e.currentTarget.dataset.id;
    console.log('点击产品:', productId);
    // 跳转到产品详情页
    wx.navigateTo({
      url: '../productDetail/productDetail?id=' + productId
    });
  },
  
  onDataItemClick: function(e) {
    // 点击平台数据项
    const type = e.currentTarget.dataset.type;
    console.log('点击平台数据:', type);
    // 跳转到数据详情页面
    wx.navigateTo({
      url: '../dataDetail/dataDetail?type=' + type
    });
  },
  
  goToCategory: function() {
    // 跳转到商品分类页面
    console.log('跳转到商品分类页面');
    wx.switchTab({
      url: '../category/category'
    });
  },
  
  goToCart: function() {
    // 跳转到购物车页面
    console.log('跳转到购物车页面');
    wx.switchTab({
      url: '../cart/cart'
    });
  },
  
  goToCalendar: function() {
    // 跳转到农事日历页面
    console.log('跳转到农事日历页面');
    wx.switchTab({
      url: '../calendar/calendar'
    });
  },
  
  goToOrder: function() {
    // 跳转到我的订单页面
    console.log('跳转到我的订单页面');
    wx.navigateTo({
      url: '../order/order'
    });
  }
});