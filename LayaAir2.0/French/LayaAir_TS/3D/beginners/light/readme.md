#Source lumineuse layaair3d

La lumière est importante dans un monde en 3D, les objets tridimensionnels produisant des variations stéréoscopiques de lumière, des variations de couleur, des projections, etc. peuvent être obtenus par réglage de lumière.

##Luminaire

Les types d 'éclairage varient, les différentes sources de lumière présentent des effets différents, des paramètres différents peuvent être définis et, dans le projet 3D créé par l' IDE, nous pouvons modifier le Code pour visualiser différents types d 'effet lumineux.

###Point light

La lumière de point est une source de lumière qui émet de la lumière dans les quatre coins du globe, également connue sous le nom de lumière omnidirectionnelle ou sphérique.


```typescript

//创建点光
var light:Laya.PointLight = scene.addChild(new Laya.PointLight()) as Laya.PointLight;
//移动灯光位置
light.transform.translate(new Laya.Vector3(-3,5,0));
//设置点光照亮范围
light.range = 6;
```


Range to set the range of Spot source, the same range of Spot Light, the Numerical scale and the Scale of Light, The Figure 1 is black where the light Range is not illuminated, and the light Range is out of the distance between light and Model.

![1](img/1.png)(Figure 1)![2](img/2.png)(Figure 2) < / BR >

​

###Parallel light

La différence entre la lumière parallèle et la lumière ponctuelle est plus grande, elle a une direction fixe qui peut être définie par une valeur d 'arc et qui n' a pas d 'atténuation ni de plage d' éclairage pour éclairer tous les modèles de la scène.La lumière solaire est souvent utilisée dans le monde 3D pour simuler une direction fixe.


```typescript

//创建平行光
var light:Laya.DirectionLight = scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
//设置平行光的方向
 light.transform.worldMatrix.setForward(new Laya.Vector3(0,-1,0));
```


La direction de la lumière parallèle setforward représente, respectivement, la direction de l 'axe X, y et Z, le nombre négatif de l' axe et le nombre positif de l 'axe positif, la plage de valeurs allant de - 1 à 0 - 1, et au - delà de la plage de - 1 ou 1, dans laquelle les débutants peuvent établir une valeur pour observer les changements de direction.

###Spotlight

La lumière concentrée est la lumière émise à partir d 'une source de lumière spécifique, telle que lampe de poche, lampe de scène, etc.La zone d'éclairage s'est progressivement agrandie en fonction de la distance, de même que le périmètre de la zone d'éclairage des collègues.


```typescript

//添加聚光
var light : Laya.SpotLight = scene.addChild(new Laya.SpotLight()) as Laya.SpotLight;
//设置聚光的位置
light.transform.position = new Laya.Vector3(0,5,0);	
//设置聚光的方向
light.transform.worldMatrix.setForward(new Laya.Vector3(0.15,-1,0));
//设置聚光范围
light.range = 5;
//设置聚光值
light.spotAngle = 50;
```


Le sens de convergence de la lumière setforward est défini de manière à correspondre à la lumière parallèle.

Range is the range of Aggregate Illumination, similar with Spot Light, the difference is the direction of Aggregate Light, but the Spot light is no direction.

Plus la lumière est petite, plus elle est forte, plus elle est faible.La valeur de concentration est de 5 à la figure 3 et de 50 à la figure 4, et les développeurs peuvent ajuster leurs propres paramètres en fonction de la demande.

![3](img/3.png)(Figure 3)![4](img/4.png)Figure 4 < / BR >



##élément optique

Lorsque la lumière est utilisée dans la scène, tous les modèles 3D à l 'intérieur de la plage de lumière auront un impact, et la lumière du moteur layaair3d comprend les éléments suivants pour ajuster la luminosité, la couleur, etc.

###Couleur ambiante

**La couleur ambiante de la lumière a été supprimée après la version 1.7.9 du moteur, l 'ancienne version est toujours disponible.La couleur ambiante peut être définie dans le matériau.**

La couleur de l 'environnement peut être comprise comme la couleur de l' atmosphère de la scène.Pour les modèles dans les scènes, leurs faces lumineuses et sombres sont influencées simultanément par la couleur de l 'environnement, plus la luminosité globale du modèle est élevée.Bien entendu, la couleur de l 'environnement est également souvent utilisée pour le traitement des couleurs, peut être par la teinte de l' environnement pour assainir l 'atmosphère, tels que l' orange jaune, vert, bleu, violet, etc.

Le Code définit les couleurs ambiantes comme suit, ce qui crée une lumière ambiante jaune et un masque jaune (fig. 5).

Dans le cours précédent, nous avons présenté des vecteurs tridimensionnels qui peuvent être utilisés pour définir des valeurs de couleur, et nous rappelons une fois de plus que les trois éléments du vecteur représentent respectivement des couleurs rouge, verte et bleue, qui sont combinées à des couleurs variées, dont la valeur maximale est de 1 pour chaque couleur, après exposition.


```javascript

//设置场景的环境色为纯黄色（计算机中，红+绿=黄）
scene.ambientColor = new Laya.Vector3(1,1,0);
```


![5](img/5.png)Figure 5 < / BR >



###Diffuse reflectance color

**Tips: après la version 1.7.9, les paramètres de couleurs des lampes Color ont été ajoutés, de même que les fonctionnalités diffusecolor.**

La couleur de la source de lumière est également appelée la couleur de la lumière, la lumière sur le modèle est influencée par la luminosité et la couleur de la surface de la lumière, par exemple la lumière de bougie analogique, la source de lumière peut être ajustée au jaune, alors la surface de la lumière peut ajouter la couleur jaune.

Dans le code suivant, nous avons défini la couleur de la source lumineuse comme étant pure et rouge, alors que la partie du modèle qui est exposée à l 'éclairage peut avoir des effets rouges, car nous avons précédemment défini la couleur jaune de la lumière ambiante (couleur de l' environnement du matériau ou couleur de l 'Environnement lumineux de l' ancienne version) et donc la couleur mélangée de la lumière rouge + jaune = Orange (fig. 6).


```javascript

//设置灯光的漫反射色为纯红色
//light.diffuseColor = new Laya.Vector3(1,0,0);
//设置灯光颜色为纯红色(与diffuseColor作用相同)
light.color = new Laya.Vector3(1,0,0);
```


![6](img/6.png)(图6)</br>


Fermer la lumière de l 'environnement, on peut voir l' effet (fig. 7) parce qu 'il n' y a pas d 'influence jaune sur la couleur de l' environnement, la surface de réception du modèle se transforme en couleur source de lumière.Dans le cadre de l 'élaboration du projet, nous devons donc prendre en compte l' effet mélangé des multiples propriétés de la lumière.

![7](img/7.png)Figure 7 < / BR >



###High Light Color

**Tips: le moteur 1.7.9 a supprimé les réglages de couleur haute lumière de la lumière, l 'ancienne version est toujours disponible.La couleur haute lumière peut être réglée dans le matériau.**

Pour le modèle, une lumière élevée est générée dans le sens de la source de lumière et dans un angle plus pointu et lisse, la luminosité et la couleur de la lumière peuvent être ajustées par la couleur de la lumière haute, la couleur haute lumière par défaut étant blanche pure.

Il existe deux méthodes de réglage de la haute couleur de lumière du modèle: une couleur de gradation de lumière sur la lumière et une image de haute lumière sur le matériau, la plupart du temps en ajustant directement la haute couleur de lumière sur le matériau, ce qui facilite le traitement et rend l 'effet plus réel.

Comme le modèle box ne produit pas de lumière élevée, nous l 'observons à l' aide d 'un modèle sphérique plus lisse.Dans le code ci - après, nous définissons une couleur haute lumière bleue, et la figure 8 - 2 permet de voir clairement que la surface de la sphère émerge d 'une lumière haute bleue, parce que la couleur violette est ajoutée au rouge diffus réfléchissant.


```javascript

//设置高光颜色为蓝
material.specularColor = new Laya.Vector3(0.5,0.5,1);
```


![8-1](img/8-1.png)(图8-1)![8-2](img/8-2.png)(Figure 8 - 2) < / BR >



###Projection

La projection est une ombre instantanée générée par le modèle d 'éclairage et peut varier en fonction de l' angle de la lumière, de l 'intensité de la lumière, de la position du modèle, etc.La projection est l'un des éléments les plus importants du monde en 3D et peut donner un sens plus fort de l'équilibre.

L 'ombre instantanée est une perte de performances qui ne peut pas être utilisée beaucoup, en particulier dans les scènes de jeu, les modèles plus grands, généralement, nous n' utilisons pas de projection instantanée, mais des photos statiques.

Pour que la projection se produise dans la scène, nous devons comprendre les propriétés suivantes de la lumière:

**Shadow:**Si la projection est activée, la valeur booléenne est réglée pour entrer en vigueur après le true.

**Shadowdistance:**La portée de la projection est la distance entre la caméra et le modèle, en mètres.La projection et la génération de projections ne seront pas acceptées au - delà de cette plage, et l 'développeur peut les paramétrer en fonction de la taille de la scène.

**Shadowpsmscount:**Plus le nombre de graphiques d 'ombre est élevé, plus l' ombre est fine, plus les pertes de performance sont importantes.

**Shadowresolution:**Qualité de projection, taille de l 'ombre dans la plage de projection.Grâce à la qualité des paramètres numériques, plus la valeur est grande, plus la qualité de projection est élevée, plus la perte de performance est élevée.La valeur de masse de projection est définie par défaut à 512 sous - puissance de 2 et peut être réglée en 1024, 2048, etc.

**Shadowpcftype:**Shadow flou grade 0 - 3, plus grande est la valeur floue, plus l 'ombre est douce, plus l' effet est bon, mais plus la performance.



Il ne suffit pas d 'allumer et de mettre en place les propriétés de la lumière, mais il faut également modifier les propriétés de projection du modèle comme suit:

**Receiveshadow:**La projection calculée est affichée sur le modèle si cette propriété est vraie.Dans le jeu, on peut définir les propriétés de castshadow du modèle dans le sol de la scène et dans la zone de déplacement de la scène comme une vraie.

**Castshadow:**Si une projection est produite, lorsque cette propriété du modèle est vraie, la lumière est calculée par projection en fonction de la position du modèle qui génère l 'ombre, de la taille de la grille du modèle, de l' angle de la lumière, etc., et une projection est produite sur le modèle qui reçoit l 'ombre.Cette propriété peut être activée par des éléments de jeu actifs tels que le rôle dans la scène, le NPC, etc.

Afin de bien comprendre la projection, nous utilisons la lumière parallèle dans les codes d 'exemples ci - après et créerons un modèle Box et un modèle Sphere Sphere pour charger la scène, la sphère étant utilisée pour créer une ombre sur laquelle la projection est acceptée.


```typescript

// 程序入口
class LayaAir3D {
    constructor() {
        //初始化引擎
        Laya3D.init(0, 0, true);

        //适配模式
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

        //开启统计信息
        Laya.Stat.show();

        //添加3D场景
        var scene = Laya.stage.addChild(new Laya.Scene());
        //创建摄像机（纵横比，近距裁剪，远距裁剪）
        var camera:Laya.Camera = new Laya.Camera(0,0.1,100);
        //加载到场景
        scene.addChild(camera);
        //移动摄像机位置
        camera.transform.translate(new Laya.Vector3(0, 4, 8));
        //旋转摄像机角度
        camera.transform.rotate(new Laya.Vector3( -30, 0, 0), true, false);
        //创建方向光
        var light:Laya.DirectionLight = scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
        //移动灯光位置
        light.transform.translate(new Laya.Vector3(0,5,0));
        //设置灯光方向
      	light.transform.worldMatrix.setForward(new Laya.Vector3(0.3,-1,0));
        //设置灯光漫反射颜色
        light.diffuseColor = new Laya.Vector3(1, 0, 0);
        //添加灯光投影
        light.shadow=true;
        //产生投影的范围（如过小将不会产生投影）
        light.shadowDistance=45;
        //生成阴影贴图数量
        light.shadowPSSMCount = 1;
        //模糊等级,越大越高,效果更好，更耗性能
        light.shadowPCFType=1;
        //投影质量
        light.shadowResolution=2048;
        //创建盒子模型
        var box:Laya.MeshSprite3D = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1.5,1.5,1.5))) as Laya.MeshSprite3D;
        //自身y座标旋转
        box.transform.rotate(new Laya.Vector3(0,45,0),true,false);
        //接收阴影
        box.meshRender.receiveShadow=true;
        //创建球体模型
        var sphere:Laya.MeshSprite3D = scene.addChild(new Laya.MeshSprite3D(new Laya.SphereMesh())) as Laya.MeshSprite3D;
        //按父空间移动球体
        sphere.transform.translate(new Laya.Vector3(0,1.5,0),false);
        //产生阴影
        sphere.meshRender.castShadow=true;
        //创建材质
        var material:Laya.PBRStandardMaterial = new Laya.PBRStandardMaterial();
        //材质加载漫反射贴图
      	Laya.Texture2D.load("res/layabox.png",Laya.Handler.create(this,function(t:Laya.Texture2D):void{
            material.albedoTexture = t;
            //为模型赋材质（单个材质可赋给多个模型）
            sphere.meshRenderer.material = material;
            box.meshRenderer.material = material;
      	}));
    }
}
new LayaAir3D();
```


![9](img/9.png)(Figure 9)![10](img/10.png)(Figure 10) < / BR >

Notez qu 'il est nécessaire de définir les attributs de corrélation décrits ci - dessus tant dans la lumière que dans le modèle et qu' aucun lien n 'est disponible pour créer une ombre.