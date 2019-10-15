#How to Detect 3D Elves with Mouse

###### *version :2.1.1   Update:2019-8-2*

In LayaAir3D, a physical collider must be added to an object to detect it with a mouse. Here's where it's going to be used in the ___________**physical system**As mentioned in the passage**Radiographic testing**and**Collider**Two knowledge points.

The following code is from the official example（[demo地址](https://layaair2.ldc2.layabox.com/demo2/?language=ch&category=3d&group=MouseInteraction&name=MouseInteraction)):

In the main class, we added four monkeys to the scene, named the monkeys separately, adjusted the position and zoom, and added`PhysicsCollider`Physical Collider and grid collision box.

![] (img/1.png)<br> (Figure 1)


```typescript

{
    //在舞台上添加鼠标事件监听
    Laya.stage.on(Event.MOUSE_DOWN,this, onMouseDown);
}
//点击触发事件
private function onMouseDown():void {
    //记录点击到舞台上的点
    point.x = MouseManager.instance.mouseX;
   	point.y = MouseManager.instance.mouseY;
    //产生射线
    _camera.viewportPointToRay(point,_ray);
    //拿到射线碰撞的物体
    _scene.physicsSimulation.rayCast(_ray,_outHitResult);
    //如果碰撞到物体
    if (_outHitResult.succeeded)
    {
        //删除碰撞到的物体
        text.text = "碰撞到了" + _outHitResult.collider.owner.name ;
        trace("碰撞到物体！！")
    }

}
```


![] (img/2.gif) <br> (Figure 2)

