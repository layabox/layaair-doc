# LayaNative2.0

La plus grande amélioration apportée à layanative2.0 pour les promoteurs a consisté à appuyer pleinement layaair3d et à faciliter la publication de la version 3D - APP par les promoteurs.En outre, layanative2.0 a annulé la solution nationale de cinq générations de layabox, conçue pour être plus rapide, plus ouverte, plus simple et mieux soutenue.Layanative2.0 adopter le concept de conception de la technologie brevetée webgl +, plus sophistiqué et plus ouvert, comme le Protocole webgl, qui ne fixe que des fonctions variables, est une solution modeste et plus extensible.On trouvera ci - après une brève description de la structure du moteur, de ses performances, de ses fonctionnalités et de sa facilité d 'utilisation.

##Structure du moteur
Les projets mis au point par le développeur avec le moteur layaair peuvent être publiés dans le Navigateur ou dans l 'app original, le diagramme ci - après indiquant la structure du moteur et l' organigramme de l 'développeur.
![图](img/1.jpg)

![图](img/2.png)

##Performances

Layanative2.0 a été restructuré par Code, les performances se sont considérablement améliorées par rapport à la version 1.0.
Comparaison de layanative1,0

124, \ \ 1242d \ \ 1243d \ \ 124.
124: -------------------------------------------------------------------------------------
- 124 °android °4%
12.244%

Comparaison avec d 'autres moteurs Runtime

124, \ \ 1242d \ \ 1243d \ \ 124.
124: -----------------------------------------------------------------------------------------
- 124%
124 ~ 240 ~ 124 ~ 270%



##Extensible function

Layanative - 2.0 prend en charge les deux modes d 'exécution, l' concepteur choisissant le mode d 'exécution en fonction des résultats des essais effectués dans le cadre de son propre projet.

* mode monofilière: JS et render fonctionnent en une seule ligne.
* avantages: fonctionnement sans retard (par exemple, touches, touches).
* inconvénients: les performances sont inférieures au modèle à deux fils.
* mode à double filière: JS et render fonctionnent dans leurs filières respectives.
* avantages: performances supérieures à celles de la version monoligne.
* inconvénients: l 'opération comporte une demi - trame avec un retard maximal jusqu' à une trame (par exemple, touche, touche).

Supporte la compression de texture de carte, non seulement pour améliorer l 'efficacité de rendu, mais aussi pour réduire l' occupation apparente.

Optimiser le développement secondaire, plus facile à comprendre et à utiliser par les développeurs, comme indiqué dans le document:
Https: / / github.com / layabox / layaair - DOC / tree / Master / layaair2.0 / chinese / layanative / Secondary \ \ u Development


##Accessibilité

###Mise en place de fonctions de mise en route plus faciles

1) La plateforme android peut être mise en service par la machine JavaScript

Dans la version layanative1.0, le code JavaScript du projet de mise en page ne peut être appelé que console.log ou Alert.Le code JavaScript est officiellement approuvé dans la version layanative2.0 à l 'aide d' un navigateur Chrome.Il est possible d 'ajouter un code à l' essai de chrome, de suivre le Code, etc.

![图](img/debug_connected.png)

Pour plus de détails, voir le document:
Https: / / github.com / layabox / layaair - DOC / tree / Master / layaair2.0 / chinese / layanative / real \ \ defugging

2) Mise à l 'essai de l' app pour le démarrage du Code de balayage

Afin de permettre au développeur d 'accélérer le développement de la mise au point de la mise au point, la nouvelle version de l' app de test ajoute un code de balayage pour activer la fonction de l 'APP, ce qui permet d' éviter les problèmes d 'entrée manuelle de l' URL lors de la mise au point.

![图](img/app_debug_1_0.png)

Pour plus de détails, voir le document:
Https: / / github.com / layabox / layaair - DOC / tree / Master / layaair2.0 / chinese / layanative / How to u use \ \ Runtime



###Interface de démarrage pouvant être personnalisée et enrichie

Le loadingview de layanative - 2.0 a été développé dans la langue originale de la plate - forme, Android dans la langue Java et iOS dans la langue objective - C.Les fonctions personnalisées sont plus nombreuses que celles de loadingview, développé dans la langue Javascript, 2.0.Non seulement l 'image peut être remplacée, mais l' développeur peut également utiliser la langue de plate - forme pour réaliser la fonction souhaitée.

![图](img/loadingview_2_0.png)

Pour plus de détails, voir le document:
Https: / / github.com / layabox / layaair - DOC / tree / Master / layaair2.0 / chinese / layanative / loading au View \ \ u New