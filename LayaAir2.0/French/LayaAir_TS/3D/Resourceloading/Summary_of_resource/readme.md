#Ressources

###### *version :2.0.1beta   Update:2019-3-19*

Dans le monde layaair3d, les principaux types de ressources utilisées pour le développement: scènes, scénarios, grilles de modèles, ballons de matériaux, dessins de matériaux, fichiers d 'animation.Les différents types de ressources sont expliqués en détail dans le cours correspondant qui suit et ne sont pas approfondis ici.Dans cette section, nous présenterons une description détaillée des différents documents générés par l 'outil d' exportation layaair dans l 'Unity, ainsi que des méthodes de chargement correspondantes.

###Type de ressources

`.ls`Pour le fichier de scénario, sélectionnez la catégorie scene à exporter.Il contient une variété de données nécessaires à la scène, des cartes d 'éclairage, des modèles, des emplacements, etc.à utiliser**Scene3d**Chargement.

`.lh`Pour les fichiers prédéfinis, sélectionnez la catégorie sprite3d à exporter.Il n 'y a pas d' informations de scène, les autres caractéristiques sont les mêmes que les fichiers.**Sprite3d**Chargement.

`.lm`Pour les fichiers de données de modèle, la conversion est généralement effectuée au format Fbx.Utilisable**Meshsprite3d**Chargement.

`.lmat`Pour les fichiers de données de matériaux, les informations de matériaux pour les modèles sont définies dans l 'unité.Les fichiers LS. Lmat sont automatiquement chargés pour générer le matériau.Utilisable**Base Material**Chargement.

`.lani`Fichier de données d 'animationS' il y a une animation sur le modèle, le fichier de configuration d 'animation qui sera généré après l' exportation contient des données de trame d 'animation.Chargement disponible**Animationclip**Chargement.

`.jpg`Oui.`.png`Oui.`.ltc`Oui.`.ktx`Oui.`.pvr`Fichier d 'affichageSi elle est utilisée, l 'unité génère le fichier d' affichage après l 'exportation.Utilisable**Texture2d**Chargement.