# DirectionLight介绍

###### *version :2.0.1beta   Update:2019-3-30*

Directionlight (lumière parallèle) est très différent de la lumière ponctuelle, elle a une direction fixe qui peut être définie par une valeur d 'arc et qui n' a pas d 'atténuation ni de plage d' éclairage et éclaire tous les modèles de la scène.La lumière solaire est souvent utilisée dans le monde 3D pour simuler une direction fixe.


```typescript

//创建方向光
this.directionLight = this.scene.addChild(new Laya.DirectionLight());
//设置灯光颜色
this.directionLight.color = new Laya.Vector3(1, 1, 1);
//设置灯光方向
var mat = this.directionLight.transform.worldMatrix;
mat.setForward(new Laya.Vector3(-1.0, -1.0, -1.0));
this.directionLight.transform.worldMatrix = mat;
```


​**Setforward**La direction de la lumière parallèle représente, respectivement, la direction de l 'axe X, y et Z, le nombre négatif de l' axe, le nombre positif de l 'axe positif, la plage de valeurs comprise entre - 1 et 0 - 1 et, après avoir dépassé la plage, entre - 1 et - 1.

[] (IMG / 1.png) <br > (Figure 1)

