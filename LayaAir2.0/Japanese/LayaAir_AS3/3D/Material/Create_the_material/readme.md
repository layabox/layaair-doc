#材質を作成

###### *version :2.1.0beta   Update:2019-5-14*

コード内のモデルに素材がない場合、3 Dビューではモデルのテクスチャや質感などが表示されません。デフォルトは純白です。

「3 Dのクイックオープン」コースのコードには、標準的な素材を使って拡散反射スタンプにテクスチャー画像を追加し、モデルを付与しました。


```typescript

//添加自定义模型
var box:MeshSprite3D = scene.addChild(new MeshSprite3D(PrimitiveMesh.createBox(1, 1, 1))) as MeshSprite3D;
box.transform.rotate(new Vector3(0, 45, 0), false, false);

//创建材质
var material:BlinnPhongMaterial = new BlinnPhongMaterial();
Texture2D.load("res/layabox.png", Handler.create(this, function(tex:Texture2D):void {
  	//纹理加载完成后赋值
	material.albedoTexture = tex;
}));
//将材质赋值给自定义模型
box.meshRenderer.material = material;
```


！[](img/1.png)<br/>(図1)

もちろん、これは簡単な使い方です。一番重要な拡散反射板だけを使って、より良い美術効果を達成するために、開発者は材質の光と贴图の属性を理解しなければなりません。
