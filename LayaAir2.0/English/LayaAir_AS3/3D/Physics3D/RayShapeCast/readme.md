#Scanning Detection of Physical Shape

###### *version :2.1.1   Update:2019-7-19*

Physical shape scanning detection is to detect collisions by projecting a line segment according to a selected shape in the scene. This test has`shapeCastAll`and`shapeCast`Two interfaces, the former returns all collision objects, and the latter returns the first collision object. This kind of scanning detection is often used in the ray detection of custom shape and the collision of shape trajectory.

The following code comes from an example（[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Physics3D&name=PhysicsWorld_RayShapeCast))


```typescript

//创建球型碰撞器
var sphereCollider:SphereColliderShape = new SphereColliderShape(0.5);
//使用球型碰撞器进行形状检测
if (castAll) {
    //进行形状检测,检测所有碰撞的物体
    scene.physicsSimulation.shapeCastAll(sphereCollider, from, to, hitResults);
    for (i = 0, n = hitResults.length; i < n; i++)
        ((hitResults[i].collider.owner as MeshSprite3D).meshRenderer.sharedMaterial as BlinnPhongMaterial).albedoColor = new Vector4(1.0, 0.0, 0.0, 1.0);
} else {
    //进行形状检测,检测第一个碰撞物体
    if (scene.physicsSimulation.shapeCast(sphereCollider, from, to, hitResult))
        ((hitResult.collider.owner as MeshSprite3D).meshRenderer.sharedMaterial as BlinnPhongMaterial).albedoColor = new Vector4(1.0, 0.0, 0.0, 1.0);
}
```


> The translucent model of the ray placement in this example was created using code, just to facilitate observation and understanding of shape scanning detection.
>

! [] (IMG / 1. PNG) < br > (Figure 1)

