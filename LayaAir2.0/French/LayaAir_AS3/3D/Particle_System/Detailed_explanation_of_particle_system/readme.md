#Propriété des particules

###### *version :2.1.1beta   Update:2019-8-2*

[] (IMG / 1.png) <br > (Figure 1)

Un procédé d 'utilisation détaillé d' un système de particules peut être consulté[Unity官方文档](https://docs.unity3d.com/Manual/PartSysReference.html)".Voici une brève description de la partie de l 'outil d' exportation layaair supportant l 'exportation.

**Attention:**S' il y a une partie non prise en charge lors de l 'exportation, une erreur imprévisible peut survenir après l' exportation.

- Oui.

**Panneau de base**

Un.`Duration`Durée des particules
Deux.`Looping`Cycle
Trois.`Startdelay`Les particules commencent à retarder.
* constants *
* Random between two constant * maximum minimum constant
Quatre.`StartLifetime`Vie de particules
* constants *
* Random - between two constant *
Cinq.`StartSpeed`Vitesse des particules
* constants *
* Random - between two constant *
Six.`StartSize`Taille de début
* constants *
* Random - between two constant *
Sept.`3DStartSize`Taille en 3D.
* constants *
* Random - between two constant *
Huit.`StartRotation`On tourne.
* constants *
Neuf.`3DRotaion`Paramètres de rotation 3D
* constants *
* Random - between two constant *
Dix.`RandomizeRotation`Probabilité de rotation aléatoire
Onze.`StartColor`Couleur de début
* couleurs constantes
* Random between two Color *
12.`GravityModifier`Correction de la gravité
13.`Simulation Space`Espace analogique
* modèle local *
* Hierarchy * monde
14 ans.`ScalingMode`Mode zoom
* Échelle Hierarchy *
* local * autozoom
15 ans.`Play On Awake`Au début.
16 ans.`Max Partticles`Maximum Particle Number
17 ans.`AutoRandomSeed`Vitesse de rotation libre

- Oui.

**Emission**Module de lancement

`Rate over Time`Nombre de particules émises

`Bursts`Nombre de particules émises

- Oui.

**Shape.**Module de forme

Le module définit le volume et la forme de l 'émetteur de particules.

Un.`Sphere`Balle
* rayon radius *
* emit from Shell *
* Randomize - Direction * direction aléatoire
Deux.`Hemisphere`Forme hémisphérique
* rayon radius *
* emit from Shell *
* Randomize - Direction * direction aléatoire
Trois.`cone`Taper
* angle angule *
* rayon radius *
* Émit from * lancement
* base *
* base Shell *
* volume * volume
* volume Shell *
* Randomize - Direction * direction aléatoire
Quatre.`Box`Boîtier
* boxx * boîte X
* boxy * boîte y
* boxz * boîte Z
* lancement d'emitform *
Un.*Volume*
* Randomize - Direction * direction aléatoire
Cinq.`circle`Anneau
* rayon radius *
* angle arc *
* Émit - from - edge *
* Randomize - Direction * direction aléatoire

- Oui.

**Velocity over Lifetime**Changement de vitesse basé sur la vie

Un.
* constants * à vitesse constante
* schéma de ligne Curve * avec vitesse des particules en fonction de la vie
* Random from two constant *
Deux.`Space`Espace
* local *
* World *

- Oui.

**Color over Lifetime**Changement de couleur basé sur la vie

Un.`Color`Couleur
* gradient
* Random between two Gradient *

- Oui.

**Size over Lifetime**Changement de taille basé sur la vie

Un.`Separate Axes`Séparation axiale
* size * Taille
* courbe Curve *.
* Random between two contents * extrapolation aléatoire de deux constantes
Deux.`Separate Axes`Zoom axis
* size * Taille
* courbe Curve *.
* Random between two contents * extrapolation aléatoire de deux constantes

- Oui.

**Texture Sheet Animation**Animation

Un.`Tiles`Pavage
Deux.`Animation`Animation
* Single Row *
* Tous les Sheet *
Trois.`Random Row`Random
Quatre.`Frame over Time`Animation frame
* constantes
* courbes *
* Random between two contents * extrapolation aléatoire de deux constantes
Cinq.`Start Frame`Start Frame Number
Un.*Contant*
* Random between two contents * extrapolation aléatoire de deux constantes
Six.`Cycles`Cycle
Sept.`Flip U`Tourner
Huit.`Flip V`Tourner V

- Oui.

**Rotation over Lifetime**Rotation basée sur la vie

Un.`Separate Axes`Séparation par axe non sélectionnée
* vitesse Angular Velocity *
* constants *
* courbe Curve *
* Random between two contents * extrapolation aléatoire de deux constantes



- Oui.

**Render.**Mode rendu

Ce mode est appuyé en mode rendu

Un.`RenderMode`Mode rendu
* Billboard * Les particules sont toujours orientées vers les caméras
Deux.*Stretched Billboard*
* Caméras Camera Scale *
* Rapport de vitesse Velocity - scale *
* length Scale * rapport longueur
* plan de particules horizontal - Billboard * parallèle au plan de fond de Xz
* Les particules vertical Billboard * sont verticales sur l 'axe Y, mais orientées vers l' appareil photo
* Les particules Mesh * proviennent de la grille 3D et non de la texture.
- mais s'il y a un modèle avec un grand nombre de facettes, il y a une erreur d'écriture, car l'index dépasse 65536.
Deux.`Sorting Fudge`Plus les chiffres sont petits, plus la priorité est grande.

