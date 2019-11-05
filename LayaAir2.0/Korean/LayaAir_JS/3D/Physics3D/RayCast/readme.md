#물리선 검사

###### *version :2.1.1   Update:2019-7-19*

앞**그래픽 시스템 개념**편 에는 방사선 이 수학 도구 가 있다**카메라**편은 어떻게 카메라에서 사선을 만드는 것인지 여기에서 우리는 사선의 사용을 상세하게 설명했다.

Layaiar3D에서 사선 검사를 실현하는 핵심은 Sce3D 장면 속성 중**Physicssimulation 물리 시뮬레이터**.자세한 사정은 살펴볼 수 있다[Api地址](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=3D&class=laya.d3.physics.PhysicsSimulation).사선 검사 사용 인터페이스는 4개로 두 종류로 나뉜다.`raycastFromTo`,`raycastAllFromTo`일류`rayCast`,`rayCastAll`일류우리는 앞으로 A 류가 되고 뒤에는 B 류로, 이 두 가지 방법의 api 를 보자.

[] (img/1.png)<br>(1)

[] (img/2.png)<br>(2)

A 류는 두 가지 점을 인자로 사용하고, B 류에서 사용한 사선을 이미 세웠지만 사선 길이를 설정해야 한다.띠다`All`모든 물체를 검출할지 여부는 물체인지 여부다.이런 방법의`out:Vector.<hitresult>`충돌 결과 [디지털 요소가 회수된다].</hitresult>

다음은 A 류 먼저 보여드릴게요.`raycastFromTo`,`raycastAllFromTo`의 사용, 이 부호 는 관방 의 예제 (() 에서 비롯된다[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Physics3D&name=PhysicsWorld_RayShapeCast)성


```typescript

this.hitResult = new Laya.HitResult();
this.hitResults= [];
//是否穿透
if (this.castAll) {
    //进行射线检测,检测所有碰撞的物体
    this.scene.physicsSimulation.raycastAllFromTo(this.from, this.to, this.hitResults);
    //遍历射线检测的结果
    for (i = 0, n = this.hitResults.length; i < n; i++)
        //将射线碰撞到的物体设置为红色
        this.hitResults[i].collider.owner.meshRenderer.sharedMaterial.albedoColor = new Laya.Vector4(1.0, 0.0, 0.0, 1.0);
} else {
    //进行射线检测,检测第一个碰撞物体
    this.scene.physicsSimulation.raycastFromTo(this.from, this.to, this.hitResult);
    //将检测到的物体设置为红色
    this.hitResult.collider.owner.meshRenderer.sharedMaterial.albedoColor = new Laya.Vector4(1.0, 0.0, 0.0, 1.0);
}
```


[] (img/3.png)<br>(3)뚫지 않는 사선

[] (img/4.png)<br>(4)뚫은 사선

B 류`rayCast`,`rayCastAll`방법 사용, 이 단락은 공식 예로부터 나온다.과[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Camera&name=CameraRay)차다

예례는 화면 공간 중 한 점 (마우스가 눌렀던 점) 에 따라 가까운 재단면을 원재단하여 면의 사선 검출을 진행한다.효과 (그림 5)


```typescript

this.point.x = Laya.MouseManager.instance.mouseX;
this.point.y = Laya.MouseManager.instance.mouseY;
//产生射线
this.camera.viewportPointToRay(this.point,this._ray);
//拿到射线碰撞的物体
this.scene.physicsSimulation.rayCast(this._ray,this.outs);
//如果碰撞到物体
if (this.outs.length != 0) {
    for (var i = 0; i < this.outs.length; i++){
        //在射线击中的位置添加一个立方体
       this.addBoxXYZ(this.outs[i].point.x, this.outs[i].point.y, this.outs[i].point.z );
    }		
}

//在传入的x,y,z位置添加一个box
addBoxXYZ(x, y, z) {/**内容省略**/}
```


[] (img/5.gif)<br>(5)