#Visual mask Layer

###### *version :2.0.1beta   Update:2019-3-19*

When we make games, we may want to make some objects in the scene invisible to achieve the effect of "stealth". And then we can use it.**Layer layer**This property. We can set the layer of the object and the visual layer of the camera to achieve the desired effect.

**Tip**In LayaAir, the camera can see all the layers at the beginning, so it needs to be called before it can be used.**RemoveAll Layers**Method to remove all layers.

Let's take a look at the scene we've set up.

![] (img/1.png)<br> (Figure 1)


```typescript

......
//设置图层
staticLayaMonkey.layer = 1;//本体猴
layaMonkey_clone1.layer = 2;
layaMonkey_clone2.layer = 3;
layaMonkey_clone3.layer = 4;
......
//移除所有图层
camera.removeAllLayers();
//添加显示图层(为相机添加一个蒙版)
camera.addLayer(5);
//显示用计数
layerIndex = 0
//给 ‘切换图层’ 按钮添加事件 每一次点击切换一个显示层
changeActionButton.on(Event.CLICK, this, function():void {
    //清除所有图层
    camera.removeAllLayers();
    //计数自加一
    layerIndex ++;
    //设置可视图层
    camera.addLayer(layerIndex%4 + 1);
    //将地板图层加入，地板不参与事件
    camera.addLayer(5);
});
```


The added effect (Figure 2):

! [] (IMG / 2. GIF) < br > (Figure 2)

This example（[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Camera&name=CameraLayer));
