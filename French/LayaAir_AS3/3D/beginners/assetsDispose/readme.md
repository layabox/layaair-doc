##Libération des ressources de layaair3d



###Pourquoi libérer des ressources?

Dans le développement du jeu layaair 3D, la libération des ressources est très importante.Les ressources 3D comprennent des modèles, des affiches, des matériaux, des animations, etc. pour obtenir de bons résultats d 'image, le fichier sera beaucoup plus grand que le 2D, alors que les moteurs 3D seront pratiquement toutes mis en GPU pour le calcul et le rendu, ce qui absorbera une grande partie de l' affichage.Le jeu finira par s' effondrer si les ressources ne sont pas libérées.

Il n 'existe pas de mécanisme de récupération des ordures comme la mémoire, mais il faut les libérer manuellement, et il faut donc accorder une attention particulière à la libération des ressources.

Taille des outils statistiques dans les figures 1 et 2

La figure 1 présente la première scène chargée après le démarrage du jeu avec un nombre de surfaces de 30 527, avec un affichage de 85,2 m.

![图1](img/1.png)< br > (Figure 1)

Figure 2 Deuxième scénario chargé pour le jeu, avec 7 455 pages seulement, alors que les ressources affichées après le chargement sont de 118 91m.Pourquoi?Données à titre indicatif uniquement, elles ne sont pas intégrées dans les notes d 'hôtels Ctrip.

C 'est parce que le premier scénario n' a pas été relâché, que ses ressources sont toujours en vie et que l 'occupation apparente s' est accrue.Si le jeu n 'est pas effacé manuellement, le jeu continue de changer d' autres scènes, après avoir atteint une certaine quantité, les téléphones portables apparaîtront, les cartes de jeu sont morts, les Flash, la fièvre, etc.

![图2](img/2.png)< br > (Figure 2)



###Principe de traitement des ressources

L 'exemple de la figure ci - dessus montre la relation entre les ressources traitées par le moteur layaair3d et l' existence, ainsi que les principes qui doivent être pris en compte lors du chargement des ressources afin d 'optimiser les performances du jeu.

Ne chargez pas toutes les ressources en une seule fois, mais seulement les ressources nécessaires (mode de chargement segmenté).Une fois le chargement de ressources 3D effectué, l 'objet d' affichage 3D est créé directement en fonction du nom de suffixe de ressources, par exemple. LS crée scene, LH crée un objet sprite3d, etc., et les ressources d 'objet bien créées sont directement mises en mémoire, même si elles ne sont pas sur scène, ce qui permet d' obtenir une surabondance de ressources.

Une gestion rationnelle fait apparaître que les ressources fréquemment utilisées n 'ont pas besoin d' être libérées dans l 'affichage et que les ressources non utilisées sont libérées dès qu' elles ont été utilisées afin d 'économiser les dépenses de fonctionnement.Par exemple, les ressources d 'acteur principal, les ressources d' accessoires 3D, qui sont souvent utilisées par les joueurs, peuvent être stockées dans l 'affichage et la vitesse d' extraction rapide; tandis que certaines grandes scènes peuvent libérer les ressources lors d 'un transfert, les cartes de niveau de scène, les ressources de modélisation sont plus importantes, ce qui permet d' économiser des dizaines de gigabits de frais de mise en évidence.



###Procédé de libération de ressources de mémoire

L 'invention concerne deux procédés de libération de ressources de visualisation, l' un consistant à libérer des ressources de visualisation par l 'intermédiaire d' objets, sans qu 'aucune recommandation ne soit faite sur l' historique de l 'objet de ressource, et l' autre consistant à libérer des ressources de visualisation par l 'intermédiaire d' adresses de ressources qui, du point de vue de la gestion des ressources, sont plus souples et peuvent être gérées par la configuration d 'une table de données json.

####Interface de transition pour le transfert de scènes et la libération de ressources

Lors du chargement des ressources et du transfert des scènes, nous produisons une interface d 'affichage de progression dans l' IDE pour la transition, comme la figure 3.

![图3](img/3.png)< br > (Figure 3)

Après la publication de l'IDE, une catégorie de contrôle a été mise au point et les codes logiques sont référencés comme suit:


```java

package view
{
	import ui.ProgressBarUI;
	
	public class AssetLoadView extends ProgressBarUI
	{
		/**资源加载进度***/
		private var progress:int=0;
		
		public function AssetLoadView()
		{
		}
		/**
		 * 初始化，进度计时
		 */	
		public function init():void
		{
			progress=0;
			//进度增加的帧循环
			Laya.timer.loop(20,this,onLoop);
		}
		/**
		 * 资源加载进度模拟（假进度）
		 */		
		private function onLoop():void
		{
			//进度增加
			progress++;
			//最高100%进度
			if(progress>100)
			{
				progress=100;
				this.tips.text="游戏加载完毕，即将进入游戏..."
				Laya.timer.clearAll();
				this.removeSelf();				
			}else
			{
				this.pro.value=progress/100;
				this.tips.text="游戏正在加载中，当前进度为："+progress+"%!"
			}
		}
	}
}
```




####Libération de ressources de mémoire par l 'intermédiaire d' une table d 'adresses de ressources

Dans la catégorie principale, nous changeons de scène en double cliquant sur la scène avec une souris, en utilisant une adresse de ressource pour libérer une ressource affichée et en chargeant une nouvelle scène.

L 'ajout de ressources de suppression dans la table est également commode.Par exemple, les beaux - arts créent une nouvelle table json lors de l 'exportation de la scène, placent tous les chemins de ressources qui ne sont pas nécessaires après le passage de la scène dans la table J, les ressources utiles ne sont pas libérées sans l' entrée de la table, par exemple certaines ressources d 'éléments de jeu tels que NPC, accessoires, effets spéciaux.

Tips: les ressources comprennent: Lightmap, material, lmat, model. LM, divers types d 'affiches. Ping ou. JPG, animation. LANI, os. Lav, etc.

Nous allons maintenant présenter la méthode de la table des ressources, en commençant par établir le fichier json dans le répertoire des fichiers de ressources exportés et par éditer les ressources de trajet à libérer, en formant une matrice json dont le nom correspond au fichier.Voir les figures 5 et 6.

![图5](img/5.png)< br > (Figure 5)

![图6](img/6.png)< br > (Figure 6)

Lorsque l 'édition de json est terminée, un outil de vérification peut être utilisé pour vérifier si le format est correct.Le Code de classe principale est alors créé comme suit:


```java

package
{
	import laya.d3.core.Camera;
	import laya.d3.core.Sprite3D;
	import laya.d3.core.scene.Scene;
	import laya.d3.math.Vector3;
	import laya.display.Stage;
	import laya.events.Event;
	import laya.net.Loader;
	import laya.resource.Resource;
	import laya.utils.Handler;
	import laya.utils.Stat;
	
	import view.AssetLoadView;

	/**
	 * 资源释放示例
	 */	
	public class LayaAir3D_AssetsDespose
	{
		/***3D场景****/
		private var scene:Scene;
		/***3D摄像机****/
		private var camera:Camera;
		/***3D角色****/
		private var role:Sprite3D;
		/***2D加载进度界面（假）****/
		private	var progress:AssetLoadView
		
		public function LayaAir3D_AssetsDespose()
		{
			//初始化引擎
			Laya3D.init(1334, 750 ,true);
			//画布垂直居中对齐
			Laya.stage.alignV = Stage.ALIGN_MIDDLE;
			//画布水平居中对齐
			Laya.stage.alignH = Stage.ALIGN_CENTER;
			//等比缩放
			Laya.stage.scaleMode = Stage.SCALE_FIXED_AUTO;
			//自动横屏，游戏的水平方向始终与浏览器屏幕较短边保持垂直
			Laya.stage.screenMode = "horizontal";
			//开启统计信息
			Stat.show();
			
			//加载2D资源
			Laya.loader.load("res/atlas/comp.atlas",Handler.create(this,on2DComplete));
		}
		
		/**
		 * 加载2D资源完成回调
		 */	
		private function on2DComplete():void
		{
			//实例化加载进度页面
			progress=new AssetLoadView();
			progress.init();
			progress.loadTitle.text="资源加载与释放示例";
			Laya.stage.addChild(progress);
			
			//加载第一关场景角色3D资源(不能全部加载，否则太占显存)
			Laya.loader.create([{url:"LayaScene_loveScene/loveScene.ls"},
								{url:"LayaScene_girl/girl.lh"}],Handler.create(this,on3DComplete));
		}
		
		/**
		 * 加载3D资源完成回调 
		 */		
		private function on3DComplete():void
		{
			//实例化场景
			scene=Laya.loader.getRes("LayaScene_loveScene/loveScene.ls");
			Laya.stage.addChild(scene);
			Laya.stage.setChildIndex(scene,0);
			
			//实例化摄像机
			camera=new Camera();
			//移动摄像机位置
			camera.transform.translate(new Vector3(-1, 2, 15));
			//设置摄像机视野范围（角度） 
			camera.fieldOfView=25;	
			camera.transform.lookAt(new Vector3(-1,0,0),new Vector3(0,0,0));
			scene.addChild(camera);

			//实例化角色添加到场景
			role=Laya.loader.getRes("LayaScene_girl/girl.lh");
			scene.addChild(role);

			//双击游戏画面切换场景
			Laya.stage.on(Event.DOUBLE_CLICK,this,onChangeScene);
		}
		
		/**
		 * 加载第二关场景资源，切换场景 
		 */	
		private function onChangeScene():void
		{
			//去除双击事件监听
			Laya.stage.off(Event.DOUBLE_CLICK,this,onChangeScene);
			
			//切换场景加载界面
			progress.init();
			progress.loadTitle.text="正在切换场景，请稍后"
			Laya.stage.addChild(progress);
			
			//移除摄像机与角色
			scene.removeChild(camera);
			scene.removeChild(role);
			
			//列表释放显存资源方法（释放的资源配置表）
			assetsDispose("LayaScene_loveScene/loveScene.json");
			
			//销毁之前场景
			scene.destroy();
			
			//加载第二关场景资源到游戏中
			scene=Scene.load("LayaScene_scene02/scene02.ls");
			Laya.stage.addChild(scene);
			
			//摄像机的位置与对准目标
			camera.transform.position=new Vector3(-1, 1, 8);
			camera.transform.lookAt(new Vector3(-1.5,0.5,0),new Vector3(0,0,0));
			
			//添加摄像机与角色到新场景
			scene.addChild(camera);
			scene.addChild(role);
			role.transform.position=new Vector3(-1, 0, -3.5);
			
			//设置场景层级在最下层
			Laya.stage.setChildIndex(scene,0);
			
			//现有显存中的资源
			trace("现有显存中的资源:",Loader.loadedMap)
		}

		/**
		 * 列表释放显存资源方法(利用资源表方式，每个场景配置资源路径表)
		 * @param target3D 需要释放资源的对象资源表assetsUrl:String
		 */		
		private function assetsDispose(assetsUrl:String):void
		{
			//加载盘释放的资源配置表
			Laya.loader.load([{url:assetsUrl,type:Loader.JSON}],
                             Handler.create(this,onAssetsOK,[assetsUrl]));
		}
		
		/**加载资源释放表完成后**/		
		private function onAssetsOK(assetsUrl:String):void
		{
			//获取加载的数据（Json数组转化成数组）
			var arr:Array=Laya.loader.getRes(assetsUrl);
			for(var i:int=arr.length-1;i>-1;i--)
			{
				//根据资源路径获取资源（Resource为材质、贴图、网格等的基类）
				var resource:Resource=Laya.loader.getRes(arr[i].url);
				//资源释放
				resource.dispose();
			}
		}
	}
}
```


Lorsque l'on observe la méthode de l'assetsdispose (assetsurl: String), on obtient directement les objets générés par les ressources par l'intermédiaire de la méthode laya.loader.getres (AR [i]. URL) (qui, au moment de la création, génère différents types d'objets, dont la méthode getres peut être lue directement) en fonction du suffixe URL) et qui sont tous des sous - catégories de Resource, de sorte que l'objet peut être libéré par l'utilisation de la méthode dispose ().Source

Une fois les ressources libérées, les ressources existantes dans le cache peuvent également être consultées par l 'intermédiaire de l' attribut loademap.

Lorsque vous compilez et exécutez le code ci - dessus, nous pouvons voir l 'effet de la figure 4 et relâcher et charger de nouvelles scènes, l' occupation apparente est beaucoup plus faible.Les ressources non libérées étaient auparavant de 118 91m, soit 56,11 m seulement.

![图4](img/4.png)< br > (Figure 4)