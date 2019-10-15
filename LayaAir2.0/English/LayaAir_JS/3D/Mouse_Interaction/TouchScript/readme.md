#Mouse script

###### *version :2.1.1   Update:2019-8-2*

In LayaAir 2.0, for the convenience of developers, the mouse script, mouse events in Script3D, is provided. If you want to use a mouse script, you still need a physical collider on the script owner.

**Tips**Mouse scripts rely on ray detection, but do not need the opener to create the ray manually.

**Mouse script content:**

> Method

`onMouseClick():void`Mouse click execution

`onMouseDown():void`Execute when the mouse is pressed

`onMouseDrag():void`Mouse dragging execution

`onMouseEnter():void`Mouse Entry Execution

`onMouseOut():void`Execute when the mouse leaves

`onMouseOver():void`Mouse Passing Time Execution

`onMouseUp():void`Execution when the mouse pops up

The above methods are all virtual methods, which can be overridden when used.

Based on the above example, we created a mouse script and added scripts to all four monkeys.

>**Script class**:


```typescript

export default class MouseScript extends Laya.Script3D{
		constructor(){super();}
		//物体必须拥有碰撞组件（Collider）
		//当被鼠标点击
		onMouseDown(e){
			//console.log("点击到了我box",owner.name);
			//从父容器销毁我自己
			this.owner.removeSelf();
		}
	}
```


>**Main class**:


```typescript

//给四个猴子添加脚本
this.staticLayaMonkey.addComponent(MouseScript);
this.layaMonkey_clone1.addComponent(MouseScript);
this.layaMonkey_clone2.addComponent(MouseScript);
this.layaMonkey_clone3.addComponent(MouseScript);
```


The effect of the mouse script is shown in Figure 1.

![] (img/1.gif) <br> (Fig. 1)
