#Detailed Decomposition: gyroscope and Accelerator

[toc]

Il existe quatre catégories pour les développeurs: accelerationinfo, Accelerator, gyroscope et rotationinfo.On trouvera dans la présente section une description détaillée des éléments pertinents de laya.defice.motion-api.

##Gyroscope

​`Gyroscope`Passer`change`L 'événement surveille le changement de direction du dispositif.L'événement a deux paramètres de retour:

##- Oui.`absolute`- si l 'emplacement fourni par l' équipement est basé sur la différence entre le système de coordonnées de l 'équipement et le système de coordonnées terrestres, est`true`• Si l'équipement ne détecte pas le système de coordonnées terrestres,`absolute`Pour`false`". `rotationInfo`- type rotationinfo, comprenant`alpha`,`beta`,`gamma`Trois valeurs sont examinées en détail ci - après.

​`alpha`,`beta`Et`gamma`Les attributs doivent indiquer l 'orientation de l' appareil, sous la forme d 'une conversion d' un système de coordonnées fixé sur la terre à un système de coordonnées fixé sur l 'appareil.Les coordonnées doivent être ajustées en fonction de la description suivante.

Le système de coordonnées terrestres est un système "est, Nord, haut" situé dans la position de l 'utilisateur.Il dispose de trois axes reliés au sol à la localisation de spheriod du GEOSS 1984.

- Est (X) au sol, perpendiculaire à l'axe Nord et droit à l'Est.

- Nord (y) au sol, droit vers le Nord (vers l'Arctique).

- le haut (z) est perpendiculaire au sol et droit en haut.

Pour un dispositif mobile, tel qu 'un téléphone ou une plaque plate, le système de coordonnées du dispositif est défini en fonction de la direction standard de l' écran.Si le sens de l 'écran change lors de la rotation ou du déploiement du clavier coulissant du dispositif, cela n' affecte pas la direction du système de coordonnées du dispositif.

- X sur l'écran ou sur le plan du clavier, sur le côté droit de l'écran ou du clavier.

- sur l'écran ou le clavier, au - dessus de l'écran ou du clavier.

- Z verticalement sur l'écran ou le clavier et hors de l'écran ou du clavier.

La rotation doit être effectuée à l 'aide de la règle de la main droite, c' est - à - dire en rotation directe le long d 'un axe vers une rotation de l' aiguille dans le sens de l 'axe.À partir de la convergence des deux systèmes, la rotation applique les règles suivantes:

Un.####Axe Z du système de coordonnées du dispositif, rotation`alpha`Degré`alpha`Champ d 'action

![blob.png](img/1.png)< br / >
(Figure 1)

Deux.####Axe X du système de coordonnées du dispositif, rotation`beta`Degré`beta`Le champ d 'action est [- 180].

![blob.png](img/2.png)< br / >
(Figure 2)

Trois.####Axe Y, rotation`gamma`Degré`gamma`Le champ d 'action est [- 90].

![blob.png](img/3.png)< br / >
(Figure 3)
Pour obtenir des informations d'orientation de rotation:


```typescript

Laya.init(550, 400);

this.info = new Laya.Text();
this.info.fontSize = 50;
this.info.color = "#FFFFFF";
this.info.size(Laya.stage.width, Laya.stage.height);
 Laya.stage.addChild(this.info);

 Laya.Gyroscope.instance.on(Laya.Event.CHANGE, this, onDeviceorientation);

function onDeviceorientation(absolute, rotationInfo) {
    this.info.text =
        "alpha:" + Math.floor(rotationInfo.alpha) + '\n' +
        "beta :" + Math.floor(rotationInfo.beta) + '\n' +
        "gamma:" + Math.floor(rotationInfo.gamma);
}
```




##Accélérateur

​`Accelerator`Type de matériel de transmission périodique de détection d 'activité par capteur de mouvement.Les données indiquent le mouvement du dispositif sur l 'axe tridimensionnel.Lorsque le dispositif se déplace, le capteur détecte le mouvement et renvoie les coordonnées d 'accélération du dispositif.Des coordonnées d 'accélération comprenant la gravité peuvent être obtenues même en temps de repos.

​`change`La fonction de retour d 'événement possède les paramètres suivants:

##- Oui.`acceleration`Notes`AccelerationInfo`TypeFourniture d 'informations d' accélération d 'un dispositif hôte par rapport à un système de coordonnées terrestres, sous la forme d' un système de coordonnées primaires défini dans un chapitre de gyroscope`m/s^2`". `accelerationIncludingGravity` —— `AccelerationInfo`TypeLa mise en oeuvre de données d 'accélération qui ne permettent pas d' éliminer les effets de la gravité (par exemple, l 'absence de gyroscope) peut être remplacée par des données d' accélération qui sont affectées par la gravité.Cela n'est pas très utile pour de nombreuses applications, mais la fourniture de ces informations signifie qu'il y a un maximum d'appui.Dans ce cas,`accelerationIncludingGravity`Les attributs fournissent des informations d 'accélération pour le dispositif hôte et ajoutent une accélération de gravité inverse dans une direction égale d' accélération.Il se présente sous la forme d 'un système principal de coordonnées défini dans le chapitre du gyroscope.Unité d 'information d' accélération`m/s^2`".
##- Oui.`rotationRate`Notes`RotationInfo`TypeL 'attribut fournit un débit de rotation d' un équipement hôte dans l 'espace, exprimé sous la forme d' un taux de variation angulaire défini dans le chapitre de gyroscope, l 'unité devant être`deg/s`". `interval`- intervalle entre les données provenant du matériel, en millisecondes.

###2.1 acquisition d'informations sur le mouvement physique de l'équipement

L 'arbre d' accélérateur est la direction physique de l 'appareil, ce qui signifie que lorsque vous tournez l' appareil, l 'arbre d' accélérateur tourne en conséquence.

Acquisition d 'informations de mouvement d' équipement


```typescript

Laya.init(550, 400);

this.info = new Laya.Text();
this.info.fontSize = 50;
this.info.color = "#FFFFFF";
this.info.size(Laya.stage.width, Laya.stage.height);
Laya.stage.addChild(this.info);

Laya.Accelerator.instance.on(Laya.Event.CHANGE, this, onMotoin);

function onMotoin(acceleration, accelerationIncludingGravity, rotationRate, interval) {
    this.info.text =
        'acceleration:(' + acceleration.x.toFixed(3) + ', ' + acceleration.y.toFixed(3) + ', ' + acceleration.z.toFixed(3) + ')\n' +
        'accelerationIncludingGravity:(' + accelerationIncludingGravity.x.toFixed(3) + ', ' + accelerationIncludingGravity.y.toFixed(3) + ', ' + accelerationIncludingGravity.z.toFixed(3) + ')\n' +
        'rotationRate: alpha ' + Math.floor(rotationRate.alpha) + ', beta ' + Math.floor(rotationRate.beta) + ', gamma ' + Math.floor(rotationRate.gamma) + '\n' +
        'interval: ' + interval;
}
```


### **2.2 acquisition d 'informations de mouvement d' affichage**

Comme nous avons peut - être besoin d 'afficher des informations de fonctionnement dans la direction, cela signifie que même si l' appareil est rotatif, l 'arbre d' accélérateur ne change pas en conséquence, par exemple si l 'axe y reste vertical.Utiliser`Accelerator.getTransformedAcceleration()`Des informations de fonctionnement dans la direction d 'affichage peuvent être obtenues.

Code précédent`onMotion`Utiliser`AccelerationInfo`Pre - usage`Accelerator.getTransformedAcceleration()`Informations de conversion:


```typescript

function onMotoin(acceleration, accelerationIncludingGravity, rotationRate, interval)
{
	acceleration = Accelerator.getTransformedAcceleration(acceleration);
  	accelerationIncludingGravity = Accelerator.getTransformedAcceleration(accelerationIncludingGravity);
  	......
}
```
