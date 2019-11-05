#Comment tester la souris d 'un elfe 3D

###### *version :2.1.1   Update:2019-8-2*

Pour pouvoir détecter un objet à layaair3d au moyen d 'une souris, il faut ajouter un collisionneur physique à l' objet.Il faut l'utiliser ici.**Système physique**Je l'ai dit.**Détection de rayons**Et**Collisionneur**Deux points de connaissance.

Le code ci - dessous est issu de l 'exemple officiel.[demo地址](https://layaair2.ldc2.layabox.com/demo2/?language=ch&category=3d&group=MouseInteraction&name=MouseInteraction)):

On a ajouté quatre singes à la scène principale, on a nommé les singes, on a ajusté la position et l 'échelle, et on a ajouté`PhysicsCollider`Un collisionneur physique et une cartouche de collision de type grille utilisée.

[] (IMG / 1.png) <br > (Figure 1)


```typescript

{
    //在舞台上添加鼠标事件监听
    Laya.stage.on(Laya.Event.MOUSE_DOWN,this, this.onMouseDown);
}
//点击触发事件
onMouseDown() {
    //记录点击到舞台上的点
    this.point.x = Laya.MouseManager.instance.mouseX;
   	this.point.y = Laya.MouseManager.instance.mouseY;
    //产生射线
    this.camera.viewportPointToRay(this.point,ray);
    //拿到射线碰撞的物体
    this.scene.physicsSimulation.rayCast(this.ray,this.outHitResult);
    //如果碰撞到物体
    if (this.outHitResult.succeeded)
    {
        //删除碰撞到的物体
        this.text.text = "碰撞到了" + this.outHitResult.collider.owner.name ;
        console.log("碰撞到物体！！")
    }

}
```


[] (IMG / 2.gif) <br > (Figure 2)

