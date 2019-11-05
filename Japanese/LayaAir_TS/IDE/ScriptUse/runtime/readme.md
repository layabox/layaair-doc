#runTimeの使用

LayaAirIDEでは、リソースパネルの下にあるすべてのコンポーネントは、runtimeの属性があります。runtimeは、このコンポーネントが動作する時の論理クラスです。同じコンポーネントは、同じruntimeクラスを使用して、同じ機能を実現することができます。例えば、異なるページで同じコンポーネントに対して同じ機能を実現する必要があります。**なお、コンポーネントのruntime論理クラスは、コンポーネント自体を引き継ぎ、引き継ぐ対象に該当するコンポーネントの属性がない場合には、この属性は無効となります。（ViewやDialogページでの使用はサポートされていません）**

**runTimeスクリプトは拡張スクリプトと似ていますが、異なるのはruntimeはコンポーネントに新しい属性を追加できません。拡張スクリプトの使用を推奨します。**

**本記事では、2つの異なるページのImageコンポーネントに同じruntime論理クラスを設定して、同じ機能を実現します。動作効果は図0に示すように、**

![0](img\0.gif)（図0）

###一、ページのセットにruntimeクラスを設定します。

ページ管理ディレクトリの下で2つのUIページを作成し、それぞれMonkeyPageとBGPgeといいます。二つのUIページの中でそれぞれImageコンポーネントにドラッグして、runtime属性をgame.ImageRunTimeとします。図1の図2に示すように、

![1](img\1.png)(图1)



![2](img\2.png)（図2）

設定が完了したら出力UIを保存し、論理コードの作成を開始します。



###二、コード論理処理

コードモードに切り替えて、layaUID.max.all.tsファイルを開くと、エラーが発生します。下の図のように、

![3](img\3.png)（図3）

このエラーは心配しないでください。プロジェクトのImageRunTime論理クラスは開発者が自分で作成したものです。ここはまだ作成していません。ゲームパッケージもないので、エディタが見つけられなくて、エラーが発生しました。

次に、srcディレクトリの下でゲームパッケージを作成し、ゲームパッケージの中でImageRunTimeクラスを作成します。作成後、layaUID.max.all.tsのエラーが消えていることが分かります。

![4](img\4.png)（図4）

その後、ImageRunTimeクラスで私たちが達成したい効果を作成します。例えば、クリックスケーリング（似たようなボタン）の機能を実現します。すべてのコードは以下の通りです。


```typescript

module game {
    /*
    ImageRunTime逻辑类 
    */
    export class ImageRunTime extends Laya.Image{
        public scaleTime:number = 100;
        constructor() {
            super();
            //设置组件的中心点
			this.anchorX = this.anchorY = 0.5;
			//添加鼠标按下事件侦听。按时时缩小按钮。
			this.on(Laya.Event.MOUSE_DOWN,this,this.scaleSmal);
			//添加鼠标抬起事件侦听。抬起时还原按钮。
			this.on(Laya.Event.MOUSE_UP,this, this.scaleBig);
			//添加鼠标离开事件侦听。离开时还原按钮。
			this.on(Laya.Event.MOUSE_OUT,this, this.scaleBig);
        }
        private scaleBig():void
		{
			//变大还原的缓动效果
			Laya.Tween.to(this, {scaleX:1,scaleY:1},this.scaleTime);
		}
		private scaleSmal():void
		{
			//缩小至0.8的缓动效果
			Laya.Tween.to(this,{scaleX:0.8,scaleY:0.8},this.scaleTime);
		}
    }
}
```


これらの2つのUIインターフェースをメインクラスで実装し、コードは以下の通りです。


```typescript

// 程序入口
class GameMain {
    constructor() {
        Laya.init(800, 700);
        //预加载资源
        Laya.loader.load("res/atlas/test.atlas", Laya.Handler.create(this, this.onLoaded));
    }
    private onLoaded(): void {
        //实例化BGPageUI页面
        var bgPage: ui.BGPageUI = new ui.BGPageUI();
        //为了能够清楚的看到这个页面所在的位置，在此设置设置一个背景色
        bgPage.graphics.drawRect(0, 0, 300, 300, "#ffcccc");
        //添加到stage
        Laya.stage.addChild(bgPage);

        //实例化MonkeyPageUI页面
        var monkeyPage: ui.MonkeyPageUI = new ui.MonkeyPageUI();
        //为了能够清楚的看到这个页面所在的位置，在此设置设置一个背景色
        monkeyPage.graphics.drawRect(0, 0, 300, 300, "#ffcccc");
        //添加到stage
        Laya.stage.addChild(monkeyPage);
        //设置第二个页面的坐标
        monkeyPage.x = 350;
    }
}
new GameMain();
```


最終運転効果は図0に示します。



###三、runtime論理クラスが継承する対象が自身のコンポーネントではない場合

以上のコードの中で、自分のコンポーネントImageを引き継ぐ効果を実証しましたが、Buttonのコンポーネントクラスを引き継ぐとどうなりますか？操作してみます。コードと実装効果は以下の通りです。


```typescript

module game {
    /*
    ImageRunTime逻辑类 
    */
    export class ImageRunTime extends Laya.Button{
        public scaleTime:number = 100;
        constructor() {
            super();
            //设置组件的中心点
			this.anchorX = this.anchorY = 0.5;
			......
        }
        ......
    }
}
```


![5](img\5.gif)（図5）

この時、UIページのリソース表示がおかしいと気づきます。ボタンのskinはデフォルトでは3状態です。Imageのruntime論理クラスがButtonコンポーネントから継承されると、ImageコンポーネントではなくButtonコンポーネントになります。