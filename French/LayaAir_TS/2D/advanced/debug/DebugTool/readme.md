# LayaAir DebugTool调试工具

###Activer le panneau de débogage debugtool

Le panneau de débogage layaair debugtool est basé sur la fenêtre de débogage DIV et peut être utilisé directement dans le projet sans télécharger aucun insert installé.Démarrage du panneau de configuration`DebugTool.init()`Procédé de localisation`laya.debugtool.js`Dans un fichier, l 'introduction du fichier JS dans l' index.html permet d 'initialiser le procédé de scène`Laya.init()`Ajouter un code de fichier JS dans l 'index.html comme suit:


```javascript

<script type="text/javascript" src="libs/laya.debugtool.js"></script>
```


Utiliser, par exemple, le code suivant:

Catégorie d 'entrée


```java

// 程序入口
class GameMain{
    constructor()
    {
        //初始化舞台
        Laya.init(1334,750);
        //调用DebugTool调试面板
        Laya.DebugTool.init();
        //设置舞台背景色
        Laya.stage.bgColor = "#ffffff";
        var Img:Laya.Sprite = new Laya.Sprite();
        //添加到舞台
        Laya.stage.addChild(Img);
        Img.loadImage("res/img/monkey1.png",200);
    }
}
new GameMain();
```


Lorsque le panneau de configuration a été activé avec succès, comme le montre la figure 1.

![图1，调试面板工具页面](img/1.png)  


(Figure 1)



###Sélection de noeud

Cliquez d 'abord sur le premier en haut du panneau de débogage`选取`, cliquez sur l 'icône

Puis glisse dans le noeud de la page de jeu et affiche les bordures du noeud.

Cliquez sur la souris pour sélectionner le noeud.Dans le même temps, les informations d 'attribut du noeud sont affichées dans la classification de noeuds du panneau de débogage.Les résultats sont présentés dans la figure 2.

![动图2](img/2.gif) 


(Figure 2)



###Paramétrer les propriétés d 'affichage

Cliquez sur l 'icône d' engrenage de la deuxième rangée du panneau de réglage, vous pouvez configurer`要显示的属性`".

Les informations d 'attribut à afficher dans le noeud peuvent être ajoutées et supprimées dans le nouveau panneau de réglage d' attributs d 'affichage.Les opérations de corrélation sont décrites dans la figure 3.

![动图3](img/3.gif)  


(Figure 3)



###Glisser le choix

Cliquez sur le deuxième en haut du bouton gauche`拖动选取`L 'icône de bouton, puis maintenez le bouton enfoncé et faites glisser jusqu' au noeud d 'objet d' affichage que vous souhaitez voir, ce qui permet de visualiser les informations d 'attribut du noeud dans le panneau de réglage, comme le montre la figure 4.


![动图4](img/4.gif)  


(Figure 4)



###Fonction de recherche rapide

####5.1 acquisition d 'objets noeuds sur la page avec des raccourcis claviers

En cliquant sur le raccourci`Alt+V`Et sélectionnez simultanément l 'objet du noeud de page avec la souris.L 'objet de noeud de la page peut être obtenu pour fonctionner avec le bouton droit ou pour effectuer une recherche rapide des propriétés de l' objet, comme le montre la figure 5 - 1.

![动图5-1](img/5-1.gif)  


(Figure 5 - 1)

####5.2 obtention d 'une liste d' objets de noeuds sur la page par une recherche de mots - clés

Procédé d 'acquisition de positionnement précis par rapport aux raccourcis claviers`对象查询`Un bouton (* icône loupe *) permet d 'obtenir une liste d' objets.

Lorsque vous cliquez sur l 'icône loupe, un nouveau panneau de requête d' objet apparaît et vous pouvez trouver l 'objet qui contient des mots clés dans le nom ou le class.Comme le montre la figure 5 - 2.

![图5-2](img/5-2.png) 


(Figure 5 - 2)

####5.3 recherche rapide du contenu des attributs dans un objet

Que l 'objet soit positionné par des raccourcis claviers ou des mots - clés, il est possible d' effectuer une recherche rapide sur la valeur d 'attribut par une fonction de recherche d' attributs.

Mode de fonctionnement`属性查询输入框`B**Input**Un ou plusieurs`属性名称`(plusieurs attributs doivent être séparés par une virgule anglaise)`按回车键`Permet d 'obtenir le contenu des attributs.Le mode de fonctionnement est indiqué dans la figure 5 - 3.

![动图5-3](img/5-3.gif)  


(Figure 5 - 3)



###Statistiques de performance

####6.1 statistiques relatives à la création d 'objets

Clic`对象`Bouton, vous pouvez obtenir des informations statistiques créées par l 'objet`对象名、当前运行创建的对象数量、当前运行距上次运行增加的对象数量`".Les données statistiques sont présentées dans la figure 6 - 1.

![图6-1](img/6-1.png)   


(Figure 6 - 1)

####6.2 détails statistiques sur la création d 'objets et incréments

Dans la liste d 'informations statistiques créée par l' objet, le bouton droit de la souris peut cliquer sur les détails de la statistique de requête et de la création incrémentielle, comme le montre la figure 6 - 2.

![图6-2](img/6-2.png)   


(Figure 6 - 2)

####6.3 statistiques du temps de travail

L 'unité de mesure du temps de rendu est milliseconde (MS) pour la recherche de l' utilisation consommée par le rendu actuel du jeu.Clic`渲染`Le bouton permet d 'obtenir des statistiques sur l' utilisation du temps de rendu du jeu actuel, comme le montre la figure 6 - 3.

![图6-3](img/6-3.png)   


(figures 6 à 3)



####6.4 Recalculation des statistiques

Clic`重绘`Ce bouton permet de consulter les rangées de données de la réinscription de la carte et de repeindre un grand nombre d 'objets devant.Les résultats sont présentés dans les figures 6 à 4.

![图6-4](img/6-4.png)   


(figures 6 à 4)



####6.5 statistiques de gestion des ressources

Clic`资源`Bouton & ‧‧;:%**Liste de caches de ressources**Voir les figures 6 à 5.

![图6-5](img/6-5.png)   


(figures 6 à 5)



###Menu fonctionnel du bouton droit

Dans le panneau de configuration, le bouton droit affiche le menu fonctionnel correspondant, comme le montre la figure 7.En particulier, les noeuds, les requêtes et les fichiers de fonction de touche droite pour les statistiques de performance, il faut avoir une bonne compréhension et une bonne maîtrise.

![图7](img/7.png) 


(Figure 7)



La fonction dans la touche droite est plus facile à comprendre.Les développeurs peuvent l 'expérience au cas par cas.On peut se concentrer ici.**Outil de noeud**Cet outil peut afficher / masquer le noeud sélectionné, afficher la chaîne de relation mousseeenable du noeud actif, afficher la chaîne de relation Size du noeud sélectionné, etc.Plus pratique et plus commode.

L 'outil de noeud fonctionne comme le montre la figure 8.

![动图8](img/8.gif)  


(Figure 8)



