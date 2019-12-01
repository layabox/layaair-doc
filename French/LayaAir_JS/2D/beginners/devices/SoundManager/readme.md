#Lecture et commande de musique et de son

La diffusion audio de HTML5 est actuellement assurée de deux façons principales, l 'une sur l' étiquette audio et l 'autre sur le système binaire webaudio.

Audio est un élément Dom avec interface ui qui permet de télécharger les fichiers sonores sur le côté amovible d 'audio et de les adapter aux fichiers sonores plus importants.

Webaudio est une nouvelle forme de lecture sonore qui permet de charger une pluralité de sons pour la synthèse et la lecture dans un format supporté par un navigateur par décodage de fichiers binaires.L 'utilisation de cette interface permet même d' obtenir un effet d 'animation audio qui permet de synthétiser le son.

La musique et l 'audio sont des éléments de base couramment utilisés dans le jeu, les moteurs layaair encapsulent webaudio et audio, les navigateurs supportant webaudio sont privilégiés par webaudio, les navigateurs ne supportant pas webaudio utilisent l' audio pour maximiser la compatibilité avec le format audio de tous les navigateurs, ce qui permet aux concepteurs d 'accéder plus facilement à laya.media.soundmanager API.La radio est directement diffusée par la bouche.

###Difference between Music and Acoustic Application

Musique: C 'est la musique de fond utilisée dans le jeu.La méthode playmusic utilisée dans la catégorie de gestion audio de laya.media.soundmanager ne permet de reproduire qu'un seul fichier audio en même temps, étant donné qu'il s'agit d'une musique de fond.

Effet sonore: la méthode playsound utilisée dans la catégorie de gestion audio laya.media.soundmanager permet la lecture simultanée de plusieurs fichiers audio.

###Préparation de compatibilité audio

En raison des différences de compatibilité entre les différents navigateurs pour les problèmes de diffusion audio, nous devons préparer la compatibilité avant de commencer l 'application.

1) Utilisation d'outils de conversion de fichiers audio « usines de formatage ».Sélectionnez 44100hz, 96kbps pour effectuer la conversion.

2) Les fichiers audio sont réduits au minimum, non seulement en ce qui concerne la limitation de la largeur de bande, mais aussi en ce qui concerne l'efficacité du décodage audio du navigateur.

###Régulation du volume audio

La régulation du volume sonore peut être assurée par le procédé setsoundvolume dans la catégorie de gestion audio de laya.media.soundmanager,

![blob.png](http://old.ldc.layabox.com/uploadfile/image/20170110/1484019651349259.png)

Comme l 'indique la figure ci - dessus, on peut voir qu' en définissant les paramètres volumiques, on peut contrôler efficacement la taille du volume du fichier audio correspondant de l 'URL.La valeur initiale est de 1.La gamme de volume va de 0 (son) à 1 (volume maximum).



###Dispositif de commande silencieuse

Si le son du dispositif est automatiquement suivi par la touche silencieuse du dispositif.Il est nécessaire de définir useodiomusic comme False.


```javascript

SoundManager.useAudioMusic=false；
```




###V. exemples complets de la musique et du son

L 'adresse complète de l' exemple est:[https://layaair.ldc.layabox.com/demo/?2d&Sound&SimpleDemo](https://layaair.ldc.layabox.com/demo/?2d&Sound&SimpleDemo)