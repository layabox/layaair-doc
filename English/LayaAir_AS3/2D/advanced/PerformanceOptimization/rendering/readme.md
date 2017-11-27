# Graphics rendering performance



### **1. Optimize Sprite**

1. Minimize unnecessary nesting and reduce the number of Sprite.

2. Objects in non-visible areas should be removed from the display list or set as far as possible visible=false。

3. For containers that have a large amount of static or infrequently changing content (such as buttons), you can set the cacheAs attribute for the entire container, dramatically reducing the number of sprites and dramatically improving performance. If you have dynamic content, it is best to separate it from static content so that only static content is cached.

4. In Panel, the direct sub object outside the panel region (the sub object of the sub object can not be judged) is rendered without rendering, and the sub object beyond the panel region is not consumed.

   ​

### **2. Optimize DrawCall**

1. Setting cacheAs to complex static content can reduce DrawCall greatly. Using cacheAs well is the key to game optimization.

2. Try to make sure that the image sequence of the same atlas is next to each other, and if the cross rendering is different, it will increase the number of DrawCall.

3. Try to make sure that all the resources in the same panel use an atlas, which reduces the submission batch.

   ​

### **3. Canvas optimization**

​      In the optimization of Canvas, we need to pay attention to, do not use cacheAs in the following occasions:

1. The object is very simple, such as a word or a picture, setting cacheAs= "bitmap" not only does not improve performance, but will lose performance.

2. There are always changes in the container, such as an animation or countdown in the container. If you set the cacheAs= "bitmap" to this container, it will lose performance.


You can determine whether the Canvas cache has been refreshed by looking at the first value of the Canvas statistics.



### **4. About cacheAs**

Setting cacheAs can cache the display object as a static image. When cacheAs, the child object changes, automatically re cache, and can manually update the cache by calling the reCache method. It is recommended to cache the complex content that is not always changing as a static image, which can greatly improve rendering performance. CacheAs has three values: "none", "normal" and "bitmap".

1. The default is "none" without any cache.

2. When the task is "normal", the canvas cache is executed under Canvas, and the command cache is executed under webgl mode.

3. When the value is "bitmap", the canvas is still cached under Canvas, and the renderTarget cache is used in webGL mode. It's important to note that the renderTarget cache mode in webGL has a 2048 size limit, and over 2048 adds extra memory overhead. In addition, the cost of continuous redrawing is relatively large, but it will reduce the drawcall, rendering the highest performance. Under webGL, the command cache mode only reduces the node traversal and command organization, and does not reduce drawcall, medium performance.



After setting the cacheAs, you can also set staticCache = true to prevent automatic updates of the cache, and you can manually call the reCache method to update the cache.

​        CacheAs mainly through two aspects to improve performance. First, reduce node traversal and vertex calculation; the second is to reduce drawCall.  Good use of cacheAs will be a powerful tool for optimizing engine performance.

​       The next example draws 10000 text:

```javascript
package 
{
	import laya.display.Sprite;
	import laya.display.Text;
	import laya.utils.Stat;
	import laya.webgl.WebGL;
	public class Test 
	{
		private var text:Text;
		
		public function Test() 
		{
					Laya.init(550,400,WebGL);
					Stat.show();
					var textBox:Sprite =new Sprite();
					
					for(var i:int=0;i<10000;i++)
					{
					txt = new Text();
					txt.text=(Math.random() * 100).toFixed(0);
					txt.color = "#CCCCCC";
					txt.x = Math.random()  *  550;
					txt.y = Math.random()  *  400;
					textBox.addChild(text);
					}
					Laya.stage.addChild(textBox);
		}
		
	}

}
```

​        下面是笔者电脑上的运行时截图，FPS稳定于52上下。

​        ![图片1.png](img/1.png)<br/>
​        （图1）

​        当我们对文字所在的容器设置为cacheAs之后，如下面的例子所示，性能获得较大的提升，FPS达到到了60帧。

```javascript
// …省略其他代码…
var textBox:Sprite = new Sprite();
textBox.cacheAs = "bitmap";
// …省略其他代码…
```

​         ![图片1.png](img/2.png)<br/>
​        （图2）



### **5. text strokes**

At run time, set the stroke stroke more text than text without a call instruction. At this point, the amount of text used for CPU is proportional to the amount of text. So, try to use alternatives to accomplish the same requirements.

· For almost unchanged text content, cacheAs can be used to reduce performance consumption, see "graphics rendering performance - about cacheAs".

· Bitmap fonts can be used for text fields where content changes frequently, but fewer characters are used.



### **6.  skip text layout, direct rendering**

In most cases, a lot of text does not require complicated typography, just simply displaying a line of characters. In order to meet this demand, Text provides a method called changeText can skip layout.


```javascript
var txt:Text = new Text();
txt.text = "text";
Laya.stage.addChild(txt);
//后面只是更新文字内容，使用changeText能提高性能
text.changeText("text changed.");
```

 

Text.changeText will directly modify the last instruction drawn in the drawing instruction. The behavior of the previous drawing instruction still leads to changeText only used in the following situations:

· The text is always one line

· The style of the text is always the same (color, thickness, italics, alignment, etc.)

​        Even so, it's always used in practical programming.
