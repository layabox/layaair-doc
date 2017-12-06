# Use reflective mechanism to dock Native APP channels

LayaNative provides ,through the reflection mechanism for developers, a docking channel interface. The following contents introduce in detail how to use reflection mechanism to complete the work of docking channel by implementing docking channel Mall (conchMarket).

### 1.Docking channel mall

LayaNative has implemented JavaScript and native development languages through reflection mechanisms (Android under Java, iOS under Objective-C) Call each other, Developers only need to complete the rest of the native development language part of the development work.

#### 1.1 iOS system docking channel Mall to achieve:

##### Part.1 - Class name reflection:

 In the iOS project project built through LayaNative, we will see that there are automatically created MarketAppStore classes in the PlatformInterface directory, class inherits from the LayaPlatformInterface class, And set in the resource/config.ini platformClassName=MarketAppStore. In this way, we take the login method as an example, and only need to rewrite the LP_Login method in the MarketAppStore.mm, and we have completed the two development of the login method.

##### Part.2 - JavaScript call OC:

 Taking the above login method as an example, in JavaScript, the login method invoked by conchMarket class is actually calling the LP_Login method in LayaPlatformInterface, which is actually the process of JavaScript calling OC.

##### Part.3 - OC transfer JavaScript:

 To continue with the above login method, for example, in JavaScript, call through the conchMarket class login method is executed after the implementation of the callback method, the callback method is declared in LayaPlatformCallback, and then call LayaPlatformCallback LP_LoginCallback method in Lay_PlatformInterface LP_Login to achieve OC Call JavaScript.

##### Part.4 - code segment:

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

#### 1.2 Android docking channel under the system is realized :

##### Part.1 - Class name reflection:

 In the Android project built through LayaNative, we will see the layaair.game.Market package automatically created MarketTest class

##### Part.2 - JavaScript call Java:

 Taking the above login method as an example, in JavaScript, the login method invoked by conchMarket class is actually calling the LP_Login method in LayaPlatformInterface, which is actually the process of JavaScript calling Java. Which is: conchMarket.login => LayaPlatformInterface from LP_Login method.

##### Part.3 - Java call JavaScript:

 To continue with the above login method in JavaScript, through the conchMarket class executes after the callback method, the callback method in a LayaPlatformCallback statement. Then call the LP_LoginCallback method in LayaPlatformInterface LP_Login LayaPlatformCallback to achieve Java call JavaScript. Which is : LayaPlatformInterface from LP_Login => LayaPlatformCallback from LP_LoginCallback.

##### Part.4 - code snippets:

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

### 2.API integration of docking channels

　　Through the reflection mechanism provided by LayaNative, developers can make some common APIs (such as login, share, reload, etc.) in different layers to make a unified interface in the JavaScript layer, and then use the native language of the system. LayaNative uses conchMarket The global class integrates the APIs that interface with the channel to facilitate the use of developers, as shown in the following table:

Note: the coding of the interface corresponding to the native development language (Android with Java, iOS with Objective-C) is done by reference to the sample code in the second development.

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
| recharge              | 充值         | `conchMarket.recharge(JSON.stringify(sData),function(data));` |
| buyProps              | 购买道具       | `conchMarket.buyProps(JSON.stringify(sData),function(data));` |
| setRechargeInfo       | 设置充值信息     | `conchMarket.setRechargeInfo(JSON.stringify(sData),function(data));` |
| enterShareAndFeed     | 分享         | `conchMarket.enterShareAndFeed(JSON.stringify(sData),function(data));` |
| enterInvite           | 邀请         | `conchMarket.enterInvite(JSON.stringify(sData),function(data));` |
| getGameFriends        | 获得好友列表     | `conchMarket.getGameFriends(JSON.stringify(sData),function(data));` |
| sendToDesktop         | 发送到桌面      | `conchMarket.sendToDesktop(JSON.stringify(sData),function(data));` |
| sendMessageToPlatform | 发送消息       | `conchMarket.sendMessageToPlatform(JSON.stringify(sData),function(data));` |
| canSendToDesktop      | 能否pushicon | `conchMarket.canSendToDesktop(JSON.stringify(sData),function(data));` |
| openTopicCircle       | 打开话题圈      | `conchMarket.openTopicCircle(JSON.stringify(sData),function(data));` |

**Annex:**

[Docking channel demo for Eclipse (Android) example Download](http://ldc.layabox.com/download/tools/SampleForEclipse.zip)

[Docking channel demo for AndroidStudio (Android) example Download](http://ldc.layabox.com/download/tools/SampleForAndroidStudio.zip)
