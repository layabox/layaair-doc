# 图片与二进制


在页游时代，为了防止资源被盗取，通常的做法就是把图片等资源进行加密。所谓的加密就是打乱资源本来的存储字节，或者穿插一些东西。但是到了html5时代，发现基本都是直接加载的图片，为什么和页游时代做法不一样了呢？是不是html5不能加载解码二进制图片？当然不是。之所以不进行加密这层操作，主要是我们项目的源码完全暴露在浏览器端，根本没有什么秘密可言，即便加密了，写个脚本执行下就能拿到你的源码。但是为了满足开发者这方面的需求，我们简单说下，html5的如何进行二进制图片操作的。

###Xmlhtprequest

En parlant de chargement de fichiers, je dois dire que`XMLHttpRequest`Nous vous présentons brièvement le programme détaillé.`HTTPRequest`ChapitreXmlhtprequest est une interface du navigateur permettant à JavaScript d 'effectuer des communications http (s).C 'est le noyau d' Ajax dont nous parlons souvent.Les critères XMLHttpRequest sont divisés en level1 et level2. Ici, nous parlons de portée HTML5, donc level1 n 'a pas d' importance pour nous. Ici, nous l 'attribuons au html4, HTML5, notre préoccupation principale est level2.Pour faciliter la compréhension des concepteurs, nous avons comparé ces deux critères:

**Principales faiblesses de level:**

##- les demandes transversales ne peuvent pas être envoyées sous réserve de stratégies homologues;Impossible d 'envoyer des fichiers binaires (images, vidéo, audio, etc.), mais uniquement des données textuelles pures;
- il n'est pas possible d'obtenir en temps réel des informations sur les progrès accomplis au cours de la transmission et de l'acquisition des données, mais seulement de déterminer si elles ont été menées à bien;

**Améliorations apportées par level 2:**

##- la possibilité d'envoyer des demandes transversales, si le serveur le permet;Supporte l 'émission et la réception de données binaires;
##- ajout d 'objets formdata pour la transmission des données de formulaire;Des informations sur les progrès accomplis peuvent être obtenues lors de la transmission et de l'acquisition des données;
- les délais d'exécution des demandes peuvent être fixés;

Ce qui nous préoccupe le plus, c'est:**Supporte le système binaire d 'émission et de réception.**C 'est une percée majeure qui nous permet de télécharger des images binaires.

###Comment

Pour ce qui est du chargement, nous commençons ici par l 'original, puis nous passerons au moteur layaair, afin que le développeur puisse comprendre ce que cela signifie.Le chargement est effectué par un flux binaire dans lequel nous utilisons le flux binaire xmlhtprequest.Nous n 'avons plus à nous exprimer ici sur l' opération xmlhtprequest, nous l 'expliquerons dans un article distinct.Nous allons d 'abord charger l' essai selon le système binaire.Ici, on commence par le script JS.Code:


```JavaScript

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


Le procédé ci - dessus consiste à convertir le binaire en image à l 'aide du navigateur lui - même, le binaire en image à l' aide d 'un certain nombre d' autres procédés, tels que le chargement binaire, le décodage en base 64, puis l 'attribution de valeurs IMG, ou encore le dessin d' images avec des données binaires à partir de canvas, puis l 'attribution de valeurs todataurl à SRC d' IMG, etc.Il y a beaucoup de façons de transformer les images ici avec le plus de simplicité et d 'efficacité.

Après le chargement de l 'image, Personnalisez un objet xhr,`responseType`Attributs`arraybuffer`, pour personnaliser un objet blob`blob`Pour créer une étiquette IMG,`window.URL.createObjectURL(blob)`Crée un URL pointant sur l 'objet paramétrique et ajoute l' objet IMG créé au Body de la page Web pour l 'afficher.Insère ce code dans le fichier index.html et affiche nos images sur le site Web comme il se doit.

###Comment est Laya?

L 'exemple simple ci - dessus est que nous utilisons le script JS, alors comment utiliser l' IMG de Dom dans le projet?Nous en parlerons plus bas.

Créer un nouveau projet vide pour le code suivant:


```javascript

//初始化引擎
Laya.init(1136,640);
var sp = new Laya.Sprite();
var xhr = new Laya.HttpRequest();
xhr.once(Laya.Event.COMPLETE,this,completeHandler);
xhr.once(Laya.Event.ERROR,this,errorHandler);
xhr.send("res/monkey2.png","","get","arraybuffer");
function completeHandler(data){
  	//加载完成返回的data是arraybuffer；
    //.......这里处理我们加密的图片数据，假设我们的图片加密数据是在图片的前面写入了四个字节的数据
    //.......解密逻辑开始处理数据。
  	var byte = new Laya.Byte(data);//Byte数组接收arraybuffer
    byte.writeArrayBuffer(data,4);//从第四个字节开始读取数据
    var blob = new Laya.Browser.window.Blob([data], { type: "image/png" });
    var url = Laya.Browser.window.URL.createObjectURL(blob);//创建一个url对象；
    ////我们先用第一种方式显示图片到舞台；
    var sp = new Laya.Sprite();
    sp.loadImage(url);
    Laya.stage.addChild(sp);//添加到舞台
}
function errorHandler(url){

}
```


On peut dessiner une texture pour montrer:


```JavaScript

function completeHandler(data){
  	//加载完成返回的data是arraybuffer；
    //.......这里处理我们加密的图片数据，假设我们的图片加密数据是在图片的前面写入了四个字节的数据
    //.......解密逻辑开始处理数据。
    var byte = new Laya.Byte(data);//Byte数组接收arraybuffer
    byte.writeArrayBuffer(data,4);//从第四个字节开始读取数据
    var blob = new Laya.Browser.window.Blob([data], { type: "image/png" });
    var url = Laya.Browser.window.URL.createObjectURL(blob);//创建一个url对象；
    ////我们先用第一种方式显示图片到舞台；
    var sp = new Laya.Sprite();
    sp.loadImage(url);
    Laya.stage.addChild(sp);//添加到舞台 //用loader来加载url
    Laya.loader.load(url,Laya.Handler.create(this,showImg,[url]),null,Laya.Loader.IMAGE);
}
function errorHandler(url){
    var t = new Laya.loader.getRes(url);
    var ape = new Laya.Sprite();
    ape.graphics.drawTexture(t,0,0);
    Laya.stage.addChild(ape);
    ape.pos(200,0);
}
```


Le troisième type, on crée une texture pour montrer:


```javascript

function completeHandler(data){
    //加载完成返回的data是arraybuffer
    //......这里处理我们加密的图片数据，假设我们的图片加密数据是在图片前面写入了四个字节的数据
    //......解密逻辑开始处理数据
    var byte = new Laya.Byte(data);//Byte数组接收arraybuffer
    byte.writeArrayBuffer(data,4);//从第四个字节开始读取数据
    var blob = new Laya.Browser.window.Blob([byte.buffer],{type:"image/png"});
    var url = Laya.Browser.window.URL.createObjectURL(blob);//创建一个url对象
    var htmlImg = Laya.HTMLImage.create(url);//这里创建HTMLImage，这里要用HTMLImage.create
    htmlImg.onload = function(){
        var t = new Laya.Texture(htmlImg);
        var ape = new Laya.Sprite();
        ape.graphics.drawTexture(t,0,0);
        Laya.stage.addChild(ape);
        ape.pos(200,0);
    }
}
```


Le procédé décrit ci - dessus est un procédé de traitement binaire, mais il existe de nombreux autres procédés, tels que le traitement à distance de ressources d 'image en données de base 64 +, le chargement à l' extrémité frontale et le déchiffrement direct des données dopées.Nous utilisons l 'un de ces procédés pour charger l' affichage sur la scène.


```javascript

//初始化引擎
Laya.init(1336, 640);
var sp = new Laya.Sprite();
var xhr = new Laya.HttpRequest();
xhr.once(Laya.Event.COMPLETE,this,completeHandler);
xhr.once(Laya.Event.ERROR,this,errorHandler);
xhr.send("res/data.data","","get","text");

function completeHandler(data){
    //......加载完成，把base64字符串的图片数据提取出来；
    //......提取base64字符串；
    //......假设得到的数据是data；
    var sp = new Laya.Sprite();
    sp.loadImage(data);
    Laya.stage.addChild(sp);//添加到舞台
}
function errorHandler(e){

}
```


Nous utilisons tous ces exemples.`HttpRequest`Pour le chargement, le développeur peut l'utiliser.`Laya.loader.load`Méthode de chargement`Laya.loader.load`Pour une utilisation détaillée, déplacez - vous vers le document d 'enseignement pertinent.Il n 'y a pas de déclaration.

Voici l'exemple.`HttpRequest`Et le chargement d 'une seule ligne, il y a en fait plusieurs lignes dans HTML5, afin d' éviter que les pages de carton ne répondent pas et d 'améliorer l' expérience de l 'utilisateur, nous pouvons activer le Worker pour le chargement, nous allons expliquer le programme dans le chapitre Worker.