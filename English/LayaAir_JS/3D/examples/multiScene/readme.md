## 3D multi-scene application example

### Multi-scene use

3D scene can not only mix and 2D, also can have more than one 3D scene on the stage, and can be embedded in 2D 3D scene, through the camera viewport in the scene to control the display size and location of the scene.

We often use it in games, such as the role of equipment attributes interface, the interface shows the role of 3D model and animation, equipment replacement equipment icon in the column, the role model can also be facelift changes.

In the next example, we have a simple simulation of the equipment property interface (Figure 1), the function is to double-click the screen to open the equipment interface, display the 3D role animation and equipment display, click and hold the interface title can drag the interface, the internal 3D scene, the role also follows the move.

![图片1](img/1.gif)<br> （Picture 1）



### Development ideas and code

1. The background is the 3D main scene, loading the game scene map

2. Create a simple Dialog type UI in IDE (Dialog can be set drag) and publish (Figure 2). The RolePropView class is inherited from UI and is set to singleton pattern (most UI are singleton). Create add another 3D scene for displaying a character in the interface, and set the camera viewport and the 2D interface are uniform in size or smaller.

![图片2](img/2.png)<br> （Picture 2）

3. After the interface is added, the camera script fails in the main scene when the mouse is pressed or moved on the interface, and the interface is removed or the mouse is not pressed on the interface. It can be set by the enable property of script component.

4. Add a drag event listener interface, drag interface, ViewPort interface moves follow the camera viewport scene (or 3D scene character in the first position).

The main class LayaAir3D_MultiScene reference code is as follows ：

```typescript
//初始化引擎
Laya3D.init(1280,720,true);
//适配模式
Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
//开启统计信息
Laya.Stat.show();
//加载3D资源
Laya.loader.create(["LayaScene_loveScene/loveScene.ls","LayaScene_girl/girl.lh"],Laya.Handler.create(this,on3DComplete));

function on3DComplete(){
    //创建场景
    var scene = Laya.Scene.load("LayaScene_loveScene/loveScene.ls");
    Laya.stage.addChild(scene);
    //创建摄像机添加到场景
    this.camera = new Laya.Camera();
    scene.addChild(this.camera);
    //修改摄像机位置与方向
    this.camera.transform.translate(new Laya.Vector3(0,2,8),true);
    this.camera.transform.rotate(new Laya.Vector3(-23,0,0),true,false);
    //添加摄像机脚本并获取
    this.cameraScript = this.camera.addComponent(CameraMoveScript);

    //加载2D界面资源
    Laya.loader.load("res/atlas/comp.atlas",Laya.Handler.create(this,on2DComplete));
}
function on2DComplete(){
    //双击舞台创建角色属性UI
    Laya.stage.on(Laya.Event.DOUBLE_CLICK,this,createRoleUI);
}
function createRoleUI(){
    //创建角色属性UI（单例模型，预防打开多个）
    this.roleProp = RolePropView.getInstance();
    Laya.stage.addChild(this.roleProp);
    //界面拖动事件监听
    this.roleProp.on(Laya.Event.DRAG_MOVE,this,onDragMove);
    //鼠标在界面上按下时摄像机控制脚本失效
    this.roleProp.on(Laya.Event.MOUSE_DOWN,this,onScriptFalse);
    //界面移除或鼠标抬起后摄像机脚本启用
    this.roleProp.on(Laya.Event.RECOVERED,this,onScriptTrue);
    Laya.stage.on(Laya.Event.MOUSE_UP,this,onScriptTrue);
}
/*界面拖动回调*/
function onDragMove(){
    //摄像机控制脚本失效
    this.onScriptFalse();
    //界面中摄像机视口跟随移动
    this.roleProp.camera.viewport = new Laya.Viewport(this.roleProp.x,this.roleProp.y,this.roleProp.width,roleProp.height);
}
/*摄像机控制脚本启用*/
function onScriptTrue(){
    //摄像机控制脚本启用
    this.cameraScript.enable = true;
}
/*摄像机控制脚本失效*/
function onScriptFalse(){
    //摄像机控制脚本失效
    this.cameraScript.enable = false;
}
```

Interface class RolePropView, create 3D scene, role, camera, reference code is as follows:

```typescript
var RolePropView = (function(_super){
    function RolePropView(){
        RolePropView.super(this);

        //设置UI位置为居中显示
        this.xx = (1280 - this.width)/2;
        this.yy = (720 - this.height)/2;

        //与UI搭配的3D场景
        this.UIScene = new Laya.Scene();
        this.addChild(this.UIScene);

        //在对话框中，鼠标可点击触发拖动的区域
        this.dragArea = "0,0,520,80";

        //创建角色
        this.role = Laya.loader.getRes("LayaScene_girl/girl.lh");
        this.UIScene.addChild(this.role);
        //修改角色位置（超出摄像机视口后将不会显示）
        this.role.transform.translate(new Laya.Vector3(0,0,0),false);

        //创建摄像机
        this.camera = new Laya.Camera();
        this.UIScene.addChild(this.camera);
        //设置摄像机视口大小与UI一致
        this.camera.viewport = new Laya.Viewport(this.xx,this.yy,this.width,this.height);
        //摄像机位置
        this.camera.transform.translate(new Laya.Vector3(0,1.2,3),false);
        //关闭按钮事件监听
        this.btn_close.on(Laya.Event.MOUSE_DOWN,this,onClose);
    }
    Laya.class(RolePropView,"RolePropView",_super);
     /*角色装备UI界面单例方法*/
    RolePropView.getInstance = function () {
        if (this.instance == null) {
            this.instance = new RolePropView();
        }
        return this.instance;
    };
    /*关闭按钮事件回调*/
    function onClose(){
        //移除UI界面
        Laya.stage.removeChild(this);
        //恢复UI位置为居中显示
        this.pos(this.xx,this.yy);
        //恢复摄像机视口大小与位置
        this.camera.viewport = new Laya.Viewport(this.xx,this.yy,this.width,this.height);
    }
    return RolePropView;
})(ui.RolePropUI);
```

Compile and run the above code, the effect is shown in figure 1.