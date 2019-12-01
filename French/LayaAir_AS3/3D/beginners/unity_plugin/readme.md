##Utilisation d 'un module Unity

]###Message important:

###Le moteur de la version layaair 1.x correspond à Unity - 5.6.x.Les développeurs sont donc priés de télécharger la version Unity - 5.6.x.Pour les autres versions, il peut y avoir une incompatibilité partielle.



##Téléchargement d 'outils d' exportation layaair3d

Down Address:

Http: / / ldc.layabox.com / download / Tools / layaair3dconverttools.zip

Ou à layaairide.**Outil**Sous le menu**Outil de conversion 3D**Vous pouvez passer au lien téléchargé, comme le montre la figure 1.

![图片1](img/1.png)< br > (Figure 1)

*Si la version 5.6.x révèle que le moteur ne convient pas à l'insert, cliquez sur le lien et le téléchargez à nouveau pour voir si l'insert a été mis à jour.*



##Installer un insert d 'Export

Démarrer Unity, créer un nouveau projet et importer les ressources et le matériel nécessaires au jeu, les maquettes, etc.Ctrl + s sauve notre scène et on garde le nom de truck.

L 'outil de conversion layaair3d est importé par le bouton droit de l' interface de gestion des ressources.La version de l 'insert sera mise à jour avec l' augmentation des fonctionnalités du moteur layaair, mais la méthode d 'importation est parfaitement cohérente.

Lorsque l 'outil d' entrée est entré avec succès, un dossier Laya plugin apparaît dans l 'interface de gestion des ressources et un menu Laya plugin exporté dans la barre de menu Unity.Figure 2

![动图2](img/2.gif)< br > (Figure 2)

​

###Paramètres de ressources d 'exportation

Cliquez sur la barre de menu Laya plugin, vous trouverez un panneau d 'Export où nous vous expliquerons en détail.

**Tips:**

Après avoir cliqué sur le menu layaair3d, d 'autres sous - éléments apparaissent dans le menu déroulant.

**Layaair demo, Studi, ansewers, etc., peut cliquer sur layaair pour donner des exemples, des documents d 'étude, des forums, et faciliter la confusion entre les concepteurs.**

![动图3](img/3.gif)< br > (Figure 3)



####Catégorie de ressources d 'exportation

**Catégorie scene**Il s' agit de toute la scène, qu 'elle soit exportée dans tous les modèles, matériaux, autocollants, animés ou photocollants, principalement pour la création de scène, l' extension de fichier est. LS, elle doit être chargée avec la classe scene ou ses héritiers.

**Catégorie sprite3d**Il y a moins d 'exports d' affiches d 'éclairage que de scènes, et des ressources séparées sont souvent utilisées pour l' exportation d 'objets actifs dans des rôles ou des jeux.

Ils seront chargés dans le modèle layaair3d du document technique 3D.

####Mesh Setting

Les paramètres d 'exportation des données de grille qui apparaissent après la sélection (fig. 4) peuvent servir à comprimer la taille des fichiers de grille LM du modèle.

Ignore vertices tangent néglige les informations de coupure
Ignore vertices color

![图片4](img/4.png)< br > (Figure 4)



####Texture Setting

Si d 'autres formats sont utilisés dans le projet, le chargement du jeu est mal signalé et doit donc être converti.

Type original de texture à convertir
Non - PNG \ \ 124 \ \ xr
Ressources de format PNG, ressources de format PNG utilisées dans des scènes originales JPG et ressources de format JPG utilisées
Image Lightmap (uniquement si vous sélectionnez l 'Export de la classe Scene), suggérez un traitement manuel des PS

Type de texture cible
Convertir PNG en format PNG, avec canal transparent
Convertisseur JPG en fonction de compression accessoire JPG, la masse de compression pouvant être sélectionnée

![图片5](img/5.png)< br > (Figure 5)



####Animation Setting

Export Animation

Optimize Bones supprime les squelettes inutiles dans l 'animation, mais seulement les squelettes inutiles qui n' affectent pas la diffusion de l 'animation squelettique.
Comppress lsani est temporairement inutilisable, en cours de développement, compression de données d 'animation osseuse, réduction de la taille des fichiers

![图片6](img/6.png)< br > (Figure 6)



####Terrain Setting

Paramètres d 'exportation Unity (Figure 7)

Convert terrain to Mesh
S' il y a un modèle de terrain dans la scène, la zone de conversion est transformée en modèle de grille.
La forme terrestre d 'untiy est très commode à dessiner avec des pinceaux des altitudes telles que les montagnes, les caniveaux, etc., et à appuyer la production de plusieurs autocollants détaillés pour plusieurs types d' autocollants.Le module d 'exportation layaair transforme le sol en Mesh, ce qui facilite l' utilisation par les développeurs.Il y a une différence entre le matériau et le matériau ordinaire, qui contient des dessins détaillés.

Resolution
Optimization Parameters for export Model Grid surface number, General par défaut Medium sufficient.Le niveau d 'optimisation défini ci - dessous est égal à la précision du nombre de faces divisé par quatre.
Very height a le plus grand nombre de faces optimisées.
Le nombre de faces optimisées de height est relativement élevé.
Medium Optimized surface number
Low - faible nombre de surfaces optimisées
Very Low a le nombre de faces le plus bas après optimisation.

![图片7](img/7.png)< br > (Figure 7)



####Gameoobject Setting

Paramètres de noeud d 'article de jeu (Figure 8)

Ignore NULL Game Objects
Les noeuds vides sont ignorés lors de l 'exportation, et les noeuds non supportés par le moteur layaair sont également considérés comme des noeuds vides, tels que les noeuds lumineux, ce qui permet de réduire le nombre de elfes.
Note: la version 1.5.0 permet l 'exportation de caméras, de sorte que le fait de ne pas tenir compte des noeuds vides n' affecte pas l 'exportation de caméras.

Ignore not active Game Objects
Les noeuds non activés dans la scène Unity sont ignorés lors de l 'exportation.

Optimize - game Objects
La suppression de tous les noeuds inutiles permet de réduire au minimum le nombre de elfes.

Batch make the first level Game Objects
Export en série (il faut sélectionner sprite3d pour avoir) export en série tous les noeuds de niveau 1 de la scène.



 ![图片8](img/8.png)< br > (Figure 8)




####Other Setting

Autres paramètres (Figure 9)

Cover original - export Files
Fichier d 'exportation d' origine

Customize - export root Directory - name
Le nom du dossier d 'exportation est personnalisé et le nom du dossier par défaut est "layascene + nom de scène".

Autonomically Save the configuration
Enregistrer automatiquement la configuration actuelle lors de l 'exportation



 ![图片9](img/9.png)< br > (Figure 9)



####Paramètres d 'exportation

Chemin de fichier enregistré par borower
Clear configurer
Revert config lit la configuration enregistrée à partir du tableau de configuration
Save config conserve la configuration actuelle et, après l 'enregistrement, la configuration antérieure sera utilisée directement après la prochaine ouverture pour faciliter le fonctionnement des développeurs.
Layaair Run clique sur le moteur layaair pour exécuter directement la scène.
Layaairrun use Notice:
Les modules d'extension Express doivent être installés dans l'environnement Node (l'outil comporte des Express et, s'il n'est pas utilisé normalement, il doit être installé lui - même);
L'objectif est d'assurer la présence d'un appareil photographique dont l'emplacement sera ajusté de manière à ce que l'effet de fonctionnement final du layaair soit conforme aux résultats de l'opération Unity.
Layaair Export les ressources courantes, puis cliquez pour exporter les données de la scène ou du modèle actuels vers le trajet spécifié.



 ![图片10](img/10.png)< br > (Figure 10)





###Ressources exportées

Nous avons créé un modèle de voiture dans l 'Unity et nous l' avons exporté avec le module layaair.Lorsque la configuration de la scène de sortie est prête, cliquez sur le bouton Laya export et exportez pour créer un dossier layascene u Truck par défaut (fig. 11).



 ![图片11](img/11.png)< br > (Figure 11)

Voir les ressources de fichiers graphiques ci - dessus, qui sont générées après l 'exportation. LS, LM, lmat, et les ressources TGA d' autocollage.

Il s' agit d 'un fichier de scénario qui est généré lors de la sélection d' une catégorie de scene exportée et qui contient une variété de données, de modèles, d 'affiches d' éclairage, d 'emplacements, etc.

LH est un fichier de modèle qui est généré lors de la sélection d 'exporter la catégorie sprite3d et qui manque d' informations sur les fichiers d 'autocollants optiques, les autres étant identiques.

LM est un fichier de données de modèle qui correspond à une conversion du format Fbx et peut être chargé dans la catégorie meshsprite3d.

Lmat est un fichier de données sur le matériau, les informations sur le matériau pour le modèle sont définies dans l 'unité et chargées. LS ou LH sont automatiquement chargées. Lmat produit le matériau.Lmat peut également modifier manuellement certaines de ces propriétés.

LANI est un fichier de données d 'animation (le modèle dans la figure 10 n' est pas animé et n 'est donc pas produit au moment de l' Export) et si le modèle est animé, un fichier de configuration d 'animation, comprenant des informations d' animation osseuse ou de trame, est généré après l 'Export.

Leur utilisation spécifique sera décrite en détail dans le dossier des cours de suivi.



###Exemple de chargement simple

Nous avons copié tout le contenu du dossier layascene u Truck à bin / H5 / sous le catalogue racine du projet.

Tips: ce chapitre ne présente que des applications de chargement simples qui, une fois exportées, génèrent des formats qui seront décrits en détail dans les documents techniques 3D intitulés "scènes de layaair3d" et "modèles de layaair3d".

Les exemples sont les suivants.


```java

package {
	import laya.d3.core.Camera;
	import laya.d3.core.scene.Scene;
	import laya.d3.math.Vector3;
	import laya.display.Stage;
	import laya.utils.Stat;

	public class LayaAir3D {
		
		public function LayaAir3D() {

			//初始化引擎
			Laya3D.init(0, 0,true);
			Laya.stage.scaleMode = Stage.SCALE_FULL;
			Laya.stage.screenMode = Stage.SCREEN_NONE;
			Stat.show();

			//添加3D场景
			var scene:Scene = Scene.load("LayaScene_truck/truck.ls");
			Laya.stage.addChild(scene);
			
			//创建摄像机(横纵比，近距裁剪，远距裁剪)
			var camera:Camera = new Camera( 0, 0.1, 1000);
			//加载到场景
			scene.addChild(camera);
			//移动摄像机位置
			camera.transform.position=new Vector3(-8, 4, 15);
			//旋转摄像机角度
			camera.transform.rotate(new Vector3( -8, -25, 0), true, false);
		}		
	}
}
```


Compiler le code simple ci - dessus, nous avons constaté que le chargement de la scène a été réussi et que le modèle de la scène est affiché sur la vue 3D (Figure 12).



 ![图片12](img/12.png)< br > (Figure 12)

