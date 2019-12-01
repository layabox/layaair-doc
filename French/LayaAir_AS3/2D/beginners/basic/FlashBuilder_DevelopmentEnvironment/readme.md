#Flash Builder Development Environmental configuration

###Première étape: layaair Engineering

####Moteur téléchargement

En utilisant le développement de layaairide, le téléchargement de layaairide apportera son propre paquet moteur.Si le developpeur utilise des outils tiers, il faut d 'abord télécharger le moteur.Sur la page d 'accueil du site officiel ou dans le menu central de l' développeur, avec l 'entrée des liens téléchargés par le moteur, l' ouverture des liens et l 'apparition des différentes versions de la liste de téléchargement du moteur, chaque version fournit les trois langues de développement AS3, ts et JS, Sélectionnez le langage de développement correspondant, cliquez directement sur le téléchargement.

####1.2 Description de la structure du catalogue des paquets de moteur

Nous Téléchargeons la version AS3.Après téléchargement et décompression, on peut voir la structure de catalogue de la version AS3 comme le montre le diagramme suivant:

![图1](img/1.png)< br / > (Figure 1)

- le catalogue « layaairflash » contient le Code de la Bibliothèque des moteurs dont la version flash a besoin.

- Catalogue des codes des moteurs « libs », dans le Sous - Catalogue SRC de ce catalogue.

- « laya.js.exe » est un compilateur de code AS3 dans le système Windows pour la traduction du Code AS3 en Code JS.

- layajsmac est un compilateur de code AS3 dans le système Mac Apple, utilisé pour compiler le Code AS3 en un code JS.

- "playerglobal.swc" est utilisé pour remplacer le rédacteur original AS3 SDK, supprimer les conseils de grammaire API originaux et ajouter les conseils API du moteur.

- "worker.js", spécifie le chemin worker.js, qui permet d 'activer la fonction Worker LOADER pour charger des images décodées et d' optimiser le chargement, en particulier en consultant les documents pertinents.

​

###Deuxième étape installation d 'un navigateur Google Chrome

Lorsqu 'une compilation de codes AS3 est effectuée, le navigateur Chrome est appelé par défaut pour ouvrir le projet d' exécution et doit être installé pour effectuer la mise en page du projet.Cette étape peut être franchie si l 'installation est installée.



###Phase 3 configuration de l 'environnement de compilation AS3 dans Flash Builder

​**Mesure 1**: Ouvrez Flash Builder, trouvez la configuration de l 'outil externe et ouvrez la fenêtre de configuration.

​![2.jpg](img/2.jpg)< br / >
Figure 2


​**Mesure 2**: dans la fenêtre de configuration, le bouton droit sélectionne le programme, cliquez sur nouveau et ouvrez la nouvelle fenêtre de configuration.

​![3.jpg](img/3.jpg)< br / >
Figure 3



**Mesure 3**- Oui.

Modifier d 'abord le nom du programme externe`LayaCompiler`".

Puis cliquez sur le système de fichiers de navigation pour trouver`laya.js.exe`"Ou une copie directe."`laya.js.exe`Le chemin est collé à la barre d 'entrée position.

Dernière entrée dans la barre des variables`"${project_loc}\.actionScriptProperties;iflash=false"`, cliquez sur & ‧‧; pour terminer cette configuration.

Si l 'on ne veut pas lancer un nouveau navigateur Google à chaque édition, il suffit de changer les paramètres de l' auto - variable`"${project_loc}\.actionScriptProperties;iflash=false;chromerun=false;"`Comme le montrent les figures 4 et 5.

![4](img/4.png)< br / > (Figure 4)

![图5](img/5.png)< br / > (Figure 5)

* * Tips: D: < layabox > layaairas3 \ \ u Beta] [As] laya.js.exe > doit se lire comme suit: laya.js.exe.Sous le système Mac, remplacer "D: layabox", "layaairas3", "U 1.7.3" U beta "," layajsmac "* *



La configuration du compilateur AS3 dans l 'environnement Flash Builder est donc terminée.Bienvenue dans les autres chapitres.