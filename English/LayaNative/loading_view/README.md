# Loading interface

The application at boot time, need to load the necessary HTML, JS, pictures, this time on the need to display the progress by loading the LayaPlayer interface in the running of the project.  LayaPlayer run the project, the default has a LodingView interface, when the animation is completed, you can enter the game, as shown in figure 1:

​![图1](img/1.png) <br/>


## 1. Progress bar control

​ In config.js, developers can control the background color, font color, Tips, and so on for LoadingView. 

config.js location :  
```
Android: Project directory assets/scripts/config.js  
IOS: Project directory resources/scripts/config.js  
```

config.js content is as follows, developers can modify their needs :

```javascript
var loadingView=window.loadingView;
if(loadingView)
{
    loadingView.loadingAutoClose=true;//true代表当动画播放完毕，自动进入游戏。false为开发者手动控制
    loadingView.bgColor("#FFFFFF");//设置背景颜色
    loadingView.setFontColor("#000000");//设置字体颜色
    loadingView.setTips(["新世界的大门即将打开","敌军还有30秒抵达战场","妈妈说，心急吃不了热豆腐"]);//设置tips数组，会随机出现
}
```

## 2. Progress bar control example

In the actual development process, usually want to control the hidden and display of LoadingView accurately. Then the developer can set the value of the loadingView.loadingAutoClose in config.js to be false
Then in the project according to the completion of the load, set the progress bar display progress, call the function as follows:
`loadingView.loading(nPercent);//参数为0-100的整数值，当值为100的时候LoadingView自动关闭`  

The pseudo code in the project is as follows : 
```javascript
var nPercent=0;
var image1 = document.createElement('img');
image1.onload=function()
{
    if(window.loadingView){
        nPercent+=33;
        window.loadingView.loading(nPercent);
    }
}
image1.src = "a.png";

var image2 = document.createElement('img');
image2.onload=function()
{
    if(window.loadingView){
        nPercent+=33;
        window.loadingView.loading(nPercent);
    }
}
image2.src = "b.png";

var image3 = document.createElement('img');
image3.onload=function()
{
    if(window.loadingView){
        nPercent+=33;
        window.loadingView.loading(nPercent);
    }
}
image3.src = "c.png";
```

## 3. Replace the developer's own logo
If developers want to use their own logo, developers only need to copy their logo logo .png logo to the appropriate directory, the directory is as follows:

```
Android: assets/logo/logo.png
IOS:resource/logo/logo.png
```
Instead of loading the layabox animation at this point, instead of displaying logo.png in the middle, you can set the background color, the font color, and the tips by setting up the config.js.

**Tips：**  
*1、Logo can only be in PNG format*  
*2、Replaced with the developer's own logo.png, does not support animation playback*  
*3、Replacing the developer's own logo.png, loading progress can still be set via loadingView.loading *

## 4. Remove all text display

LayaPlayer-0.9.6 later versions, you can remove all the text display, including tips and load percentage, modify config.js, the showTextInfo can be set to false.
```javascript
loadingView.showTextInfo=true;//改成false
```

## 5. Create custom progress bar

In the actual project, LayaPlayer's existing solution is not enough if developers want to make their favorite cool progress bar. It is recommended that developers quickly loading LayaAir-JS engine and necessary pictures, through the LayaAir to achieve their own cool progress bar.

## 6. White list function

Follow up LayaBox will have a whitelist mechanism. If developers purchase licensed or co-operate with LayaBox products, they will be able to remove LayaBox logo, if not, then logo will be forced displayed. Inside the engine, there will be a detection mechanism, random detection, if the test is not passed, it can not enter the game.

## 7. Packaging app (beta)

Currently in LayaAir-IDE support package APP-beta version of the function（**Note: it is suggested that developers should learn some basic knowledge of IOS and Android using the way of building engineering.**）. If you want to replace config.js or replace logo, as shown in Figure 2, Figure 3 below:  

![2](img/2.png) <br/>
​ Picture（2）

Step 2: Click advanced options, configure the script and start LOGO

![3](img/3.png) <br/>
​ Picture（3）
