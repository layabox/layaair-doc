# 摄像机捕捉目标

###### *version :2.0.1beta   Update:2019-3-19*

​	在创建摄像机时，我们经常需要调整摄像机的位置，用于对准显示某个三维物体，或显示某个区域。对于初学者来说，空间思维还未形成习惯，调整位置所花的时间会很多。

LayaAir 3D引擎3D变换提供了一个lookAt()方法，用于捕捉目标，自动调整3D对象对准目标点。摄像机也可以使用它达到我们的调整视角的目的。

![](img/1.png)<br>(图1)

下面代码来自于官方示例（[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Camera&name=CameraLookAt)）:

示例中在场景中摆放了胶囊体，圆柱体，正方体3个物体，通过鼠标点击按钮切换注视目标。

```typescript
//up向量
private var _up:Vector3 = new Vector3(0, 1, 0);
```

```typescript
//点击事件
changeActionButton.on(Event.CLICK, this, function():void{
    index++;
    if (index % 3 === 1 ){
        //摄像机捕捉模型目标
        camera.transform.lookAt(box.transform.position, _up);
    }
    else if (index % 3 === 2){
        //摄像机捕捉模型目标
        camera.transform.lookAt(cylinder.transform.position, _up);
    }
    else{
        //摄像机捕捉模型目标
        camera.transform.lookAt(capsule.transform.position, _up);
    }
});
```

![](img/2.gif)<br>(图2)