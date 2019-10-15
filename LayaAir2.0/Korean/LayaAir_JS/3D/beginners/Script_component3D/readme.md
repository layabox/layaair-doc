#Layaiar3D 스크립트 구성 요소

###부모 구성 요소Compont3D

Layaiair 3D 엔진에서 상대 제어 및 코드 관리를 편리하게 하기 위해 기능이 강한 구성 요소 Compont3D를 제공합니다.우리의 애니메이션 제어 구성 요소, 충돌기, 스크립트, 뼈 단점 등은 모두 구성 요소 기능에 기반 확장, 그것에 속한다.또한 Layaiair 3D 엔진은 3D 대상에 여러 개의 구성 요소를 추가해 구성 요소를 더욱 활성화시킬 수 있다.

앞서 기술문서에서 애니메이션 컨트롤 구성 요소와 충돌기 구성의 기본 기능을 소개하고 더 이상 말하지 않습니다.이 장절 중**우리는 주로 스크립트 구성 요소를 예시로 해석한다**구성 요소 클래스에 계승하기 때문에, 자신의 확장 기능이 거의 없으며, 주로 부류 Componnt 3D 속성 및 방법, 스크립트 기능 추가 업데이트, 기대해 주세요!



###구성 요소의 주요 속성과 방법

**owner**구성 요소에 속한 Sprite3D 대상을 바인다.

****enable:**구성 요소가 활성화되고, 구성 요소를 다운로드할 때 기본값은 사용하고, false 로 수정되면, 우선 변경 사항을 발송하고, 구성 요소의 갱신 방법, u update () 실행을 중단합니다.

**onAwake ():**구성 요소 생성 후 한 번 실행, 기본 코드 없음.상속류에서 덮어쓸 수 있으며 초기화된 논리적 코드를 넣어야 합니다.

**onstart ():**구성 요소를 다운로드하는 3D 대상이 사실화된 후 처음으로 업데이트 시 실행, 기본 코드 없음.상속류에서 덮어쓰기 위해서는 3D 대상이 완성된 논리적 코드를 넣어야 한다.

예를 들어 스크립트의 3D 대상을 복제하면 3D 대상이 많을 경우 스크립트가 먼저 완성됩니다. 스크립트에서 논리가 onstart () 방법에서 가져오는 중 빈 대상이 발생합니다.

**onUpdate ():**구성 요소 업데이트 방법은 프레임 순환에 해당한다.상속류에 덮어쓰며 프레임마다 업데이트되는 논리적 코드 를 이 방법에 넣어야 합니다.



###구성 요소 관련 이벤트

** COMPONTu ADDED:**구성 요소를 불러오기 위해 구성 요소 소유자 Sprite3D 로 보내며 구성 요소는 인자 인자로 발송됩니다.****
****
**COMPONTuREMOVED: ** 구성 요소가 삭제된 후 이벤트를 구성 요소 Sprite3D 로 보내며 구성 요소를 인자로 발송합니다.



###스크립트 구성 요소 Script

스크립트가 구성 요소를 계승하기 때문에 디스플레이 대상 adCompont () 방법으로 스크립트를 3D에 추가합니다.

홈페이지의 3D 엔진 예례에서 많은 예시 카메라가 사용된 카메라 모바일 스크립트 Cameramovescript, 카메라가 스크립트를 첨가하면 마우스 제어 및 키보드 컨트롤 및 키보드 컨트롤을 통해 위아래로 이동할 수 있으며, 개발자들은 인터넷에서 디스플레이를 다운로드한 뒤 연구와 수정을 찾을 수 있다.스크립트 구성 방법 추가 코드 다음과 같습니다:


```typescript

//添加摄像机脚本组件
camera.addComponent(CameraMoveScript);
```


물론 몇몇 논리적인 필요로 스크립트를 상대로 삭제할 수 있으며, 3D 디스플레이를 사용할 수 있는 remponentBype () 방법으로 스크립트를 제거할 수 있습니다.


```typescript

//根据类型移除脚本组件
camera.removeComponentByType(CameraMoveScript);
//移除所有组件(包括动画、脚本、碰撞器等，注意，此方法不能移除子对象节点上的组件)
camera.removeAllComponent();
```




###스크립트 구성 요소 만들기

개발자들은 카메라 스크립트를 참고하여 자신의 스크립트를 제어하는 데 쓰이는 대상을 만들 수 있다.

Layaiair 3D 게임개발에서 우리는 기본적으로 유닛에서 장면과 캐릭터, 애니메이션, 내보내며 코드에 가재된 후 장면 중 다른 대상에 해당하는 컨트롤 스크립트를 추가할 수 있다.

예를 들어 주인공 제어 스크립트, NPC 제어 스크립트, 장면 물체 제어 스크립트 등, 한 게임 관람카드가 이렇게 탄생했고, 다음 관문을 다운로드한 후 스크립트를 재활용할 수 있고, 프로젝트 관리가 편리하고, 제어와 디스플레이를 진행했다.

다음의 예례에서 우리는 기술 문서에서 '3D의 여행' 을 빠른 속도로 시작하고, 제어 스크립트를 box 위에 추가하고, 4초 후에 스크립트 요소를 제거합니다.

먼저 스크립트 보이스컴트로 스크립트를 생성하고 스크립트 소속 박스의 소재 수정, 순환 회전에 사용됩니다.


```typescript

export default class BoxControlScript extends Laya.Script3D{
  constructor(){super();}
  /**
	 * 覆写3D对象组件被激活后执行，此时所有节点和组件均已创建完毕，此方法只执行一次
	 */
  onAwake(){
    // this.owner
  }
  /*覆写组件所属3D对象实例化完成后，第一次更新时的执行方法*/
  onStart(){
    //得到3D对象的材质
    var material = this.owner.meshRenderer.material;
    //更改3D对象的材质反射率 （偏红）
    material.albedoColor = new Laya.Vector4(1,0,0,1);
  }
  /**
	 * 覆写组件更新方法（相当于帧循环）
	 */
  onUpdate(){
    this.owner.transform.rotate(new Laya.Vector3(0,0.5,0),false,false);
  }
}
```


그리고'3D 여행 빠른 시일 내에 보이스에 이 스크립트를 추가하고 4초 후에 스크립트를 제거합니다.


```typescript

import BoxControlScript from "./BoxControlScript";
var Main = (function () {
  function Main() {

    //初始化引擎
    Laya3D.init(0, 0);

    //适配模式
    Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
    Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

    //开启统计信息
    Laya.Stat.show();

    //添加3D场景
    var scene = Laya.stage.addChild(new Laya.Scene3D());

    //添加照相机
    var camera = (scene.addChild(new Laya.Camera( 0, 0.1, 100)));
    //移动摄影机位置
    camera.transform.translate(new Laya.Vector3(0, 3, 3));
    //旋转摄影机方向
    camera.transform.rotate(new Laya.Vector3( -30, 0, 0), true, false);
    //设置背景颜色
    camera.clearColor = null;

    //添加方向光
    var directionLight = scene.addChild(new Laya.DirectionLight());
    //设置灯光漫反射颜色
    directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
    //设置灯光的方向（弧度）
    directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));

    //添加自定义模型
    var box= scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1,1,1),"MOs"));
    //设置模型的旋转
    box.transform.rotate(new Laya.Vector3(0,45,0),false,false);
    //创建材质
    var material = new Laya.PBRSpecularMaterial();
    //加载模型的材质贴图
    Laya.Texture2D.load("res/layabox.png",Laya.Handler.create(this,function(text){
      material.albedoTexture = text;
      //给模型添加材质
      box.meshRenderer.material = material;

      //给box添加自定义脚本组件
      box.addComponent(BoxControlScript);
    }))
    //4秒后删除自定义组件
    Laya.timer.once(4000,this,this.onLoop,[box]);
  }
  var _proto = Main.prototype;
  _proto.onLoop = function(box){
    // 获取到组件
    var boxContro = box.getComponent(BoxControlScript);
    // 移除组件
    // boxContro.destroy();
    //如不想移除组件，可设置为不启用能达到同样效果（组件_update方法将不会被更新）
    boxContro.enabled = false;
  }
  return Main;
} ());
new Main();

```


상위 코드 중 4초 후 개발자들은 구성 요소를 제외하고 스크립트를 사용하지 않고 스크립트를 사용하면 속성을 false 로 설정할 수 있습니다.

상술한 코드를 번역하면 다음의 효과를 얻을 수 있습니다.

![1](img/1.gif)(1)</br>>

