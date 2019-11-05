#Pbrstandard Material

###### *version :2.1.0beta   Update:2019-5-14*

Les matériaux de réflectance physique ordinaire, conçus pour des surfaces dures (c 'est - à - dire des matériaux de construction) sont généralement utilisés pour la fabrication de matériaux de texture rugueuse.

#####Principales propriétés et méthodes

Attributs

`albedoColor:Vector4`Diffuse reflectance color

`albedoTexture:BaseTexture`Diffuse reflectance

`emissionColor:Vector4`Radiocouleur.

`emissionTexture:BaseTexture`Radiogramme.

`enableEmission:Boolean`Activation des propriétés radioactives

`enableReflection:Boolean`Réfléchissez.

`metallic:Number`Métal.

`metallicGlossTexture:BaseTexture`Metal Smooth

`normalTexture:BaseTexture`Maquette.

`normalTextureScale:Number`Coefficient of Regression

`occlusionTexture:BaseTexture`Cache - toi.

`occlusionTextureStrength:Number`Masque la résistance de l 'écran.

`parallaxTexture:BaseTexture`Parallaxe.

`parallaxTextureScale:Number`Zoom coefficient

`renderMode:int`[Write - only] définit un mode de rendu.

`smoothness:Number `Lisse.

`smoothnessSource:int`Source de données de lissage

`smoothnessTextureScale:Number`Coefficient of Smooth

`tilingOffset:Vector4`Pavage et décalage de texture.

#####Création et utilisation de matériaux

Le code ci - dessous est issu de l 'exemple officiel.[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Material&name=PBRStandardMaterialDemo)).


```typescript

setTexture(){
    //反射贴图
    Laya.Texture2D.load('res/threeDimen/scene/PBRMaterialScene/Assets/PBR Barrel/Materials/Textures/Barrel_AlbedoTransparency.png', Laya.Handler.create(this, function (texture) {
        this.mat.albedoTexture = texture;
    }));
    //法线贴图
    Laya.Texture2D.load('res/threeDimen/scene/PBRMaterialScene/Assets/PBR Barrel/Materials/Textures/Barrel_Normal.png', Laya.Handler.create(this, function (texture) {
        this.mat.normalTexture = texture;
    }));
    //金属光滑度贴图
    Laya.Texture2D.load('res/threeDimen/scene/PBRMaterialScene/Assets/PBR Barrel/Materials/Textures/Barrel_MetallicSmoothness.png', Laya.Handler.create(this, function (texture) {
        this.mat.metallicGlossTexture = texture;
    }));
    //遮挡贴图
    Laya.Texture2D.load('res/threeDimen/scene/PBRMaterialScene/Assets/PBR Barrel/Materials/Textures/Barrel_Occlusion.png', Laya.Handler.create(this, function (texture) {
        this.mat.occlusionTexture = texture;
    }));
}

setMaterial(){
        this.mat.albedoColor = new Laya.Vector4(1, 1, 1, 1);
        //光滑度缩放系数
        this.mat.smoothnessTextureScale = 1.0;
        //遮挡贴图强度
        this.mat.occlusionTextureStrength = 1.0;
        //法线贴图缩放洗漱
        this.mat.normalScale = 1;
        //光滑度数据源:从金属度贴图/反射贴图获取。
        this.mat.smoothnessSource = Laya.PBRStandardMaterial.SmoothnessSource_MetallicGlossTexture_Alpha;
        let barrel = this.scene.getChildByName("Wooden_Barrel");
        let barrel1 = this.scene.getChildByName("Wooden_Barrel (1)");
        let barrel2 = this.scene.getChildByName("Wooden_Barrel (2)");
        let barrel3 = this.scene.getChildByName("Wooden_Barrel (3)");
        barrel.meshRenderer.sharedMaterial = this.mat;
        barrel1.meshRenderer.sharedMaterial = this.mat;
        barrel2.meshRenderer.sharedMaterial = this.mat;
        barrel3.meshRenderer.sharedMaterial = this.mat;
}
```


[] (IMG / 1.png) <br > (Figure 1)

