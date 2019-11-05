#Texture資源の廃棄


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




**clear TextureRes**

Textureで使用されている画像リソースを破壊し、textureの殻を保持し、次回レンダリングする時、textureで使用されている画像リソースが存在しないことを発見したら、自動的に回復します。
clearResに比べて、clearTexturesはtextureの中で使っている写真の資源を整理するだけで、textureを破壊しません。再利用すると自動的に画像の資源を回復します。
clearResはtextureを徹底的に廃棄し、再利用できなくなります。clearTextureResは直ちに画像資源を廃棄することができます。また、廃棄ミスを心配する必要はありません。clearResは引用カウントで廃棄します。
【注意】画像自体が自動集合内にある場合（デフォルトの画像は512＊512以下）、メモリは破壊されません。この画像は大図セットマネージャに管理されます。