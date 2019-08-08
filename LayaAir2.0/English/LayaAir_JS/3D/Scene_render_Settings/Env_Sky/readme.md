# 场景天空

###### *version :2.0.1beta   Update:2019-3-19*

天空盒是一种让场景看上去更广阔无垠的一种视觉技术，用无缝对接的封闭纹理将摄像机的视口360度无死角的包裹起来。在这里我们简单的展示下天空盒使用，天空盒会在后续的 **LayaAir3D之天空** 篇讲解。

#### 如何使用Unity设置环境天空

​	在Lighting的 `Scene` 场景标签页，找到Environment环境中的`SkyBox Material`天空盒材质这一项。

​	![](img/1.png)<br>(图1)

**注意** :使用的材质必须是LayaAir3D--Sky下的Shader；

将自己预先准备好的天空盒材质拖入到其中就可以了。（或者点下右边的设置按钮，选择自己预先准备好的天空盒材质）。

![](img/2.gif)<br>(图2)

设置好后就可以导出使用天空盒了。

#### 使用代码设置场景天空

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

效果如下（图3）：

![](img/3.png)<br>（图3）

