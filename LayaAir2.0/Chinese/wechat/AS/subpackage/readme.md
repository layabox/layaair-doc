# 微信小游戏分包实战

> author: charley

对于一些大型游戏而言，微信小游戏的4M初始包远远不够用，因为光JS就会超过4M，所以在2.1的小游戏基础库推出之前，只能是不断的砍功能，一直砍到JS小于4M。(如果有新手不了解这是为什么？那先去了解一些基础之后，再来看本文。)小游戏基础库从2.1版本开始支持通过分包的形式，将上传的包体扩大到8M，那如何进行分包呢？

**本篇不仅会介绍分包的方式，还针对微信小游戏在分包过程中遇到常见问题，通过实例DEMO，进行相关的介绍，帮助开发者理解小游戏的分包方式与注意事项。**



### 一、真的需要分包吗？

如果对微信小游戏分包流程或者是AS项目如何分包与使用不太熟悉的开发者，分包反而会面临一些困惑与障碍。所以我们在打算分包之前，一定要分析一下自己的项目是真的有分包需求吗？其实对于当前大多数的产品而言，可以不用分包就可以上线小游戏产品。

#### 1、是否使用过UI加载或者分离模式？

LayaAir引擎的开发者，UI大多都是通过LayaAirIDE制作。

在F9的UI模式选项，以及项目管理器，右击每一个UI页面设置默认属性时的导出类型选项，都可以看到内嵌模式、加载模式、分离模式，三个选项。

![图1](img/1.png) 

**默认是内嵌模式**，这种模式下，导出UI的页面时，会将配置信息等内容导出为项目的代码文件。最终发布成小游戏的时候就是js文件。从而占用了一些宝贵的小游戏本地包体积。所以**，减少小游戏的包体大小，可以将导出UI的模式改变为加载模式或者分离模式。**这两种模式都会将页面配置信息等导出为json文件，json文件可以通过URL远程动态加载使用，而不会占用本地包空间。

> **Tips:**
>
> 1、加载模式与分离模式的区别是，加载模式是将所有的UI页面导出为一个json文件，分离模式是每一个UI页面导出为一个独立的json。
>
> 2、需要注意的是，加载模式与分离模式因为导出的是json，需要写代码加载后才可以使用。内嵌模式不需要。

总之，加载模式与分离模式可以减少包体JS的大小。如果能通过这种方式解决的，也许不必用分包来解决。具体情况视项目而定。

#### 2、压缩与混淆

通过压缩混淆后的js代码，包体会明显减少很多。如果JS没超4M，可以不用分。资源等内容，完全可以走URL动态加载使用，在首次加载后，会存在物理缓存内，不超过50M的常用缓存内容，下次打开无需加载。



### 二、学习小游戏官方分包文档

在实战分包之前，官方的文档没看过的，一定要先仔细看一看。这非常有用，无论能理解到多少，先尽量看懂文档要点，才能更好的理解分包。链接如下，请先看过后再进行后面的步骤。

[https://developers.weixin.qq.com/minigame/dev/tutorial/base/subpackages.html](https://developers.weixin.qq.com/minigame/dev/tutorial/base/subpackages.html)



### 三、微信小游戏官方的分包方式

虽然很多开发者已经看过官方的分包文档，这里还是捡重点的再过一下。

#### 1、在game.json中配置分包名与分包路径的字段

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

subpackages里，可以有多个name与root，每一组代表一个分包，单个分包，不能超过4M，全部游戏的初始包体不超过8M即可。

大家先看一下分包配置的结构与注释说明，初步理解一下。如果仍然不理解的，可以结合后面实战的配置再进行理解。

#### 2、小游戏官方的分包加载示例代码

小游戏官方提供了 [wx.loadSubpackage()](https://developers.weixin.qq.com/minigame/dev/document/subpackages/wx.loadSubpackage.html) API 来触发分包的下载，调用 wx.loadSubpackage 后，将触发分包的下载与加载，在加载完成后，通过 wx.loadSubpackage 的 success 回调来通知加载完成。示例代码如下：

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

加载成功的同时，wx.loadSubpackage 会返回一个 [LoadSubpackageTask](https://developers.weixin.qq.com/minigame/dev/document/subpackages/LoadSubpackageTask.html)，可以通过 LoadSubpackageTask 获取当前下载进度。示例代码如下：

```javascript
loadTask.onProgressUpdate(res => {
  console.log('下载进度', res.progress)
  console.log('已经下载的数据长度', res.totalBytesWritten)
  console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
})
```

本篇文档主要是讲分包方法与开发者经常遇到的window域导致的分包问题。下载进度较为容易理解，且未碰到开发者反馈相关问题，所以未在实战代码中提及，如果有遇到这块问题的，可以在社区中提出。



### 四、下载示例项目

我为大家准备了两个比较简单的示例项目，下载解压后，defaultDemo目录下为分包之前的示例项目，subPackageDemo目录下为分包后的示例项目。开发者可以在阅读本文档的同时，用分包前和分包后项目对比差异，帮助理解小游戏分包。

下载地址为：[https://github.com/layabox/layaair-doc/raw/master/project/AS3/AS_subPackage_Demo.zip](https://github.com/layabox/layaair-doc/raw/master/project/AS3/AS_subPackage_Demo.zip)



### 五、实战分包要点

#### 1、微信开发者工具与发布项目注意

实战分包的第一步，务必是在微信开发者工具中创建好小游戏项目。因为一旦分包后，采用的是小游戏的加载模式，浏览器里就跑不通了，整个调试流程全在微信开发者工具里完成。所以，下载好为大家准备的示例项目，先打开defaultDemo目录下的示例，发布出一个小游戏版本。把基础调试流程跑通。

> Tips: 这里需要注意的是，下载的项目，因为曾经发布过，默认记录的是曾经发布过的目录，所以发布的时候一定要改成本地实际目录。

#### 2、基础库版本

一定要检查一下微信开发者工具的调试基础库是什么版本的，否则跟着本文操作，使用的是不支持分包的版本，调试就会出问题。

开发者工具使用 1.02.1806120 及以上版本。

基础库使用2.1.0 及以上版本。

本篇文档使用的是2.2.0。如图1所示：

![图2](img/2.png) 

（图2）

#### 3、分包目录的相关操作

##### 修改game.json

在分包之前，我们需要做好分包目录的规划，并在game.json中进行体现。

在这里，我们就简单的设置一个分包目录b。大家可以先将defaultDemo下的示例项目内的game.json改为以下代码：

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

规划和设置完小游戏的分包目录后。我们去创建AS项目的分包文件与目录。

##### 创建AS分包文件module.def

在**项目的根目录**，创建一个普通的空文本文件，并取名为`module.def` ，文件中输入内容如下：

```json
module:"subpackage/b"
path:"src/subpackage"
```

**module内的值代表的是分包生成的新js名称和路径。**上面示例中，subpackage为分包后的目录名，b为js的文件名，如果不想要目录，只填写b，那就会生成不含目录的b.js。

这里需要提一下的是，无论是有目录还是没有目录，都会生成在`bin/h5/js`目录下。如上例中的值，实际生成的路径为`bin/h5/js/subpackage/b.js`。所以正好对应小游戏game.json中规划的路径`js/subpackage/`。

**path内的值代表的是module对应的AS源文件目录**。需要说明的是，path`src/subpackage`内如果有多个as文件，只要每个文件之间有引用关系，会统一编译到同一个js内（module指定的值）。

> module与path的值都放到引号里，结束不需要符号，但一定要换行。

##### 尤其重要的引用关系

分包中的类，在主包中，必须要引用，如果不引用。是不会将分包文件`module.def`内`path`指定路径内的代码编译到`module`指定的目录及文件中。分包与分包之间，也是这样，无论当前代码是否用到。必须要引用到。

例如，在示例项目中，我们将subpackage包内的b类引入。

```typescript
import subpackage.b;
```

 

#### 4、分包代码的使用

上一步完成分包文件与目录的创建与规划，那么可以开始进行分包编码了。

首先原则上，既然要做分包，那么**主包与分包的逻辑关联性要尽可能越少越好**。

另外不得不提一句，在分包方面TS与JS都要针对window域进行项目改造，而AS不需要针对window域进行修改，因为编译器已经帮开发者处理好了。只需要按照LayaAir引擎的分包规则进行处理即可。

所以，这里重点讲一下如何使用分包中的类与方法。至于分包的示例，可以直接下载我提供的示例DEMO查看。

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

我们来看一下onLoaded这个方法，在调用showUI显示完UI后，直接使用了微信小游戏官方提供的分包加载方法。在分包加载成功后success的回调方法内，我们开始通过`__JS__（'new subpackage.b()'）；`来实例化分包内的方法。这里为什么 用JS的方法去实例呢，因为直接使用分包的内容，因为编译后，分成了不同的js，而不在同一个文件则无法找到对应的类，就会报错。所以使用分包的类与方法，必须要使用`__JS__（'XXX'）；` ，xxx为js代码。

#### 5、总结一下

AS项目的分包，其实在官方示例的基础上，使用AS项目的分包即可。对于以前就会分包的开发者，AS的小游戏分包会非常顺利。所以本篇其实就是结合小游戏，再次讲了一下AS项目如何分包。

**AS分包的要点回顾** ：

1、在项目根目录创建module.def文件；

2、填写正确的分包后路径与js文件名(module)与正确的对应源文件路径(path)；

3、创建分包代码文件，进行分包编码；

4、在主包内引用分包的类；



### 六、开发者实战建议

开发者可以先把我给的示例项目，进行分包尝试，如果遇到问题，可以看看本篇文档，以及对比我给的两个示例项目的区别。先在微信小游戏里跑通。真正的理解分包之后，再进行自由的实战小游戏分包。如果遇到问题请把问题发到社区，并在问题中上传示例DEMO项目，群里可以@ 管理员 charley 并提供链接。

后续如果有发现开发者在分包有面临新的问题，我会再完善更新本篇文档。、



## 本文赞赏

如果您觉得本文对您有帮助，欢迎扫码赞赏作者，您的激励是我们写出更多优质文档的动力。

![wechatPay](../../../wechatPay.jpg)