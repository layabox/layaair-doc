#ライトに影を付けるにはどうすればいいですか？

###### *version :2.0.1beta   Update:2019-3-30*

投影は照明モデルを照射する時に発生する瞬間的な影であり、照明角度、照明強度、モデル位置などによって変化することができる。投影は3 D世界の最も重要な要素の一つであり、より強い立体感を生み出すことができる。

リアルタイムシャドウは非常に損失性能があり、ゲームシーン、特にモデル量が大きいので、一般的にはリアルタイム投影を使わず、静的な光照射スタンプを使用しています。

シーンに投影を発生させるには、ライトの次の属性を知る必要があります。

**show:**投影を開始するかどうか、ブール値はtrueに設定してから有効になります。

**show Distance:**投影の範囲とは、カメラからモデルまでの距離のことで、単位はメートルです。この範囲より大きいモデルは投影と投影を受け入れられず、開発者はシーンの大きさに応じて設定することができる。

**shadowPCFType：**影は等級の0-3をぼかして、はっきりしない値はもっと大きくて、影は柔らかくて、効果はもっと良くて、しかし更に性能を消耗します。

**shadowPSSMCount：**シャドウスタンプの数が多くなればなるほど、シャドウがきめ細かくなり、性能損失が大きくなります。

**show Resolution：**投影の品質、投影範囲の影の大きさ。数値設定により品質が大きくなればなるほど、投影品質が高くなり、性能損失も高くなります。投影の品質値は2のN乗数単位で設定されています。デフォルトは512です。1024、2048…..。

もっと詳しいのは行ってもいいです。[查看API](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=3D&class=laya.d3.core.light.LightSprite)。

また、モデルに投影属性を設定する必要があります。

**receive Shadow:**投影を受け入れるかどうかは、モデルのこの属性がtrueである場合、計算された投影はこのモデルに表示されます。ゲームでは、シーンの地面と、シーンの中で動くことができるエリアのモデルキャスティングのプロパティをtrueに設定します。

**cast Shadow:**投影が生成されるかどうかは、モデルのこの属性がtrueである場合、ライトは、影を発生させるモデル位置、モデルグリッドの形状の大きさ、照明の角度などに基づいて投影計算を行い、その後、影を受けるモデルに投影を生じる。例えばシーンのキャラクターやNPCなどのアクティブなゲーム要素がこの属性をオンにします。

ここに効果のデモアドレスを表示します。

照明に関する設定：


```typescript

//灯光开启阴影
this.directionLight.shadow = true;
//可见阴影距离
this.directionLight.shadowDistance = 3;
//生成阴影贴图尺寸
this.directionLight.shadowResolution = 2048;
//生成阴影贴图数量
this.directionLight.shadowPSSMCount = 1;
//模糊等级,越大越高,更耗性能
this.directionLight.shadowPCFType = 3;
```


地面を開けて影と模型を受け取り、影を作ります。


```typescript

var grid = this.scene.addChild(Laya.Loader.getRes("res/threeDimen/staticModel/grid/plane.lh"));
//地面接收阴影
grid.getChildAt(0).meshRenderer.receiveShadow = true;
.......
//设置猴子能产生阴影
layaMonkey.getChildAt(0).getChildAt(0).skinnedMeshRenderer.castShadow = true;
```


そして効果を見にきます。

！[](img/1.png)<br/>(図1)

