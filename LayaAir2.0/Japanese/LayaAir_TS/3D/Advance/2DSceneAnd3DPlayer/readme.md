#2 Dマップ3 Dキャラクターをミックスしたゲーム開発

###### *version :2.2.0bate4   Update:2019-9-11*

LayaAir 3 Dでは、直交投影カメラの下で、画面座標が世界座標に変換されるのをサポートします。

これは使うべきです**Camera**の`convertScreenCoordToOrthographicCoord`インターフェース

**注意:**このインターフェースはレンダリングピクセルの値に対応する必要があります。2 D世界の適応モード（使用しました。**物理解像度モード**また、スケーリングが可能な適応モードを使用していますので、開発者は、値を伝える際には、統一参照系に注意しなければなりません。適応モードについては、具体的にドキュメントを見ることができます。[屏幕适配的缩放模式详解](https://ldc2.layabox.com/doc/?nav=zh-as-1-8-3)。

！[](img/1.png)<br/>(図1)

以下のコードは公式の例に基づいてクリックイベントを追加しました。クリックシーンを通じてサルを対応の場所に追加することができます。([demo地址](https://layaair2.ldc2.layabox.com/demo2/?language=ch&category=3d&group=Advance&name=Scene2DPlayer3D)を選択します。

>サルを置く


```typescript

//监听一次点击事件
Laya.stage.once(Laya.Event.MOUSE_DOWN,this,function () 
{
    scene.addChild(layaMonkey);
    this._layaMonkey = layaMonkey;
    //设置缩放
    var tmpLocalScale = layaMonkey.transform.localScale;
    tmpLocalScale.setValue(0.3, 0.3, 0.3);
    layaMonkey.transform.localScale = tmpLocalScale;
    /*添加部分*/
    _pos.x = Laya.stage.mouseX;
    _pos.y = Laya.stage.mouseY;
    
    //转换2D屏幕坐标系统到3D正交投影下的坐标系统
    camera.convertScreenCoordToOrthographicCoord(this._pos, this._translate);
    layaMonkey.transform.position = _translate;
    //设置选择
    var tmpRotationEuler = layaMonkey.transform.rotationEuler;
    tmpRotationEuler.setValue(-30, 0, 0);
    layaMonkey.transform.rotationEuler = tmpRotationEuler;
});
```


！[](img/2 gif)<br/>

（図2）
