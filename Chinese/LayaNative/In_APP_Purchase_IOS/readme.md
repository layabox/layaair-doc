# IOS应用内购买



　　IOS 应用内购买 即In App Purchase, 以下简称IAP.

　　由于App Store不支持类似支付宝和微信支付等第三方支付方式, 所以无论使用什么引擎或工具开发, 最终都需要通过Apple提供的IAP方式完成交易.

　　Layabox为了帮助开发者节省IAP相关接口的调试时间, 封装了这部分的相关接口, 并通过JavaScript语言提供给开发者直接调用或者进行扩展.

　　IAP的流程非常简单, 客户端直接和App Store通讯来完成交易, 如下图:

​	![blob.png](1.png) <br/>
​	图（1）


  对于单机游戏来说, 上图已经完成了一次IAP流程, 但是考虑到可能会出现作弊行为, 开发者还可以增加验证的步骤, 如下图:

​	![blob.png](2.png)<br/>
​	图（2）

  经过上述方式可以很好的防止作弊行为, 所以, 建议开发者一定要增加验证的步骤!

  了解了IAP的流程之后, 就可以开始着手实现功能.

  在使用IAP功能前, 需要进行一些准备工作:

  [IOS打包发布App详细流程](https://github.com/layabox/layaair-doc/tree/master/Chinese/LayaNative/packagingReleases_IOS)

完成上述操作之后, 就可以参照下面的示例代码完成IAP功能的实现.

### 1.  应用层JavaScript中编码

```javascript
// JavaScript中 组装充值相关参数. (参数意义参见本文末尾处的附录1)
var json= '{"order_id":"OriderID_20160824_9824","amount":1,"product_id":"Laya.joychina.test","callback_uri":"http://186.152.54.225:8800/Apple.pay"}';
 
// JavaScript中 调用充值函数. (这里会调用原生开发语言中对应的LP_Login方法)
conchMarket.recharge(json,function(jsonString) {
     var pJson = JSON.parse(jsonString);
     console.log("code:"+ pJson .code);
     console.log("product_id:"+ pJson.product_id);
     console.log("amount:"+ pJson.amount);
     console.log("order_id:"+ pJson.order_id);
     console.log("desc:"+ pJson.desc);
});
```

### 2.  IOS系统下Objective-C中编码 

(注: LayaNative中提供了一个消耗性商品示例类IAPManager类作为参考)

```javascript
// MarketAppStore.mm文件中的LP_Recharge方法中添加内购相关代码, 然后在JavaScript中调用conchMarket.recharge就会执行此方法.
-(void)LP_Recharge:(NSString*) jsonParam
{
    // TODO 添加内购相关代码.
}
```

通过上述步骤就可以轻松完成iOS中的IAP功能.

### 3.  充值接口及参数说明:   

  `conchMarket.recharge(jsonParam,callBack);`

`jsonParam`参数是输入参数,为json字符串, json对象必须提供以下属性

| 名称           | 类型     | 描述                          |
| ------------ | ------ | --------------------------- |
| product_id   | string | 苹果的商品ID (在iTunesConnect中设置) |
| amount       | number | 购买数量                        |
| order_id     | string | 订单ID (单机版设置空字符串)            |
| callback_uri | string | 服务器验证地址 (单机版设置空字符串)         |



`callBack`参数是购买回调函数，回传一个json字符串参数，json属性有以下：

| 名称         | 类型     | 描述                          |
| ---------- | ------ | --------------------------- |
| code       | number | 成功为0, 失败为-1                 |
| product_id | string | 苹果的商品ID (在iTunesConnect中设置) |
| amount     | number | 购买数量                        |
| order_id   | string | 订单ID                        |
| desc       | string | 成功"success",  失败"error"     |