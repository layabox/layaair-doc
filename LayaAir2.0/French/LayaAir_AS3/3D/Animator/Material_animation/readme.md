#Utilisation de matériaux animés

###### *version :2.1.0beta   Update:2019-6-13*

L 'animation de matériau est réalisée de manière à modifier la couleur et l' image du matériau.

Dans un logiciel tridimensionnel, par exemple dans les 3ds Max, une animation associée au matériau peut être produite, mais lorsque le format Fbx est exporté, l 'Unity ne peut ni identifier ni exporter l' animation du matériau identifiée par le moteur layaair 3D.L'animation matérielle du modèle de jeu doit donc être produite dans l'unité et certains paramètres doivent être exportés avant d'être utilisés pour le moteur layaair 3D.

On décrit ci - dessous l 'effet de l' animation en matériau de néon (fig. 1) pour créer et exporter l 'animation dans l' Unity, comme suit.

[] (IMG / 1.gif) <br > (Figure 1)

####Modifier le type de matériau

Faites glisser un cube dans l 'Unity et modifiez le matériau.

[] (IMG / 2.png) <br > (Figure 2)

####Création d 'animation de matériaux

Après avoir modifié le type de matériau, sélectionnez également le modèle à utiliser pour produire l 'animation, cliquez sur l' animation dans la barre de menu Window pour ouvrir l 'interface d' édition de l 'animation, raccourcis clavier Ctrl + 6.

Cliquez sur le bouton create pour créer et renommer l 'animation, le nom par défaut utilisé dans ce cas étant New animation, et l' enregistrement crée un nouveau fichier d 'animation dans le gestionnaire de ressources.

Sélectionnez le temps sur l 'axe temporel, modifiez la couleur réfléchissante diffuse du matériau et redimensionnez plusieurs couleurs.

Modifier la courbe de la trame d 'animation, par défaut comme l' animation coulissante linéaire, ne correspond pas à nos besoins d 'animation, de modifier en quantité constante, la lecture, le matériau d' animation conformément à la demande.Bien entendu, les animations flottantes et fluidiques peuvent être faites de manière linéaire.

[] (IMG / 3.ping) <br > (Figure 3)

####Créer un contrôleur d 'animation

Comme pour le Contrôleur d 'animation précédent, un contrôleur d' animation est créé par le bouton droit du gestionnaire de ressources, appelé Cube - 1, puis fait glisser le fichier d 'animation New animation créé lors de l' étape précédente dans le Contrôleur d 'animation lorsque le double clic l' ouvre.

Sélectionnez le modèle, faites glisser le Contrôleur d 'animation dans l' ensemble d 'animation du modèle, cliquez sur Unity pour voir que l' animation est diffusée en fonction de nos besoins (fig. 4).

[] (IMG / 4.gif) <br > (Figure 4)

####Exporter et utiliser des ressources d 'animation

Édition de l 'animation dans l' unité, exporte le type de scène avec le module layaair.`Scene3D.load()`Procédé de chargement ou de préchargement

On se réfère au code ci - dessous parce que les couleurs changent trop lentement, on ajuste la vitesse, comme l 'effet (fig. 1).


```typescript

//加载场景
Scene3D.load("res/threeDimen/scene/materialScene/Conventional/layaScene.ls", Handler.create(this, function(scene:Scene3D):void {
    Laya.stage.addChild(scene);
    var camera:Camera = scene.getChildByName("Main Camera") as Camera;
    camera.addComponent(CameraMoveScript);
}));

```


