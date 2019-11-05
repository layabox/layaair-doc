# Stat统计面板的介绍

###### *version :2.2.0beta4   Update:2019-9-2*

Afin de faciliter l 'optimisation des performances de l' développeur, layaair3d fournit un tableau statistique des performances, le tableau statistique Stat, qui permet à l 'développeur de consulter les paramètres de performance pertinents en temps réel.

​![图](img/1.png)(Figure 1)

Les paramètres de performance des statistiques participatives sont les suivants (tous les paramètres sont mis à jour environ une seconde par seconde) et plus les performances sont faibles à l'exclusion des FPS:

​**FPS (webgl) / fps (3d):**Les fréquences de trame en mode laya2d ou en mode laya3d, c 'est - à - dire le nombre de trames affichées par seconde, sont plus élevées, plus stables et plus fluides;

​**Sprite:**Statistiques du nombre de tous les noeuds de rendu, y compris les conteneurs, leur taille peut influer sur l 'efficacité du moteur dans l' exécution de l 'historique des noeuds, l' Organisation des données et la rendu.

​**Renderbatches:**Rendu

​**Savedrenderbatches:**Les lots de rendu combinés;

​**Cpumemory:**Mémoire CPU;

​**Gpumemory:**Une mémoire GPU;

​**Shader:**Nombre de soumissions présentées par Shader;

​**Trifaces:**Triangle

​**Frustumculing:**Les caméras de visualisation du cône de coupe;

​**Octreenodeculing:**Viii) Nombre de coupures de noeuds d 'arbres;

###Comment ouvrir le panneau statistique STAT

Un.**Mode d 'édition - F9 - Paramètres de prévisualisation - Cochez le tableau statistique des taux de trame**	

Entrée directe sur le console après le démarrage du projet**Laya. Stat.show ()**

##### 	