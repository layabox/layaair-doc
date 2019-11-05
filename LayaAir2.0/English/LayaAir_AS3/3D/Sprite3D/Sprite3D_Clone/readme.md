#Cloning of Sprite3D

###### *version :2.0.1beta   Update:2019-4-13*

With regard to cloning, several interfaces are provided in LayaAir3D. More commonly used`clone`and`cloneto`These two general methods are not introduced much. Here is a detailed explanation of the unique clone interface in sprite3d`instantiate`。

![] (img/1.png)<br> (Figure 1)

This method can carry the parent node information, world position information and world rotation information when cloning. ([demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Sprite3D&name=Sprite3DClone))


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


![] (img/2.png)<br> (Figure 2)
