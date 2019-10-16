#LayaAir 3 DカメラカメラCamera

LayaAirのカメラは映画やドラマを撮影する時のカメラとして認識され、三次元世界の画面をキャプチャーしてスクリーンに表示されます。また、LayaAir 3 DエンジンにVRカメラが追加され、開発者たちはVR立体アプリケーションやゲームを開発することができます。

もちろん、カメラは他に重要な属性があります。その機能を紹介します。



###Unityからカメラをエクスポート

エンジン1.7.10版とユニティ導出プラグイン1.5.0版がリリースされた後、ユニティで作成されたカメラがエクスポートされます。また、ファイルのエクスポートは、カメラの3 D空間における位置、画角、背景色、キャリアカット、視野などのパラメータを保持しています。エクスポート後のシーンをロードすると、表示される画面効果はunityと完全に一致し、開発者たちがカメラの画角を制御するのに便利です。

また、LayaAir 3 Dエンジンはマルチカメラに対応していますので、unityに複数のカメラを設置してエクスポートすることもできます。マルチカメラのビューの設定については、本課の最後の「マルチカメラ使用」の小節をご覧ください。

では、unityでカメラを作成してエクスポートした場合、コードにファイルをロードした後、カメラはどうやって取得しますか？これはシーンのサブノードインデックスや名前で取得できます。取得後は移動回転、スカイボックスの設定、スクリプトの追加などの操作もできます。

コードは以下の通りです


```java

var LayaAir3D = (function () {
    function LayaAir3D() 
    {
        //初始化引擎
        Laya3D.init(0, 0, true);

        //适配模式
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
        //开启统计信息
        Laya.Stat.show();		
        //预加载角色动画资源
        Laya.loader.create("monkey/monkey.ls",Laya.Handler.create(this,onSceneOK));
        function onSceneOK():void
        {
          //添加3D场景
          var scene= Laya.loader.getRes("monkey/monkey.ls");
          Laya.stage.addChild(scene);  

          //从场景中获取摄像机
          var camera= scene.getChildByName("Main Camera");
          //后续对摄像机的逻辑操作.......
        }
	}
	return LayaAir3D;
} ());
LayaAir3D();
			
```


Unitiyでは、カメラのデフォルト名は「Main Camera」であるため、上記のコードでは、sceneのget ChildByName（「Main Camera」）方式により、後続の論理操作のためにカメラを入手した。開発者たちはユニティでカメラの名前をカスタマイズすることもできます。



**（tips：下記のコード例は`快速开启3D之旅`ドキュメント内のコードは基本的に変更されます。**

###カメラの移動と回転

カメラはSprite 3 Dに引き継がれますので、3 D変換の操作もできます。3 Dシーンをtranform属性で移動して回転変化し、マルチアングルで撮影して、観客や遊戯者によりよりリアルな空間体験を得られます。

カメラの回転を設定:


```typescript

 //实例化一个相机，设置纵横比，0为自动匹配。0.1是最近看到的距离，100是最远看到的距离
var camera = new Laya.Camera();
//移动相机，设置相机向z轴移动3米，true代表的是局部坐标，false是相对世界坐标
camera.transform.translate(new Laya.Vector3(0,0,3),false);
//加载到场景
scene.addChild(camera);
```


カメラの回転を設定:


```typescript

//欧拉角旋转相机。局部坐标，弧度制（false为角度制）
camera.transform.rotate(new Laya.Vector3(0,0,3),true,true);
```




###カメラの直交射影と透視投影

私達が世界を観察する時、見たのはすべて“近くて遠いです”の透視の効果の世界を持つので、3 Dエンジンの中で、人の目の見た世界をより良いシミュレーションするため、デフォルトのカメラは“透視投影”の効果を持っています。

![1](img/1.png)</br/>(図1)デフォルトの斜視投影

しかし、ゲームの多くの部分は、特に斜め45度の視角を持つ2 D、3 Dの混合ゲームで、ゲーム画面は透視効果がありません。この時、私たちはカメラを「直交射影」に設定して、近距離の透視効果を生まないようにします。


```typescript

//正交投影属性设置
camera.orthographicProjection = true;
//正交垂直矩阵距离，控制3D物件远近与现实大小
camera.orthographicVerticalSize = 7;
//移动摄像机位置
camera.transform.translate(new Laya.Vector3(0,26.5,45));
//旋转摄像机角度
camera.transform.rotate(new Laya.Vector3(-30,0,0),true,false);
```


![2](img/2.png)</br/>(図2)直交射影



###カメラ裁断と視野

**遠近距離の裁断**

カメラはまた、遠近距離の裁断を設定し、遠近距離の間のシーンモデルのみを表示し、他のモデルはレンダリング表示しない。ゲームの性能を高めることが最大の強みです。

カメラを作る時、カメラの構造関数はデフォルトで切断されます。近距離は0.3メートルで、遠距離は1000メートルです。開発者はコンストラクション関数に設定したり、カメラのプロパティによって設定したりすることができます。

![3](img/3.png)</br>(图3)




```typescript

//创建摄像机时初始化裁剪（纵横比，近距裁剪，远距裁剪）
var camera = new Laya.Camera(0,0.1,100);
//近距裁剪
camera.nearPlane = 0;
//远距裁剪
camera.farPlane = 100;
```


tips：一般的にゲームの中で、霧の効果をカメラと同時にカットして使います。霧の効果は遠いところ以外はほとんど見えません。この時に遠隔カットを設置して、ゲームのレンダリング性能を高めます。

**カメラ視野**

カメラの視野は焦点距離に類似しており、視野パラメータの調整により、ビュー中のシーン範囲、透視の近距離変化が見られます。角度値によって調整され、角度が大きいほど、視野範囲が大きくなり、開発者は自分のニーズに応じて設定できます。


```typescript

//设置相机的视野范围90度
camera.fieldOfView = 90;
```




###カメラキャプチャーターゲット

カメラを作る時、私たちは常にカメラの位置を調整して、ある三次元物体を表示したり、ある領域を表示したりする必要があります。初心者によると、まだ空間的な思考が習慣化されていないので、位置を調整するのに時間がかかります。

LayaAir 3 Dエンジンにおける3 D変換は、ターゲットを捕捉するためのlook At（）方法を提供し、3 Dオブジェクトの位置合わせ句読点を自動的に調整する。カメラは私たちの視野を調整する目的にも使える。コードは以下の通りです

lookAt（targetは目標ベクトルを観察し、upは上ベクトル、isLocalは局所空間かどうか）


```typescript

//添加3D场景
var scene = new Laya.Scene();
Laya.stage.addChild(scene);
//添加自定义模型
var box = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1,1,1)));
box.transform.rotate(new Laya.Vector3(0,45,0),false,false);
scene.addChild(box);
//添加摄像机
var camera = scene.addChild(new Laya.Camera());
camera.transform.translate(new Laya.Vector3(0,1,5));
//摄像机捕捉模型目标
camera.transform.lookAt(box.transform.position,new Laya.Vector3(0,-1,0));
```


私たちはカメラのupを（0、-1,0）の方向に設定します。カメラのy方向はマイナスになり、Y軸に逆回転しますので、画面は逆さまの方体になります（図4）。他のいくつかの方向の初心者たちは多くの試みをすることができます。

![4](img/4.png)</br/>(図4)ターゲットを捕捉する



###カメラの背景色とスカイボックス

**背景色**

3 Dシーンでは、背景色をカメラで制御し、カメラのclear Color属性を設定することで3 D空間の背景色を変更し、色は3 DベクトルVector 3（赤、緑、青）を使用して調整し、エンジンはデフォルトでは黒一色に設定します。


```typescript

//设置背景颜色
camera.clearColor = new Laya.Vector3(0.5,0.5,0.6);
```


**スカイボックス**

シーンの多くは空の遠景を表現する必要があります。例えば、青空雲、夕暮れ、星空など、LayaAir 3 Dエンジンでは、カメラのプロパティにスカイボックス（SkyBox）を追加して作成します。

カメラが直交投影を使用すれば、スカイボックスは効果が得られなくなります。開発者たちは試してみてもいいです。

スカイボックスはキューブモデルと6枚のシームレスな材質スタンプで構成されています。360パノラマ地図に似ています。視野角の回転によって、四方八方に遠景効果があります。

下記のコードの中で「skyCube.ltc」にはJSON形式で6枚のスタンプのパスが格納されています。


```typescript

//创建天空盒
var skyBox:Laya.SkyBox = new Laya.SkyBox();
//清除标记，使用天空（必须设置，否则无法显示天空）
camera.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;
//绑定天空盒对象到摄像机
camera.sky = skyBox;
//为天空盒加载贴图文件
skyBox.textureCube = Laya.TextureCube.load("skyBox/skyCube.ltc");
```


![5](img/5.png)<br/>(図5)スカイボックスを使用しています。



###マルチカメラの使用

同じシーンでは、複数のカメラが使用され、シーンにロードされると、それぞれのゲームビュー画面が生成される。以前会ったゲームの中で、2人で3 Dゲームをするなら、2つの3 Dカメラを使って、左半分のスクリーンは1人のプレーヤーを表示して、右半分のスクリーンは別の1つを表示して、きわめて大きいのはゲーム性を豊かにしました。

しかし、マルチカメラの欠点は非常に消耗した性能で、モデルの三角面数とDrawCallの数は倍に上がり、いくつかのカメラでは数倍の性能損失が多くなります。

3 Dシーンの表示サイズと位置は、2 Dゲームとは違って、主にカメラのシャッター（ViewPort）によって制御され、スクリーンの分割が行われます。

次の例では3 Dシーンをロードし、ViewPortを通して左右の視認分離を行います。コードは以下の通りです。


```java

var LayaAir3D1 = (function () {
    function LayaAir3D1() 
    {
        //初始化引擎
        Laya3D.init(1280, 720, true);

        //适配模式
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
        //开启统计信息
        Laya.Stat.show();		
        //预加载资源
			  Laya.loader.create("LayaScene_loveScene/loveScene.ls",Laya.Handler.create(this,on3DComplete));
	
		
        function on3DComplete()
        {
          //创建场景
          var scene=Laya.Scene.load("LayaScene_loveScene/loveScene.ls");
          Laya.stage.addChild(scene);
          
          //创建摄像机1添加到场景
          var camera1=new Laya.Camera();
          scene.addChild(camera1);
          
          //摄像机1添加控制脚本
          camera1.addComponent(CameraMoveScript);

          //修改摄像机1位置及角度
          camera1.transform.translate(new Laya.Vector3(0,2,8),true);
          camera1.transform.rotate(new Laya.Vector3(-23,0,0),true,false);
          //设置视口为左半屏
          camera1.viewport=new Laya.Viewport(0,0,640,720);
          
          //创建摄像机2添加到场景
          var camera2=new Laya.Camera();
          scene.addChild(camera2);
          //修改摄像机2位置及角度
          camera2.transform.rotate(new Laya.Vector3(-45,0,0),false,false);
          camera2.transform.translate(new Laya.Vector3(0,0,25),true);
          //设置视口为右半屏
          camera2.viewport=new Laya.Viewport(640,0,640,720);
        }
	}
	return LayaAir3D1;
} ());
LayaAir3D1();
```


上記のコードをコンパイルして実行します。実行効果は図6のようです。開発者たちは同時にテストもできます。シングルカメラの下ではDrawCallと三角面の数が半分以下になります。

![图片6](img/6.png)<br/>（図6）デュアルカメラのスクリーン分け