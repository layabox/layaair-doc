# 场景环境光

###### *version :2.0.1beta   Update:2019-3-19*

#### 使用Unity导出设置环境光

​	在Unity设置的Lighting面板，选择Scene标签页，找到其中的`Environment`中的`Environment Lighting`项。

​	![](img/1.png)<br>(图1)

**Source** 光源选项目前可以使用Skybox和Color两种。

**Ambient Color** 环境光的颜色。设置为Color时的环境光颜色。

**Ambient Mode** 环境模式，只能使用 `Realtime `实时光照。

设置之后调整颜色或者

#### 使代码设置环境光

​	环境光颜色(ambientColor)，是对材质进行颜色融合染色，使材质趋于某种颜色色调，同时还能对材质进行提亮，模拟灯箱发光效果。如果设置了天空盒且不设置`Scene3D`场景的`AmbientColor`，那么LayaAir3D会默认使环境光来源于天空盒。

```typescript
//设置场景环境光
scene.ambientColor = new Vector3(0.6, 0, 0);
```

效果如下（图2）：

![](img/2.png)<br>(图2)

