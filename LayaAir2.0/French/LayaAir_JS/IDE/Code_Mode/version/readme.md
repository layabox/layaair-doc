##Gestion des versions

![publish](res/publish.png) 


En ce qui concerne la gestion des versions, la gestion a commencé par un nombre aléatoire de liens, mais dans des environnements tels que les micromessageries, le problème de la mémoire cache est grave et les nombres aléatoires ne permettent pas de résoudre efficacement le problème de la mémoire cache ou des phénomènes comme la confusion des pages due à la Mise à jour des versions.En conséquence, layaairide a ajouté à sa publication une solution fondamentale à la question de la mémoire cache, à savoir le changement direct de nom du fichier, le changement de nom du fichier et, naturellement, le problème de la mémoire cache.

###Mécanisme de gestion de versions

Un nom de fichier avec chaîne de caractères Hash est généré automatiquement lors de la publication lorsque l 'développeur a activé la gestion de version, et un fichier de mappage de nom de fichier de version.json est généré simultanément.Les fichiers contrôlés sont gérés par le code d 'Association automatique resourceversion de la classe de gestion de versions.Lorsque l 'utilisateur ouvre un fichier géré par la version, il met automatiquement à jour la chaîne de caractères Hash dans le nom de fichier lors de la publication, ce qui, dans un environnement de fonctionnement, équivaut à un appel à de nouveaux fichiers et ne pose pas de problème de cache.

Dans le processus de développement, le développeur n 'a pas besoin de se préoccuper du nom du fichier qui sera finalement généré par la gestion des versions.Même dans la mesure où layaairide 2.0, au moment de la création du projet, a automatiquement intégré la gestion de la version resourceversion dans le Code, les concepteurs n'ont pas à se préoccuper de l'utilisation de la catégorie resourceversion et doivent simplement sélectionner, dans l'interface d'affichage du projet, les options de gestion de la version Lorsqu'ils envisagent d'introduire la gestion de la version.

###Gestion des versions

Une fois l 'interface de diffusion du projet cochée si la gestion de version est activée, le nom du fichier est ajouté à la chaîne de caractères Hash au moment de la publication, comme indiqué dans la figure ci - dessous.Si le fichier est modifié, la nouvelle chaîne Hash sera modifiée pour le nom de fichier modifié.

![图3](res/3.png) 


Les effets indiqués dans la figure ci - dessus, à gauche du Répertoire Bin dans l 'environnement de développement et à droite du Répertoire de distribution après l' activation de la gestion de versions, nous pouvons voir que les fichiers JS sous le catalogue JS et les noms de fichiers d 'images PNG sous le catalogue res sont ajoutés à la chaîne de caractères Hash.