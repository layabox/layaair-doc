# 如何对3D精灵进行鼠标检测

###### *version :2.1.1   Update:2019-8-2*


在LayaAir3D中想要能使用鼠标检测到物体，就必须在物体上添加物理碰撞器。这里就要用到在**physical system**As mentioned in the passage**Radiographic testing**and**Collider**Two knowledge points.

The following code is from the official example（[demo地址](https://layaair2.ldc2.layabox.com/demo2/?language=ch&category=3d&group=MouseInteraction&name=MouseInteraction)):

In the main class, we added four monkeys to the scene, named the monkeys separately, adjusted the position and zoom, and added`PhysicsCollider`Physical Collider and grid collision box.

![] (img/1.png)<br> (Figure 1)


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


![] (img/2.gif) <br> (Figure 2)

