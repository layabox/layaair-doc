#Outil de construction de layabox
L 'outil de construction est utilisé pour générer le projet app d' extrémité mobile de layaplayer, correspondant à l 'assistant de projet app.Un appui est actuellement apporté à Android (projet eclipse, projet Android - studio) et à iOS (projet xcode).
**Attention:**
**Layanative2.0-android, la version minimum du système est de 4.0.**
**Layanative2.0-ios, la version minimale du système est de 10.0**
##Besoins opérationnels
####1.1 environnement du développement de base

Les projets de construction doivent être préparés à l'environnement de développement.Par exemple, pour construire le projet IOS, il faut préparer les ordinateurs Mac et xcode et Android pour Eclipse ou Android studio.

##Ciblage des utilisateurs
Qu'il s'agisse de la construction d'Android ou d'IOS, il faut qu'il y ait une base de développement adaptée pour Android ou IOS.Si tel n'est pas le cas, apprenez d'abord à connaître les connaissances de base pertinentes.



##Construction d'APP ouvert à layaairide

Oui.[Layabox官网](http://localhost/LayaAir2_Auto/Layabox.com)Télécharger layaairide, ouvrir layaairide - > cliquer sur l 'icône logo dans le coin supérieur gauche >


![图1](1.jpg)

(Figure 1)


Étant donné l'importance des fichiers de base nécessaires à la construction de l'outil, celui - ci n'est pas directement inclus dans l'outil layaairide et, lorsqu'il sera utilisé pour la première fois, le paquet SDK sera téléchargé comme suit:

[0.gif]

(Figure 2)

**Attention!**

Ce document est plus grand, donc il faut attendre patiemment pour le télécharger.

Une fois que le téléchargement est terminé, cliquez sur app pour créer la boîte de dialogue de configuration.

##Paramètres de l'interface de construction du projet

Ouvrir l 'interface du projet à layaairide, comme le montre la figure 3:

![2](2.jpg)
(Figure 3)

* plates - formes

Les types de projets créés sont les suivants: android eclipse, Android Studio, IOS, et Android - Eclipse ou Android - studio, s'il est nécessaire de créer le projet Android (puisque Google n'a plus d'eclipse, il est proposé de choisir le projet Android Studio, et nous allons également supprimer l'appui à Eclipse dans Les versions suivantes).Si l 'élément xcode (IOS) doit être généré, sélectionnez l' option IOS.


* Version électronique app:

Si cette option est cochée, l 'app de l' élément de construction est une version mono - ordinateur, sinon la version en ligne.Il n'est pas nécessaire de mettre en réseau une seule version, il n'y a pas de URL correspondant et il n'y a pas de URL disponible.Mais il faut fournir des ressources pour le jeu, faute de quoi le paquet ne pourra pas fonctionner.

* titre du projet:

Appellation app.Est également un répertoire de sortie pour les projets de construction.

* nom du sac:

Nom de paquet appliqué, ce qui est normalement invisible.Les règles relatives à la nomenclature des noms de domaine sont généralement utilisées (ce qui permet de mieux distinguer et d'éviter les conflits avec l'app qui existe déjà dans le système).

Par exemple: com.layabox.runtime.demo
Le nom de paquet doit être au format xxx.yy.zzz, avec au moins deux niveaux, à savoir xxx.yy.Sinon, le sac échouera.

♪ Game URL:

Si l 'application à emballer est un projet en ligne, il faut fournir un URL de démarrage qui indique un fichier JS ou json et qui est l' entrée de l 'application.Le projet layaair produit une page de démarrage, généralement index.js.Pour être commode, l'adresse URL locale habituellement utilisée est testée dans un navigateur, et pour être tapée sur Android APP, il faut avoir une vraie adresse Webserver.

Par exemple:

* adresse du réseau local: *


```

    http://10.10.20.19:8888/index.js
```

* adresse effective: *

```

    http://nativetest.layabox.com/layaplayer/index.js
```


* itinéraire de sortie:

Crée l 'adresse de stockage du projet app généré.

* filière des ressources:

Les ressources sont des scripts, des images, des voix et d 'autres ressources.Pour les jeux en ligne, il suffit d 'un URL de jeu pour fonctionner normalement, mais l' utilisation directe de ressources dans le paquet app permet d 'éviter le téléchargement sur le réseau et d' accélérer le chargement de ressources.Dans le cas d 'un jeu mono - ordinateur, faute d' un URL de jeu, il est nécessaire d 'enregistrer toutes les ressources nécessaires dans l' app.

Les ressources emballées dans l 'app peuvent encore être mises à jour grâce à notre outil DCC (gestion de la mémoire cache des ressources).
Si aucun chemin de ressources n 'est défini à ce moment - là, après la construction du projet, vous pouvez ajouter manuellement des ressources et ajouter une référence de méthode[LayaDcc工具](https://ldc.layabox.com/doc2/?nav=zh-as-6-2-0)".


   **注意：**  

L 'inconvénient de l' emballage des ressources est d 'augmenter la taille du paquet.

Pour les jeux en ligne des ressources d 'emballage, il faut taper le DCC à l' extrémité Server, sinon on perd l 'avantage de l' emballage et on télécharge toujours toutes les ressources.Comment composer le DCC[LayaDcc工具](https://ldc.layabox.com/doc2/?nav=zh-as-6-2-0)".



##Utilisation des travaux de construction

Le projet APP est bien construit et peut être ouvert à l 'aide d' outils de développement correspondants pour une deuxième opération de développement et de conditionnement.

##- le projet Android - eclipe (Android) peut être importé et développé à l'aide du logiciel clipse.Le projet Android - studio (Android) peut être importé et développé au moyen du logiciel Android - studio.
- le projet xcode (IOS) peut être importé et développé au moyen du logiciel xcode.L 'ouverture du projet xcode (IOS) nécessite la sélection d' un véritable équipement iOS pour le Build.(Note: le matériel réel est constitué par les structures armv7, armv7s et arm64.En revanche, si l 'on utilisait l' iOS Simulator, c 'est l' architecture x86 qui n 'est pas actuellement prise en charge par layanative sur l' équipement IOS, ce qui serait impossible si l 'on utilisait un simulateur de compilation.(version 0.9.5 démarrage du simulateur)



**Références:**

- Oui.[Eclipse搭建Android环境](https://github.com/layabox/layaair-doc/tree/master/Chinese/LayaNative/setUpAndroidEnvironment_Eclipse)

- Oui.[Android Studio的使用和配置](https://github.com/layabox/layaair-doc/tree/master/Chinese/LayaNative/AndroidStudio_ConfigurationAndApplication)

- Oui.[IOS打包发布App详细流程](https://github.com/layabox/layaair-doc/tree/master/Chinese/LayaNative/packagingReleases_IOS)

​

##Transfert Manuel des versions monolithiques et en ligne

Une fois la construction achevée, la version monomachine et la version réseau peuvent être commutées en modifiant directement le code dans le projet.

Projet Android

Ouvrir mainaactivity.java dans le projet de construction`mPlugin.game_plugin_set_option("localize","false");`  
Une seule version doit être définie comme "vrai", par exemple`mPlugin.game_plugin_set_option("localize","true");`  
Pour être configuré en ligne, il convient de modifier comme suit:`mPlugin.game_plugin_set_option("localize","false");`Et définissez l 'adresse correcte:
     `mPlugin.game_plugin_set_option("gameUrl", "http://你的地址/index.js");`


Projet iOS

Une fois le projet iOS achevé, la dernière fonction du script resource / scripts / index.js dans le catalogue de projets consiste à exécuter le loadurl, où l 'adresse de la page d' accueil est chargée, où l 'adresse peut être modifiée pour changer la version mono - ordinateur et la version Web, l' adresse de La version monolithique étant fixée à`http://stand.alone.version/index.html`".

Par exemple, au début, une version en ligne à l'adresse suivante:


    `loadUrl(conch.presetUrl||"http://10.10.20.19:7788/index.js");`   
Modifier la phrase comme suit:
    `loadUrl(conch.presetUrl||"http://stand.alone.version/runtime.json");`  
   反之亦然。  


   **Attention!**   
Une fois que l 'adresse URL a été modifiée, les ressources initialement emballées sont devenues caduques.A ce moment - là, il faut supprimer manuellement le contenu du catalogue case et réintroduire layadcc pour générer des ressources d 'emballage.[《LayaDCC工具》](https://ldc.layabox.com/doc2/?nav=zh-as-6-2-0)".

##Mise à jour des ressources

Les travaux sont bien construits par l 'intermédiaire de l' IDE, si la sélection est une version mono - ordinateur et une version de ressource d 'emballage.Les ressources de tous les projets H5 (y compris les scripts, les images, HTML, le son, etc.) seront emballées sous le catalogue resource / case.
".`android的目录： assets/cache/  ``<br>``iOS的目录：  resource/cache/  ``<br><br>Toutefois, le projet H5 a évolué au cours du processus de développement et, pour éviter les travaux de reconstruction à chaque fois, il est possible de le mettre à jour par l'intermédiaire de la ligne de commande après la version IDE - 1.7.6-beta.<br><br>Éditeur de paquets de ressources``layanative refreshres -u http://testgame.layabox.com/index.js``<br>Commande d 'appel de version unique:``layanative refreshres`".

***Tips***
**Les ordres doivent être exécutés dans le catalogue des travaux app.L'emblème le plus visible est le catalogue de navtie.json, comme le montre la figure ci - dessous:**
[3.jpg]

Comment installer une ligne de commande layanative[layanative命令行工具使用](https://ldc.layabox.com/doc2/?nav=zh-as-6-3-0)


##Autres sujets de préoccupation
Après la construction d 'Android Studio, il faut modifier le numéro de version Android SDK en fonction de son environnement.
Document app / build.gradle.