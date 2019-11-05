##3 D弾丸射撃衝突検出例



###需要分析

この章の授業では、3 D物体間の衝突検出の簡単な運用を初心者たちに実証し、3 Dエンジン1.7.12版のリリース後、エンジンのスクリプト機能が改善され、衝突検出のトリガ方法が追加され、開発者たちが簡単に利用できるようになりました。

前の例では、放射線と衝突器を用いて衝突検出を行い、衝突情報の属性判断により、マウスの相互作用または他の衝突論理を実現した。しかし、弾丸が移動中にシーンの他の3 D物体と衝突して検出するのが面倒くさいということを実現するために、この章の授業では主にそれらの実現方法を説明します。

基本的な需要は以下の通りです
1、マウスでシーンの3 D空間をクリックして、弾丸を作成し、マウスの点の方向に合わせて射撃を行います。

2、弾丸が作成された後、自動的にマウスのクリック方向によって飛行します。目標点はシーン中の3 Dアイテムでもいいし、空白スペースでもいいです。
3、弾が飛行中に3 D物体に衝突したら、弾は破壊されます。もし弾が目標に当たらなかったら、一定の距離を飛行してから廃棄されます。
4、シーン中の物品が銃弾に当たった後、物品は銃弾の方向によって撃退効果が発生し、減血し、血が0未満の場合、物品は破壊されます。

**Tips：本格的な射撃ゲームは複雑です。例えば銃器の模型が必要です。銃器管はマウスの動きによって回転します。銃管から放射線を出して衝突を検出します。本例では初心者学習のために必要なものを減らし、弾は決まった位置に出て、マウスクリックによって飛行方向を決めます。**

参考効果は下図1のようです。

![图1](img/1.gif)<br/>(図1)



###必要なエンジン技術案の分析

1、**リソースの作成:**シーンはUnityで作成しますが、破壊された3 Dアイテムにボックス型の衝突器コンポーネントを追加する必要があります。現在のエンジンとプラグインのバージョンは衝突器コンポーネント（MeshColliderグリッド衝突器は一時的にエクスポートできません。後期には順次サポートします。）を導出できます。コードに追加する必要はありません。

弾丸はシーンに一時的に入れ、カメラの後に弾をクローンするために使われる。銃弾は衝突検出の発信者として、衝突器（ボール型）と剛体部品を追加する必要があり、導き出す時、エンジンは自動的に識別できる。

2、**衝突検出原理：**衝突検出はエンジン最適化の原則のため、衝突発信者と衝突受動受信者に分けられる。

衝突発信者3 Dモデルは、「剛体」コンポーネントを追加する必要があります。衝突の発信者として剛体コンポーネントのモデルがあり、剛体コンポーネントのない3 Dモデルは、衝突の受け入れ者を表しています。それらがシーンに追加されると、エンジンは、発信者と受信者の衝突器が重なっているかどうかを自動的に判断します。

したがって、この例では、銃弾は衝突の発信者として剛体と衝突器の2つのコンポーネントを追加する必要があり、立方体の箱は衝突器だけでよい。

3、**スクリプトトリガ:**エンジンが、衝突の発信者と受信者の衝突器が重なっていると判断した場合、3 Dモデルにスクリプトコンポーネントがあるかどうかを調べ、ある場合は、衝突の異なる段階に応じてスクリプトをトリガする異なる方法があります。これらの方法は、衝突時にトリガ方法、衝突器が重なる時にフレーム毎にトリガ方法、衝突器分離時にトリガする方法を含む。

4、**衝突器のサイズ設定:**エンジン1.7.12のバージョンから、衝突器の大きさを設定することもでき、衝突検出のために衝突器が3 Dモデルより大きいか小さいかが必要となる場合がありますので、Unitiyでは必要に応じてモデルの衝突器の大きさを変更することができます。



UnitiyでシーンbulletShotを作成し、図2に示すように、キューブボックスに衝突器セットBox Colliderを追加し、赤い弾丸モデルにSphere ColliderとRigidbodyコンポーネントを追加し、それらのコンポーネントパラメータはデフォルト設定を採用すれば良い。

![图2](img/2.png)<br>（图2）







###機能の実現

この例示的な機能の実装は、3つのクラスに分けて論理的に記述することができる。

＊主制御類Laya 3 DuBulletAttack.js**主にリソースをロードしたり、弾丸とキューブボックスを追加してスクリプトを制御したり、マウスでイベントをクリックした時に弾丸を作成して、弾丸の発射方向を生成するなどの機能があります。****
****
**弾丸シナリオクラスBullettScript.js**弾の飛行を制御し、台本での衝突検出のトリガ方法により、ヒットや銃弾破壊などの判定機能を実現します。****
****
**キューブコントロールスクリプトCubeScript.js**弾が当たったかどうかを判断するために、撃退効果のある動画や減血、破壊機能を実現します。****



#### 本例中所需向量数学知识


要充分理解本章内容，在此需要初学者们学习或回顾一下向量的基础知识，我们会用到向量的加减、归一、取模等运算。

三次元ベクトルは3 Dゲームの開発において、位置、距離、速度、角度、ラジアンなどを表すことができます。この例では、弾丸の射撃方向は三次元ベクトルであり、方向ベクトルから弾丸の速度を計算することもできます。これらはベクトル数学式を用いる必要があります。

三次元ベクトルの基礎公式は以下の通りです。
****
**A点からB点までの方向：AB方向三次元ベクトル=B目標位置三次元ベクトル—A開始位置三次元ベクトル** ****


引擎提供方法为：`Vector3.subtract(a:Vector3, b:Vector3, out:Vector3)`。

運用：3 D空間の中の2つの点の位置から、1つの方向ベクトルを得て、例えば弾丸飛行方向、攻撃の目標点位置ベクトル-弾の現在位置ベクトル。
****

**AC方向ベクトル=AB方向ベクトル+BC方向ベクトル**    ****


引擎提供方法为：`Vector3.add(ab:Vector3, bc:Vector3, ac:Vector3)`。

ACはA点からC点までの方向ベクトルを表し、ABはA点からB点方向ベクトルを表し、BCはB点からC点までの方向ベクトルを表しています。
****

**CB方向ベクトル=AB方向ベクトル—AC方向ベクトル******

エンジンの提供方法は：`Vector3.subtract(ab:Vector3, ac:Vector3, cb:Vector3)`。

BCはB点からC点までの方向ベクトルを示し、ABはA点からB点までの方向ベクトルを表し、ACはA点からC点までの方向ベクトルを表しています。
****

**AB標準方向ベクトル（長さは単位ベクトル）＝AB方向ベクトル正規化******

エンジンの提供方法は：`Vector3.normalize(s:Vector3, out:Vector3)`。

運用：どのベクトルの長さ（モード）も標準ベクトルに正規化できます。単位は一つです。例えば、方向ベクトルを一つにまとめると、速度の標準値として、速度は正規ベクトルの倍数に設定できます。
****

**拡大縮小後のベクトル(長さ拡大縮小)=元のベクトル*実数******

エンジンの提供方法は：`Vector3.scale(v3:Vector3, num:Number, out:Vector3)`。

numの値の大きさに応じてスケーリングを行い，元のベクトルのnum倍の長さのベクトルを生成することができる。
****

**ベクトルの長さ値=開方(ベクトル.x平方+ベクトル.y平方+ベクトル.z平方)*

エンジンの提供方法：`Vector3.scalarLength(a:Vector3)`を返します

运用：ベクトルの长さを取って距离、速度の参考にすることができます。ベクトルの长さの最小値は0です。





####主制御類機能の実現

主制御類Laya 3 DuBulletAttack.jsの主な機能は3つです。

1.getChildByName（）法によりシーンで立方ケースを見つけ、それぞれ立方体制御スクリプトCubeScriptを追加し、衝突検出に用いる。

2.マウスクリックイベントでは、クローン方法を使って弾を作成します。この方法で弾丸の衝突器スフィアColliderと剛体コンポーネントrigidbodyを一緒にクローンすることができます。
銃弾を作成した後、銃弾制御シナリオBullectScriptを追加し、BullectScriptメソッドを使用してset Shot Direction（directv 3）に弾丸の飛行方向を設定します。

3.弾丸の飛行方向はマウスでシーンをクリックした時に発生する放射線を計算して得られます。
マウスが3 Dシーン空間をクリックしてカメラから放射線を発生させ、放射線とシーンの3 Dモデルが交差しているかどうかを判断し（放射線衝突検出）、交差すれば、弾の方向は交差目標位置と弾の開始位置から発生する方向である。交差しない場合は、放射線方向、カメラ位置、弾の初期位置から弾丸飛行の方向を計算する。

メインクラスの具体的なコードは以下の通りです。


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




####弾丸コントロールスクリプト機能の実現

弾丸コントロールスクリプトはスクリプトScriptに引き継がれ、エンジン1.7.12版はスクリプトバインディング者の衝突検出トリガ方法を追加しました。もちろん、バインディング者は衝突モジュールが必要で、そうでなければ成功をトリガできません。

シナリオ中の他の衝突器とスクリプトバインディングモデルの衝突器が重なると、様々な状態がトリガされ、状態に応じて異なる方法がトリガされる。

トリガー状態は、他の衝突器と自分の衝突時の方法を含む3つの種類があります。`onTriggerEnter(other)`他の衝突器と自分の衝突器がフレーム毎に重なる場合の方法`onTriggerStay(other)`他の衝突器と自分の衝突器が離れている場合の方法`onTriggerExit(other)`。

これらは異なるトリガ方法（以下のコードを参照してください）に対応しています。シナリオ継承クラスで既存のトリガ方法を上書きし、自分の論理を実現します。トリガー方法では他の衝突器をパラメータとして伝達し、開発者が他の衝突器のモデルオブジェクト、属性などを取得するのに便利です。

弾丸コントロールスクリプトコードは以下の通りです。


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




####キューブスクリプトクラス機能の実現

キューブコントロールスクリプトもスクリプトScriptに継承されています。スクリプト機能を追加するための3つのトリガー方法を使用しています。違いは3つの方法で論理が異なります。

立方体の箱の衝突器に弾丸が入る時の方法`onTriggerEnter(other)`において、立方体の箱衝突器から立方体のスクリプトを取得し、その脚本から弾丸の速度と方向を得て、立方体の箱の撃退速度と撃退方向を求め、スクリプトの更新方法では立方体の箱撃退効果をシミュレーションします。

弾の衝突器が立方体の箱の衝突器を離れる時方法`onTriggerExit(other)`立方体の箱の生命値が減り、三発子に当たって、立方体の箱が破壊されて消える。

キューブコントロールのスクリプトコードは以下の通りです。


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




上記の簡単な三つの種類を完成したら、図1に示す効果が見られます。もちろん、射撃ゲームを本当に完成させるためには、このような簡単なことはありません。

