# 场景雾化

###### *version :2.0.1beta   Update:2019-3-19*

The atomization effect plays an important role in the project. The atomization effect is equivalent to the effect of opening the atmosphere. It looks hazy and makes the scene more real. LayaAir 3D engine can set Fog Visibility Distance (equivalent to concentration) and fog color of the scene. Proper use of atomization can not only improve the performance of the game, but also increase the experience of the game.

####Setting up scene fog with unity

Find it in Lighting Light Rendering Settings`Other Setting` 

[] (img/1.png)<br> (Figure 1)

First check the atomization properties, and then adjust the color of the atomization.

![] (img/2.gif) <br> (Figure 2)

After setting it up, you can pull the camera closer or farther to see the effect. As shown in Figure 3 of the effect:

![] (img/3.gif) < br > (fig. 3)

####Setting up environment atomization with code


```typescript

//雾化代码
scene.enableFog = true;
//设置雾化的颜色
scene.fogColor = new Laya.Vector3(0,0,0.6);
//设置雾化的起始位置，相对于相机的距离
scene.fogStart = 10;
//设置雾化最浓处的距离。
scene.fogRange = 40;
```


Effect display (Figure 4):

![] (img/4.png)<br> (Figure 4)

