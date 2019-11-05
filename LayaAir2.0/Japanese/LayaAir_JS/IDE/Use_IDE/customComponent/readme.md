#カスタムコンポーネントの作成と使用

LayaAir IDEは、基本的な需要を満たすために複数の一般的なUIコンポーネントを提供しているが、実際の開発者は、その特殊なニーズを満たすために独自のUIコンポーネントを必要とする傾向がある。LayaAirはカスタムコンポーネントのインターフェースを提供し、開発者は必要に応じてコンポーネントを変更または追加することができ、新しいコンポーネントはLayaAirIDEによって識別、使用することができる。このページでは、ズームボタンを例にとって、どのように新しいコンポーネントを追加するかとLayaAirIDEでこのコンポーネントを使用するかを紹介します。



##1、コンポーネントの構造とルールを理解する

###1.1コンポーネントディレクトリ構造

コンポーネントディレクトリはLayaAirIDEルートディレクトリの「\resource\app\out\vs\layaEditor\renders」ディレクトリ内にあります。図1に示すように、

![1](img/1.png)
（図1）

**コンポーネントディレクトリ構造紹介**:

「custom」：カスタムコンポーネントのjsとxmlファイルを保存するためのディレクトリです。

「laya.editoUID.js」：LayaAirIDEはコンポーネントの機能を持ってコードを実現します。

「laya.editoUID.xml」：LayaAirIDEのコンポーネントの構成情報。

###1.2コンポーネントのxml配置情報説明

一つの完全なコンポーネントはjsとxmlの二つの部分から構成されています。ここで、jsはコンポーネントの機能実現部分であり、xmlはIDE内のコンポーネント表示と呼び出し部分であり、コンポーネントピクチャリソース名（大文字と小文字を区別する）、属性パネルのオプションとデフォルト値などが含まれています。

laya.editoUID.xmlのTextAreaコンポーネントの例を紹介します。


```xml

<TextArea className="laya.editorUI.TextArea" inherit="TextInput" defaultValue="text='TextArea'" skinLabel="skin" resName="area" icon="TextArea" groups="公用,常用,宽高及位置,旋转及缩放" drag="3">
	<prop name="vScrollBarSkin" tips="垂直滚动条皮肤" type="string" default="" accept="res" group="常用" />
	<prop name="hScrollBarSkin" tips="水平滚动条皮肤" type="string" default="" accept="res" group="常用" />
</TextArea>
```


**コンポーネントXMLの説明**:

「`<textarea></textarea>`「コンポーネントの開始と終了としてTextAreaマークが表示されます。TextAreaの名前はカテゴリとは異なるが、IDEのコンポーネント名表示のための記憶を容易に理解することができる。

「`classsName`「このコンポーネントの完全なクラスパス、例えば、laya.editoUID.TextArea；

「`inherit`「父のクラスを受け継ぐ。

「`defaultValue`「：コンポーネント属性のデフォルト値。

「`skinLabel`「プロパティパネルのskinに関する設定です。skyinLabelの値はpropのnameフィールド及び関連設定に対応しています。もしpropにないなら、設定は行われません。TextAreaコンポーネント内にはこの設定はありません。

「`resName`「コンポーネントリソースプレフィックス（大文字と小文字を区別する）は、プレフィックスを有するリソースのみがコンポーネントとして識別され、TextAreaの構成はTextAreaの略語モードであり、IDEのコンポーネントパネルにはTextAreaが表示される。コンポーネント名については、IDEコンポーネントベースの「コンポーネントリソース命名規則」ドキュメントを参照することができます。

「`icon`「コンポーネントがIDEに表示されているアイコン名（大文字と小文字を区別して）、アイコンのディレクトリがLayaAirIDEルートディレクトリの下にあります」reources\app\out\vs\laya Editor\laya\components「ディレクトリ内では、新しいアイコンを作成したり、複数のコンポーネントを共有したりできます。TextAreaは、componentディレクトリ内のTextArea.pngに対応します。

「`groups`「属性パネルのグループ表示は、カンマ区切りで行います。

「`drag`「引っ張り値パラメータ：1：2つの点があります。hscrollコンポーネントのように横にだけ引張ります。2：2つの点があります。vscrollコンポーネントのように縦に引張ります。3：8つの点があります。横方向、縦方向、拡大、縮小引張りができます。

「`<prop>`「prop内は属性パネルにおける属性の設定であり、各propはコンポーネントの属性に対応するマークを付けている。</prop>

「`name`属性の名前は、プロパティパネルに表示されます。

「`tips`“：マウスが属性名に表示されているtipsヒント情報。

「`type`「：入力ボックス内の属性値の種類。

「`default`「:属性のデフォルト値;

「`accept`プロパティは、レスポンスとfilesの2つの値を受信します。resは、プロパティバーを表しています。filesは、プロパティバーを表しています。複数のリソースにドラッグできます。

「`group`「：当該属性が存在するパケット。グループ内のパケットに対応し、存在しないものは他のグループに帰属する。





##2、LayaAirIDEコンポーネントライブラリの導入

###2.1 LayaAirIDEコンポーネントライブラリをダウンロードする（本編はJS版）

**ダウンロード**:[https://layabox.github.io/layaair-doc/resources/2D/Component/layaeditor.d.zip](https://layabox.github.io/layaair-doc/resources/2D/Component/layaeditor.d.zip)

*Tips：TSとJSバージョンは同じコンポーネントライブラリを使用することができます。*

###2.2プロジェクトを作成し、プロジェクトのディレクトリに導入する

まずLayaAirIDEでJSプロジェクトを作成します。ダウンロードしたzipパッケージを解凍してlayaeditor.d.tsファイルをlibsディレクトリの下に置いてください。図2に示すように、

![2](img/2.png)
（図2）



##3、カスタムコンポーネントを作る

###3.1コンポーネントクラスを作成する

まず、コンポーネントディレクトリ「laya/custom UI」を作成し、将来の他のコンポーネントの分類を便利にし、その後、customUIディレクトリの下でスケーリングボタンクラスScaleButton.jsを作成します。

![3](img/3.png)
（図3）

作成が完了したら、私達はスケーリングコンポーネントのコードを作成し始めました。


```javascript


    export default class ScaleButton extends laya.editorUI.Button {
        constructor(skin,label=""){
           
            super(skin, label);
            /* 设置按钮为单态按钮
            ** 取值：
            ** 1：单态。图片不做切割，按钮的皮肤状态只有一种。
            ** 2：两态。图片将以竖直方向被等比切割为2部分，从上向下，依次为弹起状态皮肤、按下和经过及选中状态皮肤。
            ** 3：三态。图片将以竖直方向被等比切割为2部分，从上向下，依次为弹起状态皮肤、经过状态皮肤、按下和选中状态皮肤
            */
            this.stateNum = 1;
            //添加鼠标按下事件侦听。按时时缩小按钮。
            this.on(Laya.Event.MOUSE_DOWN, this, this.scaleSmall);
            //添加鼠标抬起事件侦听。抬起时还原按钮。
            this.on(Laya.Event.MOUSE_UP, this, this.scaleBig);
            //添加鼠标离开事件侦听。离开时还原按钮。
            this.on(Laya.Event.MOUSE_OUT, this, this.scaleBig);
        }
        scaleSmall(){
            //缩小至0.8的缓动效果
            Laya.Tween.to(this, {scaleX:0.8, scaleY: 0.8}, 100);
        }
        scaleBig(){
            //变大还原的缓动效果
            Laya.Tween.to(this, {scaleX:1, scaleY:1}, 100);
        }
    }

```




###3.2コンポーネントのxmlプロファイルを作成する

上記のxmlの構成説明に従って、このズームボタンのxml構成を完成します。このカスタムコンポーネントは製作が完了しました。ズームボタンのxml設定情報は以下の通りです。


```xml

<?xml version="1.0" encoding="utf-8" ?>
<uiComp>
	<ScaleButton className="laya.customUI.ScaleButton" runClass="laya.customUI.ScaleButton"  inherit="Button" skinLabel="skin" 
	defaultValue="label=''" resName="sbtn" icon="sbtn" groups="公用，常用，宽高及位置" drag="3">
		<prop name="scaleTime" tips="缩放使用的时间" type="number" default="100" group="常用" />
	</ScaleButton>
</uiComp>
```


*Tips：xmlの構成情報内容説明は、上記の構成要素xmlを参照して説明した。*



##4、カスタムコンポーネントの追加と使用

###4.1 IDEのカスタムコンポーネントディレクトリにコンポーネントを追加する

xmlプロファイルの作成が完了したら、直接にカスタムコンポーネントのディレクトリに保存します。コンポーネントxmlの名前はコンポーネントjsと一致しています。ここではScreButton.xmlといいます。そして、作成したScaleButton.js（「プロジェクトのルートディレクトリ/src/laya/custom UI」ディレクトリの下で、図3を参照して）をカスタマイズしたコンポーネントのカタログにコピーします。図4に示すように、

![4](img/4.png)
（図4）



###4.2 IDEコンポーネントパネルに表示する

IDEコンポーネントディレクトリ（LayaAirIDEルートディレクトリ\resource\app\apps\layaEditor\laya\baics）を開いて、カスタムコンポーネントを作成してカタログCustomを保存して、図5に示すように、自己定義のコンポーネントを保存します。

![5](img/5.png)
（図5）

その後、Customディレクトリにsbtnと命名されたpngアイコン（推奨サイズは16＊16）を配置し、図6に示すように、このステップを完了すれば、IDEのコンポーネントパネルに自分たちが作成したズームボタンのコンポーネントを見つけられます。図7に示すように。

![6](img/6.png)
（図6）アイコンの名前は、対応するコンポーネントxmlのレスポンスName属性の値です。

![7](img/7.png)
（図7）IDEのコンポーネント名に対応するコンポーネントxmlのタグ名

**Tips:**追加の注意点としては、コンポーネントのアイコンは「LayaAirIDEルートディレクトリ\resource\app\out\vs\layaEditor\laya\baics\Custom」ディレクトリのsbtn.pngではありません。iconアイコンはLayaAirIDEルートディレクトリの「reources\apps\apps\laya Editor\laya\icons\components」ディレクトリ内にあり、xmlのicon属性の値に対応して上記のxml説明を紹介しました。自分のアイコンを作成し、componentsディレクトリ内のiconサイズ表示を参照して作成し、componentsディレクトリ内に置いて、xmlに対応するファイル名を設定すればいいです。



###4.3 IDEリソースパネルに表示する

リソースパネルには、デフォルトでは、compファイルに通常のUIコンポーネントのskinリソースが配置されており、コンポーネント命名規則により、skinリソースをコンポーネントとして識別するのに便利である（リソースは「プロジェクトルートディレクトリ」に保存されなければコンポーネントとして認識されない）。コンポーネントパネルのコンポーネント属性skin値が空であることと違い、リソースパネルのコンポーネント属性skinのデフォルト値は「\laya\asets」ディレクトリの相対パスである。

プロジェクトを便利にするためにskinリソースを持つコンポーネントを使用して、リソースパネルにコンポーネントを表示する方法を紹介し続けます。まず、上記の例のカスタムコンポーネントはズームボタンであるので、skinリソースを用意しておきます。任意の画像をそのままコピーすると、ズームボタンコンポーネントのスケーリング効果を体験できます。画像リソースは、「プロジェクトルートディレクトリ\laya\astes」ディレクトリにコピーすればよく、図8に示すように、xmlのレスポンスNameと命名されたピクチャリソースの属性値ScaleButtonまたはScaleButtonをプレフィックスとして残すことができます。

![8](img/9.png)

（図8）

リソースのコピーが完了したら、LayaAirIDEのリソース管理パネルを再度開いて、リソースツリーを更新するボタンをクリックして、先ほどコピーしたScaleButtonikey.pngを見ることができます。この写真をクリックして、画像のプレビューを見ることができます。skinのデフォルト値を持つカスタムコンポーネントがプロジェクトのリソース管理パネルに成功的に追加されたことを示します。

![9](img/8.png)
（図9）

　　*Tips：リソースパネルに表示されているコンポーネントは現在のプロジェクトのためだけに使用され、コンポーネントパネルに追加されているのがすべてのプロジェクトの共通のコンポーネントです。*

###4.4カスタムコンポーネントを使用する

プロジェクト管理パネルでは、私たちがカスタマイズしたズームボタンのコンポーネントを使用したプレゼンテーションページを作成します。

####4.4.1資源パネルから使用する

リソース管理パネルにsbtnをプレフィックスのコンポーネントとして見つけて、直接ページにドラッグして、クリックすると拡大縮小効果が見られます。

![10](img/ide11.gif)
（図10）

####4.4.2コンポーネントパネルから使用する

コンポーネントパネルにScaleButtonのコンポーネントを見つけて、直接ページにドラッグして、クリックして拡大縮小効果を見ることができます。図11に示すように。

![11](img/ide12.gif)
（図11）コンポーネントパネルにはピクチャリソースが含まれていないので、属性skinで設定する必要がある。



##5、コンポーネントの調整

上の内容によって、LayaAirIDEのコンポーネントの作成と使用は全部完了しました。しかし、正式なカスタムコンポーネントのプロセスでは、非常に重要なステップがあります。流れを簡略化するために、できるだけ早くカスタムコンポーネントの目標を実現するためにスキップしました。このステップはコンポーネントのデバッグです。

文書の操作が順調に進むにつれて、デバッグの不足は問題ないですが、実際に開発する過程で、ほとんどの人はコードに間違いがないことを保障できません。間違ったコンポーネントをIDEに追加すると、この文書のようにうまくいかなくなります。IDEではコンポーネントの調整が難しいです。したがって、この小節において、私たちは紛失の手順を補足して、部品を編纂し終わったら、まずデバッグして、それから分割してコンパイルします。



###5.1画像をプロジェクトのリソースパスにコピーする

図12のように、1枚の写真をプロジェクトのリソースパス「プロジェクトルートディレクトリ/res/img」ディレクトリにコピーします。

![12](img/12.png)
（図12）



###5.2コンポーネントのクラス参照を修正する

上記で作成したスケーリングボタンコードScaleButton.jsを開き、自uiのbuttonを継承するように修正します。図13に示すように、

![13](img/13.png)
（図13）



###5.3エントリクラスを作成します。

プロジェクトルートディレクトリ/srcでエントリクラスMain.jsを作成します。コードは以下の通りです。


```javascript

import ScaleButton from "./laya/customUI/ScaleButton"
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
		//加载资源
                     Laya.loader.load("img/monkey.png",Laya.Handler.create(this,this.onLoaded),null,Laya.Loader.IMAGE)

	}
	 onLoaded(){
		var scaleButton = new ScaleButton();
		//组件skin的资源路径
		scaleButton.skin = "img/monkey.png";
		//添加到舞台上
		Laya.stage.addChild(scaleButton);
	}
}
//激活启动类
new Main();

```


図14に示すように、Mainをgulpfile.jsファイルにスタートクラスとして設定します。ブラウザでクリックしてスケーリング効果が得られる場合は、図15に示すようにします。これは有効なカスタムコンポーネントです。IDEに安心して追加できます。

![14](img/14.png)
（図14）

![15](img/15.gif)
（図15）

*Tips：デバッグに成功して、コンポーネントをリリースする時、デバッグする時を忘れないでください。`export default class ScaleButton extends Laya.Button `に戻ります`export default class ScaleButton extends laya.editorUI.Button;`。*



##6、コンポーネントの登録

コンポーネント登録は、カスタマイズされたコンポーネントとクラス名を関連付けて表示する場合、登録マップに従って例を示します。

**たとえば:**


```javascript

View.regComponent("ScaleButton",laya.customUI.ScaleButton);//注册组件
```






##7、その他の説明

カスタムコンポーネントが容器類のコンポーネントである場合、プロジェクトで使用する必要がある場合は、LayaAir IDEプロジェクトのエディタモードで、F 9でプロジェクト設定パネルを開き、「コンテナリスト」にカスタムのコンテナコンポーネント類名（カンマ間隔で）を追加します。

![16](img/16.png)
（図16）


カスタムコンポーネントがページコンポーネントである場合、プロジェクトで使用する必要がある場合は、このLayaAir IDEプロジェクトのエディタモードでプロジェクト設定パネルを開き、「ページリスト」にユーザー定義のページコンポーネントクラス名（カンマ間隔で）を追加します。



![17](img/17.png)
（図17）



本編はこれで終わります。もし疑問があれば、コミュニティに提出してください。[http://ask.layabox.com](http://localhost/LayaAir2_Auto/img/http://ask.layabox.com)