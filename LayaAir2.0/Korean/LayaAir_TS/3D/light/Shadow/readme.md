#어떻게 조명에 그림자 추가

###### *version :2.0.1beta   Update:2019-3-30*

투영은 조명이 모형을 비출 때 발생하는 즉시 음영으로 조명 각도, 조명 강도, 모형 위치의 변화에 따라 변한다.투영은 3D 세계에서 가장 중요한 요소 중 하나로 더욱 강렬한 입체감을 일으킬 수 있다.

만약 음영은 성능을 너무 많이 소모할 수 없습니다. 특히 게임 장면은 모형이 비교적 커서, 일반적으로 우리는 즉시 투영을 사용하지 않고, 정적인 빛을 사용하여 사진을 사용합니다.

장면에서 투영을 하게 하려면, 우리는 불빛의 이하 속성을 알아야 한다.

**shadow:**투영을 시작할지 여부를 true 로 설정한 후 효과를 발생합니다.

**shadowDistance:**투영 범위는 카메라가 모형으로 가는 거리를 가리킨다.이 범위 모델이 투영과 투영을 받지 않을 것이며 개발자는 장면 크기에 따라 설정할 수 있다.

**shadowPCFType:**음영이 흐릿한 등급 0-3, 흐릿한 수치는 커질수록 부드럽고 효과는 좋지만 성능이 더 소모된다.

**shadowpsSMCount:**음영 스티커가 생기는 수량은 높을수록 음영이 섬세할수록 성능이 손실된다.

**shadowResolution:**투영의 품질, 투영 범위의 그림자 크기.수치 설정을 통해 품질이 높을수록 투영 품질이 높을수록 성능 손실도 따라서 높아진다.투영의 품질은 2의 N 차멱을 단위로 설정하고, 기본값은 512, 1024, 2048.....기다리다.

더 자세하게 사용할 수 있어요.[查看API](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=3D&class=laya.d3.core.light.LightSprite).

이 외에도 모델에 투영속성을 설치해야 한다.

**receiveShadow:**투영을 받아들일지 여부는 이 속성이 true (true) 로 계산된 투영은 이 모형에 표시됩니다.게임에서 우리는 장면의 바닥과 장면에서 이동할 수 있는 모형 castShadow 속성을 true 로 설정할 수 있다.

**castShadow:**투영 여부, 이 속성은 true, 조명은 그림자가 생기는 모형 위치, 모형 격자 모양 크기, 조명 각도 등 투영 계산을 진행하고 음영을 받아들이는 모형상 에 투영된다.예를 들어 장면 속 캐릭터, NPC 등 이벤트 요소는 이 속성을 열어 줄 수 있다.

이 곳에서 효과를 보여주는 데모 주소:

조명 방면의 설정:


```typescript

//灯光开启阴影
directionLight.shadow = true;
//可见阴影距离
directionLight.shadowDistance = 3;
//生成阴影贴图尺寸
directionLight.shadowResolution = 2048;
//生成阴影贴图数量
directionLight.shadowPSSMCount = 1;
//模糊等级,越大越高,更耗性能
directionLight.shadowPCFType = 3;
```


지상 수신 음영과 모형으로 음영이 발생합니다:


```typescript

//地面加到场景上 并且获取地面
var grid = this.scene.addChild(Laya.Loader.getRes("res/threeDimen/staticModel/grid/plane.lh")) as Laya.Sprite3D;
//地面接收阴影
(grid.getChildAt(0) as Laya.MeshSprite3D).meshRenderer.receiveShadow = true;
.......
//设置猴子能产生阴影
(layaMonkey.getChildAt(0).getChildAt(0) as Laya.SkinnedMeshSprite3D).skinnedMeshRenderer.castShadow = true;

```


그리고 효과 한번 볼게요.

[] (img/1.png)<br>(1)

