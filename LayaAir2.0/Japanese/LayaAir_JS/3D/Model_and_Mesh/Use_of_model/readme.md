#モデルの機能紹介

###### *version :2.0.2beta   Update:2019-4-26*

3 Dモデルは、場合によっては複数のサブモデルのオブジェクトから構成されることがあります。例えばシーンモデル.lsは、基本的には複数の物体モデルと材質から構成されています。外層はSprite 3 D容器で、内部は本物のモデルMesh Sprite 3 DまたはSkinedMesh Sprite3 Dです。また、複数の階層がネストされている場合があります。

####サブオブジェクトのグリッドを取得

ゲームロジックを作成する時、モデルを修正したり、モデルを切り替えたり、削除したり、モデルにコンポーネントを追加したり、モデル上のアニメーションコンポーネントを取得したり、モデルの材質を修正したりする必要があります。これは全部ロードされたモデルからサブオブジェクトを取得する必要があります。**get ChildAt()、get ChildByName()**方法はサブオブジェクトを取得します。これは2 Dエンジン取得サブオブジェクト法と同じです。

次はシーンのlsファイルをロードして、そのサブオブジェクトを取得します。サブオブジェクトを取得する前に、lsファイルを開いてモデルの親子階層関係を確認することを提案します。モデルを作る時に、モデルがどのぐらいのサブオブジェクトモデルから構成されているかということと、その命名規則が確定できないからです。

**Tips**：3 ds maxでモデル化する場合、モデルのサブオブジェクトに名前を付けることを提案し、プロジェクトのリソース命名規則を制定し、デフォルトのモデル名を使用しないでください。


```typescript

//初始化3D场景
var scene = Laya.stage.addChild(Laya.Loader.getRes("res/threeDimen/scene/ChangeMaterialDemo/Conventional/scene.ls"));
//获取球型精灵
var sphere = scene.getChildByName("Sphere");
//获取精灵的mesh
var sphereMesh = sphere.meshFilter.sharedMesh;
//此时已经拿到了场景中的球体的网格
```




####サブオブジェクトのグリッドを変更

サブオブジェクトを取得する際には、モデルと材質がロードされていないとサブオブジェクトを取得できないので、リソースのプリロードが必要です。このデモの中で使っておきました。`Laya.loader.create`を選択します。

ゲームの中で、私達はいつもキャラクターの入れ替えシステムを作って、時にはモデルを変えて、時にはスタンプを交換して、時には両方とも交換します。材質の貼り付け部分は後の章で説明しますので、モデルのグリッドを交換する方法だけを紹介します。

モデルMesh Sprite 3 DまたはSkinedMesh Sprite 3 Dにあります。**meshFilter**属性は、グリッドフィルタクラスの例です。この属性の中の**sharedMesh**モデルのメッシュです。交換や廃棄ができます。

以下の例では、ボタンにクリックイベントを追加しました。index値をクリックするたびに加算し、シーンlsから取得したモデルグリッドをindex値に基づいて修正する。


```typescript

//新建四个mesh
var box = Laya.PrimitiveMesh.createBox(0.5, 0.5, 0.5);
var capsule = Laya.PrimitiveMesh.createCapsule(0.25, 1, 10, 20);
var cylinder = Laya.PrimitiveMesh.createCylinder(0.25, 1, 20);
var cone = Laya.PrimitiveMesh.createCone(0.25, 0.75);
var index = 0;

//.............按钮点击事件 监听
changeMeshButton.on(Laya.Event.CLICK, this, function(){
    index++;
    if (index % 5 === 1 ){
        //切换mesh
        sphere.meshFilter.sharedMesh = box;
    }
    else if (index % 5 === 2){
        //切换mesh
        sphere.meshFilter.sharedMesh = capsule;
    }
    else if(index % 5 === 3){
        //切换mesh
        sphere.meshFilter.sharedMesh = cylinder;
    }
    else if(index % 5 === 3){
        //切换mesh
        sphere.meshFilter.sharedMesh = cone;
    }
    else{
        //切换mesh
        sphere.meshFilter.sharedMesh = sphereMesh;
    }
});
```


効果は図1の通りです

！[](img/1.gif)<br/>(図1)