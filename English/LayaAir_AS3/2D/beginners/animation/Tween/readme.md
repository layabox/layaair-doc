# Tween motion

### 1. A summary of tween motion animation

In Game development, tween animation is commonly use, certainly most important factors to enhance the game UI experience. Such as the dialog box pops up, close, the button appears and disappear, the props into the backpack, etc. we can directly use the LayaAir engine provided Tween slow and Ease class moving to achieve quickly.

`Tween`  slow action class is used to achieve slow movement of target object attributes, such as setting the target's X or Y axis's slow range, and setting the start, stop, and cleanup. More Tween's API

`Ease`class defines a large number of moving functions to achieve the specific effect of `Tween` motion animation. LayaAir engine Tween class and Ease class combination, can satisfy the need in game development requierements. Click on the link to view API full details directly:  [https://layaair.ldc.layabox.com/api/?category=Core&class=laya.utils.Tween](https://layaair.ldc.layabox.com/api/?category=Core&class=laya.utils.Tween)

`Ease`类的API中对缓动函数进行了基础的介绍，点击链接可直接查看API：[https://layaair.ldc.layabox.com/api/?category=Core&class=laya.utils.Ease](https://layaair.ldc.layabox.com/api/?category=Core&class=laya.utils.Ease)

`Ease` class API with various tween movement are display in demo sample, click on the link to view API directly:[https://layaair.ldc.layabox.com/demo/?Tween_EaseFunctionsDemo](https://layaair.ldc.layabox.com/demo/?Tween_EaseFunctionsDemo)





### 2. Introduce with common tween classes from API

#### 2.1 Tween methods used from() and to()

Tween provides many methods, and we mainly used two of them, respectively `from()` and `to()`. These two methods of the parameters set exactly the same, but the effect is different. With from() the tween start moving from initial position point to produce motion (from the slow moving target position). With to() the initial position move to target position and then start apply motion. Followed by a detailed description and examples, the developer can first look the basics of these two methods, as shown in Figure 1.

![图1](img/1.png) 

(Picture 1)

#### 2.2 parameter description

Both `to()` and `from()` methods support static methods, so we do not need to instantiate the Tween class.

By looking at the API instructions in  Figure 1, `to()` and `from()` parameters are relatively simple to understand, here we focus on the properties attributes :  duration, ease, complete, delay.

##### props  

props is the property that the target object needs to change to produce a slowing effect. The public properties of the object can be set, such as the most commonly used x, y position attributes, and alpha transparent properties, as well as rotation, axis, size and other attributes.

##### duration

duration is the time it takes to perform the slow motion. The units are defined in seconds, more is high, more slow is the effect.

##### ease

ease is a slow motion type, which can use the various functions defined under the Ease class to change the animation process. LayaAir engine provides a lot of action for developers. Developers can view API in details :[https://layaair.ldc.layabox.com/demo/?Tween_EaseFunctionsDemo](https://layaair.ldc.layabox.com/demo/?Tween_EaseFunctionsDemo)

##### complete

complete callback method after the ease action is completed. 

##### delay

delay is the time to execute operation, produces a text motion effect through a delay in implementation.



### 3. Ease class implementation

#### 3.1 Tween.from() sample

The following code, we first through the Tween.from () method to achieve "LayaBox" character text easing animation.

Create a TweenDemo.as document class, the code is written as follows:

```java
package 
{
	import laya.display.Text;
	import laya.utils.Tween;
	import laya.utils.Ease;
	import laya.webgl.WebGL;
	
	public class TweenDemo
	{
		
		public function TweenDemo() 
		{
			//  Initialize the stage
			Laya.init(1334,750, WebGL);

			//Background color
			Laya.stage.bgColor = "#1b2436";
			
			// Create tween text
			createTween();
		}
		
		// Create tween text
		private function createTween():void 
		{	
			
			// "LayaBox" total width of the string
			var w:int = 800;
			
			// text is created at the beginning X position(>>Use the right shift bit operator here，is equivalent and more efficient way to multiply by 0.5)
			var offsetX:int = Laya.stage.width - w >> 1;

			// String displayed
			var demoString:String = "LayaBox";
			
			var letterText:Text;
			
			//from "LayaBox" String length creates a single character, and use animated animations for each individual character
			for (var i:int = 0, len:int = demoString.length; i < len; ++i)
			{
				//from  "LayaBox" String length creates a single character
				letterText = createLetter(demoString.charAt(i));
				letterText.x = w / len * i + offsetX;
				
				//The initial y attribute of the text
				letterText.y = 300;

				//The object letterText attribute y is moved from 100 to 100 to the initial y attribute, which takes 3000 milliseconds each time the with the delay interval i * 100 milliseconds.
				Tween.from(letterText, { y : 100 }, 3000, Ease.elasticOut, null, i * 1000);
			}
		}
		
		
		//Creates a single character text and loads it onto the stage
		private function createLetter(char:String):Text
		{
			var letter:Text = new Text();
			letter.text = char;
			letter.color = "#FFFFFF";
			letter.font = "Impact";
			letter.fontSize = 180;
			Laya.stage.addChild(letter);			
			return letter;
		}
	}
}
```

The operational effect is shown in Fig. 2

![动图2.gif](img/2.gif)<br/>(Picture 2)

With the example code, and then through the motion effect of Figure 2, we can see that the text "Layabox" appears instantaneously after the initial position (y axis 300), and then moving to disappear and reach target`{ y : 100 }`

Since this method is first displayed at the initial position, it disappears instantaneously and moves from the slow target position to the initial position. Will produce a visual difference, feeling more like a rebound effect. So we continue to understand the effect of Tween.to, and developers can choose which mitigation method to use as needed.


#### 3.2 Tween.to() sample

We can continue to use the above example, but should Tween.from changed to Tween.to, first look at the running  results.

```java
//The initial y attribute of the text
letterText.y = 300;
//Tween.from(letterText, { y : 100 }, 3000, Ease.elasticOut, null, i * 1000);//Note The line is changed to Tween.from changed to 
Tween.to(letterText, { y : 100 }, 3000, Ease.elasticOut, null, i * 1000);
```

The operational effect is shown in Fig. 3

![动图3.gif](img/3.gif)<br/>(Picture 3)

From code, we look at the effect of Figure 3, Tween.to () will be more intuitive. The initial attribute y is set as 300, and the y of the slow method is 100（`{ y : 100 }`）, so Figure 3 is from the bottom produce a slow motion effect ( giving some bouncing effect)

#### 3.3 Understand the Props parameter

Whether Tween.from or Tween.to, the second parameter Props (property), can affect the trajectory of the motion effect.

Compare Tween.from to Tween.to,  effect are opposites. Tween.from give feeling of falling, and Tween.to have in Figure 3  of upward bounce.

If we adjust the value of the initial y attribute, let's see how the effect of Tween.to is different from Tween.from.

Continuing the previous example, modify the code as follows.

```java
//The initial y attribute of the text
letterText.y = 100;
//Tween.from(letterText, { y : 100 }, 3000, Ease.elasticOut, null, i * 1000);//Note The line is changed to Tween.from changed to 
Tween.to(letterText, { y : 300 }, 3000, Ease.elasticOut, null, i * 1000);
```

The operation effect is shown in Figure 4

![动图4.gif](img/4.gif)<br/>（动图4）

As shown in Fig. 4,  the initial y attribute is 100. Effect of Tween.to is to move from initial attribute to the target attribute. So, when the Y attribute is set to 300, it produces a motion from the initial Y axis 100 to 300. Remind about distinct difference between the effect and the Tween.from implementation. So developers should pay attention on it.

#### 3.4 understand（*duration*）of the（*delay*）parameter and deferred execution parameters

Continuing with the previous example, we will modified the third parameter duration to 1000 milliseconds, also changed the sixth parameter delay to 100 milliseconds, as shown in figure 5.  Both the speed of tween motion and the velocity of the fall effect interval  obviously change.  Therefore, it can be seen that different animation effects can be achieved by adjusting the duration or delay time by your own experiment.

![动图5.gif](img/5.gif)<br/>(Picture 5)

The modified code is as follows:

```java
//The initial y attribute of the text
letterText.y = 100;
//Tween.from(letterText, { y : 100 }, 3000, Ease.elasticOut, null, i * 1000);//Note The line is changed to Tween.from changed to 
Tween.to(letterText, { y : 300 }, 1000, Ease.elasticOut, null, i * 100);
```

#### 3.5 Understanding the ease parameter

The fourth parameter ease corresponds to the various methods of the `laya.utils.Ease` . In the example of the official website engine, these methods have a demonstration effect. Developers can click on the link（[https://layaair.ldc.layabox.com/demo/?Tween_EaseFunctionsDemo](https://layaair.ldc.layabox.com/demo/?Tween_EaseFunctionsDemo)）to view one by one, and then replace the results in this case to experience.


In this section, we change to the `Ease.bounceIn` effect, as shown in figure 6.

![动图6.gif](img/6.gif)<br/>(Picture 6)

Figure 6, the effect of the modified code is as follows:

```java
// The initial y attribute of the text
letterText.y = 100;
//Tween.from(letterText, { y : 100 }, 3000, Ease.elasticOut, null, i * 1000);//Note The line is changed to Tween.from changed to Tween.to
Tween.to(letterText, { y : 300 }, 1000, Ease.bounceIn, null, i * 100);
```




#### 3.6 Understand the completion of the callback (*complete*) parameter

The fifth argument is used to perform a callback after the ease effect process. We continue to follow the previous example, after the easing of the end, add a font color red to callback method.

usage example :

```java
Tween.to(letterText, { y : 300 }, 1000, Ease.bounceIn, Handler.create(this,changeColor,[letterText]), i * 100);
```

Since you need to add new references, all the sample code is posted this time.

TweenDemo.as：

```java
package 
{
	import laya.display.Text;
	import laya.utils.Ease;
	import laya.utils.Handler;
	import laya.utils.Tween;
	import laya.webgl.WebGL;
	
	public class TweenDemo
	{
		
		public function TweenDemo() 
		{
			// Initialize the stage
			Laya.init(1334,750, WebGL);

			// Background color
			Laya.stage.bgColor = "#1b2436";
			
			// Create tween text
			createTween();
		}
		
		/**
		 * Create tween text
		 */	
		private function createTween():void 
		{	
			
			// "LayaBox" total width of the string
			var w:int = 800;
			
			//  text is created at the beginning X position(>>Use the right shift bit operator here，is equivalent and more efficient way to multiply by 0.5)
			var offsetX:int = Laya.stage.width - w >> 1;

			// String displayed
			var demoString:String = "LayaBox";
			
			var letterText:Text;
			
			// from "LayaBox" String length creates a single character, and use animated animations for each individual character
			for (var i:int = 0, len:int = demoString.length; i < len; ++i)
			{
				// from  "LayaBox" String length creates a single character
				letterText = createLetter(demoString.charAt(i));
				letterText.x = w / len * i + offsetX;
				
				// The initial y attribute of the text
				letterText.y = 100;

				/**
				* The object letterText attribute y is moved from 100 to 300, Each frame updates the color by the callback method
				* With 1000 milliseconds duration to complete the easing effect
				* Ease type set with bounceIn
				* After a single character's easing effect is over,  Use the changeColor callback function to change the character to red
				* Delay interval i * 100 ms execution
				*/
				Tween.to(letterText, { y : 300 }, 1000, Ease.bounceIn, Handler.create(this,changeColor,[letterText]), i * 100);
			}
		}
				
		/**
		 * A callback method after a tween motion action has been completed
		 * @param txt Tween moving letters
		 */		
		private function changeColor(txt:Text):void
		{
			// Change the text font to red
			txt.color="#FF0000";			
		}		
		
		/**
		 * Creates a single character text and loads it onto the stage
		 */		
		private function createLetter(char:String):Text
		{
			var letter:Text = new Text();
			letter.text = char;
			letter.color = "#FFFFFF";
			letter.font = "Impact";
			letter.fontSize = 180;
			Laya.stage.addChild(letter);			
			return letter;
		}
	}
}
```

The code runs as shown in Figure 7

![动图7](img/7.gif) 



#### 3.7 Process callback with Props parameters

Complete (complete callback) parameter can be implemented not only in the fifth parameter, but also in the second parameter Props.  to make the code clearer and easier to read, we do not recommend putting the callback on Props.

Here we will only introduce the update callback in Props. If we want to execute the callback method during the tween motion, the fifth parameters are not possible because must be executed after the delay. So, let's continue with the previous example and add an update call to the font color in the Props parameter.

Use example:

```java

/**
* The object letterText attribute y is moved from 100 to 300, Each frame updates the color by the callback method
* With 1000 milliseconds duration to complete the easing effect
* Ease type set with bounceIn
* After a single character's easing effect is over,  Use the changeColor callback function to change the character to red
* Delay interval i * 100 ms execution
*/

Tween.to(letterText, { y : 300, update: new Handler(this, updateColor,[letterText])}, 1000, Ease.bounceIn, Handler.create(this,changeColor,[letterText]), i * 100);
```

Here is the all sample code, TweenDemo.as：

```java
package 
{
	import laya.d3.math.Rand;
	import laya.display.Text;
	import laya.utils.Ease;
	import laya.utils.Handler;
	import laya.utils.Tween;
	import laya.webgl.WebGL;
	
	public class TweenDemo
	{
		public function TweenDemo() 
		{
			// Initialize the stage
			Laya.init(1334,750, WebGL);

			// Background color
			Laya.stage.bgColor = "#1b2436";
			
			// Create tween text
			createTween();
		}
		
		/**
		 * Create tween text
		 */	
		private function createTween():void 
		{	
			
			// "LayaBox" total width of the string
			var w:int = 800;
			
			// Text is created at the beginning X position(>>Use the right shift bit operator here，is equivalent and more efficient way to multiply by 0.5)
			var offsetX:int = Laya.stage.width - w >> 1;

			// The displayed string
			var demoString:String = "LayaBox";
			
			var letterText:Text;
			
			// From "LayaBox" String length creates a single character, and use animated animations for each individual character
			for (var i:int = 0, len:int = demoString.length; i < len; ++i)
			{
				// From  "LayaBox" String length creates a single character
				letterText = createLetter(demoString.charAt(i));
				letterText.x = w / len * i + offsetX;
				
				// The initial y attribute of the text
				letterText.y = 100;

				/**
				* The object letterText attribute y is moved from 100 to 300, Each frame updates the color by the callback method
				* With 1000 milliseconds duration to complete the easing effect
				* Ease type set with bounceIn
				* After a single character's easing effect is over,  Use the changeColor callback function to change the character to red
				* Delay interval i * 100 ms execution
				 */
			
				Tween.to(letterText, { y : 300, update: new Handler(this, updateColor,[letterText])}, 1000, Ease.bounceIn, Handler.create(this,changeColor,[letterText]), i * 100);
			}
		}
		
		/**
		 * Callback update method for slow action
		 * @param txt  Tween moving letters
		 */			
		private function updateColor(txt:Text):void
		{
			
			var c:int = parseInt(Math.random()*3);
			switch(c)
			{
				case 0:
				{
					txt.color="#EEE000";
					break;
				}
				case 1:	
				{
					txt.color="#FFFFFF";
					break;
				}
				case 2:	
				{
					txt.color="#FF0000";
					break;
				}
				default:
				{					
					txt.color="#EEE000";
					break;
				}
			}
		}		
		
		/**
		 * After the completion of the callback method
		 * @param txt  Tween moving letters
		 */		
		private function changeColor(txt:Text):void
		{
			// Change the text font to red
			txt.color="#FF0000";
		}		
		
		/**
		 * Creates a single character text and loads it onto the stage
		 */		
		private function createLetter(char:String):Text
		{
			var letter:Text = new Text();
			letter.text = char;
			letter.color = "#FFFFFF";
			letter.font = "Impact";
			letter.fontSize = 180;
			Laya.stage.addChild(letter);			
			return letter;
		}
	}
}
```

When the code is running, because the update callback is executed every frame, there is a flash effect in the process. As shown in figure 8.

![动图8](img/8.gif) 

(Picture 8)



LayaAirIDE timeline animation editing can ergonomicly set the object property effect of tween motion. If you want to know how to set up the IDE's settings, you can read the "timeline animation editor detailed" from introduction chapter.
