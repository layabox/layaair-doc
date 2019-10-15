#Physical Collider

###### *version :2.1.1   Update:2019-7-19*

In LayaAir3D**Physics Collider**A physical collider is a static collider. It always stays in one place and never moves around. Rigid bodies collide with it, but they don't move it.

When Unity exports, if only`Collider`There's no rigid body. After derivation, there's a rigid body.`PhysicsCollider`Component. This component is often used to make stationary objects in the scene, or is often set as triggers.

####(1) Using code to create physical Colliders

Here we briefly introduce the use of code to add physical colliders. The following code simply creates a plane. As shown in Figure 1.


```typescript

//平面
var plane:MeshSprite3D = scene.addChild(new MeshSprite3D(PrimitiveMesh.createPlane(10, 10, 10, 10))) as MeshSprite3D;
//新建材质
var planeMat:BlinnPhongMaterial = new BlinnPhongMaterial();

Texture2D.load("res/threeDimen/Physics/grass.png", Handler.create(null, function(tex:Texture2D):void {
    	planeMat.albedoTexture = tex;
}));
//设置纹理平铺和偏移
planeMat.tilingOffset = new Vector4(10, 10, 0, 0);
//设置材质
plane.meshRenderer.material = planeMat;

//平面添加物理碰撞体组件
var planeStaticCollider:PhysicsCollider = plane.addComponent(PhysicsCollider);
//创建盒子形状碰撞器
var planeShape:BoxColliderShape = new BoxColliderShape(10, 0, 10);
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
Sprite3D.load("Conventional/shoot.lh",Handler.create(this,function(sp:Sprite3D):void{
    var cube:MeshSprite3D = sp.getChildAt(0) as MeshSprite3D;
    //获取物理碰撞器
    var cubeCollider:PhysicsCollider = cube.getComponent(PhysicsCollider);
}));
```



