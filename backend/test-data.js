// 生成测试数据
const { sequelize, User, Product, Order, OrderItem, Category } = require('./models');

// 模拟产品数据
const products = [
  {
    name: '三浦百灵6%春雷霉素番茄叶霉黄瓜角斑病 溃疡青枯软腐病杀菌剂农药',
    description: '三浦百灵6%春雷霉素是一种高效、低毒、广谱的杀菌剂，对番茄叶霉病、黄瓜角斑病、溃疡病、青枯病、软腐病等多种病害有良好的防治效果。使用方法：稀释1000-1500倍液，均匀喷雾。注意事项：避免与碱性农药混用，安全间隔期7天。',
    price: 6.00,
    stock: 100,
    categoryId: 3, // 农药
    imageUrl: 'https://example.com/images/product1.jpg',
    sales: 50
  },
  {
    name: '华锦-尿素氮肥',
    description: '适用于多种植物，涵盖家庭园艺植物、观花植物、观叶植物、多肉植物、瓜果植物、果树等。使用方法：基肥或追肥，根据不同作物和土壤情况调整用量。注意事项：避免与种子直接接触，储存于阴凉干燥处。',
    price: 50.00,
    stock: 500,
    categoryId: 2, // 肥料
    imageUrl: 'https://example.com/images/product2.jpg',
    sales: 120
  },
  {
    name: '鲁西-复合肥 硝硫基氮磷钾化肥 花卉盆栽硫酸钾三元通用型',
    description: '适用于花卉、盆栽等植物。使用方法：基肥或追肥，根据不同作物和土壤情况调整用量。注意事项：避免与种子直接接触，储存于阴凉干燥处。',
    price: 80.00,
    stock: 400,
    categoryId: 2, // 肥料
    imageUrl: 'https://example.com/images/product3.jpg',
    sales: 80
  },
  {
    name: '罗布泊-钾肥',
    description: '适用于各种需要钾肥的作物。使用方法：基肥或追肥，根据不同作物和土壤情况调整用量。注意事项：避免与种子直接接触，储存于阴凉干燥处。',
    price: 60.00,
    stock: 350,
    categoryId: 2, // 肥料
    imageUrl: 'https://example.com/images/product4.jpg',
    sales: 60
  },
  {
    name: '迪米佳-复合肥料-高塔硝硫基15-5-25',
    description: '适用于多种农作物。使用方法：基肥或追肥，可穴施、条施或撒施。注意事项：避免与种子直接接触，储存于阴凉干燥处。',
    price: 90.00,
    stock: 300,
    categoryId: 2, // 肥料
    imageUrl: 'https://example.com/images/product5.jpg',
    sales: 45
  },
  {
    name: '渤海-水溶复合肥料 水溶性天然植提物授释长效肥-高塔造粒',
    description: '适用于玉米、小麦、水稻等大田农作物。使用方法：基肥或追肥，可穴施、条施或撒施。注意事项：避免与种子直接接触，储存于阴凉干燥处。产品优势：绿色环保，不含芳烃溶剂，VOCs排放为零，可直接用于绿色食品、有机农产品生产。',
    price: 120.00,
    stock: 300,
    categoryId: 2, // 肥料
    imageUrl: 'https://example.com/images/product6.jpg',
    sales: 30
  },
  {
    name: '鲁西-复合肥料15-15-15',
    description: '适用于多种农作物。使用方法：基肥或追肥，根据不同作物和土壤情况调整用量。注意事项：避免与种子直接接触，储存于阴凉干燥处。',
    price: 75.00,
    stock: 400,
    categoryId: 2, // 肥料
    imageUrl: 'https://example.com/images/product7.jpg',
    sales: 55
  },
  {
    name: '瀚生速彪5%高效氯氟氰菊酯 农药杀虫剂',
    description: '用于防治多种害虫。使用方法：稀释1000-1500倍液，均匀喷雾。注意事项：避免与碱性农药混用，安全间隔期7天。',
    price: 15.00,
    stock: 200,
    categoryId: 3, // 农药
    imageUrl: 'https://example.com/images/product8.jpg',
    sales: 70
  },
  {
    name: '国光-根宝 生根壮苗剂',
    description: '用于促进植物生根壮苗。使用方法：稀释800-1000倍液，灌根或叶面喷施。注意事项：避免与碱性农药混用。',
    price: 10.00,
    stock: 250,
    categoryId: 3, // 农药
    imageUrl: 'https://example.com/images/product9.jpg',
    sales: 90
  },
  {
    name: '国光络佳-钙高含量钙肥',
    description: '用于果树增加果实硬度、缓解缺钙裂果干烧心叶面肥。使用方法：稀释800-1000倍液，叶面喷施。注意事项：避免与碱性农药混用，安全间隔期7天。产品优势：经济高效，亩均用药成本降低10%-15%，且产品残留低，能让农产品溢价10%-20%。',
    price: 15.00,
    stock: 200,
    categoryId: 2, // 肥料
    imageUrl: 'https://example.com/images/product10.jpg',
    sales: 40
  },
  {
    name: '翰生金甲钢拳7%甲维盐顺氯杀虫剂',
    description: '用于甜菜夜蛾、小菜蛾、菜青虫、斜纹夜蛾、烟青虫、棉铃虫等害虫的防治。使用方法：稀释1000-1500倍液，均匀喷雾。注意事项：避免与碱性农药混用，安全间隔期7天。产品优势：使用便捷，易溶于水，不会出现分层、沉淀现象，可与多数农药混配。',
    price: 12.00,
    stock: 250,
    categoryId: 3, // 农药
    imageUrl: 'https://example.com/images/product11.jpg',
    sales: 65
  },
  {
    name: '国光毒箭5%氯氰菊酯-农药杀虫剂',
    description: '用于防治多种害虫。使用方法：稀释1000-1500倍液，均匀喷雾。注意事项：避免与碱性农药混用，安全间隔期7天。',
    price: 6.00,
    stock: 300,
    categoryId: 3, // 农药
    imageUrl: 'https://example.com/images/product12.jpg',
    sales: 85
  },
  {
    name: '巴斯夫-格力高溴虫氟苯双酰胺 杀虫剂农药',
    description: '用于防治多种害虫。使用方法：按照包装说明使用。注意事项：避免与碱性农药混用，安全间隔期7天。',
    price: 100.00,
    stock: 100,
    categoryId: 3, // 农药
    imageUrl: 'https://example.com/images/product13.jpg',
    sales: 25
  },
  {
    name: '瀚生品星40%氟硅唑乳油',
    description: '用于防治多种病害。使用方法：稀释1000-1500倍液，均匀喷雾。注意事项：避免与碱性农药混用，安全间隔期7天。',
    price: 40.00,
    stock: 150,
    categoryId: 3, // 农药
    imageUrl: 'https://example.com/images/product14.jpg',
    sales: 35
  },
  {
    name: '三浦百灵6%春雷霉素杀菌剂农药',
    description: '用于防治多种病害。使用方法：稀释1000-1500倍液，均匀喷雾。注意事项：避免与碱性农药混用，安全间隔期7天。',
    price: 6.00,
    stock: 300,
    categoryId: 3, // 农药
    imageUrl: 'https://example.com/images/product15.jpg',
    sales: 75
  },
  {
    name: '春秋大业菠菜种子',
    description: '适用于种植菠菜。使用方法：按照包装说明播种。注意事项：储存于阴凉干燥处。',
    price: 5.00,
    stock: 500,
    categoryId: 1, // 种子
    imageUrl: 'https://example.com/images/product16.jpg',
    sales: 100
  },
  {
    name: '美国大速生生菜种子',
    description: '适用于种植生菜。使用方法：按照包装说明播种。注意事项：储存于阴凉干燥处。',
    price: 8.00,
    stock: 400,
    categoryId: 1, // 种子
    imageUrl: 'https://example.com/images/product17.jpg',
    sales: 95
  },
  {
    name: '灰太郎南瓜种子',
    description: '适用于种植南瓜。使用方法：按照包装说明播种。注意事项：储存于阴凉干燥处。',
    price: 6.00,
    stock: 300,
    categoryId: 1, // 种子
    imageUrl: 'https://example.com/images/product18.jpg',
    sales: 60
  },
  {
    name: '红樱桃萝卜种子',
    description: '适用于种植樱桃萝卜。使用方法：按照包装说明播种。注意事项：储存于阴凉干燥处。',
    price: 4.00,
    stock: 500,
    categoryId: 1, // 种子
    imageUrl: 'https://example.com/images/product19.jpg',
    sales: 110
  },
  {
    name: '水师营6号大白菜种子',
    description: '适用于种植大白菜。使用方法：按照包装说明播种。注意事项：储存于阴凉干燥处。',
    price: 7.00,
    stock: 350,
    categoryId: 1, // 种子
    imageUrl: 'https://example.com/images/product20.jpg',
    sales: 85
  },
  {
    name: '进口香菜籽',
    description: '适用于种植香菜。使用方法：按照包装说明播种。注意事项：储存于阴凉干燥处。',
    price: 3.00,
    stock: 600,
    categoryId: 1, // 种子
    imageUrl: 'https://example.com/images/product21.jpg',
    sales: 130
  },
  {
    name: '多功能园艺工具套装',
    description: '包含铲子、耙子、剪刀等多种园艺工具，适用于各种园艺作业。使用方法：根据不同工具的用途正确使用。注意事项：使用后清洁并妥善保管。',
    price: 50.00,
    stock: 100,
    categoryId: 4, // 农具
    imageUrl: 'https://example.com/images/product22.jpg',
    sales: 45
  },
  {
    name: '手动喷雾器',
    description: '用于喷洒农药、肥料等。使用方法：按照说明书操作。注意事项：使用后清洁，避免与碱性物质接触。',
    price: 30.00,
    stock: 150,
    categoryId: 4, // 农具
    imageUrl: 'https://example.com/images/product23.jpg',
    sales: 70
  },
  {
    name: '园艺手套',
    description: '保护手部，适用于各种园艺作业。使用方法：直接佩戴。注意事项：避免接触尖锐物品。',
    price: 10.00,
    stock: 200,
    categoryId: 4, // 农具
    imageUrl: 'https://example.com/images/product24.jpg',
    sales: 120
  }
];

// 模拟用户数据
const users = [
  {
    username: 'user1',
    password: '123456',
    role: 'user',
    name: '张三',
    phone: '13800138001'
  },
  {
    username: 'user2',
    password: '123456',
    role: 'user',
    name: '李四',
    phone: '13800138002'
  },
  {
    username: 'user3',
    password: '123456',
    role: 'user',
    name: '王五',
    phone: '13800138003'
  }
];

// 生成测试数据
async function generateTestData() {
  try {
    // 同步数据库模型
    await sequelize.sync({ alter: true });
    console.log('数据库模型同步成功');

    // 检查是否存在分类
    const categoryCount = await Category.count();
    if (categoryCount === 0) {
      await Category.bulkCreate([
        { name: '种子', level: 1 },
        { name: '肥料', level: 1 },
        { name: '农药', level: 1 },
        { name: '农具', level: 1 }
      ]);
      console.log('默认分类创建成功');
    }

    // 检查是否存在产品
    const productCount = await Product.count();
    if (productCount === 0) {
      await Product.bulkCreate(products);
      console.log('产品数据创建成功');
    }

    // 检查是否存在用户
    const userCount = await User.count();
    if (userCount === 0) {
      // 创建管理员用户
      await User.create({
        username: 'admin',
        password: '123456',
        role: 'admin',
        name: '管理员',
        phone: '13800138000'
      });
      // 创建普通用户
      await User.bulkCreate(users);
      console.log('用户数据创建成功');
    }

    // 检查是否存在订单
    const orderCount = await Order.count();
    if (orderCount === 0) {
      // 获取用户
      const userList = await User.findAll({ where: { role: 'user' } });
      // 获取产品
      const productList = await Product.findAll();

      // 为每个用户创建订单
      for (let i = 0; i < userList.length; i++) {
        const user = userList[i];
        
        // 创建3个订单
        for (let j = 0; j < 3; j++) {
          // 生成订单号
          const timestamp = Date.now();
          const random = Math.floor(Math.random() * 10000);
          const orderNo = `ORD${timestamp}${random.toString().padStart(4, '0')}`;
          
          const order = await Order.create({
            orderNo: orderNo,
            userId: user.id,
            totalAmount: 0,
            status: ['pending', 'processing', 'completed'][j],
            shippingAddress: `${user.name}的地址${j + 1}`,
            shippingPhone: user.phone
          });

          // 为每个订单添加2-3个商品
          const itemCount = Math.floor(Math.random() * 2) + 2;
          let totalAmount = 0;

          for (let k = 0; k < itemCount; k++) {
            const product = productList[Math.floor(Math.random() * productList.length)];
            const quantity = Math.floor(Math.random() * 3) + 1;
            const price = product.price;
            
            await OrderItem.create({
              orderId: order.id,
              productId: product.id,
              quantity: quantity,
              price: price
            });

            totalAmount += price * quantity;
          }

          // 更新订单总金额
          await order.update({ totalAmount: totalAmount });
        }
      }

      console.log('订单数据创建成功');
    }

    console.log('测试数据生成完成');
  } catch (error) {
    console.error('生成测试数据失败:', error);
  } finally {
    // 关闭数据库连接
    await sequelize.close();
  }
}

// 执行生成测试数据
generateTestData();