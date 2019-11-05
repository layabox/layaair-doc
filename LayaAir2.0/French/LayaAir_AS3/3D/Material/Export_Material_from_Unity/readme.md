# 从Unity中导出材质

###### *version :2.1.0beta   Update:2019-5-14*

Le matériau est exporté en même temps que la scène d 'exportation et le matériau prévu.

Comme la figure 1, c'est une scène que nous exportons:

[] (IMG / 1.png) <br > (Figure 1)

***Lmat.**Le fichier est le document de fond: le fichier json contient des informations de base telles que l 'éclairage, l' affichage, le mode de rendu.

####Section sur le support d 'exportation de matériaux

Supporte tous les Shader de la liste layaair3d.

Si l'on utilisait le Shader non layaair3d, on le transformerait de force en Shader par défaut de layaair3d, ce qui pourrait donner lieu à des erreurs imprévues.

[] (IMG / 2.jpg) <br > (Figure 2)