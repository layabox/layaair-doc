#runTimeの使用

LayaAirIDEでは、リソースパネルの下にあるすべてのコンポーネントは、runtimeの属性があります。runtimeは、このコンポーネントが動作する時の論理クラスです。同じコンポーネントは、同じruntimeクラスを使用して、同じ機能を実現することができます。例えば、異なるページで同じコンポーネントに対して同じ機能を実現する必要があります。**なお、コンポーネントのruntime論理クラスは、コンポーネント自体を引き継ぎ、引き継ぐオブジェクトに該当するコンポーネントの属性がない場合、この属性は無効になります（ViewとDialogページでは使用できません）。**

**runTimeスクリプトは拡張スクリプトと似ていますが、異なるのはruntimeはコンポーネントに新しい属性を追加できません。拡張スクリプトの使用を推奨します。**

**本記事では、2つの異なるページのImageコンポーネントに同じruntime論理クラスを設定して、同じ機能を実現します。動作効果は図0に示すように、**

![0](img\0.gif)（図0）

###一、ページのセットにruntimeクラスを設定します。

ページ管理ディレクトリの下で2つのUIページを作成し、それぞれMonkeyPageとBGPgeといいます。二つのUIページの中でそれぞれImageコンポーネントにドラッグして、runtime属性をgame.ImageRunTimeとします。図1の図2に示すように、

![1](img\1.png)（図1）

![2](img\2.png)（図2）

設定が完了したら出力UIを保存し、論理コードの作成を開始します。



###二、コード論理処理

FlashBuiderでBGPage UIとMonkeyPageUI類を開くと、エラーが発生します。次の図のように（ここでBGPage UI類を開くと、MonkeyPageUIはBGPge UI類と同じです。）：

![3](img\3.png)（図3）

このエラーは心配しないでください。プロジェクトのImageRunTime論理クラスは開発者が自分で作成したものです。ここはまだ作成していません。ゲームパッケージもないので、エディタが見つけられなくて、エラーが発生しました。

次に、srcディレクトリの下でゲームパッケージを作成し、ゲームパッケージの中でImageRunTimeクラスを作成します。作成後、BGPage UIとMonkeyPageUI類のエラーは図4に示すように消えています。

![4](img\4.png)（図4）

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
			this.on(Event.MOUSE_DOWN,this,scaleSmal);
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
		private function scaleSmal():void
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
	import laya.utils.Handler;
	import ui.BGPageUI;
	import ui.MonkeyPageUI;

	public class LayaSample {
		
		public function LayaSample() {
			//初始化引擎
			Laya.init(800, 700);
			//预加载资源
			Laya.loader.load("res/atlas/test.atlas",Handler.create(this,onLoaded));
		}		
		
		private function onLoaded():void
		{
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


![5](img\5.gif)(图5)


この時、UIページのリソース表示がおかしいことが分かります。これはボタンのskinがデフォルトで3状態であるためです。Imageのruntime論理クラスがButtonコンポーネントから継承されると、ImageコンポーネントではなくButtonコンポーネントになります。



