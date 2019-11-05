##introduce
PBR is based on physical light. The basic idea is that all illumination calculations are completed in accordance with a unified physical method, i. e. one shader is expected to fulfill all the requirements of fine arts. Basically, after the material is created, it can be integrated with the environment naturally without changing the material and modifying the parameters in any environment. The material parameters that art can modify are of physical significance, including the color, roughness and metallicity of the material itself.
So what PBR needs is:
1. Environmental information. It is used to provide illumination information for PBR material. Here we use an HDR (preferably an hdr)[全景图](http://localhost/LayaAir2_Auto/panorama.md)To describe.
2. material. Material suggestions are made in SubstancePainter and exported to UE4 format after completion.
##Limitation of PBR implemented by laya3d
This is still a beta version, so there are the following limitations:
1. Dynamic light sources are not supported at present. In the future, dynamic point and surface light sources should be supported.
2. Self-luminescence has not yet been achieved (this is easier, but a new channel is needed)
3. At present, there can only be one ambient light in a scene. There will be more than one in the future.
4. Due to the limitation of preprocessing speed and WebGL's function, the current environmental map size must be 512x256.

##Tool dependency
Pbrtools are required. Installation method:

```bash

npm install -g pbrtools
```

Because of the use of pre-compiled C module, only Windows version is now supported, and can not run in the electronic environment. Other versions can be provided later if necessary.

##How to Make and Use PBR Material
1. Making environmental maps.
This can be obtained by downloading free panoramas, making panoramas by camera and software, and rendering panoramas in 3dsmax and unit. The best format is hdr, which retains a wider range of illumination information.
2. Processing environmental mapping, generating reflective data and diffuse data of each roughness.
Note that the size of the environmental map must be 512x256, in the format of png, tga, or hdr. It must be a panorama, not a cubemap.
Processing environment mapping by commanding pbrtools:

```bash

    pbrtools handleenvmap img
```
IMG is a panoramic image to be processed. This command generates a preprocessed image env. mipmaps, an env. PNG for skyball mapping, and a jsong file in the img directory. The JSON file is described as follows:

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

* Skytex* is a map of the sky ball.
* PreilterdEnv* is the reflection information of different roughness of preprocessing.
* IrradianceMat* is a diffuse parameter used to achieve diffuse illumination for panoramas.
* Ev* is the exposure value, -3 to 3. The EV parameters of similar cameras are: 0 unchanged, -1 to half, and 1 to twice.

Use examples:
(At present, only SkyDome class can be used to load PBR environment information.)

```javascript

    var skyDome:SkyDome = new SkyDome();
    camera.sky = skyDome;
    skyDome.loadEnvInfo('res/env/def/envinfo.json');   //加载envinfo文件指定的环境光照信息。
```


3. Making models.
4. Making PBR material.
Create and modify materials in Substance Painter and export them to UE4 format.
! [] (expsptex. png)
This will export three pictures:
! [] (uetex. png)
The three pictures are:
* BaseColor* Basic color, does not contain information such as lighting, shadows, etc., only represents the original color of the material.
* Normal*Normal Mapping
* Occlusion Roughness Metallic* occlusion information (red channel), roughness information (green channel) metallicity information (blue channel)

5. Create PBRMaterial
For example, create a PBR material:

```javascript

    mtl = new PBRMaterial();
    mtl.diffuseTexture = Texture2D.load('copper.png');
    mtl.normalTexture = Texture2D.load('normal.png');
    //mtl.pbrInfoTexture = Texture2D.load('orm.png'); 这个可有可无。
    mtl.roughness = 0.5;
    mtl.metaless =  1.0;
```

* diffuse Texture*: The diffuse texture of the material. His alpha channel represents transparency or metallicity.
* NoralTexture*: Normal texture of materials. His alpha channel indicates roughness.
* pbrInfoTexture*: Material PBR related information, if set up this map, will give priority to the use of the metal degree, roughness information in this map. Among them, R represents AO information; G represents roughness, the bigger the rougher; B represents metallicity, the bigger the metal. You can use UE mapping directly.
* Rouness*: Roughness. Optional. If this is set, the roughness information set in the texture will be ignored, indicating that the roughness of the whole material is the same, which is usually only used to demonstrate or program control the roughness.
* Metaess*: Metallicity. Optional. If this is set, the metallinity information set in the texture will be ignored, indicating that the metallinity of the whole material is the same, generally only used to demonstrate or program control the metallinity.

6. Use PBR material on model resources
There are two ways to specify this. One is to specify it in lh, and the other is to specify it by creating a PBRMaterial program and assigning it to MeshRender.
For example, specified by lh:

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

Content of each lmat

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


Programmed

```javascript

    //手工设置材质
    var mtl:PBRMaterial = new PBRMaterial();
    mtl.diffuseTexture = Texture2D.load('../../../../res/threeDimen/pbr/basecolor.png');
    mtl.normalTexture = Texture2D.load('../../../../res/threeDimen/pbr/normal.png');
    mtl.pbrInfoTexture = Texture2D.load('../../../../res/threeDimen/pbr/orm.png');
    var sphere:MeshSprite3D = scene.addChild( new MeshSprite3D(new SphereMesh(0.1, 32, 32))) as MeshSprite3D;
    sphere.meshRender.sharedMaterial = mtl;

```


Some of the examples above use two maps and others use three maps. Here's an explanation. In order to improve efficiency, if no occlusion information is needed, the three graphs can be merged into two, that is, the remaining two channels of the third graph can be placed in the alpha channel of the first two graphs.
This can be handled by the pbrtools command:

```bash

pbrtools handle_ue4_texture expPath
```

This command will merge all the exported pictures in the expPath directory, change three into two, and output them to the layaout directory in the expPath directory.
So if you need to support self-luminescence in the future, you need three maps anyway.

##Other questions
1. pbrlut.js
This is a pre-computed lookup table for BRDF processing. Because the engine is not easy to publish binary data, the lookup table data needed by PBR is placed in a separate JS file. This script needs to be loaded before the project script, such as

```html

<script src='pbrlut.js' ></script>
<script src='myGame.js' ></script>
```


5. tangent information
Now in lm, only normal information can be added by modifying export parameters, but sometimes only complete normal, binormal and tangent information can correctly display the results of normal mapping. The method of calculating binormal can wait for later export plug-ins or use pbrtools. Using French strategy
