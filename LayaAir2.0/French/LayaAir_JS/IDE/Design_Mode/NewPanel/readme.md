#Page ui, particules, animation, nouveau panneau de script

Dans le gestionnaire de projets, le bouton droit peut créer de nouvelles pages ui, particules, animations, scripts, comme le montre la figure 1.

​![blob.png](img/1.png)< br / >
(Figure 1)



###Nouvelle page UI

**Dans le nouveau panneau,`页面`Les interfaces ui View et dialog peuvent être créées dans la barre.Figure 2**- Oui.



​        ![blob.png](img/2.png)< br / >
(Figure 2)

**Description des paramètres**

**Type de page**- Oui.

Par défaut est view, ce type de page n 'a pas de fonction de fermeture, habituellement utilisé pour l' arrière - plan du jeu et les pages hiérarchiques qui restent ouvertes.Un autre type d 'option, dialog, hérité de view, permet d' exécuter les fonctions d 'éjection, de traction, de fermeture de fenêtres, etc., de la zone de session, souvent utilisées dans l' interface d 'éjection du jeu, en plus de toutes les fonctions de view.

**Nom de page**- Oui.

Le nouveau nom de fichier de page doit être rempli.

**Affichage de référence**- Oui.

La visualisation de référence permet d 'assembler des images de référence compatibles avec la conception originale en chargeant un prototype de dessin artistique dans l' arrière - plan de l 'interface de conception.Cette option permet de ne pas exporter l 'image d' arrière - plan d 'une vue de référence dans un article, mais uniquement pour des références produites par ui.

**Largeur de page**- Oui.

La largeur de la page n 'est pas calculée après réglage de la largeur, et après cochez "uniquement comme largeur de référence", il est nécessaire de calculer la largeur en temps réel, ce qui crée une pression supplémentaire sur les performances et ne recommande pas de cocher.

**Hauteur de page**- Oui.

La hauteur de la page ne peut pas être calculée après réglage de la hauteur, la sélection de la "largeur de référence uniquement" nécessite un calcul de la hauteur en temps réel, ce qui crée une pression supplémentaire sur les performances et ne recommande pas de cocher.

**Références**- Oui.

Le contexte de référence est similaire à celui de la vue de référence et ne prend pas effet dans le projet si la référence de comparaison est utilisée uniquement pour l 'ui.Est une option.





### **Nouvelles particules**


　　 在新建粒子里，可以创建重力模式与半径模式的2D例子动画，也可以创建3D粒子动画。如下图所示：

​![blob.png](img/3.png)< br / >
(Figure 3)

**Description des paramètres**

**Type de particule**- Oui.

Le type de particules est un mode gravitationnel, un mode rayon, un mode 3D de particules, par défaut un mode gravitationnel.

Les particules en mode gravitationnel sont des particules émissives d 'un angle dans une autre direction.

Le mode rayon est l 'effet des particules rotatives autour du point central.Le mode rayon n 'est pas fondamentalement différent du mode gravitationnel, le mode gravitationnel permet d' obtenir l 'effet du mode rayon en ajustant le paramètre, et le mode rayon peut également être ajusté en fonction de l' effet du mode gravitationnel, la différence étant uniquement due à la configuration différente du paramètre initial.

Le mode 3D des particules est basé sur les effets des particules en 3D.

**Nom des particules**- Oui.

Le nouveau nom de fichier de particules doit être rempli.





### **New Animation**

Dans une nouvelle animation, vous pouvez créer une animation de trame.

​![blob.png](img/4.png)< br / >
(Figure 4)

**Description des paramètres**

**Type d 'animation**- Oui.

Les types d'animation sont les suivants: graphicenimation et efficacité.

Graphicianimation est une option par défaut qui permet de créer une animation à axe temporel comprenant une pluralité d 'effets d' animation.

L 'effet d' animation n 'est pas affiché de manière indépendante.

**Nom de l 'animation**- Oui.

Le nom du nouveau fichier d 'animation de trame doit être rempli.

**Largeur d 'animation**- Oui.

Les paramètres de largeur d 'animation ne sont utilisés que comme largeur d' arrière - plan au moment de la conception et ne sont pas valides dans l 'exécution du jeu.

**Hauteur d 'animation**- Oui.

Le réglage de la hauteur d 'animation n' est utilisé qu 'en tant que hauteur d' arrière - plan au moment de la conception et n 'est pas valide dans l' exécution du jeu.

**Références**- Oui.

L 'arrière - plan de référence n' est également utilisé que pour la comparaison des couleurs d 'arrière - plan de la production d' animation et ne prend pas effet dans le projet.Est une option.
