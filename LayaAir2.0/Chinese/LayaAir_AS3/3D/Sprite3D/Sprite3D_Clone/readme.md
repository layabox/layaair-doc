# Sprite3D的克隆

###### *version :2.0.1beta   Update:2019-4-13*

关于克隆，LayaAir3D中提供了几种接口。比较常用的`clone`和`cloneto`这两种通用的方法就不多做介绍了。这里详细讲解下Sprite3D中特有的克隆接口`instantiate`。

![](img/1.png)<br>(图1)

该方法可以在克隆时携带父节点信息，世界位置信息和世界旋转信息。([demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Sprite3D&name=Sprite3DClone))

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

![](img/2.png)<br>(图2)
