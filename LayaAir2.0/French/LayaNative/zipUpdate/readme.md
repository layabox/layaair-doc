##Procédé de mise à jour des ressources de layanative
La mise à jour se heurte inévitablement à des problèmes de mise à jour après la publication du jeu, c 'est - à - dire après la publication du jeu emballé par layanative, parce qu' il s' agit de modifier le bug ou d 'ajouter une fonction pour modifier des données telles que les codes partiels et les Images du client.
Actuellement, layanative appuie deux méthodes de mise à jour des ressources:

###Mise à jour invisible des utilisateurs (recommandation).

Il s'agit d'une mise à jour continue et continue.Cette approche est conforme à l'idée de mise à jour du site Web selon laquelle le processus de mise à jour des ressources ne peut être déclenché que lorsque l'utilisation d'une ressource est nécessaire.Ce mécanisme de mise à jour à zéro permet à l 'utilisateur d' entrer immédiatement dans le jeu et de le mettre à jour sans le savoir.
Cette mise à jour est basée sur le mécanisme de DCC de layanative, présenté et utilisé par layadcc.[这里](http://localhost/LayaAir2_Auto/%3C/p%3E%3Cp%3Ehttps://ldc.layabox.com/doc2/?nav=zh-as-6-2-0)".

###Mise à jour centralisée avant le jeu.

La plupart des mises à jour d'apps classiques permettent de vérifier dès le début si elles sont nécessaires et, dans l'affirmative, de télécharger un grand fichier zip.Cette mise à jour coûte cher, les utilisateurs ont besoin d'attendre longtemps avant d'entrer dans le jeu et constitue une violation flagrante de la politique d'Apple en matière d'interdiction de la chaleur.Son avantage est que l 'utilisateur peut mettre à jour le wifi là où il n' y a pas de wifi et jouer là où il n 'y a pas de wifi et éviter de gaspiller le flux de données lorsqu' il n 'y a pas de wifi.
Bien que layanative ne soutienne pas directement cette mise à jour, cette fonction peut également être remplie grâce à plusieurs interfaces suivantes (en notant que ces interfaces sont des interfaces internes pouvant être modifiées ultérieurement):
* fonction downloadbigfile pour le téléchargement de grands documents à l'appui de la poursuite du point d'arrêt.(attention de ne pas télécharger de gros fichiers avec xmlhtprequest, dans la mesure où layanative conserve les résultats en mémoire d 'abord, de sorte que les gros fichiers peuvent déclencher l' explosion de la mémoire, fonction qui est stockée à tout moment.- Oui.


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

* catégorie zipfile pour le traitement des documents zip


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

* mise à jour manuelle de la fonction de cache DCC.


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


Ces fonctions permettent d 'effectuer une mise à jour centralisée au - dessus de layadcc.Par exemple, layanative a fourni une fonction updatebyzip encapsulée:

    


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

Code de réalisation de cette fonction dans l 'index.js du moteur.Par conséquent, si vous avez des besoins spéciaux, vous pouvez également utiliser cette fonction pour réaliser votre propre fonction de mise à jour.
Il convient de noter que cette fonction n 'est en fait qu' un téléchargement de zip, puis la mise à jour de chaque fichier dans la case.Dans la pratique, il faut également réaliser sa propre gestion de version, l 'interface, le téléchargement d' infobulles de progrès et ainsi de suite.Pour réaliser ces fonctions, il peut être nécessaire d 'utiliser une interface locale de lecture et d' écriture de fichiers en utilisant les fonctions globales suivantes (qui peuvent également être modifiées par une interface interne):

    


```javascript

    declare var fs_readFileSync:(file:string)=>ArrayBuffer;    
    declare var fs_writeFileSync:(file:string,data:string|ArrayBuffer)=>boolean;
    declare var readFileSync:(file:string,encode:string)=>string;//这个直接返回字符串。
```
Pour obtenir un chemin de cache, il faut un objet appcache à l 'intérieur de layanative:

    


```javascript

     var cachepath = window.appcache.getCachePath()
```

