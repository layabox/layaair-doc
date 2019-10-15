#물리 충돌기

###### *version :2.1.1   Update:2019-7-19*

Layair3D 중**Physicscollider**물리 충돌기는 정적 충돌기다.그것은 항상 한 곳에 머무르고, 영원히 사방으로 이동하지 않을 것이다.방금 그것과 충돌이 발생했다는 것을 깨달았지만 그것을 옮기지 않았다.

유닛 내보낼 때`Collider`강체 가 없으면 내보내면 바로`PhysicsCollider`구성 요소.이 구성품은 제작 장면에서 움직이지 않는 물체를 정지하거나 트리트기로 자주 사용한다.

####(1) 코드 사용 물리적 충돌기 만들기

여기에서 간단한 소개로 물리적 충돌기를 추가합니다.아래의 코드가 간단하게 평면을 만들었습니다.그림 하나 그대로.


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


[] (img/1.png)<br>(1)

####(2) 모형상 내보내는 물리 충돌기 가져오기

내보내면 물리적 충돌기의 일부 속성을 조절해야 한다.이때 내보내는 모형에서 물리적 충돌기를 가져야 한다.


```typescript

//加载模型
Sprite3D.load("Conventional/shoot.lh",Handler.create(this,function(sp:Sprite3D):void{
    var cube:MeshSprite3D = sp.getChildAt(0) as MeshSprite3D;
    //获取物理碰撞器
    var cubeCollider:PhysicsCollider = cube.getComponent(PhysicsCollider);
}));
```



