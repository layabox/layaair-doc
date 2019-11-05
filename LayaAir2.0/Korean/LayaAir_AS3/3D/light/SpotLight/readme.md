#스팟라이트 소개

###### *version :2.0.1beta   Update:2019-3-30*

스포트라이트는 특정 광원 방향에서 나오는 광선, 손전등 등.광조 구역은 거리 요인에 따라 점점 확대되고, 동시에 광광조 구역의 가장자리도 감퇴 현상이 있다.


```typescript

//聚光灯
var spotLight:SpotLight = scene.addChild(new SpotLight()) as SpotLight;
//设置聚光灯颜色
spotLight.color = new Vector3(1, 1, 0);
//设置聚光灯位置
spotLight.transform.position = new Vector3(0.0, 1.2, 0.0);
//设置聚光灯的方向
var mat:Matrix4x4 = spotLight.transform.worldMatrix;
mat.setForward(new Vector3(0.15, -1.0, 0.0));
directionLight.transform.worldMatrix=mat;
//设置聚光灯范围
spotLight.range = 6.0;
//设置聚光灯锥形角度
spotLight.spotAngle = 32;
```


**range**빛을 비추는 범위는 빛과 유사하고, 차이는 단지 빛을 모으는 방향이며, 빛은 방향이 없다.

**spotAngle**스포트라이트의 뿔 각도를 위해 설정한 수치가 작아질수록 스포트라이트가 작아질수록 반지광이 커진다.

[] (img/1.png)<br>(1)

