#Introduction to Wechat Games

> Author: Charley

#####First of all, we need to understand what is Wechat games?

The official explanation for the game is:

> Wechat game is a category of Wechat widget programs. It can be played on demand without downloading and installing. It can be played with friends in Wechat, such as PK, onlookers, etc.

Play on demand without downloading or installing. This should be the H5 game, right?

How to explain it? Let's start with the definition of H5...

Usually people think that H5 is short for HTML5, but in the eyes of developers, HTML5 is only a WEB technical standard, which meets the standard, and the game that can run in the browser is HTML5 game. More people do not know much about technology. For ease of understanding, the game that can be played immediately without downloading and installing is called H5 game, and some people call it mobile page tour.

The running environment of Weixin games is not browser, nor can it run in browser, but Runtime running in Weixin APP. Although the interface of Wechat games is compatible with most Canvas and Webgl, it has the ability to play on demand without downloading and installing HTML5 features. Obviously, by strict definition, Wechat games are not standard HTML5 games.

**Well,**How can the game developed be run in browsers?

####Can developers only use the open API for Wechat games?

With these two questions, we will continue to introduce.

As we all know, LayaAir engine is a full platform engine based on HTML5. Since it is a full platform, of course, we can't miss the Wechat game!

So, on the day of the release of Wechat games, the LayaAir engine also launched an adapter library for developers of Wechat games. Since LayaAir 1.7.14, developers have downloaded the latest version of the engine or IDE. They can seamlessly adapt HTML5 game project to Wechat game project by initializing the adapter according to the adaptation tutorial document.

In this way, the project developed by LayaAir engine can run not only in browser, or packaged as APP (iOS and Android), but also in the platform of Wechat games.

Maybe developers also want to understand that since Wechat is not HTML5,

####What differences should we pay attention to in the process of development?

If we use the official API of Wechat, we should pay attention to some things, such as not supporting DOM and BOM, games can only have a canvas, not supporting Eval, not supporting XML and so on.

However,

For the developers of LayaAir engine, it's not necessary to know the difference, just follow the normal LayaAir engine development rules. After the completion of development, click the project release button directly, and can be published as a Wechat game project with one button. As shown in Figure 1.

![图1](img/7.png)  


(Fig. 1)

So will the LayaAir engine project all run in the Wechat environment after one key release? In theory, it can be supported unless a third-party library is used, which is not supported by the game, or the bottom of the game itself has BUG, such as masks and cacheAs, which were initially not supported, but after communication with the official technology of the game, it has been supported, but some versions of the machine Wechat have not been updated to the repaired version, which may cause problems, if there is a floral screen phenomenon. Most of them are due to the use of cacheAs, so it is recommended to use masks and cacheAs cautiously.

In addition, the engine is not allowed to control the size of canvas. The canvas size of the game is automatically stretched. As a result, the partial adaptation mode of LayaAir is invalid. Fixed auto or full adaptation mode is recommended.

For old projects that have been developed using the LayaAir engine,**After replacing the latest version of engine Libraries**Before Laya. init () of the main program entry, call MiniAdpter. init () to initialize the adapter, which can support the Wechat game perfectly.

**Adaptation initialization for AS3 version**


```java

//AS3版本初始化微信小游戏的适配
MiniAdpter.init();
//初始化引擎
Laya.init(1136,640);
```


**TypeScript or JavaScript version adaptation initialization:**


```javascript

//TS或JS版本初始化微信小游戏的适配
Laya.MiniAdpter.init();
//初始化引擎
Laya.init(1136,640);
```


> Tips: The old project adapter has special documentation for introduction. Welcome to visit.



For other introductions about the game itself, please go directly to the official documents of the game.

[https://developers.weixin.qq.com/minigame/dev/index.html](https://developers.weixin.qq.com/minigame/dev/index.html)

It is strongly recommended that you look at the official documentation of the game. The documentation of LayaAir engine is more engine-related. Of course, it will also mix some application introductions of the game interface, but it is certainly right to look at the official documentation carefully.