#Scene sky

###### *version :2.0.1beta   Update:2019-3-19*

Skybox is a visual technology that makes the scene look broader and infinite. It uses seamless docking of closed texture to wrap up the camera's 360-degree view without dead angle. Here we simply show the use of Skybox, Skybox will be in the follow-up.**Laya Air3D Sky**Explain the article.

####How to Use Unity to Set up Environment Sky

At Lighting`Scene`Scenario tab, find the environment`SkyBox Material`Sky box material.

[] (img/1.png)<br> (Figure 1)

**Be careful**The material used must be Shader under LayaAir3D-Sky.

Drag in the material of the sky box that you have prepared beforehand. (Or click the settings button on the right to select the material of the sky box you have prepared beforehand).

![] (img/2.gif) <br> (Figure 2)

Once set up, you can export and use Skybox.

####Setting Scene Sky with Code


```typescript

var camera = scene.getChildByName("Main Camera");
//加入摄像机移动控制脚本
camera.addComponent(CameraMoveScript);

//加载相机天空盒材质
Laya.BaseMaterial.load("res/threeDimen/skyBox/skyBox1/SkyBox.lmat", Laya.Handler.create(null, function(mat) {
    var skyRenderer = camera.skyRenderer;
    skyRenderer.mesh = Laya.SkyBox.instance;
    skyRenderer.material = mat;
}));
```


The effect is as follows (Figure 3):

![] (img/3.png) < br > (fig. 3)

