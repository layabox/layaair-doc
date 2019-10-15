# SpotLight介绍

###### *version :2.0.1beta   Update:2019-3-30*

スポットライトとは、特定の光源の方向から射出される光のことで、例えば懐中電灯、舞台の筒などです。光照射領域は距離因子によって徐々に拡大し，同時に光照射領域の端にも減衰現象がある。


```typescript

//聚光灯
var spotLight = scene.addChild(new Laya.SpotLight()) as Laya.SpotLight;
//设置聚光灯颜色
spotLight.color = new Laya.Vector3(1, 1, 0);
//设置聚光灯位置
spotLight.transform.position = new Laya.Vector3(0.0, 1.2, 0.0);
//设置聚光灯方向
var mat = spotLight.transform.worldMatrix;
mat.setForward(new Laya.Vector3(0.15, -1.0, 0.0));
spotLight.transform.worldMatrix = mat;
//设置聚光灯范围
spotLight.range = 6.0;
//设置聚光灯锥形角度
spotLight.spotAngle = 32;
```


**レンゲ**集光のための照射範囲は点光と類似しており、集光の方向のみが異なるが、点光は方向がない。

**spotAngle**スポットライトのテーパ角度として設定された値が小さいほど、絞りが小さいほど、逆に絞りが大きくなります。

！[](img/1.png)<br/>(図1)

