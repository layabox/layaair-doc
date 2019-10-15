#Direction Light紹介

###### *version :2.0.1beta   Update:2019-3-30*

Directionight（平行光）は点光とは大きく異なり、一定の方向があり、ラジアン値で設定でき、減衰や光照射範囲もなく、全シーンのモデルを照らします。3 D世界では常に一定方向の太陽光をシミュレートしている。


```typescript

//创建方向光
var directionLight = scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
//方向光的颜色
directionLight.color = new Laya.Vector3(1, 1, 1);
//设置平行光的方向
var mat = directionLight.transform.worldMatrix;
mat.setForward(new Laya.Vector3(-1.0, -1.0, -1.0));
directionLight.transform.worldMatrix=mat;
```


​**set Forward**平行光の方向は、それぞれx、y、z軸の方向を表しています。負の数は負の軸、正の数は正の軸、値の範囲は-1-0—1で、範囲を超えたら-1または1です。初心者たちはこの範囲で値を設定して方向の変化を観察することができます。

！[](img/1.png)<br/>(図1)

