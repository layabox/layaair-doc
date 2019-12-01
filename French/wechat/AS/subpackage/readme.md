#Wēi xìn xiǎo yóu xì sous - traitance

> Author: Charley

Pour certains jeux de grande envergure, les paquets initiaux 4M des jeux de micro - messagerie sont loin d 'être suffisants, car le seul JS peut dépasser 4M, de sorte qu' avant le lancement de la base de jeu de 2.1, il ne peut être qu 'une fonction de coupure continue jusqu' à ce que JS soit coupé en dessous de 4M.Si quelqu'un ne sait pas pourquoi?Après avoir appris quelques bases, on verra le texte.) Comment la base de données de jeu de petite taille permet - elle d'étendre le paquet téléchargé à 8m à partir de la version 2.1 sous forme de sous - traitance?

**Cet article présente non seulement les modalités de sous - traitance, mais aussi les problèmes communs rencontrés par les jeux de micro - messages dans le processus de sous - traitance.**



###I. faut - il vraiment sous - traiter?

La Sous - traitance se heurte à des difficultés et à des obstacles lorsqu'il s'agit de sous - traiter le processus de micromessagerie ou de sous - traiter le projet as avec des concepteurs peu familiers.Nous devons donc analyser si notre projet a vraiment besoin d 'être sous - Traité avant d' envisager la Sous - traitance.En fait, pour la plupart des produits actuels, il est possible de mettre en ligne des produits de jeux sans sous - traitance.

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

Téléchargement à l'adresse suivante:[https://github.com/layabox/layaair-doc/raw/master/project/AS3/AS_subPackage_Demo.zip](https://github.com/layabox/layaair-doc/raw/master/project/AS3/AS_subPackage_Demo.zip)



###V. ÉLÉMENTS de la Sous - traitance opérationnelle

####Outils de développement de micro - messages et attention au projet de diffusion

La première étape de la Sous - traitance opérationnelle doit consister à créer un petit jeu dans un outil de développement de micromessagerie.Parce qu 'une fois le Sous - traitant utilisé le mode de chargement du petit jeu, le navigateur ne peut pas courir, et l' ensemble du processus de débogage est réalisé dans l 'outil de développement de micromessagerie.Par conséquent, téléchargez les exemples prêts pour vous, ouvrez l 'exemple sous le catalogue defaultdemo et Publiez une version de petit jeu.Passez le processus d 'ajustement de base.

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
      "name": "b",
      "root": "js/subpackage/"
    }
  ]
}
```


Programmer et paramétrer le catalogue de sous - traitants du jeu complet.Nous allons créer un fichier de sous - traitance et un répertoire pour le projet as.

#####Création d 'un fichier de sous - traitance as module.def

Oui.**Table des matières**, crée un fichier texte vide ordinaire, et l 'appelle`module.def`, saisissez ce qui suit dans le fichier:


```json

module:"subpackage/b"
path:"src/subpackage"
```


**Les valeurs dans le module représentent le nouveau nom JS et le chemin générés par le Sous - traitant.**Dans l 'exemple ci - dessus, subpackage est le nom de fichier après sous - traitance, b Le nom de fichier JS, et si l' on ne veut pas que le catalogue soit rempli, on crée un b.js sans Table des matières.

Il convient de mentionner ici que, qu 'il y ait ou non un catalogue`bin/h5/js`Table des matièresLe chemin effectivement généré est`bin/h5/js/subpackage/b.js`".Il correspond donc à la trajectoire prévue dans le jeu.`js/subpackage/`".

**Les valeurs dans path représentent un répertoire de fichiers de sources as correspondant à module**".Ce qu'il faut dire, path.`src/subpackage`S' il y a plusieurs fichiers as dans le fichier, tant qu 'il existe une relation de référence entre chaque fichier, il est compilé de manière uniforme dans le même JS (valeur spécifiée par module).

> les valeurs de module et de path sont placées dans le guillemets, et les symboles ne sont pas nécessaires pour la fin, mais il faut changer de ligne.

#####Relation de référence particulièrement importante

Les catégories de sous - traitants doivent être citées dans le sac principal, si ce n'est pas le cas.Document de sous - traitance`module.def`Intérieur`path`Codage dans un chemin spécifié`module`Dans le Répertoire et le fichier spécifiés.Il en va de même entre sous - traitants et sous - traitants, que le code actif soit ou non utilisé.Il faut les citer.

Par exemple, dans l'exemple, nous avons introduit la catégorie B dans le paquet de subpackage.


```typescript

import subpackage.b;
```





 



####Utilisation des codes de sous - traitance

La dernière étape de la création et de la planification du fichier de sous - traitance et de la table des matières peut commencer le codage de sous - traitance.

D'abord, en principe, puisque c'est une sous - traitance, alors...**Le lien logique entre le maître d'œuvre et le Sous - traitant doit être réduit au minimum.**".

Il convient également de noter qu'en ce qui concerne la Sous - traitance, tant ts que JS doivent procéder à des modifications de projet pour le domaine window, alors que les as n'ont pas besoin de les modifier pour le domaine window, puisque le compilateur a déjà aidé le concepteur.Il suffit d'appliquer les règles de sous - traitance du moteur layaair.

L'accent est donc mis ici sur l'utilisation des catégories et méthodes de sous - traitance.Pour ce qui est de l 'exemple de sous - traitance, je peux télécharger directement l' exemple que j 'ai donné et l' afficher.


```javascript

//图集加载后回调
private function onLoaded():void
{

    showUI(aUI);
	//微信小游戏官方提供的分包加载方法
    const loadTask = __JS__('wx').loadSubpackage({
        name: 'b', // name 可以填 name 或者 root
        success: function(res) {
            // 分包加载成功后通过 success 回调
            console.log("success");

            //实例化分包的类
            b = __JS__('new subpackage.b()');

            //把实例化的UI传给分包的类
            b.newUI = newUI;

            //初始化分包，监听按钮事件
            b.init();
        },
        fail: function(res) {
            // 分包加载失败通过 fail 回调
            console.log("fail");
        }
    });

}
```


Après avoir appelé showui pour afficher l 'ui, nous utilisons directement la méthode officielle de chargement de sous - traitance du jeu de micromessagerie.Dans le procédé de retour de success après le chargement en sous - traitance, nous commençons à passer`__JS__（'new subpackage.b()'）；`Afin d 'uniformiser le procédé à l' intérieur d 'un sous - paquet.Pourquoi l 'exemple est - il fourni ici par la méthode JS, car le contenu sous - Traité est directement utilisé, car une fois compilé, il est divisé en JS différents et il n' est pas possible de trouver une catégorie correspondante dans le même document.Types et méthodes de sous - traitance`__JS__（'XXX'）；`, XXX pour le Code JS.

####Résumer

La Sous - traitance du projet as, en fait sur la base d'exemples officiels, est suffisante.Pour les développeurs qui étaient auparavant sous - traitants, la Sous - traitance de jeux de hasard se déroulerait très bien.Donc cet article est en fait un petit jeu qui explique encore une fois comment le projet as est sous - Traité.

**Examen des principaux éléments de la Sous - traitance as**- Oui.

Créer le fichier module.def dans le Répertoire racine du projet;

Remplissez le chemin correct après sous - traitance et le nom de fichier JS (module) et le chemin correct du fichier source (PATH);

Créer un fichier de codes de sous - traitance pour coder les sous - traitants;

Référence aux catégories de sous - traitants dans le sac principal;



###Recommandations pratiques des initiateurs

Le développeur peut commencer par l 'exemple que j' ai donné, par une tentative de sous - traitance, en cas de problème, voir ce document et la différence entre les deux exemples que j 'ai donnés.Cours dans un petit jeu de micro - lettres.Après une véritable compréhension de la Sous - traitance, il est procédé à une sous - traitance libre des jeux.S' il y a un problème, envoyez le problème à la communauté et téléchargez l 'exemple du projet Demo dans le Groupe.

Si vous trouvez que le développeur a de nouveaux problèmes de sous - traitance, je vais affiner ce document mis à jour.,



##Appreciation

Si vous trouvez cet article utile pour vous, bienvenue à l 'auteur du Code de balayage, votre motivation est de nous pousser à écrire plus de documents de qualité.

![wechatPay](../../../wechatPay.jpg)