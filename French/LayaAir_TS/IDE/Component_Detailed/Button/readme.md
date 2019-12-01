#Ensemble button

##Création d 'un ensemble button

L 'ensemble bouton (button) est l' un des éléments les plus couramment utilisés pour afficher des étiquettes de texte, des icônes ou les deux.Dans le layaairide, le nom de la ressource d 'image (peau du bouton) est généralement précédé de BTN, comme le montre la figure 1.

![图1](img/1.png) （图1）



###1.1 création directe de composants button avec des moteurs

La création d 'un composant button à l' aide du moteur layaair est relativement simple et ne nécessite généralement que quelques étapes pour charger les ressources, créer un exemple de button, ajouter button à la scène et définir les propriétés de l 'ensemble button.Réalisation concrète du Code et de la note de référence ci - dessous.

**Créer une catégorie d 'entrée gamemain.ts, avec le code suivant:**


```typescript

// 程序入口
class GameMain{
    //按钮资源路径
    private skin:string = "button.png";
    constructor()
    {
        //初始化引擎，设置宽高并开启WebGL渲染模式
        Laya.init(600,400,Laya.WebGL);
        //设置舞台背景颜色
        Laya.stage.bgColor = "#ffffff";
        //加载资源成功后，执行onLoaded回调方法
        Laya.loader.load(this.skin,Laya.Handler.create(this,this.onLoaded));
    }
    private onLoaded():void{
        //创建一个Button实例
        var btn:Laya.Button = new Laya.Button(this.skin);
        //将Button添加到舞台上
        Laya.stage.addChild(btn);
        //设置Button相关属性
        btn.width = 100;
        btn.height = 50;
        btn.pos(100,100);
        btn.label = "按钮";
    }
}
new GameMain();
```


L'effet d'exploitation du Code est illustré à la figure 2:

![动图2](img/2.gif)< br / > (Figure 2)

**Tips:**L 'interface d' attributs du composant button[Button API](http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ui.Button)".



###1.2 utiliser layaairide pour créer button

Il est plus simple de créer un button à l 'aide de layaairide, ce qui permet d' obtenir la création et la configuration du composant sans avoir besoin d 'une base de programme, ainsi que le mode de création du composant recommandé pour utilisation.Ci - dessous, nous utilisons layaairide pour créer un diagramme d 'action 1.

Première étape: création d 'une page Demo ui dans le gestionnaire de ressources pour glisser une ressource d' un composant de bouton vers l 'éditeur de scène, comme le montre la figure 3.

![图3](img/3.png)< br / > (Figure 3)

Deuxième étape: définir les propriétés du composant, comme le montre la figure 3

![图3](img/4.png) <br />(图4)


Une fois que les deux étapes ci - dessus ont été définies, l 'effet tel que le diagramme actif 2 peut être directement visible dans l' IDE.Aucun codage de programme n 'est nécessaire dans ce processus et peut être donné aux beaux - arts ou à la planification.Cela permet de réduire les coûts de communication avec l 'programmeur et d' accélérer l 'efficacité de développement du jeu.



##Description des propriétés des composants button

Le document ci - dessous met l 'accent sur les attributs communs de base de l' ensemble button et sur les attributs incompréhensibles du texte.Pour les attributs plus faciles à comprendre, le présent document ne mentionnera pas que l 'développeur peut placer la souris sur le nom de l' attribut du gestionnaire d 'attributs de l' IDE et qu 'il y aura une description de l' attribut en chinois tips.

###2.1 bouton peau (Skin)

La peau est divisée en trois états, deux états et un état unique en raison de la façon dont elle est découpée.L 'état de la peau du bouton.

Trois états divisent les images de la peau en trois parties dans une direction verticale, divisées en parts égales, comme le montre la figure 1.**De haut en bas**Successivement`弹起或离开状态`Peau`经过状态`Peau`按下和选中`(* maintenez le bouton ∗) état de la peau, les trois états étant souvent utilisés dans le navigateur PC.

Sur un dispositif mobile, l 'image est généralement coupée en deux parties dans une direction verticale, la partie supérieure étant`弹起或离开状态状态`Peau n.`经过和按下以及选中状态`(* maintenez le bouton ∗) sur la peau.

Un seul bouton ne coupe pas l 'image, quel que soit son état, il n' y a qu 'un seul bouton sur la peau qui reste inchangé.

###2.2 spécifier l 'état de coupe de la peau du bouton (statenum)

La valeur d 'attribut de statenum détermine le mode de découpe d' une image de ressource cutanée.La valeur par défaut est de 3, c 'est - à - dire que le rapport est divisé en trois parties.Dans le cas d 'un bouton bimodal, la valeur d' attribut de statenum doit être fixée à 2, le rapport étant coupé en deux parties.Le bouton monoforme est fixé à 1, sans coupure.

Notez ici que l 'état du bouton doit correspondre à celui de la peau du bouton.Si c 'est un bouton tridimensionnel sur la peau, statenum est fixé à 2, après coupure, comme le montre la figure 5, ce qui est erroné.

![图5](img/5.png)< br / > (Figure 5)



###2.3 indique l 'état sélectionné (Selected)

La propriété Selected est par défaut l 'état false non sélectionné.Une fois que l 'attribut Selected est défini comme vrai.Ce bouton maintiendra l 'état sélectionné (maintenir le bouton) sans changer les autres états (sauf si l' état est modifié dans le Code).

###2.4 État d 'affichage des boutons de commutation (TOGGLE)

La propriété TOGGLE est par défaut l 'état false non sélectionné.Une fois que l 'attribut TOGGLE est défini comme vrai.Lorsque vous cliquez sur l 'ensemble bouton, le bouton reste dans l' état sélectionné (maintenance du bouton).Cliquez à nouveau pour récupérer.

###2.5 définir la couleur du texte de bordure de button en fonction de l 'état (strokecolor)

Labelstrokecolor peut définir une couleur uniforme pour les bords de texte de button (les couleurs des différents états sont identiques).Les propriétés strokecolor peuvent définir la couleur de texte de bordure de button en fonction de différents états.

L 'ordre de réglage de la couleur strokecolor est le format suivant: upcolor (couleur de l' état d 'éjection ou de sortie), overcolor (couleur de l' état passé), downcolor (couleur de l 'état d' enfoncement et de l 'état sélectionné), disablecolor (couleur de l' emploi interdit).Comme le montre la figure 6.

![图6](img/6.png)< br / > (Figure 6)

*La valeur d 'attribut labelstroke de la largeur de bordure peut être plus grande si l' on veut que la couleur de bordure de description soit plus claire.*











