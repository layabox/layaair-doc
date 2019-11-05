# 屏幕适配的缩放模式详解



Le mode d 'agrandissement est le principal élément de l' adaptation de l 'écran.Dans le document API, nous recherchons laya.display.stage et voyons comment scalemode utilise sept paramètres pour répondre à la demande de mise à l 'échelle adaptée à divers écrans, comme le montre la figure 1:



  ![blob.png](img/1.png)< br / >
Figure 1 Description des paramètres du moteur layaair pour le modèle scalemode



**Pour résumer brièvement les paramètres, nous commençons par les notions de base qui sous - tendent ce chapitre:**

**La largeur de conception:** 

La hauteur de largeur définie dans laya.init () de la scène d 'initialisation dans le Code de projet est la largeur de conception.

**La largeur de stage est élevée:**

La largeur de stage est supérieure à la largeur réelle de la scène de jeu.

**Hauteur d 'adaptation:**

Pour faciliter la compréhension de la distinction, nous appelons la hauteur de largeur adaptative.

**La largeur de la toile:**

La largeur de la toile est la largeur du noeud Canvas dans le HTML5, et tous les éléments visibles du jeu se trouvent dans la zone de la toile.

**Largeur de l 'écran:**

La largeur de l 'écran est la largeur de l' écran d 'un navigateur de téléphones portables, telle qu' une largeur d 'écran lorsque l' écran vertical iPhone 6 est élevé`375*667`".Les moteurs layaair peuvent obtenir la largeur et la hauteur de l 'écran par l' intermédiaire de laya.utils.browser.clientwidth et laya.utils.browser.clientheight.

**Largeur physique:**

Pour ce qui est de la largeur physique des écrans d 'équipement, nous devons d' abord comprendre le concept de densité de pixels.Sur l 'ordinateur PC, un pixel physique est généralement situé dans une position de pixel.Aujourd 'hui, dans le développement à grande vitesse d' un dispositif mobile, l 'écran d' un téléphone mobile comporte généralement deux ou trois pixels sur une position de pixel.La largeur physique de l 'écran vertical iPhone 6`750*1334`".Les moteurs layaair peuvent obtenir la largeur physique de l 'écran d' équipement en utilisant laya.utils.browser.with et laya.utils.browser.height.

###Images d 'arrière - plan utilisées dans l' exemple de code:

[loadingBg.jpg](http://ldc.layabox.com/uploadfile/file/20170223/1487816895380055.jpg)(cliquez sur ouvrir ou enregistrer autrement)`1136×640`Image d 'arrière - plan de pixels

###Mode exactfit

Le mode exactfit est un mode qui remplit l 'ensemble de l' écran du navigateur directement par mise à l 'échelle non équivalente sans tenir compte du rapport initial du contenu.Dans ce mode, la hauteur de la Toile et la largeur de la toile sont égales à la largeur de conception et ne changent pas.Toutefois, lorsque la largeur physique est plus élevée que la largeur de conception, ce mode d 'échelle non équivalent peut entraîner une déformation apparente de la conception originale.Les résultats sont présentés dans les figures 2 et 3.



​        ![blob.png](img/2.png)< br / >
Figure 2 la largeur de conception`1136*640`Largeur physique`1334*750`Fonctionnement en mode exactfix

​![blob.png](img/3.png)< br / >
Figure 3 Élargissement de la conception`1136*640`Largeur physique`750*1334`Fonctionnement en mode exactfit



**Exemple de mode exactfit:**


```typescript

module laya {
    import Text = Laya.Text;
    import Image = Laya.Image;
    import Sprite = Laya.Sprite;
 
    export class SmartScale_T {
 
        //适配模式
        private modes:string = "exactfit";
        //全局文本信息
        private txt: Text;
 
        constructor() {
        //初始化舞台大小
        Laya.init(1136, 640);
 
        //设置适配模式
        Laya.stage.scaleMode = this.modes;
        //设置舞台背景色
        Laya.stage.bgColor  = "#ffff99";
 
 
        //实例一个背景
        var bg = new Image();
        bg.skin = "res/img/loadingBg.jpg";
        Laya.stage.addChild(bg);
 
 
        //实例一个文本
        this.txt = new Text();
        this.txt.text = "适配模式("+this.modes+") ";
        this.txt.bold = true;
        this.txt.pos(10, 350);
        this.txt.fontSize = 60;
        this.txt.color   = "#fff000";
        Laya.stage.addChild(this.txt);
        }
 
    }
}
new laya.SmartScale_T();
```




###Modèle fixedheight

Dans le mode fixdheight, la largeur de la Toile et de la page est égale à la largeur d 'adaptation (largeur d' adaptation = hauteur de conception * Rapport élevé de la largeur d 'écran) et l' adaptation à l 'échelle totale est effectuée en fonction de la largeur d' écran, qui est l 'un des principaux modes d' adaptation.

Par exemple: l 'écran transversal Iphone6 a une largeur d' écran supérieure à`667*375`, avec une hauteur de conception de 640, après l 'application du mode fixheight,`适配宽度=(667/375)*640`, la largeur de la toile est la largeur de la toile après le calcul de la largeur d 'adaptation.L 'exemple de l' effet d 'étirage de l' écran complet est illustré à la figure 4:

​![blob.png](img/4.png)< br / >
Figure 4 hauteur de la toile`1067*640`Largeur physique`1334*750`Fonctionnement du mode fixedheight

Iphone 6 VERTICAL SCREEN`适配宽度=(375/667)*640`Pour calculer la largeur d 'adaptation, 360 sont la largeur de la toile.Si nous sommes conçus à l 'aide d' un écran transversal, il est nécessaire de le définir comme un écran transversal automatique lors de l 'utilisation de ce mode, faute de quoi les parties extérieures à la toile ne sont pas affichées.L 'exemple de mode fixheight permet d' adapter l 'écran entier à l' étirage, comme le montre la figure 5:

​![blob.png](img/5.png)< br / >
Figure 5 hauteur de la toile`360*640`Largeur physique`750*1334`Fonctionnement du mode fixedheight



**Modèle fixedheight**


```typescript

module laya {
    import Text = Laya.Text;
    import Image = Laya.Image;
    import Sprite = Laya.Sprite;
 
    export class SmartScale_T {
 
        //适配模式
        private modes:string = "fixedheight";
        //全局文本信息
        private txt: Text;
 
        constructor() {
        //初始化舞台大小
        Laya.init(0, 640);
 
        //设置适配模式
        Laya.stage.scaleMode = this.modes;
        //设置舞台背景色
        Laya.stage.bgColor  = "#ffff99";
 
 
        //实例一个背景
        var bg = new Image();
        bg.skin = "res/img/loadingBg.jpg";
        Laya.stage.addChild(bg);
 
 
        //实例一个文本
        this.txt = new Text();
        this.txt.text = "适配模式("+this.modes+") ";
        this.txt.bold = true;
        this.txt.pos(10, 350);
        this.txt.fontSize = 60;
        this.txt.color   = "#fff000";
        Laya.stage.addChild(this.txt);
        }
 
    }
}
new laya.SmartScale_T();
```




###Mode fixedwidth

En mode fixedwidth, la largeur de conception de la Toile et de la page reste inchangée, la hauteur de la Toile et de la page étant égale à la hauteur d 'adaptation ((`适配高度=设计宽度*屏幕高宽比`) Enfin, l 'adaptation de l' affichage complet est effectuée en fonction de la largeur de l 'écran, ce mode étant l' un des principaux modèles d 'adaptation.

Par exemple: l 'écran transversal Iphone6 a une largeur d' écran supérieure à`667*375`, avec une largeur de conception de 1136, après l 'application du mode fixedwith,`适配高度=(375/667)*1136`, la hauteur d 'adaptation est calculée de manière à obtenir une hauteur de toile de 639.L 'exemple de l' effet d 'étirage de l' écran entier est illustré par la figure 6:

​![blob.png](img/6.png)< br / >
Figure 6 hauteur de la toile`1136*639`Largeur physique`1334*750`Fonctionnement du mode fixedwidth

De même, l 'altitude d' adaptation de l 'écran vertical Iphone6 = (667 / 375) * 1136, et l' altitude d 'adaptation de 2021 après le calcul de la hauteur d' adaptation est la hauteur de la toile.Si nous sommes conçus à partir d 'un écran horizontal, il est nécessaire de le définir comme un écran horizontal automatique lors de l' utilisation de ce mode, sinon la largeur d 'adaptation est supérieure à la largeur de l' écran et le rapport d 'équivalence est mis à l' échelle de la largeur de l 'écran pour l' affichage complet, ce qui n 'est généralement pas l' effet recherché.L 'exemple de mode fixedwidth, qui s' adapte à l' écran entier, est illustré à la figure 6:

​![blob.png](img/7.png)<br/>

Figure 6 hauteur de la toile`1136*2021`Largeur physique`1334*750`Fonctionnement du mode fixedwidth



**Code d 'exemple du mode fixedwidth:**


```typescript

module laya {
    import Text = Laya.Text;
    import Image = Laya.Image;
    import Sprite = Laya.Sprite;
 
    export class SmartScale_T {
 
        //适配模式
        private modes:string = "fixedwidth";
        //全局文本信息
        private txt: Text;
 
        constructor() {
        //初始化舞台大小
        Laya.init(1136, 0);
 
        //设置适配模式
        Laya.stage.scaleMode = this.modes;
        //设置舞台背景色
        Laya.stage.bgColor  = "#ffff99";
 
 
        //实例一个背景
        var bg = new Image();
        bg.skin = "res/img/loadingBg.jpg";
        Laya.stage.addChild(bg);
 
 
        //实例一个文本
        this.txt = new Text();
        this.txt.text = "适配模式("+this.modes+") ";
        this.txt.bold = true;
        this.txt.pos(10, 350);
        this.txt.fontSize = 60;
        this.txt.color   = "#fff000";
        Laya.stage.addChild(this.txt);
        }
 
    }
}
new laya.SmartScale_T();
```






###Mode Full

En mode full, la largeur de la page et de la toile ne tient pas compte de la largeur de conception élevée, ce qui équivaut directement à une largeur physique élevée, et c 'est donc le mode d' étalement principal de la plus grande précision de jeu.Dans ce mode, le contenu de conception n 'est pas mis à l' échelle et le rapport initial de 1 / 1 est maintenu, la scène est alignée avec l 'angle supérieur gauche de l' écran de Browser et la partie du contenu de conception original qui dépasse l 'écran est coupée.Les effets de l'exemple sont illustrés dans les figures 7 et 8.
​![blob.png](img/8.png)
Figure 8 la largeur de conception et la largeur physique`1136*640`Fonctionnement d 'écran transversal en mode Full

​![blob.png](img/9.png)
Figure 9 Élargissement de la conception`1136*640`Largeur physique`960*640`Fonctionnement d 'écran transversal en mode Full



**Code d 'exemple de mode ful:**


```typescript

module laya {
    import Text = Laya.Text;
    import Image = Laya.Image;
    import Sprite = Laya.Sprite;
 
    export class SmartScale_T {
 
        //适配模式
        private modes:string = "full";
        //全局文本信息
        private txt: Text;
 
        constructor() {
        //初始化舞台大小
        Laya.init(0, 0);
 
        //设置适配模式
        Laya.stage.scaleMode = this.modes;
        //设置舞台背景色
        Laya.stage.bgColor  = "#ffff99";
 
 
        //实例一个背景
        var bg = new Image();
        bg.skin = "res/img/loadingBg.jpg";
        Laya.stage.addChild(bg);
 
 
        //实例一个文本
        this.txt = new Text();
        this.txt.text = "适配模式("+this.modes+") ";
        this.txt.bold = true;
        this.txt.pos(10, 350);
        this.txt.fontSize = 60;
        this.txt.color   = "#fff000";
        Laya.stage.addChild(this.txt);
        }
 
    }
}
new laya.SmartScale_T();
```


**Tips:**

Bien que le mode soit un mode d 'adaptation de haute précision, la pression sur les performances du jeu est également plus élevée que dans d' autres modes et le choix de ce mode doit tenir compte des considérations générales du jeu.

Étant donné que la largeur de la Toile et de la page est directement dérivée de la largeur physique de l 'écran, la hauteur de la largeur de la largeur de la bande de laya.init () peut être fixée directement à 0.





###V. modèle noscale

Le mode noscale est un mode non échelonné, la largeur de la Toile et de la page est égale à la largeur de conception.Maintenez l 'alignement de la scène avec le coin supérieur gauche de l' écran du navigateur sur la base d 'un rapport de conception original de 1: 1.Lorsque la largeur de l 'écran est inférieure au contenu, la découpe est effectuée et le bord noir apparaît lorsque la largeur de l' écran est supérieure au contenu.L 'effet de fonctionnement du modèle est indiqué dans les figures 9 et 10.

​![blob.png](img/10.png)< br / >
Figure 10 largeur d 'écran supérieure à celle de la conception

​![blob.png](img/11.png)< br / >
Figure 11: effet d 'un contenu de conception supérieur à la largeur de l' écran



**Les exemples de mode noscale sont les suivants:**


```typescript

module laya {
    import Text = Laya.Text;
    import Image = Laya.Image;
    import Sprite = Laya.Sprite;
 
    export class SmartScale_T {
 
        //适配模式
        private modes:string = "noscale";
        //全局文本信息
        private txt: Text;
 
        constructor() {
        //初始化舞台大小
        Laya.init(1136, 640);
 
        //设置适配模式
        Laya.stage.scaleMode = this.modes;
        //设置舞台背景色
        Laya.stage.bgColor  = "#ffff99";
 
 
        //实例一个背景
        var bg = new Image();
        bg.skin = "res/img/loadingBg.jpg";
        Laya.stage.addChild(bg);
 
 
        //实例一个文本
        this.txt = new Text();
        this.txt.text = "适配模式("+this.modes+") ";
        this.txt.bold = true;
        this.txt.pos(10, 350);
        this.txt.fontSize = 60;
        this.txt.color   = "#fff000";
        Laya.stage.addChild(this.txt);
        }
 
    }
}
new laya.SmartScale_T();
```






###Modèle noborder

En mode noborder, la largeur de la toile est égale à la largeur de conception.Lors de l 'agrandissement, l' agrandissement est effectué en fonction d 'une partie de la largeur d' écran et d 'un rapport maximum de largeur de conception`1136*640`La largeur physique de l 'écran`750*1334`".Calculer un rapport de largeur`（750/1136）`Taux élevé de 0,66`（1334/640）`2,08.Dans le cas d 'une échelle en mode noborder, la hauteur d' adaptation s' étend jusqu 'à la hauteur physique 1334, la largeur d' adaptation s' élargissant de manière équivalente au rapport maximal (élevé).`1334/640*1136`) 2368.Bien entendu, les parties supérieures à la largeur de l 'écran sont coupées.Les résultats sont présentés à la figure 11.



​        ![blob.png](img/12.png)< br / >
Figure 12 taille de la toile`1136*640`Lorsque la largeur d 'adaptation est élevée et que le rapport maximal s' étend sur l' écran entier



**L 'exemple du mode noborder est le suivant:**


```typescript

module laya {
    import Text = Laya.Text;
    import Image = Laya.Image;
    import Sprite = Laya.Sprite;
 
    export class SmartScale_T {
 
        //适配模式
        private modes:string = "noborder";
        //全局文本信息
        private txt: Text;
 
        constructor() {
        //初始化舞台大小
        Laya.init(1136, 640);
 
        //设置适配模式
        Laya.stage.scaleMode = this.modes;
        //设置舞台背景色
        Laya.stage.bgColor  = "#ffff99";
 
 
        //实例一个背景
        var bg = new Image();
        bg.skin = "res/img/loadingBg.jpg";
        Laya.stage.addChild(bg);
 
 
        //实例一个文本
        this.txt = new Text();
        this.txt.text = "适配模式("+this.modes+") ";
        this.txt.bold = true;
        this.txt.pos(10, 350);
        this.txt.fontSize = 60;
        this.txt.color   = "#fff000";
        Laya.stage.addChild(this.txt);
        }
 
    }
}
new laya.SmartScale_T();
```




###Mode showall

En mode showall, la hauteur de la bande de dessin est égale à la hauteur de la largeur d 'adaptation après l' agrandissement et l 'agrandissement est proportionnel à la hauteur de la largeur d' écran et au rapport minimum de la largeur de conception.

Taille de conception`1136*640`La largeur physique de l 'écran`750*1334`".Calcule le taux de largeur`750/1136`) 0,66, taux élevé ((`1334/640`) 2,08.Lorsque le mode showall est mis à l 'échelle, la largeur de la toile est réduite à la largeur physique de l' écran à un rapport minimal (largeur) de 750 et la largeur d 'équilibrage de hauteur adaptée ((`750/1136*640`) 423.En l 'occurrence, étant donné que la hauteur physique de 423 est bien inférieure à la hauteur de 1334 de l' écran, un grand nombre d 'écrans vides noirs apparaissent.Les résultats sont présentés à la figure 12.

​![blob.png](img/13.png)< br / >
Figure 13 taille de la toile`750*423`Dans la largeur physique`750*423`Il y a beaucoup d'écrans noirs sur l'écran.



**L'exemple de mode showall est le suivant:**


```typescript

module laya {
    import Text = Laya.Text;
    import Image = Laya.Image;
    import Sprite = Laya.Sprite;
 
    export class SmartScale_T {
 
        //适配模式
        private modes:string = "showall";
        //全局文本信息
        private txt: Text;
 
        constructor() {
        //初始化舞台大小
        Laya.init(1136, 640);
 
        //设置适配模式
        Laya.stage.scaleMode = this.modes;
        //设置舞台背景色
        Laya.stage.bgColor  = "#ffff99";
 
 
        //实例一个背景
        var bg = new Image();
        bg.skin = "res/img/loadingBg.jpg";
        Laya.stage.addChild(bg);
 
 
        //实例一个文本
        this.txt = new Text();
        this.txt.text = "适配模式("+this.modes+") ";
        this.txt.bold = true;
        this.txt.pos(10, 350);
        this.txt.fontSize = 60;
        this.txt.color   = "#fff000";
        Laya.stage.addChild(this.txt);
        }
 
    }
}
new laya.SmartScale_T();
```




###Modèle fixedauto

En mode fixedauto, la hauteur de la largeur de la toile est égale à celle de la largeur d 'adaptation après l' agrandissement, tandis que le rapport d 'équilibrage affiche tout le contenu sur l' écran et calcule automatiquement les deux modes Scale u fixed \ \ u width et Scale u fixed \ \ u height en fonction de la longueur de l 'écran.

Par exemple: l 'écran transversal Iphone6 a une largeur d' écran supérieure à`667*375`Lorsque la largeur de conception est de 1136, l 'Adaptation d' étirage est automatiquement sélectionnée en fonction du rapport de largeur élevé.`适配高度=(375/667)*1136`, la hauteur d 'adaptation est calculée de manière à obtenir une hauteur de toile de 639.L 'exemple de l' effet d 'étirage de l' écran entier est illustré par la figure 6:

​![14](img/14.png)< br / >
Figure 14 hauteur de la toile`1136*639`Largeur physique`1334*750`Fonctionnement du mode fixedauto

De même, l 'altitude d' adaptation de l 'écran vertical Iphone6 = (667 / 375) * 1136, l' altitude de la toile étant 2021 après le calcul de l 'altitude.Un mode d 'Adaptation Scale u fixed u height plus proche du rapport de largeur d' écran est sélectionné automatiquement sur la base d 'un rapport de largeur élevé.

Si nous sommes conçus à partir d 'un écran horizontal, il est nécessaire de le définir comme un écran horizontal automatique lors de l' utilisation de ce mode, faute de quoi la largeur de l 'écran est adaptée au - delà de la largeur de l' écran, puis, en fonction de la hauteur de conception, à la coupe latérale, ce qui n 'est généralement pas l' effet recherché.L 'exemple du mode fixedauto, qui s' adapte à l' écran entier, est illustré à la figure 15:

​![15](img/15.png)< br / >
Figure 15 hauteur de la toile`1136*2021`Largeur physique`1334*750`Fonctionnement du mode fixedauto



**Les exemples de mode fixedauto sont les suivants:**


```javascript

module laya {
    import Text = Laya.Text;
    import Image = Laya.Image;
    import Sprite = Laya.Sprite;
 
    export class SmartScale_T {
 
        //适配模式
        private modes:string = "fixedauto";
        //全局文本信息
        private txt: Text;
 
        constructor() {
        //初始化舞台大小
        Laya.init(1136, 640);
 
        //设置适配模式
        Laya.stage.scaleMode = this.modes;
        //设置舞台背景色
        Laya.stage.bgColor  = "#ffff99";
 
 
        //实例一个背景
        var bg = new Image();
        bg.skin = "res/img/loadingBg.jpg";
        Laya.stage.addChild(bg);
 
 
        //实例一个文本
        this.txt = new Text();
        this.txt.text = "适配模式("+this.modes+") ";
        this.txt.bold = true;
        this.txt.pos(10, 350);
        this.txt.fontSize = 60;
        this.txt.color   = "#fff000";
        Laya.stage.addChild(this.txt);
        }
 
    }
}
new laya.SmartScale_T();
```




**Conclusion**

Le mode Full est rendu entièrement à partir de pixels physiques, la taille de l 'écran, la taille de l' image adaptée, est un mode d 'adaptation courant de haute qualité d' image, mais dans un écran de différentes tailles, la taille du contenu affiché peut varier, tandis que la pression de performance pour Les Jeux HTML - 5 est supérieure à celle des autres modes d 'adaptation.

Showall et noborder sont des modes de zoom équivalents qui maintiennent l 'image intacte.Showall est configuré en fonction d 'un rapport minimal élevé entre la largeur de l' écran et celle de la conception, de manière à ce que l 'image soit pleinement visible, mais à ce que l' écran soit libre et noir.Inversement, l 'écran ne présente pas de côté noir de l' écran vide, mais ne permet pas d 'afficher des Parties larges ou élevées de son contenu.

Fixedwight et fixdheight ressemblent davantage à des variantes showall et noborder, de même qu 'à des modèles d' étalonnage équivalents, mais spécifient que l 'agrandissement de l' autre côté est le mode d 'adaptation principal le plus souvent utilisé dans le jeu HTML 5 actuel.Fixedauto commute automatiquement les modes fixedwith et fixedheight en fonction de la proportion.Ces modèles sont également les modèles d 'Adaptation d' écran complet que nous recommandons.

Afin de mettre en évidence les différences de paramètres entre les modèles de zoom.Aucun autre paramètre d 'Adaptation d' écran, tel que la rotation automatique de l 'écran, n' est associé et l 'développeur peut consulter d' autres documents techniques pertinents.

L 'élément central du mode d' adaptation est l 'agrandissement ou la modification directe de la taille de la toile.On trouvera ci - après des comparaisons entre les différents modèles de zoom afin de faciliter la compréhension visuelle.

124, & 124; & 124; & 124; & 124; & 124; & 124; & 124; & 124; & 224; & 234; & 234; & 234; & 234; & 234; & 234; & 234; & 234; & 234; & 234; & 234; & 234; & 234; & 232
124 ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
124a, 124a, 124a, 124a, 124a, 124a, 124a, 124a, 124a, 124a, 124a, 124a, 124a, 124a, 124a, 124a, 124a, 124a, 124a, 124a
124a, 124a, 124a, 124a, 124a, 124a.
124a modifie la taille de la toile \ \ 124 \ \ 124 \ \ 124 \ \ 124 \ \ 124 \ \ 129 \ \ 124

**Attention:**Si vous utilisez un mode de résolution de pixel physique`useRetinalCanvas=true`Lorsque la taille de la toile est constante en tant que résolution physique, l 'agrandissement de la toile à l' origine est entièrement réduit à l 'échelle de stage.



Un diagramme comparatif détaillé de chaque modèle d'adaptation est joint à la fin.Tout le monde peut cliquer sur le bouton droit pour ouvrir l 'écran dans la nouvelle page.

![图](img/16.png) 



