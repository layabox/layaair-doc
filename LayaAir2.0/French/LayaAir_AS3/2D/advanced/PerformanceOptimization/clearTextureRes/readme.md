# Texture资源销毁


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




**Clear textures**

Détruire les ressources d 'image utilisées par texture, conserver le boîtier texture, et restaurer automatiquement si, lors du prochain rendu, il n' y a pas de ressource d 'image utilisée par texture
En comparaison, cleares, Clear texturers ne fait que nettoyer les ressources d 'images utilisées dans le texture, ne détruisant pas le texture, et les ressources d' images sont automatiquement rétablies quand elles sont réutilisées.
Cleares détruira complètement le texture, ce qui rendra inutilisable; Clear texturers assurera la destruction immédiate des ressources photographiques sans crainte d 'erreur de destruction; cleares détruira par référence
