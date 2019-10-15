#Texture 자원 소각


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




**clearTextureRes**

Texture 사용한 그림 자원을 없애고, texture 껍질을 보존합니다. 다음 렌더를 사용하면 texture 사용한 그림자원이 존재하지 않습니다. 자동으로 복구됩니다.
clearRes, cleartureRes 대신 texture 안에 사용된 그림 자원을 삭제하지 않고 다시 사용할 때 자동으로 복원합니다
이 때문에 clearRes 는 texture 를 완전히 소각시켜 사용할 수 없습니다; clearTextureRes 는 즉시 이미지 자원을 제거할 수 있으며, 오류를 우려하지 않고, cleararRes는 인용 계수를 사용하여 폐기합니다
