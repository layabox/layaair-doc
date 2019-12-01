#Httprequest

Dans le cadre de ce projet, nous aurons certainement besoin d 'envoyer des demandes sur le site Web, et dans le moteur layaair, httprequest est notre catégorie de base.En fait, c'est un emballage primitif.`XMLHttpRequest `Pour mieux comprendre cette catégorie, nous commençons par xmlhtprequest.

##Primitive xmlhtprequest

####Brève description

XMLHttpRequest peut être interprété comme une demande de transfert hypertexte extensible.Il permet au client de transmettre des données entre le client et le serveur.Il fournit un moyen simple d 'obtenir des données par l' URL et ne permet pas de rafraîchir la page entière.Cela permet de mettre à jour une partie seulement de la page sans déranger l 'utilisateur.

###Attribut

124 attributs d 'étanchéité \ \ \ \ \ \ \ \ \ \ \ \ \
124 --------------------------------------------------------------------------------------------------------------------------------------------------------
124. Cet objet de fonction JavaScript est appelé lorsque les attributs readystate changent.- 124.
"124 États", "124 États", "4 États non signataires", "5 états sollicités".
Type d 'entité de réponse`responseType 来指定，`Oui.`ArrayBuffer`Oui.`Blob`[...]`Document`] (https: / / developer.mozilla.org / zh - cn / docs / WEB / API / document), objet JavaScript (c'est - à - dire "json") ou chaîne de caractères.Si la demande n 'est pas achevée ou échouée, la valeur est`null`- 124.
La réponse à cette demande est le texte de la réponse de l 'Agence, ou si la demande n' a pas abouti ou n 'a pas été envoyée.`null`**En lecture seule.**- 124.
La valeur peut changer le type de réponse.Dites au serveur le format de réponse que vous souhaitez.- 124.
124, État.`unsigned short`Code d 'état de réponse de la demande (par exemple,`状态码`Une demande réussie**Lecture seule.**- 124.
- 124.`statusText`- 124.`DOMString`".`200 OK`".
- 124.`upload`- 124.`XMLHttpRequestUpload`- 124.`upload 上添加一个事件监听来跟踪上传过程。`- 124.
- 124.`withCredentials`- 124.`boolean`Le \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \\Par défaut`false。`- 124.
124 \ \ 124 number \ \ 124 \ \ XDICT
​`withCredentials`Cette propriété n 'est généralement pas très utile ici, nous présentons brièvement, dans le Web, le navigateur de requêtes qui envoie le même domaine`cookie`Autoaddition`request header`, mais ne l 'emporte pas lors de l' envoi d 'une demande transversale.Parce que...`CORS`La norme prévoit que, par défaut, le navigateur ne peut envoyer aucune information d 'authentification lors de l' envoi d 'une demande transversale ().`credentials`".`cookies`Et`HTTP authentication schemes`".A moins que`xhr.withCredentials`Pour`true`(`xhr`L 'objet a un attribut qui s' appelle`withCredentials`, la valeur par défaut est`false`).Si l 'émetteur ne peut pas transporter de Cookie, consultez ceci.

###Méthode

####About ()

Si la demande a été envoyée, la demande est immédiatement suspendue.

####Getallresponseeheaders ()

Renvoie toutes les informations de tête de réponse (nom et valeur de réponse) et, si la tête de réponse n 'a pas encore été acceptée, renvoie`null`- Oui.

####Getresponseheader ()

Renvoie la valeur de la tête de réponse spécifiée et renvoie NULL si la tête de réponse n 'est pas acceptée ou si la tête de réponse n' existe pas.

####Open ()

Initialiser une demande

###### 参数

- Oui.`method`

Si le paramètre suivant est un URL qui n 'est pas HTML (s), ce paramètre est ignoré.

- Oui.`url`

URL à visiter dans la demande

- Oui.`async`

Un paramètre de valeur booléenne facultatif, par défaut True, signifie si une opération asynchrone est effectuée et, si la valeur est FALSE, le procédé send () ne renvoie rien jusqu 'à ce que les données de retour du serveur aient été acceptées.Si la valeur est vraie, une notification transparente à l 'émetteur est envoyée à l' observateur d 'événements associé.Cette valeur doit être vraie, si la propriété multiport est vraie, sinon il y aura un accident.

- Oui.`user`

Nom d 'utilisateur, paramètres facultatifs, autorisations d' utilisation; paramètres par défaut

- Oui.`password`
Password, selective parameters, for Authorization; password, selective parameters, for Authorization; par défaut, vide.
####Overridemitype type ()

Réécrire le type MIME renvoyé par le serveur.Ceci peut être utilisé, par exemple, pour forcer un flux de réponse à être traité et analysé comme un "text / XML", même si le serveur n 'indique pas que les données sont de ce type.Attention, cette méthode doit être utilisée avant le message ().

####Send ()

Si la demande est un mode asynchrone (par défaut), le procédé est immédiatement renvoyé. Au contraire, si la demande est un mode de synchronisation, le procédé ne revient qu 'une fois que la réponse à la demande a été pleinement acceptée.

- Oui.`ArrayBuffer`

- Oui.`Blob`

- Oui.`Document`

- Oui.`DOMString`

- Oui.`FormData`

- Oui.`null`

####Setrequestheader ()

Avant cela, vous devez confirmer l 'appel`open()`] (https: / / developer.mozilla.org / zh - cn / docs / WEB / API / xmlhtprequest)#La méthode a ouvert un URL.

###événement

Les principaux événements sont les suivants:

- Oui.`onloadstart`

- Oui.`onprogress`

- Oui.`onabort`

- Oui.`ontimeout`

- Oui.`onerror`

- Oui.`onload`

- Oui.`onloadend`

Ce que nous utilisons le plus souvent, c'est l'évolution, l'exécution, l'erreur, etc.

Chacun`XMLHttpRequest`Il y en a un à l'intérieur.`upload`Attribut`upload`Un.`XMLHttpRequestUpload`Objet`XMLHttpRequest`Et`XMLHttpRequestUpload`Tous hérités du même.`XMLHttpRequestEventTarget`L 'interface comporte donc l' événement susmentionné.

##Comment utiliser Laya?

XMLHttpRequest a été simplement encapsulée dans la Laya avec httprequest, qui lui a succédé avec eventdispather, avec une fonction d 'événement.Voici un exemple simple:


```java

package {
    import laya.events.Event;
    import laya.net.HttpRequest;

	public class LayaSample {
		
		public function LayaSample() {
			//初始化引擎
			Laya.init(1136, 640);
            var xhr:HttpRequest = new HttpRequest();
            xhr.http.timeout = 10000;//设置超时时间；
            xhr.once(Event.COMPLETE,this,completeHandler);
            xhr.once(Event.ERROR,this,errorHandler);
            xhr.on(Event.PROGRESS,this,processHandler);
            xhr.send("res/data.data","","get","text");
		}
        private function processHandler(data:Object):void
        {
            trace(data);
        }
        private function completeHandler(data:Object):void
        {
            
        }
        private function errorHandler(e:Object):void
        {
            
        }
	}
}
```


Voici l 'exemple ci - dessus, nous avons envoyé une simple demande en mode get.Pour obtenir un fichier distant dans un format de texte.Si nous demandons dynamiquement des données distantes, nous pouvons les modifier comme suit:


```

 xhr.send("http:xxx.xxx.com?a=xxxx&b=xxx","","get","text");//发送了一个get请求，携带的参数为a = xxxx,b=xxx
```


Un mode de données est demandé suivant le procédé Post:


```

 xhr.send("http:xxx.xxx.com","a=xxxx&b=xxx","post","text");
```


L 'accent est mis ici sur la fonction send, qui est séparée de la section send de xmlhtprequest.Voir paramètre ci - dessous

###### 参数

##- Oui.`url`Adresse distante de la demandeDonnées transmises par data; méthode générale de post pour transmettre ce paramètre.Les paramètres du procédé d 'accès sont assemblés avec l' URL.
##- Method for Method Transmission of data as getType de retour de messages responsetype
- headers attribue une tête de demande HTML spécifiée.


###### 属性

##- Oui.`http`: référence de XMLHttpRequest d 'origine, certains des attributs de XMLHttpRequest peuvent être définis pour cette propriété, par exemple timeout, xhr.http: / / www.timeout.10000, avec un dépassement de temps de 10 secondes. `data`: Données à renvoyer.
- Oui.`url`: demande URL.

###Extension

Dans le processus de développement, httprequest peut ne pas être en mesure de répondre à nos besoins, tels que le téléchargement de fichiers, par exemple en réglant les heures supplémentaires, par exemple les données de formulaire de fonctionnement, etc.L 'extension de httprequest est simple, vous pouvez soit hériter de httprequest, soit tout simplement réécrire vtprequest.Réécriture pour reconditionner la classe xmlhtprequest.Voici un exemple simple de Succession:


```java

package
{
    import laya.net.HttpRequest;
    
    public class HttpRequestExtension extends HttpRequest
    {
        public function HttpRequestExtension()
        {
            super();
        }
        public override function send(url:String, data:*=null, method:String="get", responseType:String="text", headers:Array=null):void
        {
            super.send(url,data,method,responseType,headers);
            this._http.upload.onprogress= function(e:Object):void
            {
                //上传进度
            }
            this._http.upload.onload= function(e:Object):void
            {
                
            }
            this._http.upload.onerror= function(e:Object):void
            {
                
            }
            this._http.upload.onabort = function(e:Object):void
            {
                
            }
        }
    }
}
```


Il s' agit d 'une démonstration de téléchargement de fichiers qui ajoute des événements d' upload à xmlhtprequest, dans lesquels le supérieur.send utilise simplement une approche paternelle, que l 'développeur peut ne pas utiliser pour écrire lui - même un ensemble distinct pour répondre à ses besoins.

##Conclusion

XMLHttpRequest est une catégorie d 'origine très vaste, très fonctionnelle, Laya boîtier seulement pour répondre aux besoins de base, certains besoins particuliers, il faut développer lui - même.

##- des détails.`XMLHttpRequest`Regardez.[W3C的xhr 标准](https://www.w3.org/TR/XMLHttpRequest/)• `XMLHttpRequest`发各种类型的数据，可以参考[发送数据](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Sending_and_Receiving_Binary_Data)Et[html5rocks上的这篇文章](http://www.html5rocks.com/zh/tutorials/file/xhr2/)
##- Oui.`XMLHttpRequest`Basic use[MDN的XMLHttpRequest介绍](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)•Demande transversale[W3C的 cors 标准](https://www.w3.org/TR/cors/)•




