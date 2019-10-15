#Utilisation d 'animation de caméra

###### *version :2.1.0beta   Update:2019-6-13*

Le module layaair3d supporte l 'exportation d' animation de caméra.Il est recommandé d 'éditer et d' exporter dans l 'Unity.

Voici l 'exemple suivant: Nous sommes en train d' éditer une animation de caméra simple dans l 'Unity, qui n' est qu 'une simple caméra mobile.Ajouter un composant animator à la caméra, comme une animation de matériau, et ajouter une animation bien conçue.Exporter et utiliser.

Dans cette animation, on ne fait que changer la position de la caméra, et on ne change pas la position de cube.

[] (IMG / 1.png) <br > (Figure 1)

Après l 'Export, l' ajout à la scène permet de voir l 'effet.


```typescript

Laya.Scene3D.load('LayaScene_scene/Conventional/scene.ls',Laya.Handler.create(this,function(scene){
    Laya.stage.addChild(scene);
}));
```


[] (IMG / 2.gif) <br > (Figure 2)