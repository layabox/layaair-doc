#Pulvérisation de scène

###### *version :2.0.1beta   Update:2019-3-19*

L 'effet de pulvérisation joue un rôle important dans le projet, et l' effet de pulvérisation est l 'effet d' ouverture de l 'atmosphère.Le moteur layaair 3D peut définir la distance visible (égale à la concentration) et la couleur de la scène.L 'utilisation appropriée de la atomisation permet non seulement d' améliorer les performances du jeu, mais aussi d 'accroître l' expérience du jeu.

####Atomisation de scène à l 'aide d' Unity

Trouver dans les paramètres de rendu de lumière Lighting`Other Setting` 

[] (IMG / 1.png) <br > (Figure 1)

Sélectionnez d 'abord les propriétés de pulvérisation, puis ajustez la couleur de pulvérisation.

[] (IMG / 2.gif) <br > (Figure 2)

Une fois les réglages terminés, vous pourrez visualiser l 'effet de la caméra.Comme le montre la figure 3 des effets:

[] (IMG / 3.gif) <br > (Figure 3)

####Atomisation de l 'environnement au moyen de paramètres de code


```typescript

//雾化代码
scene.enableFog = true;
//设置雾化的颜色
scene.fogColor = new Vector3(0,0,0.6);
//设置雾化的起始位置，相对于相机的距离
scene.fogStart = 10;
//设置雾化最浓处的距离。
scene.fogRange = 40;
```


Résultats (Figure 4):

[] (IMG / 4.png) <br > (Figure 4)

