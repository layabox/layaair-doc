##Layabox a pris l 'Initiative de soutenir le jeu rapide du millet, la version layaair - 2.0.2 a considérablement amélioré les performances 3D, Spine et mémoire, et de nouveaux paramètres d' Adaptation d 'écran!

> update: 2019 - 04 - 15

Un mois s'est écoulé depuis l'ajout de fonctions telles que compression de fichiers d'animation layaair - 2.0.1beta, optimisation de la mémoire et des performances, création de projets de domaines ouverts, etc. au cours de cette période, nous avons non seulement ajouté un grand nombre de nouveaux documents layaair - 2.0 à 3D sur le site officiel, optimisé certains documents 2D et mis à jour l'exemple 3D sur le site officiel.Dans la version layaair 2.0.2 Beta publiée aujourd'hui, des mises à jour importantes ont également été effectuées autour des éléments clefs de la ligne principale du développement du moteur 2.0 « performances, convivialité, 3D », en particulier l'adaptation du moteur du jeu rapide du millet et l'intégration du jeu rapide du millet dans l'idee de layaair.

![mi](img/mi.png)

###Millet Quick Game background Introduction

Le 20 mars à Beijing, le Congrès des promoteurs d 'applications rapides (TEF 2019) a inauguré un rideau annonçant l' intégration des téléphones cellulaires et des terminaux mobiles chinois dans une plate - forme écologique d 'application rapide et l' élargissement de l 'Union des fabricants à 12.L 'application rapide à faible coût, bien expérimenté et de conserver des caractéristiques élevées, au niveau de la fonction et de l' expérience est déjà comparable à l 'app original, le coût d' utilisation des utilisateurs est plus léger.À ce jour, l 'application rapide d' un milliard d 'équipements couvrant l' ensemble du réseau, plus de 200 millions par mois; l 'application rapide plus de 2 milliards de fois, plus de 100 millions d' icônes de bureau sont conservées, le taux de rétention de 7 jours est de 18%.

En tant que membre de l 'Union des fabricants d' applications rapides, le célèbre fabricant de téléphones portables millet, une fois que les fabricants de moteurs ont appuyé publiquement l 'adaptation, va ouvrir la voie à l' introduction rapide d 'un grand nombre de jeux CP et de produits de qualité.Layabox, qui est le premier moteur à terminer l 'adaptation et la publication publique des jeux rapides de millet, a déjà un processus complet de distribution et d' accès.En particulier, l'outil de distribution de la clé du moteur est disponible dans le layaair, qui permet au développeur de publier rapidement le jeu basé sur le moteur layaair en tant que jeu rapide de millet, et le processus d'accès tout entier est très pratique, ce qui réduit considérablement le coût de l'accès pour le développeur.

L 'entrée du jeu rapide comprend à la fois des applications originales typiques et une riche gamme de scènes d' entrée systémiques: navigateurs, magasins d 'applications, centres de jeux, recherches de bureau / recherche globale, écrans négatifs, écrans de verrouillage, assistants vocaux, centres d' application rapide, push, calendrier.Dès que l 'utilisateur allume l' écran, il peut entrer rapidement dans le petit jeu n 'importe où et n' importe quand.Le jeu rapide est non seulement un avenir d 'application rapide de l' écologie, mais aussi un nouveau point de croissance pour l 'ensemble de l' industrie du jeu.

###Éléments de la version layaair 2.0.2 - beta

**Partie générale**

1, le moteur a ajouté un nouveau commutateur d 'adaptation de résolution physique de l' écran (useretinalcanvas), mis en service, le mode d 'adaptation peut être automatiquement ajusté à la résolution physique de l' écran pour rendre l 'image de jeu plus claire.

L 'IDE a mis à jour de manière obligatoire la fonction de version plus puissante et a ajouté de nouveaux jeux rapides de millet.

**Domaine 2D**

1, le moteur a considérablement augmenté l 'efficacité de Spine (performance, mémoire).

L 'IDE ajoute une fonction de fusion de fichiers binaires et optimise la facilité d' utilisation de la fusion de fichiers et de la compression d 'Atlas.

L 'IDE augmente la reconnaissance de composant pour l' audio WAV.

L'IDE met à jour toutes les ressources des composants UI

**Aspect 3D**

Les moteurs améliorent considérablement les performances du meshsprite3d avec le même matériau que le Mesh

Les moteurs optimisent les performances de l'animation osseuse et augmentent de 15%.

Les statistiques de performance des moteurs augmentent les savedrenderbatches et facilitent l 'accès des développeurs aux économies de lots

Le moteur shaderpass augmente la fonction statemap, les paramètres de l 'état de rendu sont plus souples, peut aussi être chaderpass par matériau

5, Laya - u3d plug - in a large Optimization to Improve mosh output performance, 100 fois plus élevé



###New physical resolution switch

L 'un des facteurs importants à prendre en compte lors de l' adaptation de l 'écran est la taille de conception, c' est - à - dire le nombre de pixels que le jeu a conçus, par exemple.`750*1334`".Les dimensions de conception du jeu influent non seulement sur la clarté de l 'image, mais aussi sur la taille du fichier d' image, GPU, mémoire.La taille de conception est plus grande que la taille de conception, la taille des ressources d 'image, la pression de rendu GPU, la mémoire occupe une grande place.Il y a donc des exigences de précision d 'image qui ne sont pas trop élevées, ou qui sont conçues pour des raisons telles que les performances, de manière à réduire la taille de l' image de jeu, par exemple`960 * 640`".Un certain nombre d 'écrans à haute résolution sont ensuite adaptés par étirage.Il en résulte un manque de clarté sur les écrans HD, des images ou des caractères, voire un phénomène de mosaïque (dans certains cas, la perception des dents est évidente).Les concepteurs ne peuvent donc pas réduire de façon excessive la taille de la conception, mais doivent tenir compte de la configuration dominante afin d 'équilibrer les considérations.

Avant la mise en page 7.0.3, le bas du jeu de micro - messages de la version Android oblige à ajuster la largeur de l 'écran à la résolution physique de l' écran.En d 'autres termes, même si l' développeur conçoit des images de jeu de faible taille, la performance de l 'image finale reste claire, bien sûr, ce qui affecte les performances.Dans le même temps, pour certains jeux qui n 'ont pas besoin d' un affichage à haute résolution, il est préférable de réduire la consommation de certaines performances.Le bas du jeu prive l 'développeur de son choix.Cependant, à partir de 7,0,3, le bas du jeu n 'est plus obligé d' installer Canvas en tant que résolution physique.Comme le moteur layaair n 'a pas de version compatible avec le bug 7.0.3, ces problèmes sont essentiellement dus à une compréhension insuffisante de l' adaptation de l 'écran et à une expérience insuffisante de l' adaptation.

Pour abaisser le seuil d 'adaptation et pour résoudre les vieux jeux existants, il est possible de s' adapter automatiquement en mode haute résolution physique sans modifier la taille de conception.Ainsi, à partir de la version layaair 2.0.2beta, nous avons ajouté le paramètre useretinalcanvas, qui oblige à fixer Canvas à la résolution physique, lorsque`Laya.stage.useRetinalCanvas=true`À l 'heure actuelle, quel que soit le mode d' adaptation de layaair utilisé, les Canvas sont configurés en fonction de la résolution physique.L 'avantage, c' est que les jeux de taille de conception, sans ajuster la taille de l 'image, sans s' inquiéter de l' augmentation de l 'occupation de la mémoire, peuvent revenir au mode HD.L 'inconvénient, c' est que l 'obligation d' une haute résolution entraîne nécessairement une pression de rendu de GPU, c 'est - à - dire que l' activation de cette fonction nécessite des sacrifices de performance.Par conséquent, le moteur est désactivé par défaut et si l 'développeur estime que la performance du produit est plus importante, il peut utiliser le système d' adaptation standard layaair pour concevoir la taille du jeu, ce qui permet d 'activer la fonction lorsque l' développeur estime que les performances visuelles à haute résolution de chaque écran sont plus importantes.



####Optimization and millet Fast Game support

En ce qui concerne la fonction de diffusion de layaairide, le lancement de la nouvelle version officielle 2.0, connue sous le nom de version 3.0, a suscité une certaine confusion ou des doutes de la part de certains développeurs au sujet de la version du moteur et de la version fonctionnelle.Ainsi, à partir de layaair 2.0.2 beta, le concept de numéro de version à petite fonction est flou, l 'ancien bouton de distribution est supprimé et l' ancien bouton de distribution est directement orienté vers la nouvelle édition.Si vous avez besoin d 'utiliser une ancienne fonction de publication, vous pouvez l' ouvrir dans les options de la barre de menu.Nous recommandons une nouvelle version.Si vous utilisez des questions fonctionnelles, vous pouvez ouvrir l 'interface fonctionnelle de publication et cliquer sur l' icône d 'interrogation pour afficher le document descriptif.

En outre, après avoir pris l 'Initiative de soutenir 100 jeux intelligents, le moteur layaair a de nouveau pris l' initiative d 'achever l' adaptation du moteur de jeu rapide de millet avec l 'aide de la diffusion de l' IDE.L 'adhésion des grandes usines de flux a donné aux promoteurs une nouvelle chance de flux de dividendes.

![xiaomi](img/xiaomi.png) 


Bien entendu, dès le début de l 'accès, si le développeur ne connaît pas bien les services d' accès aux Jeux rapides de millet, il peut également obtenir un appui technique et de montage supplémentaire auprès des entreprises de layabox.

**Coopération commerciale**BD @ layabox.com



####Amélioration sensible de l 'efficacité Spine

Dans la version layaair 2.0.2 beta, nous avons considérablement amélioré l 'efficacité de Spine.Selon le modèle Spine fourni par l 'équipe du projet des grands anges sous le drapeau polaire, 155 squelettes et 845 triangles par modèle ont été testés dans l' environnement d 'essai du navigateur intérieur du millet 6.Pour la dernière édition du moteur, nous avons comparé les données de la performance à la mémoire.

![game](img/game.jpg) 


**Comparaison des performances:**

Ligne rouge 2.0.2beta, Ligne bleue 2.0.1beta, axe X, nombre Sprite, axe Y, vitesse de trame FPS correspondant au nombre Sprite



 ![fps](img/fps.png) 


En comparant les données de performances, on peut les voir visuellement.100 elfes (Sprite) sur 2,0,2 trames complètes et 2,0,1 sur 40.Le fps (vitesse de trame) diminue tout en continuant à augmenter le nombre de Schtroumpfs, mais le 2.0.2 conserve toujours son avantage de performance.

**Comparaison de mémoire**

Ligne rouge 2.0.2beta, Ligne bleue 2.0.1beta, axe X, nombre Sprite, axe Y, quantité correspondante de Sprite

![memory](img/memory.png) 


En comparant les données d 'occupation de mémoire, on peut les voir visuellement.Dans le même nombre de elfes, l 'utilisation de la mémoire à des fins d' essai basée sur layaair 2.0.2 non seulement diminue considérablement par rapport à la version de layaair 2.0.1, mais elle augmente aussi très lentement et de manière très régulière, en raison de l 'augmentation du nombre de elfes.



####Augmentation et optimisation de la fonction VIP

En ce qui concerne la fonction VIP, la nouvelle version layaair 2.0.2 Beta a commencé à fusionner les fichiers binaires.Ainsi, les fichiers binaires peuvent être fusionnés pour des fichiers plus petits que ceux du format json.La fonction de regroupement de fichiers réduit considérablement le nombre d 'interactions de téléchargement de fichiers et améliore l' efficacité de chargement de jeux.



 ![plfb](img/plfb.png) 


La fusion des fichiers de texte (json) a également été adaptée pour harmoniser les procédures et les spécifications de la fusion des fichiers.En outre, le processus de fonctionnement idee pour la compression de texture d 'image est optimisé, l' utilisateur n 'étant plus tenu de préparer manuellement des informations textuelles sur l' Atlas, l 'utilisateur pouvant identifier automatiquement l' image Atlas ou PNG directement dans la barre d 'outils, et l' accessibilité fonctionnelle est encore améliorée.Pour plus de détails sur l 'utilisation de la fonction, voir la description de la fonction VIP et l' introduction à l 'utilisation.

Liens vers le document:

Https: / / ldc2.layabox.com / DOC /? Nav = ZH - TS - 0 - 3 - 3

![doc](img/doc.png) 

 



####Autres optimisations de l 'IDE

Idee et les moteurs sont faciles à utiliser, nous nous efforçons d 'améliorer l' endroit.Dans cette version, nous allons utiliser plusieurs années de ressources de module ui par défaut de remplacement complet, la nouvelle version de l 'ensemble ui ressources d' images non seulement pour améliorer le style des beaux - arts, mais aussi pour des dispositifs mobiles, afin de rendre plus convivial et plus esthétique les ressources de module de temps de production Demo pour les développeurs.



 ![ideUI](img/ideUI.jpg) 


Une autre amélioration de l'IDE consiste à prendre en charge l'identification des composants de format audio WAV. Jusqu'à layaair 2.0.2, l'IDE ne peut identifier que les fichiers du format mp3 en tant qu'éléments audio pour déclencher l'utilisation d'une scène visualisée, ce qui permet à layaair d'éditer et de créer visualisés plus facilement.



 



####Nouvelle fonction d 'analyse de performance 3D

Le jeu 3D, l 'optimisation de lots est l' un des principaux moyens d 'optimiser les performances, mais après l' ouverture de lots optimisés, combien de randerbatches a - t - il économisé, les développeurs ont du mal à percevoir.Ainsi, à partir de la version layaair 2.0.2beta, le moteur a ajouté un nouveau paramètre savedrenderbatches au panneau d 'information statistique de performance, qui représente le nombre de lots économisés après une opération d' optimisation.Comment l 'optimisation peut - elle être activée, ce qui affecte les valeurs de paramètres savedrenderbatches, et peut - être les aspects suivants:

#####Fusion statique:

En cochant l 'étiquette statique dans le module Unity de layabox, le moteur combine les objets statiques lors du chargement de la scène, ce qui réduit les renderbatches et améliore considérablement les performances de la scène.

#####Fusions dynamiques:

L 'optimisation n' a pas besoin d 'être réalisée par l' développeur et le mouvement dynamique des objets n 'est pas limité.

#####Fusion dynamique des sommets:

L 'optimisation n' a pas non plus besoin d 'être réalisée par l' développeur et le mouvement dynamique des objets est illimité.

L 'optimisation de ces points a la priorité de la fusion statique > > de la fusion dynamique > > de la fusion dynamique >



 



####Augmenter considérablement les performances 3D

Les performances extrêmes sont l 'une des principales étiquettes du moteur layaair, de sorte que l' optimisation de la performance du moteur est également notre moteur de développement.Pour un grand nombre d'homogènes et de modèles Mesh généralement présents dans des scènes tridimensionnelles, tels que les forêts, les feux de route, etc., la différence n'est que de l'emplacement et de la taille. À partir de la présente version du moteur, on a procédé à une optimisation approfondie des modèles pour les caractéristiques ci - dessus, ce qui a permis de combiner un grand nombre d'homogènes et de modèles avec le Mesh en un lot unique, ce qui permet d'améliorer considérablement les performances de rendu de la scène.Bien entendu, les concepteurs doivent veiller à ce que les mêmes modèles soient utilisés pour le Mesh et le Material dans la mesure du possible.L 'optimisation n' affecte pas la transformation mobile de l 'objet, de sorte que le moteur peut être combiné et optimisé de manière dynamique, ce qui permet d' améliorer considérablement les performances.

Nous avons fait des tests comparatifs sur surface pro6.Le CPU est Intel I5 8250u, Intel uhd Graphics 620 et le modèle utilisé pour les tests utilise 12 triangles.Il est à espérer que le diagramme de comparaison des données donne au développeur un sentiment d 'effet intuitif.



 ![3D](img/3D.png) 


Il ressort des résultats des essais de diagramme ci - dessus que la version layaair - 2,2 Beta peut atteindre une trame complète à 20 000 elfes, alors que la version 2.0.1 Beta ne comporte que plus de 20 trames et que 2.0.2 Beta conserve son avantage avec l'augmentation constante des conditions d'utilisation des Elfes.

L'animation animator est l'élément d'animation de layaair3d dont la fonction la plus courante est l'animation squelettique, de sorte que l'optimisation des performances et de la mémoire osseuse a été au centre de l'optimisation de layaair3d et que les performances de l'ensemble animateur animator ont été optimisées à plusieurs reprises depuis la publication de layaair2.0, de même que la version layaair2.0.2, ce qui a permis d'améliorer de 15%.En outre, le format des ressources d 'animation squelettique est optimisé par l' insert d 'exportation Unity de layabox, et l' utilisation de la nouvelle version de l 'insert Unity pour exporter les ressources peut réduire les performances d' amélioration de lots de rendu du modèle.

Enfin, il convient de mentionner l 'optimisation de la fiche Unity de layabox, qui, dans la version actuelle, permet d' améliorer considérablement les performances d 'exportation Mesh de la peau, ce qui permet de réduire considérablement le temps d' exportation et d 'augmenter l' efficacité de 100 fois.Ce qui devait être fait en 300 secondes, c 'est fait en 3 secondes.



 



####Ce nouveau moteur 3D.

Dans la nouvelle fonctionnalité de la version layaair2.0.2 beta, le moteur 3D shaderpass a ajouté une fonction statemap, ce qui permet de rendre plus souples les réglages d 'état de rendu, soit par shaderpass, soit par matériau.

En outre, des fonctions courantes ont été ajoutées à un certain nombre de moteurs 3D.Par exemple:

Texture2d Increasing setsubpixels interface texture Increasing mipmapcount attributs Increasing laya.loader.create lot loader.create Event Parameters Increasing Mesh cloning interface increase Blend \ \ enable \ \ u seperate Mixing mode

###à la fin

Le moteur a fait beaucoup de choses ce mois - ci, écrit ici, j 'ai codé des mots depuis longtemps, la version a été publiée et tout est écrit.C 'est aussi le véritable amour de layabox.Je vous remercie de votre soutien et vous souhaite la bienvenue à vous faire part de cette mise à jour importante à d 'autres développeurs.Nous allons faire plus pour l 'avenir en ce qui concerne les moteurs.En plus des moteurs eux - mêmes, pour les documents d 'étude sur le site Web, il y a toujours eu des gouttelettes, mais il est évident que nous avons continué à améliorer après l' année, pour les documents, les exemples, les vidéos, nous allons continuer à investir, continuer à améliorer, afin de réduire le seuil d 'apprentissage.

![img](http://pic.rmb.bdstatic.com/c4308ba420f0a876eee14012689fc70a7672.gif)