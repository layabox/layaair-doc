#Définir un style de base de texte

Dans certains de nos projets, le texte est souvent utilisé pour définir la taille de la police, la couleur de la police, le contenu du texte, etc.

Nous allons d 'abord faire un minimum de demo pour créer un texte qui ajoute le contenu du texte et définit la couleur de la police (l' arrière - plan est noir par défaut, la couleur n 'est pas modifiée).

Paramètres API pour les styles de texte dans laya.display.text:

![1.png](img/1.png)

![2.png](img/2.png)


```java

package {
  import laya.display.Text;
  public class LayaSample {
   
  public function LayaSample() {
  //初始化引擎
  Laya.init(1136, 640);
   
  var  txt:Text = new Text();
  txt.text = "hello_world";
  txt.color = "#ffffff";
   
  Laya.stage.addChild(txt);
  }  
  }
}
```


À ce moment - là, on peut voir que le txt a été ajouté à la scène, montrant la couleur blanche du txt.

Nous ajoutons ensuite d 'autres styles de police, gras, italiques, tailles, etc.

![3](img/3.png) 



![3](img/4.png) 








```java

package {
  import laya.display.Text;
  public class LayaSample {
   
  public function LayaSample() {
  //初始化引擎
  Laya.init(1136, 640);
   
  var  txt:Text = new Text();
  //设置文本内容
  txt.text = "hello_world";
  //设置文本颜色
  txt.color = "#ffffff";
  //设置文本字体
  txt.font = "Ya Hei";
  //设置字体大小
  txt.fontSize = 32;
  //设置文本区背景
  txt.bgColor = "#c30c30";
  //设置文本框的颜色
  txt.borderColor = "#23cfcf";
  //设置粗体、斜体
  txt.bold = true;
  txt.italic = true;
   
   
  Laya.stage.addChild(txt);
  }  
  }
}
```


![5](img/5.png)

Ici, on voit des changements importants dans le style de police, la taille de la police, la périphérie la plus éloignée de la zone de texte, un autre cercle de bordures bleu clair, et l 'arrière - plan de la zone de texte devient rouge.Les valeurs peuvent être modifiées avec intérêt, et les méthodes d 'utilisation de ces attributs sont mieux comprises.