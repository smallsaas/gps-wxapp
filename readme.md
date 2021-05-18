# 场地导航
<strong>注：<strong>项目运行时需要配置config.js 的host

## 导航类型接口定义
+ GET   /api/xxx   
<strong>注：<strong> 接口可通过类型（type）查询

+ 类型字段定义

| 字段 | 字段名 | 类型 | 居中对齐 |
| :-----| :----- | :----- | :----- |
| id | id | String | 表id |
| 标题名称 | title | String |
| 图标 | icon | String |
| 背景颜色 | bgColor | String |

+ 接口返回示例
```js
{
  code: 200,
  data: {
    list: [{
            title: '国家体育场馆',
            icon: '',
            bgColor: '#FFFFFF',
       }],
        page: 1,
        totalpages: 1,
        total: 1
    }]
}         
```


## 导航列表接口定义
+ GET   /api/xxx

+ 列表字段定义

| 字段 | 字段名 | 类型 | 居中对齐 |
| :-----| :----- | :----- | :----- |
| id | id | String | 表id |
| 图片 | image | String |
| 标题名称 | title | String |
| 类型 | type | String |
| 状态 | status | String | 执法状态 |
| 纬度 | latitude | Number(float) |
| 经度 | longitude | Number(float) |
| 地址 | address | String |
| 电话 | phone | String |

+ 接口返回示例
```js
{
  code: 200,
  data: {
    list: [{
            type: '体育场馆',
            latitude: 39.909652,
            longitude: 116.404177,
            address: '北京市天安门广场',
            title: '国家体育场馆',
            image: '',
            status: '未检查',
            phone: '95000'
       }],
        page: 1,
        totalpages: 1,
        total: 1
    }]
}         
```