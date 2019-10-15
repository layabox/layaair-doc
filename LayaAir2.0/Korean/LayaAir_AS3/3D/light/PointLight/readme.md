# PointLight介绍

###### *version :2.0.1beta   Update:2019-3-30*

포인티라이트(점광)는 사방팔방으로 광선을 발사하는 광원이며 전향광이나 구형의 빛이라 불리며, 현실의 점광원은 전구, 촛불, 촛불처럼 약간의 광원이 강도, 색감, 반경 속성을 느낄 수 있다.


```javascript

//创建点光源
var pointLight:PointLight = scene.addChild(new PointLight()) as PointLight;
//设置点光源位置
pointLight.transform.position = new Vector3(0.4, 0.4, 0.0);
//设置点光源的范围
pointLight.range = 6.0;
```


**range**점광원의 범위를 설정하기 위해 점광의 조명 범위에 해당하고, 수치가 크면 빛의 범위가 더욱 커진다.

그림 1 중 빛의 범위 설정이 크지 않고 광원의 위치 문제로 빛깔이 없는 곳은 검은색이다.

[] (img/1.png)<br>(1)

