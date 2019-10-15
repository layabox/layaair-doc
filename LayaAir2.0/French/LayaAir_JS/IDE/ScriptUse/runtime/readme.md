#Utilisation de Runtime

Tous les composants sous le panneau de ressources dans le layaairide possèdent des propriétés Runtime, qui est la classe logique dans laquelle les composants fonctionnent; les mêmes composants peuvent utiliser la même classe Runtime pour réaliser la même fonction, par exemple pour les mêmes composants sur différentes pages.**Il convient de noter que la classe logique Runtime du composant est invalide si le composant lui - même n 'est pas hérité et si aucun des objets hérités ne possède les attributs du composant.**

**Le script Runtime hérite d 'une page, d' une scène ou d 'une catégorie de composants pour réaliser la logique.Les attributs Runtime d 'une scène dans l' IDE peuvent être associés à la scène ou à l 'objet**

##- Oui.**Par comparaison avec le script, les catégories de pages héritées peuvent utiliser directement les attributs définis par la page (par la définition d 'attributs de var dans l' IDE), tels que celui - ci.tiplblbll, this.scorell, qui a un effet d 'indication de code** **Recommandation & ‧‧;: si c 'est la logique de l' étage de page, il est nécessaire d 'avoir un accès fréquent à plusieurs éléments de la page, à l' aide de l 'écriture Runtime et, dans le cas d' un module séparé, d 'une fonction unique, il est recommandé d' utiliser le script**


**Cet article définit la même catégorie logique rudimentaire pour les composants image sur deux pages différentes afin de réaliser la même fonction, comme le montre la figure 0:**

![0](img\0.gif)(图0)



###Définir la classe Runtime pour les composants d 'une page

Créer deux scènes, monkeypage et bgpage respectivement, puis créer un paquet de Game dans le répertoire SRC, créer une classe imageruntime dans le paquet de game, puis faire glisser un composant image dans chacun des deux scènes pour définir les attributs de Runtime comme game.imagerruntime (glisser le script sur l 'icône script Runtime).Figure 1, 2, 3Le type exporté est un mode de séparation qui génère un fichier de code de scène, un modèle de fichier par défaut, le mode fichier ne crée pas de catégorie de scène

![1](img\ide1.png)(图1)



![1](img\ide3.png)(Figure 2)

![2](img\ide2.png)(Figure 3)

Une fois les paramètres achevés, enregistre l 'ui exporté et commence à préparer le Code logique.



###Code Logic Processing

Passez en mode Code.

Ensuite, nous créerons un paquet de jeux sous le catalogue SRC, une classe imageruntime dans le paquet de jeu, et une page ui mise à jour après la création ne sera pas mal signalée, comme le montre la figure 4:

![4](img\4.png)(Figure 4)

Puis, dans la catégorie imageruntime, définissez l 'effet que nous voulons obtenir, par exemple, en effectuant un clic sur une fonction de zoom (similaire à un bouton), tous les codes étant les suivants:


```typescript

export default class ImageRunTime extends Laya.Image{
	constructor(){
			super();
			this.scaleTime = 100;
			//设置组件的中心点
			this.anchorX = this.anchorY = 0.5;
			//添加鼠标按下事件侦听。按时时缩小按钮。
			this.on(Laya.Event.MOUSE_DOWN,this,this.scaleSmall);
			//添加鼠标抬起事件侦听。抬起时还原按钮。
			this.on(Laya.Event.MOUSE_UP,this, this.scaleBig);
			//添加鼠标离开事件侦听。离开时还原按钮。
			this.on(Laya.Event.MOUSE_OUT,this, this.scaleBig);
		}
       scaleBig()
        {		
            //变大还原的缓动效果
            Laya.Tween.to(this,{scaleX:1,scaleY:1},this.scaleTime);
        }
        scaleSmall()
        {	
            //缩小至0.8的缓动效果
            Laya.Tween.to(this,{scaleX:0.8,scaleY:0.8},this.scaleTime);
        }
}
```


Les deux interfaces ui sont personnalisées dans la catégorie d 'exploitation principale et les codes sont les suivants:


```typescript

import GameConfig from "./GameConfig";
class Main {
	constructor() {
		//根据IDE设置初始化引擎		
		if (window["Laya3D"]) Laya3D.init(GameConfig.width, GameConfig.height);
		else Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
		Laya["Physics"] && Laya["Physics"].enable();
		Laya["DebugPanel"] && Laya["DebugPanel"].enable();
		Laya.stage.scaleMode = GameConfig.scaleMode;
		Laya.stage.screenMode = GameConfig.screenMode;
		Laya.stage.alignV = GameConfig.alignV;
		Laya.stage.alignH = GameConfig.alignH;

		//打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
		if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
		if (GameConfig.stat) Laya.Stat.show();
		Laya.alertGlobalError = true;

		//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
		Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
	}

	onVersionLoaded() {
		//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
		Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
	}

	onConfigLoaded() {
		//加载IDE指定的场景
		GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
	}
}
//激活启动类
new Main();

```


Paramétrer la scène de démarrage en mode Édition dans la barre de prévisualisation du moteur dans le panneau

![5](img\ide5.png) 


Les résultats définitifs sont indiqués à la figure 0.



###Si l 'objet hérité de la classe logique Runtime n' est pas son propre composant

Dans ce code, nous avons montré les résultats obtenus en héritant de notre propre image et ce qui se passerait si nous héritions d 'une catégorie de composants button.Voyons voir.Le Code et les résultats obtenus sont les suivants:


```typescript

export default class ImageRunTime extends Laya.Button{
	constructor(){
			super();
			...
		}
	...
	...
	...
```


![5](img\5.gif)(Figure 5)

Nous trouverons alors étrange l 'affichage des ressources sur la page ui, lorsque le type de logique Runtime du bouton est tridimensionnel et que l' image a succédé à l 'ensemble button, il ne s' agit plus d' un composant image mais d 'un composant button.