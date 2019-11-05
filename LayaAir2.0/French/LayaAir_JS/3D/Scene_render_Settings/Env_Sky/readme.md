# 场景天空

###### *version :2.0.1beta   Update:2019-3-19*

La boîte à ciel est une technique visuelle qui permet à la scène d 'être plus vaste et d' envelopper la caméra à 360 degrés sans angle de mort avec une texture fermée sans soudure.Ici, on expose les boîtes du ciel qui seront utilisées.**Le ciel de layaair3d**Expliquer.

####Comment utiliser Unity pour installer le ciel ambiant

À Lighting.`Scene`Page d 'étiquette de scène`SkyBox Material`La boîte à ciel.

[] (IMG / 1.png) <br > (Figure 1)

**Attention!**• Le matériau utilisé doit être le Shader sous layaair3d - sky;

Il suffit de faire glisser le matériau de la boîte à ciel qu 'il a préparée à l' avance.(ou cliquez sur le bouton de réglage à droite pour choisir le matériau de la boîte à ciel qu 'ils ont préparé à l' avance.

[] (IMG / 2.gif) <br > (Figure 2)

Une fois installé, vous pourrez exporter la boîte à ciel.

####Utiliser le Code pour définir le ciel de scène


```typescript

var camera = scene.getChildByName("Main Camera");
//加入摄像机移动控制脚本
camera.addComponent(CameraMoveScript);

//加载相机天空盒材质
Laya.BaseMaterial.load("res/threeDimen/skyBox/skyBox1/SkyBox.lmat", Laya.Handler.create(null, function(mat) {
    var skyRenderer:SkyRenderer = camera.skyRenderer;
    skyRenderer.mesh = Laya.SkyBox.instance;
    skyRenderer.material = mat;
}));
```


Les résultats sont les suivants (Figure 3):

[] (IMG / 3.ping) <br > (Figure 3)

