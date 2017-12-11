## LayaNative resource update method
After the game is released, it is bound to encounter new problems. The update here refers to the game that is packaged after LayaNative is released. Because of modifying bug or adding function, we want to modify some parts of the client's code and pictures：  

### 1. Updates that are not visible to the user (recommended).

This is a continuously update. This method is in line with the updated idea of the webpage: Only when need to use a resource, update process of the resource will be triggered. This rounding is zero update mechanism, allow users to immediately enter the game, imperceptibly completed the update.
This update is based on the LayaNative's DCC mechanism, See LayaDCC introduction and usage [here](
https://github.com/layabox/layaair-doc/tree/master/English/LayaNative/LayaDcc_Tool)。

### 2. Visible to the user before entering the game focused update. 

*Required version LayaNative:>=0.9.7*  
Most of the traditional app updates, just check to see if it needs updating, if need to update to download a large zip file for the overall update. This update is more costly to maintain, It takes a long time to wait for player to enter the game, and it's also a clear violation of Apple's policy. His advantage is that users can update wherever wifi is available, play in places where there is no wifi, void wasting data traffic without wifi.
Although LayaNative does not directly support this update, but through the following few interfaces（Note that these interfaces belong to the internal interface, the possibility of change later）Can also achieve this function: 
* Large file support HTTP download function downloadBigFile.(Be careful not to use XMLHttpRequest download large files, because this way LayaNative will save the results in memory, so large files may cause the memory burst, and this function is saved at any time)   

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
* ZipFile class that processes zip files

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
* Manually update dcc cache functionality.

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

Through these several functions, you can implement a centralized update function above layaDCC. For example, LayaNative provides updateByZip, an encapsulated update function:
    
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
The implementation code of this function is in the engine's index.js. So if there is a special need, you can also refer to this function to realize own update function.
    
It is important to note that this function is actually just download zip, and then update each file inside the cache things. Actual use, but also to achieve their own version management, interface, download progress tips and other functions. In order to achieve these functions may require the local interface to read and write files, you can use the following global function (the same is the internal interface, may change) :
    
```javascript
    declare var fs_readFileSync:(file:string)=>ArrayBuffer;    
    declare var fs_writeFileSync:(file:string,data:string|ArrayBuffer)=>boolean;
    declare var readFileSync:(file:string,encode:string)=>string;//这个直接返回字符串。
```    
If you need to get the cache path, you need the appcache object within the LayaNative ：
    
```javascript
     var cachepath = window.appcache.getCachePath()
```
