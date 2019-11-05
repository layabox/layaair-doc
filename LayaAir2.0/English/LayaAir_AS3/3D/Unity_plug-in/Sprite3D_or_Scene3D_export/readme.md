# 预设/场景的导出

Open the scenario we just previewed and configure the output scenario settings.

Click on the Laya Export button to export a Scene3D and Sprite3D folders, each with a folder directory structure as follows (Figure 1).

![] (img/1.png)<br> (Figure 1)

See the file resources above. After export, the data resources of. ls,. Lm,. Lmat, and mapping jpg, PNG are generated.

Their specific usage will be described in detail in the subsequent course documentation.

**Tips: It is necessary to use LayaAir3D material ball when exporting at the same time, otherwise there will be a big gap in display after exporting, and part of it can not be used. For the scene model that supports unity export, you can view it in the menu bar -- layaair3d -- help -- tutorial.**

In the menu bar -- LayaAir3D -- Shortcuts -- Switch to LayaAir3D shader, all materials in the project can be changed to the default material of LayaAir3D (BlinnPhong).

After the export is complete, we copy the file to the bin folder of the simple example.

Tips: This chapter only introduces simple loading applications, which will generate various formats after export. Their detailed description will be introduced in the "Resource Loading Chapter" in the 3D technical document.

The sample code for loading scenario. LS is as follows (here we modify the GameUI class directly).


```typescript

package script {
    import ui.test.TestSceneUI;
	import laya.d3.core.scene.Scene3D;
	import laya.d3.core.Camera;
	import laya.display.Stage;
	
	/**
	 * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
	 * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
	 * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方
	 */
	public class GameUI extends TestSceneUI {
		public function GameUI():void {
			super();
			//加载场景
	Scene3D.load('LayaScene_test/Conventional/test.ls',Handler.create(this,onComplete))
		}
		/**
		 * 加载完成
		 */
		private function onComplete(scene:Scene3D):void{
			// 将场景加到舞台上
			Laya.stage.addChild(scene);
		}
	}
}
```


Operating effect (Figure 2):

![] (img/2.png)<br> (Figure 2)