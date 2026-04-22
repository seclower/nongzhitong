// 订单模型
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    orderNo: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'processing', 'completed', 'cancelled'),
      defaultValue: 'pending'
    },
    paymentMethod: {
      type: DataTypes.ENUM('wechat', 'alipay', 'cash'),
      allowNull: true
    },
    paymentStatus: {
      type: DataTypes.ENUM('unpaid', 'paid', 'refunded'),
      defaultValue: 'unpaid'
    },
    shippingAddress: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    shippingPhone: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'orders',
    hooks: {
      // 生成订单号
      beforeCreate: (order) => {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 10000);
        order.orderNo = `ORD${timestamp}${random.toString().padStart(4, '0')}`;
      }
    }
  });

  return Order;
};