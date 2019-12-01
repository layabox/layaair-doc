#Interface d 'enregistrement d' accès à un jeu fabriqué à l 'aide de layaair IDE

Il suffit que les développeurs de jeux croient que vous n 'êtes pas étrangers à l' accès au jeu.Comment utiliser layaairide pour créer une page d 'enregistrement?Alors, s' il vous plaît regardez patiemment ce cours ~ ~ ~ (Note: ce document n 'est qu' un affichage de l 'effet, il n' y a pas de données réelles)

**Voir d 'abord l' effet final.Voir les figures 1, 2, 3 et 4.**

![1](1.jpg)
(Figure 1) la page d 'accès est personnalisée et ajoutée à la scène après l' assemblage de l 'interface dans l' IDE, et un clic sur le bouton d 'enregistrement éjecte le panneau d' enregistrement (voir la figure 2).

![2](2.jpg)
(fig. 2) cliquez sur la page d 'enregistrement avec succès (voir la figure 3) et cliquez sur le bouton de fermeture du coin supérieur droit pour fermer la page d' enregistrement.

![3](3.jpg)
Figure 3) cliquer sur un bouton pour déterminer ou désactiver le coin supérieur droit

![4](4.jpg)
(Figure 4) cliquer sur le bouton d 'accès sur le panneau d' accès pour afficher la page d 'accès réussie (Note: le panneau d' accès et d 'enregistrement est utilisé avec un seul panneau, avec des données différentes).

##Nouveaux projets

Ouvrez le layaairide installé et créez un projet vide (ce chapitre est la version as).Name Le projet, sélectionne le chemin, sélectionne la catégorie d 'article, et cliquez sur créer.Figure 5

![5](5.jpg)


(Figure 5) La structure du projet n 'est pas décrite en détail ici, passez à la page correspondante du document

##Créer une page d 'accès et terminer l' assemblage des pages d 'accès UI

###2.1 Ressources additionnelles

Si la page IDE dans laquelle elle se trouve n 'est pas un mode d' édition, elle doit être transférée au mode d 'édition.Figure 6

![6](6.jpg)

(Figure 6)

Les projets créés à l 'aide de layaairide sont accompagnés d' un fichier de ressources appelé comp dans le répertoire des ressources du mode d 'édition, où sont stockées des ressources courantes des composants ui.Ce document n 'utilise pas beaucoup de ressources, donc supprime certaines ressources et ajoute une nouvelle ressource.Les ressources conservées dans le document relatif aux ressources finales sont indiquées à la figure 7.

![7](7.jpg)
(Figure 7) Étapes d 'exploitation des ressources: suppression des ressources inutilisées, ajout d' une ressource dans le bouton droit du panneau de ressources - ouvrir le répertoire où se trouvent les ressources - et retour à la ressource mise à jour dans le panneau de ressources IDE.Figure 8

![8](8.jpg)
(Figure 8)

###2.2 création d'une page d'accès

Création d 'une page d' accès dans le module de projet de mode d 'édition - Création - Page (comme le montre la figure 9), suivie d' un panneau pour créer une page (comme le montre la figure 10)

![9](9.jpg)
(Figure 9)

![10](10.jpg)
(Figure 10)

**Type de page:**

Il y a deux sortes, view et dialog.La différence entre les deux est que dialog hérite de View et possède toutes les fonctions de dialog, à la différence de view, l 'ensemble dialog est une boîte de dialogue d' éjection permettant d 'éjecter la boîte de dialogue, de glisser - déposer et de créer une fenêtre de mode.View peut être utilisé comme panneau d 'affichage fixe dans un article réel et dialog comme cadre d' affichage dans un article réel

**Nom de la page:**

Nom de cette page

**Vue de référence:**

Les ressources disponibles sur certaines interfaces peuvent être très importantes dans le cadre d'un projet concret, et il faudra alors les localiser sur la base des cartes fournies par les beaux - arts.S' il n 'y a pas un seul référentiel, ce sera plus long si l' on regarde le schéma.La visualisation de référence a pour effet d 'ajouter des dessins d' art pour les faire

**Largeur de page, hauteur de page:**

La largeur de la page permet de voir à l 'arrière une case cochée "uniquement comme référence".Si cette case est cochée, la hauteur de la largeur remplie à l 'avant est invalide dans l' élément réel et calcule automatiquement la largeur de l 'élément sur la page actuelle, ce qui permet d' obtenir une largeur de la page entière (cette opération permet une meilleure consommation, utilisez prudemment).Si cette option n 'est pas cochée, la largeur de la page précédente est la largeur de la page réelle (si la ressource dépasse la largeur définie, la partie supérieure ne sera pas rendue, aucun événement ne pourra être ajouté)

**Références**

Couleur de l 'arrière - plan lors de l' édition d 'une page

Cliquez sur le bouton d 'identification pour trouver une zone visible au milieu de l' IDE.

###2.3 Édition des pages d'accès

**Sur une page d 'accès, on trouve souvent des éléments tels que logo, titre, nom d' utilisateur, mot de passe, boîte de mots de passe mémorisée, boîte d 'options d' accès automatique, bouton d 'enregistrement, bouton d' accès, etc.**

**2.3.1 ajouter le contexte**- Oui.

Sélectionnez la ressource de fond et placez la ressource de fond sur la page sous forme de glisser - déposer.Les attributs sizegrid sont trouvés dans la barre d 'attributs à droite (réglage de la grille de la neuvième maison avec 35,20,20,20), la grille de la neuvième maison étant conçue de manière à éviter toute ambiguïté de l' image lors de l 'étirage de l' image et à fixer la hauteur de la largeur de la carte d 'arrière - plan à la hauteur de la page.Figure 11

![11](11.jpg)
(Figure 11)

**2.3.2 ajouter des ressources logo:**

Ajoutez le petit singe logo de layabox à la page et placez - le sur la gauche (Ceci n 'a pas d' effet d 'abord, voir la figure 12).

**2.3.3 ajouter un titre:**

Glisser l 'ensemble label dans le panneau de ressources vers la page.Paramétrer les attributs text dans le panneau d 'attributs à droite - "Bienvenue dans le monde de layaair", "couleur Color Color rouge"#F0400, définissez si le bold est grossi en "True" et définissez la police font comme "petit cercle" (attention, la police doit être la police existante dans l 'ordinateur).**Tous les mots de cette rubrique seront définis en petits cercles et ne seront plus mentionnés.**) définit la taille de la police de texte fontsize comme "35" et l 'alignement horizontal align comme "center" centré.Figure 11

![12](12.jpg)
(Figure 12)

**2.3.4 ajouter un nom d'utilisateur et un mot de passe:**

Glissez - le de la liste des ressources à deux label sur la page et placez - les à l 'emplacement approprié, puis installez le text comme "nom d' utilisateur:" et le mot de passe: ", dans le panneau d 'attribut droit, pour définir les polices comme" cercle minuscule "et la taille de la police comme" 20 ".

Les deux cadres d 'entrée "textinput" de la liste des ressources sur la page sont placés dans la position correspondante du nom d' utilisateur et du mot de passe, et le Var de la zone d 'entrée du nom d' utilisateur dans la barre d 'attribut droite indique la différence entre une variable "username" (Var) et un nom d' utilisateur: var est la seule variable globale qui peut modifier toutes les propriétés du composant directement par cette variable.Le nom peut être obtenu par l 'intermédiaire du noeud parent. Getchildbyname ("nom") modifiant ainsi ses propriétés pour que l' indicateur prompt du nom d 'utilisateur soit défini comme "Veuillez saisir le nom d' utilisateur" et la police est également "cercle minuscule".La zone d 'entrée de mot de passe correspond à la zone d' entrée de nom d 'utilisateur, définit la variable var comme "userpssword" et définit la promept comme "Entrez le mot de passe".Comme le montrent les figures 13 et 14.

![13](13.jpg)
(Figure 13)

![14](14.jpg)
(Figure 14)

**2.3.5 ajouter les cases suivantes:**

Ajout d 'un mot de passe mémorisé et d' une case de sélection de connexion automatique pour enregistrer un état

Les deux ensembles de cases sont retirés de la liste des ressources, et le label est défini comme "Mémoriser le mot de passe" et "connecter automatiquement" dans le panneau d 'attribut droit, puis, dans les autres options, si labelbold est grossi en "vrai" et le labelfont est défini comme "cercle minuscule".Comme le montrent les figures 15 et 16

![15](15.jpg)
(Figure 15)

![16](16.jpg)
(Figure 16)

**2.3.6 ajouter les boutons d'enregistrement et d'accès:**

Bouton d 'enregistrement: afficher la page d' enregistrement après clic

Paramètres des propriétés du bouton

![17](17.jpg)
(Figure 17)

![18](18.jpg)
(Figure 18)

**Ici, l 'interface d' accès est terminée et continue d 'épeler les fenêtres d' enregistrement et d 'avertissement.La fonction correspondante est exécutée par un code lorsque l 'interface ui est terminée.**

##Création d 'une page d' enregistrement et achèvement de l 'assemblage de pages d' enregistrement UI

**Création d'une page d'enregistrement**

L 'étape correspond à la page d' accès 2.2.La différence est que la page enregistrée est de type dialog (la différence entre dialog et View a été décrite en détail lors de la création de l 'interface d' accès au 2.2 ci - dessus et n 'est plus ici décrite en détail), cliquez sur le bouton détermination pour terminer la création de la page.Figure 19

![19](19.jpg)
(Figure 19)

**3.2 Contexte**

Étape de référence 2.3.1 glisser les ressources de fond dans la page

**3.3 ajouter un titre**

Étape de référence 2.3.3, faites glisser l 'ensemble label sur la page, placez le titre et définissez les attributs correspondants.Figure 20

![20](20.jpg)
(Figure 20)

**3.4 ajouter un nom d 'utilisateur, une zone d' entrée de nom d 'utilisateur, un mot de passe, etc.**

Un composant label est extrait du panneau de ressources pour définir les polices comme "cercle minuscule", la taille de la police fontsize étant "16", l 'alignement Algin pour aligner à gauche "left" et l' affichage du texte text.Sélectionnez label pour copier cinq composants identiques en cliquant sur Ctrl + R.Figure 21

![21](21.jpg)
(Figure 21) Un clic déterminé permet de voir sur la page cinq label identiques, de modifier l 'emplacement inférieur approprié et de modifier le contenu text de chaque label.Figure 22

![22](22.jpg)
(Figure 22)

Affiche le texte, à l 'exception du texte text, tous les autres éléments sont identiques.Le contenu du cadre rouge peut être généré automatiquement lorsque le composant est copié au moyen de raccourcis claviers, sans affecter aucun contenu.Avec le texte devant afficher le contenu, il doit y avoir une boîte de saisie correspondante derrière.Un cadre d 'entrée de texte textinput est sorti du panneau de ressources et placé derrière le nom d' utilisateur.Figure 23

![23](23.jpg)
(Figure 23)

**3.5 ajouter le bouton de soumission et fermer la page**

Un composant button est sorti du panneau de ressources pour être placé en position inférieure, le texte d 'affichage label est défini comme "déposer l' enregistrement" et la variable var s' appelle "btn ` U submit" (désactiver la page d 'enregistrement lorsque vous cliquez sur le bouton).Un bouton d 'arrêt est ensuite inséré dans le panneau de ressources et placé dans le coin supérieur droit pour nommer le nom du bouton d' arrêt "close" (le nom du composant sur la page dialog peut être nommé close, et cliquez sur le composant pour fermer la page dialog) et supprimer le texte label affiché par défaut par le bouton d 'arrêt.Comme le montrent les figures 24 et 25.

![24](24.jpg)
(Figure 24)

![25](25.jpg)
(Figure 25)

##Création d 'une page d' affichage et achèvement de l 'orthographe de la page d' affichage UI

**Création de pages**

L 'étape correspond au 3.1 et le nom de la page devient normaldig, cliquez pour confirmer

**4.2 ajout de composants d 'affichage**

Glisser un composant label depuis le panneau de ressources pour définir la variable var comme "txtcontent" et définir les attributs usuels comme indiqué à la figure 26.

![26](26.jpg)
(Figure 26)

**4.3 ajouter un bouton de détermination et fermer la page**

Conformément à l 'étape 3.5, définir la variable var comme "btn ` U sure" pour le bouton de détermination.Comme le montrent les figures 27 et 28.

![27](27.jpg)
(Figure 27)

![28](28.jpg)
(Figure 28)

##Utilisation de codes pour obtenir les effets des figures 1, 2, 3 et 4

Avant d 'écrire le Code, les ressources sont exportées dans le mode d' édition F12, puis dans le répertoire bin / H5 / RES / Atlas dans le mode d 'édition pour voir si le fichier d' Atlas correspondant a été généré et, dans la négative, pour revenir au mode d 'édition en appuyant sur Ctrl + F12 pour nettoyer et exporter les ressources.(le projet as propose que les promoteurs utilisent le FB ou le FDD comme exemple dans le présent article.

**5.1 articles importés avec du FB**

Étapes du projet importées: ouverture du fichier FB - import du projet flashbuilder (éjection de la sélection du projet importé) - sélection du dossier de projet pour copier le répertoire des projets - achèvement.(non compris, veuillez consulter le document de base)

**5.2 préchargement des ressources et affichage des pages d'accès**

(les ressources de bouton doivent être préchargées!), une fois que la ressource a été préchargée, la page d 'accès est personnalisée lors de l' achèvement du retour de la ressource.Code:


```typescript

package {
	import laya.net.Loader;
	import laya.utils.Handler;
	
	import ui.LoginUI;

	public class LayaSample {
		public function LayaSample() {
			//初始化引擎
			Laya.init(1136, 640);
			//预加载资源
			Laya.loader.load("res/atlas/comp.json",Handler.create(this,onLoaded),null,Loader.ATLAS);
		}		
		//资源加载完成回调
		private function onLoaded():void
		{
			//实例化登陆页面
			var login_ui:LoginUI = new LoginUI();
			//把登陆页面添加到舞台上
			Laya.stage.addChild(login_ui);
		}
	}
}
```


Figure 29

![29](29.jpg)
(Figure 29)

S' il y a beaucoup de manipulations d 'éléments sur la page ui dans le projet réel, il n' est pas recommandé d 'étalonner la page ui directement dans la catégorie d' entrée, il est recommandé de créer une classe logique ui qui héritera de la page ui et de faire fonctionner les éléments à l 'intérieur.Ainsi, le Code modifié crée une page d 'accès qui hérite d' une page ui correspondante, et une page d 'accès personnalisée dans la catégorie d' entrée

Nouvelle classe logique d 'accès, comme le montre la figure 30

![30](30.jpg)
(Figure 30)

Le Code de la catégorie d 'entrée est ensuite modifié comme suit:


```typescript

package {
	import laya.net.Loader;
	import laya.utils.Handler;
	
	import ui.LoginUI;

	public class LayaSample {
		public function LayaSample() {
			//初始化引擎
			Laya.init(1136, 640);
			//预加载资源
			Laya.loader.load("res/atlas/comp.json",Handler.create(this,onLoaded),null,Loader.ATLAS);
		}		
		//资源加载完成回调
		private function onLoaded():void
		{
          	/////修改此处/////
			//实例化登陆页面
			var login_view:LoginView = new LoginView();
			//把登陆页面添加到舞台上
			Laya.stage.addChild(login_view);
		}
	}
}
```


**5.3 ouvrir la page correspondante en ajoutant un événement au bouton d 'accès et d' enregistrement**

Crée une classe logique de pages d 'accès et une classe logique de pages d' enregistrement avant d 'ajouter un événement de clic à un bouton d' enregistrement pour hériter de leurs pages ui respectives et faire fonctionner l 'interface ui correspondante.Comme le montrent les figures 31 et 32

![31](31.jpg)
(Figure 31)

![32](32.jpg)
(Figure 32)

Ouvre la catégorie loginview, ajoute un événement de clic au bouton d 'enregistrement et clique sur le bouton d' enregistrement pour éjecter la page d 'enregistrement.Code:


```typescript

package
{
	import laya.events.Event;
	import ui.LoginUI;

	public class LoginView extends LoginUI
	{
		public function LoginView()
		{
			//给注册按钮添加点击事件
			this.btn_reg.on(Event.CLICK,this,onReg);
		}
		private function onReg(e:Event):void{
			//实例化并弹出注册页面
			var reg:RegDlg = new RegDlg();
			//弹出注册页面
			reg.popup();
		}
	}
}
```


L 'effet obtenu par le code ci - dessus est indiqué à la figure 33 (effet conforme à la figure 2).

![33](33.jpg)
(Figure 33) Fermer la page d 'enregistrement en cliquant sur le bouton d' arrêt

Ajoute un événement de clic au bouton d 'enregistrement de soumission, puis clique sur le panneau d' affichage.Cependant, l 'éjection doit être accompagnée de l' attribution d 'une valeur au contenu de l' infobulle dans le panneau d 'affichage, de sorte que l' on passe d 'abord à la classe normaldig de la page d' infobulle, en ajoutant un procédé ouvert permettant d 'attribuer une valeur au texte tout En ajoutant un événement de clic au bouton de détermination et en cliquant sur la page d' infobulle fermée.Code:


```typescript

package
{
	import laya.events.Event;
	
	import ui.NormalDigUI;

	/**
	 * 提示页面
	 * @author Laya
	 * 
	 */
	public class NormalDig extends NormalDigUI
	{
		public function NormalDig()
		{
			//给确定按钮侦听点击事件，点击后关闭面板
			this.btn_sure.on(Event.CLICK,this,onClick);
		}
		private function onClick(e:Event):void{
			//关闭页面
			this.close();
		}
		public function popupContent(msg:String):void{
			//给文本赋值
			this.txtContent.text = msg;
			//弹出页面
			this.popup();
		}
	}
}
```


Ouvre la page d 'enregistrement regdlg et insère le texte d' affichage "succès d 'enregistrement!"Et code suivant:


```typescript

package
{
	import laya.events.Event;
	import ui.RegDlgUI;
	/**
	 * 注册页面
	 * @author Laya
	 * 
	 */
	public class RegDlg extends RegDlgUI
	{
		public function RegDlg()
		{
			//给提交注册按钮侦听点击事件
			this.btn_submit.on(Event.CLICK,this,onClick);
		}
		private function onClick():void
		{
			//实例化提示页面（目的是为了给提示面板中的文本赋值）
			var dlg:NormalDig = new NormalDig();
			dlg.popupContent("注册成功！");
		}
	}
}
```


Les effets d 'exploitation du Code sont indiqués à la figure 34 ci - dessus (voir la figure III).

![34](34.jpg)
(Figure 34)

**Le Code de corrélation de la page d 'enregistrement est terminé, puis continue d' achever le Code logique de la page d 'accès**

Ouvre la catégorie loginview, enregistre l 'événement de clique pour le bouton d' accès, clique sur la page d 'affichage et affiche les caractères de succès d' atterrissage.Code:


```typescript

package
{
	import laya.events.Event;
	import ui.LoginUI;
	public class LoginView extends LoginUI
	{
		private var dlg:NormalDig;
		public function LoginView()
		{
			//实例化提示面板（目的是为了在点击登陆按钮时给提示页面中的文本赋值）
			dlg = new NormalDig();
			//给注册按钮添加点击事件
			this.btn_reg.on(Event.CLICK,this,onReg);
			//给登陆按钮添加点击事件
			this.btn_login.on(Event.CLICK,this,onLogin);
		}
		private function onReg(e:Event):void{
			//实例化并弹出注册页面
			var reg:RegDlg = new RegDlg();
			//弹出注册页面
			reg.popup();
		}
		private function onLogin(e:Event):void 
		{
			//给提示面板赋值
			dlg.popupContent("登陆成功！");
		}
	}
}
```


L 'effet d' exploitation du code ci - dessus est indiqué à la Figure 35 (comme dans la figure 4).

![35](35.jpg)
(Figure 35)

Ainsi, le présent document d 'accès, d' enregistrement et d 'exemples est achevé, sur la base duquel l' développeur peut réaliser une fonction d 'enregistrement plus complète.Si vous avez des questions, veuillez les soumettre au Forum.[http://ask.layabox.com/](http://ask.layabox.com/)