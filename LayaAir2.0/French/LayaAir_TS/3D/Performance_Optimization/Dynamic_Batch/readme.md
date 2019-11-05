#Fusion dynamique

###### *version :2.2.0beta   Update:2019-8-28*

Fusion dynamique**Fusion d 'exemples**Et**Point de fusion**Deux.Aucun de ces deux types d 'optimisation n' a besoin d 'être réglé par l' développeur, et l 'objet peut se déplacer dynamiquement sans restriction.Toutefois, le principe de la fusion est relativement strict.On trouvera ci - après les conditions minimales de cette fusion.

**Fusion d'exemples:**

Il faut satisfaire à la fois au Mesh et au même matériau.Il est possible que les modèles du même matériau que le Mesh soient nombreux dans des scènes tridimensionnelles, lorsque les exemples sont combinés, il y a une grande marge de manoeuvre.

**Fusionner:**

Le même matériau est nécessaire et le Sommet du modèle est inférieur à 10.La fusion des points culminants est actuellement possible sur un certain nombre de modèles d'ombre et d'effets spéciaux.

**Attention:**Les objets translucides doivent être rendus en continu pour être fusionnés dynamiquement, de sorte que leur probabilité de fusion dynamique est faible.