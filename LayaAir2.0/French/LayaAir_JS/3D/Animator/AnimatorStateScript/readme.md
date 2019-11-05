#Script d 'état animé

###### *version :2.1.0beta   Update:2019-6-13*

​**Animator statescript**Le script d 'état animé est un script spécial**Animatorstate**Script sur l 'état d' animationCe script a son cycle de vie.Modifier l 'état de l' animation pour déclencher la fonction du cycle de vie.


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


Le développeur peut exécuter sa propre logique lorsque l 'état d' animation change en réécrivant ces procédés.

Par exemple:

Diffusion sonore lors de l'entrée ou du retrait d'une animation.

L'activation d'un effet systémique dans un état particulier.

Un script d 'état d' animation peut être créé et ajouté à l 'état d' animation de manière très similaire à l 'ajout d' un script d 'objet sprite3d.En utilisant l 'état animé`addScript`Procédé d 'ajout d' un script d 'état animé

Le code ci - dessous est issu de l 'exemple officiel.[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Animation3D&name=AnimatorStateScriptDemo)).

Scénario d 'événement animé


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


> Ajouter un script d 'état d' animation et lier le texte \ \ Text


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


Pour voir les effets:

[] (IMG / 1.png) <br > (Figure 1)