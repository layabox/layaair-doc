# 项目发布详解

![1](img/1.png)  


(Figure 1)

La fonction de publication du menu de projet est très importante, généralement pour le jeu JS, la compression et la confusion JS, la compression d 'images, la gestion de versions, l' adaptation des différentes plates - formes du jeu, etc.La fonction de publication du projet est généralement utilisée lorsque le projet est achevé ou qu'il est en phase de développement et qu'il est prêt à être soumis à des essais dans un environnement de production.

Dans le menu du projet, l 'interface de la fonction de diffusion du projet est ouverte, comme le montre la figure 1.

###Plate - forme de diffusion

Il y a trois options dans la plate - forme de diffusion: web / Native Platform, micro - messagerie Platform, QQ play platform.Comme le montre la figure 2.

![2](img/2.png) 


(Figure 2)

`web/Native`La version HTML 5 est publiée dans un environnement de navigateur ou dans un environnement AP de layanative.

`微信小游戏`Une version de jeu de micromessagerie qui fonctionne dans une plate - forme de jeu de micromessagerie.

`QQ玩一玩`Pour jouer à une version de jeu, dans une plateforme de jeu sur un téléphone portable QQ.

###Répertoire source

Liste des sources**Répertoire source**, le projet pour la langue AS3 est situé dans`项目根目录\bin\h5`Ne vous trompez pas.

###TABLE DES MATIÈRES

Le catalogue est à publier.**Liste d 'Objectifs**, peut être l 'objectif du projet ou un répertoire sans rapport avec le projet.Par exemple, indique le répertoire d 'articles créé par le jeu de micro - messages.

**Special Alert**- Oui.

> 1 lors de l 'émission d' un petit jeu de micromessagerie, si le Programme d 'adaptation n' est pas initialisé dans le projet, la publication directe dans le passé peut être erronée dans l 'outil de l' développeur de micromessagerie.
]
> 2, micromessagerie et QQ jouent à un jeu qui ne supporte pas le XML par défaut, si le XML est utilisé dans le projet de jeu, il faut citer la Bibliothèque d 'analyse XML (domparserinone.js) dans un jeu ou un petit jeu, faute de quoi la publication du passé et l' exécution directe peuvent également se tromper.
]
> 3, plus de jeux de micro - lettres et QQ jouez à des cours sur les questions de publicité et les processus de travail, et vous pouvez consulter des documents plus détaillés.

###Document d 'exclusion

Pour exclure certains fichiers ou fichiers sous le Répertoire racine source`;`Séparez - vous.
Note: supprimer un fichier

###Fusionner tous les fichiers JS dans l'index.html

Une fois cochés, les JS de l 'index.html sont analysés et tous les JS de l' index.html fusionnés en un JS unique.

Bien que cette option soit disponible, elle devient obligatoire pour la publication d 'un petit jeu de micro - messages en fonction de son mécanisme particulier.

###Compression PNG, JPG, etc.

Après avoir coché les options de compression, la compression est effectuée en fonction du nom de suffixe.Lors de la compression des ressources PNG ou JPG, la qualité peut être contrôlée par paramètre, la valeur par défaut au moment de la publication peut être ajustée de son propre chef si l 'développeur estime que l' effet n 'a pas atteint l' objectif.

###Compression de json

Lorsque l 'option json est comprimée, ce n' est pas seulement un fichier de suffixe json, mais par défaut un certain nombre de formats de fichier communs (json, Atlas, LS, LH, lmat, lav) qui peuvent nécessiter une compression, et si le suffixe correspondant à ces plages commence à être comprimé.Si un format de suffixe n 'a pas besoin d' être comprimé, le suffixe peut être supprimé directement.

###Confondre compression JS

Lorsque vous cochez ce mode, le JS est comprimé et confondu.

###Gestion des versions

Cochez cette option et activez la gestion de version.

Lorsque la gestion de mise en page est activée, un nom de fichier avec Hash est généré et un fichier de mappage de nom de fichier est généré pour version.json.

L'avantage de cette démarche est d'éviter des environnements opérationnels dans lesquels le cache est plus important et difficile à nettoyer.Pour mettre à jour la version.

Pour plus de détails sur la gestion des versions, veuillez consulter l 'article pertinent.



