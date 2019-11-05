#카메라 의 정교 투영 과 투시 투영

###### *version :2.0.1beta   Update:2019-3-19*

우리가 세계를 관찰할 때는 ‘가까운 크기’의 시스루 효과를 가진 세계, 3D 엔진에서 더 나은 시뮬레이션의 세계를 위해 묵묵한 카메라는 ‘투시 투시 투영’의 효과를 가지고 있다.

[] (img/1.png)<br>(1) 기본 투영 효과

그러나 일부 게임이 있다. 특히 45도 시각을 기울인 2D, 3D 혼합게임으로, 게임 화면은 시스루를 할 수 없다. 그렇다면 이때 카메라를 ‘정교투영’으로 설정해야 한다. 큰 크기의 시스루 효과를 내지 않게 한다.


```typescript

//正交投影属性设置
camera.orthographicProjection = true;
//正交垂直矩阵距离,控制3D物体远近与显示大小
camera.orthographicVerticalSize = 7;
//移动摄像机位置
camera.transform.translate(new Vector3(0, 26.5, 45));
//旋转摄像机角度
camera.transform.rotate(new Vector3( -30, 0, 0), true, false);
```


[] (img/2.png)<br>(2)정교투영 효과

