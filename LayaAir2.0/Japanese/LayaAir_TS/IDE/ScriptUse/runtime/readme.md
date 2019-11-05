#runTimeの使用

LayaAirIDEでは、リソースパネルの下にあるすべてのコンポーネントは、runtimeの属性があります。runtimeは、このコンポーネントが動作する時の論理クラスです。同じコンポーネントは、同じruntimeクラスを使用して、同じ機能を実現することができます。例えば、異なるページで同じコンポーネントに対して同じ機能を実現する必要があります。**なお、コンポーネントのruntime論理クラスは、コンポーネント自体を引き継ぎ、引き継ぐ対象に該当するコンポーネントの属性がない場合には、この属性は無効となります。**

**runTimeスクリプトはスクリプトと似ていますが、異なるのはruntimeスクリプトの方式で実現され、ページ、シーンまたはコンポーネントクラスを継承し、論理を実現します。IDEにシーンのRuntime属性を設定すれば、シーンやオブジェクトと関連付けられます。**

##を選択します。**スクリプト方式に比べて、継承ページクラスは、ページ定義の属性（IDE内var属性によって定義される）を直接使用することができます。例えば、this.tipLbll、this.scorol、コード提示効果があります。スクリプトの取得は、this.owner.get ChildByName（「xxx」）などによってのみノードを取得することができます。** **提案：ページレベルの論理であれば、頻繁にページ内の複数の要素にアクセスして、runtime継承式の書き方を使う必要があります。独立した小さいモジュールであれば、機能が単一であれば、scriptスクリプト方法を使って、IDE新築2 dサンプル項目を参照してください。**

**本記事では、2つの異なるページのImageコンポーネントに同じruntime論理クラスを設定して、同じ機能を実現します。動作効果は図0に示すように、**

![0](img\0.gif)（図0）

###一、ページのセットにruntimeクラスを設定します。

ページ管理ディレクトリの下で2つのUIページを作成し、それぞれMonkeyPageとBGPgeといいます。次の図のように、

気をつけて！本例の導出タイプは分離モードであり、非ファイルモードはUIタイプスクリプトを生成することができ、デフォルトではファイルモードであり、ファイルモードはページタイプを生成しない。

![1](img\ide1.png)

二つのUIページの中でそれぞれImageコンポーネントにドラッグして、runtime属性をgame.ImageRunTimeとします。（スクリプトをruntimeのscriptアイコンにドラッグします。）図1、2、3に示すように：（注意！本例の導出タイプは分離モードであり、シーンコードファイルが生成され、デフォルトはファイルモードであり、ファイルモードではコードクラスは生成されません。非ファイルモードではないと、newというページクラスは作れません。

![1](img\ide3.png)（図1）

![2](img\ide2.png)（図2）

設定が完了したらF 12で出力UIを保存し、論理コードの作成を開始します。



###二、コード論理処理

コードモードに切り替え、

その後、ImageRunTimeクラスで私たちが達成したい効果を作成します。例えば、クリックスケーリング（似たようなボタン）の機能を実現します。すべてのコードは以下の通りです。


```typescript


    /*
    ImageRunTime逻辑类 
    */
    export default class ImageRunTime extends Laya.Image{
        public scaleTime:number = 100;
        constructor() {
            super();
            //设置组件的中心点
			this.anchorX = this.anchorY = 0.5;
			//添加鼠标按下事件侦听。按时时缩小按钮。
			this.on(Laya.Event.MOUSE_DOWN,this,this.scaleSmall);
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
		private scaleSmall():void
		{
			//缩小至0.8的缓动效果
			Laya.Tween.to(this,{scaleX:0.8,scaleY:0.8},this.scaleTime);
		}
    }

```


これらの2つのUIインターフェースをメインクラスで実装し、コードは以下の通りです。


```typescript

import GameConfig from "./GameConfig";
import { ui } from "./ui/layaMaxUI";
class Main {
	constructor() {
		//根据IDE设置初始化引擎		
		if (window["Laya3D"]) Laya3D.init(GameConfig.width, GameConfig.height);
		else Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
		Laya["Physics"] && Laya["Physics"].enable();
		Laya["DebugPanel"] && Laya["DebugPanel"].enable();
		Laya.stage.scaleMode = GameConfig.scaleMode;
		Laya.stage.screenMode = GameConfig.screenMode;

		//打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
		if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
		if (GameConfig.stat) Laya.Stat.show();
		Laya.alertGlobalError = true;

		//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
		Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
	}

	onVersionLoaded(): void {
		//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
		Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
	}

	onConfigLoaded(): void {
		//加载IDE指定的场景, 如果在编辑器中制作场景就打开下面一行注释，把实例页面的代码注掉
		//GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);

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
//激活启动类
new Main();
```


以上は1.0対応のコードです。

2.0は次のようにして、メーンセーンを作成し、二つのページをシーンにドラッグして背景色を設定してもいいです。

注意：ページのシーンの背景色を設定します。シーンを設計する時の参照だけで、実際に実行しても無効です。ページにrectを描画すると効果があります。

この方式は任意の4つの導出モードを用いることができる。

![2](img\ide4.png)

コードコメントで紹介した方法に従って、シーン管理の方法でプロジェクトを実行します。

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

