# 角色碰撞器

###### *version :2.1.1   Update:2019-7-19*

人に似たようなキャラクターを作りたいなら、衝突はキャラクターコントローラを使うことができます。この衝突器は主に第三人称ゲーム、第一人称ゲームのキャラクターコントロールに使われます。

LayaAir 3 Dにおけるキャラクター衝突器は、剛体物理特性を有し、人物コントローラの特性にも関連している。

1.人物は転ぶことができない、つまり一つがある。`upAxisUp`(Upベクトル)

2.人物が歩いていると「乗り越えられる」というものがあります。`stepHeight`（最高高さ）

したがって、通常は、似たような人の役割はすべてキャラクターコントローラで制御できます。

>ここでいう転ばないとは、人物の衝突器が倒れないということです。Upベクトルはこのコントローラの回転軸を確定していますが、コントローラはこの軸によってしか回転できないと規定しています。

**Tip**：キャラクター衝突器で使われる衝突箱はカプセル衝突箱です。

！[](img/1.png)<br/>(図1)

キャラクター衝突器には、移動やジャンプのような非常に使いやすい方法があります。

！[](img/2 png)<br/>(図2)

もっと多くのキャラクターの衝突器の使い方はAPIから見られます。[地址](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=Core&class=laya.d3.physics.CharacterController)を選択します。

####（1）コードを使ってキャラクター衝突器を作成する

**プラグインは現在、キャラクター衝突器のエクスポートをサポートしていません。コードを使って作成する必要があります。**

以下のコードは公式の例から来ています。[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Physics3D&name=PhysicsWorld_Character))


```typescript

//为精灵添加角色控制器
var character:Laya.CharacterController = monkey.addComponent(Laya.CharacterController);
//创建胶囊碰撞器
var sphereShape:Laya.CapsuleColliderShape = new Laya.CapsuleColliderShape(1.0, 3.4);
//设置Shape的本地偏移
sphereShape.localOffset = new Laya.Vector3(0, 1.7, 0);
//设置角色控制器的碰撞形状
character.colliderShape = sphereShape;
```


！[](img/3 png)<br/>(図3)

