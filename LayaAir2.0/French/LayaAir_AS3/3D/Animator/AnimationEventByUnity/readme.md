# 在Unity中设置动画事件

###### *version :2.1.0beta   Update:2019-6-13*

Dans l'animateur de l'Unity, on peut ajouter une animation.**Showmsg**Voir la figure 1.

[] (IMG / 1.png) <br > (Figure 1)

C'est ce qui veut dire que quand l'animation sera là, elle nous déclenchera.**Showmsg**Ce nom.

Définissez l 'événement dans l' unité et apply, puis exportez le modèle d 'animation.

Dans layaair3d, nous pouvons créer un script pour recevoir cet événement.

Tout d 'abord, nous avons créé un script script 3D qui n' affecte pas le déclenchement de l 'événement.


```typescript

import laya.d3.component.Script3D;

class SceneScript extends Script3D {
    //用于表现的方法
	public var showMsgFunc:Function;
	public function SceneScript() {
	
	}
	
	//对应unity添加的AnimationEvent的动画事件函数，名字是可以对应上的
	public function ShowMsg():void {
		trace("ShowMsg");
		showMsgFunc && showMsgFunc();
	}
}
```


Après avoir chargé la scène, nous ajoutons le script que nous avons créé à cube.


```typescript

//加载场景
Scene3D.load("res/threeDimen/scene/LayaScene_AnimationEvent/Conventional/layaScene.ls", Handler.create(this, function(scene:Scene3D):void {
    Laya.stage.addChild(scene) as Scene3D;
    //获取cube对象
    var cube:Sprite3D = scene.getChildByName("Cube");
    //添加组件(脚本)
    var _script:SceneScript = cube.addComponent(SceneScript);
    //label用于显示
    var _lab:Label = new Label();
    _lab.text = "test";
    _lab.height = 100;
    _lab.width = 100;
    _lab.fontSize = 40;
    _lab.pos(200,200);
    Laya.stage.addChild(_lab);
	//给脚本的加强表现用方法赋值
    _script.showMsgFunc =  function ():void 
    {
        text = "ShowMsg";
        color = "red";
    }.bind(_lab);
    
}));
```


Enfin, pour voir les effets, voir la figure 2.

[] (IMG / 2.gif) <br > (Figure 2)

