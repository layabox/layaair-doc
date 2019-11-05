#Utilisation de l 'animation swf dans le moteur layaair

###Conditions préalables à l 'utilisation des animations swf dans les moteurs layaair

Afin d 'appuyer la transposition rapide du projet flash dans le projet HTML5, le moteur layaair fournit un outil de conversion des fichiers SWF originaux en formats identifiables du moteur layaair, mais un outil de conversion**Ne supporte pas l 'inclusion de contenus spéciaux tels que le texte, la forme, le masque et le code dans un fichier swf**".Si le contenu ci - dessus est inclus, la conversion ne peut pas produire l 'effet ou l' échec de la conversion dans l 'ancien SWF.



> Si l 'auteur ne connaît pas bien la production et l' exportation des fichiers d 'animation flash et SWF, il n' est pas nécessaire de continuer à lire le présent document et il est recommandé d 'utiliser layaairide pour produire des animations.
]



###Conversion de l 'animation swf en un format d' identification du moteur layaair

Préparez les fichiers d 'animation conformes aux normes de conversion SWF, puis ouvrez le modèle de conception de layaairide.

Menu de sélection`工具`- >`SWF转换`Le panneau d 'outil de conversion swf peut être ouvert, comme le montre la figure 1.

![图1](img/1.png) 


(Figure 1)

Nouvelle ouverture`SWF转换`Dans le panneau, faites glisser l 'animation ou le dossier swf conformément aux spécifications de conversion, comme indiqué dans la figure 2.

![动图2](img/2.gif)  


(Figure 2)

Clic`开始转换`Voir figure 3.Par défaut, un répertoire de niveau swf est créé.`output`Table des matières, une fois la conversion réussie, un nouveau fichier swf et un nouveau fichier d 'Atlas sont générés dans le répertoire Output, ainsi qu' un dossier d 'images (* Lorsque vous cochez les options d' un atlas emballé, le dossier d 'images ne sera pas utilisé en mode graphique *).

![动图2](img/3.gif)   




(Figure 3)

**Tips**- Oui.

- si le fichier swf est complexe, plusieurs bitmap sont générés et il est donc recommandé de`开始转换`Sélection confirmée avant`是否打包为图集`".

- généré par défaut dans le répertoire Output, l 'développeur peut cliquer sur la barre de chemin d' entrée`更改`Modifier le Répertoire de sortie

- le nouveau swf généré par l'outil de conversion ne peut pas être réintroduit.

​



###Utilisation d 'animations swf converties

####3.1 transposer les ressources swf converties aux projets

Avant d 'utiliser l' animation SWF, nous avons créé l 'outil de conversion`.swf`Fichier de format`图集文件`Reproduit dans le catalogue des ressources du projet (* Le présent exemple est les RES / swf / table des matières * du Répertoire des sources du projet), comme indiqué dans la figure 4.

![图4](img/4.gif)  


(Figure 4)

**Tips**- Oui.

##- dans le diagramme 4, les dossiers ne sont pas reproduits dans le cas présent et, s' il n 'y a pas d' Atlas, un seul dossier swf et une seule ressource d 'image sont créés, ce qui rend nécessaire la reproduction du dossier dans le passé.Il convient de noter que le dossier layaairide n 'est pas pris en charge par le glisser - déposer et que, si le dossier est copié, il faut ouvrir le gestionnaire de ressources du système pour copier l' adhésif dans le système.



####3.2 connaissance de l'API sur la diffusion d'animations swf: movieclip

Utilisation de l 'animation swf convertie dans le moteur layaair**Movieclip**, l 'API indique, comme le montre la figure 5, le lien API:[https://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ani.swf.MovieClip](https://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ani.swf.MovieClip)

![图5](img/5.png) 


(Figure 5)

####3.3 diffusion d 'animations swf par Code

Un exemple de diffusion d 'une animation SWF, comme indiqué dans le code suivant:

Catégorie d 'entrée


```java

package  
{
	import laya.ani.swf.MovieClip;
	
	public class MovieClipSample 
	{
		
		public function MovieClipSample() 
		{
			//初始化舞台
			Laya.init(1334, 750);
			
			//创建一个 MovieClip 实例
			var mc:MovieClip = new MovieClip();
			
			//添加到舞台
			Laya.stage.addChild(mc);
			
			//加载swf资源,load方法的第二个参数不设置为散图模式加载，设置为true是采用图集方式加载。
			mc.load("res/swf/monkey.swf",true);

		}
	}
}
```

