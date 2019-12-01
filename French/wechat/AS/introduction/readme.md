# 微信小游戏入门介绍


> Author: charley

#####D'abord, qu'est - ce qu'on doit savoir sur les micros?

L'explication officielle du jeu est:

Le petit jeu de micro - lettre est une sorte de programme de micromessagerie, c 'est - à - dire qu' il est instantané, sans téléchargement, sans avoir à expérimenter, peut jouer avec des amis dans le micro - message, par exemple PK, entourage, etc.

Non vérifié - la page s' ouvre dans une nouvelle fenêtre ou un nouvel ongletC'est censé être le jeu H5?

Comment ça?Cela commence par la définition de H5...

H5 est généralement considéré comme le nom abrégé de HTML5, mais aux yeux de l 'développeur, HTML5 n' est qu 'une norme technique Web qui satisfait à cette norme et le jeu qui peut fonctionner dans un navigateur est le jeu HTML5.Plus de gens connaissent mal la technologie.Pour plus de commodité, les jeux qui ne nécessitent pas de téléchargement sont appelés jeux H5 et les jeux de pages de téléphonie mobile.

L 'environnement de fonctionnement d' un petit jeu de micromessagerie n 'est pas un navigateur, ni un navigateur, mais un Runtime dans un app de micromessagerie.Bien que les interfaces des microjeux soient compatibles avec la plupart des fonctionnalités Canvas et webgl, elles sont instantanées sans téléchargement des caractéristiques HTML5 installées.Il est clair que les jeux de micromessagerie ne sont pas des jeux standard HTML5.

**Alors...**Comment le développement du jeu peut - il fonctionner dans un navigateur?

####Est - ce que les développeurs ne peuvent utiliser que l 'API libre des jeux de micro - messages?

Avec ces deux questions, nous poursuivrons notre présentation.

Comme on le sait, le moteur layaair est basé sur l 'ensemble de la plate - forme HTML5, puisque c' est l 'ensemble de la plateforme, il ne faut pas rater le petit jeu de micromessagerie!

Ainsi, le jour de la publication du jeu de micromessagerie, le moteur layaair a également lancé pour les développeurs une bibliothèque d 'adaptation du jeu de micromessagerie.À partir de la version layaair 1.7.14, les développeurs téléchargent le moteur ou l 'ide de la dernière version, et il suffit d' initialiser le Programme d 'adaptation conformément au document de programme d' adaptation pour adapter sans interruption le projet de jeu HTML5 à un petit jeu de micromessagerie.

Ainsi, les projets mis au point par l 'intermédiaire du moteur layaair peuvent fonctionner non seulement dans un navigateur, mais aussi dans une plate - forme pour un jeu de micromessagerie.

Peut - être le développeur veut - il savoir, puisque le jeu de micro - messagerie n'est pas HTML5,

####Quelles sont les différences à prendre en compte dans le processus de développement?

Si l 'API est mis au point au moyen d' un micro - message officiel, il faut faire attention, par exemple ne pas soutenir DOM et Bom, les petits jeux ne peuvent avoir qu 'une toile, ne pas soutenir eval, ne pas soutenir XML, etc...

Mais...

Pour les concepteurs du moteur layaair, il n 'est pas nécessaire de comprendre les différences, il suffit de suivre les règles normales de développement du moteur layaair.Lorsque le développement est terminé, cliquez directement sur le bouton de distribution du projet, peut être publié sous forme de micromessagerie.Comme le montre la figure 1.

![图1](img/7.png)  


(Figure 1)

Donc, le projet du moteur layaair, après la publication d'une touche, est - ce que tout peut courir dans un micro - ordinateur?En théorie tout peut être supporté sauf si le jeu n 'est pas supporté par une tierce banque, ou si le microjeu a son propre bug, par exemple un masque et un cache - cache, qui n' est pas supporté depuis le début, qui a été soutenu par la communication avec la technologie officielle du petit jeu, mais que certaines versions de micro - messages n 'ont pas été mises à jour après réparation, il peut y avoir des problèmes, s' il y a des écransIl est recommandé d 'utiliser avec prudence les masques et les casheas, la plupart du temps parce que les casheas sont utilisés.

En outre, le jeu de micro - messagerie ne permet pas au moteur de commander la taille de Canvas.Les Canvas du petit jeu sont automatiquement étirés.Il en résulte que le mode d 'adaptation partiel de layaair est invalide et qu' il est recommandé d 'utiliser le mode d' adaptation fixedauto ou full.

Pour les anciens projets qui ont été mis au point avec le moteur layaair,**Remplacer la dernière version de la Bibliothèque de moteurs**Avant d 'utiliser laya.init () à l' entrée principale du programme, l 'appel miniadpter.init () permet d' initialiser le Programme d 'adaptation, ce qui permet d' appuyer de manière parfaite les microjeux.

**Initialisation d 'Adaptation d' une version AS3**


```java

//AS3版本初始化微信小游戏的适配
MiniAdpter.init();
//初始化引擎
Laya.init(1136,640);
```


**Initialisation d 'adaptation de versions Typescript ou javascript:**


```javascript

//TS或JS版本初始化微信小游戏的适配
Laya.MiniAdpter.init();
//初始化引擎
Laya.init(1136,640);
```


> Tips: l 'ancien projet s' accompagne d' un document spécial pour la présentation, bienvenue à bord.



Pour d 'autres présentations sur le petit jeu lui - même, consultez directement le document officiel du petit jeu.

[https://developers.weixin.qq.com/minigame/dev/index.html](https://developers.weixin.qq.com/minigame/dev/index.html)

Il est fortement recommandé de regarder les documents officiels des jeux, les documents des moteurs layaair sont beaucoup plus liés aux moteurs, bien sûr, il y a aussi un certain nombre d 'interfaces de jeu, mais regardez attentivement les documents officiels.