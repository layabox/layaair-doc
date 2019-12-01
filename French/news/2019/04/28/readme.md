# LayaAir引擎放弃Canvas API，打造次世代3D引擎与云游戏引擎，提供AI赋能！

> 2019 - 04 - 28

L'abandon du moteur layaair de l'API originel de Canvas n'est pas un abandon de 2D, mais un meilleur développement de 2D et 3D!Alors pourquoi abandonner l 'API originel de Canvas et la planification du développement futur du moteur layaair, nous allons vous parler ici!

### **Performance médiocre de l 'API primaire Canvas**

Une fois que Canvas a été lancé, l 'API de sa ceinture permet au développeur d' obtenir rapidement des effets dynamiques, y compris la création de jeux.Pendant une longue période, les moteurs HTML5 ont été conçus sur la base de l 'API 2D des bandes de Canas dans le navigateur, mais ces API ne sont pas conçus pour rendre des images haute performance, ce qui pose un problème, c' est qu 'ils ne répondent pas aux exigences de performance des jeux complexes.Pour atteindre la qualité d 'image de l' AP, le jeu basé sur le moteur Canvas doit être accéléré au moyen d 'une fiche Runtime pour répondre aux exigences de performance du jeu.Même aujourd'hui, la différence entre les propriétés des particules Canvas et celles des particules webgl est plus de 100 fois plus grande.

### **La compatibilité avec canvas - API peut bloquer le fonctionnement du moteur.**

En 2015, layabox a été à l 'avant - garde de la recherche - développement sur le moteur de deuxième génération layaair, avec le modèle webgl et canvas, avec une conception optimisée des moteurs, ce qui a permis d' améliorer considérablement les performances globales et de satisfaire les besoins de performance des jeux de classe AP sans recourir à Runtime dans un environnement favorable à webgl.La commutation automatique en mode Canvas dans un environnement qui ne supporte pas le webgl maintient la compatibilité avec le mode Canvas.

Bien entendu, la compatibilité a aussi un coût, c 'est - à - dire qu' elle limite l 'expansion fonctionnelle du moteur.Par exemple, en mode webgl, il n 'est pas possible d' assurer la compatibilité des deux modes si l 'on veut ajouter des attributs pratiques à la texture dans le moteur, alors que Canvas n' est pas supporté par l 'API d' origine.Ou pour ajouter une fonction Shader personnalisée à la fonction 2D, il faut également renoncer à la compatibilité.Il y a encore beaucoup de scénarios d 'application.En résumé, pour que Canvas et webgl restent compatibles, le moteur est facile à utiliser et l 'extension des fonctions est entravée.

### **Câlin complet GPU image API**

Une fois que canvas - 2d API a été abandonné, le moteur layaair pourra concevoir le moteur de développement en utilisant l 'API graphique GPU de bas niveau sans aucun scrupule, et se libérer de la contrainte rendra le moteur plus libre de développement.En particulier, la conception d 'une toile spatiale 3D permet une intégration très amicale des scènes 2D et 3D.

Avec l 'évolution de l' époque, le matériel a été mis au point à ce jour, et il est devenu plus rare de ne pas appuyer l 'environnement webgl.En outre, les 3D n 'auraient pas pu fonctionner en mode canvas, de sorte que la compatibilité avec le mode Canvas n' a aucune valeur pour les jeux 3D.Nous avons donc mis en balance les avantages et les inconvénients de la compatibilité avec l 'API originel de Canvas et, après mûre réflexion, nous avons été les premiers à abandonner la compatibilité avec l' API originel de Canvas.

À l 'heure actuelle, à l' exception de la réduction de la taille du moteur dans son ensemble, l 'abandon de l' API originel Canvas n 'est pas sensé pour le développeur.En regardant vers l 'avenir, cela permettra à layaair de s' orienter vers une plus grande liberté, plus forte, plus conviviale et plus largement applicable à l' ensemble des moteurs de jeu.

> pour être clair à l 'avance, layaair 2.1 beta, qui sera publié en mai, a achevé l' abandon de l 'API originel de Canvas.S'il y a des développeurs de la demande de compatibilité avec l'API d'origine canvas, utilisez la version layaair - 2.1 ci - dessous.

### **Continuous Pressing Equipment Performance**

Les performances extrêmes sont toujours l 'une des pierres angulaires de la conception et du développement de layaair.Par conséquent, nous allons continuer les performances du matériel de compression, à l 'exception du webgl1.0 actuellement soutenu par layaair, nous allons appuyer webgl 2.0 dans le moteur.Et reste attentif à webgpu, une fois que webgpu aura atteint sa maturité, nous lui donnerons immédiatement un appui moteur.

L 'optimisation des performances du moteur, telles que les performances de rendu en temps réel, les performances du modèle d' animation squelettique, etc.Bref, l 'Extreme performance est le moteur layaair éternel poursuite!

# **Moteur 3D**

Tout le monde sait que, sauf les performances, la maturité et l 'avant - garde du moteur layaair est le plus grand avantage.Le moteur layaair continuera d'augmenter ses investissements dans le moteur 3D.Tout en continuant d 'enrichir les fonctions fonctionnelles du moteur et d' améliorer l 'accessibilité du moteur, l' accent est mis sur l 'amélioration de la qualité de rendu du moteur, tels que l' effet de rendu du matériau PBR, le rendu Multi - sources et l 'effet d' ombre Multi - sources, l 'éclairage global, le rendu différé, l' ouverture de la ligne post - process et les effets de traitement ultérieurs tels que HDR, sasao et la profondeur de paysage.

Layaair est un moteur à haute performance sous - génération 3D!

### **Moteur de jeu de nuages 6, 5G et ai**

A mesure que l 'ère 5G se rapproche, l' industrie du jeu est la plus impliquée dans le développement à grande vitesse des nuages, 3D, AR, VR, ai.Et layabox, en tant que moteur, doit faire un pas en avant et a déjà lancé l 'exploration et la conception d' une nouvelle génération de moteurs de jeu nuages.

L 'une des caractéristiques les plus évidentes du réseau 5G est la vitesse, le taux de téléchargement par seconde de classe Gbps, ce qui permet certainement aux moteurs de faire beaucoup.Par exemple, nous mettons des calculs et des rendu sous pression sur le matériel dans le traitement des nuages, de sorte que les boîtes de télévision, les machines uniques, les dispositifs mobiles, etc.

L 'ère 5G est l' ère de l 'interconnexion de toutes les choses, pour les grandes plates - formes futures, le moteur layaair appuiera, après avoir échappé aux contraintes du navigateur API, le moteur layaair se concentrera davantage sur la localisation de l' ensemble des moteurs de plate - forme.Ar et VR devraient se développer à grande vitesse à l 'ère 5G, voire devenir un type dominant, à l' écart de la qualité des moteurs 3D, les moteurs layaair à l 'avenir pleinement en mesure de répondre aux besoins de R & D de l' age 5G ar et VR.La norme webxr sera pleinement respectée.Les développeurs peuvent utiliser les moteurs layaair produits sur steam et d 'autres plates - formes bien connues.

Enfin, il convient de mentionner le module ai.Ai est une tendance du développement rapide de la science et de la technologie et du progrès social, l 'auto - apprentissage et la capacité d' interaction automatique pour permettre aux joueurs du monde du jeu virtuel d 'acquérir une expérience plus immergée.Par exemple, l 'orientation du jeu, le jeu en équipe, la société de base, l' interaction dramatique, etc.Il s' agit là d 'une demande douloureuse du jeu, et le module ai prévoit de devenir une fonction facultative du cadre de layacloud à l' avenir.

Layacloud est un jeu sans serveur lancé avec le moteur layaair2.0.L 'utilisation de ce cadre permet de créer facilement un jeu en réseau sans avoir à entrer en contact avec le serveur de gestion et l' utilisation de la langue d 'avant - garde par l' intermédiaire du serveur API fourni par le cadre.Le cadre actuel fournit déjà un api commun pour les jeux en ligne tels que l 'accès et l' authentification des utilisateurs, le stockage et la lecture de données, la création et la gestion de chambres, l 'appariement des utilisateurs et l' accès aux Chambres, la diffusion de messages et la synchronisation de trames, etc.L'objectif est de faire en sorte que les concepteurs se concentrent davantage sur l'élaboration de la logique de fonctionnement des produits, de réduire sensiblement le temps de mise au point des modules et de réduire les seuils et les coûts de mise en réseau.

### **Outils d 'édition visuels 3D**

En ce qui concerne les outils 3D visualisés, nous maintiendrons à l 'avenir sur une longue période trois lignes principales, l' une étant actuellement basée sur l 'outil Unity.Le développeur peut éditer une scène 3D en utilisant le matériau contenu dans le module layaair dans un environnement Unity, puis l 'exporter gratuitement par l' intermédiaire du module.

Une autre ligne est layamaker, outil de développement de scénarios 3D non programmés, qui a été rendu public le 26 avril et qui soutient le développement de la visualisation de produits interactifs 3D dans certaines branches d'activité (par exemple, l'éducation) et qui peut facilement être utilisé sans avoir besoin d'une base de programmation.Pour de plus amples informations sur layamaker, consulter le lien ci - après:[Layabox推出无编程3D教育制作工具LayaMaker，携手精锐教育集团进军新领域！](http://mp.weixin.qq.com/s?__biz=MzAxMjI4NjA1OA==&mid=2650584620&idx=1&sn=fcf341b4b53e1c3d4f8e500c75893a06&chksm=83bc3729b4cbbe3f52fd830e15be04e808ba43103113abef2474322979feae941731589f7fd2&scene=21%3Ch1%3Ewechat_redirect)

La troisième ligne est l'outil d'édition 3D visualisé destiné au développeur de layaair, qui est déjà en forme de prototype et devait être lancé dans la version officielle 2.0.Comme nous n 'avons pas atteint l' objectif que nous nous étions fixé, l 'écran temporaire, une fois que la satisfaction a été rétablie, les outils d' édition 3D visualisés et mieux adaptés au moteur layaair seront introduits à l 'avenir.

### **Moteur Development Language switching to type script**

Le moteur layaair, tout en soutenant le développement des produits en trois langues AS3, ts et JS, a toujours été basé sur le développement de la langue AS3.La raison principale pour laquelle nous sommes favorables à notre changement de langue est que la langue AS3 n 'est plus entretenue depuis longtemps et qu' elle ne peut pas appuyer les nouvelles caractéristiques d 'un langage de programmation moderne.Afin de rendre le moteur plus convivial avec les nouvelles caractéristiques, le moteur layaair prévoit de changer le moteur dans un proche avenir.Cela ne s' applique pas à l 'ensemble des développeurs, qui peuvent néanmoins développer leurs produits en trois langues: AS3, ts et JS.Toutefois, à long terme, l'appui du ts aux nouvelles identités, à la layairide et à un développement efficace sont plus amicaux, et nous recommandons donc que les promoteurs s'efforcent d'utiliser le ts comme langue de développement privilégiée lorsqu'ils créent de nouveaux projets.

Changer le moteur de développement de la langue est seulement notre moteur développeur basé sur la recherche de moteurs extrêmes pour prendre des décisions.C 'est une attitude!

### **Poursuite de l'ouverture du moteur layaair**

Le moteur layaair a été placé sous tutelle sur github, mais pas sur la base du développement de github.Ce n 'est qu' au moment de la mise à jour mensuelle du site officiel que la mise à jour est synchronisée.À l 'avenir, l' équipe de développement du moteur layaair renforcera la vitalité de github, le moteur basé sur le réseau public, qui est mis au point, communiquera le Code le plus récent à github et fera participer davantage d 'élites non layabox au développement du moteur layaair.

Pour les concepteurs qui ont participé à la présentation du Code layaair, une fois celui - ci adopté, une prime en espèces sera versée à layabox.Des participants actifs ont été invités à se joindre au Groupe de développement mondial de layaair et à participer à des débats techniques importants sur le moteur layaair.

###à la fin

Dans l 'avenir, le moteur layaair maintient l' optimisation et la stabilité de 2D, l 'accent étant mis sur le développement de la prochaine génération de moteurs 3D, nous n' avons jamais arrêté de marcher sur la technologie de la recherche, nous n 'avons pas assez de produits, à partir de layaair 2.0, Nous allons toujours maintenir l' attention et l 'optimisation.A chaque fois que nous avançons un petit pas sans l 'appui de la majorité des développeurs, je vous remercie!Bienvenue amis à envoyer des cercles d 'amis ou des groupes de micro - messages, afin que davantage de développeurs soient informés de la dernière évolution de notre technologie.