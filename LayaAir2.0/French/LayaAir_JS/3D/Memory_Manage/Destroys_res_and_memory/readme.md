# 销毁资源并释放内存

###### *version :2.0.2beta   Update:2019-5-8*

#####En ce qui concerne les raisons pour lesquelles les ressources ont été libérées:

Dans le développement du jeu layaair 3D, la libération des ressources est très importante.Les ressources 3D comprennent des modèles, des affiches, des matériaux, des animations, etc. pour obtenir de bons résultats d 'image, le fichier sera beaucoup plus grand que le 2D, alors que les moteurs 3D seront pratiquement toutes mis en GPU pour le calcul et le rendu, ce qui absorbera une grande partie de l' affichage.Le jeu finira par s' effondrer si les ressources ne sont pas libérées.

Il n 'existe pas de mécanisme de récupération des ordures comme la mémoire, mais il faut les libérer manuellement, et il faut donc accorder une attention particulière à la libération des ressources.

Cet exemple est le suivant:**Ressources**A**Chargement de ressources**Vous pouvez simplement modifier l 'exemple.

La destruction d 'une mémoire de libération pour une seule ressource nécessite l' utilisation de l 'objet de ressource`destroy()`Méthode

> la grille utilisée dans l 'exemple de grille est la même que celle utilisée pour le téléchargement prédéfini séparé, de sorte qu' avant d 'écrire cet exemple, nous avons copié le dossier layamonkey, qui s' appelle Laya monkey2, ce qui permet de distinguer facilement l' exemple de chargement prédéfini.La destruction d'une grille en cours d'utilisation entraîne une erreur de comptabilisation.


```typescript

//加载Mesh
Laya.Mesh.load("res/threeDimen/skinModel/LayaMonkey2/Assets/LayaMonkey/LayaMonkey-LayaMonkey.lm", Laya.Handler.create(this, function(mesh) {
  	........
    //上面省略，我们再网格加载完成3秒后对该网格进行销毁
    Laya.timer.once(3000,this,function() 
    {
        //销毁了使用了该网格的精灵
        layaMonkey.destroy();
        //对网格进行销毁
        mesh.destroy();        
    });
}));
```


**Chargement terminé.**

Une fois que toutes les ressources ont été chargées, on peut voir la mémoire 67.26 M, 10.13 m.

Si les ressources de la grille elles - mêmes ne sont pas traitées, il n 'y aura pas de diminution des ressources de la grille et les ressources de la grille ne seront pas stockées.(l'développeur peut effacer l'effet de la vérification du Code de ligne de la grille détruite)

[] (IMG / 1.png) <br > (Figure 1)

**Après destruction**

[] (IMG / 2.png) <br > (Figure 2)

Après la mise en œuvre du Code de destruction, il est apparu clairement que 67,5 m étaient encore en mémoire 10,04 m.Le modèle de grille a été retiré et les ressources ont été détruites.

Les autres types de ressources, tels que Mesh, material, texture2d, etc., peuvent être détruits de la même manière.
