#Référence de module List



##Création de composants List par layaairide

Le module List affiche la liste des articles.Par défaut est une liste de direction verticale.La liste peut être personnalisée par l 'éditeur ui.Chaque liste List est habituellement la même et l 'éditeur peut personnaliser les entrées de contenu de liste de styles différents.
List comprend généralement deux éléments: un élément de rendu de liste (cellules) et une barre de défilement.
L'interface de script du module List, s'il vous plaît.[List API](http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ui.List)".



 



###1.1 Création de composants List

####Édition des entrées de liste.

L 'élément de liste peut être un objet Box ou View (page) ou un autre objet de page personnalisé.Voici l 'exemple de l' objet box.
​**A**Sélectionnez glisser un composant label depuis le panneau de ressources jusqu 'à l' interface de la zone d 'édition, et définissez un nom d' attribut label dont la valeur est m 'u label.En outre, définissez les attributs de corrélation d 'affichage de label pour qu' ils soient plus beaux.
​**B.**Sélectionnez l 'objet label en utilisant le raccourci Ctrl + B ou en sélectionnant**Barre de menu - > Édition >**Sélectionnez le type de récipient Box et cliquez sur le bouton de détermination pour compléter l 'ajout du récipient box.

​![图片0.png](img/1.png)< br / >
(Figure 1)





 ####Conversion en conteneurs list.

Sélectionnez les objets de rendu de la liste, en utilisant les raccourcis claviers Ctrl + B ou en sélectionnant**Barre de menu - > Édition >**Sélectionnez le type de récipient List et cliquez sur le bouton de détermination pour compléter l 'ajout du récipient list.
​![图片0.png](img/2.png)< br / >
(Figure 2)
####Spécifie les éléments de rendu de liste pour list.
Procédé 1: Double - cliquez sur l 'objet List pour entrer dans l' intérieur de List et définissez le nom de propriété de l 'élément de rendu de liste List comme render.**Remarque & ‧‧;: la valeur du nom de l 'attribut de rendu dans la liste doit être render.**

Méthode 2: Double - cliquez sur l 'objet List pour entrer dans le List et définissez la valeur de rendertype des attributs de l' élément de rendu de liste List comme render.


​![图片0.png](img/3.png)<br/>

(Figure 3)

####Ajouter une barre de défilement pour list.
Procédé 1: Sélectionnez et faites glisser un composant vscrollbar à l 'intérieur de l' ensemble List à partir d 'un panneau de ressources et définissez le nom de propriété de l' objet vscrollbar comme scrollbar.***Remarque: la valeur du nom de propriété de la barre de défilement doit être strollbar.***

Method 2: Selection of List Components, the right Property panel is used to the present of vsscrollbarskin, the Selection and remorquage of a vscrollbarr component from the Resource Panel to this skin Property produce the Rolling band

​![图片0.png](img/4.png)< br / >
(Figure 4)

####Remorquage des paramètres de largeur de List
La valeur de repeatx de la propriété est de 1 et la valeur de repeaty de 6.Définit le nom de référence global de l 'objet List, c' est - à - dire que la valeur de var de l 'attribut est m' u list.
​![图片0.png](img/5.png)< br / >
(Figure 5)

####Attribuer une valeur à l'objet list dans le Code.



```javascript

 var data:Array =[];

   for(var m:int =0;m<20;m++){

        data.push({m_label:"No."+m});
}
m_list.array = data;
```



####Exécution des tâches de vérification dans le cadre du programme.
​![图片0.gif](gif/1.gif)< br / >
(Figure 6)

####Ajouter un script dans le Code pour masquer les barres de défilement et définir l'effet de la barre de caoutchouc tirée.

```javascript

 m_list.scrollBar.hide = true;//隐藏列表的滚动条。
 m_list.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
 m_list.scrollBar.elasticDistance = 50;//设置橡皮筋极限距离。
```


####Exécution des tâches de vérification dans le cadre du programme.
​![图片0.gif](gif/2.gif)<br/>

(Figure 7)


###1.2 caractéristiques usuelles des composants List

​![图片0.png](img/6.png)< br / >
(Figure 8)

- 124.**Description fonctionnelle**- 124.**Attribut**- 124.
124 -----------------------------------------------------------------------------------------------------
‧ nombre de cellules affichées dans la direction horizontale.- 124, repeatx, 124.
‧ nombre de cellules affichées dans la direction verticale.- 124.
, l 'espacement entre les cellules affichées horizontalement (en pixels).Nos 124 fusées.
$124 espacement (en pixels) entre les cellules affichées dans la direction verticale.- 124.
La peau roule dans la direction verticale."124, ` vscrollbarskin \ \ 124.
La peau roule dans le sens horizontal."124, ihscrollbarskin."



  



###1.3 Tips:

L'ajout d'une barre de défilement à List se fait de deux manières: d'une part, en glissant une barre de défilement directement à l'intérieur de la barre et en la désignant sous le nom de strollbar et, d'autre part, en définissant les propriétés de List comme l'adresse de ressource de la barre de défilement pour Les valeurs vscrollbarskin et hscrollbarskin.

Les éléments de rendu de liste List peuvent être soit des objets Box soit des objets de page.

​


##Création de composants List par Code

Quand on fait un code d 'écriture, on contrôle l' ui par le Code, on crée la classe ui u.u.`laya.ui.List`Et définit les propriétés associées à List par l 'intermédiaire du Code.

**Exécution de l 'exemple:**
​![5](gif/3.gif)< br / >
(Figure 9) Création de List par Code

D 'autres attributs de List peuvent également être définis au moyen d' un code, l 'exemple suivant montre comment créer List à partir d' un code pour différentes peaux (Styles) et les lecteurs intéressés peuvent définir List par leur propre code pour créer une liste adaptée à leurs besoins.

**Exemple:**


```javascript

package
{
	import laya.display.Stage;
	import laya.ui.Box;
	import laya.ui.Image;
	import laya.ui.List;
	import laya.utils.Handler;
	import laya.webgl.WebGL;
	
	public class UI_List
	{
		//列表对应图片的路径
		private var data:Array = [  "../../../../res/ui/listskins/1.jpg",
									"../../../../res/ui/listskins/2.jpg",
									"../../../../res/ui/listskins/3.jpg",
									"../../../../res/ui/listskins/4.jpg",
									"../../../../res/ui/listskins/5.jpg",
									"../../../../res/ui/listskins/1.jpg",
									"../../../../res/ui/listskins/2.jpg",
									"../../../../res/ui/listskins/3.jpg",
									"../../../../res/ui/listskins/4.jpg",
									"../../../../res/ui/listskins/5.jpg",
									"../../../../res/ui/listskins/1.jpg",
									"../../../../res/ui/listskins/2.jpg",
									"../../../../res/ui/listskins/3.jpg",
									"../../../../res/ui/listskins/4.jpg",
									"../../../../res/ui/listskins/5.jpg"];
		
		public function UI_List()
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

			//创建列表
			createList();			
		}
		
		/***创建list列表**/
		private function createList():void
		{
			//实例化列表
			var list:List = new List();
			//设置列表渲染单元格为Item类（注：必须是类，不能是实例化对象，Item需类继承于Box）
			list.itemRender =Item;
			//列表显示区单元格的列数
			list.repeatX = 1;
			//列表显示区单元格的行数
			list.repeatY = 4;
			//设置列表位置
			list.x = (Laya.stage.width - Item.WID) / 2;
			list.y = (Laya.stage.height - Item.HEI * list.repeatY) / 2;
			
			// 使用但隐藏垂直滚动条
			list.vScrollBarSkin = "";
			//滚动在头或底回弹时间
			list.scrollBar.elasticBackTime = 500;
			//滚动在头或底最大距离
			list.scrollBar.elasticDistance = 200;
			
			//设置为可以选择
			list.selectEnable = true;
			//选择单元格时回调方法
			list.selectHandler = new Handler(this, onSelect);
			//渲染单元格时的回调方法
			list.renderHandler = new Handler(this, updateItem);
			//为列表赋值
			list.array = data;
			//加载到舞台
			Laya.stage.addChild(list);
		}
		
		/***渲染单元格时的回调方法***/
		private function updateItem(cell:Item, index:int):void 
		{
			//用获得的数据给图片更换皮肤
			cell.img.skin=cell.dataSource;
		}
		
		/***选择单元格回调***/
		private function onSelect(index:int):void
		{
			trace("当前选择的索引：" + index);
		}
	}
}


//单元格类，继承于Box
import laya.ui.Box;
import laya.ui.Image;

class Item extends Box
{
	/***单元格宽***/
	public static var WID:int = 375;
	/***单元格高***/
	public static var HEI:int = 85;
	/***单元格中图片***/
	public var img:Image;
	
	public function Item()
	{
		//设置大小宽高
		size(WID, HEI);
		//实例化图片
		img = new Image();
		//加载到单元格中
		addChild(img);
	}
}

```


