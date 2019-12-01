#Jsonp lecture de données par domaine

Les concepteurs de web ont largement utilisé jsonp.Et qu'est - ce que c'est?Est - ce un format de données?Quel rapport avec json?Layaair ne soutient pas jsop?On trouvera ci - après une réponse à chacune de ces questions.



###Qu'est - ce que c'est?

Jsonp (json with padding) est un "mode d 'utilisation" de json qui permet aux pages Web d' obtenir des informations à partir d 'autres noms de domaine (sites Web), c' est - à - dire des données de lecture transversale.Pourquoi avoir besoin d 'une technologie particulière pour accéder aux données de différents domaines (sites Web)?C 'est une stratégie d' homologation.La stratégie d 'homologation, une stratégie de sécurité bien connue proposée par Netscape, est maintenant utilisée par tous les navigateurs qui soutiennent JavaScript.

Il ressort de la définition que json est un format d 'échange de données et que jsonp est un protocole d' interaction de données entre les domaines.L 'un est un format de description d' informations, l 'autre est un procédé convenu de transmission d' informations qui peut être utilisé pour résoudre les problèmes d 'accès aux données transversales du navigateur principal.En raison d 'une politique d' homologation, les pages Web généralement situées à xxx.com ne peuvent pas communiquer avec des serveurs autres que xxx.com, à l 'exception des éléments Dom de HTML, qui ne sont généralement pas soumis à des restrictions transversales, ce qui nous amène à penser que le SRC étiqueté < script > peut être utilisé pour obtenir des informations de json provenant d' autres sources, ce qui est le mode d 'utilisation.Le "jsonp".Les données capturées par jsonp ne sont pas celles de json, mais de JavaScript arbitraire, exécuté par un traducteur JavaScript au lieu d 'être analysées par un analyseur json.



###Comment?

Appeler le service URL sur le client pour obtenir les données du format jsonp.

Si un client souhaite visiter le site http: / / www.layabox.com /? Jsonp = Callback Function

Supposons que le client souhaite retourner les données json: ["data1, data2]

Alors, le vrai retour au client est script Tags: Callback Function (["data1", "data2"])

Le client peut ainsi écrire:

Ajouter l 'étiquette suivante sur votre page HTML:


```javascript

<script type = "text/javascript" src = ">
```


Cette réponse à votre fichier javascript peut se lire comme suit:


```javascript

<script type = "text/javascript">
function callbackFunction(data1,data2)
{
  //这里写你的回调逻辑
}
</script>
```


Comment écrit - on et utilise - t - il layaair?En fait, c 'est très simple ici, nous avons besoin d' un serveur pour voir les effets.Nous choisissons nodejs pour créer un simple serveur, l 'installation de nodejs n' est plus expliquée ici.On peut consulter le site Web de nodejs ou chercher des informations.

Après l 'installation de nodejs, nous pouvons créer un serveur simple en écrivant un script JS simple.Code:


```javascript

var http = require("http");
var sever = http.createServer(function(req,res){
  res.end("LayaSample.onComplete()");
});
sever.listen(9090)
```



```javascript

res.end("LayaSample.onComplete()");
```


Le serveur renvoie le client layasample.oncomplete () et exécute cette fonction.

Un serveur simple est créé à l 'aide de plusieurs lignes de code, puis une ligne de commande est ouverte pour exécuter le fichier JS ou le script avec nodejs.Le serveur est activé.



Ensuite, nous écrirons la logique du Front.Ouvrez l 'id de layaair pour créer un projet vide, sélectionnez la langue AS3, comme indiqué ci - après:


```javascript

var LayaSample = (function(){
    function LayaSample(){
        Laya.init(100,100);
        var script = Laya.Browser.createElement("script");
        Laya.Browser.document.body.appendChild(script);
        script.src = "http://localhost:9090/?a=1";
    }
    LayaSample.onComplete = function(){
        console.log("JSONP执行到这里");
    }
    return LayaSample;
})();
new LayaSample();
```



```java

var script = Laya.Browser.createElement("script");//这句话的含义是创建一个脚本的标签，原生的所有dom元素都可以通过这个方法创建。
```



```java

Laya.Browser.document.body.appendChild(script);//是把创建的script标签添加到body上。
```



```java

script.src = "http://localhost:9090/?a=1";//设置script的远程访问地址。这句话就可以请求到我们刚才创建的那个服务器。用谷歌打开LayaAirIDE生成的二维码地址。
```


![1](img/1.png)<br/>


Le F12 ouvre ensuite la console de Google et découvre que la sortie "jsonp exécute ici"; c 'est - à - dire qu' il exécute notre fonction complexe.C'est ainsi que j'ai fini de fonctionner.