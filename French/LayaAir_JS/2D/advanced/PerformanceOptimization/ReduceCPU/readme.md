# 减少CPU使用量



### **Réduction de la recherche d 'attributs dynamiques**

Tout objet dans JavaScript est dynamique et vous pouvez ajouter des attributs à votre gré.Cependant, la recherche d 'un attribut dans un grand nombre de propriétés peut prendre du temps.Si une valeur d 'attribut doit être fréquemment utilisée, une variable locale peut être utilisée pour l' enregistrer:


```javascript

function foo()
{
    var prop = target.prop;
    // 使用prop
    process1(prop);
    process2(prop);
    process3(prop);
}
```




###Chronométreur

Layaair fournit deux cycles de chronométrage pour exécuter le bloc de code.

Un.`Laya.timer.frameLoop`La fréquence d 'exécution dépend de la fréquence de trame et la fréquence de trame active peut être consultée par stat.fps.


Deux.`Laya.timer.loop`La fréquence d 'exécution dépend de la durée spécifiée par le paramètre.




```javascript

Laya.timer.frameLoop(1, this, animateFrameRateBased);
Laya.stage.on("click", this, dispose);
function dispose() 
{
    Laya.timer.clear(this, animateFrameRateBased);
}
```


À la fin du cycle de vie d'un objet, effacez le Timer intérieur:



 

 



### **Acquisition de pratiques pour afficher les limites des objets**

Dans la configuration relative, il est souvent nécessaire d 'obtenir correctement les limites de l' objet affiché.Il existe également de nombreuses façons d'obtenir les limites des objets affichés, et il est important de connaître les différences entre eux.

Un.**Utilisez les getbounds / getgraphicbounds.**



   
```javascript

   var sp = new Sprite();
   sp.graphics.drawRect(0, 0, 100, 100, "#FF0000");
   var bounds = sp.getGraphicBounds();
   Laya.stage.addChild(sp);
   ```


Les getbounds peuvent répondre à la plupart des besoins, mais ne sont pas adaptés à des appels fréquents en raison de la nécessité de calculer les limites.

Deux.**Définit l 'autosize comme vrai.**


```javascript

var sp = new Sprite();
sp.autoSize = true;
sp.graphics.drawRect(0, 0, 100, 100, "#FF0000");
Laya.stage.addChild(sp);
```


Ce code permet d 'obtenir une largeur correcte lors de l' exécution.Autosize recalcule la largeur lorsqu 'elle obtient une hauteur élevée et affiche une modification de l' état de la liste (autosize calcule la largeur par getboudns).Il n 'est donc pas souhaitable d' appliquer autosize à des récipients ayant un grand nombre de sous - objets.Si le Size est défini, autosize ne fonctionnera pas.

​**La largeur de la largeur est obtenue après l 'utilisation de l' image loadimage:**


```javascript

var sp = new Sprite();
sp.loadImage("res/apes/monkey2.png", 0, 0, 0, 0, Handler.create(this, function()
{
    console.log(sp.width, sp.height);
}));
Laya.stage.addChild(sp);
```


La hauteur de largeur ne peut être obtenue correctement que lorsque la fonction de retour remplie est déclenchée.

Trois.**Appelle les paramètres size:**


```javascript

Laya.loader.load("res/apes/monkey2.png", Handler.create(this, function()
{
    var texture = Laya.loader.getRes("res/apes/monkey2.png");
    var sp = new Sprite();
    sp.graphics.drawTexture(texture, 0, 0);
    sp.size(texture.width, texture.height);
    Laya.stage.addChild(sp);
}));
```


L 'utilisation de graphics.drawtexture ne réglera pas automatiquement la largeur du récipient, mais peut l' attribuer au récipient à l 'aide de la largeur de texture.Il ne fait aucun doute que c'est le moyen le plus efficace.

**Note: getgraphicsbounds est utilisé pour obtenir une largeur vectorielle élevée.**



### **Modification de fréquences de trames en fonction de l 'état d' activité**

Il y a trois modes de fréquences de trame.

##- stage.frame.u slow maintenance FPS at 30;Stage.frame.u Fast maintenance FPS 60;
- stage.frame \ \ \ \ \ \ \ \ \ \ \ \ \ \ \



Parfois, il n 'est pas nécessaire que le jeu soit exécuté au rythme de 60fps, car les 30fps sont déjà en mesure de répondre à la plupart des cas à la vue humaine, mais lorsque la souris interagit, le 30fps risque de créer des incohérences dans l' image, d 'où l' apparition de stage.frame.u Mouse.

Affiche l 'exemple suivant pour déplacer la souris sur la toile à l' échelle de la trame stage.frame.u.


```javascript

Laya.init(Browser.width, Browser.height);
Stat.show();
Laya.stage.frameRate = Stage.FRAME_SLOW;
  
var sp = new Sprite();
sp.graphics.drawCircle(0, 0, 20, "#990000");
Laya.stage.addChild(sp);
  
Laya.stage.on(Event.MOUSE_MOVE, this, function()
{
    sp.pos(Laya.stage.mouseX, Laya.stage.mouseY);
});
```


​![图片1.png](img/1.png)< br / >
(Figure 1)

Le FPS affiche alors 30 et, lorsque la souris se déplace, la mise à jour de la position du globe n 'est pas cohérente.Définir stage.framerate pour stage.frame \ \ u Mouse:


```javascript

Laya.stage.frameRate = Stage.FRAME_MOUSE;
```


​![图片1.png](img/2.png)< br / >
(Figure 2)

Le FPS affiche alors 60% après le déplacement de la souris et augmente la fluidité de l 'image.Après 2 secondes de repos de la souris, le FPS revient à 30 trames.



### **V. Utilisation de calllater**

Calllater retarde l 'exécution du bloc de code jusqu' au rendu de la trame.Si l 'opération courante modifie fréquemment l' état d 'un objet, on peut alors envisager d' utiliser calllater pour réduire les calculs répétés.

Si l 'on envisage une image, tout changement d' attribut de son apparence entraînera un remaniement de l 'image:


```javascript

var rotation = 0,
scale = 1,
position = 0;
  
function setRotation(value)
{
    this.rotation = value;
    update();
}
  
function setScale(value)
{
    this.scale = value;
    update();
}
  
function setPosition(value)
{
    this.position = value;
    update();
}
  
function update()
{
    console.log('rotation: ' + this.rotation + '\tscale: ' + this.scale + '\tposition: ' + position);
}
```


Modifier l 'état en utilisant le code suivant:


```javascript

setRotation(90);
setScale(2);
setPosition(30);
```


Les résultats de l 'impression du console sont les suivants:


```javascript

rotation: 90scale: 1position: 0
rotation: 90scale: 2position: 0
rotation: 90scale: 2position: 30
```


Update a été appelée trois fois et le résultat final est correct, mais aucun des deux appels précédents n 'a été nécessaire.

Essayer de remplacer les trois Update par le texte suivant:


```javascript

Laya.timer.callLater(this, update);
```


En ce moment, Update n 'appellera qu' une seule fois et c 'est ce que nous voulons.



### **Chargement d 'images / d' images**

Une fois le chargement d 'images / d' images terminé, le moteur commence à traiter les ressources d 'images.Si vous chargez une image, chaque sous - image sera traitée.Si un grand nombre d 'images sont traitées en une seule fois, le processus peut déboucher sur une longue période de carden.

Dans le chargement de ressources du jeu, les ressources peuvent être chargées selon les niveaux, les scènes, etc.Les images traitées en même temps sont meilleures, et la vitesse de réponse du jeu sera plus rapide.Une fois les ressources utilisées, la mémoire peut également être déchargée et libérée.


 