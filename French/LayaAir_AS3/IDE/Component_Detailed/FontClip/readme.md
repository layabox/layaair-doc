# FontClip 组件参考



## 1、了解FontClip 组件

###1.1 démonstration des effets et des effets de fontclip

Les nouvelles fonctions fontclip du moteur layaair sont plus puissantes et permettent de Commuter rapidement un ensemble d 'icônes, de textes, de nombres personnalisés, etc.Il s' agit d 'une combinaison fonctionnelle entre la lame clip et la police bitmapfont.

Les composants clip ne peuvent afficher qu'un seul contenu en tranches et, lorsqu'il s'agit d'un contenu plus complexe, il faut plusieurs liaisons clip, par exemple pour afficher le compte à rebours "50: 46", et nous avons besoin de cinq combinaisons clip et d'un code logique séparé pour obtenir des résultats.Si l'on utilise l'ensemble fontclip, on n'a besoin que d'un seul composant et on lui attribue une valeur de valeur « 50: 46 », et le code sera beaucoup moins important.

La création de bitmapfont est relativement difficile et nécessite l'utilisation d'un logiciel tiers, dont le style de police est quasiment impossible à produire, qui est plus monotone et ne permet guère d'obtenir les résultats souhaités par les beaux - arts.Avec fontclip, les styles de police, les tailles et les couleurs peuvent être modifiés de manière aléatoire dans le logiciel de traitement d 'images et enrichis en variables.

L 'effet graphique ci - dessous est produit par fontclip (fig. 1), les valeurs assignées peuvent être commutées à l' aide de nombres et de chinois et les styles de police peuvent être modifiés de manière arbitraire.

​![动图1.gif](img/1.gif)< br / > (Figure 1)

​

###1.2 spécifications pour la peau (Skin) des composants fontclip

Les ressources de fontclip sont désignées comme préfixes par le format fontclip \ \ U, et sont constituées d 'un ensemble de ressources comprenant un ensemble de monographies de grande largeur et de grande taille, qui peuvent être rangées en plus si l' image est trop longue, comme indiqué ci - après.

​![图片2.png](img/2.png)< br / >
(Figure 2)

* La peau de l'ensemble fontclip ne peut pas utiliser les attributs de la grille de la neuvième maison, de sorte que la taille de l'application effective doit être déterminée au moment de la conception des ressources.Ou la commande d'agrandissement par scalex, scaley *

###1.3 présentation de l'API du module fontclip

Pour la présentation API de fontclip, voir[http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ui.FontClip](http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ui.FontClip)".





##Création de composants fontclip par layaairide

###2.1 création de fontclip

Les ressources indiquées dans la figure 2 sont appelées fontclip \ \ u num.png, fontclip \ \ u year.png, conformément aux règles de désignation des composants fontclip, et nous avons donc été modifiées en deux rangées en raison de la longueur excessive des ressources dans la figure 2.Sélectionnez dans le dossier de ressources IDE qu 'ils glissent dans l' éditeur de scène et ajoutez la ressource de fond et l 'ensemble label pour obtenir les résultats suivants (fig. 3).

​![图片3.png](img/3.png)< br / >
(Figure 3)



###2.1 adaptation des propriétés Sheet et et value des composants fontclipx

Lorsque les deux composants fontclip sont tirés du gestionnaire de ressources et générés, on sélectionne l 'un d' eux, et on peut voir que les propriétés Sheet et et Value produisent des valeurs par défaut qui ne sont pas entièrement correctes et doivent être modifiées.

​![图片4.png](img/4.png)< br / >
(Figure 4)

**Sheet:** 
Les propriétés usuelles de Sheet sont la "plage de contenu de bitmap" de l 'ensemble, c' est - à - dire un résumé du contenu que nous avons besoin d 'afficher.

Si les ressources de bitmap de l 'ensemble fontclip sont birangées ou multirangées, le contenu Sheet devrait être ajouté à l' espace de commutation dans le diagramme de ressources correspondant, faute de quoi la valeur value serait mal définie.Comme indiqué dans la figure 3, le contenu à insérer dans Sheet doit se lire comme suit: « bonne année du cochon et du cochon chez le rat, le tigre, le serpent, le singe, le chien et la poule », après « le mouton ».

**Valeur:**
Les propriétés courantes de value sont le contenu d 'affichage réel du composant, font partie du contenu de synthèse Sheet et et peuvent être combinées de manière aléatoire avec des sous - éléments du contenu de synthèse.Si la valeur saisie n 'est pas trouvée dans le contenu Sheet, il n' y aura pas d 'affichage.



​![图片5.gif](img/5.gif)< br / >
(Figure 5)



##Commande d 'affichage de commutation d' un composant fontclip par Code

Parmi les étapes de fabrication ci - dessus, nous avons achevé la création et l 'assemblage des composants dans l' IDE et défini la variable fontclip \ \ u num pour l 'année num érique et la variable fontclip \ \ u year pour l' année biographique.Nous allons changer fontclip en Code de programme.

Enregistre la page, affiche la page F12 et crée la catégorie testpageu.as dans le dossier du projet ui, et nous l 'utilisons directement.

Exécutez le Code illustratif ci - après, et nous pouvons voir qu 'il est parfaitement compatible avec l' effet indiqué dans la figure 1.

**Exemple:**


```javascript

package {
	import laya.display.Stage;
	import laya.net.Loader;
	import laya.ui.RadioGroup;
	import laya.utils.Handler;
	import laya.webgl.WebGL;
	
	import ui.test.TestPageUI;
	
	import view.TestView;
	
	public class LayaUISample {
		
		/**包含FontClip组件的测试页面**/
		private var testView:TestPageUI;
  		/**公历年数**/
		private var year:int=2017;
		/**12生肖数组**/
		private var yearArr:Array=["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"];
		private var yearIndex:int=9;
		
		public function LayaUISample() 
		{
			// 不支持WebGL时自动切换至Canvas
			Laya.init(1024, 720, WebGL);
			//画布垂直居中对齐
			Laya.stage.alignV = Stage.ALIGN_MIDDLE;
			//画布水平居中对齐
			Laya.stage.alignH = Stage.ALIGN_CENTER;
			//等比缩放
			Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
			//背景颜色
			Laya.stage.bgColor = "#232628";
			//加载引擎需要的资源
			Laya.loader.load("res/atlas/comp.atlas", Handler.create(this, onLoaded));
		}
		
		private function onLoaded():void {
			//实例UI界面
			testView = new TestPageUI();
			//加载到舞台
			Laya.stage.addChild(testView);

          	//年增加帧循环
			Laya.timer.loop(1000,this,onLoop);
		}
		private function onLoop():void
		{
			//公元年增加
			year++;
			
			//“位图字体切片”年更新
			testView.fontClip_num.value=year.toString();
			//农历生肖年增加
			yearIndex++;
			//12年生肖一轮回
			if(yearIndex>11) yearIndex=0;
			//文本切片更新，新年快乐更新
			testView.fontClip_year.value=yearArr[yearIndex]+"年快乐";
			
			//大于2500年时间停止
			if(year>2500)
			{
				Laya.timer.clearAll(this);
			}
		}
	}
}
```


