##Présentation
Le PBR est basé sur la lumière physique.L 'idée de base est que tous les calculs d' éclairage sont effectués selon une méthode physique uniforme, c 'est - à - dire en utilisant un seul Shader pour satisfaire à toutes les exigences de l' art.Après la création du matériau, il n 'est plus nécessaire de changer le matériau ni de modifier les paramètres pour pouvoir s' intégrer naturellement à l' environnement.Les paramètres du matériau que l 'art peut modifier sont physiquement significatifs, y compris la couleur du matériau lui - même, la rugosité et le métal.
Le PBR a donc besoin de:
Informations sur l'environnement.Pour fournir des informations d 'éclairage au matériau PBR.Un HDR, de préférence.[全景图](http://localhost/LayaAir2_Auto/panorama.md)Décrivez - le.
Matériaux.Les recommandations de fond sont faites dans substancepainter, puis exportées dans le format ue4.
##Limites de PBR mises en œuvre par laya3d
Ce n'est encore qu'une version d'essai, avec les restrictions suivantes:
Les sources de lumière dynamiques ne sont pas actuellement prises en charge.Les points dynamiques, les sources de lumière de surface doivent être supportés ultérieurement.
L 'autoluminescence n' est pas encore réalisée (c 'est plus facile, mais il faut un nouveau canal)
Il n'y a actuellement qu'une seule lumière sur l'environnement.Plus tard.
En raison de la vitesse de prétraitement et des limitations fonctionnelles de webgl, la taille actuelle de l'escompte écologique doit être de 512x 256.

##Dépendance à l 'outil
Il faut des pbtools.Procédé d 'installation

```bash

npm install -g pbrtools
```

Comme le module c précompilé est utilisé, seules les versions Windows sont maintenant prises en charge et ne peuvent pas être utilisées dans l 'environnement electron.D'autres versions peuvent être fournies ultérieurement si nécessaire.

##Comment fabriquer et utiliser un matériau PBR
Établissement de cartes environnementales.
Cette invention peut être obtenue grâce au téléchargement d 'une carte panoramique gratuite, à la production d' une carte panoramique par l 'intermédiaire d' un appareil photo et d 'un logiciel et à la présentation d' une carte panoramique dans une unité 3DsMAX.Le format est de préférence HDR, ce qui permet de conserver des informations plus larges sur l 'éclairage.
Traitement des cartes de l'environnement pour produire des données réfléchissantes et des données diffusiques à différents degrés de rugosité.
Attention à la taille de l 'écran environnemental doit être de 512x256, le format PG, TGA ou HDR doit être un panorama, pas un cubemap.
Traitement des cartes environnementales par ordre pbtools:

```bash

    pbrtools handleenvmap img
```
IMG est une image panoramique à traiter.Cette commande génère, sous la table des matières d 'IMG, une image prétraitée env.mipmaps, un env.png pour l' autocollage d 'une balle dans le ciel, et un fichier jsong présentant le document json comme suit:

```json

{
    "skytex":"env.png",
    "prefiltedEnv":"env.mipmaps",
    "IrradianceMat":[
        0.28129690885543823,0,0,0,-0.3282267153263092,-0.1073296070098877,0,0,-0.29809144139289856,0.13647188246250153,-0.17396731674671173,0,-0.5436494946479797,0.18786616623401642,0.2717423141002655,0.5554966926574707,0.2510770261287689,0,0,0,-0.295642226934433,-0.08785344660282135,0,0,-0.2755483090877533,0.12092982232570648,-0.16322359442710876,0,-0.5187899470329285,0.1655164659023285,0.3213203251361847,0.5639563798904419,0.17064285278320312,0,0,0,-0.22071118652820587,-0.04934860020875931,0,0,-0.21280556917190552,0.08689119666814804,-0.12129425257444382,0,-0.40946751832962036,0.11174142360687256,0.36054936051368713,0.5101194381713867
    ],
    "sunpos":[0,0,0],
    "ev":0.0
}
```

Skytex * est un autocollant pour la balle du ciel
* prefilterdenv * est une information réfléchie de différents degrés de rugosité prétraités.
* irradiancemat * est un paramètre de diffusion utilisé pour réaliser l 'éclairage différentiel de la carte panoramique.
* EV * est la valeur d 'exposition, - 3 à 3, les paramètres EV des caméras similaires sont les mêmes: 0, 1 à moitié, 1 à deux fois.

Exemples:
(actuellement, seules les catégories skydome peuvent être utilisées pour télécharger des informations sur l'environnement.

```javascript

    var skyDome:SkyDome = new SkyDome();
    camera.sky = skyDome;
    skyDome.loadEnvInfo('res/env/def/envinfo.json');   //加载envinfo文件指定的环境光照信息。
```


Modélisation.
Production de matériaux en PBR.
Crée et modifie le matériau dans Substance - Painter pour exporter le format ue4.
[expsptex.ping]
Ça produit trois images:
[...]
Ces trois images sont les suivantes:
* Les couleurs de base de basecolor * ne contiennent pas d 'informations telles que la lumière, l' ombre, etc., mais seulement la couleur originale du matériau.
* carte nominale *
* occlusionroughness Metallic * (Blue Channel)

Création du pbrmaterial
Par exemple, créer un matériau PBR:

```javascript

    mtl = new PBRMaterial();
    mtl.diffuseTexture = Texture2D.load('copper.png');
    mtl.normalTexture = Texture2D.load('normal.png');
    //mtl.pbrInfoTexture = Texture2D.load('orm.png'); 这个可有可无。
    mtl.roughness = 0.5;
    mtl.metaless =  1.0;
```

* Difference *: diagrammes de matériaux.Son canal Alpha est transparent ou métallique.
* normaltexture *: maquette du matériau.Son canal Alpha est rugueux.
* pbrinfotexture *: l 'information relative au PBR du matériau, si elle est établie, sera utilisée en priorité pour les informations relatives à la métallurgie et à la rugosité du matériau.Dans ce cas, r représente les informations Ao; g indique la rugosité, plus la rugosité est grande; et B indique la métallurgie, plus elle est grande.Vous pouvez utiliser directement l 'autocollant de l' UE.
* Roughness *: rugosité.OptionSi cela est fait, les informations de rugosité prévues dans le masque sont ignorées, ce qui signifie que la rugosité de l 'ensemble du matériau est identique et est généralement utilisée uniquement pour illustrer ou contrôler la rugosité du programme.
* metaless *: métallurgie.OptionSi cela est fait, les informations relatives à la métallurgie figurant dans le diagramme ne sont pas prises en compte, ce qui signifie que la métallurgie de l 'ensemble du matériau est identique et est généralement utilisée uniquement pour la démonstration ou la commande programmée de la métallurgie.

Utilisation de matériaux PBR dans les ressources de modélisation
Il existe deux méthodes, l 'une désignée dans l' alpha et l 'autre désignée par le procédé de création du pbrmaterial et d' attribution d 'une valeur à meshrender.
Par exemple, par l'intermédiaire de lh:

```json

        ...
        "meshPath":"dude-him.lm",
        "materials":[
            {
                "type":"Laya.PBRMaterial",
                "path":"Materials/head.lmat"
            },
            {
                "type":"Laya.PBRMaterial",
                "path":"Materials/jacket.lmat"
            },
            {
                "type":"Laya.PBRMaterial",
                "path":"Materials/pants.lmat"
            },
            {
                "type":"Laya.PBRMaterial",
                "path":"Materials/upBodyC.lmat"
            }
        ]
        ...
```

Le contenu de chaque lmat.

```json

{
    "version":"LAYAMATERIAL:01",
    "type": "PBRMaterial",
    "props": {
        "name": "head",
        "renderMode": 1,
        "has_tangent":true,
        "textures":[
            {"name":"diffuseTexture","path":"../headC.png"},
            {"name":"normalTexture","path":"../headN.png"}
        ]
    }
}
```


Désigné par la procédure

```javascript

    //手工设置材质
    var mtl:PBRMaterial = new PBRMaterial();
    mtl.diffuseTexture = Texture2D.load('../../../../res/threeDimen/pbr/basecolor.png');
    mtl.normalTexture = Texture2D.load('../../../../res/threeDimen/pbr/normal.png');
    mtl.pbrInfoTexture = Texture2D.load('../../../../res/threeDimen/pbr/orm.png');
    var sphere:MeshSprite3D = scene.addChild( new MeshSprite3D(new SphereMesh(0.1, 32, 32))) as MeshSprite3D;
    sphere.meshRender.sharedMaterial = mtl;

```


Les exemples ci - dessus sont illustrés par l'utilisation de deux autocollants ou de trois autocollants.Afin d 'améliorer l' efficacité, les trois cartes peuvent être fusionnées en deux, c 'est - à - dire que les deux canaux restants de la troisième carte peuvent être placés dans le canal Alpha des deux premières.
On peut régler ça par ordre pbtools:

```bash

pbrtools handle_ue4_texture expPath
```

Cette commande fusionnera toutes les images exportées dans le Répertoire exppath, en changeant trois et en les exportant dans le Répertoire layaout sous exppath.
Donc, si vous avez besoin de supporter l 'autoluminescence, il faudra en tout cas trois autocollants.

##Questions diverses
Pbrlut.js
Il s' agit d 'une table de recherche destinée à traiter les calculs de BRDF et, comme le moteur ne facilite pas la publication de données binaires, les données de la table de recherche dont le PBR a besoin sont placées dans un fichier JS indépendant et doivent être chargées avant le script de projet, par exemple

```html

<script src='pbrlut.js' ></script>
<script src='myGame.js' ></script>
```


Informations reçues
Les informations tangent ne peuvent être ajoutées que par modification des paramètres d 'exportation, mais parfois seules des informations normales, binomal, tangent complètes peuvent afficher correctement les résultats de l' image de ligne de la loi, et la méthode de calcul du binomal peut attendre un insert d 'exportation ultérieur ou utiliser des pbtools.Emploi
