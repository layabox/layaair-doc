#Layaiar3D 스크립트 구성 요소

###부모 구성 요소Compont3D

Layaiair 3D 엔진에서 상대 제어 및 코드 관리를 편리하게 하기 위해 기능이 강한 구성 요소 Compont3D를 제공합니다.우리의 애니메이션 제어 구성 요소, 충돌기, 스크립트, 뼈 단점 등은 모두 구성 요소 기능에 기반 확장, 그것에 속한다.또한 Layaiair 3D 엔진은 3D 대상에 여러 개의 구성 요소를 추가해 구성 요소를 더욱 활성화시킬 수 있다.

앞서 기술문서에서 애니메이션 컨트롤 구성 요소와 충돌기 구성의 기본 기능을 소개하고 더 이상 말하지 않습니다.이 장절 중**우리는 주로 스크립트 구성 요소를 예시로 해석한다**구성 요소 클래스에 계승하기 때문에, 자신의 확장 기능이 거의 없으며, 주로 부류 Componnt 3D 속성 및 방법, 스크립트 기능 추가 업데이트, 기대해 주세요!



###구성 요소의 주요 속성과 방법

**owner**구성 요소에 속한 Sprite3D 대상을 바인다.

**enable:**구성 요소가 활성화되고, 구성 요소를 다운로드할 때 기본값에 사용되는 상태입니다. 만약 false 로 수정되면, 우선 변경 사항을 발송하고, 구성 요소의 갱신 방법 uupdate () 실행을 중단합니다.

**onAwake ():**구성 요소가 불러올 때 실행 방법, 기본 코드 없음.상속류에서 덮어쓸 수 있으며 초기화된 논리적 코드를 넣어야 합니다.

**onstart ():**구성 요소를 다운로드하는 3D 대상이 사실화된 후 처음으로 업데이트 시 실행, 기본 코드 없음.상속류에서 덮어쓰기 위해서는 3D 대상이 완성된 논리적 코드를 넣어야 한다.

예를 들어 3D 디스플레이 대상 비동기 가재 시 스크립트를 추가하였습니다. 이 모형 및 재질은 아직 불러오지 않았습니다. 만약 스크립트 중 (구조법),,,...`onAwake()`방법 중 논리 코드 3D 디스플레이 대상 또는 스티커가 비어 버그 가 나타난다.이때 이 논리적 코드를 onstart () 방법에서 비어 버그 발생을 피할 수 있다.

예를 들어 스크립트의 3D 대상을 복제하면 3D 대상이 많다면 스크립트가 먼저 완성됩니다. 스크립트에서 논리가 onstart () 방법에서 가져오는 중 빈 대상이 발생합니다.

**onUpdate ():**구성 요소 업데이트 방법은 프레임 순환에 해당한다.상속류에 덮어쓰며 프레임마다 업데이트되는 논리적 코드 를 이 방법에 넣어야 합니다.



###구성 요소 관련 이벤트

** COMPONTu ADDED:**구성 요소를 불러오기 위해 구성 요소 소유자 Sprite3D 로 보내며 구성 요소는 인자 인자로 발송됩니다.****
****
**COMPONT REMOVED:**구성 요소가 삭제된 후 이벤트는 구성 요소 소유자 Sprite3D 로 보내며, 구성 요소는 인자 인자로 발송됩니다.****
****
**ENABLEu CHANGED: ** 구성 이벤트를 사용하여 속성 enable 수정을 사용하여 구성 요소를 발송하고 속성 인자로 발송됩니다.



###스크립트 구성 요소 Script

스크립트가 구성 요소를 계승하기 때문에 디스플레이 대상 adCompont () 방법으로 스크립트를 3D에 추가합니다.

홈페이지의 3D 엔진 예례에서 많은 예시 카메라가 사용된 카메라 모바일 스크립트 Cameramovescript, 카메라가 스크립트를 첨가하면 마우스 제어 및 키보드 컨트롤 및 키보드 컨트롤을 통해 위아래로 이동할 수 있으며, 개발자들은 인터넷에서 디스플레이를 다운로드한 뒤 연구와 수정을 찾을 수 있다.스크립트 구성 방법 추가 코드 다음과 같습니다:


```typescript

//添加摄像机脚本组件
camera.addComponent(CameraMoveScript);
```


물론 어떤 논리적 필요로 스크립트를 대상에서 삭제할 수 있다.스크립트 구성 방법 삭제:


```typescript

//获取摄像机上的脚本
var script:CameraMoveScript = camera.getComponent(CameraMoveScript);
//删除
script.destroy();
```




###스크립트 구성 요소 만들기

개발자들은 카메라 스크립트를 참고하여 자신의 스크립트를 제어하는 데 쓰이는 대상을 만들 수 있다.

Layaiair 3D 게임개발에서 우리는 기본적으로 유닛에서 장면과 캐릭터, 애니메이션, 내보내며 코드에 가재된 후 장면 중 다른 대상에 해당하는 컨트롤 스크립트를 추가할 수 있다.

예를 들어 주인공 제어 스크립트, NPC 제어 스크립트, 장면 물체 제어 스크립트 등, 한 게임 관람카드가 이렇게 탄생했고, 다음 관문을 다운로드한 후 스크립트를 재활용할 수 있고, 프로젝트 관리가 편리하고, 제어와 디스플레이를 진행했다.

다음의 예례에서 우리는 기술 문서에서 '3D의 여행' 을 빠른 속도로 시작하고, 제어 스크립트를 box 위에 추가하고, 4초 후에 스크립트 요소를 제거합니다.

먼저 스크립트 보이스컴트로 스크립트를 생성하고 스크립트 소속 박스의 소재 수정, 순환 회전에 사용됩니다.


```typescript

export default class BoxControlScript extends Laya.Script3D{
    private box:Laya.MeshSprite3D;
    constructor(){
        super();
    }
    /**
	 * 覆写3D对象组件被激活后执行，此时所有节点和组件均已创建完毕，此方法只执行一次
	 */
    public onAwake():void{
        //绑定对象
        this.box = this.owner as Laya.MeshSprite3D;
    }
    /*覆写组件所属3D对象实例化完成后，第一次更新时的执行方法*/
    public onStart():void{
        //获得3d材质
        var material:Laya.PBRSpecularMaterial = this.box.meshRenderer.material as Laya.PBRSpecularMaterial;
        material.albedoColor = new Laya.Vector4(1,0,0,1);
    }
    /**
     * 覆写组件更新方法(相当于循环)
     */
    public onUpdate():void{
        // 所属脚本对象旋转
        this.box.transform.rotate(new Laya.Vector3(0,0.5,0),false,false);
    }
}
```


그리고'3D 여행 빠른 시일 내에 보이스에 이 스크립트를 추가하고 4초 후에 스크립트를 제거합니다.


```typescript

// 程序入口
import BoxControlScript from "./BoxControlScript";

class Main {
    constructor() {
        //初始化引擎
        Laya3D.init(0, 0);

        //适配模式
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

        //开启统计信息
        Laya.Stat.show();

        //添加3D场景
        var scene: Laya.Scene3D = Laya.stage.addChild(new Laya.Scene3D()) as Laya.Scene3D;

        //添加照相机
        var camera: Laya.Camera = (scene.addChild(new Laya.Camera(0, 0.1, 100))) as Laya.Camera;
        camera.transform.translate(new Laya.Vector3(0, 3, 3));
        camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
        camera.clearColor = null;

        //添加方向光
        var directionLight: Laya.DirectionLight = scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
        directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
        directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));

        //添加自定义模型
        var box: Laya.MeshSprite3D = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, 1))) as Laya.MeshSprite3D;
        box.transform.rotate(new Laya.Vector3(0, 45, 0), false, false);
        var material: Laya.PBRSpecularMaterial = new Laya.PBRSpecularMaterial();
		Laya.Texture2D.load("res/layabox.png", Laya.Handler.create(null, function(tex:Laya.Texture2D) {
                material.albedoTexture = tex;
                box.meshRenderer.material = material;

                //给box添加自定义脚本
                box.addComponent(BoxControlScript);
        }));
        //4秒后删除组件
        Laya.timer.once(4000,this,function(){
            var script:BoxControlScript = box.getComponent(BoxControlScript);
            // 消除脚本
            // script.destroy();
            //不启用脚本可以有相同的效果（组件onUpdate方法将不会被更新）
            script.enabled=false;
        });
    }
}
new Main();
```


상위 코드 중 4초 후 개발자들은 구성 요소를 제외하고 스크립트를 사용하지 않고 스크립트를 사용하면 속성을 false 로 설정할 수 있습니다.

상술한 코드를 번역하면 다음의 효과를 얻을 수 있습니다.

![1](img/1.gif)(1)</br>>

