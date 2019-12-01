#Dessin animé avec layaairide

> avant de lire ce texte, il faut lire l 'animation d' Atlas sur la base de l 'animation 2d, une description détaillée des propriétés des composants d' imagerie et d 'autres documents de base IDE.The Basic Concept and Operation

##Objectifs

![动图1](img/1.gif) 


(Figure 1)

Comme indiqué dans l 'animation 1.Cet article produit une animation d 'Atlas dans layaairide et produit un simple panneau ui et bouton de commande.Un code est ensuite élaboré pour commander l 'animation d' Atlas produite.

##Préparation des matériaux

L 'ensemble arrière - plan du panneau d' animation et l 'ensemble bouton ainsi que les ressources de trames de séquences d' animation sont copiés dans le gestionnaire de ressources de l 'IDE.L 'ensemble ui de ce document est dans le répertoire comp et les ressources d' animation dans le répertoire role.Comme le montre la figure 2.

![图2](img/2.png) 


(Figure 2)

##Généralités

3.1 Mise en place de la cellule

Crée d 'abord une page ui du type View (* cas d' animation.ui *).Puis faites glisser l 'ensemble d' arrière - plan vers l 'éditeur de scène, puis définissez la grille de Jiu Gong, puis étirez l' effet sur la figure 3.









###Création et application de modèles d 'animation

Selon l 'aperçu du modèle d' animation, nous modifions le Code et ajoutons le procédé de création du modèle d 'animation.


```java

package
{
	import laya.debug.DebugPanel;
	import laya.display.Animation;
	import laya.display.Stage;
	import laya.events.Event;
	import laya.maths.Rectangle;
	import laya.utils.Handler;
	import laya.webgl.WebGL;
	
	import ui.PlayControlUI;

	public class AtlasAnimation
	{
		/****角色动画****/
		private var roleAni:Animation
		
		public function AtlasAnimation()
		{
			// 不支持WebGL时自动切换至Canvas
			Laya.init(1280,720, WebGL);
			//画布垂直居中对齐
			Laya.stage.alignV = Stage.ALIGN_MIDDLE;
			//画布水平居中对齐
			Laya.stage.alignH = Stage.ALIGN_CENTER;
			//等比缩放
			Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
			//背景颜色
			Laya.stage.bgColor = "#1b2436";
			
			
			//加载角色图集资源
			Laya.loader.load(["res/atlas/role.atlas"], Handler.create(this, createAni));
		}
		
		private function createAni():void 
		{
			
			//实例化角色动画
			roleAni = new Animation();
			// 加载图集动画
			roleAni.loadAtlas("res/atlas/role.atlas");	
			// 设置动画每帧间播放间隔（单位：毫秒）
			roleAni.interval = 100;
			//角色动画放大
			roleAni.scale(1.4,1.4);			
			
			//创建动画模版，以供动作切换控制使用
			Animation.createFrames(actionUrls("stand",7),"stand");    	//站立动画
			Animation.createFrames(actionUrls("move",8),"move");		//移动动画
			Animation.createFrames(actionUrls("die",8),"die");			//死亡动画
			Animation.createFrames(actionUrls("attack",7),"attack");	//攻击动画
			
			//播放某个缓存的动画模版
			roleAni.play(0,true,"attack");	
			
			//动画实例无宽高，需通过getGraphicBounds()或getBounds()获取
			//获取动画的边界信息
			var bounds:Rectangle = roleAni.getGraphicBounds();
			//设置动画轴心点
			roleAni.pivot(bounds.width / 2, bounds.height / 2);
			//设置动画在舞台中心位置
			roleAni.pos(Laya.stage.width / 2-200, Laya.stage.height / 2);
			//加载到舞台
			Laya.stage.addChild(roleAni);

		}
		
		/**
		 * 动作资源的一组url数组（美术资源地址数组）
		 * @param aniName  动作的名称，用于生成url
		 * @param length   动画的帧数
		 */		
		private function actionUrls(aniName:String,length:int):Array
		{
			var urls:Array=[];
			for(var i:int=0;i<length;i++)
			{
				urls.push("role/" + aniName + i + ".png")
			}
			return urls;
		}
	}
}
```


Si vous compilez le code ci - dessus, nous pouvons voir que la séquence d 'animation par défaut n' est plus diffusée, mais seulement les actions offensives du personnage.Commutable`roleAni.play(0,true,"attack");`The Second Parameter "attack" is observed Effect for other animation Models names, and if other animation models are playing correct.



##Contrôle de la diffusion des animations

Pour mieux observer les effets de l 'animation créée, changer le modèle d' animation des différentes actions et faire mieux connaître le contrôle de la lecture d 'animation.Nous avons créé un ui de contrôle dans l 'IDE et avons défini un nom de bouton pour contrôler l' action de rôle de test.UI effets et illustrations ci - après (fig. 8):

![图片8.png](img/8.png)< br / > (Figure 8)

Les catégories playcontrolui générées par le chargement et la mise en oeuvre des ressources ui dans le programme sont ajoutées au Code de commande de transfert de rôle d 'écoute ui et de lecture.

La commande de lecture d 'animation utilise le procédé Stop () de l' animation ainsi que l 'index de lecture actuel de l' animation et les propriétés de longueur totale de l 'animation count.

IPS: index de lecture INDEX renvoie à l'emplacement de la trame dans laquelle l'animation (ou le modèle d'animation) est actuellement diffusée.Si le modèle d 'animation est actuellement diffusé, l' index se transforme en une position d 'index de trame du modèle d' animation et non en une position d 'index de trame de l' animation d 'images entières.Dans le même temps, les propriétés count passent de la longueur totale de l 'animation à la longueur totale du modèle d' animation (nombre total de trames).

Le Code se réfère:


```java

package
{
	import laya.debug.DebugPanel;
	import laya.display.Animation;
	import laya.display.Stage;
	import laya.events.Event;
	import laya.maths.Rectangle;
	import laya.utils.Handler;
	import laya.webgl.WebGL;
	
	import ui.PlayControlUI;

	public class AtlasAnimation
	{
		/****角色动画****/
		private var roleAni:Animation
		/***IDE制作的角色动画控制UI***/
		private var control:PlayControlUI
		
		public function AtlasAnimation()
		{
			// 不支持WebGL时自动切换至Canvas
			Laya.init(1280,720, WebGL);
			//画布垂直居中对齐
			Laya.stage.alignV = Stage.ALIGN_MIDDLE;
			//画布水平居中对齐
			Laya.stage.alignH = Stage.ALIGN_CENTER;
			//等比缩放
			Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
			//背景颜色
			Laya.stage.bgColor = "#1b2436";
			
			//加载角色图集资源
			Laya.loader.load(["res/atlas/role.atlas","res/atlas/comp.atlas"], Handler.create(this, createAni));
		}
		
		private function createAni():void 
		{
			//实例化控制UI,并加载到舞台上
			control=new PlayControlUI();
			Laya.stage.addChild(control);
			
			
			//实例化角色动画
			roleAni = new Animation();
			// 加载图集动画
			roleAni.loadAtlas("res/atlas/role.atlas");	
			// 设置动画每帧间播放间隔（单位：毫秒）
			roleAni.interval = 100;
			//角色动画放大
			roleAni.scale(1.4,1.4)
			//默认会播放全部动画
			roleAni.play();	
			
			//动画实例无宽高，需通过getGraphicBounds()或getBounds获取
			//获取动画的边界信息
			var bounds:Rectangle = roleAni.getGraphicBounds();
			//设置动画轴心点
			roleAni.pivot(bounds.width / 2, bounds.height / 2);
			//设置动画在舞台中心位置
			roleAni.pos(Laya.stage.width / 2-120, Laya.stage.height / 2);
			//加载到舞台
			Laya.stage.addChild(roleAni);
			
			
			//创建动画模版，以供动画切换控制使用
			Animation.createFrames(actionUrls("stand",7),"stand");    	//站立动画
			Animation.createFrames(actionUrls("move",8),"move");		//移动动画
			Animation.createFrames(actionUrls("die",8),"die");			//死亡动画
			Animation.createFrames(actionUrls("attack",7),"attack");	//攻击动画
			
			//动画播放控制按钮组事件监听
			control.box_control.on(Event.MOUSE_DOWN,this,onControl);
			//动作切换按钮组事件监听
			control.box_frames.on(Event.MOUSE_DOWN,this,onChangeFrames);
		}
		
		/****角色动画切换****/
		private function onChangeFrames(e:Event):void
		{
			//根据名字播放动画模版（IDE中设置按钮名字name与动画模版设置名字需相同）
			roleAni.play(0,true,e.target.name);
			//改变标题
			control.title.text="当前播放动画为："+e.target.name
		}
		
		/****角色动画播放控制****/
		private function onControl(e:Event):void
		{
			//获得按钮名字（IDE中设置的按钮名字name）
			var names:String=e.target.name;
			if(names=="stop")
			{
				//动画停止
				roleAni.stop();	
				control.title.text="停止动画";
			}else if(names=="play")
			{
				//播放动画
				roleAni.play();	
				control.title.text="播放动画";
				
			}else if(names=="up")//动画的上一帧
			{
				//动画停止
				roleAni.stop();	
				//当前动画的帧位置减1（如播放动画模版，index、count都会切换为动画模版的帧位置与总帧数）
				roleAni.index--;
				//如果帧位置小于0，则帧位置等于当前动画的帧总数-1
				if(roleAni.index<0) roleAni.index=roleAni.count-1;
				control.title.text="当前帧位置为："+roleAni.index;
				
			}else if(names=="next")//动画的下一帧
			{
				//动画停止
				roleAni.stop();	
				//当前动画的帧位置加1（如播放动画模版，index、count都会切换为动画模版的帧位置与总帧数）
				roleAni.index++;
				//如果帧位置大于动画的帧总数-1，则帧位置等于0
				if(roleAni.index>roleAni.count-1) roleAni.index=0;
				control.title.text="当前帧位置为："+roleAni.index;
			}

		}
		
		/**
		 * 一组动画资源的url数组（美术资源地址数组）
		 * @param aniName  动作的名称，用于生成url
		 * @param length   动画的帧数
		 */		
		private function actionUrls(aniName:String,length:int):Array
		{
			var urls:Array=[];
			for(var i:int=0;i<length;i++)
			{
				urls.push("role/"+aniName+i+".png")
			}
			return urls;
		}
	}
}
```


Compiler le code d 'exécution, comme le montre la figure 1.En cliquant sur différents boutons, on peut reproduire différents types d 'animation, arrêter l' animation et changer de trame.