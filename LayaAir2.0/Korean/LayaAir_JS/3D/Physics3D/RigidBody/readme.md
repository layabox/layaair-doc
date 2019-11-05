#물리 강체

###### *version :2.1.1   Update:2019-7-19*


 **Rigidbody3D**강체는 동적 충돌기이다.어떤 물체는 중력의 영향을 받고, 스크립트의 힘을 받거나, 물리엔진을 통해 다른 물체와 상호, 모두 강체 구성 요소를 포함해야 한다.더 자세한 사용 상황은 강체 문서를 볼 수 있습니다:[地址](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=Core&class=laya.d3.physics.Rigidbody3D)；

####(1) 코드 사용 및 강체 추가

필요한 상황에서 우리는 코드를 통해 생성할 수 있는 방식을 상대에게 강체를 추가할 수 있다.

아래의 사례 코드 중 우리는 간단한 공을 만들었고, 공에 부딪치기와 강체를 더했다.


```typescript

//新建一个球体模型并添加到舞台上
var sphere = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createSphere(1)));
//新建一个球形的碰撞盒
var sphereShape = new Laya.SphereColliderShape(1);
//给球添加刚体
var sphereRigid = sphere.addComponent(Laya.Rigidbody3D);
//将碰撞盒添加到刚体上
sphereRigid.colliderShape = sphereShape;
```


다른 모형은 다른 메쉬 격격격과 콜리드 스톡을 만들어야 할 뿐이다.

####(2) 내보내기 모형상의 강체 가져오기

모델을 내보내면 강체의 물리 효과를 수정할 수 있으므로 대상에서 강체까지 가져야 한다.

아래의 예시 코드 는 강체 후 개정된 파라메트릭 인자 입니다.


```typescript

//加载模型
Laya.Sprite3D.load("Conventional/shoot.lh",Laya.Handler.create(this,function(sp){
    //获取到Meshsprite3d
    var cube = scene.addChild（sp.getChildAt(0);
    //获取刚体
    var cubeRigid = cube.getComponent(Laya.Rigidbody3D);
}));
```

