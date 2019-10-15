#Assemblage radiogroup

> Parce que de nombreux attributs de composant sont génériques, communs et communs`属性设置器`Une présentation est faite dans le document.Avant de lire ce texte, lisez le document attributs.

##Comprendre l 'ensemble Radio Group

###1.1 rôle des composants Radio Group

Radiogroup est un groupe de boutons de cases individuelles dans lequel les options de composant s' excluent mutuellement, l 'utilisateur ne pouvant sélectionner qu' un seul composant de case (radio) à chaque fois.Voir figure 1.
![图片4.png](img/1.gif)< br / > (Figure 1)

###1.2 spécifications pour la peau (Skin) des composants radiogroup

La peau de l 'ensemble Radio Group est`RadioGroup`Ou`RadioGroup_`Pour nommer un préfixe, il s' agit d 'un diagramme bimodal ou trimorphe à équilibrage vertical pour la conception de la peau, comme le montre la figure 2.

![图2](img/2.png)< br / > (fig. 2) teint Radio Group

*La peau de l'ensemble radiogroup ne peut pas utiliser les attributs de la grille de la neuvième maison, de sorte que la taille de l'application effective doit être déterminée au moment de la conception des ressources.*

###1.3 présentation de l'API des composants Radio Group

Pour une présentation de l'API du Groupe Radio.[ http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ui.RadioGroup](http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ui.RadioGroup)".




##Création d 'un composant radio par layaairide

###2.1 création du Groupe Radio

Cliquez sur les ressources du module radio dans le gestionnaire de ressources de sélection et faites glisser - les vers l 'éditeur de scène, ce qui permet de créer avec succès un module radio dans la page.Voir figure 3.
​![动图3](img/3.gif)< br / > (Figure 3)



###2.2 ajouter une case à cocher par labels

Comme l 'indique la figure 3, il n' y a que deux cases dans le Groupe de cases individuelles par défaut.Si vous souhaitez ajouter une case à cocher, il suffit d 'ajouter une nouvelle étiquette à la propriété labels, et le contenu de l' étiquette modifiée est également défini dans cette propriété, comme l 'indique la figure 4 - 1.

​![动图4-1](img/4-1.gif)< br / > (Figure 4 - 1)



###2.3 modification de l 'orientation et de l' espacement du Groupe Radio

Radiogroup est une disposition horizontale (* horizontal *) et verticale (* Texte Vert *) en modifiant les attributs de direction.L 'espacement peut être réalisé par l' attribut Space.Voir la figure 4 - 2.
![动图4-2](img/4-2.gif) <br /> （动图4-2）







###2.4 définir les options par défaut pour le Groupe Radio

Les propriétés selectindex sont utilisées pour modifier les valeurs d 'index d' un groupe de cases sélectionnées, aucune option n 'est cochée lorsque aucun paramètre par défaut n' est sélectionné, et si vous souhaitez paramétrer la sélection par défaut du Groupe Radio, vous pouvez définir la valeur d 'attribut selectindex, 0 pour la première case, 1 pour la deuxième case...Par analogie.

Si nous réglons la valeur de propriété à 0 heures, l 'effet de fonctionnement est indiqué dans la figure 4 - 3.
![动图4-3](img/4-3.gif)< br / > (figures 4 à 3)

### 



##Création de composants Radio personnalisés

Dans l 'exemple précédent, nous utilisons la même ressource de case unique pour générer des groupes de cases individuelles pour trois sous - éléments en réglant les labels.Cependant, dans le jeu réel, les besoins en styles de cases individuelles dans le même composant Radio Group sont différents, alors que la configuration par labels ne peut pas produire d 'effet, ce qui nécessite l' utilisation d 'un composant Radio personnalisé.




###3.1 Préparation des ressources artistiques

On en a deux.`radio单选框`Art Resources`自定义RadioGroup组件`(En milliers de dollars des États - Unis)

​![图片5.png](img/5.png)< br / > (Figure 5)

**Tips**- Oui.

Ici, il convient d 'accorder une attention particulière aux règles de dénomination des images de la peau.`RadioGroup`Ou`RadioGroup_`Nom du préfixeEtant donné que l 'ensemble de case de sélection Radio doit être utilisé comme son Sous - ensemble, les ressources d' image dans ce cas sont nommées`radio_`Préfixe



###3.2 Création de composants radio dans l 'IDE

Copier les ressources dans le dossier du gestionnaire de ressources du projet, puis faire glisser l 'ensemble Radio produit du gestionnaire de ressources vers l' éditeur de scène, et modifier successivement les attributs name de chaque composant radio de gauche à droite (ou de haut à bas) pour les modifier en conséquence «... Item0, item1, item2...», (sans ajouter d 'attributs de nom conformément à cette règle, les composants Radio Group sont générésPour les composants non valides, ils ne peuvent pas fonctionner normalement.

Lorsque les attributs label sont définis dans le texte, la couleur, la taille, la position, etc., de l 'étiquette label, et que l' emplacement est réglé, l 'effet est indiqué dans la figure 6 et la figure 7.



​        ![图片6.png](img/6.png)< br / > (Figure 6)![图片7.png](img/7.png)< br / > (Figure 7)

​**Tips: dans les attributs name des composants radiogroup personnalisés, les règles de désignation sont les caractères anglais + les nombres, qui ne peuvent être soulignés après les caractères anglais, les nombres commençant par zéro dans l 'ordre.**".



###3.3 conversion en conteneurs radiogroup

Lorsque les propriétés d 'un sous - article sont modifiées, l' ensemble sélectionné est converti en récipient en cliquant sur le raccourci Ctrl + B, puis en choisissant le type de récipient radiogroup et en déterminant, comme le montre la figure 8.



​        ![图片8.png](img/8.png)< br / > (Figure 8)



Après le succès de la conversion, l 'index selectedindex sélectionné par défaut est ajusté à 0 (premier radio) et, comme l' indique la figure 9, l 'espacement de la case sélectionnée, la direction peuvent ne pas être ajustés, de même que le réglage de la souris dans l' éditeur de scène.

​![图片9.png](img/9.png)< br / > (Figure 9)

Les étapes ci - dessus permettent de constater le succès de la fabrication d 'un composant Radio personnalisé.La première case a été sélectionnée par défaut et transférée à son troisième état de sélection de trame, tandis que les autres cases sont les premiers états non sélectionnés de trame.