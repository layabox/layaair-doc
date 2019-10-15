# 在Unity中设置动画事件

###### *version :2.1.0beta   Update:2019-6-13*

アニメイトではアニメイトにアニメトリガーイベントを追加できます。**showMsg**図1のように。

！[](img/1.png)<br/>(図1)

このイベントは、アニメがこの位置に放送されると、私たちを触発するということです。**ShowMsg**この名前の事件。

unityでイベントを設定してApplyを最後にアニメモデルをエクスポートします。

LayaAir 3 Dではシナリオを作成してこのイベントを受信できます。

まず、Script 3 Dスクリプトを作成します。スクリプト名はイベントのトリガに影響しません。ここではフリーネームです。


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


シーンをロードした後、私たちが作成したこのスクリプトをcubeに追加します。


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


最後に効果を見にきました。

！[](img/2 gif)<br/>(図2)

