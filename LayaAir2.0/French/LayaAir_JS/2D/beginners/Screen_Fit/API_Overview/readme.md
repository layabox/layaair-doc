#Adaptation d 'écran



Avec l'augmentation du nombre d'équipements mobiles (téléphones portables, panneaux plats, téléviseurs), la fragmentation des équipements et des écrans ne cesse de croître, alors que nous examinons aujourd'hui la fragmentation des écrans qui a un impact plus important sur l'affichage des jeux.

Pour mieux comprendre l 'adaptation de l' écran, commençons par le développement de la résolution de l 'écran iPhone:

Dans les dispositifs mobiles précédents, les pixels de l 'écran sont relativement faibles, comme iphone3, dont la résolution est de 320 x 480, et sur iphone3, un pixel équivaut à un pixel physique de l' écran.Par la suite, avec une densité de pixels de plus en plus élevée, Apple a lancé l 'écran Rétina à partir d' iPhone4, la résolution est passée à 640 x 960, soit une augmentation de deux fois la taille de l 'écran, ce qui signifie que le nombre de pixels a doublé sur l' écran de la même taille, ce qui représente une augmentation de devicepixel ratio et d 'autres dispositifs mobiles androïdiens similaires.

Nous avons donc une formule:`物理分辨率=像素分辨率*devicePixelRatio`•

Le moteur a encapsulé les deux résolutions.

Équipement de résolution des pixels: laya.browser.clientwidth, laya.browser.clientheight;

Résolution physique des équipements: laya.browser.with, laya.browser.height;

Pixel Ratio: laya.browser.pixelratio;

Le clientwidth obtenu par défaut à partir d 'un navigateur n' est pas une résolution de pixels, mais une résolution échelonnée qui, pour obtenir une résolution correcte, nécessite la mise en place d 'une étiquette viewport Meta sur une page HTML et définit la valeur contenue comme`width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no`".

Dans le moteur layaair, si l 'étiquette viewport n' est pas placée sur la page, le moteur crée automatiquement un moteur pour assurer une largeur correcte.

L 'adaptation de l' écran est utilisée pour chaque jeu.Pour ce qui est de l'adaptation des écrans des appareils mobiles, en particulier des téléphones portables, comment le moteur layaair peut - il être mis en œuvre, nous allons d'abord apprendre à connaître l'API associé. "`laya.display.stage`".



##Configuration de mode d 'agrandissement pour l' Adaptation d 'écran

Les modèles d 'agrandissement adaptés à l' écran sont répartis en sept catégories, comme le montrent les figures 1, 2 et 3:

​![图片](img/1.png)< br / >
Figure 1 mode d 'agrandissement adapté à l' écran

​![图片](img/2.png)< br / >
Figure 2 mode d 'agrandissement adapté à l' écran

​![图片](img/3.png)< br / >
Figure 3 mode d 'agrandissement adapté à l' écran



##Paramètres relatifs au mode d 'alignement

Dans le mode d 'alignement, il s' agit d' un alignement horizontal classique et vertical.Les paramètres de l'API pertinents sont présentés dans les figures 4, 5 et 6:
​![图片](img/4.png)< br / >
Diagramme 4 mode d 'alignement adapté à l' écran

​![图片](img/5.png)< br / >
Diagramme 5 mode d 'alignement adapté à un écran

​![图片](img/6.png)< br / >
Figure 6 propriétés dans un mode d 'alignement



##Configuration d 'adaptation intelligente pour la direction de l' écran

Les moteurs layaair peuvent définir des écrans horizontaux ou verticaux automatiques en fonction des proportions affichées par le navigateur, indépendamment des écrans de verrouillage du système.Les paramètres de paramétrage de l 'API sont indiqués dans les figures 7 et 8:



​		![图片](img/7.png)< br / >
Adaptation de la direction de l 'écran

​![图片](img/8.png)< br / >
Adaptation de la direction de l 'écran



à propos de`laya.display.stage`Note de l'API, consultable dans le document API: http: / / layaair.ldc.layabox.com / API / index.html? Category = Core & class = laya.display.stage