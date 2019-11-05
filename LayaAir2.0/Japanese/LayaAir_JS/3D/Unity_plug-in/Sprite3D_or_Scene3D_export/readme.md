#プリセット/シーンのエクスポート

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


```javascript

export default class GameUI extends Laya.Scene {
    constructor(){
        super();
        //加载场景文件
        this.loadScene("test/TestScene.scene");
        //加载场景
        		Laya.Scene3D.load('LayaScene_test/Conventional/test.ls',Laya.Handler.create(this,this.onComplete))
    }
    /**
	 * 加载完成
	 */
    onComplete(scene){
        // 将场景加到舞台上
        Laya.stage.addChild(scene);
    }
}
```


運転効果（図2）：

！[](img/2 png)<br/>(図2)