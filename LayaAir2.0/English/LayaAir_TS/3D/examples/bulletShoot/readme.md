## 3D子弹射击碰撞检测示例



###requirement analysis

This chapter mainly demonstrates the simple application of collision detection between 3D objects to beginners. After the release of version 1.7.12 of the 3D engine, the script function of the engine tends to be perfect, and the trigger method of collision detection is added. Developers can easily use them to develop similar shooting games.

In the previous example, we used ray and collider for collision detection, and realized mouse interaction or other collision logic by judging the attributes of collision information. But in order to realize collision detection between bullets and other 3D objects in the scene in the course of moving, this chapter mainly explains their implementation methods.

The basic needs are:
1. Click on the 3D space of the scene, create bullets, and shoot in the direction of the mouse point.

2. After the bullet is created, it will fly automatically according to the direction of mouse click. The target point can be either a 3D object in the scene or a blank space.
3. When a bullet hits a 3D object in flight, the bullet is destroyed; if the bullet misses the target, it will be destroyed after a long flight.
4. When the object in the scene is hit by a bullet, the object is repulsed according to the direction of the bullet, and the blood is reduced. When the blood is less than 0, the object is destroyed.

**Tips: Because real shooting games are more complex, such as the need for a gun model, the gun barrel rotates according to the movement of the mouse, emits radiation from the barrel for collision detection, etc. In this case, in order to meet the learning needs of beginners, the demand is reduced. Bullets are fired at a fixed position and the flight direction is determined by clicking on the mouse.**

The reference effect is shown in Figure 1 below.

![图1](img/1.gif)<br> (Fig. 1)



###Analysis of Engine Technical Scheme Required

1.**Resource production:**Scenarios are made in Unity. Box-type collider components are added to destroyed 3D items. Current engine and plug-in versions can export collider components (Mesh Collider grid collider can not be exported for the time being, and will be supported later) without adding them to the code.

Bullets are temporarily placed in the scene, behind the camera, for cloning and creating bullets. As the initiator of collision detection, bullets need to add colliders (spheres) and rigid body components. When they are exported, the engine can recognize them automatically.

2.**Collision detection principle:**Because of the principle of engine optimization, collision detection is divided into collision initiator and passive receiver.

The collision initiator 3D model needs to add "rigid body" components. The model with rigid body components is the collision initiator. The 3D model without rigid body components represents the collision acceptor. When they are added to the scene, the engine automatically determines whether the initiator and the receiver colliders overlap.

Therefore, in this case, as the initiator of the collision, the bullet needs to add two components, the rigid body and the collider, and the cube box can only add the collider.

3.**Script trigger:**When the engine determines that the collider of the collision initiator and the acceptor overlaps, it will query whether there is script component in the 3D model. If there is, it will trigger different methods of script according to different stages of collision, similar to sending out various collision events to execute different callback methods. These methods include: triggering method when Collider collides, frame-by-frame triggering method when Collider overlaps, and triggering method when Collider separates.

4.**Collider size settings:**Starting with engine version 1.7.12, collider size can also be set. Sometimes collider size is larger or smaller than 3D model for collision detection. Therefore, in Untiy, the collider size of the model can be modified as needed.



Create the scene bulletShoot in Untiy. As shown in Figure 2, add the collider component Box Collider to the cube box and the Sphere Collider and Rigidbody components to the red bullet model. Their component parameters are set by default.

![图2](img/2.png)<br>（图2）







###Function realization

The functional implementation of this example can be divided into three categories for logical writing:

** Master control class Laya3D_BulletAttack.ts**It is mainly used for loading resources, adding bullets and cube box control scripts, realizing the functions of creating bullets and generating bullet launching direction when mouse clicks on events.****
****
**BulletScript.ts**, which is used to control the flight of bullets. Through the trigger method of collision detection in the script, the function of judging whether the bullets are hit and destroying the bullets can be realized.****
****
**CubeScript.ts**It is used to judge whether a bullet hit or not. When hit, it can animate the repelling effect, reduce blood and destroy.****



####Vector Mathematics Knowledge Required in this Example

To fully understand the content of this chapter, it is necessary for beginners to learn or review the basic knowledge of vectors, we will use vector addition and subtraction, normalization, modulus and other operations.

Three-dimensional vector has many meanings in the development of 3D games. It can show position, distance, speed, angle, radian and so on. In this case, for example, the shooting direction of a bullet is a three-dimensional vector, and the velocity of a bullet can also be calculated from the direction vector, which requires the use of vector mathematical formulas.

The basic formulas of three-dimensional vectors are as follows:
****
**Direction from Point A to Point B: AB Direction 3-D Vector = B Target Position 3-D Vector - A Starting Position 3-D Vector** ****

The engine provides methods for:`Vector3.subtract(a:Vector3, b:Vector3, out:Vector3)`。

Application: From the position of two points in 3D space, we can get a direction vector, such as the direction of bullet flight, the position vector of target point attacked - the current position vector of bullet.
****

**AC Direction Vector = AB Direction Vector + BC Direction Vector**    ****

The engine provides methods for:`Vector3.add(ab:Vector3, bc:Vector3, ac:Vector3)`。

AC represents the direction vector from point A to point C, AB represents the direction vector from point A to point B, and BC represents the direction vector from point B to point C.
****

**BC Direction Vector = AB Direction Vector - AC Direction Vector******

The engine provides methods for:`Vector3.subtract(ab:Vector3, ac:Vector3, bc:Vector3)`。

BC denotes the direction vector from point B to point C, AB denotes the direction vector from point A to point B, AC denotes the direction vector from point A to point C.
****

**AB Standard Direction Vector (Vector of Unit Length) = Normalization of AB Direction Vector******

The engine provides methods for:`Vector3.normalize(s:Vector3, out:Vector3)`。

Usage: The length (module) of any vector can be normalized into a standard vector in one unit. For example, after normalizing the direction vector, the velocity can be set as a multiple of the normalized vector as the standard value of the velocity.
****

**Scaled Vector (Length Scaling) = Original Vector * Real Number******

The engine provides methods for:`Vector3.scale(v3:Vector3, num:Number, out:Vector3)`。

The num-fold length of the original vector can be generated by zooming the value of num.
****

**Vector length = square (vector. x square + vector. y square + vector. Z square)**

Engine Provision Method:`Vector3.scalarLength(a:Vector3)`Return length

Application: We can use orientation length as distance and speed reference, and the minimum value of vector length is 0.





####Function Implementation of Main Control Class

The main functions of the main control class Laya3D_BulletAttack.ts are as follows:

1. Cube boxes are found in the scene by getChildByName () method, and cube control scripts CubeScript are added to them for collision detection.

2. In the mouse click event, the bullet is created by cloning method, which can clone the collider Sphere Collider and rigid body of the bullet together.
After the bullet is created, the bullet control script BulletScript is added to the bullet, and the bullet's flight direction is set using the BulletScript method setShootDirection (directionV3: Vector3).

3. The direction of the bullet's flight is obtained by calculating the ray produced when the mouse clicks on the scene.
When the mouse clicks on the 3D scene space, the camera generates rays to determine whether the rays intersect with the 3D model in the scene (ray collision detection). If the rays intersect, the bullet direction is the direction of intersecting the target position and the bullet starting position. If not, the bullet flying direction is calculated according to the ray direction, the camera position and the bullet initial position.

The main class code is as follows:


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




####Function Implementation of Bullet Control Script Class

Bullet control scripts inherit from scripts. Engine version 1.7.12 adds a collision detection trigger method for script binders. Of course, the prerequisite is that the binder needs a collider component, otherwise it cannot trigger successfully.

When the other colliders in the scene overlap with the colliders in the script binding model, they trigger multiple states and trigger different methods according to the states.

There are three kinds of trigger states, including the method of collision between other colliders and their own colliders.`onTriggerEnter(other:Collider)`The method of overlapping other colliders with their own colliders frame by frame`onTriggerStay(other:Collider)`The method of separating other colliders from their own Colliders`onTriggerExit(other:Collider)`。

They correspond to different triggering methods (see the code below). They can override the original triggering methods in script inheritance classes and implement their own logic in them. In the triggering method, other colliders are also passed as parameters to facilitate developers to obtain the model objects and attributes of other colliders.

The bullet control script code is as follows:


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




####Function Implementation of Cube Script Class

The cube control script is also inherited from the script script. Three triggering methods of the new script function are also used. The difference is that the logic of the three methods is different.

Method of Bullet Collider Entering Cube Box Collider`onTriggerEnter(other:Collider)`According to the script of the cube box collider, the bullet velocity and direction are obtained from the script, which is used for the repulsion speed and direction of the cube box, and the effect of the cube box being repulsed is simulated in the script update method.

Method of Bullet Collider Leaving Cube Box Collider`onTriggerExit(other:Collider)`The cube box's life value decreases. After being hit by three bullets, the cube box is destroyed and disappeared.

The cube control script code is as follows:


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




After completing the above three simple classes, we can see the effect shown in Figure 1. Of course, to really complete a shooting game, it will not be so simple. This example code is mainly for beginners to open up ideas, you can draw inferences from one another.

