#Scene ambient light

###### *version :2.0.1beta   Update:2019-3-19*

####Setting up ambient light using Unity export

In the Lighting panel set by Unity, select the Scene tab to find the`Environment`Medium`Environment Lighting`Item.

[] (img/1.png)<br> (Figure 1)

**Source**The light source options are currently available in Skybox and Color.

**Ambient Color**The color of ambient light. The ambient light color when set to Color.

**Ambient Mode**Environment mode, use only`Realtime `Real-time lighting.

After setting, adjust the color or

####Enabling code to set ambient light

Ambient color is a kind of color fusion dyeing of material, which makes the material tend to a certain color tone, at the same time, it can brighten the material and simulate the light-emitting effect of the light box. If sky box is set and not set`Scene3D`Scene`AmbientColor`Then LayaAir3D will default to the ambient light coming from the sky box.


```typescript

//设置场景环境光
scene.ambientColor = new Vector3(0.6, 0, 0);
```


The effect is as follows (Figure 2):

![] (img/2.png)<br> (Figure 2)

