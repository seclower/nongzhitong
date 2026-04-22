// 农业展览馆页面逻辑
Page({
  data: {
    activeCategory: 1,
    categories: [
      { id: 1, name: '全部' },
      { id: 2, name: '化肥' },
      { id: 3, name: '农药' },
      { id: 4, name: '农业机械' },
      { id: 5, name: '种植技术' }
    ],
    exhibitions: [
      {
        id: 1,
        title: '绿色生态肥料展区',
        image: 'D:\\M\\新建相册\\绿色生态肥料展区.png',
        description: '展示各种绿色生态肥料，包括有机肥料、生物肥料等，适合各种农作物的生长需求。',
        tags: ['化肥', '绿色', '生态'],
        views: '2.3万',
        certificate: true
      },
      {
        id: 2,
        title: '高效农药展区',
        image: 'D:\\M\\新建相册\\高效农药展区.png',
        description: '展示高效低毒农药，包括杀虫剂、杀菌剂、除草剂等，帮助农户有效防治病虫害。',
        tags: ['农药', '高效', '低毒'],
        views: '1.8万',
        certificate: true
      },
      {
        id: 3,
        title: '现代农业机械展区',
        image: 'D:\\M\\新建相册\\现代农业机械展区.png',
        description: '展示各种现代农业机械，包括播种机、收割机、植保无人机等，提高农业生产效率。',
        tags: ['农业机械', '现代化', '高效'],
        views: '3.1万',
        certificate: true
      },
      {
        id: 4,
        title: '智慧种植技术展区',
        image: 'D:\\M\\新建相册\\智慧种植技术展区.png',
        description: '展示智慧种植技术，包括精准灌溉、智能监测、大数据分析等，实现农业生产的智能化。',
        tags: ['种植技术', '智慧农业', '智能化'],
        views: '2.5万',
        certificate: true
      }
    ]
  },
  
  onLoad: function(options) {
    console.log('农业展览馆页面加载');
  },
  
  onShow: function() {
    console.log('农业展览馆页面显示');
  },
  
  switchCategory: function(e) {
    const categoryId = e.currentTarget.dataset.id;
    this.setData({
      activeCategory: categoryId
    });
    // 这里可以根据分类ID筛选展馆
    console.log('切换到分类:', categoryId);
  },
  
  onExhibitionTap: function(e) {
    const exhibitionId = e.currentTarget.dataset.id;
    console.log('点击了展馆:', exhibitionId);
    // 可以在这里添加点击展馆的逻辑，比如跳转到展馆详情页面
  },
  
  goBack: function() {
    wx.navigateBack();
  },
  
  navigateToHome: function() {
    wx.switchTab({
      url: '../index/index'
    });
  },
  
  navigateToCategory: function() {
    wx.switchTab({
      url: '../category/category'
    });
  },
  
  navigateToCart: function() {
    wx.switchTab({
      url: '../cart/cart'
    });
  },
  
  navigateToCalendar: function() {
    wx.navigateTo({
      url: '../calendar/calendar'
    });
  },
  
  navigateToVideos: function() {
    wx.navigateTo({
      url: '../videos/videos'
    });
  },
  
  navigateToProfile: function() {
    wx.switchTab({
      url: '../profile/profile'
    });
  }
});