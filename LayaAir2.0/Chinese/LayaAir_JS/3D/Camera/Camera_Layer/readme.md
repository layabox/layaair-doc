# 可视遮罩层Layer

###### *version :2.7.0beta   Update:2020-6-11*

​	在我们制作游戏时，我们可能想要使某些在场景上的物体不可视，来达到‘ 隐身 ’的效果。这时候我们就可以用到 **Layer图层** 这个属性了。我们可以设置对象的图层和设置摄像机可视图层来达到想要的效果。

**Tip**:在LayaAir中，摄像机初始时可以看到所有图层的，所以在使用前需要调用**removeAllLayers**方法来移除所有图层。

来看下我们摆出来的场景。

![](img/1.png)<br>（图1）

```javascript
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
this.changeActionButton.on(Laya.Event.CLICK, this, function(){
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

添加后的效果（图2）：

![](img/2.gif)<br>(图2)

本次示例地址（[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Camera&name=CameraLayer)）；
