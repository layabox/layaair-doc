#Texture resource destruction


```java

package {
	import laya.display.Animation;
	import laya.display.Sprite;
	import laya.events.Event;
	import laya.events.Keyboard;
	import laya.utils.Stat;
	import laya.webgl.WebGL;
	
	public class ClearTextureResTest {
		private var sp:Sprite;
		
		public function ClearTextureResTest() {
			WebGL.enable();
			Laya.init(1000, 800);
			
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
		
		private function onKeyDown(e:Event):void {
			if (e.keyCode === Keyboard.H) {
				sp.visible = false;
				//隐藏界面，清理资源
				Laya.loader.clearTextureRes("res/bg.jpg");
				Laya.loader.clearTextureRes("res/fighter.atlas");
			} else if (e.keyCode === Keyboard.S) {
				//显示界面，资源会自动恢复
				sp.visible = true;
			}
		}
	}
}
```




**ClearTextureRes**

Destroy the image resources used by Texture and keep the texture shell. If the image resources used by Texture are not found in the next rendering, they will be automatically restored.
Compared with clearRes, clearTextureRes only cleans up the image resources used in texture, does not destroy texture, and automatically restores the image resources when used again.
CleaRes completely destroys texture, which makes it unusable; clearTextureRes ensures that image resources are destroyed immediately without fear of destruction errors, and clearRes destroys them by reference counting.
