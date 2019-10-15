#Fiche Unity

###### *version :2.3.0beta   Update:2019-9-27*

]###Rappel important: dans la dernière version de layaair 2.0, 2.3.0beta, nous avons adapté la version Unity 2018.4.7.

**Les promotions nécessitent une attention particulière:**Après la mise à niveau de Unity, les dossiers layaair3d et streamingasets figurant dans le catalogue des projets sont supprimés.Puis, une nouvelle version du module Unity sera installée.Cette étape peut être ignorée si l 'élément ne contient pas la version précédente.

###Unity3d

Unity3d est un outil de développement de jeux intégré conçu par Unity technologies pour permettre aux joueurs de créer facilement des contenus interactifs tels que les jeux vidéo 3D, la visualisation architecturale, l 'animation en temps réel en trois dimensions.L 'insert est un outil préféré pour l' édition de ressources artistiques.

Unity a téléchargé l'adresse suivante:[https://unity3d.com/get-unity/download/archive](https://unity3d.com/get-unity/download/archive)

###Panneau de connexion

Adresse de téléchargement:[插件地址](https://ldc2.layabox.com/layadownload/?type=layaairide-LayaAir%20IDE%202.0.0), cliquez sur le lien de téléchargement, comme le montre la figure 1.

[] (IMG / 1.png) <br > (Figure 1)

####Insert d 'Export de montage

Démarrer Unity, créer un nouveau projet et importer les ressources et le matériel nécessaires au jeu, les maquettes, etc.Ctrl + s sauve notre scène et on garde le nom de truck.

L 'outil de conversion layaair3d est importé par le bouton droit de l' interface de gestion des ressources.La version de l 'insert sera mise à jour avec l' augmentation des fonctionnalités du moteur layaair, mais la méthode d 'importation est parfaitement cohérente.

Lorsque l 'outil d' import est entré avec succès, deux dossiers, layaair3d et streamingasets, apparaissent dans l 'interface de gestion des ressources, et le menu layaair3d, dans la barre de menu Unity, est exporté.Figure 2

[] (IMG / 2.gif) <br > (Figure 2)

Cliquez sur la barre de menu layaair3d, vous trouverez un panneau d 'Export où nous vous expliquerons en détail.

**Tips:**Après avoir cliqué sur le menu layaair3d, d 'autres sous - éléments apparaissent dans le menu déroulant.(voir la figure 3)

**Layaair = > help = > demo, Studi, ansewers, tutorial, etc., peuvent cliquer sur layaair pour afficher des exemples, des documents d 'étude, des forums, des supports d' Export pour faciliter la déconcertation des développeurs et Setting peut définir une langue d 'interface.**	

[] (IMG / 3.gif) <br > (Figure 3)

####Fonction spécifique

Quand le module sera prêt, nous verrons le panneau suivant:

[] (IMG / 4.png) <br > (Figure 4)

#####1) Scene

​**Catégorie scene**Il s' agit de toute la scène, qu 'elle soit exportée dans tous les modèles, matériaux, autocollants, animés ou photocollants, principalement pour la création de scène, l' extension de fichier est. LS, elle doit être chargée avec la classe scene ou ses héritiers.

#####2) sprite3d

​**Catégorie sprite3d**Il y a moins d 'exports d' affiches d 'éclairage que de scènes, et des ressources séparées sont souvent utilisées pour l' exportation d 'objets actifs dans des rôles ou des jeux.

Ils sont chargés et utilisés. Nous suivrons.**Scène**Et**Elfe**Présentation.

#####3) gameoobject Setting

Paramètres de noeud d 'article de jeu

`Ignore Not Active Game Objects `
Les noeuds non activés dans la scène Unity sont ignorés lors de l 'exportation.

`Batch Make The First Level Game Objects ` **(il faut choisir sprite3d pour avoir)**
Exporte en série tous les noeuds de niveau 1 de la scène.

#####4) meshsprite3d Setting

Les paramètres d 'exportation des données de grille, qui peuvent servir à compresser la taille des fichiers de grille LM du modèle, proposent de cocher toutes les options sans coupure (sans encodage de ligne) et sans couleur supérieure dans le projet, ce qui permet d' économiser environ 20% de la taille des ressources du modèle.

`Ignore Vertices UV `Masque UV ignoré

`Ignore Vertices Color`Ignorer les informations de couleur

`Ignore Vertices Normal`Ignorer la ligne

`Ignore Vertices Tangent`Ignorer l 'information

`Compress`Compression de modèle

#####5) terrain Setting

Paramètres d 'exportation Unity

`Convert Terrain To Mesh `
S' il y a un modèle de terrain dans la scène, la zone de conversion est transformée en modèle de grille.
La forme terrestre d 'untiy est très commode à dessiner avec des pinceaux des altitudes telles que les montagnes, les caniveaux, etc., et à appuyer la production de plusieurs autocollants détaillés pour plusieurs types d' autocollants.Le module d 'exportation layaair transforme le sol en Mesh, ce qui facilite l' utilisation par les développeurs.Il y a une différence entre le matériau et le matériau ordinaire, qui contient des dessins détaillés.

#####6) Animation Setting

Animation

`Compress`Compression d 'animation

#####7) Assets Platform

Configuration de la plate - forme de ressources

`IOS`Et`Android`Les ressources réservées aux différentes plates - formes doivent être réparties en plusieurs parties, étant donné qu'une partie des ressources n'est pas générique.À l 'heure actuelle, la plate - forme supporte le format de compression de texture exclusif.

`Conventional`Plate - forme universelle, juste un JPG et un PNG ordinaires.

#####8) other Setting

Autres paramètres

`Customize Export Root Directory Name `
Le nom du dossier d 'exportation est personnalisé et le nom du dossier par défaut est "layascene + nom de scène".

#####9) paramètres d 'exportation

Exporter le panneau de réglage comme le montre la figure 5.

**Run**Cliquez sur le moteur layaair pour exécuter la scène directement.

**Export**Les ressources courantes sont exportées et, lorsque vous cliquez, les données de la scène ou du modèle actuels sont exportées vers le chemin spécifié.

**QRCode**Génération de codes bidimensionnelsVous pouvez prévisualiser à l 'intérieur du réseau local.

**Browse.**Enregistre le chemin du fichier.

**Revert - config**Initialiser la configuration.

**Config - 1 - 5**Lis le fichier de configuration.

[] (IMG / 5.png) <br > (Figure 5)

[] (IMG / 6.png) <br > (Figure 6)