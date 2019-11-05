#Système physique

###Description générale des systèmes physiques 2D

Dans le développement du jeu, le système physique, même s' il n 'est pas toujours utilisé, est un élément important pour améliorer l' expérience des utilisateurs du jeu.Le système physique ox2d, après Encapsulation du box2d, permet à l 'développeur d' éviter les difficultés et les inconvénients d 'accès au système physique box2d.

Le système physique box2d intégré dans le moteur layaair doit d'abord comprendre les rigides.`rigidbody`Corps de collision`collider`Lorsque l 'objet contient un corps rigide, l' impact d 'un moteur physique peut se produire lorsque l' objet contient un objet collisif et peut être heurté sans avoir d 'effet cinétique physique lorsque l' objet contient un corps collisif qui ne contient pas de corps rigide.

Rigide`rigidbody`Le corps rigide est un objet dont la forme et la taille restent inchangées pendant et après le mouvement et la force, et dont la position relative des points internes demeure inchangée.

Corps de collision`collider`: l 'objet en collision est un cadre d' évaluation pour l 'objet qui se heurte lorsqu' il se chevauche.

Articulation`joint`: l 'articulation peut contenir deux ou plusieurs objets.

**Les articulations supportées par box2d sont**- Oui.

Articulation de distance`DistanceJoint`La distance entre les deux objets est constante.

Articulation d 'engrenage`GearJoint`: pour simuler la relation de contrainte entre les deux engrenages, lorsque les engrenages tournent, le débit produit est de deux manières de sortie: la vitesse angulaire de l 'engrenage lui - même et la vitesse linéaire de la surface de l' engrenage.

Articulation de moteur`MotorJoint`: pour limiter les deux corps rigides de manière à maintenir leur position et leur angle relatifs inchangés, l 'articulation du moteur se déplace toujours vers le point cible et maintient un angle spécifique.

Articulation de la souris`MouseJoint`: pour manipuler des objets par la souris.Il tente de glisser l 'objet vers la position du curseur actif de la souris.Il n'y a pas de limite à la rotation.

Joint transversal`PrismaticJoint`L 'articulation mobile permet aux deux objets de se déplacer relativement le long de l' axe spécifié, ce qui empêche la rotation relative.

Articulation de poulie`PulleyJoint`Il met les deux objets à la terre et les relie l 'un à l' autre.

Articulation rotative`RevoluteJiont`: obliger deux objets à partager un point d 'ancrage et deux objets à tourner par rapport à eux.

Articulation de câble`RopeJoint`: limite la distance maximale entre les deux points.L 'étirage entre les objets connectés est bloqué même sous une lourde charge.

Joint de soudage`WeldJoint`Pour empêcher le mouvement relatif des deux corps, la position et l 'angle relatifs des deux corps restent inchangés, comme un tout.

Articulation de roue`WheelJoint`: rotation autour du noeud comprenant des propriétés élastiques de sorte que le corps rigide se déplace de manière élastique à la position du noeud.

###Présentation du composant rigide

####2.1 corps rigides

Les rigidbody sont hérités de Component et supportent trois types de corps:`static`Oui.`dynamic`Et`kinematic`Par défaut`dynamic`".

`static`Pour le type statique, immobile, libre de la gravité, de qualité illimitée, peut être déplacé par le noeud, rotatif, zoom de contrôle;

Un objet statique ne peut pas se déplacer dans un environnement analogique, comme s' il avait une masse infinie.Dans le box2d, la qualité à l 'envers sera stockée à zéro.Les objets statiques ont une vitesse zéro.Les objets statiques ne peuvent pas entrer en collision avec d'autres objets statiques ou dynamiques.

`dynamic`Type dynamique, influencé par la gravité;

L 'objet dynamique peut être entièrement analogique.Ils peuvent être déplacés manuellement par l 'utilisateur, mais généralement en fonction de la force.Un objet dynamique peut entrer en collision avec n'importe quel objet.Les objets dynamiques ont toujours une masse limitée non nulle.Si vous essayez de définir la masse d 'un objet dynamique à zéro, il crée automatiquement un objet de 1 kg de masse.

`kinematic`Pour le type de mouvement qui n 'est pas affecté par la gravité, il peut être déplacé par application de la vitesse ou de la force.

Un objet cinématique se déplace dans un environnement analogique à sa propre vitesse.Les objets cinématiques ne sont pas eux - mêmes impuissants.Bien que l 'utilisateur puisse le déplacer manuellement, nous le réglons généralement pour le déplacer.Le comportement d 'un objet cinématographique semble avoir une masse illimitée et élevée, mais la qualité de l' objet cinématographique peut être réglée à zéro à l 'intérieur du box2d.Les objets cinématiques ne peuvent pas entrer en collision avec d'autres objets statiques ou cinématiques.

Le type de rigide est obligatoire et l 'ensemble rigide est illustré comme suit:

![图1](img/1.png)< br / >

####Description des propriétés

#####Type

Trois catégories sont mentionnées ci - dessus:`static`Oui.`dynamic`Et`kinematic`Par défaut`dynamic`".

#####Gravityscale

Coefficient of Gravity Scattering

#####Angular Velocity

Vitesse angulaire, les réglages conduisent à la rotation, l 'unité étant radiale et nécessitant des contraintes dans l' utilisation effective.

#####Angular dampin

The rotation velocity damping coefficient of 0 to Infinite, 0 is not damping, the infinite large is full damping, and ordinairement the Damping value should be between 0 to 0.1.

#####Linear Velocity

La vitesse de mouvement linéaire nécessite l 'entrée d' un vecteur, par exemple 10,10, représentant une vitesse axiale axiale x 10, et une vitesse axiale y 10.

#####Lineardamping

Coefficient of Linear Velocity damping, a large range from 0 to Infinite, 0 is not damping, an infinite large is full damping, and Ordinary Damping value should be between 0 to 0.1.

#####Bullet

L 'objet qui se déplace à grande vitesse est configuré pour empêcher la pénétration à grande vitesse.

#####Allowsleep

Si le sommeil est autorisé, si le sommeil permet d 'améliorer les performances, il est généralement configuré comme vrai.

#####Allowrotation

Est - ce que la rotation est permise, sinon la rotation du corps rigide est réglée en false?

#####Groupe

Spécifie le Groupe de collisions auquel appartient le sujet, par défaut 0.

Les règles d'impact sont les suivantes:

Si les deux objets sont égaux et

La valeur du Groupe est supérieure à zéro et ils se heurteront toujours.

Le Groupe a une valeur inférieure à zéro. Ils ne se heurteront jamais.

Si la valeur du Groupe est égale à 0, la règle 3 est appliquée.

Si les valeurs du Groupe ne sont pas équivalentes, la règle 3 s'applique

Chaque rigide comprend une catégorie Category qui reçoit des champs de bits d 'une puissance de 2 dans la plage [1,2 ^ 31] 2

Chaque rigide possède également une catégorie Mask, spécifiant la somme des valeurs de catégorie avec lesquelles il se heurte

#####Category

Les catégories de collisions, définies à l'aide de la Sous - valeur de puissance de 2, sont disponibles dans 32 catégories différentes.

#####Mask

Spécifie la catégorie de collision du masque de bits de conflit et les résultats de l 'opération bits de category.

#####Label.

étiquette personnalisée

####2.2 corps de collision

L 'objet de collision est un cadre de détection de collision physique, il se déplace toujours avec le corps rigide de l' objet et ne produit pas de déviation.

Il y a quatre sortes d'impacts:

Rectangle collision body, Circular collision body, Linear collision body, polygonal collision body.Par exemple, chaque corps de collision est un groupe d 'auto - collision.

![图](img/collider.png)

#####Propriété de matrice

#####X, y

Décalage d 'axe y par rapport au noeud X.

#####Afrique

Force de frottement, plage de valeurs 0 - 1, plus la valeur est grande, plus la frottement est grande, la valeur par défaut est 0,2.

#####Restitution

Coefficient d 'élasticité, plage de valeurs 0 - 1, plus la valeur est grande, plus l' élasticité est grande, la valeur par défaut est 0.

#####Density

La densité peut être nulle ou positive et il est recommandé d 'utiliser une densité similaire pour améliorer la stabilité de l' empilement, la valeur par défaut étant de 10.

#####Issensor

S' il s' agit d 'un capteur, celui - ci peut déclencher l' événement de collision sans provoquer de réaction de collision.C 'est trigger.

#####Label.

étiquette personnalisée

####Corps de collision rectangulaire

![图1](img/boxcollider.png)

#####Description des propriétés

#####Avec

La largeur et la hauteur du rectangle.

#####Bouton fitsize

Cliquez sur ce bouton pour adapter la taille du corps à la hauteur du noeud.

####Corps de collision circulaire

![图1](img/circle.png)

#####Description des propriétés

#####Radius.

Le rayon du cercle doit être positif.

####Corps de collision linéaire

![图1](img/chain.png)

#####Description des propriétés

#####Points

Un ensemble de points séparés par une virgule, au format: X, y, X, y... Une fois que le point de réglage a été fixé, la ligne reliée successivement du premier point au dernier est un objet de collision linéaire.Dans l 'éditeur, cliquez sur le bouton gauche pour ajouter un point qui peut être glissé, et le double clic supprime ce point.

####Corps de collision polygonal

![图1](img/poly.png)



#####Description des propriétés

#####Points

Ensemble de points séparés par une virgule

Le corps de collision de polygone 2D ne prend pas en charge le polygone concave pour le moment et, dans le cas d 'un polygone concave, divise manuellement en plusieurs polygones Convexes

Le nombre maximum de noeuds est de B2 u maxpolygonverties, cette valeur étant par défaut de 8, de sorte que le nombre de points ne doit pas dépasser 8.



###Démonstration physique

####Présentation de système physique

Créer un nouvel exemple 2D et créer une scène en mode Édition, puis une série d 'opérations qui aboutiront à une description détaillée de la manière dont ces effets sont produits si les résultats sont les suivants.

![图1](img/scene.gif)

