# Set Mask Properties

> Can set an object ( bitmap and vector diagram), and then apply the mask according to the object shape.
>



## A. Introduction to mask API

　　The mask attribute is located in the [laya.display.Sprite](http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.display.Sprite#mask)  API, and the description of the property  is shown in Figure 1:

![1](img/1.jpg)<br />(Picture 1)



## B. simple example of the mask

### 1. We first use LayaAir engine to display a bitmap

Create a MaskDemo.js entry class and set it as the default application, write the code as follows:

```javascript
(function()
{
  	var Sprite = Laya.Sprite;
	var Texture = Laya.Texture;
  	var Handler = Laya.Handler;

  	var Res;
	var img;
	(function()
	{
			Laya.init(1136,640);
			//设置舞台背景色
			Laya.stage.bgColor = "#ffffff"      
			//资源路径
			Res = "res/img/monkey1.png";		
			//先加载图片资源，在图片资源加载成功后，通过回调方法绘制图片并添加到舞台
			Laya.loader.load(Res,Handler.create(this,graphicsImg));   
		})();
		
		function graphicsImg()
		{
			img = new Sprite();
			//获取图片资源，绘制到画布
			img.graphics.drawTexture(Laya.loader.getRes(Res),150,50);
			//添加到舞台
			Laya.stage.addChild(img);
		}
})();
```

Compile operation results shown in Figure 2:

![图2](img/2.jpg)<br />(Picture 2)

### 2.2 Create a circular mask area

Creates a circular mask area through code. With the mask property, you can achieve display effects. Keep looking at the code and annotations, we will modify the 2.1  sample code to the following one :

```javascript
(function()
{
  	var Sprite = Laya.Sprite;
	var Texture = Laya.Texture;
  	var Handler = Laya.Handler;

  	var Res;
	var img;
	(function()
	{
			Laya.init(1136,640);
			//设置舞台背景色
			Laya.stage.bgColor = "#ffffff"      
			//资源路径
			Res = "res/img/monkey1.png";		
			//先加载图片资源，在图片资源加载成功后，通过回调方法绘制图片并添加到舞台
			Laya.loader.load(Res,Handler.create(this,graphicsImg));   
		})();
		
		function graphicsImg()
		{
			img = new Sprite();
			//获取图片资源，绘制到画布
			img.graphics.drawTexture(Laya.loader.getRes(Res),150,50);
			//添加到舞台
			Laya.stage.addChild(img);
			
			//创建遮罩对象
			var cMask = new Sprite();
			//画一个圆形的遮罩区域
			cMask.graphics.drawCircle(80,80,50,"#ff0000");
          	//圆形所在的位置坐标
			cMask.pos(120,50);
         
         	//实现img显示对象的遮罩效果
			img.mask = cMask;
			
		}
})();
```

Operational results shown in Figure 3:

![图3](img/3.jpg) <br />(Picture 3)

By comparing the code, we found that the implementation mask is simple. Now we will assign the created display object cMask to mask object property of the img object.





## C. set the mask in LayaAirIDE

> In addition to setting the mask directly in the code, you can also easily set the mask for the object through LayaAirIDE. Here we follow the steps instructions.

1. Create a UI page `maskDemo.ui`, import the resource. *(for further details implementation, please refers to the IDE section in UI creation and resource import related documents)*



2. Drag a `Image` component into the scene editing area in the resource panel, as shown in Figure 4

![图4](img/4.jpg) <br /> (Picture 4)



3.  double click into the Image component and then drag  component panel into the  Sprite component, as shown in figure 5.

![图5](img/5.jpg) <br /> (Picture 5)





4. Select the `Sprite`component, in the right properties panel,set the common attribute `renderType` to `mask`, as shown in Figure 6.

![图6](img/6.jpg) <br /> (Picture 6)



5. double-click into the `Sprite` component,  and then drag the component panel into a `Graphics` circular to adjust the location and size. The hierarchy is shown in figure 7.

![图7](img/7.jpg) <br /> (Picture 7)



6. Double-click in any blank area of the editing to exit the `Image` component, you can see the effect of the mask, as shown in Figure 8.

![图8](img/8.jpg) <br /> (Picture 8)





## D. Apply the mask of the LayaAirIDE settings in the project

### 1. release UI

　　In the IDE interface, press `F12` to publish the mask effect of the UI page, will be generated in the `src/ui`directory UI class, and `bin/h5/res/atlas` directory under the Atlas file, as shown in Figure 9.

![图9](img/9.jpg) <br />(Picture 9)



### 4.2 use the IDE to generate the class and Atlas, to achieve mask effect

　　Create an entry class `Main.js`, encoded as follows:

```javascript
(function()
{
  	var Loader = Laya.Loader;
  	var Handler = Laya.Handler;
	
(function()
	{
			//初始化舞台
			Laya.init(1136,640);
			//设置舞台背景色
			Laya.stage.bgColor = "#ffffff"    
				
			//加载图集资源，加载成功后添加到舞台
			Laya.loader.load("res/atlas/ui.atlas",Handler.create(this,onLoaded));
			
		}})();
		
		function onLoaded()
		{
			var cMask = new maskDemoUI();
			Laya.stage.addChild(cMask);
		}
}})();
```

Operational results shown in Figure 10, we quickly achieve the effect of the mask.

![图10](img/10.jpg) <br /> (Picture 10)

