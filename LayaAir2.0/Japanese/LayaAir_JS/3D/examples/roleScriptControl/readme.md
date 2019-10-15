#3 Dキャラクタースクリプト制御と衝突検出

###需要分析

この章では、3 Dエンジンの総合的な運用について初心者に説明します。3 Dシーンの処理とロード、キャラクター衝突検出と動画のコントロールの切り替えなどが含まれています。開発者たちにRPGゲームのような基礎的な開発例を見せます。

**基本的な需要は以下の通りです**

1、スティックコントローラーでキャラクターをコントロールしてシーン中を歩き回り、レバーコントローラーが解放されたら、キャラクターは移動を停止して待機します。

2、攻撃ボタンを通じてキャラクターの攻撃動画に切り替えることができます。ボタンを押し続けて攻撃し続けて、一回のボタンをクリックして少なくとも一回の完全な攻撃動画を再生します。終了後に再生する前の動画では、スイングより攻撃ボタンの優先度が高いです。

3、シーンにはブロックが必要で、一部の地方のキャラクターが歩けなくなり、キャラクターがブロックまで歩いた時に移動を停止します。

4、同じキャラクターをクローンして、二つのキャラクターは同時にコントロールされます。その中の一つがブロック停止された後、もう一つのキャラクターは影響を受けません。

参考効果は下図1の通りです。

![1](img/1.gif)（図1）<br/>



###必要なエンジン技術案の分析

1、スティックを振る：2 Dエンジンのマウスモニター方式を採用し、2 Dエンジンのマウスイベントは多点タッチをサポートし、携帯電話の多点操作に適応する。

2、キャラクターコントロール：LayaAir 3 Dエンジンはコンポーネント式開発モデルをサポートしていますので、キャラクターコントロールはシナリオコンポーネント方式を採用して、効果的にコントロールと表示を分離します。

3、場面：ドキュメント作成時に、3 Dエンジンの高級な地形が完備されていますので、シーン中のブロックはしばらく走行エリアの衝突器と放射線検出方式で判断します。

美術は3 Dシーンにおいて、図2のようにキャラクターが歩いて行ける独自のモデルを作ることができます。エクスポート時にレンダリングは行われませんが、コードにグリッド衝突器を追加する必要があります。キャラクターの前行位置から1本の放射線が衝突器と衝突検出されます。衝突情報がないと、キャラクターは歩けません。衝突情報のあるキャラクターは走行できます。もちろん、逆にしてもいいです。走行不可エリアでモデルを作ります。

高度な地形機能が整ったら、技術文書を詳しく紹介し、開発者たちに高度な地形を使うように勧めます。

![2](img/2.png)（図2）<br/>



###スティックコントローラと攻撃ボタン

ローディング進捗ページは、「技術文書－3 Dキャラクター切り替えと動画」の例では、基本的にインターフェースとコードが一致しています。ここでは説明しないです。

遥棒コントローラーと攻撃ボタンのインターフェイスは2 D、3 Dゲームに使われています。開発者たちは参考にして使ってもいいです。LayaAirIDEに二つのインターフェースを作成し、Rocker.ui、Attack.uiと名づけました。Rocker.uiはタッチポイント画像と背景図から構成されています。Attack.uiは一つの攻撃ボタンから構成されています。中には他の技能ボタンを入れて拡張することもできます。画面は下の図3、図4のようです。

![3](img/3.png)（図3）<br/>

![4](img/4.png)（図4）<br/>

IDEがリソースをエクスポートした後、プロジェクトのuiフォルダに対応するクラスが発生します。私たちはViewフォルダを作成し、RockerView、AttackView類を作成してそれを継承します。中でスイング制御、攻撃論理コードを作成します。例は以下の通りです。


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


###メインクラスの例

メインクラスの例では、制御のためのロジックがほとんどなく、シーン、カメラ、キャラクターを作成します。例では照明を使わずに、光で写真を撮ってもいいです。開発者たちはシーンにダイナミックな光がなければ、照明を追加しなくてもいいです。性能は高くなります。役割の影は透明なチップを使ってもいいです。

シーンモデルから走行エリアモデルmoveAreaを取得する必要があります。レンダリングしないように設定できます。コードは`moveArea.meshRender.enable=false`メッシュ衝突器MeshColliderを加えて、メッシュ衝突器の検出は比較的正確であり、モデル自体と一致して、透かしの領域は検出されないであろう。もちろん、性能上のオーバーヘッドは大きいです。

スティック、攻撃ボタン、カメラの移動量を静的に設定し、キャラクターコントロールスクリプトの使用と制御を容易にします。

メインクラスのすべてのコードは以下の通りです。


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




###キャラクターコントロールスクリプトコンポーネント

コンポーネントの機能は比較的に強いですが、スクリプトはコンポーネントに引き継がれます。その中で重要な属性と方法は「技術文書—LayaAir 3 Dスクリプトコンポーネント」を参照してください。

シナリオコンポーネントの開発モードは私達のためにもう一つの思惟方式を提供してくれました。継承と違って、より柔軟で変化に富むので、いつでも除去、組み合わせのコンポーネントを追加できます。開発者たちはこの方法をたくさん試してもいいです。

本例では、キャラクター制御は、シナリオ構成要素式の方法を使用しており、シナリオでは主に以下の機能を実行しています。

1、スクリプトの属するキャラクターアニメーションコンポーネントを取得して、アニメーション用を制御し、上書きコンポーネント（u start）方法でアニメーションコンポーネントを取得する。

2、キャラクターアニメーション、ウォーキング、スタンバイ、攻撃方法が分離され、キャラクターアニメーションはイベントモニターを完成する。

3、キャラクター衝突検出は、スクリプト更新方法_uuudate（）において、キャラクターの位置線と走行エリアが衝突して検出され、キャラクターがブロックされているかどうかを判断する。

4、キャラクターの更新は、スクリプトの更新方法_uuudate（）において、スイング角度、攻撃ボタンを取得し、その属性に応じてキャラクターアニメーションの切り替えを制御します。

5、カメラはキャラクターの移動の変位量に従って同期シフトの更新を行います。

スクリプトのすべてのコードは以下の通りです。


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


キャラクターにウォーキングgo、立ちスタント、攻撃プレイ動画があれば、シナリオをこの対象に加えると、主人公のようにコントロールできます。これが脚本の柔軟性です。

実行コードをコンパイルすると、図1のデモンストレーション効果が得られます。