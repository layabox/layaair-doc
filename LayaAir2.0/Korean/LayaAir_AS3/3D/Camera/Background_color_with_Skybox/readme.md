#카메라 배경색과 하늘상자

###### *version :2.0.1beta   Update:2019-3-19*

####배경색

3D 장면에서 배경색 색상은 카메라로 제어하는 것이며 카메라 클레아라 속성을 설정하여 3D 공간을 바꾸는 배경색을 사용하여 3차원 벡터 Vector3 (레드, 녹색, 파란) 방식을 조정하고 엔진은 기본 검은색으로 설정한다.


```typescript

//相机设置清楚标记,使用固定颜色
camera.clearFlag = BaseCamera.CLEARFLAG_SOLIDCOLOR;	
//设置背景颜色
camera.clearColor = new Vector4(0.5,0.5,0.6,1);
```


####하늘상자

광경에는 하늘의 원경을 많이 표현해야 한다. 예를 들면 푸른 하늘의 백운, 황혼, 별하늘 등과 같은 레이야아 3D 엔진에서 카메라 속성에 하늘박스를 추가하는 방식이다.

하지만 카메라가 정교투영을 사용하면 하늘상자가 효과를 보지 못하고 개발자들이 시도할 수 있다.

하늘상자는 스테레오 마네킹 및 6장 사이의 소재 스티커로 구성되어 360 전경 지도와 비슷하다. 시각의 회전이 바뀌면서 사방팔방까지 먼 효과를 관찰할 수 있다.


```typescript

//天空盒代码
BaseMaterial.load("res/threeDimen/skyBox/skyBox1/skyBox.lmat", Handler.create(this, function(mat:BaseMaterial):void {
    //设置相机的清除标识为天空盒
    camera.clearFlag = BaseCamera.CLEARFLAG_SKY;
    //获取相机的天空渲染器
    var skyRenderer:SkyRenderer = camera.skyRenderer;
    //创建天空盒的mesh
    skyRenderer.mesh = SkyBox.instance;
    //设置天空盒材质
    skyRenderer.material = mat;
}));
```


[] (img/1.png)<br>(1) 하늘상자

>>**주의:**배경색과 하늘상자를 사용할 때, Camera (카메라) 를 보증해야 한다`clearFlag`표기 속성을 제거하고 필요한 효과와 대응한다.