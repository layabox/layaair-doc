#Alignement horizontal et vertical

> en ce qui concerne le mode d 'alignement, il s' agit essentiellement d' alignement horizontal et Vertical classique.Le moteur layaair peut être configuré de manière pratique et rapide, nous allons d 'abord comprendre la description des paramètres de l' API, puis nous la présenterons par un code d 'exemple.

La description des paramètres est présentée dans les figures 1 et 2:

​![image.png](img/1.png)< br / >
Diagramme 1 mode d 'alignement d' un écran



​![blob.png](img/2.png)< br / >
Figure 2 propriétés dans un mode d 'alignement



Nous utilisons demo, centre horizontal et Vertical:


```typescript

module laya {
    import WebGL = Laya.WebGL;
    import Stage = Laya.Stage;
 
    export class smartScale {
        constructor()
        {
            //初始化舞台，不支持WebGL时会自动切换至Canvas
            Laya.init(200, 300, WebGL);
        
            //垂直居中对齐，另一种写法：Laya.stage.alignV = Stage.ALIGN_MIDDLE
            Laya.stage.alignV = "middle";
              
            //水平居中对齐，另一种写法：Laya.stage.alignH = Stage.ALIGN_CENTER;
            Laya.stage.alignH = "center";
  
            Laya.stage.bgColor = "#FF0000";
        }
 
    }
}
new laya.smartScale();
```


Les effets de fonctionnement sont illustrés dans la figure ci - après:

​![blob.png](img/3.png)< br / >
Figure 3 résultats d 'exécution de l' exemple

D 'autres modes d' alignement peuvent modifier les valeurs d 'alignh et d' alignv et expérimenter différents modes d 'alignement pendant le codage réel.