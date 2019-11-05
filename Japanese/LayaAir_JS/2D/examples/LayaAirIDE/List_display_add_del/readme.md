#List例：表示、追加、削除

List（リスト）は比較的一般的な機能です。本編ではLayaAirエンジンとIDEを結合して、Listの表示、追加、削除などの操作について説明していきます。開発者がエンジンとIDEの実戦参照を学ぶために。（プロジェクト作成などの基本的な操作は、他のドキュメントを確認してください。本編はスキップします。）

###一、LayaAirIDEでUIを作る

#####1.1 ViewタイプのUIページを作成する



​        ![1](img/1.png)
（図1）ListPageというViewタイプのUIページを作成します。

まず、LayaAirIDEのプロジェクトマネージャにおいて、ViewタイプのUIページを作成します。幅は640＊1136です。ページの名前はListPageです。

#####1.2 UIリソースの導入

美術で作成されたUIページリソースをリソースマネージャに導入する。（具体的な導入方法はLayaAirIDEリソース導入のドキュメントを参照してください。）



​        ![2](img/2.png)
（図2）

#####1.3九宮格でList背景を作る

**1.3.1 Listの背景をステージにドラッグする**



​      ![3](img/3.png)
（図3）写真の背景bgulist.pngをステージにドラッグします。

​**1.3.2 Image属性では、sizGrid属性で九宮格を設定します。**



​      ![4](img/4.png)
（図4）サイゼグGridプロパティ右ボタンをクリックして、九宮格設定パネルを開く

​**1.1.3プロパティにwidthを640に設定する（フルスクリーン幅）**

​![5](img/5.png)
（図5）





 #####1.4 List容器を作る

**1.4.1 checkbox.pngをステージにドラッグし、属性nameをcheckに設定します。**

​![6](img/6.png)
（図6）

​**1.4.2 label.pngをステージにドラッグし、属性nameをlistNumberとし、その他の属性は図7を参照してください。**

​![7](img/7.png)
（図7）シーケンス番号用のlabelコンポーネント

​**1.4.3もう一つのlabel.pngをステージにドラッグして、テキストの内容を変更すると「Listサンプルテキスト」となり、属性設定は図8を参照してください。**

​![8](img/8.png)
（図8）Listテキスト用のlabelコンポーネント

​**1.4.4 list背景図、番号label、テキストlabel、checkboxを選択し、Ctrl+BショートカットでBox容器を作成します。Boxコンテナを選択して、Box属性のrendertypeをrenderに設定します。図9のように、図10は。**

​![9](img/9.png)
（図9）



​     ![10](img/10.png)
（図10）

​**1.4.5 box容器をクリックして再びCtrl+Bを通してList容器を作成します。図11のように。なお、すべてのList容器は、Box容器に基づいている必要があります。次の図12の階層関係を見ると、より明確になります。listはboxサイクルに基づいて発生します。**



​      ![11](img/11.png)
（図11）

​![12](img/12.png)
（図12）

#####1.5 List属性の設定

List容器を選択し、Lis属性varを_listとして設定し、必要に応じて他の属性を設定し、repeatXはX軸のリスト数であり、spaceXはX軸リスト間隔であり、spaceXはY軸リスト間隔であり、spaceYはY軸リスト間隔である。図13に示すように、

​![13](img/13.png)
（図13）

#####1.6操作ボタンを追加する

ここで、私達は直接テンプレートのButonTabを使って、ステージの中にドラッグして、サブノードに入ることをクリックして、var、label属性と九宮格などを設置します。図14のように、図15：



​        ![14](img/14.png)
（図14）

​![15](img/15.png)
（図15）

UI位置の詳細は図16のように調整される。F 12 UIをリリースすれば、コード段階に入ることができます。

​![16](img/16.png)
（図16）



###二、JavaScript言語でListコードロジックを実現する

#####2.1作成されたUIページを表示する

2.1.1 ListDemo.jsプログラムファイルを作成し、対応するjsをindex.html入り口に起動ファイルとして設定します。

​![17](img/17.png)
（図17）

2.1.2コードを編集し、UIを表示する。

まず、ローディングおよびUIクラスを導入し、その後、UIを表示するための図セットリソースをローディングし、最後の例のUIインターフェースをステージに追加します。この3つのリンクは以下のコードにより実現される。


```typescript

(function()
{
    var Stage= Laya.Stage;
    var Handler= Laya.Handler;
    var Loader= Laya.Loader;
    var WebGL = Laya.WebGL;
     
     var ListDemoView;
    (function()
    {
         Laya.init(640,1136,WebGL);
         Laya.stage.bgColor = "#ffffff";
          
         Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
         //预加载资源文件后执行回调
         Laya.loader.load(["res/atlas/ListPage.atlas","res/atlas/template/ButtonTab.atlas"], Handler.create(this, onLoaded));
       
    })();
  
    function onLoaded(){
        ListDemoView = new ListPageUI();
        Laya.stage.addChild(ListDemoView);
    }
     
})();
```


​*Tips：コードの中の図集のパスは自分のプロジェクトの実際の状況によって柔軟に調整します。*



2.1.3符号化が完了したら、F 5で運転し、図18に示すように、ページ表示とIDE作成の効果が一致したら、論理コードの編集を開始します。



​        ![18](img/18.png)
（図18）

#####2.2コードロジックの作成

​**2.2.1 Listシーケンス番号論理を実現する**

Listシーケンス番号のデータ追加を実現するには、「laya.ui.List」APIにおいてlistデータソース割当値array、セルレンダリングプロセッサrender Handler、および「laya.display.Node」APIを用いてサブノード名でサブノードオブジェクトを取得する方法getChildByNameが必要である。まずAPIの説明を見ます。図19、図20、図21のようです。

​![19](img/19.png)
（図19）

​![20](img/20.png)
（図20）

​![21](img/21.png)
（図21）


 **Listシーケンス番号の追加コードは以下の通りです。**


```typescript

(function()
{
    var Stage= Laya.Stage;
    var Handler= Laya.Handler;
    var Loader= Laya.Loader;
    var WebGL = Laya.WebGL;
     
     var ListDemoView;
     var arr;
    (function()
    {
         Laya.init(640,1136,WebGL);
         Laya.stage.bgColor = "#ffffff";
          
         Laya.stage.scaleMode = Stage.SCALE_SHOWALL;

          //预加载资源文件后执行回调
         Laya.loader.load(["res/atlas/ListPage.atlas","res/atlas/template/ButtonTab.atlas"], Handler.create(this, onLoaded));
       
    })();
  
    function onLoaded(){
        ListDemoView = new ListPageUI();
        Laya.stage.addChild(ListDemoView);
        //获得List模拟数据，并渲染
         getListData(); 
    }
  
    function getListData(){
        //添加list数据
        arr = [];
        for (var i  = 1; i <= 30; i++) {
            arr.push({listNumber: {text:i}});
           }
      
        ListDemoView._list.vScrollBarSkin='';//添加list滚动条功能（UI不可显示）
        ListDemoView._list.array = arr;//数据赋值
         //list渲染函数
          ListDemoView._list.renderHandler = new Handler(this, onRender);
    }
  
    function onRender(cell,index){
         //如果索引不再可索引范围，则终止该函数
        if(index > arr.length)return;
        //获取当前渲染条目的数据
        var data = arr[index];
        //根据子节点的名字listNumber，获取子节点对象。         
        var listNumber = cell.getChildByName("listNumber") ;
        //label渲染列表文本（序号）
        listNumber.text=data.listNumber.text;
    }

})();
```


コード実行結果は図22に示すように、シリアルデータの持ち込みに成功しました。具体的な実装ロジックとコードの説明は、コードとコメントを直接参照してください。

​![22](img/22.png)
（図22）

2.2.2 Listシーケンススクロールの実現
30個のアナログデータは上の例の運転後、16個しか見られません。だから私たちはスクロール効果を増やす必要があります。laya.ui.ListのAPIにおいて、vScrrollBarSkinは私たちの需要を満たすことができます。APIは図23のように説明しています。



​        ![23](img/23.png)
（図23）
この機能を追加するには、1行のコードだけで、すべてのコードが接着されなくなります。以下のコードを割り当てリストのデータソースの前に置いてください。


```typescript

//添加list滚动条功能
listView._list.vScrollBarSkin='';
```


再運転効果は図24に示す通りです。

​![24](img/24.png)
（図24）

2.2.3 List追加機能の実現

Listの増加を実現するには、LayaAirエンジンlaya.display.Spriteにおけるイベントリスニングon（）方法を用いて、マウスクリックイベントCLICKをリスニングし、laya.ui.List APIにセルデータソースを追加する方法addItem（）が必要である。

​![25](img/25.png)
（図25）

​![26](img/26.png)
（図26）



 
```typescript

(function()
{
    var Handler= Laya.Handler;
    var Loader= Laya.Loader;
    var WebGL = Laya.WebGL;
    var Event   = Laya.Event;
    var Stage = Laya.Stage;
     
     var ListDemoView;
     var arr;
    (function()
    {
         Laya.init(640,1136,WebGL);
         Laya.stage.bgColor = "#ffffff";
          
         Laya.stage.scaleMode = Stage.SCALE_SHOWALL;

          //预加载资源文件后执行回调
         Laya.loader.load(["res/atlas/ListPage.atlas","res/atlas/template/ButtonTab.atlas"], Handler.create(this, onLoaded));
       
    })();
  
    function onLoaded(){
        ListDemoView = new ListPageUI();
        Laya.stage.addChild(ListDemoView);
        //获得List模拟数据，并渲染
         getListData(); 
         //侦听增加按钮点击事件
         ListDemoView.add.on(Event.CLICK,this,onAddClick);
    }
  
    function getListData(){
        //添加list数据
        arr = [];
        for (var i  = 1; i <= 30; i++) {
            arr.push({listNumber: {text:i}});
           }
      
        ListDemoView._list.vScrollBarSkin='';//添加list滚动条功能（UI不可显示）
        ListDemoView._list.array = arr;//数据赋值
         //list渲染函数
          ListDemoView._list.renderHandler = new Handler(this, onRender);
    }
  
    function onRender(cell,index){
         //如果索引不再可索引范围，则终止该函数
        if(index > arr.length)return;
        //获取当前渲染条目的数据
        var data = arr[index];
        //根据子节点的名字listNumber，获取子节点对象。         
        var listNumber = cell.getChildByName("listNumber") ;
        //label渲染列表文本（序号）
        listNumber.text=data.listNumber.text;
    }
      function onAddClick(){
         //添加单元格数据源
         ListDemoView._list.addItem({listNumber: {text:arr.length+1}});
    }

})();
 ```


詳細はコードとコメントを直接参照してください。


コード実行効果は図27に示す通りです。

​![27](img/27.png)
（図27）リストアップ効果を実現する



2.2.3 List追加機能削除機能の実現

List削除機能を実現するには、多選択ボックスcheckbox機能、削除ボタンのマウスリスニングを実現し、操作後のデータを削除して再レンダリングする必要があります。詳細はコードとコメントを直接参照してください。



 
```typescript

(function()
{
    var Handler= Laya.Handler;
    var Loader= Laya.Loader;
    var WebGL = Laya.WebGL;
    var Event   = Laya.Event;
     var Stage = Laya.Stage;
     var CheckBox = Laya.CheckBox;
     
     var ListDemoView;
     var arr;
    (function()
    {
         Laya.init(640,1136,WebGL);
         Laya.stage.bgColor = "#ffffff";
          
         Laya.stage.scaleMode = Stage.SCALE_SHOWALL;

          //预加载资源文件后执行回调
         Laya.loader.load(["res/atlas/ListPage.atlas","res/atlas/template/ButtonTab.atlas"], Handler.create(this, onLoaded));
       
    })();
  
    function onLoaded(){
        ListDemoView = new ListPageUI();
        Laya.stage.addChild(ListDemoView);
        //获得List模拟数据，并渲染
         getListData(); 
         //侦听增加按钮点击事件
         ListDemoView.add.on(Event.CLICK,this,onAddClick);
         //侦听删除按钮点击事件
         ListDemoView.del.on(Event.CLICK,this,onRemoveClick);
    }
  
    function getListData(){
        //添加list数据
        arr = [];
        for (var i  = 1; i <= 30; i++) {
            arr.push({listNumber: {text:i}});
           }
      
        ListDemoView._list.vScrollBarSkin='';//添加list滚动条功能（UI不可显示）
        ListDemoView._list.array = arr;//数据赋值
         //list渲染函数
          ListDemoView._list.renderHandler = new Handler(this, onRender);
          //mouseHandler: list单元格鼠标事件处理器
          ListDemoView._list.mouseHandler = new Handler(this,onMouse);
    }
  
    function onRender(cell,index){
         //如果索引不再可索引范围，则终止该函数
        if(index > arr.length)return;
        //获取当前渲染条目的数据
        var data = arr[index];
        //根据子节点的名字listNumber，获取子节点对象。         
        var listNumber = cell.getChildByName("listNumber") ;
        //label渲染列表文本（序号）
        listNumber.text=data.listNumber.text;
        //获取当前渲染条目的check组件
        var check=cell.getChildByName("check");
        //根据isCheck的值，确定当前check组件是否为勾选状态（可以避免出现其他多余的选中状态）
        if(data.isCheck)
        {
                check.selected=true;
   
        }
        else
        {
                check.selected=false;
        }
    }
  
      function onRemoveClick(){
      //创建一个新的数组，存放移除条目后的数据
      var temp= [];
      for(var i=0;i<arr.length;i++)
      {
      //将非选中状态的条目数据存储起来
            if(!arr[i].isCheck)
            {
                  temp.push(arr[i]);
            }
      }
      arr = temp;
      //将新的数组赋值给list
      ListDemoView._list.array = arr;
    }
  
      function onAddClick(){
         //添加单元格数据源
         ListDemoView._list.addItem({listNumber: {text:arr.length+1}});
    }

      function onMouse(e,index)
      {
         //鼠标单击事件触发
         if(e.type == Event.CLICK)
         {
              //判断点击事件类型,如果点中的是checkBox组件执行
            if((e.target) instanceof CheckBox)
            {
                 //记录当前条目所包含组件的数据信息(避免后续删除条目后数据结构显示错误)
                var tempObj = arr[index];
                 //根据check的选中状态，设置条目的数据信息
                 if((e.target).selected)
                 {
             ListDemoView._list.setItem(index,{listNumber:{text:tempObj.listNumber.text} ,isCheck:true});
                 }
                 else
                 {
             ListDemoView._list.setItem(index,{listNumber:{text:tempObj.listNumber.text},isCheck:false});
                 }
            }
         }
      }
  
})();
 ```


運転効果は図28に示す通りです。

​![28](img/28.png)
（図28）2、3、4条を削除した後の効果
​

これで、リストのUI作成が完了しました。また、コードロジックの追加、削除が表示されます。疑問があれば、コミュニティに提出してください。ask.layabox.com。



