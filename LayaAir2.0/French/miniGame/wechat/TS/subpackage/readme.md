# 微信小游戏分包实战

> Author: Charley

Pour certains jeux de grande envergure, les paquets initiaux 4M des jeux de micro - messagerie sont loin d 'être suffisants, car le seul JS peut dépasser 4M, de sorte qu' avant le lancement de la base de jeu de 2.1, il ne peut être qu 'une fonction de coupure continue jusqu' à ce que JS soit coupé en dessous de 4M.Si quelqu'un ne sait pas pourquoi?Après avoir appris quelques bases, on verra le texte.) Comment la base de données de jeu de petite taille permet - elle d'étendre le paquet téléchargé à 8m à partir de la version 2.1 sous forme de sous - traitance?

**Cet article présente non seulement les modalités de sous - traitance, mais aussi les problèmes communs rencontrés par les jeux de micro - messages dans le processus de sous - traitance.**



###I. faut - il vraiment sous - traiter?

La Sous - traitance peut se heurter à des problèmes si le processus de sous - traitance ou les promoteurs du domaine Window sont moins familiers.En outre, avant d'envisager la Sous - traitance, devons - nous analyser si nos projets sont réellement nécessaires?En fait, pour la plupart des produits actuels, il est possible de mettre en ligne des produits de jeux sans sous - traitance.

####A - t - on utilisé un mode de chargement ou de séparation ui?

La plupart des concepteurs du moteur layaair ont été fabriqués par layaairide.

Dans les options de mode ui F9 et dans le gestionnaire de projet, les options de type Export lorsque vous cliquez à droite sur chaque page UI pour définir des attributs par défaut sont visibles en mode intégré, en mode chargement, en mode séparation, et les trois options.

![图1](img/1.png) 


**Mode intégré par défaut**Dans ce mode, lorsque la page ui est exportée, des éléments tels que des informations de configuration sont exportés en tant que fichier de code d 'article.Les fichiers JS sont publiés en fin de compte dans un petit jeu.Il s' ensuit qu 'un certain nombre de petits jeux de volume local sont utiles.Alors...**Pour réduire la taille du paquet d 'un petit jeu, le mode ui exporté peut être transformé en mode de chargement ou de séparation.**Dans les deux modes, les informations de configuration de page, etc., sont exportées en tant que fichier json, qui peut être utilisé pour un téléchargement dynamique par l 'URL sans occuper l' espace de paquetage local.

]**Tips:**
]
> 1. Le mode de chargement est différent du mode de séparation en ce qu 'il exporte toutes les pages ui en un fichier json, et le mode de séparation en ce que chaque page ui est exportée en un seul json indépendant.
]
> 2, il convient de noter que le mode de chargement et le mode de séparation sont ceux qui sont exportés par json et qui nécessitent le chargement d 'un code d' écriture avant d 'être utilisés.Le mode intégré n 'est pas nécessaire.

En résumé, le mode de chargement et le mode de séparation permettent de réduire la taille du paquet JS.S'il est possible de le faire, il n'est peut - être pas nécessaire de recourir à des sous - traitants.Le cas échéant, le projet sera exécuté.

#### **Supprimer le Code JS inutile**

En l'absence de sous - traitance, les références à JS figurant sur la page HTML seraient regroupées dans un seul document JS (code.js), à moins qu'il n'en soit fait mention autrement dans le projet.Sinon, d 'autres JS qui ne sont pas dans la page HTML peuvent être supprimés directement, par exemple des bibliothèques de moteurs inutilisées.Il est possible de les supprimer directement dans le répertoire des projets, ce qui ne se reproduira plus au moment de leur publication.

####Compression and confusion

En comprimant le Code JS confus, le volume de paquets peut être sensiblement réduit.Si JS n 'a pas dépassé 4M, il n' y a pas de partage.Des éléments tels que des ressources peuvent être utilisés à partir du chargement dynamique de l 'URL, après le premier chargement, il existe un contenu de mémoire cache physique courant ne dépassant pas 50 m, et la prochaine ouverture n' est pas nécessaire de charger.



###Apprendre le document officiel de sous - traitance du petit jeu

Avant la Sous - traitance opérationnelle, les documents officiels n 'avaient pas été lus, il fallait les examiner attentivement.C 'est très utile, peu importe ce que l' on peut comprendre, de bien comprendre les éléments du document avant de mieux comprendre la Sous - traitance.Les liens sont les suivants, s' il vous plaît regarder après l 'étape suivante.

[https://developers.weixin.qq.com/minigame/dev/tutorial/base/subpackages.html](https://developers.weixin.qq.com/minigame/dev/tutorial/base/subpackages.html)



###Mode officiel de sous - traitance

Bien que de nombreux développeurs aient déjà lu les documents officiels de sous - traitance, il faut revenir ici sur l 'essentiel.

####Configuration de champs dans le game.json pour le nom de sous - traitance et le chemin de sous - traitance


```json

{
  ...
  "subpackages": [
    {
      "name": "stage1",
      "root": "stage1/" // 可以指定一个目录，目录根目录下的 game.js 会作为入口文件，目录下所有资源将会统一打包
    }, {
      "name": "stage2",
      "root": "stage2.js" // 也可以指定一个 JS 文件
    }
  ]
  ...
}
```


Dans les subpackages, il peut y avoir plusieurs noms et root, chaque groupe représentant un sous - traitant unique, ne pouvant pas dépasser 4M, et tous les jeux ne pouvant pas contenir plus de 8m.

On va d'abord examiner la structure et les notes explicatives de la configuration de la Sous - traitance, pour une première compréhension.Si l 'on ne comprend pas encore, on peut l' interpréter en même temps que la configuration de l 'opération suivante.

####Code d 'exemple officiel de sous - traitance

C'est officiel.[wx.loadSubpackage()](https://developers.weixin.qq.com/minigame/dev/document/subpackages/wx.loadSubpackage.html)L 'API déclenche le téléchargement du sous - traitant et, après avoir appelé wx.loadsubpackage, le téléchargement et le chargement du sous - traitant déclenchent le téléchargement et, une fois le chargement terminé, le téléchargement est notifié par le retour du sous - traitant wx.loadsubpackage.L'exemple est le suivant:


```javascript

const loadTask = wx.loadSubpackage({
  name: 'stage1', // name 可以填 name 或者 root
  success: function(res) {
    // 分包加载成功后通过 success 回调
  },
  fail: function(res) {
    // 分包加载失败通过 fail 回调
  }
})
```


Pendant que le chargement réussit, wx.loadsubpackage retourne à un[LoadSubpackageTask](https://developers.weixin.qq.com/minigame/dev/document/subpackages/LoadSubpackageTask.html)Pour obtenir le rythme de téléchargement actuel par loadsubpackagetask.L'exemple est le suivant:


```javascript

loadTask.onProgressUpdate(res => {
  console.log('下载进度', res.progress)
  console.log('已经下载的数据长度', res.totalBytesWritten)
  console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
})
```


Ce document traite essentiellement de la méthode de sous - traitance et des problèmes de sous - traitance que rencontrent souvent les concepteurs dans le domaine window.Les progrès de téléchargement sont plus faciles à comprendre et ne rencontrent pas de problèmes de rétroaction de la part des concepteurs, de sorte qu'ils ne sont pas mentionnés dans le Code de bataille réel et qu'en cas de problème, ils peuvent être soulevés au sein de la communauté.



###Téléchargement des exemples

J 'ai préparé deux exemples relativement simples pour chacun d' entre vous, après téléchargement, sous defaultdemo catalogue des exemples antérieurs à la Sous - traitance, sous subpackagedemo catalogue des exemples postérieurs à la Sous - traitance.L 'développeur peut, en lisant le document, aider à comprendre les petits sous - traitants de jeux en comparant les éléments avant et après sous - traitance.

Téléchargement à l'adresse suivante:[https://github.com/layabox/layaair-doc/raw/master/project/TS/TS_subPackage_Demo.zip](https://github.com/layabox/layaair-doc/raw/master/project/TS/TS_subPackage_Demo.zip)



###V. ÉLÉMENTS de la Sous - traitance opérationnelle

####Outils de développement de micro - messages et attention au projet de diffusion

La première étape de la Sous - traitance opérationnelle doit consister à créer un petit jeu dans un outil de développement de micromessagerie.Parce qu 'une fois le Sous - traitant utilisé le mécanisme de chargement du petit jeu, le navigateur ne peut pas courir, et l' ensemble du processus de débogage est réalisé dans l 'outil de démarrage de micromessagerie.Par conséquent, téléchargez les exemples prêts pour vous, ouvrez l 'exemple sous le catalogue defaultdemo et Publiez une version de petit jeu.Passez le processus d 'ajustement de base.

Ce qu'il convient de noter ici, c'est que l'article téléchargé a été téléchargé car il s'agit d'un répertoire qui a été publié par défaut et qui doit donc être publié sous forme de catalogue local.

####Version de base

Il faut vérifier quelle est la version de la base de débogage de l 'outil de l' émetteur de micro - messages, sinon, la mise en œuvre de cette version ne prend pas en charge les sous - traitants, ce qui risque de poser des problèmes de débogage.

L 'outil de développement utilise les versions 1.02.1806120 et plus.

La base de données utilise les versions 2.1.0 et plus haut.

Ce document utilise 2.2.0.Comme le montre la figure 1:

![图2](img/2.png) 


(Figure 2)

####Fonctionnement associé à un catalogue de sous - traitants

#####Modifier le game.json

Avant la Sous - traitance, nous devons planifier le catalogue de sous - traitants et en tenir compte dans le game.json.

Ici, nous réglons simplement un catalogue de sous - traitants B.Vous pouvez commencer par le code suivant:


```json

{
  "deviceOrientation": "landscape",
  "showStatusBar": false,
  "networkTimeout": {
    "request": 10000,
    "connectSocket": 10000,
    "uploadFile": 10000,
    "downloadFile": 10000
  },
  "subpackages": [
    {
      "name": "subpackage",
      "root": "js/subpackage/"
    }
  ]
}
```


Programmer et paramétrer le catalogue de sous - traitants du jeu complet.Nous allons créer un répertoire de sous - traitants et des fichiers.

#####Attention à la route root.

Projet ts`src`Au moment de la compilation et de la publication, si`bin/index.html`Il y a des références.Il sera intégré au code.js en même temps que la Bibliothèque des moteurs.Non.`bin/index.html`La référence est directement copiée`js`Table des matièresAlors...`root`N 'oublie pas JS.Comme le montre la figure 3.

![图3](img/3.png) 


(Figure 3)

#####Un grand poêle

Au moment de la Sous - traitance, il existait également un trou résultant de la compilation de l'IDE, c'est - à - dire que chaque fois que le projet ts était compilé, de nouveaux j à Bin étaient générés.Cependant, après chaque création, la référence JS générée est automatiquement mise à jour dans l 'index.html.Toutefois, toutes les références qui viennent d'être faites dans l'index.html seront regroupées dans le code.js, c'est - à - dire le Code de sous - traitance, et nous ne voulons pas qu'il soit intégré dans le code.js.Donc, après chaque compilation, avant de lancer un petit jeu.Il faut ouvrir l 'index.html pour voir si j' ai été cité pour le Sous - traitance.S' il est cité, il faut le noter.Comme le montre la figure 4.

![图4](img/4.png) 


(Figure 4)

Si vous avez le temps de penser à l 'idee pour résoudre le problème, faites attention avant de le résoudre.Et d 'éviter que les références n' aboutissent à un échec de sous - traitance lors de la publication.

Si ce test n 'est pas très agréable.Il est recommandé aux promoteurs de créer un nouveau projet pour le contenu des sous - traitants.L 'équivalent d' un projet principal, chacun sous - traitant un projet.Chargez les autres sous - traitants dans le paquet principal et utilisez le domaine Window pour interagir.

> Description du chargement et du domaine Window qui permet de continuer à consulter le texte.



#####Créer un jeu.js

Bien que des fichiers JS spécifiques puissent être désignés comme entrées dans root, le jeu d 'entrée par défaut de la table des matières a été utilisé dans l' exemple du document, étant donné qu 'il peut y avoir plusieurs JS dans le Sous - traitant.

Game.js nous allons directement à la table des matières de Bin, il suffit de créer une liste de sous - traitants compilée.Le chemin de sous - traitance JS a été introduit dans le game.js, comme indiqué ci - après.


```javascript

require('b.js');
```




####Début du codage de sous - traitance

L 'étape précédente de création du Répertoire de sous - traitants et du fichier de sous - traitance permet de commencer le codage de sous - traitants.

D'abord, en principe, puisque c'est une sous - traitance, alors...**Le lien logique entre le maître d'œuvre et le Sous - traitant doit être réduit au minimum.**".

Bien entendu, certains développeurs auront inévitablement besoin d'une certaine corrélation entre les sous - traitants principaux et les sous - traitants.L 'exemple simple que j' ai préparé pour vous, c 'est de mettre en sous - traitance une partie de la logique originale dans un sac principal.

Ouvrez l 'exemple sous le catalogue defaultdemo, nous ne conservons que la méthode usuelle d' affichage ui showui, dans le retour de retour après le chargement de l 'Atlas, et nous maintenons la logique de l' ui affiché pour la première fois.Affiche la logique de l 'écoute des boutons et du transfert de page dans b.ts.

Les codes b.ts séparés sont les suivants:


```javascript

/**
* 分包 
*/
module subpackage{

	export class b{
        private GameMain:any;
        private ui:any;
		constructor(){
             //监听按钮btnA的点击事件，触发后处理
            this.GameMain.newUI.btnA.on(Laya.Event.CLICK, this, this.showB);
		}

            //显示B页
        private showB():void
        {
            this.GameMain.showUI(this.ui.bUI,this.GameMain.newUI)

            //监听按钮btnB的点击事件，触发后处理
            this.GameMain.newUI.btnB.on(Laya.Event.CLICK, this, this.showA);
        }

        //显示A页
        private showA():void
        {
           this.GameMain.showUI(this.ui.aUI,this.GameMain.newUI)
        
            //监听按钮btnA的点击事件，触发后处理
            this.GameMain.newUI.btnA.on(Laya.Event.CLICK, this, this.showB);
        }
	}

}
//实例化
new subpackage.b();
```


Après la séparation du Code, n 'oublions pas d' appeler dans le paquet principal la méthode officielle de notification du chargement de sous - traitance et du retour du jeu de micromessagerie.Dans l 'exemple, nous chargeons le Sous - traitant directement dans le retour de l' Atlas.Et la sortie après le chargement.`success`Log.L'exemple est le suivant:


```javascript

//图集加载后回调
private onLoaded():void
{
    this.showUI(ui.aUI);
    
	//小游戏官方的分包加载方式
    const loadTask = wx.loadSubpackage({
        name: 'subpackage', // name 可以填 name 或者 root
        success: function(res) {
            // 分包加载成功后通过 success 回调
            console.log("success");
        },
        fail: function(res) {
            // 分包加载失败通过 fail 回调
            console.log("fail");
        }
    });       
}
```


A ce moment - là, selon le document officiel du petit jeu, en théorie, le processus de sous - traitance devrait être terminé, nous pouvons publier le petit Code de jeu et voir les effets dans l 'outil du développeur de micro - messages.

Nous pouvons continuer à lire le document.

####Domaine window

Dans le navigateur, tous par défaut sont dans le domaine window.Pour résoudre ce problème, l 'IDE publie tous les projets js avec les moteurs dans le code.js, et maintenant le programme de sous - traitance sera confronté au problème du domaine window.Par conséquent, lorsque le paquet principal et le Sous - traitant ont besoin d 'un appel, il faut d' abord placer la fonction ou la variable appelée dans le domaine window.Puis, il faut mettre le mot clé Window devant.On trouvera ci - après des exemples de projets concrets.

Tout d 'abord, nous avons placé dans le domaine Window les catégories ui et i utilisées dans le Sous - traitant principal, de sorte que le Sous - traitant puisse être retiré directement de Window lorsque cela est nécessaire, comme indiqué ci - après.


```javascript

//把需要被分包中使用的放到window域里
window["ui"] = ui;
window["GameMain"] = new GameMain();
```


Dans les sous - traitants b.ts, nous allons retirer les catégories Window Zhong ui et gamemain.Ajouter le code suivant:


```javascript

//从window域里取出
this.ui = window["ui"];
this.GameMain = window["GameMain"];
```


> dans des opérations concrètes précises, le développeur peut comparer deux exemples de sous - traitance avant et après la Sous - traitance.

De même, si le paquet principal est utilisé dans la catégorie de sous - traitants, il doit être placé dans le domaine Window avant d 'être retiré par le mot clé window.C'est aussi simple que cela.Par la connaissance du domaine window.Les problèmes de sous - traitance liés à Window peuvent être résolus.

###Recommandations pratiques des initiateurs

Le développeur peut commencer par l 'exemple que j' ai donné, par une tentative de sous - traitance, en cas de problème, voir ce document et la différence entre les deux exemples que j 'ai donnés.Cours dans un petit jeu de micro - lettres.Après une véritable compréhension de la Sous - traitance, il est procédé à une sous - traitance libre des jeux.S' il y a un problème, envoyez le problème à la communauté et téléchargez l 'exemple du projet Demo dans le Groupe.

Si vous trouvez que le développeur a de nouveaux problèmes de sous - traitance, je vais affiner ce document mis à jour.



##Appreciation

Si vous trouvez cet article utile pour vous, bienvenue à l 'auteur du Code de balayage, votre motivation est de nous pousser à écrire plus de documents de qualité.

![wechatPay](../../../wechatPay.jpg)