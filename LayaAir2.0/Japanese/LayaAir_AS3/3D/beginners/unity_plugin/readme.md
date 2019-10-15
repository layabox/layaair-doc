##Unityプラグインの使用

>###重要なヒント:

###LayaAir 2.0バージョンのエンジンは、似合うのはUnity 5.6.6 x以上のバージョンです。ですから、開発者はUnity 5.6.6 x以上のバージョンをダウンロードしてください。他のバージョンについては、一部互換性がない場合があります。



##1、LayaAir 3 Dエクスポートツールをダウンロードする

ダウンロード先:

https://ldc 2.layabox.com/layadownload/type=layaairide-LayaAir%20 IDE%20.00%20 beta 3

あるいはLayaAirIDEの**ツール**メニューからクリックします**3 D変換ツール**ダウンロードリンクにジャンプできます。図1に示します。

![图片1](img/1.png)<br>（图1）


*Tips:エクスポートプラグインは不定期的に更新されます。5.6.xのバージョンでは、エンジンとプラグインに不具合があることが分かりました。リンクをクリックしてダウンロードし直してもいいです。プラグインが更新されたかどうか確認してください。*



##2、エクスポートプラグインのインストール

unityを起動し、新規プロジェクトを作成し、ゲームに必要な資源や材質、スタンプなどを導入し、プロジェクト名を自分のニーズに合わせて命名することができます。ctrl+sは私たちのシーンを保存しています。ここに名前をtruckといいます。

リソース管理画面で、LayaAir 3 D変換ツールを右クリックして導入します。プラグインバージョンはLayaAirエンジン機能の増加により更新されますが、導入方法は完全に一致しています。

インポートツールが成功すると、リソース管理画面にLayaPluginというフォルダが表示されます。また、unityメニューバーにはリードプラグインメニューLayaPluginも表示されます。図2のように：

![动图2](img/2.gif)<br/>(図2)

​

###エクスポートリソースの設定

メニューバーのLayaPluginをクリックすると、エクスポートパネルが表示されます。ここで詳しく説明します。

**Tips:**

メニューLayaAir 3 Dをクリックした後、プルダウンメニューにはより多くのサブ項目が現れました。LayaAir Exportは出資設定パネルを指導しています。これをunity 3 Dのインターフェースの適した位置にドラッグしてもいいです。今度このプロジェクトを開くと、設定された位置に維持されます。

**LayaAir Demo、Study、AnsewersなどはLayaAir公式サイトをクリックして、それぞれ実例、学習文書、フォーラムを代表しています。**

![动图3](img/3.gif)<br>（图3）







####リソースのカテゴリをエクスポート

**Sceneカテゴリ**シーン全体を指すのです。シーンの中のモデル、材質、スタンプ、動画、またはフォトスタンプのすべての導出に関わらず、主にシーン制作に使われます。ファイルの拡張子はlsです。Sceneクラスまたはその継承クラスでロードする必要があります。

**Sprite 3 Dカテゴリ**シーンに比べて光照贴图の導出が少なく、キャラクターやゲーム中のアイテムの単独リソース導出によく使われます。ファイルの拡張子は.lhで、Spite 3 Dでロードします。

それらのローディングは「3 D技術文書-LayaAir 3 Dモデル編」で紹介します。

####Meshセット

グリッドデータの導出設定は、チェックした後に2つの情報（図4）が現れ、それらのは圧縮モデルのグリッドlmファイルサイズとして機能し、プロジェクトのようにカットしないことを推奨します。

Ignore Vetices Tangentは、頂点カット情報を無視します。
Ignore Vetices Colorは頂点色情報を無視します。

![图片4](img/4.png)<br/>(図4)

####Terrain Setting

unity型導出設定（図5）

Covert Terrain To Mesh
シーンに地型がある場合は、メッシュモデルに変換します。
untiyの地型の製作はとても便利で、筆で地の形の高さを描くことができます。例えば、山川や川の溝など、ブラシで複数の細部のスタンプを描くこともできます。LayaAirエクスポートプラグインは地の形をMeshに変えて開発者に使いやすいです。違いは材質と普通の材質が違っています。細かいスタンプが含まれています。

Resolution
導出したモデルグリッド面数の最適化設定は、通常はMedium中程度でOKです。以下は設定された最適化レベルで、小1級あたりは4で割った面数の精度に相当します。
Very Height最適化後の面数が最高です。
Height最適化後の面数は相対的に高いです。
Medium最適化後の面数は中ぐらいです。
Low最適化後の面数が低い
Very Low最適化後の面数が一番低い

![图片7](img/7.png)<br/>(図5)



####GameObject Setting

ゲームアイテムノード設定（図6）

Ignore Null Game Objecs
エクスポート時は空ノードを無視し、LayaAirエンジンがサポートしていないノードもライトノードのように空ノードとして記憶し、精霊数を減らすことができます。
注：1.5.0版はカメラのエクスポートに対応していますので、空きノードを無視してカメラのエクスポートに影響はありません。

Ignore Not Active Game Object
エクスポート時にunityシーンで非アクティブなノードを無視します。

Optimize Game Objects
エクスポート時にunityシーンの第1段ノードからフラットツリー構造を撮影し、不要なノードをすべて削除し、精霊数を最大限に減らすことができます。

バッtch Make The First Level Game Object
バッチ導出（sprite 3 dを選択しなければならない）は、シーン内のすべてのステージノードを一括して導出する。



 ![图片8](img/8.png)<br/>(図6)




####Other Setting

その他設定（図7）

カバーOriginal Export Files
エクスポート時に元のエクスポートファイルを上書きします。

Custoomize Export Root Directory Name
フォルダ名をカスタマイズしてエクスポートします。デフォルトのフォルダ名は「layaScene+シーン名」です。

Automatic ally Save The Configration
エクスポート時に現在の設定を自動保存します。



 ![图片9](img/9.png)<br/>(図7)



####エクスポートの設定

Borowerが保存するファイルパス
Clear Configは現在の設定をクリアします。
Revert Configは設定テーブルから保存されているプロファイルを読み込みます。
Save Configは現在の設定を保存し、保存後、次のオープン後に直接に使用する前に配置され、開発者たちが操作しやすいです。
LayaAir RunをクリックするとLayaAirエンジンを使って直接にこのシーンを実行できます。
LayaAirRun使用上の注意事項：
1.Node環境、express拡張モジュールを設置しなければならない（ツールにはexpressが内蔵されています。正常に使用できない場合は、自分でインストールしてください）。
2.シーンではカメラがあることを確保し、自分でその位置、角度を調整し、最終的にはlayaAir運行効果はUnity運行結果と一致します。
LayaAir Exportは現在のリソースをエクスポートし、クリックすると、現在のシーンまたはモデルのデータを指定のパスにエクスポートします。



 ![图片10](img/10.png)<br/>(図8)





###エクスポートするリソースを簡単に紹介します。

私たちはunityで車のモデルを作成して、LayaAirのプラグインでエクスポートします。出力シーン設定を設定した後、Laya ExportボタンをクリックしてエクスポートしたらデフォルトのLayaSchengrouckフォルダが生成されます（図9）。



 ![图片11](img/11.png)<br/>(図9)

上の図のファイルリソースを参照してください。エクスポート後に.ls、.lm、.lmatデータリソース、およびスタンプpng、tgaリソースが生成されます。

lsはシーンファイルで、Sceneカテゴリをエクスポートする時に生成します。シーンに必要な各種データ、モデル、光照射スタンプ、位置などを含んで、Sceneクラスでロードします。

.lhはモデルファイルで、Sprite 3 Dカテゴリをエクスポートするときに生成されます。光のマッピングファイルの情報が不足しています。他は.lsと同じです。

lmはモデルデータファイルであり、FBXフォーマットの変換に相当し、Mesh Sprite 3 Dクラスでロードできます。

lmatは材質データファイルで、unityでモデルに設定された材質情報で、ロード.lsまたは.lhファイルの場合は自動的にロードされます。lmatは材質が発生します。lmatはまた、いくつかの属性を手動で変更することができます。

laniは動画データファイル（図8のモデルは動画がないので、エクスポート時には生成されません）であり、モデル上に動画があれば、エクスポート後にアニメーション配置ファイルを生成し、骨格やフレームアニメーション情報を含んでいます。

これらの具体的な使い方は、後続の授業ドキュメントで詳しく紹介されます。



###簡単な読み込み例

私たちはLayaSceencuruckフォルダの内容を全部プロジェクトのルートディレクトリのbin/h 5/下にコピーします。

Tips：この章では、簡単なローディングアプリケーションだけを紹介しています。エクスポートすると、様々なフォーマットが生成されます。その詳細な説明は、3 D技術文書の「LayaAir 3 DシーンScene」と「LayaAir 3 Dモデル」篇で紹介します。

シーンをロードします。lsコードの例は以下の通りです。


```java

package {
	import laya.d3.core.Camera;
	import laya.d3.core.MeshSprite3D;
	import laya.d3.core.Sprite3D;
	import laya.d3.core.light.DirectionLight;
	import laya.d3.math.Vector3;
	import laya.d3.math.Vector4;
	import laya.d3.resource.models.BoxMesh;
	import laya.display.Stage;
	import laya.utils.Stat;
	import laya.d3.core.scene.Scene3D;
	import laya.d3.core.material.BlinnPhongMaterial;
	import laya.webgl.resource.Texture2D;
	import laya.utils.Handler;
	public class LayaAir3D {
		
		public function LayaAir3D() {

			//初始化引擎
			Laya3D.init(0, 0);
			
			//适配模式
			Laya.stage.scaleMode = Stage.SCALE_FULL;
			Laya.stage.screenMode = Stage.SCREEN_NONE;

			//开启统计信息
			Stat.show();
			
			//添加3D场景     Scene3D.load("LayaScene_truck/truck.ls",Handler.create(this,function(sprite:Sprite3D):void{
				var scene:Scene3D = Laya.stage.addChild(sprite)as Scene3D;
				//创建摄影机（纵横比，近距离裁剪，远距离裁剪）*Unity中导出的Scene如果有Camera就不用再次创建Camera*
				var camera:Camera = scene.addChild(new Camera(0, 0.1, 100)) as Camera;
				//移动摄影机位置
				camera.transform.translate(new Vector3(0, 1, 0));
			}));
		
		}		
	}
}
```


上記の簡単なコードをコンパイルして実行すると、シーンローディングに成功し、シーン中のモデルも3 Dビューに表示されることがわかった（図12）。



 ![图片12](img/12.png)<br/>(図10)

