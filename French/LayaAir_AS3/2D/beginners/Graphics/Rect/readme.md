#Dessiner un rectangle et un rectangle



###Dessiner un rectangle à l 'aide d' un procédé drawrect

Recherche dans l 'API`laya.display.Graphics`Différentes méthodes de dessin vectoriel de l 'API peuvent être visualisées dans la classe.Le procédé "drawract ();" est utilisé pour dessiner le rectangle du vecteur.La description détaillée de la méthode est présentée dans la figure ci - après:

​![图片](img/1.png)< br / >
(Figure 1)

Nous dessinons ci - après un rectangle vectoriel avec le moteur layaair, dont l'exemple est le suivant:


```java

package
{
    import laya.display.Sprite;
    import laya.display.Stage;
      
    public class Sprite_DrawShapes
    {
        private var sp:Sprite;
          
        public function Sprite_DrawShapes()
        {
            Laya.init(500, 300);
            drawSomething();
        }
  
        private function drawSomething():void
        {
            sp = new Sprite();
            Laya.stage.addChild(sp);
            //画矩形
            sp.graphics.drawRect(20, 20, 100, 50, "#ffff00");
              
        }
    }
}
```


Fonctionnement du Code:

​![图片](img/2.png)< br / >
(Figure 2)

Dans l 'exemple, les mots "20,20" sont les coordonnées du point de départ rectangulaire, 100 la largeur vers la droite et, dans le cas contraire, la largeur vers la gauche.La hauteur descendante est la hauteur ascendante si le nombre négatif est négatif.On peut faire l 'expérience de l' adaptation des paramètres dans l 'élaboration du Code.



###Dessiner un rectangle avec drawpath

Moteur layaair`laya.display.Graphics`Le procédé de dessin de la classe "drawpath () permet de dessiner des images vectorielles basées sur le trajet, mais aussi, bien sûr, des rectangles rectangulaires et des rectangles circulaires, dont la description détaillée est donnée dans la figure suivante:
​![图片](img/3.png)< br / >
(Figure 3)

Les paramètres de la méthode drawpath sont relativement complexes.Pour faciliter la compréhension, nous avons d 'abord dessiné un rectangle avec le mot "drawpath () pour comprendre certains des paramètres du trajet.

Drawpath trace le rectangle suivant:


```javascript

package
{
    import laya.display.Sprite;
    import laya.display.Stage;
      
    public class Sprite_DrawShapes
    {
        private var sp:Sprite;
          
        public function Sprite_DrawShapes()
        {
            Laya.init(500, 300);
            drawSomething();
        }
  
        private function drawSomething():void
        {
            sp = new Sprite();
            Laya.stage.addChild(sp);
            //自定义路径
            var path:Array =  [
                ["moveTo", 0, 0], //画笔移到A点
                ["lineTo", 100, 0],//画到B点
                ["lineTo", 100, 50],//再画到C点
                ["lineTo", 0, 50], //继续画到D点
                ["closePath"] //闭合路径
            ];
             //绘制矩形
            sp.graphics.drawPath(20, 20, path, {fillStyle: "#ff0000"});
        }
    }
}
```


Fonctionnement du Code:

​![图片](img/4.png)< br / >
(Figure 4)

Les points de coordonnées "20,20" des premier et deuxième bits de drawpath sont des positions initiales de commande de la position globale, et le troisième est un paramètre de trajet.Les informations descriptives "moveto" indiquent que le pinceau se déplace dans sa position initiale et ne commence pas à peindre."0,0" correspond à la position initiale "20,20", de sorte que le point a est toujours à la position initiale.Les informations descriptives "lineto" sont les coordonnées du point de passage et "100,0" sont les coordonnées du point B.Par analogie, les points c et D sont finalement fermés à la position de départ de moveto en décrivant les informations "closepath", faute de quoi ils ne seront pas fermés.

D 'un point de vue rectangulaire, la méthode drawpath n' est certainement pas plus commode.Mais vous pouvez comprendre l 'utilisation des paramètres par cet exemple.Pour les autres images non arrondies, vous pouvez coder vous - même en réglant l 'expérience paramétrique.



###Dessiner un rectangle circulaire avec drawpath

####3.1 description des termes employés

Les moteurs layaair peuvent dessiner des angles ou des lignes d 'arc à l' aide de la méthode drawapath de graphics.`["moveTo", x, y]`Dessiner une ligne droite horizontale`["lineTo", x, y]`Courbe d 'arc`["arcTo", p1.x, p1.y, p2.x, p2.y, r]`".

**Exemples de paramètres**：


```java

["moveTo", 50, 50],
["lineTo", 150, 50],
["arcTo", 200, 50, 200, 100, 50],
```


Les diagrammes d 'impact des paramètres ci - dessus sont les suivants:

![图5-1](img/5-1.png)< br / > (Figure 5 - 1)

La figure 5 - 1 montre que:`["moveTo", 50, 50]`Localiser le point de départ d 'un pinceau`"50,50"`Cette position.`["lineTo", 150, 50]`Dessine une barre allant du point de départ au point d 'extrémité actuel ("`150, 50`") ligne droite.`["arcTo", 200, 50, 200, 100, 50]`Dessiner un passage`r`Rayon`50`Arc

**Courbe d 'arc**- Oui.

Lors de la fabrication de cette ligne, l 'arc utilise en fait le point d' extrémité actuel.`"150, 50"`Point d 'extrémité`"200, 50"`Point d 'extrémité`"200, 100"`, les angles de pince formés par les trois extrémités produisent un segment d 'arc sur un cercle d' un rayon de 50 Px et tangent les deux côtés.



Si nous comprenons le principe de dessin de la ligne d 'arc, nous constatons également que l' élément central de la ligne d 'arc est le Sommet des deux côtés et celui des deux côtés qui forment des angles de fixation (Point 1 dans l' exemple précédent), que le point d 'extrémité 2 dans la Figure 5 - 1 et le bord de l' axe X formé par le point d 'extrémité 1 sont mieux compris et que le point d' extrémité actuel constitue déjà le bord de l 'axe Y.Le point de départ d 'un pinceau doit exister, mais lineto peut l' enlever si`["lineTo", 150, 50],`Si le point de départ est considéré comme l 'extrémité courante et que l' arcto ne trouve pas la ligne droite tracée par lineto, une ligne droite est automatiquement ajoutée du point de départ au point de départ de la ligne, de sorte que lineto peut être omise lors de la dessination d 'un rectangle circulaire.



####3.2 dessiner des exemples de rectangle circulaire

Nous dessinons ci - après un rectangle circulaire d 'un rayon d' arc circulaire de 30, Code illustré:


```java

package
{
    import laya.display.Sprite;
    import laya.display.Stage;
      
    public class Sprite_DrawShapes
    {
        private var sp:Sprite;
          
        public function Sprite_DrawShapes()
        {
            Laya.init(1136, 640);
            drawSomething();
        }
  
        private function drawSomething():void
        {
            sp = new Sprite();
            Laya.stage.addChild(sp);
            //自定义路径
            var path:Array =  [
				["moveTo", 0, 0], //画笔的起始点，
				["arcTo", 500, 0, 500, 30, 30], //p1（500,0）为夹角B，（500,30）为端点p2
				["arcTo", 500, 300, 470, 300, 30],//p1（500,300）为夹角C，（470,300）为端点p2
				["arcTo", 0, 300, 0, 270, 30], //p1(0,300)为夹角D，（0,270）为端点p2
				["arcTo", 0, 0, 30, 0, 30],//p1(0,0)为夹角A，（30,0）为端点p2
			];
             //绘制圆角矩形
            sp.graphics.drawPath(100, 100, path, {fillStyle: "#ff0000"});
        }
    }
}
```


Fonctionnement du Code:

​![图片](img/5-2.png)< br / >
(Figure 5 - 2)

Dans le code ci - dessus, il ne semble pas y avoir de problème, en fait, le point de départ de moveto doit être sur la ligne droite entre les arcs circulaires, et il suffit d 'ajouter une ligne de bordure au dessin de drawpath pour que l' erreur apparaisse clairement.Méthode de dessin


```java

//绘制圆角矩形
sp.graphics.drawPath(100, 100, path, {fillStyle: "#ff0000"},{"strokeStyle":"#ffffff","lineWidth":"10"});
```


L 'effet de fonctionnement modifié est illustré dans la figure 5 - 3, en raison de la ligne, depuis le point de départ du pinceau.`0,0`C 'est pas ce que nous voulons.

![图5-3](img/5-3.png)< br / > (figures 5 à 3)

Nous changerons l'exemple en code correct:


```java

package
{
	import laya.display.Sprite;
	import laya.display.Stage;
	import laya.webgl.WebGL;
	
	public class Main
	{
		private var sp:Sprite;
		
		public function Main()
		{
			Laya.init(1136, 640);
			drawSomething();
		}
		
		private function drawSomething():void
		{
			sp = new Sprite();
			Laya.stage.addChild(sp);
			
			
			//自定义路径
			var path:Array =  [
				["moveTo", 30, 0], //画笔的起始点，
				["arcTo", 500, 0, 500, 30, 30], //p1（500,0）为夹角B，（500,30）为端点p2
				["arcTo", 500, 300, 470, 300, 30],//p1（500,300）为夹角C，（470,300）为端点p2
				["arcTo", 0, 300, 0, 270, 30], //p1(0,300)为夹角D，（0,270）为端点p2
				["arcTo", 0, 0, 30, 0, 30],//p1(0,0)为夹角A，（30,0）为端点p2
			];
			//绘制圆角矩形
			sp.graphics.drawPath(100, 100, path, {fillStyle: "#ff0000"},{"strokeStyle":"#ffffff","lineWidth":"10"});

		}
	}
}
```


Les effets opérationnels sont illustrés dans les figures 5 à 4:

![图5-4](img/5-4.png)(figures 5 à 4)





###Dessiner un rectangle avec un contrôle de traction layaairide

​**Mesure 1**Ouvrez notre layaairide, cliquez sur le modèle de conception et créez une nouvelle page View

​![6](img/6.png)< br / >
(Figure 6)

**Mesure 2**: Si vous faites glisser l 'ensemble courbe dans le composant sur la page view, une courbe par défaut est générée automatiquement

​![7](img/7.png)< br / >
(Figure 7)

**Mesure 3**: modifier (ajouter / réduire) Les valeurs dans les propriétés de l 'ensemble Rect, modifier la taille du rectangle, la couleur, l' angle de rotation, etc.

​![8](img/8.png)< br / >
(Figure 8)

​![9](img/9.png)< br / >
(Figure 9)

Nous avons fini de dessiner le rectangle par l 'intermédiaire des composants de layaairide.
