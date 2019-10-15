#Édition et Export d 'animations de modèles à partir d' Unity

######  *version :2.1.1beta   Update:2019-7-27 插件版本：2.1.0*

L 'animation de personnages de jeux en 3D est largement utilisée dans les jeux en 3D, les modèles d' animation de rôles peuvent être introduits dans l 'unité et exportés vers layaair pour être utilisés.

Nous utilisons des squelettes en peluche pour dessiner des singes.

####Modèle d 'importation

Dans un gestionnaire de ressources Unity, les ressources de modèle Fbx, les ressources d 'autocollage sont importées par le bouton droit (Import New Assets) et traînées dans la scène pour ajuster et enregistrer le maquette de matériau.

[] (IMG / 1.png) <br > (Figure 1)

####Créer un contrôleur d 'animation

Dans un gestionnaire de ressources Unity, un contrôleur d 'animation (create) est créé par le bouton droit et, selon le nom de l' animation, le présent exemple s' appelle Laya monkeycontroller.

[] (IMG / 2.png) <br > (Figure 2)

####Éditer un contrôleur d 'animation

Double - cliquez pour ouvrir le Contrôleur d 'animation et la zone d' affichage présente une interface d 'édition du Contrôleur d' animation.

[] (IMG / 3.ping)

(Figure 3)

####Contrôleur d 'animation lié

Sélectionnez le modèle de rôle dans la scène, attribuez le Contrôleur d 'animation de rôle à l' ensemble d 'animation du modèle sélectionné (fig. 4) et, en l' absence de l 'ensemble d' animation, il est nécessaire de lier le rôle, faute de quoi l 'animation exportée ne peut pas être diffusée.

[] (IMG / 4.png) <br > (Figure 4)

Après ces étapes, nous avons terminé l 'édition de l' animation de rôle dans l 'Unity, en cliquant sur le bouton d' exécution de l 'Unity, et alors nous pouvons voir l' animation.Si la diffusion de l'animation ne pose pas de problème, les ressources nécessaires à layaair pourraient être exportées conformément à la méthode antérieure d'utilisation de l'outil de prise en charge Unity.

**Tips: les autres animations sont traitées de la même manière dans l 'Unity, et les étapes suivantes sont nécessaires: ajouter un module d' animation au modèle de scène - créer un contrôleur d 'animation - Ajouter l' animation au Contrôleur d 'animation - Ajouter le Contrôleur d' animation au module d 'animation du modèle.**

###Il faut faire attention à l'animation.

#####Fichier d 'animation

Plusieurs fichiers d 'animation ne peuvent pas être renumérotés.

#####Solid Animation

Lors de l 'utilisation de l' animation rigide, animator Controller de l 'objet animé ne doit pas ajouter d' Avatar

#####Muscle d 'animation

Il n'y a pas de noeuds homonymes dans le squelette d'un objet auquel le noeud osseux est associé.

Le type d'animation ne prend en compte que le type Generic.

Option Optimize - game Object

[] (IMG / 6.png) <br > (Figure 6)

#####Type de commande d 'animation

Non - Supporting animator override Controller animation Controller

[] (IMG / 7.png) <br >