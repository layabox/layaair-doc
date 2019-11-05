#Créer un modèle d 'efficacité

###Modèle d 'action

Le modèle d 'effet dynamique est basé sur l' effet d 'animation de l' axe temporel, par prédiction de l 'effet d' animation, puis par addition de l 'effet à un composant.De sorte que le composant ne nécessite pas de codage, mais peut facilement obtenir le même effet d 'animation que le codage.Le modèle d 'effet dynamique ne peut pas être affiché de manière indépendante et ne peut être utilisé que comme modèle d' effet dynamique pour obtenir un effet d 'animation d' un composant sur une page ui.



###Fabrication et utilisation de modèles d 'action dynamique dans l' IDE

####2.1 création d 'un fichier modèle effectnimation

Dans le gestionnaire de projet, la souris`右键`- > choisir`新建`- >`动画`".Dans un nouveau panneau d 'animation, le type d' animation est sélectionné comme`EffectAnimation`".Comme nous voulons créer un modèle d 'effet d' échelle, l 'animation s' appelle scale, comme le montre la figure 1.

![1](img/1.png)< br / > (Figure 1)

Clic`确定`Créer un`scale.efc`En double cliquant sur ce fichier, nous voyons la scène d 'édition de l' animation telle qu 'elle apparaît dans la figure 2.

![2](img/2.png)< br / > (Figure 2)



####2.2 création de modèles d 'action

**Objectif: créer un modèle d 'effet d' animation réduit et récupéré d 'abord.**

**Mesure 1**Nous remorquons un composant image du gestionnaire de ressources`scale.efc`Éditeur de scèneComme le montre la figure 3.

![3](img/3.png)< br / > (Figure 3)



**Mesure 2**: cocher`动画编辑模式`, puis sélectionnez`第1帧`Et`Image`Composant pour créer une trame clé sur le composant avec le bouton droit.Comme le montre la figure 4.

![4](img/4.png)< br / > (Figure 4)



**Mesure 3**: sélectionner`第1帧`, dans le gestionnaire d 'attributs, la rotation et l' échelle`scaleX`Et`scaleY`Attributs`0.2`".Comme le montre la figure 5.Après définir la valeur des attributs,`Image`Les attributs d 'agrandissement sont automatiquement ajoutés dans l' axe temporel`scaleX`Et`scaleY`".* comme nous n 'avons pas besoin d' un effet de déplacement pour ce modèle d 'efficacité mobile, il suffit de créer une propriété x générée automatiquement par la trame principale pour supprimer directement *.

![5](img/5.png)< br / > (Figure 5)

**Tips**Il convient de noter qu 'il y a une différence importante entre le modèle d' effet dynamique et l 'animation d' axe temporel, c 'est - à - dire que l' effet d 'animation est invalidé si la première trame de l' effet d 'animation actuel du modèle d' effet dynamique est définie.Par exemple, si l 'on veut réduire l' ensemble d 'animation à 0,2 heure maximum dans l' animation d 'axe temporel, l' ensemble d 'animation peut être réduit directement à 0,2 dans la première trame, alors que dans le modèle d' effet dynamique, l 'effet d' agrandissement ne peut pas être placé directement dans la première trame et l 'effet d' agrandissement doit être défini dans d 'autres trames (par exemple, la première trame).



**Mesure 4**: créer une trame clef dans la treizième trame (voir la figure 4), avec une valeur d 'attribut scalex et scaley de 1, et afficher les effets de l' animation en cliquant sur le lecteur.

![6](img/6.png)< br / > (Figure 6)



####2.3 Utilisation de modèles d 'action dynamique dans l' IDE

**Mesure 1**: créer une page UI`EffectAnimation.ui`) puis faites glisser un composant button vers l 'éditeur de scène, comme le montre la figure 7 (* Note: dans le cas présent, l' ensemble button est sous le répertoire ui *).

![7](img/7.png)< br / > (Figure 7)



**Mesure 2**: glisser le modèle d 'effet de retrait (scale.efc) produit sous l' ensemble button, comme le montre la figure 8.

![8](img/8.gif)< br / > (Figure 8)



**Mesure 3**Pour réaliser l 'effet d' agrandissement central et pour que le bouton puisse voir plus clairement.Nous avons choisi`Button`Ensemble, dans le panneau d 'attributs, définissez les attributs de point d' axe`anchorX`Et`anchorY`Valeur`0.5`, puis paramétrer`Button`La position de l 'axe XY de la hauteur et de l' axe est indiquée à la figure 9.

![9](img/9.png)< br / > (Figure 9)

*L 'effet de point d' axe doit être défini dans les propriétés du composant dans l 'ui, et l' effet de point d 'axe dans le modèle d' effet d 'entraînement n' est pas valable pour le composant.*



**Mesure 4**: sélectionner`Button`Modèle d 'action dynamique sous composant, dans le panneau d' attributs à droite, définissez les attributs d 'événements qui déclenchent la lecture`playEvent`Valeur`mousedown`".Comme le montre la figure 10.

![10](img/10.png)< br / > (Figure 10)

**Mesure 5**Ainsi, le modèle d 'action dynamique a été mis au point.Appuyez sur le raccourci F9 pour ouvrir les paramètres du projet.La classe à laquelle le modèle d 'effet dynamique est utilisé est importée à l' emplacement de la classe D 'importation uiode, faute de quoi il y a erreur de rapport.Voir la figure 11.La page ui est ensuite exportée en cliquant sur F12 (ou Ctrl + F12) pour être utilisée dans le projet.

![11](img/11.gif)< br / > (Figure 11)



###Démonstration de l 'effet du modèle d' action dans un projet

Créer un`Mian.ts`Fichier cité dans index.html.Éditer le code suivant:


```typescript

class Main {
    constructor() {
        //初始化舞台
        Laya.init(1334,750);
        //设置舞台背景色
        Laya.stage.bgColor = "#ffffff";
		//加载图集资源，加载成功后将UI界面添加到舞台上
        Laya.loader.load("./res/atlas/ui.atlas",Laya.Handler.create(this,this.onLoaded));
    }
    private onLoaded():void{
        //实例化导出的UI类
        var efc:ui.EffectAnimationDemoUI = new ui.EffectAnimationDemoUI();
        //添加到舞台
        Laya.stage.addChild(efc);
    }
}new Main();
```


Lorsque le bouton est actionné, l 'effet de l' animation est indiqué dans la figure 12:

![12](img/12.gif)<br/>(图12)







###Création de modèles d 'action multiples

Après avoir appuyé sur le bouton pour augmenter l 'effet d' animation à partir d 'une petite échelle, nous pouvons fabriquer un autre modèle d' action pour obtenir un effet de réduction lors de l 'impact.On obtient ainsi une démonstration continue de l 'effet d' animation en appuyant sur le bouton et en tirant sur l 'état de transfert rapide.

Tout d 'abord, nous créerons un autre fichier modèle d' effet dynamique.Ce modèle d 'effet mobile étant directement réduit, il n' est nécessaire que deux trames clefs, comme le montre la figure 13.`第12帧`Attributs de zoom`scaleX`Et`scaleY`La valeur`0.2`".

![13](img/12.png)< br / > (Figure 13)



Puis, sur la page ui, faites glisser le modèle d 'action vers`Button`Sous composant`playEvent`Attribut`mouseup`".Comme le montre la figure 14.

![14](img/13.png)< br / > (Figure 14)



Enregistre Enfin, exporte l 'ui en fonction de F12, puis compile à nouveau le Code précédent dans le projet.Comme le montre la figure 15, l 'effet d' animation est très lisse en cas d 'événement continu de maintenance et d' éjection.

![15](img/15.gif)< br / > (Figure 15)



Ainsi, le Programme d 'enseignement de base pour l' efficacité est terminé et les développeurs peuvent utiliser la fonction de modèle d 'action de layaairide pour développer rapidement l' effet d 'animation de divers composants.