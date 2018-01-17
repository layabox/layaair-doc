# Extended scripts

​	This is often the case in the development of a project: When official components can not provided the customers demand. For example, an extended Button component function. Add new attributes, also want to set the new property in the IDE. After LayaAirIDE1.4.0 version provides two ways: extended scripts and additional scripts.

​	**Extended Script: ** In the way of inheritance, it expands a component function, implements own logic, even adds new properties, and displays new attributes in IDE, setting up new attributes visually.

​	**Additional script: ** In a non-inherited way, an additional way to add some behavior to a component, add new properties, and display new properties in the IDE, the visual settings of new properties	

​	With these extensions, developers can modify the behavior of components, add new attributes, visualize the combination of UI scenarios and codes, and add multiple extension scripts to the same scenario.

​	**Difference between extended and additional scripts**: The extension script inherits from the component itself; the additional script adds a script controlling the component to the component itself, which can modify any property of the current component without inheritance.

​	**In this article, we will detail the use of extended scripts by adding the same script to multiple components, moving them at different speeds and names. The final result is as shown below (fuzzy in the picture is caused by the recording software, real effect is smoother animated):**

![0](img\0.gif)(Picture 0)

### 1. Making UI pages

​	Create a new UI page named ExpandPage. Put a Box component on the UI page, put a picture and a text component in the Box component, name userN for the text component, set the size and alignment and save it. As shown in Figure 1:


![1](img\1.png)(Picture 1)



### 2. Create an extension script and add a value to the component

​	Right-click in the UI panel management - new script, select the extended script (you can create a UI page, select the script column), the script corresponds to the logical class that runs below the class name. as shown in picture 2:

![2](img\2.png)(Picture 2)

	When you click the confirmation button, you will automatically generate a .Script file in the project panel, which will bring some common attributes. When you add the attribute, you can refer to these attribute templates, as shown in Figure 3.

![3](img\3.png)(Picture 3)

Add the properties we need in the MonkeyScript tab as shown in Figure 4:

![4](img\4.png)(Picture 4)

Additional scripts to open the UI after editing is complete, in order to allow developers to see the changes more intuitively, in this Box will copy multiple to the UI interface, as shown in Figure 5:

![5](img\5.png)(Picture 5)

Next, you will make a MonkeyScript extension script with Box drag-and-drop. We will find that a new component identifier will be added to the Box. At the same time, we can see the additional script's attribute information on the right column. as shown in Figure 6:

![6](img\6.gif)(Picture 6)

​	Give to three components speed and userName assignment, the speed increases in order, set to 1.2.3， respectively, the name is 小a、小b、小c: The object attributes of the three components of the same component are also assigned different values. After saving, UI is exported according to the shortcut key F12 (Ctrl+F12), and code is written in editor.


### Code writing

After importing the project into FlashBuilder, open the ExpandPageUI file and find that there is a mistake, and no game.MonkeyScript can be found. As shown in Figure 7:

![7](img\7.png)(Picture 7)

​	This error do not worry, this is because the MonkeyScript script corresponding to the logic class is the need to create their own developers, because it has not been created, so the editor can not find, resulting in an error.

Next, we create a MonkeyScript class under the src/game package (if there is no game package, you need to create a game package in the SRC directory). After adding, it will be found that the errors in the ExpandPageUI class disappear, as shown in Figure 8:

![8](img\8.png)(Picture 8)

Write new properties in the extension script in MonkeyScript, all of the code is as follows:

It needs to define the owner or target properties, It is used to be an empty component reference.

```typescript
package game
{
	import laya.display.Sprite;
	import laya.ui.Label;
	/**
	 *附加脚本对应的逻辑类 
	 * @author mengjia
	 * 
	 */	
	public class MonkeyScript
	{
		/**攻击速度**/
		public var speed:Number = 0;
		/**人物名称**/
		public var userName:String = "";
		/**记录状态**/		
		private var boo:Boolean = false;
		/**定义一个变量来接收Box组件实例**/		
		private var monkeyBox:Sprite;
		public function MonkeyScript()
		{
			
		}
		/**
		 *设置owner函数，可以直接获取到添加附加脚本的组件实例 
		 * @param value
		 * 
		 */		
		public function set owner(value:*):void{
			monkeyBox = value;
			//自定义的脚本会有时序问题，所以在此添加一个延时
			monkeyBox.frameOnce(2,this,onLoaded);
		}
		
		private function onLoaded():void
		{
			//通过子元素的name值获取该对象
			var userN:Label = monkeyBox.getChildByName("userN") as Label;
			//设置文本内容为属性栏中给的值
			userN.text = userName;
			monkeyBox.frameLoop(1,this,onLoop);
		}
		/**
		 *设置帧循环，实现左右移动 
		 * 
		 */	
		private function onLoop():void
		{
			if(monkeyBox.x<=0){
				boo = false;
				monkeyBox.x+=speed;
			}
			else if(monkeyBox.x<Laya.stage.width-monkeyBox.width && boo == false){
				monkeyBox.x+=speed;
			}
			else if(monkeyBox.x>=Laya.stage.width-monkeyBox.width || boo == true){
				monkeyBox.x-=speed;
				boo = true;
			}
		}
	}
}
```

Finally instantiate the ExpandPageUI page in the entry class (** Note: You must preload the required resources ** before instantiating the UI interface), the code is as follows:

```typescript
package {
	import laya.media.SoundManager;
	import laya.utils.Handler;
	
	import ui.ExpandPageUI;

	public class LayaSample {
		
		public function LayaSample() {
			//初始化引擎
			Laya.init(600, 700);
			//设置背景色
			Laya.stage.bgColor = "#ffcccc";
			//预加载资源
			Laya.loader.load("res/atlas/test.atlas",Handler.create(this,onLoaded));
			
		}		
		
		private function onLoaded():void
		{
			//实例化UI界面
			var ExpandPage:ExpandPageUI = new ExpandPageUI();
			//添加到stage上
			Laya.stage.addChild(ExpandPage);
			
		}
	}
}
```

The final result is shown in Figure 0 at the beginning of the article.