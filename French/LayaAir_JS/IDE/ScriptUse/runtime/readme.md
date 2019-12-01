#Utilisation de Runtime

Tous les composants sous le panneau de ressources dans le layaairide possèdent des propriétés Runtime, qui est la classe logique dans laquelle les composants fonctionnent; les mêmes composants peuvent utiliser la même classe Runtime pour réaliser la même fonction, par exemple pour les mêmes composants sur différentes pages.**Il convient de noter que la classe logique Runtime du composant est invalide si le composant lui - même n 'est pas hérité et si aucun des objets hérités ne possède les attributs du composant.(non disponible sur les pages View et dialog)**

**Le script Runtime est semblable au script étendu, à la différence que Runtime ne peut pas ajouter de nouvelles propriétés au composant.Extension script**

**Cet article définit la même catégorie logique rudimentaire pour les composants image sur deux pages différentes afin de réaliser la même fonction, comme le montre la figure 0:**

![0](img\0.gif)(figure 0)

###Définir la classe Runtime pour les composants d 'une page

Crée deux pages ui, monkeypage et bgpage, respectivement, dans le Répertoire de gestion de pages.Glissez un composant image sur chacune des deux pages ui et définissez les attributs Runtime comme game.imageruntime.Comme le montre la figure 2 de la figure 1:

![1](img\1.png)(Figure 1)

![2](img\2.png)(Figure 2)

Une fois les paramètres achevés, enregistre l 'ui exporté et commence à préparer le Code logique.



###Code Logic Processing

En mode Code, l 'ouverture du fichier layaui.max.all.js permet de découvrir qu' il y a une catégorie d 'enregistrement, comme le montre la figure suivante:

![3](img\3.png)(图3)


Cette catégorie est la catégorie logique de fonctionnement ajoutée dans les attributs Runtime en mode d 'édition ui, qui nécessite la création manuelle par l' développeur d 'une telle catégorie et qui, si elle n' est pas créée, risque d 'erreur après la mise à jour de la page ui.

Ensuite, nous créerons un paquet de jeux sous le catalogue SRC, une classe imageruntime dans le paquet de jeu, et une page ui mise à jour après la création ne sera pas mal signalée, comme le montre la figure 4:

![4](img\4.png)(Figure 4)

Puis, dans la catégorie imageruntime, définissez l 'effet que nous voulons obtenir, par exemple, en effectuant un clic sur une fonction de zoom (similaire à un bouton), tous les codes étant les suivants:


```typescript

var game;
(function(game){
    var ImageRunTime = (function(_super){
        var scaleTime = 100;
        function ImageRunTime(){
            ImageRunTime.super(this);
            //设置组件的中心点
			this.anchorX = this.anchorY = 0.5;
			//添加鼠标按下事件侦听。按时时缩小按钮。
			this.on(Laya.Event.MOUSE_DOWN,this,this.scaleSmal);
			//添加鼠标抬起事件侦听。抬起时还原按钮。
			this.on(Laya.Event.MOUSE_UP,this, this.scaleBig);
			//添加鼠标离开事件侦听。离开时还原按钮。
			this.on(Laya.Event.MOUSE_OUT,this, this.scaleBig);
        }
        Laya.class(ImageRunTime,"game.ImageRunTime",_super);
        ImageRunTime.prototype.scaleBig = function()
		{
			//变大还原的缓动效果
			Laya.Tween.to(this, {scaleX:1,scaleY:1},scaleTime);
		}
		ImageRunTime.prototype.scaleSmal = function()
		{
			//缩小至0.8的缓动效果
			Laya.Tween.to(this,{scaleX:0.8,scaleY:0.8},scaleTime);
		}
        return ImageRunTime;

    })(Laya.Image);
})(game || (game = {}));
```


Les deux interfaces ui sont personnalisées dans la catégorie d 'exploitation principale et les codes sont les suivants:


```typescript

//初始化引擎
Laya.init(800, 700);
//预加载资源
Laya.loader.load("res/atlas/test.atlas", Laya.Handler.create(this, onLoaded));

function onLoaded() {
    //实例化BGPageUI页面
    var bgPage = new ui.BGPageUI();
    //为了能够清楚的看到这个页面所在的位置，在此设置设置一个背景色
    bgPage.graphics.drawRect(0, 0, 300, 300, "#ffcccc");
    //添加到stage
    Laya.stage.addChild(bgPage);

    //实例化MonkeyPageUI页面
    var monkeyPage = new ui.MonkeyPageUI();
    //为了能够清楚的看到这个页面所在的位置，在此设置设置一个背景色
    monkeyPage.graphics.drawRect(0, 0, 300, 300, "#ffcccc");
    //添加到stage
    Laya.stage.addChild(monkeyPage);
    //设置第二个页面的坐标
    monkeyPage.x = 350;
}
```


Les résultats définitifs sont indiqués à la figure 0.



###Si l 'objet hérité de la classe logique Runtime n' est pas son propre composant

Dans ce code, nous avons montré les résultats obtenus en héritant de notre propre image et ce qui se passerait si nous héritions d 'une catégorie de composants button.Voyons voir.Le Code et les résultats obtenus sont les suivants:


```typescript

var game;
(function(game){
    var ImageRunTime = (function(_super){
        var scaleTime = 100;
        function ImageRunTime(){
            ImageRunTime.super(this);
            ......
        }
        Laya.class(ImageRunTime,"game.ImageRunTime",_super);
        ......
        return ImageRunTime;

    })(Laya.Button);
})(game || (game = {}));
```


![5](img\5.gif)(图5)


Nous trouverons alors étrange l 'affichage des ressources sur la page ui, lorsque le type de logique Runtime du bouton est tridimensionnel et que l' image a succédé à l 'ensemble button, il ne s' agit plus d' un composant image mais d 'un composant button.