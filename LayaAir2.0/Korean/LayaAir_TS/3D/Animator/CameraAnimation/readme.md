#카메라 애니메이션 사용

###### *version :2.1.0beta   Update:2019-6-13*

Layaiar3D 플러그인 카메라 애니메이션 내보내기 지원합니다.유닛에서 편집을 하고 사용할 것을 건의합니다.

아래의 예례는 현재 유닛에서 간단한 카메라 애니메이션을 편집하고 있으며 이 애니메이션은 단순한 이동카메라일 뿐이다.재질 애니메이션과 같이 카메라에 애니메이터 구성을 추가하고 애니메이션을 설치해 줍니다.내보내기 후 사용.

이 애니메이션에서 우리는 카메라를 끊임없이 바꾸는 위치에 있을 뿐 큐브의 위치는 변함이 없다.

[] (img/1.png)<br>(1)

장면을 내보내면 장면에 첨가되면 효과를 볼 수 있다.


```typescript

Laya.Scene3D.load('LayaScene_scene/Conventional/scene.ls',Laya.Handler.create(this,function(scene){
    Laya.stage.addChild(scene);
}));
```


[] (img/2.gif)<br>(2)