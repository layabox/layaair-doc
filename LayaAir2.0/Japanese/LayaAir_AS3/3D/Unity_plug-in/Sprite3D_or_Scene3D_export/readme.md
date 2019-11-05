# 预设/场景的导出

先ほどプレビューしたシーンを開きます。出力シーンの設定ができたら。

Laya Exportボタンをクリックして、Scene 3 DとSprite 3 Dを一つずつエクスポートします。統合されたフォルダディレクトリ構造は以下の通りです。

！[](img/1.png)<br/>(図1)

上の図のファイルリソースを参照してください。エクスポート後に.ls、.lm、.lmatデータリソース、およびjpg、pngリソースを生成します。

これらの具体的な使い方は、後続の授業ドキュメントで詳しく紹介されます。

**Tips：同時にエクスポートする時はLayaAir 3 Dの素材ボールを使わなければなりません。そうでなければ、エクスポート後には大きな差があります。しかも部分は使えません。シーンモデルについてはUnity導出をサポートしていますが、メニューバーのLayaAir 3 D-Help-to trourialで見ることができます。**

メニューバー--LayaAir 3 D-Shortcus-Switch to LayaAir 3 D sharerでは、プロジェクト内のすべての材質をLayaAir 3 Dのデフォルトの材質に変更できます。

エクスポートが完了したら、簡単な例のbinフォルダにファイルをコピーします。

Tips：この章では簡単なローディングアプリケーションだけを紹介しています。エクスポートすると様々なフォーマットが生成されます。その詳細な説明は3 D技術ドキュメントで「リソースローディング編」を紹介します。

ローディングシーン.lsコードの例は以下の通りです。


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


運転効果（図2）：

！[](img/2 png)<br/>(図2)