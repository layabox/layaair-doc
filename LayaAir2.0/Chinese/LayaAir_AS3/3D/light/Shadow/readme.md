# 如何为灯光添加阴影

###### *version :2.0.1beta   Update:2019-3-30*

投影是灯光照射模型时产生的即时阴影，可随着灯光角度、灯光强度、模型位置等变化而变化。投影是3D世界最重要的因素之一，能产生更加强烈的立体感。

即时阴影非常损耗性能，不能用得太多，特别是游戏场景，模型量较大，一般我们不使用即时投影，而使用静态的光照贴图。

要让场景中产生投影，我们需了解灯光的以下属性：

**shadow：**是否开启投影，布尔值，设置为true后生效。

**shadowDistance：**产生投影的范围，范围是指摄像机到模型的距离，单位为米。大于这个范围模型将不会接受投影与产生投影，开发者可以根据场景大小进行设置。

**shadowPCFType：**阴影模糊等级0-3，模糊值越大，阴影越柔和，效果越好，但更耗性能。

**shadowPSSMCount：**产生阴影贴图的数量，数量越高，阴影越细腻，性能损耗越大。

**shadowResolution：**投影的质量，投影范围中的阴影大小。通过数值设置质量，数值越大，投影质量越高，性能损耗也会随之加高。投影的质量值是以2的N次幂为单位设置，默认为512，可以设置成1024、2048…..等。

更详细使用的可以去 [查看API](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=3D&class=laya.d3.core.light.LightSprite)。

除此之外，还要需要在模型上设置投影属性。

**receiveShadow：**是否接受投影，当模型此属性为true时，计算出的投影会在此模型上显示出来。在游戏中，我们可以把场景的地面，及场景中可走动区域中的模型castShadow属性设置为true。

**castShadow：**是否产生投影，当模型此属性为true时，灯光根据产生阴影的模型位置、模型网格形状大小、与灯光的角度等进行投影计算，然后在接受阴影的模型上产生投影。比如场景中的角色、NPC等活动游戏元素可以开启此属性。

此处展示效果的demo地址：

灯光方面的设置:

```typescript
//灯光开启阴影
directionLight.shadow = true;
//可见阴影距离
directionLight.shadowDistance = 3;
//生成阴影贴图尺寸
directionLight.shadowResolution = 2048;
//生成阴影贴图数量
directionLight.shadowPSSMCount = 1;
//模糊等级,越大越高,更耗性能
directionLight.shadowPCFType = 3;
```

开启地面接收阴影和模型产生阴影：

```typescript
//地面加到场景上 并且获取地面
var grid:Sprite3D = scene.addChild(Loader.getRes("res/threeDimen/staticModel/grid/plane.lh")) as Sprite3D;
//地面接收阴影
(grid.getChildAt(0) as MeshSprite3D).meshRenderer.receiveShadow = true;
.......
//设置猴子能产生阴影
(layaMonkey.getChildAt(0).getChildAt(0) as SkinnedMeshSprite3D).skinnedMeshRenderer.castShadow = true;

```

然后来看下效果。

![](img/1.png)<br>(图1)

