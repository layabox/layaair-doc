#Système physique

###### *version :2.1.1   Update:2019-7-19*

Le moteur physique calcule les réactions de mouvement, de rotation et de collision en conférant des propriétés physiques réelles à l 'objet rigide.Les développeurs utilisent des moteurs physiques très efficaces et simulent de façon réaliste.**Collision**Oui.**Gravité**Les effets physiques.

Conditions nécessaires à la collision d'un objet physique mondial layaair3d:

1) Les deux objets sont rigides.

2) l 'un des deux objets portait un rigidbody et l' autre un physicscolider.

**Rigidbody3d**Un corps rigide qui permet à l 'objet de se déplacer sous contrôle physique est un collisionneur dynamique.

**Physicscollider**Ils peuvent interagir avec des corps rigides, mais, comme ils n 'ont pas de corps rigides, ils ne peuvent pas se déplacer en réponse à une collision, ils sont souvent utilisés dans la fabrication de surface, de scènes, etc., et sont des collimateurs statiques.

Dans le même temps, dans le système physique layaair3d, il est possible de détecter la collision de deux façons: un collisionneur et un déclencheur.

Le système physique layaair3d est décrit en détail dans le présent chapitre.

