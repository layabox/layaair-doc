##Layaair et Dom.

Dans les projets de développement, il est inévitable que les promoteurs rencontrent un soutien d 'éléments Dom, mais les imperfections de layaair ne sont ni soutenues ni soutenues.Nous allons donc voir quelques - unes des techniques de développement.

###SVG de layaair

Qu'est - ce que c'est?Peut - être la plupart des développeurs ont - ils entendu parler de ce terme ou savent - ils qu 'il s' agit d' un format de description pour les images vectorielles spécifiées par W3C, que certaines définitions et histoires concernant le SVG ne sont plus ici et que les développeurs intéressés peuvent se référer à [ici] ().Toutefois, il n'y a guère de place pour l'utiliser réellement dans les projets.Mais la force du SVG ne doit pas être ignorée, il y a des images simples, plusieurs lignes de texte peuvent être décrites sans qu 'il soit nécessaire de charger le réseau.Par exemple, l 'abondance de caractères artistiques tels que des images de formes étranges, comme les effets visuels du texte, peut être beaucoup plus difficile à mettre en oeuvre par le programme.Comme ça.

![0](img/0.png)

Et s' il y avait un mot de ce genre dans votre rubrique?On pensait peut - être à des photos.Y a - t - il une solution plus simple?Ici, nous choisissons le SVG pour le traitement.Nous savons que le moyen le plus simple et le plus rapide d 'afficher cet effet avec le style DIV + CSS dans les éléments Dom.Nous utilisons donc le style css pour montrer cet effet.Voici comment un simple script peut atteindre cet effet.


```javascript

var data = '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">' +
           '<foreignObject width="100%" height="100%">' +
           '<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:40px">' +
             '<em>I</em> like ' + 
             '<span style="color:white; text-shadow: 0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777, 0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333, 0px 8px 7px #001135;">' +
             'cheese</span>' +
           '</div>' +
           '</foreignObject>' +
           '</svg>';

var DOMURL = window.URL || window.webkitURL || window;

var img = new Image();
var svg = new Blob([data], {type: 'image/svg+xml'});
var url = DOMURL.createObjectURL(svg);
img.src = url;
img.style.position ="absolute";
img.style.zIndex = 99999
document.body.appendChild(img);
```


Comment ça marche?Ouvrez le google browser, ouvrez une page Web vide, F12, collez le code ci - dessus à la console, puis retournez à la voiture et voyez l 'effet de la capture.Ou créer un HTML pour coller le Code et l 'ouvrir avec un navigateur.C 'est pas si simple.On peut alors modifier le texte affiché.L 'développeur peut modifier les résultats.Nous présentons brièvement ce code.Les données sont le format de données de SVG, qui renvoie à la définition et à la description de SVG.


```javascript

<span style="color:white; text-shadow: 0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777, 0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333, 0px 8px 7px #001135;">
  这里是重点，文字的效果我们是通过svg支持的css样式来设置 text-shadow设置的是文字的css样式效果，假如开发者想改变文字的样式，可以修改style即可。
```


C 'est dans JavaScript qu' est - ce qu 'on va faire dans le jeu?C 'est très simple, maintenant que nous avons affiché l' IMG sur la page, alors ce que nous allons faire, c 'est comment l' appliquer et l 'afficher dans le projet.Nous avons un nouveau projet.Ici, le projet est créé en langue as.Code:


```java

package {
	import laya.display.Sprite;

	public class LayaUISample {
		
		public function LayaUISample() {
			//初始化引擎
			Laya.init(600, 400);
			Laya.stage.bgColor ="#cccccc";
			var data:String= "data:image/svg+xml,"+'<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">' +
           '<foreignObject width="100%" height="100%">' +
           '<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:40px">' +
             '<em>I</em> like ' + 
             '<span style="color:white; text-shadow: 0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777, 0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333, 0px 8px 7px #001135;">' +
             'cheese</span>' +
           '</div>' +
           '</foreignObject>' +
           '</svg>';
            var sp:Sprite = new Sprite();
            sp.loadImage(data,0,0,200,200);
            Laya.stage.addChild(sp);

		}
	}
}
```


Les moteurs qui passent les données comme URL à loadimage nous aideront à les télécharger et à les décoder.Les paramètres du procédé loadimage acceptent non seulement le format URL sous forme d 'adresse, mais aussi le format base64 et SVG.Compilez le code ci - dessus et nous voyons l 'effet du diagramme ci - dessous.![1](img/1.png)

Résumé: le code ci - dessus nous donne une bonne idée de la façon dont nos caractères artistiques spéciaux peuvent être plus simples et plus faciles à utiliser dans le projet.Les développeurs peuvent chercher eux - mêmes des effets plus brillants tels que les effets de vision 3D, les mélanges de texte, les ombres, les reflets, etc.Ce procédé permet non seulement de réduire la largeur de bande du réseau, mais aussi, et c 'est plus important, de faciliter les modifications de temps à autre.Définit un style qui peut être appliqué partout dans le projet.Le remplacement des caractères bitmap par le procédé ci - dessus n 'est pas plus efficace et plus rapide.

Liens:

Https: / / codepen.io / PEN /;

Https: / / developer.mozilla.org / en - US / docs / WEB / API / Canvas \ \ u API / Drawing u Dom \ \ u \ \ Canvas;

###élément Dom de layaair

Dans HTML5, l 'étiquette image fonctionne très bien, nous ne voulons pas trop présenter ses caractéristiques, ici nous présentons quelques formes simples et usuelles.

####Code bidimensionnel

Une fonction plus courante est d 'afficher l' adresse de Code bidimensionnel actuelle dans l 'élément.La longueur de l 'utilisateur peut être identifiée.Un Code bidimensionnel est généré ici, et nous générons un Code bidimensionnel à l 'aide d' une bibliothèque JS de tiers.Les codes de bibliothèque peuvent être téléchargés sur github.[地址](https://github.com/davidshimjs/qrcodejs)".

Ajouter qrcode.js téléchargé à l 'index.html.API de QRCode, voir[地址](https://github.com/davidshimjs/qrcodejs)".Les codes logiques spécifiques sont les suivants:


```java

package {
    import laya.display.Sprite;
    import laya.utils.Browser;
	
	public class Main {
		
        //二维码对象
        private var qrcode:Object;
        private var qrcodeSp:Sprite;
		public function Main() {
			//初始化引擎
			Laya.init(600, 400);
            var div:Object = Browser.document.createElement("div");
           qrcode= new Browser.window.QRCode(div,{
                width : 100,
                height : 100
            });
           var url:String ="http://layabox.com/";
           qrcode.makeCode(url);
           Laya.stage.once("click",this,clickHandler);
           qrcodeSp = new Sprite();
           Laya.stage.addChild(qrcodeSp);
		}
        private function clickHandler():void
        {
            var url:String = qrcode._oDrawing._elImage.src;//获取，注意这里是异步的，开发者可以加个延时在获取。
            qrcodeSp.loadImage(url,0,0,100,100);
        }
	}
}
```


Compilez le Code supérieur, puis cliquez sur la scène pour voir que le Code bidimensionnel a été affiché sur la scène et peut être scanné par téléphone, et que le téléphone a sauté sur le réseau officiel.**Attention & ‧‧;: le Code bidimensionnel généré à ce moment - là ne réagit pas dans le micro - message ou le navigateur, car QRCode génère une étiquette Canvas et non une étiquette img.**".Pour que les options identifiées par l 'icône soient longues, seules les étiquettes IMG peuvent être utilisées.Ce développeur peut se développer lui - même.

###élément Dom de layaair

####Vidéo en direct

À l 'époque de HTML5, la diffusion vidéo était essentiellement assurée par des étiquettes video, et la meilleure option, si elle n' avait pas d 'expérience, était d' utiliser des fichiers de lecture mûrs.C'est la mode.[video.js](https://github.com/videojs/video.js)Oui.[hls.js](https://github.com/video-dev/hls.js)Oui.[plyr.js](https://github.com/Selz/plyr)".Quelle que soit la compatibilité, l 'expérience et les performances sont excellentes.Tous ces fichiers sont officiels.Par exemple, http: / / plyr.io /, http: / / video-dev.github.io / hls.js / Demo /, http: / / codepen.io / sampotts / PEN / jkemqb.

En bas.[Plyr + hls.js](http://codepen.io/sampotts/pen/JKEMqB)Voyons ce que nous devrions écrire dans layaair.

Un nouveau projet A.S.Ajouter le code suivant dans le fichier index.html:

![2](img/2.png)

`<link rel="stylesheet" href="https://cdn.plyr.io/1.8.2/plyr.css">`Lecteur de fichiers de style

`<video preload="none" id="player" autoplay="" controls="" crossorigin=""></video>`Ajoute une étiquette video.Nommez id "player", ce qui sera utilisé dans la procédure.

`<script src="https://cdn.plyr.io/1.8.2/plyr.js"></script>`
`<script src="https://cdn.jsdelivr.net/hls.js/latest/hls.js"></script>`

C 'est la bibliothèque à utiliser pour le lecteur.Dans l 'environnement de production, le développeur se souvient de télécharger son article ou son serveur.

Voici la logique de la catégorie principale:


```java

package {
    import laya.utils.Browser;
	
	public class Main {
		public function Main() {
			//初始化引擎
			Laya.init(0,0);//初始化引擎
            var Hls:Object = Browser.window.Hls;//获取对Hls的引用；
            var plyr:Object = Browser.window.plyr//获取对plyr的引用；
            //获取video对象，就是页面上命名为“player”的标签;
            var video:Object =Browser.document.querySelector('#player');
            if (Hls.isSupported()) {
                var hls:Object = new Hls();
                hls.loadSource('http://content.jwplatform.com/manifests/vM7nH0Kl.m3u8');//加载m3u8源
                hls.attachMedia(video);
                hls.on(Hls.Events.MANIFEST_PARSED,function():void{
                    video.play();
                });
            }
            plyr.setup(video);
		}
	}
}
```


Compilez le code d 'exécution et découvrez que la vidéo est disponible sur le site Web.Les développeurs peuvent remarquer que nous avons initialisé les moteurs comme ça:

`Laya.init(0,0);//初始化引擎`Il n 'y a pas d' interaction avec la scène.Alors on est à zéro, on peut même pas commencer.Si l 'élément développeur contient une logique d' interaction avec la scène, il est possible de définir sa propre taille.

Pendant la lecture, l 'développeur peut ouvrir la console de Google F12 et passer à l' étiquette Network pour voir si notre vidéo est un segment de fichiers ts.

![3](img/3.png)

À mesure que la diffusion se poursuit, le nombre de documents découverts augmente.En fait, c'est basé sur...[hls](https://developer.apple.com/streaming/)Lecteur de protocoleLe principe de base de cette technique est de diviser les fichiers vidéo ou les flux vidéo en petites tranches (ts) et d 'établir des fichiers d' index (m3u8).Des principes plus profonds, tels que le décodage vidéo, les données de trame vidéo, peuvent être consultés par l 'développeur comme suit:

Https: / / developer.apple.com / streaming /.

Http: / / developer.mozilla.org / zh \ \ cn / docs / WEB / API / mediasure.

Https: / / github.com / nickdesaulniers / netfix

Https: / / developer.mozilla.org / en - US / docs / WEB / API / htmlmediaelement

Voici l 'exemple que nous utilisons pour la lecture.Pour d 'autres méthodes, l' développeur est invité à se référer au programme d 'enseignement.

####Caméra

Les vidéos de HTML5 ont une capacité limitée et ont besoin d'un navigateur vidéo.**HTTPS protocol**Google et la nouvelle version du support de micro - messages est encore bon.Si votre compatibilité n 'est pas si élevée, vous pouvez essayer d' ajouter la fonction de la caméra.

Voici l 'exemple donné sur MDN.

Https: / / mdn.github.ii / webaudio - Examples / Stream - source - Buffer /

L 'utilisateur ouvre cette adresse avec son portable ou son micro - message pour tester le support de votre téléphone.
!`6Q322IAT7251L4{J1PWW](img/L`6q322iat7251l4 {j1p] ww.ping).

Il s' agit d 'un test de connexion, le Protocole est aussi HTTPS, et l' développeur doit en tenir compte lorsqu 'il appelle la caméra.Votre adresse distante doit être HTTPS.

Pour plus d'informations, voir http: / / github.com / MDN / webaudio - examples.Ce lien est un exemple de son et de vidéo donné par MDN.

Layaair a également un boîtier correspondant pour les caméras.


```java

package
{
    import laya.device.media.Media;
    import laya.device.media.Video;
    import laya.display.Text;
    import laya.utils.Browser;
    import laya.utils.Handler;
    
    public class Main
    {
        private var video:Video;
        
        public function Main()
        {
            Laya.init(Browser.width, Browser.height);
            
            if (Media.supported() === false)
                alert("当前浏览器不支持");
            else
            {
                showMessage();
                
                var options:Object = {
                    audio: true,
                    video: { 
                        facingMode: { exact: "environment" },	// 后置摄像头，默认值就是，不设至也可以。
                        width: Laya.stage.width,
                            height:Laya.stage.height
                    }
                };
                
                Media.getMedia(options, Handler.create(this, onSuccess), Handler.create(this, onError));
            }
        }
        
        private function showMessage():void 
        {
            var text:Text = new Text();
            Laya.stage.addChild(text);
            text.text = "单击舞台播放和暂停";
            text.color = "#FFFFFF";
            text.fontSize = 100;
            text.valign = "middle";
            text.align = "center";
            text.size(Laya.stage.width, Laya.stage.height);
        }
        
        private function onSuccess(url:String):void
        {
            video = new Video(Laya.stage.width, Laya.stage.height);
            video.load(url);
            Laya.stage.addChild(video);
            
            Laya.stage.on('click', this, onStageClick);
        }
        
        private function onError(error:Error):void
        {
            alert(error.message);
        }
        
        private function onStageClick():void
        {
            // 切换播放和暂停。
            if (!video.paused)
                video.pause();
            else
                video.play();
        }
    }
}
```


Compiler l 'exemple ci - dessus ne s' ouvre pas.C 'est normal, il faut créer un serveur HTTPS.Puis ouvre l 'index.html correspondant à l' adresse.Il est aussi simple de créer un simple serveur htpps.Ici, on peut utiliser l 'outil de commande de Laya.

- tout d'abord, node.Télécharger l'adresse < https: / / nodejs.org / en / > pour l'installation.

- Ouvrez la ligne de commande CMD une fois l 'installation terminée et saisissez la ligne de commande NPM install - g layacmd en attendant l' installation.

- trouve l'index.html qu'on vient de compiler.Maintenez le bouton Shift + droit pour ouvrir ici la fenêtre CMD et saisissez layacmd Open, puis démarrez un serveur statique à l'adresse de la ligne de commande et utilisez un navigateur mobile Google ou un micro - message pour accéder à cette adresse, par exemple à https http: / / 10.10.20.34: 800 1 / index.html.



###élément Dom de layaair

Dans le développement du projet, nous pourrions utiliser la demande de téléchargement d 'images par les utilisateurs.On a besoin de l'étiquette HTML 5.**L 'interface à fournir par un micro - message, le cours suivant nous est consacré dans le cours de micro - lettre.D 'autres navigateurs peuvent être compatibles.**).Voici un exemple simple.


```java

package {
    import laya.display.Sprite;
    import laya.utils.Browser;
    
    public class Main {
        public function Main() {
            //初始化引擎
            Laya.init(100,100);
            var file:Object = Browser.document.createElement("input");
            file.type ="file";
            file.style.position ="absolute";
            file.style.zIndex = 999;
            Browser.document.body.appendChild(file);//添加到舞台
            file.onchange = function(e):void
            {
                fileReader.readAsDataURL(file.files[0]);
            };
            var fileReader:Object = new  Browser.window.FileReader();
            fileReader.onload = function(evt):void
            {  
                if(Browser.window.FileReader.DONE==fileReader.readyState)
                {
                    var sp:Sprite = new Sprite();
                    sp.loadImage(fileReader.result,0,0,300,300);
                    Laya.stage.addChild(sp);
                   
                }
            }
        }
    }
}
```


Compilez le code ci - dessus et cliquez sur le bouton.Choisissez un fichier d 'images ou un appareil photo pour prendre une photo, et découvrez que l' image est affichée sur la scène.Un programme simple d 'appel d' album ou d 'appareil photo est ainsi terminé.Mais nous trouvons ce bouton très laid.Comment changer le style de ce bouton? Cela doit être traité avec le style css.La méthode habituelle consiste à fixer la valeur transparente de ce bouton à 0, puis à placer un bouton qui le remplace.En fait, c 'est lui qui a effectivement cliqué.Les utilisateurs ne le sentent pas.Alors, on va changer de style.


```javascript

 var file:Object = Browser.document.createElement("input");
 file.style="filter:alpha(opacity=0);opacity:0;width: 0;height: 0;";
 file.type ="file";
 file.style.position ="absolute";
 file.style.zIndex = 999;

```


Voici le code complet:


```java

package {
    import laya.display.Sprite;
    import laya.ui.Button;
    import laya.utils.Browser;
    import laya.utils.Handler;
    
    public class Main {
        public function Main() {
            //初始化引擎
            Laya.init(500,500);
            var skins:Array = [
                "res/button-1.png"
            ];
            Laya.loader.load(skins, Handler.create(this, onUIAssetsLoaded));
            
        }
        public function onUIAssetsLoaded():void
        {
            var btn:Button = new Button("res/button-1.png");
            Laya.stage.addChild(btn);
            
            //创建隐藏的file并且把它和按钮对齐。达到位置一致，这里我们默认在0点位置；
            var file:Object = Browser.document.createElement("input");
            //设置file的样式
            file.style="filter:alpha(opacity=0);opacity:0;width: 150px;height:60px;";
            file.type ="file";//设置类型是file类型。
          	file.accept="image/png";//设置文件的格式为png；
            file.style.position ="absolute";
            file.style.zIndex = 999;
            Browser.document.body.appendChild(file);//添加到页面；
            file.onchange = function(e):void
            {
                if(file.files.length>0)
                {
                    fileReader.readAsDataURL(file.files[0]);
                }

            };
            var fileReader:Object = new  Browser.window.FileReader();
            fileReader.onload = function(evt):void
            {  
                if(Browser.window.FileReader.DONE==fileReader.readyState)
                {
                    var sp:Sprite = new Sprite();
                    sp.loadImage(fileReader.result,0,0,100,100);
                    Laya.stage.addChild(sp);
                    
                }
            };
            
        }
    }
}
```


Compilez le code d 'exécution et voyez que le bouton Dom moche a disparu.Nous pouvons également sélectionner des images et les afficher sur la scène en cliquant sur nos boutons personnalisés.

L'exemple ci - dessus est que nous l'avons reproduit dans sa forme originale, que nous avons fait preuve de transparence zéro et que nous avons fait semblant d'être invisibles.Le programme de cette section n 'est pas mis en œuvre dans la pratique.Pour tout autre API concernant le file, prière de se référer aux notes pertinentes MDN et W3C.En plus de l 'affichage sur la scène, il peut y avoir une opération du serveur de téléchargement qui peut alors être utilisée avec formdata.Ce développeur peut essayer.

###étiquette script d 'élément Dom de layaair

Parfois, les fichiers JS de nos projets sont trop nombreux, trop importants, tous les chargements en une seule fois ne sont pas seulement un gaspillage de flux, mais aussi un gaspillage de pages, ce qui entraîne une très mauvaise expérience des utilisateurs.Même si la confusion par compression peut être réduite, un élément légèrement plus grand peut générer un grand nombre de codes.Ou un fichier JS local, qui n 'est pas nécessaire lorsque l' écran principal est chargé, nous devons le charger dès le moment approprié, et il est donc nécessaire de séparer les fichiers et les modules.Les fichiers séparés impliquent un chargement immédiat.L 'étiquette script sera alors utile.

Cette fonction peut être réalisée en chargeant un script distant par le SRC de script.On peut également le faire en configurant le réseau innerHTML de script et, bien sûr, le troisième type d 'eval.On trouvera ci - après une description distincte de ces cas.

####Mise en oeuvre par réglage de SRC

La création de script peut être ajoutée manuellement à la page ou la création dynamique de code.Ici, nous prenons l 'exemple de la création de code.On commence par le Code.

Ajouter un nouvel élément dans la langue as, dont la logique de code est la suivante:


```java

package {
    import laya.utils.Browser;
    
    public class Main {
        public function Main() {
            //初始化引擎
            Laya.init(500,500);
            var script:Object = Browser.document.createElement("script");
            script.src = "demo1.js";
            script.onload = function():void
            {
                //加载完成函数,开始调用模块的功能。
                ///...........
                // new一个js中的对象。
                var client:Object = new Browser.window.Demo1();
                client.start();
            }
            script.onerror = function():void
            {
                //加载错误函数
            }
            Browser.document.body.appendChild(script);
            
        }
        
    }
}
```


Puis crée un nouveau fichier js avec le code simple suivant:


```javascript

var Demo1=(function(){
	function Client()
	{

	}
	Client.prototype.start = function() {
		// body...
		console.log("调用方法");
	};
	return Client;
})();
console.log("我被加载进来了");
```


Nous allons maintenant donner une brève explication de ces deux paragraphes.

`var script:Object = Browser.document.createElement("script");`Crée une étiquette script.

`script.src = "demo1.js";`Définit le chemin j à charger.

`script.onload  = ......`Et`script.onerror =.... `Est une fonction de retour pour le chargement de l 'échec terminé et de l' échec du chargement, respectivement.

`Browser.document.body.appendChild(script);`Ajoute l 'étiquette script créée à la page.

`var client:Object = new Browser.window.Demo1();`La catégorie des déclarations JS est mise à jour.

`client.start();`La fonction de l 'exemple.

Compiler le code d 'exécution.Ouvrez la console de Google pour voir la sortie:

**"Je suis chargé."**

**"Méthode d'appel"**

####Paramètres innerHTML à travers script

Les paramètres innerHTML permettent en fait d 'attribuer à innerHTML une valeur de format de texte JS.Ceci permet de convertir un fichier téléchargé en un contenu texte assigné à l 'étiquette.Voici un exemple.


```java

package {
    import laya.events.Event;
    import laya.net.HttpRequest;
    import laya.utils.Browser;
    
    public class Main {
        public function Main() {
            //初始化引擎
            Laya.init(500,500);
            var httpreq:HttpRequest = new HttpRequest();
            httpreq.on(Event.COMPLETE,this,this.completeHandler);
            httpreq.on(Event.ERROR,this,this.errorHandler);
            httpreq.send("demo1.js");
            
        }
        private function completeHandler(e:Object):void
        {
            var script:Object = Browser.document.createElement("script");
            Browser.document.body.appendChild(script);
            script.innerHTML = e;
            var client:Object = new Browser.window.Demo1();
            client.start();
            
        }
        private function errorHandler(e:Object):void
        {
            
        }
        
    }
}
```


Compiler et exécuter le code ci - dessus permet de voir que les effets sont identiques à ceux du chargement SRC.Cet exemple consiste à charger le fichier avec httprequest et à attribuer le contenu chargé à script.innerhtml.L 'étiquette exécute l' exécution JS.Bien entendu, cet exemple est rempli par httprequest et le développeur peut le charger par la méthode laya.loader.load.

####Procédé eval de chargement


```java

        private function completeHandler(e:Object):void
        {
            Browser.window.eval(e);
            var client:Object = new Browser.window.Demo1();
            client.start();
            
        }
```


On a changé la fonction de chargement.`Browser.window.eval(e);`Puis compilez, ouvrez la console et découvrez que l 'effet est le même.Ça n 'a rien à voir avec l' étiquette script.

Résumé: les trois méthodes usuelles ci - dessus permettent de charger dynamiquement des fichiers JS.Quelle différence y a - t - il entre les trois méthodes?

- l 'étiquette script src est chargée d' un fichier JS qui peut être différent de la page actuelle, c 'est - à - dire qu' il peut être téléchargé dans plusieurs domaines.

- script.innerhtml reçoit le format textuel d 'un fichier JS dans lequel le chargement est effectué de manière XMLHttpRequest, de sorte que le fichier JS ne peut pas être transversal ou que le chargement est autorisé, l' avantage étant que le fichier JS peut être personnalisé, par exemple en chiffrant, en insérant d 'autres formats, puis En le chargeant dans un format binaire et en le décodant en vrac.

- l'approche suivie par eval et script.innerhtml est pratiquement la même.Le contenu est aussi très aléatoire.Toutefois, sans recommander cette méthode, eval est une méthode qui est rapidement abandonnée et qui n 'est recommandée ni pour les performances ni pour la sécurité.Pour une raison précise, voir l'explication de MDN.

Https: / / developer.mozilla.org / zh - cn / docs / WEB / javascript / Reference / Global u objects / eval.


  **En fait, le chargement peut également être mis dans le Worker, ce qui réduit encore la pression de rendu des pages et le phénomène karton.Les développeurs peuvent lire le programme de travail et le diffuser.**

###Voix de l 'élément Dom de layaair

En parlant de la voix de HTML5, le développeur pourrait penser pour la première fois à l 'étiquette audio, mais l' étiquette audio est extrêmement vulnérable au projet de développement.L'API audio, le W3C m'en a donné assez.[接口](https://www.w3.org/TR/webaudio/)- Oui.[mdn](https://developer.mozilla.org/zh-CN/docs/Web/API/AudioContext)La description ci - dessus est également plus détaillée.Sur un navigateur qui supporte des améliorations, l 'API acoustique peut produire des effets visuels extrêmement variés.En raison de l 'abondance de son API, nous avons ici une introduction simple à l' utilisation de l 'analyse spectrale de la synthèse audio, du son mélangé, du son, des données audio, des développeurs de l' audio et des filtres tels que l 'amélioration du son, etc.

Voyons un exemple sur MDN.Dans cet exemple, créer un tampon de 2 secondes et le remplir avec du bruit blanc, puis passer par`AudioBufferSourceNode`] (https: / / developer.mozilla.org / zh - cn / docs / WEB / API / audiobuffersourcenode).


```javascript

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
// Stereo
var channels = 2;
// Create an empty two-second stereo buffer at the
// sample rate of the AudioContext
var frameCount = audioCtx.sampleRate * 2.0;

var myArrayBuffer = audioCtx.createBuffer(2, frameCount, audioCtx.sampleRate);

window.onclick = function() {
  // Fill the buffer with white noise;
  //just random values between -1.0 and 1.0
  for (var channel = 0; channel < channels; channel++) {
   // This gives us the actual ArrayBuffer that contains the data
   var nowBuffering = myArrayBuffer.getChannelData(channel);
   for (var i = 0; i < frameCount; i++) {
     // Math.random() is in [0; 1.0]
     // audio needs to be in [-1.0; 1.0]
     nowBuffering[i] = Math.random() * 2 - 1;
   }
  }

  // Get an AudioBufferSourceNode.
  // This is the AudioNode to use when we want to play an AudioBuffer
  var source = audioCtx.createBufferSource();
  // set the buffer in the AudioBufferSourceNode
  source.buffer = myArrayBuffer;
  // connect the AudioBufferSourceNode to the
  // destination so we can hear the sound
  source.connect(audioCtx.destination);
  // start the source playing
  source.start();
}
```


Exécutez le Code JS ci - dessus et cliquez sur la page pour entendre la lecture sonore.Et layaair?


```java

package
{
    import laya.events.Event;
    import laya.utils.Browser;
    
    public class Main
    {
        public function Main()
        {
              Laya.init(500,500);
              Laya.stage.bgColor ="#ff0000"
             
              var audioCtx:Object = new (Browser.window.AudioContext || Browser.window.webkitAudioContext)();
              // Stereo
              var channels:int = 2;
              // Create an empty two-second stereo buffer at the
              // sample rate of the AudioContext
              var frameCount:int = audioCtx.sampleRate * 2.0;
              
              var myArrayBuffer:Object = audioCtx.createBuffer(2, frameCount, audioCtx.sampleRate);
              Laya.stage.on(Event.CLICK,this,function():void {
                  // Fill the buffer with white noise;
                  //just random values between -1.0 and 1.0
                  for (var channel:int = 0; channel < channels; channel++) {
                      // This gives us the actual ArrayBuffer that contains the data
                      var nowBuffering:Object = myArrayBuffer.getChannelData(channel);
                      for (var i:int = 0; i < frameCount; i++) {
                          // Math.random() is in [0; 1.0]
                          // audio needs to be in [-1.0; 1.0]
                          nowBuffering[i] = Math.random() * 2 - 1;
                      }
                  }
                  
                  // Get an AudioBufferSourceNode.
                  // This is the AudioNode to use when we want to play an AudioBuffer
                  var source:Object = audioCtx.createBufferSource();
                  // set the buffer in the AudioBufferSourceNode
                  source.buffer = myArrayBuffer;
                  // connect the AudioBufferSourceNode to the
                  // destination so we can hear the sound
                  source.connect(audioCtx.destination);
                  // start the source playing
                  source.start();
              });
        }
        
    }
}
```


Compilez l 'exemple ci - dessus, cliquez sur la scène et entendrez le son de la lecture.L 'exemple est simple: créer une voix dans la mémoire.Et le chargement extérieur?

Voici l 'exemple suivant: Nous chargeons un fichier audio externe.Au fait, dessinons le spectre de la voix.



 
```java

package
{
    import laya.events.Event;
    import laya.net.HttpRequest;
    import laya.net.Loader;
    import laya.utils.Browser;
    
    public class Main
    {
        private var AudioContext:Object;
        private var audioContext:Object;
        private var analyser:Object;
        private var audioBufferSourceNode:Object;
        public function Main()
        {
              Laya.init(500,500);
              AudioContext =Browser.window.AudioContext || Browser.window.webkitAudioContext;
              audioContext = new AudioContext();
              analyser = audioContext.createAnalyser();
              analyser.fftSize = 256;
              Laya.stage.once(Event.CLICK,this,clickHandler);
              
        }
        private function clickHandler(e:Object):void
        {
            var http:HttpRequest = new HttpRequest();
            http.on(Event.COMPLETE,this,completeHandler);
            http.send("489.mp3","","get",Loader.BUFFER);
        }
        private function completeHandler(e:Object):void
        {
            audioContext.decodeAudioData(e,decodeAudioData.bind(this));
        }
        private function decodeAudioData(buffer:Object):void
        {
            audioBufferSourceNode = audioContext.createBufferSource();
            audioBufferSourceNode.connect(analyser);
            analyser.connect(audioContext.destination);
            audioBufferSourceNode.buffer = buffer;
            audioBufferSourceNode.start(0);
            Laya.timer.loop(1,this,this.drawHandler);
        }
        private function drawHandler():void
        {
            Laya.stage.graphics.clear();
            var dataArray:Uint8Array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(dataArray);
            var step:int = Math.round(dataArray.length / 60);
            for (var i:int = 0; i < 40; i++) {
                var energy:int = (dataArray[step * i] / 256.0) * 50;
                for (var j:int = 0; j < energy; j++) {
                    Laya.stage.graphics.drawLine(20 * i + 2, 200 + 4 * j,20 * (i + 1) - 2, 200 + 4 * j,"#ff0000",1);
                    Laya.stage.graphics.drawLine(20 * i + 2, 200 - 4 * j,20 * (i + 1) - 2, 200 - 4 * j,"#ffff00",1);
                }
                Laya.stage.graphics.drawLine(20 * i + 2, 200,20 * (i + 1) - 2, 200,"#ff0000",1);
            }
        }
        
    }
}
 ```


Compiler les éléments qui se trouvent au - dessus, cliquer sur la scène et voir le spectre du son.Figure ci - dessous.

![6](img/6.gif)

Résumé: on peut voir que la fonction sonore de web est de plus en plus puissante et qu 'il est tout à fait possible de faire un lecteur Web sans tenir compte de la compatibilité de certaines machines de bas de gamme.Ce n 'est qu' un effet Spectral que l 'développeur peut essayer de mélanger le son, filtrer le son, etc.L 'API associé peut être consulté en MDN.


###Élément Dom iframe de layaair

Nous utilisons en général iframe lors de l 'insertion d' un certain nombre de sites Web tripartites, même les canaux tripartites sont en grande partie intégrés dans une application par iframe.L'utilisation de l'iframe se fait également sentir dans nos projets.On trouvera ci - après un exemple de l'application d'iframe au projet.

Construire un nouveau projet vide avec l 'id.Code:


```java

package
{
    import laya.device.media.Video;
    import laya.events.Event;
    import laya.utils.Browser;
    
    public class Main
    {
        public function Main()
        {
          Laya.init(500,500);
          Laya.stage.once(Event.CLICK,this,this.clickHandler);
        }
        private function clickHandler():void
        {
            var iframe:Object = Browser.document.createElement("iframe");
            iframe.style.position ="absolute";//设置布局定位。这个不能少。
            iframe.style.zIndex = 100;//设置层级
            iframe.style.left ="100px";
            iframe.style.top ="100px";
            iframe.src = "http://ask.layabox.com/";
            Browser.document.body.appendChild(iframe);
        }
        
    }
}
```


Il faut rappeler au développeur que le positionnement et la hiérarchie doivent se souvenir des paramètres.De nombreux développeurs ne se rendent pas compte qu 'iframe s' enfuit en dessous de la couche de jeu sans le voir.