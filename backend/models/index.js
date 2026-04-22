// 数据库连接和模型初始化
const { Sequelize } = require('sequelize');
const config = require('../config');

// 创建数据库连接
const sequelize = new Sequelize(
  config.database.database,
  config.database.username,
  config.database.password,
  {
    host: config.database.host,
    port: config.database.port,
    dialect: config.database.dialect,
    logging: config.database.logging,
    pool: config.database.pool
  }
);

// 导入模型
const User = require('./user')(sequelize);
const Category = require('./category')(sequelize);
const Product = require('./product')(sequelize);
const Order = require('./order')(sequelize);
const OrderItem = require('./orderItem')(sequelize);

// 定义模型关系
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

Product.hasMany(OrderItem, { foreignKey: 'productId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

// 初始化默认数据
async function initDefaultData() {
  try {
    // 检查是否存在管理员用户
    const adminCount = await User.count({ where: { role: 'admin' } });
    if (adminCount === 0) {
      await User.create({
        username: 'admin',
        password: '123456',
        role: 'admin',
        name: '管理员',
        phone: '13800138000'
      });
      console.log('默认管理员用户创建成功');
    }

    // 检查是否存在默认分类
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
  } catch (error) {
    console.error('初始化默认数据失败:', error);
  }
}

// 同步数据库模型并初始化数据
async function syncDatabase() {
  try {
    // 测试数据库连接
    await sequelize.authenticate();
    console.log('数据库连接成功');

    // 同步数据库模型
    await sequelize.sync({ alter: true });
    console.log('数据库模型同步成功');

    // 初始化默认数据
    await initDefaultData();
  } catch (error) {
    console.error('数据库初始化失败:', error);
    console.log('服务将在没有数据库的情况下启动，某些功能可能无法正常工作');
  }
}

// 导出模型
module.exports = {
  sequelize,
  User,
  Product,
  Order,
  OrderItem,
  Category,
  syncDatabase
};