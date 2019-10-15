# SpotLight介绍

###### *version :2.0.1beta   Update:2019-3-30*

La lumière concentrée est la lumière émise à partir d 'une source de lumière spécifique, telle que lampe de poche, lampe de scène, etc.La zone d 'éclairage s' agrandit progressivement en fonction de la distance, tandis que le bord de la zone d' éclairage diminue.


```typescript

//聚光灯
var spotLight = scene.addChild(new Laya.SpotLight()) as Laya.SpotLight;
//设置聚光灯颜色
spotLight.color = new Laya.Vector3(1, 1, 0);
//设置聚光灯位置
spotLight.transform.position = new Laya.Vector3(0.0, 1.2, 0.0);
//设置聚光灯方向
var mat = spotLight.transform.worldMatrix;
mat.setForward(new Laya.Vector3(0.15, -1.0, 0.0));
spotLight.transform.worldMatrix = mat;
//设置聚光灯范围
spotLight.range = 6.0;
//设置聚光灯锥形角度
spotLight.spotAngle = 32;
```


**Range**Pour la plage d 'exposition de la lumière concentrée, la différence est similaire à celle de la lumière ponctuelle, la lumière concentrée étant orientée et la lumière ponctuelle non directionnelle.

**Spotangle**Pour l 'angle conique de la lampe de concentration, plus la valeur est petite, plus la bobine de concentration est petite, plus la bobine de la lumière est grande.

[] (IMG / 1.png) <br > (Figure 1)

