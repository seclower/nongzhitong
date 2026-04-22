// 科普视频页面逻辑
Page({
  data: {
    activeCategory: 1,
    categories: [
      { id: 1, name: '全部' },
      { id: 2, name: '种植技术' },
      { id: 3, name: '病虫害防治' },
      { id: 4, name: '施肥管理' },
      { id: 5, name: '收获储存' }
    ],
    videos: [
      {
        id: 1,
        title: '玉米种植技术详解',
        thumbnail: 'D:\\M\\新建相册\\玉米种植技术.png',
        duration: '10:25',
        views: '1.2万',
        date: '2026-04-01',
        tags: ['玉米', '种植技术', '春季']
      },
      {
        id: 2,
        title: '小麦病虫害防治方法',
        thumbnail: 'D:\\M\\新建相册\\小麦病虫害防治.png',
        duration: '08:45',
        views: '8.5千',
        date: '2026-03-28',
        tags: ['小麦', '病虫害', '防治']
      },
      {
        id: 3,
        title: '果树施肥技术',
        thumbnail: 'D:\\M\\新建相册\\果树施肥技术.png',
        duration: '12:10',
        views: '9.3千',
        date: '2026-03-25',
        tags: ['果树', '施肥', '管理']
      },
      {
        id: 4,
        title: '蔬菜大棚种植技巧',
        thumbnail: 'D:\\M\\新建相册\\蔬菜大棚种植.png',
        duration: '15:30',
        views: '1.5万',
        date: '2026-03-20',
        tags: ['蔬菜', '大棚', '种植']
      }
    ]
  },
  
  onLoad: function(options) {
    console.log('科普视频页面加载');
  },
  
  onShow: function() {
    console.log('科普视频页面显示');
  },
  
  switchCategory: function(e) {
    const categoryId = e.currentTarget.dataset.id;
    this.setData({
      activeCategory: categoryId
    });
    // 这里可以根据分类ID筛选视频
    console.log('切换到分类:', categoryId);
  },
  
  onVideoTap: function(e) {
    const videoId = e.currentTarget.dataset.id;
    console.log('点击了视频:', videoId);
    // 可以在这里添加点击视频的逻辑，比如跳转到视频播放页面
  },
  
  uploadVideo: function() {
    console.log('点击了上传按钮');
    // 可以在这里添加上传视频的逻辑
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
  
  navigateToExhibition: function() {
    wx.navigateTo({
      url: '../exhibition/exhibition'
    });
  },
  
  navigateToProfile: function() {
    wx.switchTab({
      url: '../profile/profile'
    });
  }
});