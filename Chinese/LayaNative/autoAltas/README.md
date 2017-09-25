# 自动大图集系统  

## 1.综述  

为了优化应用程序运行效率，减少DrawCall，在LayaNative中，有一套自动大图集管理系统。当image的宽和高都小于512的时候，图片会自动合并到大图合集中，但开发者使用的方法无需修改。  

创建自动大图集的数量，LayaNative按照设备内存情况，默认配置了一些参数，当所有大图合集全部被占满，系统会自动清理，确保大图合集的数量不会超出预先设置的个数。

默认设置的参数如下所示:  

```javascript
var nMem = conchConfig.getTotalMem();
if (nMem <= 524288) {
    conchConfig.atlasNum = 10;//10张 每张为1024*1024
    conchConfig.maxTextureMemSize = 64 * 1024 * 1024;
}
else if (nMem > 524288 && nMem <= 1048576) {
    conchConfig.atlasNum = 16;//16张 每张为1024*1024
    conchConfig.maxTextureMemSize = 84 * 1024 * 1024;
}
else if (nMem > 1048576) {
    conchConfig.atlasNum = 20;//20张 每张为1024*1024
    conchConfig.maxTextureMemSize = 128 * 1024 * 1024;
}
```


## 2.如何配置大图合集的数量

由于每个项目都有特殊性，开发者也可以根据自己需求进行设定，需要在config.js设定，代码如下：

```javascript
var loadingView= window.loadingView;
if(loadingView)
{
    loadingView.loadingAutoClose=true;
    loadingView.bgColor("#ffffff");
    loadingView.setFontColor("#000000");
    loadingView.setTips(["新世界的大门即将打开", "敌军还有30秒抵达战场", "妈妈说，心急吃不了热豆腐"]);
}
//在这进行设定
var nMem = conchConfig.getTotalMem();
if (nMem <= 524288) {
    conchConfig.atlasNum = 15;//15张 每张为1024*1024
}
else if (nMem > 524288 && nMem <= 1048576) {
    conchConfig.atlasNum = 20;//20张 每张为1024*1024
}
else if (nMem > 1048576) {
     conchConfig.atlasNum = 30;//30张 每张为1024*1024
}
```

**Tips：这个显存池size的设定必须放在应用程序开始启动的地方，程序中不可动态设定，config.js是LayaPlayer启动后立刻就会执行的js，所以放在这才是最安全的。**  


##  3.config.js在哪

ios版本：在工程目录下的resource\scripts\config.js  
android版本：在工程目录下的assets\scripts\config.js    


## 4.设置image放入自动大图合集中的尺寸限制

在上面说过，当image宽和高都小于512的时候，会自动合并到大图合集中，在LayaNative-0.9.10版本以后，开发者可以在config.js设置这个size的值，代码如下：
```javascript
conchConfig.pushAtlasLimitSize = 256;//当图片size小于256的时候，合并到大图合集中
```


## 5.特殊说明

注意：合并到大图集中的图片，当image被删除后，显存不会立即被释放，因为该张大图集中还存有其他图片，所有无法立即从显卡中删除。但是自动大图集管理器，会自动管理这些显存的生命周期，确保这些大图集占用显存的数量恒定在一个值。比如，设定为10张，图集的尺寸为1024*1024,占用显存就是40MB。
