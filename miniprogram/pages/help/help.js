// 帮助中心页面逻辑
Page({
  data: {
    helpSections: [
      {
        id: 1,
        title: '购物相关',
        items: [
          {
            id: 1,
            question: '如何购买商品？',
            answer: '1. 在首页或分类页浏览商品\n2. 点击商品进入详情页\n3. 点击“加入购物车”按钮\n4. 进入购物车页面确认订单\n5. 选择收货地址并支付',
            showAnswer: false
          },
          {
            id: 2,
            question: '如何查看订单状态？',
            answer: '1. 进入“个人中心”\n2. 点击“我的订单”\n3. 在订单列表中查看订单状态',
            showAnswer: false
          },
          {
            id: 3,
            question: '如何申请退换货？',
            answer: '1. 进入“我的订单”\n2. 找到需要退换货的订单\n3. 点击“申请退换货”按钮\n4. 填写退换货原因并提交',
            showAnswer: false
          }
        ]
      },
      {
        id: 2,
        title: '账户相关',
        items: [
          {
            id: 4,
            question: '如何注册账户？',
            answer: '1. 点击“我的”页面\n2. 点击“注册”按钮\n3. 输入手机号和验证码\n4. 设置密码并完成注册',
            showAnswer: false
          },
          {
            id: 5,
            question: '忘记密码怎么办？',
            answer: '1. 点击登录页面的“忘记密码”\n2. 输入手机号和验证码\n3. 设置新密码并确认',
            showAnswer: false
          }
        ]
      },
      {
        id: 3,
        title: '其他问题',
        items: [
          {
            id: 6,
            question: '如何联系客服？',
            answer: '1. 进入“个人中心”\n2. 点击“联系客服”\n3. 选择在线客服或拨打客服电话',
            showAnswer: false
          },
          {
            id: 7,
            question: '如何使用优惠券？',
            answer: '1. 在购物车页面确认订单\n2. 点击“选择优惠券”\n3. 选择可用的优惠券\n4. 确认优惠后支付',
            showAnswer: false
          }
        ]
      }
    ]
  },
  
  onLoad: function(options) {
    // 页面加载时执行
    console.log('帮助中心页面加载');
  },
  
  goBack: function() {
    // 返回上一页
    wx.navigateBack();
  },
  
  toggleAnswer: function(e) {
    // 切换答案显示/隐藏
    const index = e.currentTarget.dataset.index;
    const subindex = e.currentTarget.dataset.subindex;
    
    const helpSections = this.data.helpSections;
    helpSections[index].items[subindex].showAnswer = !helpSections[index].items[subindex].showAnswer;
    
    this.setData({
      helpSections: helpSections
    });
  }
});