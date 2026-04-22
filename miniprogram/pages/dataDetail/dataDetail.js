// 数据详情页面逻辑
Page({
  data: {
    type: '',
    dataTitle: '',
    dataValue: '',
    dataDescription: ''
  },
  
  onLoad: function(options) {
    // 页面加载时执行
    console.log('数据详情页面加载');
    if (options.type) {
      this.setData({
        type: options.type
      });
      this.loadDataDetails(options.type);
    }
  },
  
  onBack: function() {
    // 返回上一页
    wx.navigateBack({
      delta: 1
    });
  },
  
  loadDataDetails: function(type) {
    // 模拟加载数据详情
    console.log('加载数据详情:', type);
    
    // 设置数据标题和描述
    let dataTitle = '';
    let dataValue = '';
    let dataDescription = '';
    
    switch(type) {
      case 'registeredUsers':
        dataTitle = '注册用户';
        dataValue = '1,820';
        dataDescription = '平台总注册用户数';
        break;
      case 'activeUsers':
        dataTitle = '活跃用户';
        dataValue = '420';
        dataDescription = '本月活跃用户数';
        break;
      case 'demoUsers':
        dataTitle = '演示用户';
        dataValue = '25';
        dataDescription = '平台演示用户数';
        break;
      case 'serviceClosedLoops':
        dataTitle = '服务闭环';
        dataValue = '45';
        dataDescription = '本月完成的服务闭环数';
        break;
      default:
        dataTitle = '数据详情';
        dataValue = '0';
        dataDescription = '暂无数据';
    }
    
    this.setData({
      dataTitle: dataTitle,
      dataValue: dataValue,
      dataDescription: dataDescription
    });
  }
});