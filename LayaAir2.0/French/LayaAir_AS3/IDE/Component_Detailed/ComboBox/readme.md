#Références de composants ComboBox



##Création de composants ComboBox par layaairide
###1.1 Création de ComboBox
ComboBox est un ensemble d 'options de liste déroulante.
Cliquez sur le composant ComboBox du panneau de ressources sélectionné pour le glisser dans la zone d 'édition de page, ce qui permet d' ajouter le composant ComboBox à la page.
Script de combbox[ComboBox API](http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ui.ComboBox)".

Exemples de ressources d 'image de composants ComboBox:



​        ![图片0.png](img/1.png)< br / >
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
La ressource d 'image de barre de défilement de la liste déroulante.- 124.
, puis cliquez sur l 'index de l' élément actuellement sélectionné.- 124.
Les données de la grille sont mises à l 'échelle de manière efficace (données de la grille de la neuvième maison).- 124.
La ressource d 'image de la liste déroulante.- 124.
12.24.
124, visible \ \ 124.



 



###1.3 propriétés associées à l 'option de déroulement des composants ComboBox
​![图片0.png](img/6.png)<br/>

(Figure 6)

​![图片0.png](img/7.png)< br / >
(Figure 7)

- 124.**Attribut**- 124.**Description fonctionnelle**- 124.
124 ------------------------------------------------------------------------------------------------------
Ensemble de couleurs de texte d 'étiquette pour chaque état d' un article de liste déroulant.Pour plus de détails, voir API.- 124.
La taille de la police du texte de l 'étiquette de l' élément de liste- 124.



 

 



###1.4 propriétés associées au bouton descendant du composant ComboBox

​![图片0.png](img/8.png)< br / >
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

Quand on écrit un code d 'écriture, on ne peut pas forcément contrôler l' ui par le Code, créer`UI_ComboBox`Importer dans un code`laya.ui.ComboBox`Et définit les propriétés associées à ComboBox par l 'intermédiaire du Code.

**Exécution de l 'exemple:**
​![1](gif/1.gif)< br / >
(Figure 10)

D 'autres attributs de ComboBox peuvent également être définis au moyen d' un code, l 'exemple suivant montre comment créer les options descendantes dans la zone à cocher au moyen d' un code et quelles sont les options que vous avez choisies en cliquant.Les lecteurs intéressés peuvent définir eux - mêmes ComboBox par l 'intermédiaire du Code et créer une barre descendante adaptée à leurs besoins.


```javascript

package
{
	import laya.display.Stage;
	import laya.display.Text;
	import laya.ui.ComboBox;
	import laya.utils.Handler;
	import laya.webgl.WebGL;
	
	public class UI_ComboBox	
	{
		/***下边列表美术资源**/
		private var skin:String = "../../../../res/ui/combobox.png";
		/***下拉列表**/
		private var comboBox:ComboBox 
		/***提示信息文本框**/
		private var promptText:Text;
		
		public function UI_ComboBox() 
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
			
			//加载资源
			Laya.loader.load(skin, Handler.create(this, onLoadComplete));
		}
		
		/***加载资源完成***/
		private function onLoadComplete(e:*=null):void
		{
			//实例化下拉列表
			comboBox= new ComboBox(skin, "item0,item1,item2,item3,item4,item5");
			//按钮标签字体大小
			comboBox.labelSize = 30;
			//列表项标签字体大小
			comboBox.itemSize = 25;
			//下拉列表选择触发处理回调
			comboBox.selectHandler = new Handler(this, onSelect, [comboBox]);
			//加载到舞台
			Laya.stage.addChild(comboBox);
			//自动计算宽高
			comboBox.autoSize = true;
			//设置位置
			comboBox.pos((Laya.stage.width - comboBox.width) / 2, 150);
			//自动计算宽高关闭（在设置位置时，需获取列表宽度，获取后关闭）
			comboBox.autoSize = false;
			
			//创建选择提示信息框
			createPromptText()
		}
		
		/***创建提示信息***/
		private function createPromptText():void
		{
			//实例化提示信息
			promptText=new Text();
			//提示框字体
			promptText.font="黑体";
			//提示框字体大小
			promptText.fontSize=26;
			//提示框字体颜色
			promptText.color="#FFFFFF";
			//提示框初始文本
			promptText.text="您的选择是： ";
			//加载到舞台
			Laya.stage.addChild(promptText);
			//设置提示框位置
			promptText.pos(comboBox.x,comboBox.y-40);
		}
		
		/***下拉列表选择事件回调***/
		private function onSelect(comboBox:ComboBox):void
		{
			promptText.text="您的选择是： " + comboBox.selectedLabel;
		}
	}
}
```


