# A brief introduction to WeChat games

##### First of all, what do we need to know about WeChat games?

Tencent's official explanation is:

> WeChat mini game is a category of WeChat components, which main point target game, no need to download and install, experience lightweight, you can play with friends in WeChat, such as PK, live streaming and so on.

That is, the point is to play game and no need to download the installation. This should be possible through the H5 game technology. (see -Introduction- chapter about HTML5 specifications)


The running environment of the WeChat game is not on a browser, but it runs on the Runtime in the WeChat APP. Although the interface of the WeChat game is compatible with most Canvas and Webgl, it have specificness. Obviously, from a strict definition, WeChat games are not conform with some standard HTML5 games.

**So ** How can a game that can be developed can also run in a browser?

##### Can developers only use the open API development of WeChat games?

we will continue to introduce our topics through these two questions.

As we all know, LayaAir engine is based on HTML5 full platform engine based on HTML5. Since it want be cross-platform,, the WeChat game are considerate in our compatibility requierement!

Since the official realease of WeChat game, LayaAir engine also launched a WeChat game support for developers. From LayaAir 1.7.14 version, developers can download the latest version engine or IDE, only need initialization adapter program according to the adapter document, so that HTML5 game items can be simply initializing adapted to WeChat small game project.

In this way, the project developed through the LayaAir engine run not only in a browser, or packaged APP (iOS and Android), but also can run on the WeChat mini-games platform.

Developers should be warn that the WeChat game work differently than classics HTML5 browser,

##### What are the differences that need to be paid attention to in the process of development?

If we use WeChat official API to develop, there are still some things to pay attention  such as not supporting DOM and BOM, only one canvas, no eval, XML issues and so on.

However,

For the developers using LayaAir engine, it is not necessary to know exactly what are differences, there is no constraint rule in coding development. Even if it has been developed using LayaAir engine to complete the replacement of the old project, the latest version of the engine library, in the main program (Laya.init) before the entrance, call MiniAdpter.init () this method initializes a matching procedure, the pre loaded local packet content into the layaNativeDir directory, can be the perfect support for WeChat game.

**AS3 code implementation: **

```java
// AS3 Initialization WeChat game adapter
MiniAdpter.init();
// Initialize the engine
Laya.init(1136,640);
```

**TypeScript and JavaScript code implementation: **

```javascript
// TS and JS Initialization WeChat game adapter
Laya.MiniAdpter.init();
// Initialize the engine
Laya.init(1136,640);
```



> Tips：About layaNativeDir directory, as well as the specific adaptation of the game, you can see other related documents