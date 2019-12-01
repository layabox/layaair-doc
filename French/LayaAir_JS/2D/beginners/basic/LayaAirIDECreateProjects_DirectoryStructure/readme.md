# 创建JS项目并详解目录结构

Ouvre pour la première fois l 'id layaair ou utilise la fonction "nouveau projet" dans le menu Fichier de l' IDE.Un projet vide peut être créé et l 'IDE génère automatiquement une structure de répertoire structurée et claire au moment de sa création, où nous présenterons la structure de répertoire générée par layaair IDE.



##Création de projets avec layaairide

​**Étape 1: ouvrir layaairide et, si c 'est la première fois, cliquer directement sur "nouveau projet" pour commencer à créer de nouveaux projets.Figure 1**

![图片](1.jpg)< br / > (Figure 1)



​**Mesure 2: sélectionner le projet layaair dans la fenêtre « nouveaux projets », comme le montre la figure 2.**

Table des matières`名称`Nom du projet dans la colonne;
]
Table des matières`路径`Dans la barre, remplissez le chemin enregistré pour le projet;
]
> troisième ligne`类型`Sélectionnez le type d 'élément dans la colonne, à savoir ActionScript, Javascript, Typescript, où nous devons sélectionner "projet javascript";
]
Table des matières`引擎`Sélectionnez la version du moteur dans la barre.Vous pouvez sélectionner une version stable ou la dernière version beta.La différence entre les versions peut être consultée dans le journal téléchargé de la version de moteur du site officiel.

![图片](2.jpg)< br / >

Après cliquer sur créer, l 'IDE génère le dossier de projet suivant:

![图片](3.jpg)< br / > (Figure 3)



##Structure du catalogue

###2.1 profil d 'exécution du projet (dossier Laya)

​`.laya`Ce dossier contient des informations de configuration sur le projet en cours d 'exécution de développement.

####2.1.1`.laya/launch.json`Annotations

　　`launch.json`Le fichier enregistre certaines informations de configuration concernant l 'exécution du projet, respectivement la configuration de débogage de layaairide et la configuration de débogage de navigateur Chrome.Ne changez pas facilement, si vous changez d 'erreur, cela affectera le débogage du projet.

　　**`launch.json`Principales caractéristiques:**

　　`"name": "layaAir"`Représente le mode de débogage incorporé dans layaairide.

　　`"name": "chrome调试"`Afficher les réglages au moyen d 'un navigateur Chrome.

　　`"file": "${workspaceRoot}/bin/index.html"`Indique le chemin du fichier d 'entrée démarré par l' exécution du projet.

　　`"runtimeExecutable": "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"`, indique le chemin du navigateur Chrome que le développeur définit en fonction de ses besoins.

　　`"userDataDir": "${tmpdir}"`L 'utilisateur peut modifier les paramètres, par exemple en réglant la mémoire cache en tant que catalogue cache dans le Répertoire racine du projet actuel:`"userDataDir": "${workspaceRoot}/cache"`".

####2.1.2`.laya/tasks.json`Annotations

　　`tasks.json`Certaines informations de configuration associées au compilateur ts sont enregistrées dans le fichier, et la signification des paramètres peut être consultée sur le réseau officiel Typescript.



![图片](http://ldc.layabox.com/uploadfile/image/20161230/1483085141436949.png)

Le problème de launch.json dans le diagramme ci - dessus est que le développeur peut rencontrer des difficultés.Si ces problèmes se posent, il convient de vérifier si le chemin URL des confirmations pose des problèmes.Si c 'est le chemin /

![图片](http://ldc.layabox.com/uploadfile/image/20161230/1483084947914795.png)

### 

###2.2 liste de sortie du projet (BIN)

​`bin`Les fichiers de sortie de l 'élément actif sont stockés dans le Répertoire, comme dans la figure 4.

​`bin/index.html`C 'est le fichier d' entrée du projet, où tous les moteurs layaair ou JS d 'une tierce partie doivent être introduits.

​*Les notes script de l'index.html décrivent les fonctions pertinentes de chaque bibliothèque et permettent au développeur de supprimer les références des bibliothèques en fonction des besoins du projet. Cliquez sur le bouton d'affichage du projet pour comprimer les fichiers JS de l'index.html afin de réduire la transmission sur le réseau.Si une bibliothèque de tiers est citée, elle doit être précédée d'une bibliothèque de moteurs layaair.*

​`bin/libs`Le dossier contient les fichiers JS de chaque module du moteur layaair et, comme le montre la figure 4, il est nécessaire d 'introduire les fichiers JS du module correspondant dans l' index.html.

![4](4.jpg) <br />（图4）


**Voici quelques - uns des principaux éléments du module de moteur layaair:**

　　`laya.core.js `Est un paquet central, encapsulé pour afficher des objets, des événements, la gestion du temps, l 'animation de l' axe temporel, le mouvement lent, l 'interaction de messages, Socket, stockage local, touches de souris, son, chargement, filtre couleur, police de bitmap et ainsi de suite.

　　`laya.webgl.js`Les lignes de rendu webgl sont encapsulées et peuvent être appelées lors de l 'initialisation si le rendu webgl est utilisé`Laya.init(1136,640,laya.webgl.WebGL);` 

　　`laya.ani.js`Est un module d 'animation comprenant une animation SWF, une animation squelette, et ainsi de suite.

　　`laya.filter.js`Contient plus de filtres webgl, tels que la lumière extérieure, l 'ombre, le flou et plus.

　　`laya.html.js`Une fonction de mise en page dynamique HTML est encapsulée.

　　`laya.ui.js`L 'invention concerne divers composants de fabrication d' ui.

　　`laya.tilemap.js`Un support d 'analyse tilemap est fourni.




###2.3 liste des projets ui (Laya)

".`laya`"Le catalogue est utilisé pour enregistrer les projets ui actuels de layaairide.

".`laya/assets`Le catalogue permet de stocker les ressources d 'image nécessaires pour les pages ui, les particules, etc.

".`laya/pages`Le catalogue est utilisé pour enregistrer les fichiers générés par la configuration de page créée par layaairide.

".`laya/.laya`"Le fichier est le document de configuration du projet ui de layaairide.



###2.4`.d.ts`Code providing file Directory (libs)


 `libs`On trouvera ci - après les fichiers layaair.d.ts.Pour les indices de code, les fichiers d.ts pertinents doivent être placés sous ce catalogue si le d éveloppeur utilise une bibliothèque tripartite.



###2.5 répertoire des codes de projet (SRC)

Le fichier de code de projet est stocké par défaut dans le répertoire SRC.



 



###2.6 descriptif de projet

​`项目名.laya`Est le fichier de configuration du projet dans lequel est enregistré le nom du projet actif, le numéro de la version de la bibliothèque utilisée et le type de projet.


```json

{"proName":"studyLayaAirJS","version":"1.5.5","proType":2}
```

​`tsconfig.json`Le document est le document de configuration du projet ts, ne doit pas être supprimé.