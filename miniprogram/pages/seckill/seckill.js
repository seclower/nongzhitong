// 限时秒杀页面逻辑
Page({
  data: {
    hours: '01',
    minutes: '30',
    seconds: '45',
    seckillProducts: [
      {
        id: 1,
        name: '鲁西-复合肥 硝硫基氮磷钾化肥 花卉盆栽硫酸钾三元通用型',
        seckillPrice: 65.00,
        originalPrice: 95.00,
        progress: 85,
        image: 'D:\\M\\新建相册\\化肥1.png'
      },
      {
        id: 2,
        name: '瀚生速彪5%高效氯氟氰菊酯 农药杀虫剂',
        seckillPrice: 10.00,
        originalPrice: 20.00,
        progress: 60,
        image: 'D:\\M\\新建相册\\农药1.png'
      },
      {
        id: 3,
        name: '罗布泊-钾肥',
        seckillPrice: 50.00,
        originalPrice: 70.00,
        progress: 45,
        image: 'D:\\M\\新建相册\\化肥1.png'
      },
      {
        id: 4,
        name: '国光络佳-钙高含量钙肥',
        seckillPrice: 10.00,
        originalPrice: 20.00,
        progress: 90,
        image: 'D:\\M\\新建相册\\农药1.png'
      }
    ]
  },
  
  onLoad: function(options) {
    // 页面加载时执行
    console.log('限时秒杀页面加载');
    this.loadSeckillProducts();
    this.startCountdown();
  },
  
  onUnload: function() {
    // 页面卸载时执行
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
    }
  },
  
  loadSeckillProducts: function() {
    // 加载秒杀商品数据
    console.log('加载秒杀商品数据');
    // 实际项目中这里会调用API获取数据
  },
  
  startCountdown: function() {
    // 开始倒计时
    let totalSeconds = 60 * 90; // 1小时30分钟
    
    this.countdownTimer = setInterval(() => {
      totalSeconds--;
      if (totalSeconds < 0) {
        clearInterval(this.countdownTimer);
        return;
      }
      
      const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
      const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
      const seconds = (totalSeconds % 60).toString().padStart(2, '0');
      
      this.setData({
        hours: hours,
        minutes: minutes,
        seconds: seconds
      });
    }, 1000);
  },
  
  goBack: function() {
    // 返回上一页
    wx.navigateBack();
  },
  
  onProductTap: function(e) {
    // 点击产品
    const productId = e.currentTarget.dataset.id;
    console.log('点击秒杀产品:', productId);
    // 跳转到产品详情页
    wx.navigateTo({
      url: '../productDetail/productDetail?id=' + productId
    });
  },
  
  onSeckill: function(e) {
    // 立即抢购
    const productId = e.currentTarget.dataset.id;
    console.log('立即抢购:', productId);
    wx.showToast({
      title: '抢购成功',
      icon: 'success'
    });
  }
});