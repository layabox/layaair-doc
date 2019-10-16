# Panel组件参考

Panelは裁断機能のあるパネル容器類で、素子の表示領域を設定するのが一般的です。表示する要素を直接Panel容器に追加することができます。Panelの幅の高さは元素が表示する幅の高さです。

###一、LayaAirIDEでPanelコンポーネントを作成する

**1.1 Panelコンポーネントをドラッグしてページ編集エリアにドラッグします。**

IDEリソース管理右側のコンポーネントパネルのUIフォルダから、PanelコンポーネントをUIページにドラッグします。図1に示すように、

![1](img\1.gif)</br/>(図1)

Panelには幅の高さ（例えば、100＊100）を設定します。UI画面のPanelコンポーネントをダブルクリックして、写真を入れます。表示効果および階層構造図を図2に示す。

![2](img\2.png)</br/>(図2)

図2から分かるように、入れた写真は裁断されました。最後に表示される幅の高さはPanel容器の幅の高さです。このようにして、画像の座標を直接調整して、表示内容を変えられます。



**1.2表示要素を直接Panel容器に変更する**

UI画面で写真を準備して、ショートカットキーCtrl+Bを押してPanel容器に変更します。図1-1に示すように、

![1-1](img\1-1.png)</br/>(図1-1)

クリックして確定したら、Panelに幅を100*100に設定します。表示効果および階層構造を図2に示します。

**1.3スクロールバーの表示を追加する**

Panelコンポーネントはスクロールバーを設定することもできます。**リストコンポーネント以外に、Panelはスクロールバーをセットできる唯一のコンテナコンポーネントです。**。ここではPanelにスクロールバーを設定して効果を見ることができます。

Panelのスクロールバーを設定します。図3に示すように、

![3](img\3.png)</br/>(図3)

Ctrl＋F 12（またはF 12）はUIインターフェースを導き、コードにリソースをプリロードし、UIインターフェースを実装する。最終表示効果は、図4に示すように、

![4](img\4.gif)</br/>(図4)



##二、コードでPanelコンポーネントを作成する

パンコンポーネントは、UIインターフェースで直接可視化できるほか、コードの中で上記の効果を実現するのも簡単である。

コードで実現される効果は図5に示すとおりです。

![5](img\5.gif)</br>(图5)


**サンプルコード:**


```typescript

class PanelTest {
    constructor() {
        //初始化引擎
        Laya.init(800, 600);
        //预加载所需资源
        Laya.loader.load("res/atlas/comp.atlas", Laya.Handler.create(this, this.onLoaded));
    }
    private onLoaded(): void {
        //实例化Panel组件
        var panel: Laya.Panel = new Laya.Panel();
        //给panel添加背景色
        panel.graphics.drawRect(0, 0, 100, 100, "#ffcccc");
        //给panel设置宽高
        panel.size(100, 100);
        //给panel设置滚动条皮肤
        panel.vScrollBarSkin = "comp/vscroll.png";
        //将panel添加到stage上
        Laya.stage.addChild(panel);

        //实例化Image组件
        var img: Laya.Image = new Laya.Image();
        //给image添加皮肤
        img.skin = "comp/image.png";
        //将image添加到panel组件中
        panel.addChild(img);
    }
}
new PanelTest();
```


