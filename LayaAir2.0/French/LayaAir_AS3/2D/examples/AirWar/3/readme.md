#Commande de processus ui de jeu

###Contrôle de processus de jeu

Dans le cours précédent, nous avons produit toutes les ressources visuelles et créé une catégorie d 'affichage ui.Ce cours commence par l 'édition officielle du Code logique du jeu, d' une part, nous connaissons les processus, les idées de développement du jeu et, d 'autre part, nous apprenons la mise en œuvre de la fonction layaair ui.

Selon l 'analyse des besoins, le jeu de la guerre d' avion est relativement simple, le jeu commence - est en cours - personnage mort - fin du jeu - recommence - le jeu est en cours... Donc, dans ce cours, nous mettons l 'accent sur la mise en œuvre de la fonction ui du jeu, c' est aussi le prolongement de la leçon précédente.

Adresse de démonstration d 'effet de flux d' interface



###Nouveau jeu

Changer le mode de base de code avec la création d 'une nouvelle catégorie main dans le dossier SRC, d' abord démarrer le moteur layaair avec une résolution de 720 * 1280 (la taille de la page doit être la même que dans l 'IDE), puis charger les ressources du jeu et la page de début comme Première étape de notre jeu.

Les auteurs recommandent ici l 'utilisation de Flash Builder ou de flashdevelop pour l' écriture, layaair n 'est pas encore très bien appuyé par AS3 et la fonction de l' indication de code est faible.

Ajouter le code suivant dans la catégorie main:


```

package {
	import laya.net.Loader;
	import laya.utils.Handler;
	import laya.webgl.WebGL;
	
	import view.TestView;
	//游戏主类，游戏入口
	public class Main 
	{
		public function Main()
		{
			//初始化引擎，建议增加WebGl模式
			Laya.init(720, 1280,WebGL);

			//加载游戏页面资源(如果界面资源太多太大[超过50k],建议开始页面单独建立文件夹打包)
			Laya.loader.load("res/atlas/gameUI.atlas",Handler.create(this,this.gameStart))
		}
		/**
		 资源加载完成后，实例并加载游戏开始界面
		 */
		private function gameStart():void
		{
            //实例化开始页面
			var start:GameStartUI=new GameStartUI();
			//将开始页面加载到舞台
			Laya.stage.addChild(start)
		}
	}
}
```


Le moteur layaair exige que le chargement des ressources nécessaires soit achevé avant le chargement des pages ui.Dans les deux derniers cours, nous avons dit que les ressources d 'interface éditées dans l' IDE sont automatiquement emballées après la publication de l 'Atlas, et que les ressources ui sont générées à l' adresse "bin / H5 / RES / Atlas /".

Une fois que le chargement de ressources est terminé, la page de démarrage est mise à l 'échelle dans la fonction de retour achevée et chargée sur scène.Vous pouvez voir que la page d 'ouverture est déjà affichée.

Cependant, en raison de sa taille trop grande et de l 'insuffisance de l' affichage du navigateur, nous pouvons ajouter l 'adaptation de l' écran sous le procédé d 'initialisation du moteur laya.init () afin que l' écran complet du jeu corresponde à la taille du navigateur.Équipements d'adaptation de l'écran


```

	//全屏不等比缩放模式
	Laya.stage.scaleMode = Stage.SCALE_EXACTFIT;
```




###Commande de processus de jeu

Sur la base d 'une analyse diagnostique antérieure, nous avons d' abord mis au point le contrôle de l 'ensemble des processus du jeu, ce qui nous permet d' avoir une idée plus claire de notre développement et, dans le cas de projets de grande envergure, de mieux répartir les tâches.Nous allons ensuite mettre en place un système de cycle de processus de base pour le jeu.

Tout d 'abord, nous ajoutons les variables globales de la page de processus, soit un total de quatre pages.

Ensuite, nous utilisons trois méthodes comme processus principal du jeu: le jeu commence par gamestart (), le jeu s' achève par gameover () et l 'affichage et le transfert de la page de flux du jeu.

Dans le procédé gameinit () Il n 'est pas possible d' appeler le procédé gameover () car il n 'y a pas d' ajout temporaire de rôle et il n 'est pas possible de le faire avec la mort de l' acteur principal.

**Notes:**Parce que les méthodes gameinit () et gameover () sont répétées pendant le jeu (pendant le jeu - fin du jeu - fin du jeu - fin du jeu...), les camarades de classe peuvent constater que la carte, l 'ui dans le jeu et l' ui à la fin du jeu sont créés à plusieurs reprises, ce qui entraîne des frais de mémoire inutiles.

Alors nous avons deux solutions:
La première consiste à modifier tous les ui en un seul mode de sorte qu 'il n' y ait qu 'un seul exemple ui dans le jeu.
Deuxièmement, il s'agit de déterminer si la mise en pratique a été effectuée.Vous pouvez utiliser l 'opérateur & ‧‧;  \   \ \ \ \ \ \ \ \ \ \ \  \
Par exemple: Play \ \ 124 \ \ New = gameplayui (), c 'est l' équivalent de play = play \ \ 124 \ \ gameplayui ()

Tous les codes sont les suivants:


```

package {
	
	import laya.display.Stage;
	import laya.events.Event;
	import laya.net.Loader;
	import laya.utils.Handler;
	import laya.webgl.WebGL;
	
	import ui.GameBgUI;
	import ui.GameOverUI;
	import ui.GamePlayUI;
	import ui.GameStartUI;
	
	public class Main
	{
		/**开始页面***/
		private var start:GameStartUI
		/**地图页面***/
		private var map:GameBgUI
		/**游戏中界面***/
		private var play:GamePlayUI
		/**游戏结束页面***/
		private var over:GameOverUI
		
		public function Main()
		{
			//初始化引擎，建议增加WebGl模式
			Laya.init(720, 1280,WebGL);
			//全屏不等比缩放模式
			Laya.stage.scaleMode = Stage.SCALE_EXACTFIT;
			
			//加载游戏页面资源(如果界面资源太多[图集超过50k],建议开始页面单独建立文件夹打包图集并加载)
			Laya.loader.load("res/atlas/gameUI.atlas",Handler.create(this,this.gameStart))
		}
		
		/**
		 资源加载完成后，加载游戏开始界面
		 */
		private function gameStart():void
		{
			//实例化开始页面
			start=new GameStartUI();
			//监听开始游戏开始按钮事件,点击后进入游戏中（IDE中设置的变量定义）
			start.btn_start.on(Event.MOUSE_UP,this,gameInit)
			//将开始页面加载到舞台
			Laya.stage.addChild(start);
		}
		
		/**
		 游戏中，游戏初始化，地图、游戏中UI
		 */
		private function gameInit():void
		{
			//实例化地图背景页面(如果已实例化，不需要重新new)
			map||=new GameBgUI();
			//加载到舞台
			Laya.stage.addChild(map);
			
			//实例化游戏中UI页面(如果已实例化，不需要重新new)
			play||=new GamePlayUI();
			//加载到舞台
			Laya.stage.addChild(play);
			
			//模拟游戏结束，3秒时间延迟...
			Laya.timer.once(3000,this,gameOver)
		}
		
		/**
		 游戏结束
		 */
		private function gameOver():void
		{
			//移除地图背景
			map.removeSelf();
			//移除游戏中UI
			play.removeSelf();
			
			//实例化游戏结束页面(如果已实例化，不需要重新new)
			over||=new GameOverUI();
			//游戏积分显示
			over.txt_score.text=score.toString();
			//重新开始游戏按钮监听,点击后进入游戏中（IDE中设置的变量定义）
			over.btn_restart.on(Event.MOUSE_UP,this,gameInit);
			//加载到舞台
			Laya.stage.addChild(over)
		}
	}
}
```


Le code ci - dessus est compilé et le processus de base du jeu est en cours.

Bien entendu, il y a encore beaucoup de détails qui ne sont pas parfaits, par exemple commencer à mettre à jour les progrès du jeu sur la page, les pages et les boutons n 'ont pas d' effet animé, peuvent être réalisés par le Code de la catégorie de page elle - même, la prochaine leçon nous reprendrons à l 'élaboration de la logique du Code de page.

