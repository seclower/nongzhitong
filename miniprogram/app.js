// 微信小程序入口文件
App({
  onLaunch: function() {
    // 应用启动时执行
    console.log('农智通小程序启动');
    
    // 初始化登录状态
    this.checkLoginStatus();
    
    // 初始化API请求
    this.initApi();
    
    // 加载数据
    this.loadData();
  },
  
  onShow: function() {
    // 应用显示时执行
    console.log('农智通小程序显示');
  },
  
  onHide: function() {
    // 应用隐藏时执行
    console.log('农智通小程序隐藏');
  },
  
  checkLoginStatus: function() {
    // 检查登录状态
    const token = wx.getStorageSync('token');
    if (token) {
      this.globalData.isLoggedIn = true;
      this.globalData.token = token;
    } else {
      this.globalData.isLoggedIn = false;
      this.globalData.token = '';
    }
  },
  
  initApi: function() {
    // 初始化API请求配置
    this.globalData.apiBaseUrl = 'http://localhost:3000/api';
  },
  
  globalData: {
    userInfo: null,
    isLoggedIn: false,
    token: '',
    apiBaseUrl: 'http://localhost:3000/api',
    cartItems: [
      {
        "id": 1,
        "productId": 1,
        "name": "三浦百灵6%春雷霉素番茄叶霉黄瓜角斑病 溃疡青枯软腐病杀菌剂农药",
        "price": 6.00,
        "quantity": 1,
        "checked": true,
        "image": "D:\M\新建相册\农药1.png"
      },
      {
        "id": 2,
        "productId": 2,
        "name": "瀚生品星40%氟硅唑乳油黄瓜黑星病农药 内吸性杀菌剂保护治疗铲除",
        "price": 40.00,
        "quantity": 1,
        "checked": true,
        "image": "D:\M\新建相册\农药2.png"
      },
      {
        "id": 3,
        "productId": 3,
        "name": "巴斯夫格力高溴虫氟苯双酰胺 黄条跳甲棉铃虫蓟马青虫杀虫剂农药",
        "price": 100.00,
        "quantity": 1,
        "checked": false,
        "image": "D:\M\新建相册\农药3.png"
      }
    ],
    // 从data.json加载数据
    categories: [],
    products: [],
    orders: [],
    users: {}
  },
  
  // 加载数据
  loadData: function() {
    const app = this;
    // 在实际项目中，这里会通过API请求获取数据
    // 现在使用本地数据模拟
    const data = {
      "categories": [
        { "id": 1, "name": "种子", "level": 1 },
        { "id": 2, "name": "肥料", "level": 1 },
        { "id": 3, "name": "农药", "level": 1 },
        { "id": 4, "name": "农具", "level": 1 }
      ],
      "products": [
        {
          "id": 1,
          "name": "三浦百灵6%春雷霉素番茄叶霉黄瓜角斑病 溃疡青枯软腐病杀菌剂农药",
          "price": 6.00,
          "originalPrice": 8.00,
          "stock": 100,
          "categoryId": 3,
          "image": "D:\M\新建相册\农药1.png",
          "description": "三浦百灵6%春雷霉素是一种高效、低毒、广谱的杀菌剂，对番茄叶霉病、黄瓜角斑病、溃疡病、青枯病、软腐病等多种病害有良好的防治效果。使用方法：稀释1000-1500倍液，均匀喷雾。注意事项：避免与碱性农药混用，安全间隔期7天。",
          "sales": 50
        },
        {
          "id": 2,
          "name": "瀚生品星40%氟硅唑乳油黄瓜黑星病农药 内吸性杀菌剂保护治疗铲除",
          "price": 40.00,
          "originalPrice": 50.00,
          "stock": 80,
          "categoryId": 3,
          "image": "D:\M\新建相册\农药2.png",
          "description": "瀚生品星40%氟硅唑乳油是一种内吸性杀菌剂，对黄瓜黑星病有特效，同时对其他多种真菌性病害也有良好的防治效果。使用方法：稀释2000-3000倍液，均匀喷雾。注意事项：避免与碱性农药混用，安全间隔期14天。",
          "sales": 30
        },
        {
          "id": 3,
          "name": "巴斯夫格力高溴虫氟苯双酰胺 黄条跳甲棉铃虫蓟马青虫杀虫剂农药",
          "price": 100.00,
          "originalPrice": 120.00,
          "stock": 50,
          "categoryId": 3,
          "image": "D:\M\新建相册\农药3.png",
          "description": "巴斯夫格力高溴虫氟苯双酰胺是一种新型杀虫剂，对黄条跳甲、棉铃虫、蓟马、青虫等多种害虫有特效。使用方法：稀释1500-2000倍液，均匀喷雾。注意事项：避免与碱性农药混用，安全间隔期7天。",
          "sales": 20
        },
        {
          "id": 4,
          "name": "国光毒箭5%氯氰菊酯果树烟草地 老虎青虫地下害虫钻心虫农药杀虫剂",
          "price": 6.00,
          "originalPrice": 8.00,
          "stock": 120,
          "categoryId": 3,
          "image": "D:\M\新建相册\农药4.png",
          "description": "国光毒箭5%氯氰菊酯是一种高效杀虫剂，对果树、烟草地的老虎、青虫、地下害虫、钻心虫等多种害虫有良好的防治效果。使用方法：稀释1000-1500倍液，均匀喷雾。注意事项：避免与碱性农药混用，安全间隔期7天。",
          "sales": 45
        },
        {
          "id": 5,
          "name": "翰生金甲钢拳7%甲维盐顺氯杀虫剂 顺式氯氰菊酯甲氨基阿维菌素农药农用",
          "price": 12.00,
          "originalPrice": 18.00,
          "stock": 90,
          "categoryId": 3,
          "image": "D:\M\新建相册\农药5.png",
          "description": "翰生金甲钢拳7%甲维盐顺氯杀虫剂是一种高效杀虫剂，对多种害虫有良好的防治效果。使用方法：稀释1500-2000倍液，均匀喷雾。注意事项：避免与碱性农药混用，安全间隔期7天。",
          "sales": 35
        },
        {
          "id": 6,
          "name": "国光络佳钙高含量钙肥 果树增加果实硬度 缓解缺钙裂果干烧心叶面肥",
          "price": 15.00,
          "originalPrice": 20.00,
          "stock": 150,
          "categoryId": 2,
          "image": "D:\M\新建相册\化肥1.png",
          "description": "国光络佳钙高含量钙肥是一种高效钙肥，能有效增加果实硬度，缓解缺钙裂果、干烧心等症状。使用方法：稀释1000-1500倍液，均匀喷雾。注意事项：储存于阴凉干燥处。",
          "sales": 25
        },
        {
          "id": 7,
          "name": "渤海-水溶复合肥料 水溶性天然植提物授释长效肥-高塔造粒",
          "price": 120.00,
          "originalPrice": 140.00,
          "stock": 60,
          "categoryId": 2,
          "image": "D:\M\新建相册\化肥2.png",
          "description": "渤海-水溶复合肥料是一种水溶性天然植提物授释长效肥，采用高塔造粒技术，养分释放均匀，肥效持久。使用方法：基肥或追肥，根据不同作物和土壤情况调整用量。注意事项：避免与种子直接接触，储存于阴凉干燥处。",
          "sales": 20
        },
        {
          "id": 8,
          "name": "华锦-尿素氮肥 适用于多种植物",
          "price": 50.00,
          "originalPrice": 60.00,
          "stock": 200,
          "categoryId": 2,
          "image": "D:\M\新建相册\化肥3.png",
          "description": "华锦-尿素氮肥适用于多种植物，涵盖家庭园艺植物、观花植物、观叶植物、多肉植物、瓜果植物、果树等。使用方法：基肥或追肥，根据不同作物和土壤情况调整用量。注意事项：避免与种子直接接触，储存于阴凉干燥处。",
          "sales": 30
        },
        {
          "id": 9,
          "name": "鲁西-复合肥 硝硫基氮磷钾化肥 花卉盆栽硫酸钾三元通用型",
          "price": 80.00,
          "originalPrice": 95.00,
          "stock": 100,
          "categoryId": 2,
          "image": "D:\M\新建相册\化肥4.png",
          "description": "鲁西-复合肥是一种硝硫基氮磷钾化肥，适用于花卉、盆栽等植物。使用方法：基肥或追肥，根据不同作物和土壤情况调整用量。注意事项：避免与种子直接接触，储存于阴凉干燥处。",
          "sales": 15
        },
        {
          "id": 10,
          "name": "罗布泊-钾肥",
          "price": 60.00,
          "originalPrice": 70.00,
          "stock": 80,
          "categoryId": 2,
          "image": "D:\M\新建相册\化肥5.png",
          "description": "罗布泊-钾肥是一种优质钾肥，适用于各种需要钾肥的作物。使用方法：基肥或追肥，根据不同作物和土壤情况调整用量。注意事项：避免与种子直接接触，储存于阴凉干燥处。",
          "sales": 10
        }
      ],
      "orders": [
        {
          "id": 1,
          "orderNo": "20260416001",
          "totalAmount": 156.00,
          "status": "待付款",
          "createTime": "2026-04-16 10:30:00",
          "products": [
            {
              "id": 1,
              "name": "三浦百灵6%春雷霉素番茄叶霉黄瓜角斑病 溃疡青枯软腐病杀菌剂农药",
              "price": 6.00,
              "quantity": 1,
              "image": "D:\M\新建相册\农药1.png"
            },
            {
              "id": 2,
              "name": "瀚生品星40%氟硅唑乳油黄瓜黑星病农药 内吸性杀菌剂保护治疗铲除",
              "price": 40.00,
              "quantity": 3,
              "image": "D:\M\新建相册\农药2.png"
            }
          ]
        },
        {
          "id": 2,
          "orderNo": "20260415001",
          "totalAmount": 120.00,
          "status": "待发货",
          "createTime": "2026-04-15 14:20:00",
          "products": [
            {
              "id": 3,
              "name": "巴斯夫格力高溴虫氟苯双酰胺 黄条跳甲棉铃虫蓟马青虫杀虫剂农药",
              "price": 100.00,
              "quantity": 1,
              "image": "D:\M\新建相册\农药3.png"
            },
            {
              "id": 4,
              "name": "国光毒箭5%氯氰菊酯果树烟草地 老虎青虫地下害虫钻心虫农药杀虫剂",
              "price": 6.00,
              "quantity": 3,
              "image": "D:\M\新建相册\农药4.png"
            }
          ]
        },
        {
          "id": 3,
          "orderNo": "20260414001",
          "totalAmount": 132.00,
          "status": "待收货",
          "createTime": "2026-04-14 09:15:00",
          "products": [
            {
              "id": 5,
              "name": "翰生金甲钢拳7%甲维盐顺氯杀虫剂 顺式氯氰菊酯甲氨基阿维菌素农药农用",
              "price": 12.00,
              "quantity": 1,
              "image": "D:\M\新建相册\农药5.png"
            },
            {
              "id": 6,
              "name": "国光络佳钙高含量钙肥 果树增加果实硬度 缓解缺钙裂果干烧心叶面肥",
              "price": 15.00,
              "quantity": 8,
              "image": "D:\M\新建相册\化肥1.png"
            }
          ]
        },
        {
          "id": 4,
          "orderNo": "20260413001",
          "totalAmount": 218.00,
          "status": "待评价",
          "createTime": "2026-04-13 16:45:00",
          "products": [
            {
              "id": 7,
              "name": "渤海-水溶复合肥料 水溶性天然植提物授释长效肥-高塔造粒",
              "price": 120.00,
              "quantity": 1,
              "image": "D:\M\新建相册\化肥2.png"
            },
            {
              "id": 8,
              "name": "华锦-尿素氮肥 适用于多种植物",
              "price": 50.00,
              "quantity": 1,
              "image": "D:\M\新建相册\化肥3.png"
            },
            {
              "id": 9,
              "name": "鲁西-复合肥 硝硫基氮磷钾化肥 花卉盆栽硫酸钾三元通用型",
              "price": 80.00,
              "quantity": 0.6,
              "image": "D:\M\新建相册\化肥4.png"
            }
          ]
        },
        {
          "id": 5,
          "orderNo": "20260412001",
          "totalAmount": 198.00,
          "status": "已完成",
          "createTime": "2026-04-12 11:20:00",
          "products": [
            {
              "id": 4,
              "name": "国光毒箭5%氯氰菊酯果树烟草地 老虎青虫地下害虫钻心虫农药杀虫剂",
              "price": 6.00,
              "quantity": 33,
              "image": "D:\M\新建相册\农药4.png"
            }
          ]
        },
        {
          "id": 6,
          "orderNo": "20260411001",
          "totalAmount": 256.00,
          "status": "已完成",
          "createTime": "2026-04-11 15:30:00",
          "products": [
            {
              "id": 8,
              "name": "华锦-尿素氮肥 适用于多种植物",
              "price": 50.00,
              "quantity": 5,
              "image": "D:\M\新建相册\化肥3.png"
            },
            {
              "id": 10,
              "name": "罗布泊-钾肥",
              "price": 60.00,
              "quantity": 0.1,
              "image": "D:\M\新建相册\化肥5.png"
            }
          ]
        },
        {
          "id": 7,
          "orderNo": "20260330001",
          "totalAmount": 218.00,
          "status": "待评价",
          "createTime": "2026-03-30 10:00:00",
          "products": [
            {
              "id": 7,
              "name": "渤海-水溶复合肥料 水溶性天然植提物授释长效肥-高塔造粒",
              "price": 120.00,
              "quantity": 1,
              "image": "D:\M\新建相册\化肥2.png"
            },
            {
              "id": 8,
              "name": "华锦-尿素氮肥 适用于多种植物",
              "price": 50.00,
              "quantity": 1,
              "image": "D:\M\新建相册\化肥3.png"
            },
            {
              "id": 9,
              "name": "鲁西-复合肥 硝硫基氮磷钾化肥 花卉盆栽硫酸钾三元通用型",
              "price": 80.00,
              "quantity": 0.6,
              "image": "D:\M\新建相册\化肥4.png"
            }
          ]
        },
        {
          "id": 8,
          "orderNo": "20260229001",
          "totalAmount": 198.00,
          "status": "已完成",
          "createTime": "2026-02-29 14:00:00",
          "products": [
            {
              "id": 4,
              "name": "国光毒箭5%氯氰菊酯果树烟草地 老虎青虫地下害虫钻心虫农药杀虫剂",
              "price": 6.00,
              "quantity": 33,
              "image": "D:\M\新建相册\农药4.png"
            }
          ]
        },
        {
          "id": 9,
          "orderNo": "20260131001",
          "totalAmount": 256.00,
          "status": "已完成",
          "createTime": "2026-01-31 09:00:00",
          "products": [
            {
              "id": 8,
              "name": "华锦-尿素氮肥 适用于多种植物",
              "price": 50.00,
              "quantity": 5,
              "image": "D:\M\新建相册\化肥3.png"
            },
            {
              "id": 10,
              "name": "罗布泊-钾肥",
              "price": 60.00,
              "quantity": 0.1,
              "image": "D:\M\新建相册\化肥5.png"
            }
          ]
        },
        {
          "id": 10,
          "orderNo": "20260115001",
          "totalAmount": 156.00,
          "status": "已完成",
          "createTime": "2026-01-15 16:00:00",
          "products": [
            {
              "id": 1,
              "name": "三浦百灵6%春雷霉素番茄叶霉黄瓜角斑病 溃疡青枯软腐病杀菌剂农药",
              "price": 6.00,
              "quantity": 1,
              "image": "D:\M\新建相册\农药1.png"
            },
            {
              "id": 2,
              "name": "瀚生品星40%氟硅唑乳油黄瓜黑星病农药 内吸性杀菌剂保护治疗铲除",
              "price": 40.00,
              "quantity": 3,
              "image": "D:\M\新建相册\农药2.png"
            }
          ]
        }
      ],
      "users": {
        "total": 1523,
        "active": 1371,
        "new": 45
      }
    };
    
    app.globalData.categories = data.categories;
    app.globalData.products = data.products;
    app.globalData.orders = data.orders;
    app.globalData.users = data.users;
    console.log('数据加载完成:', data);
  }
});