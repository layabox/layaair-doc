#How to add shadows to lights

###### *version :2.0.1beta   Update:2019-3-30*

Projection is the instant shadows produced when the model is illuminated by light, which can change with the change of light angle, light intensity and model position. Projection is one of the most important factors in the 3D world, which can produce a stronger stereo sense.

Immediate shadows are very performance-degrading and can not be used too much, especially in game scenes. There are a large number of models. Generally, we do not use instant projection, but use static light mapping.

To generate projection in a scene, we need to understand the following attributes of light:

**Shadow:**Whether to turn on the projection, Boolean value, set to true, will take effect.

**Shadow Distance:**The range of projection is the distance from the camera to the model in meters. Models larger than this range will not accept projections and generate projections, and developers can set them according to the size of the scene.

**Shadow PCFType:**Shadow blur level 0-3, the greater the blur value, the softer the shadow, the better the effect, but the more performance consumption.

**ShadowPSSMCount:**The higher the number of shadow maps produced, the finer the shadows and the greater the performance loss.

**Shadow Resolution:**The quality of projection, the shadow size in the projection range. By setting the quality of the numerical value, the larger the numerical value, the higher the projection quality and the higher the performance loss. The projection quality value is set in units of N power of 2. By default, it is 512. It can be set to 1024, 2048. And so on.

More detailed usage is available[查看API](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=3D&class=laya.d3.core.light.LightSprite)。

In addition, projection properties need to be set on the model.

**Recive Shadow:**Whether to accept projection? When the attribute of the model is true, the calculated projection will be displayed on the model. In the game, we can set the ground of the scene and the castShadow attribute of the model in the movable area of the scene to true.

**CastShadow:**Whether projection occurs or not, when the model attribute is true, the light projection is calculated according to the position of the model, the shape and size of the model mesh, and the angle of the light, and then the projection is generated on the model receiving the shadow. Active game elements such as characters in the scene, NPC, etc. can open this property.

The demo address for the effect shown here:

Lighting settings:


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


Turn on the ground to receive shadows and model to generate shadows:


```typescript

//地面加到场景上 并且获取地面
var grid:Sprite3D = scene.addChild(Loader.getRes("res/threeDimen/staticModel/grid/plane.lh")) as Sprite3D;
//地面接收阴影
(grid.getChildAt(0) as MeshSprite3D).meshRenderer.receiveShadow = true;
.......
//设置猴子能产生阴影
(layaMonkey.getChildAt(0).getChildAt(0) as SkinnedMeshSprite3D).skinnedMeshRenderer.castShadow = true;

```


Then look at the effect.

![] (img/1.png)<br> (Figure 1)

