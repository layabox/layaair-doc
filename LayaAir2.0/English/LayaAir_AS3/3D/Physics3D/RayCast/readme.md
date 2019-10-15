#Physical Radiation Detection

###### *version :2.1.1   Update:2019-7-19*

Ahead**Graphic System Concept**We have talked about the mathematical tool of ray, which is used in the following passage: X-ray, X-ray, X-ray, X-ray, X-ray, X-ray, X-ray, X-ray, X-ray and X-ray.**Video camera**This article describes how to create a ray from the camera. Here we will explain the use of ray in detail.

The core of ray detection in LayaAir3D is using Scene3D scene attributes.**Physics Simulation Physical Simulator**。 Details can be viewed[Api地址](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=3D&class=laya.d3.physics.PhysicsSimulation)。 There are four interfaces for X-ray detection, which can be divided into two categories.`raycastFromTo`,`raycastAllFromTo`One type,`rayCast`,`rayCastAll`One category. Let's turn the first two into class A and the second into class B. let's look at the API of these two methods:

![] (img/1.png)<br> (Figure 1)

![] (img/2.png)<br> (Figure 2)

Class A uses one or two points as parameters. Class B uses the created rays, but needs to set the length of the rays. While taking`All`The method is to detect all objects, that is, whether they penetrate the object. The method`out:Vector.<hitresult>`- collision result [array elements will be recycled].</hitresult>

Let's show a`raycastFromTo`,`raycastAllFromTo`Using this code, the code is derived from the official example（[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Physics3D&name=PhysicsWorld_RayShapeCast));


```typescript

var hitResult:HitResult = new HitResult();
var hitResults:Vector.<HitResult> = new Vector.<HitResult>();
//是否穿透
if (castAll) {
    //进行射线检测,检测所有碰撞的物体
    scene.physicsSimulation.raycastAllFromTo(from, to, hitResults);
    //遍历射线检测的结果
    for (i = 0, n = hitResults.length; i < n; i++)
        //将射线碰撞到的物体设置为红色
        ((hitResults[i].collider.owner as MeshSprite3D).meshRenderer.sharedMaterial as BlinnPhongMaterial).albedoColor = new Vector4(1.0, 0.0, 0.0, 1.0);
} else {
    //进行射线检测,检测第一个碰撞物体
    scene.physicsSimulation.raycastFromTo(from, to, hitResult);
    //将检测到的物体设置为红色
    ((hitResult.collider.owner as MeshSprite3D).meshRenderer.sharedMaterial as BlinnPhongMaterial).albedoColor = new Vector4(1.0, 0.0, 0.0, 1.0);
}
```


![] (img/3.png)<br> (fig. 3) Non-penetrating rays

![] (img/4.png)<br> (fig. 4) Penetrating rays

Class B`rayCast`,`rayCastAll`Method is used. This code is from the official example. ([demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Camera&name=CameraRay))

According to a point in the screen space (the point pressed by the mouse), the example forms a ray from the near cutting surface to the far cutting surface for ray detection. The effect is as follows (Fig. 5)


```typescript

point.x = MouseManager.instance.mouseX;
point.y = MouseManager.instance.mouseY;
//产生射线
_camera.viewportPointToRay(point,_ray);
//拿到射线碰撞的物体
_scene.physicsSimulation.rayCast(_ray,outs);
//如果碰撞到物体
if (outs.length != 0) {
    for (var i:int = 0; i < outs.length; i++){
        //在射线击中的位置添加一个立方体
        addBoxXYZ(outs[i].point.x, outs[i].point.y, outs[i].point.z );
    }		
}

//在传入的x,y,z位置添加一个box
public function addBoxXYZ(x:int, y:int, z:int ):void {/**内容省略**/}
```


![] (img/5.gif) <br> (Fig. 5)