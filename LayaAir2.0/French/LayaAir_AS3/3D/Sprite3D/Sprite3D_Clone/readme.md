#Clonage de sprite3d

###### *version :2.0.1beta   Update:2019-4-13*

En ce qui concerne le clonage, plusieurs interfaces sont disponibles dans layaair3d.Plus communément`clone`Et`cloneto`Ces deux approches communes ne sont guère présentées.Voici une explication détaillée de l'interface clone spécifique de sprite3d.`instantiate`".

[] (IMG / 1.png) <br > (Figure 1)

Ce procédé peut porter des informations de noeud père, des informations de position mondiale et des informations de rotation mondiale lors du clonage.([demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Sprite3D&name=Sprite3DClone)- Oui.


```typescript

{
    ......
    //加载模型
    Laya.loader.create("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh", Handler.create(this, onComplete));
}

////完成回调
public function onComplete():void {
    //获取资源
    var layaMonkey:Sprite3D = scene.addChild(Loader.getRes("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh")) as Sprite3D;
    //克隆sprite3d
    var layaMonkey_clone1:Sprite3D = Sprite3D.instantiate(layaMonkey, scene, false, new Vector3(0.6, 0, 0));
    //克隆sprite3d
    var layaMonkey_clone2:Sprite3D = scene.addChild(Sprite3D.instantiate(layaMonkey, null, false, new Vector3( -0.6, 0, 0))) as Sprite3D;
}
```


[] (IMG / 2.png) <br > (Figure 2)
