#Mise au point de jeux au moyen d 'un mélange de personnages 3D sur une carte 2D

###### *version :2.2.0bate4   Update:2019-9-11*

Sous la caméra de projection orthogonale, les coordonnées d 'écran sont converties en coordonnées mondiales.

Il faut l'utiliser.**Camera.**A`convertScreenCoordToOrthographicCoord`Interface

**Attention:**L 'interface doit correspondre aux valeurs des pixels de rendu.Modèle d 'adaptation du monde 2D**Modèle de résolution physique**Par conséquent, les développeurs doivent veiller à l 'uniformité des systèmes de référence lors de la transmission des valeurs, et peuvent consulter le document en ce qui concerne les modes d' adaptation.[屏幕适配的缩放模式详解](https://ldc2.layabox.com/doc/?nav=zh-as-1-8-3)".

[] (IMG / 1.png) <br > (Figure 1)

Le code ci - dessous ajoute un événement de clic à l 'exemple officiel qui permet d' ajouter un singe à la position correspondante en cliquant sur la scène.([demo地址](https://layaair2.ldc2.layabox.com/demo2/?language=ch&category=3d&group=Advance&name=Scene2DPlayer3D)).

Mettre un singe


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


[] (IMG / 2.gif) <br >

(Figure 2)
