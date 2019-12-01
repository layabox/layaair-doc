#Références de composants label



##Création d 'un composant label par layaairide

###1.1 Création de label


​        Label 组件用来显示一段文字，文字可以是系统字体或者 BMFont 字体。


​        点击资源面板里的 Label 组件，拖放到页面编辑区，即可添加 Label 组件到页面上。
Interface de script pour module label[Label API](http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ui.Label)".

Exemples de ressources pour le module Label:



​        ![图片0.png](img/1.png)< br / >
(Figure 1)

Après avoir glissé le composant label dans la zone d 'édition, la valeur de la propriété text est définie comme suit:

​![图片0.png](img/2.png)< br / >
(Figure 2)



 

 



###1.2 propriété label

​![图片0.png](img/3.png)< br / >
Graphique

- 124.**Attribut**Description fonctionnelle \ \ 124.
124 ----------------------------------------------------------------------------------------------------------
Chaîne de contenu du texte.- 124.
124. Alignement horizontal du texte.Les valeurs sélectionnées sont left, Center, right.- 124.
Le texte \ \ \ \ \ \ \ \ \ \ \ \ \ \ \Les valeurs sélectionnées sont top, Middle, bottom.- 124.
La valeur de couleur du texte \ \ \ \ \ \ \ \ \ \ \ \ \Noir par défaut- 124.
Couleur d 'arrière - plan du texte.- 124.
§ 124 font \ \ nom de la police du texte.- 124.
La taille de la police du texte \ \ 124 fontsize \ \ 124.- 124.
Si le texte \ \ 124bold \ \ est en caractères gras.- 124.
Le texte \ \ \ \ \ \ \ \ \ \ \ \ \ \- 124.
Le texte \ \ 124wordwrap \ \ 124 a - t - il été remplacé par une ligne?- 124.
La largeur de la bordure du texte \ \ \ \ \ \ \ \ \ \ \ \- 124.
La couleur de bordure du texte.- 124.
Le texte \ \ \ \ \ \ \ \ \ \ \ \ \ \ \- 124.
124 Espacement vertical du texte.- 124.
La marge du texte \ \ 124.- 124.



 



##Création d 'un composant label par Code

Quand on écrit un code d 'écriture, on ne peut pas forcément contrôler l' ui par le Code, créer`UI_Label`Importer dans un code`laya.ui.Label`Et définit les propriétés associées à label par l 'intermédiaire du Code.

**Exécution de l 'exemple:**

​	![5](img/4.png)< br / >
Figure 5 création de label par Code

D 'autres attributs de label peuvent également être définis au moyen d' un code qui montre comment créer un label à partir d 'un code pour différentes peaux (Styles) et qui permet aux lecteurs intéressés de définir label par leur propre code pour créer un effet de texte correspondant à leurs propres besoins.

D 'autres effets de texte peuvent être consultés dans la partie de texte de base 2D.

**Exemple:**


```javascript

package 
{
	import laya.display.Stage;
	import laya.ui.Label;
	import laya.webgl.WebGL;
	
	public class UI_Label
	{
		public function UI_Label()
		{
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

			//创建多个label文本
			createMoreLabel();			
		}

		/***创建多个label文本***/
		private function createMoreLabel():void
		{
			//创建各种文本效果并设置位置
			createLabel("#FFFFFF", null).pos(30, 50);
			createLabel("#00FFFF", null).pos(290, 50);
			createLabel("#FFFF00", "#FFFFFF").pos(30, 100);
			createLabel("#000000", "#FFFFFF").pos(290, 100);
			createLabel("#FFFFFF", "#00FFFF").pos(30, 150);
			createLabel("#0080FF", "#00FFFF").pos(290, 150);
		}
		
		/**
		 * 创建Label文本
		 * @param color 	         文字颜色
		 * @param strokeColor  文字描边颜色
		 */		
		private function createLabel(color:String, strokeColor:String):Label
		{
			//实例化label文本
			var label:Label = new Label();
			//设置文本字体
			label.font = "Microsoft YaHei";
			//设置文本内容
			label.text = "SAMPLE DEMO";
			//设置文本字体大小
			label.fontSize = 30;
			//设置文本字体颜色
			label.color = color;
			
			//如果有描颜色参数
			if (strokeColor)
			{
				//文本描边宽度为4
				label.stroke = 4;
				//设置文本描边颜色
				label.strokeColor = strokeColor;
			}
			//加载到舞台
			Laya.stage.addChild(label);
			
			return label;
		}
	}
}
```








 	