#Comment ajouter une ombre à la lumière

###### *version :2.0.1beta   Update:2019-3-30*

La projection est une ombre instantanée générée par le modèle d 'éclairage et peut varier en fonction de l' angle de la lumière, de l 'intensité de la lumière, de la position du modèle, etc.La projection est l'un des éléments les plus importants du monde en 3D et peut donner un sens plus fort de l'équilibre.

L 'ombre instantanée est une perte de performances qui ne peut pas être utilisée beaucoup, en particulier dans les scènes de jeu, les modèles plus grands, généralement, nous n' utilisons pas de projection instantanée, mais des photos statiques.

Pour que la projection se produise dans la scène, nous devons comprendre les propriétés suivantes de la lumière:

**Shadow:**Si la projection est activée, la valeur booléenne est réglée pour entrer en vigueur après le true.

**Shadowdistance:**La portée de la projection est la distance entre la caméra et le modèle, en mètres.La projection et la génération de projections ne seront pas acceptées au - delà de cette plage, et l 'développeur peut les paramétrer en fonction de la taille de la scène.

**Shadowpcftype:**Shadow flou grade 0 - 3, plus grande est la valeur floue, plus l 'ombre est douce, plus l' effet est bon, mais plus la performance.

**Shadowpsmscount:**Plus le nombre de graphiques d 'ombre est élevé, plus l' ombre est fine, plus les pertes de performance sont importantes.

**Shadowresolution:**Qualité de projection, taille de l 'ombre dans la plage de projection.Grâce à la qualité des paramètres numériques, plus la valeur est grande, plus la qualité de projection est élevée, plus la perte de performance est élevée.La valeur de masse de projection est définie par 2 n puissance, par défaut 512, et peut être réglée en 1024, 2048...Attends.

Vous pouvez y aller avec plus de détails.[查看API](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=3D&class=laya.d3.core.light.LightSprite)".

En outre, les propriétés de projection doivent être définies sur le modèle.

**Receiveshadow:**La projection calculée est affichée sur le modèle si cette propriété est vraie.Dans le jeu, on peut définir les propriétés de castshadow du modèle dans le sol de la scène et dans la zone de déplacement de la scène comme une vraie.

**Castshadow:**Si une projection est produite, lorsque cette propriété du modèle est vraie, la lumière est calculée par projection en fonction de la position du modèle qui génère l 'ombre, de la taille de la grille du modèle, de l' angle de la lumière, etc., et une projection est produite sur le modèle qui reçoit l 'ombre.Cette propriété peut être activée par des éléments de jeu actifs tels que le rôle dans la scène, le NPC, etc.

Adresse de demo pour afficher l 'effet:

Paramètres relatifs à l'éclairage:


```typescript

//灯光开启阴影
directionLight.shadow = true;
//可见阴影距离
directionLight.shadowDistance = 3;
//生成阴影贴图尺寸
directionLight.shadowResolution = 2048;
//生成阴影贴图数量
directionLight.shadowPSSMCount = 1;
//模糊等级,越大越高,更耗性能
directionLight.shadowPCFType = 3;
```


Ouvrez les ombres et les modèles de réception au sol pour créer des ombres:


```typescript

//地面加到场景上 并且获取地面
var grid:Sprite3D = scene.addChild(Loader.getRes("res/threeDimen/staticModel/grid/plane.lh")) as Sprite3D;
//地面接收阴影
(grid.getChildAt(0) as MeshSprite3D).meshRenderer.receiveShadow = true;
.......
//设置猴子能产生阴影
(layaMonkey.getChildAt(0).getChildAt(0) as SkinnedMeshSprite3D).skinnedMeshRenderer.castShadow = true;

```


Et on verra.

[] (IMG / 1.png) <br > (Figure 1)

