# Memory pool management

In order to avoid the memory is too large, or the developer forgets to release memory, cause the application to be directly kill risk system, a set of memory management mechanism in LayaPlayer principle, as shown in figure 1:


![图1](img/1.jpg)  



**Why do we need automatic memory management, early IOS equipment (iphone4S, ipad2) or early Android memory devices, only 512MB, when the application memory reaches about 270MB, the application system will be directly kill off, the user experience is not good, occupy the most resources in the game is the picture resources.**

### 1. How to configure



####  1.1. Default setting

The memory pool size, the developer needs to set the application before the start of execution, if the developer is not set, the LayaPlayer internal memory device according to set a default value, the code is as follows:  
```javascript
var nMem = conchConfig.getTotalMem();
if (nMem <= 524288) {
    conchConfig.maxTextureMemSize = 64 * 1024 * 1024;
}
else if (nMem > 524288 && nMem <= 1048576) {
    conchConfig.maxTextureMemSize = 84 * 1024 * 1024;
}
else if (nMem > 1048576) {
    conchConfig.maxTextureMemSize = 128 * 1024 * 1024;
}
```



####  1.2. Developer settings
Developers can also be set according to their own needs, you need to set in config.js, the code is as follows:

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
    conchConfig.maxTextureMemSize = 80 * 1024 * 1024;
}
else if (nMem > 524288 && nMem <= 1048576) {
    conchConfig.maxTextureMemSize = 128 * 1024 * 1024;
}
else if (nMem > 1048576) {
    conchConfig.maxTextureMemSize = 200 * 1024 * 1024;
}
```

**Tips: The memory pool size set must be started in places where the application can not be dynamically set the program, config.js LayaPlayer will start immediately after the implementation of the JS, so here is the most secure.**



####  1.3. Where is config.js

ios edition：在工程目录下的resource\scripts\config.js  
android edition：在工程目录下的assets\scripts\config.js  



### 2. Serious jerky, Screen flicker

Run the project under LayaPlayer, if there is a serious jerky, or the screen flickers. This time you can connect the device to the computer to view the log, if the log has been frequently printed the following:

```verilog
freeRes(0):Total:8,left:5,clearedMem:115620
```

As shown in Figure 2 below：
![图1](img/2.jpg)  

The reason why this happens：Under current picture, the number of drawing pictures memory has exceeded the maximum size memory pool, the memory pool will always trigger the cleanup function, and the flashing may occur.


### 3. How to solve

####  3.1. Expand the size of the memory pool

According to the 1.2 methods, the memory pool size is set larger, testing project again, if not in frequent print freeRes log, and jerky, screen flicker does not exist, because that memory problems caused by the problem, maybe this time you can be in a good mood.

####  3.2. Solve the problem fundamentally

If you want to fundamentally solve the problem, developers need to strictly control the life cycle, the memory size of the picture and the picture is displayed if there is residual.
#####  3.2.1. How to calculate the picture memory
(1) a sheet `1024*1024` picture memory size is occupied:  `1024 * 1024 * 4 = 4MB`。
(2)  a sheet `768*890` picture memory size is occupied: `1024 * 1024 * 4 = 4MB`, Due to the hardware limitations of some graphics cards, the size of the texture must be 2 n power, all `768*890` picture will create `1024*1024` size in the video card.
(3) It is strongly recommended that when art is making pictures, if the picture is wider or higher than 512 pixels, the size of the requested picture is n's power of 2. Don't avoid such 513 or 1025 sizes. The picture LayaPlayer engine automatically processes the merged atlas.
#####  3.2.3. Picture memory, graphics card relationship
![图3](img/3.jpg)  

**Graphic:**
(1) A png picture, size is `768*890`, File size is 420KB 
(2) Through the loader function for network loading, the consumption of traffic is 420KB.
(3) By png decoding into ImageBitmapData, take up memory `768*890*4=2.73MB`。  
(4) To draw the image onto the screen, you first need to create a texture on the graphics card. The size of this texture needs to be n-th power of 2, so a `1024*1024`, then upload ImageBitmapData data to the graphics card, memory to memory copy.
(5) This time takes `1024*1024*4=4MB` memory, image data from memory to the graphics card, the memory of the BitmapData engine will be automatically released. 
(6) If the pre load a picture, but the picture is long time without rendering, would have been to use memory, the LayaPlayer engine will default in loading pictures after 20 seconds, the picture memory release, when need to draw, and then reload from the hard disk.

#####  3.2.3. Preloaded picture
Many applications will use the preload function to preload many images into memory in advance, but these pictures are not drawn. At this time, the memory will be more intense. The LayaPlayer engine will empty the resources by default after loading 20 seconds. So be sure to control the number of preloaded pictures. 
If the requirements of the project are just to be downloaded first to the local, not to be used first, this can use the way of resource packaging or LayaDCC.
In a word, the number of preloaded pictures should be careful.
The time to delete the memory picture can be set by the following code:

```javascript
conch.config.setImageReleaseSpaceTime(15000);//The unit is millisecond, and the default is 20000
```
See log output `JCImageManager::setReleaseSpaceTime=15000` setting is successful

**Tips：setImageReleaseSpaceTime function is also written in the best config.js in the call**

##### 3.2.4. Because the memory problems caused by some nodes have been deleted

In many projects, it often happens that it is normal to enter the first screen of game. But several times of interface or several scenes are returned. It is found that the first screen is flickering. Log has been printing freeRes.  
Most of this is because some nodes are not deleted. The screen is still rendering, but it is blocked by the main interface. This time, ensure that your application controls the deletion and hiding mechanism of nodes.


### 4. Debugging means.

If you have 3.2.4 phenomenon in the project, the LayaPlayer engine provides a small method, through the function of all the pictures are set to find the picture so translucent, not hide or delete nodes,  resulting in memory problems.

```javascript
if( window.conch )
{
    window.conch.config.setTransparentMode();
}
```
**Tips**  
*1. Conch can only be called under the LayaPlayer environment, and there is no conch definition in the web version, and all needs to be judged if it exists.*  
*2. If you use the as language to develop, you can get conch objects in this way through  `Browser.window['conch'] `*

As shown in Figure 4:

![图3](img/4.jpg)  
