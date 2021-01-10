
## 接口文档
### url
- http://xxx.xxx.xxxx/getList

### method 
- get 

### 参数 
- page    (page=1|page=2)

### 响应
``` json
{
    status: true,
    msg: "成功"
    data: [{
    id: 1,
    img: 'xxxx.jpg',
    type: 1,  // 1、京东超市 2、自营  3、精选 4无
    title: "三只松鼠鸭脖 休闲零食 鸭肉干肉脯 卤味零食小吃 鸭脖子甜辣味154g",
    price: 69.9
    },{
    id: 1,
    img: 'xxxx.jpg',
    type: 1,  // 1、京东超市 2、自营  3、精选 4无
    title: "三只松鼠鸭脖 休闲零食 鸭肉干肉脯 卤味零食小吃 鸭脖子甜辣味154g",
    price: 69.9
    }]
}
```