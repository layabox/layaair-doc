#Interface de chargement
Pour faciliter le développement, la version 1.0 de loadingview personnalisée a été mise en oeuvre avec des fonctions d 'origine.
Lorsque l 'application est activée, il faut charger les HTML, JS et images nécessaires pour afficher les progrès par l' intermédiaire de l 'interface de chargement.



​![图1](img/1.png)< br / >
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
`loadingView.loading(nPercent);//参数为0-100的整数值，当值为100的时候LoadingView自动关闭`  

Les pseudo - codes du projet sont les suivants:

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




##Supprimer tout affichage de texte

L 'affichage de tout le texte peut être supprimé, y compris les TPS et les pourcentages de chargement, la modification de config.js et le réglage de showttextinfo comme False.

```javascript

loadingView.showTextInfo=true;//改成false
```

##Interface et fonctions personnalisées
Tous les codes sont divulgués, de sorte que l 'émetteur peut modifier le Code en fonction des besoins afin d' obtenir toute fonction personnalisée souhaitée.

