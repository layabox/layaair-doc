#Oppo Guide pour la publication et la mise en page de petits jeux

> update: 2019 - 07 - 06
]

##Oppo Small Game Publishing, Test Environment preparation

Oppo marque de téléphone mobile.

Installer le test de machine popo

Accès aux documents officiels oppo[https://cdofs.oppomobile.com/cdo-activity/static/201810/26/quickgame/documentation/games/use.html](https://cdofs.oppomobile.com/cdo-activity/static/201810/26/quickgame/documentation/games/use.html)- on l'a trouvé.`安装 runtime.apk 包到 OPPO 手机上`Cette rubrique sélectionne généralement une nouvelle version pour télécharger.

Notez que la version du modem contient un numéro de plate - forme minimal.Layaairide doit correspondre à la version la plus petite ici.

PC Computer Chrome Browser connection with Mobile Data line.

Installation de l 'environnement nodejs, proposition d' installation de la version stable 8.x[node官网：[https://nodejs.org/en/](https://nodejs.org/en/)]

Installation de téléchargement, plus simple, sans présentation détaillée.Même si vous réussissez à faire passer les commandes NPM dans la ligne de commande.

Layaairide concentration Environment, layaair 1.8.3 Beta ou plus[ 官网下载: [https://ldc.layabox.com/layadownload/?type=layaairide](https://ldc.layabox.com/layadownload/?type=layaairide)]

Installation de l 'ADB

Lors de la publication de l 'oppo, le paquet RPK est mis dans le catalogue des jeux de téléphones portables par l' intermédiaire de l 'ADB, donc il faut le charger.


 [ ADB官网下载:  [http://adbshell.com/downloads](http://adbshell.com/downloads)]

"> pour infobulles, téléchargez ADB kits, paquet de compression téléchargé, et suggérez de décompresser dans un répertoire où le chemin est plus simple (par exemple:`D:\adb`).N 'oubliez pas d' ajouter une variable d 'environnement.
]

##Opepo Small Game Distribution and access complete Process

###Inspection préalable à la publication.

Il y a du travail d 'inspection à faire pour que la publication de popo soit plus facile.

Tout d 'abord, dans le PC, l' environnement Node, l 'ADB, le chrome doivent être installés.

Dans le portable de l'oppo, entrez.`设置-> 其它设置-> 开发者选项`, les options de développeur et la mise en page USB doivent être activées, comme le montre la figure 1.

![图1](img/1.png) 


(Figure 1)

En outre, il faut veiller à ce que l 'environnement de mise en page des jeux popo soit bien installé, comme le montre la figure 2.

![图2](img/2.png) 


(Figure 2)

Troisièmement, les ordinateurs PC sont reliés à des lignes de données USB pour les téléphones portables, et des interfaces similaires peuvent apparaître dans les ordinateurs.Par exemple, cliquez sur oppo r9m dans le coin supérieur gauche de la figure 3 pour accéder à la mémoire du téléphone mobile.

![图3](img/3.png) 


(Figure 3)

Notez que l 'écran reste allumé et que, lors de l' émission d 'un petit jeu oppo par l' identificateur PC, si le téléphone mobile présente une demande d 'informations d' autorisation, il est important de déterminer l 'autorisation.Comme le montre la figure 4.

![图4](img/4.png) 


(Figure 4)

###Édition d 'un paquet de jeux Popo (xx.rpk)

Layaairide Publishing function, including the opepo Small Games, needs to first layaair Engine Project through the Publishing function to a package.rpk.Concernant l 'utilisation de la fonction de publication.Je ne vous présente pas ici.Non, vous pouvez accéder au document officiel.

Liens:[[https://ldc.layabox.com/doc/?nav=zh-as-2-0-4](https://ldc.layabox.com/doc/?nav=zh-as-2-0-4)] (https: / / ldc2.layabox.com / DOC /? Nav = ZH - TS - 2 - 0 - 6)

###Test de machine et sortie de chrome

La configuration de l 'oppo doit être basée sur une configuration en machine, la chrome du PC ne peut produire que des informations et ne peut pas voir l' image.

Si les travaux préparatoires ne posent pas de problème, normalement, après la distribution réussie d 'un petit jeu oppo à layaairide, les paquets RPK apparaîtront automatiquement dans la liste de jeux popo à jeu rapide (l' IDE est poussé dans le répertoire spécifié en appelant l 'ADB), comme le montre la figure 5.

![图5](img/5.png) 


(Figure 5)

Figure 5`OPPO测试`C 'est le nom du jeu que nous avons rempli lors de la publication.Si nous voyons le nom du jeu correspondant, cela signifie que la distribution normale a réussi.Cliquez une seconde pour ouvrir le jeu que nous avons lancé.

Si vous voulez voir les informations de débogageIl faut ouvrir le Browser.Et saisissez dans la barre d 'entrée:


```

chrome-devtools://devtools/bundled/inspector.html?v8only=true&ws=10.10.82.111:12345/00010002-0003-4004-8005-000600070008
```


Adresse IP de l 'exemple ci - dessus`10.10.82.111`Remplacer l 'IP sur son portable.L 'adresse IP ne sait pas comment l' identifier.L 'accent est mis ici sur le fait que les PC doivent être placés dans le même réseau local que les téléphones portables.

Si ce n'est pas le cas, les résultats sont indiqués à la figure 6.

![图6](img/6.png) 


(Figure 6)

La publication et la mise en page sont terminées si tout va bien.

###Diffusion d'expériences de traitement non concluantes.

Le document ci - dessus est un processus en bon état.Mais le développeur n 'a peut - être pas été aussi bon, alors parlons de l' expérience.

####Qu 'est - ce qui se passe?

Si on n 'envoie pas automatiquement RPK au catalogue de jeux rapides au moment de la publication, on ne peut pas voir directement le petit jeu qui vient d' être lancé dans la liste de la figure 5.

On peut utiliser l 'ADB pour confirmer l' environnement.

Saisie dans un terminal d 'IDE ou dans un Cmd`adb devices`Instruction.

#####Anomalie de connexion:

![图7-1](img/7-1.png)  


(Figure 7 - 1)

Le développeur doit alors vérifier la connexion du téléphone mobile et vérifier si les droits sont corrects.

#####Lorsque la connexion est normale:

![图7-1](img/7-2.png)  


(Figure 7 - 2)

Ceci indique que le téléphone mobile a été connecté avec succès et que le modèle développeur a été mis en service avec le module USB.Vous pouvez alors essayer de réinitialiser l 'APK d' application rapide d 'OPEP, puis vérifier les informations de liste.

**En cas de connexion normale**En cas de problème.Il peut s'agir de la compétence Windows et il faut veiller à ce que l'autorité de l'Administrateur soit utilisée pour lancer le layaairide.

En ce qui concerne les questions liées à l 'ADB ou aux droits des téléphones portables, les développeurs peuvent les comprendre eux - mêmes.

- Oui.

Un autre mode de réalisation permet de copier le paquet RPK en mode manuel dans le répertoire des Games stocké sur le téléphone mobile, et de créer le paquet à la main s' il n 'y a pas de répertoire des Games.

Le sac RPK se trouve dans la table des matières relative au projet (release / oppagame / quickgame / DIST), comme le montre la figure 8.

![图8](img/8.png)  


(Figure 8)

Le fichier RPK généré est copié dans le répertoire des Games stocké sur un téléphone portable, comme le montre la figure 9.

![图9](img/9.png)  


(Figure 9)

Ce procédé est plus stable.

Oui.`.rpk`Lorsque le document a été créé avec succès, le processus de publication est pratiquement terminé.

En cas de problème, la question peut être renvoyée à l'équipe officielle de layabox, qui s'en occupe avec l'équipe de l'oppo.

Enfin, rappelez - vous que ce document S' applique à la procédure de publication du moteur layaair2.x et de l 'IDE.

Si c'est un moteur 1.x,

Il faut d 'abord introduire manuellement la Bibliothèque d' adaptation et l 'initialiser manuellement, ce qui est différent du 2.x.


```typescript

//TS或JS初始化
Laya['QGMiniAdapter'].init();//需要引入aya.quickgamemini.js

//as3初始化
QGMiniAdapter.init();//需要 import laya.qg.mini.QGMiniAdapter;
```


Il y a d'autres domaines qui méritent d'être étudiés, ainsi que le processus de traitement des détails.Bienvenue à visiter la vidéo gratuite de l 'accès popo.

Adresse vidéo:[https://ke.qq.com/course/409332](https://ke.qq.com/course/409332)

##Appreciation

Si vous trouvez cet article utile pour vous, bienvenue à l 'auteur du Code de balayage, votre motivation est de nous pousser à écrire plus de documents de qualité.

![wechatPay](../../../wechatPay.jpg)

