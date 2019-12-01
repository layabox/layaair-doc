#Editer Visual resource production



###Ressources de visualisation de jeux

Dans le cours précédent, nous avons analysé les idées de développement et nous avons préparé et classé les ressources des matériaux d 'art.Dans ce cours, il ne faut pas se presser de taper sur le Code, nous avons préparé l 'interface ui et l' animation avant de procéder au traitement logique.Layaairide est un puissant outil d 'édition visuel dans lequel les parties visibles du jeu peuvent être réalisées.

Ces éléments visualisables sont les suivants: divers types de composants, icônes, pages ui, animations, cartes, particules, etc.Si les élèves ne connaissent pas bien les modules de l 'IDE, le programme détaillé peut être consulté sur le document technique layaair.Nous allons maintenant commencer à produire progressivement les ressources visuelles de la guerre aérienne.



###Créer une page de jeu

Dans cet exemple, nous construisons dans le gestionnaire de projet une nouvelle page de démarrage, une page de jeu en cours, une page de fin de jeu et une page de carte de jeu.(figures 1 et 2).

Pour s' adapter aux écrans de téléphonie mobile de masse, définissez une résolution de page de 720x 1280.Nous choisissons le type de page View par défaut.Le type dialog affiche l 'effet d' animation, ce qui permet d 'utiliser ce type pour les pages "début" et "fin".

![试玩.png](img/00.png)< br / > (Figure 1)

![试玩.png](img/0.png)< br / > (Figure 2)

Veuillez vous reporter au tableau ci - dessous.

Ce jeu vidéo est un fichier visuel \ \ \ \ \ \ \ \ \ \ \ \ \ \
124 --------------------------------------------------------------------------------------------
Le type de page View \ \ 124.
124 \ \ gameover.ui \ \ 124 \ \ à la fin du jeu, type de page dialog \ \ 124
En cours de jeu, type de page view.
124 \ \ gamestart.ui \ \ \ \ 124 \ \ Spring interface, type de page dialog \ \ 124



####Production de page de flux de jeu

Après la création, l 'ouverture et l' ouverture de la page gamestart.ui, les composants ou ressources correspondants sont introduits dans le gestionnaire de ressources ou de composants, les réglages de position, les combinaisons étant effectués à l 'aide d' un outil d 'identification, et les relations de niveau d' élément et d 'intégration sont ajustées à l' aide d 'une interface de niveau idee (analogue à une couche Photoshop).La barre d 'attributs de droite peut également faire fonctionner l' élément dans une position élevée et rotative, ce qui permet d 'obtenir le profil d' effet artistique requis (fig. 3).

Après ajustement de la disposition des pages, ajouter un nom de variable (attribut Var) pour les éléments nécessitant une modification de programme.Par exemple, l 'ensemble text de la zone de chargement progressiste s' appelle txt \ \ \ u Load et l' ensemble Box de l 'ensemble Box du bouton à glisser est appelé BTN \ \ u START.

Les pages gameplay et gameover sont pour l'essentiel identiques à celles de gamestart (fig. 4) (fig. 5), ce qui n'est plus le cas.

![试玩.png](img/2.png)< br / > (Figure 3)

![试玩.png](img/3.png)< br / > (Figure 4)

![试玩.png](img/4.png)< br / > (Figure 5)



####Jeu de cartes

Crée et ouvre la page gamebg.ui, nous tirerons deux background.png du gestionnaire de ressources vers l 'éditeur de scène, les deux parties supérieure et inférieure étant continuellement alignées pour l' utilisation continue et continue de la carte.Et définissez deux noms de variable graphique (attributs Var) pour bg1 et BG2.Les coordonnées y du BG2 sont - 1280.

Bien entendu, on pourrait aussi utiliser une carte double continue plus longue.Certains jeux définissent deux niveaux dans l 'arrière - plan, un horizon (Défilement lent) et un horizon proche (défilement rapide).

![试玩.png](img/1.png)< br / > (Figure 6)



Ainsi, la page de jeu est produite, enregistrée et publiée (raccourcis clavier F12).Dans le mode Code, on peut voir que des dossiers ui sont générés sous le catalogue \ \ SRC \ \ \ \ \ \ \ \ \ \ \ \ \ \\\\\



###Animation de bouton sur une page de jeu

Parfois, pour améliorer l 'efficacité de l' interface, on peut ajouter un effet d 'animation à certains boutons ou éléments d' interface.Par exemple, lorsque vous avez terminé la page, Recommencez le bouton, puis cliquez pour sauter vers le haut.Voici l 'exemple suivant.

Dans l'éditeur de scène, sélectionnez pour recommencer le bouton.Puis cochez le mode d 'édition de l' animation dans l 'interface d' axe temporel, ce qui fait apparaître un bouton de commande de lecture et un axe temporel (fig. 7).

![试玩.png](img/6.png)< br / > (Figure 7)

Sélectionnez l 'emplacement de la huitième trame et déplacez le bouton vers le haut d' une dizaine de pixels, l 'axe temporel correspondant au nom de l' objet et aux deux trames principales.Cliquez sur un petit triangle à gauche du nom de l 'objet, et vous trouverez les propriétés y ci - dessous, avec deux trames clés correspondantes.C 'est parce que nous avons changé les propriétés de l' axe y de l 'objet, bien sûr, si vous changez d' autres attributs pour créer une animation, comme X, alpha, scalex, etc., vous apparaissez également sous le nom de l 'objet (fig. 8).

Cliquez sur le nom de l 'objet pour lire le bouton de commande, nous pouvons voir l' animation!Si l 'animation est trop rapide ou trop lente, la souris peut déplacer la trame clé vers la position appropriée.

![试玩.png](img/44.png)< br / > (Figure 8)

Afin d'obtenir un effet d'animation plus important, sélectionner la première trame sur l'axe Y, l'interface « propriétés de trame » à droite comporte une option de « ralentissement » (fig. 8) et sélectionner le type de ralentissement après sélection comme l'élasticout, alors que le bouton a un effet de retour rapide.Les élèves peuvent aussi choisir d 'autres mouvements lents pour essayer.

Enfin, nous modifions le nom de l 'animation Ani u restart pour faciliter l' appel du programme.

Note: l 'éditeur d' animation peut produire de nombreux effets d 'animation cool.Pour plus de détails sur le programme, voir « Technical Papers - layaair - Edit - Using idee Creation ».



###Personnage de jeu

Dans le gestionnaire de projets, le bouton droit crée et ouvre une animation de personnages gamerole.ani (Ctrl + n), et nous utilisons les ressources de personnages pour créer les ressources d 'animation nécessaires au jeu.

Le type d 'animation de personnages choisit par défaut graphicenimation (fig. 9), la taille de la page d' animation n 'est pas valide dans le jeu, donc en fonction des préférences, parce que le rôle de l' avion est noir et blanc, ajustez la couleur de référence non noire.

![试玩.png](img/5.png)< br / > (Figure 9)

Après avoir créé un fichier d 'animation, cliquez sur le dossier de ressources de personnages dans le gestionnaire de ressources, qui contient les ressources dont nous avons besoin pour créer l' animation, les ressources correspondant au type de rôle et à l 'état de l' animation.En fonction de la demande, notre rôle est divisé en quatre catégories: Hero, l 'ennemi enemy 1 - 3, l' outillage uf1 - 2 et les balles Bullets 1 - 2.L'animation vole, blesse, meurt.

Si la ressource s' appelle Hero \ \ \ \ \ \ \ \ \ \ \ \ \ \À cet égard, nous pouvons utiliser un tableau pour clarifier les choses.

Le personnage principal de l'ennemi 1 124 à travers l'ennemi 2 124 à travers l'ennemi 3.
124 - - - - - [124 - - - - 124 - - - - 124 - - - - 124 - - - 124 - - - - - 124
"124 aéro \ \" U fly1 - 2 \ \ 1241 \ \ 1241 \ \ 1242 \ \ 12443 \ \ fly1 - 2 \ \ 12441 \ \ 2 \\\ \ 12441 \\\\\\\\\
124 Suites blessées \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \\\ \\\
124 suites de la mort \ \ 124 \ \ Hero \ \ u down1 - 4 \ \ 1241 \ \ u down1 - 4 \ \ 1242 \ \ 2 \ \ u down1 - 4



Procédé et étape de création d 'animation de rôle

Cochez le « mode d 'édition d' animation » dans l 'interface de l' éditeur d 'animation, avec un bouton de commande de lecture et un axe temporel (fig. 10).

![试玩.png](img/6.png)< br / > (Figure 10)



Sélectionnez une ou plusieurs images animées dans le gestionnaire de ressources et les faites glisser sur l'axe temporel pour générer une animation (fig. 11).

Par exemple, la création d 'une animation de vol d' acteur principal et la sélection de deux images Hero u fly1 et Hero u fly2 traînées sur l 'axe temporel génèrent une animation de vol d' acteur principal, ouvrent le bouton cyclique et cliquez sur le lecteur pour voir les effets, par exemple si l 'animation est trop rapide ou trop lente pour ajuster le débit de trame ou l' intervalle entre les deux trames.

![试玩.png](img/7.png)< br / > (Figure 11)



Adaptation des ressources d'animation au point d'origine de l'animation dans l'éditeur de scène.Dans le cadre du projet, les collisions de rôles sont calculées en fonction du rayon central des personnages, de sorte que le Centre de l 'animation de personnages doit être ajusté au point d' origine, ce qui permet d 'écrire moins de codes (fig. 10).

Le débit de trame est la fréquence de lecture du fichier d 'animation lui - même, la fréquence de trame principale dans le programme de jeu n' est pas perturbée, toutes les images animées dans ce cas ne réglent pas l 'intervalle de temps de la trame et ne définissent que 12 trames.

Note: l 'état de lecture après chargement ne fonctionne que lorsque l' animation est placée directement dans l 'ui et que le Programme charge l' animation en mode play () pour la lecture (fig. 10).

![试玩.png](img/8.png)< br / > (Figure 10)



Modification du nom des effets.Le nom d 'effet mobile dans l' IDE est par défaut Ani \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \

Pour le transfert d 'animations, on utilise la méthode play () pour le transfert d' animations, par exemple, Hero \ \ \ \ \ \ \ \ \ \ \ \ \ \\\\\\L 'animation de la mort du personnage principal est diffusée en appelant hero.play (0, vrai, "Hero u die").

Dans ce cas, étant donné que les ressources sont limitées, nous avons stocké toutes les animations de personnages dans gamerole.ui, y compris les personnages principaux, les ennemis, les balles et les accessoires.Après avoir cliqué sur le bouton Ajouter, un nouvel axe temporel vide apparaît et la répétition des quatre étapes ci - dessus permet de produire tous les effets d 'animation personnalisés.L 'effet d' ajout apparaîtra dans la liste de déroulement de l 'effet d' entraînement, et sélectionnez l 'une des animations pour la réédition (fig. 11).

![试玩.png](img/9.png)< br / > (Figure 11)



Pour résumer ce qui précède, nous avons produit tout le matériel de visualisation du jeu dans ce cours, afin de jeter les bases d 'un développement séquentiel du jeu.Au cours de l 'élaboration du projet, l' interface ui est plus modifiée, ce qui permet également à des collègues des beaux - arts d 'apprendre les pages IDE et la production d' animations et d 'améliorer l' efficacité de leur travail.Après l 'achèvement des beaux - arts, les programmes peuvent être diffusés avec quelques modifications simples et le traitement logique ui.