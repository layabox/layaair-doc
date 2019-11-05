#Physical ray testing

###### *version :2.1.1   Update:2019-7-19*

Ahead**Graphic System Concept**We have talked about the mathematical tool of ray, which is used in the following passage: X-ray, X-ray, X-ray, X-ray, X-ray, X-ray, X-ray, X-ray, X-ray and X-ray.**Video camera**This article talks about how to create a ray from a camera. Here we will explain the use of the ray in detail.

The core of ray detection in layaair3d is to use the**Physics Simulation Physical Simulator**。 Details can be viewed[Api地址](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=3D&class=laya.d3.physics.PhysicsSimulation)。 There are four interfaces for X-ray detection, which can be divided into two categories.`raycastFromTo`,`raycastAllFromTo`One type,`rayCast`,`rayCastAll`One category. Let's turn the first two into Class A and the second into Class B. Let's look at the API of these two methods:

![] (img/1.png)<br> (Figure 1)

![] (img/2.png)<br> (Figure 2)

Class A uses one or two points as parameters. Class B uses the created rays, but needs to set the length of the rays. While taking`All`The method is to detect all objects, that is, whether they penetrate the object. The method`out:Vector.<hitresult>`Collision results [array elements are recycled].</hitresult>

Let's show class A first.`raycastFromTo`,`raycastAllFromTo`Using this code, the code is derived from the official example（[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Physics3D&name=PhysicsWorld_RayShapeCast));


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


![] (img/3.png)<br> (fig. 3) Non-penetrating rays

![] (img/4.png)<br> (fig. 4) Penetrating rays

Class B`rayCast`,`rayCastAll`Method is used. This code is from the official example. ([demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Camera&name=CameraRay))

An example is based on a point in screen space (a point pressed by the mouse) to form a ray from a near cutting surface to a far cutting surface for ray detection. The effect is as follows (Fig. 5)


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


! [] (IMG / 5. GIF) < br > (Figure 5)