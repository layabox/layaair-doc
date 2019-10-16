##Layaiar3D 스크립트 구성 요소



###부모 구성 요소Compont3D

Layaiair 3D 엔진에서 상대 제어 및 코드 관리를 편리하게 하기 위해 기능이 강한 구성 요소 Compont3D를 제공합니다.우리의 애니메이션 제어 구성 요소, 충돌기, 스크립트, 뼈 단점 등은 모두 구성 요소 기능에 기반 확장, 그것에 속한다.또한 Layaiair 3D 엔진은 3D 대상에 여러 개의 구성 요소를 추가해 구성 요소를 더욱 활성화시킬 수 있다.

앞서 기술문서에서 애니메이션 컨트롤 구성 요소와 충돌기 구성의 기본 기능을 소개하고 더 이상 말하지 않습니다.이 장절 중**우리는 주로 스크립트 구성 요소를 예시로 해석한다**구성 요소 클래스에 상속되지만, 자신의 확장 기능은 거의 없으며, 주로 부류Componnt 3D 속성 및 방법, 스크립트 기능 추가 업데이트가 늘어날 수 있으니 기대해 주세요.



###구성 요소의 주요 속성과 방법

**owner**구성 요소에 속한 Sprite3D 대상을 바인다.

**enable:**구성 요소가 활성화되고, 구성 요소를 다운로드할 때 기본값은 상태입니다. 만약 fasle 으로 변경된 후, 우선 변경 사항을 발송하고, 구성 요소의 갱신 방법, u update () 실행을 중단합니다.

***load (owner: Sprite3D):**구성 요소가 불러올 때 실행 방법, 기본 코드 없음.상속류에서 덮어쓸 수 있으며 초기화된 논리적 코드를 넣어야 합니다.

***start (state: Renderstate):**구성 요소를 다운로드하는 3D 대상이 사실화된 후 처음으로 업데이트 시 실행, 기본 코드 없음.상속류에서 덮어쓰기 위해서는 3D 대상이 완성된 논리적 코드를 넣어야 한다.

예를 들어 3D 디스플레이 대상 비동기 가재 시 스크립트를 추가하였습니다. 이 모형 및 재질은 아직 불러오지 않았습니다. 만약 스크립트 중 (구조법),,,...`_load()`방법 중 논리 코드 3D 디스플레이 대상 또는 스티커가 비어 버그 가 나타난다.이때 논리적 코드를 u start () 방법에 넣어 빈 상대 bug 발생을 피할 수 있다.

예를 들어 스크립트의 3D 대상을 복제하면 3D 대상이 많을 경우 스크립트가 먼저 완성됩니다. 스크립트에 논리가 들어가지 않으면 유start () 방법에서 가져오는 대상 버그 대상이 생길 수 있습니다.

***update (state: Renderstate):**구성 요소 업데이트 방법은 프레임 순환에 해당한다.상속류에 덮어쓰며 프레임마다 업데이트되는 논리적 코드 를 이 방법에 넣어야 합니다.



###구성 요소 관련 이벤트

** COMPONTu ADDED:**구성 요소를 불러오기 위해 구성 요소 소유자 Sprite3D 로 보내며 구성 요소는 인자 인자로 발송됩니다.****
****
**COMPONT REMOVED:**구성 요소가 삭제된 후 이벤트는 구성 요소 소유자 Sprite3D 로 보내며, 구성 요소는 인자 인자로 발송됩니다.****
****
**ENABLEu CHANGED: ** 구성 이벤트를 사용하여 속성 enable 수정을 사용하여 구성 요소를 발송하고 속성 인자로 발송됩니다.



###스크립트 구성 요소 Script

스크립트가 구성 요소를 계승하기 때문에 디스플레이 대상 adCompont () 방법으로 스크립트를 3D에 추가합니다.

홈페이지의 3D 엔진 예례에서 많은 예시 카메라가 사용된 카메라 모바일 스크립트 Cameramovescript, 카메라가 스크립트를 첨가하면 마우스 제어 및 키보드 컨트롤 및 키보드 컨트롤을 통해 위아래로 이동할 수 있으며, 개발자들은 인터넷에서 디스플레이를 다운로드한 뒤 연구와 수정을 찾을 수 있다.스크립트 구성 방법 추가 코드 다음과 같습니다:


```java

//添加摄像机脚本组件
camera.addComponent(CameraMoveScript);
```


물론 몇몇 논리적인 필요로 스크립트를 상대로 삭제할 수 있으며, 3D 디스플레이를 사용할 수 있는 remponentBype () 방법으로 스크립트를 제거할 수 있습니다.


```java

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


```java

package
{
	import laya.d3.component.Script;
	import laya.d3.core.MeshSprite3D;
	import laya.d3.core.Sprite3D;
	import laya.d3.core.material.StandardMaterial;
	import laya.d3.core.render.RenderState;
	import laya.d3.math.Vector3;
	import laya.d3.math.Vector4;
	
	public class BoxControlScript extends Script
	{
      	/**脚本所属的3D对象***/
		private var box:MeshSprite3D;
		
		public function BoxControlScript()
		{
		}
		/**
		 * 覆写3D对象加载组件时的执行方法
		 * @param owner 加载此组件的3D对象
		 */	
		override public function  _load(owner:Sprite3D):void
		{
			//获取脚本所属对象
			box=owner as MeshSprite3D;
		}
		/**
		 * 覆写组件所属3D对象实例化完成后，第一次更新时的执行方法
		 */	
		override public function _start(state:RenderState):void
		{
			//获取模型上的材质
			var material:StandardMaterial=box.meshRender.material;
			//修改材质的反射率颜色，让模型偏红
			material.albedo=new Vector4(1,0,0,1);
		}
		
		/**
		 * 覆写组件更新方法（相当于帧循环）
		 * @param state 渲染状态
		 */	
		override public function _update(state:RenderState):void
		{
			//所属脚本对象旋转更新
			box.transform.rotate(new Vector3(0,0.5,0),false,false);
		}
	}
}
```


그리고'3D 여행 빠른 시일 내에 보이스에 이 스크립트를 추가하고 4초 후에 스크립트를 제거합니다.


```java

package {
	import laya.d3.component.Script;
	import laya.d3.core.Camera;
	import laya.d3.core.MeshSprite3D;
	import laya.d3.core.Sprite3D;
	import laya.d3.core.light.DirectionLight;
	import laya.d3.core.material.StandardMaterial;
	import laya.d3.core.scene.Scene;
	import laya.d3.math.Vector3;
	import laya.d3.math.Vector4;
	import laya.d3.resource.Texture2D;
	import laya.d3.resource.models.BoxMesh;
	import laya.display.Stage;
	import laya.utils.Stat;
	
	public class LayaAir3D_Script 
	{
		public function LayaAir3D_Script() 
		{
			//初始化引擎
			Laya3D.init(0, 0,true);
			//适配模式
			Laya.stage.scaleMode = Stage.SCALE_FULL;
			Laya.stage.screenMode = Stage.SCREEN_NONE;
			//开启统计信息
			Stat.show();
			
			//添加3D场景---------------------------------
			var scene:Scene = Laya.stage.addChild(new Scene()) as Scene;
			//添加摄像机---------------------------------
			var camera:Camera = (scene.addChild(new Camera( 0, 0.1, 100))) as Camera;
			//移动摄像机位置
			camera.transform.translate(new Vector3(0, 2, 3));
			//旋转摄像机方向（角度）
			camera.transform.rotate(new Vector3( -30, 0, 0), true, false);
			//设置背景颜色
			camera.clearColor = null;
			
			//添加平行光----------------------------------
			var directionLight:DirectionLight = scene.addChild(new DirectionLight()) as DirectionLight;
			//灯光的漫反射颜色
			directionLight.color = new Vector3(1.6, 1.6, 1.6);
			//灯光的方向(弧度)
			directionLight.direction = new Vector3(0.3, -1, 0);
          
          	//灯光的环境色
			scene.ambientColor = new Vector3(0.6, 0.6, 0.6);
			
			//添加自定义模型------------------------------
			var box:MeshSprite3D = scene.addChild(new MeshSprite3D(new BoxMesh(1,1,1))) as MeshSprite3D;
			//模型旋转方向
//			box.transform.rotate(new Vector3(0,45,0),false,false);
			//创建模型的材质
			var material:StandardMaterial = new StandardMaterial();
			//材质的漫反射贴图
			material.diffuseTexture = Texture2D.load("res/layabox.png");
			//为模型赋上材质
			box.meshRender.material = material;
			
          
			//添加自定义脚本并实例化脚本对象------------------------------------------
			box.addComponent(BoxControlScript);
            //可在添加组件时获取组件对象
         	//var boxScript:Script=box.addComponent(BoxControlScript);
          
			//添加定时4秒执行一次回调函数
			Laya.timer.once(4000,this,onLoop,[box,boxScript]);
		}
		
      	//4秒后回调函数，移除脚本组件
		private function onLoop(box:MeshSprite3D,boxScript:Script):void
		{
			//移除BoxControlScript类型脚本组件
			box.removeComponentsByType(BoxControlScript);
			//移除所有组件
//			box.removeAllComponent();
            //如不想移除组件，可设置为不启用能达到同样效果（组件_update方法将不会被更新）
//          boxScript.enable=false;
		}
	}
}
```


상위 코드 중 4초 후 개발자들은 구성 요소를 제외하고 스크립트를 사용하지 않고 스크립트를 사용하면 속성을 false 로 설정할 수 있습니다.



상술한 코드를 번역하면 다음의 효과를 얻을 수 있습니다.

![图1](img/1.gif)< br > (그림 1)