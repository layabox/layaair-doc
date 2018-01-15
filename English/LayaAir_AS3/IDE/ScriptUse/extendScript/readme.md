# 扩展脚本的使用

​	在项目开发中，经常会有这种情况；官方提供的组件满足不了需求，比如想扩展Button组件功能，增加新的属性，还想在IDE里面给新属性设置。在LayaAirIDE1.4.0版本之后提供了两种方式：扩展脚本和附加脚本。

​	**扩展脚本：**用继承的方式，扩展某个组件功能，实现自己的逻辑，甚至增加新的属性，并且在IDE里面显示新属性，可视化的设置新属性	

​	**附加脚本：**用非继承的方式，附加的方式，给某个组件增加一些行为，增加新的属性，并且在IDE里面显示新属性，可视化的设置新属性	

​	有了上述扩展方式后，开发者可以任意修改组件的行为、增加新的属性、可视化的让UI场景与代码结合；同一个场景中可以添加多个扩展脚本。

​	**扩展脚本和附加脚本的区别**：扩展脚本继承自组件本身；附加脚本是在组件自身上添加了一个控制该组件的脚本，可以修改当前组件的任意属性，不继承。

​	**本篇文章我们将对多个组件添加同一个脚本，让它们的移动速度和名字不同为例，来详细的介绍扩展脚本的使用方法。最终效果如下图所示（图中的卡顿是录屏软件导致的，以实际效果为准）：**

![0](img\0.gif)(图0)

### 一、制作UI页面

​	新建一个名为ExpandPage的UI页面。在该UI页面上放入一个Box组件，在Box组件中放入一张图片以及一个文本组件；给文本组件的name命名为userN，设置好大小、对齐方式后保存。如图1所示：

![1](img\1.png)(图1)



### 二、创建扩展脚本并添加到组件身上赋值

​	在UI面板管理中右键—新建脚本，选择扩展脚本（可以在创建UI页面中选择脚本一栏），脚本所对应的逻辑类即下边的运行类名。如图2所示：

![2](img\2.png)(图2)

​	点击确定按钮后会在项目面板中自动生成一个.prop文件，该文件中会自带一些常用的属性，新增属性时可以参考这些属性模板，如图3所示：

![3](img\3.png)(图3)

在MonkeyProp标签中加入我们所需的属性，如图4所示：

![4](img\4.png)(图4)

​	扩展脚本编辑完成后打开UI界面，为了能让开发者更直观的看到变化，在此将Box复制多个到UI界面中，如图5所示：

![5](img\5.png)(图5)

接下来将制作好的MonkeyProp.prop扩展脚本以拖拽的形式放到Box上，如动图6所示：

![6](img\6.gif)(图6)

​	拖拽到组件身上之后在层级列表和UI界面中是看不出变化的，但是会在Box组件右侧属性栏中看到新增的属性。如图7所示：

![7](img\7.png)(图7)

​	给三个组件的speed和userName赋值，速度按序递增，分别设置为1.2.3，名称为小a、小b、小c；也就为这三个相同组件的对象属性进行了不同的赋值。保存之后按快捷键F12（Ctrl+F12）导出UI，到代码中编写代码。



### 三、代码逻辑编写

将项目导入到FlashBuilder之后打开ExpandPageUI文件会发现有报错，找不到game.MonkeyProp。如图8所示：

![8](img\8.png)(图8)

​	这个报错不用担心，这是因为项目中MonkeyProp脚本对应的逻辑类是需要开发者自己创建的，由于还没有创建，所以编辑器找不到，导致报错。

​	接下来，我们在src目录下创建一个game包，然后在game包中创建一个MonkeyProp类。添加之后就会发现ExpandPageUI文件中的报错消失了，如图9所示：

![9](img\9.png)(图9)

在MonkeyProp中编写扩展脚本中新增的属性，全部代码如下所示：

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

最后在入口类中实例化ExpandPageUI页面（**注意：实例化UI界面之前必须先预加载所需资源**），代码如下所示：

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

最终显示结果如文章开头图0所示



