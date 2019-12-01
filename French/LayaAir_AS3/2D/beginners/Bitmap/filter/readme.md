#Set Filter Effect

> le moteur layaair produit trois effets: un filtre couleur, un filtre électroluminescent (ou ombre) et un filtre flou.Le filtre couleur supporte le mode Canvas et le mode webgl, alors que le filtre Luminescent et le filtre flou ne supportent que le mode webgl en raison de leur forte consommation de performances.



##Paramétrer un filtre couleur

###1.1 aperçu des filtres de couleur API

Le colorfilter color filter est situé dans le paquet laya.filters et modifie les canaux de couleurs par l 'intermédiaire d' une matrice spécifiée (* matrice disposée en 4 x 5 *).

Clic[laya.filters.ColorFilter ](http://layaair.ldc.layabox.com/api/index.html?category=Filter&class=laya.filters.ColorFilter)Voir la note API.



###1.2 Mise en place de filtres de couleur

Pour installer un filtre de couleur pour un bitmap, il faut d 'abord définir une matrice de couleurs, puis créer un exemple de filtre de couleur au moyen du procédé colorfilter, comme indiqué dans le code suivant:


```java

//颜色矩阵，红色
var colorMatrix:Array = 
[
  1, 0, 0, 0, 0, //R
  0, 0, 0, 0, 0, //G
  0, 0, 0, 0, 0, //B
  0, 0, 0, 1, 0, //A
];

//创建颜色滤镜
var redFilter:ColorFilter = new ColorFilter(colorMatrix)
```


Enfin, l 'effet du filtre couleur est superposé dans la carte de bits par les propriétés filters de spriter.Nous créerons ci - après une catégorie d 'entrée main.as, conçue comme une application par défaut (recommandée avec flashbuilder), qui produit le code suivant:


```java

package
{
	import laya.display.Sprite;
	import laya.filters.ColorFilter;

	public class Main
	{
		public function Main()
		{
			//初始化舞台
			Laya.init(1334,750);                
			//设置舞台背景色
			Laya.stage.bgColor  = "#ffffff";
			
			//原始位图
			createImg(100,50);
			//红色滤镜
			creteRedFilter();
			//灰色滤镜
			createGrayFilter();
		}
		
		/**创建红色滤镜位图**/
		private function creteRedFilter():void
		{
			//颜色滤镜矩阵,红色
			var colorMatrix:Array = 
				[
					1, 0, 0, 0, 0, //R
					0, 0, 0, 0, 0, //G
					0, 0, 0, 0, 0, //B
					0, 0, 0, 1, 0, //A
				];
			
			//创建红色颜色滤镜
			var redFilter:ColorFilter = new ColorFilter(colorMatrix);
              
            //在坐标280,50位置创建一个位图
			var img:Sprite = createImg(280,50); 
			//添加红色颜色滤镜效果
			img.filters = [redFilter];
		}	
		
		
		/**创建灰色滤镜位图**/
		private function createGrayFilter():void
		{
			//颜色滤镜矩阵,灰色
			var colorMatrix:Array = 
				[
					0.3086, 0.6094, 0.0820, 0, 0,  //R
					0.3086, 0.6094, 0.0820, 0, 0, //G
					0.3086, 0.6094, 0.0820, 0, 0,  //B
					0, 0, 0, 1, 0, //A
				];
			//创建灰色颜色滤镜
			var GrayFilter:ColorFilter = new ColorFilter(colorMatrix);
          
			//在坐标460,50位置创建一个位图
			var img:Sprite = createImg(460,50); 	
			//添加灰色颜色滤镜效果
			img.filters = [GrayFilter];
		}
		
		/**创建位图**/
		 private function createImg(w:int,h:int):Sprite
		{
			 var Img:Sprite = new Sprite(); 
			 
			 //添加到舞台
			 Laya.stage.addChild(Img);   
			 
			 //加载显示图片
			 Img.loadImage("res/img/monkey1.png",w,h); 
			 
			 return Img;
		}
	}
}
```


Dans le code ci - dessus, nous avons créé un bitmap original, un bitmap d 'effet de filtre rouge et un bitmap d' effet de filtre gris.Les résultats opérationnels sont indiqués à la figure 1:

![图1](img/1.png) 
 (图1)











##Set Light and Shadow Filter

###2.1 Aperçu des filtres électroluminescents

Un glowfilter de type filtre électroluminescent, situé dans un paquet laya.filters, peut également être utilisé comme filtre d 'ombre en ajustant l' angle de décalage de la lumière, comme indiqué dans la figure 2.Remarque: le filtre ne fonctionne que dans le mode webgl.

![图2](img/2.png)< br / > (Figure 2)

Clic[laya.filters. GlowFilter](http://layaair.ldc.layabox.com/api/index.html?category=Filter&class=laya.filters.GlowFilter)Voir la note API.



###2.2 installation de filtres électroluminescents et de filtres d 'ombre

Les filtres lumineux et les filtres d 'ombre sont plus faciles à installer, nous visons directement les effets de l' exemple par codage.

Crée d 'abord une catégorie d' entrée main.as et définit comme une application par défaut (recommandée avec flashbuilder) pour produire le code suivant:


```java

package
{
	import laya.display.Sprite;
	import laya.filters.GlowFilter;
	import laya.webgl.WebGL;

	public class Main
	{
		public function Main()
		{
			//初始化舞台
			Laya.init(1334,750,WebGL);                
			//设置舞台背景色
			Laya.stage.bgColor  = "#ffffff";
			
			//原始位图
			createImg(100,50);			
			//发光滤镜
			creteGlowFilter();			
			//阴影滤镜
			createShadeFilter();
		}
		
		/**创建发光滤镜位图**/
		private function creteGlowFilter():void
		{			
			//创建发光滤镜
			var glowFilter:GlowFilter = new GlowFilter("#ff0000", 15, 0, 0)
			//在坐标280,50创建位图
			var img:Sprite = createImg(280,50); 		
			//添加发光滤镜
			img.filters = [glowFilter];
			
		}	
		
		
		/**创建阴影滤镜位图**/
		private function createShadeFilter():void
		{
			//创建阴影滤镜
			var glowFilter:GlowFilter = new GlowFilter("#000000", 8, 8, 8)
			//在坐标460,50创建位图
			var img:Sprite = createImg(460,50);			
			//添加阴影滤镜
			img.filters = [glowFilter];				
		}
		
		/**创建位图**/
		 private function createImg(w:int,h:int):Sprite
		{
			 var Img:Sprite = new Sprite(); 			 
			 //添加到舞台
			 Laya.stage.addChild(Img);   			 
			 //加载显示图片，坐标位于100,50
			 Img.loadImage("res/img/monkey1.png",w,h); 			 
			 return Img;
		}
	}
}
```


Dans le code ci - dessus, nous avons créé un bitmap original, un bitmap d 'effet de filtre électroluminescent et un bitmap d' effet de filtre d 'ombre.Les résultats opérationnels sont indiqués à la figure 3:

![图3](img/3.png)< br / > (Figure 3)



##Installer un filtre flou

###3.1 brève description des filtres ambigus API

Le type de filtre flou blurfilter est situé dans le paquet laya.filters et, en réglant la résistance du filtre flou par rapport au paramètre Strength, la valeur est plus grande que le filtre flou.Les paramètres sont indiqués à la figure 4.Remarque: le filtre ne fonctionne que dans le mode webgl.

![图4](img/4.png)< br / > (Figure 4)

Clic[laya.filters. BlurFilter](http://layaair.ldc.layabox.com/api/index.html?category=Filter&class=laya.filters.BlurFilter)Voir la note API.



###3.2 installation de filtres flous

La configuration du filtre flou est relativement simple, on crée un exemple de filtre flou, puis on définit la résistance du flou et on le superpose à un bitmap.

Crée d 'abord une catégorie d' entrée main.as et définit comme une application par défaut (recommandée avec flashbuilder) pour produire le code suivant:


```java

package
{
	import laya.display.Sprite;
	import laya.filters.BlurFilter;
	import laya.webgl.WebGL;
	
	public class Main
	{
		public function Main()
		{
			//初始化舞台
			Laya.init(1334,750,WebGL);                
			//设置舞台背景色
			Laya.stage.bgColor  = "#ffffff";
			
			//原始位图
			createImg(100,50);			
			//模糊滤镜
			createBlurFilter();			
	
		}
		
		/**创建糊滤滤镜位图**/
		private function createBlurFilter():void
		{			
			//创建模糊滤镜实例
			var blurFilter:BlurFilter = new BlurFilter();
			//设置模糊强度
			blurFilter.strength = 5;
			//在坐标280,50创建位图
			var img:Sprite = createImg(280,50); 		
			//添加滤镜效果
			img.filters = [blurFilter];
			
		}	

		
		/**创建位图**/
		private function createImg(w:int,h:int):Sprite
		{
			var Img:Sprite = new Sprite(); 			 
			//添加到舞台
			Laya.stage.addChild(Img);   			 
			//加载显示图片
			Img.loadImage("res/img/monkey1.png",w,h); 			 
			return Img;
		}
	}
}
```


Dans le code ci - dessus, nous avons créé un bitmap original, un bitmap d 'effet filtre flou.Les résultats opérationnels sont indiqués à la figure 5:

![图5](img/5.png)< br / > (Figure 5)



