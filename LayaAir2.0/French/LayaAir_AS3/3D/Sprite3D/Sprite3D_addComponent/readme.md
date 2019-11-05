#Composant ou script d 'ajout sprite3d

###### *version :2.0.1beta   Update:2019-4-13*

**Component**L 'ensemble est un groupe de base auquel sont ajoutés tous les objets 3D.Utilisation d 'un objet lors de l' ajout d 'un composant à un objet`addComponent`Méthode

[] (IMG / 1.png) <br > (Figure 1)

**Script3d**C 'est un script dans un monde 3D, hérité d' un composant, un composant.Cette catégorie est définie comme une "catégorie abstraite" et les exemples ne sont pas autorisés.L 'invention concerne une série de procédés virtuels.L 'utilisation détaillée peut être consultée dans l' API.[地址](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=3D&class=laya.d3.component.Script3D)) dans le monde en 3D, les scripts seront utilisés dans de nombreux endroits, l 'ensemble sera expliqué en détail dans le script suivant, dans le présent article, il ne s' agit que d' une simple explication de la manière d 'ajouter un script à sprite3d.

Les codes ci - après sont tirés de l'exemple officiel:[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Sprite3D&name=ScriptSample)).

> catégorie principale:
]


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


Ce script tourne l 'objet auquel il a été ajouté
]


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


Pour compléter le script, nous pouvons voir les effets après l 'exécution:

[] (IMG / 2.gif) <br > (Figure 2)
