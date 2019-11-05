#Scene atomization

###### *version :2.0.1beta   Update:2019-3-19*


雾化效果在项目中起着重要的作用，雾化效果就相当于开启大气的效果，看起来有种朦朦胧胧的感觉，让场景更真实。LayaAir 3D引擎可以设置场景的雾效可见距离（相当于浓度）及雾效的颜色。雾化使用的恰当不但可以提升游戏性能，还可以增加游戏的体验。

####Setting Scene Atomization Using Unity

Find it in Lighting Light Rendering Settings`Other Setting` 

[] (img/1.png)<br> (Figure 1)

First, check the atomization properties and adjust the atomization color.

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

