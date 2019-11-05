# 在Unity中设置动画事件

###### *version :2.1.0beta   Update:2019-6-13*


在unity的Animator中我们我们可以添加动画触发事件 **ShowMsg**As shown in Figure 1.

![] (img/1.png)<br> (Figure 1)

This event means that when the animation is played to this location, it will trigger us.**ShowMsg**The name of the event.

Set up the event in Unity, Apply it, and finally export the animation model.

In LayaAir3D, we can create a script to receive this event.

First we create a script 3D script. The script name does not affect the trigger of the event. Here is the random name.


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


After loading the scenario, we add the script we created to cube.


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


Finally, the effect is shown in Figure 2.

![] (img/2.gif) <br> (Figure 2)

