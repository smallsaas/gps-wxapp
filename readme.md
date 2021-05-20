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
        id: 'xxx',
        title: '国家体育场馆',
        icon: '',
        bgColor: '#FFFFFF'
    }],
    page: 1,
    totalpages: 1,
    total: 1
  }
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
        id: 'xxx',
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
  }
}        
```

## 导航模块测试数据说明
<strong>注：<strong> 现在接的是正常请求数据。

若要使用测试数据，按下面操作。

1. 在文件中引入mock数据

```js
import { navList, navTypeList } from '../../assets/mockData.js'
```

2. 在请求导航类型、导航列表接口替换即可。

```js
// 获取类别数据
async fetchTypeList () {
    // const res = await getNavTypeList()  // 使用测试数据时隐藏
                
    // ** 测试数据
    const res = navTypeList    //使用测试数据时加上此处
    // **

    if (res.code === 200) {
        const list = _.cloneDeep(_.get(res, 'data.list', []))
        list.unshift({ title: '全部'})
        this.typeList = [...list]
         }
    }
```

```js
async fetchList () {
	//const res = await getNavList()    // 使用测试数据时隐藏
                
    // ** 试数据
    const res = navList  //使用测试数据时加上此处
    // **
                
	if (res.code === 200) {
		this.list = _.get(res, 'data.list', [])
        const markersList = []
		this.list.map((item, index) => {
		markersList.push({
			id: index + 1,
			latitude: item.latitude,
			longitude: item.longitude,
			title: item.title,
			customCallout: {...customCallout},
                bgColor: this.getCustomCalloutBgColor(item.type),
                type: item.type,
                address: item.address
                })
			})
            this.markers = [...markersList];
            this.allmarkers = [...markersList]
    }
},
```

<strong>注：<strong> 导航地图页及导航列表的测试数据修改是一样的方法，按上图修改即可。
