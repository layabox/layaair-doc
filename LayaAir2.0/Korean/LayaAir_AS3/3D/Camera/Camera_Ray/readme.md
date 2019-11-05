#어떻게 카메라 에서 사선 하나 를 만들 수 있을까

###### *version :2.0.1beta   Update:2019-3-19*

앞**그래픽 시스템 기초 개념**사선이라는 기초 도구를 설명한 적이 있다.여기에서 우리는 카메라에서 사선을 만들어, camera 를 사용한다.**viewportpointtooray**방법.생성된 이 사선은 카메라의 근재단의 면으로 출발해 멀리서 면의 점을 재단하는 것이다.이 사선의 반향 연장선은 사선기의 원점을 통과한다.

[] (img/1.png)<br>(1)


```typescript

//创建一个点
var point:Vector2 = new Vector2();
//创建一个射线
var ray: Ray= new Ray(new Vector3(0, 0, 0), new Vector3(0, 0, 0));
//以鼠标点击的点作为原点
point.x = Laya.stage.mouseX;
point.y = Laya.stage.mouseY;
//计算一个从屏幕空间生成的射线
camera.viewportPointToRay(point, ray);
```


예시 표시[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Camera&name=CameraRay))카메라에서 만든 사선을 통해 바닥과 사선충돌점에서 정방체를 만든다.

