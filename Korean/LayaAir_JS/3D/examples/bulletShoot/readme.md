##3D 총탄 사격 충돌 검사 예례



###수요 분석

본장 과정은 주로 초학자들에게 3D 물체간 충돌 검사를 실시하는 간단한 운용으로 3D 엔진 1.7.12판 발표 후 엔진의 스크립트 기능이 완벽해지고 충돌 검출에 대한 촉발 방법을 늘려 개발자들을 편리하게 사용하여 사격 게임 개발을 할 수 있다.

앞서 예시에서 우리는 사선과 충돌기를 사용해 충돌 측정을 통해 충돌 정보의 속성 판단을 통해 마우스 교호 또는 기타 충돌 논리를 실현했다.그러나 총알이 이동 과정에서 장면과 다른 3D 물체와 충돌 검사를 하는 것은 번거롭고, 이 강의 과정에서 그것들의 실현 방법을 주로 설명해야 한다.

기본 수요:
1, 마우스 클릭 장면의 3D 공간, 탄알을 생성하고 마우스점 방향에 맞추어 사격한다.

2, 탄알이 창건된 후 자동으로 마우스 클릭 방향에 따라 비행, 목표점은 장면 중 3D 물품이며 공백공간일 수 있다.
3. 총탄 비행 중 3D 물체에 부딪힌 뒤 총알이 소멸되고, 만약 총알이 목표를 맞추지 못하면 비행 1단간 거리를 소각한다.
4. 장면 속 물품 이불 총알에 맞은 후, 물품은 총탄 방향에 따라 격퇴 효과가 생기고, 감혈은 0 시, 물건은 소각된다.

**Tips: 진짜 사격 게임이 복잡하기 때문에 총기 모형이 필요해 총기 총기는 마우스 이동에 따라 회전, 총관에서 사선을 발사하는 데 사용된다.본례에서 초학자 학습 수요를 줄이기 위해, 탄알은 고정된 위치에 따라 마우스 클릭에 따라 비행 방향을 확정한다.**

참고 효과 아래 그림 1

![图1](img/1.gif)< br > (그림 1)



###수요의 엔진 기술 방안 분석

1.**자원 제작:**장면 은 유닛 에서 제작 을 할 수 있는 3D 물품 가입 박스 충돌기 구성 요소 를 포함 해 현재 엔진 과 플러그인 버전 은 충돌기 구성 요소 (MeshCollider 네트워크 충돌기 일시 내보내지 못하고, 후기 지원)에 추가할 필요 없다.

총알은 잠시 장면에 넣어 카메라에 거주하고, 복제에 탄알을 만드는 데 사용된다.총알은 충돌 검사의 발기자로 충돌기 (구형) 와 강체 구성 요소를 추가하여 내보내면서 엔진이 자동으로 인식된다.

2.**충돌 검사 원리:**충돌 검사는 엔진 최적화의 원칙으로 충돌 발동기와 충돌 접수자로 나뉜다.

충돌 발동기 3D 모형은 ‘ 콩체 ’ 구성 요소를 추가하고, 강체 구성 요소가 있는 모형은 충돌 발주자로, 무강체 구성 요소의 3D 모형 충돌 접수자가 등장한 후 엔진은 자동으로 발동기와 접수자의 충돌기가 겹쳤는지를 판단한다.

이에 따라 총알은 충돌 발기자로 강체와 충돌기 두 개를 추가하고 입방체 상자에 충돌기만 넣으면 된다.

3.**스크립트 발생:**엔진이 충돌 발주자와 접수자의 충돌기가 겹쳐 3D 모형이 스크립트가 있는지 확인하고 충돌하는 단계에 따라 스크립트를 촉발할 수 있는 다른 방법에 따라 다양한 충돌 사건을 발행하는 것과 비슷한 반응을 보이게 된다.이 방법 은 충돌 시 촉발 방법, 충돌 기 중합 시 프레임 촉발 방법, 충돌기 분리 시 촉발 방법 이다.

4.**충돌기 크기 설정:**엔진 1.7.12 버전부터 충돌기 크기도 설정할 수 있다. 어떤 때는 충돌기가 3D 모형이 충돌 검사에 비해 작게 사용되므로 Untiy 에서 모형 충돌기 크기에 따라 수정할 수 있다.



Untiy 에서 장면을 생성하는 블letShot, 그림 2개처럼 입방체 상자에 충돌기 구성 요소 Box Collider, 빨간색 자탄 모형에 Sphere Collider Rigidbody 구성 요소를 추가하여 기본 설정을 사용하면 됩니다.

![图2](img/2.png)<br>（图2）







###기능 실현

이 예제 기능은 세 종류로 나눌 수 있습니다. 논리 편집:

** 메인 컨트롤 레야a3Du BulletAttack.js**주로 자원, 탄알 추가 입방체 상자 제어 스크립트, 마우스 클릭 이벤트 활성화, 탄알 발사 방향 생성****
****
**탄알 스크립트 종류 BulletScript.js**총탄 비행을 통제하는 데 쓰이며 스크립트에서 충돌 검출 방법을 통해 격중 및 총탄 소각 등의 기능을 실현한다.****
****
**스테레오 제어 스크립트 큐브 스크립트.js**총알에 맞을지 판단하는 데 쓰이는 격출 효과 애니메이션, 감혈 및 파괴 기능을 실현한다.****



#### 本例中所需向量数学知识

이 내용을 충분히 이해해야 한다. 이는 초학자들이 공부하거나 벡터의 기초지식을 돌이켜보면, 향량의 가감, 귀일, 취모 등의 연산으로 쓸 것이다.

3차원 벡터는 3D 게임 개발에서 다양한 의미를 가지고 있으며, 위치, 거리, 속도, 각도, 호도 등을 나타낼 수 있다.이 예에서 총알의 사격 방향은 3차원 벡터이며 방향 벡터에서도 총알을 계산할 수 있는 속도를 모두 벡터 수학 공식을 사용해야 한다.

3차원 벡터 기초 공식:
****
**A 시에서 B 점 방향: AB 방향 3차원 벡터 = B 목표 위치 3차원 벡터 — A 시작 위치 3차원 벡터** ****

엔진 제공 방법:`Vector3.subtract(a:Vector3, b:Vector3, out:Vector3)`.

운용: 3D 공간 중 두 개의 위치, 한 방향 벡터, 예를 들어 총탄 비행 방향, 공격 목표점 위치 벡터-총알 현재 벡터.
****

**AC 방향 벡터 = AB 방향 벡터+BC 방향 벡터**    ****


引擎提供方法为：`Vector3.add(ab:Vector3, bc:Vector3, ac:Vector3)`.

AC 는 A 가 C 점으로 향하는 방향 벡터로 AB 는 AB를 B 점 방향으로 향하고, BC 는 B점부터 C점까지 방향 벡터(그림 이해가 가능)를 표시했다.
****

**CB 방향 벡터 = AB 방향 벡터 — AC 방향 벡터******

엔진 제공 방법:`Vector3.subtract(ab:Vector3, ac:Vector3, cb:Vector3)`.

BC 는 C 시까지 방향 벡터로 B 점 방향으로 AB 가 B점 방향 벡터를 제시하고 AC 는 AC가 A 점을 C점 방향으로 향하는 방향 벡터 (그림 이해할 수 있음) 을 표시했다.
****

**AB 표준 방향 벡터 (길이 단위 1의 벡터) = AB 방향 벡터화******

엔진 제공 방법:`Vector3.normalize(s:Vector3, out:Vector3)`.

운용: 어떤 벡터의 길이도 표준 벡터로 바꿀 수 있습니다. 단위는 하나입니다.예를 들어 방향 벡터를 한 후에 속도의 표준치로서 속도를 1벡터로 설정할 수 있다.
****

**크기 조정 후 벡터 (길이 조정) = 원시 벡터 * 실수******

엔진 제공 방법:`Vector3.scale(v3:Vector3, num:Number, out:Vector3)`.

num 의 값 크기에 따라 크기를 줄여 원시 벡터의 길이를 생성할 수 있습니다.
****

**벡터의 길이값 = 개방 (벡스평방 + 벡터 + 벡터.

엔진 제공 방법:`Vector3.scalarLength(a:Vector3)`길이 되돌아가다

운용: 벡터 길이를 통해 거리, 속도 참조, 벡터 길이가 가장 작은 수치입니다.





####주 제어 기능 실현

메인 컨트롤 레이 3Du Bullettack.js 주요 기능은 3시:

1. getChildByName () 방법을 통해 스테레오 상자를 찾을 수 있으며 각각 큐브스크립트 제어 스크립트를 추가하여 충돌 검사에 사용됩니다.

2. 마우스 클릭 이벤트에서는 클론 방법을 사용하여 총알을 만드는 방법으로 충돌기 SphereCollider 및 강체 구성 요소 rigidbody 를 합쳐 복제할 수 있다.
탄알을 생성한 후 탄알을 제어하는 스크립트 블레트스크립트를 추가하고 블레트스크립트를 사용한 setShotDirection (direction V3) 에 탄알을 설치하는 비행 방향을 사용한다.

3. 탄알의 비행 방향은 마우스 클릭을 통해 발생한 사선을 계산해 얻는다.
마우스가 3D 장면을 클릭하면 카메라에 사선이 생기고 사선과 장면의 3D 모형이 교차할지 판단 (사선충돌 검사) 를 맞췄다면 총탄 방향은 목표 위치와 총알의 출발 위치를 교차하는 방향이다. 사선 방향, 카메라 위치, 탄알 초기 위치에 따라 총알 비행의 방향을 계산한다.

주 종류 구체적인 코드 다음과 같습니다:


```typescript

//初始化引擎
Laya3D.init(1000, 500, true);

/**射线**/
		this.ray=new Laya.Ray(new Laya.Vector3(),new Laya.Vector3());
		/**鼠标坐标**/
		this.mousePos=new Laya.Vector2();
		/**碰撞信息**/
		this.rayCastHit=new Laya.RaycastHit();

Laya.Stat.show();
//适配模式
Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
//加载3D资源
Laya.loader.create("LayaScene_bulletShoot/bulletShoot.ls", Laya.Handler.create(this, onComplete));

//提示信息
var txt = new Laya.Text();
txt.text = "3D碰撞检测示例：点击鼠标发射子弹，击中盒子时，盒子会根据子弹发射方向被击退，3发子弹可摧毁盒子！！";
txt.color = "#FFFF00";
txt.bold = true;
txt.fontSize = 20;
txt.pos(10, 10);
Laya.stage.addChild(txt);

function onComplete() {
    //创建场景
    this.scene = Laya.loader.getRes("LayaScene_bulletShoot/bulletShoot.ls");
    Laya.stage.addChild(this.scene);
    Laya.stage.setChildIndex(this.scene, 0);

    //获取摄像机
    this.camera = this.scene.getChildByName("Main Camera");
    this.camera.farPlane = 200;

    //			DebugPanel.init();

    //为场景中的立方体盒子加控制脚本
    var len = this.scene._childs.length;
    for (var i = 1; i < len; i++) {
        var cube = scene.getChildByName("Cube (" + i + ")");
        if (cube) cube.addComponent(CubeScript);
    }

    //获取场景中的子弹用于克隆
    this.bullet = this.scene.getChildByName("bullet");
    //未产生子弹时移除克隆参考用子弹
    this.bullet.removeSelf();

    //鼠标控制创建子弹发射
    Laya.stage.on(Laya.Event.MOUSE_DOWN, this, onShoot);
}

/**
 * 子弹发射
 * 基本原理：鼠标点击产生射线，射线如与模型碰撞器相交，则获取碰撞点作为子弹发射方向；
 * 如果未与3D模型相交，则直接使用射线方向作为发射方向。
 */
function onShoot() {
    //克隆一颗子弹用于射击
    var bulletClone = this.bullet.clone();
    //为子弹加控制脚本
    var script = bulletClone.addComponent(BulletScript);
    this.scene.addChild(bulletClone);


    //鼠标点击屏幕的位置
    this.mousePos = new Laya.Vector2(Laya.MouseManager.instance.mouseX, Laya.MouseManager.instance.mouseY);
    //鼠标点击屏幕产生射线
    this.camera.viewportPointToRay(this.mousePos, ray);
    //射线与3D模型中的碰撞器进行碰撞检测
    Laya.Physics.rayCast(this.ray, this.rayCastHit, 30, 0);

    //-----------在子弹脚本中设置子弹发射方向----------------------
    //射击的方向向量
    var dirV3 = new Laya.Vector3();

    //如果鼠标点击到模型上（射线与碰撞器发生碰撞）
    if (this.rayCastHit.distance !== -1) {
        //子弹射击方向向量 = 由鼠标点中的目标位置向量 —— 子弹起始位置向量
        Laya.Vector3.subtract(this.rayCastHit.position, this.bullet.transform.position, dirV3);
        //设置子弹控制脚本中发射方向
        script.setShootDirection(dirV3);
    } else {//如果鼠标未点击到模型上

        /**
         *射线方向向量是归一化的单位向量，不能直接用于向量加减。需要根据射线产生的原理算
         *出相当于有长短距离的方向向量用于计算，可以通过向量缩放方法实现。
         *射线原理：原点是鼠标点击在近裁剪面上的点,方向是从摄像机位置到鼠标点击在远裁剪面
         *上的点产生的归一化方向。因此可以用摄像机到远裁面的距离模拟原始方向向量		
         **/
        //				trace(Vector3.scalarLength(ray.direction));
        //摄像机到鼠标点击处的方向向量
        var aV3 = new Laya.Vector3();
        //根据射线方向向量、摄像机远裁剪值缩放为射线方向原始向量(使用远裁距会有一点误差，但不影响效果)
        Laya.Vector3.scale(this.ray.direction, this.camera.farPlane, aV3);

        //根据摄像机与子弹的位置求出子弹到摄像机的方向向量
        var bV3 = new Laya.Vector3();
        Laya.Vector3.subtract(this.camera.transform.position, this.bullet.transform.position, bV3);

        //射击的方向向量 = 摄像机到鼠标点击处的方向向量 +子弹到摄像机的方向向量
        Laya.Vector3.add(aV3, bV3, dirV3);

        //设置子弹控制脚本中发射方向
        script.setShootDirection(dirV3);
    }
}
```




####탄알 제어 스크립트 기능 실현

탄알 제어 스크립트 스크립트 스크립트 Script, 엔진 1.7.12판은 스크립트 바인터의 충돌 검출 방법을 증가시켰다. 물론, 납치자가 충돌기 구성 요소가 필요해 그렇지 않으면 성공할 수 없다.

장면의 다른 충돌기와 스크립트와 모형을 묶은 충돌기가 반복되면 여러 가지 상태를 촉발하고 상태에 따라 촉발할 수 있는 방법이다.

촉발 상태 는 모두 세 가지 가 있다: 다른 충돌기 와 충돌 시 방법 이다`onTriggerEnter(other)`다른 충돌기, 자기 충돌기, 프레임 중복 시 방법`onTriggerStay(other)`다른 충돌기는 자기 충돌기와 상호 떠나는 방법`onTriggerExit(other)`.

그것들은 다른 촉발 방법에 대응하고 있습니다 (다음 사례 코드) 를 살펴보세요. 스크립트 상속류에서 기존 터치 방법을 덮어 가며 자신의 논리를 실현할 수 있습니다.촉발방법 중에는 다른 충돌기를 인자로 전달해 개발자가 다른 충돌기의 모형 대상, 속성 등을 얻기도 한다.

탄알 제어 스크립트 코드 다음과 같습니다:


```typescript

var BulletScript = (function (_super) {
    // 子弹生命周期
    this.life = 200;
    //子弹发射的速度（方向）
    BulletScript.prototype.speedV3 = new Laya.Vector3();
    function BulletScript() {
        BulletScript.super(this);
    }
    Laya.class(BulletScript, "BulletScript", _super);
    /**
	* 脚本实例化完成载入后调度
	*  owner 脚本绑定的3D物体
	*/
    BulletScript.prototype._load = function (owner) {
        //获取子弹与子弹位置
        this.bullet = this.owner;
    }
    /**
     * 设置子弹射击方向并计算速度
     *  directionV3
     */
    BulletScript.prototype.setShootDirection = function (directionV3) {
        /****
         * 注：
         * 三维向量即是位置、方向，也可以是速度，但速度需要一个统一的参考衡量标准，比如“N*标准速度值/帧”或
         * “N*标准速度值/毫秒”，它类似于“N*米/帧”。
         * 而我们得到的方向向量，它的大小不一，无法作为标准速度值使用，这个时候可用Vector3.normalize()方法
         * 把任一向量归一化，产生单位为一的向量作为标准速度值，再把它进行缩放作为不同物体的速度来使用，比如
         * 0.2倍标准速度值，1.5倍标准速度值等，可使用Vector3.scale()方法缩放。
         ****/
        //将方向向量归一成单位为一的方向速度向量(在LayaAir中相当于1米的长度)
        Laya.Vector3.normalize(directionV3, BulletScript.prototype.speedV3);
        // console.log("\n子弹攻击速度(方向)：", BulletScript.prototype.speedV3.elements)

        //用缩放方法去调整发射速度，0.2倍标准速度（注：子弹速度过快，可能会越过场景中物品，不发生碰撞！）
        // Laya.Vector3.scale(BulletScript.prototype.speedV3,0.2,BulletScript.prototype.speedV3);
    }
    /**
     * 脚本帧循环更新
     */
    BulletScript.prototype._update = function (state) {
        //子弹位置更新
        this.bullet.transform.translate(BulletScript.prototype.speedV3, false);
        //生命周期递减
        this.life--;
        //生命周期结束后，一帧后销毁子弹（目前脚本中直接销毁绑定对象会报错，后期版本解决此问题）
        if (this.life < 0) {
            Laya.timer.frameOnce(3, this, function () { this.bullet.destroy(); });
        }
    }
    /**
     * 当其他碰撞器进入绑定物体碰撞器时触发（子弹击中物品时）
     * 注：如相对移动速度过快，可能直接越过
     */
    BulletScript.prototype.onTriggerEnter = function (other) {

    }
    /**
     * 当其他碰撞器进入绑定物体碰撞器后逐帧触发（子弹进入物品时）
     * 注：如相对移动速度过快，可能直接越过
     */
    BulletScript.prototype.onTriggerStay = function (other) {

    }
    /**
     * 当其他碰撞器退出绑定物体碰撞器时逐帧触发（子弹穿出物品时）
     * 注：如相对移动速度过快，可能直接越过
     */
    BulletScript.prototype.onTriggerExit = function (other) {
        //一帧后销毁子弹（目前脚本中直接销毁绑定对象会报错，后期版本解决此问题）
        Laya.timer.frameOnce(1, this, function () { this.bullet.destroy(); });
    }
    return BulletScript;
})(Laya.Script);
```




####입방체 스크립트 기능 실현

스테레오 컨트롤 스크립트도 스크립트 Script 에 이어 스크립트 기능을 추가하는 3가지 촉발 방법으로 구별되는 것은 3가지 방법의 논리와 다르다.

총알 충돌기 가 입방체 상자 에 들어갈 때 방법`onTriggerEnter(other)`입방체 케이스 충돌기에 따라 입방체의 스크립트의 스크립트에서 총알 속도와 방향을 얻으며 입방체 상자의 격퇴 속도와 격퇴 방향으로 쓰이며 스크립트 업데이트 방법에서 아날로그 상자가 격퇴하는 효과가 있다.

총탄 충돌기 가 입방체 케이스 충돌기 를 떠날 때 방법`onTriggerExit(other)`입방체 상자의 생명치가 줄어들어 세 발의 탄알에 맞아 입방체 상자가 파괴되어 사라졌다.

입방체 제어 스크립트 코드 다음과 같습니다:


```typescript

var CubeScript = (function (_super) {
    /**是否被攻击**/
    this.isAttacked = false;
    /**盒子被击退的标准速度（方向）**/
    this.repelledV3 = new Laya.Vector3();
    /**盒子生命周期**/
    this.life = 60;
    /**
     * 立体盒子控制脚本
     */
    function CubeScript() {
        CubeScript.super(this);
    }
    Laya.class(CubeScript, "CubeScript", _super);
    /**
     * 脚本实例化完成载入后调度
     *  owner 脚本绑定的3D物体
     */
    CubeScript.prototype._load = function (owner) {
        //获取被绑定对象
        this.cube = this.owner
    }
    /**
     * 当其他碰撞器进入绑定物体碰撞器时触发（子弹击中盒子时）
     * 注：如相对移动速度过快，可能直接越过
     */
    CubeScript.prototype.onTriggerEnter = function (other) {
        //获取其他碰撞器绑定的模型
        var sp3D = other.owner;
        //获取子弹对象模型脚本
        var script = sp3D.getComponentByType(BulletScript);
        //获取子弹速度为
        this.repelledV3 = script.speedV3.clone();
        //被攻击速度归一化成单位一向量
        Laya.Vector3.normalize(this.repelledV3, this.repelledV3);

        //设置为被攻击状态
        this.isAttacked = true;

        console.log("\n1 子弹碰撞时位置(方向):", sp3D.transform.position.elements);
    }
    /**
     * 当其他碰撞器进入绑定物体碰撞器后逐帧触发（子弹进入盒子时）
     * 注：如相对移动速度过快，可能直接越过
     */
    CubeScript.prototype.onTriggerStay = function (other) {
        var sp3D = other.owner;
        console.log("2 子弹穿过时位置(方向):", sp3D.transform.position.elements);
    }
    /**
     * 当其他碰撞器退出绑定物体碰撞器时逐帧触发（子弹穿出盒子时）
     * 注：如相对移动速度过快，可能直接越过
     */
    CubeScript.prototype.onTriggerExit = function (other) {
        //获取其他碰撞器绑定的模型
        var sp3D = other.owner;
        console.log("3 子弹穿出时位置(方向):", sp3D.transform.position.elements);

        //击中后生命减，为0时一帧后销毁（目前脚本中直接销毁绑定对象会报错，后期版本解决此问题）
        this.life -= 20;
        if (this.life <= 0) {
            this.enable = false;
            Laya.timer.frameOnce(1, this, function () { this.owner.destroy() });
        }
    }
    /**
     * 脚本的帧循环
     */	
    CubeScript.prototype._update = function(state){
        //被攻击状态下，盒子产生击退效果
        if(this.isAttacked)
        {
            //根据击退方向和速度移动
            this.cube.transform.translate(this.repelledV3,false);
            // console.log("击退位置变化：",(this.cube.transform.position.clone()).elements);
            //击退速度逐步减小
            Laya.Vector3.scale(this.repelledV3,0.3,this.repelledV3);
            //当后退各方向速度小于0.01时，击退状态停止
            if(Laya.Vector3.scalarLength(this.repelledV3)<0.01)
            {
                this.isAttacked=false;
            }
        }
    }
    return CubeScript;
})(Laya.Script);
```




이러한 간단한 세 종류를 완성한 후, 우리는 그림 1의 효과를 볼 수 있다. 물론, 진정한 사격 게임을 완성해야 한다. 그렇게 간단하지 않을 것이다. 이 사례는 초학자들에게 주로 사고를 열어 일반삼을 수 있다.

