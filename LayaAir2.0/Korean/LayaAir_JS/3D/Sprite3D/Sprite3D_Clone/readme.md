#Sprite3D 복제

###### *version :2.0.1beta   Update:2019-4-13*

클론, 레이아라 3D에서 몇 가지 인터페이스를 제공했다.비교적 상용적`clone`과`cloneto`이 두 종류의 통용적인 방법은 많이 소개하지 않는다.여기에 Sprite3D 특유의 클론 인터페이스를 상세히 설명합니다.`instantiate`.

[] (img/1.png)<br>(1)

이 방법은 복제할 때 아버지의 노드 메시지를 휴대하고 세계 위치 정보와 세계의 회전 정보를 얻을 수 있다.과[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Sprite3D&name=Sprite3DClone)차다


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


[] (img/2.png)<br>(2)
