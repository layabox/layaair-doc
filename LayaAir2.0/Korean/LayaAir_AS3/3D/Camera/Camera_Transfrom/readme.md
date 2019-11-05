#카메라의 이동과 회전

###### *version :2.0.1beta   Update:2019-3-19*

카메라는 Sprite3D 를 상속해 3D의 변환을 할 수 있으며, transform 속성을 3D 장면에서 이동 변화를 거듭하고, 관중이나 유희자들이 더 리얼한 공간 체험을 얻을 수 있다.

이동 카메라:


```typescript

//实例化一个相机，设置纵横比，0为自动匹配。0.1最近看到的距离，100最远看到的距离。
var camera:Camera = new Camera(0, 0.1, 100)
//移动相机，设置相机的向z轴移动3米。true代表是局部坐标，false是相对世界坐标。 
camera.transform.translate(new Vector3(0, 0, 3),false);
//加载到场景
scene.addChild(camera);
```


회전 카메라:


```typescript

//旋转相机。局部坐标，弧度制（false为角度制）。
camera.transform.rotate(new Vector3(0, 0, 3), true, true);
```



