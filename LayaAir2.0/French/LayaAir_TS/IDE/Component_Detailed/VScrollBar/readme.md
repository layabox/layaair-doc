# VScrollBar 组件参考



##Création d 'un ensemble vscrollbar par layaairide

###1.1 Création de vscrollbar

L 'ensemble vscrollbar est un ensemble de barres de défilement dans la direction verticale.
Lorsque les données sont trop nombreuses pour que la zone d 'affichage ne soit pas acceptable, l' utilisateur final peut commander la partie de données affichée au moyen de l 'ensemble vscrollbar.
La barre de défilement comprend quatre éléments: un diagramme d 'orbite, un bouton de glissière et deux boutons de flèche.
Cliquez sur l 'ensemble vscrollbar dans le panneau de ressources sélectionné et faites glisser - le dans la zone d' édition de page, ce qui permet d 'ajouter l' ensemble vscrollbar à la page.
Interface de script pour module vscrollbar[VScrollBar API](http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ui.VScrollBar)".
Exemples de ressources d 'images d' ensembles vscrollbar:

​![图片0.png](img/1.png)< br / >
(Figure 1)

​![图片0.png](img/2.png)< br / >
(Figure 2)
​![图片0.png](img/3.png)< br / >
(Figure 3)

​![图片0.png](img/4.png)< br / >
(Figure 4)

Après avoir glissé vscrollbar dans la zone d 'édition, affiche l' effet:

​![图片0.png](img/5.png)< br / >
(Figure 5)

Définit la valeur max de l 'attribut vscrollbar comme 10, la valeur min de l' attribut comme 0, et la valeur valeur valeur valeur valeur value de l 'attribut après 3, l' effet est affiché comme suit:

​![图片0.png](img/6.png)< br / >
(Figure 6)

Pendant l 'exécution du programme, vous pouvez glisser le curseur ou cliquer sur le bouton de la flèche pour commander la valeur de la barre de progression:

​![图片0.gif](gif/1.gif)< br / >
(Figure 7)

Définit l 'effet d' affichage lorsque la valeur des propriétés de vscrollbar showbuttons est égale à la valeur de false:

​![图片0.png](img/7.png)< br / >
(Figure 8)

Effets de l'exécution dans le programme:

​![图片0.png](gif/1.gif)< br / >
(Figure 9)

###1.2 caractéristiques usuelles des composants vscrollbar

​![图片0.png](img/8.png)< br / >
(Figure 10)

- 124.**Attribut**- 124.**Description fonctionnelle**- 124.
124 -------------------------------------------------------------------------------------------------------------------
L 'adresse de ressource d' image de la barre de roulement.- 124.
Les données de la grille (données de la grille de la neuvième maison) sont mises à l 'échelle de manière efficace.- 124.
Le nombre de la position de défilement actuelle est exprimé par ‧ renvoie ‧.- 124.
Le nombre correspondant à la position de défilement minimale.- 124.
Le nombre correspondant à la position de défilement maximale.- 124.
$124 scrollsize \ \ \ \ \ \ \ \ \ \ \ \ \ \ \- 124.
124%- 124.
‧ renvoie une valeur booléenne indiquant si une touche est activée, la valeur par défaut étant vraie.- 124.
$124hide \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \- 124.
, cliquez sur le bouton vers le haut et vers le bas pour indiquer si la valeur par défaut est vrai.- 124.



 

 



##Création d 'un ensemble vscrollbar par Code

Quand on écrit un code d 'écriture, on ne peut pas forcément contrôler l' ui par le Code, créer`UI_ScrollBar`Les propriétés associées à vscrollbar sont également définies par Code.

**Exécution de l 'exemple:**
​![5](gif/3.gif)< br / >
(Figure 11) Création de vscrollbar par Code

D 'autres attributs de vscrollbar peuvent également être définis au moyen d' un code, l 'exemple suivant montrant comment vscrollbar a été créé à l' aide d 'un code, les lecteurs intéressés pouvant définir eux - mêmes vscrollbar à l' aide du Code pour créer une barre de défilement adaptée à leurs besoins.

**Exemple:**


```javascript

module laya {
    import Stage = Laya.Stage;
    import Text = Laya.Text;
    import HScrollBar = Laya.HScrollBar;
    import ScrollBar = Laya.ScrollBar;
    import VScrollBar = Laya.VScrollBar;
    import Handler = Laya.Handler;
    import WebGL = Laya.WebGL;
    export class UI_ScrollBar {
        /***垂直滚动条资源**/
		private skins:Array<string>=["res/ui/vscroll.png", 
								"res/ui/vscroll$bar.png", 
								"res/ui/vscroll$down.png",
								"res/ui/vscroll$up.png"];
        /***提示信息文本框**/
        private promptText:Text;      	
		/****垂直滚动条****/
		private vScrollBar:VScrollBar;
        constructor() {
            // 不支持WebGL时自动切换至Canvas
            Laya.init(800, 600, WebGL);
            //画布垂直居中对齐
            Laya.stage.alignV = Stage.ALIGN_MIDDLE;
            //画布水平居中对齐
            Laya.stage.alignH = Stage.ALIGN_CENTER;
            //等比缩放
            Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
            //背景颜色
            Laya.stage.bgColor = "#232628";
            //加载资源
            Laya.loader.load(this.skins, Handler.create(this, this.onSkinLoadComplete));
        }
         /***加载资源完成***/
        private onSkinLoadComplete(e:any=null):void
        {
            //创建垂直滚动条
			this.createVScroller();
        }
        /***创建水平滚动条***/
        private createVScroller():void 
        {
            //实例化垂直滚动条
            this.vScrollBar= new VScrollBar();
            //加载皮肤资源（其他资源根据规范命名后，会自动加载）
            this.vScrollBar.skin = "res/ui/vscroll.png";
            //设置宽度
            this.vScrollBar.width = 400;
            //设置位置
            this.vScrollBar.pos(150, 170);
            //最低滚动位置数字
            this.vScrollBar.min = 0;
            //最高滚动位置数字
            this.vScrollBar.max = 100;
            //滚动变化事件回调
            this.vScrollBar.changeHandler = new Handler(this, this.onChange);
            //加载到舞台
            Laya.stage.addChild(this.vScrollBar);
            //创建提示信息
            this.createPromptText(this.vScrollBar)
        }        
        /***创建提示信息***/
        private createPromptText(scrollBar:ScrollBar):void
        {
            //实例化提示信息
            this.promptText=new Text();
            //提示框字体
            this.promptText.font="黑体";
            //提示框字体大小
            this.promptText.fontSize=26;
            //提示框字体颜色
            this.promptText.color="#FFFFFF";
            //提示框初始文本
            this.promptText.text="您的选择是： ";
            //加载到舞台
            Laya.stage.addChild(this.promptText);
            //设置提示框位置
            this.promptText.pos(scrollBar.x,scrollBar.y-50);
        }
        /***滚动条位置变化回调***/
        private onChange(value:Number):void 
        {
            this.promptText.text= "滚动条的位置： value=" + value;
        }
    }
}
new laya.UI_ScrollBar();
```


