# 农智通后端API文档

## 1. 认证接口

### 1.1 登录
- **接口地址**: `/api/auth/login`
- **请求方式**: POST
- **请求参数**:
  | 参数名 | 类型 | 必选 | 描述 |
  | --- | --- | --- | --- |
  | username | string | 是 | 用户名 |
  | password | string | 是 | 密码 |
- **返回数据**:
  ```json
  {
    "message": "登录成功",
    "token": "JWT token",
    "user": {
      "id": 1,
      "username": "admin",
      "name": "管理员",
      "phone": "13800138000",
      "role": "admin"
    }
  }
  ```

### 1.2 注册
- **接口地址**: `/api/auth/register`
- **请求方式**: POST
- **请求参数**:
  | 参数名 | 类型 | 必选 | 描述 |
  | --- | --- | --- | --- |
  | username | string | 是 | 用户名 |
  | password | string | 是 | 密码 |
  | name | string | 是 | 姓名 |
  | phone | string | 是 | 手机号 |
  | address | string | 否 | 地址 |
- **返回数据**:
  ```json
  {
    "message": "注册成功",
    "token": "JWT token",
    "user": {
      "id": 1,
      "username": "user1",
      "name": "用户1",
      "phone": "13800138001",
      "role": "user"
    }
  }
  ```

### 1.3 验证token
- **接口地址**: `/api/auth/verify`
- **请求方式**: POST
- **请求参数**:
  | 参数名 | 类型 | 必选 | 描述 |
  | --- | --- | --- | --- |
  | token | string | 是 | JWT token |
- **返回数据**:
  ```json
  {
    "message": "token有效",
    "user": {
      "id": 1,
      "username": "admin",
      "name": "管理员",
      "phone": "13800138000",
      "role": "admin"
    }
  }
  ```

## 2. 用户接口

### 2.1 获取用户信息
- **接口地址**: `/api/user/info/:id`
- **请求方式**: GET
- **请求参数**: 路径参数 `id` (用户ID)
- **请求头**: `Authorization: Bearer {token}`
- **返回数据**:
  ```json
  {
    "message": "获取用户信息成功",
    "data": {
      "id": 1,
      "username": "user1",
      "name": "用户1",
      "phone": "13800138001",
      "address": "北京市朝阳区",
      "role": "user",
      "status": "active",
      "createdAt": "2026-04-13T08:00:00.000Z"
    }
  }
  ```

### 2.2 更新用户信息
- **接口地址**: `/api/user/update/:id`
- **请求方式**: PUT
- **请求参数**: 路径参数 `id` (用户ID)
- **请求头**: `Authorization: Bearer {token}`
- **请求体**:
  | 参数名 | 类型 | 必选 | 描述 |
  | --- | --- | --- | --- |
  | name | string | 是 | 姓名 |
  | phone | string | 是 | 手机号 |
  | address | string | 否 | 地址 |
- **返回数据**:
  ```json
  {
    "message": "更新用户信息成功",
    "data": {
      "id": 1,
      "username": "user1",
      "name": "用户1",
      "phone": "13800138001",
      "address": "北京市朝阳区",
      "role": "user",
      "status": "active"
    }
  }
  ```

### 2.3 修改密码
- **接口地址**: `/api/user/change-password/:id`
- **请求方式**: PUT
- **请求参数**: 路径参数 `id` (用户ID)
- **请求头**: `Authorization: Bearer {token}`
- **请求体**:
  | 参数名 | 类型 | 必选 | 描述 |
  | --- | --- | --- | --- |
  | oldPassword | string | 是 | 旧密码 |
  | newPassword | string | 是 | 新密码 |
- **返回数据**:
  ```json
  {
    "message": "修改密码成功"
  }
  ```

## 3. 产品接口

### 3.1 获取产品列表
- **接口地址**: `/api/product/list`
- **请求方式**: GET
- **请求参数**:
  | 参数名 | 类型 | 必选 | 描述 |
  | --- | --- | --- | --- |
  | page | number | 否 | 页码，默认1 |
  | pageSize | number | 否 | 每页数量，默认10 |
  | categoryId | number | 否 | 分类ID |
  | keyword | string | 否 | 搜索关键词 |
- **返回数据**:
  ```json
  {
    "message": "获取产品列表成功",
    "data": {
      "list": [
        {
          "id": 1,
          "name": "三浦百灵6%春雷霉素",
          "description": "番茄叶霉黄瓜角斑病 溃疡青枯软腐病杀菌剂农药",
          "price": 6.00,
          "stock": 100,
          "categoryId": 1,
          "imageUrl": "https://example.com/product1.jpg",
          "status": "active",
          "sales": 50,
          "createdAt": "2026-04-13T08:00:00.000Z",
          "Category": {
            "id": 1,
            "name": "杀菌剂"
          }
        }
      ],
      "total": 100,
      "page": 1,
      "pageSize": 10
    }
  }
  ```

### 3.2 获取产品详情
- **接口地址**: `/api/product/detail/:id`
- **请求方式**: GET
- **请求参数**: 路径参数 `id` (产品ID)
- **返回数据**:
  ```json
  {
    "message": "获取产品详情成功",
    "data": {
      "id": 1,
      "name": "三浦百灵6%春雷霉素",
      "description": "番茄叶霉黄瓜角斑病 溃疡青枯软腐病杀菌剂农药",
      "price": 6.00,
      "stock": 100,
      "categoryId": 1,
      "imageUrl": "https://example.com/product1.jpg",
      "status": "active",
      "sales": 50,
      "createdAt": "2026-04-13T08:00:00.000Z",
      "Category": {
        "id": 1,
        "name": "杀菌剂"
      }
    }
  }
  ```

### 3.3 获取热销产品
- **接口地址**: `/api/product/hot`
- **请求方式**: GET
- **返回数据**:
  ```json
  {
    "message": "获取热销产品成功",
    "data": [
      {
        "id": 1,
        "name": "三浦百灵6%春雷霉素",
        "price": 6.00,
        "sales": 50
      }
    ]
  }
  ```

### 3.4 添加产品（管理员）
- **接口地址**: `/api/product/create`
- **请求方式**: POST
- **请求头**: `Authorization: Bearer {token}`
- **请求体**:
  | 参数名 | 类型 | 必选 | 描述 |
  | --- | --- | --- | --- |
  | name | string | 是 | 产品名称 |
  | description | string | 否 | 产品描述 |
  | price | number | 是 | 产品价格 |
  | stock | number | 是 | 产品库存 |
  | categoryId | number | 是 | 分类ID |
  | imageUrl | string | 否 | 产品图片URL |
- **返回数据**:
  ```json
  {
    "message": "添加产品成功",
    "data": {
      "id": 1,
      "name": "三浦百灵6%春雷霉素",
      "description": "番茄叶霉黄瓜角斑病 溃疡青枯软腐病杀菌剂农药",
      "price": 6.00,
      "stock": 100,
      "categoryId": 1,
      "imageUrl": "https://example.com/product1.jpg",
      "status": "active",
      "sales": 0
    }
  }
  ```

### 3.5 修改产品（管理员）
- **接口地址**: `/api/product/update/:id`
- **请求方式**: PUT
- **请求参数**: 路径参数 `id` (产品ID)
- **请求头**: `Authorization: Bearer {token}`
- **请求体**:
  | 参数名 | 类型 | 必选 | 描述 |
  | --- | --- | --- | --- |
  | name | string | 是 | 产品名称 |
  | description | string | 否 | 产品描述 |
  | price | number | 是 | 产品价格 |
  | stock | number | 是 | 产品库存 |
  | categoryId | number | 是 | 分类ID |
  | imageUrl | string | 否 | 产品图片URL |
  | status | string | 否 | 产品状态 (active/inactive) |
- **返回数据**:
  ```json
  {
    "message": "修改产品成功",
    "data": {
      "id": 1,
      "name": "三浦百灵6%春雷霉素",
      "description": "番茄叶霉黄瓜角斑病 溃疡青枯软腐病杀菌剂农药",
      "price": 6.00,
      "stock": 100,
      "categoryId": 1,
      "imageUrl": "https://example.com/product1.jpg",
      "status": "active",
      "sales": 50
    }
  }
  ```

### 3.6 删除产品（管理员）
- **接口地址**: `/api/product/delete/:id`
- **请求方式**: DELETE
- **请求参数**: 路径参数 `id` (产品ID)
- **请求头**: `Authorization: Bearer {token}`
- **返回数据**:
  ```json
  {
    "message": "删除产品成功"
  }
  ```

## 4. 订单接口

### 4.1 创建订单
- **接口地址**: `/api/order/create`
- **请求方式**: POST
- **请求头**: `Authorization: Bearer {token}`
- **请求体**:
  | 参数名 | 类型 | 必选 | 描述 |
  | --- | --- | --- | --- |
  | userId | number | 是 | 用户ID |
  | items | array | 是 | 订单项列表 |
  | totalAmount | number | 是 | 总金额 |
  | shippingAddress | string | 是 | 收货地址 |
  | shippingPhone | string | 是 | 联系电话 |
  | notes | string | 否 | 备注 |
  | paymentMethod | string | 否 | 支付方式 (wechat/alipay/cash) |
- **items数组元素**:
  | 参数名 | 类型 | 必选 | 描述 |
  | --- | --- | --- | --- |
  | productId | number | 是 | 产品ID |
  | quantity | number | 是 | 数量 |
  | price | number | 是 | 单价 |
- **返回数据**:
  ```json
  {
    "message": "创建订单成功",
    "data": {
      "id": 1,
      "orderNo": "ORD1234567890123",
      "userId": 1,
      "totalAmount": 128.00,
      "status": "pending",
      "paymentMethod": "wechat",
      "paymentStatus": "unpaid",
      "shippingAddress": "北京市朝阳区",
      "shippingPhone": "13800138001",
      "notes": "备注信息",
      "createdAt": "2026-04-13T08:00:00.000Z"
    }
  }
  ```

### 4.2 获取订单列表
- **接口地址**: `/api/order/list`
- **请求方式**: GET
- **请求头**: `Authorization: Bearer {token}`
- **请求参数**:
  | 参数名 | 类型 | 必选 | 描述 |
  | --- | --- | --- | --- |
  | page | number | 否 | 页码，默认1 |
  | pageSize | number | 否 | 每页数量，默认10 |
  | userId | number | 否 | 用户ID (管理员可查询所有用户订单) |
  | status | string | 否 | 订单状态 (pending/processing/completed/cancelled) |
- **返回数据**:
  ```json
  {
    "message": "获取订单列表成功",
    "data": {
      "list": [
        {
          "id": 1,
          "orderNo": "ORD1234567890123",
          "userId": 1,
          "totalAmount": 128.00,
          "status": "completed",
          "paymentMethod": "wechat",
          "paymentStatus": "paid",
          "shippingAddress": "北京市朝阳区",
          "shippingPhone": "13800138001",
          "notes": "备注信息",
          "createdAt": "2026-04-13T08:00:00.000Z",
          "User": {
            "id": 1,
            "username": "user1",
            "name": "用户1"
          },
          "OrderItems": [
            {
              "id": 1,
              "orderId": 1,
              "productId": 1,
              "quantity": 2,
              "price": 6.00,
              "Product": {
                "id": 1,
                "name": "三浦百灵6%春雷霉素",
                "imageUrl": "https://example.com/product1.jpg"
              }
            }
          ]
        }
      ],
      "total": 10,
      "page": 1,
      "pageSize": 10
    }
  }
  ```

### 4.3 获取订单详情
- **接口地址**: `/api/order/detail/:id`
- **请求方式**: GET
- **请求参数**: 路径参数 `id` (订单ID)
- **请求头**: `Authorization: Bearer {token}`
- **返回数据**:
  ```json
  {
    "message": "获取订单详情成功",
    "data": {
      "id": 1,
      "orderNo": "ORD1234567890123",
      "userId": 1,
      "totalAmount": 128.00,
      "status": "completed",
      "paymentMethod": "wechat",
      "paymentStatus": "paid",
      "shippingAddress": "北京市朝阳区",
      "shippingPhone": "13800138001",
      "notes": "备注信息",
      "createdAt": "2026-04-13T08:00:00.000Z",
      "User": {
        "id": 1,
        "username": "user1",
        "name": "用户1"
      },
      "OrderItems": [
        {
          "id": 1,
          "orderId": 1,
          "productId": 1,
          "quantity": 2,
          "price": 6.00,
          "Product": {
            "id": 1,
            "name": "三浦百灵6%春雷霉素",
            "imageUrl": "https://example.com/product1.jpg"
          }
        }
      ]
    }
  }
  ```

### 4.4 更新订单状态（管理员）
- **接口地址**: `/api/order/update/:id`
- **请求方式**: PUT
- **请求参数**: 路径参数 `id` (订单ID)
- **请求头**: `Authorization: Bearer {token}`
- **请求体**:
  | 参数名 | 类型 | 必选 | 描述 |
  | --- | --- | --- | --- |
  | status | string | 否 | 订单状态 (pending/processing/completed/cancelled) |
  | paymentStatus | string | 否 | 支付状态 (unpaid/paid/refunded) |
- **返回数据**:
  ```json
  {
    "message": "更新订单状态成功",
    "data": {
      "id": 1,
      "orderNo": "ORD1234567890123",
      "status": "completed",
      "paymentStatus": "paid"
    }
  }
  ```

## 5. 分类接口

### 5.1 获取分类列表
- **接口地址**: `/api/category/list`
- **请求方式**: GET
- **返回数据**:
  ```json
  {
    "message": "获取分类列表成功",
    "data": [
      {
        "id": 1,
        "name": "杀菌剂",
        "parentId": null,
        "level": 1,
        "status": "active"
      },
      {
        "id": 2,
        "name": "杀虫剂",
        "parentId": null,
        "level": 1,
        "status": "active"
      }
    ]
  }
  ```

### 5.2 获取分类详情
- **接口地址**: `/api/category/detail/:id`
- **请求方式**: GET
- **请求参数**: 路径参数 `id` (分类ID)
- **返回数据**:
  ```json
  {
    "message": "获取分类详情成功",
    "data": {
      "id": 1,
      "name": "杀菌剂",
      "parentId": null,
      "level": 1,
      "status": "active"
    }
  }
  ```

### 5.3 创建分类（管理员）
- **接口地址**: `/api/category/create`
- **请求方式**: POST
- **请求头**: `Authorization: Bearer {token}`
- **请求体**:
  | 参数名 | 类型 | 必选 | 描述 |
  | --- | --- | --- | --- |
  | name | string | 是 | 分类名称 |
  | parentId | number | 否 | 父分类ID |
  | level | number | 是 | 分类级别 |
- **返回数据**:
  ```json
  {
    "message": "创建分类成功",
    "data": {
      "id": 3,
      "name": "除草剂",
      "parentId": null,
      "level": 1,
      "status": "active"
    }
  }
  ```

### 5.4 更新分类（管理员）
- **接口地址**: `/api/category/update/:id`
- **请求方式**: PUT
- **请求参数**: 路径参数 `id` (分类ID)
- **请求头**: `Authorization: Bearer {token}`
- **请求体**:
  | 参数名 | 类型 | 必选 | 描述 |
  | --- | --- | --- | --- |
  | name | string | 是 | 分类名称 |
  | parentId | number | 否 | 父分类ID |
  | level | number | 是 | 分类级别 |
  | status | string | 否 | 分类状态 (active/inactive) |
- **返回数据**:
  ```json
  {
    "message": "更新分类成功",
    "data": {
      "id": 3,
      "name": "除草剂",
      "parentId": null,
      "level": 1,
      "status": "active"
    }
  }
  ```

### 5.5 删除分类（管理员）
- **接口地址**: `/api/category/delete/:id`
- **请求方式**: DELETE
- **请求参数**: 路径参数 `id` (分类ID)
- **请求头**: `Authorization: Bearer {token}`
- **返回数据**:
  ```json
  {
    "message": "删除分类成功"
  }
  ```

## 6. 管理员接口

### 6.1 获取用户列表（管理员）
- **接口地址**: `/api/admin/users`
- **请求方式**: GET
- **请求头**: `Authorization: Bearer {token}`
- **请求参数**:
  | 参数名 | 类型 | 必选 | 描述 |
  | --- | --- | --- | --- |
  | page | number | 否 | 页码，默认1 |
  | pageSize | number | 否 | 每页数量，默认10 |
  | keyword | string | 否 | 搜索关键词（用户名、姓名、手机号） |
- **返回数据**:
  ```json
  {
    "message": "获取用户列表成功",
    "data": {
      "list": [
        {
          "id": 1,
          "username": "user1",
          "name": "用户1",
          "phone": "13800138001",
          "role": "user",
          "status": "active",
          "createdAt": "2026-04-13T08:00:00.000Z"
        }
      ],
      "total": 100,
      "page": 1,
      "pageSize": 10
    }
  }
  ```

### 6.2 管理产品（管理员）
- **接口地址**: `/api/admin/products`
- **请求方式**: GET
- **请求头**: `Authorization: Bearer {token}`
- **请求参数**:
  | 参数名 | 类型 | 必选 | 描述 |
  | --- | --- | --- | --- |
  | page | number | 否 | 页码，默认1 |
  | pageSize | number | 否 | 每页数量，默认10 |
  | keyword | string | 否 | 搜索关键词 |
  | categoryId | number | 否 | 分类ID |
- **返回数据**:
  ```json
  {
    "message": "获取产品列表成功",
    "data": {
      "list": [
        {
          "id": 1,
          "name": "三浦百灵6%春雷霉素",
          "price": 6.00,
          "stock": 100,
          "sales": 50,
          "status": "active",
          "createdAt": "2026-04-13T08:00:00.000Z",
          "Category": {
            "id": 1,
            "name": "杀菌剂"
          }
        }
      ],
      "total": 100,
      "page": 1,
      "pageSize": 10
    }
  }
  ```

### 6.3 管理订单（管理员）
- **接口地址**: `/api/admin/orders`
- **请求方式**: GET
- **请求头**: `Authorization: Bearer {token}`
- **请求参数**:
  | 参数名 | 类型 | 必选 | 描述 |
  | --- | --- | --- | --- |
  | page | number | 否 | 页码，默认1 |
  | pageSize | number | 否 | 每页数量，默认10 |
  | orderNo | string | 否 | 订单号 |
  | status | string | 否 | 订单状态 |
  | userId | number | 否 | 用户ID |
- **返回数据**:
  ```json
  {
    "message": "获取订单列表成功",
    "data": {
      "list": [
        {
          "id": 1,
          "orderNo": "ORD1234567890123",
          "userId": 1,
          "totalAmount": 128.00,
          "status": "completed",
          "paymentStatus": "paid",
          "createdAt": "2026-04-13T08:00:00.000Z",
          "User": {
            "id": 1,
            "username": "user1",
            "name": "用户1"
          }
        }
      ],
      "total": 10,
      "page": 1,
      "pageSize": 10
    }
  }
  ```

### 6.4 获取数据统计（管理员）
- **接口地址**: `/api/admin/stats`
- **请求方式**: GET
- **请求头**: `Authorization: Bearer {token}`
- **返回数据**:
  ```json
  {
    "message": "获取数据统计成功",
    "data": {
      "userCount": 100,
      "productCount": 50,
      "orderCount": 200,
      "totalSales": 15680.00,
      "todayOrderCount": 24
    }
  }
  ```

## 7. 错误码说明

| 错误码 | 描述 |
| --- | --- |
| 400 | 请求参数错误 |
| 401 | 未授权，需要登录 |
| 403 | 权限不足 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

## 8. 测试账号

- **用户端测试账号**: 111
- **用户端密码**: 123456
- **商户后台管理账号**: admin
- **商户后台密码**: 123456