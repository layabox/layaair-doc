#Wechat Open Data Domain

> Language: ActionScript3

##I. Wechat Open Data Domain Display Component

Since LayaAir 2.0, Laya has officially given the UI component of the Open Data Domain of Wechat to solve the above problems, making it easier to use and more efficient.

Open Data Domain Components can be found in Basics > UI > WXOpenDataViewer in the Engineering Tree

![wx1](img/wx1.png) 







###Use of Open Domain Display Components

1. First, design an open data domain program, such as 500*500 size.

2. In the ide of the main domain, pull out a wxopenidataviewer component to the appropriate location, and set the size to 500 * 500.

![wx1](img/wx2.png) 




3. Viewing in the Wechat Debugger, you can see the content of the open data domain, and the performance and mouse events can be optimized.

![wx1](img/wx3.png) 




Summary: With the new Open Domain Data Component, the Open Domain content can be displayed without encoding, and the performance and mouse events can be optimized.


##II. Use of Open Domain Transport Interface

In the open domain of Wechat, only local single image loading is supported, and atlas can not be used, which is very inconvenient to use. And the scenarios in 2.0 are automatically preloaded, which may lead to Wx open domain error. In order to solve this problem and facilitate the development of open domain, the transmission interface is provided in 2.0. This allows you to use json, atlas, and other files in subdomains.

Currently, the file types that support transparent transmission include separate image, JSON file and Atlas file.

Correspond to the interface in MiniAdapter respectively:`sendSinglePicToOpenDataContext`,`sendJsonDataToDataContext`,`sendAtlasToOpenDataContext`。

Following is an example of using transmissions:

####Excerpts from the main domain section:

Before using the corresponding files, you need to use these interfaces to pass the loaded information from the * main domain * to the sub-domain. These transmissions interfaces are the main domain to sub-domain transmissions provided by Wechat. More information can be viewed from the MiniAdapter source code and official documents of Wechat.


```typescript

if(Browser.onMiniGame){
    //加载一个json和图集
Laya.loader.load(["json/reward.json","res/atlas/test.atlas"],Handler.create(this,function(){
    //加载完成
    //使用接口将图集透传到子域
	MiniAdpter.sendAtlasToOpenDataContext("res/atlas/test.atlas");	
    //使用接口将json投促函到子域
    MiniAdpter.sendJsonDataToDataContext("json/reward.json");
}));
}
```


####Subdomain section excerpts:

This part of the code comes from version 2.0.1 bate**Open Domain Project**Sample code. There are simple modifications here, because two files are passed through, and it is necessary to confirm that both files are accepted for reuse.

Receiving transmitted files requires the use of micro-message subdomains`wx.onMessage`Interface. Details can be viewed via Wechat[官方文档](https://developers.weixin.qq.com/minigame/dev/api/wx.onMessage.html)。


```typescript

//用于计数
var mark:int = 0;
if(Browser.onMiniGame)
    Browser.window.wx.onMessage(function(data:*):void{//微信接受信息
        if(data.url == "res/atlas/test.atlas" || data.url == "json/reward.json"){
        	mark ++;
            if(mark == 2)//确认数据全部接收后
            	Laya.loader.load([
               		"res/atlas/test.atlas",
                	"json/reward.json"],Handler.create(this,onComplete));
        }
	}.bind(this));
```


OnComplete method, pay attention to the original part of the revision.


```typescript

private function onComplete():void() {
    //获取资源
    var testJosn:* = Laya.loader.getRes("json/reward.json");
    //输出透传过来的json
    console.log('透传的json信息：', testJosn);
    //加载IDE指定的场景
    var big:BigRank = new BigRank();
    big.init();
}
```


Test in wechat environment, the effect is as shown in Figure 1:

![] (img/1.png)<br> (Figure 1)

