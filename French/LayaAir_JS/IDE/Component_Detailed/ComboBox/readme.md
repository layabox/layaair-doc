# ComboBox 组件参考



##Création de composants ComboBox par layaairide
###1.1 Création de ComboBox
ComboBox est un ensemble d 'options de liste déroulante.
Cliquez sur le composant ComboBox du panneau de ressources sélectionné pour le glisser dans la zone d 'édition de page, ce qui permet d' ajouter le composant ComboBox à la page.
Script de combbox[ComboBox API](http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ui.ComboBox)".

Exemples de ressources d 'image de composants ComboBox:

​![图片0.png](img/1.png)< br / >
(Figure 1)

Définit la valeur des propriétés de ComboBox labels comme suit: "Label1, Label2":
Normal

​![图片0.png](img/2.png)< br / >
(Figure 2)

Cliquez ici pour afficher la liste des options suivantes:

​![图片0.png](img/3.png)< br / >
(Figure 3)

Sélectionnez item1 après l 'option suivante:

​![图片0.png](img/4.png)< br / >
(Figure 4)



###1.2 caractéristiques communes des composants ComboBox

​![图片0.png](img/5.png)< br / >
(Figure 5)

- 124.**Attribut**- 124.**Description fonctionnelle**- 124.
124 -----------------------------------------------------------------------------------------------------
Les chaînes de texte d 'étiquettes de la zone de sélection sont séparées par une virgule.- 124.
Le nombre maximum de lignes que vous pouvez afficher dans la liste déroulante \ \ 124.- 124.
La ressource d 'image de barre de défilement de la liste déroulante.- 124.
, puis cliquez sur l 'index de l' élément actuellement sélectionné.- 124.
Les données de la grille sont mises à l 'échelle de manière efficace (données de la grille de la neuvième maison).- 124.
La ressource d 'image de la liste déroulante.- 124.



 



###1.3 propriétés associées à l 'option de déroulement des composants ComboBox

​        ![图片0.png](img/6.png)<br/>

(Figure 6)

​![图片0.png](img/7.png)< br / >
(Figure 7)

- 124.**Attribut**- 124.**Description fonctionnelle**- 124.
124 ------------------------------------------------------------------------------------------------------
Ensemble de couleurs de texte d 'étiquette pour chaque état d' un article de liste déroulant.Pour plus de détails, voir API.- 124.
La taille de la police du texte de l 'étiquette de l' élément de liste- 124.



 

 



###1.4 propriétés associées au bouton descendant du composant ComboBox

​![图片0.png](img/8.png)<br/>

(Figure 8)

​![图片0.png](img/9.png)< br / >
(Figure 9)

- 124.**Attribut**- 124.**Description fonctionnelle**- 124.
124 ------------------------------------------------------------------------------------------------------
Le texte de l 'étiquette est affiché en caractères gras.- 124.
Les valeurs de couleurs textuelles dans les états des boutons & ‧‧;% ‧ & ‧‧;% ‧ & ‧‧;% ‧ & ‧‧Pour plus de détails, voir API.- 124.
{\ 1ch00ffff}- 124.
, puis appuyez sur le bouton & ‧‧;% 124 & ‧‧;.Pour plus de détails, voir API \ \ 124.
La taille de la police de texte du bouton & ‧‧;% 124 & ‧‧;% ‧ & ‧‧;% ‧ & ‧‧- 124.



 



##Création de composants ComboBox par Code

Quand on écrit un code d 'écriture, on ne peut pas forcément contrôler l' ui par le Code, créer`UI_ComboBox`Classe, les attributs associés à ComboBox sont définis par Code.

**Exécution de l 'exemple:**
​![1](gif/1.gif)<br/>

(Figure 10)

D 'autres attributs de ComboBox peuvent également être définis au moyen d' un code, l 'exemple suivant montre comment créer les options descendantes dans la zone à cocher au moyen d' un code et quelles sont les options que vous avez choisies en cliquant.Les lecteurs intéressés peuvent définir eux - mêmes ComboBox par l 'intermédiaire du Code et créer une barre descendante adaptée à leurs besoins.


```javascript

(function()
{
	var Stage    = Laya.Stage;
	var ComboBox = Laya.ComboBox;
	var Handler  = Laya.Handler;
	var WebGL    = Laya.WebGL;

	var skin = "res/ui/combobox.png";

	(function()
	{
		// 不支持WebGL时自动切换至Canvas
		Laya.init(800, 600, WebGL);

		Laya.stage.alignV = Stage.ALIGN_MIDDLE;
		Laya.stage.alignH = Stage.ALIGN_CENTER;

		Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
		Laya.stage.bgColor = "#232628";

		Laya.loader.load(skin, Handler.create(this, onLoadComplete));
	})();

	function onLoadComplete()
	{
		var cb = createComboBox(skin);
		cb.autoSize = true;
		cb.pos((Laya.stage.width - cb.width) / 2, 100);
		cb.autoSize = false;
	}

	function createComboBox(skin)
	{
		var comboBox = new ComboBox(skin, "item0,item1,item2,item3,item4,item5");
		comboBox.labelSize = 30;
		comboBox.itemSize = 25;
		comboBox.selectHandler = new Handler(this, onSelect, [comboBox]);
		Laya.stage.addChild(comboBox);

		return comboBox;
	}

	function onSelect(cb)
	{
		console.log("选中了： " + cb.selectedLabel);
	}
})();
```


