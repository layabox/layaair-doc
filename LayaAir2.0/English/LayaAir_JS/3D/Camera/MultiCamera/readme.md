#Use of Multi-Camera Window

###### *version :2.2.0   Update:2019-8-24*

In the same scene, multiple cameras can be used, and when loaded into the scene, they will generate their own game view pictures. In the games we have encountered before, such as the two-person 3D game, two 3D cameras are used, one player is displayed on the left half of the screen and the other on the right half of the screen, which greatly enriches the gameplay.

However, the disadvantage of multiple cameras is very performance-intensive. The number of triangles in the model and DrawCall will increase exponentially, and multiple cameras will cause several times more performance loss. Therefore, developers need to consider it as appropriate.

The display size and position of 3D scene are different from that of 2D game. It is mainly controlled by the camera's viewport, through which the screen is divided.

In the following example, we create a scenario and simply load a model and separate the left and right view ports through ViewPort. The code is as follows:


```typescript

//创建场景
var scene = Laya.stage.addChild(new Laya.Scene3D());
//创建相机1
var camera1 = scene.addChild(new Laya.Camera(0, 0.1, 100));
//设置相机1清除颜色
camera1.clearColor = new Laya.Vector4(0.3, 0.3, 0.3, 1.0);
camera1.transform.translate(new Laya.Vector3(0, 0, 1.5));
//设置裁剪空间的视口
camera1.normalizedViewport = new Laya.Viewport(0, 0, 0.5, 1.0);

//创建相机2
var camera2 = scene.addChild(new Laya.Camera(0, 0.1, 100));
camera2.clearColor = new Laya.Vector4(0.0, 0.0, 1.0, 1.0);
camera2.transform.translate(new Laya.Vector3(0, 0.15, 0.5));
camera2.normalizedViewport = new Laya.Viewport(0.5, 0.0, 0.5, 0.5);

//添加平行光
var directionLight = scene.addChild(new Laya.DirectionLight());

//加载模型
Laya.Sprite3D.load("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh", Laya.Handler.create(null, function(sp){
    //将模型加到场景上
    var layaMonkey = scene.addChild(sp);
}))
```


Compile and run the above code, the effect is shown in Figure 6. Developers can also test that DrawCall and triangles are much less in a single camera. ([demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Camera&name=MultiCamera))

![] (img/1.png)<br> (Figure 1)

####How to dynamically modify Camera's view

In the example above, we set the viewport of the camera. Based on the above code, we dynamically modify the camera viewport.

**Be careful:** `Camera`Of`normalizedViewport`View Port and Clipping Space`viewport`The view of screen pixel coordinates are both get / set methods. Therefore, when modifying the parameters of the camera viewport, we can not simply modify the parameters of the viewport with knowledge, but also need to re-assign the parameters of the viewport.

> Dynamic Modification of Camera Viewport


```typescript

Laya.timer.once(3000,this,function () 
{	
    //获取第一个摄影的视口
    var viewport1 = camera1.normalizedViewport;
    //修改参数
    viewport1.width = 0.2;
    //重新赋值是视口
    camera1.normalizedViewport = viewport1;

    var viewport2 = camera2.normalizedViewport;
    viewport2.width = 0.8;
    viewport2.x = 0.2;
    camera2.normalizedViewport = viewport2;
});
```


![] (img/2.gif) <br> (Figure 2)

