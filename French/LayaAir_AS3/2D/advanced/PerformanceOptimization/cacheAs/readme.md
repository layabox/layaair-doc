#Optimisation de cache statique

Parmi les autres attributs communs du paramètre d 'attributs, nous avons présenté le concept d' optimisation de mémoire cache et le rôle fonctionnel.Il est également recommandé aux concepteurs d 'utiliser l' interface ui de façon aussi rationnelle que possible, et nous présenterons ci - après un exemple ui de l 'utilisation de casheas dans le projet, et nous analyserons les données avant et après l' utilisation de l 'interface ui à l' intention des concepteurs.

Nous passons d 'abord à la non - utilisation de la fonction de mise en mémoire cache du système, comme le montre la figure 1.En mode de réglage webgl, on peut voir que le nombre de points de rendu Sprite par trame dans l 'ui est de 23, le nombre de rendu drawcall est de 8 et le nombre de soumission du matériau Shader de 7.(* Ces données peuvent être utilisées pour des comparaisons optimisées de performances *.



 ![imgage](img/1.png)< br / >
(Figure 1)



##Optimisation de cache pour normal

Lorsque nous utilisons le système casheas, le système casheas est configuré en mode "normal", le nombre de noeuds Sprite est réduit de 23 à 8, et les performances de rendu du noeud sont presque triplées.Comme le montre la figure 2.

![图2](img/2.png)< br / > (Figure 2)

**Tips**- Oui.

Lorsque la valeur d 'attribut de casheas est "normal", une mémoire cache de toile est effectuée sous Canvas et une mémoire cache de commande en mode webgl.Les performances du mode sont optimisées de manière moyenne, ce qui permet de réduire le nombre de noeuds de rendu par trame sans réduire le nombre de drawcall et le nombre de shader.





##Optimisation de cache pour bitmap

Lorsque nous utilisons le système cacheas, nous définissons le système cacheas comme un modèle bitmap.Le nombre de noeuds de Sprite est de 8, celui de drawcall est tombé à 1 et celui de shader à 0.Juste une modification d 'une configuration, les performances sont plus de 10 fois supérieures à celles des casheas.Les résultats sont présentés à la figure 3.

![图3](img/3.png)< br / > (Figure 3)

**Tips**- Oui.

La mémoire cache de toile est toujours sous canvas, et l 'utilisation de la mémoire cache rendertarget en mode webgl équivaut à une mémoire cache qui est présentée au rendu de carte à bitmap statique.Il convient de noter ici que le mode de mise en mémoire cache reddertarget sous webgl a une limite de taille de 2 048 et que le dépassement de 2 048 entraînera des frais supplémentaires de mémoire.En outre, les frais de redémarrage sont plus élevés, mais diminuent le drawcall et la performance de rendu est la plus élevée.

Dans ce document, notre exemple ui est relativement simple, pour certains jeux de grande envergure, les ui dont le nombre de noeuds dépasse 50 ne sont pas rares, et les performances de rendu peuvent être multipliées par beaucoup après l 'introduction de la technologie de cache casheas.





##Comment choisir l 'optimisation de cache

###3.1 Prise en compte de la mémoire et de la CPU

####Mode bitmap et augmentation de mémoire

Dans l 'exemple précédent, on peut également constater une augmentation de la valeur de mémoire curmem après l' utilisation d 'un mode de mémoire cache bitmap, qui est passé de 17.22m à 18.27m, car une partie de la mémoire est consommée lorsque le bitmap tampon est utilisé, mais la mémoire supplémentaire ne sera pas trop importante tant que la largeur d' ui n 'est pas importante.

####Consommation de CPU à rafraîchissement fréquent

Ce qui importe le plus, c 'est de savoir si l' ui peut être rafraîchie fréquemment et, si c 'est très fréquent, les pertes de CPU sont importantes, car une fois que les sous - objets du bitmap tampon sont modifiés, le moteur repasse automatiquement le bitmap et le processus de bitmap tampon consomme le CPU.

Choisissez donc d 'utiliser le modèle normal ou bitmap du cacheas ou de ne pas utiliser le système cachea, et nous devons mettre l' accent sur l 'augmentation de la mémoire et de la consommation de CPU.



###3.2 fréquence des essais

L'outil de débogage debugpanel fourni par le moteur layaair permet de visualiser la zone de redémarrage du jeu et de l'ajouter au Code.`DebugPanel.init();`METHOD, after Compilation and Operation Items, The browser shows the window of Regulation, as illustrated in the Figure 4.

![图3](img/4.png) 
 (图4)


On choisit. "`显示当前cache重绘`"Ou"`显示所有重绘区域`".Si l 'ui refait le dessin, la zone de retouchage afficherait la Ligne verte, le coin supérieur gauche de la zone verte indiquerait le nombre de retouches et le temps de retouchage, et les outils statistiques de performance Sprite, drawcall, etc.

En l 'absence de la souris, si le cadre de ligne verte apparaît souvent**L 'ui est en train de repeindre fréquemment, alors il est préférable de ne pas utiliser le mode mémoire cache bitmap, le modèle normal peut être pris en compte selon qu' il convient.**".Bien entendu, l 'ui peut également être gérée de manière hiérarchique, fréquemment mise à jour en une seule couche (sans utilisation de cacheas) et en une seule couche (sans mise à jour fréquente), ce qui permet également d' améliorer les performances.


###3.3 facteurs de configuration du modèle bas de gamme

Lorsque nous faisons des projets de jeux, nous prenons souvent en compte la configuration des téléphones mobiles, la plupart du temps plus les modèles d 'adaptation des jeux sont préférables, les testeurs de jeux sont également équipés de téléphones cellulaires de bas de gamme et de lycée pour tester et fournir des conseils d' optimisation.Lors de l 'utilisation de casheas, il est également nécessaire de consulter la mémoire, la taille de CPU du téléphone mobile.

Pour certaines machines de bas de gamme, le CPU et la mémoire sont peu élevés et des problèmes peuvent se poser si l 'on utilise des cascades pour améliorer les performances de rendu.

Les développeurs doivent alors choisir entre la performance ou la largeur de la machine de jeu, ou bien l 'accès.Si l 'on sélectionne davantage de modèles bas de gamme adaptés, il faudra tester à plusieurs reprises si l' on utilise des casheas et si l 'on veut réduire au minimum les pertes de CPU et de mémoire par rapport aux modes normal et bitmap.



##Quelles sont les circonstances dans lesquelles il n'est pas possible d'utiliser les casheas?

###4.1 Les objets ne peuvent pas être utilisés lorsqu'ils sont très simples

Lorsque l 'objet est très simple, par exemple un mot ou une image, la configuration de casheas non seulement ne permet pas d' améliorer les performances, mais en fait, les performances sont perdues.

###4.2 Les éléments fréquemment modifiés ne sont pas utilisables

Il y a souvent des variations dans le contenu du conteneur, par exemple lorsqu 'il y a une animation ou un compte à rebours dans le conteneur, et si le récipient est de nouveau équipé d' un caseas, la performance est perdue.

On peut consulter la première valeur des statistiques Canvas dans le panneau de statistiques de performances, si elles sont constamment modifiées, ce qui signifie qu 'il n' est pas possible d 'utiliser les caseas dans ce cas.