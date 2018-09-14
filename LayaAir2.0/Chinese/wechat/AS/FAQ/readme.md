# 微信小游戏常见问题汇总

> author: charley

#### 1、为什么放到小游戏本地包里的,有一些资源无法正常加载使用。

由于本地包中对文件的扩展名设置了白名单，所以不在白名单内的扩展名文件无法上传成功，自然就无法使用了。但是，可以通过URL动态加载使用，别放到本地包内上传就好了。

已知的文件类型白名单为：png、jpg、jpeg、gif、svg、js、json、cer、obj、dae、fbx、mtl、stl、3ds、mp3、pvr、wav、plist、ttf、fnt、gz、ccz、m4a、mp4、bmp、atlas、swf、ani、part、proto、bin、sk、mipmaps、txt、zip、tt、map、ogg、silk、dbbin、dbmv、etc、lmat、lm、ls、lh、lani、lav、lsani、ltc。



#### 2、为什么设置了exactfit适配模式，无法做到全屏拉伸适配？

微信小游戏不允许引擎来控制canvas的大小。小游戏的canvas大小是自动拉伸的。而exactfit模式的stage宽高会一直等于设计宽高，当canvas无法控制的时候，exactfit的适配其实是失效了。这里建议采用fixedauto、或者full等无需考虑设计宽高，会自动改变stage宽高的适配模式，再结合一些其它适配方案来尝试一下。

比如，使用fixedauto、或者full适配模式后，将背景图的top、bottom、left、right属性设置为0，就可以铺满全屏了。



#### 3、在H5下的效果显示正常，发布到小游戏后开始报错，报错提示与JSON有关。

由于小游戏里读本地资源会校验编码，而项目里绝大多数非图片文件的编码为ASCII，所以引擎调用本地接口读取文件时，默认传参会告诉小游戏编码格式为ASCII码，当本地初始包的文件（比如json文件）的编码格式不是ASCII，那就会报错。所以，开发者需要去检查文件的编码，然后通过`MiniAdpter['getUrlEncode']`告诉小游戏该文件真正的编码是什么，这样小游戏按照正确的编码去校验就不会出错了。

```js
//告诉小游戏你的文件编码是什么
MiniAdpter['getUrlEncode'] = getUrlAndEncode;//假如getUrlAndEncode是开发者识别文件编码的方法
```

开发者识别文件编码的方法示例（AS3版）：

```javascript
//该方法示例仅做参考，视项目情况自行修改或拓展
public static var getUrlAndEncode:Function = function(url:String,type:String):String
{
	if (url.indexOf(".fnt") != -1 || url.indexOf("xxx.json") != -1) 
    {
		return "utf8";
	} else if (type == "arraybuffer") 
    {
		return "";
	}
	return "ascii";
}
```



另外，从网络中动态加载读取，没有编码的校验限制。所以，也可以把json放在网络中动态加载读取。



#### 4、声音无法用loader预加载

在音频方面，由于微信小游戏与HTML5原生浏览器的使用方式不同，小游戏底层环境不支持创建声音实例的接口以实例存储方式的使用。所以，不能直接使用loader的方式预加载网络的音频文件再使用。

可以用SoundManger音频管理类直接播放音频文件。

或者，对于存在预加载需求的，可以通过缓存文件下载的方法downLoadFile，先将文件下载到本地缓存中，确认缓存中存在后，直接播放本地缓存中的音频文件，也可以达到预加载的效果。



#### 5、Mater物理引擎在小游戏中报错，竖屏模式下鼠标无事件响应。

由于小游戏window作用域的问题，会出现`Matter is not defined` 的报错。或者在竖屏模式下，鼠标无事件。这些问题都已经在引擎库1.7.20的版本里，对Matter.js进行了修复。请使用1.7.20及以后的版本，可解决以上问题。但是，需要注意的是，Layabox团队已对Matter.js进行了修改，以后只能使用引擎中提供的Matter.js，不可从第三方获得Matter.js进行替换，否则适配工作将由自己来实现。

引擎未更新之前，可以前往社区中[下载](https://ask.layabox.com/question/15055)（下面的链接）。在最佳答案的附件matter.zip里。替换matter.js即可。

[https://ask.layabox.com/question/15055](https://ask.layabox.com/question/15055)



### 后续更新：

本篇文档会汇总开发者在微信小游戏开发时遇到的一些常见小问题，给予解答。如果对本篇文档有疑问，请前往官网社区提问。

针对社区中开发者反馈到的小游戏常见问题，本篇文档会进行不定期的更新。

社区网址：https://ask.layabox.com/



## 本文赞赏

如果您觉得本文对您有帮助，欢迎扫码赞赏作者，您的激励是我们写出更多优质文档的动力。

![wechatPay](../../../wechatPay.jpg)