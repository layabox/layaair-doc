#Setting Animation Events in Unity

###### *version :2.1.0beta   Update:2019-6-13*

In Unity's animator, we can add animation trigger events**ShowMsg**As shown in Figure 1.

![] (img/1.png)<br> (Figure 1)

This event means that when the animation is played to this location, it will trigger us.**ShowMsg**The name of the event.

Set up the event in Unity, Apply it, and finally export the animation model.

In LayaAir3D, we can create a script to receive this event.

First, we create a script3d script. The name of the script does not affect the trigger of the event. Here is the name you choose casually.


```typescript


export default class SceneScript extends Laya.Script3D {
    //用于表现的方法
    public showMsgFunc;
	constructor(){
		super();
	}
	
	//对应unity添加的AnimationEvent的动画事件函数，名字是可以对应上的
	ShowMsg(){
		console.log("ShowMsg");
		this.showMsgFunc && this.showMsgFunc();
	}
}
```


After loading the scenario, we add the script we created to cube.


```typescript

//加载场景
Laya.Scene3D.load("res/threeDimen/scene/LayaScene_AnimationEvent/Conventional/layaScene.ls", Laya.Handler.create(this, function(scene) {
    Laya.stage.addChild(scene);
    //获取cube对象
    var cube = scene.getChildByName("Cube") as Laya.Sprite3D;
    //添加组件(脚本)
    var _script = cube.addComponent(SceneScript) as SceneScript;
    //label用于显示
    var _lab = new Laya.Label();
    _lab.text = "test";
    _lab.height = 100;
    _lab.width = 100;
    _lab.fontSize = 40;
    _lab.pos(200,200);
    Laya.stage.addChild(_lab);
	//给脚本的加强表现用方法赋值
    _script.showMsgFunc = function () 
    {
        this.text = "ShowMsg";
        this.color = "red";
    }.bind(_lab);
    
}));
```


Finally, take a look at the effect, as shown in Figure 2.

![] (img/2.gif) <br> (Figure 2)

