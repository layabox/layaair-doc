#Masque visuel

###### *version :2.0.1beta   Update:2019-3-19*

Lorsque nous produisons des jeux, nous pourrions vouloir rendre invisibles certains objets sur la scène afin d 'atteindre l' effet "invisible".On en aura besoin.**Layer**Cette propriété.Nous pouvons configurer la couche graphique de l 'objet et la couche visuelle de la caméra pour obtenir l' effet souhaité.

**Tip**Dans le layaair, les caméras peuvent voir toutes les couches au début, de sorte qu 'il faut les appeler avant de les utiliser**Removealllayers**Procédé d 'élimination de toutes les couches.

Viens voir ce qu 'on a fait.

[] (IMG / 1.png) <br > (Figure 1)


```typescript

......
//设置图层
staticLayaMonkey.layer = 1;//本体猴
layaMonkey_clone1.layer = 2;
layaMonkey_clone2.layer = 3;
layaMonkey_clone3.layer = 4;
......
//移除所有图层
this.camera.removeAllLayers();
//添加显示图层(为相机添加一个蒙版)
this.camera.addLayer(5);
//显示用计数
this.layerIndex = 0
//给 ‘切换图层’ 按钮添加事件 每一次点击切换一个显示层
this.changeActionButton.on(Laya.Event.CLICK, this, function():void {
    //清除所有图层
    this.camera.removeAllLayers();
    //计数自加一
    this.layerIndex ++;
    //设置可视图层
    this.camera.addLayer(this.layerIndex%4 + 1);
    //将地板图层加入，地板不参与事件
    this.camera.addLayer(5);
});
```


Effets ajoutés (Figure 2):

[] (IMG / 2.gif) <br > (Figure 2)

Cet exemple[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Camera&name=CameraLayer));
