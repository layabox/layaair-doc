#Dessiner un secteur et un cercle



###Dessiner un cercle

Le dessin circulaire est plus simple à comprendre et peut facilement être réalisé par l 'intermédiaire des coordonnées et rayons du point central circulaire du moteur layaair laya.display.graphics, le « drawcircle () » de l' API.La description détaillée de la méthode est présentée dans la figure ci - après:

​![blob.png](img/1.png)< br / >
(Figure 1)

Nous dessinons ci - après un cercle avec le moteur layaair.


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
            //画圆
            sp.graphics.drawCircle(80,80,50,"#ff0000");
              
        }
    }
}
```


L 'effet de fonctionnement du Code est illustré dans le graphique suivant:

​![blob.png](img/2.png)< br / >
(Figure 2)

Le dessin circulaire est relativement simple et les coordonnées du point central circulaire "80,80"."50 rayons."#F0000 "est la couleur de remplissage circulaire.



###Secteur de dessin

On trouvera ci - après une description plus détaillée de la méthode de dessin sectoriel "drawpie ()", qui est un peu plus complexe que la forme circulaire, comme le montre la figure suivante:

​![blob.png](img/3.png)< br / >
(Figure 3)

Nous dessinons ci - après un secteur avec le moteur layaair.


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
            //画扇形
            sp.graphics.drawPie(80,80,50,90,180,"#ff0000");
              
        }
    }
}
```


L 'effet de fonctionnement du Code est illustré dans le graphique suivant:

​![blob.png](img/4.png)< br / >
(Figure 4)
Le secteur de dessin est semblable à celui du cercle, les trois premiers paramètres étant utilisés de la même manière, à l 'exception de l' ajout d 'un angle de début et de fin de dessin.Pour une meilleure compréhension, les codes de dessin et les paramètres du secteur suivent l 'exemple du Code circulaire et, à l' exception de la modification du nom de la méthode, seuls 90 et 180 paramètres angulaires ont été ajoutés.Vous pouvez mieux comprendre en ajustant les paramètres pendant le codage.



###Dessiner le cercle à travers le contrôle de traction layaairide

**Mesure 1**Ouvrez notre layaairide, cliquez sur le modèle de conception et créez une nouvelle page View

​![6](img/5.png)< br / >
(Figure 5)

**Mesure 2**: Si vous faites glisser l 'ensemble courbe sur la page view, vous créez automatiquement un cercle par défaut

​![7](img/6.png)< br / >
(Figure 6)

**Mesure 3**: modifier (ajouter / réduire) Les valeurs des propriétés de l 'ensemble Circle, modifier la taille du cercle, les couleurs, les cadres, etc.

​![8](img/7.png)< br / >
(Figure 7)

​![9](img/8.png)< br / >
(Figure 8)



###Dessiner un secteur par glisser le contrôle de layaairide

**Mesure 1**Ouvrez notre layaairide, cliquez sur le modèle de conception et créez une nouvelle page View

​![6](img/5.png)< br / >
(Figure 9)

**Mesure 2**Lorsque vous faites glisser l 'ensemble courbe sur la page view, vous créez automatiquement un secteur par défaut

​![7](img/9.png)< br / >
(Figure 10)

**Mesure 3**: modifier (ajouter / réduire) Les valeurs dans les propriétés de l 'ensemble pie, modifier l' angle, la taille, la couleur du secteur, etc.

​![8](img/10.png)< br / >
(Figure 11)

​![9](img/11.png)< br / >
(Figure 12)

Nous avons fini par dessiner les secteurs et les cercles par l 'intermédiaire des composants de layaairide.