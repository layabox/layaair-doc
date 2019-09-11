# 如何使用3D场景、2D人物进行混合开发

###### *version :2.2.0bate4   Update:2019-9-11*

LayaAir3D中支持3D坐标转换为屏幕坐标。

在这里需要使用 **Camera** 中 **viewport** 视口的 `project` 变换一个三维向量接口。

![](img/1.png)<br>(图1)

> 变换位置与缩放

注意2D适配模式的影响。（[demo地址](https://layaair2.ldc2.layabox.com/demo2/?language=ch&category=3d&group=Advance&name=Secne3DPlayer2D)）

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

![](img/2.gif)<br>(图2)