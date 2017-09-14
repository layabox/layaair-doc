# Display and toggle pictures

> Picture are the elementrary display for game development, this article will introduce Sprite.loadImage and Graphics.drawTexture class, two ways to display pictures.

## 1 . Display and switch pictures with loadImage method

### 1.1 loadImage API overview

In API documentation can find laya.display.Sprite, you can find loadImage() method, as shown in Figure 1. Let's familiarize with the parameters.

![图1](img/1.png) <br /> (Picture 1)

### 1.2 LoadImage to load an example of displaying a picture

Create a Main.as entry class and set it as the default application (recommended by FlashBuilder). Write the code as follows:

```java
package
{
	import laya.display.Sprite;
	
	public class Main
	{
		public function Main()
		{
			//Initialize the stage
			Laya.init(1334,750);                
			
			//Set the stage background color
			Laya.stage.bgColor  = "#ffffff"
			
			var img:Sprite = new Sprite();                  
			//Load the display picture with coordinates at 100, 50
			img.loadImage("res/img/monkey1.png",100,50); 
			//Added to the stage
			Laya.stage.addChild(img);
		}
	}
}
```

In the sample code, "100,50" is the display coordinate information of the picture. The example code runs as shown in figure 2-1:

![图2-1](img/2-1.png) <br /> (picture2-1)

### 1.3 Example of switching pictures with loadImage

  Switching pictures is based on displaying pictures, adding empty drawing, and then drawing new picture resources through code logic. Specific code can refer to the code notes and API for further more description. here is an implementation example :

```java
package
{
	import laya.display.Sprite;
	
	public class Main
	{
        //The picture resource path that needs to be switched
		private var monkey1:String = "res/img/monkey1.png";
		private var monkey2:String = "res/img/monkey2.png";
      	//Switching state
		private var flag:Boolean = false;
      
		private var img:Sprite;
		
		public function Main()
		{
			//Initialize the stage
			Laya.init(1334,750);                
			//Set the stage background color
			Laya.stage.bgColor = "#ffffff"                        
			
			img = new Sprite();                        
			
			//Display drawn pictures
			switchImg();
			
			//Listen to the click event in the image area of the switchImg, trigger the switchImg switch after the	implementation of the picture
			img.on("click",this,switchImg);
			
			//Add the picture to the Stage
			Laya.stage.addChild(img);                        
		}
		
		
		private function switchImg(e:*=null):void
		{                        
			//Empty the picture
			img.graphics.clear();
			
			//Gets the image resource path to switch
			var imgUrl:String = (flag = !flag)? monkey1:monkey2;
			
			//Load the display picture with coordinates at 100, 50
			img.loadImage(imgUrl, 100, 50);
			
		}
	}
}
```

Run the code as shown in Figure 2-2:

![动图2-2](img/2-2.gif) <br /> (picture 2-2)







## 2. Use drawTexture method to display and switch pictures

### 2.1  drawTexture API overview

In the API documentation about laya.display.Graphics, you can find the drawTexture () method, in addition, also need to understand the load (laya.net.LoaderManager) method, getRes (create) method, and laya.utils.Handler () method, the parameters of the method Figure 3, Figure 4, Figure 5, Figure 6 shows:

![图3](img/3.png) <br /> (picture 3)

![图4](img/4.png) <br /> (picture 4)

![图2](img/5.png) <br /> (picture 5)

![图2](img/6.png) <br /> (picture 6)



### 2.2 use drawTexture to load an example of a display picture

​     LoadImage () method can instantly load external image resources, you can also read picture resources from the buffer (drawTexture) method, you must first load the data, and then add to the stage to draw. In the example code to load（`Laya.loader.load()`）and callback (`Handler.create()`) method. Please see the code in the comments section and related API instructions.

Create a Main.as entry class and set it as the default application (recommended in FlashBuilder). Write the code as follows:

```java
package
{
	import laya.display.Sprite;
	import laya.utils.Handler;
	
	public class Main
	{
		private var monkey2:String = "res/img/monkey2.png";
		public function Main()
		{
			//Initialize the stage
			Laya.init(1334,750);                
			//Set the stage background color
			Laya.stage.bgColor = "#ffffff"                        
			
			//Load image resources first，Draw the picture by the callback method and add it to the stage
			Laya.loader.load(monkey2,Handler.create(this,graphicsImg));          
		}
		
		private function graphicsImg():void
		{
			var img:Sprite = new Sprite();
			//Get picture resources and draw to canvas
			img.graphics.drawTexture(Laya.loader.getRes(monkey2),100,50);
			
			//Added to the stage
			Laya.stage.addChild(img);
		}
		
	}
}
```

The code runs as shown in Figure 7-1

![图7-1](img/7-1.png) <br /> (picture 7-1)





### 2.3 Example of switching a picture with a drawTexture

 Switching pictures is based on displaying pictures, adding empty drawing, and then drawing new picture resources through code logic. Specific code description, you can refer to the code notes and API, combined with examples of running experience.

Here we modify the code in the Main.as entry class as follows:

```java
package
{
	import laya.display.Sprite;
	import laya.resource.Texture;
	import laya.utils.Handler;
	
	public class Main
	{
		private var monkey1:String = "res/img/monkey1.png";
		private var monkey2:String = "res/img/monkey2.png";
		private var flag:Boolean = false;
		private var img:Sprite;
		
		public function Main()
		{
			//Initialize the stage
			Laya.init(1334,750);            
			//Set the stage background color
			Laya.stage.bgColor        = "#ffffff"                        
			
			//Load image resources first,draw the picture by the callback method and add it to the stage
			Laya.loader.load([monkey1,monkey2],Handler.create(this,graphicsImg));                
		}
			
		
		private function graphicsImg(e:*=null):void
		{
          	 //Create an instance
			img = new Sprite();      
          	//Add to the stage
			Laya.stage.addChild(img);                  
			
			 //Displays pictures initialized
			switchImg();			
          
			//Listen to the click event in the image area of the switchImg, trigger the switchImg switch after the implementation of the picture
			img.on("click",this,switchImg);			

			 //Load the display picture with coordinates at 100, 50
			img.pos(100,50);
			
		}
		
		private function switchImg(e:*=null):void
		{                        
			//Empty the drawing
			img.graphics.clear();
			
			 //Gets the image resource path to switch
			var imgUrl:String = (flag = !flag)? monkey2:monkey1;
			//Get picture resources
			var texture:Texture = Laya.loader.getRes(imgUrl);
			//Draw the texture
			img.graphics.drawTexture(texture);                        
			//Set the texture width high
			img.size(texture.width, texture.height);        
			
		}
	}
}
```

The code runs as shown in Figure 7-2.


![动图7-2](img/7-2.gif) <br /> (picture 7-2)





