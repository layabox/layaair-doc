#Weixin Small Game Subcontracting Practice

> author: Charley

For some large-scale games, the 4M initial package of Weixin small game is far from enough, because JS alone will exceed 4M, so before the launch of the 2.1 small game base library, it can only continue to hack functions until JS is less than 4M. If a novice doesn't understand why? Let's look at some of the basics first and then at this article. ) Since version 2.1, the basic library of mini-games has supported the expansion of uploaded packages to 8M through subcontracting. How to subcontract?

**This article will not only introduce the way of subcontracting, but also for the common problems encountered in the process of subcontracting, through the example of DEMO, to help developers understand the way of subcontracting small games and matters needing attention.**



###Do you really need subcontracting?

If the subcontracting process of Weixin small game or how to subcontract and use the developers who are not familiar with AS project, subcontracting will face some confusion and obstacles. So before we plan to subcontract, we must analyze whether our project really needs subcontracting. In fact, for most of the current products, you can go online without subcontracting.

####1. Have you used UI loading or splitting mode?

LayaAir engine developers, UI is mostly produced through LayaAirIDE.

In F9 UI mode options, as well as project manager, right-click on each UI page to set default properties when the export type options, you can see the embedded mode, load mode, split mode, three options.

![图1](img/1.png) 


**The default is embedded mode**In this mode, when exporting UI pages, content such as configuration information is exported to the code file of the project. The JS file is the final release of the game. Thus occupied some valuable small game local package volume. therefore**To reduce the package size of the game, you can change the mode of exporting UI to load mode or separate mode.**Both modes export page configuration information to JSON files, which can be dynamically loaded remotely through the URL without taking up local package space.

>**Tips:**
>
> 1. The difference between loading mode and detaching mode is that loading mode is to export all UI pages into a JSON file, and detaching mode is to export each UI page into a separate json.
>
> 2. It should be noted that the loading mode and the separating mode can be used only after the code is loaded because the JSON is exported. Embedded mode is not required.

In conclusion, loading mode and separation mode can reduce the size of inclusion JS. If it can be solved in this way, subcontracting may not be necessary. The specific situation depends on the project.

####2. Compression and confusion

By compressing the obfuscated JS code, the package experience is significantly reduced. If the JS does not exceed 4M, you can avoid scoring. Resources and other content can be dynamically loaded using the URL. After the first load, there will be physical caches, not more than 50M of commonly used cached content. Next time you open it, there is no need to load.



###2. Learning the Official Subcontracting Documents of Small Games

Before subcontracting in actual combat, the official documents have not been read, we must first look carefully. This is very useful, no matter how much you can understand, first try to understand the main points of the document, in order to better understand subcontracting. The links are as follows. Please read them before proceeding to the next steps.

[https://developers.weixin.qq.com/minigame/dev/tutorial/base/subpackages.html](https://developers.weixin.qq.com/minigame/dev/tutorial/base/subpackages.html)



###3. The Official Subcontracting Method of Wechat Games

Although many developers have seen the official subcontracting documents, here's a quick look at the key points.

####1. Configure the fields of the subpackage name and path in game.json


```json

{
  ...
  "subpackages": [
    {
      "name": "stage1",
      "root": "stage1/" // 可以指定一个目录，目录根目录下的 game.js 会作为入口文件，目录下所有资源将会统一打包
    }, {
      "name": "stage2",
      "root": "stage2.js" // 也可以指定一个 JS 文件
    }
  ]
  ...
}
```


In subpackages, there can be multiple names and roots, each group represents a subpackage, a single subpackage, not more than 4M, the initial package of all games can not exceed 8M.

Let's take a look at the structure and annotations of the subcontracting configuration to get a preliminary understanding. If you still don't understand, you can combine the configuration of the actual combat to understand.

####2. Official subcontracting loading example code of small game

Game Officials Officially Provided[wx.loadSubpackage()](https://developers.weixin.qq.com/minigame/dev/document/subpackages/wx.loadSubpackage.html)API triggers the download of subpackages. After calling wx. loadSubpackage, it triggers the download and loading of subpackages. After loading is completed, the loading is notified by the success callback of wx. loadSubpackage. The sample code is as follows:


```javascript

const loadTask = wx.loadSubpackage({
  name: 'stage1', // name 可以填 name 或者 root
  success: function(res) {
    // 分包加载成功后通过 success 回调
  },
  fail: function(res) {
    // 分包加载失败通过 fail 回调
  }
})
```


When the load is successful, wx. loadSubpackage returns a[LoadSubpackageTask](https://developers.weixin.qq.com/minigame/dev/document/subpackages/LoadSubpackageTask.html)The current download progress can be obtained through LoadSubpackage Task. The sample code is as follows:


```javascript

loadTask.onProgressUpdate(res => {
  console.log('下载进度', res.progress)
  console.log('已经下载的数据长度', res.totalBytesWritten)
  console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
})
```


This document mainly talks about subcontracting methods and subcontracting problems caused by Windows domain which developers often encounter. The download schedule is easy to understand, and there are no feedback problems from developers, so it is not mentioned in the actual code. If you encounter this problem, it can be raised in the community.



###IV. Download sample projects

I have prepared two simple sample projects for you. After downloading and decompressing, the defaultDemo directory is the sample project before subcontracting, and the subPackageDemo directory is the sample project after subcontracting. While reading this document, developers can compare the differences between pre-subcontracting and post-subcontracting projects to help understand the subcontracting of small games.

The download address is:[https://github.com/layabox/layaair-doc/raw/master/project/AS3/AS_subPackage_Demo.zip](https://github.com/layabox/layaair-doc/raw/master/project/AS3/AS_subPackage_Demo.zip)



###V. Key Points of Actual Subcontracting

####1. Wechat Developer Tools and Publishing Project Notes

The first step in actual subcontracting is to create a small game project in the Wechat Developer Tool. Because once subcontracted, using a small game loading mechanism, the browser will not work, the entire debugging process is completed in the Wechat developer tools. So, download the sample project ready for you, first open the example in the defaultDemo directory, and release a small version of the game. Run the basic debugging process through.

> Tips: It's important to note that the downloaded project, because it has been published, the default record is the published directory, so when publishing, we must change the actual directory cost.

####2. Basic Library Version

Be sure to check what version of the debugging base library of the Wechat Developer Tool is, otherwise, following this article, the version that does not support subcontracting will cause debugging problems.

Developer tools use version 1.02.1806120 and above.

Basic libraries use versions 2.1.0 and above.

This document uses 2.2.0. As shown in Figure 1:

![图2](img/2.png) 


(Fig. 2)

####3. Relevant operation of subcontract directory

#####Modify game.json

Before subcontracting, we need to plan the subcontracting directory and implement it in game. json.

Here, we simply set up a subpackage directory B. You can first change the game.json in the sample project under defaultDemo to the following code:


```json

{
  "deviceOrientation": "landscape",
  "showStatusBar": false,
  "networkTimeout": {
    "request": 10000,
    "connectSocket": 10000,
    "uploadFile": 10000,
    "downloadFile": 10000
  },
  "subpackages": [
    {
      "name": "b",
      "root": "js/subpackage/"
    }
  ]
}
```


After planning and setting up the sub-directory of the game. Let's create subcontracted files and directories for AS projects.

#####Create AS subpackage file module. def

stay**The root directory of the project**Create a plain empty text file named`module.def`The input in the file is as follows:


```json

module:"subpackage/b"
path:"src/subpackage"
```


**The values in module represent the new JS names and paths generated by the subpackage.**In the example above, subpackage is the subpackage directory name and B is the file name of js. If you don't want the directory, just fill in b, then B. JS without directory will be generated.

What I need to mention here is that both directories and no directories are generated in`bin/h5/js`Under the directory. As in the example above, the path actually generated is`bin/h5/js/subpackage/b.js`。 So it corresponds to the path planned in game. JSON`js/subpackage/`。

**The value in path represents the directory of AS source files corresponding to module**。 It should be noted that path`src/subpackage`If there are more than one as file, as long as there is a reference relationship between each file, it will be compiled into the same JS (module specified value).

> The values of module and path are put in quotation marks. No sign is needed at the end, but the line must be changed.

#####Especially important citation relationships

The classes in the subcontracting must be referenced in the main package, if not. Will not subcontract files`module.def`within`path`Code in the specified path is compiled to`module`The specified directory and file. This is also true between subcontracting and subcontracting, regardless of whether the current code is used or not. It must be quoted.

For example, in the sample project, we introduced class B in the subpackage package.


```typescript

import subpackage.b;
```





 



####4. Use of subcontracting code

The previous step completed the creation and planning of subcontracted files and directories, so you can start subcontracting coding.

First of all, in principle, since we have to subcontract, then**The logical relevance between the main package and the subpackage should be as little as possible.**。

In addition, I have to mention that in terms of subcontracting, both TS and JS need to be modified for the Windows domain, while AS does not need to be modified for the Windows domain, because the compiler has already handled it for developers. All you need to do is follow the LayaAir engine's subcontracting rules.

So, here's how to use the classes and methods in subcontracting. As for the example of subcontracting, you can download the sample DEMO view I provided directly.


```javascript

//图集加载后回调
private function onLoaded():void
{

    showUI(aUI);
	//微信小游戏官方提供的分包加载方法
    const loadTask = __JS__('wx').loadSubpackage({
        name: 'b', // name 可以填 name 或者 root
        success: function(res) {
            // 分包加载成功后通过 success 回调
            console.log("success");

            //实例化分包的类
            b = __JS__('new subpackage.b()');

            //把实例化的UI传给分包的类
            b.newUI = newUI;

            //初始化分包，监听按钮事件
            b.init();
        },
        fail: function(res) {
            // 分包加载失败通过 fail 回调
            console.log("fail");
        }
    });

}
```


Let's take a look at onLoaded. After calling showUI to display the UI, we directly use the subpackage loading method provided by the official Weixin game. Within the call-back method of success after successful subpackage loading, we started to pass`__JS__（'new subpackage.b()'）；`To instantiate methods within subcontracting. Why use the JS method to instance? Because the content of subcontracting is directly used. After compilation, it is divided into different JSS. If it is not in the same file, the corresponding class cannot be found and an error will be reported. Therefore, the use of subcontracting classes and methods must be used.`__JS__（'XXX'）；`XXX is JS code.

####5. Summarize

As a matter of fact, on the basis of official examples, the sub-contracting of AS project can be used. For developers who will be subcontracted before, as small game subcontracting will be very smooth. So this article is actually a combination of games, once again talked about how to sub-contract AS projects.

**A Review of the Essentials of AS Subcontracting**:

1. Create module.def file in the project root directory;

2. Fill in the correct subcontracted path and JS file name (module) and the correct corresponding source file path (path);

3. Create subpackage code file and subpackage code.

4. Referring to subcontracted classes in the main package;



###6. Developer's Practical Suggestions

Developers can subcontract the sample projects I gave them first. If they encounter problems, they can see this document and compare the differences between the two sample projects I gave them. Run through the Wechat game first. After the real understanding of subcontracting, we can subcontract the free practical games. If you encounter a problem, please send it to the community and upload a sample DEMO project in the problem. The group can @administrator Charley and provide a link.

In the future, if there are new problems faced by developers in subcontracting, I will improve and update this document. ,



##This article appreciates

If you think this article is helpful to you, you are welcome to sweep the code and appreciate the author. Your motivation is our motivation to write more high quality documents.

![wechatPay](../../../wechatPay.jpg)