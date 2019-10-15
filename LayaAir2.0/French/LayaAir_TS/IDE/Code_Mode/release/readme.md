# 项目发布2.0详解

> Author: Charley > version: layaair > IDE > 2.0.0 version officielle Update: 2019 - 1 - 16

La fonction de publication du menu de projet est très importante, généralement pour le jeu JS, la compression et la confusion JS, la compression d 'images, la gestion de versions, l' adaptation des différentes plates - formes du jeu, etc.La fonction de publication du projet est généralement utilisée lorsque le projet est achevé ou qu'il est en phase de développement et qu'il est prêt à être soumis à des essais dans un environnement de production.

![1](img/1.png)   


(Figure 1)



Dans le menu du projet, l 'interface de la fonction de diffusion du projet est ouverte, comme le montre la figure 1.

###Plate - forme de diffusion

Il existe actuellement quatre options dans la plateforme de diffusion: web / Native, micromessagerie, QQ léger et cent jeux.Comme le montre la figure 1.

`web/Native`La version HTML 5 est publiée dans un environnement de navigateur ou dans un environnement AP de layanative.

`微信小游戏`Un projet publié comme un jeu de micro - messagerie adapté peut être exécuté dans un outil de développement de micromessagerie (pour les jeux de micro - messagerie, les documents pertinents peuvent être lus).

`QQ轻游戏`Est un jeu léger qui a été publié sous le nom de qq (autrefois connu sous le nom de jouer) et qui fonctionne sur une plate - forme de jeu léger.

`百度小游戏`Est un article publié comme étant adapté à une centaine de petits jeux, qui peut être mis en œuvre dans un outil de développement de 100 degrés (sur les documents relatifs à une centaine de petits jeux pouvant être lus).

###Répertoire source

Liste des sources**Répertoire source**Par défaut dans le répertoire Bin, ce répertoire ne doit pas être modifié.

###TABLE DES MATIÈRES

Le catalogue est à publier.**Liste d 'Objectifs**, par défaut dans le répertoire release, peut être dans l 'objectif du projet ou dans un répertoire sans rapport avec le projet.

###Projets de RÉCAPITULATION

Si l 'développeur craint que le Code publié ne soit pas le plus récent parce qu' il a oublié de compiler, cochez la case`是否重新编译项目`, puis cochez la case pour compiler le projet avant d 'exécuter le processus de publication à chaque publication.Il est possible d 'éviter les erreurs de présentation après la publication d' un projet résultant d 'une compilation oubliée.

###S' il s' agit d 'un projet de domaine de données ouvert

Les fichiers d 'entrée par défaut pour les petits jeux tels que micromessagerie et Baidu ne sont pas les mêmes que les fichiers d' entrée du domaine principal.`是否为微信/百度开放数据域项目`Par la suite, la question de l 'entrée sera automatiquement réglée sans que l' développeur ait à traiter manuellement après la publication.L 'invention permet d' augmenter considérablement la facilité d 'émission de jeu de l' développeur.

####Fusionner tous les fichiers JS dans l 'index.html (version Web)

Une fois cochés, les JS de l 'index.html sont analysés et tous les JS de l' index.html fusionnés en un JS unique.

> sur la base des mécanismes spéciaux des petits jeux de micro - messages, les petits jeux doivent être sélectionnés, de sorte que cet alinéa ne figure pas dans la publication des petits jeux.
]

###Copier uniquement les fichiers JS cités dans l'index.html

Cochez cette case pour copier uniquement les fichiers de bibliothèque de moteurs JS cités dans l 'index.html au Répertoire libs de release.Sinon, tout ce qui n 'est pas utilisé sous libs sera copié dans le passé.

###Compression des ressources

####Decompression

Pour exclure certains fichiers ou fichiers sous le Répertoire racine source`;`Séparez - vous.
Note: Cette fonction d 'élimination de la compression n' est utilisée que pour éliminer les répertoires associés à la compression

####Compression PNG

Une fois cochée, la ressource PNG peut être comprimée, la qualité peut être contrôlée par paramètre, la valeur par défaut au moment de la publication et, si l 'développeur estime que l' effet n 'a pas atteint l' objectif, il peut l 'ajuster lui - même.

####Compression de JPG

Une fois cochée, la ressource JPG peut être comprimée, la qualité peut être contrôlée par paramètre, la valeur par défaut au moment de la publication peut être ajustée si l 'développeur estime que l' effet n 'a pas atteint l' objectif.

####Compression de json

Lorsque vous cochez la case, ce n 'est pas seulement les fichiers de suffixe json qui sont énumérés par défaut dans des formats de fichiers json couramment utilisés (par exemple, json, Atlas, LS, LH, lmat, lav) qui peuvent nécessiter une compression, et que le suffixe correspondant à ces plages commence à être comprimé.Si un format de suffixe n 'a pas besoin d' être comprimé, le suffixe peut être supprimé directement.

####Confondre compression JS

Après sélection, le JS est comprimé et confondu.

###Gestion des versions

####Gestion des versions

Cochez cette option pour activer la gestion de versions.

Un nom de fichier avec chaîne de caractères Hash est généré automatiquement lors de la publication lorsque l 'développeur a activé la gestion de version, et un fichier de mappage de nom de fichier de version.json est généré simultanément.Les fichiers contrôlés sont gérés par le code d 'Association automatique resourceversion de la classe de gestion de versions.Lorsque l 'utilisateur ouvre un fichier géré par la version, il met automatiquement à jour la chaîne de caractères Hash dans le nom de fichier lors de la publication, ce qui, dans un environnement de fonctionnement, équivaut à un appel à de nouveaux fichiers et ne pose pas de problème de cache.

Dans le processus de développement, le développeur n 'a pas besoin de se préoccuper du nom du fichier qui sera finalement généré par la gestion des versions.Même dans la mesure où layaairide 2.0, au moment de la création du projet, a automatiquement intégré la gestion de la version resourceversion dans le Code, les concepteurs n'ont pas à se préoccuper de l'utilisation de la catégorie resourceversion et doivent simplement sélectionner, dans l'interface d'affichage du projet, les options de gestion de la version Lorsqu'ils envisagent d'introduire la gestion de la version.

####Supprimer l 'ancien fichier de ressources

Lorsque la gestion de versions est activée, même si un fichier est modifié pour créer une nouvelle version, l 'ancien fichier de versions est conservé par défaut.

`勾选是否删除旧的资源文件`Une fois qu 'un fichier est modifié, l' ancien fichier de version est supprimé tandis que le nouveau fichier de version est généré.

###Extraction de documents

La fonction d 'extraction de fichiers est principalement conçue pour faciliter l' extraction de paquets locaux de petits jeux.

####Copier la liste de sélection

Clic`复制选择列表`La navigation à droite affiche l 'arbre structurel du Répertoire Bin.L 'développeur coche le Code ou la ressource à utiliser dans le paquet local.Clic**Oui.**Le Répertoire et le fichier sélectionnés sont ensuite enregistrés afin de faciliter la sélection et la reproduction du contenu de paquets local spécifié par l 'outil de publication.

####Où est la copie?

Clic`复制文件到哪`La navigation de la règle de droite peut spécifier une table des matières pour un petit jeu`复制选择列表`Le contenu du paquet local extrait est copié dans le répertoire spécifié ici.

####Script de suivi

Spécifiez ici un fichier pouvant être exécuté directement dans la ligne de commande (par exemple, un fichier exe ou bat sous Windows), qui sera appelé le fichier exécutable spécifié ici au moment de la publication.

Pour quoi?Par exemple, certains développeurs estiment que les fonctions de compression des ceintures de l 'IDE ne fonctionnent pas bien.Cela permet d 'écrire lui - même ou de trouver sur Internet un programme exécutable dans une ligne de commande.Appelle directement au moment de la publication.Il n 'est plus nécessaire de cocher une fonction de compression utilisant la bande autonome de l' IDE.