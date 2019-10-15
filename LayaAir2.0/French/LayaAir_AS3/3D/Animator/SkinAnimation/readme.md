#Utilisation de l 'animation osseuse

###### *version :2.1.0beta   Update:2019-6-13*

L 'animation squelettique est également appelée animation de la peau, qui produit essentiellement l' animation en modifiant le Sommet du modèle.L 'animation squelettique est l' animation la plus utilisée, comme le modèle de singe qui apparaît souvent dans l 'exemple.

Nous prenons l'exemple d'un modèle de singe.

Pour commencer, voici les modèles de singes préparés à l'avance, comme le montre la figure 1:

[] (IMG / 1.png) <br > (Figure 1)

On crée ensuite un contrôleur d 'animation (appelé Laya Monkey Controller) et on ajoute l' animation take 001.

[] (IMG / 2.png) <br > (Figure 2)

Ajoutez le module animator au modèle singe et ajoutez le Contrôleur d 'animation et la grille que nous avions préparés à l' avance à animator.Figure 3

[] (IMG / 3.ping) <br > (Figure 3)

Une fois que les choses sont prêtes, nous pouvons choisir de prévisualiser l 'animation, pour être sûrs qu' il n 'y a pas de problème, nous pouvons l' exporter.Ici, nous choisissons le mode d 'exportation de toute la scène.Sélectionnez les options de scène parmi les options d 'exportation et cliquez sur le bouton d' exportation pour exporter la scène.

[] (IMG / 4.png) <br > (Figure 4)

Export Panel**Utilisation d 'un module Unity**Article

]**Avant l'exportation, il faut faire attention:**

[] (IMG / 5.png) <br > (Figure 4)

Animation type supporte uniquement le type Generic.

Optimize - game Objects

- Oui.

Après l 'exportation de la scène, nous chargeons pour voir les effets d' animation exportés.


```typescript

//加载我们导出的场景
Scene3D.load("res/LayaScene_LayaMonkey/Conventional/LayaMonkey.ls",Handler.create(this,function(s:Scene3D):void{
	Laya.stage.addChild(s);
}));
```


[] (IMG / 6.gif) <br > (Figure 6)