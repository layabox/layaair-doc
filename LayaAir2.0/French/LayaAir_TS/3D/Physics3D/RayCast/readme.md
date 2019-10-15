#Détection de rayonnement physique

###### *version :2.1.1   Update:2019-7-19*

Devant**Système graphique**Il y a un article sur les rayons.**Caméra**Comment créer un rayon à partir d 'une caméra, nous avons expliqué en détail l' utilisation des rayons.

L 'utilisation des propriétés de scénographie scene3d est au cœur de la détection de rayons dans le layaair3d.**Simulateur physique**".Pour plus de détails.[Api地址](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=3D&class=laya.d3.physics.PhysicsSimulation)".Les interfaces utilisées pour la détection des rayons sont de quatre types.`raycastFromTo`Oui.`raycastAllFromTo`Une catégorie,`rayCast`Oui.`rayCastAll`Une catégorie.Nous avons classé les deux premières dans la catégorie A et les deux autres dans la catégorie B.

[] (IMG / 1.png) <br > (Figure 1)

[] (IMG / 2.png) <br > (Figure 2)

La catégorie a utilise un seul point comme paramètre et la catégorie B utilise des rayons déjà créés, mais il faut définir la longueur des rayons.Et`All`Le procédé consiste simplement à détecter tous les objets, c 'est - à - dire à les pénétrer.Ce procédé`out:Vector.<hitresult>`- résultats de la collision [les éléments de la matrice seront récupérés].</hitresult>

On commence par la classe A.`raycastFromTo`Oui.`raycastAllFromTo`Ce code provient d 'exemples officiels[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Physics3D&name=PhysicsWorld_RayShapeCast));


```typescript

var hitResult:Laya.HitResult = new Laya.HitResult();
var hitResults = [];
//是否穿透
if (this.castAll) {
    //进行射线检测,检测所有碰撞的物体
    this.scene.physicsSimulation.raycastAllFromTo(this.from, this.to, this.hitResults);
    //遍历射线检测的结果
    for (i = 0, n = this.hitResults.length; i < n; i++)
        //将射线碰撞到的物体设置为红色
        ((this.hitResults[i].collider.owner as Laya.MeshSprite3D).meshRenderer.sharedMaterial as Laya.BlinnPhongMaterial).albedoColor = new Laya.Vector4(1.0, 0.0, 0.0, 1.0);
} else {
    //进行射线检测,检测第一个碰撞物体
    this.scene.physicsSimulation.raycastFromTo(this.from, this.to, this.hitResult);
    //将检测到的物体设置为红色
    ((this.hitResult.collider.owner as Laya.MeshSprite3D).meshRenderer.sharedMaterial as Laya.BlinnPhongMaterial).albedoColor = new Laya.Vector4(1.0, 0.0, 0.0, 1.0);
}
```


[] (IMG / 3.png) <br > (Figure 3)

[] (IMG / 4.png) <br > (Figure 4)

Catégorie B`rayCast`Oui.`rayCastAll`Method Used, this code is from the official example.([demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Camera&name=CameraRay)- Oui.

L 'exemple forme un rayon d' une surface de coupe proche à une surface de coupe éloignée en fonction d 'un point situé dans l' espace de l 'écran (point appuyé par la souris).Résultats (Figure 5)


```typescript

this.point.x = MouseManager.instance.mouseX;
this.point.y = MouseManager.instance.mouseY;
//产生射线
this._camera.viewportPointToRay(this.point,this._ray);
//拿到射线碰撞的物体
this._scene.physicsSimulation.rayCast(this._ray,this.outs);
//如果碰撞到物体
if (this.outs.length != 0) {
    for (var i = 0; i < this.outs.length; i++){
        //在射线击中的位置添加一个立方体
        this.addBoxXYZ(this.outs[i].point.x, this.outs[i].point.y, this.outs[i].point.z );
    }		
}

//在传入的x,y,z位置添加一个box
public addBoxXYZ(x, y, z ) {/**内容省略**/}
```


[] (IMG / 5.gif) <br > (Figure 5)