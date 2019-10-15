#Guide pour la publication et la mise en page des jeux vidéo

> update: 2019 - 07 - 01
]
> les jeux vidéo vivo doivent être publiés à l 'aide de layaairide, pour ce qui est de l' utilisation du téléchargement de l 'IDE, consultez les documents pertinents, pas dans le cadre de cette présentation.

##Préparation de l 'environnement de jeu

Téléphone portable de la marque vivo

Téléchargement de l 'app de débogage pour l' installation de vivo, page téléchargée:[https://minigame.vivo.com.cn/documents/](https://minigame.vivo.com.cn/documents/#/download/debugger)#[/download/debugger](https://minigame.vivo.com.cn/documents/#/download/debugger)

Dès que vous entrez dans la page, cliquez pour télécharger l 'installation.Pour ce qui est de l 'installation de l' app de test vivo, il n 'est pas question ici.

Télécharger le moteur de petit jeu de vivo

Present**App**La version interne du moteur vivo est 1034, cette version est connue du bug, nous devons télécharger la version la plus récente du moteur de jeu en ligne.

Télécharger la page suivante:

Https: / / minigame.vivo.com.cn / documents /#/ download / Engine

La version actuelle de la recommandation est 1041, après téléchargement, nous pouvons voir le numéro de plate - forme du testeur d 'application rapide vivo, également affiché là - Bas.

PC Computer Chrome Browser connection with Mobile Data line.

Installation de l 'environnement nodejs[node官网：[https://nodejs.org/en/](https://nodejs.org/en/)]

Installation de téléchargement, plus simple, sans présentation détaillée.Même si vous réussissez à faire passer les commandes NPM dans la ligne de commande.

Layaairide Concentrate development environment, layaair IDE - 2.1.1beta ou plus[ 官网下载: [https://ldc2.layabox.com/layadownload/?type=layaairide](https://ldc2.layabox.com/layadownload/?type=layaairide)]

Installation de l 'ADB

L 'ADB peut être utilisé pour l' autorisation, la publication, etc., et peut être téléchargé et installé sur le site Web officiel de l 'ADB.


 [ ADB官网下载:  [http://adbshell.com/downloads](http://adbshell.com/downloads)]

"> un simple rappel, téléchargement d 'ADB kits, paquet de compression téléchargé, suggérant de décompresser dans un répertoire où le chemin est plus simple (par exemple:`D:\adb`).N 'oubliez pas d' ajouter une variable d 'environnement.
]

##Diffusion et accès complets

###Afficher le paquet de jeux vidéo vivo (xx.rpk)

Layaairide Publishing function, including the Publishing Function of vivo Games, required First layaair Engine Project, through the Publishing function to the package.rpk.Concernant l 'utilisation de la fonction de publication.Je ne vous présente pas ici.Non, vous pouvez accéder au document officiel.

Liens:[https://ldc2.layabox.com/doc/?nav=zh-ts-3-0-6](https://ldc2.layabox.com/doc/?nav=zh-ts-3-0-6)

###Conserve l 'interface de Code bidimensionnel de publication.

Une fois la publication terminée, il y aura une interface de Code bidimensionnel, comme le montre la figure 1.N 'éteignez pas l' interface, il faut utiliser le Code de balayage du portable.

![图1](img/1.png) 


(Figure 1)

###Activer l 'environnement de débogage

####3.1 installation et accès aux modems d'application rapide

Pour activer l 'environnement de programmation chrome du PC, nous devons d' abord installer l 'app de débogage du jeu vidéo vivo, comme le montre la figure 3.Puis cliquez sur Entrée.

![图3](img/3.png) 


(Figure 3)

####3.2 paquets RPK pour jeux vidéo vidéo vidéo installés dans le Code de balayage de l 'interface du modem d' application rapide

Après avoir pénétré dans le modem d 'application rapide, nous pouvons voir l' interface de fonctionnement app telle qu 'elle est présentée à la figure 4.

![图4](img/4.png)  


(Figure 4)

À ce moment - là, nous avons cliqué sur l 'installation du Code de balayage de la figure 4 et avons balayé le Code bidimensionnel de l' interface d 'affichage de layaair (qui n' avait pas été désactivé avant d 'être rediffusé pour être affiché).Les téléphones mobiles fonctionnent dans un environnement virtuel.

"> ce qui est indiqué ici, c 'est que le réseau de téléphones portables doit être dans le même segment de réseau local que le PC (il ne sera certainement pas possible de balayer le Code du réseau local avec le réseau 4G).

Si le paquet RPK contenu dans le catalogue de diffusion / Dist est transféré dans le téléphone portable, passez par le point de passage`本地安装`Ce bouton peut être installé.Cependant, il est recommandé d 'installer le Code de balayage, car l' étape du Code de balayage est plus facile et plus rapide.

####3.3 maintien de la connexion physique et autorisation

Pour les développeurs plus expérimentés, assurez - vous que la ligne physique de connexion USB est connectée et que l 'autorisation de débogage USB ne pose aucun problème, cette étape peut être franchie.

#####Les opérations associées sont les suivantes:

Utiliser d 'abord la ligne de connexion pour maintenir la connexion physique entre le téléphone mobile et le PC.

Sous la ligne de commande précédemment ouverte, saisissez ADB - Shell, comme le montre la figure 5 - 1.Dans le cas contraire, l 'autorisation de mode de débogage USB n' est pas obtenue.

![图5-1](img/5-1.png) 


(Figure 5 - 1)

À ce moment - là, nous devons nous demander si les messages apparaissent sur les extrémités du téléphone, comme le montre la figure 5 - 2, et, dans l 'affirmative, s' il y a une détermination de point permettant l' ajustement USB.

![图5-2](img/5-2.png) 


(Figure 5 - 2)

Confirmation de l 'autorisation.

Lorsque l 'autorisation USB du mode de débogage est validée, nous saisissons à nouveau l' ADB Shell, comme le montre la figure 5 - 3.

![图5-3](img/5-3.png) 


(figures 5 à 3)

En résumé, nous devons veiller à ce que le PC ait le droit d 'utiliser ce téléphone portable.

####3.4 démarrage de l 'environnement d' essai de chrome

Avant l 'installation du Code de balayage, vous entrez automatiquement dans le jeu qui vient d' être installé ou Demo.

Pour démarrer le débogage, il faut d 'abord se retirer.

Puis, comme le montre la figure 6, cliquez sur**Démarrer**, entre dans le mode de réglage du jeu vidéo.

![图6](img/6.png) 


(Figure 6)

Lorsque la machine est entrée dans le mode de configuration, on ouvre le navigateur Chrome sur PC.

N 'oubliez pas à ce moment - là que pour connecter les lignes de données USB et connecter les équipements de téléphonie mobile au PC, la question des droits a été posée et ne sera pas répétée.

Nous devons trouver l 'IP du téléphone portable à la fin du téléphone et nous souvenir de lui.Il est important de noter que le réseau mobile et le réseau PC sont toujours dans la même section locale.

Saisissez dans la barre d 'entrée du navigateur Chrome:


```

chrome-devtools://devtools/bundled/inspector.html?v8only=true&ws={IP}:5086/00010002-0003-4004-8005-000600070008
```


Remplacer {Ip}

![图7](img/7.png)(图7)




Ainsi, le processus complet du jeu vivo depuis la publication jusqu 'au démarrage de la mise en oeuvre de la mise en page Chrome est présenté.Si vous voulez en savoir plus sur le processus d 'accès et la présentation de documents pour un plus grand nombre de jeux vidéo, souvenez - vous de ce site:

Https: / / minigame.vivo.com.cn



##Appreciation

Si vous trouvez cet article utile pour vous, bienvenue à l 'auteur du Code de balayage, votre motivation est de nous pousser à écrire plus de documents de qualité.

![wechatPay](../../../wechatPay.jpg)

