#Utilisation de scripts étendus

C'est souvent le cas lors de l'élaboration de projets; les composants fournis officiellement ne répondent pas à la demande, par exemple pour élargir la fonctionnalité de l'ensemble button, ajouter de nouvelles attributs et installer de nouveaux attributs dans l'IDE.Après la version layaairide1.4.0, deux scénarios sont proposés: un script étendu et un script supplémentaire.

​**Extension de script**D 'une manière héritée, l' extension de la fonction d 'un composant, la réalisation de sa propre logique, voire l' ajout de nouvelles propriétés, et l 'affichage de nouvelles propriétés dans l' IDE, la visualisation de nouvelles propriétés

​**Script supplémentaire:**Ajout d 'un comportement à un composant, ajout de nouvelles propriétés, affichage de nouvelles propriétés dans l' IDE, réglage visuel de nouvelles propriétés

Avec ce mode d 'extension, l' développeur peut modifier arbitrairement le comportement du composant, ajouter de nouvelles propriétés, visualiser une scène ui combinée au Code; plusieurs scripts d 'extension peuvent être ajoutés dans la même scène.

​**Distinction entre script étendu et script supplémentaire**Le script supplémentaire est un script qui commande le composant lui - même et qui modifie toute propriété du composant actif sans hériter.

​**Cet article nous ajouterons un script unique à plusieurs composants pour leur permettre de se déplacer à des vitesses et à des noms différents, afin de décrire en détail la méthode d 'utilisation du script étendu.L 'effet final est indiqué dans la figure ci - dessous (le carton est le résultat d' un logiciel d 'enregistrement basé sur l' effet réel):**

![0](img\0.gif)(图0)



###Page UI

Crée une nouvelle page ui appelée expandpage.Un composant Box est placé sur la page ui, une image est insérée dans l 'ensemble Box et un composant textuel; le nom du composant textuel est nommé usern et est enregistré de manière à définir la taille et l' alignement.Comme le montre la figure 1:

![1](img\1.png)(Figure 1)



###Créer un script extensible et ajouter une valeur à un composant

Dans la gestion de panneau Ui - créer un nouveau script, sélectionnez un script étendu (vous pouvez sélectionner une colonne de script dans la création d 'une page ui), et la classe logique correspondante du script est le nom d' exécution suivant.Comme le montre la figure 2:

![2](img\2.png)(图2)


Cliquez sur le bouton de détermination pour créer automatiquement un fichier.prop dans le panneau du projet, qui contient des attributs communs auxquels on peut se référer lorsqu 'on les ajoute, comme le montre la figure 3:

![3](img\3.png)(Figure 3)

Ajouter les attributs dont nous avons besoin dans l 'étiquette monkeypop, comme indiqué à la figure 4:

![4](img\4.png)(Figure 4)

Lorsque l 'édition de script étendu est terminée, l' interface ui est ouverte et, pour permettre à l 'développeur de visualiser les changements, le box est copié dans l' interface ui, comme le montre la figure 5:

![5](img\5.png)(Figure 5)

Le script d 'extension monkeyprop.prop produit est ensuite placé sur Box sous forme de traction, comme le montre la figure 6:

![6](img\6.gif)(Figure 6)

La liste hiérarchique et l 'interface ui ne peuvent pas être modifiées après avoir été remorquées sur l' ensemble, mais de nouvelles propriétés apparaissent dans la barre d 'attributs droite de l' ensemble box.Comme le montre la figure 7:

![7](img\7.png)(Figure 7)

Les valeurs Speed et username pour les trois composants sont augmentées de manière séquentielle, respectivement 1.2.3, appelées a, B et C; différentes valeurs sont également attribuées pour les propriétés d 'objet de ces trois composants.Après enregistrement, appuyez sur le raccourci F12 (Ctrl + F12) pour exporter l 'ui et créer un code dans le Code.



###Établissement de la logique de code

Ouvrir le fichier expandpageu après l 'importation du projet à flashbuilder révèle une erreur de déclaration et ne trouve pas de game.monkeyprop.Comme le montre la figure 8:

![8](img\8.png)(图8)


Ne vous inquiétez pas de cette erreur de présentation, car la classe logique correspondante du script monkeyprop dans le projet doit être créée par le développeur lui - même, car l 'éditeur ne l' a pas encore trouvée, ce qui entraîne une erreur de présentation.

Ensuite, on crée un paquet de jeux sous le catalogue SRC, puis on crée une classe de monkeyprop dans le sac de jeu.L 'ajout fait apparaître que les erreurs de présentation dans le fichier expandpage ont disparu, comme le montre la figure 9:

![9](img\9.png)(Figure 9)

Éditer les attributs supplémentaires dans le script d 'extension dans monkeypop, tous les codes étant les suivants:


```typescript

package game
{
	import laya.ui.Box;
	import laya.ui.Label;
	/**
	 * 扩展脚本对应的逻辑类
	 * @author mengjia
	 * 
	 */
	public class MonkeyProp extends Box
	{
		/**攻击速度（也可以不用定义该变量，在这里定义是为了打开该类的时候能够一目了然的看到对应的脚本中添加了哪些属性）**/
		public var speed:Number = 0;
		/**人物名称（也可以不用定义该变量，在这里定义是为了打开该类的时候能够一目了然的看到对应的脚本中添加了哪些属性）**/
		public var userName:String = "";
		/**记录状态**/		
		private var boo:Boolean = false;
		public function MonkeyProp()
		{
			//自定义的脚本会有时序问题，所以在此添加一个延时
			this.frameOnce(2,this,onFrame);
		}
		
		private function onFrame():void
		{
			//通过子元素的name值获取该对象
			var userN:Label = this.getChildByName("userN") as Label;
			//设置文本内容为属性栏中给的值
			userN.text = userName;
			this.frameLoop(1,this,onLoop);
		}
		/**
		 *设置帧循环，实现左右移动 
		 * 
		 */		
		private function onLoop():void
		{
			if(x<=0){
				boo = false;
				x+=speed;
			}
			else if(x<Laya.stage.width-this.width && boo == false){
				x+=speed;
			}
			else if(x>=Laya.stage.width-this.width || boo == true){
				x-=speed;
				boo = true;
			}
		}
	}
}
```


Enfin, dans la catégorie d 'entrée**N. B.: les ressources nécessaires doivent être préchargées avant que l'interface ui ne soit mise en service**):


```typescript

package {
	import laya.utils.Handler;
	
	import ui.ExpandPageUI;

	public class LayaSample {
		
		public function LayaSample() {
			//初始化引擎
			Laya.init(600, 700);
			//设置背景色
			Laya.stage.bgColor = "#ffcccc";
			//预加载资源
			Laya.loader.load("res/atlas/test.atlas",Handler.create(this,onLoaded));
			
		}		
		
		private function onLoaded():void
		{
			//实例化UI界面
			var ExpandPage:ExpandPageUI = new ExpandPageUI();
			//添加到stage上
			Laya.stage.addChild(ExpandPage);
			
		}
	}
}
```


Le résultat final est indiqué dans la figure 0 du début de l 'article.



