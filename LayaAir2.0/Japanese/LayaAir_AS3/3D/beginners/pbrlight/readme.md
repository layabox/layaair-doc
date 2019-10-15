##紹介する
PBRは物理に基づく光照射である。基本的な考えはすべての光照計算が完全に統一された物理的な方法によって完成されます。つまり、シャダを使って美術のすべての要求を完成したいです。基本的に材質を作成してから、どんな環境においても、材質とパラメータを切り替える必要がなく、環境と自然に融合することができます。美術で修正できる材質パラメータは全部物理的な意味があります。材質自体の色、粗さ、金属度を含みます。
だからPBRに必要なものは以下を含む。
1.環境情報。p br材質に照明情報を提供するために使用します。ここでhdrを一つ使います。[全景图](http://localhost/LayaAir2_Auto/panorama.md)を選択して説明します。
2.材質。材質はSubstance Painterで行うことを提案しています。完成したらUE 4のフォーマットにエクスポートします。
##Laya 3 D実現のPBRの制限
これはまだテスト版だけですので、下記の制限があります。
1.ダイナミック光源は現在サポートされていません。これからはダイナミックスポット、面光源をサポートします。
2.自発光はまだ実現されていません。（これは比較的簡単ですが、新しいチャネルが必要です。）
3.現在のシーンは環境光の撮影しかできません。これからはいくつか作ります。
4.前処理速度とWebGLの機能制限のため、現在の環境スタンプのサイズは512×256でなければなりません。

##ツール依存
pbrotoolsが必要です。設置方法：

```bash

npm install -g pbrtools
```

プリコンパイルしたcモジュールを使っていますので、今はwindows版だけをサポートしています。そして、electron環境では実行できません。必要があれば他のバージョンを提供することができます。

##PBR材質はどうやって作りますか？
1.環境スタンプを作成します。
これは無料のパノラマをダウンロードすることによって、自分でカメラとソフトウェアでパノラマを作成し、3 dsmax、unityでパノラマを描画する方法で得られます。フォーマットはhdrが一番いいです。これでもっと広い光の情報を保持できます。
2.環境スタンプを処理して、それぞれの粗さの反射データとディffuseデータを生成します。
環境スタンプのサイズは512×256でなければなりません。フォーマットはpng、tga、またはhdrで、パノラマ図でなければなりません。cubemapは使えません。
環境スタンプはコマンドpbrotoolsで処理します。

```bash

    pbrtools handleenvmap img
```
imgは処理するパノラマ画像である。このコマンドは、あるディレクトリの下で前処理画像env.mipmapsを生成し、スカイボールのスタンプに使うenv.pngとjsongファイルを紹介します。

```json

{
    "skytex":"env.png",
    "prefiltedEnv":"env.mipmaps",
    "IrradianceMat":[
        0.28129690885543823,0,0,0,-0.3282267153263092,-0.1073296070098877,0,0,-0.29809144139289856,0.13647188246250153,-0.17396731674671173,0,-0.5436494946479797,0.18786616623401642,0.2717423141002655,0.5554966926574707,0.2510770261287689,0,0,0,-0.295642226934433,-0.08785344660282135,0,0,-0.2755483090877533,0.12092982232570648,-0.16322359442710876,0,-0.5187899470329285,0.1655164659023285,0.3213203251361847,0.5639563798904419,0.17064285278320312,0,0,0,-0.22071118652820587,-0.04934860020875931,0,0,-0.21280556917190552,0.08689119666814804,-0.12129425257444382,0,-0.40946751832962036,0.11174142360687256,0.36054936051368713,0.5101194381713867
    ],
    "sunpos":[0,0,0],
    "ev":0.0
}
```

*skytex*はスカイボールのスタンプです。
*prefilterdEnv*は、前処理の異なる粗さの反射情報です。
*IradianceMat*は、パノラマ画像のdiffuse光照射を実現するためのdiffuseパラメータです。
*ev*は露出値、-3から3までで、類似カメラのevパラメータ：0は不変で、-1は半分になり、1は2倍になります。

使用例:
（現在はSkyDome類を使うだけでPBR環境情報をロードできます。）

```javascript

    var skyDome:SkyDome = new SkyDome();
    camera.sky = skyDome;
    skyDome.loadEnvInfo('res/env/def/envinfo.json');   //加载envinfo文件指定的环境光照信息。
```


3.模型を作る。
4.p brの素材を作ります。
Substance Painterで材質を作成し修正してUE 4形式にエクスポートします。
！[](expspex.png)
これは3枚の画像をエクスポートします。
！[](uetex.png)
この3枚の写真はそれぞれ：
*BaseColor*基本色は、光や影などの情報を含まず、素材の本来の色のみを表します。
*Normal*法線スタンプ
*Occelusion Roughness Metallic*情報遮断（赤色チャネル）、粗さ情報（緑色チャネル）金属度情報（青チャンネル）

5.PBRMAterialを作成する
例えばp brの材質を作成します。

```javascript

    mtl = new PBRMaterial();
    mtl.diffuseTexture = Texture2D.load('copper.png');
    mtl.normalTexture = Texture2D.load('normal.png');
    //mtl.pbrInfoTexture = Texture2D.load('orm.png'); 这个可有可无。
    mtl.roughness = 0.5;
    mtl.metaless =  1.0;
```

*diffuse Texture*：材質のdiffuseスタンプです。彼のアルファチャンネルは透明度または金属度を表しています。
*normalTexture*：材質の法線スタンプです。彼のアルファチャンネルは粗さを示しています。
*pbreInfo Texture*：材質のPBRに関する情報は、このスタンプを設定すると、このスタンプの金属度、粗さ情報を優先的に使用します。ここで、RはAO情報を表し、Gは粗さを表し、大きければ大きいほど粗い；Bは金属度を表し、大きければ大きいほど金属度を表す。UEのスタンプは、直接的に使用されてもよい。
＊ロゴス＊：粗さ。オプション。これを設定すると、スタンプに設定された粗さ情報を無視して、全体の材質の粗さが同じであることを示します。一般的にはプレゼンテーションやプログラムだけで粗さをコントロールします。
*metaless*：金属度。オプション。これを設定すると、スタンプに設定された金属度情報を無視して、材質全体を表す金属度は同じで、一般的にはプレゼンテーションやプログラムだけで金属度を制御します。

6.モデル資源にPBR材質を使用する
これは二つの方法があります。一つはlhで指定します。一つはプログラムでPBRMAterialを作成してMeshRenderに値を付与する方法で指定します。
例えば、lhによって指定される：

```json

        ...
        "meshPath":"dude-him.lm",
        "materials":[
            {
                "type":"Laya.PBRMaterial",
                "path":"Materials/head.lmat"
            },
            {
                "type":"Laya.PBRMaterial",
                "path":"Materials/jacket.lmat"
            },
            {
                "type":"Laya.PBRMaterial",
                "path":"Materials/pants.lmat"
            },
            {
                "type":"Laya.PBRMaterial",
                "path":"Materials/upBodyC.lmat"
            }
        ]
        ...
```

各lmatの内容

```json

{
    "version":"LAYAMATERIAL:01",
    "type": "PBRMaterial",
    "props": {
        "name": "head",
        "renderMode": 1,
        "has_tangent":true,
        "textures":[
            {"name":"diffuseTexture","path":"../headC.png"},
            {"name":"normalTexture","path":"../headN.png"}
        ]
    }
}
```


プログラムで指定された

```javascript

    //手工设置材质
    var mtl:PBRMaterial = new PBRMaterial();
    mtl.diffuseTexture = Texture2D.load('../../../../res/threeDimen/pbr/basecolor.png');
    mtl.normalTexture = Texture2D.load('../../../../res/threeDimen/pbr/normal.png');
    mtl.pbrInfoTexture = Texture2D.load('../../../../res/threeDimen/pbr/orm.png');
    var sphere:MeshSprite3D = scene.addChild( new MeshSprite3D(new SphereMesh(0.1, 32, 32))) as MeshSprite3D;
    sphere.meshRender.sharedMaterial = mtl;

```


上の例では二枚のスタンプを使ったり、三枚のスタンプを使ったりします。ここで説明します。効率を向上させるために、遮蔽情報が必要でないなら、この3つの図を2つに統合し、すなわち、3つ目の図の残りの2つのチャネルを前の2つの図のalphaチャネルに配置することができる。
これはpbrotoolsコマンドで処理できます。

```bash

pbrtools handle_ue4_texture expPath
```

このコマンドは、expPathディレクトリにあるすべてのエクスポートされた画像を統合し、3枚が2枚になり、expPathのlayaoutディレクトリに出力します。
だからこれからは自発光をサポートする必要があります。どうしても3枚のスタンプが必要です。

##その他の問題
1.pblut.js
これはBDFを処理する予定のルックアップテーブルです。エンジンはバイナリデータをリリースするのに不便なので、p brが必要なルックアップテーブルデータを独立したjsファイルに置いて、プロジェクトスクリプトの前にこのスクリプトをロードする必要があります。

```html

<script src='pbrlut.js' ></script>
<script src='myGame.js' ></script>
```


5.tangent情報
現在のlmには法線情報しかないので、導出パラメータを修正してもtangent情報を増やすことができますが、完全なnormal、binormal、tangent情報があってこそ、法線スタンプの結果を正確に表示することができます。binormalを計算する方法は後のガイドまたはpbtoolsを使用することができます。用法略
