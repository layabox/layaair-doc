#Animation status script

###### *version :2.1.0beta   Update:2019-6-13*


​	**Animator StateScript**Animation status script is a special script that is added to**Animator State**The script on the animation state. This script has its own life cycle. Following animation state changes trigger life cycle functions.


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


Developers can rewrite these methods to implement their own logic when the animation state changes.

For example:

1. Play sound when entering or exiting an animation state.

2. Activate a system effect in a specific state.

Animation state scripts can be created and added to the animation state in a very similar way to Sprite3D object addition scripts. Using animation state`addScript`Method to add animation status scripts.

The following code is from the official example（[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Animation3D&name=AnimatorStateScriptDemo))

> animation event script


```typescript

//继承自AnimatorStateScript(动画状态脚本)
export default class AnimatorStateScriptTest extends Laya.AnimatorStateScript {
    constructor() {
        super();
        this._text = null;
    }
    
	get text() {
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


> Add animation status scripts and bind _text text text


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


See the effect:

![] (img/1.png)<br> (Figure 1)