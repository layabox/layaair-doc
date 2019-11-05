#追加スクリプトの使用

プロジェクトの開発では、しばしばこのような状況があります。公的に提供されたコンポーネントは、新しい属性を追加したい、IDEに新しい属性を設定したいなどの需要を満たすことができません。LayaAirIDE 1.4.0バージョンの後に、拡張スクリプトと追加スクリプトの2つの方法が提供されます。

​**拡張スクリプト:**引き継ぎの形で、あるコンポーネントの機能を拡張し、自分の論理を実現し、さらには新しい属性を追加し、IDEに新しい属性を表示し、可視化の設定を行う。

​**追加スクリプト:**非継承方式で、追加的に、あるコンポーネントにいくつかの挙動を追加し、新しい属性を追加し、IDEに新しい属性を表示し、可視化の設定が新しい属性を設定します。

上記の拡張方法があると、開発者はコンポーネントの挙動を任意に修正し、新しい属性を追加し、可視化されたUIシーンとコードを結合させることができ、同じシーンで複数の拡張スクリプトを追加することができる。

​**拡張スクリプトと追加スクリプトの違い**：拡張スクリプトはコンポーネント自体から継承され、追加スクリプトはコンポーネント自体にコントロールスクリプトを追加し、現在のコンポーネントの任意の属性を変更できます。引き継ぎません。

**この記事では、複数のコンポーネントに同じシナリオを追加し、それらの移動速度と名前を例にして、追加スクリプトの使い方を詳しく紹介します。最終効果は下図の通りです。**

![0](img\0.gif)（図0）

###一、UIページを作る

新しくExpandPageというUIページを作って、このUIページにBoxコンポーネントを入れて、Boxコンポーネントに写真とテキストコンポーネントを入れます。テキストコンポーネントのnameをuserNと名づけて、サイズと配置を決めて保存します。図1に示すように、

![1](img\1.png)（図1）



###二、拡張スクリプトを作成し、コンポーネントに追加して値を付ける

UIパネル管理では、右キー→新規スクリプトを選択し、追加スクリプト（UI作成ページでスクリプトを選択することができます）を選択し、スクリプトに対応する論理クラス、すなわち以下の実行クラス名を選択します。図2に示すように、

![2](img\2.png)（図2）

確定ボタンをクリックするとプロジェクトパネルに自動的に1つのファイルが作成されます。スクリプトファイルには通常の属性がいくつか用意されています。属性を追加する時はこれらの属性テンプレートを参照してください。

![3](img\3.png)（図3）

MonkeyScriptラベルに私たちが必要とする属性を追加します。図4に示すように、

![4](img\4.png)（図4）

追加スクリプト編集が完了したらUIインターフェースを開き、開発者がより直感的に変化を見ることができるように、ここでBoxをUIインターフェースに複写する。

![5](img\5.png)（図5）

次に作成したMonkeyScriptにスクリプトを追加して、Boxにドラッグ＆ドロップします。Boxの内部にコンポーネントの識別情報が追加されます。また、右側の属性欄に追加スクリプトの属性情報が表示されます。図6に示すように、

![6](img\6.gif)（図6）

階層パネルでは、三つのコンポーネントのspeedとuserNameにそれぞれMonkey Scriptスクリプトを選択し、速度を順に増加し、それぞれ1.2.3に設定します。名前は小さいa、小さいb、小さいcです。この3つの同じコンポーネントのオブジェクト属性に対して異なる割当値を行いました。保存後、ショートカットキーF 12（Ctrl+F 12）を押してUIを導き、コードを作成します。



###コードロジック作成

プロジェクトをFlashBuiderに導入した後、ExpandPageUIファイルを開くと、エラーが発生しました。game.MonkeyScriptが見つかりません。図7に示すように、

![7](img\7.png)（図7）

このエラーは心配しないでください。プロジェクトの中でMonkeyScriptスクリプトに対応するロジック類は開発者が自分で作成したものです。まだ作成していないので、エディタが見つけられなくて、エラーが発生しました。

次に、src/gameパッケージの下にMonkey Script類を作成します。追加すると、ExpandPageUIクラスのエラーは図8に示すように消えてしまいます。

![8](img\8.png)（図8）

MonkeyScriptで拡張スクリプトに追加された属性を作成します。すべてのコードは以下の通りです。

ここでは、必要な空のコンポーネント参照を受信するために、ownerまたはtarget属性を定義する必要がある。


```typescript

package game
{
	import laya.display.Sprite;
	import laya.ui.Label;
	/**
	 *附加脚本对应的逻辑类 
	 * @author mengjia
	 * 
	 */	
	public class MonkeyScript
	{
		/**攻击速度**/
		public var speed:Number = 0;
		/**人物名称**/
		public var userName:String = "";
		/**记录状态**/		
		private var boo:Boolean = false;
		/**定义一个变量来接收Box组件实例**/		
		private var monkeyBox:Sprite;
		public function MonkeyScript()
		{
			
		}
		/**
		 *设置owner函数，可以直接获取到添加附加脚本的组件实例 
		 * @param value
		 * 
		 */		
		public function set owner(value:*):void{
			monkeyBox = value;
			//自定义的脚本会有时序问题，所以在此添加一个延时
			monkeyBox.frameOnce(2,this,onLoaded);
		}
		
		private function onLoaded():void
		{
			//通过子元素的name值获取该对象
			var userN:Label = monkeyBox.getChildByName("userN") as Label;
			//设置文本内容为属性栏中给的值
			userN.text = userName;
			monkeyBox.frameLoop(1,this,onLoop);
		}
		/**
		 *设置帧循环，实现左右移动 
		 * 
		 */	
		private function onLoop():void
		{
			if(monkeyBox.x<=0){
				boo = false;
				monkeyBox.x+=speed;
			}
			else if(monkeyBox.x<Laya.stage.width-monkeyBox.width && boo == false){
				monkeyBox.x+=speed;
			}
			else if(monkeyBox.x>=Laya.stage.width-monkeyBox.width || boo == true){
				monkeyBox.x-=speed;
				boo = true;
			}
		}
	}
}
```


最後に、インポートクラスでExpandPageUIページを実行します。**注意：UIインターフェースを実装する前に必要なリソースを事前にロードしなければなりません。**）コードは以下の通りです。


```typescript

package {
	import laya.media.SoundManager;
	import laya.utils.Handler;
	
	import ui.ExpandPageUI;

	public class LayaSample {
		
		public function LayaSample() {
			//初始化引擎
			Laya.init(600, 700);
			//设置背景色
			Laya.stage.bgColor = "#ffcccc";
			//预加载资源
			Laya.loader.load("res/atlas/test.atlas",Handler.create(this,onLoaded));
			
		}		
		
		private function onLoaded():void
		{
			//实例化UI界面
			var ExpandPage:ExpandPageUI = new ExpandPageUI();
			//添加到stage上
			Laya.stage.addChild(ExpandPage);
			
		}
	}
}
```


最終表示結果は文章の先頭図0に示す通りです。