#Découpage et champ de vision d 'une caméra

###### *version :2.0.1beta   Update:2019-3-19*

####Coupe à distance

La caméra peut également configurer des coupes à distance, ne visualiser que des modèles de scène entre des distances distantes, et les modèles extérieurs ne sont pas affichés par rendu.Son avantage le plus important est d 'améliorer les performances du jeu.

Lors de la création de la caméra, la fonction de configuration de la caméra est coupée par défaut à une distance de 0,3 m et à une distance de 1 000 m.L 'développeur peut paramétrer les paramètres dans la fonction de construction ou par l' intermédiaire des propriétés de la caméra.

[] (IMG / 1.png) <br > (Figure 1)


```typescript

    //创建摄像机时初始化裁剪(横纵比，近距裁剪，远距裁剪)
    var camera:Camera = new Camera( 0, 0.1, 100);
    //近距裁剪
    camera.nearPlane=0;
    //远距裁剪
    camera.farPlane=100;
```


**Tips**En général, dans les jeux, on utilise l 'effet de brouillard en même temps que la caméra, l' effet de brouillard est quasiment invisible à distance, ce qui permet d 'installer le cisaillement à distance et d' améliorer les performances du jeu.

####Champ de vision

Le champ de vision de la caméra est semblable à la distance de focalisation, et l 'ajustement des paramètres de visualisation permet de voir des variations de la portée de la scène et de la vision de près ou de loin.


```typescript

//设置相机的视野范围90度
camera.fieldOfView = 90;
```

