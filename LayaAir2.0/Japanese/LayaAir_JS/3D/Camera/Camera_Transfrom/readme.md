#カメラの動きと回転

###### *version :2.0.1beta   Update:2019-3-19*

カメラはSprite 3 Dに引き継がれ、3 D変換の操作ができるようになります。3 Dシーンの中でトレーンform属性によって回転が変化し、マルチアングルの撮影によって、観客や遊戯者がよりリアルな空間体験を得ることができます。

モバイルカメラ:


```typescript

//实例化一个相机，设置纵横比，0为自动匹配。0.1最近看到的距离，100最远看到的距离。
var camera = new Laya.Camera(0, 0.1, 100)
//移动相机，设置相机的向z轴移动3米。true代表是局部坐标，false是相对世界坐标。 
camera.transform.translate(new Laya.Vector3(0, 0, 3),false);
//加载到场景
scene.addChild(camera);
```


回転カメラ:


```typescript

//旋转相机。局部坐标，弧度制（false为角度制）。
camera.transform.rotate(new Laya.Vector3(0, 0, 3), true, true);
```



