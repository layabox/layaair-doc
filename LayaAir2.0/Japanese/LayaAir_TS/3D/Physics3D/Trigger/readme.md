# 物体触发器

###### *version :2.1.1   Update:2019-7-19*

衝突器は触発器のキャリアであり、触発器は衝突器の属性の一つにすぎない。

トリガーは物理エンジンに制御されていませんが、トリガーは衝突時に3つのユニークなトリガー情報を発行します。二つのフリップフロップが衝突すると衝突イベントが発生しますが、一つは剛体を含む必要があります。一つのフリップフロップと一つの普通の衝突器が衝突します。その中の一つは剛体を追加しなければなりません。

また、トリガーを設置した物体が衝突した時には、物理的なフィードバックはありません。

剛体がない物体にはトリガーを設置する方法は以下の通りです。


```typescript

//创建盒型MeshSprite3D
var box = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(sX, sY, sZ))) as Laya.MeshSprite3D;
//创建物理碰撞器
var staticCollider:Laya.PhysicsCollider = box.addComponent(Laya.PhysicsCollider);
//标记为触发器,取消物理反馈
staticCollider.isTrigger = true;
```


剛体のある物体に触発器を設置する方法は以下の通りです。


```typescript

//创建一个球体
var sphere = scene.addChild(new Laya.MeshSprite3D(PrimitiveMesh.createSphere(radius))) as Laya.MeshSprite3D;
//给球体添加刚体
var rigidBody:Laya.Rigidbody3D = sphere.addComponent(Laya.Rigidbody3D);
//将刚体设置为触发器
rigidBody.isTrigger = true;
```


**Tip：剛体isTrigger=falseの場合、他のトリガーと衝突しても、自分のトリガーをトリガする方法です。**

