#カメラキャプチャーターゲット

###### *version :2.0.1beta   Update:2019-3-19*

カメラを作る時、私たちは常にカメラの位置を調整して、ある三次元物体を表示したり、ある領域を表示したりする必要があります。初心者にとっては、まだ空間的な思考が習慣化されていないので、位置を調整するのに時間がかかります。

LayaAir 3 Dエンジン3 D変換は、ターゲットを捕捉するためのlook At（）方法を提供し、3 Dオブジェクトの位置合わせ句読点を自動的に調整する。カメラは私たちの画角を調整する目的にも使える。

！[](img/1.png)<br/>(図1)

以下のコードは公式の例から来ています。[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Camera&name=CameraLookAt))

例では、シーンではカプセル、円柱、立方体の3つの物体を並べ、マウスボタンをクリックして注視目標を切り替える。


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


！[](img/2 gif)<br/>(図2)