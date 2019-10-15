#Utilisation de Runtime

Tous les composants sous le panneau de ressources dans le layaairide possèdent des propriétés Runtime, qui est la classe logique dans laquelle les composants fonctionnent; les mêmes composants peuvent utiliser la même classe Runtime pour réaliser la même fonction, par exemple pour les mêmes composants sur différentes pages.**Il convient de noter que la classe logique Runtime d 'un composant est invalide si le composant lui - même n' est pas hérité et que l 'objet hérité n' a pas d 'attribut du composant.**

**Le script Runtime est similaire au script et diffère de la mise en œuvre du script Runtime, en héritant de la page, de la scène ou de la classe de composants, et en réalisant la logique.Les attributs Runtime d 'une scène dans l' IDE peuvent être associés à la scène ou à l 'objet**

***Par comparaison avec le script, les catégories de pages héritées peuvent utiliser directement les attributs définis par la page (par la définition d 'attributs de var dans l' IDE), tels que celui - ci.tiplblbll, this.scorell, qui a un effet d 'indication de code**
***Recommandation & ‧‧;: si c 'est la logique de l' étage de page, il est nécessaire d 'avoir un accès fréquent à plusieurs éléments de la page, à l' aide de l 'écriture Runtime et, dans le cas d' un module séparé, d 'une fonction unique, il est recommandé d' utiliser le script**

**Cet article définit la même catégorie logique rudimentaire pour les composants image sur deux pages différentes afin de réaliser la même fonction, comme le montre la figure 0:**

![0](img\0.gif)(figure 0)

###Définir la classe Runtime pour les composants d 'une page

Crée deux pages ui, monkeypage et bgpage, respectivement, dans le Répertoire de gestion de pages.La figure ci - après:

Attention!Le type d 'Export de cette invention est un mode de séparation, seul le mode non - fichier peut générer un script de classe ui, le mode fichier par défaut étant le mode fichier, et le mode fichier ne crée pas la classe ui.

![1](img\ide1.png)



Faites glisser un composant image sur chacune des deux pages ui et faites glisser le script image Runtime dans la zone d 'attributs Runtime.Comme le montre la figure 2 de la figure 1:

![1](img\ide2.png)(Figure 1)

![2](img\ide3.png)(Figure 2)

Une fois les paramètres achevés, enregistre l 'ui exporté et commence à préparer le Code logique.



###Code Logic Processing

Lorsque vous ouvrez la catégorie gameconfig.as en mode Code, vous trouverez une erreur de déclaration à l'intérieur, comme le montre la figure ci - dessous ():

![3](img\ide5.png)(Figure 3)

Ne vous inquiétez pas, c 'est parce que la logique imagerruntime dans le projet a besoin d' être créée par le développeur lui - même, il n 'y a pas encore de paquets de jeu, donc l' éditeur ne peut pas trouver, ce qui entraîne une erreur de présentation.

Ensuite, on crée un paquet de jeux sous le fichier SRC, et on crée une catégorie imageruntime dans le paquet de jeux.Après sa création, on découvre que les erreurs de déclaration dans la catégorie gameconfig ont disparu, comme le montre la figure 4:

![4](img\ide6.png)(Figure 4)

Puis, dans la catégorie imageruntime, définissez l 'effet que nous voulons obtenir, par exemple, en effectuant un clic sur une fonction de zoom (similaire à un bouton), tous les codes étant les suivants:


```typescript

package game
{
	import laya.events.Event;
	import laya.ui.Image;
	import laya.utils.Tween;
	/**
	 *ImageRunTime逻辑类 
	 * @author mengjia
	 * 
	 */
	public class ImageRunTime extends Image
	{
		//缩放时间100毫秒
		public var scaleTime:int = 100;
		public function ImageRunTime()
		{
			//设置组件的中心点
			this.anchorX = this.anchorY = 0.5;
			//添加鼠标按下事件侦听。按时时缩小按钮。
			this.on(Event.MOUSE_DOWN,this,scaleSmall);
			//添加鼠标抬起事件侦听。抬起时还原按钮。
			this.on(Event.MOUSE_UP,this, scaleBig);
			//添加鼠标离开事件侦听。离开时还原按钮。
			this.on(Event.MOUSE_OUT,this, scaleBig);
		}
		private function scaleBig():void
		{
			//变大还原的缓动效果
			Tween.to(this, {scaleX:1,scaleY:1},scaleTime);
		}
		private function scaleSmall():void
		{
			//缩小至0.8的缓动效果
			Tween.to(this,{scaleX:0.8,scaleY:0.8},scaleTime);
		}
	}
}
```


Les deux interfaces ui sont personnalisées dans la catégorie d 'exploitation principale et les codes sont les suivants:


```typescript

package {
    import laya.display.Scene;
    import laya.net.AtlasInfoManager;
    import laya.net.ResourceVersion;
    import laya.utils.Handler;
    import laya.utils.Stat;
    import laya.utils.Utils;
    import laya.d3.core.particleShuriKen.module.StartFrame;
    import laya.display.Sprite;
    import ui.BGPageUI;
    import ui.MonkeyPageUI;
    
    public class Main {
        public function Main() {
            //根据IDE设置初始化引擎      
            if (window["Laya3D"]) Laya3D.init(GameConfig.width, GameConfig.height);
            else Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            
            //打开调试面板（IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
            if (GameConfig.debug || Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
            if (GameConfig.stat) Stat.show();
            Laya.alertGlobalError = true;
            
            //激活资源版本控制，版本文件由发布功能生成
            ResourceVersion.enable("version.json", Handler.create(this, this.onVersionLoaded), ResourceVersion.FILENAME_VERSION);
        }
        
        private function onVersionLoaded():void {
            //激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
            AtlasInfoManager.enable("fileconfig.json", Handler.create(this, this.onConfigLoaded));
        }

        private function onConfigLoaded():void {
            //加载场景
            //GameConfig.startScene && Scene.open(GameConfig.startScene);

            //实例化BGPageUI页面
            var bgPage:BGPageUI = new BGPageUI();
            //为了能够清楚的看到这个页面所在的位置，在此设置设置一个背景色
            bgPage.graphics.drawRect(0,0,300,300,"#ffcccc");
            //添加到stage
            Laya.stage.addChild(bgPage);
            //实例化MonkeyPageUI页面
            var monkeyPage:MonkeyPageUI = new MonkeyPageUI();
            //为了能够清楚的看到这个页面所在的位置，在此设置设置一个背景色
            monkeyPage.graphics.drawRect(0,0,300,300,"#ffcccc");
            //添加到stage
            Laya.stage.addChild(monkeyPage);
            //设置第二个页面的坐标
            monkeyPage.x = 350;
        }
    }
}
```


Les résultats définitifs sont indiqués à la figure 0.



###Si l 'objet hérité de la classe logique Runtime n' est pas son propre composant

Dans ce code, nous avons montré les résultats obtenus en héritant de notre propre image et ce qui se passerait si nous héritions d 'une catégorie de composants button.Voyons voir.Le Code et les résultats obtenus sont les suivants:


```typescript

package game
{
	import laya.display.Sprite;
	import laya.events.Event;
	import laya.maths.Rectangle;
	import laya.ui.Button;
	import laya.ui.Image;
	import laya.utils.Tween;

	/**
	 *ImageRunTime逻辑类 
	 * @author mengjia
	 * 
	 */
	public class ImageRunTime extends Button
	{
		//缩放时间100毫秒
		public var scaleTime:int = 100;
		public function ImageRunTime()
		{
			//设置组件的中心点
			this.anchorX = this.anchorY = 0.5;
			......
		}
		......
	}
}
```


![5](img\5.gif)(Figure 5)

Le Groupe logique Runtime d 'image n' est plus un composant image, mais un composant button.



