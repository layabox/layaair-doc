#VERTICAL SCREEN set

##Configuration de l 'écran vertical avant de construction du projet

###Paramètres dans index.js ou runtime.json

* index.js

Si vous utilisez l 'index.js pour définir la direction de l' écran, les valeurs de screenorisation peuvent être modifiées:


```javascript

window.screenOrientation = "sensor_landscape";
```


Les paramètres configurables sont les suivants:

{\ 1ch00ffff} 124.
124: ------------------------------------------------------------------------
124%
124, portrait \ \ 124
124, Sensor u Landscape ou sensorsorlandscape.
124ème écrans verticaux ou Sensor portrait.

* runtime.json

Si vous utilisez runtime.json pour définir l 'orientation de l' écran, les valeurs de screenorisation peuvent être modifiées:


```json

"screenOrientation":"sensor_landscape"
```


La valeur de screenoritation est la même que celle de window.screenoritation dans l'index.js.

##Configuration de l 'écran vertical postérieur à la construction du projet

###IOS

Ouvrir le fichier resource / config.ini, modifier`orientation=16`Comme indiqué dans la figure ci - dessous:

![图1](img/1.png)

Le sens des paramètres est le suivant:

```

orientation=2   //竖屏：IOS home键在下   
orientation=4   //竖屏：IOS home键在上   
orientation=8   //横屏：IOS home键在左   
orientation=16  //横屏：IOS home键在右   
```

Valeur d 'extraction disponible`按位或`Par exemple:

```

orientation=6   //代表竖屏可以任意旋转  
orientation=24  //代表横屏可以任意旋转  
```


**Attention:**Les réglages de l 'écran vertical dans le projet iOS sont de préférence compatibles avec ceux du projet config.ini.Si les paramètres ne sont pas cohérents, une situation inconnue peut se produire.Paramétrer comme suit:

![图](img/2.png)

###Android

Le projet Android a été construit avec succès en ouvrant le fichier androidmanifest.xml, avec un paramètre de screenorisation dans l 'étiquette d' activité, que le développeur peut adapter à ses propres besoins, comme le montre la figure ci - après:
![图2](img/3.jpg)

Les paramètres configurables sont les critères d 'Android, sans trop d' explications, comme suit:


```

"landscape","portrait","full_sensor","sensor_landscape","sensor_portrait","reverse_landscape","reverse_portrait"
```


##Ordre d'application

L 'application lit d' abord la direction de l 'écran définie dans le config.ini de l' iOS ou la direction de l 'écran définie dans Android manifest.xml d' Android.La valeur de réglage de l 'écran vertical est lue et le sens de l' écran est redéfini lorsque l 'analyse est effectuée sur l' index.js ou runtime.json.

Par exemple, Android manifest.xml définit le port et l 'étiquette dans l' index.js est placée en Landscape, et l 'écran tourne depuis l' écran vertical jusqu 'à l' écran transversal.

**Tips: il est recommandé à l 'émetteur d' aligner les deux valeurs afin d 'éviter la rotation de l' écran pendant l 'exécution du programme.**