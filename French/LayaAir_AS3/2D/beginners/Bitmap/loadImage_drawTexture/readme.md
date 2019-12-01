#Afficher et changer

> l 'affichage de l' image est la base du développement du jeu.

##Affichage et transfert d 'images au moyen d' un procédé loadimage

###1.1 Description générale

La recherche laya.display.sprite dans le document API permet de trouver la méthode loadimage () et, comme le montre la figure 1, nous connaissons d 'abord les paramètres de cette méthode.

![图1](img/1.png)< br / > (Figure 1)

###1.2 exemples de téléchargement d'images

Crée une catégorie d 'entrée main.as, définie comme une application par défaut (recommandée par flashbuilder), et établit le code suivant:


```java

package
{
	import laya.display.Sprite;
	
	public class Main
	{
		public function Main()
		{
			//初始化舞台
			Laya.init(1334,750);                
			
			//设置舞台背景色
			Laya.stage.bgColor  = "#ffffff"
			
			var img:Sprite = new Sprite();                  
			//加载显示图片，坐标位于100,50
			img.loadImage("res/img/monkey1.png",100,50); 
			//添加到舞台
			Laya.stage.addChild(img);
		}
	}
}
```


"Dans le Code de l'exemple,"`100,50`"Est l 'information des coordonnées d' affichage de l 'image.L 'effet d' exécution de l 'exemple de code est illustré dans la figure 2 - 1:

![图2-1](img/2-1.png)< br / > (figures 2 - 1)

###1.3 exemples de transfert d 'images au moyen de loadimage

Le transfert d 'image est effectué sur la base de l' affichage d 'une image, ce qui permet d' ajouter un dessin vide, puis d 'obtenir une nouvelle ressource d' image qui est reprogrammée au moyen d 'une logique de code.Des descriptions de code spécifiques peuvent être mentionnées dans les notes de code et l 'API, ainsi que dans l' expérience d 'exécution d' exemples.

Dans la catégorie des entrées main.as, nous modifions le Code comme suit:


```java

package
{
	import laya.display.Sprite;
	
	public class Main
	{
        //需要切换的图片资源路径
		private var monkey1:String = "res/img/monkey1.png";
		private var monkey2:String = "res/img/monkey2.png";
      	//切换状态
		private var flag:Boolean = false;
      
		private var img:Sprite;
		
		public function Main()
		{
			//初始化舞台
			Laya.init(1334,750);                
			//设置舞台背景色
			Laya.stage.bgColor = "#ffffff"                        
			
			img = new Sprite();                        
			
			//显示绘制的图片
			switchImg();
			
			//侦听switchImg中图片区域的点击事件，触发后执行switchImg切换图片
			img.on("click",this,switchImg);
			
			//将图片添加到舞台
			Laya.stage.addChild(img);                        
		}
		
		
		private function switchImg(e:*=null):void
		{                        
			//清空图片
			img.graphics.clear();
			
			//获得要切换的图片资源路径
			var imgUrl:String = (flag = !flag)? monkey1:monkey2;
			
			//加载显示图片，坐标位于100,50
			img.loadImage(imgUrl, 100, 50);
			
		}
	}
}
```


L'effet du Code d'exécution est illustré dans la figure 2 - 2:

![动图2-2](img/2-2.gif)< br / > (Figure 2 - 2)







##Affichage et transfert d 'images au moyen d' un procédé drawtexture

###2.1 Description générale

La recherche de laya.display.graphics dans le document API permet de trouver la méthode drawtexture () et, en plus, de connaître la méthode load () et la méthode getres () de laya.net.loadermanager, ainsi que la méthode create () de laya.utils.handler, dont les paramètres sont indiqués dans les figures 3, 4, 5 et 6 de chaque méthode:

![图3](img/3.png)< br / > (Figure 3)

![图4](img/4.png)< br / > (Figure 4)

![图2](img/5.png)< br / > (Figure 5)

![图2](img/6.png)< br / > (Figure 6)



###2.2 exemples de téléchargement d 'images

Le procédé loadimage () peut charger instantanément des ressources d 'images extérieures ou lire des ressources d' images à partir de la zone tampon, alors que le procédé drawtexture () doit d 'abord charger l' image, puis dessiner l 'ajout à la scène, de sorte qu' il doit être utilisé dans le Code d 'exemples pour charger (().`Laya.loader.load()`Et le retour`Handler.create()`Pour afficher une image, vous pouvez consulter la partie annotée du Code ainsi que la description API correspondante.

Crée une catégorie d 'entrée main.as, définie comme une application par défaut (recommandée par flashbuilder), et établit le code suivant:


```java

package
{
	import laya.display.Sprite;
	import laya.utils.Handler;
	
	public class Main
	{
		private var monkey2:String = "res/img/monkey2.png";
		public function Main()
		{
			//初始化舞台
			Laya.init(1334,750);                
			//设置舞台背景色
			Laya.stage.bgColor = "#ffffff"                        
			
			//先加载图片资源，在图片资源加载成功后，通过回调方法绘制图片并添加到舞台
			Laya.loader.load(monkey2,Handler.create(this,graphicsImg));          
		}
		
		private function graphicsImg():void
		{
			var img:Sprite = new Sprite();
			//获取图片资源，绘制到画布
			img.graphics.drawTexture(Laya.loader.getRes(monkey2),100,50);
			
			//添加到舞台
			Laya.stage.addChild(img);
		}
		
	}
}
```


L'effet d'exploitation du Code est indiqué dans la figure 7 - 1.

![图7-1](img/7-1.png)< br / > (figures 7 - 1)





###2.3 exemples d 'images commutées par drawtexture

Le transfert d 'image est effectué sur la base de l' affichage d 'une image, ce qui permet d' ajouter un dessin vide, puis d 'obtenir une nouvelle ressource d' image qui est reprogrammée au moyen d 'une logique de code.Des descriptions de code spécifiques peuvent être mentionnées dans les notes de code et l 'API, ainsi que dans l' expérience d 'exécution d' exemples.

Dans la catégorie des entrées main.as, nous modifions le Code comme suit:


```java

package
{
	import laya.display.Sprite;
	import laya.resource.Texture;
	import laya.utils.Handler;
	
	public class Main
	{
		private var monkey1:String = "res/img/monkey1.png";
		private var monkey2:String = "res/img/monkey2.png";
		private var flag:Boolean = false;
		private var img:Sprite;
		
		public function Main()
		{
			//初始化舞台
			Laya.init(1334,750);            
			//设置舞台背景色
			Laya.stage.bgColor        = "#ffffff"                        
			
			//加载多张图片，在图片资源加载成功后，通过回调方法绘制图片并添加到舞台
			Laya.loader.load([monkey1,monkey2],Handler.create(this,graphicsImg));                
		}
			
		
		private function graphicsImg(e:*=null):void
		{
          	//创建一个实例
			img = new Sprite();      
          	//添加到舞台
			Laya.stage.addChild(img);                  
			
			//显示初始化绘制的图片
			switchImg();			
          
			//侦听switchImg中图片区域的点击事件，触发后执行switchImg切换纹理绘制
			img.on("click",this,switchImg);			

			//设置图片坐标
			img.pos(100,50);
			
		}
		
		private function switchImg(e:*=null):void
		{                        
			//清空绘制
			img.graphics.clear();
			
			//获得要切换的图片资源路径
			var imgUrl:String = (flag = !flag)? monkey2:monkey1;
			//获取图片资源
			var texture:Texture = Laya.loader.getRes(imgUrl);
			//绘制纹理
			img.graphics.drawTexture(texture);                        
			//设置纹理宽高
			img.size(texture.width, texture.height);        
			
		}
	}
}
```


L'effet d'exploitation du Code est indiqué dans la figure 7 - 2.


![动图7-2](img/7-2.gif)< br / > (Figure 7 - 2)





