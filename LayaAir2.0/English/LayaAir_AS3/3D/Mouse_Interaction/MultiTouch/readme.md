#The Use of Multi-touch

###### *version :2.1.1   Update:2019-8-2*

It also supports multi-touch in LayaAir3D, and is even more convenient to use than in 2D. Multi-touch in 2D is based on`Event`Incident`touches:Array`[read-only] touchpoint list attribute, which is troublesome to operate. But what's used in 3D is scene scenes.`input:Input3D`3D input attributes can be obtained anywhere, and it is very convenient to use.

>**Matters needing attention:**In the case of multi-point touch, only one ray will be emitted for detection, which is the center point of multiple touch points. If more than one ray is needed for detection, the developer has to deal with it himself.

**Input3D Details**

> attribute

![] (img/1.png)<br> (Figure 1)

> method

! [] (IMG / 2. PNG) < br > (Figure 2)

**Touch attribute**

![] (img/3.png) < br > (fig. 3)

The following sample code is excerpted from the official example（[demo地址](https://layaair2.ldc2.layabox.com/demo2/?language=ch&category=3d&group=MouseInteraction&name=MultiTouch))

A script was added to the monkey in the main class. At the same time, add another easy to display output on the stage.`Text`Text.

Script class:


```typescript

//重写脚本中的onUpdate方法
override public function onUpdate():void {
    var touchCount:int = _scene.input.touchCount();
    if (1 === touchCount){
        //判断是否为两指触控，撤去一根手指后引发的touchCount===1
        if (isTwoTouch){
            return;
        }
        _text.text = "触控点为1";
        //获取当前的触控点，数量为1
        var touch:Touch = _scene.input.getTouch(0);
        //是否为新一次触碰，并未发生移动
        if (first){
            //获取触碰点的位置
            lastPosition.x = touch.position.x;
            lastPosition.y = touch.position.y;
            first = false;
        }
        else{
            //移动触碰点
            var deltaY:int = touch.position.y - lastPosition.y;
            var deltaX:int = touch.position.x - lastPosition.x;
            lastPosition.x = touch.position.x;
            lastPosition.y = touch.position.y;
            //根据移动的距离进行旋转
            (owner as Sprite3D).transform.rotate(new Vector3(1 * deltaY /2, 1 * deltaX / 2, 0), true, false);
        }
    }
    else if (2 === touchCount){
        _text.text = "触控点为2";
        isTwoTouch = true;
        //获取两个触碰点
        var touch:Touch = _scene.input.getTouch(0);
        var touch2:Touch = _scene.input.getTouch(1);
        //是否为新一次触碰，并未发生移动
        if (first){
            //获取触碰点的位置
            disVector1.x = touch.position.x - touch2.position.x;
            disVector1.y = touch.position.y - touch2.position.y;
            distance = Vector2.scalarLength(disVector1);
            first = false;
        }
        else{
            disVector2.x = touch.position.x - touch2.position.x;
            disVector2.y = touch.position.y - touch2.position.y;
            var distance2:Number = Vector2.scalarLength(disVector2);
            //根据移动的距离进行缩放
            _camera.transform.translate(new Vector3(0, 0, -0.01 * (distance2 - distance)));
            distance = distance2;
        }	
    }
    else if (0 === touchCount){
        _text.text = "触控点归零";
        first = true;
        lastPosition.x = 0;
        lastPosition.y = 0;
        first = true;
        isTwoTouch = false;
    }
}
```


![] (img/4.gif) < br > (fig. 4)