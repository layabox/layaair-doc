#リソースバージョン管理

プロジェクトがオンラインになったら、資源バージョンの更新が避けられません。しかし、ブラウザのキャッシュの問題により、引き出したリソースは最新バージョンではなく、プロジェクトバージョンが一致しないため、正常に動作しません。だから合理的に資源を管理して、資源を更新するのはとりわけ必要です。LayaAirエンジンが提供するリソースバージョン管理ツールは、この問題を効果的に解決します。具体的な使い方を見てみます。**注意：エンジンのバージョン番号は1.7.3以上が必要です。**

ここではコマンドラインに合わせて使います。次は手順を見ます。

-nodejsをインストールして、公式サイトからnodejsをダウンロードして住所をダウンロードします。[https://nodejs.org/en/](https://nodejs.org/en/%E3%80%82)

-layacmdツールをインストールします。ダウンロード[https://www.npmjs.com/package/layacmd](https://www.npmjs.com/package/layacmd%E3%80%82)

ここではwinシステムでデモンストレーションします。cmdウィンドウを開けて、コマンドラインにnpm install layacmd-gを入力すればいいです。

このコマンドラインツールは、コンパイル、リリース、リソースの導出、スタティックサーバの作成など、多くの機能を提供しています。ここでは資源管理の機能について説明します。

-新規LayaAirプロジェクトを作成します。

それから、h 5のディレクトリに入ります。新しいresのフォルダを作って、資源をresディレクトリの下に置きます。ここにはいくつかの資源を勝手に追加します。ここに音声フォルダを追加します。中に音声ファイルa.mp 3を入れて、外の階には一つのファイルを置いて、写真1.pngの写真を入れます。

コマンドライン入力をbinディレクトリで開く`layacmd resourceVersion -i res -o . -n 1.0.0`ここで-iはリソースパスを表しています。-o.代表バージョンのリソース出力パスは現在のパスです。もちろん開発者も独自の出力パスを指定してもいいです。例えば、経路がバージョンVersionフォルダなどを定義しています。-n 1.0.0初期化バージョンは1.0.0です。車を返した後、いくつかのファイルとフォルダが生成されているのを見ました。下図のように：



  ![1](img/1.png)(图1)</br>


1.0.0のフォルダの中は1.0.0バージョンのリソースです。`.record`ファイルに記録されているのはファイルのmd 5情報です。削除しないでください。`manifest.json`ファイルに記録されているリソースバージョン番号。

次はプログラムの中でどうやって適用されますか？

​



```typescript

class Main {
    /*设置资源配置文件的地址，这里加了随机参数，保证每次加载的都是新的*/
    private configUrl:string = "manifest.json?"+Math.random();
    constructor() {
        Laya.init(500,500);
        Laya.ResourceVersion.enable(this.configUrl,Laya.Handler.create(this,this.completeHandler));
    }
    private completeHandler(e:any):void{
        Laya.loader.load([{"url":"res/sound/a.mp3","type":Laya.Loader.BUFFER}],Laya.Handler.create(this,this.loadSound));
    }
    private loadSound():void{
        var obj:any = Laya.loader.getRes("res/sound/a.mp3");
    }
}
new Main;
```


-エンジンを初期化した後、私たちがやるべき最初のことはこれをロードすることです。`manifest.json`このファイルです。エンジンは、対応する方法を提供しています。バージョン管理を有効にします。

`ResourceVersion.enable`この方法はmaifest.jsonファイルの経路を伝え、Resource Version類はURL.ctomFormatを書き換えた方法です。ロードリソースの場合は、maifest.jsonのリソースのバージョン番号に合わせてロードされます。manifist.jsonファイルをロードし終わったら、私達のプロジェクトを開始する正式なロジックです。

プロジェクトロジックにサウンドファイルをロードします。上のコードをコンパイルして実行します。Googleのコンソールを開きます。ファイルを読み込む情報を見てください。図のように:

![2](img/2.png)（図2）<br/>

ロードが見えるのは`1.0.0/res/sound/a.mp3`フォルダのリソース私たちはリソースを追加して、テキストファイルを新規作成しています。data.dataと名づけられました。res/data/data.dataファイルに入れます。ローディングコードは以下の通りです。


```typescript

class Main {
    /*设置资源配置文件的地址，这里加了随机参数，保证每次加载的都是新的*/
    private configUrl:string = "manifest.json?"+Math.random();
    constructor() {
        Laya.init(500,500);
        Laya.ResourceVersion.enable(this.configUrl,Laya.Handler.create(this,this.completeHandler));
    }
    private completeHandler(e:any):void{
        var obj:Object = Laya.loader.getRes(this.configUrl);
        var data:any =[
            {"url":"res/sound/a.mp3","type":Laya.Loader.BUFFER},
            {"url":"res/data/data.data","type":Laya.Loader.TEXT}
        ]
        Laya.loader.load(data,Laya.Handler.create(this,this.resComplete));
    }
    private resComplete():void{
        
    }
}
new Main;
```


上のコードをコンパイルして、Googleマネージャを開いてロードのパスを見てください。

![3](img/3.png)（図3）<br/>

私たちは開発モードの時に資源を全部resディレクトリに置いて、正式にバージョンを出す時にコマンドラインツールでバージョン管理をしています。

コマンドラインに先ほどのコマンドを入力します。それでも1.0.0バージョンと定義します。`layacmd resourceVersion -i res -o . -n 1.0.0`実行が完了したら更新ページを見てください。

![4](img/4.png)(图4)</br>


すでにロードされているのは1.0.0フォルダの下のリソースです。

上に述べたのは資源を増加したということです。もし資源を修正したら？私たちはバージョンをリリースする時にバージョン番号を追加すればいいです。例えば、data.dataの内容を修正します。そしてリリースします

`layacmd resourceVersion -i res -o . -n 1.0.1`コマンドライン実行下。そしてページを更新して読み込み状況を見ます。

![5](img/5.png)（図5）<br/>


 **この時点でロードされているのは1.0.1フォルダの下のリソースです。a.mp 3このファイルは修正されていません。彼はやはり1.0.0フォルダの下のリソースをロードします。**

まとめ:

ここまで私たちは資源があれば、リリースされたバージョン番号を修正することができます。このように該当するフォルダに行ってリソースをロードします。manifist.jsonファイルに記録されているバージョン情報が変更されます。