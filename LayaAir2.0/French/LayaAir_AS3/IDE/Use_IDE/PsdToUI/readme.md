#Psdtuoi et son utilisation

> Author: Laya 'Update: 2019.03.27

*Note: ce programme est basé sur la version officielle de layaairide 2.0.0, en cas de divergence, utilisez la version la plus récente de layaairide.*

Le psd2ui de l 'outil intégré de Laya peut convertir un outil de fichier PSD produit par le PS conformément à une règle donnée en ui utilisable par Laya.

![1](img/2.png)

Lorsque vous ouvrez l 'outil, vous verrez qu' une interface telle que le diagramme ci - dessous fait glisser le dossier contenant le PSD et que vous pouvez le convertir en cliquant sur la détermination.

![1](img/3.png)

Comme on l'a vu plus haut, la production de PSD doit être régie par certaines règles avant d'être convertie en UI pour Laya. Les règles sont les suivantes:

1, les types non identifiables sont tous des images, ce qui correspond à l 'éditeur de l' IDE;

2, à l 'exception de Box et de label, tous sont conformes aux règles de désignation ui de l' IDE, préfixe ou suffixe;

Pour créer un sous - dossier normal, over, down

Le préfixe Container sera identifié comme Box et label utilisera non seulement le contrôle de texte, mais aussi le préfixe en minuscule txt ou le préfixe en majuscule txt.



![1](img/1.png)   


Vous verrez deux dossiers après la conversion.

![1](img/4.png)

Nous devons mettre le contenu du dossier Assets dans le dossier Assets du projet, le contenu du dossier pages dans le dossier pages du projet, ou coller directement les deux dossiers dans le dossier Laya pour choisir de fusionner les deux dossiers.

Puis ouvre le mode d 'édition du projet pour voir si ui est produit, avec les résultats suivants:

![1](img/5.png)

Pour de plus amples questions, prière de visiter ask.layabox.com.