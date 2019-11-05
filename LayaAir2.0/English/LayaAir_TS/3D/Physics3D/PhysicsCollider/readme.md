#Physical Collider

###### *version :2.1.1   Update:2019-7-19*

In LayaAir3D**Physics Collider**A physical collider is a static collider. It always stays in one place and never moves around. Rigid bodies collide with it, but they don't move it.

When Unity exports, if only`Collider`There's no rigid body. After derivation, there's a rigid body.`PhysicsCollider`Component. This component is often used to make stationary objects in the scene, or is often set as triggers.

####(1) Using code to create physical Colliders

In this brief introduction, use code to add physical collider. The following code simply creates a plane. As shown in Figure 1.


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


![] (img/1.png)<br> (Figure 1)

####(2) Obtaining the physical collider on the derived model

After exporting, you may need to adjust some properties of the physical collider. At this point, physical colliders need to be obtained from the derived model.


```typescript

//加载模型
Laya.Sprite3D.load("Conventional/shoot.lh",Laya.Handler.create(this,function(sp:Laya.Sprite3D){
    var cube = sp.getChildAt(0) as Laya.MeshSprite3D;
    //获取物理碰撞器
    var cubeCollider:Laya.PhysicsCollider = cube.getComponent(Laya.PhysicsCollider);
}));
```



