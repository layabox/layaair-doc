#Le moteur layaair diffuse l'animation squelettique de Spine.

> Cette page est tirée de la version layaairide 1.7.6 de la note d 'infographie.

L 'animation squelette Spine est l' une des animations squelettiques fréquemment utilisées dans le jeu.



###Attention in the Export of Spine bone Animation

La version originale de l 'animation squelettique Spine est exportée avec un certain nombre de questions qui appellent l' attention, faute de quoi la conversion ne sera pas achevée.

####1.1 seules les transformations exportées en format json sont prises en charge

L 'animation squelettique Spine supporte les deux modes d' exportation de données json et binaire, et il convient de noter que l 'outil de conversion Spine de layaairide ne supporte que la conversion du format json.Sélectionnez le format json pour exporter.

####1.2 créer un atlas lors de l 'exportation

L 'outil de conversion Spine de layaairide ne prend en charge que la conversion d' animation squelette Spine en mode d 'Atlas et doit donc être sélectionné pour être exporté à l' aide de l 'outil d' édition d 'animation squelette Spine.`创建图集`Voir la figure 1.

![图1](img/1.png) 


Figure 1 interface d 'exportation d' un outil d 'édition d' animation squelettique Spine

####1.3 Les options de rotation ne peuvent pas être cochées dans les paramètres d 'emballage d' Atlas

Création d 'un outil d' édition d 'animation squelette`设置`Le bouton entre dans l 'interface Pack settings.Pour confirmer les paramètres de la zone`旋转`L 'option n' est pas cochée.Cocher`旋转`Après l 'option layaairide, l' outil Spine ne peut pas être converti avec succès.

![图2](img/2.png) 


Figure 2 interface de réglage d 'emballage d' images dérivées de l 'animation squelettique de Spine

####1.4 attention à la version Spine exportée

Toutes les versions Spine ne sont pas favorables à la conversion.Le numéro de version supporté est affiché sur le panneau d 'outil de conversion Spine.À la fin de ce document, Spine avait pris en charge la version 3.4.0.2 à la version 3.6.16.Le layaairide est suivi d 'une mise à jour périodique du support de version Spine, les développeurs pouvant s' intéresser à la modification de l' état de support de version sur le panneau d 'outil de conversion.

####1.5 conversion de l'ensemble du Répertoire exporté

Exporter le fichier généré`atlas,json,png`Les fichiers au format sont présentés dans la figure 3.Il convient de noter que lorsque l 'outil de conversion est utilisé, les fichiers ne doivent pas être directement ralentis pour être convertis et que l' ensemble du Répertoire de niveau parent (* par exemple, le répertoire Spine dans la figure 3 *) doit être inséré dans le tableau de conversion.

![图3](img/3.png) 


(Figure 3)



###Conversion de l 'animation Spine en un format d' identification du moteur layaair

####2.1 ouverture du panneau d 'outils de conversion

À layaairide.`设计模式`, cliquez sur la barre de menu`工具`- >`Spine动画转换`, vous pouvez l 'ouvrir comme le montre la figure 4.`Spine格式转换`Des outils.

![图4](img/4.png) 


(Figure 4)


C'est ouvert.`Spine格式转换`Dans le panneau d 'outils, les numéros de version Spine supportant la conversion figurent entre parenthèses à l' arrière de Spine en haut et, comme le montre la figure 5, la conversion de l 'animation Spine - 3.4.0.2 et 3.6.16 en un format supporté par le moteur layaair est actuellement prise en charge.

![图5](img/5.png) 


(Figure 5)




####2.2 création de fichiers d 'animation squelettique avec un suffixe SK

Ouvre.`Spine格式转换`Après le panneau d 'outils, le Répertoire de ressources exporté par Spine est glissé dans le panneau de conversion ou cliquez sur le bouton de navigation pour sélectionner le Répertoire de ressources exporté par Spine.Puis cliquez`确定`, un nouveau fichier d 'animation squelettique peut être généré sous l' inventaire des ressources d 'origine.Comme le montre la figure 6.

![图6](img/6.png) 


(Figure 6)



###Affichage de chargement d 'animation Spine

####3.1 copier les ressources d 'animation Spine converties dans le répertoire correspondant au projet.

Outre la conversion des fichiers de format.sk générés, les ressources d 'Atlas des suffixes.png doivent être copiées dans le répertoire des projets, comme le montre la figure 7.* Les autres fichiers exportés ne sont pas pris en compte, mais uniquement pour les outils de conversion.*

![图7](img/7.png) 


(Figure 7)

####3.2 exemples d'animation Spine

L 'exemple suivant sera utilisé`laya.ani.bone.Skeleton`Catégorie, l 'API précise que les liens peuvent être consultés directement:[https://layaair.ldc.layabox.com/api/?category=Bone&class=laya.ani.bone.Skeleton](https://layaair.ldc.layabox.com/api/?category=Bone&class=laya.ani.bone.Skeleton)

Crée la classe de document spinedemo.as, le Code étant rédigé comme suit:


```java

package
{
	import laya.ani.bone.Skeleton;

	public class SpineDemo
	{
		public function SpineDemo()
		{
			//初始化舞台
			Laya.init(1334, 750);
			
			//创建一个Skeleton对象
			var skeleton:Skeleton = new Skeleton();
			//添加到舞台
			Laya.stage.addChild(skeleton);
			
			skeleton.pos(600,700);
			
			//通过加载直接创建动画
			skeleton.load("res/spine/spineboy/spineboy.sk");
		}
	}
}
```

Les effets de fonctionnement sont indiqués à la figure 8.

![动图8](img/8.gif) 


(Figure 8)

