# 场景天空

###### *version :2.0.1beta   Update:2019-3-19*

하늘상자는 광활해 보이는 비주얼 기술이다. 무틈으로 연결된 문양으로 카메라의 시구를 360도 무사각으로 감싸 준다.여기에서 우리는 간단히 하천상자를 사용한다면, 하늘상자가 후속될 것이다.**Layaiair3D 하늘**편 강연.

####Unity 설정 환경 하늘

라이트에서.`Scene`장면 탭, Envinment 환경의`SkyBox Material`하늘상자 소재 이 하나.

[] (img/1.png)<br>(1)

**주의하다**사용한 소재는 리야아3D-Sky 아래 Shader;

미리 준비해 놓은 하늘박스 소재를 그중에서 끌어넣으면 됩니다.(오른쪽 설정 버튼을 누르거나 미리 준비해 놓은 하늘상자 소재를 선택하세요.

[] (img/2.gif)<br>(2)

설치된 후 하늘상자를 내보내면 됩니다.

####코드 설정 하늘


```typescript

var camera:Camera = scene.getChildByName("Main Camera") as Camera;
//加入摄像机移动控制脚本
camera.addComponent(CameraMoveScript);

//加载相机天空盒材质
BaseMaterial.load("res/threeDimen/skyBox/skyBox1/SkyBox.lmat", Handler.create(null, function(mat:BaseMaterial):void {
    var skyRenderer:SkyRenderer = camera.skyRenderer;
    skyRenderer.mesh = SkyBox.instance;
    skyRenderer.material = mat;
}));
```


효과 다음과 같습니다 (그림 3):

[] (img/3.png)<br>(2)

