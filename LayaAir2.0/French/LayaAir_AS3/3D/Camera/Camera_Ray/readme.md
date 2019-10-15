#Comment créer un rayon à partir d 'une caméra

###### *version :2.0.1beta   Update:2019-3-19*

Devant**Système graphique**Il y a un outil de base qui explique les rayons.On a créé un rayon de la caméra avec camera.**Viewport point Toray**MéthodeCe rayon est généré à partir d 'un point de la surface de coupe proche de la caméra, vers un point de la surface de coupe éloignée.Ce rayon de prolongation inverse traverse le point d 'origine de la machine à rayons.

[] (IMG / 1.png) <br > (Figure 1)


```typescript

//创建一个点
var point:Vector2 = new Vector2();
//创建一个射线
var ray: Ray= new Ray(new Vector3(0, 0, 0), new Vector3(0, 0, 0));
//以鼠标点击的点作为原点
point.x = Laya.stage.mouseX;
point.y = Laya.stage.mouseY;
//计算一个从屏幕空间生成的射线
camera.viewportPointToRay(point, ray);
```


Dans l 'exemple[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Camera&name=CameraRay)Dans l 'invention, un carré est créé au niveau du sol et du point de collision avec les rayons par le rayonnement créé à partir de la caméra.

