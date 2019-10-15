#Ensemble checkbox

> Parce que de nombreux attributs de composant sont génériques, communs et communs`属性设置器`Une présentation est faite dans le document.Avant de lire ce texte, lisez le document attributs.

##Création d 'un ensemble checkbox

L 'ensemble checkbox (case à cocher) se compose de deux éléments, sélectionnez la zone d' état et l 'étiquette de description de contenu label.La zone d 'état sélectionnée doit être une ressource d' image et l 'étiquette est un texte.Lorsque l 'ensemble checkbox est utilisé, seuls les cadres d' état sélectionnés peuvent être utilisés ou une seule étiquette label peut être définie.

###1.1 préparation des ressources

Le cadre de sélection de l 'ensemble checkbox est la peau de l' ensemble checkbox`check`,`checkbox`Ou`check_`Pour le préfixe, voir la figure 1.Les ressources du module checkbox sont habituellement des ensembles d 'images skin à trois ou deux états.

![图片0.png](img/1.png)< br / > (Figure 1)

*Pour ce qui est des composants skin et statenum de coupe multiple, consultez le document attributs.*

###1.2 création directe de composants checkbox au moyen de moteurs



La création d 'un composant checkbox à l' aide du moteur layaair est relativement simple et ne nécessite généralement que quelques étapes pour charger les ressources, créer un exemple de checkbox, ajouter checkbox à la scène et définir les propriétés de l 'ensemble checkbox.Réalisation concrète du Code et de la note de référence ci - dessous.

**Créer une catégorie d 'entrée gamemain.js, pour établir le code suivant:**


```javascript

//初始化引擎，设置宽高并开启WebGL渲染模式
Laya.init(600, 400,Laya.WebGL);
//设置舞台背景颜色
Laya.stage.bgColor = "#ffffff";
//资源路径
this.skin1 = "checkbox.png";
this.skin2 = "checkbox.png";
//加载资源成功后，执行onLoad回调方法
Laya.loader.load([skin1,skin2],Laya.Handler.create(this,onLoaded));
function onLoaded(){
    //创建一个CheckBox实例cb1
			var cb1 = new Laya.CheckBox(this.skin1);
			//添加到舞台上显示
			Laya.stage.addChild(cb1);			
			//设置checkbox的坐标位置
			cb1.pos(300,200);			
			//文本标签内容
			cb1.label="我是多选框1";
			//label文本字体大小
			cb1.labelSize = 20;
            //设置为默认选中状态
			cb1.selected = true; 

			//再创建一个CheckBox实例cb2
			var cb2 = new Laya.CheckBox(this.skin2);
			//添加到舞台上显示
			Laya.stage.addChild(cb2);			
			//设置checkbox的坐标位置
			cb2.pos(300,300);			
			//文本标签内容
			cb2.label="我是多选框2";
			//label文本字体大小
			cb2.labelSize = 20;
}
```


L'effet de fonctionnement du Code est indiqué dans la figure 2:

![动图2](img/2.gif)< br / > (Figure 2)



**Tips:**L 'interface d' attributs du composant checkbox[CheckBox API](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=Core&class=laya.ui.CheckBox)".



##Création de composants checkbox par layaairide

###2.1 création de checkbox

Créer une page Demo pour ui, cliquez sur la sélection`资源管理器`Les ressources du composant checkbox sont glissées vers l 'éditeur de scène, ce qui permet d' ajouter le composant checkbox à la page, comme le montre la figure 3 - 1.

![图3-1](img/3-1.png)<br/>     （图3-1）







###2.2 paramètres des propriétés courantes de checkbox

Un composant complet peut être créé pour le composant par l 'intermédiaire d' un paramètre d 'attributs.Par exemple, le texte par défaut de l 'ensemble checkbox est "label", nous modifions le texte par défaut en "ma case à cocher" et définissons la couleur, l' état, la police, la taille de l 'étiquette label.Comme le montrent les figures 3 - 2 et 3 - 3.

![图3-2](img/3-2.png)< br / > (figures 3 - 2)
![图3-1](img/3-3.png)< br / > (figures 3 à 3)



####2.2.1 autres attributs associés à label

- 124.**Attribut**- 124.**Description fonctionnelle**- 124.
124 -----------------------------------------------------------------------------------------------------------------------
Le mode d 'alignement de l' étiquette \ \ \ \ \ \ \ \ \ \ \ \ \ \Note: non valable dans checkbox \ \ 124.
La couleur du texte dans chaque état de l 'étiquette.Format: "upcolor, overcolor, downcolor, disablecolor".Par défaut "bleu, vert".- 124.
$124lbold \ \ \ \ \ \ \ \ \ \ \ \ \ \ \- 124.
Le nom de la police de l 'étiquette textuelle est exprimé sous forme de chaîne de caractères.Sélectionnez.- 124.
La distance de l 'étiquette textuelle est indiquée par & ‧‧; 124 & ‧‧Format: "distance supérieure, droite, inférieure, gauche".- 124.
La taille de la police de l 'étiquette textuelle est indiquée par \ \ 124.- 124.
La largeur de bordure du texte \ \ \ \ \ \ \ \ \ \ \ \ \ \La valeur par défaut 0 indique que les bords ne sont pas décrits.- 124.
La couleur de bordure du texte correspond à la chaîne de caractères.Par défaut#0000000 « (noir); \ \ 124u
{\ 1ch00ffff}Format: "upcolor, overcolor, downcolor, disablecolor".- 124.



####2.2.2 sur la taille de la case à cocher et la case à cocher

Il convient de noter en particulier que le sizegrid n'est pas valide dans l'ensemble checkbox,**Case à cocher**La taille des ressources nécessaires à la production des beaux - Arts



####2.2.3 skin coopère avec statenum pour échanger des ressources cutanées


 **Skin:**Sélectionnez les ressources d 'image de la zone.Comme le bouton, deux ou trois formes de ressources artistiques peuvent être utilisées.Le Code ou le programme peut être modifié.

**Statenum:**Si la ressource artistique de la case à cocher est remplacée par deux états, comme le montre la figure 4, la valeur d 'état doit être fixée à 2 et, normalement, la case à cocher doit avoir au moins deux états.

![图4](img/4.png)< br / > (fig. 4) diagramme des ressources en beaux - arts à deux formes
*Dans des cas exceptionnels, on peut également utiliser un état unique.Par exemple, un composant checkbox composé uniquement du texte label.*

**Exemples d 'ajustement de CHECKBOX:**

La case à cocher dans l 'exemple ci - dessous est remplacée par une autre case à cocher dans l' interrupteur musical.Glisser une ressource bimodale du gestionnaire de ressources vers l 'attribut skin et régler le statenum en 2, modifier le texte label en musique et ajuster la taille de la police et la distance de l' étiquette label.Comme le montrent les figures 5 - 1 et 5 - 2.



![图5-1](img/5-1.png)< br / > (Figure 5 - 1)

![图5-2](img/5-2.png)< br / > (Figure 5 - 2)



####2.2.4 sélection par défaut

La valeur booléenne indique si la case à cocher est sélectionnée, si la valeur de l 'attribut Selected de checkbox est TRUE par appel de programme ou par paramétrage IDE, et si l' effet est affiché comme indiqué dans la figure 6:

![图6](img/6.png)< br / > (Figure 6)

####2.2.5 caractéristiques non disponibles Toggle

Toggle détermine si l 'état d' affichage du composant est commuté en cliquant sur le bouton.Ce qui nécessite une attention particulière, c 'est que cette propriété ne se transforme pas en false au moment de l' assemblage de checkbox, sinon elle se transforme en mode bouton et ne sera jamais sélectionnée.



