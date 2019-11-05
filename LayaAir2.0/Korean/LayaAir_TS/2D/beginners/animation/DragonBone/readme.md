#Layair 엔진 재생 Dragonbones 애니메이션

"LayairierIDE 2.0 버전 캡처 설명을 통해 최신 안정된 버전을 다운로드하는 LayairIDE, 최신 버전을 최신 버전으로 다운로드해 주세요.

드래곤보네스 골격 애니메이션, 게임에서 자주 사용하는 골격 애니메이션 중 하나이며, 레이이에이드 자체 전환 도구를 통해 드래곤보네스 골격 애니메이션 형식을 LayaAAir 엔진의 골격 포맷으로 바꿀 수 있다.



###1, 원판 Dragonbones 골격 애니메이션 내보내기

####1.1 내보낼 때 텍스처 설정은 반드시 텍스쳐야 한다

LayaiairIDE Dragonbones 변환 도구는 그림 모드로만 지원하는 Dragonbones 골격 애니메이션 전환을 위해 Dragonbones 골격 애니메이션 편집 도구를 사용할 때 반드시`纹理设置`의`纹理类型`선택`纹理集`그림 1 개.

![图1](img/1.png) 


(그림 1)

####1.2 내보내는 Dragonbones 버전

LayairIDE는 모든 Dragonbones 버전이 바뀌는 것은 아니다.지원하는 버전은 LayairIDE에 있습니다.`龙骨转换工具`판넬에는 그림 2개처럼 표시되어 있다.

![图2](img/2.png) 


(2)

이 문서를 마감할 때 드래곤보네스는 4.5버전부터 5.1버전까지 지원했다.후속으로 레이어이더는 DragonBons 버전 업데이트를 진행하며 개발자는 변환 도구 패널 버전 지원 상태의 변화를 주목할 수 있습니다.



###2, DragonBonones 애니메이션을 Layair 엔진 식별 형식으로 바꾸기

####2.1 변환 도구 패널 열기

LayairIDE에서.`设计模式`메뉴 표시줄 클릭`工具`—`龙骨动画转换`만일 3 시 시 면 열 수 있다`DragonBones格式转换`도구.

![图3](img/3.png) 


(그림 3)



####2.2 생성 sk 접미사 골격 애니메이션 파일

열다`龙骨格式转换`도구 패널 뒤에 Dragonbones 내보내는 자원 디렉터리`拖入`패널 변환 또는 클릭`浏览`DragonBonones에서 내보내는 자원 디렉터리를 선택하십시오.그리고 클릭.`确定`원자원 목록에서 생성할 수 있다`.png`과`.sk`접미사 두 명의 동명 서류.시계가 네 개처럼 보이다.

![图4](img/4.png) 


(그림 4)



###3, DragonBonones 애니메이션 표시

####3.1 전환 후 드래곤보네스 애니메이션 자원이 프로젝트에 대응하는 디렉터리로 복제된다.

우리는 용골 전환 도구를 생성한 동명`.sk`과`.png`접미사 파일이 항목의 디렉토리에 복사되어 있으며, 그림 5개처럼 보여 줍니다.(* 용골 도구가 내보내는 원본 파일은 상관하지 않고 변환 도구만 사용합니다.*)

![图5](img/5.png) 


(그림 5)

####3.2 Dragonbones 애니메이션 재생 예시

아래의 예례가 사용될 것이다`laya.ani.bone.Skeleton`종류, 구체적인 API 설명은 직접 링크 열기:[https://layaair.ldc.layabox.com/api/?category=Bone&class=laya.ani.bone.Skeleton](https://layaair.ldc.layabox.com/api/?category=Bone&class=laya.ani.bone.Skeleton)

DragonBononesDemo.ts, 코드 작성 다음과 같습니다:


```typescript

//初始化舞台
Laya.init(1334,750,Laya.WebGL);
//创建一个Skeleton对象
var skeleton:Laya.Skeleton = new Laya.Skeleton();
//添加到舞台
Laya.stage.addChild(skeleton);
skeleton.pos(600,350);
//通过加载直接创建动画
skeleton.load("res/DragonBones/rooster/Rooster_Ani.sk");
```

실행 효과 는 동도 6 시 의 보여 준다

![动图6](img/6.gif) 


(동도 6)