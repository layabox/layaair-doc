# LayaNative命令行工具
Layanative commande que les outils de ligne soient utilisés pour générer les projets originaux Android et IOS, ainsi que pour actualiser les ressources des projets afin de faciliter la mise à jour des ressources pendant l 'itération des projets.
Génération d 'éléments correspondant à la fonction de l' IDE`工具/app构建`".
**Attention:**
**Layanative2.0-android, la version minimum du système est de 4.0.**
**Layanative2.0-ios, la version minimale du système est de 10.0**
##Description détaillée de l'ordonnance
###Installation layanative
Windows

```

$ npm install -g layanative2  
```

Mac

```

$ sudo npm install -g layanative2  
```

###Accès à la version SDK
Le SDK est un modèle pour le projet Native.La commande listversion énumère toutes les informations de version SDK actuellement disponibles et peut spécifier les versions requises par paramètre lors de la création de l 'article Native ci - dessous.

```

$ layanative2 listversions  
```

###Création du projet national
Commande createapp pour la création d 'un projet native
Vous pouvez consulter l 'aide de createapp en suivant la commande suivante.

```

$ layanative2 createapp --help
```

####Emploi:
    layanative2 createapp [-f res_path] [--path output_path] [-s sdk_path | -v version] [-p all|ios|android_eclipse|android_studio|wkwebview] [-t 0|1|2] [-u url] [-n project_name] [-a app_name] [--package_name package_name]

####Description des paramètres

".
124 ---------------------------------------------------------------------------------
- 124.`--folder,-f`Les ressources du jeu sont emballées dans le client pour réduire le téléchargement sur le Web, choisissez un répertoire de jeux local, par exemple pour lancer l'index sous d: / game / index.html, le chemin de ressources étant d: / game.T pour 0 heures.
- 124.`--path`= catalogue de sortie du projet
- 124.`--version，-v`Version \ \ 124sdk: le système télécharge le SDK depuis le serveur et le stocke dans une position particulière en utilisant automatiquement une version spécifique du SDK.Les contradictions entre version et SDK ne peuvent pas être spécifiées en même temps, ni utiliser la dernière version du SDK par défaut.
- 124.`--platform, -p`[Option: All, IOS, Android \ \ u eclipse, Android \ \ u Studio, wkwebview] [valeur par défaut: All]
- 124.`--type, -t`‧ type de création [0: pas de paquet de ressources
- 124.`--url, -u`Adresse du jeu < \ \ / span >.
- 124.`--name, -n`= nom du projet: nom du projet Native [valeur par défaut: layabox]
- 124.`--app_name, -a`‧ nom d 'application & ‧‧;: nom affiché après l' installation de l 'app sur le téléphone portable [valeur par défaut: layabox]
- 124.`--package_name`[valeur par défaut: com.layabox.game]
- 124.`--sdk,-s`$124sdk local directory: Selected SDK directory, selective parameters.Utilisation dans le cas de la déconnexion du réseau
Lorsque le type est un ou deux, les ressources sont affectées au projet native, mais pas à 0 heures.Le fond de ressources de paquetage est en fait un procédé d 'appel de DCC.Packaging Resources DCC Correlation, reference[LayaDcc工具](https://ldc.layabox.com/doc2/?nav=zh-as-6-2-0)".
Le chemin de sortie de l 'élément peut être spécifié avec le paramètre -path, la sortie par défaut étant sortie sous le trajet actif.

Utilisation de SDK en version v2.0 sur la base de - V

```

$ layanative2 createapp -f SnowBallH5 -t 1 -n SnowBallNative -u http://10.10.20.102:8899/index.js -v v2.0
```


Ni V ni s, utilisez la dernière version du SDK.

```

$ layanative2 createapp -f SnowBallH5 -t 1 -n SnowBallNative -u http://10.10.20.102:8899/index.js
```

Un environnement de réseau est nécessaire pour spécifier les version s -----------------------------------------------------------------------------[SDK下载地址](https://ldc.layabox.com/layadownload/?type=layaairnative-LayaAir%20Native%20SDK%200.9.6)

```

$ layanative2 createapp -f SnowBallH5 -t 1 -n SnowBallNative -u http://10.10.20.102:8899/index.js -s D:/v2.0
```

###Mise à jour du dossier de ressources du projet native
Rafreshres commande de rafraîchir des paquets de ressources pour des projets native
Au cours de l 'itération du projet, le projet H5 a été modifié de manière à ce que les ressources et les codes de mise à jour puissent être réaménagés dans le projet Native en utilisant les instructions refreshres.
####Emploi:
Layanative2 refreshres [- P all \ \ 124aid iOS \ \ 124andro \ \ u clipse \ \ Android \ \ u Studio \ \ wkwebview] [- path path] [- U url]

####Description des paramètres

".
124 ---------------------------------------------------------------------------------
- 124.`--platform, -p`"[valeur facultative: All, IOS, Android \ \ u eclipse, Android \ \ u Studio \ \ wkwebview] [valeur par défaut: All]
- 124.`--path`"> 124 ironative Project path [par défaut:". "]
- 124.`--url, -u`Adresse du jeu


Si l 'élément créé est une version mono - ordinateur, les refreshres n' ont pas besoin d 'entrer URL.Si vous saisissez URL dans une version en ligne et que vous cliquez sur un paquet de ressources dans une version en ligne, il faudra modifier le Code de projet pour que l 'article devienne une version en ligne.
Si l 'élément créé est une version Web, les refreshres doivent entrer URL.Si vous saisissez une nouvelle adresse, le Code qui définit l 'URL dans l' élément doit être modifié pour que le remplacement d 'URL soit achevé.Si vous saisissez l 'adresse d' une seule page et que vous tapez sur un paquet de ressources d 'une seule version, il faudra modifier le Code de l' élément pour en faire un article d 'une seule version.
Hand - Switching mono - Machine Edition and Network Edition Correlation, reference[LayaBox 构建工具](https://ldc.layabox.com/doc2/?nav=zh-as-6-3-1)".

Le chemin des ressources est inscrit dans le fichier native.json sous le catalogue des projets Native généré.Si, par la suite, les ressources sont transférées ailleurs, le catalogue des ressources n'est pas correctement indiqué.Lorsque le paramètre t est défini comme zéro, il n 'y a pas de ressource spécifiée, et le chemin de ressource indiqué dans native.json est vide, et les erreurs de trajet de ressource sont signalées lorsque le paramètre t est vide.Dans les deux cas, le fichier native.json peut être modifié manuellement pour indiquer le chemin de ressources correct.
###Supprimer le dossier de ressources de projet native
Removers commande la suppression d 'un paquet de ressources pour un article native
####Emploi:
Layanative2 removeres [- - - path]
####Description des paramètres

".
124 ---------------------------------------------------------------------------------
- 124.`--path`"> 124 ironative Project path [par défaut:". "]

##Exemples d'application
La structure du catalogue, telle qu'elle est présentée dans la figure ci - après, est tout d'abord établie.Jellyfish est le catalogue du projet HTML 5.

![图1](img/1.jpg)  

Accès à la version SDK
![图2](img/2.jpg)  

Création du projet national
![图3](img/3.jpg)  

Création de la structure du catalogue telle qu'elle est présentée dans la figure ci - dessous.
![图4](img/4.jpg)  

Mise à jour des ressources
Dans le catalogue Dev, à travers le catalogue -
![图5](img/5.jpg)       

Pour entrer dans le répertoire des projets native, il n 'est pas nécessaire de spécifier les paramètres path
![图5](img/6.jpg)   

Supprimer le paquet de ressources s'il n'est pas nécessaire
Dans le catalogue Dev, à travers le catalogue -
![图5](img/7.jpg)    

Pour entrer dans le répertoire des projets native, il n 'est pas nécessaire de spécifier les paramètres path
![图5](img/8.jpg)  