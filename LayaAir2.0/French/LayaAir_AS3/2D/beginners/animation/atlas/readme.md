#Application d 'animation

###Aperçu des animations

Dans le développement du jeu, l 'application de l' animation est quasiment partout, le moteur layaair fournit une catégorie d 'animation d' animation d 'animation fonctionnelle puissante qui peut générer des animations de jeu à l' aide de multiples ressources d 'animation.

On peut générer le suffixe sous la forme d'une animation de l'axe temporel de layaair.`.ani`"Les ressources d 'animation peuvent également être utilisées pour emballer des images de trames d' animation et créer un suffixe appelé"`.atlas`"Les ressources d 'Atlas sont ensuite attribuées à la catégorie d' animation pour être chargées et utilisées.

This paper introduces the Design of Atlas animation, the example is achieved in the Animation of Atlas.

![动图1.gif](img/1.gif)< br / > (Figure 1)



###Diffusion d'animations illustrées

####2.1 mobilisation des ressources

Les ressources d 'Atlas d' animation nécessitent l 'attention sur des situations telles que les animations de type personnage, en raison du grand nombre de trames, qui sont généralement un ensemble de diagrammes de personnages d' une ressource nommée en fonction du nom de l 'action et du numéro de série de trames (fig. 2).

![图片2.png](img/2.png)< br / > (Figure 2)

**Tips**- Oui.

##- l'outil d'emballage d'Atlas dans l'IDE, qui regroupe chaque catalogue en un seul Atlas, donne des détails sur le document intitulé detailed design and use of Atlas;Les animations à effet spécifique peuvent être combinées en une ressource d 'Atlas (dans un répertoire) en raison du nombre limité de trames à effet spécifique.

Une fois emballés, trois fichiers sont générés, à savoir «.Atlas », « json » et «.Ping » (fig. 3).L 'animation obtient des ressources d' image en chargeant les fichiers «.Atlas » ou «.Json ».Il est recommandé d 'utiliser le fichier «.Atlas » (aucun code de réglage de type n' est nécessaire pour l 'utilisation *).

![图片3.png](img/3.png)< br / > (Figure 3)



####2.2 chargement de ressources d 'Atlas animés

Passer`laya.display.Animation`Classe`loadAtlas()`La description de base du procédé est présentée à la figure 4.

![图4](img/4.png)< br / > (Figure 4)

#####Exemple:

Crée la classe de document d 'entrée Atlas anidemo.as et établit le code suivant:


```java

package
{
import laya.display.Animation;
	import laya.display.Stage;
	import laya.maths.Rectangle;
	import laya.net.Loader;
	import laya.utils.Browser;
	import laya.utils.Handler;
	import laya.webgl.WebGL;

	public class HelloLayabox
	{
		private const AniConfPath:String = "../../../../res/role.atlas";
		private var roleAni:Animation;
		public function HelloLayabox()
		{

			// 不支持WebGL时自动切换至Canvas
			Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);

			Laya.stage.alignV = Stage.ALIGN_MIDDLE;
			Laya.stage.alignH = Stage.ALIGN_CENTER;

			Laya.stage.scaleMode = "showall";
			Laya.stage.bgColor = "#232628";

            roleAni = new Animation();

			Laya.loader.load(AniConfPath, Handler.create(this, onLoaded), null, Loader.ATLAS);
		}
		
		private function onLoaded(_e:*=null):void
		{
		
			
            Animation.createFrames(aniUrls("die",6),"dizziness");

            roleAni.play(0,true,"dizziness");
			
			Laya.stage.addChild(roleAni);
		}
        /**
         * 创建一组动画的url数组（美术资源地址数组）
         * @param aniName  动作的名称，用于生成url
         * @param length   动画最后一帧的索引值，
         */        
        private function aniUrls(aniName:String,length:int):Array
        {
            var urls:Array=[];
            for(var i:int=0;i<length;i++)
            {
                //动画资源路径要和动画图集打包前的资源命名对应起来
                urls.push("role/" + aniName + i + ".png")
            }
            return urls;
        }
	}
}
```


Code d 'exécution, comme le montre la figure 5.L 'animation est chargée sur la scène et n' est pas diffusée par défaut.

![图5](img/5.png) 


(Figure 5)

####2.3 animation d'Atlas

Après le chargement de l 'animation d' Atlas à l 'aide de la méthode loadaatlas () Il faut utiliser la méthode play () pour la lecture.Les paramètres API de la méthode play () sont décrits dans la figure 6.

![图片6.png](img/6.png)< br / > (Figure 6)

Nous continuons de suivre l'exemple précédent en ajoutant un plan () à la méthode onloaded.

Les codes dans le procédé onloaded sont les suivants:


```java

private function onLoaded():void
{
  //添加到舞台
  Laya.stage.addChild(roleAni);
  //播放动画
  roleAni.play();	
}
```


La figure 7 indique le code complet.

![动图7](img/7.gif) 


(Figure 7)

####2.4 créer un modèle d 'animation avec createframes pour reproduire l' animation spécifiée dans la collection d 'images.

Si l 'ensemble des images est une animation de trames de séquences séparées, il est possible de les reproduire directement au moyen du procédé play ().Cependant, pour emballer une pluralité d 'animations dans une image, il faut créer un modèle d' animation pour reproduire une animation spécifiée.Procédé d 'animation de modèles`Animation.createFrames()`Voir la figure 8.

![图片8](img/8.png)< br / > (Figure 8)

#####Création de modèles d 'animation

Voyons voir.`play()`Troisième paramètre de la méthode`name`".Lorsque nous avons créé un groupe de ressources d 'animation dans l' Atlas en tant que modèle d 'animation et donné le nom du modèle,`play()`Le paramètre name du procédé permet d 'utiliser le nom du modèle d' animation et de réaliser la lecture de l 'animation spécifiée en spécifiant le nom du modèle d' animation.

Nous continuons à utiliser l 'exemple précédent pour obtenir un effet vertigineux en créant un modèle d' animation uniquement dans l 'image de lecture.

Le Code est rédigé comme suit:


```java

package
{
	import laya.display.Animation;
	import laya.utils.Handler;
	import laya.webgl.WebGL;

	public class AtlasAniDemo
	{
		private var roleAni:Animation; 
		public function AtlasAniDemo()
		{
			//初始化舞台
			Laya.init(1334, 750, WebGL);
			
			//创建动画实例
			roleAni = new Animation();
			// 加载动画图集,加载成功后执行回调方法
			roleAni.loadAtlas("res/atlas/role.atlas",Handler.create(this,onLoaded));	

		}
		
		private function onLoaded():void
		{
			//添加到舞台
			Laya.stage.addChild(roleAni);
			
			//创建动画模板dizziness
			Animation.createFrames(aniUrls("die",6),"dizziness");
			//循环播放动画
			roleAni.play(0,true,"dizziness");	
		}
		
		
		/**
		 * 创建一组动画的url数组（美术资源地址数组）
		 * @param aniName  动作的名称，用于生成url
		 * @param length   动画最后一帧的索引值，
		 */		
		private function aniUrls(aniName:String,length:int):Array
		{
			var urls:Array=[];
			for(var i:int=0;i<length;i++)
			{
				//动画资源路径要和动画图集打包前的资源命名对应起来
				urls.push("role/" + aniName + i + ".png")
			}
			return urls;
		}
	}
}
```


L 'effet d' exécution du Code, tel qu 'indiqué dans la figure 9, n' est reproduit que les actions dans lesquelles le modèle d 'animation est défini dans l' image.

![动图9](img/9.gif) 


(Figure 9)

Même si chaque groupe d 'actions est emballé séparément dans un Atlas, il est également possible de le reproduire directement.Cependant, si les ressources d 'animation de l' action sont réduites pour former une image seule, cela augmente la charge de ressources et augmente la consommation de performances de jeu.Par conséquent, les groupes d 'animation à faible nombre de trames sont emballés dans un ensemble d' images, et les appels séparés sont recommandés.



####2.5 présentation directe des animations spécifiées

Sauf statique.`createFrames()`En plus de la création d 'un modèle d' animation, l 'effet d' animation vertigineux spécifié par l 'ensemble d' images de lecture peut être réalisé au moyen d 'un procédé loadimages ().Voyons voir.`loadImages()`Les paramètres méthodologiques sont décrits dans la figure 10.

![图10](img/10.png) 


(Figure 10)

Comme les loadimages () créent des modèles d 'animation, URLs reçoit des ensembles d' adresses d 'images, il faut d' abord charger les fichiers d 'images en utilisant laya.loader.load ().Voici le Code de l 'exemple et les notes.


```java

package
{
	import laya.display.Animation;
	import laya.utils.Handler;
	import laya.webgl.WebGL;


	public class AtlasAniDemo
	{
		private var roleAni:Animation; 
		public function AtlasAniDemo()
		{
			//初始化舞台
			Laya.init(1334, 750, WebGL);		
			//加载完动画的图集后执行回调方法onLoaded
			Laya.loader.load("res/atlas/role.atlas", Handler.create(this,onLoaded));

		}
		
		private function onLoaded():void
		{		
            //创建动画实例	
			roleAni = new Animation();
			//添加到舞台
			Laya.stage.addChild(roleAni);
			
			//通过数组加载动画资源，然后用play方法直接播放。由于loadImages方法返回的是Animation对象本身，可以直接使用“loadImages(...).play(...);”语法。
			roleAni.loadImages(aniUrls("move",6)).play();
		}
		
		
		/**
		 * 创建一组动画的url数组（美术资源地址数组）
		 * @param aniName  动作的名称，用于生成url
		 * @param length   动画最后一帧的索引值，
		 */		
		private function aniUrls(aniName:String,length:int):Array
		{
			var urls:Array=[];
			for(var i:int=0;i<length;i++)
			{
				//动画资源路径要和动画图集打包前的资源命名对应起来
				urls.push("role/" + aniName + i + ".png")
			}
			return urls;
		}
	}
}
```


Le code fonctionne comme le montre la figure 11.

![动图11](img/11.gif) 


(Figure 11)

**Tips**- Oui.

##Le procédé de loadimage peut également créer un modèle d 'animation, par exemple en convertissant le chargement et la lecture ci - dessus en`roleAni.loadImages(aniUrls("move",6),"walk").play();`, la valeur du second paramètre "walk" est le nom du modèle d 'animation (* Key *).Lorsque l 'utilisation est répétée, l' utilisation de modèles d 'animation permet d' économiser les dépenses de CPU, mais si elle n 'est utilisée qu' occasionnellement ou en une seule fois, il ne faut pas utiliser de modèles d 'animation car les économies de dépenses de CPU sont réalisées au détriment d' une certaine dépense de mémoire.



###Autres annotations

####3.1 API

Les autres propriétés d 'animation d' animation peuvent être consultées dans le document API:

Animation

[https://layaair.ldc.layabox.com/api/?category=Core&class=laya.display.AnimationPlayerBase](https://layaair.ldc.layabox.com/api/?category=Core&class=laya.display.AnimationPlayerBase)

Catégorie d'animation:

[https://layaair.ldc.layabox.com/api/?category=Core&class=laya.display.Animation](https://layaair.ldc.layabox.com/api/?category=Core&class=laya.display.Animation)



####3.2 animation d 'Atlas

L 'animation d' Atlas peut être produite directement à l 'aide de l' ensemble animation lors de la conception de l 'ui.Ainsi, la partie visible sera plus intuitive.Section de production de l 'IDE sur l' animation d 'Atlas`Animation组件属性详解`Et`用LayaAirIDE制作图集动画`Ces deux documents.