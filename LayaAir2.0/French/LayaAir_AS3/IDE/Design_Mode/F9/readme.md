# F9！项目设置介绍


> 本篇采用LayaAirIDE 2.0.1 bate 截图，如有不同，请下载最新的LayaAirIDE，以最新版本IDE为准。

##Description générale

Le raccourci F9, qui est la fonction la plus courante et la plus indispensable de layaide, est bien connu des promoteurs de Laya, qui connaissent déjà l 'importance du F9 depuis 1.0 et qui, dans le moteur 2.0, ne peuvent pas utiliser le F9.Cependant, de nombreux développeurs qui viennent d 'entrer en contact avec Laya ne connaissent pas la fonction F9, et ce texte vous est présenté.Les mains mûres peuvent ignorer cet article





###Paramètres de prévisualisation

La première page du paramètre de projet est un paramètre de prévisualisation qui définit principalement la scène de démarrage (la première scène de démarrage du programme, la sélection de la scène actuelle est la dernière scène de focalisation de l 'éditeur) et d' autres paramètres qui affectent la génération automatique de gameconfig de l 'IDE, et qui Modifie manuellement la catégorie invalide uniquement dans l' IDE.

[IMG / 1.ping]



Gameconfig figure ci - après:

[IMG / 7.ping]

Dans la catégorie main, l 'développeur peut également ne pas utiliser les paramètres de démarrage par défaut en fonction de ses propres besoins.[IMG / 8.ping]



###Paramètres de bibliothèque

Afin de réduire la taille du paquet de code, l 'développeur peut simplement introduire la bibliothèque dans laquelle il est utilisé et ne plus utiliser la taille du paquet de code sans fonction utile,

Les configurations de bibliothèque sont très courantes et, en cochant la Bibliothèque webgl, le moteur est initialisé en mode webgl et inversement en mode Canvas.

D'autres bibliothèques peuvent être choisies en fonction des besoins réels.Si vous n 'avez pas coché la case, utilisez la fonction de bibliothèque.



[IMG / 2.ping]



###Configuration du scénario

Ici, il n 'y a généralement pas besoin de bouger, c' est - à - dire de mode de distribution, afin de réduire la taille du paquet de code pour les petits jeux, l 'IDE est un mode de fichier unique par défaut;

Les différences entre les quatre modèles sont les suivantes:


 **Mode intégré**Le mode intégré génère un fichier de code de classe de scène dans lequel le contenu ui de l 'éditeur contient des informations sur la scène ui créée par l' IDE, sans tenir compte de la taille de JS, du développement normal des options les plus courantes H5 et de la vitesse d 'ouverture la plus rapide sans que Cela implique le chargement asynchrone des pages.

**Mode de chargement**Le mode de chargement génère également une catégorie de scènes, les autres données ui sont placées dans un ui.json et doivent être utilisées avec ce json.L 'utilisation peut être chargée en tant que ressource.

**Mode de séparation**Le mode de séparation génère également une catégorie de scènes sur la base d 'un mode de chargement, mais il crée un fichier de données de scènes séparé pour chaque scène, à la différence du mode de chargement qui charge toutes les scènes une fois.Après 2.0, la mise au point de petits jeux ou de jeux légers est un mode courant pour réduire la taille du paquet principal et pour augmenter la vitesse de chargement.

**Mode fichier**Le mode fichier est unique en 2.0, il n 'est pas créé de catégorie de scène pour développer un petit jeu, c' est - à - dire pour réduire encore la taille du paquet JS, il est utilisé avec le chargement de scene.load.Dans les trois premières catégories de scènes, les variables sont déclarées, et le Code indique que les variables internes peuvent être manipulées directement.



#####Il convient de noter que, lors du choix du développement de la langue JS, le mode de séparation et le mode de fichier ne sont pas différents et qu 'il n' y a pas de catégorie de scènes.



[IMG / 3.ping]



###Configuration de l 'Atlas

Les paramètres d 'Atlas peuvent définir les règles de l' Atlas auto - emballé, de préférence sans modification du Répertoire.

[IMG / 4.ping]



###V. Édition

Rutu, ce n 'est pas trop.

[IMG / 5.ping]