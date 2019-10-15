# 多摄像机窗口的使用

###### *version :2.2.0   Update:2019-8-24*

同じシーンでは、複数のカメラが使用され、シーンにロードされると、それぞれのゲームビュー画面が生成される。以前会ったゲームの中で、2人で3 Dゲームをするなら、2つの3 Dカメラを使って、左半分のスクリーンは1人のプレーヤーを表示して、右半分のスクリーンは別の1つを表示して、きわめて大きいのはゲーム性を豊かにしました。

しかし、マルチカメラの欠点は非常に消耗した性能で、モデルの三角面数とDrawCallの数は倍に上がり、いくつかのカメラでは数倍の性能損失が多くなります。

3 Dシーンの表示サイズと位置は、2 Dゲームとは違って、主にカメラのシャッター（ViewPort）によって制御され、スクリーンの分割が行われます。

次の例では、シナリオを作成し、簡単にモデルをロードし、ViewPortを介して左右のビューを分離します。コードは以下の通りです。


```typescript

//创建场景
var scene = Laya.stage.addChild(new Laya.Scene3D());
//创建相机1
var camera1 = scene.addChild(new Laya.Camera(0, 0.1, 100));
//设置相机1清除颜色
camera1.clearColor = new Laya.Vector4(0.3, 0.3, 0.3, 1.0);
camera1.transform.translate(new Laya.Vector3(0, 0, 1.5));
//设置裁剪空间的视口
camera1.normalizedViewport = new Laya.Viewport(0, 0, 0.5, 1.0);

//创建相机2
var camera2 = scene.addChild(new Laya.Camera(0, 0.1, 100));
camera2.clearColor = new Laya.Vector4(0.0, 0.0, 1.0, 1.0);
camera2.transform.translate(new Laya.Vector3(0, 0.15, 0.5));
camera2.normalizedViewport = new Laya.Viewport(0.5, 0.0, 0.5, 0.5);

//添加平行光
var directionLight = scene.addChild(new Laya.DirectionLight());

//加载模型
Laya.Sprite3D.load("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh", Laya.Handler.create(null, function(sp) {
    //将模型加到场景上
    var layaMonkey = scene.addChild(sp);
}))
```


上記のコードをコンパイルして実行します。実行効果は図6のようです。開発者たちは同時にテストもできます。シングルカメラの下ではDrawCallと三角面の数が少なくなります。([demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Camera&name=MultiCamera))

！[](img/1.png)<br/>(図1)

####どのようにダイナミックにカメラの目を修正しますか？

上記の例ではカメラのシャッターを設置しました。上のコードに基づいてカメラのシャッターを動的に修正します。

**注意:** `Camera`の`normalizedViewport`裁断空間のアウトラインと`viewport`スクリーンの画素座標の視認口はどちらもget/set方式です。したがって、カメラのビューパラメータを変更するときは、単純な知識ではなく、ビューパラメータを変更する必要があります。

>カメラのシャッターを動的に修正する


```typescript

Laya.timer.once(3000,this,function ():void 
{	
    //获取第一个摄影的视口
    var viewport1:Laya.Viewport = camera1.normalizedViewport;
    //修改参数
    viewport1.width = 0.2;
    //重新赋值是视口
    camera1.normalizedViewport = viewport1;

    var viewport2:Laya.Viewport = camera2.normalizedViewport;
    viewport2.width = 0.8;
    viewport2.x = 0.2;
    camera2.normalizedViewport = viewport2;
});
```


！[](img/2 gif)<br/>(図2)

