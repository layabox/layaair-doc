# 预设/场景的导出

Ouvre la scène que nous venons d 'apercevoir, une fois que la configuration de sortie est prête.

Cliquez sur le bouton Laya export pour exporter un scene3d et un sprite3d, et le dossier combiné est structuré comme suit (fig. 1).

[] (IMG / 1.png) <br > (Figure 1)

Voir les ressources de fichiers graphiques ci - dessus, qui sont générées après l 'exportation. LS, LM, lmat, et les ressources JPG et PG d' autocollage.

Leur utilisation spécifique sera décrite en détail dans le dossier des cours de suivi.

**Il faut utiliser la boule de matériau layaair3d pour l'exporter simultanément, faute de quoi il y aura une grande différence après l'exportation et une partie inutilisable.Pour ce qui est des modèles de scénarios qui appuient les exportations de l 'Unity, voir dans la barre de menu layaair3d - help - Tutorial.**

Dans la colonne de menu layaair3d - Shortcuts - switch to layaair3d Shader, tous les matériaux du projet peuvent être remplacés par des matériaux par défaut (blinnphong).

Une fois l 'Export terminé, nous copierons le fichier dans le dossier Bin d' exemples simples.

Tips: ce chapitre ne présente que des applications de chargement simples qui, une fois exportées, créent divers formats, dont les détails seront précisés dans le document technique 3D "ressources de chargement" Introduction.

Ici, nous modifions directement la classe gameu.


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


Résultats opérationnels (Figure 2):

[] (IMG / 2.png) <br > (Figure 2)