##LayaNativeの資源更新方法
ゲームがリリースされると必ず更新されます。ここでのアップデートとはLayaNativeでパッケージ化されたゲームをリリースした後、バグを修正したり機能を追加したりして、クライアントのコードや画像などのデータを一部修正したいということです。
現在LayaNativeは二つのリソース更新方式をサポートしています。

###1.ユーザーに見えない更新（推奨）。

これは継続的で、随時更新されます。このような方法はウェブページの更新思想に適合しています。あるリソースを使う必要がある時だけ、リソースの更新プロセスをトリガします。このようなゼロ化された更新の仕組みは、ユーザーをすぐにゲームに取り込むことができ、知らず知らずのうちに更新が完了しました。
このアップデートはLayaNativeのDCCメカニズムに基づいており、LayaDCCの紹介と使用方法を参照してください。[这里](http://localhost/LayaAir2_Auto/%3C/p%3E%3Cp%3Ehttps://ldc.layabox.com/doc2/?nav=zh-as-6-2-0)。

###2.ユーザーが見ている、ゲームに入る前の集中更新。

伝統的なappの更新方法のほとんどは、アップデートが必要かどうかを確認し、更新が必要な場合は大きなzipファイルをダウンロードして全体的に更新します。このような更新の維持コストが高く、ユーザーは長い時間を待ってからゲームに入ることができます。彼の利点は、ユーザーがwifiを持っているところで更新できます。Wifiがないところで遊んで、Wifiがない時にデータの流れを無駄にしないようにします。
LayaNativeはこの更新を直接サポートしていませんが、以下のいくつかのインターフェースを通じて(これらのインターフェースは内部インターフェースに属しています。今後は変更する可能性があります。)もこの機能を実現できます。
*ブレークポイントの継続をサポートする大ファイルダウンロード関数downloadBigFile。（XMLHttp Requestで大きなファイルをダウンロードしないように注意してください。このようにLayaNativeは結果を先にメモリに保存しますので、大きなファイルはメモリが破裂する恐れがあります。この関数はいつでも保存します。)


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

*zipファイルを扱うZipFile類


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

*手動でdccキャッシュの機能を更新します。


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


これらの関数によって、layaDCCの上に集中的に更新する機能が実現されます。例えばLayaNativeが提供するパッケージの更新機能udateByZip：

    


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

この関数の実装コードは、エンジンのindex.jsにあります。特別な需要があれば、この関数を参考にして自分の更新関数を実現することもできます。
注意したいのはこの関数は実際にはzipをダウンロードしただけで、中の各ファイルをcacheに更新することです。実際に使う時は、自分でバージョン管理、インターフェース、ダウンロード進捗ヒントなどの機能を実現します。これらの機能を実現するためには、ローカルにファイルを読み書きするインターフェースが必要かもしれません。下のグローバル関数を使用してもいいです。

    


```javascript

    declare var fs_readFileSync:(file:string)=>ArrayBuffer;    
    declare var fs_writeFileSync:(file:string,data:string|ArrayBuffer)=>boolean;
    declare var readFileSync:(file:string,encode:string)=>string;//这个直接返回字符串。
```
キャッシュパスを得るためには、LayaNative内部のappcacheオブジェクトが必要です。

    


```javascript

     var cachepath = window.appcache.getCachePath()
```

