##LayaNative 자원 업데이트 방법
게임 발표 후에는 반드시 업데이트 문제가 발생할 수 있다. 이 업데이트는 레이야네이트웨이브를 사용한 게임으로 발표한 후, 버그 또는 기능을 수정하기 때문에 클라이언트의 일부 코드와 이미지 등을 수정하고 싶다는 것이다.
현재 LayaNative 두 자원 업데이트 방식을 지원합니다:

###1. 사용자가 볼 수 없는 업데이트 (추천).

이는 지속적으로 이어져 수시로 진행되는 업데이트다.이러한 방식은 웹페이지의 업데이트 사상에 부합된다: 어떤 자원을 사용해야 자원의 업데이트 과정을 발급할 수 있다.이런 화목한 업데이트 메커니즘은 사용자가 바로 게임에 들어가게 해 부지불식간에 업데이트를 완성했다.
LayaNative DCC 메커니즘에 기반된 LayaDCCC 소개와 사용법[这里](http://localhost/LayaAir2_Auto/%3C/p%3E%3Cp%3Ehttps://ldc.layabox.com/doc2/?nav=zh-as-6-2-0).

###2. 사용자가 볼 수 있는, 게임 전 집중 업데이트.

대부분의 전통적인 app 의 업데이트 방식은 올라오면 업데이트할 필요가 있는지 확인하고, 업데이트하려면 큰 zip 파일이 전체적으로 업데이트되는 것을 다운로드합니다.이런 업데이트 비용은 비교적 높고, 사용자는 오랜 시간을 기다려야 게임에 들어갈 수 있고, 애플의 금지열을 위반하는 정책도 눈에 띄게 된다.그의 장점은 와이파이가 있는 곳에서 업데이트를 할 수 있으며, 와이파이가 없는 곳에서 놀 수 있으며, 와이파이가 없을 때 데이터 흐름을 낭비하는 것을 피하는 것이다.
LayaNative 이 업데이트를 직접 지원하지 않았지만, 다음 인터페이스를 통해 내부 인터페이스에 속한 후 변할 가능성이 있음:
* 단점 재전을 지원하는 큰 파일 다운로드 함수 downloadBigFile.(XMLHttpRequest 로 대파일을 다운로드하지 않도록 주의하십시오. 이러한 방식으로 LayaNative 결과를 메모리에 저장할 수 있기 때문에 큰 파일이 메모리에 폭발될 수 있으므로 이 함수는 수시로 저장됩니다.차다


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

* zip 파일을 처리하는 ZipFile 종류


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

* dcc 캐시 기능을 수동으로 업데이트합니다.


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


이 몇 개의 함수를 통해 layaDCC 에서 집중 업데이트 기능을 실현할 수 있다.예를 들어 LayaNative 제공된 재킷 업데이트 함수 updateByZip:

    


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

이 함수의 실현 코드, 엔진의 index.js 중.그래서 특수 수요가 있다면 이 함수를 참고해서 갱신 함수를 실현할 수 있다.
이 함수는 실제로 zip 다운로드만 한 뒤 안에 있는 모든 파일을 cache 에 업데이트하는 것이다.실제로 사용할 때는 직접 버전 관리, 인터페이스, 다운로드 진도 힌트 등을 다운로드해야 한다.이 기능을 실현하기 위해서 로컬 파일의 인터페이스를 읽을 수 있습니다. 아래의 전역 함수를 사용할 수 있습니다. (같은 내부 인터페이스, 변경될 수 있습니다):

    


```javascript

    declare var fs_readFileSync:(file:string)=>ArrayBuffer;    
    declare var fs_writeFileSync:(file:string,data:string|ArrayBuffer)=>boolean;
    declare var readFileSync:(file:string,encode:string)=>string;//这个直接返回字符串。
```
캐시 경로가 필요하다면 LayaNative 내부 appcache 대상:

    


```javascript

     var cachepath = window.appcache.getCachePath()
```

