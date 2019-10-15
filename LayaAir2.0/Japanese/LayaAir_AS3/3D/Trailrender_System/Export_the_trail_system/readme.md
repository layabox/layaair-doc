#Unityでは、トレーラーシステムをエクスポートします。

###### *version :2.1.1beta   Update:2019-8-2*

LayaAir 3 Dプラグインはサポートされています。**Trail Renderer**コンポーネントをエクスポートします。

まずユニティ3 Dにスフィアを追加します。`Trail Renderer`そして、簡単にドラッグ効果を作りました。効果は図1に示します。

！[](img/1.png)<br/>(図1)

編集が終わったら、私たちはエクスポートのプリセットを選択します。

**Tip**：モップの材質は`LayaAir3D/Trail Shader`他のShaderを使用すると、エクスポート時に自動的にTrail Shaderに変換されます。自動変換は実際の効果と設計時の効果に大きなばらつきがあるので、設計時はこの点に注意しなければなりません。

！[](img/2 png)<br/>(図2)

**注意:**トレーラー付きのオブジェクトをエクスポートすると、トレーラーの精霊になります。モデルは持ち込みません。ここでエクスポートするとスフィアがありません。エクスポート後はオブジェクトに追加する必要があります。

ここではIDEの3 Dサンプルアイテムを使用して、簡単にGameUI類コードを修正します。


```typescript

//....上面为原本示例代码,去掉了示例代码的旋转摄像机
//加载拖尾
Sprite3D.load('LayaScene_tst/Conventional/Sphere.lh',Handler.create(this,function(sp:Sprite3D):void{
    //将加载的拖尾添加给示例盒子
    box.addChild(sp);
    //为了体现效果，我们移动盒子和摄影机观察效果
    Laya.timer.frameLoop(1,this,function():void{
        //使用差速来体现移动
        box.transform.translate(new Vector3(0,0.05,0),false);
        camera.transform.translate(new Vector3(0,04,0),false);
    });
}));
```


！[](img/3 gif)<br/>(図3)

