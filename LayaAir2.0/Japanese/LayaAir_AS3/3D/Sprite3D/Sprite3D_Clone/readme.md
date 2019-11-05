#Sprite 3 Dのクローン

###### *version :2.0.1beta   Update:2019-4-13*

クローンについては、LayaAir 3 Dでいくつかのインターフェースが提供されています。よく使われている`clone`和`cloneto`この2つの共通の方法は多く紹介しない。ここでは、スピリット3 D特有のクローンインターフェースについて詳しく説明します。`instantiate`。

！[](img/1.png)<br/>(図1)

この方法は、クローニング時に親ノード情報、世界位置情報、世界回転情報を携帯することができる。([demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Sprite3D&name=Sprite3DClone))


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


！[](img/2 png)<br/>(図2)
