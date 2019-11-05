# 场景环境光

###### *version :2.0.1beta   Update:2019-3-19*

####유닛 내보내기 환경 빛을 사용하기

Unity 설정된 Lighting 패널, Scene 태그 페이지를 선택해서 그 중`Environment`중`Environment Lighting`항목

[] (img/1.png)<br>(1)

**Source**광원 옵션은 현재 Skybox, Color 두 종류를 사용할 수 있습니다.

**Ambient Color**환경빛.Color 때의 환경 빛 색상으로 설정합니다.

**Ambient Mode**환경 모드`Realtime `실시간 광선.

설정 후 색상 조정 또는

####코드 설정 환경광

환경광 색상 (ambientColor) 은 재질에 융합 염색으로 재질이 어떤 컬러의 톤에 따라 재질도 밝게 하고 모의불빛 발광 효과가 있다.하늘 상자를 설치하고 설치하지 않으면`Scene3D`장면`AmbientColor`그렇다면 레이아이르 3D는 환경 빛을 하늘상자에서 유래한다.


```typescript

//设置场景环境光
scene.ambientColor = new Laya.Vector3(0.6, 0, 0);
```


효과 다음과 같습니다 (2):

[] (img/2.png)<br>(2)

