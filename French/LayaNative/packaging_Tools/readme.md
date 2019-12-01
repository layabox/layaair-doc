# LayaBox打包工具


使用 LayaAir IDE 创建的项目，不仅可以生成 h5 页面在网站上运行，也可以打包成App 在移动端安装运行。不过，目前只支持打包Andorid版本的app，因为IOS系统只能够通过Apple的XCode来打包，无法使用其他第三方的工具进行打包。关于构建IOS的XCode项目工程，可以参考 “构建项目” 的文档。

La fonction Packaging n 'est utilisée que pour des essais et des démonstrations rapides et, si c' est vraiment à publier, il est recommandé d 'utiliser la méthode de construction du projet.



##Rôle:

Décochez les paquets layabox existants, modifiez les paramètres tels que l 'icône et la page de démarrage et créez un nouvel app.L 'app généré peut être installé directement sur les grandes plates - formes (les fonctions d' accès à l 'accès et les fonctions de paiement sont disponibles).

##Besoins opérationnels:
1. JDK ayant été installé au - dessus de 1,7 (y compris) et, si elle n'est pas installée, est disponible
   [这里](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)Télécharger

(il y a un problème: dans le système Mac, si 1,8 a déjà été installé, cela risque d 'entraîner une erreur d' emballage)

##Méthodes d'utilisation:
Cliquez sur l 'outil / emballage app du menu (version d' essai), comme suit:
![图片](1.gif)  

Après avoir rempli les paramètres, il suffit d 'emballer.**Temps de conditionnement**Si aucune erreur n 'est commise, le rythme atteint 100%.
Le Répertoire de sortie produit ensuite le résultat final de l 'emballage.

La signification de certains paramètres est expliquée ci - après.



##Android APK Packaging
###4.1 interface principale:
![图片](2.png)



###4.2 signification des paramètres d'interface:

####4.2.1 version électronique

Si vous cochez cette case, vous devez emballer la version mono - machine, sinon, vous pourrez l 'emballer en ligne.
Il n'y a pas de connexion pour les versions uniques et il n'y a pas d'URL correspondant.Il n 'y a donc pas d' URL à fournir, mais il faut fournir une ressource de jeu pour que la page de démarrage soit fixée à l 'index.html dans le trajet de ressources.Si la page de démarrage du projet n 'est pas index.html, une erreur de réseau sera signalée au démarrage de l' app.
La version en ligne doit comporter un URL, et la question de savoir si les ressources peuvent être emballées est laissée à la discrétion (voir ci - après la section intitulée « Resource path »).
　　![图片](3.gif)< br / >
　　**Les opérations de réseau peuvent être réalisées par xmlhtprequest ou websocket, même dans une version mono - ordinateur, mais ne permettent pas la mise à jour dynamique des ressources.**



####4.2.2 nom

Est le nom de l 'APP, affiché après l' installation sous l 'icône app.
Par exemple:
![图片](4.png)    

 `猎刃2`Voilà le nom à remplir.
* Tips: pour le moment, seuls les noms figurant dans le système chinois peuvent être modifiés.*



####4.2.3 nom du sac

Le nom de paquet utilisé par Android n 'est pas visible en temps normal.Les règles de nomenclature des noms de domaine sont généralement utilisées (ce qui permet d'identifier et d'éviter les conflits avec les apps déjà présents dans le système).
Par exemple: com.layabox.runtime.demo
Le nom de paquet doit être au format xxx.yy.zzz, avec au moins deux niveaux, à savoir xxx.yy.Sinon, le sac échouera.



####4.2.4 jeu URL

Etant donné que l 'application de conditionnement est un projet en ligne, il est nécessaire de fournir un URL de démarrage qui indique une page HTML, l' entrée de l 'application.Si le projet est généré par layaair, il y a une adresse index.html à l 'intérieur du Code bidimensionnel ouvert, qui peut être utilisée directement lors de l' essai.Mais quand une application anrod est activée, il faut avoir une vraie adresse Webserver.Par exemple:
* adresse du réseau local: *


```

    http://10.10.20.19:8888/index.html
```

* adresse effective: *

```

    http://layaair.ldc.layabox.com/layaplayer/index.html
```




####4.2.5 catalogue de sortie

Le résultat de l 'emballage, s' il n' y a pas d 'erreur, ce répertoire génère un fichier de rechargement, maintenant fixé au nom de game.apk.Vous pouvez changer de nom quand vous l'utilisez.
Le changement de nom de fichier n 'affecte pas le nom affiché après l' installation de l 'app.
　　*En cas d'interruption du processus d'emballage, il restera des catalogues provisoires dans ce répertoire, auquel cas il suffira de les supprimer directement.*



####4.2.6 filière des ressources

La ressource est une ressource de jeu réelle, telle qu 'un script, une image, un son, etc.Pour les jeux en ligne, il suffit que le URL du jeu fonctionne normalement, mais si l 'on met les ressources directement dans le paquet, on évite le téléchargement sur le réseau et on accélère le chargement des ressources.Dans le cas d 'un jeu mono - ordinateur, faute d' un URL de jeu, il est nécessaire d 'enregistrer toutes les ressources nécessaires dans l' APK.Notez que les ressources emballées dans l 'APK peuvent encore être mises à jour grâce à notre outil DCC (gestion de la mémoire cache des ressources).

　　*Le jeu en ligne des ressources de packaging, il faut taper le DCC à l 'extrémité de Server, sinon on perd l' avantage de l 'emballage et on télécharge toujours toutes les ressources.Comment composer le DCC[LayaDcc打包工具](https://github.com/layabox/layaair-doc/tree/master/Chinese/LayaNative/LayaDcc_Tool)*



####4.2.7 Icon

Un fichier d 'icônes de l' APP, sur la base duquel l 'outil de conditionnement génère les icônes de chaque taille désirée par Android.Par conséquent, l 'icône correspond de préférence à la taille de l' icône maximale d 'Android, par exemple 144x144, et si l' image originale est trop petite, l 'effet de l' icône générée peut être différent.Le format du fichier d 'icône doit être JPG ou PG et, s' il y a un angle circulaire, le format PG et la partie angulaire doivent être transparents.



####4.2.8 keystore, keystore password, alias, alias password

Ce sont les paramètres de keystore.Keystore est utilisé pour signer l 'APK généré.S'il n'est pas rempli, l'outil de conditionnement sera signé au moyen du fichier keystore qu'il emporte lui - même.Toutefois, pour des raisons de sécurité, il est recommandé d'utiliser son propre fichier keystore.S' il n 'y a pas de fichier keystore, on peut générer un keytool avec Java, ce qui permet de rechercher l' aide de keytool ou une centaine de degrés.

Pourquoi les codes keystore et alias?Keystore peut être considéré comme un ensemble de certificats pouvant contenir de nombreux certificats dont chacun a un alias, alias.Pour extraire un certificat à utiliser, il faut d 'abord entrer à keystore, puis le mot de passe de keystore, puis le certificat d' alias à l 'intérieur, puis le mot de passe de cette alias.



####4.2.9 scripts de configuration:

Pour le script de configuration, voir:[打包相关的其它设置综述](https://ldc.layabox.com/doc/?nav=ch-as-5-1-4)



####4.2.10 démarrage du logo:

Le logo dans la page de démarrage peut être remplacé par une image conçue par lui - même.

　　*Tips: services de sous - traitance layanative.Les cartes logo contenant layabox doivent être conservées sur la page de démarrage et seules les modifications de style de conception de logo peuvent être activées, c 'est - à - dire que les cartes logo de layabox peuvent être combinées avec les cartes logo du produit, etc.*



####4.2.11 emballage:

Cliquez après avoir rempli les paramètres`打包`Le bouton exécute le travail de conditionnement et le temps de conditionnement est plus long, de sorte qu 'il y a un indice de progression qui, s' il n' y a pas d 'erreur, atteint 100% du rythme, produit le résultat final de l' emballage dans le Répertoire de sortie.Après l 'emballage, un fichier de jeu.apk est généré dans le Répertoire de sortie.

