#Champ de données ouvert

##Ensemble d 'affichage de domaine de données ouvert par micromessagerie

Depuis layaair2.0, Laya a officiellement donné les composants ui de la zone ouverte de micromessagerie pour résoudre ces problèmes et les rendre plus simples et plus performants.

L 'ensemble de champ de données ouvert peut être trouvé dans un arbre de travaux

![wx1](../../AS/openDomain/img/wx1.png) 







###Utilisation d 'un ensemble d' affichage de domaine ouvert

Mise au point d'un programme de champ de données ouvert, de la taille de 500 * 500

Un module wxopendata Viewer dans le domaine principal, d 'une taille de 500 * 500

![wx1](../../AS/openDomain/img/wx2.png) 




L'affichage à l'intérieur d'un microcapteur permet de visualiser le contenu d'un champ de données ouvert et d'optimiser les performances et les événements de souris

![wx1](../../AS/openDomain/img/wx3.png) 




Résumé: l 'utilisation d' un nouvel ensemble de données de domaine ouvert de micromessagerie permet d 'afficher le contenu de domaine ouvert sans codage et d' optimiser les performances et les événements de souris.

##Open Domain transmission interface

Dans le domaine ouvert de micromessagerie, seuls les chargements d 'images monolithiques locaux sont pris en charge et ne peuvent pas utiliser d' images, ce qui est très difficile à utiliser.En outre, la scène de 2.0 est automatiquement préchargée, ce qui peut conduire à une erreur d 'estimation de domaine ouvert wx.Pour résoudre ce problème et faciliter le développement du domaine ouvert, une interface de transmission est prévue au 2.0.Cela permet d 'utiliser des fichiers tels que json, Atlas et autres dans le Sous - domaine.

Les types de fichiers supportant actuellement la transmission comprennent des images séparées, des fichiers json, des fichiers d 'Atlas.

Correspond aux interfaces dans miniadapter:`sendSinglePicToOpenDataContext`Oui.`sendJsonDataToDataContext`Oui.`sendAtlasToOpenDataContext`".

Voici quelques exemples d'utilisation de la transmission:

####Extraits du domaine principal

Avant d 'utiliser des fichiers correspondants, il est nécessaire d' utiliser ces interfaces pour transmettre des informations chargées sur le domaine principal * Au sous - domaine.Ces interfaces de transmission sont des interfaces de transmission d 'informations du domaine principal vers le Sous - domaine au moyen de micromessages, et d' autres informations peuvent être consultées sur le code source miniadapter et les documents officiels de microcommunications.


```typescript

if(Laya.Browser.onMiniGame){
    //加载一个json和图集
Laya.loader.load(["json/reward.json","res/atlas/test.atlas"],Laya.Handler.create(null,function(){
    //加载完成
    //使用接口将图集透传到子域
	Laya.MiniAdpter.sendAtlasToOpenDataContext("res/atlas/test.atlas");	
    //使用接口将json投促函到子域
    Laya.MiniAdpter.sendJsonDataToDataContext("json/reward.json");
}));
}
```


####Extrait de sous - domaine

Le Code partiel provient de la version 2.0.1bate.**Open Area Project**Code d 'exempleDes modifications simples sont apportées ici car deux documents ont été transmis et il faut confirmer que les deux documents transmis ont été acceptés et réutilisés.

Pour recevoir des fichiers de transmission, il faut utiliser des sous - domaines de micromessagerie`wx.onMessage`InterfaceMicro - messages[官方文档](https://developers.weixin.qq.com/minigame/dev/api/wx.onMessage.html)".


```typescript

//用于计数
var mark = 0;
if(Laya.Browser.onMiniGame)
    Laya.Browser.window.wx.onMessage(function(data){//微信接受信息
        if(data.url == "res/atlas/test.atlas" || data.url == "json/reward.json"){
        	mark ++;
            if(mark == 2)//确认数据全部接收后
            	Laya.loader.load([
               		"res/atlas/test.atlas",
                	"json/reward.json"],Laya.Handler.create(this,this.onComplete));
        }
	}.bind(this));
```


Méthode complexe, attention avec des modifications partielles de la version originale.


```typescript

onComplete() {
    //获取资源
    var testJosn = Laya.loader.getRes("json/reward.json");
    //输出透传过来的json
    console.log('透传的json信息：', testJosn);
    //加载IDE指定的场景
    var big = new BigRank();
    big.init();
}
```


Les résultats des tests dans un environnement de micromessagerie sont les suivants:

[] (IMG / 1.png) <br > (Figure 1)

