#Mise en œuvre de la fonction ui du jeu



###Attention à la logique de page

Dans l 'exemple précédent, nous examinons et affichons directement les quatre catégories de pages générées par l' éditeur de l 'IDE.Et le processus d 'interface du jeu est réalisé.

Ce cours nous allons progressivement réaliser les fonctions ui des quatre catégories de pages, par exemple pour commencer la catégorie gamestartui.as, ouvrir cette catégorie, par le cheminL 'événement.Nous pouvons également l 'appeler pour mettre à jour l' avancement du chargement.

Certains d 'entre eux se demandent si l' on peut ajouter un code logique directement dans cette catégorie.Je t 'aime, c' est la vie que je voudrais, simple et tranquille, avec toi.Parce que lorsque nous modifions la page dans l 'IDE pour la rediffusion, vous couvrez automatiquement les catégories générées, vous écrivez des codes logiques qui disparaissent...

Nous avons donc besoin de créer une nouvelle classe dérivée pour éditer le code dans la classe dérivée pour développer la fonction logique.Je ne suis pas hésiter à vous faire savoir ce numéro de ce premier petit ami d 'aller, tout simplement parce que, beau est des ressources partagées dans le monde, comment il peut être occupé par une personne!Notes


```

/**Created by the LayaAirIDE,do not modify.*/
package ui {
	import laya.ui.*;
	import laya.display.*; 
	import laya.display.Text;

	//IDE自动创建生成的页面显示类（开始页面）
	public class GameStartUI extends Dialog 
	{
	    //IDE编辑器中设置的进度显示变量定义
		public var txt_load:Text;
		//IDE编辑器中设置的开始游戏按钮变量定义
		public var btn_start:Box;

		//IDE生成的页面布局JSON数据
		public static var uiView:Object ={"type":"Dialog","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"y":0,"x":0,"width":720,"skin":"gameUI/bg.jpg","sizeGrid":"4,4,4,4","height":1280}},{"type":"Image","props":{"y":378,"x":179,"skin":"gameUI/logo.png"}},{"type":"Text","props":{"y":587,"x":20,"width":681,"var":"txt_load","text":"游戏资源加载进度","height":29,"fontSize":"30","font":"SimHei","color":"#1c1c1c","align":"center"}},{"type":"Text","props":{"y":1200,"x":20,"width":681,"text":"LayaAir1.7.3引擎教学演示版","height":29,"fontSize":"26","font":"SimHei","color":"#7c7979","bold":true,"align":"center"}},{"type":"Box","props":{"y":960,"x":240,"visible":true,"var":"btn_start"},"child":[{"type":"Button","props":{"y":0,"x":0,"width":240,"visible":true,"stateNum":"2","skin":"gameUI/btn_bg.png","sizeGrid":"20,20,20,20","height":80}},{"type":"Image","props":{"y":19,"x":41,"skin":"gameUI/start.png"}}]}]};
		
		//根据JSON数据创建页面子对象
		override protected function createChildren():void
        {
			View.regComponent("Text",Text);
			super.createChildren();
			createView(uiView);
		}
	}
}
```


​

###Démarrage de la page

Création d 'une nouvelle classe de début gamestart.as sous le catalogue SRC, succédant au gamestartui.as généré par l' IDE.

Dans la page de démarrage, nous mettons principalement en œuvre la logique suivante:

Chargement des ressources du jeu.Le procédé de retour de l 'exécution et du chargement est utilisé dans loader.load ().Le procédé de chargement met à jour la zone de texte de progression de l 'ui et le procédé de réalisation affiche le bouton démarrer le jeu.
Note: si le jeu n 'a pas d' autres ressources que le début de la page, les progrès seront rapides jusqu 'à 100%, ce qui permet également de produire un faux pas, d' une durée d 'au moins 1,5 secondes correspondant au temps d' observation de l 'oeil humain.

Masquer et afficher les fonctions du bouton de démarrage.Cache - le avant que les ressources ne soient achevées, afin d 'éviter les erreurs d' accès au jeu sans chargement;

Début de l'animation des pages.Le bouton affiche l 'animation lente; la page affiche l' animation, et la page dialog affiche l 'animation lente ouverte et fermée.

Dans la catégorie principale, nous modifions le nom gamestartui pour gamestart.

Etant donné que la page dialog comporte des fonctions d 'ouverture et de fermeture de l' animation, le texte laya.stage.addchild (START) est modifié pour devenir start.popup ().

Ajouter un procédé de fermeture d 'animation start.close () dans la fonction d' initialisation de jeu.



```

    private function gameStart():void
    {
        //实例化开始页面
        start=new GameStart();
        //以弹出方式打开，有缓动效果。IDE中页面为Dialog类型才可用
        start.popup();
        //监听开始游戏开始按钮事件,点击后进入游戏中
        start.btn_start.on(Event.MOUSE_UP,this,gameInit)
    }

    /**
    游戏中，游戏初始化
    */
    private function gameInit():void
    {
        //缓动动画关闭效果。IDE中页面为Dialog类型才可用
        start.close();
        ...
```

Pour commencer à enlever la scène et à détruire la page, il faut l 'appeler à la fin de l' animation fermée et ajouter un procédé d 'écoute et de retour d' événement de fermeture à gamestart.as.

Début de l'interface.

Note: dans le Code, assetarr est une matrice de ressources de jeu comprenant un jeu d 'images, de musique.Les fichiers musicaux doivent donc être copiés dans le catalogue bin / H5, faute de quoi le chargement risque d 'être erroné.


```

package
{
	import laya.events.Event;
	import laya.net.Loader;
	import laya.utils.Ease;
	import laya.utils.Handler;
	import laya.utils.Tween;
	
	import ui.GameStartUI;
	
	/**
	 * 游戏开始界面
	 */
	public class GameStart extends GameStartUI
	{
		/***游戏资源地址数组***/
		private var assetArr:Array=[{url:"res/atlas/gameRole.atlas"},
									{url:"sound/achievement.mp3", type:Loader.SOUND}, 
									{url:"sound/bullet.mp3", type:Loader.SOUND},
									{url:"sound/game_over.mp3", type:Loader.SOUND},
									{url:"sound/enemy1_die.mp3", type:Loader.SOUND},
									{url:"sound/enemy3_out.mp3", type:Loader.SOUND}
								   ]
		
		/***游戏开始界面***/
		public function GameStart()
		{
			//游戏加载未完成暂时不显示，防止点击出错
			this.btn_start.visible=false;
			//监听界面是否关闭
			this.once(Event.CLOSE,this,onClose);
			
			//加载剩余游戏资源、音乐，加载完成与加载进度回调方法
			Laya.loader.load(assetArr,Handler.create(this,onComplete),Handler.create(this,onProgress))
		}
		
		/**
		 * 游戏资源加载完成
		 */
		private function onComplete():void
		{
			//加载完成
			this.txt_load.text="资源加载完成,开始游戏吧...";
			//游戏开始按钮显示并弹出
			this.btn_start.visible=true;
			//缓动类弹出动画
			Tween.from(this.btn_start,{y:this.btn_start.y+20},1000,Ease.elasticOut);
		}
		
		/**
		 * 游戏资源加载进度
		 * @param loadNum  进度
		 */
		private function onProgress(loadNum:Number):void
		{
			//显示加载进度
			this.txt_load.text="资源加载中，当前进度："+parseInt(loadNum*100)+"%";
		}
		
		/**
		 * 界面关闭
		 */
		private function onClose():void
		{
			//从舞台移除自己
			this.removeSelf();
			//只加载一次，因此直接消毁自己
			this.destroy();
		}
	}
}
```




###Fonction logique de page de carte

Il y a relativement peu de logique sur la page de la carte, et à l 'heure actuelle, nous faisons essentiellement défiler l' arrière - plan.Créer une catégorie gamemap.as, succédant à gamebgui.as.

Modifier le nom de gamebgui dans la catégorie principale de main sous le nom de gamemap.

Il n 'y a qu' un seul moyen d 'updatemap () et la carte se déplace sans cesse vers le haut, ce qui nécessite un appel dans le cycle principal du jeu.


```

package
{
	import laya.display.Sprite;
	import ui.GameBgUI;	
	/**
	 游戏背景
	 */	
	public class GameMap extends GameBgUI
	{
		public function GameMap()
		{
		}
		/**
		 游戏背景移动更新
		 */		
		public function updateMap():void
		{
			//地图每帧在y向下移动1像素，根据喜好调整
			this.y+=1;
			//如果背景图到了下面不可见，立即调整位置到上方继续循环
			//游戏舞台高为1280
			if (bg1.y + this.y >= 1280) 
			{ 
				bg1.y -= 1280 * 2;
			}
			if (bg2.y + this.y >= 1280) 
			{
				bg2.y -= 1280 * 2;
			}
		}
	}
}
```

Ajouter un événement de cycle de trame de jeu et un procédé de retour Loop () dans le procédé de type principal () dans lequel chaque trame met à jour la carte et de nombreux codes logiques écrits ultérieurement fonctionnent.Un procédé de mise à jour de carte est utilisé dans le cycle principal pour vérifier si la carte de jeu se déplace et si la vitesse est raisonnable.


```

			......
			//模拟游戏结束，3秒时间
			Laya.timer.once(3000,this,gameOver);
			//增加游戏主循环
			Laya.timer.frameLoop(1,this,loop);
		}
		/**
		 游戏主循环
		 */
		private function loop():void
		{
			//地图滚动更新
			map.updateMap();
		}
```




###Fonctions logiques

Créer la classe gameplay.as, hériter de gameplayui.as, modifier gameplayui pour gameplay dans la classe main.

Les principales fonctions de la page du jeu sont les suivantes:

Le jeu est suspendu et affiché sur la page de pause.Dans le moteur layaair, l 'objet temporel est global, donc nous pouvons limiter le temps de jeu à 0, alors le jeu s' arrête.Y compris tous les personnages de l 'animation, la carte de fond mobile, le jeu principal cycle, et ainsi de suite.

Le jeu continue, la page de pause disparaît, l 'heure de jeu est réduite à 1 et le jeu continue.

Mise à jour des variations des valeurs du jeu, du volume sanguin de l'acteur principal, des niveaux de jeu et des notes.Crée une méthode Update () pour mettre à jour les données.

Ajouter la quantité de sang de l 'acteur principal du jeu, le niveau, la variable statique globale de score (qui peut également être modifiée dans d' autres catégories) dans la classe principale et l 'appeler dans la circulation principale de la classe principale.


```

		/**主角血量***/
		private var hp:int=10;
		/**游戏关卡数***/
		public static var level:int=1;
		/**玩家得分***/
		public static var score:int=0;
		
		
		public function Main()
		{
			//初始化引擎，建议增加WebGl模式
			Laya.init(720, 1280,WebGL);
			......
```


Les codes spécifiques de la classe gameplay sont les suivants:


```

package
{
	import laya.events.Event;	
	import ui.GamePlayUI;	
	
	/**
	 * 游戏内UI,血量、积分、等级显示、暂停等
	 * @author CHENZHENG
	 * 
	 */	
	public class GamePlay extends GamePlayUI
	{
		/**
		 * 游戏内UI,血量、积分、等级显示、暂停等
		 */
		public function GamePlay()
		{
			//监听暂停按钮事件
			this.btn_pause.on(Event.MOUSE_DOWN,this,onPause)
			//隐藏暂停提示，也可在IDE中设置为false
			this.gamePause.visible=false;
		}
		
		/**
		 游戏暂停
		 */	
		private function onPause():void
		{
			//显示暂停界面
			this.gamePause.visible=true;
			//暂停界面加点击监听
			this.gamePause.once(Event.MOUSE_DOWN,this,onContinue)
			//时间对象缩放为0就是停止
			Laya.timer.scale=0;
		}
		
		/**
		 游戏继续
		 */	
		private function onContinue():void
		{
			//隐藏暂停界面
			this.gamePause.visible=false;
			//时间对象缩放为1就是正常速度播放
			Laya.timer.scale=1;
		}
		
		/****角色属性UI更新***/
		public function update(hp:int,level:int,score:int):void
		{
			//角色血量更新
			this.txt_hp.text="HP:"+hp;
			//关卡等级更新
			this.txt_level.text="LEVEL:"+level;
			//游戏分数更新
			this.txt_score.text="SCORE:"+score;
		}
	}
}
```




###Fin de la page

Créer la catégorie gameover.as, hériter de gameoverui.as, modifier gameoverui pour gameover dans le groupe principal.

Les principales fonctions de la page "fin du jeu" sont les suivantes:

L'écoute « recommencez à cliquer sur le bouton » et, dans le cours précédent, nous avons parlé d'un effet d'animation supplémentaire pour les éléments de page, nommé Ani u restart, où nous pouvons l'appeler.La logique est d 'afficher l' animation du bouton après clic et de recommencer le jeu après la fin de l 'animation du bouton.

Le bouton d'écoute actionne l'animation à effet de levier qui, une fois l'animation terminée, envoie l'événement de reprise du jeu à l'écoute de la catégorie principale et relance le jeu.

Modification de la méthode gameover () dans la catégorie main.Modifie l 'écoute de la souris en une écoute d' événement.


```

	//重新开始游戏按钮监听,点击后进入游戏中
	over.btn_restart.on(Event.MOUSE_DOWN,this,gameInit);
```

A été révisé comme suit:

```

	//重新开始事件监听,点击后进入游戏中
	over.on("reStart",this,gameInit);
```

Code gameover.as:


```

package
{
	import laya.events.Event;
	import laya.utils.Ease;
	import laya.utils.Handler;
	import laya.utils.Tween;
	
	import ui.GameOverUI;
	/**
	 * 游戏结束界面
	 * @author CHENZHENG
	 */
	public class GameOver extends GameOverUI
	{
		public function GameOver()
		{
			//"重新开始"按钮按下鼠标事件
			this.btn_restart.on(Event.MOUSE_DOWN,this,onRestart);
		}
		/**
		游戏重新开始
		 */		
		private function onRestart():void
		{
			//播放IDE中编辑的按钮动画
			this.ani_restart.play(0,false);
			//监听动画完成事件
			this.ani_restart.once(Event.COMPLETE,this,AniComplete);
		}
		/**
		 按钮动画播放完成
		 */
		private function AniComplete():void
		{
			//发送重新开始事件，在Main类中监听
			this.event("restart")
            //缓动动画关闭效果。IDE中页面为Dialog类型才可用
			start.close();
		}
	}
}
```


Ici, notre code logique de page est terminé, compilez le jeu d 'exécution et regardez l' effet final.



###Code complet de main


```

package {
	
	import laya.display.Stage;
	import laya.events.Event;
	import laya.net.Loader;
	import laya.utils.Handler;
	import laya.webgl.WebGL;
	
	
	public class Main
	{
		/**开始页面***/
		private var start:GameStart
		/**地图页面***/
		private var map:GameMap
		/**游戏中界面***/
		private var play:GamePlay
		/**游戏结束页面***/
		private var over:GameOver
		
		/**主角血量***/
		private var hp:int=10;
		/**游戏关卡数***/
		private var level:int=1;
		/**玩家得分***/
		private var score:int=0;
		
		
		public function Main()
		{
			//初始化引擎，建议增加WebGl模式
			Laya.init(720, 1280,WebGL);
			//全屏不等比缩放模式
			Laya.stage.scaleMode = Stage.SCALE_EXACTFIT;
			//加载游戏页面资源(如果界面资源太多太大[超过50k],建议开始页面单独建立文件夹打包)
			Laya.loader.load("res/atlas/gameUI.atlas",Handler.create(this,this.gameStart))
				
		}
		
		/**
		 资源加载完成后，加载游戏开始界面
		 */
		private function gameStart():void
		{
			//实例化开始页面
			start=new GameStart();
			//以弹出方式打开，有缓动效果。IDE中页面为Dialog才可用
			start.popup();
			//监听开始游戏开始按钮事件,点击后进入游戏中
			start.btn_start.on(Event.MOUSE_UP,this,gameInit)
		}
		
		/**
		 游戏中，游戏初始化
		 */
		private function gameInit():void
		{
			//缓动动画关闭效果。IDE中页面为Dialog才可用
			start.close();
			
			//实例化地图背景页面(如果已实例化，不需要重新new)
			map||=new GameMap();
			//加载到舞台
			Laya.stage.addChild(map);
			
			//实例化游戏中UI页面(如果已实例化，不需要重新new)
			play||=new GamePlay();
			
			//加载到舞台
			Laya.stage.addChild(play);
			
			//模拟游戏结束，3秒时间
			Laya.timer.once(3000,this,gameOver);
			//游戏主循环
			Laya.timer.frameLoop(1,this,loop);
		}
		
		/**
		 游戏主循环
		 */
		private function loop():void
		{
			//地图滚动更新
			map.updateMap()
			//本局游戏数据更新
			play.update(hp,level,score)
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
			over||=new GameOver();
			//游戏积分显示
			over.txt_score.text=score.toString();
			//以弹出方式打开，有缓动效果。IDE中页面为Dialog才可用
			over.popup();
			//重新开始事件监听,点击后进入游戏中
			over.on("reStart",this,gameInit);
		}
	}
}
```




