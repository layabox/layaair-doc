# 从Unity中编辑并导出摄像机

###### **version :2.7.0beta   Update:2020-6-11**

​	引擎1.7.10版与unity导出插件1.5.0版发布后，在unity中所创建的摄像机可以被导出了！并且导出文件保留了摄像机在3D空间中的位置、视角、背景颜色、载剪、视野等参数，当加载了导出后的场景，显示的画面效果与unity中完全一致，方便了开发者们对摄像机视角的控制。

​	同时，因为LayaAir 3D引擎支持多摄像机，因此也可以在unity中设置多个摄像机并导出，关于多摄像机的视口设置请查看本课最后的**“多摄像窗口机使用”**小节。

### 在Unity中编辑摄像机

在Unity中创建一个Camera摄像机。查看摄像机面板:

![](img/1.png)<br>(图1)

**支持导出的摄像机设置**：

#### 通用的属性

Transform选择组件。可以调整摄像机的**Position**位置，**Rotation**选择和**Scale**缩放。

#### 摄像机属性

##### Clear Flags 清除标志

支持项包括Skybox天空盒、Solid Color纯色、Depth only仅深度、Don’t Clear不清除

##### Background背景，

在没有天空盒的情况下，将选中的颜色应用到剩余屏幕。

##### Projection 投射方式

支持项包括Perspective 透视投影，Orthography正交投影，选择正交投影还包括Size，是指正交摄影机的视口大小。

##### Field of View 视野范围

相机的视角宽度，以及纵向的角度尺寸。

##### Clipping Planes 裁剪平面

从摄影机到开始渲染和停止渲染的距离。支持项包括Near 近裁剪面与Far 远裁剪面。

##### Viewport Rect 视口矩形

支持项包括X、Y、W、H。分别是指：

​	x：相机视图将进行绘制的水平位置的起点。

​	y：相机视图将进行绘制的垂直位置的起点。

​	w：相机输出到屏幕的宽度。

​	h：相机输出到屏幕的高度。

### 使用代码获取导出的摄像机

​	那么，如果在unity中创建了摄像机并导出，在代码中加载导出文件后，我们怎么去获取摄像机呢？这可以通过场景的子节点索引或名称来获取，获取后我们还可以对它进行移动旋转、设置天空盒、添加脚本等操作。

​	代码如下：

```typescript
class LayaAir3D
{
    constructor() 
    {
        //初始化引擎
        Laya3D.init(1000, 500,true);            
        //适配模式
        Laya.stage.scaleMode = Stage.SCALE_FULL;
        Laya.stage.screenMode = Stage.SCREEN_NONE;
        //开启统计信息
        Laya.Stat.show();            
        //预加载角色动画资源
        Laya.loader.create("monkey/monkey.ls",Laya.Handler.create(this,this.onSceneOK));
    }        
    onSceneOK()
    {
        //添加3D场景
        var scene = Laya.loader.getRes("monkey/monkey.ls");
        Laya.stage.addChild(scene);  
        //从场景中获取摄像机
        var camera = scene.getChildByName("Main Camera");
        //后续对摄像机的逻辑操作.......
    }
}
```

​	在Untiy中，摄像机默认名为“Main Camera”，因此在上述代码中，通过scene的getChildByName(“Main Camera”)方法得到了摄像机，以供后续逻辑操作。开发者们也可以在unity中自定义摄像机的名字。

