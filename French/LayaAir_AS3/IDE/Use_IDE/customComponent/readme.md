#Fabrication et utilisation de composants personnalisés

Le layaair - IDE fournit de nombreux composants ui communs pour répondre aux besoins fondamentaux, mais les développeurs en développement ont souvent besoin de composants ui personnalisés pour répondre à leurs besoins particuliers.Layaair fournit une interface pour un composant personnalisé que l 'développeur peut modifier ou ajouter en fonction des besoins et que le nouveau composant peut être identifié et utilisé par layaairide.Cet article donne un exemple de la manière d 'ajouter un nouveau composant et de l' utiliser dans layaairide.

### 	**Comprendre la structure et les règles des composants**   
#### 					**1.1 structure du Répertoire des composants**

Le catalogue des composants se trouve dans le catalogue des racines de layaairide.Comme le montre la figure 1:
​![1](img/1.jpg)< br / >
(Figure 1)

​**Description de la structure du Répertoire des composants**

"Custom": Ce répertoire est utilisé pour stocker les fichiers JS et XML des composants personnalisés;

« laya.editorui.js »: Code de réalisation fonctionnelle pour les composants à bande libre layaairide;

« laya.editorui.xml »: informations sur la configuration des composants de la bande autonome layaairide;

#### 				**1.2 Description des informations de configuration XML des composants**

Un composant complet comprend deux parties: JS et XML, dans lesquelles JS est une partie de mise en oeuvre fonctionnelle du composant et XML une partie d 'affichage et d' appel du composant dans l 'IDE, comprenant un nom de ressource d' image du composant (qui distingue la taille de l 'écriture), des Options de panneau d' attribut et des valeurs par défaut.

On trouvera ci - après l'exemple de l'ensemble textarea de laya.editorui.xml:


```xml

	<TextArea className="laya.editorUI.TextArea" inherit="TextInput" defaultValue="text='TextArea'" skinLabel="skin" resName="area" icon="TextArea" groups="公用,常用,宽高及位置,旋转及缩放" drag="3">
		<prop name="vScrollBarSkin" tips="垂直滚动条皮肤" type="string" default="" accept="res" group="常用" />
		<prop name="hScrollBarSkin" tips="水平滚动条皮肤" type="string" default="" accept="res" group="常用" />
	</TextArea>
```


​

​**Description du composant XML:**

"Textarea": textarea marque le début et la fin du composant.Le nom de textarea peut être différent de la catégorie, mais il est facile de comprendre la mémoire pour l 'affichage du nom du composant dans l' IDE;

"Classsname": la trajectoire complète du composant, telle que: laya.editorui.textarea;

"Inherit": paternel hérité;

"DefaultValue": valeur par défaut des propriétés du composant;

"Skinlabel": pour les paramètres de corrélation skin dans le panneau d 'attributs.Les valeurs de skinlabel correspondent aux champs name de prop et aux paramètres associés, et si aucun paramètre n 'est prévu dans le prop, aucun paramètre n' est prévu dans l 'ensemble textarea;

"Resname": préfixe de ressource de composant (qui distingue la taille de l 'écriture) dont la ressource est identifiée comme composant; la zone de configuration de textarea est un modèle abrégé de textarea qui affiche textarea sur le panneau de composant de l' IDE.Pour ce qui est de la nomenclature des composants, on peut consulter le document des règles de nomenclature des ressources des composants sur la base des composants IDE;

"Icon": le nom de l 'icône (qui distingue la taille de l' icône) affiché par le composant dans l 'IDE, le catalogue de l' icône se trouve dans le catalogue des "ressources" sous le catalogue des racines de layaairide, où nous pouvons créer une nouvelle icône icon ou utiliser une icône en commun par plusieurs ensembles.Par exemple: textarea correspondra à textarea.ping dans le répertoire Component

"Groups": affichage de paquets pour les panneaux d 'attributs, séparés par une virgule;

« drag »: paramètres d 'alignement d' étirage: 1: deux points qui ne peuvent être étirés que de manière transversale, tels que les ensembles hscroll; 2: deux points qui ne peuvent être étirés que verticalement, tels que les ensembles vscroll; 3: huit points qui peuvent être étendus horizontalement, verticalement, agrandis ou rétrécis;

"Prop": les paramètres des attributs dans le panneau d 'attributs sont dans le prop et chaque marque prop correspond aux propriétés d' un composant;

Le nom de l 'attribut est affiché sur le panneau d' attribut;

"Tips": informations d 'avertissement tips affichées par la souris sur le nom d' attribut;

"Type": type de valeur d 'attribut dans la zone d' entrée;

"Default": valeur par défaut de cette propriété;

"Access": Cette propriété reçoit les valeurs res et files.Res représente la barre d 'attributs qui peut être glissée dans une ressource unique; Files représente la barre d' attributs qui peut être glissée dans une pluralité de ressources;

"Groupe": sous - groupe dans lequel cette propriété est située; sous - groupe dans lequel il n'y a pas d'autres sous - groupes;

###Import de la Banque de composants layaairide
####2.1 téléchargement de la Bibliothèque de composants layaairide (version as)

Down Address:[https://github.com/layabox/layaair-ide-ui](https://github.com/layabox/layaair-ide-ui)

####2.2 créer un projet et l 'importer dans son catalogue

Pour créer un projet AS3, utilisez layaairide (pour le projet de création, voir le Programme d 'enseignement pertinent, cette page n' est pas précisée).Le paquet zip téléchargé est ensuite décompressé et les catalogues editorui et IDE sont placés dans la table des matières « libs / Laya / src / Laya » sous le catalogue racine du projet.Comme le montre la figure 2:

[IMG / 2.jpg]

(Figure 2)

###Fabrication d 'un composant personnalisé
####3.1 Création d'une catégorie de composants

Créer un répertoire de composants (paquets) pour faciliter la classification des autres composants futurs, puis créer un type de bouton scalebutton.as sous le répertoire Component, comme le montre la figure 3:



​	![3](img/3.jpg)

(Figure 3)

Une fois la création terminée, nous avons commencé à élaborer le code suivant pour les modules de zoom:


```javascript

package component
{
	import laya.editorUI.Button;
	import laya.events.Event;
	import laya.utils.Tween;
	
  	//继承button组件
	public class ScaleButton extends Button
	{
	
		//缩放时间100毫秒
		public var scaleTime:int = 100;
		public function ScaleButton(skin:String=null,label:String="")
		{
			//调用父类的构造函数
			super(skin,label);
			
			/* 设置按钮为单态按钮
			** 取值：
			** 1：单态。图片不做切割，按钮的皮肤状态只有一种。
			** 2：两态。图片将以竖直方向被等比切割为2部分，从上向下，依次为弹起状态皮肤、按下和经过及选中状态皮肤。
			** 3：三态。图片将以竖直方向被等比切割为2部分，从上向下，依次为弹起状态皮肤、经过状态皮肤、按下和选中状态皮肤
			*/
			this.stateNum = 1;
			
			//添加鼠标按下事件侦听。按时时缩小按钮。
			this.on(Event.MOUSE_DOWN,this,scaleSmal);
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
		
		private function scaleSmal():void
		{
			//缩小至0.8的缓动效果
			Tween.to(this,{scaleX:0.8,scaleY:0.8},scaleTime);
		}
	}
}
```


####3.2 Équipements de compilation sous - traités JS

AS3 compilateur JS par défaut compilateur de paquets, c 'est - à - dire compiler tous les codes logiques et la Bibliothèque de moteurs dans un fichier JS, ce JS doit être copié dans le Répertoire de composants de l' IDE pour les composants personnalisés, alors qu 'un grand nombre de codes ne sont pas utilisables.Nous avons donc besoin de sous - traiter la compilation.(pour plus de détails sur le programme de sous - traitance, prière de consulter les documents officiels pertinents sur le site Web, et cette section n'indique que les étapes à suivre)
Créer un fichier de configuration de sous - traitance, module.def, ouvrir le fichier et y inscrire le nom de fichier js "scalebutton" et le chemin de compilation "src / component", qui ont été compilés conformément aux règles de sous - traitance.Se référer à:


```

module:"ScaleButton"  	//设置组件编译后的分包JS文件名
path:"src/component"      //设置需要分包的组件所在目录路径
```


Lorsque les règles de sous - traitance ont été établies et conservées, nous avons compilé les fichiers scalebutton.as que nous venons d 'établir (dans ce texte, nous avons placé directement les fichiers scalebutton.as dans la catégorie des documents pour faciliter la présentation), et on peut voir qu' il y a sous le catalogue JS un scalebutton.js, Comme le montre la figure 4, qui correspond au Code scalebutton.as que nous venons d 'élaborer.Définit la partie de mise en oeuvre de la fonction JS du composant sans inclure d 'autres codes tels que la Bibliothèque de moteur.

​![4](img/4.jpg)

(Figure 4)

####3.3 Établissement des fichiers de configuration XML des composants
Selon la description de configuration XML mentionnée ci - dessus, nous avons achevé la configuration XML de ce bouton de zoom, même si le module personnalisé a été fabriqué.Les informations de configuration XML du bouton de zoom sont établies comme suit:


```xml

<?xml version="1.0" encoding="utf-8" ?>
<uiComp>
	<ScaleButton className="component.ScaleButton" runClass="component.ScaleButton"  inherit="Button" skinLabel="skin" 
	defaultValue="label=''" resName="sButton" icon="Box" groups="公用, 常用, 宽高及位置" drag="3">
		<prop name="scaleTime" tips="缩放使用的时间" type="number" default="100" group="常用" />
	</ScaleButton>
</uiComp>
```


Le contenu des informations de configuration Tips: XML est expliqué par référence à la description XML du composant ci - dessus.

###Ajout et utilisation de composants personnalisés

####4.1 catalogue de composants personnalisés ajoutant des composants à l 'IDE

Une fois les fichiers de configuration XML établis, le nom du composant XML doit correspondre à celui du composant JS, où nous sommes appelés scalebutton.xml.Ensuite, nous avons copié dans le catalogue des composants personnalisés scalebutton.js, produit par sous - traitance (sous la table des matières de projet / bin / H5 / JS, voir la figure 4).Comme le montre la figure 5:

​![5](img/5.jpg)

(Figure 5)

####4.2 affichage sur le panneau de composant IDE

Ouvre le catalogue des composants de l'IDE (catalogue des composants de l'IDE) pour créer un répertoire des composants personnalisés, Custom, pour stocker les composants de l'autodéfinition, comme le montre la figure 6.

​![6](img/6.jpg)

(Figure 6)

Une icône PNG nommée sbutton (taille suggérée 16 * 16) est ensuite insérée dans le catalogue Custom, ce qui permet, comme le montre la figure 7, de trouver l 'ensemble Bouton d' agrandissement que nous avons créé nous - mêmes dans le panneau de composants de l 'IDE.

​![7](img/7.jpg)

(Figure 7) icône nomme la valeur des attributs resname dans le composant XML correspondant

​![8](img/8.jpg)

Figure 8 nom de composant de l 'IDE

​**Tips:**Rappelez - vous que les icônes icon du composant ne sont pas celles du catalogue.L'icône icon se trouve dans le catalogue des "ressources" sous le catalogue racine de layaairide, correspondant à la valeur de l'attribut de icon XML, décrite dans la note XML ci - dessus.Si vous créez votre propre icône icon, faites - le par référence à l 'identification de la taille de l' icon dans le répertoire Components et placez - le dans le répertoire Components, puis définissez le nom de fichier correspondant dans le XML.

####4.3 affichage sur le tableau de ressources IDE

Dans le panneau de ressources, une ressource skin d 'un composant ui commun est placée par défaut dans le fichier Comp, ce qui facilite l' identification de la ressource skin comme composant par l 'application de la règle de désignation du composant (les ressources doivent être stockées sous la rubrique "liste des racines de projet" pour être identifiées comme composant).Contrairement à la valeur skin d 'attribut de composant du panneau de composant, la valeur par défaut de l' attribut de composant du panneau de ressources est un chemin relatif dans le répertoire \ \ Laya \ \ assets.
Afin de faciliter l 'utilisation d' un composant avec une ressource skin pour le projet, nous continuons d 'expliquer comment le composant peut être affiché sur le panneau ressources.Tout d 'abord, nous préparons une ressource skin, puisque le module personnalisé de l' exemple ci - dessus est un bouton d 'agrandissement.Les ressources d 'image sont copiées dans le répertoire des racines de projet, et les ressources d' image s' appellent sbutton, ou préfixe sbutton, comme le montre la figure 9.

​![9](img/9.jpg)

(Figure 9)

Une fois que la copie des ressources est terminée, nous ouvrirons à nouveau le panneau de gestion des ressources de layaairide, en cliquant sur le bouton de l 'arbre de ressource rafraîchissant pour voir sbutton u 1.png, qui vient d' être reproduit, et en cliquant sur l 'image, nous verrons un aperçu.L 'ajout réussi d' un module personnalisé avec une valeur par défaut skin au tableau de gestion des ressources du projet, comme le montre la figure 10.

​![10](img/10.jpg)

(Figure 10)

Les composants affichés dans le panneau de ressources ne sont utilisés que pour l 'élément actif et sont ajoutés au panneau de composants pour tous les éléments.
​

####4.4 utilisation de composants personnalisés

Crée une page de présentation dans le panneau de gestion de projet (cette page n 'est utilisée que pour la présentation de l' effet du composant, sans description détaillée de l 'étape de fonctionnement), avec deux modes d' utilisation de l 'ensemble bouton de zoom personnalisé.

4.4.1 utilisation à partir du tableau de ressources

Un composant de préfixe de sbutton est trouvé dans le panneau de gestion des ressources, glissé directement sur la page et cliquez pour voir l 'effet d' agrandissement, comme la figure 11.

​![11](img/11.gif)

(Figure 11)

4.4.2 utilisation des panneaux de composants

Trouver l 'ensemble scalebutton dans le panneau d' assemblage, tirer directement sur la page, cliquer pour voir l 'effet d' agrandissement, comme la figure 12



​	![12](img/12.gif)

Figure 12) Les ressources d 'image ne sont pas incluses dans le panneau de composant et doivent être configurées par l' attribut skin

###Mise en service des composants

Sur la base de ce qui précède, nous avons achevé tous les processus de fabrication et d 'utilisation des composants de layaairide.Cependant, dans le processus d 'un composant personnalisé formel, une étape très importante a été franchie pour simplifier le processus et atteindre l' objectif du composant personnalisé le plus rapidement possible, étape qui consiste à ajuster le composant.

Bien qu 'il n' y ait pas de problème avec l 'absence de maillon de débogage, la plupart des gens ne peuvent pas garantir que le codage n' est pas erroné pendant le processus de développement réel.L 'ajout d' un composant erroné à l 'IDE n' aurait pas été aussi facile que dans ce document, et il serait difficile de l 'adapter dans l' IDE.Par conséquent, dans cette sous - section, nous ajoutons les étapes manquantes et, une fois les composants achevés, nous procéderons à la mise à l'essai puis à la compilation sous - traitante.

#### 	**5.1 rediffusion d 'images vers les ressources du projet**

Copie d 'une image sous le catalogue « racine du projet / H5 / RES / img » pour l' itinéraire des ressources du projet, voir la figure 13.

​![13](img/13.jpg)

(Figure 13)

####5.2 références de classe pour les composants modifiés

Ouvre le Code de bouton scalebutton.as ci - dessus et introduit l 'ancienne bibliothèque de composants dans la bibliothèque "Import laya.editorui.button;" Import laya.ui.button; "les autres restent inchangés.Étant donné que laya.editorui est utilisée pour layaairide, le moteur culaya.ui doit être utilisé pour l'exécution du projet.Comme le montre la figure 14:

​![14](img/14.jpg)

(Figure 14)

####5.3 création d'une catégorie d'entrée

Crée une catégorie d 'entrée main.as sous la rubrique « Liste des racines du projet / src », codée comme suit:


```javascript

package
{
	import component.ScaleButton;	
	import laya.utils.Handler;
	
	public class Main
	{
		public function Main()
		{
			//初始化舞台
			Laya.init(1136,640);
					
			//加载图片资源，回调
			Laya.loader.load("res/img/monkey1.png",Handler.create(this, onLoaded));
			
		}
		
		private function onLoaded():void
		{
			var scaleButton:ScaleButton = new ScaleButton();
			//组件skin的资源路径
			scaleButton.skin = "res/img/monkey1.png";
			//添加到舞台
			Laya.stage.addChild(scaleButton);
		}
	}
}
```


Définit la classe D 'entrée comme une opération de compilation et de compilation de documents, et clique dans le Navigateur pour obtenir un effet d' agrandissement, comme le montre la figure 15.L 'invention concerne également un composant personnalisé efficace qui peut être ajouté sans problème à l' IDE.(Note: l 'étape normale est de passer à une opération de sous - traitance antérieure à la Sous - traitance, alors que l' opération de sous - traitance décrite dans le présent article, si la mise en service directe entraîne une erreur de présentation, il faut d 'abord changer le nom ou supprimer le fichier de configuration de sous - traitance module.def)

​![15](img/15.gif)

(Figure 15)

N 'oubliez pas de restaurer le fichier de configuration de sous - traitance module.def lorsque le module est prêt à être lancé.En outre, lorsque le Code JS du sous - traitant a été publié, la laya.ui de l'import au moment de la mise en page doit être rétablie en tant que laya.editor.

###Enregistrement des composants

L 'enregistrement d' un composant est l 'Association d' un composant personnalisé avec un nom de classe, et l 'affichage d' un exemple est effectué selon une carte d 'enregistrement.

Par exemple:


```java

View.regComponent("ScaleButton",component.ScaleButton);//注册组件
```




###Autres annotations

Si le composant personnalisé est un composant de catégorie de récipients, il est nécessaire d 'ouvrir le panneau de configuration du projet F9 en mode éditeur du projet layaair - IDE et d' ajouter un nom de groupe de récipients personnalisé (à intervalles de virgule) dans la liste des récipients, comme indiqué à la figure 16.

​![16](img/16.jpg)

(Figure 16)

Si le composant personnalisé est un composant de classe de page, il est nécessaire d 'ouvrir le panneau de configuration de projet en mode Éditeur du projet layaair et d' ajouter un nom de groupe de pages personnalisé (par espacement de virgule) dans la liste des pages, comme le montre la figure 17.

​![17](img/17.jpg)

(Figure 17)

Le présent article s'achève et, s'il y a des questions, s'adresse à la communauté: < http: / / ask.layabox.com >.

