#物理剛体

###### *version :2.1.1   Update:2019-7-19*


 **Rigidbod3 D**剛体は動的衝突器である。どの物体も重力に影響されたいと考えています。スクリプトによって与えられた力の作用や、物理エンジンによって他の物体と対話するためには、剛体のコンポーネントが必要です。詳細な使用状況は、剛体の文書を見ることができます。[地址](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=Core&class=laya.d3.physics.Rigidbody3D);

####(1)コードを使って剛体を作成し、追加する

必要な場合は、コードで作成したオブジェクトに剛体を加えることができます。

以下のコード例ではボールを簡単に作成し，ボールに衝突器と剛体を加えた。


```typescript

//新建一个球体模型并添加到舞台上
var sphere:Laya.MeshSprite3D = scene.addChild(new Laya.MeshSprite3D(PrimitiveMesh.createSphere(1))) as Laya.MeshSprite3D;
//新建一个球形的碰撞盒
var sphereShape:Laya.SphereColliderShape = new Laya.SphereColliderShape(1);
//给球添加刚体
var sphereRigid:Laya.Rigidbody3D = sphere.addComponent(Laya.Rigidbody3D);
//将碰撞盒添加到刚体上
sphereRigid.colliderShape = sphereShape;
```


異なるモデルは異なるMeshグリッドとCollidersShape衝突ボックスを作成するだけである。

####（2）導出モデル上の剛体を取得する

モデル導出後，剛体の物理的効果を修正する必要があり，その場合はオブジェクトから剛体を得る必要がある。

以下のコードの例は、剛体を取得した後、剛体のパラメータを変更します。


```typescript

//加载模型
Laya.Sprite3D.load("Conventional/shoot.lh",Laya.Handler.create(this,function(sp:Laya.Sprite3D){
    //获取到Meshsprite3d
    var cube = scene.addChild（sp.getChildAt(0)） as Laya.MeshSprite3D;
    //获取刚体
    var cubeRigid:Laya.Rigidbody3D = cube.getComponent(Laya.Rigidbody3D);
}));
```

