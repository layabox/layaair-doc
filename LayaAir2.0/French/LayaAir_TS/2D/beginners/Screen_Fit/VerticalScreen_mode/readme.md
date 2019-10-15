#écran vertical automatique de jeu et maintien de l 'état de l' écran vertical



Grâce au réglage automatique de l 'écran vertical de layaair, la direction horizontale du jeu peut être maintenue perpendiculaire à la longueur la plus longue de l' écran d 'affichage du navigateur, indépendamment de la rotation du téléphone mobile.

Les paramètres API relatifs à l 'orientation de l' écran sont indiqués dans le diagramme suivant:



​![blob.png](img/1.png)< br / >
Adaptation de la direction de l 'écran

​![blob.png](img/2.png)< br / >
Figure 2) Propriétés des paramètres screenmode



Les codes illustratifs des écrans verticaux automatiques de layaair sont les suivants:


```typescript

module laya {
    import Stage = Laya.Stage;
    import Text = Laya.Text;
    import WebGL = Laya.WebGL;
 
    export class SmartScale_Portrait {
        constructor() {
            // 不支持WebGL时自动切换至Canvas
            Laya.init(200, 300, WebGL);
 
            Laya.stage.alignV = "middle";
            Laya.stage.alignH = "center";
 
            Laya.stage.scaleMode = "showall";
 
            //自动竖屏，让游戏的水平方向始终与浏览器显示屏幕的最长边保持垂直。
            Laya.stage.screenMode = "vertical";
 
            Laya.stage.bgColor = "#232628";
 
            this.showText();
        }
 
        private showText(): void {
            var text: Text = new Text();
 
            text.text = "游戏的水平方向";
            text.color = "gray";
            text.fontSize = 20;
 
            text.x = Laya.stage.width - text.width >> 1;
            text.y = Laya.stage.height - text.height >> 1;
 
            Laya.stage.addChild(text);
        }
    }
}
new laya.SmartScale_Portrait();
```




L 'effet de fonctionnement de l' écran vertical automatique de layaair dans l 'état de l' écran vertical du téléphone portable est illustré dans la figure ci - dessous:

​![blob.png](img/3.png)< br / >
Figure 3 Résultats de fonctionnement après réglage de l 'écran vertical



L 'effet de fonctionnement de l' écran vertical automatique de layaair dans l 'état de l' écran transversal du téléphone portable est illustré dans la figure ci - dessous:

​![blob.png](img/4.png)< br / >
Figure 4 résultats d 'exploitation après modification des bords les plus longs



