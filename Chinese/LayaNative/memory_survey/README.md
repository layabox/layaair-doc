
# LayaPlayer环境下查看主要对象占用情况

为了方便开发者调试内存占用情况，在LayaPlayer-0.9.6以后版本，统计了常用的脚本对象在内存中的占用信息，包括：image、XMLHttpRequest、sprite2D、graphics、context2D、particleTemplate2D、XmlNode等信息。  

### 1、如何打开

可以在config.js中调用以下函数：

```javascript
conch.config.enableMemorySurvey(true);
```

config.js的位置：  
``Android: 工程目录下的assets/scripts/config.js  ``  
``IOS:工程目录下的resources/scripts/config.js``

**注意：正式发布的时候需要关掉，因为会消耗性能。**

### 2、如何使用

可以通过以下函数打印目前占用情况：

```javascript
conch.config.printAllMemorySurvey("");//参数为log写入的位置，如果写的是""，默认会写入cache目录下
```

调用此函数后，会在appCache目录下生成memoryStatis.txt，还会在log窗口下打印log，打印log如下图：

![](img/0.jpg)

该事例中的log显示，sprite2D个数为2个，grphics个数为1个。  
最后一行是一些内存池信息  
Reserve texture manager size=128.00MB,   //纹理预设的size  
Reserve atlas size=80.00MB,  //内部大图合集的size  
Sound size= 0.06MB,  //wav占用的size  
Image no release yet=0  //尚未清理的image的个数（不是内存占用数）  

具体显存纹理管理和image关系请参考[显存管理](https://ldc.layabox.com/doc/?nav=ch-as-5-2-1)

**TIPS:显示log中的size和countSize都是预估的值，是不准确的，主要看对象的个数。**

### 3、实际使用

项目中实际应用，可以在项目的角落上，做一个按钮，每点击一下执行一下printAllMemorySurvey函数。  
例如：在登录页面点击一下，记录相关信息。  
进入主城后点击一下，记录相关信息。    
进入副本后点击一下，记录相关信息。  
再次回到主城后，再点击，记录相关信息。  

这样便可以对比出，进出副本后，是否有遗留的节点未删除。

