#Sprite3D 구성 요소나 스크립트 추가

###### *version :2.0.1beta   Update:2019-4-13*

**Compont**구성 요소는 모든 3D 대상에 첨부된 내용의 기류다.물체에 구성 요소를 추가할 때 물체가 사용해야 한다`addComponent`방법.

[] (img/1.png)<br>(1)

**Script3D**3D 세계의 스크립트를 계승하여 구성 요소의 하나다.이 종류는 추상류 (추상류) 로 정의되어 있어 실례를 허용하지 않는다.이 종류는 일련의 허술한 방법을 제공했다.자세하게 사용하면 API 에서 보기 (를) 가능합니다.[地址](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=3D&class=laya.d3.component.Script3D)) 3D 세계의 개발에서 스크립트는 여러 곳에서 사용될 수 있으며 이 구성은 뒤의 스크립트에서 상세하게 설명할 것이며, 이 편은 단순히 Sprite3D 에 스크립트를 추가할 수 있도록 간단한 설명이다.

이하 코드 는 공식 예제 () 에서 나온다[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Sprite3D&name=ScriptSample)무엇

> 메인 종류:
>>


```typescript

public function ScriptSample() {
    //初始化引擎
    Laya3D.init(0, 0);
    Laya.stage.scaleMode = Stage.SCALE_FULL;
    Laya.stage.screenMode = Stage.SCREEN_NONE;

    //预加载所有资源
    var resource:Array = ["res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh"];
    Laya.loader.create(resource, Handler.create(this, onComplete));
}

private function onComplete():void {
    //记载场景
    var scene:Scene3D = Laya.stage.addChild(new Scene3D()) as Scene3D;

    //加载相机
    var camera:Camera = scene.addChild(new Camera(0, 0.1, 100)) as Camera;
    camera.transform.translate(new Vector3(0, 0.8, 1.5));
    camera.transform.rotate(new Vector3(-15, 0, 0), true, false);

    //创建平行光
    var directionLight:DirectionLight = scene.addChild(new DirectionLight()) as DirectionLight;
    directionLight.color = new Vector3(0.6, 0.6, 0.6);

    //加载精灵
    var monkey:Sprite3D = Loader.getRes("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh");
    //精灵添加脚本
    monkey.addComponent(MonkeyScript);
    scene.addChild(monkey);
}
```


>> 스크립트: (이 스크립트가 스크립트를 돌려서 이 스크립트의 물체를 추가합니다)
>>


```typescript

import laya.d3.component.Script3D;
import laya.d3.core.Sprite3D;
import laya.d3.math.Vector3;

class MonkeyScript extends Script3D {
	private var rotation:Vector3 = new Vector3(0, 0.03, 0);
	
	override public function onAwake():void {
		trace("onAwake");
	}
	
	override public function onStart():void {
		trace("onStart");
	}
	
	override public function onUpdate():void {
		(owner as Sprite3D).transform.rotate(rotation, false);
	}
	
	override public function onLateUpdate():void {
		trace("onLateUpdate");
	}
}

```


이 스크립트가 완성되었습니다. 실행 후 효과를 볼 수 있습니다.

[] (img/2.gif)<br>(2)
