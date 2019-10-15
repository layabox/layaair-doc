##Image and Binary System

À l'époque du défilé des pages, afin d'empêcher le détournement de ressources, il était courant de chiffrer des ressources telles que des images.Le cryptage, c 'est d' interrompre l 'octet de stockage de la ressource ou de pénétrer quelque chose.Mais à l 'âge de HTML5, on découvre que les images sont presque toutes directement chargées, pourquoi est - ce différent de la pratique de l' époque des jeux de pages?HTML5 ne peut pas charger les images binaires décodées?Bien sûr que non.Il n 'y a pas de secret, même si c' est crypté, vous pouvez obtenir votre code source en écrivant un script.Cependant, pour répondre aux besoins des développeurs dans ce domaine, disons simplement comment HTML5 effectue des opérations d 'images binaires.

###Xmlhtprequest

En parlant de chargement de fichiers, je dois dire que`XMLHttpRequest`Nous vous présentons brièvement le programme détaillé.`HttpRequest`ChapitreXmlhtprequest est une interface du navigateur permettant à JavaScript d 'effectuer des communications http (s).C 'est le noyau d' Ajax dont nous parlons souvent.Les critères xmlhtprequest sont divisés en level1 et level2.Nous parlons ici de la portée de HTML5, donc level1 n 'est pas très important pour nous, nous le renvoyons à html4, et nous sommes surtout préoccupés par level2.Pour que les développeurs puissent comprendre les deux critères de notre équipe, il faut comparer:

​**Principales faiblesses de level1:**

- les demandes transversales ne peuvent pas être envoyées sous réserve de stratégies homologues;

- les fichiers binaires (photographies, vidéos, audio, etc.) ne peuvent être envoyés qu'en version pure;

- il n'est pas possible d'obtenir en temps réel des informations sur les progrès accomplis au cours de la transmission et de l'acquisition des données, mais seulement de déterminer si elles ont été menées à bien;


   **Améliorations apportées à level2 par rapport à level1:**

- la possibilité d'envoyer des demandes inter - domaines, si le serveur le permet;

- appui à la transmission et à la réception de données binaires;

- ajout d 'objets formdata pour la transmission des données de formulaire;

- accès à l'information sur les progrès accomplis lors de la transmission et de l'acquisition des données;

- les délais d'exécution des demandes peuvent être fixés;

L'aspect le plus important de la comparaison est le soutien.**Système binaire d 'émission et de réception**".C 'est une percée majeure qui nous permet de télécharger des images binaires.

###Comment

Pour ce qui est du chargement, nous commençons par l 'original, puis nous passerons au moteur layaair, afin que le développeur puisse comprendre ce que cela signifie.Le chargement est effectué par un flux binaire dans lequel nous utilisons le flux binaire xmlhtprequest.Nous ne présenterons plus ici les opérations de xmlhtprequest, qui seront décrites dans un chapitre distinct.Nous allons d 'abord charger l' essai selon le système binaire.Ici, on commence par le script JS.Code:


```javascript

var xhr = new XMLHttpRequest();
xhr.open("get", "res/atlas/comp.png", true);
xhr.responseType = "arraybuffer";
xhr.onload = function () {
	if (this.status == 200) {
		var blob = new Blob([this.response], { type: "image/png" });
		var img = document.createElement("img");
		img.onload = function (e) {
			window.URL.revokeObjectURL(img.src); // 清除释放;
		};
		img.src = window.URL.createObjectURL(blob);
		document.body.appendChild(img);
	}
}
xhr.send();
```


Le procédé ci - dessus consiste à convertir le binaire en image, le binaire en image, il y a en fait beaucoup d 'autres façons, comme charger le binaire d' entrée, décoder le base64, puis vous donner une valeur IMG, ou encore faire des images avec les données binaires, puis vous donner une valeur todataurl Pour le SRC d 'IMG, etc.Convertir l 'image de la manière la plus simple et la plus efficace.

Après le chargement de l 'image, un objet xmlhtprequest est personnalisé.`responseType`Attributs`arraybuffer`, pour personnaliser un objet blob`blob`Pour créer une étiquette IMG,`window.URL.createObjectURL(blob)`Crée un URL pointant sur l 'objet paramétrique et ajoute l' objet IMG créé à un Body de la page Web pour l 'afficher.Insère ce code dans le fichier index.html et affiche nos images sur le site Web comme il se doit.

###Comment est Laya?

L 'exemple simple ci - dessus est que nous utilisons le script JS pour écrire, comment utiliser l' élément Dom dans le projet et comment utiliser l 'IMG dans le projet.On trouvera ci - après une description du projet as.

Créer un nouveau projet as à Laya, dont le Code est le suivant:


```java

package {
    import laya.display.Sprite;
    import laya.events.Event;
    import laya.net.HttpRequest;
    import laya.utils.Browser;

	public class LayaSample {
		
		public function LayaSample() {
			//初始化引擎
			Laya.init(1136, 640);
			var sp:Sprite = new Sprite();
            var xhr:HttpRequest = new HttpRequest();
            xhr.once(Event.COMPLETE,this,completeHandler);
            xhr.once(Event.ERROR,this,errorHandler);
            xhr.send("res/monkey2.png","","get","arraybuffer");
		}
        private function completeHandler(data:Object):void
        {
            //加载完成返回的data是arraybuffer；
          	//.......这里处理我们加密的图片数据，假设我们的图片加密数据是在图片的前面写入了四个字节的数据
            //.......解密逻辑开始处理数据。
            var byte:Byte = new Byte(data);//Byte数组接收arraybuffer
            byte.writeArrayBuffer(data,4);//从第四个字节开始读取数据
            var blob:Object = new Browser.window.Blob([byte.buffer], { type: "image/png" });
            var url:String = Browser.window.URL.createObjectURL(blob);//创建一个url对象；
            ////我们先用第一种方式显示图片到舞台；
            var sp:Sprite = new Sprite();
            sp.loadImage(url);
            Laya.stage.addChild(sp);//添加到舞台
        }
        private function errorHandler(e:Object):void
        {
            
        }
	}
}
```


On peut dessiner une texture pour montrer:


```java

  private function completeHandler(data:Object):void
  {
      //加载完成返回的data是arraybuffer；
      //.......这里处理我们加密的图片数据，假设我们的图片加密数据是在图片的前面写入了四个字节的数据
      //.......解密逻辑开始处理数据。
      var byte:Byte = new Byte(data);//Byte数组接收arraybuffer
      byte.writeArrayBuffer(data,4);//从第四个字节开始读取数据
      var blob:Object = new Browser.window.Blob([byte.buffer], { type: "image/png" });
      var url:String = Browser.window.URL.createObjectURL(blob);//创建一个url对象；
      //用loader来加载url
      Laya.loader.load(url, Handler.create(this,showImg,[url]),null,Loader.IMAGE);
  }
 private function showImg(url:String):void
 {
     var t:Texture = Laya.loader.getRes(url);
     var ape:Sprite = new Sprite();
     ape.graphics.drawTexture(t,0,0);
     Laya.stage.addChild(ape);
     ape.pos(200, 0);
 }
```


On crée une texture.


```java

private function completeHandler(data:Object):void
{
    //加载完成返回的data是arraybuffer；
    //.......这里处理我们加密的图片数据，假设我们的图片加密数据是在图片的前面写入了四个字节的数据
    //.......解密逻辑开始处理数据。
    var byte:Byte = new Byte(data);//Byte数组接收arraybuffer
    byte.writeArrayBuffer(data,4);//从第四个字节开始读取数据
    var blob:Object = new Browser.window.Blob([byte.buffer], { type: "image/png" });
    var url:String = Browser.window.URL.createObjectURL(blob);//创建一个url对象；
  
    var htmlImg:HTMLImage = HTMLImage.create(url);//这里创建HTMLImage 这里要用HTMLImage.create；
    htmlImg.onload = function():void
    {
      var t:Texture =new Texture(htmlImg);
      var ape:Sprite = new Sprite();
      ape.graphics.drawTexture(t,0,0);
      Laya.stage.addChild(ape);
      ape.pos(200, 0);
    }
}
```


Le procédé décrit ci - dessus est un procédé de traitement binaire, mais il existe de nombreux autres procédés, tels que le traitement à distance de ressources d 'image en données de base 64 +, le chargement à l' extrémité frontale et le déchiffrement direct des données dopées.Nous utilisons l 'un de ces procédés pour charger l' affichage sur la scène.


```java

package {
    import laya.display.Sprite;
    import laya.events.Event;
    import laya.net.HttpRequest;

	public class LayaSample {
		
		public function LayaSample() {
			//初始化引擎
			Laya.init(1136, 640);
            var sp:Sprite = new Sprite();
            var xhr:HttpRequest = new HttpRequest();
            xhr.once(Event.COMPLETE,this,completeHandler);
            xhr.once(Event.ERROR,this,errorHandler);
            xhr.send("res/data.data","","get","text");
		}
        private function completeHandler(data:String):void
        {
            //.....加载完成 把base64字符串的图片数据提取出来；
            //.....提取base64字符串；
            //.......假设得到的数据是data；
            var sp:Sprite = new Sprite();
            sp.loadImage(data);
            Laya.stage.addChild(sp);//添加到舞台
        }
        private function errorHandler(e:Object):void
        {
            
        }
	}
}
```


Nous utilisons tous ces exemples.`HttpRequest`Pour le chargement, le développeur peut l'utiliser.`Laya.loader.load`Méthode de chargement`Laya.loader.load`Pour une utilisation détaillée, déplacez - vous vers le document d 'enseignement pertinent.Ce n 'est plus le cas.

Voici l'exemple.`HttpRequest`Et le chargement d 'une seule ligne, il y a en fait plusieurs lignes dans HTML5, afin d' éviter que les pages de carton ne répondent pas et d 'améliorer l' expérience de l 'utilisateur, nous pouvons activer le Worker pour le chargement, nous allons expliquer le programme dans le chapitre Worker.

