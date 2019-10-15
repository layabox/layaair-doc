#Summary of Frequent Questions in Wechat Games

>*Author: Charley version: 2.0.1 update: 2019-03-13*

####1. Why put in the local package of small games, some resources can not be loaded and used properly.

Because the file extensions are whitelisted in the local package, extensions that are not in the whitelist cannot be uploaded successfully and are naturally unavailable. However, it can be used by dynamically loading URLs, so don't upload them into local packages.

Whitelist of known file type white list is: png, jpg, jpeg, jpeg, gif, svg, js, json, cer, obj, dae, fbx, jsl, json, cer, obj, daj, fbx, ftl, stl, 3ds, mp3, mp3, pvr, pvr, wav, plist, ttf, ttf, fnt, gz, ccz, m4a, mp4, mpmp4, bmp, atlas, bmp, las, swf, swf, ani, ani, part, proto, bin, sk, sk, mipmaps, txt, zip, txt, txt, TT tt, tttttttttt, silog, map, map, sillani, lav, LS ani, ltc.



####2. Why do games have jagged edges on some models?

Before Wechat's version 7.0.3, Wechat would force Canvas canvas to be stretched to screen physical size for full screen adaptation. Since 7.0.3, Wechat would no longer force stretching for performance considerations, so when developers designed a size smaller than the physical screen size and stretched stage size through engine adaptation mode, it would cause the pixels to be incomplete and screen image. On prime pairs, it seems that on some high-resolution models there will be a sense of edge mosaic. At this time, we can adjust the canvas size of the design mode to adapt to the mainstream model.



####3. The effect under H5 is normal. After publishing to the mini-game, it begins to report errors, which is related to JSON.

Because reading local resources in mini-games checks the encoding, and most non-picture files in projects are coded as ASCII, when the engine calls the local interface to read the files, the default pass-on will tell the mini-games that the encoding format is ASCII. When the encoding format of the local initial package files (such as JSON files) is not ASCII, the error will be reported. So, the developer needs to check the encoding of the file and then pass it through`MiniAdpter['getUrlEncode']`Tell the game what the real encoding of the file is, so that the game can be checked according to the correct encoding without making a mistake.


```js

//告诉小游戏你的文件编码是什么
MiniAdpter['getUrlEncode'] = getUrlAndEncode;//假如getUrlAndEncode是开发者识别文件编码的方法
```


Examples of Developer Identifying File Coding Methods (AS3 Version):


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




In addition, dynamic loading and reading from the network, there is no coding verification restriction. Therefore, JSON can also be dynamically loaded and read in the network.



####4. Sound cannot be preloaded with loader

Because Weixin games do not support the use of pre-loading sound files into memory, SoundManger audio management class can be used directly for sound playback.







###Subsequent updates:

This document will summarize some common problems that developers encounter in the development of Wechat games and give answers. If you have any questions about this document, please go to the official website community to ask questions.

This document will be updated from time to time to address common problems in small games that developers in the community have reported.

Community Web site: https://ask.layabox.com/



##This article appreciates

If you think this article is helpful to you, you are welcome to sweep the code and appreciate the author. Your motivation is our motivation to write more high quality documents.

![wechatPay](../../../wechatPay.jpg)