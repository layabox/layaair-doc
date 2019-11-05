# 场景天空

###### *version :2.0.1beta   Update:2019-3-19*


天空盒是一种让场景看上去更广阔无垠的一种视觉技术，用无缝对接的封闭纹理将摄像机的视口360度无死角的包裹起来。在这里我们简单的展示下天空盒使用，天空盒会在后续的 **Laya Air3D Sky**Explain the article.

####How to Use Unity to Set up Environment Sky

At Lighting`Scene`Scenario tab, find the environment`SkyBox Material`Sky box material.

[] (img/1.png)<br> (Figure 1)

**Be careful**The material used must be Shader under LayaAir3D-Sky.

Drag in the material of the sky box that you have prepared beforehand. (Or click the settings button on the right to select the material of the sky box you have prepared beforehand).

! [] (IMG / 2. GIF) < br > (Figure 2)

Once set up, you can export and use Skybox.

####Setting Scene Sky with Code


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


The effect is as follows (Figure 3):

![] (img/3.png) < br > (fig. 3)

