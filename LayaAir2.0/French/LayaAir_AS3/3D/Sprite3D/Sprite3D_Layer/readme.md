#Layer de sprite3d.

###### *version :2.0.1beta   Update:2019-4-13*

Sprite3d possède également les propriétés de Layer monture (couche graphique).Le paramètre d 'attribut peut fonctionner avec une couche de masque visuel, une détection de rayons, etc., au moyen d' une caméra.Exemple de masque de caméra[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Camera&name=CameraLayer)):


```typescript

//添加显示图层(为相机添加一个蒙版)
camera.addLayer(5);
//设置蒙版(所属图层)
layaMonkey_clone1.layer = 2;
layaMonkey_clone2.layer = 3;
layaMonkey_clone3.layer = 4;

......
//切换图层按钮事件监听
changeActionButton.on(Event.CLICK, this, function():void {
    camera.removeAllLayers();
    layerIndex ++;
    camera.addLayer(layerIndex%4 +1);
    camera.addLayer(5);
});
```


[] (IMG / 1.gif) <br > (Figure 1)
