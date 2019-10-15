#Scanning Detection of Physical Shape

###### *version :2.1.1   Update:2019-7-19*

Physical shape scanning detection is to detect collisions by projecting a line segment according to a selected shape in the scene. This test has`shapeCastAll`and`shapeCast`Two interfaces, the former returns all collision objects, and the latter returns the first collision object. This scanning detection is often used for self-defined shape ray detection, shape trajectory collision.

The following code comes from an example（[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Physics3D&name=PhysicsWorld_RayShapeCast))


```typescript

//创建球型碰撞器
var sphereCollider = new Laya.SphereColliderShape(0.5);
//使用球型碰撞器进行形状检测
if (this.castAll) {
    //进行形状检测,检测所有碰撞的物体
    this.scene.physicsSimulation.shapeCastAll(sphereCollider, this.from, this.to, this.hitResults);
    for (i = 0, n = this.hitResults.length; i < n; i++)
        this.hitResults[i].collider.owner.meshRenderer.sharedMaterial.albedoColor = new Laya.Vector4(1.0, 0.0, 0.0, 1.0);
} else {
    //进行形状检测,检测第一个碰撞物体
    if (this.scene.physicsSimulation.shapeCast(sphereCollider, this.from, this.to, this.hitResult))
        this.hitResult.collider.owner.meshRenderer.sharedMaterial.albedoColor = new Laya.Vector4(1.0, 0.0, 0.0, 1.0);
}
```


> The model of the ray placement in this example was created using code, just to facilitate observation and understanding of shape scanning detection.
>

![] (img/1.png)<br> (Figure 1)

