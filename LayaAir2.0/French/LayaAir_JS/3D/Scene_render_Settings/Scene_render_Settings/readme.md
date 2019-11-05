# 场景渲染配置介绍

###### *version :2.0.1beta   Update:2019-3-19*

###Description générale

Le scénario est un conteneur mondial 3D du moteur layaair pour présenter des images 3D du jeu et charger divers éléments 3D, des caméras, des lumières, des personnages, des objets, etc.

Grâce à la relation successorale de scene3d, on peut voir qu'elle a été héritée de la classe Sprite.Il est donc facile de le traiter comme un objet d 'affichage dans le 2D.

Dans le moteur layaair, les 3D et 2D peuvent être combinés et les scènes scne - 3D créées et les récipients ou éléments Sprite - 2d peuvent être chargés simultanément sur la scène.

###Configuration de rendu de lumière exportée dans une unité

Le développeur peut éditer les paramètres de rendu pour rendre un jeu plus performant.L 'éditeur peut voir l' effet de rendu de façon plus visuelle dans l 'Unity, donc nous recommandons au développeur d' éditer les paramètres de rendu dans l 'Unity, puis d' exporter la scène d 'utilisation.

####Support de rendu

Oui.`window-lighting-settings`Ouvre le panneau de rendu lumineux.

[] (IMG / 1.png) <br > (Figure 1)

**1) skybox - material**La boîte au ciel.

​**Tip*** utilisez Shader, sous layaair3d / Sky.

**(2) Environment Lighting**Lumière ambiante

L 'utilisation de la lumière Color, ambientmode - Realtime (en temps réel) est encouragée.

**3) Environment Reflections**Réflexe de l 'environnement

L 'utilisation de réflexes environnementaux personnalisés Custom est appuyée.

**4) lightmapping Setting**Paramètre d 'affichage optique

Total support, but not Directional mode (Directional)

​**Tip**: les autocollants d 'éclairage doivent être non - directionnels

**5) other Setting**Autres paramètres

Fog scène atomisation

**6) Global Maps**

Exportable, les effets sont compatibles avec PC, Mac & Linux - standard.

####Export scene

Devant[Unity插件篇](http://localhost/LayaAir2_Auto/%E5%9C%B0%E5%9D%80)Il y a une simple sortie de scène à l 'aide d' un insert où l 'on exporte les détails de la scène.

Après confirmation de la scène à exporter, ouvrez le panneau d 'Export et cliquez sur**Browse.**Sélectionnez le répertoire d 'exportation, sélectionnez pour exporter le Répertoire, cliquez sur**Layaair export**Export scene

[] (IMG / 2.png) <br > (Figure 2)

Voyons ce qui se passe après l'exportation.

[] (IMG / 3.ping) <br > (Figure 3)

Test.ls est le fichier de scènes que nous avons exporté, qui contient des données, des modèles, des photos, des emplacements, etc.

Le dossier de Library contient une boîte de collision par défaut.

Catalogue des ressources de scène dans le dossier Assets,.Jpg,.Png, et d 'autres documents sont des maquettes de matériaux.

Les fichiers Materials sont des boules de matériaux.


