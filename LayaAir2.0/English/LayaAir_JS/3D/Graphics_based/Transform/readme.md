#Transform Transform in LayaAir3D

In the example code, transform is a transformation object.（[Transform3D](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=Core&class=laya.d3.core.Transform3D)API), which is very important in the 3D world, is used for all the changes of display objects.

Two transformations, translation and rotate, have been used in the sample code, and the values of x, y and Z are represented by three-dimensional vectors. Both methods can set whether to move or rotate in local space in the parameters.


```typescript

	//移动摄像机
	camera.transform.translate(new Laya.Vector3(0, 3, 3));
	//旋转摄像机
	camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
```


As for rotation, there are two rotation interfaces in transform3d, one is angle / radian rotation`rotate`The other is Euler rotation.`localRotationEuler:Vector3`。

![] (img/1.png)<br> (Figure 1)

Official examples are excerpted for the convenience of observation.（[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Sprite3D&name=TransformDemo)) Code, first we**Clone**Two monkeys (the knowledge points of cloning will be explained in detail in the chapter of Sprite3D) to see the effect, and to observe the location of our two monkeys after cloning.


```typescript


//克隆sprite3d
var layaMonkey_clone1 = Laya.Sprite3D.instantiate(staticLayaMonkey, _scene, false, new Laya.Vector3(0.0, 0, 0.5));
var layaMonkey_clone2 = Laya.Sprite3D.instantiate(staticLayaMonkey, _scene, false, new Laya.Vector3(0.0, 0, 0.5));
var layaMonkey_clone3 = Laya.Sprite3D.instantiate(staticLayaMonkey, _scene, false, new Laya.Vector3(0.0, 0, 0.5));
//平移
layaMonkey_clone1.transform.translate(new Laya.Vector3(1.5, 0, 0.0));
layaMonkey_clone2.transform.translate(new Laya.Vector3( -1.5, 0, 0.0));
layaMonkey_clone3.transform.translate(new Laya.Vector3( 2.5, 0, 0.0));
```


![] (img/2.png)<br> (Figure 2)

Then we test our rotation sum.**zoom**Transformation. We rotated clone 1 90 degrees on the Y axis and set its zoom value to (0.5, 0.5, 0.5). Look at the effect again. This zoom uses local zoom. The world zoom has the same origin as the local zoom. The reference coordinate system of zoom is different, and the multiple of the world zoom is based on the whole situation.


```typescript

//旋转
layaMonkey_clone2.transform.rotate(new Laya.Vector3(0, 60, 0), false, false);
//缩放
var scale = new Laya.Vector3(0.1, 0.1, 0.1);
layaMonkey_clone3.transform.localScale = scale;
```


![] (img/3.png) < br > (fig. 3)

In addition to the 3 transformations described above, there are some other commonly used attributes and methods in transformation:

> method

`lookAt(target:Vector3, up:Vector3, isLocal:Boolean = false):void`Observe the target position.

> attribute

`localPosition:Vector3`Local position.

`localScale:Vector3`Zoom.

`localMatrix:Matrix4x4`Local matrix.

`position:Vector3`World position.

`localRotation:Quaternion`Local rotation.

`scale:Vector3`World zoom.

`worldMatrix:Matrix4x4`World matrix

`rotation:Quaternion`The world revolves.

`right:Vector3`[read-only] Gets to the right.

`forward:Vector3`[read-only] Gets the forward direction.


####Son-father relationship in 3D world

In the 3D world, the parent node transforms and its children follow the response transformation. However, the transformation of child nodes does not affect the parent object.