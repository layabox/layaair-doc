# 用反射机制对接Native APP渠道

LayaNative通过反射机制为开发者提供了对接渠道的接口, 下面的内容通过实现对接渠道商城(conchMarket)详细的介绍了如何利用反射机制完成对接渠道的工作.

### 1.对接渠道商城

LayaNative已经通过反射机制实现JavaScript与原生开发语言(Android下Java, iOS下Objective-C)的互相调用, 开发者只需要完成剩下的关于原生开发语言(Android下Java, iOS下Objective-C)部分的开发工作.

#### 1.1 iOS系统下的对接渠道商城实现:

##### Part.1 - 类名反射:

 通过LayaNative构建出的iOS项目工程中我们会看到PlatformInterface目录下有自动创建的MarketAppStore类, 这个类继承自LayaPlatformInterface类, 并且在resource/config.ini中设置了platformClassName=MarketAppStore, 这样, 我们以login方法为例, 只需要在MarketAppStore.mm中重写LP_Login方法, 就完成了对login方法的二次开发.

##### Part.2 - JavaScript调用OC:

 还是以上述的login方法为例, 在JavaScript中, 通过conchMarket类调用的login方法实际上就是在调用LayaPlatformInterface中的LP_Login方法, 而这个过程其实就是JavaScript调用OC的过程.

##### Part.3 - OC调用JavaScript:

 继续以上述的login方法为例, 在JavaScript中, 通过conchMarket类调用的login方法执行完成后会执行回调方法, 这个回调方法在LayaPlatformCallback中声明, 然后在LayaPlatformInterface的LP_Login中调用LayaPlatformCallback的LP_LoginCallback方法来实现OC调用JavaScript.

##### Part.4 - 代码片段:

```javascript
// JavaScript中调用方式: conchMarket.login([参数], [回调函数]) ;
var sData={type:"test"};
window.conchMarket.login(JSON.stringify(sData),function(data){
console.log(data);
// TODO 数据处理.
});
```

```javascript
// MarketAppStore.mm文件中根据自己需求添加相关代码到LP_Login方法中, JavaScript中调用conchMarket.login就会执行LP_Login方法.
-(void)LP_Login:(NSString*)jsonParam{
// TODO 调用第三方平台的登陆的登陆接口
// OC层调用登录结束回调.
[[LayaPlatformCallback GetInstance] LP_LoginCallback:pJsonString];
}
```

#### 1.2 Android系统下的对接渠道商城实现:

##### Part.1 - 类名反射:

 通过LayaNative构建出的Android项目工程中我们会看到layaair.game.Market包中有自动创建的MarketTest类, 这个类继承自LayaPlatformInterface类, 我们以login方法为例, 只需要在MarketTest.java中重写LP_Login方法, 就完成了对login方法的二次开发.

##### Part.2 - JavaScript调用Java:

 还是以上述的login方法为例, 在JavaScript中, 通过conchMarket类调用的login方法实际上就是在调用LayaPlatformInterface中的LP_Login方法, 而这个过程其实就是JavaScript调用Java的过程. 即: conchMarket.login => LayaPlatformInterface的LP_Login方法.

##### Part.3 - Java调用JavaScript:

 继续以上述的login方法为例, 在JavaScript中, 通过conchMarket类调用的login方法执行完成后会执行回调方法, 这个回调方法在LayaPlatformCallback中声明, 然后在LayaPlatformInterface的LP_Login中调用LayaPlatformCallback的LP_LoginCallback方法来实现Java调用JavaScript. 即: LayaPlatformInterface的LP_Login => LayaPlatformCallback的LP_LoginCallback.

##### Part.4 - 代码片段:

```javascript
// JavaScript中调用方式: conchMarket.login([参数], [回调函数]) ;
var sData={type:"test"};
window.conchMarket.login(JSON.stringify(sData),function(data){
console.log(data);
// 数据处理.
});
```

```javascript
// MarketTest.java文件中根据自己需求添加相关代码到LP_Login方法中, JavaScript中调用conchMarket.login就会执行LP_Login方法.
public void LP_Login(final String jsonParam)
{
// 调用第三方平台的登陆的登陆接口
// Java层调用登录结束回调.
LayaPlatformCallback.GetInstance().LP_LoginCallback(objCallBack.toString());
}
```

### 2.对接渠道的API整合

　　通过LayaNative提供的反射机制, 开发者可以将不同渠道的一些常用的API(如: 登录, 分享, 充值等)在JavaScript层做一套统一的接口, 然后再使用系统原生开发语言根据, LayaNative通过conchMarket全局类将对接渠道相关的API都整合起来, 以方便开发者使用, 如下表:

(注: 接口对应的原生开发语言(Android下Java, iOS下Objective-C)部分的编码工作请参照二次开发中的示例代码自行完成.)

| API名称                 | API描述      | API原型                                    |
| --------------------- | ---------- | ---------------------------------------- |
| init                  | 初始化Market  | `conchMarket.init(JSON.stringify(sData),function(data));` |
| login                 | 登陆         | `conchMarket.login(JSON.stringify(sData),function(data));` |
| logout                | 登出         | `conchMarket.logout(JSON.stringify(sData),function(data));` |
| switchUser            | 切换用户       | `conchMarket.switchUser(JSON.stringify(sData),function(data));` |
| enterPlatform         | 进入第三方的平台   | `conchMarket.enterPlatform(JSON.stringify(sData),function(data));` |
| enterBBS              | 进入论坛       | `conchMarket.enterBBS(JSON.stringify(sData),function(data));` |
| enterFeedback         | 反馈         | `conchMarket.enterFeedback(JSON.stringify(sData),function(data));` |
| enterAccountMgr       | 进入账户管理     | `conchMarket.enterAccountMgr(JSON.stringify(sData),function(data));` |
| authorize             | 授权         | `conchMarket.authorize(JSON.stringify(sData),function(data));` |
| refreshToken          | 刷新token    | `conchMarket.refreshToken(JSON.stringify(sData),function(data));` |
| recharge (1.0.4改为cz)             | 充值         | `conchMarket.recharge(JSON.stringify(sData),function(data));` |
| buyProps              | 购买道具       | `conchMarket.buyProps(JSON.stringify(sData),function(data));` |
| setRechargeInfo(1.0.4改为setCZInfo)       | 设置充值信息     | `conchMarket.setRechargeInfo(JSON.stringify(sData),function(data));` |
| enterShareAndFeed     | 分享         | `conchMarket.enterShareAndFeed(JSON.stringify(sData),function(data));` |
| enterInvite           | 邀请         | `conchMarket.enterInvite(JSON.stringify(sData),function(data));` |
| getGameFriends        | 获得好友列表     | `conchMarket.getGameFriends(JSON.stringify(sData),function(data));` |
| sendToDesktop         | 发送到桌面      | `conchMarket.sendToDesktop(JSON.stringify(sData),function(data));` |
| sendMessageToPlatform | 发送消息       | `conchMarket.sendMessageToPlatform(JSON.stringify(sData),function(data));` |
| canSendToDesktop      | 能否pushicon | `conchMarket.canSendToDesktop(JSON.stringify(sData),function(data));` |
| openTopicCircle       | 打开话题圈      | `conchMarket.openTopicCircle(JSON.stringify(sData),function(data));` |

**附录:**

[对接渠道demo for Eclipse(Android) 示例下载](http://ldc.layabox.com/download/tools/SampleForEclipse.zip)

[对接渠道demo for AndroidStudio(Android) 示例下载](http://ldc.layabox.com/download/tools/SampleForAndroidStudio.zip)