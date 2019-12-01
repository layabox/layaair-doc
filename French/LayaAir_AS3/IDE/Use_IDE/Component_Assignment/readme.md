##Attribution dynamique de composants

Les valeurs fixes générales, dans le paramétreur d 'attributs de l' IDE, sont configurées pour le composant, mais, dans de nombreux cas, par exemple, les composants de liste (List), il est nécessaire d 'attribuer une valeur dynamique au composant.Nous commençons par présenter comment modifier dynamiquement les propriétés du composant.

DATASOURCE est l 'un des attributs fondamentaux des composants définis par la classe Component, que toutes les catégories de composants dérivées de la classe Component ont mis en oeuvre, et que nous comptons sur lui pour obtenir une valeur dynamique.Le mode d 'attribution de données avec des attributs par défaut et le mode d' attribution de attributs spécifiés sont présentés ci - après sous forme d 'exemples.

###3.1 créer un ui simple

**Éditer UI**

Créer un`ComponentDemo.ui`Et ouvre la page ui.Et nous allons`资源管理器`Un.`label`Ensemble et un`clip`Intégration de composants`场景编辑器`, définissez enfin les attributs initiaux.

`var`Pour attribuer une valeur dynamique à un composant dans un code de projet, il faut passer par`var`Paramétrer la variable globale.Ici, nous allons`label`Paramétrage var d 'un composant`lab`Oui.`clip`Paramétrage var d 'un composant`numb`".

Par défaut`label`Pour faciliter la démonstration, nous allons`label`Composant`fontSize`Valeur d 'attribut`50`".

Idem`clip`Assemblage de tranches`0-9`Il y a dix nombres, donc nous devons aussi faire le nombre d'axes X de la Section de bitmap.`clipX`Définir comme`10`Oui.

Une fois que les attributs initiaux ont été définis, les effets dans l 'IDE sont indiqués dans la figure 4.

![图4](img/4.png)< br / > (Figure 4)

**Codage**

Après avoir exporté l 'ui à l' aide de raccourcis clavier F12, nous passons au mode de codage du projet pour créer une catégorie d 'entrée componentdemo.as (définie comme une application par défaut).Codage suivant:


```java

package
{
	import laya.ui.Image;
	import laya.utils.Handler;
	import laya.webgl.WebGL;	
	import ui.ComponentDemoUI;

	public class ComponentDemo
	{
		public function ComponentDemo()
		{
			Laya.init(1334,750, WebGL);
			Laya.stage.bgColor = "#ffffff";
			//加载图集成功后，执行onLoad回调方法
			Laya.loader.load("res/atlas/comp.atlas", Handler.create(this, onLoaded));
		}
		
		private function onLoaded():void {
			//创建一个UI实例
			var comp:ComponentDemoUI = new ComponentDemoUI();

			//添加到舞台上显示
			Laya.stage.addChild(comp);
		}
	}
}
```


L 'effet d' exécution sur la page avec l 'IDE est un à un, comme le montre la figure 5:

![图5](img/5.png)< br / > (Figure 5)



####3.1.2 attribution d 'un composant par attribution d' attributs par défaut

Il y a une propriété par défaut dans l 'ensemble de base de ceinture d' identification qui attribue directement les attributs par défaut à l 'ensemble par l' intermédiaire d 'une source de données, sans qu' il soit nécessaire de spécifier le nom de l 'attribut du composant, ce qui facilite l' utilisation de Cette méthode d 'attribution si les attributs par défaut du composant sont simplement modifiés dynamiquement.

Nous donnons ci - après une valeur aux composants par défaut de la figure 5.Le Code modifié est le suivant:


```java

package
{
	import laya.ui.Image;
	import laya.utils.Handler;
	import laya.webgl.WebGL;	
	import ui.ComponentDemoUI;

	public class ComponentDemo
	{
		public function ComponentDemo()
		{
			Laya.init(1334,750, WebGL);
			Laya.stage.bgColor = "#ffffff";
			//加载图集成功后，执行onLoad回调方法
			Laya.loader.load("./res/atlas/comp.atlas", Handler.create(this, onLoaded));
		}
		
		private function onLoaded():void {
			//创建一个UI实例
			var comp:ComponentDemoUI = new ComponentDemoUI();
			
			//为label组件设置组件默认属性值
			comp.lab.dataSource = "LayaAir";
			
			//为clip组件设置组件默认属性值
			comp.numb.dataSource = 6;
			
			//添加到舞台上显示
			Laya.stage.addChild(comp);
		}
	}
}
```


Les effets de fonctionnement sur la page sont indiqués à la figure 6:

![图6](img/6.png)< br / > (Figure 6)

Par l 'Annotation du Code, nous voyons que l' attribution du composant n 'est effectuée que par un code simple.Cependant, si l 'on compare soigneusement, il est facile de découvrir que les propriétés par défaut du composant label sont text et que les propriétés par défaut du composant clip sont index.Alors la question est: Quelles sont les propriétés par défaut des autres composants?

Voici une liste des attributs par défaut du composant

"Nom de l 'assemblage \ \ \ \ \ \ \ \ \ \ \ \ \
124 ---------------------------------------------------------------------------------------
124. Button 124.
124... Linkbutton... 124... 124...
124, radiobutton, 124, & 124.
124. Label 124.
124, textinput \ \ 124
124 textarea \ \ 124
"124. Combox \ \ 124.
124. Tab 124. Selectedindex \ \ 124.
124, Groupe Radio \ \ 124, \ \ selectedindex \ \ 124.
124 \ \ viewstack \ \ 124.
124, list \ \ 124, \ \ selectedindex \ \ 124
124, \ \ clip \ \ 124.
124, progressbar \ \ 124, valeur \ \ 124
124. Scroll \ \ 124.
124. Slider \ \ 124.
124 \ \ checkbox \ \ 124
124, image \ \ 124.



###3.1.3 attributs spécifiés pour l'attribution de composants