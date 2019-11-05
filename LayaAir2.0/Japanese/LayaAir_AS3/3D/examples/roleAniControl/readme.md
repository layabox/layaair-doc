##3 Dキャラクター切り替えと動画

###3 D実例分析と資源準備

技術文書の勉強を通して、基本的に3 Dゲーム開発の基礎知識を身につけました。実例を通して、3 D技術の総合的な運用について説明します。

以下の例の効果（図1）を見ると、ゲーム中の3 Dキャラクター選択インターフェースと似ています。まず、例の3 Dゲームの世界構成部分を分析してみます。



 ![图1](img/1.gif)<br/>(図1)



####2 Dインターフェースと3 D結合

3 Dシーンは常に2 Dインターフェースと混合して使用されるが、この例では、インターフェースUI部分はLayaAir IDE編集であり、リソースローディング進捗ページとゲーム中の制御UIページを含む。彼らの制作方法は2 Dゲームと完全に一致しています。IDE編集画面に詳しくないなら、「技術文書ーLayaAir IDE編」を参照してください。



####3 Dシーン

例ではシーンモデルは3 ds maxでFBXとして作成され、untiyで編集されたものに導入されます。主に二つの作業があります。

一つはシーンの光写真のスタンプを作成するために、フォトスタンプはモデル間の静的な影、光照射の色及び雰囲気の効果を生み出すことができるので、ゲームの美術品質を向上させることが重要です。

広告移動の材質UVアニメーションを編集します。3 ds maxの中の材質UVアニメーションはuntiyではサポートされていないので、unityで作る必要があります。

材質UVアニメーションunityの制作方法は「技術文書—LayaAir 3 Dエンジン—LayaAir 3 Dアニメーション二」にあります。



####3 Dキャラクターと骨格アニメーション

3 Dキャラクターモデルと骨格アニメーションは、3 ds maxで編集・エクスポートされ、unityで動画クリップを処理したり、動画コンポーネントを追加したりする。

キャラクターの骨格アニメーションは、maxで作成する場合、時間軸に複数の動作を一度に編集し、単独で動作を編集してアニメーション接続で作成するアニメーションは、unityを導入すると誤動作や手ぶれが発生しやすくなります。

本例では複数のアニメーション接続方式を作成し、接続後のアニメーションには多くの問題が発生し、ジッタ現象、モデル交差現象が発生し、長い時間をかけて上記の効果を達成しました。

骨格アニメーションunityの編集方法は「技術文書—LayaAir 3 Dエンジン—LayaAir 3 Dのアニメーション一」に見られます。



####3 Dエフェクト

ライトリングの効果は剛体アニメーション（変換アニメーション：回転、シフト、スケーリング）で、3 ds maxで編集しunityに導入することができますが、3 ds maxでモデルを作ることを勧めます。動画はunityで作られます。untiyでは材質と剛体が結合したアニメーションを作ることができますので、より効果的です。

リング効果のunityアニメーション制作方式は流れと材質のアニメーション方式と似ています。



以上の3 Dリソースはunityで作成された後、LayaAir導出ツールによってそれぞれ4つのリソースフォルダに導出され、それぞれシーンリソースLayaScenel 02、2つのキャラクターリソースLayaSciengairlとLayaScheneubiy、光環特効リソースLayaScieneueffectである。リソースをプロジェクトh 5のディレクトリにコピーして使用します。



###3 Dインスタンス機能のコード実装

####UIインタフェース機能の実現

IDEでインターフェースを編集し、コードコールのために、画面の要素をvarおよびname属性設定する（図2）（図3）。

注意画面解像度の大きさは、Laya.init()で設定された解像度の大きさと一致しており、画面のフィットが正しいです。

リソースローディング進捗インターフェースProgessBar.ui解析



 ![图2](img/2.png)<br/>(図2)

キャラクターコントロールボタン画面の制御



 ![图3](img/3.png)<br/>(図3)

以上のインターフェースを編集した後、IDEにリソースをエクスポートし、プロジェクトフォルダに対応するパッケージリソースとUIクラスを作成しました。二つのUI表示制御クラスをそれぞれ引き継ぎます。コードは以下の通りです。

プログレスUIはコントロールクラスPrograess Viewを示しています。クラスでは偽のプログレスバーを使いました。


```java

package view
{
	import ui.ProgressUI;
	
  	//继承于IDE导出时产生的UI类
	public class ProgressView extends ProgressUI
	{
		private var progress:int=0;		
		public function ProgressView()
		{
			//进度增加的帧循环
			Laya.timer.loop(30,this,onLoop);
		}		
		/**
		 * 资源加载进度模拟（假进度）
		 */		
		private function onLoop():void
		{
			//进度增加
			progress++;
			//最高100%进度
			if(progress>100)
			{
				progress=100;
				this.tips.text="游戏加载完毕，即将进入游戏..."
                //清除所有事件监听，包括帧循环
				Laya.timer.clearAll(this);
                //进度100%后，自动移除界面
				this.removeSelf();				
			}else
			{
                //更新组件显示进度
				this.pro.value=progress/100;
				this.tips.text="游戏正在加载中，当前进度为："+progress+"%!"
			}
		}
	}
}
```




キャラクターコントロールUIにはコントロールクラスのControl Viewが表示され、現在クリックされているボタン名がイベントを通じてメインクラスに送信されます。


```java

package view
{
	import laya.events.Event;
	
	import ui.ControlUI;
	
	public class ControlView extends ControlUI
	{
		public function ControlView()
		{
			//监听UI鼠标点击事件
			this.on(Event.MOUSE_DOWN,this,onClick);
		}		
		private function onClick(e:Event):void
		{
			//发送点击的组件名称（需在IDE中设置组件的名字）
			this.event("btn_action",e.target.name);
		}
	}
}
```




####2 Dと3 Dの結合実現

3 DシーンScene類は2 Dの表示オブジェクトSprite類を継承しているので、2 D表示オブジェクトのようにステージにロードし、set Child Index（）方法によりその階層を調整し、背景、界面の上下層との遮蔽関係を処理することができる。

本例では、リソースローディング進捗インターフェースとキャラクターコントロールインターフェースは、3 Dシーンの上層部に設定する必要があり、上述の方法を用いて実現することができ、コードはLaya.stage.set Child Index（scene，0）であり、メインクラスでインターフェースとシーンをロードするコードは以下の通りである。

```java

	public class Example_roleChange
	{
		/*****3D场景******/
		private var scene:Scene;
		/*****角色控制界面******/
		private var control:ControlView;
      	/*****角色资源名数组******/
		private var roleArray:Array=["LayaScene_girl/girl.lh","LayaScene_boy/boy.lh"];

		public function Example_roleChange()
		{
			//初始化引擎
			Laya3D.init(1280, 720,true);
			
			//适配模式
			Laya.stage.scaleMode = Stage.SCALE_EXACTFIT;
			Laya.stage.screenMode = Stage.SCREEN_NONE;
			
			//加载2D界面资源
			Laya.loader.load("res/atlas/comp.atlas",Handler.create(this,onUIComplete));
		}		
		/**
		 * 界面资源加载完成后
		 */		
		private function onUIComplete():void
		{
          	//加载3D场景与角色资源（根据资源后缀名，会创建默认3D显示对象类型）
			Laya.loader.create([{url:"LayaScene_scene02/scene02.ls"},
								{url:roleArray[0]},	{url:roleArray[1]},	
                                {url:"LayaScene_effect/effect.lh"}
							   ],Handler.create(this,onSceneOK));
          
			//创建角色控制界面
			control=new ControlView();
			Laya.stage.addChild(control);
			
			//创建资源载入界面
			var assetLoad:ProgressView=new ProgressView();
			Laya.stage.addChild(assetLoad); 
		}

		/**
		 * 场景角色加载完成后回调
		 */	
		private function onSceneOK():void
		{
			//创建加载场景
			scene=Laya.loader.getRes("LayaScene_scene02/scene02.ls");
			Laya.stage.addChild(scene);
			//设置场景在2D界面最后（最底层为第0层）
			Laya.stage.setChildIndex(scene,0);
          
          	//创建摄像机(横纵比，近距裁剪，远距裁剪)
			var camera:Camera = new Camera( 0, 0.1, 1000); 
			//加载到场景
			scene.addChild(camera);
			//移动摄像机位置
			camera.transform.position=new Vector3(-3, 1.5, 6);
			//旋转摄像机角度
			camera.transform.rotate(new Vector3( -6, 0, 0), true, false);
			//设置摄像机视野范围（角度） 
			camera.fieldOfView=33;
		}
	}
```


上記のコードをコンパイルして実行すると、リソースインターフェースが終了してから3 Dシーンが現れ、コントロールインターフェースは3 Dシーン以上になります。

3 Dシーンの中にUVアニメーションの材質があります。lsをロードすると、アニメーションは自動的にロードされて再生されます。アニメーションを制御する必要があるなら、以下のキャラクターのアニメーション制御方式によって、先にアニメーションコンポーネントを取得してから、アニメーションコンポーネントによって制御できます。



####3 Dキャラクターの作成とコントロール

キャラクターアニメーション制御の最も重要なのは、この例ではプリローディングを使用しているため、キャラクターを作成する際に、キャラクターモデルから直接取得することができるアニメーションコンポーネントを取得することである。
Tips：プリローディング方式を使用していない場合、Sprite.load（）を直接使用して非同期ローディングを行い、リスニングリソースに参加してイベントをロードしてからアニメーションコンポーネントを取得する必要があります。そうでないとエラーが発生します。

**キャラクターを作成**

メインクラスには、現在のキャラクターリソース、現在のキャラクターアニメーションコンポーネント、現在のキャラクター動作名などのグローバル属性が追加され、次のようなキャラクター作成方法が追加されます。


```java

		/*****3D场景******/
		private var scene:Scene;
		/*****3D角色******/
		private var role3D:Sprite3D;
		/*****角色控制界面******/
		private var control:ControlView;
		/*****角色资源名数组******/
		private var roleArray:Array=["LayaScene_girl/girl.lh","LayaScene_boy/boy.lh"];
		/*****当前场景中角色资源******/
		private var currentRole:String="LayaScene_girl/girl.lh";
		/*****当前角色动画组件******/
		private var roleAni:Animator;
		/*****当前角色动作名******/
		private var currentAction:String="stand";
		/*****3D特效******/
		private var effect3D:Sprite3D;

		......
        /**
		 * 场景角色加载完成后回调
		 */		
		private function onSceneOK():void
		{
            ......
              
			//创建角色
			createRole3D();
		}
		/**
		 * 创建角色并获取动画组件
		 */
		private function createRole3D():void
		{
			//创建角色
			role3D=Laya.loader.getRes(currentRole);
			//获取角色动画组件（.lh格式会把secen当作一层Sprite3D导出，因此组件是在子对象上）
			roleAni=Sprite3D(role3D.getChildAt(0)).getComponentByType(Animator) as Animator;
			//监听动画完成事件
			roleAni.on(Event.COMPLETE,this,onAniComplete);
			//播放上个角色的当前动作
			roleAni.play(currentAction);
			//角色位置
			role3D.transform.position=new Vector3(-3,0,1);
			scene.addChild(role3D);
		}
		/**
		 * 动画播放完成后回调
		 */		
		private function onAniComplete():void
		{
			//如果当前的完成的动画剪辑名为play“击球”
			if(roleAni.currentPlayClip.name=="play")
			{
				//完成击球后播放准备动作动画
				roleAni.play("ready");
				currentAction="ready";
			}
		}
		......
```


上記のコードの中に、動画の再生が完了したというフィードバックも追加されました。`roleAni.on(Event.COMPLETE,this,onAniComplete)`2 Dアニメーションと基本的に同じで、一つの動画クリップが再生された後のスケジュールを指しています。現在のアニメーションクリップの名前で、どのアニメーションが完成したかは、開発者たちがゲームロジックを編集するのに便利です。



**キャラクターコントロール**

キャラクターコントロールはUI中のボタンをクリックして制御します。メインクラスにコントロールインターフェースの待ち受けイベントを追加します。`control.on("btn_action",this,onBtnAction)`キャラクターをコントロールします。

キャラクターの切り替え方法は、キャラクターのリソースを変えて新たにキャラクターを作成しますが、Laya.loader.create（）がリソースをロードする時には、タイプによってキャラクターを作成し、対象プールに入れましたので、キャラクターを切り換えて、キャラクターを繰り返し呼び出して、クリエート3 D（）を作成する時に、心配しないでください。直接にオブジェクトプールから作成されます。

アニメーションの切り替えは主にアニメーションコンポーネントによって行われます。コード修正の追加は以下の通りです。


```java

		/**
		 * 界面资源加载完成后
		 */		
		private function onUIComplete():void
		{
          	......
			//创建角色控制界面
			control=new ControlView();
			//监听控制界面按钮信息
			control.on("btn_action",this,onBtnAction);
			Laya.stage.addChild(control);
			......
		}
            
        /**
		 * 控制界面动作监听回调
		 * @param action 当前执行的控制名称
		 */		
		private function onBtnAction(action:String):void
		{
			if(action=="change")
			{
				//切换角色
				changeRole();
			}else if(action=="playAni")
			{
				//播放当前动作
				roleAni.play(currentAction);
			}else if(action=="stopAni")
			{
				//停止动画
				roleAni.stop();
			}else if(action=="stand"||action=="go"||action=="ready"||action=="play")
			{
				//播放动作
				roleAni.play(action);
				currentAction=action;
			}
		}

		/**
		 * 切换角色
		 */		
		private function changeRole():void
		{
			//移除角色
			role3D.removeSelf();
			//移除所有事件监听
			roleAni.offAll();
			//当前角色索引
			var index:int=roleArray.indexOf(currentRole);
			//下一个角色
			index++;
			if(index>roleArray.length-1) index=0;
			currentRole=roleArray[index];
			//创建角色
			createRole3D();
		}
```




####アニメーションの作成

特効動画の呼び出しはかなり簡単です。ここではコントロールが必要ではないので、キャラクターの足の裏に直接載せればいいです。コードは以下の通りです。


```java

		/**
		 * 创建特效
		 */		
		private function createEffect3D():void
		{
			//创建特效
			effect3D=Laya.loader.getRes("LayaScene_effect/effect.lh");
			scene.addChild(effect3D);
			//特效位置
			effect3D.transform.position=new Vector3(-3,0.01,1.2);
			//特效缩放
			effect3D.transform.localScale=new Vector3(0.15,0.15,0.15);
		}
```


シーンローディングが完了したコールバックに特殊効果を加えると、コンパイル運転後の効果が（図1）に示されます。



####メインクラスの最終コードすべて


```java

package 
{
	import laya.d3.component.Animator;
	import laya.d3.core.Camera;
	import laya.d3.core.Sprite3D;
	import laya.d3.core.light.DirectionLight;
	import laya.d3.core.scene.Scene;
	import laya.d3.math.Vector3;
	import laya.display.Stage;
	import laya.events.Event;
	import laya.utils.Handler;
	import laya.utils.Stat;
	
	import view.ProgressView;
	import view.ControlView;
	
	/**
	 *角色切换示例 
	 */	
	public class Example_roleChange
	{
		/*****3D场景******/
		private var scene:Scene;
		/*****3D角色******/
		private var role3D:Sprite3D;
		/*****角色控制界面******/
		private var control:ControlView;
		/*****角色资源名数组******/
		private var roleArray:Array=["LayaScene_girl/girl.lh","LayaScene_boy/boy.lh"];
		/*****当前场景中角色名******/
		private var currentRole:String="LayaScene_girl/girl.lh";
		/*****当前角色动画组件******/
		private var roleAni:Animator;
		/*****当前角色动作名******/
		private var currentAction:String="stand";
		/*****3D特效******/
		private var effect3D:Sprite3D;
			
		public function Example_roleChange()
		{
			//初始化引擎
			Laya3D.init(1280, 720,true);
			
			//适配模式
			Laya.stage.scaleMode = Stage.SCALE_EXACTFIT;
			Laya.stage.screenMode = Stage.SCREEN_NONE;
	
			//加载2D界面资源
			Laya.loader.load("res/atlas/comp.atlas",Handler.create(this,onUIComplete));
		}
		
		/**
		 * 界面资源加载完成后
		 */		
		private function onUIComplete():void
		{
            //加载3D场景与角色资源（根据资源后缀名，会创建默认3D显示对象类型）
			Laya.loader.create([{url:"LayaScene_scene02/scene02.ls"},
								{url:roleArray[0]},	{url:roleArray[1]},	
                                {url:"LayaScene_effect/effect.lh"}
							   ],Handler.create(this,onSceneOK));
			//创建角色控制界面
			control=new ControlView();
			//监听控制界面按钮信息
			control.on("btn_action",this,onBtnAction);
			Laya.stage.addChild(control);
			
			//创建资源载入界面
			var assetLoad:ProgressView=new ProgressView();
			Laya.stage.addChild(assetLoad); 
		}
		
		/**
		 * 场景角色加载完成后回调
		 */		
		private function onSceneOK():void
		{
			//创建加载场景
			scene=Laya.loader.getRes("LayaScene_scene02/scene02.ls");
			Laya.stage.addChild(scene);
			//场景在2D界面最后
			Laya.stage.setChildIndex(scene,0);
			
			//创建摄像机(横纵比，近距裁剪，远距裁剪)
			var camera:Camera = new Camera( 0, 0.1, 1000); 
			//加载到场景
			scene.addChild(camera);
			//移动摄像机位置
			camera.transform.position=new Vector3(-3, 1.5, 6);
			//旋转摄像机角度
			camera.transform.rotate(new Vector3( -6, 0, 0), true, false);
			//设置摄像机视野范围（角度） 
			camera.fieldOfView=33;
			
			//创建角色
			createRole3D();
			
			//创建特效
			createEffect3D();
		}
		
		/**
		 * 控制界面动作监听回调
		 * @param action 当前执行的控制名称
		 */		
		private function onBtnAction(action:String):void
		{
			if(action=="change")
			{
				//切换角色
				changeRole();
			}else if(action=="playAni")
			{
				//播放当前动作
				roleAni.play(currentAction);

			}else if(action=="stopAni")
			{
				//停止动画
				roleAni.stop();
			}else if(action=="stand"||action=="go"||action=="ready"||action=="play")
			{
				//播放动作
				roleAni.play(action);
				currentAction=action;
			}
		}

		/**
		 * 创建特效
		 */
		private function createEffect3D():void
		{
			//创建特效
			effect3D=Laya.loader.getRes("LayaScene_effect/effect.lh");
			scene.addChild(effect3D);
			//特效位置
			effect3D.transform.position=new Vector3(-3,0.01,1.2);
			//特效缩放
			effect3D.transform.localScale=new Vector3(0.15,0.15,0.15);
		}
		
		/**
		 * 创建角色
		 */
		private function createRole3D():void
		{
			//创建角色
			role3D=Laya.loader.getRes(currentRole);
			//获取角色动画组件
			roleAni=Sprite3D(role3D.getChildAt(0)).getComponentByType(Animator) as Animator;
			//监听动画完成事件
			roleAni.on(Event.COMPLETE,this,onAniComplete);
			//播放上个角色的当前动作
			roleAni.play(currentAction);
			//角色位置
			role3D.transform.position=new Vector3(-3,0,1);
			scene.addChild(role3D);
		}
		/**
		 * 动画播放完成后回调
		 */		
		private function onAniComplete():void
		{
			//如果当前的完成的动画剪辑名为“击球”
			if(roleAni.currentPlayClip.name=="play")
			{
				//完成击球后播放准备动作动画
				roleAni.play("ready");
				currentAction="ready";
			}
		}
		
		/**
		 * 换角色
		 */		
		private function changeRole():void
		{
			//移除角色
			role3D.removeSelf();
			//移除所有事件监听
			roleAni.offAll();
			//当前角色索引
			var index:int=roleArray.indexOf(currentRole);
			//下一个角色
			index++;
			if(index>roleArray.length-1) index=0;
			currentRole=roleArray[index];
			//创建角色
			createRole3D();
		}
	}
}
```




