#Background color and sky Box for Camera

###### *version :2.0.1beta   Update:2019-3-19*

####Couleur de fond

Dans une scène 3D, la couleur d 'arrière - plan est contrôlée par une caméra qui modifie la couleur d' arrière - plan de l 'espace 3D en définissant les attributs Clear de la caméra, les couleurs sont ajustées en fonction de la valeur du vecteur 3D vector Vector vector Vector vector Vector 3 (rouge, vert, Bleu), le moteur étant par défaut noir pur.


```typescript

//相机设置清楚标记,使用固定颜色
camera.clearFlag = BaseCamera.CLEARFLAG_SOLIDCOLOR;	
//设置背景颜色
camera.clearColor = new Vector4(0.5,0.5,0.6,1);
```


####Sky box

Dans la plupart des cas, il est nécessaire d 'exprimer des visions du ciel, telles que nuages bleus, crépuscules, étoiles, etc., dans le moteur layaair 3D, par l' ajout d 'une boîte à ciel (skybox) aux propriétés de la caméra.

Cependant, si la caméra utilise la projection orthogonale, la boîte ne pourra pas atteindre l 'effet souhaité et les développeurs pourront essayer.

La cartouche du ciel est constituée d 'un modèle cubique et de six maquettes de matériaux qui peuvent être jointes sans soudure, un peu semblables à la carte panoramique 360.


```typescript

//天空盒代码
BaseMaterial.load("res/threeDimen/skyBox/skyBox1/skyBox.lmat", Handler.create(this, function(mat:BaseMaterial):void {
    //设置相机的清除标识为天空盒
    camera.clearFlag = BaseCamera.CLEARFLAG_SKY;
    //获取相机的天空渲染器
    var skyRenderer:SkyRenderer = camera.skyRenderer;
    //创建天空盒的mesh
    skyRenderer.mesh = SkyBox.instance;
    //设置天空盒材质
    skyRenderer.material = mat;
}));
```


"[] (IMG / 1.ping) < br > (Figure 1) skybox

]**Attention:**Lors de l'utilisation des couleurs d'arrière - plan et des boîtes dans le ciel, assurez - vous que Camera (caméra)`clearFlag`Effacer les propriétés des marques, en fonction de leurs propres besoins.