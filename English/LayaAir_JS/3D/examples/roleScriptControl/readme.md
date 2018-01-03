## 3D character  script control and collision detection



### requirement analysis

This course focuses on beginners' comprehensive application of 3D engine, including 3D scene processing and loading, character collision detection and animation control switching, etc., to show developers a basic development example similar to RPG game level .

basic needs are:

1、The joystick controls the character to move back and forth in the scene. After the rocker controller is released, the character stops moving and standby.
2、The attack button switch to attack animation character, always press the button can not stop the attack, the click of a button to play at least one complete attack animation, animation playback before the end of the attack button, such as priority greater than rocker, rocker still pressed, attack stop after playing mobile animation and displacement.
3、There are barriers in the scene, some places can't walk, and when the characters walk to stop, they stop moving.
4、The same character is cloned, and two characters are controlled simultaneously, such as one of them will not be affected until the barrier stops.

The reference effect is shown in Figure 1

![图1](img/1.gif)<br>（Picture 1）



### Analysis of engine technical scheme needed

1. Joystick: 2D engine, mouse monitor, 2D engine mouse event support multi touch, to adapt to the complex operation of mobile phones multi-point.

2. role control: LayaAir3D engine supports component development model, so role control, we use script component mode, effectively control and display separately.

3. when the document is written, the advanced type of the 3D engine is being perfected, so the blocking in the scene is temporarily judged by the walking zone Collider and the ray detection mode.

​      Art can be a character model making 3D scene in the walking area, as shown in Figure 2, are in use, not for rendering, but the code needed to add it to the mesh Collider, the position has a ray and a collision for collision detection by the character before, if the information is not without collision, character walk, collision with the character of information can walk. And, of course, you can also create a model in the non walkable region.

​     When the advanced land type function is perfect, the technical document will be introduced in detail, and recommend developers to use advanced ground type, better performance.

![图2](img/2.png)<br>（Picture 2）



### Joystick controller and attack button

The interface between the loading progress page and the "technical document 3D character switch and animation" is basically the same as the code, which is not explained here.

Joystick controller and attack button interface is commonly used in 2D, 3D game, developers can refer to use. Create two interfaces in LayaAir IDE, named Rocker.ui, Attack.ui, Rocker.ui is composed of touch point pictures and background maps, Attack.ui is composed of an attack button, it can also add other skills button to expand. The interface is shown in Figure 3 and figure 4.

![图3](img/3.png)<br>（Picture 3）

![图4](img/4.png)<br>（Picture 4）



After IDE releases the export resource, the RockerUI.as and AttackUI.as classes are generated in the project UI folder. We build the view folder and create the RockerView, AttackView class to inherit it, and write the joystick control and attack logic code in it. The example is as follows:

```typescript
var RockerView = (function(_super){
    function RockerView(){
        RockerView.super(this);
         /***当前多点触摸id****/
        this.curTouchId = 0;
        /***手指（鼠标）是否按下****/
        this.isDown = false;
        /***摇杆的角度****/
        this.angle = -1;        
        /***摇杆的弧度****/
        this.radians = -1;
        /***是否左手遥控****/
        this.isleftControl = true;   
        //鼠标按下事件监听
        Laya.stage.on(Laya.Event.MOUSE_DOWN,this,onMouseDown);
        //鼠标抬起事件监听
        Laya.stage.on(Laya.Event.MOUSE_UP,this,onMouseUp);
        //鼠标是否移除屏幕事件监听
        // this.touchRect.on(Laya.Event.MOUSE_OUT,this,onBlur);
        //控制器中心点位置初始化
        this.originPiont = new Laya.Point(this.width/2,this.height/2);
        //默认为控制器不显示
        this.visible = false;
    }
    Laya.class(RockerView,"RockerView",_super);

    /*鼠标按下事件回调*/
    function onMouseDown(e){
        console.log('mouse donw');
        //左右手遥控
        if(this.isleftControl){
            //如果按下时是右边屏幕位置或已经按下鼠标，则返回
            if(e.stageX > Laya.stage.width/2 || this.isDown)return;
        }
        else{
            //如果按下时是左边屏幕位置或已经按下鼠标，则返回
            if(e.stageX < Laya.stage.width/2 || this.isDown)return;
        }
        //记录当前按下id
         this.curTouchId = e.touchId;
         //已按下
         this.isDown = true;
         //更新摇杆到屏幕按下位置
         this.pos(Laya.stage.mouseX - (this.width / 2),Laya.stage.mouseY - (this.height / 2));
         //初始化摇杆控制点位置
         this.knob.pos(this.width / 2, this.height / 2);
         //按下后显示摇杆
         this.visible = true;
         //摇杆移动控制事件监听
         Laya.stage.on(Laya.Event.MOUSE_MOVE,this,onMove);
    }
    /*鼠标抬起事件回调*/
    function onMouseUp(e){
        console.log('mouse up');
        //如果不是上次的点击id，返回（避免多点抬起，以第一次按下id为准）
        if(e.touchId != this.curTouchId)return;
        this.isDown = false;
        this.visible = false;
        //移除摇杆移动事件监听
        Laya.stage.off(Laya.Event.MOUSE_MOVE,this,onMove);
        //修改摇杆角度与弧度为-1（代表无角度）
        this.radians = this.angle = -1;
    }
    /*鼠标移动事件回调*/
    function onMove(e){
        console.log('mouse move');
        //如果不是上次的点击id，返回（避免多点抬起，以第一次按下id为准）
        if(e.touchId != this.curTouchId)return;
        //将移动时的鼠标屏幕坐标转化为摇杆局部坐标
        var locationPos = this.globalToLocal(new Laya.Point(Laya.stage.mouseX,Laya.stage.mouseY),false);
        //更新摇杆控制点位置
        this.knob.pos(locationPos.x,locationPos.y);
        //更新控制点与摇杆中心点位置距离
        this.deltaX = locationPos.x - this.originPiont.x;
        this.deltaY = locationPos.y - this.originPiont.y;
        //计算控制点在摇杆中的角度
        var dx = this.deltaX * this.deltaX;
        var dy = this.deltaY * this.deltaY;
        this.angle = Math.atan2(this.deltaX,this.deltaY) * 180 / Math.PI; 
        if(this.angle < 0) this.angle += 360;
        //对角度取整
        this.angle = Math.round(this.angle);
        //计算控制点在摇杆中的弧度
        this.radians = Math.PI / 180 * this.angle;
        //强制控制点与中心距离不超过80像素
        if(dx+dy >= 80*80){
            //控制点在半径为80像素的位置（根据弧度变化）
            var x = Math.floor(Math.sin(this.radians) * 80 +this.originPiont.x);
            var y = Math.floor(Math.cos(this.radians) * 80 + this.originPiont.y);
            this.knob.pos(x,y);
        }
        else{
            //不超过80像素取原坐标
            this.knob.pos(locationPos.x,locationPos.y);
        }
    }
    return RockerView;
})(ui.RockerUI);
```

```javascript
var attackView = (function(_super){
    function attackView(){
        attackView.super(this);
        /*是否按下攻击按钮*/
        attackView.isAttack = false;

        //按钮按下与抬起事件监听
        this.btn_attack.on(Laya.Event.MOUSE_DOWN,this,onAttack);
        this.stage.on(Laya.Event.MOUSE_UP,this,onUp);
    }
    Laya.class(attackView,"attackView",_super);

    /*抬起攻击按钮事件回调*/
    function onUp(e){
        //如果抬起时的ID与按下时的相同 则为不攻击
        if(e.touchId == this.touchId) this.isAttack = false;
    }
    /*按下攻击按钮事件回调*/
    function onAttack(e){
        //获取按下时的id
        this.touchId = e.touchId;
        //获取事件传参值
        this.isAttack = true;
    }
    return attackView;
})(ui.attackUI);
```

### Example main class

There is almost no control logic in the example primary class, creating scenes, cameras, characters, too. Instead of using lights and lighting maps, developers are advised to have no dynamic light in the scene, without adding lights, and will be much higher in performance. Character shadows can use transparent texture models.

In the scene, we need to get the walking area model moveArea from the scene model, which can be set as no render, and the code is not `moveArea.meshRender.enable=false`, And add it to the grid Collider MeshCollider. The mesh collider is more accurate and consistent with the model itself, and the hollowed out region will not be detected. Of course, the cost of performance will be larger.

The joystick, attack button and camera movement are set as static to facilitate the use and control of the character control script.

The main class code is as follows:


```typescript
var Example_roleControl = (function(){
    function Example_roleControl(){
        //初始化引擎
        Laya3D.init(1334,750,true);
        //画布垂直居中对齐
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        //画布水平居中对齐
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        //等比缩放
        Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_AUTO;
        //自动横屏，游戏的水平方向始终与浏览器屏幕较短边保持垂直
        Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;

        this.cameraTranslate = new Laya.Vector3;
        //预加载2D资源
        Laya.loader.load("res/atlas/myAssets.atlas",Laya.Handler.create(this,this.on2DComplete));
    }
    /*加载2D资源完成回调*/
    Example_roleControl.prototype.on2DComplete = function(){
        //实例化摇杆控制器
        Example_roleControl.rocker = new RockerView();
        Laya.stage.addChild(Example_roleControl.rocker);
        //实例化攻击按钮
        Example_roleControl.attack = new attackView();
        Laya.stage.addChild(Example_roleControl.attack);
        //实例化加载进度页面
        var progress = new ProgressView();
        Laya.stage.addChild(progress);
        //加载3D资源
        Laya.loader.create(["LayaScene_scene03/scene03.ls","LayaScene_girl/girl.lh"],Laya.Handler.create(this,this.on3DComplete));
    }
    /*加载3D资源完成回调*/
    Example_roleControl.prototype.on3DComplete = function(){
        //创建3D场景
        this.createScene();
        //创建3D摄像机
        this.createCamera();
        //创建3D角色
        this.createRole();
        //游戏帧循环
        Laya.timer.frameLoop(1,this,this.onFrameLoop);
        
    }
    /*创建3D场景*/
    Example_roleControl.prototype.createScene = function(){
        //实例化场景
        this.scene = Laya.loader.getRes("LayaScene_scene03/scene03.ls");
        Laya.stage.addChild(this.scene);
        //将场景层级调至最低（UI界面后面）
        Laya.stage.setChildIndex(this.scene,0);
        //获取场景模型中的角色移动碰撞区模型
        var moveArea = this.scene.getChildAt(0).getChildByName("MoveArea");
        //设置为不渲染
        moveArea.meshRender.enable = false;
        //加载网格碰撞器组件
        moveArea.addComponent(Laya.MeshCollider);
    }
    /*创建3D摄像机*/
    Example_roleControl.prototype.createCamera = function(){
        //实例化摄像机
        this.camera = new Laya.Camera();
        //移动摄像机位置
        this.camera.transform.translate(new Laya.Vector3(0,4.5,12));
        //设置摄像机视野范围（角度）
        this.camera.fieldOfView = 25;
        this.scene.addChild(this.camera);
    }
    /*创建3D角色*/
    Example_roleControl.prototype.createRole = function(){
        //实例化角色
        this.role = Laya.loader.getRes("LayaScene_girl/girl.lh");
        this.scene.addChild(this.role);
        //角色位置
        this.role.transform.position = new Laya.Vector3(0,0,1);
        //加入角色控制器脚本
        this.role.addComponent(RoleControlScript);
        //摄像机对准角色模型附近位置
        this.camera.transform.lookAt(new Laya.Vector3(0,0.5,1),new Laya.Vector3(0,0,0));
        //克隆一个角色（克隆包括子对象、组件、脚本等。tips：用此方法克隆Sprite3D继承类会有问题）
        var role1 = Laya.Sprite3D.instantiate(this.role);
        this.scene.addChild(role1);
        //角色位置
        this.role.transform.position = new Laya.Vector3(-1,0,1);
    }
    /*游戏帧循环*/
    Example_roleControl.prototype.onFrameLoop = function(){
        //摄像机位置改变（数据为角色控制脚本修改）
        this.camera.transform.translate(this.cameraTranslate,false);
    }
    return Example_roleControl;
})();
new Example_roleControl;
```


### Character control script component

Component functions are powerful, and scripts inherit components. For important attributes and methods, please refer to the script component of “technical document - LayaAir3D”

Script component development model provides us with another set of ways of thinking. Unlike inheritance, it is more flexible and can be added, removed and assembled at any time to achieve the desired effect, and can be completely separated from control and display. Developers can try this method more.

In this case, the character control uses the script component method, in the script, we mainly perform the following functions.

1. get the script belongs to the character of animation components, for the control of animation, in the override component _start () method to obtain animation components.

2. character animation, walk, standby, attack method separation, character animation to complete event monitoring.

3. the character collision detection, in the script update method _update (), the character of location ray and walking area collision detection, judge whether the character is blocked.

4. character update, in the script update method _update (), access to rocker angle, attack button, and according to its properties to control the character of animation switching.

5. the camera follows the displacement of the movement of the characters to update the displacement synchronously.

The script code is as follows:

```typescript
var RoleControlScript = (function(_super){
    function RoleControlScript(){
        RoleControlScript.super(this);
        /*角色当前动作*/
        this.currentAction = "stand";
        /*角色动画是否完成*/
        this.aniComplete = true;
        /*角色移动速度*/
        this.speed = 0.04;
        /*摇杆上一帧角度*/
        this.lastAngle = 0;

        this.ray = new Laya.Ray(new Laya.Vector3(0,0,0),new Laya.Vector3(0,-2,0));
        this.outHitInfo = new Laya.RaycastHit();
    }
    Laya.class(RoleControlScript,"RoleControlScript",_super);

    /*覆写3D组件方法，指3D对象加载组件时执行
    *owner：此组件所属的3D对象
    */
    RoleControlScript.prototype._load = function(owner){
        //获取控制器UI
        this.rocker = Example_roleControl.rocker;
        this.attack = Example_roleControl.attack;
    }
    /*覆写加载组件的3D对象实例化完成后，第一次更新时执行*/
    RoleControlScript.prototype._start = function(state){
        //获取被绑定脚本的模型，需等待角色实例化完成
        //获取有动画组件的内层模型（.lh资源导出时会在角色外包裹一层sprite3D）
        this.roleModel = this.owner.getChildByName("girl1");
        //模型缩放
        this.roleModel.transform.localScale = new Laya.Vector3(0.8,0.8,0.8);
        //获取角色动画组件
        this.roleAni = this.roleModel.getComponentByType(Laya.Animator);
        //动画完成事件监听
        this.roleAni.on(Laya.Event.COMPLETE,this,this.onComplete);
    }
    /*覆写3D组件更新方法（相当于帧循环）*/
    RoleControlScript.prototype._update = function(state){
        //如果是攻击状态播放击球动画（优先播放击球动画）
        if(this.attack.isAttack){
            if(this.currentAction != "play"){
                this.play();
                //摄像机移动向量
                Example_roleControl.cameraTranslate = new Laya.Vector3(0,0,0);
            }
        }
        //上次击球动画如果未结束，不执行以下代码
        if(!this.aniComplete)return;
        //如果摇杆有方向角度
        if(this.rocker.angle != -1){
            //摇杆控制角色旋转方向（笨帧摇杆的角度-上一帧的角度=本帧应当旋转的角度）
            this.roleModel.transform.rotate(new Laya.Vector3(0,this.rocker.angle - this.lastAngle,0),false,false);

            //通过弧度和速度计算角色在x，z轴上移动的量
            var speedX = Math.sin(this.rocker.radians) * this.speed;
            var speedZ = Math.cos(this.rocker.radians) * this.speed;
            //记录角色本帧的角度
            this.lastAngle = this.rocker.angle;
            //行走区域碰撞检测，如未与行走区域模型碰撞，则不移动
            //射线原点
            var rayOrigin = new Laya.Vector3(0,0,0);
            //根据角色位置计算射线原点
            Laya.Vector3.add(this.owner.transform.position,new Laya.Vector3(speedX,2,speedZ),rayOrigin);
            //射线原点位置更新
            this.ray.origin = rayOrigin;

            //物理射线与碰撞器相交检测
            Laya.Physics.rayCast(this.ray,this.outHitInfo,5);
            //如果未有碰撞则返回
            if(this.outHitInfo.distance < 0)speedX = speedZ = 0;
            //更新角色位置
            this.owner.transform.translate(new Laya.Vector3(speedX,0,speedZ),false);
            //播放行走动画
            if(this.currentAction != "go")this.go();
        }
        else{
            //如果摇杆未有角度则播放待机动画
            if(this.currentAction != "stand")this.stand();
        }
        //摄像机移动向量
        //注：因为克隆需求，所以提供移动向量给主类，由主类控制摄像机更新。
        //如果只有单一主角，可以直接在脚本中控制摄像机移动。
        Example_roleControl.prototype.cameraTranslate = new Laya.Vector3(speedX,0,speedZ);
    }
    /*动画播放完成回调*/
    function onComplete(){
        //角色动画完成
        this.aniComplete = true;
        //如果结束的动画剪辑名为play，则播放站立待机动画
        if(this.roleAni.currentPlayClip.name == "play") this.stand();
    }
    /*角色行走动画*/
    RoleControlScript.prototype.go = function(){
        this.roleAni.play("go",1.4);
        this.currentAction = "go";
    }
    /*角色待机动画*/
    RoleControlScript.prototype.stand = function(){
        this.roleAni.play("stand");
        this.currentAction = "stand";
    }
    /*角色击球动画*/
    RoleControlScript.prototype.play = function(){
        this.roleAni.play("play");
        this.currentAction = "play";
        this.aniComplete = false;
    }
    return RoleControlScript;
})(Laya.Script);
```

If the character walks, go, stands stand, attacks the play animation, when the script is added to this object, it can be controlled like a protagonist. That's the flexibility of the script

Compile and run the code to show the effect of figure 1.
