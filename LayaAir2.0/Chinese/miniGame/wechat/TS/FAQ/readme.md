# 微信小游戏常见问题汇总

> *author: charley    version:2.0.1  update: 2019-03-13*

#### 1、为什么放到小游戏本地包里的,有一些资源无法正常加载使用。

由于本地包中对文件的扩展名设置了白名单，所以不在白名单内的扩展名文件无法上传成功，自然就无法使用了。但是，可以通过URL动态加载使用，别放到本地包内上传就好了。

已知的文件类型白名单为：png、jpg、jpeg、gif、svg、js、json、cer、obj、dae、fbx、mtl、stl、3ds、mp3、pvr、wav、plist、ttf、fnt、gz、ccz、m4a、mp4、bmp、atlas、swf、ani、part、proto、bin、sk、mipmaps、txt、zip、tt、map、ogg、silk、dbbin、dbmv、etc、lmat、lm、ls、lh、lani、lav、lsani、ltc。



#### 2、为什么游戏在一些机型上边缘有锯齿？

在微信7.0.3之前的版本之前，微信会强制把Canvas画布拉伸到屏幕物理尺寸来进行全屏适配，而7.0.3开始，微信为了性能的考虑，不再强制拉伸，所以当开发者在设计大小低于物理屏幕的尺寸再通过引擎的适配模式来拉伸stage大小时，就会导致像素点没有完全和屏幕像素对上，看上去在一些高分辨率的机型上就会有边缘马赛克的感觉。这时候，可以通过调整设计模式的画布尺寸，来适配主流机型。



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

由于微信小游戏不支持预加载声音文件到内存的使用方式，直接用SoundManger音频管理类进行声音播放即可。







### 后续更新：

本篇文档会汇总开发者在微信小游戏开发时遇到的一些常见小问题，给予解答。如果对本篇文档有疑问，请前往官网社区提问。

针对社区中开发者反馈到的小游戏常见问题，本篇文档会进行不定期的更新。

社区网址：https://ask.layabox.com/



## 本文赞赏

如果您觉得本文对您有帮助，欢迎扫码赞赏作者，您的激励是我们写出更多优质文档的动力。

![wechatPay](../../../wechatPay.jpg)