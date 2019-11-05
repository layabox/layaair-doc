#Utilisation de Runtime

Tous les composants sous le panneau de ressources dans le layaairide possèdent des propriétés Runtime, qui est la classe logique dans laquelle les composants fonctionnent; les mêmes composants peuvent utiliser la même classe Runtime pour réaliser la même fonction, par exemple pour les mêmes composants sur différentes pages.**Il convient de noter que la classe logique Runtime du composant est invalide si le composant lui - même n 'est pas hérité et si aucun des objets hérités ne possède les attributs du composant.**

**Le script Runtime est similaire au script et diffère de la mise en œuvre du script Runtime, en héritant de la page, de la scène ou de la classe de composants, et en réalisant la logique.Les attributs Runtime d 'une scène dans l' IDE peuvent être associés à la scène ou à l 'objet**

##- Oui.**Par comparaison avec le script, les catégories de pages héritées peuvent utiliser directement les attributs définis par la page (par la définition d 'attributs de var dans l' IDE), tels que celui - ci.tiplblbl, this.scorell, qui a un effet d 'indication de code.L 'acquisition de script ne peut être obtenue que par le biais de ce.owner.getchildbyname ("XXX").** **Recommandation: si c 'est la logique de l' étage de page, il est nécessaire d 'avoir un accès fréquent à plusieurs éléments de la page, à l' aide de la méthode de succession Runtime, et si c 'est un module séparé, une fonction unique, il est recommandé d' utiliser le script script Pour créer un nouvel exemple 2D**

**Cet article définit la même catégorie logique rudimentaire pour les composants image sur deux pages différentes afin de réaliser la même fonction, comme le montre la figure 0:**

![0](img\0.gif)(figure 0)

###Définir la classe Runtime pour les composants d 'une page

Crée deux pages ui, monkeypage et bgpage, respectivement, dans le Répertoire de gestion de pages.La figure ci - après:

Attention!Le type d 'Export de cette invention est un mode de séparation, le mode non - fichier peut générer un script de classe ui, le mode fichier par défaut est un mode de fichier, et le mode fichier ne crée pas de catégorie de page.

![1](img\ide1.png)

Glissez un composant image sur chacune des deux pages ui et définissez les attributs Runtime comme game.imageruntime.(glisser le script sur l 'icône script Runtime).Figure 1, 2, 3Le type d 'Export de cette case est un mode de séparation qui génère un fichier de code de scène, le mode de fichier est un mode de fichier par défaut, le mode de fichier ne crée pas de classe de code, et il n' est pas possible de créer une nouvelle catégorie de page si ce n 'est un mode non - fichier, comme le montre la figure 2 de la figure 1:

![1](img\ide3.png)(Figure 1)

![2](img\ide2.png)(Figure 2)

Une fois les paramètres achevés, appuyez sur F12 pour enregistrer l 'ui exporté et commencer à élaborer le Code logique.



###Code Logic Processing

Passez en mode Code.

Puis, dans la catégorie imageruntime, définissez l 'effet que nous voulons obtenir, par exemple, en effectuant un clic sur une fonction de zoom (similaire à un bouton), tous les codes étant les suivants:


```typescript


    /*
    ImageRunTime逻辑类 
    */
    export default class ImageRunTime extends Laya.Image{
        public scaleTime:number = 100;
        constructor() {
            super();
            //设置组件的中心点
			this.anchorX = this.anchorY = 0.5;
			//添加鼠标按下事件侦听。按时时缩小按钮。
			this.on(Laya.Event.MOUSE_DOWN,this,this.scaleSmall);
			//添加鼠标抬起事件侦听。抬起时还原按钮。
			this.on(Laya.Event.MOUSE_UP,this, this.scaleBig);
			//添加鼠标离开事件侦听。离开时还原按钮。
			this.on(Laya.Event.MOUSE_OUT,this, this.scaleBig);
        }
        private scaleBig():void
		{
			//变大还原的缓动效果
			Laya.Tween.to(this, {scaleX:1,scaleY:1},this.scaleTime);
		}
		private scaleSmall():void
		{
			//缩小至0.8的缓动效果
			Laya.Tween.to(this,{scaleX:0.8,scaleY:0.8},this.scaleTime);
		}
    }

```


Les deux interfaces ui sont personnalisées dans la catégorie d 'exploitation principale et les codes sont les suivants:


```typescript

import GameConfig from "./GameConfig";
import { ui } from "./ui/layaMaxUI";
class Main {
	constructor() {
		//根据IDE设置初始化引擎		
		if (window["Laya3D"]) Laya3D.init(GameConfig.width, GameConfig.height);
		else Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
		Laya["Physics"] && Laya["Physics"].enable();
		Laya["DebugPanel"] && Laya["DebugPanel"].enable();
		Laya.stage.scaleMode = GameConfig.scaleMode;
		Laya.stage.screenMode = GameConfig.screenMode;

		//打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
		if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
		if (GameConfig.stat) Laya.Stat.show();
		Laya.alertGlobalError = true;

		//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
		Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
	}

	onVersionLoaded(): void {
		//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
		Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
	}

	onConfigLoaded(): void {
		//加载IDE指定的场景, 如果在编辑器中制作场景就打开下面一行注释，把实例页面的代码注掉
		//GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);

		 //实例化BGPageUI页面
		 var bgPage: ui.BGPageUI = new ui.BGPageUI();
		 //为了能够清楚的看到这个页面所在的位置，在此设置设置一个背景色
		 bgPage.graphics.drawRect(0, 0, 300, 300, "#ffcccc");
		 //添加到stage
		 Laya.stage.addChild(bgPage);
		 //实例化MonkeyPageUI页面
		 var monkeyPage: ui.MonkeyPageUI = new ui.MonkeyPageUI();
		 //为了能够清楚的看到这个页面所在的位置，在此设置设置一个背景色
		 monkeyPage.graphics.drawRect(0, 0, 300, 300, "#ffcccc");
		 //添加到stage
		 Laya.stage.addChild(monkeyPage);
		 //设置第二个页面的坐标
		 monkeyPage.x = 350;

	}
}
//激活启动类
new Main();
```


Ce code est compatible avec 1.0.

2.0 vous pouvez également créer une mainscene, glisser deux pages dans la scène et définir une couleur d 'arrière - plan comme suit:

Attention & ‧‧;: définir la couleur d 'arrière - plan d' une page, seulement la référence lors de la conception de la scène, ne fonctionne pas vraiment, il faut dessiner le Rect sur la page pour être efficace

Ce procédé peut être utilisé selon quatre modes d 'exportation.

![2](img\ide4.png)

L 'élément est ensuite exécuté selon le procédé décrit dans la note de code et selon le procédé de gestion de scène

Les résultats définitifs sont indiqués à la figure 0.



###Si l 'objet hérité de la classe logique Runtime n' est pas son propre composant

Dans ce code, nous avons montré les résultats obtenus en héritant de notre propre image et ce qui se passerait si nous héritions d 'une catégorie de composants button.Voyons voir.Le Code et les résultats obtenus sont les suivants:


```typescript

module game {
    /*
    ImageRunTime逻辑类 
    */
    export class ImageRunTime extends Laya.Button{
        public scaleTime:number = 100;
        constructor() {
            super();
            //设置组件的中心点
			this.anchorX = this.anchorY = 0.5;
			......
        }
        ......
    }
}
```


![5](img\5.gif)(Figure 5)

Nous trouverons alors étrange l 'affichage des ressources sur la page ui, lorsque le type de logique Runtime du bouton est tridimensionnel et que l' image a succédé à l 'ensemble button, il ne s' agit plus d' un composant image mais d 'un composant button.

