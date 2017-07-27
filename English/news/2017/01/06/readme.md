# 微信IOS客户端全面升级至WKWebview内核，HTML5性能将提升4倍！

2017-01-06

自上次微信安卓升级至X5 Blink内核提升性能与解决了兼容性问题后，2017年1月6日晚，微信IOS也公布了重大利好消息“微信IOS客户端将升级为WKWebview内核，请网页开发者尽快适配”。对于非技术开发者而言这句话代表着什么呢？Layabox小编先抛出答案，再慢慢解读。

自上次微信安卓升级至X5 Blink内核提升性能与解决了兼容性问题后，2017年1月6日晚，微信IOS也公布了重大利好消息“微信IOS客户端将升级为WKWebview内核，请网页开发者尽快适配”。对于非技术开发者而言这句话代表着什么呢？Layabox小编先抛出答案，再慢慢解读。

**升级后的好处**

> **一、HTML5渲染性能提升4倍。**
>
> **二、内存占用将会减少至30%。**

小编在技术哥给的性能测试链接经对比后发现，当前的微信内核UIWebView与Safari的WKWebview内核性能差距达到4倍左右。内存占用可减少于30%左右。而微信IOS客户端升级至WKWebview后使用的就是Safari当前的WKWebview内核。**性能提升与内存占用的减少这对于HTML5大型游戏的研发商而言是重大的利好消息，未来HTML5游戏可以轻松实现APP游戏的效果。**

**更新时间周期**

微信iOS客户端将于2017年3月1日前逐步升级为WKWebview内核。

#### **背景**

WKWebView 是苹果在iOS 8中引入的新组件，目的是提供一个现代的支持最新Webkit功能的网页浏览控件，摆脱过去 UIWebView的老、旧、笨，特别是内存占用量巨大的问题。它使用与Safari中一样的Nitro JavaScript引擎，大大提高了页面js执行速度。

#### 切换方法

iOS微信6.5.3版本开始支持开发者手动切换WKWebview和UIWebview，使开发者可提前对WKWebview进行适配。

**手动切换入口：**

在微信会话列表页点击右上角“加号按钮”，选择菜单中的”添加朋友”，在添加朋友界面的搜索框中输入字符串：“:switchweb”，再点击键盘右下角搜索按钮。切换成功后会提示当前使用的内核是UIWebview或是WKWebview。

**校验切换方法：**

通过命令成功切换到WKWebview后，可通过以下方法验证当前网页使用的是否是WKWebview内核。 

微信内任意入口进入任意网页，在网页加载成功后向下拉动页面（或点击网页右上角菜单按钮），使之显示出地址栏，当地址栏以 “此网页由” 开头即为当前使用WKWebview，若以“网页由”则是使用的UIWebview。

**页面如何判断当前使用的webview内核：**

在页面中可通过微信注入的window.__wxjs_is_wkwebview变量判断当前使用的webview内核。 iOS微信6.5.3及其之后的版本 window.__wxjs_is_wkwebview 为true时是使用WKWebview，为 false或者 “undefine”时是 UIWebview 。

**前端适配关注的要点**

适配的首要原则：若不能区分是WKWebview的新特性新行为还是微信内部逻辑导致原有页面出现问题时，可使用测试页面分别在Safari和微信中的WKWebview内核分别测试，用以快速定位问题产生的原因。

#### 适配指南

切换为WKWebview后，微信中的Webview行为和Safari中保持高度一致，唯一的区别是微信Webview中会注入微信JSBridge相关的脚本。所以适配的重点需要关注以下几个方面： 

> 一：页面功能是否正常 
>
> 二：页面屏幕适配是否正常 三：页面行为是否正常（例如用户在浏览页面时点击返回按钮返回上一个页面时的页面逻辑是否正常） 
>
> 四：页面使用的语法是否兼容。 
>
> 五：JSSAPI是否正常完美的工作。 
>
> 六：重点关注Cookie和LocalStorage等相关的逻辑是否正常。 
>
> 七：若服务器有设置返回 Cache-Control缓存有效时间，则需要检查相关逻辑是否正常。

正常情况下，你的页面是不需要做特别的适配，但若你的页面有涉及到以下几个受影响的逻辑，则需要根据适配建议进行适配和确认。

JSAPI相关适配

一：将不再支持cache 

变化：在WKWebview中将暂不支持cache jsapi。 

适配建议：所有使用此api的开发者可去掉页面相关逻辑。

二：页面通过LocalID预览图片 

变化：不再支持通过使用chooseImage api返回的localld以如：”img src=wxLocalResource://50114659201332”的方式预览图片。 

适配建议：

\1. 在iOS微信6.5.3版本及之后的版本中，使用新增的jsapi：getLocalImgData 拿到LocalID对应的图片base64编码后再在前端页面中显示。

\2. 如果引入了页面有引入JSSDK，则直接将JSSDK升级为1.2.0最新版本即可帮助页面自动适配。（目前JSSDk线上版本是 1.0.0 和 1.1.0，更新版本为1.2.0 ，[https://res.wx.qq.com/open/js/jweixin-1.2.0.js]()  ）

三：有使用JSSDK，并且使用了wx.config进行权限授权需关注jsapi调用的失败问题 

变化：WKWebview的内部实现变更使我们对微信内的页面jsapi权限管理做了一定逻辑上的调整，有极小可能会发生以前授权正常的jsapi获取权限不正常，从而导致调用jsapi失败。 

适配建议：

1. iOS微信6.5.1，WKWebview在此版本中已知有以下问题：页面使用HTML5的History API pushState; popstate;      replaceState等控制页面导航（典型的如单应用页面），同时使用JSSDK的wx.config为jsapi授权，此时大几率会出现jsapi因为无权限而调用失败的问题。 在6.5.1中页面若可能的情况下，可使用Anchor hash技术替换History技术来解决此问题。

2. iOS微信6.5.2及其之后版本，将不会存在以上问题，但不能100%确认有使用到 history或hash技术更改页面导航地址的页面完全没有此类问题，依然需要开发者注意关注此类问题。

Cookie和LocalStorage设置相关

一：退出微信账号后，将会清空所有Cookie和LocalStorage。

二：页面功能依赖Cookie，或有涉及到Cookie的相关逻辑 

变化：WKWebview内部实现变更，会影响目前页面Cookie相关的逻辑，例如跨域存取Cookie和页面的资源或图片存储服务器依赖校验Cookie来返回数据等情况。

问题说明：在访问一个页面A时，如果页面A引用了另一个页面B的资源（页面A和B为不同的域名），这时页面B就认为是第三方页面。若在页面B中设置Cookie，就会命中WKWebview下阻止第三方跨域设置Cookie的安全策略，导致问题出现。

适配建议：

在WKWebview中是默认阻止跨域的第三方设置Cookie。所有通过Cookie传递的信息，可通过业务后台存储需要传递的信息，然后给页面一个存储信息相对应的access_token加密码，然后通过Url中加入自己业务的access_token进行页面间信息传递。

如果页面的资源或图片存储的服务器依赖校验Cookie来返回数据的情况，在切换到WKWebview后，在微信内长按保存，或者点击预览大图时，将不会完整的带上所设置的Cookie，会导致图片保存失败或预览失败。除了此种情况，开发者不用担心其他情况下Cookie丢失的问题，所有请求都会带上完整的Cookie。

页面视频小窗播放

变化：iOS微信6.5.3及其之后的版本中，Webview默认支持小窗播放。 

开发者需要特别注意小窗播放需要前端同时适配iOS10和iOS10以下的低版本 



WKWebview页面行为与Safari完全一致，会导致页面依赖UIWebview页面行为的逻辑失效或异常：（可根据业务自身逻辑，实现测试页面后分别在Safari和微信WKWebview中验证）

一：Safari或微信WKWebview中 页面A跳转到页面B再返回页面A后不会重新执行Script和Ajax(也不会触发页面reload)。 

二：Safari或微信WKWebview中，在页面弹出输入键盘后，会触发JQuery的resize事件，而在UIWebView下不会。 

三：Safari或微信WKWebview中， window unload 事件在只有刷新才能触发，退出页面或者跳转到其他页面都无法触发。 

四：Safari或微信WKWebview中，极少数情况下某些特殊实现的页面点击事件会失效。

如果有涉及或者遇到以上问题，以兼容Safari行为为准。