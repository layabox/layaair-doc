#Run Run Time Code Implementation Basic Principles

​

Le moteur layaair appuie le développement en trois langues: AS3, Typescript et Javascript, mais quelle que soit la langue de développement utilisée, le code JavaScript est finalement appliqué.Toutes les images vues sont dessinées par l 'intermédiaire d' un moteur et la fréquence de mise à jour dépend du FPS spécifié par l 'développeur, par exemple une fréquence de trame spécifiée de 60fps, et la durée d' exécution de chaque trame est d 'une durée de 60 minutes au cours de l' exécution, de sorte que plus la trame est grande, plus la sensation visuelle est fluide et 60 trames sont pleines.

Étant donné que l 'environnement de fonctionnement réel se trouve dans le navigateur et que les performances dépendent également de l' efficacité de l 'interpréteur Javascript, la vitesse de trame FPS spécifiée ne peut pas être atteinte dans le décodeur à faible performance, ce qui n' est pas une décision de l 'développeur, qui peut faire augmenter la vitesse de trame FPS, dans la mesure du possible, par optimisation, dans le dispositif bas de gamme ou dans le navigateur à faible performance.

Le moteur layaair repère chaque trame et, lorsqu 'il optimise ses performances, il est tenu compte non seulement de la consommation de CPU résultant de l' exécution du Code logique pour chaque trame, mais aussi du nombre d 'instructions de dessin d' appel de trame et du nombre de soumission de texture de GPU.


 

 