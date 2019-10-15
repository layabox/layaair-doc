#Animation

###### *version :2.1.0beta   Update:2019-6-13*

####Acquisition d 'un ensemble d' animation

Copie de ressources exportées vers un projet`bin/res`Dans le Répertoire, les ressources de rôle sont chargées par Code.Si vous le chargez directement sur la scène, vous verrez que l 'animation sera automatiquement diffusée.Comment va - t - on contrôler la diffusion des animations?

La classe sprite3d du moteur layaair 3D est disponible.`getComponent()`Procédé pour obtenir un composant sur un modèleLe modèle avec animation a donné par défaut à l 'ensemble animateur animator lors de sa création, de sorte que nous pouvons l' obtenir en référence au code suivant.


```typescript

//获取角色动画组件
var ani= role3D.getChildAt(0).getComponent(Laya.Animator);
```


Affiche le fichier LH, l 'ensemble d' animation est lié à un sous - objet du modèle et est donc utilisé`getChildAt(0)`Pour obtenir un modèle d 'objet secondaire à travers celui - ci.Et par`getComponent(Laya.Animator)`Procédé d 'acquisition d' un composant d 'animation

**Il y a parfois dans les fichiers -La plupart des niveaux des composants d 'animation sont convenus à l' avance avec les beaux - arts.L 'ensemble d' animation peut être obtenu après l 'obtention du modèle, par exemple par getchildat () ou getchildbyname ().**

Une autre option consiste à ouvrir. LS ou LH pour voir les relations hiérarchiques avec le modèle d 'ensemble d' animation avant d 'acquérir l' ensemble d 'animation, puis à obtenir le modèle et l' ensemble d 'animation.

####Commande de lecture

Quand vous aurez l 'ensemble d' animation, pourquoi ne diffuser qu 'une seule action?Il existe deux façons de commander et de Commuter les actions.

Et dans ce cas, l 'animation n' est pas séparée dans l 'Unity et nous utilisons l' animation par défaut du modèle**Take 001**, l 'insert ne produit qu' un seul fichier d 'analyse d' animation au format LANI.

La commande de lecture d 'un segment de l' animation nécessite donc l 'ajout d' un clip d 'animation personnalisé dans le Code, et la mise en oeuvre d' un coefficient de trame de début et de fin dans le clip d 'animation.

Visualiser l 'ensemble animé d' animator`play() `Les paramètres méthodologiques spécifiques sont les suivants:

[] (IMG / 1.png) <br > (Figure 1)

Si une trame de l 'animation doit être lue sur une trame, un état d' animation supplémentaire peut être créé sur la base de l 'animation originale (fragment)`AnimatorState`Le nouveau groupe d'animator.`addState() `Un procédé d 'exemple permet à un développeur de créer un clip d' animation et de définir un nom, puis de le reproduire par le biais du procédé play (nom de clip d 'animation).Quand on saura tout ça, on diffusera l 'animation.Code:

**Si l 'animation est cyclique, les paramètres de sélection peuvent être définis dans les propriétés d' animation de l 'éditeur Unity, le moteur d' exportation suivra ses paramètres pour la lecture d 'animation.Voir les options loop Time dans les figures 5 et 6!Ou créer l 'état animé d' animatorstate**


```typescript

//获取精灵
var monkey = Laya.Loader.getRes("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh") as Laya.Sprite3D;

this.scene.addChild(monkey);
//获取角色动画组件
var ani = monkey.getChildAt(0).getComponent(Laya.Animator) as Laya.Animator;
//创建一个动画动作状态
var state1 = new Laya.AnimatorState();
//设置动作状态的名称
state1.name = "hello";
//设置动作状态播放的起始时间（起始时间与结束时间的设置为0-1的百分比数值）  要截取的时间点 / 动画的总时长
state1.clipStart = 10/40;
//设置动作状态播放的结束时间
state1.clipEnd = 20/40;
//得到默认动画赋值给Clip（getDefaultState默认动画为Unity中animation的数组顺序0下标的动画）
state1.clip = ani.getDefaultState().clip;
//动画播放是否循环
state1.clip.islooping = true;
//添加动画状态到动画组件里
this.ani.addState(state1);
//播放动画
this.ani.play("hello");
```


Après l 'édition, l' effet est le suivant, seuls les clips d 'animation stand debout de 10 à 20 trames sont diffusés en boucle.

[] (IMG / 2.gif) <br > (Figure 2)

####Définition d 'un montage d' animation dans Unity

L 'animation peut être segmentée dans l' unité et les fragments du montage peuvent être nommés.Lors de la commande des ressources exportées, un transfert d 'animation peut être effectué par le nom pour faciliter l' utilisation par les développeurs.(cette méthode permet d 'ajouter des fichiers d' analyse animés à l 'exportation des ressources, ce qui augmente le nombre d' accès à http et de déterminer de quelle manière les développeurs peuvent choisir en fonction de la situation réelle)

Les fragments d'animation de l'Unity sont divisés comme suit:

Sélectionnez le fichier de modèle dans le gestionnaire de ressources, à droite**Inspector**Sélection dans l 'interface**Annexes**, une animation par défaut apparaît.**Take 001**, cliquez sur un nom personnalisé édité, cliquez sur un signe pour ajouter un fragment d 'animation et modifier la trame de début et de fin du fragment (fig. 3).

Si vous avez besoin d 'une lecture en boucle d' animation, cochez le diagramme suivant**Loop Time**Options

[] (IMG / 3.ping) <br > (Figure 3)

Dans cet exemple, quatre actions au total sont ajoutées à quatre segments d 'animation en fonction du nombre de trames d' animation fournies par les beaux - arts (fig. 4).

[] (IMG / 4.png) <br > (Figure 4)

Une fois les modifications effectuées, les fichiers d 'animation correspondants sont ajoutés au modèle de gestionnaire de ressources, de sorte qu' il est nécessaire de modifier le Contrôleur d 'animation pour ajouter les nouveaux fragments d' animation au Contrôleur d 'animation, faute de quoi il n' est pas possible d 'exporter un fichier d' analyse complet de ressources d 'animation (fig. 5).

[] (IMG / 5.png) <br > (Figure 5)

Après l 'exécution de l' étape précédente, les ressources exportées génèrent également quatre fichiers d 'analyse d' animation LANI.

Modifier le Code de l 'exemple en utilisant le nom de l' animation de lecture, l 'effet étant le suivant (fig. 6).


```typescript

onComplete(){
//.................
		var monkey = Laya.Loader.getRes("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh") as Laya.Sprite3D;
        //加载到场景
       	scene.addChild(monkey);
        //让摄影机指向角色
        camera.transform.lookAt(monkey.transform.position,new Laya.Vector3(0,1,0));
    	//获取动画组件
    	var ani = monkey.getComponent(Laya.Animator) as Laya.Animator;
		//播放攻击状态
        ani.play("attack");
		//等待动画播放完成
        Laya.timer.frameLoop(1,this,function(){
            //如果当前播放state已经播放完了一次
            if(ani.getCurrentAnimatorPlayState().normalizedTime >= 1){
                //回到站立状态
                ani.play("stand");
            } 
        });
}

```


[] (IMG / 6.gif) <br > (Figure 6)
