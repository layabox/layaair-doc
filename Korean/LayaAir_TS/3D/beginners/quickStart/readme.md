# 快速开始一个3D项目

다음은 Layair 엔진으로 3D 프로젝트를 빠르게 시작하고 TS 언어를 가르치고 엔진 코드로 기본적인 3D 적용을 간단히 시사할 것입니다.

###IDE 생성 3D 예제 항목

LayaiarIDE 다운로드, 새 항목을 시작하여 3D 항목을 선택하십시오.그림 아래에 제시한 것처럼:

![1](img/1.png)</br> (그림 1)

여기에 자바스크립트 언어를 선택합니다.완성된 후에 우리는 IDE 가 3D를 위한 템플릿을 만들었다는 것을 발견했다.프로젝트에 대한 구조소개 개발자는 2D의 초보 과정을 참고할 수 있다.이곳은 더 이상 군말을 하지 않는다.

그리고 단축키 F5를 누르거나 실행 단추를 누르면 디버그 창에 네모드로 표시됩니다.그림 아래에 제시한 것처럼:

![2](img/2.png)</br>(2)

Layaiar3D.ts 이 시작은 우리에게 3D의 세계를 구축했다.또한 간단한 3D 세계에 필요한 요소 몇 개 (장면, 카메라, 광원, 3D 모형, 소재) 를 추가했다.이런 개념 지원 후속 과정에 대해 자세한 소개를 통해 3D 지식을 조금씩 이끌어갈 것입니다.

이 간단한 점 Demo 에 대해 우리는 이 측체는 정적이다. 우리가 우리에게 얻은 입체적 시각감을 가져다 줄 수 없다는 것을 발견했다. 그러면 우리는 간단한 몇 가지 코드 를 추가하여 그것을 돌리게 한다.우선 시작 클래식 레이아라 3D.ts 를 찾아서 다음 코드 변경:


```typescript

// 程序入口
class LayaAir3D {
    constructor() {
        //初始化引擎
        Laya3D.init(0, 0, true);

        //适配模式
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

        //开启统计信息
        Laya.Stat.show();

        //添加3D场景
        var scene: Laya.Scene = Laya.stage.addChild(new Laya.Scene()) as Laya.Scene;

        //添加照相机
        var camera: Laya.Camera = (scene.addChild(new Laya.Camera(0, 0.1, 100))) as Laya.Camera;
        camera.transform.translate(new Laya.Vector3(0, 3, 3));
        camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
        camera.clearColor = null;

        //添加方向光
        var directionLight: Laya.DirectionLight = scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
        directionLight.ambientColor = new Laya.Vector3(0.6, 0.6, 0.6);
        directionLight.specularColor = new Laya.Vector3(0.6, 0.6, 0.6);
        directionLight.diffuseColor = new  Laya.Vector3(1.6, 1.6, 1.6);
        directionLight.direction = new Laya.Vector3(1, -1, 0);

        //添加自定义模型
        var box: Laya.MeshSprite3D = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, 1))) as Laya.MeshSprite3D;
        box.transform.rotate(new Laya.Vector3(0, 45, 0), false, false);
        var material: Laya.StandardMaterial = new Laya.StandardMaterial();
        material.diffuseTexture = Laya.Texture2D.load("res/layabox.png");
        box.meshRender.material = material;

        //这里我们添加转动的逻辑-------------------------------
        //旋转方向与角度设置
        var vect:Laya.Vector3 = new Laya.Vector3(1,1,0);
        //每10毫秒旋转一次
        Laya.timer.loop(10,null,function(){
            box.transform.rotate(vect,true,false);
        });
    }
}
new LayaAir3D();
```


![3](img/3.gif)</br>(동영상 3)

여기에는 한 개의 타이머를 사용합니다. 10ms의 드라이브가 이 네모드로 변동합니다. 구체적인 설명은 개발자와 관련된 교정과 API, 여기는 간단한 시사일 뿐입니다. 간단한 코드가 다음과 같습니다.


```typescript

var vect:Laya.Vector3 = new Laya.Vector3(1,1,0);
//每10毫秒旋转一次
Laya.timer.loop(10,null,function(){
  box.transform.rotate(vect,true,false);
});
```


여기에 우리는 이미 간단한 예를 달릴 수 있게 되었고, 이 측체를 회전 (움직이는 그림 3) 을 구동할 수 있다.



###Layaiar3D 세계의 기본 구성

위쪽 코드를 통해 우리는 기본적인 3D 세계가 탄생했다.물론 위쪽 코드는 비교적 간단하고 다채로운 게임 세계를 만들어야 하는데, 엔진이 더 많은 기능을 알아야 한다.

4명의 레이아라 3D 세계 요소 보기.3D 장면, 카메라, 조명, 모형 외에도 애니메이션 중 하나다.후기 과정을 우리는 점차 모두에게 소개할 것이다.

![4](img/4.png)</br>(图4)







###3D 세계 변환 및 벡터의 간단한 운용

이상 예시에서 디스플레이에 대한 몇 가지 요소 모듈을 생성했으나, 카메라와 조명, 모형에 벡터 Vector3, Vector4 등을 활용해 상대 위치와 방향, 색채 등 부치까지 사용했다.

####좌표계 및 위치, 회전 수정

2D 엔진에서 X, y 좌표를 직접 조정하여 대상 위치와 회전방향을 제어하고, 3D 엔진 중 상대가 복잡하고, z 축 좌표에 가입하였기 때문에 Vector3 3차원 벡터를 사용해 각각 x, y, z를 대표하고 있습니다.

그러나 각종 3D 엔진과 3D 모형 애니메이션 제작 소프트웨어는 좌표 방향에 대한 정의가 다르기 때문에 초학자들은 그것의 차이를 파악해야 한다.

Layait3D 엔진 좌표용 전문 용어에 속한다`右手坐标系`(도 5), 간단히 말하자면 스크린 오른쪽은 X 축 방향으로, 위쪽은 정Y 축 방향으로, 화면을 관찰자 방향으로 정Z 축 방향으로 향하고 있다.어떤 3D 엔진은 왼손 좌표학과에 속하며 소개를 하지 않고 흥미가 있는 초학자들은 바이두에서 이해할 수 있다.

![5](img/5.png)</br>(도 5) 오른손 좌표

엔진에서도 세계 좌표와 국부 좌표학과, 세계 좌표계는 3D 장면의 좌표이며, 3축 방향은 영원히 변하지 않는다.국부 좌표는 모형 자체 좌표로, 모형 방향의 회전 변화에 따라 바꿀 수 있지만, 우리는 오른손 좌표계 제스처를 통해 좌표 방향을 식별할 수 있다(도 6), 하도에서 손의 모형은 Y축 회전-90도 뒤의 3D 모형 오른손 좌표계 좌표계 좌표계 자리표는 언제나 국부좌표의 정X 축 방향으로 한다.

![6](img/6.png)</br> (그림 6)

이 같은 좌표학과를 알게 되면 3D를 통해 바꾸게 된다. 예시 코드에서 transform 은 3D 변환 대상이다(Transform3D)는 3D 세계에서 매우 중요하다. 대상 변화의 논리적 제어 코드를 사용한다.

코드 중 3D 변환 중 translate 이동 및 rotate 회전 방법을 사용하여 3차원 벡터 대표x, y, z 의 값에 사용합니다.동료, 두 가지 방법은 모두 인자 중 일부 공간 이동, 회전, 초보자들은 프로그램에 설치되어 있으며 이동 회전이 어떤 차이가 있는지 관찰할 수 있다.


```typescript

//移动摄像机位置
camera.transform.translate(new Laya.Vector3(0, 3, 3));
//旋转摄像机方向（角度）
camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
```


![7](img/7.png)</br>(7)

지금까지 Transform3D 의 API 중 이동, 회전 방법 설명입니다.물론, 변환 대상에는 속성과 방법도 많은데, 우리는 앞으로 예시에서 점차적으로 설명한다.

####벡터의 사용

벡터는 Layair 3D 엔진에서 매우 빈번하게 사용해 2차원 벡터부터 4차원 벡터 내보내기 모두 그들의 모습을 볼 수 있다.가장 기초적인 용법은 본 예에서 부가가치 사용에 사용된다.

코드 중 3D 대상의 이동, 회전, 축소 등 변환, 3차원 벡터는 그것의 x, y, z 축 축은 좌표부치이다.

그렇다면 불빛의 각종 색상 속성 부득이 길고 3차원 벡터 중 값은 R, G, B 3가지 색깔을 각각 대표하며 각각 레드, 녹색, 블루, Layair 3D 엔진 중 세 가지 색상의 최대 수치는 1로, 백분의 방식으로 설정됐다.전체치가 커질수록 색상이 밝을수록 작은 색깔이 어두워지면 1이 넘는 경우 노출효과가 발생한다.

레드, 녹색, 블루는 어떤 색깔로 조합할 수 있을지 초학자들은 게임 미술 디자이너들에게 문의할 수 있으며, 예를 들면 빨간색, 빨간색, 붉은색 가람은 보라 등이다.일반적으로 프로젝트 개발 과정에서 프로그래머는 색상 값을 반복적으로 조절해서 실험하는 효과가 필요하다.

예를 들어 한 번 코드가 벡터로 색상 값으로 사용되었습니다:


```javascript

//灯光的环境色
directionLight.ambientColor = new Laya.Vector3(0.6, 0.6, 0.6);
//灯光的高光色
directionLight.specularColor = new Laya.Vector3(0.6, 0.6, 0.6);
//灯光的漫反射颜色
directionLight.diffuseColor = new Laya.Vector3(1.6, 1.6, 1.6);
```


항목 중 많은 복잡한 용법도 있고, 벡터는 일부 수학 연산을 운영해야 하며, 이 과정은 입문 과정으로 잠시 소개하지 않는다.