#Sprite3D Layer

###### *version :2.0.1beta   Update:2019-4-13*

Sprite3D 도 Layer (도층) 속성이 있다.이 속성 설정은 카메라를 이용할 수 있으며 가시 커버층, 사선 검사 등을 통해 작용할 수 있다.다음날 선택한 카메라 커버층 예례[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Camera&name=CameraLayer)）：


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


[] (img/1.gif)<br>(1)
