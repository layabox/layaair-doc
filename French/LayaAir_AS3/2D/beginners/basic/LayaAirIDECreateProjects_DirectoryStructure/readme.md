#Création du projet AS3 avec layaairide et description de la structure du catalogue

Bien qu'il soit actuellement recommandé aux concepteurs d'AS3 d'adopter le projet HTML5 pour le développement environnemental des moteurs layaair flashdevelop et flashbuilder.Toutefois, nous suggérons de créer le projet par l'intermédiaire de layaairide avant d'en ouvrir l'édition par l'intermédiaire de flashdevelop ou de flashbuilder.Une structure de catalogue claire sera établie par défaut par le biais du projet layaairide.Nous allons commencer par le projet AS3 en utilisant l'outil layaairide pour vous guider dans la création et la présentation de la structure du projet.



##Création du projet AS3 avec layaairide

Mesure 1: ouvrir layaairide en cliquant sur les nouveaux projets, comme la figure 1

![图片](img/1.jpg)< br / > (Figure 1)



Étape 2: sélectionnez "layaair air" pour créer un nouveau projet vide en cliquant sur "créer" après avoir défini le nom du projet, le chemin, le type et sélectionné la version du moteur.Voir la figure 2.

![图片](img/2.jpg)< br / > (Figure 2)



Étape 3: après avoir cliqué sur & ‧‧; créer & ‧‧;, vous pouvez voir la structure du projet, comme le montre la figure 3:

![图片](img/3.png)< br / > (Figure 3)



Nous avons donc réussi à créer un projet AS3 et recommandé l'adoption de projets d'ouverture flashdevelop ou Flash Builder.





##Présentation de la structure du projet AS3

**Le rôle de chaque catalogue sera ensuite décrit dans le contexte de la structure du projet créée dans la section précédente.**

​

###2.1 Répertoire de configuration des projets (dossier Laya)

Le dossier Laya contient des informations sur la configuration du projet en cours d'exécution, comme le montre la figure 4.

![4](img/4.jpg)< br / >
(Figure 4)



####2.1.1`.laya/launch.json`Présentation des documents


 `.laya/launch.json`Le fichier enregistre certaines informations de configuration concernant l 'exécution du projet, respectivement la configuration de débogage de layaairide et la configuration de débogage de navigateur Chrome.Ne changez pas facilement, si vous changez d 'erreur, cela affectera le débogage du projet.

　　`configurations`Sous cette propriété`layaAir`Et`chrome`Les deux configurations sont disponibles.

　　`"name": "layaAir"`: indique le mode de débogage intégré à layaairide.

　　`"name": "chrome调试"`= indique que l 'ajustement est effectué au moyen d' un navigateur local Chrome.

　　`"file": "${workspaceRoot}/bin/h5/index.html"`: indique le chemin du fichier d 'entrée démarré par l' exécution du projet.

　　`"runtimeExecutable": "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"`: pour le chemin du navigateur local chrome, le développeur définit ce chemin en fonction de ses propres besoins.

　　`"userDataDir": "${tmpdir}"`L 'utilisateur peut modifier les paramètres, par exemple en réglant la mémoire cache en tant que catalogue cache dans le Répertoire racine du projet actuel:`"userDataDir": "${workspaceRoot}/cache"`".

​

####2.1.2`tasks.json`Présentation des documents

`tasks.json`Fichier de configuration de tâches

![图片](img/7.jpg)< br / > (Figure 7)

**Paramètres généraux:**

　　`command`La propriété est le fichier qui représente le démarrage et le projet as l 'outil de compilation layacompiler.

　　`args`Les attributs représentent les paramètres transmis, par défaut, le fichier.Actionscriptproperties.

Si vous êtes un fichier de configuration FD, vous pouvez modifier le fichier de configuration comme suit:


```

"args": ["${workspaceRoot}/LayaUISample.as3proj;iflash=false;windowshow=false;chromerun=false"];
```


####2.1.3`astool`Table des matières

​`astool`C'est le Répertoire de layacompiler.`layajs`C'est le compilateur AS3 du système Mac.`layajs.exe`Est un compilateur AS3 dans le système Windows.



###2.2 liste des projets exportés (bin / H5)

​`bin/h5`Le répertoire contient le fichier de sortie de l 'élément actif.Pour stocker les fichiers JS et les pages HTML générés par la compilation de fichiers actionscript3.0 dans le projet.

​*Tips: si l'développeur a besoin d'un répertoire ou d'un fichier d'exécution, comme de nouvelles ressources, il doit être placé`bin/h5`Table des matières*



 



###2.3 liste des projets ui (Laya)

".`laya`"Le catalogue est utilisé pour enregistrer les projets ui actuels de layaairide.

".`laya/assets`Le catalogue permet de stocker les ressources d 'image nécessaires pour les pages ui, les particules, etc.

".`laya/pages`Le catalogue est utilisé pour enregistrer les fichiers générés par la configuration de page créée par layaairide.

".`laya/.laya`"Le fichier est le document de configuration du projet ui de layaairide.



 



###2.4 catalogue des projets (libs)

".`libs`La Table des matières contient une table des matières pour l 'enregistrement des fichiers de base utilisés dans les projets.

".`libs/laya/src`"Les fichiers des moteurs layaair sont stockés dans le catalogue.



###2.5 répertoire des codes AS3 du projet (SRC)

Le fichier de code AS3 (.As) utilisé dans le projet sera stocké par défaut dans le répertoire SRC.







##Présentation du descriptif de projet

###3.1 descriptif de projet layaairide (nom de projet: Laya)

​`项目名.laya`Est le document de configuration du projet layaairide qui indique le nom du projet en cours, le numéro de la bibliothèque utilisée et le type de projet.

Par exemple:


```json

{"proName":"myLaya","version":"1.5.4","proType":0}
```




###3.2 descriptif de projet flashdevelop (nom de projet: as3proj)

​`项目名.as3proj`Le document est le document de configuration du projet flashdevelop.Lorsque le projet AS3 est développé à l 'aide de l' éditeur flashdevelop, le projet peut être ouvert en ouvrant le gestionnaire de ressources, puis en double cliquant sur ce fichier dans la table des matières avec le projet flashdevelop.

![图片](img/8.png)< br / > (Figure 8)

Ou ouvrez d 'abord l' outil flashdevelop, puis trouvez le nom de projet dans la barre de menu par "fichier" > ouvrir le répertoire où se trouve as3proj.

![图片](img/9.png)< br / > (Figure 9)



###3.3 dossier de configuration du projet Flash Builder

​`.settings`Dossier`.actionScriptProperties`Documentation`.project`Le document est le document de configuration du projet Flash Builder.Lorsque Flash Builder est utilisé, le projet AS3 créé par layaairide peut être importé par la barre de menu "fichier" > importer le projet Flash Builder.Importer le projet Flash Builder comme indiqué dans la figure ci - après:



 ![图片](img/10.png)< br / > (Figure 10)


 