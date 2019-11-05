#Fusion statique

###### *version :2.2.0beta   Update:2019-8-28*

Les conditions de base d'une fusion statique sont expliquées brièvement dans le texte: utilisation de modèles de matériaux identiques.

Les objets sont traités ensemble lors du chargement de la scène.

####Utilisation de fusions statiques

Sélectionnez les options statiques statiques dans l 'unité pour les modèles nécessitant une fusion statique.

[] (IMG / 1.png) <br > (Figure 1)

Après l 'Export, l' utilisation normale de la scène exportée (ou prédéterminée) permet d 'utiliser la fonction de fusion statique.

Nous allons commencer par une simple scène:

[] (IMG / 2.ping) <br > (Figure 2)

Pour ce scénario, on a utilisé la combinaison statique et les diagrammes d 'effets inutilisés (voir les comparaisons de données par l' intermédiaire du panneau STAT).

[] (IMG / 3.png) <br > (fig. 3) absence de fusion statique

[] (IMG / 4.png) <br > (Figure 4) recours à la fusion statique

Par comparaison, nous constatons une réduction du nombre de lots de renderbatches et une réduction du nombre de soumissions de shader.
