#Exporter un système de dépannage dans l 'Unity

###### *version :2.1.1beta   Update:2019-8-2*

Le module layaair3d est un support**Traillenderer**L 'ensemble est exporté.

Nous allons d'abord ajouter un Sphere à unity3d.`Trail Renderer`Et produit simplement un effet de traction.Les résultats sont présentés dans la figure 1.

[] (IMG / 1.png) <br > (Figure 1)

Une fois que l 'édition sera terminée, nous choisirons d' exporter la prédiction.

**Tip**Le matériau utilisé pour les tailles ne peut être que:`LayaAir3D/Trail Shader`Si l 'autre Shader est utilisé, il est automatiquement converti en Trail - Shader lors de l' exportation.La conversion automatique peut entraîner une différence importante entre l 'effet réel et l' effet au moment de la conception, et il faut donc en tenir compte lors de la conception.

[] (IMG / 2.png) <br > (Figure 2)

**Attention:**L 'objet avec la queue est un elfe qui ne porte pas de modèle, comme s' il n' y avait pas de Sphere après l 'Export.Il est donc nécessaire de l 'ajouter à l' objet après l 'Export.

Ici, nous utilisons l 'exemple 3D de l' IDE et modifions simplement le Code gameu.


```typescript

//....上面为原本示例代码,去掉了示例代码的旋转摄像机
//加载拖尾
Laya.Sprite3D.load('LayaScene_tst/Conventional/Sphere.lh',Laya.Handler.create(this,function(sp){
    //将加载的拖尾添加给示例盒子
    box.addChild(sp);
    //为了体现效果，我们移动盒子和摄影机观察效果
    Laya.timer.frameLoop(1,this,function(){
        //使用差速来体现移动
        box.transform.translate(new Laya.Vector3(0,0.05,0),false);
        camera.transform.translate(new Laya.Vector3(0,04,0),false);
    });
}));
```


[] (IMG / 3.gif) <br > (Figure 3)

