# 摄像机捕捉目标

###### *version :2.0.1beta   Update:2019-3-19*

When creating a camera, we often need to adjust the position of the camera to show a three-dimensional object or display an area. For beginners, spatial thinking has not yet formed a habit, adjusting the position will take a lot of time.

The 3D transformation of LayaAir 3D engine provides a lookAt () method for capturing targets and automatically adjusting 3D objects to target points. Cameras can also be used to adjust our perspective.

![] (img/1.png)<br> (Figure 1)

The following code is from the official example（[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Camera&name=CameraLookAt)):

In the example, three objects, capsule, cylinder and cube, are placed in the scene, and the target is switched by clicking the button of the mouse.


```typescript

//up向量
private _up = new Laya.Vector3(0, 1, 0);
```



```typescript

//点击事件
this.changeActionButton.on(Laya.Event.CLICK, this, function(){
    this.index++;
    if (this.index % 3 === 1 ){
        //摄像机捕捉模型目标
        this.camera.transform.lookAt(this.box.transform.position, this._up);
    }
    else if (this.index % 3 === 2){
        //摄像机捕捉模型目标
        this.camera.transform.lookAt(this.cylinder.transform.position, this._up);
    }
    else{
        //摄像机捕捉模型目标
        this.camera.transform.lookAt(this.capsule.transform.position,this._up);
    }
});
```


![] (img/2.gif) <br> (Figure 2)