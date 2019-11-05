#Edit and export camera from Unity

###### *version :2.0.1beta   Update:2019-3-19*

After the release of engine version 1.7.10 and unit export plug-in version 1.5.0, the camera created in unit can be exported! And the export file retains the position, perspective, background color, clipping, visual field and other parameters of the camera in the 3D space. When loading the exported scene, the display effect is exactly the same as that in Unity, which facilitates the developer's control of the camera's visual angle.

At the same time, because the LayaAir 3D engine supports multiple cameras, you can also set up multiple cameras in Unity and export them. For multi-camera view settings, please see the last part of this lesson.**"Use of Multi-camera Window Machine"**Section.

###Edit camera in unity

Create a Camera camera in Unity. View the camera panel:

![] (img/1.png)<br> (Figure 1)

**Support Exported Camera Settings**:

Transform selects components. Adjustable camera**Position**Location,**Rotation**Selection and**Scale**Zoom.

Background background, in the absence of sky boxes, applies the selected color to the remaining screen.

Culling Mask removes masks and contains or ignores Layers of objects.

Project projection. Perspective perspective projection and Orthographic orthogonal projection.

Size size. The viewport size when the orthogonal camera is set.

Field of View field of view. The width of the camera's angle of view, as well as the vertical angle size.

Clipping Planes trim the plane. The distance from the camera to start and stop rendering.

Near near the cutting surface.

Far far cut surface.

Viewport Rect viewport rectangle.

X: The starting point of the horizontal position where the camera view will be drawn.

Y: The starting point of the vertical position where the camera view will be drawn.

W: The width of the camera output to the screen.

H: The height of the camera output to the screen.

Depth. Drawing sequence.

Target Texture Target Texture Target Texture Target Texture Target Texture Target Texture Target Texture Target Texture Target Texture Target Texture Target Texture Target.

###Use code to get the exported camera

So, if a camera is created in Unity and exported, how do we get the camera after loading the exported file in the code? This can be obtained by the index or name of the sub-node of the scene. After acquisition, we can also move and rotate it, set the skybox, add scripts and other operations.

The code is as follows:


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


In Untiy, the camera defaults to "Main Camera", so in the above code, the camera is obtained through scene's getChildByName ("Main Camera") method for subsequent logical operation. Developers can also customize the name of the camera in Unity.

