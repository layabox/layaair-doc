#多点タッチの使用

###### *version :2.1.1   Update:2019-8-2*

LayaAir 3 Dでも多点タッチをサポートしています。2 Dよりも使いやすいです。2 Dにおける多点タッチは、`Event`イベント中の`touches:Array`［read-only］ポイントリストの属性をタッチするのは、このように操作するのが面倒くさいです。でも3 Dで使うのはsceneシーンです。`input:Input3D`3 D入力属性は、どこでも入手できるので、とても便利です。

>**注意事項：**多点タッチの場合は、検出のために1つの放射だけが放射され、この点は複数のタッチポイントの中心点である。複数の放射線を検出するために必要な場合は、開発者自身が処理する必要があります。

**Input 3 D詳細**

>属性

！[](img/1.png)<br/>(図1)

>方法

！[](img/2 png)<br/>(図2)

**タッチのプロパティ**

！[](img/3 png)<br/>(図3)

以下のコード・セクションの例は、公式の例から選択されます。[demo地址](https://layaair2.ldc2.layabox.com/demo2/?language=ch&category=3d&group=MouseInteraction&name=MultiTouch)を選択します。

メインクラスでは猿にシナリオを追加しました。同時にステージに出力を表示するためのもう一つの便利なものを追加します。`Text`テキスト。

スクリプトクラス:


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


！[](img/4 gif)<br/>(図4)