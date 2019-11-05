# 资源加载

###### *version :2.0.1beta   Update:2019-3-19*

Après avoir passé en revue les différents types de ressources, nous allons les charger.Adresse de l 'exemple[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Resource&name=LoadResourceDemo));

###Chargement de ressources individuelles

####Chargement de scénarios

Le procédé scene3d.load est utilisé pour le chargement d 'une seule scène.


```typescript

//3d场景加载
Scene3D.load("res/TerrainScene/XunLongShi.ls",Handler.create(null,function(scene:Scene3D):void {
    //加载完成获取到了Scene3d
    Laya.stage.addChild(scene);
    //获取摄像机
    var camera:Camera = scene.getChildByName("Main Camera") as Camera;
    //清除摄像机的标记
	camera.clearFlag = BaseCamera.CLEARFLAG_SKY;
    
    //添加光照
    var directionLight:DirectionLight = scene.addChild(new DirectionLight()) as DirectionLight;
    directionLight.color = new Vector3(1, 1, 1);
    directionLight.transform.rotate(new Vector3( -3.14 / 3, 0, 0));
}));
```


Affiche les effets après chargement (Figure 1).

[] (IMG / 1.png) <br > (Photo 1)

####Chargement de matériaux

Nous utilisons la méthode basematerial.load pour le chargement d'un matériau unique.Dans cet exemple, nous avons chargé une boîte dans le ciel pour la caméra de l 'exemple ci - dessus.


```typescript

//材质加载		
BaseMaterial.load("res/threeDimen/skyBox/skyBox2/skyBox2.lmat", Handler.create(null, function(mat:BaseMaterial):void {
    //camera.skyboxMaterial = mat;
    //获取相机的天空渲染器
    var skyRenderer:SkyRenderer = camera.skyRenderer;
    //创建天空盒的mesh
    skyRenderer.mesh = SkyBox.instance;
    //设置天空盒材质
    skyRenderer.material = mat;
}));
```


Voir les effets (Fig. 2).

[] (IMG / 2.png) <br > (Figure 2)

####Chargement Texturé

Le procédé texture2d.load est utilisé pour charger une texture unique.Ici, nous avons créé un carré et défini la texture du chargement comme sa texture.Cette opération est pratiquement identique à celle de l 'exemple simple 3D.


```typescript

//加载纹理
Texture2D.load("res/threeDimen/texture/earth.png", Handler.create(null, function(tex:Texture2D):void {
    //使用纹理
    var earth1:MeshSprite3D = scene.addChild(new MeshSprite3D(PrimitiveMesh.createSphere(5, 32, 32))) as MeshSprite3D;
    earth1.transform.translate(new Vector3(10, 20, -8));

    var earthMat:BlinnPhongMaterial = new BlinnPhongMaterial();
    earthMat.albedoTexture = tex;
    earthMat.albedoIntensity = 1;
    earth1.meshRenderer.material = earthMat;
}));
```


Les résultats sont les suivants (Figure 3):

[] (IMG / 3.ping) <br > (Figure 3)

####Chargement de grilles

Le procédé mesh.load utilisé pour charger une seule grille.


```typescript

//加载Mesh
Mesh.load("res/threeDimen/skinModel/LayaMonkey/Assets/LayaMonkey/LayaMonkey-LayaMonkey.lm", Handler.create(null, function(mesh:Mesh):void {
    var layaMonkey:MeshSprite3D = sprite3D.addChild(new MeshSprite3D(mesh)) as MeshSprite3D;
    layaMonkey.transform.localScale = new Vector3(4, 4, 4);
    layaMonkey.transform.rotation = new Quaternion(0.7071068, 0, 0, -0.7071067);
    layaMonkey.transform.translate(new Vector3(0, 0, 7));
}));
```


Effets après chargement (Figure 4):

[] (IMG / 4.png) <br > (Figure 4)

####Chargement par anticipation

Nous utilisons le procédé sprite3d.load.


```typescript

//加载精灵
Sprite3D.load("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh", Handler.create(null, function(sp:Sprite3D):void {
    var layaMonkey2:Sprite3D = scene.addChild(sp) as Sprite3D;
    layaMonkey2.transform.localScale = new Vector3(4, 4, 4);
    layaMonkey2.transform.translate(new Vector3(-10, 13, 0));
}));
```


Effets après chargement (Figure 5):

[] (IMG / 5.png) <br > (Figure 5)

####Chargement d'animations

Un seul chargement d 'animation, le rôle utilisé dans cet exemple est exporté avec des informations d' animation.`.lh`Les informations relatives à l 'animation dans le fichier ne sont utilisées que pour la démonstration.Cette méthode peut être utilisée pour remplacer l 'animation osseuse lors d' une utilisation ultérieure.


```typescript

//加载胖子精灵
Sprite3D.load("res/threeDimen/skinModel/BoneLinkScene/PangZiNoAni.lh", Handler.create(null, function(sp:Sprite3D):void {
    pangzi = scene.addChild(sp) as Sprite3D;
    pangzi.transform.localScale = new Vector3(4, 4, 4);
    pangzi.transform.translate(new Vector3(-20, 13, 0));
    //获取动画组件
    pangziAnimator = pangzi.getChildAt(0).getComponent(Animator) as Animator;
    //AnimationClip的加载要放在Avatar加载完成之后
    AnimationClip.load("res/threeDimen/skinModel/BoneLinkScene/Assets/Model3D/PangZi-Take 001.lani", Handler.create(null, function(aniClip:AnimationClip):void {
        //创建动作状态
        var state1:AnimatorState = new AnimatorState();
        //动作名称
        state1.name = "hello";
        //动作播放起始时间
        state1.clipStart = 0 / 581;
        //动作播放结束时间
        state1.clipEnd = 581 / 581;
        //设置动作
        state1.clip = aniClip;
        //设置动作循环
        state1.clip.islooping = true;
        //为动画组件添加一个动作状态
        pangziAnimator.addState(state1);
        //播放动作
        pangziAnimator.play("hello");
    }));
}));
```


[] (IMG / 6.gif) <br > (Figure 6)

###Ressources de préchargement en vrac

Le procédé scene.load () ci - dessus consiste à charger de manière asynchrone des ressources, parfois avec des ressources plus importantes en 3D qui nécessitent un Préchargement pour améliorer l 'expérience de l' écran d 'en - tête.On peut le précharger avec un chargeur.

Ressources de jeu en 2D**Laya.loader.load ()**La méthode de préchargement et la ressource 3D doivent être précédées de la méthode laya.loader.create ().Une fois le chargement terminé, on peut l'utiliser directement.**Laya.loader.getres ()**Ce procédé permet d 'obtenir une ressource chargée.S' il vous plaît[API描述](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=Core&class=laya.net.LoaderManager)".


```typescript

......
//批量预加载方式
public function PreloadingRes() {
    //预加载所有资源
    var resource:Array = ["res/threeDimen/scene/TerrainScene/XunLongShi.ls",
                          "res/threeDimen/skyBox/skyBox2/skyBox2.lmat",
                          "res/threeDimen/texture/earth.png",                      "res/threeDimen/skinModel/LayaMonkey/Assets/LayaMonkey/LayaMonkey-LayaMonkey.lm",
                          "res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh", 
                          "res/threeDimen/skinModel/BoneLinkScene/PangZiNoAni.lh",
                          "res/threeDimen/skinModel/BoneLinkScene/Assets/Model3D/PangZi-Take 001.lani",];
    Laya.loader.create(resource, Handler.create(this, onPreLoadFinish));
}

public function onPreLoadFinish() {
    //初始化3D场景
    _scene = Laya.stage.addChild(Loader.getRes("res/threeDimen/scene/TerrainScene/XunLongShi.ls")) as Scene3D;

    //获取相机
    var camera:Camera = _scene.getChildByName("Main Camera") as Camera;
    //设置相机清楚标记，使用天空
    camera.clearFlag = BaseCamera.CLEARFLAG_SKY;
    //调整相机的位置
    camera.transform.translate(new Vector3(0, 45, -60));
    camera.transform.rotate(new Vector3(0, 180, 0), false, false);
    //相机视角控制组件(脚本)
    camera.addComponent(CameraMoveScript);

    //添加光照
    var directionLight:DirectionLight = _scene.addChild(new DirectionLight()) as DirectionLight;
    //光照颜色
    directionLight.color = new Vector3(1, 1, 1);
    directionLight.transform.rotate(new Vector3(-3.14 / 3, 0, 0));

    //使用材质
    var skyboxMaterial:BaseMaterial = Loader.getRes("res/threeDimen/skyBox/skyBox2/skyBox2.lmat") as BaseMaterial;
    var skyRenderer:SkyRenderer = camera.skyRenderer;
    skyRenderer.mesh = SkyBox.instance;
    skyRenderer.material = skyboxMaterial;

    //激活场景中的子节点
    (_scene.getChildByName('Scenes').getChildByName('HeightMap') as MeshSprite3D).active = false;
    (_scene.getChildByName('Scenes').getChildByName('Area') as MeshSprite3D).active = false;

    //使用纹理
    var earth1:MeshSprite3D = _scene.addChild(new MeshSprite3D(PrimitiveMesh.createSphere(5, 32, 32))) as MeshSprite3D;
    earth1.transform.translate(new Vector3(10, 20, -8));

    var earthMat:BlinnPhongMaterial = new BlinnPhongMaterial();
    earthMat.albedoTexture = Loader.getRes("res/threeDimen/texture/earth.png") as Texture2D;
    earthMat.albedoIntensity = 1;
    earth1.meshRenderer.material = earthMat;

    //获取Mesh资源
    var mesh:Mesh = Loader.getRes("res/threeDimen/skinModel/LayaMonkey/Assets/LayaMonkey/LayaMonkey-LayaMonkey.lm") as Mesh;
    //为精灵设置Mesh资源
    var layaMonkey:MeshSprite3D = _scene.addChild(new MeshSprite3D(mesh)) as MeshSprite3D;
    layaMonkey.transform.localScale = new Vector3(4, 4, 4);
    layaMonkey.transform.rotation = new Quaternion(0.7071068, 0, 0, -0.7071067);
    layaMonkey.transform.translate(new Vector3(0, 3, 7));

    //使用精灵
    var sp:Sprite3D = Loader.getRes("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh") as Sprite3D;
    var layaMonkey2:Sprite3D = _scene.addChild(sp) as Sprite3D;
    layaMonkey2.transform.localScale = new Vector3(4, 4, 4);
    layaMonkey2.transform.translate(new Vector3(-10, 13, 0));

    //使用精灵
    pangzi = Loader.getRes("res/threeDimen/skinModel/BoneLinkScene/PangZiNoAni.lh") as Sprite3D;
    pangzi = _scene.addChild(pangzi) as Sprite3D;
    pangzi.transform.localScale = new Vector3(4, 4, 4);
    pangzi.transform.translate(new Vector3(-20, 13, 0));
    //获取动画组件
    pangziAnimator = pangzi.getChildAt(0).getComponent(Animator) as Animator; 

    var pangAni:AnimationClip = Loader.getRes("res/threeDimen/skinModel/BoneLinkScene/Assets/Model3D/PangZi-Take 001.lani") as AnimationClip;
    //创建动作状态
    var state1:AnimatorState = new AnimatorState();
    //动作名称
    state1.name = "hello";
    //动作播放起始时间
    state1.clipStart = 0 / 581;
    //动作播放结束时间
    state1.clipEnd = 581 / 581;
    //设置动作
    state1.clip = pangAni;
    //设置动作循环
    state1.clip.islooping = true;
    //为动画组件添加一个动作状态
    pangziAnimator.addState(state1);
    //播放动作
    pangziAnimator.play("hello");
}
......
```


Résultats:

[] (IMG / 7.png) <br > (Figure 7)

**Tips:**Dans les projets, nous utiliserons généralement des moyens de chargement qui permettent une bonne gestion des ressources.