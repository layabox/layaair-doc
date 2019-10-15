#Interface de chargement
Pour faciliter le développement, loadingview personnalisé, layanative utilise une nouvelle loadingview réalisée à l 'aide de la fonction originale.

Lorsque l 'application démarre, il faut charger les HTML, JS et images nécessaires pour afficher les progrès par l' intermédiaire de l 'interface de chargement.

​![图1](img/1.png)< br / >

Figure 1

##Contrôle des étapes

Dans le config.js, l 'développeur peut contrôler les couleurs de fond, les couleurs de police, les Tips, etc. de loadingview.

Emplacement du cofig.js:

```

Android: 工程目录下的assets/scripts/config.js  
IOS:工程目录下的resources/scripts/config.js  
```


Le contenu de l 'article config.js peut être modifié par l' développeur en fonction de ses propres besoins, comme indiqué ci - après:


```javascript

window.loadingView = new loadingView();
if(window.loadingView)
{
    window.loadingView.loadingAutoClose=true;//true代表引擎控制关闭时机。false为开发者手动控制
    window.loadingView.bgColor("#FFFFFF");//设置背景颜色
    window.loadingView.setFontColor("#000000");//设置字体颜色
    window.loadingView.setTips(["新世界的大门即将打开","敌军还有30秒抵达战场","妈妈说，心急吃不了热豆腐"]);//设置tips数组，会随机出现
}
```


##Exemples de contrôle de la barre de progression

Dans le processus de développement réel, il est généralement nécessaire de contrôler avec précision la dissimulation et l 'affichage de loadingview, et l' développeur peut alors définir la valeur de loadingview.loadingautoclose comme étant False dans le config.js.
Définit ensuite, dans le projet, le rythme d 'affichage de la barre d' avancement en fonction de l 'achèvement du chargement, la fonction d' appel étant la suivante:


```javascript

window.loadingView.loading(nPercent);//参数为0-100的整数值，当值为100的时候LoadingView自动关闭
```
Les mesures concrètes suivantes ont été prises:

**Mesure 1:**Oui.`config.js`Paramètres`loadingView.loadingAutoClose`Valeur`false`


```javascript

window.loadingView = new loadingView();
if(window.loadingView)
{
    window.loadingView.loadingAutoClose=false; // 设置值为false，开发者手动控制加载界面的关闭
    ...
}

```


**Mesure 2:**Appeler`loadingView.loading(nPercent)`Actualiser la barre

Pseudo - Code:


```javascript

var nPercent=0;
var image1 = document.createElement('img');
image1.onload=function()
{
    if(window.loadingView){
        nPercent+=33;
        window.loadingView.loading(nPercent);
    }
}
image1.src = "a.png";

var image2 = document.createElement('img');
image2.onload=function()
{
    if(window.loadingView){
        nPercent+=33;
        window.loadingView.loading(nPercent);
    }
}
image2.src = "b.png";

var image3 = document.createElement('img');
image3.onload=function()
{
    if(window.loadingView){
        nPercent+=33;
        window.loadingView.loading(nPercent);
    }
}
image3.src = "c.png";
```


**Tips:**

Quand`loadingView.loading(nPercent)`L 'interface de chargement est automatiquement désactivée lorsque la valeur introduite par la fonction est égale à 100.Ou par appel`loadingView.hideLoadingView()`Désactivez l 'interface de chargement.

##Supprimer tout affichage de texte

Vous pouvez supprimer l 'affichage de tout le texte, y compris les tips et les pourcentages de chargement, modifier config.js, et`showTextInfo`La valeur`false`Code:


```javascript

window.loadingView = new loadingView();
if(window.loadingView)
{
    ...
    window.loadingView.setTips(["新世界的大门即将打开","敌军还有30秒抵达战场","妈妈说，心急吃不了热豆腐"]);//设置tips数组，会随机出现

    window.loadingView.showTextInfo=false; // 值设置为false

}
```


##Interface et fonctions personnalisées
Tous les codes sont divulgués, de sorte que l 'émetteur peut modifier le Code en fonction des besoins afin d' obtenir toute fonction personnalisée souhaitée.

##Notes spéciales
Démarrage de l 'image, mise au point de la version Android à l' aide de la version Java originale, mise au point de l 'iOS à l' aide de l 'Object - C, tous les codes sont des sources ouvertes, les développeurs peuvent modifier leurs propres interfaces s' ils ont besoin d' une interface personnalisée, et si Android et iOS ne préparent pas d 'interface, alors apprenez.

Layabox disposera ensuite d 'un mécanisme de liste blanche qui, s' il achète l' autorisation, éliminera le logo de layabox.

Layanative n'est pas un moteur d'allumage, mais il est gratuit pour les concepteurs et il faut payer pour enlever le logo de layabox.L'acquéreur peut prendre contact avec le commerce layabox par l'intermédiaire du layabox public, du réseau officiel, etc.