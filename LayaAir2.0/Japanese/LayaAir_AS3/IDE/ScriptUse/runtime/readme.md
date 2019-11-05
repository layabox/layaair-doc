#runTimeの使用

LayaAirIDEでは、リソースパネルの下にあるすべてのコンポーネントは、runtimeの属性があります。runtimeは、このコンポーネントが動作する時の論理クラスです。同じコンポーネントは、同じruntimeクラスを使用して、同じ機能を実現することができます。例えば、異なるページで同じコンポーネントに対して同じ機能を実現する必要があります。**注意したいのは、コンポーネントのruntime論理クラスが、コンポーネント自体を引き継ぎ、引き継ぐオブジェクトにそのコンポーネントの属性がない場合、この属性は無効になります。**

**runTimeスクリプトはスクリプトと似ていますが、異なるのはruntimeスクリプトの方式で実現され、ページ、シーンまたはコンポーネントクラスを継承し、論理を実現します。IDEにシーンのRuntime属性を設定すれば、シーンやオブジェクトと関連付けられます。**

＊**スクリプト方式に比べて、継承ページクラスは、ページ定義の属性（IDE内var属性によって定義される）を直接使用できます。例えば、this.tipbll、this.scorol、コード提示効果があります。**
＊**提案：ページレベルの論理であれば、頻繁にページ内の複数の要素にアクセスする必要があります。runtime継承式の書き方を使います。独立した小さいモジュールであれば、機能が単一であれば、scriptスクリプトの方法を推奨します。**

**本記事では、2つの異なるページのImageコンポーネントに同じruntime論理クラスを設定して、同じ機能を実現します。動作効果は図0に示すように、**

![0](img\0.gif)（図0）

###一、ページのセットにruntimeクラスを設定します。

ページ管理ディレクトリの下で2つのUIページを作成し、それぞれMonkeyPageとBGPgeといいます。次の図のように、

気をつけて！本例では、タイプは分離モードであり、非ファイルモードのみがUIクラススクリプトを生成し、デフォルトではファイルモードであり、ファイルモードはUIクラスを生成しない。

![1](img\ide1.png)



二つのUIページのそれぞれをImageコンポーネントにドラッグして、スクリプトイメージをruntime属性ボックスにドラッグします。図1の図2に示すように、

![1](img\ide2.png)（図1）

![2](img\ide3.png)（図2）

設定が完了したら出力UIを保存し、論理コードの作成を開始します。



###二、コード論理処理

コードモードでGameConfig.as類を開くと、エラーが発生します。下図のように（）：

![3](img\ide5.png)（図3）

このエラーは心配しないでください。プロジェクトのImageRunTime論理クラスは開発者が自分で作成したものです。ここはまだ作成していません。ゲームパッケージもないので、エディタが見つけられなくて、エラーが発生しました。

次に、srcディレクトリの下でゲームパッケージを作成し、ゲームパッケージの中でImageRunTimeクラスを作成します。作成後、GameConfig類のエラーが消えていることが分かります。図4に示すように、

![4](img\ide6.png)（図4）

その後、ImageRunTimeクラスで私たちが達成したい効果を作成します。例えば、クリックスケーリング（似たようなボタン）の機能を実現します。すべてのコードは以下の通りです。


```typescript

package game
{
	import laya.events.Event;
	import laya.ui.Image;
	import laya.utils.Tween;
	/**
	 *ImageRunTime逻辑类 
	 * @author mengjia
	 * 
	 */
	public class ImageRunTime extends Image
	{
		//缩放时间100毫秒
		public var scaleTime:int = 100;
		public function ImageRunTime()
		{
			//设置组件的中心点
			this.anchorX = this.anchorY = 0.5;
			//添加鼠标按下事件侦听。按时时缩小按钮。
			this.on(Event.MOUSE_DOWN,this,scaleSmall);
			//添加鼠标抬起事件侦听。抬起时还原按钮。
			this.on(Event.MOUSE_UP,this, scaleBig);
			//添加鼠标离开事件侦听。离开时还原按钮。
			this.on(Event.MOUSE_OUT,this, scaleBig);
		}
		private function scaleBig():void
		{
			//变大还原的缓动效果
			Tween.to(this, {scaleX:1,scaleY:1},scaleTime);
		}
		private function scaleSmall():void
		{
			//缩小至0.8的缓动效果
			Tween.to(this,{scaleX:0.8,scaleY:0.8},scaleTime);
		}
	}
}
```


これらの2つのUIインターフェースをメインクラスで実装し、コードは以下の通りです。


```typescript

package {
    import laya.display.Scene;
    import laya.net.AtlasInfoManager;
    import laya.net.ResourceVersion;
    import laya.utils.Handler;
    import laya.utils.Stat;
    import laya.utils.Utils;
    import laya.d3.core.particleShuriKen.module.StartFrame;
    import laya.display.Sprite;
    import ui.BGPageUI;
    import ui.MonkeyPageUI;
    
    public class Main {
        public function Main() {
            //根据IDE设置初始化引擎      
            if (window["Laya3D"]) Laya3D.init(GameConfig.width, GameConfig.height);
            else Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            
            //打开调试面板（IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
            if (GameConfig.debug || Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
            if (GameConfig.stat) Stat.show();
            Laya.alertGlobalError = true;
            
            //激活资源版本控制，版本文件由发布功能生成
            ResourceVersion.enable("version.json", Handler.create(this, this.onVersionLoaded), ResourceVersion.FILENAME_VERSION);
        }
        
        private function onVersionLoaded():void {
            //激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
            AtlasInfoManager.enable("fileconfig.json", Handler.create(this, this.onConfigLoaded));
        }

        private function onConfigLoaded():void {
            //加载场景
            //GameConfig.startScene && Scene.open(GameConfig.startScene);

            //实例化BGPageUI页面
            var bgPage:BGPageUI = new BGPageUI();
            //为了能够清楚的看到这个页面所在的位置，在此设置设置一个背景色
            bgPage.graphics.drawRect(0,0,300,300,"#ffcccc");
            //添加到stage
            Laya.stage.addChild(bgPage);
            //实例化MonkeyPageUI页面
            var monkeyPage:MonkeyPageUI = new MonkeyPageUI();
            //为了能够清楚的看到这个页面所在的位置，在此设置设置一个背景色
            monkeyPage.graphics.drawRect(0,0,300,300,"#ffcccc");
            //添加到stage
            Laya.stage.addChild(monkeyPage);
            //设置第二个页面的坐标
            monkeyPage.x = 350;
        }
    }
}
```


最終運転効果は図0に示します。



###三、runtime論理クラスが継承する対象が自身のコンポーネントではない場合

以上のコードの中で、自分のコンポーネントImageを引き継ぐ効果を実証しましたが、Buttonのコンポーネントクラスを引き継ぐとどうなりますか？操作してみます。コードと実装効果は以下の通りです。


```typescript

package game
{
	import laya.display.Sprite;
	import laya.events.Event;
	import laya.maths.Rectangle;
	import laya.ui.Button;
	import laya.ui.Image;
	import laya.utils.Tween;

	/**
	 *ImageRunTime逻辑类 
	 * @author mengjia
	 * 
	 */
	public class ImageRunTime extends Button
	{
		//缩放时间100毫秒
		public var scaleTime:int = 100;
		public function ImageRunTime()
		{
			//设置组件的中心点
			this.anchorX = this.anchorY = 0.5;
			......
		}
		......
	}
}
```


![5](img\5.gif)（図5）

この時、UIページのリソース表示がおかしいことが分かります。これはボタンのskinがデフォルトで3状態であるためです。Imageのruntime論理クラスがButtonコンポーネントから継承されると、ImageコンポーネントではなくButtonコンポーネントになります。



