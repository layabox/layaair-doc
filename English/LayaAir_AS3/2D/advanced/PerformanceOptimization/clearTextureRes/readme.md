# Texture resource destruction

### Legacy version resource destruction clearRes () method

In the development of games, the destruction of 2D resources is often used. Some images that are not used for a single time or for a long time can be destroyed and released to save memory. The engine provides the clearRes () method in the LoaderManager class to destroy the resource through the resource address.



### New version of resource destruction method clearTextureRes ()

The new version is roughly the same as the old version, but the official recommendation is to use the new clearTextureRes () method, which has the following advantages:

1.The 2D resource loaded is Texture type. The new method only destroys the image resources used by texture, but it preserves the texture resource shell. If we find that the image resources used by texture do not exist next time, we will automatically restore the image resources to display.
And clearRes will destroy the texture thoroughly, causing it to not be used again.

2. clearTextureRes () ensures that image resources are immediately destroyed without any worries about the destruction of the image. The clearRes () is the use of reference counting method of destruction, if there is resource references elsewhere, the resources can not be destroyed.



### Analysis and solution of unsuccessful destruction of resources

When the LayaAir engine optimizes the resources, some small pictures or atlas images will be beaten to the automatic big picture collection. Such pictures can't be destroyed by the old and new version destroying methods. They are first managed by the big picture collector manager.

In this case, if you want the resources to be destroyed, you can use the following two ways:

1. Set the size limit of automatically packaged into the aggregate picture of the big picture. The engine set the picture size to `512*512` by default. It can be set to 256 or 128, so that there will be a lot less in the set of the atlas, which is convenient for our manual resource destruction.

```java
//大图合集管理器中，设置进入大图合集图片的最大尺寸
AtlasResourceManager.atlasLimitWidth = 256;
AtlasResourceManager.atlasLimitHeight = 256;
```

2. Set the resource for no large graph Aggregation Optimization, such as the following code:

```java
//根据路径获取资源
var texture:Texture = Laya.loader.getRes(url);
//设置资源为不进行大图合集打包
texture.bitmap.enableMerageInAtlas = false;
```



### clearTextureRes() Simple method example

After loading the resources and displaying the pictures, press the keyboard H to hide pictures and animations, destroy the resources, re press them when pressing the S key, and automatically restore resources without resources.

```java
package {
	import laya.display.Animation;
	import laya.display.Sprite;
	import laya.events.Event;
	import laya.events.Keyboard;
	import laya.utils.Stat;
	import laya.webgl.WebGL;
	
	public class ClearTextureResTest 
    {
		private var sp:Sprite;
		
		public function ClearTextureResTest() 
        {
			WebGL.enable();
			Laya.init(1000, 800);
			
            //设置进入自动大图合集的图片尺寸限制
          	AtlasResourceManager.atlasLimitWidth = 128;
			AtlasResourceManager.atlasLimitHeight = 128;
          
			//显示一个图片
			sp = Sprite.fromImage("res/bg.jpg");
			Laya.stage.addChild(sp);
			
			//显示一个动画
			var ani:Animation = new Animation();
			ani.loadAtlas("res/fighter.atlas");
			ani.play();
			ani.pos(400, 200);
			sp.addChild(ani);			
			
			Laya.stage.on("keydown", this, onKeyDown);
			
			Stat.show();
		}
		
		private function onKeyDown(e:Event):void 
        {
			if (e.keyCode === Keyboard.H)
            {
				sp.visible = false;
				//隐藏界面，清理资源
				Laya.loader.clearTextureRes("res/bg.jpg");
				Laya.loader.clearTextureRes("res/fighter.atlas");
              
			} else if (e.keyCode === Keyboard.S)
            {
				//显示界面，资源会自动恢复
				sp.visible = true;
			}
		}
	}
}
```



