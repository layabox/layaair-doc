#Outil layaair debugpanel

###Activation du panneau de débogage debugpanel

Le panneau de débogage debugpanel est basé sur la fenêtre de débogage DIV, et ouvre le panneau de réglage en mode Édition F9, comme un diagramme

![图1](img/debug.png)

Ouvre le panneau de débogage en cochant le bouton.Attention, cette méthode est vivement recommandée!- Oui.

Démarrage du panneau de débogage en mode Code`Laya.enableDebugPanel();`Procédé d 'initialisation`Laya.enable()`Ajout d 'une utilisation dans un code facultatif postérieur, comme indiqué dans le code suivant:

Catégorie d 'entrée


```java

package
{
	import laya.debug.DebugPanel;
	import laya.display.Sprite;
	
	public class Main
	{
		public function Main()
		{
			//初始化舞台
			Laya.init(1334,750);    
			//调用DebugPanel调试面板
			Laya.enableDebugPanel();
			//设置舞台背景色
			Laya.stage.bgColor  = "#ffffff";
			
			var Img:Sprite = new Sprite(); 			 
			//添加到舞台
			Laya.stage.addChild(Img);   
			Img.loadImage("res/img/monkey1.png",200); 	
		}
	}
}
```


Résultats d 'exécution

![图1](img/1.png) <br /> (图1)







###Rafraîchir l 'arbre de noeud d' objet d 'affichage

Dans un état par défaut, seuls les arbres du noeud d 'objet sont affichés`DebugInfoLayer`Noeud, et le développeur de noeud n 'a pas à s' en occuper (pour le démarreur de moteur).Les noeuds d 'objet sur la page du produit doivent être rafraîchis pour être affichés, cliquez sur`调试面板`Supérieur`刷新`Cliquez sur le bouton pour afficher toute la structure d 'arbre de noeud sur la page.Voir figure 2.

![动图2](img/2.gif) <br /> (动图2)







###Affichage des propriétés des objets du noeud

Cliquez sur le noeud dans l 'arbre de noeud pour voir à droite les propriétés de l' objet de noeud sélectionné, comme le montre la figure 3.

![图3](img/3.png)< br / > (Figure 3)

**Tips**: l 'évaluation et la mise en page des problèmes peuvent être accélérées par la visualisation ou la modification des propriétés d' un objet de noeud dans le panneau de débogage.



###Examen des éléments de page

À l 'exception de l' arbre de noeud, cliquez sur l 'objet de noeud pour voir les propriétés.Cliquez d 'abord`审查元素`Puis cliquez sur le contenu cible de la page pour afficher directement les propriétés d 'objet du noeud dans la Zone droite du panneau de débogage.Les résultats sont présentés dans la figure 4.

![动图4](img/4.gif) <br /> (动图4)











###Modifier les propriétés des objets de noeud dans le panneau de débogage

Afin d 'éviter que chaque débogage ne soit modifié dans le Code, le processus complexe de débogage exécuté est de nouveau compilé.Les valeurs d 'attribut peuvent être modifiées directement dans le panneau de débogage debugpanel.L 'effet de modification est alors visible en sortant la zone d' entrée de valeur d 'attribut.Les opérations et les effets sont indiqués dans la figure 5.

![动图5](img/5.gif)< br / > (Figure 5)



###Noeud visible Control

Vous pouvez passer après avoir sélectionné le noeud dans le panneau de configuration**Annuler**Noeud`可见勾选状态`Pour que le noeud**Non visible**".Cliquer à nouveau`勾选`Comme on peut le voir à la figure 6, l'effet sera réapparu.

![动图6](img/6.gif)< br / > (Figure 6)





###Commande d 'affichage de bordure rouge de noeud

Panneau de configuration`可见`Contrôle sur la droite`显示边框`Commande, le noeud est sélectionné dans la page comme**Bordure rouge**High Bright displayLes résultats sont présentés à la figure 7.

![图7](img/7.png)< br / > (Figure 7)

**Tips**- Oui.*Lorsque les paramètres d 'attributs du noeud casheas sont entrés en vigueur, les bordures rouges ne sont pas affichées en cochant les bordures d' affichage.*



###Imprimer les objets de noeud sur la console

Cliquez sur le panneau de débogage debugpanel.`打印到控制台`Ce bouton permet d 'exporter l' objet de noeud sélectionné vers la console de commande du navigateur (* console *) afin de faciliter de nouvelles opérations de réglage dans la console.Les résultats sont présentés à la figure 8.

![图8](img/8.png)< br / > (Figure 8)



###Voir la chaîne enable et la chaîne Size sur la console

Grâce aux boutons de chaîne enable et de chaîne size, les attributs associés à l 'objet noeud ou au Size peuvent être exportés vers la console.Comme le montre la figure 9.

![图9](img/9.png)< br / > (Figure 9)



###Display and Switching majuscule set

En mode webgl, pour optimiser les performances`512*512`Les moteurs de ressources sont automatiquement fusionnés dans l 'ensemble de majuscules (y compris les images et les informations textuelles).La limite supérieure par défaut du moteur layaair est de six grandes agrégats de graphiques qui peuvent être optimisés par l 'affichage du nombre et du contenu de ces agrégats.

Cocher`显示大图合集`Après, vous pouvez voir l 'ensemble actuel de l' Atlas.`图集当前数/图集总数`, deux valeurs.Désactiver la coche et sélectionner`切换`Au prochain grand ensemble.Comme le montre la figure 10.

![动图10](img/10.gif)< br / > (Figure 10)

**Tips**- Oui.

Afficher la fonction d 'Agrégation de majuscules se limite au mode webgl, ce bouton fonctionnel ne fonctionnant pas en mode Canvas.

La largeur totale d 'un ensemble de majuscules unique est égale à`2048*2048`".





###Afficher la zone de Réinitialisation actuelle de la case et toutes les zones de la case

Le réglage de la case permet d 'optimiser les performances, mais le réglage de la case est déraisonnable et réduit les performances.Par exemple, lorsque la zone de case est repeinte fréquemment, les performances sont réduites.

Passer`显示当前cache重绘`Et`显示所有cache区域`Vérifiez l 'état de case.

**Le vert est le bloc actuel de cache.**, la zone de couleur s' affiche pendant trois secondes.Les résultats sont présentés à la figure 11.

![动图11](img/11.gif)< br / > (Figure 11)


**Toutes les zones de case sont des bordures violettes.**, la zone de couleur de la zone disparaît immédiatement et reste dans la dernière zone de case.Les résultats sont présentés dans la figure 12.

![动图12](img/12.gif)< br / > (Figure 12)














 

