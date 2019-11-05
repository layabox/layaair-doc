#Effacer le dessin vectoriel



Sur le navigateur de PC, on trouve souvent des dents de scie dans les images vectorielles dessinées par le moteur layaair, parce que le moteur layaair a été optimisé en fonction de considérations de performance et parce que la densité de pixels des téléphones portables est relativement élevée, ce qui fait apparaître des problèmes de scie apparents sur le PC, En fait, sur le matériel mobile.



###Ouvrir les réglages d 'élimination des dents de scie

S' il y a un développeur idéal, il peut passer par`"Laya.init();"`Avant d 'initialiser le Code de la scène, ajoutez un code de ligne.`“Laya.Config.isAntialias=true;”`Ouvre le réglage d 'élimination de la dent de scie, de sorte qu' à l 'extrémité du téléphone, la dent de scie est complètement invisible.Bien sûr, l 'activation de ce paramètre accroît la consommation de performances.Il est donc recommandé d 'utiliser le moins possible l' image vectorielle lors du développement du jeu et, même après utilisation, de ne pas ouvrir les réglages d 'élimination des dents de scie, dans la mesure du possible, en fonction de considérations de performance.

**Code d 'exemple**- Oui.


```javascript

    //消除矢量绘制的锯齿，但会增加性能消耗
        Laya.Config.isAntialias=true;
         
        //初始化舞台
        Laya.init(500, 300, WebGL);
```

