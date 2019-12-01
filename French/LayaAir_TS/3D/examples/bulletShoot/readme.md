##Exemple de détection d 'impact de balles 3D



###Analyse des besoins

Le cours de ce chapitre montre aux débutants la simplicité de l 'application de la détection de collision entre objets 3D.

Dans l 'exemple précédent, nous avons utilisé des rayons et des collisions pour détecter des collisions et pour réaliser une interaction de souris ou d' autres logiques de collision en déterminant les propriétés des informations de collision.Toutefois, pour que les balles puissent être détectées en cours de déplacement avec d 'autres objets 3D de la scène, il est essentiel de les mettre en œuvre dans le cadre du présent chapitre.

Les besoins fondamentaux sont les suivants:
La souris clique sur l 'espace 3D de la scène, crée la balle et tire dans le sens du point de la souris.

Après la création de la balle, elle vole automatiquement selon la direction du clic de la souris, le point cible peut être un objet 3D dans la scène ou un espace vide.
Lorsque la balle a heurté un objet 3D en vol, elle a été détruite; si la balle n'a pas touché la cible, elle a été détruite à une certaine distance en vol.
Lorsque l 'objet a été touché par une balle dans la scène, l' article produit un effet de repli selon la direction de la balle et réduit le sang et détruit l 'article lorsque le sang est inférieur à 0.

**Tips: en raison de la complexité des vrais jeux de tir, tels que la nécessité d 'avoir un modèle d' arme à feu, le canon tourne en fonction du Mouvement de la souris et émet des rayons depuis le canon pour détecter les collisions, etc.Dans ce cas, la demande a été réduite pour répondre aux besoins des débutants en matière d 'apprentissage, les balles ont été émises à une position fixe et la direction du vol a été déterminée en fonction du clic de la souris.**

Figure 1

![图1](img/1.gif)<br>（图1）







###Analysis of Engine technique

1,0**Production de ressources**La scène est produite à l 'Unity et nécessite l' ajout d 'un ensemble collimateur en boîte à l' article 3D qui peut être détruit.

La balle a été placée temporairement dans la scène, après la caméra, et utilisée pour cloner les balles.En tant que initiateur de la détection de collision, la balle nécessite l 'ajout d' un collisionneur (sphérique) et d 'un composant rigide, ce qui permet d' identifier automatiquement le moteur lors de son exportation.

Deux.**Détection de collision**La détection de collision est divisée entre l 'initiateur de collision et le destinataire passif de la collision en raison du principe d' optimisation du moteur.

Le modèle 3D de l 'initiateur de collision nécessite l' ajout d 'un composant « rigide », le modèle 3D de l' ensemble rigide étant celui de l 'initiateur de collision et le modèle 3D de l' ensemble non rigide représentant le bénéficiaire de l 'impact.

Ainsi, dans ce cas, une balle, en tant qu 'initiateur d' une collision, nécessite l 'ajout de deux éléments rigides et d' un collisionneur, la boîte cubique n 'étant équipée que d' un collisionneur.

Trois.**Script trigger:**Lorsque le moteur détermine que l 'initiateur de la collision se chevauche avec l' appareil de collision du destinataire, on demande si le modèle 3D comporte des éléments de script et, dans l 'affirmative, si différents procédés de déclenchement du script sont utilisés en fonction des différentes phases de la collision, de même que divers événements de collision et différents procédés de régression.Ces procédés comprennent un procédé de déclenchement en cas de collision d 'un collisionneur, un procédé de déclenchement par trame en cas de chevauchement d' un collisionneur, et un procédé de déclenchement en cas de séparation d 'un collisionneur.

Quatre,**Taille du collisionneur:**À partir de la version 1.7.12 du moteur, la taille du collisionneur peut également être réglée et, dans certains cas, un modèle 3D de plus ou moins grand collisionneur peut être nécessaire pour la détection de collision, de sorte que, dans untiy, la taille du collisionneur du modèle peut être modifiée en fonction des besoins.



Créer une scène bulletshoot dans untiy, comme le montre la figure 2, ajouter un composant Collider Box Collider sur une boîte cubique et des composants Sphere Collider et rigidbody sur un modèle de cartouche rouge dont les paramètres sont définis par défaut.

![图2](img/2.png)< br > (Figure 2)



###Réalisation fonctionnelle

La réalisation de cette fonction d 'exemple peut être divisée en trois catégories:

* * laya3d 'u Bulletin attack.ts**, principalement pour charger des ressources, ajouter des balles et des scripts de contrôle de boîtes cubiques, réaliser la création de balles lors de l 'événement de cliquer sur la souris, créer la direction de l' impact des balles et ainsi de suite.****
****
**Balles script.ts**Pour commander le vol d 'une balle, il est possible de déterminer si une balle a été touchée ou détruite par un procédé de déclenchement de détection de collision dans un script.****
****
**Cubescript.ts**Pour déterminer s' il a été touché par une balle, on obtient une fonction d 'animation, de réduction de sang et de destruction à effet de recul.****



#### 本例中所需向量数学知识

Pour bien comprendre le contenu de ce chapitre, il faut que les débutants apprennent ou revoient les connaissances de base des vecteurs, et nous utilisons des opérations telles que l 'addition, l' unification, la modélisation, etc.

Le vecteur tridimensionnel a de multiples connotations dans le développement du jeu 3D, il peut montrer la position, la distance, la vitesse, l 'angle, l' arc, etc.Dans ce cas, si la direction de tir d 'une balle est un vecteur tridimensionnel, la vitesse de la balle peut être calculée à partir de ce vecteur, ce qui nécessite une formule mathématique de vecteur.

La formule de base du vecteur 3D est la suivante:
****
**Direction des points a à B: vecteur 3D dans la direction AB = vecteur 3D dans la position cible B - vecteur 3D dans la position de départ a** ****

Les moteurs sont fournis par les moyens suivants:`Vector3.subtract(a:Vector3, b:Vector3, out:Vector3)`".

Application: à partir de la position de deux points dans l 'espace 3D, on obtient un vecteur de direction tel que la direction de vol de la balle, le vecteur de position du point cible de l' attaque - le vecteur de position actuel de la balle.
****

**Vecteur de direction AC = vecteur de direction ab + vecteur de direction BC**    ****

Les moteurs sont fournis par les moyens suivants:`Vector3.add(ab:Vector3, bc:Vector3, ac:Vector3)`".

L 'AC représente le vecteur de direction des points a à C, l' ab le vecteur de direction des points a à B et la BC le vecteur de direction des points b à C (compréhensible par dessin).
****

**Vecteur de direction CB = vecteur de direction AB - vecteur de direction AC******

Les moteurs sont fournis par les moyens suivants:`Vector3.subtract(ab:Vector3, ac:Vector3, cb:Vector3)`".

La BC représente le vecteur de direction entre le point B et le point C, l 'ab le vecteur de direction entre le point A et le point B et l' AC le vecteur de direction entre le point A et le point C (compréhensible par dessin).
****

**Vecteur de direction standard AB (vecteur de longueur unitaire) = vecteur de direction ab normalisé******

Les moteurs sont fournis par les moyens suivants:`Vector3.normalize(s:Vector3, out:Vector3)`".

Application: la longueur de tout vecteur (module) peut être normalisée en un vecteur standard.Par exemple, le vecteur directionnel peut être intégré en tant que valeur standard de la vitesse, la vitesse étant définie comme un multiplicateur du vecteur unique.
****

**Vecteur postérieur à l 'échelle (échelle de longueur) = vecteur original * Nombre réel******

Les moteurs sont fournis par les moyens suivants:`Vector3.scale(v3:Vector3, num:Number, out:Vector3)`".

L 'étalement est effectué en fonction de la taille de valeur du num, ce qui permet de générer un vecteur dont la longueur est multipliée par le nombre du vecteur original.
****

**Longueur du vecteur = ouverture (vecteur. X carré + vecteur. Y carré + vecteur. Z carré) * *

Procédé de fourniture de moteur`Vector3.scalarLength(a:Vector3)`, renvoie la longueur

Utilisez & ‧‧;: Nous pouvons utiliser la longueur vectorielle comme référence de distance, de vitesse et de longueur vectorielle pour une valeur minimale de 0.





####Implementation of Main Control class

Les principales fonctions de la classe principale laya3d du Bulletin attack.ts sont les suivantes:

Des boîtes cubes ont été trouvées dans la scène au moyen de la méthode getchildbyname () et des scripts cubescript ont été ajoutés à ces boîtes pour la détection de collision.

En cas de clic de souris, la cartouche est créée par clonage, ce qui permet de cloner le collimateur de la cartouche, spherecollider, et son composant rigidbody.
Après la création de la balle, un script de commande de balles a été ajouté à la cartouche et la direction du vol de la balle a été définie à l'aide de la méthode bulletscript.

La direction des balles est calculée à partir des rayons produits par le clic de souris sur la scène.
La souris clique sur l 'espace de scène 3D pour générer des rayons à partir de la caméra afin de déterminer si les rayons et le modèle 3D dans la scène entrent en contact (détection de collision avec les rayons) et, dans l' affirmative, si la direction de la balle est la direction générée par la position de La cible et la position initiale de la balle.

Les codes spécifiques de la catégorie principale sont les suivants:


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




####Mise en oeuvre de la fonction script de commande de balles

Le script de commande de balles est hérité du script, et la version 1.7.12 du moteur ajoute une méthode de déclenchement de détection de collision pour les attachés de script, à condition, bien entendu, que ceux - ci aient besoin d 'un ensemble collisionneur pour pouvoir déclencher avec succès.

Lorsque d 'autres impacts dans la scène se chevauchent avec les impacts du modèle de fixation de script, plusieurs états sont déclenchés et différents procédés sont déclenchés en fonction de l' état.

L 'état de déclenchement comprend trois sortes, dont: un procédé de collision d' autres impacteurs avec leurs propres impacts`onTriggerEnter(other:Collider)`Procédé de synchronisation de trames d 'autres impacts avec leurs propres impacts`onTriggerStay(other:Collider)`Procédé de séparation d 'autres impacteurs et de leurs propres impacteurs`onTriggerExit(other:Collider)`".

Ils correspondent à différents procédés de déclenchement (veuillez consulter le Code de l 'exemple suivant) et peuvent recouvrir le procédé de déclenchement antérieur dans la catégorie de succession de script et réaliser sa propre logique.D 'autres impacts sont également transmis comme paramètres dans le procédé de déclenchement afin de faciliter l' acquisition par l 'développeur d' objets de modèle, d 'attributs, etc., d' autres impacts.

Code du script de contrôle des balles:


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




####Réalisation de fonctions de script cubique

Le script de commande cubique est également hérité du script, de même que trois procédés de déclenchement de fonctions de script supplémentaires, la différence étant que la logique est différente dans les trois procédés.

Procédé de percussion d 'une cartouche dans un Collisionneur de boîtier cubique`onTriggerEnter(other:Collider)`Dans l 'invention, la vitesse et la direction de la balle sont obtenues à partir du script du cube à partir duquel le Collisionneur de boîtier cubique obtient le script du cube, utilisées pour la vitesse de recul et la direction de recul de la boite cubique, et l' effet de la boite cubique est simulé dans le procédé de mise à jour de script.

Procédé de sortie d 'un Collisionneur de boîtier cubique`onTriggerExit(other:Collider)`Après avoir été touché par trois balles, la boîte cube a été détruite et disparue.

Code de script de contrôle cubique:


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




Après les trois catégories simples ci - dessus, on peut voir l 'effet indiqué à la figure 1, bien entendu, pour vraiment finir un jeu de tir, le Code de cet exemple est surtout ouvert à la réflexion des débutants, peut être un peu plus ou moins.

