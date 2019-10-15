#Automatic transverse Screen and Transverse Screen Game

Avant de parler de l 'écran transversal automatique du moteur, dites d' abord qu 'il y a des gens qui se trompent sur l' écran transversal.

Jusqu 'à présent, certains continuent de dire que si un jeu H5 doit être réalisé sur écran vertical, en fait, si l' on comprend bien, une grande partie de ces mots sont entrés dans l 'industrie H5 en 2015 ou plus tôt, et d' autres encore sont touchés par les premiers Jeux H5.Pourquoi se trompent - ils?Quelle est la raison pour laquelle on appuie le jeu à écran vertical?À l'issue d'échanges avec un grand nombre de personnes qui partagent ce point de vue, trois points principaux ont été dégagés.

####D 'abord, le jeu à écran transversal consomme plus de performances?

Cette possibilité existe, mais elle est tout à fait évitable.A cause des problèmes de performance, certains moteurs sont en rotation sur l 'écran, peut - être pas bien gérés.Deuxièmement, le projet lui - même n 'est pas adapté après la rotation de l' écran, ce qui entraîne une augmentation du volume de rendu.On dit que les écrans verticaux n 'ont pas besoin d' un traitement de rotation et que l 'augmentation des opérations de rotation augmentera certainement la consommation de performances du jeu.Il semble logique, en fait, la rotation n 'est généralement qu' une fois, et la consommation de cette performance peut être ignorée.Par conséquent, les performances du jeu à écran horizontal consomment beaucoup plus, si ce n 'est pas son propre projet qui n' est pas bien écrit.Le moteur layaair n'a pas ce problème.

####Deuxièmement, le taux de conversion des utilisateurs de jeux à écran horizontal sera encore plus bas?

Ce point de vue a été créé dans les premiers Jeux H5, lorsque les moteurs qui ne supportent pas les écrans transversaux automatiques ou les jeux H5 qui n 'utilisent pas les moteurs ne peuvent pas réaliser les écrans transversaux automatiques.Le fonctionnement de l 'écran transversal est normalement limité à l' interrupteur de verrouillage de l 'écran transversal du système.En cas d 'augmentation de l' opération de l 'utilisateur, il y a un risque réel de perte de certains utilisateurs.Mais le moteur de layabox n'a pas ce problème.Le mode d 'écran horizontal automatique du moteur layaair est basé sur le rapport d' affichage du navigateur, la direction horizontale du jeu étant toujours verticale par rapport au côté plus court de l 'écran du navigateur et n' étant pas affectée par le système.Il n 'y a donc pas d' opération supplémentaire entraînant une perte supplémentaire pour l 'utilisateur.

####Le jeu à écran vertical est meilleur que le jeu à écran horizontal?

Tout d 'abord, on ne peut nier qu' il y a beaucoup de très bons jeux dans le jeu à écran vertical.Mais il y a aussi beaucoup de succès dans les jeux à écran transversal, en particulier les jeux à écran transversal app.En fait, pour le joueur, il ne se soucie pas de la technologie que vous utilisez pour développer le jeu, et si la qualité du jeu lui - même l 'attire et le paye.Par conséquent, qu 'il s' agisse d' un jeu à écran horizontal ou vertical, tant que l 'équipe de production est excellente, est capable de produire un grand travail.Ce n 'est pas parce qu' il s' agit d 'un écran horizontal ou vertical qu' il affecte l 'expérience de l' utilisateur du jeu.



##Com.NET.CN layaaiir.com.NET.CN lyaair.com.NET.CN lyaair.com.NET.CN lyaair.com.NET.CN

Comme on vient de le dire, le moteur layaair est équipé d 'un écran horizontal automatique qui maintient la direction horizontale du jeu verticale avec un écran de browser plus court.Les codes d'exemples pour les écrans transversaux automatiques sont les suivants:


```javascript

(function()
{
    var Stage = Laya.Stage;
    var Text  = Laya.Text;
  
    (function()
    {
        //初始化舞台
        Laya.init(500, 300);
         
        //让舞台处于屏幕的垂直居中
        Laya.stage.alignH = "center";
         
  
        //保持原始高宽比的情况下，将舞台铺满屏幕，超出比例的部分会有黑边
        Laya.stage.scaleMode = "showall";
   
        //自动横屏，游戏的水平方向始终与浏览器屏幕较短边保持垂直
        Laya.stage.screenMode = "horizontal";
              
        //设置舞台背景色
        Laya.stage.bgColor = "#232628";
         
        showText();
    })();
  
    function showText()
    {
        var text = new Text();
        text.text = "游戏水平方向";
        text.color = "gray";
        text.fontSize = 50;
        text.x = Laya.stage.width - text.width >> 1;
        text.y = Laya.stage.height - text.height >> 1;
 
        Laya.stage.addChild(text);
     }
})();
```




**L 'effet de fonctionnement du Code dans un état d' écran vertical est le suivant:**

​![blob.png](img/1.png)< br / >
Figure 1 exemples d 'effets de réglage d' un écran transversal

**L 'effet de fonctionnement du Code dans l' état de l 'écran transversal est le suivant:**

​![blob.png](img/2.png)< br / >
Figure 2 démonstration de l 'effet du changement du côté le plus court



Le Code de traitement des écrans transversaux automatiques est "laya.stage.screenmode = stage.screen \ \ u horizontal;", comme indiqué dans la note du Code d 'exemple.Tout le monde peut faire l 'expérience du codage.