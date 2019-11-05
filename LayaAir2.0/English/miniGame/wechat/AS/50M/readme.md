# 微信小游戏的50M物理缓存管理

> author: Charley

###The Significance of Physical Caching

In addition to local packages, Wechat games allow developers to use 50M of physical cache space. That is to say, after the first load, the resources in the physical cache need not be loaded dynamically remotely, but can use the local cache resources directly. In this way, not only can players save a lot of download traffic, but also have the same opening speed as native APP games.



###LayaAir engine default cache management mechanism

In the LayaAir engine, the engine layer has automatically helped developers to do a good job of caching management mechanism, the default is to start the automatic caching management mechanism.

Under the management mode of automatic caching,**If it is detected that resources are not cached locally, remote resources are cached automatically. Note that only pictures and sound files are cached in automatic caching mode**If files in other formats need to be cached, they can be downloaded and cached through the interface of manual caching.

If the cached file exceeds 50M, it will automatically clean up the earliest cached content, cleaning up 5M of space at a time, so that it can be written in a circular way to ensure that the cached file is always the latest downloaded 50M file.



###LayaAir Engine Manual Management Cache Interface

####1. Cancel automatic caching

If the common resources of the game are more than 50M, the files using automatic caching management may not meet the developer's expectations. Especially for the early loaded resources, if they are common resources, the later loaded resources will be cleaned up after the cache exceeds 50M, and then the next time they are used, they will be reloaded again. So when the common resources are more than 50M, developers are advised to weigh which resources are more meaningful to cache and have a better user experience. At this point, you can cancel the automatic caching mode.

If you don't need the engine to automatically manage the cache, you can set MiniAdpter. autoCacheFile to false. It should be noted that after the automatic cache is closed, because it will not be automatically cleaned up, writing cache will fail after 50M, so it is necessary to establish a cache strategy to decide which files to cache and which files need to be cleaned manually.



####2. Manually download files and cache local files

When you do not intend to use automatic caching, or in automatic caching mode, you can use downLoadFile method to download the target file and cache it locally when caching the contents of files that are not cached automatically, such as json.


```javascript

/**
* 下载文件 
* @param fileUrl 文件地址(全路径)
* @param fileType 文件类型(image、text、json、xml、arraybuffer、sound、atlas、font)
* @param callBack 文件加载回调,回调内容[errorCode码(0成功,1失败,2加载进度)
* @param encoding 文件编码默认 ascill，非图片文件加载需要设置相应的编码，二进制编码为空字符串
*/             
public static function downLoadFile(fileUrl:String, fileType:String = "",callBack:Handler = null,encoding:String = "ascii"):void
```




####3. Clearing Cache Files

Since the upper limit of the cache of Wechat games is 50M physical space, it is necessary to clean up the cache after reaching the upper limit whether it is automatically managed or manually managed. The default size of each cache cleanup is 5M. If you want to change the default size of each cache cleanup, you can change it by modifying it.

The MiniAdpter. minClearSize attribute is fine.

If you want to delete a specified cached file or all cached files, you can use remote or removeAll methods.


```javascript

/**
* 删除指定缓存文件
* @param fileUrl文件路径(绝对地址)
* @param callBack 删除回调函数
*/
public static function remove(fileUrl:String,callBack:Handler):void {}
```



```javascript

/**
* 清空缓存空间全部文件内容 
*/  
public static function removeAll():void{}
```




If you have any questions about this document, please go to the official QQ community and ask questions. You can also send links from the community to @administrator Charley in the official QQ group.

Community Web site: https://ask.layabox.com/



##This article appreciates

If you think this article is helpful to you, you are welcome to sweep the code and appreciate the author. Your motivation is our motivation to write more high quality documents.

![wechatPay](../../../wechatPay.jpg)