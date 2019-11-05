#Export de scénarios

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


Résultats opérationnels (Figure 2):

[] (IMG / 2.png) <br > (Figure 2)