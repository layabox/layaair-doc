#runTimeの使用

LayaAirIDEでは、リソースパネルの下にあるすべてのコンポーネントは、runtimeの属性があります。runtimeは、このコンポーネントが動作する時の論理クラスです。同じコンポーネントは、同じruntimeクラスを使用して、同じ機能を実現することができます。例えば、異なるページで同じコンポーネントに対して同じ機能を実現する必要があります。**なお、コンポーネントのruntime論理クラスは、コンポーネント自体を引き継ぎ、引き継ぐ対象に該当するコンポーネントの属性がない場合には、この属性は無効となります。**

**ルンTimeスクリプトはページ、シーンまたはコンポーネントクラスを継承し、論理を実現します。IDEにシーンのRuntime属性を設定すれば、シーンやオブジェクトと関連付けられます。**

##を選択します。**スクリプト方式に比べて、継承ページクラスは、ページ定義の属性（IDE内var属性によって定義される）を直接使用できます。例えば、this.tipbll、this.scorol、コード提示効果があります。** **提案：ページレベルの論理であれば、頻繁にページ内の複数の要素にアクセスする必要があります。runtime継承式の書き方を使います。独立した小さいモジュールであれば、機能が単一であれば、scriptスクリプトの方法を推奨します。**


**本記事では、2つの異なるページのImageコンポーネントに同じruntime論理クラスを設定して、同じ機能を実現します。動作効果は図0に示すように、**

![0](img\0.gif)（図0）

###一、ページのセットにruntimeクラスを設定します。

ページ管理ディレクトリの下で2つのsceneシーンを作成し、それぞれMonkeyPageとBGPageといいます。次に、srcディレクトリの下でゲームパッケージを作成し、ゲームパッケージの中でImageRunTime類を作成し、二つのsceneの中にそれぞれ1つのImageコンポーネントにドラッグして、runtime属性をgame.ImageRunTimeとします。図1、2、3に示すように：（注意！エクスポートタイプは分離モードで、シーンコードファイルが生成されます。デフォルトはファイルモードです。ファイルモードはシーンタイプを生成しません。）

![1](img\ide1.png)（図1）

![1](img\ide3.png)（図2）

![2](img\ide2.png)（図3）

設定が完了したら出力UIを保存し、論理コードの作成を開始します。



###二、コード論理処理

コードモードに切り替え、

次に、srcディレクトリの下でゲームパッケージを作成し、ゲームパッケージの中でImageRunTimeクラスを作成し、作成後にUIページを実行すると、図4に示すようにエラーが発生しません。

![4](img\4.png)（図4）

その後、ImageRunTimeクラスで私たちが達成したい効果を作成します。例えば、クリックスケーリング（似たようなボタン）の機能を実現します。すべてのコードは以下の通りです。


```typescript

export default class ImageRunTime extends Laya.Image{
	constructor(){
			super();
			this.scaleTime = 100;
			//设置组件的中心点
			this.anchorX = this.anchorY = 0.5;
			//添加鼠标按下事件侦听。按时时缩小按钮。
			this.on(Laya.Event.MOUSE_DOWN,this,this.scaleSmall);
			//添加鼠标抬起事件侦听。抬起时还原按钮。
			this.on(Laya.Event.MOUSE_UP,this, this.scaleBig);
			//添加鼠标离开事件侦听。离开时还原按钮。
			this.on(Laya.Event.MOUSE_OUT,this, this.scaleBig);
		}
       scaleBig()
        {		
            //变大还原的缓动效果
            Laya.Tween.to(this,{scaleX:1,scaleY:1},this.scaleTime);
        }
        scaleSmall()
        {	
            //缩小至0.8的缓动效果
            Laya.Tween.to(this,{scaleX:0.8,scaleY:0.8},this.scaleTime);
        }
}
```


これらの2つのUIインターフェースをメインクラスで実装し、コードは以下の通りです。


```typescript

import GameConfig from "./GameConfig";
class Main {
	constructor() {
		//根据IDE设置初始化引擎		
		if (window["Laya3D"]) Laya3D.init(GameConfig.width, GameConfig.height);
		else Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
		Laya["Physics"] && Laya["Physics"].enable();
		Laya["DebugPanel"] && Laya["DebugPanel"].enable();
		Laya.stage.scaleMode = GameConfig.scaleMode;
		Laya.stage.screenMode = GameConfig.screenMode;
		Laya.stage.alignV = GameConfig.alignV;
		Laya.stage.alignH = GameConfig.alignH;

		//打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
		if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
		if (GameConfig.stat) Laya.Stat.show();
		Laya.alertGlobalError = true;

		//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
		Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
	}

	onVersionLoaded() {
		//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
		Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
	}

	onConfigLoaded() {
		//加载IDE指定的场景
		GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
	}
}
//激活启动类
new Main();

```


編集モードでf 9を押して設定パネルの中のエンジンプレビュー欄で起動シーンをメーンセーンに設定します。

![5](img\ide5.png) 


最終運転効果は図0に示します。



###三、runtime論理クラスが継承する対象が自身のコンポーネントではない場合

以上のコードの中で、自分のコンポーネントImageを引き継ぐ効果を実証しましたが、Buttonのコンポーネントクラスを引き継ぐとどうなりますか？操作してみます。コードと実装効果は以下の通りです。


```typescript

export default class ImageRunTime extends Laya.Button{
	constructor(){
			super();
			...
		}
	...
	...
	...
```


![5](img\5.gif)（図5）

この時、UIページのリソース表示がおかしいと気づきます。ボタンのskinはデフォルトでは3状態です。Imageのruntime論理クラスがButtonコンポーネントから継承されると、ImageコンポーネントではなくButtonコンポーネントになります。