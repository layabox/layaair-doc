# 鼠标脚本 

###### *version :2.1.1   Update:2019-8-2*

  	在LayaAir2.0中为了方便开发者，提供了鼠标脚本---Script3D中的鼠标事件。如果想要使用鼠标脚本，在脚本owner上还是需要有物理碰撞器。

**Tips**：鼠标脚本依赖射线检测，只不过不用开放者自己手动创建射线了。

**鼠标脚本内容：**

> Method

`onMouseClick():void` 鼠标点击时执行

`onMouseDown():void` 鼠标按下时执行 

`onMouseDrag():void` 鼠标拖拽时执行

`onMouseEnter():void` 鼠标进入时执行

`onMouseOut():void` 鼠标离开时执行 

`onMouseOver():void` 鼠标经过时执行 

`onMouseUp():void` 鼠标弹起时执行

上面的方法都为虚方法，使用时重写覆盖即可。

在上面示例基础上我们创建了个鼠标脚本，并且给4个猴都添加了脚本。

> **脚本类**：

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

> **主类**:

```typescript
//给四个猴子添加脚本
this.staticLayaMonkey.addComponent(MouseScript);
this.layaMonkey_clone1.addComponent(MouseScript);
this.layaMonkey_clone2.addComponent(MouseScript);
this.layaMonkey_clone3.addComponent(MouseScript);
```

鼠标脚本的效果如图1所示：

![](img/1.gif)<br>(图1)
