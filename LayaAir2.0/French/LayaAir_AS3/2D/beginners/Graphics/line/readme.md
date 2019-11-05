#Dessiner des lignes et des lignes



###Ligne droite

Divers procédés de dessin vectoriel de l 'API peuvent être visualisés dans la catégorie laya.display.graphics.Dans laquelle drawline (); est utilisé pour dessiner une ligne droite du vecteur.La description détaillée de la méthode est présentée dans la figure ci - après:

​![blob.png](img/1.png)< br / >
(Figure 1)

Nous dessinons ci - après une ligne droite avec le moteur layaair.


```java

package
{
    import laya.display.Sprite;
    import laya.display.Stage;
    import laya.webgl.WebGL;
     
    public class Sprite_DrawShapes
    {
        private var sp:Sprite;
         
        public function Sprite_DrawShapes()
        {
            Laya.init(500, 300, WebGL);
            drawSomething();
        }
 
        private function drawSomething():void
        {
            sp = new Sprite();
            Laya.stage.addChild(sp);
            //画直线
            sp.graphics.drawLine(10, 58, 146, 58, "#ff0000", 3);
             
        }
    }
}
```


Après la publication, nous avons dessiné une ligne droite rouge, comme le montre le graphique ci - dessous.

​![blob.png](img/2.png)< br / >
(Figure 2)



###Tracé des lignes

Comment dessiner une ligne?Utiliser directement les drawlines (); la méthode est suffisante.Cette méthode est comparable à celle de drawline et ne doit pas omettre le mot "s" à la fin du Code.Les paramètres de drawlines sont décrits en détail dans la figure ci - après:

​![blob.png](img/3.png)< br / >
(Figure 3)

Nous dessinons ci - après un pli avec le moteur layaair, dont l'exemple est le suivant:



Code Run


```javascript

package
{
    import laya.display.Sprite;
    import laya.display.Stage;
    import laya.webgl.WebGL;
     
    public class Sprite_DrawShapes
    {
        private var sp:Sprite;
         
        public function Sprite_DrawShapes()
        {
            Laya.init(500, 300, WebGL);
            drawSomething();
        }
 
        private function drawSomething():void
        {
            sp = new Sprite();
            Laya.stage.addChild(sp);
            //画折线
            sp.graphics.drawLines(20, 88, [0, 0, 39, -50, 78, 0, 120, -50], "#ff0000", 3);
         
             
        }
    }
}
```


Effets:

​![blob.png](img/4.png)< br / >
(Figure 4)

Par le Code, on peut voir que les paramètres de la ligne linéaire diffèrent de ceux de la ligne linéaire à partir du troisième paramètre, le troisième paramètre étant un ensemble de points de repère du type array, dans lequel le "0" est le point de départ du point de repère a."39, - 50" est la coordonnées de départ du point B."78,0" est le point de départ du point C et "120,50" est le point D.Cependant, il convient de noter que toutes les coordonnées du troisième paramètre sont des coordonnées relatives qui sont affectées par les « 20,88 » des premier et deuxième paramètres.Une fois que le « 20,88 » aura été modifié, le tracé global sera affecté.

Les différences peuvent être ressenties par réglage manuel des paramètres pendant le codage physique.



###Dessiner une ligne droite avec un contrôle de traction layaairide

**Mesure 1**Ouvrez notre layaairide, cliquez sur le modèle de conception et créez une nouvelle page View

​![6](img/5.png)< br / >
(Figure 5)

**Mesure 2**Lorsque vous faites glisser l 'ensemble courbe sur la page view, une ligne droite par défaut est générée automatiquement

​![7](img/6.png)< br / >
(Figure 6)

**Mesure 3**: modifier (ajouter / réduire) Les valeurs des propriétés de l 'ensemble line, modifier la longueur, la largeur, la couleur, etc.

​![8](img/7.png)< br / >
(Figure 7)

​![9](img/8.png)< br / >
(Figure 8)



###Dessiner un pli avec un contrôle de traction layaairide

**Mesure 1**Ouvrez notre layaairide, cliquez sur le modèle de conception et créez une nouvelle page View

​![6](img/5.png)< br / >
(Figure 9)

**Mesure 2**: Si vous faites glisser l 'ensemble courbe dans le composant sur la page view, une ligne par défaut est générée automatiquement

​![7](img/9.png)< br / >
(Figure 10)

**Mesure 3**: modifier (ajouter / réduire) Les valeurs dans les propriétés de l 'ensemble Lines, modifier l' angle, la couleur, la largeur des lignes ou ajouter de nouvelles valeurs de conversion.

​![8](img/10.png)< br / >
(Figure 11)

​![9](img/11.png)< br / >
(Figure 12)

Nous avons ainsi terminé de tracer des lignes et des lignes linéaires à travers les composants de layaairide.