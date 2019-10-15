#アニメーション状態スクリプト

###### *version :2.1.0beta   Update:2019-6-13*

​**アニメイトStatit Script**アニメーション状態スクリプトは特殊なスクリプトで、追加されました。**アニメイトスター**アニメーション状態のスクリプト。このシナリオには自分のライフサイクルがあります。アニメーション状態の変化に従ってライフサイクル関数をトリガします。


```typescript

/**
* 动画状态开始时执行。
*/
public function onStateEnter():void {}
/**
* 动画状态更新时执行。
*/
public function onStateUpdate():void {}
/**
* 动画状态退出时执行。
*/
public function onStateExit():void {}
```


開発者はこれらの方法を書き換えることによって、アニメーションの状態が変わる時に自分の論理を実行することができます。

たとえば:

1.アニメーション状態に入るか、または終了するときにサウンドを再生します。

2.ある特定の状態である効果をアクティブにします。

アニメーション状態スクリプトは、Sprite 3 Dオブジェクトにスクリプトを追加する方法と非常に似ているアニメーション状態を作成し、追加することができます。使っているのはアニメの状態です。`addScript`アニメーション状態スクリプトを追加します。

下のコードは公式の例から来ています。[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Animation3D&name=AnimatorStateScriptDemo)を選択します。

>アニメーションイベントスクリプト


```typescript

import laya.d3.animation.AnimatorStateScript;
import laya.display.Text;

//继承自AnimatorStateScript(动画状态脚本)
class AnimatorStateScriptTest extends AnimatorStateScript {
	private var _text:Text = null;
	public function get text():Text {
		return _text;
	}
	public function set text(value:Text):int {
		_text = value;
	}
	public function AnimatorStateScriptTest() {
	}

	/**
	 * 动画状态开始时执行。
	 */
	override public function onStateEnter():void {
		trace("动画开始播放了");
		_text.text = "动画状态：动画开始播放";
	}
	
	/**
	 * 动画状态更新时执行。
	 */
	override public function onStateUpdate():void {
		trace("动画状态更新了");
		_text.text = "动画状态：动画更新中";
	}
	
	/**
	 * 动画状态退出时执行。
	 */
	override public function onStateExit():void {
		trace("动画退出了");
		_text.text = "动画状态：动画开始退出";
	}
}
```


>アニメーション状態スクリプトを追加し、テキストをバインドします。


```typescript

//创建一个动画状态
var state2:AnimatorState = new AnimatorState();
state2.name = "ride";
state2.clipStart = 0 / 581;
state2.clipEnd = 33 / 581;
state2.clip = animator.getDefaultState().clip;
state2.clip.islooping = true;
//给该动画状态添加脚本
var asst2:AnimatorStateScriptTest = state2.addScript(AnimatorStateScriptTest);
//给该脚本的text赋值（text由前面的代码创建）
asst2.text = text;
//给动画添加动画状态
animator.addState(state2);
```


効果を見てください:

！[](img/1.png)<br/>(図1)