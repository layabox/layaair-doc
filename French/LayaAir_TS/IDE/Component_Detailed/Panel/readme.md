#Référence de module Panel

Panel est une catégorie de récipients de panneau à fonction de coupe, souvent utilisée pour définir la zone d 'affichage des éléments.L 'élément à afficher peut être ajouté directement au récipient Panel, la largeur de Panel étant la largeur que l' élément doit afficher.

###Création d 'un composant Panel par layaairide

**1.1 remorquage de l 'ensemble Panel dans la zone d' édition**

L 'ensemble panel est traîné dans la page ui à partir du dossier ui du panneau de composant droit de gestion de ressources IDE.Comme le montre la figure 1:

![1](img\1.gif)</br>(图1)


La largeur du Panel (par exemple: 100 * 100).Double - cliquez sur l 'ensemble Panel dans l' interface UI pour insérer une image.Afficher les résultats et la structure hiérarchique, comme le montre la figure 2:

![2](img\2.png)< / BR > (Figure 2)

La figure 2 montre que l 'image introduite a été coupée et que la hauteur de la largeur finalement affichée est la hauteur de la largeur du conteneur panel.Ainsi, nous pouvons ajuster directement les coordonnées de l 'image de manière à modifier son contenu.



**1.2 conversion directe d'éléments d'affichage en conteneurs Panel**

Pour préparer une image sur l 'interface ui, sélectionnez l' image et appuyez sur le raccourci Ctrl + B pour convertir le conteneur panel.Comme le montre la figure 1 - 1:

![1-1](img\1-1.png)</br>(图1-1)


Cliquez pour définir une largeur de 100 * 100 pour Panel (après conversion, l 'image est automatiquement convertie en sous - classe Panel).Effet d 'affichage et hiérarchie

**1.3 ajouter une barre de défilement pour afficher**

L 'ensemble panel peut également définir une barre de défilement;**À l 'exception de l' ensemble List, panel est le seul emballage pouvant contenir une barre de défilement.**".Ici, nous pouvons définir une barre de défilement pour panel.

Définit une barre de défilement pour Panel, comme le montre la figure 3:

![3](img\3.png)< / BR > (Figure 3)

Ctrl + F12 (ou F12) exporte l 'interface ui, précharge des ressources dans le Code et mise à jour de l' interface ui.Les résultats définitifs sont indiqués dans la figure 4:

![4](img\4.gif)< / BR > (Figure 4)



##Création d 'un composant Panel par Code

Outre les opérations qui peuvent être visualisées directement dans l 'interface ui, il est facile d' obtenir l 'effet ci - dessus dans le Code.

Les résultats obtenus par Code sont indiqués dans la figure 5:

![5](img\5.gif)</br>(图5)


**Exemple:**


```typescript

class PanelTest {
    constructor() {
        //初始化引擎
        Laya.init(800, 600);
        //预加载所需资源
        Laya.loader.load("res/atlas/comp.atlas", Laya.Handler.create(this, this.onLoaded));
    }
    private onLoaded(): void {
        //实例化Panel组件
        var panel: Laya.Panel = new Laya.Panel();
        //给panel添加背景色
        panel.graphics.drawRect(0, 0, 100, 100, "#ffcccc");
        //给panel设置宽高
        panel.size(100, 100);
        //给panel设置滚动条皮肤
        panel.vScrollBarSkin = "comp/vscroll.png";
        //将panel添加到stage上
        Laya.stage.addChild(panel);

        //实例化Image组件
        var img: Laya.Image = new Laya.Image();
        //给image添加皮肤
        img.skin = "comp/image.png";
        //将image添加到panel组件中
        panel.addChild(img);
    }
}
new PanelTest();
```


