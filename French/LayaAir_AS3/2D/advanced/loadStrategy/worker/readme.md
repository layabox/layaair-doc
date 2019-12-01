##Multi - worker

> Le Worker dans le présent document se limite à l 'appui d' exploitation du mode HTML 5 dans le mode navigateur, le Worker n 'étant pas pris en charge dans le programme layanative Packaging app

Traditionnellement, les navigateurs sont des fils uniques qui obligent tous les scripts de l 'application à fonctionner ensemble dans une seule ligne ui.Bien que vous puissiez créer une simulation d 'exécution simultanée de plusieurs tâches en utilisant des événements du modèle d' objet de document (DOM) et des API tels que settimeout, il suffit d 'une tâche à forte intensité de calcul pour que l' expérience de l 'utilisateur soit complètement redressée.La fonction Worker a été introduite dans le HTML5, et en utilisant le Web Worker, nous pouvons faire fonctionner JavaScript sur l 'arrière - plan du navigateur, sans empiéter sur les propres lignes du navigateur.Web Worker peut améliorer la performance globale de l 'application et l' expérience de l 'utilisateur.Les fils peuvent exécuter des tâches sans interférence avec l 'interface utilisateur.

###Original Worker

Le travail Web est divisé en deux types, le travail Web spécialisé et le travail Web partagé.Le travail Web dedicated prend fin avec la fermeture de la page active; cela signifie que le travail Web dedicated ne peut être consulté que par la création de la page.Le travail Shared Web correspondant peut être consulté sur plusieurs pages.Cependant, le travail Web est limité et toutes les interfaces et méthodes ne sont pas disponibles.

##- le Web - worker n'a pas accès au noeud Dom; Web Worker无法访问全局变量或是全局函数；

##- web - worker n'a pas accès à des fonctions telles que Alert () ou confirm;Web - worker n 'a pas accès aux variables globales du navigateur telles que window, document, etc.;


 [workder 支持的函数](https://developer.mozilla.org/En/DOM/Worker/Functions_available_to_workers)La page fournit une liste de fonctions globales supportées par Worker.L 'développeur peut voir le procédé lui - même.

####Description de la méthode

#####Fonction de construction

La fonction de configuration crée un travail Web capable d 'exécuter un script situé sur l' URL spécifié.Le script doit suivre.[同源策略](https://developer.mozilla.org/en/Same_origin_policy_for_JavaScript)".

#####Postmessage ()

Un message est transmis au domaine d 'action interne du Worker.Le procédé reçoit un paramètre distinct, c 'est - à - dire les données à transmettre au Worker.Les données peuvent être n 'importe quelle valeur ou passer par[结构化拷贝](http://www.whatwg.org/specs/web-apps/current-work/multipage/common-dom-interfaces.html%3Ch1%3Etransferable)Les objets JavaScript traités par l 'algorithme, en d' autres termes, peuvent comprendre des références circulaires.

#######Paramètres

- amesage.

L 'objet est transmis au Worker; il sera inclus dans le champ Data de l' objet d 'événement transmis à la fonction de traitement d' un message.Vous pouvez transmettre n'importe quelle valeur ou passer.[结构化拷贝](http://www.whatwg.org/specs/web-apps/current-work/multipage/common-dom-interfaces.html%3Ch1%3Etransferable)L 'objet JavaScript traité par l' algorithme peut comprendre une référence cyclique.

- transferlist.

Une matrice d 'objets facultative est utilisée pour transférer leur propriété.Si la propriété d'un objet est transférée, il ne sera pas utilisable dans le contexte initial, mais seulement dans le cadre du travail transféré.

#####Terminate ()

Arrêtez immédiatement le travail.Ce procédé ne laisse aucune chance à Worker de terminer l 'opération; il s' agit simplement d' arrêter immédiatement

###Attribut

124 \ \ Property \ \ 124 \ \ type \ \ 124
124 ---------------------------------------------------------------------------------------------------------------------------------------------------------------
- 124.`onmessage`".`EventListener`] (https: / / developer.mozilla.org / zh - cn / docs / WEB / API / eventlistener) \ \ 124 * une fonction d'écoute d'événements, chaque fois qu'elle est disponible`message 属性的 ``MessageEvent`Cette fonction est exécutée lorsque la bulle sort du Worker.Event`data`L 'attribut contient le contenu du message.- 124.
- 124.`onerror`".`EventListener`] (https: / / developer.mozilla.org / zh - cn / docs / WEB / API / eventlistener) \ \ 124 * par type`error `A`ErrorEvent 从 worker 中冒泡出来时就会执行该函数。`- 124.

On va voir comment on l 'utilise.

Ajouter un nouveau fichier JS à l 'index.html avec le code suivant:


```javascript

var myWorker = new Worker("my_task.js");

myWorker.onmessage = function (oEvent) {
  console.log("Called back by the worker!\n");
};
myWorker.postMessage("start"); // start the worker.
```


Créer un nouveau fichier my ` U task.js, le code suivant


```javascript

self.addEventListener('message', function (e) {
    var xmlreq = new XMLHttpRequest();
    xmlreq.responseType = "text";
    xmlreq.onload = function (e) {
        var data = e.currentTarget.response;
        self.postMessage(data);
    }
    xmlreq.open("get","res/atlas/comp.json");
    xmlreq.send()
}, false);
```


Cet exemple, qui consiste à charger un fichier dans un Worker et à l 'envoyer au processus hôte, permet de voir la sortie de données sur le console de navigateur.

`var myWorker = new Worker("my_task.js")`;; mise à jour d 'un travail, transfert dans un fichier JS, via`myWorker.postMessage("start")`; notification du démarrage de la ligne Worker.

​`self.addEventListener('message',xxx)`B) l 'écoute d' un message de notification de l 'itinéraire principal.

​`self.postMessage(data);`Envoie les données à la ligne principale.

Remarque & ‧‧;: Web Worker ne supporte pas le Protocole de fichiers, de sorte que l 'ouverture directe ne peut pas fonctionner, l' développeur peut s' associer au serveur de l 'IDE, et les effets peuvent être visibles par l' intermédiaire du site Web.Ouvre la console pour voir si les données sont imprimées.



##Laya Application

Dans Laya, le travail interne est encapsulé pour résoudre le problème du chargement d 'images décodées, l' développeur peut ouvrir le commutateur ou définir son propre travail pour résoudre le problème de la consommation de CPU dans le projet.

Pour faciliter la démonstration, nous avons créé un nouveau projet ui.L 'interface d' appel simple est la suivante:


```java

package {
	import laya.net.Loader;
	import laya.utils.Handler;
	import view.TestView;
	import laya.net.WorkerLoader;
	import laya.webgl.WebGL;
	public class LayaUISample {
		
		public function LayaUISample() {
			//初始化引擎
			Laya.init(600, 400,WebGL);
			//设置Laya提供的worker.js的路径
			WorkerLoader.workerPath = "libs/worker.js";
			//开启worker线程
            WorkerLoader.enable = true;
			//加载引擎需要的资源
			Laya.loader.load([{url: "res/atlas/comp.json", type: Loader.ATLAS}], Handler.create(this, onLoaded));
		}
		
		private function onLoaded():void {
			//实例UI界面
			var testView:TestView = new TestView();
			Laya.stage.addChild(testView);
		}
	}
}
```


​`WorkerLoader.workerPath = "libs/worker.js";`Définissez l 'itinéraire de worker.js, fourni officiellement par Laya, que nous avons copié dans notre propre trajet, qui est dans le hangar de moteurs de Laya.Je l 'ai installé sous libs.

`WorkerLoader.enable = true;`Ouvre le mode Worker pour charger l 'image décodée, libérant ainsi considérablement la pression de décodage de la ligne principale.

La méthode ci - dessus est la méthode officielle de décodage, et nous pouvons également définir le travail pour optimiser l 'emplacement du CPU consommé dans le projet.On trouvera ci - après une illustration de l'emploi de cette expression.On peut transplanter le script JS du début du programme.


```java

package {
	import laya.utils.Browser;
	import laya.webgl.WebGL;

	public class WokerDemo {
		
		public function WokerDemo() {
			//初始化引擎
			Laya.init(600, 400,WebGL);
			var worker:* = Browser.window.Worker("my_task.js");
            worker.onmessage = function (oEvent):void {
                console.log("Called back by the worker!\n");
            };
            worker.postMessage("start"); // start the worker.
		}
	}
}
```


Mon code u task.js contient également un fichier.Code:


```javascript

self.addEventListener('message', function (e) {
    var xmlreq = new XMLHttpRequest();
    xmlreq.responseType = "text";
    xmlreq.onload = function (e) {
        var data = e.currentTarget.response;
        self.postMessage(data);
    }
    xmlreq.open("get","res/atlas/comp.json");
    xmlreq.send()
}, false);
```


Compilez le code d 'exécution et voyez que la console de commande émet les données que nous chargeons sur comp.json.

En résumé: Web Worker nous appliquons généralement à l 'analyse de fichiers chargés, tels que les grands fichiers json, les calculs plus longs ou certaines ressources qui n' ont pas besoin d 'un chargement immédiat peuvent être mises en ligne de fond, de sorte que les utilisateurs ne se sentent guère à l' aise avec le carton de la ligne principale.Améliorer la fluidité des projets.Améliorer l 'expérience des utilisateurs.

##- des détails.`Web Workers`Regardez.[W3C的xhr 标准](https://www.w3.org/TR/workers/)• 详细的api和介绍参考[这里](https://developer.mozilla.org/en-US/docs/Web/API/Worker/)
- Oui.[workder 支持的函数](https://developer.mozilla.org/En/DOM/Worker/Functions_available_to_workers)La page fournit une liste de fonctions globales supportées par Worker.