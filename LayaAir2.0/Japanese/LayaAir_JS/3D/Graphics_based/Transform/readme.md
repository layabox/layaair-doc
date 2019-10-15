#LayaAir 3 DにおけるTransform変換

前述のLayaAir 3 Dにおける座標系といくつかの基礎数学ツールについて説明しましたが、例コードでは、tranformは変換対象です。[Transform3D](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=Core&class=laya.d3.core.Transform3D)API）彼は3 Dの世界において非常に重要であり、表示対象の変化に関するすべてのものが彼に使われる。

例示的なコードでは、移動、回転、および3次元ベクトルでx，y，zの値を表します。両方法はいずれもパラメータにおいて局所空間移動か回転かを設定することができる。


```typescript

	//移动摄像机
	camera.transform.translate(new Laya.Vector3(0, 3, 3));
	//旋转摄像机
	camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
```


回転に関しては、Transform 3 Dにおいて、角度/ラジアン回転の2つの回転インターフェースが提供されています。`rotate`もう一つはオーロラの角の回転です。`localRotationEuler:Vector3`。

！[](img/1.png)<br/>(図1)

効果を観察しやすくするための公式例を選んだ（[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Sprite3D&name=TransformDemo)コード、まず私達**クローン**二つのサル（クローンの知識点は精霊Sprite 3 Dの章で詳しく説明します）が効果を見て、クローン後に私たち2人のサルの位置を観察しやすいようにします。


```typescript


//克隆sprite3d
var layaMonkey_clone1 = Laya.Sprite3D.instantiate(staticLayaMonkey, _scene, false, new Laya.Vector3(0.0, 0, 0.5));
var layaMonkey_clone2 = Laya.Sprite3D.instantiate(staticLayaMonkey, _scene, false, new Laya.Vector3(0.0, 0, 0.5));
var layaMonkey_clone3 = Laya.Sprite3D.instantiate(staticLayaMonkey, _scene, false, new Laya.Vector3(0.0, 0, 0.5));
//平移
layaMonkey_clone1.transform.translate(new Laya.Vector3(1.5, 0, 0.0));
layaMonkey_clone2.transform.translate(new Laya.Vector3( -1.5, 0, 0.0));
layaMonkey_clone3.transform.translate(new Laya.Vector3( 2.5, 0, 0.0));
```


！[](img/2 png)<br/>(図2)

そして私たちの回転とテストをします。**拡大縮小**変換します。クローン1をY軸に90度回転させ、クローンは彼のスケーリング値を（0.5，0.5，0.5）に設定します。効果を見てください。（今回のスケーリングはローカルスケーリングを使用しています。世界のスケーリングはローカルスケーリングの原点と同じです。スケーリング基準の座標系は異なり、世界のズームの倍数はグローバルベースです。）


```typescript

//旋转
layaMonkey_clone2.transform.rotate(new Laya.Vector3(0, 60, 0), false, false);
//缩放
var scale = new Laya.Vector3(0.1, 0.1, 0.1);
layaMonkey_clone3.transform.localScale = scale;
```


！[](img/3 png)<br/>(図3)

上で紹介した3つの中の変換以外にも、tranformには他にもいくつかのよく使われている属性と方法があります。

>方法

`lookAt(target:Vector3, up:Vector3, isLocal:Boolean = false):void`目標位置を観察する。

>属性

`localPosition:Vector3`ローカル位置

`localScale:Vector3`拡大縮小

`localMatrix:Matrix4x4`ローカル行列

`position:Vector3`世界の位置。

`localRotation:Quaternion`局部的に回転する。

`scale:Vector3`世界のズーム。

`worldMatrix:Matrix4x4`世界行列

`rotation:Quaternion`世界は回る。

`right:Vector3`［read-only］右方向を取得します。

`forward:Vector3`［read-only］前向きの方向を取得します。


####3 D世界の子父関係

3 D世界では親ノードが変換され、そのサブノードは応答に応じて変換される。しかし、サブノードの変換は親物体に影響を与えない。