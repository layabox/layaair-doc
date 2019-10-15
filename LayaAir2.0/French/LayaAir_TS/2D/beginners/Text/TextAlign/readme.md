#Alignement de texte & retour automatique de ligne

En ce qui concerne le mode d 'alignement, l' alignement horizontal et Vertical classique permet d 'afficher notre texte dans la zone de texte.On trouvera ci - après une description des paramètres de l'API, qui sera présentée par le Code de l'exemple.Paramètres API pour les styles de texte dans laya.display.text:

![1](img/1.png)< / BR >

![2](img/2.png)< / BR >

![3](img/3.png)< / BR >

![4](img/4.png)< / BR >

Dans le Code qui définit le style de police, vous définissez d 'abord une zone de texte pour le texte, puis le texte est centré horizontalement et verticalement dans la zone de texte.L 'alignement horizontal et vertical du texte ne sera pas efficace sans réglage direct de la zone de texte.


```typescript

module laya {
	import Stage = Laya.Stage;
	import Text = Laya.Text;
	import Browser = Laya.Browser;
	import WebGL = Laya.WebGL;

export class HelloLayabox {

	constructor() {
		// 不支持WebGL时自动切换至Canvas
		Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);

		Laya.stage.alignV = Stage.ALIGN_MIDDLE;
		Laya.stage.alignH = Stage.ALIGN_CENTER;

		Laya.stage.scaleMode = "showall";
		Laya.stage.bgColor = "#232628";

        var txt:Laya.Text = new Laya.Text();
        //设置文本内容
        txt.text = "hello_world";
         //设置文本区背景
        txt.bgColor = "#c30c30";
         //设置文本的宽高
        txt.width = 400;
        txt.height = 400;
        //设置文本水平居中
        txt.align = "center";
        //设置文本垂直居中
        txt.valign = "middle";
        Laya.stage.addChild(txt);
		
	}
  }
}
new laya.HelloLayabox();
```


![5](img/5.png)< / BR >

Si d 'autres modes d' alignement sont nécessaires dans le codage réel, veuillez consulter les valeurs d 'alignement align et valign de l' API pour trouver des modes d 'alignement horizontal et Vertical appropriés pour les articles.

Si le contenu du texte dépasse la plage de texte que nous avons définie, il n 'y aura pas de contenu hors de la scène.

Paramètres API:

![6](img/6.png)< / BR >

Une pluralité de paramètres de contenu textuel de txt sont insérés dans le code ci - dessus, puis un code de conversion automatique est ajouté.

Pour définir la largeur et la hauteur de la zone de texte, le texte est automatiquement remplacé par la largeur text par défaut.Les codes sont les suivants:


```typescript

module laya {
    import Stage = Laya.Stage;
    import Text = Laya.Text;
    import Browser = Laya.Browser;
    import WebGL = Laya.WebGL;

    export class HelloLayabox { 
        constructor() {
            // 不支持WebGL时自动切换至Canvas
            Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);

            Laya.stage.alignV = Stage.ALIGN_MIDDLE;
            Laya.stage.alignH = Stage.ALIGN_CENTER;

            Laya.stage.scaleMode = "showall";
            Laya.stage.bgColor = "#232628";

            var txt:Laya.Text = new Laya.Text();
            //设置文本内容
            txt.text = "Layabox是HTML5引擎技术提供商与优秀的游戏发行商，面向AS/JS/TS开发者提供HTML5开发技术方案！";
            //设置文本区背景
            txt.bgColor = "#c30c30";
            //设置文本的宽高
            txt.width = 400;
            txt.height = 400;
            //设置文本水平居中
            txt.align = "center";
            //设置文本垂直居中
            txt.valign = "middle";
            //设置自动换行
            txt.wordWrap = true;
            Laya.stage.addChild(txt);            
        }
    }
}
new laya.HelloLayabox();
```


![7](img/7.png)< / BR >

Vous pouvez voir ici que la permutation automatique que nous avons établie a été réalisée et que tout le texte est affiché dans cette zone de texte.