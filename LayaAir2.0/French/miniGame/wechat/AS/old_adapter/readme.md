# 老项目适配微信小游戏详解

> Author: Charley

####En raison de la nécessité d 'adapter de petits jeux pour certains des anciens projets, ce chapitre décrit en détail les étapes et les maillons d' adaptation des anciens projets.

**Tips:**La création de l 'élément 3D ne signifie pas que l' article n 'est adapté qu' à l 'élément 3D.Les formules d 'adaptation dans le texte sont communes à deux et à trois D, sauf qu' elles sont légèrement différentes dans la version linguistique et sont décrites dans le texte.

####Message à lire:

> 1, à partir de la version 1.7.15 Beta de layaair >
]
Avant de lire ce texte, lisez "création d 'un petit jeu de micro - messages", plus d' environnement de configuration
]
> 3, nouveau petit jeu, il est recommandé de créer directement un petit jeu.Si vous créez un projet ordinaire au moment de la création, vous pouvez l 'adapter en apprenant le processus d' adaptation des petits jeux dans ce chapitre.



###Première étape: créer un exemple d 'article

Ouvrez d 'abord layaairide et entrez dans l' interface du nouveau projet.Sélectionnez l 'exemple layaair 3D.

> Tips: Cette étape a pour objet de montrer l 'ancien processus d' Adaptation d 'un projet avant de créer intentionnellement un exemple ordinaire en 3D.
]
> Si vous souhaitez créer un nouveau projet pour un petit jeu 3D.Sélection directe**Micro - messagerie**Cependant, l 'élément d' exemple du petit jeu est prêt.

![图1](img/1.png) 


Saisissez le nom de l 'élément, le chemin, sélectionnez le bon type de langue et la version du moteur.

> (en raison de la cohérence des processus, ce texte s' adresse aux promoteurs de différentes langues, mais avec des images de l 'exécution des projets ts, si c' est dans d 'autres langues, à l' exception de l 'itinéraire qui n' a pas besoin d 'être présenté, il y aura des différences)

OK, continue.

Cliquez sur créer pour terminer la création d 'un projet 3D.



###Deuxième étape: adaptation de micromessagerie

####Préparation préalable à l 'Adaptation d' un petit jeu

Les moteurs et l 'IDE doivent utiliser la version la plus récente Beta ou la version stable, layairide à partir de la version 1.7.15 Beta pour appuyer la publication de l' ancien projet, de sorte que l 'ancienne version de l' IDE et de la Bibliothèque de moteur ne sont pas mis à jour, n 'oubliez pas de mettre à jour.



####Référence à la Bibliothèque d 'adaptation de petit jeu

#####Procédé d 'adaptation TS - JS

À partir de 1.7.15 beta, les projets ts et JS introduisent automatiquement une petite bibliothèque d 'adaptation de jeu JS lors de la création de l' exemple`“libs/laya.wxmini.js”`Comme le montre la figure ci - dessous.

![图](img/17.png) 


Code dans la figure:


```html

<!--提供了微信小游戏的适配-->
<script type="text/javascript" src="libs/laya.wxmini.js"></script>
```


Si c 'est un ancien projet ts ou JS avant 1.7.15`bin/index.html`Ajoutez manuellement ce code dans la zone rouge de la figure et vérifiez également si l 'utilisation actuelle est la nouvelle bibliothèque de moteurs de version après 1.7.15 ou, si ce n' est pas le cas, passez à la nouvelle bibliothèque de moteurs, faute de quoi, au cours de l 'opération, il sera impossible de trouver laya.wxmini.js.

#####Procédé d 'adaptation de projet AS3

Dans le cas du projet AS3, après utilisation de la nouvelle bibliothèque de moteurs d 'édition après 1.7.15, il suffit que l' développeur ajoute manuellement ce code à la catégorie d 'entrée, c' est - à - dire qu 'il achève l' introduction de la petite bibliothèque d 'adaptation de jeu.


```java

import laya.wx.mini.MiniAdpter;
```



####Bibliothèque d 'adaptation de petit jeu initialisée

L 'ancien projet n' ayant pas initialisé la Bibliothèque d 'adaptation à l' entrée du projet au moment où il a été mis en place, il est nécessaire d 'initialiser la Bibliothèque d' adaptation à l 'intérieur de l' entrée du jeu pour assurer la distribution réussie de la version de micromessagerie.

**Tips**- Oui.*L 'adaptation de micromessagerie initialisée est nécessaire avant l' initialisation du moteur.*

#####La méthode d 'adaptation des éléments ts et JS est indiquée dans la figure ci - après:

![图](img/18.png) 


Les codes d'adaptation des éléments ts ou JS dans la figure sont les suivants:


```typescript

//初始化小游戏适配库
Laya.MiniAdpter.init();
```


#####La méthode d'adaptation du projet AS3 est indiquée dans la figure ci - après:

![图](img/6.png) 


Les codes d'adaptation pour les projets AS3 dans la figure sont les suivants:


```java

//微信小游戏适配
MiniAdpter.init();
```




####Compiler les codes d 'adaptation

Pour compléter l 'ajout d' un code d 'adaptation, cliquez sur le bouton d' ajustement compilateur ou exécutant (F5) et voyez un cube tridimensionnel sans erreur de présentation.

![图2](img/2.png) 


> Tips: si l 'adaptation est réalisée, le code d' adaptation n 'entrera pas en vigueur.

Ferme la fenêtre qui sort du réglage.On peut entrer dans la chaîne de lancement du petit jeu.

Ainsi, l 'adaptation du petit jeu est terminée.

Pour résumer brièvement, après l 'utilisation du nouveau moteur, la Bibliothèque d' adaptation est citée, la Bibliothèque d 'adaptation initialisée, ces deux étapes essentielles.C 'est plus simple.

D 'autres petites annonces de jeux, de mise en page, etc.Affiche d 'autres documents pertinents.

Si vous avez des questions sur ce document, adressez - vous à la communauté Internet pour lui poser des questions et envoyer des liens dans la communauté à l 'administrateur

Site Web communautaire: < https: / / ask.layabox.com >



##Appreciation

Si vous trouvez cet article utile pour vous, bienvenue à l 'auteur du Code de balayage, votre motivation est de nous pousser à écrire plus de documents de qualité.

![wechatPay](../../../wechatPay.jpg)