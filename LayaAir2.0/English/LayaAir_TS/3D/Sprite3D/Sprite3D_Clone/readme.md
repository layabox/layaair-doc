# Sprite3D的克隆

###### *version :2.0.1beta   Update:2019-4-13*


关于克隆，LayaAir3D中提供了几种接口。比较常用的`clone`and`cloneto`These two general methods are not introduced much. Here is a detailed description of the unique cloning interface in Sprite3D.`instantiate`。

![] (img/1.png)<br> (Figure 1)

This method can carry the parent node information, world position information and world rotation information when cloning. ([demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Sprite3D&name=Sprite3DClone))


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


![] (img/2.png)<br> (Figure 2)
