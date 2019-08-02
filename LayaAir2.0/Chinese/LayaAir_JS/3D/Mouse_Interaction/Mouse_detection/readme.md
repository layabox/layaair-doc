# 如何对3D精灵进行鼠标检测

###### *version :2.1.1   Update:2019-8-2*

在LayaAir3D中想要能使用鼠标检测到物体，就必须在物体上添加物理碰撞器。这里就要用到在**物理系统**篇讲到过的 **射线检测** 和 **碰撞器** 两个知识点。

下面的代码来自于官方示例（[demo地址](https://layaair2.ldc2.layabox.com/demo2/?language=ch&category=3d&group=MouseInteraction&name=MouseInteraction)）：

在主类中我们再场景上添加了4个猴，对猴子分别取名，并且调整了位置和缩放，并且添加了 `PhysicsCollider` 物理碰撞器，并且使用的网格型碰撞盒。

![](img/1.png)<br>(图1)

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

![](img/2.gif)<br>(图2)

