#Références de composants progressbar



##Création d 'un module progressbar par layaairide

###1.1 Création de progressbar

Progressbar est souvent utilisé pour afficher l 'avancement d' une opération dans un jeu, par exemple l 'avancement des ressources chargées, l' expérience du rôle ou l 'avancement du volume sanguin.
Cliquez sur l 'ensemble progressbar dans le panneau de ressources de sélection et faites glisser - le dans la zone d' édition de page, ce qui permet d 'ajouter l' ensemble progressbar à la page.
Référence d 'interface de script de progressbar[ProgressBar API](http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ui.ProgressBar)".

Exemples de ressources du module progressbar:

​![图片0.png](img/1.png)< br / >
(Figure 1)

​![图片0.png](img/2.png)< br / >
(Figure 2)

Après avoir défini une valeur de valeur de 0,3 pour les propriétés de l 'ensemble progressbar, l' effet s' affiche comme suit:

​![图片0.png](img/3.png)< br / >
(Figure 3)



  



###1.2 caractéristiques communes des composants progressbar

​![图片0.png](img/4.png)< br / >
(Figure 4)

- 124.**Attribut**- 124.**Description fonctionnelle**- 124.
124 -----------------------------------------------------------------------------------------------------------
Les données de grille sont mises à l 'échelle de manière efficace pour les ressources d' image de la barre d 'avancement.- 124.
La ressource d 'image de la barre d' avancement.- 124.
La valeur de progression de la barre d 'avancement \ \ \ \ \ \ \ \ \ \ \ \ \ - 124.



 



##Création de progresbar par Code

Quand on écrit le Code, on contrôle l 'ui par le Code, on crée la classe Ui U progressbar, on l' introduit dans le Code.`laya.ui.ProgressBar`Et définit les attributs associés au progressbar par l 'intermédiaire du Code.

**Exécution de l 'exemple:**
​![5](gif/1.gif)< br / >
Figure 5 création de progressbar par Code

D 'autres attributs de progressbar peuvent également être définis au moyen d' un code qui montre comment créer un progressbar à partir d 'un code pour différentes peaux (Styles), les lecteurs intéressés pouvant définir eux - mêmes le progresbar au moyen du Code pour créer une barre de progression adaptée à leurs besoins.

**Exemple:**


```javascript

package
{
	import laya.display.Stage;
	import laya.ui.ProgressBar;
	import laya.utils.Handler;
	import laya.webgl.WebGL;
	
	public class UI_ProgressBar
	{
		private var progressBar:ProgressBar;
		
		public function UI_ProgressBar()
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
			Laya.loader.load(["../../../../res/ui/progressBar.png", "../../../../res/ui/progressBar$bar.png"], Handler.create(this, onLoadComplete));
		}
		
		/***加载资源完成***/
		private function onLoadComplete():void
		{
			//实例化进度条
			progressBar = new ProgressBar("../../../../res/ui/progressBar.png");
			//设置宽度
			progressBar.width = 400;
			//设置显示位置，在舞台居中
			progressBar.x = (Laya.stage.width - progressBar.width ) / 2;
			progressBar.y = Laya.stage.height / 2;
			
			//设置九宫格边距，以防变形
			progressBar.sizeGrid = "5,5,5,5";
			//数据改变时回调方法
			progressBar.changeHandler = new Handler(this, onChange);
			//加载到舞台
			Laya.stage.addChild(progressBar);
			
			//时间间隔循环，每100毫秒改变一次数据
			Laya.timer.loop(100, this, changeValue);
		}
		
		/***时间间隔循环回调，更新进度条***/
		private function changeValue():void
		{
			//最大为1，每次间隔更新5%
			if (progressBar.value >= 1)
				progressBar.value = 0;
			progressBar.value += 0.05;
		}
		
		/***进度条数据改变回调***/
		private function onChange(value:Number):void
		{
			trace("进度：" + Math.floor(value * 100) + "%");
		}
	}
}
```


