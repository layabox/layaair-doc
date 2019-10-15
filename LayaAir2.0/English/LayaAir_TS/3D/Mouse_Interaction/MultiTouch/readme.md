#The Use of Multi-touch

###### *version :2.1.1   Update:2019-8-2*

It also supports multi-touch in LayaAir3D, and is even more convenient to use than in 2D. Multi-touch in 2D is based on`Event`Incident`touches:Array`[read-only] Touch Point List property, which is more cumbersome to operate. But what's used in 3D is scene scenes.`input:Input3D`3D input attributes can be obtained anywhere, and it is very convenient to use.

>**Matters needing attention:**In the case of multi-touch, only one ray is emitted for detection, which is the center of multiple contact points. If more than one ray is needed for detection, the developer has to deal with it himself.

**Input3D Details**

> attribute

![] (img/1.png)<br> (Figure 1)

> method

![] (img/2.png)<br> (Figure 2)

**Touch attribute**

![] (img/3.png) < br > (fig. 3)

The following sample code is excerpted from the official example（[demo地址](https://layaair2.ldc2.layabox.com/demo2/?language=ch&category=3d&group=MouseInteraction&name=MultiTouch))

Add script to monkey in main class. At the same time, add another easy to display output on the stage.`Text`Text.

Script class:


```typescript

//重写脚本中的onUpdate方法
onUpdate() {
    var touchCount = this._scene.input.touchCount();
    if (1 === touchCount){
        //判断是否为两指触控，撤去一根手指后引发的touchCount===1
        if (this.isTwoTouch){
            return;
        }
        this._text.text = "触控点为1";
        //获取当前的触控点，数量为1
        var touch = this._scene.input.getTouch(0);
        //是否为新一次触碰，并未发生移动
        if (this.first){
            //获取触碰点的位置
            this.lastPosition.x = this.touch.position.x;
            this.lastPosition.y = this.touch.position.y;
            first = false;
        }
        else{
            //移动触碰点
            var deltaY = this.touch.position.y - this.lastPosition.y;
            var deltaX = this.touch.position.x - this.lastPosition.x;
            this.lastPosition.x = this.touch.position.x;
            this.lastPosition.y = this.touch.position.y;
            //根据移动的距离进行旋转
            this.owner.transform.rotate(new Laya.Vector3(1 * deltaY /2, 1 * deltaX / 2, 0), true, false);
        }
    }
    else if (2 === touchCount){
        this._text.text = "触控点为2";
        this.isTwoTouch = true;
        //获取两个触碰点
        var touch = this._scene.input.getTouch(0);
        var touch2 = this._scene.input.getTouch(1);
        //是否为新一次触碰，并未发生移动
        if (this.first){
            //获取触碰点的位置
            this.disVector1.x = touch.position.x - touch2.position.x;
            this.disVector1.y = touch.position.y - touch2.position.y;
            this.distance = Laya.Vector2.scalarLength(this.disVector1);
            this.first = false;
        }
        else{
            this.disVector2.x = touch.position.x - touch2.position.x;
            this.disVector2.y = touch.position.y - touch2.position.y;
            var distance2 = Laya.Vector2.scalarLength(this.disVector2);
            //根据移动的距离进行缩放
            this._camera.transform.translate(new Laya.Vector3(0, 0, -0.01 * (this.distance2 - this.distance)));
            this.distance = this.distance2;
        }	
    }
    else if (0 === touchCount){
        this._text.text = "触控点归零";
        this.first = true;
        this.lastPosition.x = 0;
        this.lastPosition.y = 0;
        this.first = true;
        this.isTwoTouch = false;
    }
}
```


![] (img/4.gif) < br > (fig. 4)