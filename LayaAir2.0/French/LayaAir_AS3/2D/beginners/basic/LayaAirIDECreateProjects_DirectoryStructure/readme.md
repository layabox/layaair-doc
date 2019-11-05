#Création du projet AS3 avec layaairide et description de la structure du catalogue

> Author: Charley ` version: layaairide > 2.0.0 * Update: 2019 - 02 - 18

Bien qu'il soit actuellement recommandé aux concepteurs d'AS3 d'adopter le projet HTML5 pour le développement environnemental des moteurs layaair flashdevelop et flashbuilder.Toutefois, nous suggérons de créer le projet par l'intermédiaire de layaairide avant d'en ouvrir l'édition par l'intermédiaire de flashdevelop ou de flashbuilder.Une structure de catalogue claire sera établie par défaut par le biais du projet layaairide.Nous allons commencer par le projet AS3 en utilisant l'outil layaairide pour vous guider dans la création et la présentation de la structure du projet.



##Téléchargement et installation de layaairide

Pour utiliser les moteurs layaairide et layaair, il faut ajouter l 'identifiant du moteur à n' importe quelle position visible du jeu:
Dans le cas des moteurs portables, l 'identification peut être utilisée gratuitement, faute de quoi l' autorisation de paiement doit être obtenue en liaison avec les entreprises de connexion bidimensionnelle de micromessagerie dans les conditions de téléchargement.

L 'idee est une version verte qui n' a pas besoin d 'être installée.La version du moteur correspondante est déjà incorporée dans l 'IDE et n' a pas besoin d 'être téléchargée.

Layaairide2.0 téléchargement: https: / / ldc2.layabox.com / layadownload /? Type = layaairide



##Création du projet AS3 avec layaairide

####Première étape:

Ouvrez layaairide, cliquez`新建`L 'icône ou le texte permet d' accéder à la nouvelle interface de projet, comme le montre la figure 1.

![图片](img/1.png)  


(Figure 1)



####Mesure 2:

Choix`LayaAir 2D示例项目`Cliquez après avoir rempli le nom du projet, le chemin du projet et sélectionné la langue de programmation et la version du moteur. "`创建`Un nouveau projet vide pourrait être créé.Comme le montre la figure 2.

![图片](img/2.png) 


(Figure 2)

####En plus, les options sont les suivantes:

Les deux options suivantes peuvent être cochées ou non et l 'développeur choisit lui - même après avoir compris l' effet.

#####Micromessagerie / jeux vidéo

Si vous cochez cette option, le micromessage et la quantité de fichiers d 'ingénierie de jeu sont également créés sous le répertoire d' essai de projet (BIN) au moment de la création de l 'élément, de sorte que le répertoire Bin peut être désigné directement comme répertoire local lors de la mise au point du micromessage ou de l' outil de développement de jeux.Cela permet d 'économiser beaucoup de temps pour des essais fréquents, car la version officielle de la mise en page ne doit être publiée que pour les paquets locaux, chaque exportation nécessite un certain temps de publication, ce qui peut nuire à l' efficacité de la mise au point de la mise en page.

#####Ajout du descriptif de projet FB / FD

Layaairide est un environnement indispensable au développement intégré du moteur layaair.Toutefois, pour les anciens programmeurs de l'AS3, le modèle d'élaboration de code IDE est beaucoup moins amical pour l'AS3 que pour flashbuildier (FB) et flashdevelop (FD), ce qui explique que l'AS3 ait choisi cet élément par défaut et que les documents d'ingénierie de l'IDE soient créés en même temps que les Documents d'ingénierie FB et FD, ce qui facilite l'importation des projets d'environnement de développement FB et FD.



####Mesure 3:

La structure du dossier de projet est indiquée dans la figure 3.

![图片](img/3.png) 

(Figure 3)

Nous avons donc réussi à créer un projet AS3.

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

#### `layajs`Et`layajs.exe`Présentation des documents

`layajs`Et`layajs.exe`Il s'agit des compilateurs de JS de l'AS3, des layajs pour l'environnement Mac et des layajs.exe pour l'environnement Win.Dans le même temps, le maintien est basé sur l 'adaptation de mélange environnemental dans un mode de développement multiple.

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



###3.3 répertoire des projets ui (Laya)

`laya`Le catalogue est utilisé pour stocker le projet ui actuel de layaairide.

![图6](img/6.png) 


(Figure 6)

####".`assets`Table des matières

Des ressources telles que des images de composants, des fichiers audio, etc., sont stockées dans une scène ui.

####".`pages`Table des matières

Des fichiers de configuration tels que des scènes, des animations, des prédictions, etc.

####".`.laya`Fichier

Notez que Laya est un document, et non un catalogue, et que le document Laya est le document de configuration du projet ui de layaairide.



###3.4 répertoire des projets (libs)

".`libs`La Table des matières contient un catalogue des projets qui permet de stocker les fichiers de layaair utilisés pour les projets.

Les fichiers de la Banque de moteurs layaair dans la langue as existent.`libs/laya/src`Bas.Comme le montre la figure 7.

![图7](img/7.png)(Figure 7)



###3.5 répertoire des codes source du projet (SRC)

Le fichier de code source utilisé dans le projet (le fichier AS3 est le fichier as) est stocké par défaut dans le répertoire SRC.

Ce qu'il faut dire, c'est:`ui`Catalogue, cet endroit est généré automatiquement par l 'IDE, l' développeur ne change pas ici, il sera également exporté et remplacé la prochaine fois.Par conséquent, le Répertoire ne contient pas son propre code ni ne modifie le Code existant.

D'autres développeurs peuvent planifier leur propre structure de catalogue en fonction des besoins réels.La structure de l 'élément de code source de l' exemple est indiquée dans la figure 8.

![图8](img/8.png) 


(Figure 8)



###3.6 descriptif de projet

![图9](img/9.png)  


(Figure 9)

####  `项目名.laya` 

Figure 9`2D_DEMO_190218.laya`Est le document de configuration du projet layaairide qui indique le nom du projet en cours, le numéro de la bibliothèque utilisée, etc.

Par exemple:


```json

{"proName":"2D_DEMO_190218","engineType":1,"proType":0,"layaProType":1,"version":"2.0.0"}
```


#### `项目名.as3proj`

Figure 9`2D_DEMO_190218.as3proj`Ce document est le document de configuration du projet flashdevelop.Lorsque le projet AS3 est développé à l 'aide de l' éditeur flashdevelop, l 'outil flashdevelop permet de trouver le nom du projet dans la barre de menu à l' aide de la table des matières dans laquelle se trouve as3proj.

#### `.actionScriptProperties`Documentation`.project`Documentation

`.actionScriptProperties`Documentation`.project`Le document est le document de configuration du projet Flash Builder.Lorsque Flash Builder est utilisé, le projet AS3 créé par layaairide est importé par la barre de menu "fichier" > importer le projet Flash Builder.

#### `语言版本config.json`

Figure 9`asconfig.json`Les informations de configuration de compilateur de l 'IDE ne doivent pas être supprimées.



###3.7 publication des catalogues

Le catalogue de diffusion n 'existe pas par défaut, il faut cliquer sur le bouton de distribution pour créer une version correspondante du catalogue après la publication du projet, comme le montre la figure 10.(il y a une présentation spéciale de la fonction de publication, pas de détails ici)

![图10](img/10.png) 


(Figure 10)

La structure du catalogue, telle qu'elle apparaît à la figure 10, correspond à la version du catalogue publiée.



###Observations finales

Les éléments de base du projet ont donc été présentés et peuvent être consultés sur le site si l'on veut en savoir davantage sur l'introduction ou le modèle de conception de l'IDE.