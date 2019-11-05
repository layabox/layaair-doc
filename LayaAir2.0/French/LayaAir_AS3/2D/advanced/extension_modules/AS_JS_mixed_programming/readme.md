# AS3与JS混合编码

L 'interaction AS3 - JS est une demande courante, et le module Flash fournit une fonction d' interface simple.`ExternalInterface.call`Et`ExternalInterface.addCallback`Interaction avec JS.L 'interface Flash ne fonctionne pas.

En tant que moteur d 'aide à l' élaboration de HTML5 dans la langue AS3, layaair peut passer`Browser.windows`Et`__JS__`Le procédé permet d 'interagir avec JS et le compilateur de as du moteur layaair supporte également une macro - compilation spécifique qui aide le développeur AS3 à obtenir un codage plus complexe pour le mélange AS3 - JS.

###Initiation à l'AS3 et interaction avec le Navigateur

Supposons que nous ayons créé un fichier de démarrage appelé jsdemo.as pour réaliser l 'effet d' éjection original de JS dans le Code AS3.L'exemple est le suivant:

**Mode 1:**


```java

package 
{
	import laya.utils.Browser;
	public class JSDemo {
		
		public function JSDemo() 
		{
			//初始化引擎
			Laya.init(0, 0);
			//运行JS alert
			Browser.window.alert('我是alert');			
		}		
	}
}
```


**Mode 2:**


```java

package 
{
	public class JSDemo
	{
		public function JSDemo()
		{
			//初始化引擎
			Laya.init(0, 0);
			//运行JS alert
			__JS__('alert("我是alert")');
		}
	}
}
```


Les deux approches sont parfaitement cohérentes du point de vue des résultats, comme le montre la figure 1.

![1](1.jpg)< br / >
(Figure 1)

Quelle est la différence entre les deux?

　　`Browser.window`C 'est une référence au navigateur window, dont les fonctions globales sont affichées sur`window`Ainsi, la fonction de fenêtre d 'obus peut être activée avec browser.window.alert.Toutes les fonctions et propriétés sur Window peuvent être réalisées de cette manière.

　　`__JS__`C'est une fonction de macro - compilation fournie par le compilateur de layacompiler.`__JS__()`Le Code dans la fonction ne sera pas compilé et sera traduit dans le Code JS.



###Évolution des interactions AS3 - Browser

L 'interaction entre le moteur layaair et le navigateur est beaucoup plus simple que celle d' Alert.

**Mode 1:**


```java

package 
{
	import laya.utils.Browser;

	public class JSDemo
	{
		public function JSDemo()
		{
			//初始化引擎
			Laya.init(0, 0);
	
			var Height:int = Browser.window.innerHeight;
			var width:int = Browser.window.innerWidth;
			Browser.window.console.log("Console Log：浏览器高："+ Height + " 浏览器宽：" + width);
		}
	}
}
```


**Mode 2:**


```java

package 
{

	public class JSDemo
	{
		public function JSDemo()
		{
			//初始化引擎
			Laya.init(0, 0);
			
			var BrowserInfo:String = __JS__('"Console Log：浏览器高：" + window.innerHeight + " 浏览器宽："+ window.innerWidth');
			trace(BrowserInfo);
		}
	}
}
```


Les deux approches sont parfaitement cohérentes du point de vue des résultats, comme le montre la figure 2.

![2](2.jpg)< br / >
(Figure 2)

Ces deux approches sont relativement recommandées.`Browser.window`Les interactions,`__JS__`Comme le Code JS est écrit dans une chaîne de caractères, il n 'y a pas d' Erreur d 'écriture ou de notification, ce qui augmente le coût des erreurs de vérification.



###Codage mixte AS3 - JS

Dans le cadre de ce projet, nous utiliserons inévitablement la base de données JS d 'une tierce partie pour appuyer le développement.Qu'est - ce qu'on fait du projet as?Nous allons maintenant nous expliquer avec le jquery.js qui est le plus souvent utilisé.

D'abord à jquery.[官网下载](http://jquery.com/download/)Version jquery.js, dans l 'exemple, nous utilisons`jquery-3.2.0.min.js`".Page index.html à l 'entrée du projet`bin\h5\`Table des matières`<script type="text/javascript" src="jquery-3.2.0.min.js"></script>`".

​*L'introduction dans la Bibliothèque de tiers doit être ajoutée avant l'entrée dans la Bibliothèque de moteurs layaair.*

Après l 'ajout de la référence dans la bibliothèque sur la page d' entrée, nous établirons le code suivant dans la Bibliothèque d 'entrée AS3:


```java

package {
	import laya.utils.Browser;
	public class JSDemo {
		
		public function JSDemo() {
			//初始化引擎
			Laya.init(0, 0);
          	//Browser.window后的$(Browser.document)为第三方库jquery的方法。
			Browser.window.$(Browser.document).ready(function():void{
				
				Browser.window.alert("jquery调用成功");
			});
			
		}
		
	}
}
```


Après l 'opération de compilation, nous pouvons voir que les vitres ont été utilisées avec succès.Nous avons réussi à obtenir des codes mixtes dans le cadre du projet AS3.



###JS call as interface

Parfois, on met au point des projets qui croisent les concepteurs de web, on peut utiliser la méthode JS du développeur de web, alors comment le développeur de web utilise - t - il la logique que nous écrivons?En fait, l 'développeur peut réfléchir plus avant: Nous avons développé H5 avec l' AS3, en fait, en produisant JS directement par l 'intermédiaire d' un compilateur, il suffit donc d 'exposer l' interface et de permettre au développeur Web d 'appeler directement notre code JS.On trouvera ci - après un code d 'exemple simple pour illustrer l' utilisation.

**Code jsdemo.as:**


```java

package {
	import laya.webgl.WebGL;

	public class JSDemo {
		
		public function JSDemo() {
			//初始化引擎
			Laya.init(0, 0);
			
		}
      //定义一个静态函数 对外暴露给web调用者。
		public static function getGameName():String
		{
			return "myGame";
		}
		
	}
}
```


Compiler, puis on ouvre la console du navigateur et on saisit.`JSDemo.getGameName()`On a trouvé la sortie.`"myGame"`Voir la figure 3.Affiche le succès de l 'appel, ce qui permet une interaction avec l' développeur Web.

![图片](3.jpg)< br / >
(Figure 3)



L'exemple ci - dessus n'est que la définition d'une méthode statique et nous pouvons même ouvrir tous les procédés et attributs internes,

Modifier le Code jsdemo.as comme suit:


```java

package {
	import laya.utils.Browser;

	public class JSDemo {
		
		private var name:String = "Game";
		public function JSDemo() {
			//初始化引擎
			Laya.init(0, 0);
         	//定义一个命名空间的属性为app；
			Browser.window.app = this;
			
		}
		public static function getGameName():String
		{
			return "myGame";
		}
		public function getVersion():String
		{
			return "1.2.0";
		}
		
	}
}
```


Compiler operation, Open Browser console, input after`app`,`app.name`,`app.getVersion()`Les résultats que l'on peut voir dans la figure 4 ont déjà été atteints.On voit ainsi que le développement as du moteur layaair et l 'interaction des développeurs web sont sans faille.

![图4](4.jpg)< br / >
(Figure 4)



###Indices d'intelligence des codes

Dans l 'exemple ci - dessus, la méthode d' origine JS est simple, mais la méthode JS originale n 'est pas indiquée dans le projet AS3.Par conséquent, nous ajoutons manuellement une déclaration de fonction au procédé de macro - compilation, ce qui permet d 'obtenir une indication de code.

Par exemple, on crée une classe window.`window.as`*), encapsuler les fonctions courantes du navigateur.

Code window.as:


```java

/*[IF-FLASH]*/package
{
	public class window
	{
		public function window()
		{
		}
		public static function alert(msg:Object):void
		{			
		}
	}
}
```


`/*[IF-FLASH]*/`Je ne suis pas hésiter à vous faire savoir ce numéro de ce premier petit ami d 'aller, tout simplement parce que, beau est des ressources partagées dans le monde, comment il peut être occupé par une personne![宏编译教程文档](https://github.com/layabox/layaair-doc/blob/master/Chinese/LayaAir_AS3/LayaCompile_Macros.md)".



Avec cette catégorie, nous pouvons écrire directement la méthode de Window et avoir un indice (*, à condition que les fonctions à utiliser soient préemballées)

On va en écrire un par JS.`alert()`Oui.

Le Code jsdemo.as est le suivant:


```java

package {
	public class JSDemo {
		public function JSDemo() {
			//初始化引擎
			Laya.init(0, 0);
			window.alert("我是alert");
		}
	}
}
```


Les résultats de l 'opération de compilation sont exécutés avec succès, comme le montre la figure 5.On peut donc encapsuler tous les développeurs de window.Ainsi, lorsque le Code est ensuite mélangé à un code JS, il y a une indication intelligente du Code.

![图5](5.jpg)< br / >

(Figure 5)





###As écrit nodejs

D 'abord, il s' agit d' un nouveau projet d 'as, qui est le projet d' origine d 'as.`require.as`".

Code require.as:


```java

package
{
	/*[IF-FLASH-BEGIN]*/
	public class require
	{
		
		public function require(path:String)
		{
		}
		
	}
	/*[IF-FLASH-END]*/
}
```


​

Le Code main.as du démarrage du projet est le suivant:


```java

package
{
	public class Main
	{
		public var http:Object = require('http');
		public var net:Object = require('net');
		public var url:Object = require('url');
		public function Main()
		{
			var server:Object = this.http.createServer(clientHandler);
			server.listen(8989);
		}
		private function clientHandler(req:Object,respose:Object):void
		{
			trace("收到消息");
			respose.writeHead(200, {'Content-Type': 'text/plain'});
			respose.end('Hello Laya');
		}
	}
}
```


​*API qui crée un serveur Node peut être déplacé vers[https://nodejs.org/](https://nodejs.org/)*



　　`Main.as`Un serveur dynamique a été créé avec un port 8989 et le serveur a reçu une demande du client pour retourner à Hello Laya.

　　`require.as`Cette catégorie utilise la macro - compilateur de layacompiler,`/*[IF-FLASH-BEGIN]*/`Et`/*[IF-FLASH-END]*/`Le Code entre ces deux étiquettes est utilisé pour les conseils de grammaire et ne participe pas à la compilation[宏编译教程文档](https://github.com/layabox/layaair-doc/blob/master/Chinese/LayaAir_AS3/LayaCompile_Macros.md)).

​**Compilation du projet:**

Démarre le fichier JS compilé avec node.Ouvrir une entrée de ligne de commande dans le répertoire actif`node Main.max.js`".Avant d 'entrer dans le Navigateur[http://localhost:8989/](http://localhost:8989/)Voir sur la page: Hello Laya.

Ainsi, nous avons réussi à écrire un serveur dynamique avec le Code as.