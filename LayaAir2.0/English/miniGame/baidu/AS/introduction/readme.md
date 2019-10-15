#Introduction to Baidu Small Game

> Author: Charley

#####First of all, we need to understand what is Baidu games?

The official explanation for the game is:

>Baidu small game is a category of Baidu small program, which is click to play, no need to download and install, light experience, can play with friends in Baidu, such as PK, onlookers, etc.

Play on demand without downloading or installing. This should be the H5 game, right?

How to explain it? Let's start with the definition of H5...

Usually people think that H5 is short for HTML5, but in the eyes of developers, HTML5 is only a WEB technical standard, which meets the standard, and the game that can run in the browser is HTML5 game. More people do not know much about technology. For ease of understanding, the game that can be played immediately without downloading and installing is called H5 game, and some people call it mobile page tour.

The running environment of Baidu small game is not browser, nor can it run in browser, but Runtime running in Baidu APP. Although the interface of Baidu games is compatible with most Canvas and Webgl, it has the feature of play-as-you-go without downloading and installing HTML5. Obviously, Baidu games are not standard HTML5 games by strict definition.

**Well,**How can the game developed be run in browsers?

####Can developers only use the open API for Baidu games?

With these two questions, let's continue.

As we all know, LayaAir engine is a full platform engine based on HTML5. Since it is a full platform, of course, Baidu games can not be missed!

So, on the day Baidu games were released, LayaAir engine also launched an adapter library for Baidu games for developers. Since LayaAir 1.8.0, developers have downloaded the latest version of the engine or IDE. They can seamlessly adapt HTML5 game project to Baidu mini-game project by initializing the adapter according to the adaptation tutorial document. LayaAirIDE 2.0 has done a lot of optimization for the development and release of Baidu games.

In this way, the project developed by LayaAir engine can run not only in browser, or packaged into APP (iOS and Android), but also in Baidu small game platform.

Maybe developers want to know that Baidu games are not HTML5.

####What differences should we pay attention to in the process of development?

If it is developed with Baidu's official API, there are still some things to be noted, such as not supporting DOM and BOM, games can only have a canvas, not supporting Eval, not supporting XML, etc.

However,

For the developers of LayaAir engine, it is not necessary to understand the differences, just follow the normal LayaAir engine development rules.

> Note: Baidu small game is a category of small programs, but it is not the same as small programs, APIs are different, LayaAir engine does not support the development of Baidu small programs.

#### **There are several points to note in developing small games:**

#####1. Unlike LayaAir 1.X, LayaAir 2.X no longer requires manual writing of game adapter library code.

#####2. After the completion of development, click the project release button directly, and can be released as Baidu small game project with one button. As shown in the figure.

![图1](img/3.png)  


Focus on that, through the file extraction function, you can extract the files of 5M or 10M Baidu local package directly into the Baidu small game project catalogue at the time of release. Used for peeling out local packages in projects.



For other small game development considerations and related experience, please see other Laaya Air small game documents.



In addition, it is strongly recommended to look at the official documents of Baidu mini-games. The documents of LayaAir engine are more engine-related. Of course, there are also some application introductions of mini-games interface. But it is certainly right to look at Baidu official documents carefully.



The links are as follows:

[https://smartprogram.baidu.com/docs/game/tutorials/tutorials/tutorials/](https://smartprogram.baidu.com/docs/game/tutorials/tutorials/tutorials/)

