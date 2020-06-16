# Sprite3D的克隆

###### *version :2.7.0beta   Update:2020-6-12*

关于克隆，LayaAir3D中提供了几种接口。比较常用的`clone`和`cloneto`这两种通用的方法就不多做介绍了。这里详细讲解下Sprite3D中特有的克隆接口`instantiate`。

```typescript
static instantiate(original, parent = null, worldPositionStays = true, position = null, rotation = null);
```

- original :原始精灵。


- parent:父节点。


- worldPositionStays: 是否保持自身世界变换。


- position:世界位置,worldPositionStays为false时生效。


- rotation:世界旋转,worldPositionStays为false时生效。

该方法可以在克隆时携带父节点信息，世界位置信息和世界旋转信息。([demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Sprite3D&name=Sprite3DClone))

```typescript
{
    ......
    //加载模型
    Laya.loader.create("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh", Laya.Handler.create(this, this.onComplete));
}

//完成回调
onComplete() {
    //获取资源
    var layaMonkey = this.scene.addChild(Laya.Loader.getRes("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh"));
    //克隆sprite3d
    var layaMonkey_clone1 = Laya.Sprite3D.instantiate(layaMonkey, this.scene, false, new Laya.Vector3(0.6, 0, 0));
    //克隆sprite3d
    var layaMonkey_clone2 = this.scene.addChild(Laya.Sprite3D.instantiate(layaMonkey, null, false, new Laya.Vector3( -0.6, 0, 0)));
}
```

![](img/2.png)<br>(图2)
