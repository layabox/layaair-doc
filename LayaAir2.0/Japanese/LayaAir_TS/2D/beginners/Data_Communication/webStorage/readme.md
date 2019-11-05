#Web Strageデータストア

HTML 5は、クライアントにデータを格納する2つの新しい方法を提供する。

**local Strage-時間制限のないデータストア**

**session Strage-一つのセッションに対するデータストア**

session Storrageに格納されているデータは、ブラウザセッション終了時にクリアされます。つまり、ブラウザが閉じられている時です。

これまではクッキーで作られていました。しかし、Cookieサイズは4 kに制限されており、大量のデータの格納には適しておらず、各サーバに対する要求によって伝達されており、Cookie速度が遅く、効率も高くない。Cookieの役割は、サーバと相互作用してHTTP仕様の一部として存在するが、Web Strageはローカルにデータを格納するためだけに生じる。

HTML 5では、データはサーバ毎に要求されるものではなく、要求時のみデータを使用する。ウェブサイトの性能に影響を与えずに大量のデータを記憶することが可能になります。

異なるウェブサイトに対しては、データは異なるエリアに格納され、一つのウェブサイトは自身のデータにしかアクセスできない。そのため、ローカルデータの保存は完全にLocal Strageでできます。LayaAirエンジンはLocal Strageを簡単にパッケージ化しました。対応するクラスはLocal Strageです。簡単な例を通して、どうやって使うかを見てみます。


```java

// 程序入口
class LayaSample{
    constructor()
    {
        Laya.init(100,100);
        Laya.LocalStorage.setItem("key","hello");
        var data:any = {"index":0,"index1":1};
        var str:string = JSON.stringify(data);
        Laya.LocalStorage.setItem("data","hello");
        Laya.LocalStorage.setItem("item",str);
    }
}
new LayaSample();
```


chromeで運転してショートカットキーF 12を押したら、次の図のようになります。

![1](img/1.png)<br/>

図から先のデータが全部保存されているのが見えます。

これらのデータをクリアします。コードは以下の通りです。


```java

Laya.LocalStorage.setItem("key","hello");
var data:any = {"index":0,"index1":1};
var str:string = JSON.stringify(data);
Laya.LocalStorage.setItem("data","hello");
Laya.LocalStorage.setItem("item",str);
Laya.LocalStorage.removeItem("data");//清除数据
```


コードLocastrage.removeItemを追加して、キーの値をdataのデータをクリアして、コンパイルして実行したらdataのデータがなくなっています。下図のように：

![2](img/2.png)<br/>

すべてのデータを整理して、元のコードの最後にコードを追加すればいいです。


```java

Laya.LocalStorage.clear();
```


コンパイルすると、ドメイン名に格納されていたすべてのデータが消えていることが分かります。

![3](img/3.png)<br/>

session StorrageはLayaAirエンジンにはまだ封入されていませんが、そのまま使用できます。次にLayaAirでsession Strageをどう使うかを示します。次の例は、ページカウンタです。現在のセッションでユーザがページにアクセスする回数をカウントします。

LayaAirIDEを開いて空き項目を作成します。具体的なコードは以下の通りです。


```java

// 程序入口
class LayaSample{
    constructor()
    {
        Laya.init(100,100);
        var sessionStorage:any = Laya.Browser.window.sessionStorage;
        if(sessionStorage.pagecount){
            sessionStorage.pagecount = parseInt(sessionStorage.pagecount)+1;
        }
        else{
            sessionStorage.pagecount = 1;
        }
        console.log(sessionStorage.pagecount);
        
    }
}
new LayaSample();
```


var session Strage：any=Laya.Browser.window.session Strage；この言葉は現在のページのsession Strageの会話対象を取得するという意味です。



ここでのロジックは、現在のセッションオブジェクトにパーゲコントロール属性があるかどうかを判断し、存在しない場合は初めてオープンして1に設定し、存在する場合はすでにオープンし、アキュムレータを行うことです。そして積算回数を出力します。このファイルをコンパイルして、Googleで運転して、F 12コンソールを開けて、出力が1であることを発見しました。そして、私達は絶えず更新します。そして、私たちはGoogleのブラウザを閉じて、このページを新たに開けます。この時出力されたのはまた1で、ページの更新回数はまた累積しています。これにより、session Strageは会話レベルの記憶対象であることが分かります。ブラウザを閉じると消えます。