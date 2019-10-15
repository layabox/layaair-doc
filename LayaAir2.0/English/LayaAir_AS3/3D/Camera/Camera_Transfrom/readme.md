#Camera movement and rotation

###### *version :2.0.1beta   Update:2019-3-19*

Camera is inherited from Sprite3D, which can also be transformed into 3D. Through its transformation attribute, it can move and rotate in the 3D scene and view from multiple angles, so that the audience or the player can get a more real space experience.

Mobile cameras:


```typescript

//实例化一个相机，设置纵横比，0为自动匹配。0.1最近看到的距离，100最远看到的距离。
var camera:Camera = new Camera(0, 0.1, 100)
//移动相机，设置相机的向z轴移动3米。true代表是局部坐标，false是相对世界坐标。 
camera.transform.translate(new Vector3(0, 0, 3),false);
//加载到场景
scene.addChild(camera);
```


Rotary camera:


```typescript

//旋转相机。局部坐标，弧度制（false为角度制）。
camera.transform.rotate(new Vector3(0, 0, 3), true, true);
```



