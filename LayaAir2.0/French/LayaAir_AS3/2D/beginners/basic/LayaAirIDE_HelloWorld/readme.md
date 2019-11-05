#Premier programme de layaairide "Hello layabox"

> Cet article affiche le texte Hello layabox dans l 'environnement de layaairide en langue AS3
]
> la fin de cet article est la première procédure pour achever le moteur layaair.Avant d 'apprendre ce texte, il est important de veiller à ce qu' il soit lu d 'abord:**Création du projet AS3 avec layaairide et présentation détaillée de la structure du catalogue**
]

​


 **Mesure 1**: ouvrir le projet AS3 de layaairide en cliquant sur le nouveau fichier dans la table des matières SRC, comme le montre la figure 1.



​    ![blob.png](img/1.png)< br / >
Figure 1



​**Mesure 2**: Saisissez le nom hellolayabox.as, puis retournez dans la voiture pour créer un fichier de la catégorie S3 d 'hellelayabox.as, comme le montre la figure 2.

​![blob.png](img/2.png)< br / >
Figure 2



​**Mesure 3**: crée hellelayabox.as comme document.Cliquez sur le fichier du projet qui ouvre flashdevelop`“项目名.as3proj”`C'est...`myLaya.as3proj`Modifier`<compiletargets></compiletargets>`Le chemin de compilation de classe de document dans l 'étiquette, tel qu' indiqué à la figure 3, est modifié pour être le nouveau fichier de classe hellelayabox.as dans ce cas, comme indiqué dans le diagramme suivant:

​![blob.png](img/3.png)< br / >
Figure 3



​**Mesure 4**Un`“Hello Layabox”`Ajouter le texte à la scèneCliquez sur hellelayabox.as pour ajouter le code suivant:
​![blob.png](img/4.png)< br / >
Figure 4



**Code hellelayabox.as:**


```javascript

package 
{
    /**
     * ...
     * @author laya_Aaron(小明)
     */
    import laya.display.Text;
    public class HelloLayabox
    {
        public function HelloLayabox()
        {
            //创建舞台，默认背景色是黑色的
            Laya.init(600, 300);
            var txt:Text = new Text();
             
            //设置文本内容
            txt.text = "Hello Layabox";
             
            //设置文本颜色为白色，默认颜色为黑色
            txt.color = '#ffffff';
             
            //将文本内容添加到舞台 
            Laya.stage.addChild(txt);       
        }
    }
 
}

```


​

**Mesure 5**Lorsque le Code a été établi, les résultats ont été compilés et exploités au moyen de raccourcis claviers F5, comme indiqué dans le diagramme suivant:

​![blob.png](img/5.png)< br / >
Figure 5



​**Mesure 6**(En millions de dollars des États - Unis)`“Hello Layabox”`C'est déjà fait, mais c'est plus simple.`“Hello Layabox”`Mieux vaut continuer à modifier le Code comme suit:

​![blob.png](img/6.png)< br / >
Figure 6

**Code hellelayabox.as:**


```javascript

package 
{
    /**
     * ...
     * @author laya_Aaron(小明)
     */
    import laya.display.Text;
    public class HelloLayabox
    {
        public function HelloLayabox()
        {
            //创建舞台
            Laya.init(600, 300);//舞台默认背景色是黑色的
            var txt:Text = new Text();
            txt.text = "Hello Layabox";
             
            //设置文本颜色
            txt.color = '#FF0000';
            //设置文本字体大小，单位是像素
            txt.fontSize = 66;
             
            //设置字体描边
            txt.stroke = 5;  //描边为5像素
            txt.strokeColor = '#FFFFFF';
             
            //设置为粗体
            txt.bold = true;
             
            //设置文本的显示起点位置X,Y
            txt.pos(60, 100);
             
            //设置舞台背景色
            Laya.stage.bgColor = '#23238E';
             
            //将文本内容添加到舞台
            Laya.stage.addChild(txt);
        }
    }
 
}
```


​

Les résultats de l'opération sont indiqués dans la figure ci - après:

​![blob.png](img/7.png)< br / >
Figure 7



Ainsi, si vous suivez ce cours d 'initiation, complétez le plan ci - dessus et félicitez - vous pour votre entrée réussie, nous avons déjà mené à bien le premier programme HTML5 dans la layaairide en langue AS3, ce qui montre bien la configuration de l' environnement de développement de layaair.Pour plus d 'informations sur l' utilisation de l 'API développé par le moteur layaair, consultez le Centre de développement de layabox sur l' API et le Demo en ligne.

