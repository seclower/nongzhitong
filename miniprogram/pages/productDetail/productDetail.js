// 产品详情页面逻辑
Page({
  data: {
    product: {
      id: 1,
      name: '三浦百灵6%春雷霉素番茄叶霉黄瓜角斑病 溃疡青枯软腐病杀菌剂农药',
      price: 6.00,
      stock: 100,
      description: '三浦百灵6%春雷霉素是一种高效、低毒、广谱的杀菌剂，对番茄叶霉病、黄瓜角斑病、溃疡病、青枯病、软腐病等多种病害有良好的防治效果。使用方法：稀释1000-1500倍液，均匀喷雾。注意事项：避免与碱性农药混用，安全间隔期7天。'
    }
  },
  
  onLoad: function(options) {
    // 页面加载时执行
    console.log('产品详情页面加载', options);
    const productId = options.id;
    this.loadProductDetail(productId);
  },
  
  loadProductDetail: function(productId) {
    // 加载产品详情
    console.log('加载产品详情:', productId);
    
    let product = {
      id: 1,
      name: '三浦百灵6%春雷霉素番茄叶霉黄瓜角斑病 溃疡青枯软腐病杀菌剂农药',
      price: 6.00,
      originalPrice: 8.00,
      stock: 100,
      image: 'D:\\M\\新建相册\\农药1.png',
      description: '三浦百灵6%春雷霉素是一种高效、低毒、广谱的杀菌剂，对番茄叶霉病、黄瓜角斑病、溃疡病、青枯病、软腐病等多种病害有良好的防治效果。使用方法：稀释1000-1500倍液，均匀喷雾。注意事项：避免与碱性农药混用，安全间隔期7天。'
    };
    
    // 根据产品ID获取不同的产品详情
    switch(Number(productId)) {
      case 1:
        product = {
          id: 1,
          name: '华锦-尿素氮肥',
          price: 50.00,
          originalPrice: 60.00,
          stock: 500,
          image: 'D:\\M\\新建相册\\化肥1.png',
          description: '适用于多种植物，涵盖家庭园艺植物、观花植物、观叶植物、多肉植物、瓜果植物、果树等。使用方法：基肥或追肥，根据不同作物和土壤情况调整用量。注意事项：避免与种子直接接触，储存于阴凉干燥处。'
        };
        break;
      case 2:
        product = {
          id: 2,
          name: '鲁西-复合肥 硝硫基氮磷钾化肥 花卉盆栽硫酸钾三元通用型',
          price: 80.00,
          originalPrice: 95.00,
          stock: 400,
          image: 'D:\M\新建相册\化肥4.png',
          description: '适用于花卉、盆栽等植物。使用方法：基肥或追肥，根据不同作物和土壤情况调整用量。注意事项：避免与种子直接接触，储存于阴凉干燥处。'
        };
        break;
      case 3:
        product = {
          id: 3,
          name: '罗布泊-钾肥',
          price: 60.00,
          originalPrice: 70.00,
          stock: 350,
          image: 'D:\M\新建相册\化肥5.png',
          description: '适用于各种需要钾肥的作物。使用方法：基肥或追肥，根据不同作物和土壤情况调整用量。注意事项：避免与种子直接接触，储存于阴凉干燥处。'
        };
        break;
      case 4:
        product = {
          id: 4,
          name: '迪米佳-复合肥料-高塔硝硫基15-5-25',
          price: 90.00,
          originalPrice: 105.00,
          stock: 300,
          image: 'D:\\M\\新建相册\\化肥1.png',
          description: '适用于多种农作物。使用方法：基肥或追肥，可穴施、条施或撒施。注意事项：避免与种子直接接触，储存于阴凉干燥处。'
        };
        break;
      case 5:
        product = {
          id: 5,
          name: '渤海-水溶复合肥料 水溶性天然植提物授释长效肥-高塔造粒',
          price: 120.00,
          originalPrice: 140.00,
          stock: 300,
          image: 'D:\\M\\新建相册\\化肥1.png',
          description: '适用于玉米、小麦、水稻等大田农作物。使用方法：基肥或追肥，可穴施、条施或撒施。注意事项：避免与种子直接接触，储存于阴凉干燥处。产品优势：绿色环保，不含芳烃溶剂，VOCs排放为零，可直接用于绿色食品、有机农产品生产。'
        };
        break;
      case 6:
        product = {
          id: 6,
          name: '鲁西-复合肥料15-15-15',
          price: 75.00,
          originalPrice: 85.00,
          stock: 400,
          image: 'D:\\M\\新建相册\\化肥1.png',
          description: '适用于多种农作物。使用方法：基肥或追肥，根据不同作物和土壤情况调整用量。注意事项：避免与种子直接接触，储存于阴凉干燥处。'
        };
        break;
      case 7:
        product = {
          id: 7,
          name: '瀚生速彪5%高效氯氟氰菊酯 农药杀虫剂',
          price: 15.00,
          originalPrice: 20.00,
          stock: 200,
          image: 'D:\\M\\新建相册\\农药1.png',
          description: '用于防治多种害虫。使用方法：稀释1000-1500倍液，均匀喷雾。注意事项：避免与碱性农药混用，安全间隔期7天。'
        };
        break;
      case 8:
        product = {
          id: 8,
          name: '国光-根宝 生根壮苗剂',
          price: 10.00,
          originalPrice: 15.00,
          stock: 250,
          image: 'D:\\M\\新建相册\\农药1.png',
          description: '用于促进植物生根壮苗。使用方法：稀释800-1000倍液，灌根或叶面喷施。注意事项：避免与碱性农药混用。'
        };
        break;
      case 9:
        product = {
          id: 9,
          name: '国光络佳-钙高含量钙肥',
          price: 15.00,
          originalPrice: 20.00,
          stock: 200,
          image: 'D:\\M\\新建相册\\农药1.png',
          description: '用于果树增加果实硬度、缓解缺钙裂果干烧心叶面肥。使用方法：稀释800-1000倍液，叶面喷施。注意事项：避免与碱性农药混用，安全间隔期7天。产品优势：经济高效，亩均用药成本降低10%-15%，且产品残留低，能让农产品溢价10%-20%。'
        };
        break;
      case 10:
        product = {
          id: 10,
          name: '翰生金甲钢拳7%甲维盐顺氯杀虫剂',
          price: 12.00,
          originalPrice: 18.00,
          stock: 250,
          image: 'D:\\M\\新建相册\\农药1.png',
          description: '用于甜菜夜蛾、小菜蛾、菜青虫、斜纹夜蛾、烟青虫、棉铃虫等害虫的防治。使用方法：稀释1000-1500倍液，均匀喷雾。注意事项：避免与碱性农药混用，安全间隔期7天。产品优势：使用便捷，易溶于水，不会出现分层、沉淀现象，可与多数农药混配。'
        };
        break;
      case 11:
        product = {
          id: 11,
          name: '国光毒箭5%氯氰菊酯-农药杀虫剂',
          price: 6.00,
          originalPrice: 8.00,
          stock: 300,
          image: 'D:\\M\\新建相册\\农药1.png',
          description: '用于防治多种害虫。使用方法：稀释1000-1500倍液，均匀喷雾。注意事项：避免与碱性农药混用，安全间隔期7天。'
        };
        break;
      case 12:
        product = {
          id: 12,
          name: '巴斯夫-格力高溴虫氟苯双酰胺 杀虫剂农药',
          price: 100.00,
          originalPrice: 120.00,
          stock: 100,
          image: 'D:\\M\\新建相册\\农药1.png',
          description: '用于防治多种害虫。使用方法：按照包装说明使用。注意事项：避免与碱性农药混用，安全间隔期7天。'
        };
        break;
      case 13:
        product = {
          id: 13,
          name: '瀚生品星40%氟硅唑乳油',
          price: 40.00,
          originalPrice: 50.00,
          stock: 150,
          image: 'D:\\M\\新建相册\\农药1.png',
          description: '用于防治多种病害。使用方法：稀释1000-1500倍液，均匀喷雾。注意事项：避免与碱性农药混用，安全间隔期7天。'
        };
        break;
      case 14:
        product = {
          id: 14,
          name: '三浦百灵6%春雷霉素杀菌剂农药',
          price: 6.00,
          originalPrice: 8.00,
          stock: 300,
          image: 'D:\\M\\新建相册\\农药1.png',
          description: '用于防治多种病害。使用方法：稀释1000-1500倍液，均匀喷雾。注意事项：避免与碱性农药混用，安全间隔期7天。'
        };
        break;
      case 15:
        product = {
          id: 15,
          name: '春秋大业菠菜种子',
          price: 5.00,
          originalPrice: 7.00,
          stock: 500,
          image: 'D:\\M\\新建相册\\种子1.png',
          description: '适用于种植菠菜。使用方法：按照包装说明播种。注意事项：储存于阴凉干燥处。'
        };
        break;
      case 16:
        product = {
          id: 16,
          name: '美国大速生生菜种子',
          price: 8.00,
          originalPrice: 10.00,
          stock: 400,
          image: 'D:\\M\\新建相册\\种子1.png',
          description: '适用于种植生菜。使用方法：按照包装说明播种。注意事项：储存于阴凉干燥处。'
        };
        break;
      case 17:
        product = {
          id: 17,
          name: '灰太郎南瓜种子',
          price: 6.00,
          originalPrice: 8.00,
          stock: 300,
          image: 'D:\\M\\新建相册\\种子1.png',
          description: '适用于种植南瓜。使用方法：按照包装说明播种。注意事项：储存于阴凉干燥处。'
        };
        break;
      case 18:
        product = {
          id: 18,
          name: '红樱桃萝卜种子',
          price: 4.00,
          originalPrice: 6.00,
          stock: 500,
          image: 'D:\\M\\新建相册\\种子1.png',
          description: '适用于种植樱桃萝卜。使用方法：按照包装说明播种。注意事项：储存于阴凉干燥处。'
        };
        break;
      case 19:
        product = {
          id: 19,
          name: '水师营6号大白菜种子',
          price: 7.00,
          originalPrice: 9.00,
          stock: 350,
          image: 'D:\\M\\新建相册\\种子1.png',
          description: '适用于种植大白菜。使用方法：按照包装说明播种。注意事项：储存于阴凉干燥处。'
        };
        break;
      case 20:
        product = {
          id: 20,
          name: '进口香菜籽',
          price: 3.00,
          originalPrice: 5.00,
          stock: 600,
          image: 'D:\\M\\新建相册\\种子1.png',
          description: '适用于种植香菜。使用方法：按照包装说明播种。注意事项：储存于阴凉干燥处。'
        };
        break;
    }
    
    this.setData({
      product: product
    });
  },
  
  onAddToFavorites: function() {
    // 加入收藏
    wx.showToast({
      title: '收藏成功',
      icon: 'success'
    });
  },
  
  onAddToCart: function() {
    // 加入购物车
    const app = getApp();
    const product = this.data.product;
    
    // 检查购物车中是否已有该商品
    const existingItem = app.globalData.cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      // 已有该商品，增加数量
      existingItem.quantity++;
    } else {
      // 没有该商品，添加到购物车
      app.globalData.cartItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        checked: true,
        image: product.image
      });
    }
    
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success'
    });
  },
  
  onBuyNow: function() {
    // 立即购买
    const product = this.data.product;
    console.log('立即购买:', product);
    // 跳转到订单页面
    wx.navigateTo({
      url: '../order/order?productId=' + product.id
    });
  }
});