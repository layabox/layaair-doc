#Rendu Multi - source

###### *version :2.3.0   Update:2019-9-27*

Le rendu Multi - source est déjà pris en charge dans le dernier 2.3.0.

###How to Open Multi - source rendu

Il faut modifier le contenu de config3d**Enbale multilight**Est - ce qu 'une multi - source de lumière et**Maxlightcount**Maximum light source2.3.0 le rendu Multi - sources a été activé par défaut et le nombre maximum de sources par défaut est de 32.

> ouvrir et modifier les paramètres de rendu de sources multiples de lumière


```typescript

var config = new Laya.Config3D();
//开启多光源
config.enbaleMultiLight = true;
//设置最大光源数
config.maxLightCount = 16;
Laya3D.init(750, 1334, config);
```


Désactiver le rendu Multi - source


```typescript

var config = new Laya.Config3D();
//开启多光源
config.enbaleMultiLight = false;

Laya3D.init(750, 1334, config);
```


###Multi - source rendu

Le rendu Multi - source a été activé dès que les paramètres ont été achevés.Exemples officiels ci - après[demo地址](http://layaair2.ldc2.layabox.com/demo2/?language=ch&category=3d&group=Lighting&name=MultiLight)Le code explique:

Flying Light script


```typescript

export default class LightMoveScript extends Laya.Script3D {
    //需要操作的光源数组
	public lights = [];
	//光源对应的位置偏移数组
	public offsets = [];
	//光源对应的移动半径数组
	public moveRanges = [];

	public onUpdate(){
		var seed = Laya.timer.currTimer * 0.002;
		for (var i = 0, n = this.lights.length; i < n; i++) {
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


> charger la scène et ajouter plusieurs sources de lumière


```typescript

Laya.Scene3D.load("res/threeDimen/scene/MultiLightScene/InventoryScene_Forest.ls", Laya.Handler.create(this, function (scene) {
    //添加到场景
    Laya.stage.addChild(scene);
    var camera = scene.getChildByName("Main Camera");
    camera.addComponent(CameraMoveScript);
    camera.transform.localPosition = new Laya.Vector3(8.937199060699333, 61.364798067809126, -66.77836086472654);
	//将灯光移动脚本添加到摄像机上
    var moveScript = camera.addComponent(LightMoveScript);
    //获取操作的灯光数组
    var moverLights = moveScript.lights;
    var offsets = moveScript.offsets;
    var moveRanges = moveScript.moveRanges;
    moverLights.length = 15;
    //添加15个点光
    for (var i = 0; i < 15; i++) {
        //创建一个点光源
        var pointLight = scene.addChild(new Laya.PointLight());
        pointLight.range = 2.0 + Math.random() * 8.0;
        pointLight.color.setValue(Math.random(), Math.random(), Math.random());
        pointLight.intensity = 6.0 + Math.random() * 8;
        moverLights[i] = pointLight;
        //设置对应的位置偏移
        offsets[i] = new Laya.Vector3((Math.random() - 0.5) * 10, pointLight.range * 0.75, (Math.random() - 0.5) * 10);
        //设置对应的移动半径
        moveRanges[i] = new Laya.Vector3((Math.random() - 0.5) * 40, 0, (Math.random() - 0.5) * 40);
    }
	//创建一个聚光灯
    var spotLight = scene.addChild(new Laya.SpotLight());
    spotLight.transform.localPosition = new Laya.Vector3(0.0, 9.0, -35.0);
    spotLight.transform.localRotationEuler = new Laya.Vector3(-15.0, 180.0, 0.0);
    spotLight.color.setValue(Math.random(), Math.random(), Math.random());
    spotLight.range = 50;
    spotLight.intensity = 15;
    spotLight.spotAngle = 60;
}));
```


[] (IMG / 1.gif) <br > (Figure 1)