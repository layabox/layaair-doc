# Sprite3D的Layer

###### *version :2.0.1beta   Update:2019-4-13*

Sprite3D also has Layer mask properties. This property settings can be used in the case of using camera visible mask layer, ray detection and so on. The following excerpted example of Camera Mask layer（[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Camera&name=CameraLayer)):


```typescript

//添加显示图层(为相机添加一个蒙版)
this.camera.addLayer(5);
//设置蒙版(所属图层)
layaMonkey_clone1.layer = 2;
layaMonkey_clone2.layer = 3;
layaMonkey_clone3.layer = 4;

......
//切换图层按钮事件监听
this.changeActionButton.on(Laya.Event.CLICK, this, function():void {
    this.camera.removeAllLayers();
    this.layerIndex ++;
    this.camera.addLayer(this.layerIndex%4 +1);
    this.camera.addLayer(5);
});
```


![] (img/1.gif) <br> (Fig. 1)
