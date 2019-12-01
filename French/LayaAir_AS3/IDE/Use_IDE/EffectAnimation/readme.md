#Créer un modèle d 'efficacité

###Modèle d 'action

Le modèle d 'effet dynamique est basé sur l' effet d 'animation de l' axe temporel, par prédiction de l 'effet d' animation, puis par addition de l 'effet à un composant.Le composant n 'a pas besoin d' être codé, mais l 'effet d' animation correspondant est facilement réalisé.Le modèle d 'effet dynamique ne peut pas être affiché de manière indépendante et ne peut être utilisé que comme modèle d' effet dynamique pour obtenir un effet d 'animation d' un composant sur une page ui.



###Fabrication et utilisation de modèles d 'action dynamique dans l' IDE

####2.1 création d 'un fichier modèle effectnimation

Dans le gestionnaire de projet, la souris`右键`- > choisir`新建`- >`动画`".Dans un nouveau panneau d 'animation, le type d' animation est sélectionné comme`EffectAnimation`".Comme nous voulons créer un modèle d 'effet d' échelle`scale`Voir la figure 1.

![图1](img/1.png) <br />（图1）


Clic`确定`Créer un`scale.efc`En double cliquant sur ce fichier, nous voyons la scène d 'édition de l' animation telle qu 'elle apparaît dans la figure 2.

![图2](img/2.png)< br / > (Figure 2)



####2.2 création de modèles d 'action

**Objectif: créer un modèle d 'effet d' animation réduit et récupéré d 'abord.**

**Mesure 1**Nous remorquons un composant image du gestionnaire de ressources`scale.efc`Éditeur de scèneComme le montre la figure 3.

![图3](img/3.png) <br /> (图3)




**Mesure 2**: cocher`动画编辑模式`, puis sélectionnez`第1帧`Et`Image`Ensemble, touche droite sur le composant`创建关键帧`".Comme le montre la figure 4.

![图4](img/4.png)< br / > (Figure 4)



**Mesure 3**: sélectionner`第1帧`, dans le gestionnaire d 'attributs, la rotation et l' échelle`scaleX`Et`scaleY`Attributs`0.2`".Comme le montre la figure 5.Lorsque les valeurs d 'attribut sont définies, les propriétés scalex et scaley sont automatiquement ajoutées à l' axe temps image.* comme nous n 'avons pas besoin d' un effet de déplacement pour ce modèle d 'efficacité mobile, il suffit de créer une propriété x générée automatiquement par la trame principale pour supprimer directement.*

![图5](img/5.png)< br / > (Figure 5)

**Tips**Il convient de noter qu 'il y a une différence importante entre le modèle d' effet dynamique et l 'animation d' axe temporel, c 'est - à - dire que l' effet d 'animation est invalidé si la première trame de l' effet d 'animation actuel du modèle d' effet dynamique est définie.Par exemple, dans l 'animation d' axe temporel, on peut réduire l 'ensemble d' animation directement à 0,2 dans la première trame, alors que dans le modèle d 'effet dynamique, l' effet d 'agrandissement ne peut pas être placé directement dans la première trame et il faut définir un effet d' agrandissement cible (* 0,2 *) dans les autres trames (* par exemple, la première trame *).



**Mesure 4**: création d 'une trame clef dans la trame 13 (voir fig. 4), réglage`scaleX`Et`scaleY`Valeur d 'attribut`1`, cliquez sur la lecture pour prédire l 'effet d' animation.

![图6](img/6.png)< br / > (Figure 6)



####2.3 Utilisation de modèles d 'action dynamique dans l' IDE

**Mesure 1**: créer une page UI`EffectAnimation.ui`) Puis glisser un composant button vers l 'éditeur de scène, comme le montre la figure 7 (*: dans ce cas, l' ensemble button est sous le répertoire ui *).

![图7](img/7.png) <br /> （图7）




**Mesure 2**: faites glisser le modèle d 'effet de retrait (scale.efc) produit sous l' ensemble button, comme indiqué dans l 'animation 8.

![图8](img/8.gif)< br / > (Figure 8)



**Mesure 3**Pour réaliser l 'effet d' agrandissement central et pour que le bouton puisse voir plus clairement.Nous avons sélectionné l 'ensemble button, dans le panneau d' attributs, définissez les attributs de point d 'axe`anchorX`Et`anchorY`Valeur`0.5`, puis définissez la position de l 'axe XY de la largeur de button et du point de l' axe, comme le montre la figure 9.

![图9](img/9.png)< br > (Figure 9)

*L 'effet de point d' axe doit être défini dans les propriétés du composant dans l 'ui, et l' effet de point d 'axe dans le modèle d' effet d 'entraînement n' est pas valable pour le composant.*



**Mesure 4**: Sélectionnez un modèle d 'effet dynamique sous l' ensemble button et définissez les attributs d 'événement qui déclenchent la lecture dans le panneau d' attributs à droite`playEvent`Valeur`mousedown`".Comme le montre la figure 10, la page ui est exportée en cliquant sur F12 pour être utilisée dans le projet.

![图10](img/10.png)< br / > (Figure 10)





###Démonstration de l 'effet du modèle d' action dans un projet

Créer un`Main.as`Type d 'entrée et configure l' application par défaut.Éditer le code suivant:




```java

package
{
	import laya.net.Loader;
	import laya.utils.Handler;
	import ui.EffectAnimationDemoUI;

	
	public class Main
	{
		public function Main()
		{
			//初始化舞台
			Laya.init(1334,750);
			//设置舞台背景色
			Laya.stage.bgColor = "#ffffff"    
			
			//加载图集资源，加载成功后添加到舞台
			Laya.loader.load("./res/atlas/ui.atlas",Handler.create(this,onLoaded));
			
		}
		
		private function onLoaded():void
		{	
			//实例导出的UI类
			var efc:EffectAnimationDemoUI = new EffectAnimationDemoUI();
			
			//添加到舞台
			Laya.stage.addChild(efc);
		}
	}
}
```


Lorsque le bouton est actionné, l 'effet de l' animation est indiqué dans la figure 11:

![图11](img/11.gif)< br / > (Figure 11)



###Création de modèles d 'action multiples

Après avoir appuyé sur le bouton pour augmenter l 'effet d' animation à partir d 'une petite échelle, nous pouvons fabriquer un autre modèle d' action pour obtenir un effet de réduction lors de l 'impact.On obtient ainsi une démonstration continue de l 'effet d' animation en appuyant sur le bouton et en tirant sur l 'état de transfert rapide.

Tout d 'abord, nous créerons un autre fichier modèle d' effet dynamique qui est directement réduit.Il suffit de deux trames clefs, comme le montre la figure 12.`第12帧`, les propriétés seront mises à l 'échelle`scaleX`Et`scaleY`La valeur`0.2`".

![图12](img/12.png) <br /> (图12)




Puis, sur la page ui, faites glisser le modèle d 'action sous l' ensemble button et définissez`playEvent`Attribut`mouseup`".Comme le montre la figure 13.

![图13](img/13.png)< br / > (Figure 13)



Après l 'enregistrement final, l' ui est exporté en fonction de F12, puis le Code qui vient d 'être compilé dans le projet.Comme l 'indique la figure 14, l' effet d 'animation est très lisse en cas d' événement continu d 'appui et d' éjection.

![图13](img/14.gif)< br / > (Figure 14)

Ainsi, le Programme d 'enseignement de base pour l' efficacité est terminé et les développeurs peuvent utiliser la fonction de modèle d 'action de layaairide pour développer rapidement l' effet d 'animation de divers composants.



