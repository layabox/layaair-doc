# 物理形状扫描检测

###### *version :2.1.1   Update:2019-7-19*

La détection de forme physique par balayage est la détection d 'une collision par projection d' un segment de ligne selon une forme sélectionnée dans une scène.Il y a un test.`shapeCastAll`Et`shapeCast`Les deux interfaces, l 'une renvoyant tous les objets heurtés, l' autre renvoyant le premier objet touché.Cette détection par balayage est couramment utilisée pour la détection de rayons sous une forme personnalisée et pour la détection de collisions de trajectoires balistiques de forme.

Le code suivant provient de l 'exemple[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Physics3D&name=PhysicsWorld_RayShapeCast)- Oui.


```typescript

//创建球型碰撞器
var sphereCollider:Laya.SphereColliderShape = new Laya.SphereColliderShape(0.5);
//使用球型碰撞器进行形状检测
if (this.castAll) {
    //进行形状检测,检测所有碰撞的物体
    this.scene.physicsSimulation.shapeCastAll(sphereCollider, this.from, this.to, this.hitResults);
    for (i = 0, n = this.hitResults.length; i < n; i++)
        ((this.hitResults[i].collider.owner as Laya.MeshSprite3D).meshRenderer.sharedMaterial as Laya.BlinnPhongMaterial).albedoColor = new Laya.Vector4(1.0, 0.0, 0.0, 1.0);
} else {
    //进行形状检测,检测第一个碰撞物体
    if (this.scene.physicsSimulation.shapeCast(sphereCollider, this.from, this.to, this.hitResult))
        ((this.hitResult.collider.owner as Laya.MeshSprite3D).meshRenderer.sharedMaterial as Laya.BlinnPhongMaterial).albedoColor = new Laya.Vector4(1.0, 0.0, 0.0, 1.0);
}
```


> le modèle d 'étalement de rayons dans l' exemple a été créé à l 'aide d' un code uniquement pour faciliter l 'observation et la compréhension de la détection par balayage de formes.
]

[] (IMG / 1.png) <br > (Figure 1)

