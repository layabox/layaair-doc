#Utilisation et configuration d 'Android Studio



##Préparation de l'installation d'Android Studio

###Téléchargement de Java JDK

Télécharger Java JDK sur Internet.Les cours spécifiques peuvent être consultés:[http://jingyan.baidu.com/article/9989c746064d46f648ecfe9a.html](http://jingyan.baidu.com/article/9989c746064d46f648ecfe9a.html)

###1.2 installation de JDK et configuration de variables environnementales.

La création d'un environnement JDK est nécessaire pendant les études de Java ou d'Android.This paper takes JDK - 8u45 - Windows - x64 as an example, the configuration Environment in Windows 8.1 bit system.

####1.2.1 installation de JDK

Double - cliquez sur le paquet d 'installation JDK, entrez dans l' assistant d 'installation, puis effectuez une opération sans cerveau, et cliquez sur l' image jusqu 'à la prochaine étape;

![1](img/1.jpg)
< br / >
![图片](img/2.jpg)
< br / >
![图片](img/3.jpg)
< br / >
![图片](img/4.jpg)
< br / >
![图片](img/5.jpg)
< br / >
![图片](img/6.jpg)



####1.2.2 variables environnementales de configuration

　　**Première étape, cliquez à droite sur mon ordinateur, cliquez sur les attributs (graphique ci - dessous) et entrez dans le panneau d 'attributs;**

![图片](img/7.jpg)



　　**Deuxième étape, cliquez sur les paramètres du système supérieur à gauche et entrez dans les paramètres d 'attributs du système**

![图片](img/8.jpg)



　　**Étape 3, cliquez sur le haut, cliquez sur la variable environnement**

![图片](img/9.jpg)



　　**Étape 4, variables du système ci - dessous, cliquez sur la nouvelle configuration;**

　　`变量名：JAVA_HOME`

　　`变量值：JDK的安装路径（如：E:\Program Files\Java\jdk1.8.0_45）`

![图片](img/10.jpg)

![图片](img/11.jpg)



　　**Étape 5, barre de variables du système, cliquez à nouveau sur la nouvelle configuration;**

Variable:`CLASSPATH`

Variables: (`.;%JAVA_HOME%\lib;%JAVA_HOME%\lib\tools.jar`- Oui.

Reproduit entre parenthèses.N 'oubliez pas le point précédent et le point médian.

![图片](img/12.jpg)



　　**Étape 6: trouver la variable path dans la variable système**, double - cliquez sur Path (ou sélectionnez - éditer) et, comme la valeur de la variable originale existe déjà, ajoutez ((`;%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin`) reproductible entre parenthèses.

Notez les points qui précèdent (séparer le chemin existant de l 'ajout; séparer).

![图片](img/13.jpg)

![图片](img/14.jpg)



　　**Étape 7: les variables environnementales ont été configurées.**

Procédé d 'authentification: Win + R ouvre le cadre de fonctionnement, saisissez CMD pour commander le retour du véhicule;

Saisissez Java - version pour afficher les informations de la version Java; saisissez javac, l 'image ci - après illustre le succès de la configuration;

![图片](img/15.jpg)



*Attention*

`配置环境变量时记得将原有的和新加的用;隔开，不要出现中文；号`



###1.3 installation d'Android Studio

Depuis que Google a annoncé qu'Android Studio remplacerait l'eclipse et deviendrait officiellement un logiciel officiel de développement intégré, auquel l'appui a été suspendu.Cet article présente l 'installation d' Android Studio (par exemple Android Studio 1.4, abrégé as)

1) en raison des contraintes liées aux réseaux nationaux, il n'est pas possible de télécharger les as sans avoir recours à des moyens spéciaux.Ainsi, vous pouvez chercher l 'adresse de téléchargement d' autres sites.Ne



2) décompression après téléchargement.Accès à l'Android - studio - IDE - 141.2178183 - Windows, cliquez sur Studio 64.exe pour accéder à l'environnement de développement as.

![blob.png](img/17.png)

3) Si vous ne pouvez pas exécuter, vous devez télécharger l 'installation JDK.Et configurer les variables environnementales JDK

![blob.png](img/18.png)

4) Lorsque Android studio est installé pour la première fois, la carte est bloquée dans la mise à jour de l 'interface d' inspection.Il y a plusieurs façons de procéder sur Internet, dont une seule est présentée ici.Entrée dans l'étape 2, décompression du catalogue

![blob.png](img/19.png)

5) trouver le fichier idea.properties et l 'ouvrir dans un carnet d' adresses (ou par d 'autres éditeurs de texte, UE, etc.).

À la fin du document, ajouter disable.android.first.run = True

, enregistrer.Redémarrez l 'as.On peut passer la vérification de mise à jour as.

![blob.png](img/20.png)

**Attention**

• L'opération est basée sur win7 - 64 bits, les autres systèmes d'exploitation étant téléchargés officiellement par Google

• avant d'installer le système as, veuillez installer JDK et configurer les variables environnementales Java correspondantes.



 















#Comment utiliser Android studio pour créer de nouveaux projets

1) Une fois installés, nous allons construire notre nouveau projet.Commençons par ici.

![blob.png](img/21.png)

2) cliquer sur New Project apparaîtra. Nous avons un nom bien défini, nous pouvons également être inoccupés, cliquer sur next jusqu 'à la fin, mais ce processus exige patience.C 'est un peu long.

![blob.png](img/22.png)

3) Ensuite, nous entrerons dans notre interface de développement.Cliquez sur l 'icône du cercle rouge de l' image

![blob.png](img/23.png)

4) Cette étape consiste à installer le SDK d 'Android, recommandé par Android 1.6 ~ Android 4.2.Cela prend beaucoup de temps, s' il vous plaît installer un bon réseau et beaucoup de temps libre pendant l 'installation peut voir un film

![blob.png](img/24.png)

5) après l 'installation, nous avons commencé à configurer notre AVD, c' est - à - dire l 'environnement virtuel d' Android.Cliquer sur l 'icône du cercle rouge

![blob.png](img/25.png)

Cliquez sur New

![blob.png](img/26.png)

7) paramétrer le nom AVD

![blob.png](img/27.png)

8) Une fois les paramètres achevés, vous pouvez cliquer sur le triangle du diagramme ci - dessous pour compiler notre programme.

![blob.png](img/28.png)





#Comment androidstudio a - t - il importé le projet:

**3.1 environnement de développement**

> win7
]
> androidstudio
]

**方法/步骤**

1) ouvrir son propre IDE - androidstudio, comme le graphique ci - après:

![blob.png](img/29.png)



2) cliquez sur le bouton "file" et choisissez "Import - Project", par exemple:

![blob.png](img/30.png)

3) pour trouver le programme que vous souhaitez importer, choisissez le fichier build.gradle, comme la figure suivante:

![blob.png](img/31.png)

4) Choisissez next comme diagramme:

![blob.png](img/32.png)



5) Sélectionner next comme diagramme:

![blob.png](img/33.png)



6) processus d 'importation

![blob.png](img/34.png)



7) l 'importation finale réussie peut être consultée comme la figure suivante:

![blob.png](img/35.png)