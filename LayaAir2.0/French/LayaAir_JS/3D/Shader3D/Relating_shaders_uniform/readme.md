#Uniform associant Shader

###### *version :2.3.0   Update:2019-10-8*

Nous utilisons l 'exemple de l' Internet.[demo地址](http://layaair2.ldc2.layabox.com/demo2/?language=ch&category=3d&group=Shader&name=Shader_MultiplePassOutline)-...**Shader (MULTIPASS)**Shader est un exemple.

On commence par le Code du colorateur:

#####Le premier colorateur utilisé par pass:

Top colorer`outline.vs`Code:


```c++

attribute vec4 a_Position; 
attribute vec3 a_Normal;

uniform mat4 u_MvpMatrix; 
uniform float u_OutlineWidth;

void main()
{
    vec4 position = vec4(a_Position.xyz + a_Normal * u_OutlineWidth, 1.0);
    gl_Position = u_MvpMatrix * position;
}
```


Colorateur de plaques`outline.fs`Code:


```c++

#ifdef FSHIGHPRECISION
precision highp float; 
#else 
    precision mediump float; 
#endif 

uniform float u_OutlineLightness; 
uniform vec4 u_OutlineColor;

void main() 
{ 
    vec3 finalColor = u_OutlineColor.rgb * u_OutlineLightness; 
    gl_FragColor = vec4(finalColor,0.0); 
}
```


#####Le deuxième colorateur utilisé par pass:

Top colorer`outline02.vs`Code:


```c++

#include "Lighting.glsl";

attribute vec4 a_Position; 
attribute vec2 a_Texcoord0; 

uniform mat4 u_MvpMatrix; 
uniform mat4 u_WorldMat; 


attribute vec3 a_Normal; 
varying vec3 v_Normal; 
varying vec2 v_Texcoord0; 

void main() 
{ 
    gl_Position = u_MvpMatrix * a_Position; 
        
    mat3 worldMat=mat3(u_WorldMat); 
    v_Normal=worldMat*a_Normal; 
    v_Texcoord0 = a_Texcoord0; 
    gl_Position=remapGLPositionZ(gl_Position); 
}
```


Colorateur de plaques`outline02.fs`Code:


```c++

#ifdef FSHIGHPRECISION 
precision highp float;
#else
precision mediump float;
#endif
varying vec2 v_Texcoord0;
varying vec3 v_Normal;

uniform sampler2D u_AlbedoTexture;

void main()
{
    vec4 albedoTextureColor = vec4(1.0);
    
    albedoTextureColor = texture2D(u_AlbedoTexture, v_Texcoord0);
    gl_FragColor=albedoTextureColor;
}
```


###Définition des attributs personnalisés

**Base Material**Est la matrice de tous les matériaux.Basematerial`_shaderValues:ShaderData`Propriétés du matériau

Après l 'initialisation de Shader**Présentation de subshader**Avec des explications détaillées, si le Shader contient des valeurs Uniform soumises par period ou material, l 'développeur doit les utiliser.`_shaderValues`Pour lier les attributs Shader.Une fois les propriétés Shader attachées, le moteur d 'attribut modifiant le matériau est automatiquement associé aux propriétés Shader associées.

Ensuite, nous analysons le Code du colorateur avant et l'uniformmap lors de l'initialisation de shader:

> uniformmap lors de l 'initialisation


```typescript

var uniformMap = {
    'u_MvpMatrix': Laya.Shader3D.PERIOD_SPRITE,
    'u_WorldMat': Laya.Shader3D.PERIOD_SPRITE,
    'u_OutlineWidth': Laya.Shader3D.PERIOD_MATERIAL,
    'u_OutlineLightness': Laya.Shader3D.PERIOD_MATERIAL,
    'u_OutlineColor': Laya.Shader3D.PERIOD_MATERIAL,
    'u_AlbedoTexture': Laya.Shader3D.PERIOD_MATERIAL
}
```


On en a utilisé six.`uniform`- Oui.

`u_MvpMatrix`Matrice MVP

`u_WorldMat`Matrice mondiale

Les deux valeurs sont Uniform par elfe, qui est traité et introduit par le moteur.Les deux attributs ne peuvent pas être associés dans leur propre Shader personnalisé, si ce n 'est nécessaire.

`u_OutlineColor`Couleur de bordure

`u_OutlineLightness`Luminosité

`u_AlbedoTexture`Diffuse reflectance

`u_OutlineWidth`Largeur de profil

Ces quatre paramètres sont Uniform par matériau que nous avons mis en place, ce qui exige que les développeurs soumettent eux - mêmes à Uniform par l 'intermédiaire des ushadervalues.

Une fois l 'Uniform dans le Shader analysé, on peut commencer à relier les matériaux aux Uniform.

> Utilisation**Shader3d**B`propertyNameToID`Method for Associated Materials \ \ ushadervalues and Shader Uniform.


```javascript

//绑定漫反射贴图
public static ALBEDOTEXTURE = Laya.Shader3D.propertyNameToID("u_AlbedoTexture");
//绑定描边颜色
public static OUTLINECOLOR = Laya.Shader3D.propertyNameToID("u_OutlineColor");
//绑定描边宽度
public static OUTLINEWIDTH = Laya.Shader3D.propertyNameToID("u_OutlineWidth");
//绑定描边亮度
public static OUTLINELIGHTNESS = Laya.Shader3D.propertyNameToID("u_OutlineLightness");
```


Une fois l 'Association terminée, les propriétés correspondantes peuvent être modifiées par l' identification obtenue.

Voici l 'encapsulation de nos matériaux personnalisés pour les ushadervalues.

> emballage \ \ ushadervalues pour modifier les propriétés du matériau


```typescript

/**
 * 获取漫反射贴图。
 * @return 漫反射贴图。
 */
get albedoTexture(){
    return this._shaderValues.getTexture(MultiplePassOutlineMaterial.ALBEDOTEXTURE);
}

/**
 * 设置漫反射贴图。
 * @param value 漫反射贴图。
 */
set albedoTexture(value) {
    if (value)
        this._defineDatas.add(MultiplePassOutlineMaterial.SHADERDEFINE_ALBEDOTEXTURE);
    else
        this._defineDatas.remove(MultiplePassOutlineMaterial.SHADERDEFINE_ALBEDOTEXTURE);
    this._shaderValues.setTexture(MultiplePassOutlineMaterial.ALBEDOTEXTURE, value);
}
/**
 * 获取线条颜色
 * @return 线条颜色
 */
get outlineColor() {
    return this._shaderValues.getVector(MultiplePassOutlineMaterial.OUTLINECOLOR);
}

set outlineColor(value) {
    this._shaderValues.setVector(MultiplePassOutlineMaterial.OUTLINECOLOR, value);
}
/**
 * 获取轮廓宽度。
 * @return 轮廓宽度,范围为0到0.05。
 */
get outlineWidth(){
    return this._shaderValues.getNumber(MultiplePassOutlineMaterial.OUTLINEWIDTH);
}

/**
 * 设置轮廓宽度。
 * @param value 轮廓宽度,范围为0到0.05。
 */
set outlineWidth(value){
    value = Math.max(0.0, Math.min(0.05, value));
    this._shaderValues.setNumber(MultiplePassOutlineMaterial.OUTLINEWIDTH, value);
}

/**
 * 获取轮廓亮度。
 * @return 轮廓亮度,范围为0到1。
 */
get outlineLightness() {
    return this._shaderValues.getNumber(MultiplePassOutlineMaterial.OUTLINELIGHTNESS);
}

/**
 * 设置轮廓亮度。
 * @param value 轮廓亮度,范围为0到1。
 */
set outlineLightness(value){
    value = Math.max(0.0, Math.min(1.0, value));
    this._shaderValues.setNumber(MultiplePassOutlineMaterial.OUTLINELIGHTNESS, value);
}
```


###Utilisation de propriétés encapsulées

Une fois que les propriétés du matériau sont bien encapsulées, nous pouvons les utiliser.

> utiliser un matériau personnalisé


```typescript

//加载网格
Laya.Mesh.load("res/threeDimen/skinModel/LayaMonkey/Assets/LayaMonkey/LayaMonkey-LayaMonkey.lm", Laya.Handler.create(this, function(mesh) {
    //设置猴子
    var layaMonkey = scene.addChild(new Laya.MeshSprite3D(mesh));
    layaMonkey.transform.localScale = new Laya.Vector3(0.3, 0.3, 0.3);
    layaMonkey.transform.rotation = new Laya.Quaternion(0.7071068, 0, 0, -0.7071067);
    //创建材质
    var customMaterial = new Laya.MultiplePassOutlineMaterial();
    //漫反射贴图
  Laya.Texture2D.load("res/threeDimen/skinModel/LayaMonkey/Assets/LayaMonkey/diffuse.png", Laya.Handler.create(this, function(texture) {
        //设置多描边材质的贴图
        customMaterial.albedoTexture = texture;
    }));
    //设置材质
    layaMonkey.meshRenderer.sharedMaterial = customMaterial;
    //开启旋转
    Laya.timer.frameLoop(1, this, function() {
        layaMonkey.transform.rotate(this.rotation, false);
    });
}));
```






#### 

