#物理形状スキャン検出

###### *version :2.1.1   Update:2019-7-19*

物理形状スキャン検出は、シーン中に選択された形状で線分を投影して衝突を検出するものである。この検査はあります`shapeCastAll`和`shapeCast`二つのインターフェースは、前者は衝突したすべての物体を返し、後者は衝突した最初の物体を返します。この走査検出は，カスタム形状の放射線検出，形状弾道の衝突によく使われる。

以下のコードは例から来ています。[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Physics3D&name=PhysicsWorld_RayShapeCast))


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


>この例での放射線配置のモデルはコードを用いて作成されたものであり、形状走査検出を容易に観察し理解するためだけに作られたものである。
>

！[](img/1.png)<br/>(図1)

