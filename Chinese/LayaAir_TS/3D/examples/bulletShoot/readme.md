

## 3D子弹射击碰撞检测示例



### 需求分析

本章课程主要向初学者们演示3D物体间的碰撞检测的简单运用，在3D引擎1.7.12版发布后，引擎的脚本功能趋于完善，增加了关于碰撞检测的触发方法，开发者们可以方便的使用它们进行类似射击类游戏的开发。

在之前的示例中，我们运用了射线与碰撞器进行碰撞检测，通过碰撞信息的属性判断，实现鼠标交互或者其他碰撞逻辑。但要实现如子弹在移动过程中与场景其他3D物体进行碰撞检测比较麻烦，本章课程中就主要讲解它们的实现方法。

基本需求为：
1、鼠标点击场景的3D空间，创建子弹，并对准鼠标点方向进行射击。

2、子弹创建后，自动根据鼠标点击方向进行飞行，目标点可以是场景中的3D物品，也可以是空白空间。
3、当子弹飞行中碰撞到3D物体后，子弹销毁；如果子弹未击中目标，飞行一段距离后销毁。
4、当场景中物品被子弹击中后，物品根据子弹方向，产生被击退效果，并且减血，当血小于0时，物品销毁。

**Tips：因真正的射击游戏比较复杂，比如需要有枪械模型，枪械枪管根据鼠标移动进行旋转，从枪管中发出射线用于检测碰撞等。本例中为了初学者学习需要，减化了需求，子弹在固定的位置发出，根据鼠标点击确定飞行方向。**

参考效果如下图1

![图1](img/1.gif)<br>（图1）



### 需用的引擎技术方案分析

1、**资源制作：**场景在Unity中进行制作，需在可被击毁的3D物品加入盒型碰撞器组件，目前引擎和插件版本可以导出碰撞器组件（MeshCollider网格碰撞器暂时无法导出，后期将陆续支持），不需要在代码中添加。

子弹暂时放入场景之中，居于摄像机之后，用于克隆创建子弹。子弹作为碰撞检测的发起者，需要添加碰撞器（球型）与刚体组件，在导出时，引擎能自动识别。

2、**碰撞检测原理：**碰撞检测因为引擎优化的原则，分为碰撞发起者与碰撞被动接受者。

碰撞发起者3D模型需要添加“刚体”组件，有刚体组件的模型为碰撞发起者，无刚体组件的3D模型代表碰撞接受者，它们添加到场景后，引擎会自动判断发起者与接受者的碰撞器是否重叠。

因此在本例中，子弹作为碰撞发起者需要添加刚体与碰撞器两个组件，立方体盒子只加碰撞器即可。

3、**脚本触发：**当引擎判断碰撞发起者与接受者的碰撞器重叠后，会查询3D模型是否有脚本组件，如果有，将会根据碰撞的不同阶段去触发脚本的不同方法，类似于发出了各种碰撞事件，去执行不同的回调方法。这些方法包括：碰撞器碰撞时触发方法、碰撞器重叠时逐帧触发方法、碰撞器分离时触发方法。

4、**碰撞器大小设置：**从引擎1.7.12版本开始，碰撞器的大小也可以进行设置了，有的时候需要碰撞器大于或小于3D模型用于碰撞检测，因此在Untiy中，可以根据需要对模型的碰撞器大小进行修改。



在Untiy中创建场景bulletShoot，如图2所示，在立方体盒子上添加碰撞器组件Box Collider，在红色子弹模型上添加Sphere Collider与Rigidbody组件，它们的组件参数采用默认设置即可。

![图2](img/2.png)<br>（图2）



### 功能实现

本示例功能实现可分为三个类进行逻辑编写：

**主控类Laya3D_BulletAttack.ts**，主要用于加载资源、添加子弹与立方体盒子控制脚本，实现鼠标点击事件时创建子弹，生成子弹发射方向等功能。

**子弹脚本类BulletScript.ts**，用于控制子弹飞行，通过脚本中碰撞检测的触发方法，实现判断是否击中及子弹销毁等功能。

**立方体控制脚本CubeScript.ts**，用于判断是否被子弹击中，当被击中时，实现击退效果动画、减血及被摧毁功能。



#### 本例中所需向量数学知识

要充分理解本章内容，在此需要初学者们学习或回顾一下向量的基础知识，我们会用到向量的加减、归一、取模等运算。

三维向量在3D游戏开发中有多种含意，它可以表位置、距离、速度、角度、弧度等。在本例中，如子弹的射击方向就是一个三维向量，从方向向量也可以计算出子弹的速度，这些都需要用向量数学公式。

三维向量基础公式如下：

**A点到B点的方向：AB方向三维向量 = B目标位置三维向量 —  A起始位置三维向量** 

引擎提供方法为：`Vector3.subtract(a:Vector3, b:Vector3, out:Vector3)`。

运用：由3D空间中的两个点的位置，得到一个方向向量，比如子弹飞行方向，攻击的目标点位置向量-子弹当前位置向量。


**AC方向向量 = AB方向向量 + BC方向向量**    

引擎提供方法为：`Vector3.add(ab:Vector3, bc:Vector3, ac:Vector3)`。

AC表示A点到C点的方向向量，AB表示A点到B点方向向量，BC表示B点到C点的方向向量（可画图理解）。


**BC方向向量 = AB方向向量 — AC方向向量**

引擎提供方法为：`Vector3.subtract(ab:Vector3, ac:Vector3, bc:Vector3)`。

BC表示B点到C点的方向向量，AB表示A点到B点方向向量，AC表示A点到C点的方向向量（可画图理解）。


**AB标准方向向量（长度为单位一的向量） = AB方向向量归一化**

引擎提供方法为：`Vector3.normalize(s:Vector3, out:Vector3)`。

运用：任何向量的长度（模）都可以归一化为标准向量，单位为一。比如可以把方向向量归一后，作为速度的标准值，速度设置为归一向量的倍数。


**缩放后向量（长度缩放） = 原始向量 * 实数**

引擎提供方法为：`Vector3.scale(v3:Vector3, num:Number, out:Vector3)`。

根据num的值大小进行缩放，可以生成原始向量的num倍长度的向量。


**向量的长度值 = 开方（向量.x平方 + 向量.y平方 + 向量.z平方）**

引擎提供方法：`Vector3.scalarLength(a:Vector3)`，返回长度

运用：我们可以通过取向量长度来作为距离、速度参考，向量长度最小值为0。





#### 主控制类功能实现

主控类Laya3D_BulletAttack.ts的主要功能为三点：

1. 通过getChildByName()方法在场景中找到立方盒子，为它们分别添加立方体控制脚本CubeScript，用于碰撞检测。

2. 鼠标点击事件中，使用克隆方法创建子弹，这种方法可以将子弹的碰撞器SphereCollider及刚体组件rigidbody一并克隆。
   创建子弹后，为子弹添加子弹控制脚本BulletScript，并使用BulletScript方法setShootDirection(directionV3:Vector3)设置子弹的飞行方向。

3. 子弹的飞行方向通过鼠标点击场景时产生的射线计算后获得。
   鼠标点击3D场景空间由摄像机产生射线，判断射线与场景中的3D模型是否相交（射线碰撞检测），如果相交，那么子弹方向就是相交目标位置与子弹起始位置产生的方向；如果不相交，那么根据射线方向、摄像机位置、子弹初始位置计算子弹飞行的方向。

   主类具体代码如下：

```typescript
class Laya3D_BulletAttack {
    /**3D场景**/
    private scene: Laya.Scene;
    /**3D摄像机**/
    private camera: Laya.Camera;
    /**射线**/
    public ray: Laya.Ray = new Laya.Ray(new Laya.Vector3(), new Laya.Vector3());
    /**鼠标坐标**/
    public mousePos: Laya.Vector2 = new Laya.Vector2();
    /**碰撞信息**/
    public rayCastHit: Laya.RaycastHit = new Laya.RaycastHit();

    /**场景中的初始子弹**/
    public bullet: Laya.MeshSprite3D;
    constructor() {
        //初始化引擎
        Laya3D.init(1000, 500, true);
        Laya.Stat.show();
        //适配模式
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
        //加载3D资源
        Laya.loader.create("LayaScene_bulletShoot/bulletShoot.ls", Laya.Handler.create(this, this.onComplete));

        //提示信息
        var txt: Laya.Text = new Laya.Text();
        txt.text = "3D碰撞检测示例：点击鼠标发射子弹，击中盒子时，盒子会根据子弹发射方向被击退，3发子弹可摧毁盒子！！";
        txt.color = "#FFFF00";
        txt.bold = true;
        txt.fontSize = 20;
        txt.pos(10, 10);
        Laya.stage.addChild(txt);
    }
    private onComplete(): void {
        //创建场景
        this.scene = Laya.loader.getRes("LayaScene_bulletShoot/bulletShoot.ls");
        Laya.stage.addChild(this.scene);
        Laya.stage.setChildIndex(this.scene, 0);

        //获取摄像机
        this.camera = this.scene.getChildByName("Main Camera") as Laya.Camera;
        this.camera.farPlane = 200;

        //			Laya.DebugPanel.init();

        //为场景中的立方体盒子加控制脚本
        var len: number = this.scene._childs.length;
        for (var i: number = 1; i < len; i++) {
            var cube: Laya.MeshSprite3D = this.scene.getChildByName("Cube (" + i + ")") as Laya.MeshSprite3D;
            if (cube) cube.addComponent(CubeScript);
        }

        //获取场景中的子弹用于克隆
        this.bullet = this.scene.getChildByName("bullet") as Laya.MeshSprite3D;
        //未产生子弹时移除克隆参考用子弹
        this.bullet.removeSelf();

        //鼠标控制创建子弹发射
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onShoot);
    }

    /**
     * 子弹发射
     * 基本原理：鼠标点击产生射线，射线如与模型碰撞器相交，则获取碰撞点作为子弹发射方向；
     * 如果未与3D模型相交，则直接使用射线方向作为发射方向。
     */
    private onShoot(): void {
        //克隆一颗子弹用于射击
        var bulletClone: Laya.MeshSprite3D = this.bullet.clone();
        //为子弹加控制脚本
        var script: BulletScript = bulletClone.addComponent(BulletScript) as BulletScript;
        this.scene.addChild(bulletClone);


        //鼠标点击屏幕的位置
        this.mousePos = new Laya.Vector2(Laya.MouseManager.instance.mouseX, Laya.MouseManager.instance.mouseY);
        //鼠标点击屏幕产生射线
        this.camera.viewportPointToRay(this.mousePos, this.ray);
        //射线与3D模型中的碰撞器进行碰撞检测
        Laya.Physics.rayCast(this.ray, this.rayCastHit, 30, 0);

        //-----------在子弹脚本中设置子弹发射方向----------------------
        //射击的方向向量
        var dirV3: Laya.Vector3 = new Laya.Vector3();

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
            // console.log(Laya.Vector3.scalarLength(this.ray.direction));
            //摄像机到鼠标点击处的方向向量
            var aV3: Laya.Vector3 = new Laya.Vector3();
            //根据射线方向向量、摄像机远裁剪值缩放为射线方向原始向量(使用远裁距会有一点误差，但不影响效果)
            Laya.Vector3.scale(this.ray.direction, this.camera.farPlane, aV3);

            //根据摄像机与子弹的位置求出子弹到摄像机的方向向量
            var bV3: Laya.Vector3 = new Laya.Vector3();
            Laya.Vector3.subtract(this.camera.transform.position, this.bullet.transform.position, bV3);

            //射击的方向向量 = 摄像机到鼠标点击处的方向向量 +子弹到摄像机的方向向量
            Laya.Vector3.add(aV3, bV3, dirV3);

            //设置子弹控制脚本中发射方向
            script.setShootDirection(dirV3);
        }
    }
}
new Laya3D_BulletAttack();
```



#### 子弹控制脚本类功能实现

子弹控制脚本继承于脚本Script，引擎1.7.12版增加了脚本绑定者的碰撞检测触发方法，当然，前提是绑定者需要有碰撞器组件，否则无法触发成功。

当场景中的其它碰撞器与脚本绑定模型的碰撞器发生重叠，会触发多种状态，并根据状态去触发不同的方法。

触发状态共有三种，包括：其它碰撞器与自己碰撞器碰撞时方法`onTriggerEnter(other:Collider)`、其它碰撞器与自己碰撞器逐帧重叠时方法`onTriggerStay(other:Collider)`、其它碰撞器与自己碰撞器相互离开时方法`onTriggerExit(other:Collider)`。

它们对应着不同的触发方法（请查看下例代码），可以在脚本继承类中去覆盖原有触发方法，并在其中实现自己的逻辑。触发方法中还会把其它碰撞器作为参数传递过来，方便开发者获取其它碰撞器的模型对象、属性等。

子弹控制脚本代码如下：

```typescript
class BulletScript extends Laya.Script {
    /**被绑定的子弹对象**/
    private bullet: Laya.MeshSprite3D;
    /**子弹生命周期**/
    private life: number = 200;
    /**子弹发射的速度（方向）**/
    public speedV3: Laya.Vector3 = new Laya.Vector3();
    /*
    子弹控制脚本
    */
    constructor() {
        super();
    }
    /**
		 * 脚本实例化完成载入后调度
		 * @param owner 脚本绑定的3D物体
		 */
    public _load(owner: Laya.ComponentNode): void {
        //获取子弹与子弹位置
        this.bullet = this.owner as Laya.MeshSprite3D;
    }

    /**
     * 设置子弹射击方向并计算速度
     * @param directionV3
     */
    public setShootDirection(directionV3: Laya.Vector3): void {
        /****
         * 注：
         * 三维向量即是位置、方向，也可以是速度，但速度需要一个统一的参考衡量标准，比如“N*标准速度值/帧”或
         * “N*标准速度值/毫秒”，它类似于“N*米/帧”。
         * 而我们得到的方向向量，它的大小不一，无法作为标准速度值使用，这个时候可用Vector3.normalize()方法
         * 把任一向量归一化，产生单位为一的向量作为标准速度值，再把它进行缩放作为不同物体的速度来使用，比如
         * 0.2倍标准速度值，1.5倍标准速度值等，可使用Vector3.scale()方法缩放。
         ****/
        //将方向向量归一成单位为一的方向速度向量(在LayaAir中相当于1米的长度)
        Laya.Vector3.normalize(directionV3, this.speedV3);
        console.log("\n子弹攻击速度(方向)：", this.speedV3.elements)

        //用缩放方法去调整发射速度，0.2倍标准速度（注：子弹速度过快，可能会越过场景中物品，不发生碰撞！）
        //			Vector3.scale(speedV3,0.2,speedV3);
    }

    /**
     * 脚本帧循环更新
     */
    public _update(state: Laya.RenderState): void {
        //子弹位置更新
        this.bullet.transform.translate(this.speedV3, false);
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
    public onTriggerEnter(other: Laya.Collider): void {
    }

    /**
     * 当其他碰撞器进入绑定物体碰撞器后逐帧触发（子弹进入物品时）
     * 注：如相对移动速度过快，可能直接越过
     */
    public onTriggerStay(other: Laya.Collider): void {
    }
    /**
     * 当其他碰撞器退出绑定物体碰撞器时逐帧触发（子弹穿出物品时）
     * 注：如相对移动速度过快，可能直接越过
     */
    public onTriggerExit(other: Laya.Collider): void {
        //一帧后销毁子弹（目前脚本中直接销毁绑定对象会报错，后期版本解决此问题）
        Laya.timer.frameOnce(1, this,function(){ this.bullet.destroy() });
    }
}
```



#### 立方体脚本类功能实现

立方体控制脚本也继承于脚本Script，同样用到了新增脚本功能的三种触发方法，区别是在三种方法中的逻辑有所不同。

当子弹碰撞器进入立方体盒子碰撞器时方法`onTriggerEnter(other:Collider)`中，根据立方体盒子碰撞器获取到立方体的脚本，从它的脚本中获得子弹速度和方向，用于立方体盒子的击退速度和击退方向，并且在脚本更新方法中模拟立方体盒子被击退的效果。

当子弹碰撞器离开立方体盒子碰撞器时方法`onTriggerExit(other:Collider)`，立方体盒子生命值减少，被三发子弹击中后，立方体盒子被击毁消失。

立方体控制脚本代码如下：

```typescript
class CubeScript extends Laya.Script {
    /**被绑定的立方体对象**/
    public cube: Laya.MeshSprite3D;
    /**是否被攻击**/
    private isAttacked: Boolean = false;
    /**盒子被击退的标准速度（方向）**/
    public repelledV3: Laya.Vector3 = new Laya.Vector3();
    /**盒子生命周期**/
    public life: number = 60;
    /**
     * 立体体盒子控制脚本
     */
    constructor() {
        super();
    }
    /**
		 * 脚本实例化完成载入后调度
		 * @param owner 脚本绑定的3D物体
		 */
    public _load(owner: Laya.ComponentNode): void {
        //获取被绑定对象
        this.cube = this.owner as Laya.MeshSprite3D;
    }
    /**
     * 当其他碰撞器进入绑定物体碰撞器时触发（子弹击中盒子时）
     * 注：如相对移动速度过快，可能直接越过
     */
    public onTriggerEnter(other: Laya.Collider): void {
        //获取其他碰撞器绑定的模型
        var sp3D: Laya.MeshSprite3D = other.owner as Laya.MeshSprite3D;
        //获取子弹对象模型脚本
        var script: BulletScript = sp3D.getComponentByType(BulletScript) as BulletScript;
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
    public onTriggerStay(other: Laya.Collider): void {
        var sp3D: Laya.MeshSprite3D = other.owner as Laya.MeshSprite3D;
        console.log("2 子弹穿过时位置(方向):", sp3D.transform.position.elements);
    }

    /**
     * 当其他碰撞器退出绑定物体碰撞器时逐帧触发（子弹穿出盒子时）
     * 注：如相对移动速度过快，可能直接越过
     */
    public onTriggerExit(other: Laya.Collider): void {
        //获取其他碰撞器绑定的模型
        var sp3D: Laya.MeshSprite3D = other.owner as Laya.MeshSprite3D;
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
    public _update(state: Laya.RenderState): void {
        //被攻击状态下，盒子产生击退效果
        if (this.isAttacked) {
            //根据击退方向和速度移动
            this.cube.transform.translate(this.repelledV3, false);
            // console.log("击退位置变化：",(this.cube.transform.position.clone() as Laya.Vector3).elements);
            //击退速度逐步减小
            Laya.Vector3.scale(this.repelledV3, 0.3, this.repelledV3);
            //当后退各方向速度小于0.01时，击退状态停止
            if (Laya.Vector3.scalarLength(this.repelledV3) < 0.01) {
                this.isAttacked = false;
            }
        }
    }
}
```



完成上述简单的三个类后，我们可以看到图1所示效果，当然，要真正完成一个射击游戏，不会如此简单，本例代码主要为初学者们打开思路，可以举一反三。

