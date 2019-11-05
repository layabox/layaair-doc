#유닛에서 편집하고 카메라 내보내기

###### *version :2.0.1beta   Update:2019-3-19*

엔진 1.7.10판과 유닛 내보내기 플러그인또한 파일을 내보내기 위해 카메라가 3D 공간의 위치, 시각, 배경색, 재단, 시야 등 파라메트로 내보내는 장면을 가재해 화면효과가 유닛에서 완전히 일치하여 개발자들의 카메라 시각에 대한 통제를 편리하게 했다.

또한 레이야아 3D 엔진이 다중 카메라를 지원하기 때문에 유닛에 카메라를 설치하고 내보낼 수 있으며, 다중 카메라에 대한 시각 설정은 본과 마지막 과목을 살펴보세요.**"카메라 많이 쓰세요".**소절.

###유닛에서 카메라 편집.

유닛에서 Camera 카메라를 만들었습니다.카메라 패널 보기:

[] (img/1.png)<br>(1)

**내보내기 위한 카메라 설정**：

Transform 구성 요소를 선택하십시오.카메라 조절 가능합니다.**포지션**위치**로테이션**선택**Scale**축소

Backround 배경은 하늘상자가 없는 상황에서 선택한 색을 잉여 화면에 적용합니다.

클링마크는 커버를 제거하거나 상대를 무시하는 Layer.

프로젝션 투사.Perspective 투시 투시 투시, Orthography 친목 투영.

Size 크기.정교 카메라를 설치할 때 눈 크기.

Field of View 시야 범위.카메라의 시각 너비 및 세로 각도 크기.

클리핑 플랜스 재단 평면.카메라부터 렌더와 렌더를 멈추는 거리.

Near 가까운 재단면.

Far 원재단면.

Viewport Rect 시각 사각형.

x: 카메라 보기가 수평 위치의 시작을 할 것입니다.

y: 카메라 보기는 수직 위치의 시작을 그릴 것이다.

w:카메라가 화면 너비까지 출력합니다.

h:카메라가 화면의 높이에 출력한다.

Depth 깊이.그림 순서.

Target Texture 대상 텍스처.

###코드 사용 내보내는 카메라

그렇다면 유닛에서 카메라를 만들어 내보내며 파일을 내보내면 어떻게 카메라를 가져올까요?이 장면의 노드 색인이나 이름을 통해 가져올 수 있으며, 이동 회전, 스카이박스, 스크립트 추가 동작도 가능합니다.

코드 다음과 같습니다:


```typescript

class LayaAir3D
{
    constructor() 
    {
        //初始化引擎
        Laya3D.init(1000, 500,true);            
        //适配模式
        Laya.stage.scaleMode = Stage.SCALE_FULL;
        Laya.stage.screenMode = Stage.SCREEN_NONE;
        //开启统计信息
        Laya.Stat.show();            
        //预加载角色动画资源
        Laya.loader.create("monkey/monkey.ls",Laya.Handler.create(this,this.onSceneOK));
    }        
    onSceneOK()
    {
        //添加3D场景
        var scene = Laya.loader.getRes("monkey/monkey.ls");
        Laya.stage.addChild(scene);  
        //从场景中获取摄像机
        var camera = scene.getChildByName("Main Camera");
        //后续对摄像机的逻辑操作.......
    }
}
```


Untiy 에서 카메라는 기본적으로 "Main Camera"라는 이름으로 상술한 코드에서 Scene getChildByName('Main Camera'를 통해 카메라를 얻으며 후속 논리에 조작했다.개발자들도 유닛에서 카메라의 이름을 정의할 수 있다.

