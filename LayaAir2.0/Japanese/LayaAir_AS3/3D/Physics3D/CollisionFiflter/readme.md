# 碰撞器过滤

###### *version :2.1.1   Update:2019-7-19*

衝突フィルタリングは剛体と物理衝突器の両方にある属性です。実際の開発過程では、すべての物体が他の物体と衝突に参加することは不可能です。例えば、主人公が自分で発射した弾と自分は衝突を許さないし、また自分の弾は仲間にもダメージを与えません。これはフィルタを使って、弾がそれらの物体と衝突することができるように設定します。どれが衝突できないですか？

衝突フィルターについては、Physics ColliderとRigidBody 3 Dを使用する必要があります。

1.`collisionGroup:int`—衝突グループに所属しています。

2.`canCollideWith:int`—衝突の衝突グループが発生することができます。この2つの属性。

衝突器のパケット設定については、表示できます。[Physics3DUtils类](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=3D&class=laya.d3.utils.Physics3DUtils)一つの物体が同じ時間に属する衝突パケットは唯一である。

衝突が発生する衝突グループという属性については、単一のグループとしか衝突しないなら、Physics 3 DUtilsのパケット割当値を使えばいいです。

複数のグループとの衝突が必要な場合はビット操作が必要です。

以下のコードは公式の例の抜粋です。[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Physics3D&name=PhysicsWorld_CollisionFiflter)を選択します。例では、赤色の球のみにcanCollideWith属性を設定します。他の衝突体のグループはそれぞれ異なる。


```typescript

//红色球体设置
//创建刚体碰撞器
var rigidBody:Rigidbody3D = sphere.addComponent(Rigidbody3D);
//创建球形碰撞器
rigidBody.isKinematic = true;
//设置可以与其发生碰撞的碰撞组
rigidBody.canCollideWith = Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1 | Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER3 | Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER5;//只与自定义组135碰撞(如果多组采用位操作）
.......
//给圆锥体添加刚体组件
var rigidBody:Rigidbody3D = cone.addComponent(Rigidbody3D);
//给该刚体划分碰撞组
rigidBody.collisionGroup = Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER3;//自定义组3
......
//给胶囊体添加刚体
var rigidBody:Rigidbody3D = capsule.addComponent(Rigidbody3D);
//设置胶囊体的碰撞分组
rigidBody.collisionGroup = Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER2;//自定义组2,会跳过碰撞
......
```


>グループ情報：箱-カスタムグループ1、カプセル-カスタムグループ2、円錐体-カスタムグループ3、円柱-カスタムグループ4、ボール-カスタムグループ5

！[](img/1.gif)<br/>(図1)

図2では、赤玉が円柱とカプセルを通過し、同時に球体と箱を突き飛ばしているのが見て取れます。他の幾何学体の間にまた相互衝突がある。

canCollideWith属性については、このように複数の衝突グループを追加する方法に加えて、排除法を用いることができる。例えば、カスタムパケット1，2グループ以外のグループと衝突する。


```typescript

//排除的方法
rigidBody.canCollideWith = Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER ^ Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1 ^ Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER2;
```

