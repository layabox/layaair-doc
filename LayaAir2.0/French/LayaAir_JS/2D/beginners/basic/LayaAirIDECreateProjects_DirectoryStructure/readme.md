# 用LayaAirIDE创建JS项目并详解目录结构

> Author: Charley ` version: layaairide > 2.0.0 > update: 2019 - 02 - 18 *

##Téléchargement et installation de layaairide

Pour utiliser les moteurs layaairide et layaair, il faut ajouter l 'identifiant du moteur à n' importe quelle position visible du jeu:
Dans le cas des moteurs portables, l 'identification peut être utilisée gratuitement, faute de quoi l' autorisation de paiement doit être obtenue en liaison avec les entreprises de connexion bidimensionnelle de micromessagerie dans les conditions de téléchargement.

L 'idee est une version verte qui n' a pas besoin d 'être installée.La version du moteur correspondante est déjà incorporée dans l 'IDE et n' a pas besoin d 'être téléchargée.

Layaairide2.0 téléchargement: https: / / ldc2.layabox.com / layadownload /? Type = layaairide



##Création du projet js avec layaairide

L 'ouverture de layaair IDE pour la première fois permet de créer un exemple d' élément qui, au moment de sa création, génère automatiquement une structure de répertoire structurée et claire, dans laquelle nous décrirons le processus de création du projet layaair IDE ainsi que la structure de répertoire générée par l 'IDE.

####Première étape:

Ouvrez layaairide, cliquez`新建`L 'icône ou le texte permet d' accéder à la nouvelle interface de projet, comme le montre la figure 1.

![图1](img/1.png) 


(Figure 1)



####Mesure 2:

Choix`LayaAir 2D示例项目`Cliquez après avoir rempli le nom du projet, le chemin du projet et sélectionné la langue de programmation et la version du moteur. "`创建`Un nouveau projet vide pourrait être créé.Comme le montre la figure 2.

![图2](img/2.png) 


(Figure 2)

####En plus, les options sont les suivantes:

#####Micromessagerie / jeux vidéo bidimensionnels

Si vous cochez cette option, le micromessage et la quantité de fichiers d 'ingénierie de jeu sont également créés sous le répertoire d' essai de projet (BIN) au moment de la création de l 'élément, de sorte que le répertoire Bin peut être désigné directement comme répertoire local lors de la mise au point du micromessage ou de l' outil de développement de jeux.Cela permet d 'économiser beaucoup de temps pour des essais fréquents, car la version officielle de la mise en page ne doit être publiée que pour les paquets locaux, chaque exportation nécessite un certain temps de publication, ce qui peut nuire à l' efficacité de la mise au point de la mise en page.



####Mesure 3:

La structure du dossier de projet est indiquée dans la figure 3.

![图片](img/3.png)   


(Figure 3)

Nous avons donc réussi à créer un projet ts.

*Tips:*

> pour les développeurs qui viennent d 'entrer en contact avec le moteur layaair, nous recommandons de créer des exemples de projets qui permettent d' avoir rapidement une idée complète de la structure du projet.Bien entendu, le développement peut également essayer de créer d 'autres types de projets.



##Présentation de la structure du projet

Le rôle de chaque catalogue sera ensuite décrit dans le contexte de la structure du projet créée dans la section précédente.

###3.1 Répertoire de configuration des projets (dossier Laya)


 `.laya`Le dossier contient certaines informations de configuration concernant le projet en cours d 'exécution, comme le montre la figure 4.

![4](img/4.png)  


(Figure 4)

#### `compile.js`Présentation des documents

`compile.js`Est le fichier de script du processus de compilation personnalisé de gulp, si l 'développeur connaît mieux le gulp et peut être modifié, ne bougez pas ici.

#### `launch.json`Présentation des documents

`launch.json`Le fichier enregistre certaines informations de configuration concernant l 'exécution du projet, respectivement la configuration de débogage de layaairide et la configuration de débogage de navigateur Chrome.Ne changez pas facilement, si vous changez d 'erreur, cela affectera le débogage du projet.

#### `publish.js`Présentation des documents

`publish.js`C 'est le fichier de script que gulp a publié pour le projet, l' développeur ne doit pas bouger ici.

#### **Autres annotations**

D 'autres fichiers de configuration ne sont pas par défaut, mais sont également enregistrés dans le Répertoire.Laya lors de leur publication.Par exemple, des jeux de petite taille tels que Web, micromessagerie, Encyclopédie, etc.

L 'ancienne version du fichier de configuration est pubset.json.

Il suffit d'avoir une idée de ce qui précède et, d'une manière générale, il n'est pas nécessaire que l'développeur apporte des modifications.Il n 'est donc pas nécessaire d' approfondir la compréhension.



###3.2 liste des articles exportés (BIN)


 `bin`Le répertoire contient le fichier de sortie de l 'élément actif.Comme le montre la figure 5.

![图5](img/5.png)   


(Figure 5)

Ce répertoire est utilisé pour enregistrer des fichiers d 'exécution de projets tels que JS, HTML, ressources de jeu, etc., exportés dans le projet, ainsi que des fichiers de projets de petits jeux (si vous cochez l' option de mise en page rapide du petit jeu lors de la création du projet).

Les fichiers sous la table des matières sont exécutés lors de la mise en page layaair par défaut ou de la commande Chrome.



###2.3 liste des projets ui (Laya)

`laya`Le catalogue est utilisé pour stocker le projet ui actuel de layaairide.

![图6](img/6.png) 


(Figure 6)

####".`assets`Table des matières

Des ressources telles que des images de composants, des fichiers audio, etc., sont stockées dans une scène ui.

####".`pages`Table des matières

Des fichiers de configuration tels que des scènes, des animations, des prédictions, etc.

####".`.laya`Fichier

Notez que Laya est un document, et non un catalogue, et que le document Laya est le document de configuration du projet ui de layaairide.



###2.4 catalogue des projets (libs)

".`libs`Le catalogue du projet est constitué par les fichiers layaair.d.ts et wx.d.ts.Pour les indices de code, les fichiers d.ts pertinents doivent être placés sous ce catalogue si le d éveloppeur utilise une bibliothèque tripartite.Par exemple, wx.d.ts est utilisé pour d évelopper des indices de code pour des jeux de micro - messages.Comme le montre la figure 7.

![图7](img/7.png)    


(Figure 7)



###2.5 répertoire des codes source du projet (SRC)

Les fichiers de code source utilisés dans le projet sont stockés par défaut dans le répertoire SRC.La structure de l 'élément de code source de l' exemple est indiquée dans la figure 8.



 ![图8](img/8.png)  


(Figure 8)



###2.6 descriptif de projet

![图9](img/9.png) 


(Figure 9)

####  `项目名.laya` 

Figure 9`JS_2D_DEMO_190218.laya`Est le document de configuration du projet layaairide qui indique le nom du projet en cours, le numéro de la bibliothèque utilisée, etc.

Par exemple:


```json

{"proName":"JS_2D_DEMO_190218","engineType":1,"proType":2,"layaProType":1,"version":"2.0.0"}
```


#### `语言版本config.json`

Figure 9`jsconfig.json`Les informations de configuration de compilateur de l 'IDE ne doivent pas être supprimées.



###2.7 publication des catalogues

Le catalogue de diffusion n 'existe pas par défaut, il faut cliquer sur le bouton de distribution pour créer une version correspondante du catalogue après la publication du projet, comme le montre la figure 10.(il y a une présentation spéciale de la fonction de publication, pas de détails ici)

![图10](img/10.png) 


(Figure 10)

La structure du catalogue, telle qu'elle apparaît à la figure 10, correspond à la version du catalogue publiée.



###Observations finales

Les éléments de base du projet ont donc été présentés et peuvent être consultés sur le site si l'on veut en savoir davantage sur l'introduction ou le modèle de conception de l'IDE.