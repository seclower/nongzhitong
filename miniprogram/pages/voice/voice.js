// AI语音智能推荐系统页面逻辑
Page({
  data: {
    isRecording: false,
    statusText: '您好，我是您的AI语音助手，有什么可以帮您的吗？',
    messages: [],
    recommendations: [
      {
        id: 1,
        title: '华锦-尿素氮肥',
        description: '适用于多种植物的优质氮肥',
        price: 50.00,
        image: 'D:\\M\\新建相册\\化肥1.png'
      },
      {
        id: 2,
        title: '国光络佳钙高含量钙肥',
        description: '果树增加果实硬度，缓解缺钙裂果',
        price: 15.00,
        image: 'D:\\M\\新建相册\\化肥1.png'
      }
    ]
  },
  
  onLoad: function(options) {
    console.log('AI语音智能推荐系统页面加载');
  },
  
  onShow: function() {
    console.log('AI语音智能推荐系统页面显示');
  },
  
  toggleVoice: function() {
    const isRecording = this.data.isRecording;
    
    if (isRecording) {
      // 停止录音
      this.setData({
        isRecording: false,
        statusText: '正在分析您的语音...'
      });
      
      // 模拟语音识别结果
      setTimeout(() => {
        const userMessage = '我需要玉米种植的肥料';
        const assistantMessage = '根据您的需求，我为您推荐了适合玉米种植的肥料，您可以查看下方的推荐列表。';
        
        this.setData({
          messages: [
            ...this.data.messages,
            { type: 'user', content: userMessage },
            { type: 'assistant', content: assistantMessage }
          ],
          statusText: '您好，我是您的AI语音助手，有什么可以帮您的吗？'
        });
      }, 1000);
    } else {
      // 开始录音
      this.setData({
        isRecording: true,
        statusText: '请说出您的需求...'
      });
    }
  },
  
  onRecommendationTap: function(e) {
    const productId = e.currentTarget.dataset.id;
    console.log('点击了推荐商品:', productId);
    // 可以在这里添加点击推荐商品的逻辑，比如跳转到商品详情页面
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