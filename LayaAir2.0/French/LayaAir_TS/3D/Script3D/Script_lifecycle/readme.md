#Cycle de vie du script

###### *version :2.1.0beta   Update:2019-6-26*

L 'ensemble script a un cycle de vie complet, les scripts doivent être accrochés à n' importe quel objet de jeu, et le même objet peut être accroché à un script différent, chacun exécutant son cycle de vie, les uns avec les autres sans interférence.Toutes les méthodes du cycle de vie du script ont été mises au point par le système layaair3d lui - même, sans qu 'il soit nécessaire de les utiliser manuellement.

Dans le diagramme ci - dessous, la fonction rouge du cycle de vie peut être prise en charge par l 'développeur lui - même.

[] (IMG / 1.png) <br >

Figure 1 fonctions du cycle de vie