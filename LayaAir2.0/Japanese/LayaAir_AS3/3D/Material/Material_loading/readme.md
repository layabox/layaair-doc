#材質のロード

###### *version :2.1.0beta   Update:2019-5-14*

上記の例では標準的な材質を作成しましたが、実際のプロジェクトではコードを使ってモデルに材質を与えることが少ないです。直接に3 Dソフトで作ったり、ユニティで材質を作ったりして、ツールでLayaAir形式を導出してから使います。

「LayaAir 3 Dのリソースローディング」編では，モデルグリッドと材質の二つの部分を含み，ローディング.ls，lhデータの場合，モデルに対応する材質が自動的にローディングされます。

この場合は、エクスポート後に発生するlmatの材質ファイルを使用して、標準的な材質を作成し、モデルを付与することができます。モデルのロードと似ています。


```typescript

//材质加载
BaseMaterial.load("res/skyBox2/skyBox2.lmat",Handler.create(this,function(mat:BaseMaterial):void {
		var skyRenderer:SkyRenderer = camera.skyRenderer;
		//创建天空盒的mesh
		skyRenderer.mesh = SkyBox.instance;
		//设置天空盒材质
		skyRenderer.material = mat;	
}));
```


！[](img/1.png)<br/>(図1)