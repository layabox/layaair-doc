## LayaNative的资源更新方法
游戏发布之后必然会遇到更新的问题，这里的更新是指用LayaNative打包的游戏发布后，因为修改bug或者添加功能，想要修改客户端的部分代码和图片等数据。  
目前LayaNative支持两种资源更新方式：  
1. 用户不可见的更新（推荐）。  
这是一种持续的，随时进行的更新。这种方式是符合网页的更新思想：只有当需要使用某个资源的时候，才会触发资源的更新流程。这种化整为零的更新的机制，可以让用户立即进入游戏，在不知不觉间就完成了更新。  
这种更新基于LayaNative的DCC机制,LayaDCC的介绍和使用方法见[这里](
https://github.com/layabox/layaair-doc/tree/master/Chinese/LayaNative/LayaDcc_Tool)。

2. 用户可见的，进入游戏前的集中更新。  
*需要版本:>=0.9.7*  
大部分传统的app的更新方式，一上来就检查是否需要更新，如果需要更新就下载一个大的zip文件进行整体更新。这种更新的维护成本较高，用户需要较长时间的等待才能进入游戏，而且还明显违反Apple的禁止热更的政策。他的好处是用户可以在有wifi的地方更新，在没有wifi的地方玩，避免在没有wifi的时候浪费数据流量。
我们虽然没有直接支持这种更新，但是通过下面的几个接口（注意这些接口属于内部接口，以后有改变的可能性）也能实现这个功能：  
    1. 支持断点续传的大文件下载函数。（注意不要用XMLHttpRequest下载大文件，因为我们会把结果先保存在内存中，所以大文件可能会导致内存爆掉，而这个函数是随时存盘的。）

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
    2. 处理zip文件的ZipFile类

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

    3. 手动更新dcc缓存的功能。

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
    通过这几个函数，就可以在layaDCC之上实现一个集中更新的功能。例如我们提供的一个封装好了的更新函数updateByZip：

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
    这个函数的实现代码，在引擎的 index.js中。所以如果有特殊需求，也可以参考这个函数来实现自己的更新函数。
    
    需要注意的是这个函数实际上只是做了下载zip，然后把里面的每个文件更新到cache中的事情。实际使用的时候，还要自己实现版本管理，界面，下载进度提示等功能。为了实现这些功能可能需要本地读写文件的接口，可以使用下面的函数（同样是内部接口，可能会改变）：

    ```javascript
    declare var fs_readFileSync:(file:string)=>ArrayBuffer;    
    declare var fs_writeFileSync:(file:string,data:string|ArrayBuffer)=>boolean;
    declare var readFileSync:(file:string,encode:string)=>string;//这个直接返回字符串。
    ```    
    如果需要获得缓存路径：

    ```javascript
     var cachepath = window.appcache.getCachePath()
    ```
