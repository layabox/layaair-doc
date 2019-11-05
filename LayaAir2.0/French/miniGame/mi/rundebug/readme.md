# 小米快游戏发布与调试指南

> update: 2019 - 07 - 17
]
> millet Fast Game should be published by layaairide, related to the download of idea, please see documents, not in the present introduction.

##Millet, préparez - vous à jouer.

Les téléphones portables de la marque millet (attention doit être la version MIUI - 8.5 ou plus).

Téléchargement de l 'app de test du millet installé, page suivante:[[https://dev.mi.com/console/doc/detail?pId=1738](https://dev.mi.com/console/doc/detail?pId=1738)] (https: / / dev.mi.com / console / DOC / detail? Pid = 1779)

Après entrer dans la page, descendre et trouver la troisième étape,**Self - test**Dans cette colonne, cliquez sur le bouton pour télécharger.

PC Computer Chrome Browser connection with Mobile Data line.

Installation de l 'environnement nodejs[node官网：[https://nodejs.org/en/](https://nodejs.org/en/)]

Installation de téléchargement, plus simple, sans présentation détaillée.Même si vous réussissez à faire passer les commandes NPM dans la ligne de commande.

Layaairide Concentrate development environment, layaair 2.0.2beta ou plus[ 官网下载: [https://ldc2.layabox.com/layadownload/?type=layaairide](https://ldc2.layabox.com/layadownload/?type=layaairide)]

Installation de l 'ADB

Il est proposé d'installer un ADB car, dans certains cas, l'autorisation ou d'autres raisons sont étranges.Cela peut empêcher le démarrage normal de la mise en oeuvre de la configurationAinsi, l 'installation de l' ADB permet d 'authentifier et de faciliter l' autorisation de connexion du téléphone mobile à l 'ordinateur PC.Si vous assurez qu 'il n' y a pas de problème d 'autorisation de débogage USB, vous pouvez également ne pas charger.


 [ ADB官网下载:  [http://adbshell.com/downloads](http://adbshell.com/downloads)]

Pour infobulles simples, téléchargez ADB kits, paquet de compression téléchargé, et suggérez de décompresser dans un répertoire plus simple (par exemple:`D:\adb`).N 'oubliez pas d' ajouter une variable d 'environnement.

##Millet Fast Game Distribution and access complete Process

###Lancement du jeu rapide du millet (xx.rpk)

Layaairide Publishing Function included millet Fast Game function, needs to first layaair Engine Project through Publishing function to the package.rpk.Concernant l 'utilisation de la fonction de publication.Je ne vous présente pas ici.Non, vous pouvez accéder au document officiel.

Liens:[https://ldc2.layabox.com/doc/?nav=zh-ts-3-0-6](https://ldc2.layabox.com/doc/?nav=zh-ts-3-0-6)

###Conserve l 'interface de Code bidimensionnel de publication.

Une fois la publication terminée, il y aura une interface de Code bidimensionnel, comme le montre la figure 1.N 'éteignez pas l' interface, il faut utiliser le Code de balayage du portable.

![图1](img/1.png) 


(Figure 1)

###Ouvrir le dossier de publication et démarrer le mode ligne de commande

Figure 1`打开发布文件夹`Cliquez sur le bouton pour entrer dans le répertoire des projets de jeu rapide du millet.Et tiens bon.`Shift + 右键`Vous pouvez accéder rapidement à Shell ou au mode fenêtre de commande dans le répertoire actif, comme l 'indique la partie de la figure 2 - 1 ou 2 - 2.

![图2-1](img/2-1.png) 


(Figure 2 - 1)

![图2-2](img/2-2.png) 


(Figure 2 - 2)


当然，也可以通过Git进入命令行（Git Bash Here）或者其它方式进入命令行，然后进入小米快游戏项目目录即可完成本步骤。

Cette section est principalement destinée à indiquer à l 'développeur comment entrer dans le Répertoire de distribution actuel en mode ligne de commande.Parce que l 'instruction debug de démarrage de la mise en oeuvre de la commande de chrome doit être mise en oeuvre dans le Répertoire de distribution du jeu rapide de millet.Ceci permet de comprendre facilement et de maintenir la ligne de commande ouverte.On en aura besoin.

###Activer l 'environnement de débogage

####4.1 installation et accès aux modems d 'application rapide

Pour activer l 'environnement de programmation de l' ordinateur PC, nous devons d 'abord installer l' app de débogage du jeu rapide du millet, comme le montre la figure 3.Puis cliquez sur Entrée.

![图3](img/3.png) 


(Figure 3)

####4.2 emballage RPK pour jeux rapides de millet installé dans le Code de balayage de l 'interface du modem d' application rapide

Après avoir pénétré dans le modem d 'application rapide, nous pouvons voir l' interface de fonctionnement app telle qu 'elle est présentée à la figure 4.

![图4](img/4.png) 


(Figure 4)

À ce moment - là, nous avons cliqué sur l 'installation du Code de balayage de la figure 4 et avons balayé le Code bidimensionnel de l' interface d 'affichage de layaair (qui n' avait pas été désactivé avant d 'être rediffusé pour être affiché).Les téléphones mobiles fonctionnent dans un environnement virtuel.

"> ce qui est indiqué ici, c 'est que le réseau de téléphones portables doit être dans le même segment de réseau local que le PC (il ne sera certainement pas possible de balayer le Code du réseau local avec le réseau 4G).

Si le paquet RPK contenu dans le catalogue de diffusion / Dist est transféré dans le téléphone portable, passez par le point de passage`本地安装`Ce bouton peut être installé.Cependant, il est recommandé d 'installer le Code de balayage, car l' étape du Code de balayage est plus facile et plus rapide.

####4.3 maintien de la connexion physique et autorisation

Pour les développeurs plus expérimentés, assurez - vous que la ligne physique de connexion USB est connectée et que l 'autorisation de débogage USB ne pose aucun problème, cette étape peut être franchie.

#####Les opérations associées sont les suivantes:

Utiliser d 'abord la ligne de connexion pour maintenir la connexion physique entre le téléphone mobile et le PC.Ouvre le mode concepteur du téléphone mobile et ouvre la mise en page USB.

À ce moment - là, nous devons nous demander si les messages apparaissent sur les extrémités du téléphone portable, comme le montre la figure 5 - 1, et, dans l 'affirmative, si le point permet la mise à l' essai.

![图5-1](img/5-1.png) 


(Figure 5 - 1)

Autorisation d 'authentification.

Lorsque le mode USB de débogage est validé, nous saisissons les DB Devices, comme le montre la figure 5 - 3.

![图5-2](img/5-2.png) 


(Figure 5 - 2)

En résumé, nous devons veiller à ce que le PC ait le droit d 'utiliser ce téléphone portable.

####4.4 démarrage de l 'environnement d' essai de chrome

Millet Fast Game without Tools for Developing and Scheduling environment is connected via USB to mobile phone DEVICE, and through PC Order Mode`npm run debug`Commander la mise à l 'essai de chrome (à condition que le PC soit équipé d' un navigateur Chrome) pour connecter les paquets RPK de l 'environnement de téléphonie mobile, comme le montre la figure 6.

![图6](img/6.png) 


(Figure 6)

Quand on voit`Debugger URL opened in Chrome.`Cet indice indique que le chrome a été relevé avec succès et qu 'il est conforme à l' image contenue dans la machine.Comme le montre la figure 7.Toutes les opérations de la machine seront complètement synchronisées avec PC, et nous allons adapter le projet de jeu rapide du millet de la manière Chrome.

![图7](img/7.png) 


(Figure 7)

Ainsi, le processus complet du jeu rapide millet depuis sa publication jusqu 'au démarrage de la mise à l' essai de chrome a été présenté.

Final specific Test ModePas dans ce chapitre.



##Appreciation

Si vous trouvez cet article utile pour vous, bienvenue à l 'auteur du Code de balayage, votre motivation est de nous pousser à écrire plus de documents de qualité.

![wechatPay](../../../wechatPay.jpg)

