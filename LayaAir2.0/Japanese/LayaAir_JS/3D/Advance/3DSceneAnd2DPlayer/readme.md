#どのように3 Dシーン、2 Dキャラクターを使ってハイブリッド開発を行いますか？

###### *version :2.2.0bate4   Update:2019-9-11*

LayaAir 3 Dでは、3 D座標の画面座標への変換をサポートします。

ここで使うべきです。**Camera**にある**viewport**視口の`project`三次元ベクトルインターフェースを変換します。

！[](img/1.png)<br/>(図1)

>位置とズームの変換

2 D適応モードの影響に注意する。([demo地址](https://layaair2.ldc2.layabox.com/demo2/?language=ch&category=3d&group=Advance&name=Secne3DPlayer2D))


```typescript

//变换位置
this._position.x = Math.sin(this.scaleDelta += 0.01)  * 2;
this._position.z = Math.cos(this.scaleDelta += 0.01) * 2;
//修改球的位置
this.sphere.transform.position = this._position;
//计算位置
this._camera.viewport.project(this._position, this._camera.projectionViewMatrix, this._outPos);
this._layaMonkey2D.pos(this._outPos.x / Laya.stage.clientScaleX, this._outPos.y / Laya.stage.clientScaleY);

this._layaMonkey2D.scaleX = this._layaMonkey2D.scaleY =  0.125 * this._position.z + 0.75;

```


！[](img/2 gif)<br/>(図2)