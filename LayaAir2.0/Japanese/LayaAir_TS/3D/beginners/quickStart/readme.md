#早く3 Dプロジェクトを開始します。

次にLayaAirエンジンを使って3 Dプロジェクトを迅速に開始し、TS言語を教程として、エンジンコードで基本的な3 Dアプリケーションを実現する簡単なデモを行います。

###IDE作成3 Dサンプル項目

LayaAirIDEをダウンロードし、新規プロジェクトを起動して3 Dプロジェクトを選択します。下図のように：

![1](img/1.png)</br/>(図1)

ここではJavaScript言語を選択します。作成が完了したらIDEが3 Dテンプレートを作成してくれていることが分かりました。プロジェクトの構造についての紹介開発者は2 Dの初心者教程を参考にすることができます。ここでは改めて言及しない。

そして、ショートカットキーF 5を押したり、運転ボタンを押したりして、デバッグウィンドウに四角体が表示されています。下図のように：

![2](img/2.png)</br/>(図2)

Main.tsというスタートクラスは私たちのために3 Dの世界を作り上げてくれました。そして、簡単な3 D世界に必要ないくつかの要素（シーン、カメラ、光源、3 Dモデル、材質）を追加しました。これらの概念については後続教程をサポートします。詳しく紹介します。

この簡単な点のデモに対して、私達はこの立方体が静的であることを発見しました。3 Dのような立体視感をもたらすことができません。簡単なコードを追加して回転させます。まずスタートクラスのMain.tsを見つけて、下記のコードに修正します。


```typescript

// 程序入口
class Main {
    constructor() {
        //初始化引擎
        Laya3D.init(0, 0);

        //适配模式
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

        //开启统计信息
        Laya.Stat.show();

        //添加3D场景
        var scene: Laya.Scene3D = Laya.stage.addChild(new Laya.Scene3D()) as Laya.Scene3D;

        //添加照相机
        var camera: Laya.Camera = (scene.addChild(new Laya.Camera(0, 0.1, 100))) as Laya.Camera;
        //摄像机位置
        camera.transform.translate(new Laya.Vector3(0, 3, 3));
        //摄像机角度
        camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
        //设置背景颜色
        camera.clearColor = null;

        //添加方向光
        var directionLight: Laya.DirectionLight = scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
        //灯光颜色
        directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
        //灯光的方向
        directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));

        //添加自定义模型
       var box:Laya.MeshSprite3D = new Laya.MeshSprite3D(new Laya.BoxMesh(1,1,1));
       //将box添加到sence上
       scene.addChild(box);
       //给模型一个旋转角度
       box.transform.rotate(new Laya.Vector3(0,45,0),false,false);

       //给模型创建一个材质球
       box.meshRenderer.material = new Laya.BlinnPhongMaterial;
       //创建材质
       var  material:Laya.BlinnPhongMaterial = new Laya.BlinnPhongMaterial();
       //加载材质的漫反射贴图
       Laya.Texture2D.load("res/layabox.png",Laya.Handler.create(null,function(texture:Laya.Texture2D):void{
           //将得到的Texture2d添加给材质球
           material.albedoTexture = texture;
       }));
       //给模型添加材质
       box.meshRenderer.material = material;

       //给box添加旋转
       var vect:Laya.Vector3 = new Laya.Vector3(1,1,0);
       //每10ms旋转一次
       Laya.timer.loop(10,this,function(){
           box.transform.rotate(vect,true,false);
       });
    }
}
new Main();
```


![3](img/3.gif)</br/>(図3)

ここではタイマーを使いました。10 msごとにこの本体を回してください。具体的な説明は開発者に関連する教程とAPIを読んでください。ここでは簡単なデモです。簡単なコードは下記の通りです。


```typescript

var vect:Laya.Vector3 = new Laya.Vector3(1,1,0);
//每10毫秒旋转一次
Laya.timer.loop(10,null,function(){
  box.transform.rotate(vect,true,false);
});
```


ここで簡単な例を通してこの方体を回転させることができます。



###LayaAir 3 D世界の基本構成

上のコードの例を通して、基本的な3 D世界が誕生したのを見ることができます。もちろん、上のコードは比較的に簡単です。多彩なゲームの世界を作るには、エンジンの機能をもっと知る必要があります。

図4位LayaAir 3 D世界可視要素図。3 Dシーン、カメラ、照明、模型の他、動画も表示可能な要素の一つです。後期の授業は私達は徐々に皆さんに紹介します。

![4](img/4.png)</br/>(図4)



###3 D世界変換とベクトルの簡単な運用

以上の例では、表示に関するいくつかの要素モジュールが作成されているが、カメラ、照明、モデル上でベクトルVector 3やVector 4などに運用され、それらをオブジェクトの位置、方向、色などに適用することも見られた。

####座標系と位置、回転の変更

2 Dエンジンではx、y座標を直接調整して表示オブジェクトの位置と回転方向を制御します。3 Dエンジンでは表示オブジェクトが複雑で、z軸座標を追加していますので、Vector 3の3次元ベクトルを使って、その値でそれぞれx、y、zを表しています。

しかし、各種の3 Dエンジンと3 Dモデルのアニメーション制作ソフトは座標の方向の定義に対して異なっています。

LayaAit 3 Dエンジン座標は専門用語で属します。`右手坐标系`（図5）簡単に言えば、画面右側は正X軸方向、上側は正Y軸方向、画面方向は正Z軸方向（スクリーン後方向は負Z軸方向）となります。ある3 Dエンジンは左手の座標系に属しています。ここでは紹介しません。興味のある初心者は百度で分かります。

![5](img/5.png)</br/>(図5)右手系座標

エンジンには世界座標と局所座標系があり、世界座標系は3 Dシーンの座標であり、三軸方向は永遠に変わらない（図5）。局部座標はモデル自身の座標であり、モデル方向の回転によって変化することができますが、右手の座標系ジェスチャーで座標方向を識別することができます（図6）。下図の手のモデルはY軸に沿って-90度回転した後の3 Dモデルの右手の座標系の局部座標であり、大親指は常に局所座標の正X軸方向です。

![6](img/6.png)</br/>(図6)

上記の座標系を理解すれば、3 D変換によってこれらを変えることができます。例コードでは、transformは3 D変換対象（Trans form 3 D）であり、3 D世界では非常に重要であり、表示対象の多くの変化論理制御に関するコードが使用されます。

コードには3 D変換におけるtranslate移動とrotate回転方法を用い、3次元ベクトルでx、y、zの値を表します。同僚、二つの方法はいずれもパラメータの中に局部空間移動、回転を設定できます。初心者たちはプログラムの中に設置できます。移動回転の違いを観察します。


```typescript

//移动摄像机位置
camera.transform.translate(new Laya.Vector3(0, 3, 3));
//旋转摄像机方向（角度）
camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
```


![7](img/7.png)</br/>(図7)

以上はTransform 3 DのAPIにおける移動、回転の方法について説明した。もちろん、変換対象には多くの属性と方法があります。これからの例で説明します。

####ベクトルの使用

ベクトルはLayaAir 3 Dエンジンにおいて非常に頻繁に使用されており、二次元ベクトルから四次元ベクトルに至るまでそれらの姿が見られます。基本的な使い方は、この例では、値付けのために用いられます。

コード中の3 Dオブジェクトの移動、回転、スケーリングなどの変換は、そのx、y、z軸座標の値として3次元ベクトルを使用します。

照明の各色属性の値は長く、3次元ベクトルの値はそれぞれR、G、Bの3色を表しています。それぞれ赤、緑、青、LayaAir 3 Dエンジンの中で、3つの色の最大値は1で、パーセンテージで設定されています。全体の値が大きいほど、色が明るいほど、小さいほど色が暗くなり、値が1を超えると露出効果があります。

赤、緑、青の組み合わせはどのような色になりますか？一般的にプロジェクト開発の過程で、プログラマは色の値を繰り返し調整して、良い効果を実験する必要があります。

例では、コードを使用したベクトルを色の割り当てとして使用します。


```javascript

//灯光的漫反射颜色
directionLight.diffuseColor = new Laya.Vector3(1.6, 1.6, 1.6);
```


プロジェクトの中で、まだ多くの複雑な使い方があります。ベクトルを使って数学演算を行う必要があります。このコースは入門コースとして、ここではあまり紹介しません。