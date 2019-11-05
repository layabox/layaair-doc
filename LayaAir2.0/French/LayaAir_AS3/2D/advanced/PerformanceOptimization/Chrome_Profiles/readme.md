#Analyseur de performance utilisant un chrome

> Les Analyseurs de performances (Profiles) font partie de l 'outil de développement de chrome et peuvent sélectionner les éléments d' examen en cliquant sur le bouton droit de la page ou en appuyant sur F12 pour ouvrir l 'outil de développement de chrome sur la page de google browser.Puis cliquez sur Profiles pour passer au panneau de l 'analyseur de performances (Profiles).
]



 



###Analyse d 'occupation de CPU

####1.1 activation des analyseurs de performances de CPU

Sélectionner`Record JavaScript CPU Profile`, cliquez sur le bouton Start ou le point central du coin supérieur gauche, à ce moment - là, chrome commence à enregistrer l 'exécution de la méthode de la page Web actuelle.Comme le montre la figure 1 - 1.

![图片1-1](img/1-1.png)< br / > (figures 1 - 1)



####1.2 fin de la surveillance des analyseurs de performance CPU

Pour terminer l 'enregistrement de surveillance de l' analyseur de performances, il faut cliquer sur le bouton Stop (ou sur le cercle central rouge à gauche).Comme le montre la figure 1 - 2.

![图片1-2](img/1-2.png)< br / > (figures 1 - 2)



###1.3 visualisation des enregistrements des analyseurs de performances de CPU

Une fois la surveillance terminée, un fichier de résultats de surveillance est listé sous Profiles à gauche et cliquez pour ouvrir ce fichier de résultats de surveillance.Figure 1 - 3

![图片1-3](img/1-3.png)< br / > (figures 1 à 3)

Les résultats de la surveillance sont présentés sous forme de tableaux de données.En fonction de la ligne de consommation, nous pouvons trouver le nom de fonction fourni dans la function, pour optimiser les performances là où elles sont plus importantes.



###Analyse d 'occupation de mémoire

####2.1 activation de l'analyse de mémoire

Sélectionner`Take Heap Snapshot`, cliquez`Take Snapshot`Bouton (cliquez également sur le cercle noyau noir à gauche), comme le montre la figure 2 - 1.



![图片2-1](img/2-1.png)< br / > (figures 2 - 1)

Le fichier d 'instantané mémoire généré est enregistré sous la forme d' une table de données, le nombre d 'objets de la page actuelle, la taille de la mémoire occupée, etc.



####2.2 enregistrement de la photo instantanée

Une fois l 'analyse de mémoire activée, un fichier d' enregistrement d 'images instantanées d' une page Web active est créé sous la rubrique Profiles à gauche.Cliquez pour afficher les données pertinentes, comme le montre la figure 2 - 2.

![图片2-2](img/2-2.png)< br / > (figures 2 - 2)



####2.3 analyse de la mémoire instantanée


Après avoir pris la première photo de mémoire rapide, cliquez sur le point du coin supérieur gauche pour enregistrer une nouvelle photo de mémoire rapide.Cliquez pour sélectionner un second instantané de mémoire et sélectionnez un changement entre le mode comparison et le premier instantané.L 'analyse permet d' optimiser la page Web.



​![图片1.png](img/5.png)< br / >
(Figure 2 - 3)

​![图片1.png](img/6.png)< br / >
(Figure 6)