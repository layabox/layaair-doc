#3D 역할 스크립트 제어와 충돌 검사

###수요 분석

이 강의는 주로 초학자들에게 3D 엔진의 종합 운용을 설명하고 3D 장면의 처리와 가재, 캐릭터 충돌 검사와 애니메이션의 제어 전환 등을 포함한다.개발자들에게 RPG 게임 카드와 비슷한 기초 개발 사례를 보여 준다.

**기본 수요:**

1. 로봇 컨트롤 캐릭터를 통해 장면을 오가며 흔들 컨트롤러가 풀어지자 역할은 이동을 멈추고 대기를 대기한다.

2, 공격 버튼을 통해 캐릭터 공격 애니메이션으로 전환할 수 있다. 버튼을 누르면 최소 한 번의 완정한 공격 애니메이션 을 켜고, 종영 전 애니메이션, 공격 버튼 우선순위는 록이 계속 누르고, 공격 정지 후 이동 애니메이션을 누르고 이동한다.

3, 장면 중 차단이 필요합니다. 어느 지방 캐릭터가 걷지 못하고, 캐릭터가 막힐 때 이동을 멈춰야 합니다.

4, 클론 같은 캐릭터, 두 캐릭터가 동시에 통제되고, 그 중 하나가 정지된 후 다른 캐릭터는 영향을 받지 않는다.

참고 효과 1:

![1](img/1.gif)(1)</br>>



###수요의 엔진 기술 방안 분석

1, 록: 2D 엔진 마우스 감청 방식을 사용하여 2D 엔진 엔진 마우스 이벤트를 지원하여 여러 가지 터치 에 적응하여 휴대폰의 여러 가지 복잡한 조작에 적응한다.

2, 역할 컨트롤: Layaiar3D 엔진 지원 구성 요소 개발 모형을 지원하기 때문에 역할 컨트롤은 스크립트 구성 방식을 사용하여 제어와 디스플레이를 효과적으로 조절합니다.

3. 장면: 문서를 작성할 때 3D 엔진의 고급 지형이 완비되어 있어 장경의 가로막은 잠시 행주구 충돌기와 사선 검사 방식으로 판단한다.

미술은 3D 장면에서 실행 가능 구역의 단독 모형을 만들 수 있다.사용을 내보내면 렌더를 하지 않으나 코드에서 격자 충돌기를 추가해야 한다. 캐릭터 전행 위치에 사선과 충돌 검사가 발생할 때 충돌 정보가 없다면 캐릭터가 걷지 못하고 충돌 정보 캐릭터가 움직일 수 있다.물론, 반대로 갈 수 있고, 걷는 영역을 모형을 만들어서는 안 된다.

고급 지형 기능이 완비된 후 기술 문서를 상세하게 소개하고 개발자들은 고급 지형을 사용하여 성능에 더욱 향상시킨다.

![2](img/2.png)(图2)</br>







###록 컨트롤러 및 공격 버튼

진도 페이지와 '기술 문서 — 3D 캐릭터 전환과 애니메이션' 예를 들어 인터페이스와 코드 기본 일치로 설명을 많이 하지 않습니다.

리모컨 컨트롤러 및 공격 버튼 인터페이스는 2D, 3D 게임에 통용되며 개발자들은 참고할 수 있다.레이레이어이더에서 두 개의 인터페이스를 생성하며 라cker.ui, Attack.ui, Rocker.ui, Rocker.ui 는 터치 그림과 배경 그림 구성, Attack.ui는 하나의 공격 버튼으로 구성되며 다른 스킬 버튼을 넣어서 확장할 수 있다.인터페이스 3, 그림 4.

![3](img/3.png)(图3)</br>



![4](img/4.png)(사진 4)</br>>

IDE 내보내기 자원 발표 후 항목 ui 폴더에서 대응하는 종류가 발생합니다. View 폴더를 만들고 RockerView, AttackView 계승을 만들고, 이 안에서 흔들 제어, 공격 논리 코드를 작성하여 예를 들어:


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


###예시 주류

예주의 종류 중 기본적으로 제어 분야의 논리가 없다. 마찬가지로 장면, 카메라, 캐릭터를 창건한다.예를 들어 불빛을 사용하지 않고 빛으로 스티커를 비추면, 개발자들에게 동태빛이 없다면 불빛을 첨가하지 않으면 성능이 높고, 캐릭터 그림자는 투명 스티커를 사용할 수 있다.

장면 은 광경 모형 에서 실행 영역 모형 모형 모브 Area 를 설정할 수 있다`moveArea.meshRender.enable=false`네일렉트릭 충돌기까지 더하면 메시콜리더와 격격격충돌기 검사가 정확하고 모형 자체와 일치하여 펀칭 지역이 검출되지 않을 것이다.물론 성능상 지출이 비교적 클 것이다.

흔들, 공격 버튼 및 카메라 이동량은 정태로 설정되어 캐릭터 제어 스크립트 사용 및 제어.

주 종류 모든 코드 다음과 같습니다:


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




###역할 제어 스크립트 구성 요소

구성 요소 기능은 비교적 강하지만 스크립트가 구성 요소에 상속된다.이 중 중요 속성 과 방법 은 "기술 문서 — Layaiair3D 스크립트 구성 요소" 를 찾아보십시오

스크립트 요소 개발 패턴은 다른 사고방식을 제공하고, 상속과 달리 더 융통성 다변화, 수시로 이동, 그룹 구성 요소를 추가할 수 있으며, Google의 효과에 도달할 수 있으며, 제어와 디스플레이를 철저히 분리시킬 수 있다.개발자들은 이 방법을 많이 시도할 수 있다.

이 예에서 배역은 우리가 스크립트 구성 요소를 사용하는 방법을 제어하고 스크립트에서 우리는 주로 아래의 기능을 수행한다.

1. 스크립트 소속 캐릭터 애니메이션 구성 요소를 제어하기 위해 애니메이션으로 구성된 구성 요소를 전복합니다.

2, 캐릭터 애니메이션, 걷기, 대기, 공격법 분리, 캐릭터 애니메이션 완료 사건 감청.

3. 캐릭터 충돌 검사, 스크립트 업데이트 방법 유update()에서 캐릭터 위치 사선과 행주구 충돌 검사, 캐릭터 차단 여부를 판단한다.

4, 캐릭터 업데이트, 스크립트 업데이트 방법, 유update()에서 흔들 각도, 공격 버튼을 가져와 속성 제어 캐릭터 애니메이션 전환.

5, 카메라는 캐릭터를 따라 이동하는 이동량을 동시 업데이트한다.

스크립트 모든 코드 다음과 같습니다:


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


캐릭터 행진 go, 스탠드, 공격 플레이 애니메이션, 스크립트 가입 대상이 되면 주인공처럼 통제될 수 있다.이것이 바로 각본의 영활한 곳이다.

컴파일을 실행하면 그림 1의 시사효과를 얻을 수 있다.