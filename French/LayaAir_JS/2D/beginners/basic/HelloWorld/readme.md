#Premier programme: afficher le texte "Allo - layabox"


 **Avant de lire ce texte, il faut lire le projet JS et comprendre la structure du catalogue.**



Étape 1: Sélectionnez le bouton droit du SRC et cliquez sur le nouveau fichier avec le bouton gauche pour créer un fichier hellolayabox.js sous le répertoire SRC.

​![图片](img/1.png)<br/>





Étape 2: cliquez sur hellolayabox.js dans le répertoire SRC pour commencer à rédiger le code suivant:


```javascript

//创建舞台，默认背景色是黑色的
Laya.init(600, 300); 
var txt = new Laya.Text(); 
//设置文本内容
txt.text = "Hello Layabox";  
//设置文本颜色为白色，默认颜色为黑色
txt.color = "#ffffff";  
//将文本内容添加到舞台 
Laya.stage.addChild(txt);
```




Étape 3: enregistrement après l 'achèvement du codage, compilé en F5 et sur la page éjectée, on peut voir les résultats d' exploitation du Code, comme le montre la figure suivante:
​![图片](img/2.png)< br / >




Étape 4: fermer la fenêtre d 'affichage une fois qu' elle a été affichée avec succès.Nous continuons d 'élaborer des codes pour rendre le texte plus beau.Continuer à affiner le Code comme suit:


```java

//创建舞台，默认背景色是黑色的
Laya.init(600, 300); 
var txt = new Laya.Text(); 
//设置文本内容
txt.text = "Hello Layabox";  
//设置文本颜色
txt.color = "#FF0000";
//设置文本字体大小，单位是像素
txt.fontSize    = 66;  
//设置字体描边
txt.stroke = 5;//描边为5像素
txt.strokeColor = "#FFFFFF";  
//设置为粗体
txt.bold = true;  
//设置文本的显示起点位置X,Y
txt.pos(60,100);  
//设置舞台背景色
Laya.stage.bgColor  = '#23238E';  
//将文本内容添加到舞台 
Laya.stage.addChild(txt);
```




Étape 5: enregistrer une fois achevée, puis compiler à nouveau comme F5, les résultats d'exploitation estimés comme indiqué dans la figure ci - après:
​![图片](img/3.png)< br / >


Ainsi, si vous suivez ce cours d 'initiation, complétez le plan ci - dessus et félicitez - vous pour votre entrée réussie, nous avons déjà achevé le premier moteur layaair HTML5 développé en javascript.Pour plus d 'informations sur l' utilisation de l 'API développé par le moteur layaair, veuillez consulter le programme au centre de développement de layabox.