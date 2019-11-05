#Introduction of Game Publishing Tools and Game Catalogue

> Author: Charley
>
> This document is based on LayaAirIDE version 1.7.19.1 beta

###1. Introduction of IDE Publishing Function

When you click the release button and select the Wechat game, the release interface looks like this, as shown in Figure 1.

![图1](img/1.png) 


(Fig. 1)

#####About Publishing Directory

The source directory and publishing directory are easy to understand, usually by default. If a copy of the project directory causes a change in the directory, check to see if the directory is correct. In addition,**Spaces, Chinese, and Chinese symbols are not allowed in directory paths, otherwise publishing will fail.**

#####Exclusion of the role of documents

There are often developers who don't understand. After selecting the excluded directory, the files in the excluded directory are not not published, but not compressed. When excluded here, all subsequent options that check compression will skip the files in the excluded directory.

#####Compression and Version Management

Those compression options, check to enable compression, specific use, because more intuitive, you can experience and try, not much introduction. It should be noted that once enabled, it will be time-consuming. The entire release time will be extended. And without checking the option to enable version management. Every time it is released, all files that are not excluded are compressed. Therefore, if only part of it is updated**It is recommended that version management be enabled so that only updated versions are compressed. Reduce release time.**

If a developer has a better third-party compression tool, you can uncheck the compression tool that comes with IDE, through the bottom`后续执行脚本`Functions, execute custom command line tools or scripts, and compress them with your favorite tools. (* You can also recommend particularly useful tools to charley*)

#####On Copying Documents

For example, the local package directory has been planned in the project, then the directory of the local package can be directly copied to the project directory of the small game through the two options of copying files. Of course, the files in the root directory still need to be handled manually. For this piece, the toolkit students are still optimizing, and subsequent versions can be solved.

###2. Introduction of the small game catalogue after publication

![img](img/2.png)  


(Fig. 2)

#### `code.js`Project documents and`libs`Engine Library Directory

In general, LIBS directory can not be copied to the small game directory, because, for the problem of windows domain, when sending small games, the whole game project and the library referenced have been integrated into code. js. But if TS and JS projects are not referenced in index. html, they are referenced in projects, or in AS projects, they are referenced in require. That doesn't fit code. js. At this time, you still need to manually copy the library you use, especially the third-party library.

#### `res`Resource directory

Res is the default resource directory. Because of the limitation of the initial package, it is recommended that the content of the initial package be well planned. It is better to put it in a unified directory to facilitate the stripping of the initial package.

This file merges JS into a JS

#### `game.js`The Entry Document of Wechat Game

Game entry JS file and adapter library JS are introduced here. The IDE is generated when it creates the project, and in general, there is no need to move.

#### `game.json`Configuration files for small games

Developer tools and clients need to read this configuration to complete the relevant interface rendering and property settings. For example, the horizontal and vertical direction of the screen, the display of the status bar, small game subcontracting, etc., are all configured here. Specific how to configure and use parameters, you can[查看微信小游戏的开发文档](https://mp.weixin.qq.com/debug/wxagame/dev/index.html?t=2018115)。

#### `project.config.json`Game Project Profile

The file contains some information about the game project. If you want to modify the appid and other information, you can edit it directly.

> The value of the project parameter libVersion must be game, which is generally error-free. However, in case there is a normal release in Laya AirIDE and an adapter library is also cited. If there is still an error in the developer's tool after the release of the game, you can check whether the value in libVersion is a game. If not, change to game.

#### `weapp-adapter.js`Wechat game adapter library file

LayaAirIDE's publishing tools are automatically referenced when they are released.



