# 其它优化策略

###Réduction de la quantité de particules utilisées

Etant donné que les particules appartiennent à un dessin vectoriel, la pression exercée par les particules sur la CPU est élevée à grande échelle et, dans le mode Canvas de la plate - forme mobile, les particules ne sont pas utilisées dans la mesure du possible;

L 'opération GPU peut être utilisée en mode webgl, ce qui permet de réduire la pression d' UC, mais aussi de réduire au minimum l 'utilisation.



###Le mode Canvas réduit au minimum la rotation, l 'échelle, l' utilisation d 'alpha et d' autres attributs

Dans le mode canvas, l 'utilisation d' attributs tels que rotation, zoom, alpha, etc., est réduite au minimum, et ces attributs consomment les performances.

Dans l 'affirmative, il est recommandé d' utiliser le modèle webgl;



###Ne crée pas d 'objets et de calculs complexes dans le cycle de Timer

À cause de Timer.`loop()`Et`frameLoop()`Le procédé est exécuté en boucle continue, ce qui entraîne une consommation importante de performances dans le cycle lors de la création d 'objets et de calculs complexes, de sorte que, dans la mesure du possible, les objets et les calculs complexes ne soient pas créés dans le cycle.



###Utiliser le moins possible autosize et getbounds

`autoSize()`Et`getBounds()`Il faut beaucoup de calculs, beaucoup d'effets sur les performances et le moins possible.



###L 'exécution de la fonction try catch peut être très lente.

Réduction au minimum des projets`try catch`Utiliser`try catch`L 'exécution de la fonction devient très lente.


 