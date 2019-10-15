#애니메이션 상태 스크립트

###### *version :2.1.0beta   Update:2019-6-13*

​**애니matorstateScript**애니메이션 상태 스크립트는 특수한 스크립트이며 추가**애니matorstate**애니메이션 상태의 스크립트.이런 각본은 자신의 생명 주기가 있다.애니메이션 상태에 따라 생명주기 함수 변화.


```typescript

/**
* 动画状态开始时执行。
*/
onStateEnter() {}
/**
* 动画状态更新时执行。
*/
 onStateUpdate() {}
/**
* 动画状态退出时执行。
*/
 onStateExit() {}
```


개발자는 이 몇 가지 방법을 재작성하여 애니메이션 상태를 바꿀 때 자신의 논리를 실행할 수 있다.

예를 들어:

1. 애니메이션 상태에서 빠지거나 소리를 낸다.

2. 어떤 특정 상태에서 어떤 효과를 활성화시킨다.

애니메이션 상태 스크립트는 애니메이션 상태에 추가할 수 있으며, 그 방식은 Sprite3D 대상과 스크립트를 추가하는 것과 매우 비슷하다.애니메이션 상태를 사용했어요.`addScript`애니메이션 상태 스크립트를 방법으로 추가합니다.

아래쪽의 코드 는 관측에서 예제()에서 나온다.[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Animation3D&name=AnimatorStateScriptDemo)무엇

> 애니메이션 이벤트 스크립트


```typescript

//继承自AnimatorStateScript(动画状态脚本)
export default class AnimatorStateScriptTest extends Laya.AnimatorStateScript {
    private _text:Laya.Text;
    constructor() {
        super();
    }
    
	get text():Laya.Text {
		return this._text;
	}
    
	set text(value) {
		this._text = value;
	}
    
	/**
	 * 动画状态开始时执行。
	 */
	 onStateEnter() {
		console.log("动画开始播放了");
		this._text.text = "动画状态：动画开始播放";
	}
	
	/**
	 * 动画状态更新时执行。
	 */
	 onStateUpdate() {
		console.log("动画状态更新了");
		this._text.text = "动画状态：动画更新中";
	}
	
	/**
	 * 动画状态退出时执行。
	 */
	onStateExit() {
		console.log("动画退出了");
		this._text.text = "动画状态：动画开始退出";
	}
}
```


> 애니메이션 상태 스크립트를 추가하고 묶기 utext 텍스트


```typescript

//创建一个动画状态
var state2 = new Laya.AnimatorState();
state2.name = "ride";
state2.clipStart = 0 / 581;
state2.clipEnd = 33 / 581;
state2.clip = animator.getDefaultState().clip;
state2.clip.islooping = true;
//给该动画状态添加脚本
var asst2 = state2.addScript(AnimatorStateScriptTest);
//给该脚本的text赋值（text由前面的代码创建）
asst2.text = text;
//给动画添加动画状态
this.animator.addState(state2);
```


효과 보기:

[] (img/1.png)<br>(1)