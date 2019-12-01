#Developing difference between layaair Engine AS3 and Flash original AS3

Les moteurs layaair soutiennent le développement des jeux HTML5 dans la langue Flash AS3, mais les développeurs doivent noter que le moteur layaair n'est pas soutenu par l'API original de flash AS3 et que, layaair ayant lui - même une API très complète et puissante, le moteur n'appuie que le développement des produits HTML5 en utilisant la grammaire de base AS3.En particulier, pour les promoteurs ayant une expérience de développement de flash AS3 d'origine, outre l'API, les différences suivantes doivent être prises en compte: il y a un petit nombre d'utilisations de flash AS3 qui ne sont pas non plus disponibles à layaair.



##I) Le moteur layaair ne supporte pas l'int ();

Lorsqu 'ils utilisent le moteur layaair, attention à ne plus utiliser l' int () qui n 'est pas pris en charge dans le moteur layaair et qui peut être remplacé par parseint () Si le développement des fonctions correspondantes l' exige.

**Exemples de supports d 'origine AS3 qui ne sont pas appuyés par le moteur layaair:**


```java

var a:int = int(1.5);//int对浮点数取整在原生Flash开发中支持，LayaAir中不被支持
```


**Exemples d'utilisation correcte des moteurs layaair:**


```java

var a:int = parseInt(1.5)//对浮点数取整，LayaAir引擎中需要采用parseInt方法
```






##Différences d 'utilisation des masques Mask

Dans le moteur layaair, l'utilisation de Mask a deux points à examiner.

Mask est ajouté à l 'intérieur de l' objet affiché, c 'est - à - dire que les coordonnées Mask sous layaair sont opposées à l' objet masqué et non à la scène.

Si le masque est dynamique, il est nécessaire d 'appeler le procédé de repaint () de l' objet masqué.

Voici la différence par Code.



###2.1 masques statiques

**Exemples de supports d 'origine AS3 qui ne sont pas appuyés par le moteur layaair:**


```java

var sp:Sprite=new Sprite();
sp.graphics.beginFill(0xFFFF00);
sp.graphics.drawRect(0,0,200,200);
sp.graphics.endFill();
addChild(sp);
 
var mask:Sprite=new Sprite();
mask.graphics.beginFill(0xFF0000);
mask.graphics.drawCircle(0,0,50);
mask.pos(100,100)
mask.graphics.endFill();
sp.mask=mask
```




**Exemples d'utilisation correcte des moteurs layaair:**


```java

Laya.init(600,400)
var sp:Sprite=new Sprite();
sp.graphics.drawRect(0,0,200,200,'#FFFF00');
Laya.stage.addChild(sp);
 
var mask:Sprite=new Sprite();
mask.graphics.drawCircle(0,0,50,'#FF0000');
mask.pos(sp.x+100,sp.y+100)
sp.mask=mask;
```




###2.2 masques dynamiques

**Exemples de supports d 'origine AS3 qui ne sont pas appuyés par le moteur layaair:**


```java

var sp:Sprite=new Sprite();
sp.graphics.beginFill(0xFFFF00);
sp.graphics.drawRect(0,0,200,200);
sp.graphics.endFill();
addChild(sp);
 
var mask:Sprite=new Sprite();
mask.graphics.beginFill(0xFF0000);
mask.graphics.drawCircle(0,0,50);
mask.graphics.endFill();
sp.mask=mask;
 
addEventListener(Event.ENTER_FRAME,function():void
{
    mask.x++;
    mask.cacheAsBitmap=true;
    sp.cacheAsBitmap=true;
});
```




**Exemples d'utilisation correcte des moteurs layaair:**


```java

Laya.init(600,400)
var sp:Sprite=new Sprite();
sp.graphics.drawRect(0,0,200,200,'#FFFF00');
Laya.stage.addChild(sp);
 
var mask:Sprite=new Sprite();
mask.graphics.drawCircle(0,0,50,'#FF0000');
sp.mask=mask;
 
Laya.timer.frameLoop(1,this,function():void
{
    mask.x++;
    sp.repaint();
});
```




##Iii. Différences régionales de clics d 'événements d' enregistrement d 'images vectorielles graphiques graphiques graphiques graphiques graphiques graphiques graphiques Graphics établies par Sprite elle - même;

Dans l 'original Flash AS3, la largeur est calculée automatiquement après la création de l' elfe Sprite.Dans le moteur layaair, cependant, pour économiser les performances, le schtroumpf par défaut n 'a pas de largeur élevée et il est nécessaire d' établir une zone de collision pour Sprite, c 'est - à - dire hitarea ou size.



**Exemples de supports d 'origine AS3 qui ne sont pas appuyés par le moteur layaair:**


```java

var sprite:Sprite = new Sprite();
sprite.graphics.beginFill(0xffcc00);
sprite.graphics.drawRect(100,100,100,100);
sprite.graphics.endFill();
addChild(sprite);
sprite.addEventListener(MouseEvent.CLICK,onClick);
function onClick(evt:MouseEvent):void
{
    trace("------aaa---------");
 }
```




**Exemples d'utilisation correcte des moteurs layaair:**

Option 1:


```java

var sprite:Sprite = new Sprite();
 
sprite.graphics.drawRect(100,100,100,100,"#ff9900");
var hitarea:HitArea = new HitArea();
var graphics:Graphics = new Graphics();
graphics.drawRect(100,100,100,100,"#ff9900");
hitarea.hit = graphics;
sprite.hitArea = hitarea;
```


Option 1:


```java

var sprite:Sprite = new Sprite();
 
sprite.graphics.drawRect(0,0,100,100,"#ff9900");
sprite.size(100,100);
Laya.stage.addChild(sprite);
sprite.on(Event.CLICK,this,onClick);
function onClick(evt:Event):void
{
    trace("-------click--------");
}
```




##Différences dans la distribution des objets d 'événement

En ce qui concerne l 'envoi de l' objet de l 'événement, il s' agit essentiellement de différences de grammaire.Le moteur layaair a été rationalisé et enrichi en fonction des mots clefs et des paramètres du procédé.Layaair peut transporter des données en même temps que les événements d'envoi et d'écoute, par exemple l'objet d'envoi. Event ("type d'événement personnalisé", [source de données]), l'objet d'écoute. On ("type d'événement", "domaine d'exécution de la fonction d'écoute d'événement", "fonction d'écoute d'événement", "paramètres de retour".



**Exemples de supports d 'origine AS3 qui ne sont pas appuyés par le moteur layaair:**

**Envoi:**


```javascript

dispatchEvent(event:Event);
```


**Écoutez:**  


```javascript

addEventListener(type,listener,useCapture,priority,useWeakReference));
```




**Exemples d'utilisation correcte des moteurs layaair:**

**Envoi:**


```

派发对象.event(type:String,data:*=null);
```


**监听:**  


```

派发对象.on(type,caller,listener,args);
```




##V. différences entre layaair et AS3

Sprite peut être directement héritée de l'API d'origine Flash AS3, mais l'entrée principale des documents dans le moteur layaair (avant le moteur d'initialisation) ne peut pas lui succéder directement, et la succession de Sprite selon la coutume AS3 entraîne une erreur de déclaration.



**Erreur:**


```

package  {
    import laya.display.Sprite;
     
    //extends Sprite在LayaAir引擎初始化之前继承会报错
    public class HelloLayabox extends Sprite {
        public function HelloLayabox() 
        {
            Laya.init(0,0);
        }
    }
```




**La bonne formule:**


```

package  {
    import laya.display.Sprite;
      
    public class HelloLayabox{
        public function HelloLayabox() 
        {
            Laya.init(0,0);
        }
    }
```






