#Layaair 2.0 a été publié en version officielle, avec une présentation complète des caractéristiques importantes.

> Author: Charley > Date: 2019 - 1 - 19

Depuis la première version d'essai du moteur layaair 2.0, publiée le 15 septembre.[点此查看2.0引擎新特性](http://mp.weixin.qq.com/s?__biz=MzAxMjI4NjA1OA==&mid=2650584322&idx=1&sn=375e3dceaaf2b405e728bcba8f174d1e&chksm=83bc3407b4cbbd11c76ea98a032c328e253b80163cd4e68f3ebe5ced75b36beeccf511e87132&scene=21%3Ch1%3Ewechat_redirect)Temps`4`Plus de mois.`4`Version 2.0 beta dans laquelle plusieurs bug, moteurs 2D et idee optimisent et ajoutent des fonctions`39`Article, 3D Engine and plug - in Optimization and New Function`22`ArticleGrâce aux efforts inlassables de l 'équipe du moteur, les développeurs ont finalement apporté une version officielle stable de 2.0.À cet égard, nous sommes également reconnaissants aux concepteurs de bug qui ont participé activement aux essais et aux réactions.

Tout d'abord, je voudrais vous présenter quelques mises à jour essentielles de cette version officielle:

###Optimisation de la fonction du moteur 2D

Dans le moteur 2D, le nombre de drawcall entraîne inévitablement une baisse de performance.Le moteur layaair a beaucoup optimisé le rendu d 'images, par exemple, lorsque les mêmes images voisines sont rendues, elles sont automatiquement fusionnées et rendues ensemble, ce qui permet de réduire le nombre de drawcall.Cependant, l 'insertion d' images ou de textes différents lors de l 'utilisation de l' ui interrompt nécessairement le rendu combiné de l 'image.Les dépenses de performance inutiles résultant d 'une utilisation inappropriée par l' développeur peuvent se traduire par l 'apparition éventuelle de carton de performances.

Dans l 'ancien schéma d' optimisation layaairide, le moteur combine automatiquement les ressources d 'Atlas de la même couleur dans des positions adjacentes, ce qui permet d' optimiser les performances.La méthode d'optimisation est indiquée dans la figure 1.

![图1](img/1.png) 


(Figure 1)

Bien que l 'optimisation des ressources d' Atlas par couleur soit relativement évidente, il existe un petit nombre d 'intrusions de texte inévitables dans un petit nombre de scénarios complexes en vue d' optimiser les performances.Dans la version officielle layaair 2.0, de nouveaux paramètres d 'optimisation drawcalloptimize ont été ajoutés à l' IDE avec une valeur par défaut False.Optimiser plus complètement.Ainsi, cette optimisation non seulement a atteint l 'objectif d' optimisation des performances extrêmes, mais a également amélioré la convivialité de l 'utilisateur et réduit le seuil d' optimisation.

![图2](img/2.png) 


(Figure 2)

> Il convient de rappeler que le Programme d 'optimisation drawcalloptimize ne s' applique pas à des besoins particuliers qui doivent être partiellement masqués car il permet d' améliorer automatiquement le niveau d 'affichage du texte.Bien entendu, dans la grande majorité des cas, le texte est affiché dans son intégralité et, s' il y a des circonstances entièrement masquées, les attributs cachés peuvent être définis directement.Il est donc recommandé à l 'développeur d' ouvrir le Programme d 'optimisation.

###Ajout de nouvelles fonctions de publication des projets (version 3.0)

Une version entièrement nouvelle de la fonction 3.0 de publication des projets a également été ajoutée à la version officielle layaair IDE - 2.0.De manière à ce que les fonctions de compression, de gestion de versions et de réduction de l 'extraction de jeux soient plus perfectionnées et plus souples, l' utilisation de chaque fonction par le développeur peut être contrôlée par lui - même, de sorte que la fonction est plus libre, et améliore considérablement l 'accessibilité de la fonction de distribution de produits.

Etant donné que cette fonction a beaucoup de contenu à présenter, un document indépendant a été publié à l 'avance[《LayaAir IDE项目发布3.0详解》](https://mp.weixin.qq.com/s/AMS7xEqVbLpbfo2F5li3vw), l 'développeur peut lire le texte, puis cliquer sur le lien du document et lire en détail la description fonctionnelle de l' article 3.0.

###Optimisation de panneaux statistiques de performance 3D

####Nouveaux paramètres statistiques

Les performances en 2D dépendent généralement du nombre de drawcall, c 'est - à - dire d' un nombre de lots.Le moteur 3D combine les lots de rendu et il est difficile de déterminer le nombre de drawcall.La version officielle 2.0 a donc été lancée avec un nouveau paramètre, renderbatch (lot de rendu), plus professionnel et plus précis.Comme le montre la figure 3.Les développeurs ultérieurs verront la valeur de renderbatch, c 'est - à - dire le nombre réel de lots soumis, qui est le plus faible possible pour répondre aux besoins opérationnels.

![图3](img/3.png) 


(Figure 3)

####Séparation d 'un affichage statistique de mémoire CPU et GPU

Auparavant, l 'affichage de la mémoire était enregistré ensemble.En fait, ce n 'est pas très avantageux pour l' étude de l 'occupation de la mémoire, la version officielle 2.0 a commencé à afficher séparément les statistiques de mémoire CPU et GPU.Voir directement les valeurs de cpumemory et gpumemory.Comme le montre la figure 3.



###Augmentation de compression de texture GPU

Dans la version officielle du moteur layaair - 2.0, l 'ajout d' une fonction de compression de texture GPU permet de réduire considérablement l 'occupation apparente de l' affiche d 'au moins 75%.En d 'autres termes, si l' on avait besoin de 100m, on n 'aurait plus que 20 M.Cela réduirait considérablement le coût de la mémoire de gestion de programme, accroîtrait l 'espace de l' art et rendrait la qualité du jeu plus parfaite.

En outre, sous la pression de layabox, la compression de texture GPU est également supportée au niveau inférieur du jeu de micromessagerie à partir de la version 7.0.La qualité de l 'image de jeu des promoteurs peut être améliorée.



###Augmentation de la compression de fichiers Mesh

Dans la version officielle du moteur layaair 2.0, la compression des fichiers Mesh a été ajoutée, ce qui réduira la taille des fichiers Mesh d'environ 60% et la charge de téléchargement du réseau de fichiers modèle 3D de plus de la moitié.En d 'autres termes, un jeu 3D de même qualité, la vitesse de chargement peut être améliorée.Il est bien connu que la vitesse de chargement du jeu a un impact direct sur les données de conversion des utilisateurs, de sorte que les développeurs peuvent utiliser cette fonction dès que possible.



###Interface destinée à accroître la libération de ressources inutiles


Dans les versions précédentes des moteurs, la nécessité pour les développeurs de gérer et de libérer les ressources au moyen d 'une liste a toujours été un problème plus aigu pour les développeurs, en particulier dans les 3D où il est difficile pour les développeurs de gérer de façon sûre et fiable les ressources libérées par le biais de la Liste En raison de la diversité des ressources et des problèmes de partage.Dans la version officielle du moteur layaair 2.0, une interface simple et facile à utiliser pour libérer des ressources inutiles a été ajoutée.`Laya.Resource.destroyUnusedResources();`) La facilité de gestion des ressources en 2D et 3D a été considérablement améliorée.



###Nouvelles fonctions exclusives

À partir de la version officielle layaair 2.0, sans préjudice du développement quotidien des promoteurs ordinaires, nous avons lancé la fonction de moteur exclusif des membres.1 024 yuans peuvent être achetés pour devenir le moteur de la redevance annuelle, bénéficier de la haute qualité des fonctions exclusives des membres (par exemple, la compression de texture GPU et la compression de fichiers Mesh font partie des fonctions des membres) et les fonctions exclusives du moteur conserveront une certaine fréquence de lancement de nouvelles fonctions, mais Les prix resteront inchangés.En outre, les recettes provenant des cotisations des membres, basées sur les fonctions exclusives du moteur, seront entièrement consacrées au développement du moteur layaair lui - même, ce qui constituera donc le point de départ de l 'autonomie du moteur layaair, dans l' espoir que, grâce à l 'appui du développeur, le moteur sera bien développé et durable.



Outre les fonctions supplémentaires mentionnées ci - dessus dans la présente version officielle.


####Au cours de ces quatre derniers mois, les moteurs 2D et l 'IDE ont été ajoutés et optimisés comme suit:

Élargissement de la configuration auxiliaire des moteurs physiques
Moteurs physiques rigidbody ajoutant une interface getworldcenter pour faciliter l'accès au Centre rigide
Augmentation du nombre de rigides, du nombre d'articulations et du nombre de collisions dans la catégorie des moteurs physiques
Méthodes d'acquisition d'informations sur les points de collision supplémentaires pour les moteurs physiques
Adaptation de la propriété linéaire Velocity du moteur physique modifié rigidbody au type Object
Moteurs LOADER pour l 'identification automatique des suffixes de documents tels que SK, Ani
Élargissement des param ètres paramétriques de paramètre paramétriques pour les moteurs scene Open
Appui à un seul cas supplémentaire de la catégorie des moteurs scene
Soutien adaptatif pour le jeu léger Q à main supplémentaire
Méthode readaarraybuffer d'augmentation du nombre de moteurs Byte
Traitement anormal de données non disponibles pour les moteurs
Adaptation des moteurs
Accélération de la régression des moteurs scene pour faciliter l 'accès à des informations sur l' état d 'avancement du chargement de scénarios
Le moteur scene ajoute des réglages de pages de chargement, des réglages de pages de chargement par le biais de la méthode setloadingpage, l 'affichage de pages de Loading lors du transfert de scènes et la prise en charge automatique des événements de Progress dans le scénario actuel.
Moteur scene: augmentation du nombre de pages showloadingpage et de pages hideloadingpage
Le procédé de verrouillage du moteur scene permet d 'ajouter les propriétés de type afin de faciliter la compréhension des raisons de la fermeture.
Le moteur Sprite loadimage permet d 'accroître la protection contre l' URL vide
Préchargement automatique des fichiers SK lors du préchargement des fichiers sceneloader
Utilisation normale des microsystèmes et des cadres d'entrée de jeu à petite échelle dans les bibliothèques d'adaptation des moteurs
Pour adapter les petits jeux, ajouter un interrupteur dans l 'IDE qui permet d' exporter des documents tels que des scènes en json
Ajout de paramètres rendertype aux panneaux d 'attributs Graphics de l' IDE
Ajout d 'éléments d' affichage de champs de données ouverts aux microcommunications dans l 'IDE
Ajouter un module de partage de flux de jeux de micro - messages dans l 'IDE
Assemblages pour le chargement dynamique de la peau dans une bibliothèque ui et augmentation de la fréquence des événements resize une fois le chargement terminé
Ajouter une sélection multiple de noeuds du même type dans l'IDE pour afficher les fonctions supplémentaires de ce type
L'ajout d'un nouveau fichier style (attribut par défaut des ressources) à la fonction de détection des changements et, en cas de changement de style, l'IDE avertit automatiquement les utilisateurs de la mise à jour et prévient efficacement les erreurs de présentation des résultats.
Fonction de transfert tab de la nouvelle interface de configuration de la grille de la neuvième chambre dans l'IDE
L'ajout d'un nouvel outil de conversion d'images texturées dans l'IDE permet de réduire considérablement la taille de la mémoire des fichiers Android et iOS (fonction VIP).
Ajouter une fonction de référence de recherche au bouton droit de la page de scénario IDE
Idea optimisation de la mémoire cache en vue de l 'exploitation de scénarios supplémentaires, sans que les documents soient exportés à l' heure actuelle, et amélioration de l 'efficacité de la compilation
L'IDE optimise les modifications apportées aux fichiers audiovisuels, sans les modifier, sans les compiler, et améliore l'efficacité de la compilation.
Projet de chaîne de blocs supplémentaires IDE (ETH, Neo, HPB)
Optimiser les notes relatives aux catégories physiques pertinentes en ajoutant des précisions
Optimiser et rationaliser les stratégies de libération du son
Optimisation de l'amélioration des interfaces vectorielles telles que drawcircle - drawline
Optimiser les composants physiques pour réduire les coûts de création d 'objets
Optimisation de l 'articulation de la souris d' un moteur physique amélioré, mise en place d 'un point de contrôle facultatif ou, à défaut, utilisation d' un point de contrôle en fonction de la position du clic de la souris

####Au cours de ces quatre derniers mois, les moteurs 3D et Unity Export insert ont été ajoutés et optimisés comme suit:

Compoundcollidershape Increasing Clear childshape
Ajustement de la matrice de synchronisation des noeuds squelettiques sans rootbone du mécanisme d 'Association rootbone de shinnedmeshrender
Renforcement des attributs d'activité des fées par animator
Éléments rigidbody3d permettant de déterminer si l 'augmentation du nombre de propriétés endormies
Composants rigidbody3d ajoutant des propriétés sleeplinearvelocity et sleeepangularvelocity
Procédé d 'élimination d' un composant physique activate () et d 'ajout d' un composant rigidbody3d wakeup ()
Reconstitution de trailsprite3d et réparation d'un certain nombre de bug, comme indiqué en détail dans la plupart des textes de l'API
Reconstitution de l'elfe pixellinesprite3d pour optimiser l'accessibilité de l'API, comme indiqué dans le document API
Méthode de vector3
Nouveau modèle transformz
Augmentation des paramètres de replacement dans la fonction render de l'appareil photo
1. Ajouter le concept de subshader au cadre Shader
Augmentation des matériaux spatiaux programmés
Simplification des paramètres de configuration de shader personnalisés et amélioration de l'accessibilité
Animation animée animée
Ajout de fonctions de compression de documents de modélisation
Ajuster la Sous - catégorie relative à primitivemesh en tant que catégorie générique Mesh, en remplaçant la méthode primitivemesh.createxx () par la méthode en usine statique et en simplifiant la catégorie de grille.
Perfectionner les fonctionnalités associées au module rotationoverlifetime en 3D
Pages supplémentaires sur la gestion du compte dans le module Unity
Unity insert increase Mesh file compression
Unity insert Increasing Brown top color
Module Unity adapte la gamme de couleurs de sortie de layashader dans Unity.
Export de bug à partir d 'une carte de l' Unity
Optimisation de la vitesse de compression texturée de la plate - forme d 'Android à l' aide de connecteurs Unity
Optimisation de la fonction layaairrun dans le module Unity et suppression de la fenêtre Cmd
Unity insert optimise considérablement la vitesse de sortie des ressources



###S'il y a des développeurs qui ne connaissent pas la nouvelle caractéristique de laya2.0,On peut continuer à regarder la présentation complète des nouvelles caractéristiques du moteur lors de l'autopsie du 15 septembre:

Liens:

[9月15日LayaAir 2.0 开始测试，引擎新特性全面介绍](http://mp.weixin.qq.com/s?__biz=MzAxMjI4NjA1OA==&mid=2650584322&idx=1&sn=375e3dceaaf2b405e728bcba8f174d1e&chksm=83bc3407b4cbbd11c76ea98a032c328e253b80163cd4e68f3ebe5ced75b36beeccf511e87132&scene=21%3Ch1%3Ewechat_redirect)

