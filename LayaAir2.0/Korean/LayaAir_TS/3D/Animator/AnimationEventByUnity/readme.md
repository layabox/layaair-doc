#유닛에 애니메이션 이벤트 설정

###### *version :2.1.0beta   Update:2019-6-13*

유닛의 애니메이터에 저희가 애니메이션 이벤트를 추가할 수 있습니다.**showMsg**그림 1.

[] (img/1.png)<br>(1)

이 사건은 애니메이션에서 이 위치에 방영될 때 우리를 촉발하는 것이다**ShowMsg**이 이름의 사건.

유닛에 이벤트를 설치한 뒤 애니메이션 모형을 마지막으로 내보내겠습니다.

Layaiar3D에서 이 사건을 인수할 수 있습니다.

우선 Script3D 스크립트를 만들고, 스크립트 이름에 영향을 주지 않는 촉발은 여기를 마음대로 지어낸 이름입니다.


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


이 스크립트를 호재한 후에 우리는 이 스크립트를 쿠브에 추가합니다.


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


마지막 효과를 보자. 그림 2 와 같다.

[] (img/2.gif)<br>(2)

