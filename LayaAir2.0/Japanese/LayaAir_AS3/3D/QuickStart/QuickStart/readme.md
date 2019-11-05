#LayaAir 3 Dプロジェクトを素早く開始します。

次はLayaAirエンジンを使って、3 Dプロジェクトを素早く開始します。AS言語を教程として、エンジンコードを使って基本的な3 D応用を簡単に実証します。

##IDE作成3 Dサンプル項目

LayaAirIDEをダウンロードし、新規プロジェクト選択3 dプロジェクトを起動します。

![图](img/1.png)（図1）

ここで選びます**JavaScript**言語です。作成が完了しました。ideは私たちのために3 dのテンプレートを作成しました。プロジェクトの構造についての紹介開発者は2 Dの初心者教程を参考にすることができます。ここでは詳しく述べない。

##3 Dシーンを素早く表示

直接F 6（macシステムのユーザーはcmd+F 6が必要かもしれません。）または運転ボタンをクリックして、例のプロジェクトが実行してきた3 Dシーンを見ることができます。

![图](img/2.png)（図2）

GameUID.asというスタートページのRuntime類には、3 Dの世界を構築し、簡単な3 D世界に必要ないくつかの要素（シーン、カメラ、照明、モデル、材質）が追加されています。以下のコードは、GameUID.asから選択されます。


```typescript

//添加3D场景
var scene:Scene3D = Laya.stage.addChild(new Scene3D()) as Scene3D;

//添加照相机
var camera:Camera = (scene.addChild(new Camera(0, 0.1, 100))) as Camera;
camera.transform.translate(new Vector3(0, 3, 3));
camera.transform.rotate(new Vector3(-30, 0, 0), true, false);

//添加方向光
var directionLight:DirectionLight = scene.addChild(new DirectionLight()) as DirectionLight;
directionLight.color = new Vector3(0.6, 0.6, 0.6);
directionLight.transform.worldMatrix.setForward(new Vector3(1, -1, 0));

//添加自定义模型
var box:MeshSprite3D = scene.addChild(new MeshSprite3D(PrimitiveMesh.createBox(1, 1, 1))) as MeshSprite3D;
box.transform.rotate(new Vector3(0, 45, 0), false, false);
var material:BlinnPhongMaterial = new BlinnPhongMaterial();
Texture2D.load("res/layabox.png", Handler.create(null, function(tex:Texture2D):void {
    material.albedoTexture = tex;
}));
box.meshRenderer.material = material;
```


##### 	