# Implement runTime

In LayaAirIDE, all components of the resource panel have the attributes of runtime. Runtime is the logical class of the component runtime. The same components can use the same runtime class to achieve the same functions, for example, different pages need the same components to achieve the same function. **what we need to pay attention to is the runtime logic class of components. If we do not inherit the components themselves and inherit objects without the attributes of the component, this property will fail. **

**This article will implement the same function for the Image component in two different pages with the same runtime logic class, as shown in the dynamic figure 0.**

![0](img\0.gif)(figure 0)

### 1. Set the runtime class for the components in the page

Create two UI pages in the page management directory, called MonkeyPage and BGPage. Each of the two UI pages is dragged into a Image component, and the runtime property is set to game.ImageRunTime. As shown in Figure 1, figure 2:

![1](img\1.png)(Figure 1)

![2](img\2.png)(Figure 2)

Save the export UI after the setup is complete, and start writing the code.



### 2. code process

After opening BGPageUI and MonkeyPageUI class in FlashBuilder, you will find that there is a report error in it, as shown in the following figure (here we open BGPageUI class, MonkeyPageUI is similar to BGPageUI class):

![3](img\3.png)(figure 3)

Do not worry about this error, because the project ImageRunTime logical class needs to create their own, there is not created, there is no game package, so the editor can not find, resulting in an error.

Next we create a game package in the src directory and create an ImageRunTime class in the game package. After creating we will find BGPageUI and MonkeyPageUI class error disappeared, as shown in Figure 4:

![4](img\4.png)(figure 4)

Then write the effect we want to achieve in the ImageRunTime class, such as implementing a click zoom (something like a button) with the following code:

```typescript
package game
{
	import laya.events.Event;
	import laya.ui.Image;
	import laya.utils.Tween;
	/**
	 *ImageRunTime逻辑类 
	 * @author mengjia
	 * 
	 */
	public class ImageRunTime extends Image
	{
		//缩放时间100毫秒
		public var scaleTime:int = 100;
		public function ImageRunTime()
		{
			//设置组件的中心点
			this.anchorX = this.anchorY = 0.5;
			//添加鼠标按下事件侦听。按时时缩小按钮。
			this.on(Event.MOUSE_DOWN,this,scaleSmal);
			//添加鼠标抬起事件侦听。抬起时还原按钮。
			this.on(Event.MOUSE_UP,this, scaleBig);
			//添加鼠标离开事件侦听。离开时还原按钮。
			this.on(Event.MOUSE_OUT,this, scaleBig);
		}
		private function scaleBig():void
		{
			//变大还原的缓动效果
			Tween.to(this, {scaleX:1,scaleY:1},scaleTime);
		}
		private function scaleSmal():void
		{
			//缩小至0.8的缓动效果
			Tween.to(this,{scaleX:0.8,scaleY:0.8},scaleTime);
		}
	}
}
```

The two UI interfaces are instantiated in the main run class, as shown in the code as follows:

```typescript
package {
	import laya.utils.Handler;
	import ui.BGPageUI;
	import ui.MonkeyPageUI;

	public class LayaSample {
		
		public function LayaSample() {
			//初始化引擎
			Laya.init(800, 700);
			//预加载资源
			Laya.loader.load("res/atlas/test.atlas",Handler.create(this,onLoaded));
		}		
		
		private function onLoaded():void
		{
			//实例化BGPageUI页面
			var bgPage:BGPageUI = new BGPageUI();
			//为了能够清楚的看到这个页面所在的位置，在此设置设置一个背景色
			bgPage.graphics.drawRect(0,0,300,300,"#ffcccc");
			//添加到stage
			Laya.stage.addChild(bgPage);
			
			//实例化MonkeyPageUI页面
			var monkeyPage:MonkeyPageUI = new MonkeyPageUI();
			//为了能够清楚的看到这个页面所在的位置，在此设置设置一个背景色
			monkeyPage.graphics.drawRect(0,0,300,300,"#ffcccc");
			//添加到stage
			Laya.stage.addChild(monkeyPage);
			//设置第二个页面的坐标
			monkeyPage.x = 350;
		}
	}
}
```

Final run effect shown in Figure 0



### 3. Whether object inherited by the runtime logic class is not its own component

In the code above, we demonstrate the effect of inheriting from the Image itself, what happens if we inherit a Button component class? Let's take a look at it. The code and the effect are as follows:

```typescript
package game
{
	import laya.display.Sprite;
	import laya.events.Event;
	import laya.maths.Rectangle;
	import laya.ui.Button;
	import laya.ui.Image;
	import laya.utils.Tween;

	/**
	 *ImageRunTime逻辑类 
	 * @author mengjia
	 * 
	 */
	public class ImageRunTime extends Button
	{
		//缩放时间100毫秒
		public var scaleTime:int = 100;
		public function ImageRunTime()
		{
			//设置组件的中心点
			this.anchorX = this.anchorY = 0.5;
			......
		}
		......
	}
}
```

![5](img\5.gif)(figure 5)

At this point we will find the UI page resources display weird, this is because the button skin is three state  by default, when the Image runtime logic class inherits from the Button component, it is no longer an Image component, but a  Button component.


