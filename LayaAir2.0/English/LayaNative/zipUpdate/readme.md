##LayaNative's Resource Renewal Method
After the release of the game will inevitably encounter the problem of updating, where updates refer to the LayaNative packaged game after release, because modify bugs or add functions, want to modify some of the client code and pictures and other data.
Currently, LayaNative supports two resource updates:

###1. User invisible updates (recommendations).

This is an ongoing, ongoing update. This approach is in line with the idea of web page updating: only when a resource needs to be used, will the process of resource updating be triggered. This whole-to-zero update mechanism allows users to enter the game immediately and complete the update unconsciously.
This update is based on LayaNative's DCC mechanism. Introduction and usage of LayaDCC[这里](http://localhost/LayaAir2_Auto/%3C/p%3E%3Cp%3Ehttps://ldc.layabox.com/doc2/?nav=zh-as-6-2-0)。

###2. Users can see the centralized updates before entering the game.

Most traditional app updates check to see if they need to be updated, and download a large zip file for overall updates if they need to be updated. The cost of updating is high, users need to wait longer to enter the game, and apparently violate Apple's policy of banning hot spots. Its advantage is that users can update where they have wifi, play where they don't have wifi, and avoid wasting data traffic when they don't have wifi.
Although LayaNative does not directly support this update, it can also do so through the following interfaces (note that these interfaces belong to internal interfaces and there is a possibility of future changes):
* Download BigFile, a large file download function that supports breakpoint continuation. (be careful not to use XMLHttpRequest to download large files, because Laya native will save the results in memory first in this way, so large files may cause memory explosion, and this function is stored on disk at any time. )


```javascript

    /**
    * @param url 远程地址
    * @param local 存到本地文件
    * @param onprog 下载进度回调
    * @param oncomp 下载完成回调
    * @param trynum 重试次数（0无限重试） 
    * @param opttimeout 超时时间（建议足够大）
    */
    declare var downloadBigFile:(url:string,
        local:string,
        onprog:(total:number,now:number,speed:number)=>boolean,oncomp:(curlret:number, httpret:number)=>void,
        trynum:number,
        opttimeout:number)=>void;
    
```

* ZipFile class for processing zip files


```javascript

    interface ZipFile{
        setSrc(src:string):boolean;
        /**
        * 遍历zip中的文件。
        * id:
        * name:文件名，包含路径
        * dir:是否是目录
        * sz:文件大小
        */
        forEach(func:(id:number,name:string,dir:boolean,sz:number)=>void):void;
        /**
        * 读取zip中的文件的内容，返回一个ArrayBuffer
        */
        readFile(id:number):ArrayBuffer;
        close():void;
        
        new ():ZipFile;
    }
    
    declare var ZipFile:ZipFile;    
```

* Manually update the function of DCC cache.


```javascript

    interface AppCache{
        ...
        /**
        * 更新dcc缓存中的一个文件
        * @param nameid 更新的文件的id。
        *   路径规则：/，表示app根目录。例如：hashstr('/index.html')， 不要带参数，如果带参数的话-- hashstr('/aa/bb.html?ff=2') 会导致谁也找不到这个文件
        * @param chksum 校验码，如果0则此函数自己计算。如果是外部版本控制，则这个是hashstr后的版本号。
        * @param buf ArrayBuffer 文件内容。
        * @param extversion 是否使用外部版本号
        * @return boolean 如果返回true则表示更新成功，否则的话，表示校验码不一致，即
        *      先要更新dcc才能工作。
        */
        updateFile(nameid:number,chksum:number,buf:ArrayBuffer,extversion:boolean):boolean;        
        ...
    }
```


Through these functions, we can implement a centralized update function on layaDCC. For example, LayaNative provides an encapsulated update function updateByZip:

    


```javascript

    /**
    * 用zip进行更新。
    * @param {string} url  zip下载地址
    * @param {(event:string,downloadPercent:number,curfile:string)=>void} onEvent  事件的回调。
    *      其中的event是事件名称，可能的事件如下：
    *          'downloading' 下载中，这时候downloadPercent有值
    *          'downloadError' 下载错误
    *          'downloadOK' 下载成功。
    *          'updating'  更新中，这时候 curfile有值，表示正在更新的文件
    *          'updateError' curfile更新错误。因为curfile不在dcc列表，或者文件内容与dcc内容不一致。少量更新错误可以忽略，因为在实际使用的时候还是会下载
    *          'unknownError' 
    * @param {function(localfile:string):void} onEnd 更新完成的回调
    */
    function  updateByZip(url, onEvent, onEnd)
```

The implementation code of this function is in the index. JS of the engine. So if you have special needs, you can also refer to this function to achieve their own update function.
It's important to note that this function actually just downloads zip and updates every file in it to cache. In actual use, we also need to implement version management, interface, download progress hints and other functions. To implement these functions, you may need an interface for reading and writing files locally, using the following global functions (also internal interfaces, which may change):

    


```javascript

    declare var fs_readFileSync:(file:string)=>ArrayBuffer;    
    declare var fs_writeFileSync:(file:string,data:string|ArrayBuffer)=>boolean;
    declare var readFileSync:(file:string,encode:string)=>string;//这个直接返回字符串。
```
If you need to get the cache path, you need the appcache object inside LayaNative:

    


```javascript

     var cachepath = window.appcache.getCachePath()
```

