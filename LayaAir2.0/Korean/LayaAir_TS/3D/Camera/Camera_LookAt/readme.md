#카메라 목표 포착

###### *version :2.0.1beta   Update:2019-3-19*

카메라를 생성할 때, 카메라의 위치를 항상 조정해야 하며, 어떤 3차원 물체를 나타내거나 어떤 영역을 나타내는 데 사용된다.초보자에게 공간 사유는 아직 습관이 되지 않아 위치를 조정하는 시간이 많을 것이다.

Layaiair 3D 엔진 3D 변환은 lookAt () 방법을 제공하여 목표를 포착하고, 자동으로 3D 대상의 목표점을 맞추는 데 사용된다.카메라도 우리의 시각 조정의 목적을 사용할 수 있다.

[] (img/1.png)<br>(1)

다음 코드 는 공식 예제 () 에서 나온다[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Camera&name=CameraLookAt)）:

예를 들어 장면에서 캡슐체, 원기둥, 정방체 3개의 물체를 넣어 마우스 클릭 단추를 통해 목표를 바꾸었다.


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


[] (img/2.gif)<br>(2)