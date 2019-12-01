# 其他说明

##Carte de la tierce partie

Le Sous - sol de layaplayer utilise le rendu opengles, le contrôle glsurfaceview d 'Android et le contrôle glkview de l' iOS, de sorte qu 'il n' est pas possible de prendre en charge des cartes de tiers telles que des cartes numériques.

##Présentation des documents

**Les fichiers de format de texte dans le projet (par exemple INI, XML, HTML, json, JS, etc.) doivent tous être des formats de codage utf8, car le dispositif iOS ne supporte pas les fichiers codés en format non utf8.**

##Modèle Debug et modèle Release

Layaplayer log est divisé en trois catégories:


```java

LOGI 普通流程log
LOGW 警告log
LOGE 错误log
```


Dans le script JS, l 'développeur peut définir le mode debug par les fonctions suivantes:


```javascript

if( window.conch )
{
    //值为1：表示所有LOGE全部弹出alert
    //值为2：表示所有LOGE和LOGW全部弹出alert
    window.conch.config.setDebugLevel(1);
}
```


**Tips**
*Concord n 'est disponible que dans l' environnement de layaplayer, il n 'y a pas de définition de Concord dans la version Web, et tous doivent être jugés.*
*Les objets Conch peuvent être obtenus par le biais de browser.window ['Conch'] lorsque la langue a été mise au point.*

##Micromessages d'interface iOS

Connecter le SDK à la version 1.77 du micromessage sous la plate - forme iOS nécessite une augmentation des paramètres d 'objc, une augmentation par défaut dans les documents officiels du micromessage`-Objc -all_load`Mais cela pourrait entraîner une erreur de traduction.
Dans ce cas, on peut changer les paramètres.`-Objc -force_load libWeChatSDK.a`Après configuration, comme le montre la figure 1:

![1](img/1.png)

##En ce qui concerne les simulateurs iOS

Layaplayer, dans une version postérieure à 0,9,5, supporte le fonctionnement du simulateur iOS et, une fois le projet achevé, sélectionne le simulateur.

**Tips: Bien que layaplayer appuie le simulateur IOS, le fonctionnement est moins efficace et il est recommandé que le développeur utilise le module IOS.**

##Accès à l'information

La fonction \ \ 124 \ \ \ \ \ \ \ \ \ \ \ \ \ \ \
124 ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
124, & 124, & 124, & 124, & 124, & 124, & 124, & 124, & 124, & 224, & 224, & 224, & 224, & 224, & 224, & 236; & 234; & 236
La valeur de retour de KB \ \ 124 \ \ \ \ \ \ \ \ \ \ \ \ \ \ \\\ \\
La valeur de retour de KB \ \ 124 \ \ 124 \ \ \ \ 124 \ \ \ \ \ \ 124 \ \ \ \\\ \
= 124 = () \ \ 124 \ \ Statut du réseau \ \ 124 \ \ renvoie \ \ int, net \ \ NO = \ \ 0; net u wifi = 1; net \ \ 2G = 2; net u 3G = 3; net u 4G = 4; net u unkonown = 5 124124124
La valeur de retour de layaplayer est une chaîne de caractères semblable à la chaîne ios - conch5 - 0.9.2, Android - conch5 - 0.9.
{\ 1ch00ffff} 124tos (}
Le numéro de version de la chaîne 1.1 \ \ 124 \ \ \ 124tr ()  \ 124 \ \ tgetapversion () \ \ 124 \ \ AP est obtenu par le biais de la version de la chaîne 1.1 \ \ 124 \\\\\\\- 124.
124%- 124.

Ces fonctions appartiennent toutes à la catégorie conch.config, exemples d 'appel:


```javascript

if( window.conch )
{
    window.conch.config.getRuntimeVersion();
}
```


**Tips**
*Concord n 'est disponible que dans l' environnement de layaplayer, il n 'y a pas de définition de Concord dans la version Web, et tous doivent être jugés.*
*Les objets Conch peuvent être obtenus par le biais de browser.window ['Conch'] lorsque la langue a été mise au point.*

##Assistant touch

Le moteur layaplayer comporte un assistant touch, comme le montre la figure ci - dessous:

![2](img/2.png)</br>


L 'développeur peut afficher et masquer par les fonctions suivantes


```javascript

if( window.conch )
{
    window.conch.showAssistantTouch(false);
}
```

**Tips:**
*Si l 'assistant touch disparaît plus tôt, vous pouvez configurer les paramètres dans config.js*
*Dans la version antérieure de layaplayer - 0.9.5, l 'acquiescement est ouvert, dans la version postérieure à 0.9.5, l' acquiescement est fermé*

##Concernant local storage

Layanative appuie l 'utilisation de local storage, mais il existe des conditions de forme qui exigent que les valeurs soient stockées et évaluées au moyen de getitem (), setitem ().

###Utilisation sous as


```java

//存储指定键名和键值，字符串类型。
LocalStorage.setItem("LayaBox","H5引擎！");
//获取指定键名的值。
LocalStorage.getItem("LayaBox");
```




###Sous JS et ts


```java

//存储指定键名和键值，字符串类型。
Laya.LocalStorage.setItem("LayaBox","H5引擎！");
//获取指定键名的值。
Laya.LocalStorage.getItem("LayaBox");
```




###Erreur:

L 'utilisation de la grammaire JS ci - dessous est prise en charge par un navigateur d' extrémité PC ou par une extrémité mobile (navigateur nu), mais pas par layanative.


```java

//存储，LayaNative下不支持
localStorage.test = 100;
//取值，LayaNative下不支持
alert(localStorage.test);
```




##Fausses cases dans les projets de blindage

Des indications erronées apparaissent parfois au cours de l 'exécution du projet et sont toutes des erreurs de code dans le projet.Notre proposition est de corriger ces erreurs dans les cadres de balles, si elles ne peuvent pas être résolues avant de retourner au blindage.Le Code de la boîte de tir incorrecte est le suivant:


```java

window.showAlertOnJsException(false);
```


##Mise en place d'un modèle de vitesse lente (30 trames)
Dans layaplayer, le FPS est par défaut de 60, mais pour de nombreux jeux qui ne nécessitent pas beaucoup de temps réel, il suffit de mettre à jour les 30 trames, ce qui peut alors être réglé par les fonctions suivantes.

```javascript

conch.config.setSlowFrame(true);
```

**Tips**  
**Conch.config ne peut être appelé que dans l 'environnement de layaplayer, il n' y a pas de définition de Concord dans la version Web et tous doivent être jugés.**  
**Les objets Conch peuvent être obtenus par le biais de browser.window ['Conch'] lorsque la langue a été mise au point.**

Après layanative - 0.9.13 et layaair - 1.7.14, layanative a harmonisé sa rédaction avec celle de la version du navigateur layaair et, par la suite, a utilisé autant que possible la formule suivante.

```javascript

Laya.stage.frameRate = "slow";//"fast" "slow" "mouse" "sleep"
```


##Reprendre le bouton arrière d'Android
(version layanative > 0,9,8)
Dans l 'ancienne version de layanative, la touche arrière est traitée de manière à appuyer deux fois sur la touche arrière pour quitter l' app.À partir de 0.9.8, layanative a introduit deux fonctions, conch.setonbackpressedfunction (onback) et conch.exit () qui permettent de reprendre le traitement des touches arrière dans le script.L 'interface est définie comme suit:


```javascript

interface conch {
    ...
    setOnBackPressedFunction(onBack:()=>void);
    exit():void;
    ...
}
```


* setonbackpressedfunction (f) *
F fonction exécutée lorsque l 'utilisateur appuie sur la touche arrière.
Une fois que cette fonction est activée, la fonction de sortie est masquée à deux reprises et, si vous voulez quitter l 'application, vous ne pouvez l' obtenir que par l 'appel de la fonction Exit ().

♪ Exit (* *
Renvoie cette fonction pour quitter l 'app directement.

*Attention!*
Seule la version Android comporte ces deux fonctions.

J exemple:

```javascript

var n=3;
if(window.conch && window.conch.setOnBackPressedFunction){
    window.conch.setOnBackPressedFunction(()=>{
        console.log('press back '+n);
        if(n-- <=0){
            window.conch.exit();
        }
    });
}
```

##Traitement des anomalies lors de l'initialisation ou du chargement du moteur sur le script de démarrage
Après la version layaplayer - 0.9.11, lors de l'initialisation du moteur et du chargement du script de démarrage, en cas d'anomalie (par exemple, d'instabilité du réseau), le moteur est automatiquement appelé à la fonction window.onlayaniterror (error), définie par défaut dans config.js et codée comme suit:

```javascript

window.onLayaInitError=function(e)
{
	console.log("onLayaInitError error=" + e);
	alert("加载游戏失败，可能由于您的网络不稳定，请退出重进");
}
```

Les développeurs peuvent modifier les informations erronées et les modes de communication en fonction de leurs propres besoins.

##Acquisition de modèles de matériel
Après la version layaplayer - 0.9.12, l 'IOS peut acquérir un modèle d' équipement en faisant appel à conch.config.getdeviceinfo ().Peut être utilisé pour l 'adaptation de l' iPhone X, le Code étant le suivant:

```javascript

if( window.conch )
{
    var devInfo = JSON.parse(window.conch.config.getDeviceInfo());

    if (devInfo.devicename === 'iPhone10,3' || devInfo.devicename === 'iPhone10,6')
    {
        // iPhone X适配
    }
}
```
