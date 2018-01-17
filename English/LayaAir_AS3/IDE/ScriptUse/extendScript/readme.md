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

![2](img\2.png)(picture 2)

​	Click the OK button in the project panel will automatically generate a. Prop file. There are some common properties in this file, which can be referred to when new attributes are added, as shown in Figure 3.

![3](img\3.png)(picture 3)

Add the attributes we need in the MonkeyProp label, as shown in Figure 4.

![4](img\4.png)(picture 4)

​	The extension script editor opens the UI interface to enable developers to see changes more intuitively, here to copy multiple Box copies to the UI interface, as shown in Figure 5:

![5](img\5.png)(picture 5)

Next, you will make a MonkeyProp.prop extension script with Box drag-and-drop, as shown in Figure 6:

![6](img\6.gif)(picture 6)

​	After dragging and dropping on the component, there is no change in the hierarchical list and UI interface, but you will see the new properties in the right property bar of the Box component. As shown in Figure 7:

![7](img\7.png)(picture 7)

​	Give three components speed and userName assignment, the speed increases in order, set to 1.2.3， respectively, the name is 小a、小b、小c: The object attributes of the three components of the same component are also assigned different values. After saving, UI is exported according to the shortcut key F12 (Ctrl+F12), and code is written in editor.



### 3. Logic code written

After importing the project into FlashBuilder Open ExpandPageUI file will find an error, can not find game.MonkeyProp. As shown in Figure 8:

![8](img\8.png)(Picture 8)

​	This error do not worry, this is because the project MonkeyProp script corresponding to the logic class is the need to create their own developers, because it has not been created, so the editor can not find, resulting in an error.

​	Next, we create a game package in the src directory and create a MonkeyProp class in the game package. After adding you will find ExpandPageUI file error disappears, as shown in Figure 9:

![9](img\9.png)(picture 9)

Write new properties in the extension script in MonkeyProp, all of the code is as follows:

```typescript
package game
{
	import laya.ui.Box;
	import laya.ui.Label;
	/**
	 * 扩展脚本对应的逻辑类
	 * @author mengjia
	 * 
	 */
	public class MonkeyProp extends Box
	{
		/**攻击速度（也可以不用定义该变量，在这里定义是为了打开该类的时候能够一目了然的看到对应的脚本中添加了哪些属性）**/
		public var speed:Number = 0;
		/**人物名称（也可以不用定义该变量，在这里定义是为了打开该类的时候能够一目了然的看到对应的脚本中添加了哪些属性）**/
		public var userName:String = "";
		/**记录状态**/		
		private var boo:Boolean = false;
		public function MonkeyProp()
		{
			//自定义的脚本会有时序问题，所以在此添加一个延时
			this.frameOnce(2,this,onFrame);
		}
		
		private function onFrame():void
		{
			//通过子元素的name值获取该对象
			var userN:Label = this.getChildByName("userN") as Label;
			//设置文本内容为属性栏中给的值
			userN.text = userName;
			this.frameLoop(1,this,onLoop);
		}
		/**
		 *设置帧循环，实现左右移动 
		 * 
		 */		
		private function onLoop():void
		{
			if(x<=0){
				boo = false;
				x+=speed;
			}
			else if(x<Laya.stage.width-this.width && boo == false){
				x+=speed;
			}
			else if(x>=Laya.stage.width-this.width || boo == true){
				x-=speed;
				boo = true;
			}
		}
	}
}
```

Finally instantiate the ExpandPageUI page in the entry class (**Note: You must preload the required resources before instantiating the UI interface  **）, The code is as follows:

```typescript
package {
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



