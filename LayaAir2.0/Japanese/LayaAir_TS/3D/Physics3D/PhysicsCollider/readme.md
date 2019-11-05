#物理衝突器

###### *version :2.1.1   Update:2019-7-19*

LayaAir 3 Dにおける**Physics Collider**物理衝突器は静的衝突器です。それはいつも同じところに留まります。いつまでもあちこち移動しません。衝突を経験したばかりですが、移動はしません。

Unityエクスポート時にのみ`Collider`剛体がありません。エクスポートしたらすぐです。`PhysicsCollider`コンポーネント。このコンポーネントは、シーン中に静止しているものを作るために使われたり、フリップフロップとして設定されていることが多いです。

####(1)コードを使って物理衝突器を作成する

ここでは，コードを用いて物理的衝突器を追加することを簡単に紹介した。下のコードは簡単に平面を作成します。図1に示すように。


```typescript

//平面
var plane = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createPlane(10, 10, 10, 10))) as Laya.MeshSprite3D;
//新建材质
var planeMat:Laya.BlinnPhongMaterial = new Laya.BlinnPhongMaterial();

Laya.Texture2D.load("res/threeDimen/Physics/grass.png", Laya.Handler.create(this, function(tex:Laya.Texture2D) {
    	planeMat.albedoTexture = tex;
}));
//设置纹理平铺和偏移
planeMat.tilingOffset = new Laya.Vector4(10, 10, 0, 0);
//设置材质
plane.meshRenderer.material = planeMat;

//平面添加物理碰撞体组件
var planeStaticCollider:Laya.PhysicsCollider = plane.addComponent(Laya.PhysicsCollider);
//创建盒子形状碰撞器
var planeShape:Laya.BoxColliderShape = new Laya.BoxColliderShape(10, 0, 10);
//物理碰撞体设置形状
planeStaticCollider.colliderShape = planeShape;
//物理碰撞体设置摩擦力
planeStaticCollider.friction = 2;
//物理碰撞体设置弹力
planeStaticCollider.restitution = 0.3;
```


！[](img/1.png)<br/>(図1)

####（2）導出モデル上の物理衝突器の取得

導出後、物理的衝突器のいくつかの属性を調整する必要があるかもしれない。この時は導出したモデルから物理衝突器を取得する必要があります。


```typescript

//加载模型
Laya.Sprite3D.load("Conventional/shoot.lh",Laya.Handler.create(this,function(sp:Laya.Sprite3D){
    var cube = sp.getChildAt(0) as Laya.MeshSprite3D;
    //获取物理碰撞器
    var cubeCollider:Laya.PhysicsCollider = cube.getComponent(Laya.PhysicsCollider);
}));
```



