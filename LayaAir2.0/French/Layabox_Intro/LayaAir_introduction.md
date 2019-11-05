#Layaair Function Introduction

"> le moteur layaair comprend principalement les deux principaux éléments de l'entrepôt et de l'idee.
]
Layacloud et layanative font partie de la combinaison écologique du moteur.



##Layaair2.0 fonctionnalités du dépôt de moteur

Les moteurs layaair2.0 ne fonctionnent pas seulement comme 1,0, par exemple:

Elfe, vectoriel, texte, texte riche, caractères bitmap, animation, squelette, audio et vidéo, filtre, événement, chargement, ralentissement, temps, réseau, UI, système physique, tiledmap, Protocol, etc.

Des moteurs physiques box2d, des supports d 'assemblage et plus de 150 fonctionnalités 3D ont été ajoutés, par exemple:

Les principaux nouveaux documents officiels comprennent le pbrstandard material, le pbspecular Material et les matériaux unitmaterial.

Dans le domaine de la texture, on ajoute une pluralité de configurations de paramètres de texture (mipmap, format, wrapmodeu, wrapmodev, filtermode, anisolevel), on augmente les interfaces de pixels de texture et de compression de texture GPU.

Dans le domaine de l 'animation, ajouter la fonction de fusion d' animation animator crossfade, ajouter la multidiffusion d 'animation, le mécanisme de mise à jour d' animation est ajusté en temps réel, réduisant considérablement la mémoire et l 'expression de flux d' animation, ajouter une pluralité d 'attributs matériels

Soutenir le développement de produits 2D, 3D, VR R R R R R R, soutenir les modèles Canvas et webgl, soutenir la publication simultanée pour HTML5, flash, app (IOS, André) Micro - jeux, QQ joue à plusieurs versions.


##Layaair2.0 fonction IDE

Layaair2.0 id`项目管理`,`代码开发编辑器`,`可视化编辑器`,`第三方工具链支持工具`Attends.

Ses principales fonctions sont les suivantes:

##- développement du Code.UI et éditeur de scène
##- gestion des scènes (2,0 ajouts)Éditeur de particules
##- Éditeur d'animation.Éditeur physique (2.0 ajout)
##- appui modulaire (2,0 ajouts)Appui 3D (2,0 ajouts)
##- appui au projet layacloud (2,0 ajouts)Extension de script
##- réservation.App Packaging
##- J.S. confusion et compression.Outil de conversion de chaîne d 'outils tiers (unity3d, tiledmap, Spine, Dragon...)



Laya2.0 IDE correspond à la version layaair 1.x, dans le projet 2D, il est possible de passer du projet initial au moteur 2.0 (Sauvegarde recommandée avant mise à niveau) sans avoir à apporter de modifications importantes.

Laya2.0 IDE développe les scénarios et la gestion des scènes au moyen de modules embarqués, édite les scènes et les pages dans l 'IDE, facilite l' élaboration de projets en ajoutant des scripts, facilite l 'élaboration de programmes, des beaux - arts, planifie des activités de synergie et facilite l' accès aux concepteurs de Laya pour les premiers contacts.



##Fonction layanative

Layanative est le moteur layaair pour la mise au point, l 'essai et la diffusion d' un ensemble complet de solutions de développement pour l 'app d' origine mobile, mais pas seulement pour le moteur layaair.Layanative utilise des mécanismes de réflexion et des programmes d'interface de canaux pour fournir aux promoteurs une deuxième interface ouverte et canalisée sur l'app d'origine et pour faciliter l'emballage et la diffusion du projet HTML5 par les promoteurs.

####Layanative2.0 a été restructuré par Code, les performances se sont considérablement améliorées par rapport à la version 1.0.

Comparaison de layanative1,0

124, \ \ 1242d \ \ 1243d \ \ 124.
< 124 - - - [124 - - - [124 - - - - 124 - - - [124]
- 124 °android °4%
12.244%

Comparaison avec d 'autres moteurs Runtime

124, \ \ 1242d \ \ 1243d \ \ 124.
"/ 124 - - - 124 - - - 124 - - - 124 - - - 124u
- 124%
124 ~ 240 ~ 124 ~ 270%

####Extensions

Layanative - 2.0 prend en charge les deux modes d 'exécution, l' concepteur choisissant le mode d 'exécution en fonction des résultats des essais effectués dans le cadre de son propre projet.

- mode monofilière: JS et render fonctionnent en une seule ligne.

Avantages: fonctionnement sans retard (par exemple, touches, boutons).
- inconvénients: les performances ne sont pas meilleures que les modèles à deux fils.

- mode double: JS et render fonctionnent dans leurs lignes respectives.

- avantages: les performances sont plus élevées que la version monoligne.
- inconvénients: l 'opération comporte une demi - trame et un retard maximal à une trame (par exemple, touche, touche).

Supporte la compression de texture de carte, non seulement pour améliorer l 'efficacité de rendu, mais aussi pour réduire l' occupation apparente.

3, optimiser le second développement, plus facile à comprendre et plus facile à utiliser par les développeurs.

####En termes d 'accessibilité, il est possible d' obtenir des fonctions de débogage plus faciles à utiliser

**La plate - forme Android peut être mise en ligne avec Javascript.**

Dans la version layanative1.0, le code JavaScript du projet de mise en page ne peut être appelé que console.log ou Alert.Le code JavaScript est officiellement approuvé dans la version layanative2.0 à l 'aide d' un navigateur Chrome.Il est possible d 'ajouter un code à l' essai de chrome, de suivre le Code, etc.

**Test app Supporting Scanning Code initiation Project**

Afin de permettre au développeur d 'accélérer le développement de la mise au point de la mise au point, la nouvelle version de l' app de test ajoute un code de balayage pour activer la fonction de l 'APP, ce qui permet d' éviter les problèmes d 'entrée manuelle de l' URL lors de la mise au point.



##Fonction layacloud

Layacloud est une solution de service nuageux lancée par 2.0 pour fournir aux concepteurs des services de base tels que l'authentification de l'utilisateur (connexion ou autorisation), l'accès aux données et leur lecture sur le serveur, la création et la gestion de chambres, l'appariement de guerre, la diffusion dans la chambre et la synchronisation des trames.Les développeurs n 'ont pas à s' inquiéter du déploiement et de la charge du serveur, par exemple, en utilisant directement l' interface API fournie par layacloud pour mettre au point un jeu de réseau simple et rapide dans une langue de développement de pointe.Lorsqu 'il fait face à des besoins de serveur complexes, l' développeur peut également réaliser sur le client une fonction ou une autre logique de service de jeu que l 'API de base layacloud n' a pas pu fournir en établissant des fichiers de configuration et des scripts logiques de serveur.

Layacloud Technical Paper page: https: / / wiki.cloud.layabox.com /





Pour une présentation plus détaillée des nouvelles caractéristiques, voir layabox, article public de micromessagerie: https: / / mp.weixin.qq.com / S / lhi3tcozcfd \ \ 8fz1pfj8xg.



S'il y a des problèmes de bug ou des recommandations concernant les moteurs et les outils dans le processus de développement, les communautés sont invitées à les soumettre à l'adresse suivante: http: / / ask.layabox.com.