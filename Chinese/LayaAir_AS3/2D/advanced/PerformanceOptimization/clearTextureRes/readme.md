# Texture资源销毁

### 旧版资源销毁clearRes()方法

在游戏开发中，2D资源的销毁经常会用到，一些只用一次或长时间不使用的图片资源，我们可以销毁释放掉，用于节省内存。引擎在LoaderManager类中提供了clearRes()方法通过资源地址进行资源销毁。



### 新版资源销毁方法clearTextureRes()

新版方法与旧版方法功能大体差不多，但官方推荐使用新的clearTextureRes()方法，它的优势如下：

1.加载的2D资源为Texture类型，新方法只销毁了texture使用的图片资源，但会保留texture资源壳，如果下次渲染的时候，发现texture使用的图片资源不存在，则会自动恢复图片资源用于显示。
而clearRes会彻底销毁texture，导致不能再使用。

2.clearTextureRes()能确保立即销毁图片资源，并且不用担心销毁错误。而clearRes()则采用引用计数方式销毁，如果其他地方有资源引用，则资源无法被销毁。



### 资源销毁不成功的情况分析与解决

LayaAir引擎在进行资源自动优化时，部分小的图片或图集图片会被打到自动大图合集中，这种图片用新旧版销毁方法都不能被销毁，它们优先被大图合集管理器管理。

这种情况下，如果还想资源被销毁，可以使用以下两种方式解决：

1.设置自动打包入大图合集图片的大小限制，引擎默认设置图片大小为`512*512` 。可以设置为256或128等，这样进入大图合集的图集图片就会少很多，方便我们手动资源销毁。

```java
//大图合集管理器中，设置进入大图合集图片的最大尺寸
AtlasResourceManager.atlasLimitWidth = 256;
AtlasResourceManager.atlasLimitHeight = 256;
```

2.设置资源为不进行大图合集优化，方法如下述代码：

```java
//根据路径获取资源
var texture:Texture = Laya.loader.getRes(url);
//设置资源为不进行大图合集打包
texture.bitmap.enableMerageInAtlas = false;
```



### clearTextureRes()方法简单示例

加载资源并显示图片后，按下键盘H隐藏图片与动画，并销毁资源，当按下S键后重新显示，在无资源的情况下会自动恢复资源。

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



