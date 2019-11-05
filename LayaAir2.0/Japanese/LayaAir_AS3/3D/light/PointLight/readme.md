# PointLight介绍

###### *version :2.0.1beta   Update:2019-3-30*

PointLight（点光）は四方八方に光を放射する光源であり、全方向光または球状光とも呼ばれ、現実の点光源は電球やろうそくなどであり、光源に強度、色、減衰半径の属性があると感じられる。


```javascript

//创建点光源
var pointLight:PointLight = scene.addChild(new PointLight()) as PointLight;
//设置点光源位置
pointLight.transform.position = new Vector3(0.4, 0.4, 0.0);
//设置点光源的范围
pointLight.range = 6.0;
```


**レンゲ**点光源の範囲を設定するため、点光の照射範囲に相当します。数値が大きいほど、光照射範囲が大きくなります。

図1では、光照射範囲が大きくなく、光源の位置に問題があるため、光に照らされていないところは黒である。

！[](img/1.png)<br/>(図1)

