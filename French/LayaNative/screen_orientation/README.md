#  横竖屏设置
##IOS

Ouvrir le fichier resource / config.ini, modifier`orientation=30`Comme indiqué dans la figure ci - dessous:
![图1](img/1.jpg)

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


##Android

Le projet Android a été construit avec succès en ouvrant le fichier androidmanifest.xml, avec un paramètre de screenorisation dans l 'étiquette d' activité, que le développeur peut adapter à ses propres besoins, comme le montre la figure ci - après:
![图2](img/2.jpg)

Les paramètres configurables sont les critères d 'Android, sans trop d' explications, comme suit:


```

"landscape","portrait","full_sensor","sensor_landscape","sensor_portrait","reverse_landscape","reverse_portrait"
```


##Paramètres dans 3.html

Définit la direction de l 'écran dans le démarrage du projet xxx.html (habituellement index.html) et modifie la valeur de la Screening.

```

<meta name='laya' screenorientation='landscape' />
```


Les paramètres configurables sont les suivants:


```

"landscape","portrait","full_sensor","sensor_landscape","sensor_portrait",
```

Le projet créé par layaair a augmenté par défaut.`<meta name="laya" screenorientation="landscape">`Pour cette étiquette, le développeur doit modifier manuellement ses besoins.

##Ordre d'exécution

L 'application est lue d' abord au démarrage, et l 'écran est orienté dans le config de l' iOS ou dans le manifest d 'Android.Lire à l 'index.html`<meta name="laya" screenorientation="landscape">`Cette étiquette permet de redimensionner la direction de l 'écran.

Par exemple, l 'écran d' Android tourne et tourne de l 'écran vertical à l' écran transversal.

**Tips: il est recommandé à l 'émetteur d' aligner les deux valeurs afin d 'éviter la rotation de l' écran pendant l 'exécution du programme.**
