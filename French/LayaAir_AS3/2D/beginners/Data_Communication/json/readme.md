#Json Data detailed

###Qu'est - ce que json?

Json (JavaScript - object notation) désigne la représentation d 'objets Javascript, qui est un format d' échange de données léger.Il est basé sur un sous - ensemble ecmascript.Json utilise la grammaire Javascript pour décrire les objets de données, mais json reste indépendant de la langue et de la plate - forme.Les Analyseurs json et les bibliothèques json supportent de nombreuses langues de programmation différentes.À l 'heure actuelle, beaucoup de dynamiques (PHP, jsp,.Ent) se transforment en langues pour soutenir json.Il est facile à lire et à écrire, mais aussi à analyser et à générer par la machine (généralement pour améliorer le débit de transmission du réseau).



###Règles de grammaire json

La grammaire json est un sous - ensemble d 'objets JavaScript représentant le français.

##- données dans le nom / la valeurDonnées séparées par une virgule
##- entre parenthèsesEnregistrer une matrice entre crochets



###Nom / paire de valeurs json

Le format d 'écriture des données json est la paire de noms / valeurs.

La paire de noms / valeurs comprend un nom de champ (dans les guillemets double), suivi d 'un faux numéro, puis d' une valeur:

« nom »: programme layaair;

Ceci est aisément compréhensible et équivaut à cette instruction javascript:

Nom = "cours layaair";



###Valeurs de json

Les valeurs de json peuvent être les suivantes:

##- nombre (nombre entier ou flottant)Chaîne de caractères (dans les guillemets)
##- valeur logique (vraie ou false)Matrice (entre crochets)
##- objets (entre parenthèses)NULL



###V. objets json

Les objets json écrivent entre crochets:

L 'objet peut comprendre plusieurs paires de noms / valeurs:

("nom": "cours layaair", "URL": "http: / / layabox.com /")

C'est aussi facile à comprendre, ce qui équivaut à l'instruction javascript:

Nom = "cours layaair" URL = "http: / / layabox.com /"



###Documents json

##- le type de fichier du texte json est "json".Le type MIME du texte json est "Application / json".



###Avantages de json

##- la transmission entre les plates - formes est extrêmement simple sur la base du texte pur;JavaScript support original, la langue d 'arrière - plan est presque entièrement supportée;
##- formats de données légers, avec un nombre limité de caractères occupés, particulièrement adaptés à la transmission par Internet;Plus lisible que XML, mais facilement identifiable après une réduction successive raisonnable;
- facile à préparer et à interpréter, à condition de connaître la structure des données;

En parlant de ça, on pourrait penser à XML.La guerre de XML et de json est comme un débat, chacun a sa raison d 'être et, puisque c' est un débat, il faut en fin de compte garder sa position.Toutefois, sur le plan personnel, il est préférable d 'utiliser json, et json possède également d' importants avantages pour la transmission sur le réseau, et il reste à évaluer le soutien et la compatibilité des navigateurs pour XML à l 'ère H5, l' efficacité de l 'analyse est très variable, et json est suffisamment utilisé pour les concepteurs de jeux.



###Layaair and json

Le moteur layaair est quasiment inséparable de json, y compris le format de stockage d 'images, le chargement de ressources, la description des composants d' édition, l 'exportation de classe, le support de paquets de langues, etc.