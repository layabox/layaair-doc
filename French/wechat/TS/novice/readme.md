#Créer un premier jeu de micro - lettres


> *Author: Charley*

###I. PRÉPARATION À l'environnement de DÉVELOPPEMENT

####Téléchargement et installation de l 'environnement de développement intégré de layaairide

Layaairide est un environnement de développement intégré pour le moteur layaair, qui intègre le moteur layaair et des exemples de projets, UI, animation, etc., éditeur visuel, l 'élaboration et la gestion de codes de projet, etc.**Les développeurs peuvent créer des exemples de jeux de micro - messages directement à l 'aide de layaairide.**

**Com.NET.CN guanwangwangxiazaizhi.com.NET.CN gwxzdz.com.NET.CN**- Oui.[http://ldc.layabox.com/layadownload/?type=layaairide](http://ldc.layabox.com/layadownload/?type=layaairide)

> Tips: en raison de l 'ajout de la gestion d' adaptation et de cache 3D à la version 1.7.17, il est recommandé que les développeurs utilisent la version 1.7.17 ou la version supérieure.



####Téléchargement et installation d 'outils de développement de jeux de micro - messages

L 'outil de développement de microjeux est un environnement de développement et d' essai de petits jeux.

**Developing Tool**- Oui.
[https://developers.weixin.qq.com/minigame/dev/devtools/download.html](https://developers.weixin.qq.com/minigame/dev/devtools/download.html)

![3](img/3.png)  







####Create a small Program Creator account number, acquisition of Developer ID (appid)

Même s' il n 'y a pas d' appid pour mettre au point des réglages, les fonctions peuvent être limitées.Par conséquent, avant de développer, il est préférable de créer un petit compte de développeur.

Adresse:[https://mp.weixin.qq.com/wxopen/waregister?action=step1](https://mp.weixin.qq.com/wxopen/waregister?action=step1)

**Tips:**

*Les développeurs individuels n 'ont pas besoin de numéros de série, mais ne peuvent pas non plus activer la fonction de paiement, et s' il s' agit de fonctions de paiement dans le jeu, il faut utiliser le numéro de compte de l' entrepreneur.Et le numéro de la version.*

Après l 'enregistrement du numéro de compte de l' émetteur et l 'enregistrement, l' id de l 'émetteur peut être obtenu dans les paramètres de développement du menu de configuration.

![图2-2](img/2-2.png)

**Tips:**

]*Il est recommandé à l'émetteur d'enregistrer son numéro de compte.*

### 

###Création et lancement de microjeux avec layaairide

####Création d 'exemples de petits jeux avec layaairide

Ouvrez layaairide, nouveau projet.Sélectionnez l 'exemple de micromessagerie, définissez le nom du projet, le chemin du projet, le type de langage de développement, la version du moteur.Vous pouvez créer un petit jeu comme le montre la figure ci - dessous.

![img](img/5.png)



####Affichage de l 'effet de l' exemple

Après avoir créé le projet, nous pouvons cliquer directement sur le bouton de débogage ou F5 (voir la figure ci - dessous).On va voir à quoi ressemble l 'exemple.

![img](img/5.jpg)  


> pour les éléments as et ts, la compilation est également démarrée automatiquement avant l 'ouverture de la mise en page.Alors ne saute pas.

####Jeu de micro - lettres

Cliquez sur le bouton de distribution du projet, sélectionnez la plate - forme de distribution comme un jeu de micromessagerie dans l 'interface du projet de distribution éjectée.Puis, si le Répertoire ne veut pas changer, il suffit de le publier directement.

![img](img/7.png) 


**Tips**- Oui.

> cliquez sur l 'icône d' interrogation à droite de la plateforme d 'affichage pour voir la description des options.



###Création d 'un projet de petit jeu à l' aide d 'un outil de développement de micro - messages

####Enregistrement du numéro de compte de l 'émetteur, sélection du type d' élément

Ouvre "l 'outil de développement de micro - messagerie Web" et connecte - le avec le Code de micromessagerie de l' développeur.Et choisissez**Projet de programme**Cliquez sur les paramètres du projet.

![img](img/8.png) 



####Créer un petit jeu

Dans le panneau de configuration de petits éléments de programme,`项目目录`Vous pouvez sélectionner layaairide qui vient de publier le catalogue du petit jeu (pour l 'instant, ce n' est que pour le flux de flux, la nouvelle version de l 'IDE a une meilleure formule pour les petits jeux, le document suivant sera modifié).Appid peut simplement appuyer sur les entrées d 'identification préétablies, sans entrer ni mettre au point les réglages, mais les fonctions peuvent être limitées.Il est donc préférable de saisir l 'appid.

![img](img/8-1.png) 











####Compilation d 'outils de concepteur de micro - messages

Après avoir terminé la création du petit jeu, cliquez sur compilateur pour apercevoir les effets et les réglages dans l 'outil, et nous pouvons voir que les effets dans le mode sont compatibles avec les effets de réglage dans le layaairide.

![13](img/13.png) 







####Machine Test and Test

Étant donné que l 'effet du projet peut également être testé dans la layaairide, il n' y a pas de contradiction entre les effets des deux côtés, à moins qu 'il ne s' agisse de l' adaptation.Le plus important, c'est de cliquer.**Aperçu**Fonction, à travers le Code de balayage de micro - messagerie mobile, l 'essai et la mise à l' essai de la machine dans le micro - message.

![img](img/14.png) 


**Tips:**

Lorsque le moteur est téléchargé, le nombre par défaut ne peut pas dépasser 4M, le Sous - paquet de configuration ne peut pas dépasser 8m, de sorte que, sous le catalogue de diffusion de l 'IDE, le Répertoire de l' exemple libs peut être supprimé directement.Parce que l 'objet de l' exemple a été intégré dans le code.js.Sinon, il se pourrait que le téléchargement soit impossible à cause de plus de 4M.Cette question sera également optimisée dans la nouvelle version.







Après avoir balayé le Code de micromessagerie, un petit programme est lancé, cliquez sur le bouton de fenêtre flottante dans le coin supérieur droit pour ouvrir le réglage et le panneau de contrôle de performance.

![img](img/10.png)

Après l 'ouverture du panneau de contrôle de fonctionnement et de réglage de machine, comme indiqué dans la figure ci - dessous.

![img](img/11.png) 




Ainsi, le développement d 'un petit jeu complet est terminé.C 'est pas si simple.Les petits jeux mis au point par layaairide sont essentiellement sans soudure utilisés dans les microjeux.