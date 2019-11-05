#どのように3 D精霊をマウスで検査しますか？

###### *version :2.1.1   Update:2019-8-2*

LayaAir 3 Dでマウスを使って物体を検出するには、物体に物理的衝突器を追加しなければなりません。ここで使います。**物理システム**編で述べたことのある**放射線検出**和**衝突器**二つの知識点。

以下のコードは公式の例から来ています。[demo地址](https://layaair2.ldc2.layabox.com/demo2/?language=ch&category=3d&group=MouseInteraction&name=MouseInteraction))

メインクラスでは4つのサルを追加し、それぞれ名前をつけて位置とズームを調整しました。`PhysicsCollider`物理衝突器と使用するメッシュ型の衝突箱。

！[](img/1.png)<br/>(図1)


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


！[](img/2 gif)<br/>(図2)

