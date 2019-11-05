# 多光源渲染

###### *version :2.3.0   Update:2019-9-27*

최신 2.3.0에서 다광원 렌더를 지원했다.

###어떻게 다광원 렌더링

Config3D 수정이 필요합니다.**enbaleMultilight**다광원과 열지 여부**maxLightCount**최대 광원 개수 변수.2.3.0 중 기본값은 다광원 렌더가 열렸고, 기본 최대 광원 수는 32.

> 열고 다광원 렌더 변수 수정


```typescript

var config:Config3D = new Config3D();
//开启多光源
config.enbaleMultiLight = true;
//设置最大光源数
config.maxLightCount = 16;
Laya3D.init(750, 1334, config);
```


>다광원 렌더 닫기


```typescript

var config:Config3D = new Config3D();
//开启多光源
config.enbaleMultiLight = false;

Laya3D.init(750, 1334, config);
```


###다광원 렌더 사용

설정을 완성하면 이미 다광원 렌더가 열렸다.아래 관측 예시[demo地址](http://layaair2.ldc2.layabox.com/demo2/?language=ch&category=3d&group=Lighting&name=MultiLight)) 코드가 설명:

>>조명 스크립트 이동


```typescript

class LightMoveScript extends Script3D {
    //需要操作的光源数组
	public var lights: Array = [];
	//光源对应的位置偏移数组
	public var offsets: Array = [];
	//光源对应的移动半径数组
	public var moveRanges: Array = [];

	public function onUpdate(): void {
		var seed: Number = Laya.timer.currTimer * 0.002;
		for (var i: int = 0, n: Number = this.lights.length; i < n; i++) {
			var transform: Transform3D = this.lights[i].transform;
			var pos: Vector3 = transform.localPosition;
			var off: Vector3 = this.offsets[i];
			var ran: Vector3 = this.moveRanges[i];
			pos.x = off.x + Math.sin(seed) * ran.x;
			pos.y = off.y + Math.sin(seed) * ran.y;
			pos.z = off.z + Math.sin(seed) * ran.z;
			transform.localPosition = pos;
		}
	}
}
```


> 장면 추가, 다광원 추가


```typescript

Scene3D.load("res/threeDimen/scene/MultiLightScene/InventoryScene_Forest.ls", Handler.create(this, function (scene: Scene3D): void {
    //添加到场景
    Laya.stage.addChild(scene);
    var camera: Camera = scene.getChildByName("Main Camera") as Camera;
    camera.addComponent(CameraMoveScript);
    camera.transform.localPosition = new Vector3(8.937199060699333, 61.364798067809126, -66.77836086472654);
	//将灯光移动脚本添加到摄像机上
    var moveScript: LightMoveScript = camera.addComponent(LightMoveScript) as LightMoveScript;
    //获取操作的灯光数组
    var moverLights: Array = moveScript.lights;
    var offsets: Array = moveScript.offsets;
    var moveRanges: Array = moveScript.moveRanges;
    moverLights.length = 15;
    //添加15个点光
    for (var i: Number = 0; i < 15; i++) {
        //创建一个点光源
        var pointLight: PointLight = scene.addChild(new PointLight()) as PointLight;
        pointLight.range = 2.0 + Math.random() * 8.0;
        pointLight.color.setValue(Math.random(), Math.random(), Math.random());
        pointLight.intensity = 6.0 + Math.random() * 8;
        moverLights[i] = pointLight;
        //设置对应的位置偏移
        offsets[i] = new Vector3((Math.random() - 0.5) * 10, pointLight.range * 0.75, (Math.random() - 0.5) * 10);
        //设置对应的移动半径
        moveRanges[i] = new Vector3((Math.random() - 0.5) * 40, 0, (Math.random() - 0.5) * 40);
    }
	//创建一个聚光灯
    var spotLight: SpotLight = scene.addChild(new SpotLight()) as SpotLight;
    spotLight.transform.localPosition = new Vector3(0.0, 9.0, -35.0);
    spotLight.transform.localRotationEuler = new Vector3(-15.0, 180.0, 0.0);
    spotLight.color.setValue(Math.random(), Math.random(), Math.random());
    spotLight.range = 50;
    spotLight.intensity = 15;
    spotLight.spotAngle = 60;
}));
```


[] (img/1.gif)<br>(1)