#Comment utiliser des scènes 3D et des personnages 2D pour le développement hybride

###### *version :2.2.0bate4   Update:2019-9-11*

La conversion des coordonnées 3D en coordonnées d 'écran est supportée dans layaair3d.

Il faut l'utiliser ici.**Camera.**B**Viewport**Visuel`project`Transforme une interface vectorielle 3D.

[] (IMG / 1.png) <br > (Figure 1)

Table des matières

Attention à l'impact du modèle d'adaptation 2D.([demo地址](https://layaair2.ldc2.layabox.com/demo2/?language=ch&category=3d&group=Advance&name=Secne3DPlayer2D)- Oui.


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


[] (IMG / 2.gif) <br > (Figure 2)