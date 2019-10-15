#Acquisition d 'état de lecture d' animation

###### *version :2.1.0beta   Update:2019-6-13*

Pour obtenir l 'état de lecture d' animation, il suffit d 'utiliser animator.**Getcurrentanimator playstate**Méthode

[] (IMG / 1.png) <br > (Figure 1)

Postacquisition`AnimatorPlayState`- Oui.

[] (IMG / 2.png) <br > (Figure 2)

#####Quand l 'animation est une lecture non cyclique

Le même dessin animé**Non - circulation**Ce nomalizedtime renvoie un nombre de 0 ~ 1 qui signifie que l 'animation actuelle a été diffusée à 100%, c' est - à - dire qu 'elle a été diffusée, c' est - à - dire qu 'elle a été diffusée à 10%.

#####Quand l 'animation est une lecture circulaire

Cette valeur + + 1 après chaque lecture, c 'est - à - dire combien de fois le BIT entier a terminé la lecture de l' animation courante, alors que le petit nombre représente le pourcentage de l 'animation actuellement en cours de lecture.Par exemple, si le cycle d 'animation circulatoire a été diffusé trois fois, ce chiffre devrait être de 3,0 quand le quatrième sera diffusé à moitié.
