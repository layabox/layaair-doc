# 截屏

在项目开发过程中经常会有截屏的需求，例如：截取屏幕上的内容进行分享或者二次绘制。

### 1.截屏函数

截屏函数是LayaPlayer特有函数，所有需用通过conch对象调用，代码如下：
```javascript
if( window.conch )
{
    window.conch.captureScreen(function(arrayBuff,width,height){

    }
}
```
**函数说明**：captureScreen需要传入一个回调函数，回调函数有三个参数，分别是图片ImageData，类型是一个arrayBuffer，图片的宽和高。  

**Tips**  
*1、conch只能LayaPlayer环境下调用，在网页版本中是没有conch定义的，所有需要判断一下是否存在。*  
*2、如果使用as语言开发的时候，可以通过 `Browser.window['conch'] `这种方式获得conch对象。*

### 2.保存图片函数

当截屏的回调函数回调后，可以通过conch的saveAsPng把图片存储到本地，具体函数如下：

```javascript
conch.saveAsPng( arrayBuff,width,height,conch.getCachePath()+"/test.png" );
//存储后便可以通过 file:///的方式直接进行访问了
var image = window.document.createElement("img");
image.onload=function()
{	
	
}
image.src="file:///" + conch.getCachePath()+"/test.png";
```
在LayaNative-0.9.13以后，还可以通过conch的saveAsJpeg把图片存储到本地，具体函数如下：  

```javascript
conch.saveAsJpeg( arrayBuff,width,height,conch.getCachePath()+"/test.jpg" );
//存储后便可以通过 file:///的方式直接进行访问了
var image = window.document.createElement("img");
image.onload=function()
{	
	
}
image.src="file:///" + conch.getCachePath()+"/test.jpg";
```


**函数说明**：saveAsJpeg和saveAsPng需要传入三个参数，第一个参数是图片的ImageData数据，第二、三个参数分别为宽和高，第三个参数为存储完整路径和文件名。  

**Tips**：  
*存储的完整路径，开发者可根据自己需求进行填写，但是必须保证路径是正确的，代码实例中，通过`conch.getCachePath()`获得到了该应用的缓存目录为存储目录。*


### 3.直接通过putImageData生成图片
截屏后除了可以把图片保存到本地以外，还可以通过putImageData的方式，把imageData数据put到image对象中，代码如下：
```javascript
var image = window.document.createElement("img");
image.putImageData(arrayBuff,width,height);
```
**函数说明**：putImageData函数需要有三个参数，分别是二进制数据、图片的宽、高。

**Tips**  
*putImageData函数是同步函数，putImageData后可直接使用image，不需要等待onload函数*
### 4.格式转换函数
在LayaNative-0.9.13以后，截屏后可以把图片的ImageData数据转换成jpg或者png格式，代码如下：
```javascript
var jpg = conch.convertBitmapToJpeg(arrayBuff,width,height);
window.fs_writeFileSync(conch.getCachePath()+"/test.jpg", jpg);//保存到本地或者其他操作

var png = conch.convertBitmapToPng(arrayBuff,width,height);
window.fs_writeFileSync(conch.getCachePath()+"/test.png", png);//保存到本地或者其他操作
```
### 5.简单代码实例

```javascript
if( window.conch )
{
    window.conch.captureScreen(function(arrayBuff,width,height){
        /*
        //存储文件的方式
        conch.saveAsPng( arrayBuff,width,height,conch.getCachePath()+"/test.png" );
        window.globalImage = window.document.createElement("img");
		window.globalImage.onload=function()
		{
			...使用image对象
		}
		window.globalImage.src = "file:///" + conch.getCachePath()+"/test.png";
        */

        //
        window.image = window.document.createElement("img");
        image.putImageData(arrayBuff,width,height);
        //...使用image对象
    }
}

```
