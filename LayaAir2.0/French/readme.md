#Guide de démarrage rapide du moteur layaair



Le plus grand problème pour beaucoup de nouveaux développeurs, c 'est d' apprendre à penser.Face à une nouvelle technologie, c 'est la pire des maux de tête si on ne sait pas comment le faire.This paper provides some Self - Learning Thoughts, lead the Starter to learn, Self - Learning developed can Jump this article, direct access to the Example of the official Engine and API.



 



##Première étape: choisir la langue de développement

Étant donné que le moteur layaair soutient le développement en trois langues: ActionScript 3 (AS3), Typescript (ts), javascript (JS), quelle langue est la meilleure?Les nouveaux venus qui viennent de toucher le moteur sont souvent perplexes.En fait, les développeurs sont plus familiers de la langue dans laquelle le développement de la langue, le moteur API et les performances sont identiques.

Il convient de noter que la langue JS, bien qu'elle soit plus facile à utiliser, n'est pas plus difficile à mettre au point et à adapter qu'à gérer des projets de grande envergure en collaboration avec de nombreuses personnes que les langues ts et AS3, qui peuvent être détectées dans l'IDE.Lorsque les codes sont de plus en plus nombreux, il n 'y a pas d' indication dans le code si j 'ai mal écrit, le problème n' est détecté qu 'au moment de l' exécution, souvent les développeurs dépensent beaucoup de temps pour vérifier une erreur mineure.Le développement de la langue JS est donc soutenu, mais il n'est pas recommandé d'en faire un projet de taille moyenne ou importante.

Pour ce qui est de la langue AS3, si vous connaissez bien la langue AS3 et n 'utilisez pas certaines des nouvelles caractéristiques de l' es6, vous pouvez continuer à l 'utiliser.Les développeurs d 'AS3 devraient savoir qu' ils ne savent pas et n 'ont pas besoin d' en savoir plus, ils peuvent utiliser le ts.Enfin, l 'avantage de l' AS3, c 'est que le moteur layaair est aussi le développement de la langue AS3, que les réservoirs de moteurs ts et JS sont compilés dans la langue AS3 et que, d' après la structure du moteur, AS3 est le meilleur quand il s' agit de l 'ordonnancement des moteurs.Le principal inconvénient est qu 'il n' est pas possible d 'appuyer les nouvelles caractéristiques de JS.Nous ne recommandons donc pas cette langue comme langue préférée.

Si vous n 'êtes pas programmeur AS3, nous recommandons d' utiliser la langue ts comme langue de développement préférée.Il y a deux raisons principales: d'une part, le fait que le ts appuie les nouvelles caractéristiques du JS, y compris l'es6, et, d'autre part, le fait que le ts puisse être mis au point à l'amiable à layaairide et qu'il soit possible de vérifier la grammaire et le type en temps réel.Et l 'AS3 est beaucoup moins amical à layaairide que le FB et le FDD.

Enfin, les moteurs API sont les mêmes, les différences linguistiques ne sont pas si importantes, le noyau du moteur API et l 'expérience de recherche et de développement.N 'ayez pas peur du choix de la langue, car il suffit d' apprendre les règles de base de la langue, l 'apprentissage de la langue est en fait rapide.Ainsi, les développeurs peuvent choisir n 'importe quelle langue de développement appuyée par le moteur layaair en fonction des besoins du projet.



 



##Deuxième étape: préparation de l'environnement d'exploitation

S' il s' agit d 'un développeur ts et JS, il suffit de télécharger layaair IDE, car layaair IDE intègre l' environnement de développement de jeux visuels tels que l 'élaboration de codes, l' édition ui, l 'édition d' animation, l 'édition de particules, etc.Dans le cas d'un concepteur de l'AS3, il est recommandé d'utiliser un flashdevelop plus mature ou un Flash Builder pour l'élaboration des codes.Les deux outils sont les éditeurs de code AS3 habituels, Flash Builder est plus puissant pour corriger les erreurs de grammaire et pour appuyer le système Mac Apple, mais ils sont très gros et font partie du logiciel facturé.Flashdevelop est relativement léger et ne compte que quelques dizaines de mégaoctets de logiciels gratuits, mais le logiciel Crossover doit être utilisé dans le système Apple.

Étant donné que le développement dans les langues ts ou AS3 exige la configuration de l'environnement de compilateur et la traduction du Code de projet en Code JS au moment de la publication du produit, les développeurs des deux langues ont besoin de travaux préparatoires supplémentaires.



##Étape 3: Écrire le premier programme du moteur layaair "Hello - layabox";

L'écriture "Hello World" est devenue une pratique internationale.Layaair ne fait pas exception.Quand on voit le programme "Hello layabox" du premier moteur layaair, cela non seulement donne un sentiment de succès initial, mais aussi indique que votre environnement de développement ne pose aucun problème.



##Étape 4: tous les exemples de layaair

Après avoir terminé le texte de Hello layabox, nous avons besoin de connaître d 'autres API, mais nous ne conseillons pas aux nouveaux venus de les voir directement.Pourquoi?Le nouveau développeur ressent beaucoup de contenu et d 'aridité uniquement en regardant le document API pour l' utilisation de la méthode de rattrapage.Par conséquent, il est recommandé ici de vous rendre au centre de développement de l 'Internet pour étudier et étudier tous les exemples en ligne du moteur layaair.Lors de l 'expérience de l' exemple de moteur, une connaissance approfondie de l 'API apparaissant dans l' exemple est ensuite réalisée et le document API est ouvert pour apprendre.Même si le temps imparti à l 'concepteur est limité pour l' instant, il n 'est pas possible d' étudier complètement l 'API de chaque exemple, alors il faut d' abord voir l 'exemple, au moins pour savoir quelles sont les caractéristiques des moteurs qui peuvent être remplies.Parce que l 'exemple en ligne du moteur fourni par le réseau officiel comprend un moteur de développement de jeuxAinsi, une fois que tous les exemples auront été expérimentés, il y aura une connaissance élémentaire de l 'API du moteur layaair, et cela sera possible en développant le jeu.

En outre, la version JavaScript fournit des fonctions d 'édition et d' exécution en ligne dans la zone de code de l 'exemple de moteur.Vous pouvez apprendre et expérimenter directement dans un navigateur, ou dans d 'autres langues de développement, ou pour expérimenter l' exemple de moteur dans un environnement de développement local, ou aller à github pour télécharger le code source de l 'exemple,



 



##Étape 5: apprendre la chaîne d'outils du moteur layaair

Après avoir expérimenté et étudié l 'exemple de moteur et l' API, il est déjà possible d 'utiliser des outils de code pour développer directement la fonction du jeu.Mais pour des jeux complexes, le travail doit d 'abord utiliser son appareil, apprendre à maîtriser certains outils de développement visuel, est le moyen d' améliorer considérablement l 'efficacité du développement.Layaairide, en tant qu 'environnement de développement intégré visuel, comprend, outre l' élaboration de codes, des fonctions telles que l 'édition ui, l' édition animée, l 'édition de particules, l' édition de scènes, etc.

Deuxièmement, l'appui de tiers au moteur layaair a été répertorié sur le réseau layabox, qui a mis en place une chaîne d'outils puissante avec layaairide, permettant aux concepteurs d'utiliser le moteur layaair sans avoir à s'inquiéter de la chaîne des outils et de mettre au point divers types de jeux efficaces.Il s' agit de l 'éditeur Spine pour l' animation osseuse, de l 'éditeur de cartes tiledmap et de l' éditeur 3D unity3d.



##Étape 6: examen du projet d 'apprentissage

La mise au point du projet n'est pas un élément difficile en soi, mais certains des promoteurs qui viennent de prendre contact avec H5 soulèvent souvent des questions au sujet de la mise au point du projet, et une description des modalités de la mise au point et de la diffusion sera présentée dans le document technique layaair, étape 2D.



##Étape 7: apprendre et se familiariser avec les principes d 'optimisation des performances

À l 'heure actuelle, les performances matérielles du dispositif mobile sont nettement inférieures à celles du matériel PC, en particulier les machines de faible et moyenne extrémité n' ont pas une faible part du marché.L 'optimisation des performances du moteur sera donc un choix important.Est - ce qu 'il a choisi un moteur très performant pour que le projet n' ait pas de problème de performance?Ce n 'est pas vrai.Parce que l 'optimisation du moteur n' est qu 'un plafond de performance du projet.

Si le moteur ne fonctionne pas, comment optimiser le projet, ne peut pas franchir ce plafond, le projet est terminé.On ne peut courir que sur des modèles très performants, à ce moment - là, changer de moteur ou changer de moteur, les coûts et les coûts sont très élevés.Toutefois, les performances du moteur peuvent clairement atteindre le niveau de fluidité de l 'app si aucune optimisation ou erreur d' utilisation du moteur n 'est effectuée lors de l' élaboration du projet.C 'est encore possible.Ainsi, après avoir appris la base du moteur, il est important de lire attentivement l 'article sur l' optimisation des performances, de se familiariser avec la méthode d 'optimisation des performances, dans l' élaboration du projet de l 'application.



 



##Étape 8: validation des résultats de l 'apprentissage par des jeux ou des projets

Après avoir étudié les documents de la totalité du Département comme indiqué ci - dessus, pour les développeurs ayant une expérience de la recherche et du développement de projets de jeux, il est possible de valider les résultats de l 'apprentissage par la pratique du projet.Pour les développeurs qui n 'ont pas encore commencé à jouer ou qui n' ont pas d 'expérience dans la recherche et le développement du jeu, il est recommandé de tester les résultats de l' apprentissage à l 'aide de l' expérience pratique de petits jeux.

The Teaching of tengxin Classroom has a video Teaching of Small Game Development.

Cours de tengxing:[https://layabox.ke.qq.com/](https://layabox.ke.qq.com/)



##Étape 9: comment obtenir des réponses et des conseils techniques officiels

Dans la pratique du développement, les développeurs qui ne sont pas très familiers des moteurs rencontrent inévitablement des problèmes d 'utilisation des moteurs, comment obtenir une réponse dès que possible?Il convient tout d 'abord de ne pas poser de questions directement dans le groupe QQ, car il est facile de noyer les questions lorsque le groupe QQ contient beaucoup d' informations et de les répéter.Notre localisation du groupe QQ est également un échange d 'auto - assistance entre les développeurs et un rappel de retour de bug.

Nous suggérons que les promoteurs effectuent des recherches dans les communautés interrogées (ask.layabox.com) et que des questions similaires aient été soulevées ou réglées.S'il n'y a pas de problème similaire, des questions peuvent être créées et décrites en détail au sein de la collectivité, de manière à réduire au minimum les coûts de communication en fournissant des informations telles que codes, interceptions et phénomènes.

Notre position centrale dans la communauté est la réaction et le traitement de bug, de sorte que les développeurs ont des BOG reproductibles, peuvent emballer le projet Demo reproductible pour le télécharger dans la communauté, les techniciens officiels donnent la priorité à la question du bug dans la communauté et veillent à ce que chaque question du bug soit réglée et, bien sûr, que des liens entre les questions de la communauté soient affichés sur le Groupe des développeurs après les questions posées.Et l 'administrateur.

S'agissant des questions qui ont été réglées mais qui nécessitent un suivi continu, il est facile d'omettre en raison de la multiplicité des problèmes communautaires.À ce moment - là, il est nécessaire que le développeur prenne l 'Initiative de suivre de nouveau l' interrogatoire dans la question originale de la communauté et de vérifier si la description de l 'interrogatoire est claire et téléchargée de manière à reproduire le demo, ou si des liens de questions dans la communauté peuvent être collés au Groupe de développeurs et à l' administrateur.

Dans le processus d 'apprentissage, s' il existe des conditions de réseau à grande vitesse, il est conseillé de consulter le programme vidéo, l' ensemble de l 'opération de suivi, plus intuitif et plus compréhensible.

Adresse vidéo:[https://layabox.ke.qq.com/](https://layabox.ke.qq.com/)