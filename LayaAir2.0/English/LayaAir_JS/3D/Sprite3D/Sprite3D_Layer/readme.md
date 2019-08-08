# Sprite3D的Layer

###### *version :2.0.1beta   Update:2019-4-13*

Sprite3D也有Layer蒙版（图层）属性。该属性设置可以在使用摄影机可视遮罩层，射线检测等情况下起作用。下面节选自的摄影机遮罩层示例（[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Camera&name=CameraLayer)）：

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

![](img/1.gif)<br>(图1)
