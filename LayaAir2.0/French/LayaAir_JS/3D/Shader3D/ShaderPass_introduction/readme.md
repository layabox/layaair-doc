#Présentation de shaderpass

######  *version :2.3.0   Update:2019-10-8*

Une série est définie dans subshader.**Pass (passage)**".Chaque pass définit un processus de rendu complet.Attention, le nombre excessif de pass entraîne une baisse de la performance de rendu.

Attributs plus importants dans shaderpass:

​`renderState`Obtenez l 'état de rendu.Cette acquisition peut être modifiée.

###Exemples simples de shaderpass multiples

L 'exemple suivant provient de l' exemple officiel de bordure MULTIPASS (([demo示例](http://layaair2.ldc2.layabox.com/demo2/?language=ch&category=3d&group=Shader&name=Shader_MultiplePassOutline)).

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


#####Shader personnalisé d 'initialisation

> Code du colorateur importé


```javascript

import OutlineFS from "../customShader/outline.fs";
import OutlineVS from "../customShader/outline.vs";
import Outline02FS from "../customShader/outline02.fs";
import Outline02VS from "../customShader/outline02.vs";
```


> initialisation Shader


```typescript

static initShader() {
    //所有的attributeMap属性
    var attributeMap = {
        'a_Position': Laya.VertexMesh.MESH_POSITION0, 
        'a_Normal': Laya.VertexMesh.MESH_NORMAL0, 
        'a_Texcoord0': Laya.VertexMesh.MESH_TEXTURECOORDINATE0
  	};
    //所有的uniform属性
    var uniformMap = {
        'u_MvpMatrix': Laya.Shader3D.PERIOD_SPRITE, 
        'u_WorldMat': Laya.Shader3D.PERIOD_SPRITE,
        'u_OutlineWidth': Laya.Shader3D.PERIOD_MATERIAL, 
        'u_OutlineLightness': Laya.Shader3D.PERIOD_MATERIAL,
        'u_OutlineColor': Laya.Shader3D.PERIOD_MATERIAL,
        'u_AlbedoTexture': Laya.Shader3D.PERIOD_MATERIAL
	};
	//注册多pass描边Shader
    var customShader = Laya.Shader3D.add("MultiplePassOutlineShader");
    //创建一个subShader
    var subShader = new Laya.SubShader(attributeMap, uniformMap,shaderDefines);
    customShader.addSubShader(subShader);
    
    //添加一个Pass
    var pass1 = subShader.addShaderPass(OutlineVS, OutlineFS);
    //剔除正面
    pass1.renderState.cull = Laya.RenderState.CULL_FRONT;

    //添加第二个Pass
    subShader.addShaderPass(Outline02VS, Outline02FS);
}
```


#####Utiliser un Shader personnalisé

Au cours des étapes précédentes, nous avons constitué un matériau avec une description MULTIPASS Shader.Il suffit d 'utiliser le matériau comme avant.Mais rappelez - vous d 'initialiser le matériau avant son utilisation.


```typescript

//初始化Shader
MultiplePassOutlineMaterial.initShader();
//加载网格
Laya.Mesh.load("res/threeDimen/skinModel/LayaMonkey/Assets/LayaMonkey/LayaMonkey-LayaMonkey.lm", Laya.Handler.create(this, function(mesh) {
    var layaMonkey = scene.addChild(new Laya.MeshSprite3D(mesh));
    layaMonkey.transform.localScale = new Laya.Vector3(0.3, 0.3, 0.3);
    layaMonkey.transform.rotation = new Laya.Quaternion(0.7071068, 0, 0, -0.7071067);
    //创建材质
    var customMaterial = new MultiplePassOutlineMaterial();
    //漫反射贴图
    Laya.Texture2D.load("res/threeDimen/skinModel/LayaMonkey/Assets/LayaMonkey/diffuse.png", Laya.Handler.create(this, function(texture) {
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


[] (IMG / 1.gif) <br >

###Statemap

Oui.`subShader`Pour ajouter un canal, il existe un troisième paramètre facultatif, à l 'exception du colorant de pointe et du colorant de fragments:**Statemap**Ce paramètre peut modifier l 'état de rendu du Shader.

**Attention:**

**Un.**Lorsqu'il n'y avait pas de statemap, les matériaux ont été présentés par Shader.Modifier l 'état de rendu d' un matériau, tous les matériaux utilisant ce Shader sont modifiés par l 'état de rendu correspondant.

**Deux.**Après le réglage de statemap, le matériau est soumis à titre d 'exemple par matériau.Modifie l 'état de rendu d' un matériau et ne modifie que son propre état de rendu.

[] (IMG / 2.png) <br >

On peut voir l'addition de blinnphong.`stateMap`Code.

> initialisation de matériaux blinnphong


```typescript

var stateMap = {
			's_Cull': Laya.Shader3D.RENDER_STATE_CULL,
			's_Blend': Laya.Shader3D.RENDER_STATE_BLEND,
			's_BlendSrc': Laya.Shader3D.RENDER_STATE_BLEND_SRC,
			's_BlendDst': Laya.Shader3D.RENDER_STATE_BLEND_DST,
			's_DepthTest': Laya.Shader3D.RENDER_STATE_DEPTH_TEST,
			's_DepthWrite': Laya.Shader3D.RENDER_STATE_DEPTH_WRITE
		}

var shader = Laya.Shader3D.add("BLINNPHONG", null, null, true);
var subShader = new Laya.SubShader(attributeMap, uniformMap);
shader.addSubShader(subShader);
subShader.addShaderPass(MeshBlinnPhongVS, MeshBlinnPhongPS, stateMap);
```


> blinnphong Materials Associated rendu Channel


```typescript

//关联剔除通道
static CULL = Laya.Shader3D.propertyNameToID("s_Cull");
/**
 * 设置剔除方式。
 * @param value 剔除方式。
 */
set cull(value:int) {
    this._shaderValues.setInt(BlinnPhongMaterial.CULL, value);
}

/**
 * 获取剔除方式。
 * @return 剔除方式。
 */
get cull() {
    return this._shaderValues.getInt(BlinnPhongMaterial.CULL);
}
```


Lorsqu 'il n' y a pas de statemap, les modifications ne peuvent être apportées que par adaptation correspondante de la redersstate de shaderpass.

> modification de l 'état de rendu à l' aide de renderstat de pass dans le Shader MULTIPASS


```typescript

var pass1:ShaderPass = subShader.addShaderPass(OutlineVS, OutlineFS);
//修改渲染状态
pass1.renderState.cull = Laya.RenderState.CULL_FRONT;
```


Key représente différents états de rendu dans le statemap.La valeur de Key est le canal de rendu correspondant.Key peut écrire lui - même selon l 'usage de l' développeur.

Les attributs de la filière \ \ 124.
124 ----------------------------------------------------------------------------------------------------------------------
124 \ \ 124 \ \ shader3d.render u State u Cull \ \ 124
124, test de profondeur \ \ 124, \ \ 124
"124 en profondeur." 124 en profondeur.
"124 treillis mélangés" \ \ 124 chader3d.render u State u Blend \ \ 124.
124ème source mixte \ \ 1244d.render u State \ \ Blend \ \ SRC \ \ 1244a
"124 destinations mixtes" \ \ 124 d.render u State u Blend u DST \ \ 124
124ème source mixte RGB \ \ 124d.render u State \ \ Blend \ \ SRC u RGB \ \ 124
"124 treillis mélangés RGB \ \ 124d.render u State \ \ Blend \ \ DST u RGB \ \ 124
124 * mélanges de sources Alpha \ \ 124 \ \ shader3d.render u State u Blend u SRC \ \ Alpha
124 destinations mixtes Alpha \ \ 124 \ \ shader3d.render u State u Blend u DST \ \ 12 \ \ 4
124 couteaux mélangés de couleurs constantes.
124 Équations mixtes \ \ 124 d.render u State u Blend u equitation \ \ 124
"/ 124, / RGB Hybrid Equation \ \ 1244 shader3d.render u State u Blend \ \ Equation u RGB \ \ 124
124 * Équations mixtes Alpha \ \ 124 \ \ shader3d.render u State u Blend \ \ Equation u Alpha \ \ 124

Pour chaque état rendu, vous pouvez consulter`RenderState`L 'énumération[地址](https://layaair2.ldc2.layabox.com/api2/Chinese/index.html?category=&class=_laya_d3_core_material_renderstate_.renderstate%3Ch1%3Esrcblendrgb)).

[] (IMG / 3.ping)

Les Parties sélectionnées de la zone sont des états de rendu qui peuvent être modifiés par ces valeurs.

La partie non encadrée est une énumération de l 'état rendu.

**Attention!**: si le statemap est défini, vous pouvez passer par`_shaderValues`Couvre l 'état de rendu défini dans renderstate.

