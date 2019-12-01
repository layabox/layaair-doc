#Interface de chargement

Lorsque l 'application est activée, elle doit contenir les HTML, JS et images nécessaires pour afficher les progrès par l' intermédiaire de l 'interface de chargement.

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

var loadingView=window.loadingView;
if(loadingView)
{
    loadingView.loadingAutoClose=true;//true代表当动画播放完毕，自动进入游戏。false为开发者手动控制
    loadingView.bgColor("#FFFFFF");//设置背景颜色
    loadingView.setFontColor("#000000");//设置字体颜色
    loadingView.setTips(["新世界的大门即将打开","敌军还有30秒抵达战场","妈妈说，心急吃不了热豆腐"]);//设置tips数组，会随机出现
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


##Remplacement du logo propre au promoteur
Si un développeur souhaite utiliser son propre logo, il doit simplement copier sa propre carte de logo.png dans le catalogue correspondant, comme indiqué ci - après:


```

Android: assets/logo/logo.png
IOS:resource/logo/logo.png
```

L 'animation layabox n' est pas chargée à ce moment - là, mais affiche logo.png centralement, et peut également être configurée par config.js pour définir les couleurs d 'arrière - plan, les couleurs de police, les tips.

**Tips:**  
♪ 1, logo n'est que le format PNG ♪
Remplacer "logo.png" par "logo.png" de l'développeur, pas d'animation "
*Remplacer le logo.png de l 'développeur lui - même, mais il est toujours possible de le charger par des paramètres de loadingview.loading*

##Supprimer tout affichage de texte

Dans les versions postérieures à layaplayer - 0.9.6, l 'affichage de tout le texte, y compris les pourcentages de tips et de chargement, peut être supprimé, les modifications de config.js et les réglages showttextinfo à False.

```javascript

loadingView.showTextInfo=true;//改成false
```


##Production de barres d'étape

Dans le cadre d'un projet pratique, le programme actuel de layaplayer n'est pas satisfaisant si l'promoteur veut faire des barres d'avancement fantastiques qu'il préfère, et il est conseillé à l'initiateur de charger rapidement le moteur layaair - JS et les images nécessaires pour obtenir des barres d'avancement fantastiques par l'intermédiaire de layaair lui - même.

##Fonction de la liste blanche

Layabox disposera ensuite d'un mécanisme de liste blanche qui permettra d'éliminer le logo de layabox si le promoteur achète une autorisation ou exécute des produits en association avec layabox et, si tel n'est pas le cas, d'augmenter de force le logo de layabox.Il y a un mécanisme de détection à l 'intérieur du moteur, une détection aléatoire, si la détection n' est pas passée, ne peut pas entrer dans le jeu.

##Emballage app (version d 'essai)

Actuellement, les fonctions de la version d 'essai app sont prises en charge à layaair - IDE.**Attention: il est conseillé aux promoteurs d 'apprendre les notions de base de l' iOS et de l 'Android en utilisant les techniques de construction.**) Si l 'on veut remplacer le convig.js ou le logo, comme le montrent les figures 2 et 3 ci - après:

![2](img/2.png)< br / >
Figure 2

étape 2: cliquez sur les options avancées, Configurez le script et démarrez le logo

![3](img/3.png)< br / >
Figure 3
