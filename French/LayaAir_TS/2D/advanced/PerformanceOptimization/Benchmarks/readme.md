#Test de référence



Les outils statistiques de performance incorporés dans le moteur layaair peuvent être utilisés pour des essais de référence et des tests en temps réel.Developpeur`laya.utils.Stat`Type, affiche le panneau statistique par stat.show ().L'exemple suivant est fourni:




```javascript

   Stat.show(0,0);             //AS3的面板调用写法       

    Laya.Stat.show(0,0);        //TS与JS的面板调用写法
```


Informations statistiques fournies par Canvas:



​	![1](img/1.png)< br / >
(Figure 1)

Informations statistiques fournies par webgl:



​	![图片1.png](img/2.png)< br / >
(Figure 1)


 



**Signification des paramètres statistiques**- Oui.

•**FPS**: nombre de trames par seconde (plus le nombre est élevé).
Lorsque le rendu Canvas est utilisé, le champ de description est affiché comme fps (Canvas) et le champ de description est affiché comme fps (webgl) Lorsque le rendu webgl est utilisé.

•**Sprite**: nombre de noeuds de rendu
Sprite calcule tous les noeuds de rendu (y compris les conteneurs) dont la taille influe sur le nombre de fois où les noeuds du moteur sont traversés, organisés et rendus.

•**Drawcall.**Drawcall représente un sens différent selon Canvas et webgl (le moins possible):

Le nombre de dessins par trame, y compris les images, le texte et les dessins vectoriels, est indiqué sous Canvas.Limite autant que possible à moins de 100.

Le processus de préparation des données et de notification à la GPU du rendu est connu sous le nom de drawcall et, à chaque fois, le transfert du matériau avec le Shader prend beaucoup de temps, sauf en ce qui concerne la notification du rendu de la GPU.Le nombre de drawcall est un indicateur important de la performance et est limité à moins de 100.

•**Canvas**: trois valeurs - le nombre de toiles par trame redéfinie / le type de mémoire cache est le nombre de toiles du type « normal » et le type de mémoire cache le nombre de toiles du type « bitmap ».

•**Curmem**: seuls les rendu webgl représentent la mémoire et l 'occupation apparente (le plus bas possible).

•**Shader.**: seuls les rendu webgl indiquent le nombre de soumissions par trame Shader.

***Tips:**Qu'il s'agisse du modèle Canvas ou du modèle webgl, nous devons nous concentrer sur les trois paramètres de drawcall, Sprite et canvas, puis sur l'optimisation ciblée.(voir "performance de rendu graphique")*


 