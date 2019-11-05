#Exporter un modèle à partir d 'Unity

###### *version :2.0.2beta   Update:2019-4-26 插件版本:2.0.2*

Devant[Unity插件篇](http://localhost/LayaAir2_Auto/%E5%9C%B0%E5%9D%80)Il y a une simple utilisation de l 'insert pour exporter les elfes.

*Ici, on utilise le modèle singe comme exemple.*

[] (IMG / 1.png) <br > (Figure 1)

Regardez la structure du fichier du modèle singe.

[] (IMG / 2.png) <br > (Figure 2)

Choix`预设`Et on clique.`导出`Exportez le modèle de singe.

[] (IMG / 3.ping) <br > (Figure 3)

Après l 'exportation, la liste des fichiers est la suivante:

[] (IMG / 4.png) <br > (Figure 4)

####* fichiers de données au format LH

`*.lh`Fichier de données de type spirte3d pour récipient d 'objet à affichage 3D exporté, codé en format json, sélectionné pour exporter un insert d' exportation layaair dans unity3d**Prediction**Les catégories sont générées avec moins d 'images d' éclairage que le format * LS et tous les autres sont identiques.

####* fichiers de données au format LM

Exporter**Fichier de scénario**Ou**Fichier prédéfini**Type, le dossier de ressources exporté contient des fichiers de format *.Lm, cet élément`LayaMonkey`Le dossier est un dossier que l 'développeur de l' Unity a créé lui - même pour stocker le modèle Fbx, comme la figure 4, qui génère le dossier correspondant et le fichier de ressource LM lors de l 'exportation.

`*.lm`Le fichier est le fichier de données de grille du modèle.Les fichiers contiennent des informations telles que l 'emplacement de la grille modèle, la ligne, la couleur de sommet, l' UV de sommet, etc.

####* fichiers de données au format lav

`*.lav`Le fichier est un fichier de données d 'animation squelette.On peut générer un avatar (squelette) de skinnedmeshsprite3d de griffon.

Le fichier contient des informations sur les noeuds osseux.

####* fichiers de données au format lmat

`*.lmat`Le fichier est un fichier de données de matériaux.Il est possible de générer un material utilisable dans le modèle.Il contient des dessins de matériau, des informations de couleur de balle de matériau, des informations de couleur de point fixe, des informations de décalage de texture, etc.

> davantage de types de ressources peuvent être consultés sur les descriptifs de ressources (([地址](https://ldc2.layabox.com/doc/?nav=zh-as-4-3-0)- Oui.