# Automatic large map set system

## 1. Overview

In order to optimize the running efficiency of the application and reduce the DrawCall, there is a set of automatic large atlas management system in LayaNative. When the image width and height are less than 512, the images will be automatically merged into the collection of large graphs, but the methods used by the developers do not need to be modified.

Create a large number of automatic large atlas, LayaNative According to the memory of the device, the default configuration of some parameters, when all the big picture collection is full, the system will automatically clean up, ensure that the number of large map collection does not exceed the number set in advance.

The parameters of the default settings are shown below: 

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


## 2. How to configure the number of large map collection

Because each project has its own particularity. Developers can also be set according to their needs，Need to set in config.js, the code is as follows :

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

**Tips: memory pool size set must be started in places where the application can not be dynamically set the program, config.js LayaPlayer will start immediately after the implementation of the JS, so here is the most secure. **  


##  3.config.js emplacement

ios edition: under the project directory resource\scripts\config.js  
android edition: under the project directory assets\scripts\config.js    


## 4. Set the size limit in the automatic big picture collection by setting image

As mentioned above, when the image width and height are all less than 512, it will automatically merge into the big picture collection. After the LayaNative-0.9.10 version, developers can set the size value in config.js, the code is as follows:
```javascript
conchConfig.pushAtlasLimitSize = 256;//当图片size小于256的时候，合并到大图合集中
```


## 5. Extra description

Note: Images merged into a large collection will not be released immediately after the image is deleted because other images are still present in the large album, and all images can not be deleted immediately. But the automatic atlas manager will automatically manage the memory of the life cycle, to ensure that these large number of atlas occupied memory at a constant value. For example, set for 10, of size 1024*1024, occupied memory is 40MB.
