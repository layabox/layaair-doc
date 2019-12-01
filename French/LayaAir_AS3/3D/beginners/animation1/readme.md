##Layaair3d animation 1

À l'heure actuelle, le moteur layaair3d a procédé à d'importants ajustements de la partie animée, tout en conservant l'ancienne version de l'animation, mais il est recommandé aux concepteurs d'utiliser de nouveaux modules d'animation.La nouvelle version de l 'ensemble animateur animator intègre plusieurs types d' animation de l 'ancienne version sans les classer pour les créer, ce qui permet d' économiser du temps de développement, y compris l 'animation osseuse, l' animation de matériaux, l 'animation rigide, l' animation de caméras, etc.

L 'ensemble d' animation animator supporte l 'animation exportée par Unity, le modèle d' animation squelettique peut être édité de manière intégrée après l 'introduction de l' Unity, l 'animation de matériau, l' animation rigide pouvant être éditée directement dans l 'unité et exportée pour être utilisée.



###Personnage d 'animation

L 'animation de personnages de jeux en 3D est largement utilisée dans les jeux en 3D, les modèles d' animation de rôles peuvent être introduits dans l 'unité et exportés vers layaair pour être utilisés.

####Édition d 'animation en Unity

Import ModelDans un gestionnaire de ressources Unity, les ressources de modèle Fbx, les ressources d 'autocollage sont importées par le bouton droit (Import New Assets) et traînées dans la scène pour ajuster et enregistrer le maquette de matériau.

Créer un contrôleur d 'animation.Dans le gestionnaire de ressources Unity, un contrôleur d 'animation (create) est créé par le bouton droit et, selon le nom de l' animation, il s' appelle monkeyaction.

Éditer le Contrôleur d 'animation.Double - cliquez pour ouvrir le Contrôleur d 'animation et la zone d' affichage présente une interface d 'édition du Contrôleur d' animation.

![图片1](img/1.png)<br >

(Figure 1)

Commande d 'animation liée.Sélectionnez le modèle de rôle dans la scène, attribuez le Contrôleur d 'animation de rôle à l' ensemble d 'animation du modèle sélectionné (fig. 2) et, s' il n' y a pas d 'ensemble d' animation, l 'animation exportée ne peut pas être lue.

![图片2](img/2.png)< br > (Figure 2)

Après ces étapes, nous avons terminé l 'édition de l' animation de rôle dans l 'Unity, en cliquant sur le bouton d' exécution de l 'Unity, et alors nous pouvons voir l' animation.Si la diffusion de l'animation ne pose pas de problème, les ressources nécessaires à layaair pourraient être exportées conformément à la méthode antérieure d'utilisation de l'outil de prise en charge Unity.

**Tips: les autres animations sont traitées de la même manière dans l 'Unity, et les étapes suivantes sont nécessaires: ajouter un module d' animation au modèle de scène - créer un contrôleur d 'animation - Ajouter l' animation au Contrôleur d 'animation - Ajouter le Contrôleur d' animation au module d 'animation du modèle.**



####Réalisation d 'animation de rôle dans layaair

Les ressources exportées sont copiées dans le Répertoire de l 'élément H5, les ressources de personnage sont chargées par Code et, une fois créées, les animations sont automatiquement diffusées et recyclées (fig. 3), les codes de référence sont les suivants:


```java

package {
	import laya.d3.component.Animator;
	import laya.d3.core.Camera;
	import laya.d3.core.Sprite3D;
	import laya.d3.core.scene.Scene;
	import laya.d3.math.Vector3;
	import laya.display.Stage;
	import laya.events.Event;
	import laya.utils.Handler;
	import laya.utils.Stat;

	public class LayaAir3D_Animator
	{
		public function LayaAir3D_Animator() 
		{
			//初始化引擎
			Laya3D.init(1000, 500,true);
			
			//适配模式
			Laya.stage.scaleMode = Stage.SCALE_FULL;
			Laya.stage.screenMode = Stage.SCREEN_NONE;

			//开启统计信息
			Stat.show();
			
			//预加载角色动画资源
			Laya.loader.create("monkey/monkey.lh",Handler.create(this,onModelOK),null,Sprite3D);
		}		
		
		private function onModelOK():void
		{
			//添加3D场景
			var scene:Scene = new Scene();
			Laya.stage.addChild(scene);
			
			//创建摄像机(横纵比，近距裁剪，远距裁剪)
			var camera:Camera = new Camera( 0, 0.1, 1000);
			//加载到场景
			scene.addChild(camera);
			//旋转摄像机角度
			camera.transform.rotate(new Vector3( -25, 0, 0), false, false);
			//移动摄像机位置
			camera.transform.position=new Vector3(0, 5, 10);
			//加入摄像机移动控制脚本
			camera.addComponent(CameraMoveScript);
			
			//添加蒙皮动画角色模型
			var role3D:Sprite3D=Laya.loader.getRes("monkey/monkey.lh");
          	//加载到场景
			scene.addChild(role3D);
		}
	}
}
```


![动图3](img/3.gif)< br > (Figure 3)



####Control and Decomposition of Role Animation

**Acquisition d 'un ensemble d' animation**

A travers l 'exemple ci - dessus, on voit que l' animation est automatiquement diffusée et qu 'elle comprend plusieurs actions.Il faut d 'abord obtenir l' ensemble d 'animation sur le modèle avant de commander la lecture, l' arrêt, etc.

La classe sprite3d du modèle 3D du moteur layaair - 3D fournit un procédé de getcomponent bytype () pour obtenir des composants sur le modèle.Le modèle avec animation a donné par défaut à l 'ensemble animateur animator lors de sa création, de sorte que nous pouvons l' obtenir en référence au code suivant.

Ouvre la vue du fichier LH, l 'ensemble d' animation est attaché à un sous - objet du modèle et utilise donc « getchildat (0) » pour obtenir un modèle d 'objet secondaire.L 'ensemble d' animation est ensuite obtenu par le procédé getcomponentbytype (animator)


```java

//获取角色动画组件
var ani:Animator=role3D.getChildAt(0).getComponentByType(Animator) as Animator;
```


**Il y a parfois dans les fichiers -Par conséquent, avant l 'acquisition de l' ensemble d 'animation, on peut ouvrir. LS ou LH pour voir une relation hiérarchique avec un modèle d' ensemble d 'animation, puis obtenir le modèle par des procédés tels que getchildat () ou getchildbyname () avant d' obtenir l 'ensemble d' animation.Sinon, le programme se trompe!**



**Commande de lecture**

Avec l 'ensemble d' animation, pourquoi ne diffuser qu 'une seule action?Il existe deux façons de commander et de Commuter les actions.

####Définition de code

Dans l 'exemple précédent, l' animation n 'est pas séparée dans l' Unity, nous utilisons l 'animation take 001 par défaut du modèle, et le module ne produit qu' un seul fichier d 'analyse d' animation au format LANI.

La commande de lecture d 'un segment de l' animation nécessite donc l 'ajout d' un clip d 'animation personnalisé dans le Code, et la mise en oeuvre d' un coefficient de trame de début et de fin dans le clip d 'animation.

Voir le procédé play () dans l 'ensemble animé animateur animé d' animator, dont les paramètres sont les suivants:

**Après la version 1.7.10, la méthode play () annule les paramètres de bouclage, de démarrage et de fin de trame.Si l 'animation est cyclique, sélectionnez les attributs d' animation de l 'éditeur Unity et le moteur d' exportation suivra ses réglages pour la lecture d 'animation.Voir les options loop Time dans les figures 5 et 6!**


```java

/**
* 播放动画。
* @param	name 如果为null则播放默认动画，否则按名字播放动画片段。
* @param	playbackRate 播放速率。
*/
play(name:String=null,playbackRate:Number=1.0)
 
```


**Si une trame de l 'animation doit être projetée sur une trame particulière, un montage d' animation supplémentaire (fragment) animationclip peut être créé sur la base de l 'animation originale, et la classe animator la plus récente fournit un exemple d' addclip () qui permet à l 'développeur de créer un montage d' animation et de définir un nom, puis de le reproduire par play (nom de montage d 'animation).**


```java


/**
* 添加动画片段。
* @param	clip 动画片段。
* @param	playName 动画片段播放名称，如果为null,则使用clip.name作为播放名称。
* @param   开始帧率。
* @param   结束帧率。
*/
public function addClip(clip:AnimationClip, playName:String = null, startFrame:int = 0, endFrame:int = 4294967295
```


Modifier le code dans l 'exemple comme suit:


```java

......
//添加蒙皮动画角色模型
var role3D:Sprite3D=Laya.loader.getRes("monkey/monkey.lh");
//加载到场景
scene.addChild(role3D);
//获取角色动画组件
var ani:Animator=role3D.getChildAt(0).getComponentByType(Animator) as Animator;

//加载一个动画文件创建动画剪辑（可以是已有的动画，也可以是此角色需增加的新动画文件）
//var clip:AnimationClip=AnimationClip.load("monkey/Assets/monkey-Take_001.lani");
//从现有的动画中获取动画剪辑（默认根据.lani文件创建的动画剪辑）
var clip:AnimationClip=ani.clip;

//增加一个动画剪辑引用，从clip中的0-34帧创建名为stand的动画剪辑
ani.addClip(clip,"stand",0,34);
//增加一个动画剪辑引用，从clip中的40-70帧创建名为move的新动画剪辑
ani.addClip(clip,"move",40,70);

//播放某个动画剪辑
ani.play("move");
//可获取动画剪辑总数
trace("当前动画剪辑总数为："+ani.getClipCount());
```


Après l 'édition, l' effet est le suivant, seuls les clips d 'animation stand debout de 0 à 34 trames sont diffusés en boucle.

![动图4](img/4.gif)< br > (Figure 4)



####Définition de la lecture de montage d 'animation dans Unity

L 'animation peut être segmentée dans l' unité et les fragments du montage peuvent être nommés.Lors de la commande des ressources exportées, un transfert d 'animation peut être effectué par le nom pour faciliter l' utilisation par les développeurs.(cette façon de procéder permet d 'ajouter des fichiers d' analyse animés à l 'exportation des ressources, ce qui augmente le nombre d' accès à http et permet aux concepteurs d 'examiner de quelle manière les circonstances le justifient)

Les fragments d'animation de l'Unity sont divisés comme suit:

Sélectionnez le fichier de modèle dans le gestionnaire de ressources, sélectionnez les animations dans l 'interface Inspector à droite, affichez l' animation take - 001 par défaut, cliquez pour éditer le nom personnalisé, cliquez sur un signe supplémentaire pour ajouter un fragment d 'animation et modifier la trame de début et de fin du fragment (fig. 5).

Cochez l 'option "loop Time" dans le diagramme ci - dessous.

![图5](img/5.png)< br > (Figure 5)

Dans cet exemple, quatre actions au total sont ajoutées à quatre fragments d 'animation en fonction du nombre de trames d' animation fournies par les beaux - arts (fig. 6).

![图6](img/6.png)< br > (Figure 6)

2) Lorsque la modification est achevée, le fichier d 'animation correspondant est ajouté au modèle de gestionnaire de ressources, de sorte que le Contrôleur d' animation doit être modifié pour ajouter le nouveau fragment d 'animation au Contrôleur d' animation, faute de quoi il n 'est pas possible d' exporter un fichier d 'Analyse complet de ressources d' animation (fig. 7).

![图7](img/7.png)< br > (Figure 7)

Après l 'exécution de l' étape précédente, les ressources exportées génèrent également quatre fichiers d 'analyse d' animation LANI.

Modifier le Code de l 'exemple en utilisant le nom de l' animation de lecture, l 'effet étant le suivant (fig. 8).


```java

......

//添加蒙皮动画角色模型
var role3D:Sprite3D=Laya.loader.getRes("monkey/monkey.lh");
//加载到场景
scene.addChild(role3D);
//获取角色动画组件
var ani:Animator=role3D.getChildAt(0).getComponentByType(Animator) as Animator;			
//监听默认动画完成后播放站立动画
ani.on(Event.COMPLETE,this,onAniComplete,[ani]);
//播放攻击动画
ani.play("attack");
/***当前动画播放完成后回调***/
private function onAniComplete(ani:Animator):void
{
  //切换站立动画
  ani.play("stand");
}
```

![图8](img/8.gif)< br > (Figure 8)


