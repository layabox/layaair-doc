#三、ゲームUIフロー制御

###ゲームフローのコントロール概要

前のセッションでは、可視化リソースをすべて作成し、UIの表示クラスを生成しました。この授業は正式なゲーム論理コード編集に入りました。ゲーム開発の流れ、考え方を熟知しながらLayaAir UIの実現を勉強しています。

前の需要分析によると、「飛行機大戦」のゲームの流れは比較的簡単で、ゲームの開始—ゲームの進行中—キャラクターの死亡—ゲームの終了—ゲームの進行中....だから、今回の授業では主にゲームの基本的な流れを実現しますが、どのようにゲームUI機能を実現するかという点が重視されています。これも前の授業の延長です。

インターフェースフロー効果のデモンストレーションアドレス：（リンクまたは二次元コードを追加）



###新しいゲームマスタークラス

IDEをコードベースモードに切り替え、srcフォルダにMainクラスを新規作成し、まずLayaAirエンジンを初期化し、解像度は720×1280（IDEのページサイズと同じである必要がある）にして、ゲームリソースとスタートページをロードして、ゲームの第一歩とします。

ここで著者はFlash BuilderまたはFlash Developを使ってコードを書くことを推奨します。LayaAirはAS 3に対するサポートはまだ完全ではなく、コード提示の機能はまだ弱いです。

Mainクラスに以下のコードを追加します。


```

package {
	import laya.net.Loader;
	import laya.utils.Handler;
	import laya.webgl.WebGL;
	
	import view.TestView;
	//游戏主类，游戏入口
	public class Main 
	{
		public function Main()
		{
			//初始化引擎，建议增加WebGl模式
			Laya.init(720, 1280,WebGL);

			//加载游戏页面资源(如果界面资源太多太大[超过50k],建议开始页面单独建立文件夹打包)
			Laya.loader.load("res/atlas/gameUI.atlas",Handler.create(this,this.gameStart))
		}
		/**
		 资源加载完成后，实例并加载游戏开始界面
		 */
		private function gameStart():void
		{
            //实例化开始页面
			var start:GameStartUI=new GameStartUI();
			//将开始页面加载到舞台
			Laya.stage.addChild(start)
		}
	}
}
```


LayaAirエンジンは、プログラムがUIページをロードする前に必要なリソースをロードしてから表示する必要があります。前の2つのセクションでは、IDEで編集したインターフェースリソースは自動的にセットアウトされ、UIリソースの生成されたアドレスは「bin/h 5/res/at las/」であると述べました。

リソースのロードが完了したら、完了したコールバック関数で開始ページを実装し、ステージにロードします。コンパイル項目は、開始ページが表示されています。

サイズが大きいので、ブラウザの表示が不完全です。エンジン初期化方法Laya.init（）の下にスクリーンを入れて、ゲーム全体の画面にフィットします。サイズはブラウザのサイズと一致しています。（詳細画面はAPIを調べてください）


```

	//全屏不等比缩放模式
	Laya.stage.scaleMode = Stage.SCALE_EXACTFIT;
```




###ゲームフロー制御

前の思考図に基づいて分析して、私達は先にゲームの全体の流れのコントロールを編纂して、私達の開発の構想を更にはっきりさせることができて、もし大型プロジェクトだならば、仕事の分業を更に明確にさせることができます。次はゲームのための基本的な流れ循環システムを構築します。

まず、フローページのグローバル変数を追加します。全部で4ページです。

そして私たちは3つの方法でゲームの主要な流れとしてゲームを開始します。ゲームはgameInit（）、ゲームはgameOver（）を終了します。ゲームフローページの表示と切り替えを担当します。

gameInit()メソッドでは、一時的にキャラクターが追加されていないため、主人公の死亡でガメOver()メソッドを呼び出すことができないため、時間遅延を加えてシミュレーションフローを起動します。

**注:**GameInit（）とgameOver（）の方法はゲーム中に繰り返し実行されるので、地図やゲーム中のUIやゲーム終了UIが繰り返し作成され、不必要なメモリ支出が発生することが分かります。

私たちは二つの方法で解決します。
一つはUIを単一の例モードに変更することで、ゲーム中にはインスタンスUIだけが存在する。
二は、実用化時に既に実用化されているかどうかを判断することである。「𞓜𞓜=」演算子を使用してもよく、対象が既に例がある場合は、直接に使用してもよく、ない場合は再び例が出てきます。
例えば、Play|𞓜=new GamePlayUI（）は、プレイ=プレイ|new GamePlayUI（）と同じです。

すべてのコードは以下の通りです。


```

package {
	
	import laya.display.Stage;
	import laya.events.Event;
	import laya.net.Loader;
	import laya.utils.Handler;
	import laya.webgl.WebGL;
	
	import ui.GameBgUI;
	import ui.GameOverUI;
	import ui.GamePlayUI;
	import ui.GameStartUI;
	
	public class Main
	{
		/**开始页面***/
		private var start:GameStartUI
		/**地图页面***/
		private var map:GameBgUI
		/**游戏中界面***/
		private var play:GamePlayUI
		/**游戏结束页面***/
		private var over:GameOverUI
		
		public function Main()
		{
			//初始化引擎，建议增加WebGl模式
			Laya.init(720, 1280,WebGL);
			//全屏不等比缩放模式
			Laya.stage.scaleMode = Stage.SCALE_EXACTFIT;
			
			//加载游戏页面资源(如果界面资源太多[图集超过50k],建议开始页面单独建立文件夹打包图集并加载)
			Laya.loader.load("res/atlas/gameUI.atlas",Handler.create(this,this.gameStart))
		}
		
		/**
		 资源加载完成后，加载游戏开始界面
		 */
		private function gameStart():void
		{
			//实例化开始页面
			start=new GameStartUI();
			//监听开始游戏开始按钮事件,点击后进入游戏中（IDE中设置的变量定义）
			start.btn_start.on(Event.MOUSE_UP,this,gameInit)
			//将开始页面加载到舞台
			Laya.stage.addChild(start);
		}
		
		/**
		 游戏中，游戏初始化，地图、游戏中UI
		 */
		private function gameInit():void
		{
			//实例化地图背景页面(如果已实例化，不需要重新new)
			map||=new GameBgUI();
			//加载到舞台
			Laya.stage.addChild(map);
			
			//实例化游戏中UI页面(如果已实例化，不需要重新new)
			play||=new GamePlayUI();
			//加载到舞台
			Laya.stage.addChild(play);
			
			//模拟游戏结束，3秒时间延迟...
			Laya.timer.once(3000,this,gameOver)
		}
		
		/**
		 游戏结束
		 */
		private function gameOver():void
		{
			//移除地图背景
			map.removeSelf();
			//移除游戏中UI
			play.removeSelf();
			
			//实例化游戏结束页面(如果已实例化，不需要重新new)
			over||=new GameOverUI();
			//游戏积分显示
			over.txt_score.text=score.toString();
			//重新开始游戏按钮监听,点击后进入游戏中（IDE中设置的变量定义）
			over.btn_restart.on(Event.MOUSE_UP,this,gameInit);
			//加载到舞台
			Laya.stage.addChild(over)
		}
	}
}
```


以上のコードをコンパイルした後、ゲームの基本的な流れは全部走ります。

もちろん、まだ多くの細部部分は完全ではありません。例えば、スタートページの中でゲームのロード進捗状況の更新表示、ページとボタンはアニメーション効果がないです。これらはすべてページ類自身のコードで実現できます。

