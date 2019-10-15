#Comment se définir, Shader?

###### *version :2.3.0   Update:2019-10-8*

Nous allons présenter brièvement comment utiliser le Shader personnalisé.Cette révision se fonde sur l'exemple de projet 3D de layaairide.

####Élaboration de programmes pour les colorants de pointe et de plaques.

Dossier placé au niveau du Code de projet`customMaterials`Descendre

Top colorer`simpleShader.vs`Code:


```c++

#include "Lighting.glsl";

attribute vec4 a_Position;

uniform mat4 u_MvpMatrix;
uniform mat4 u_WorldMat;


attribute vec3 a_Normal;
varying vec3 v_Normal;

void main()
{
	gl_Position = u_MvpMatrix * a_Position;
	mat3 worldMat=mat3(u_WorldMat);
	v_Normal=worldMat*a_Normal;
	gl_Position=remapGLPositionZ(gl_Position);
}
```


Colorateur de plaques`simpleShader.fs`Code:


```c++

#ifdef FSHIGHPRECISION
precision highp float;
#else
precision mediump float;
#endif

varying vec3 v_Normal;

void main()
{	
  gl_FragColor=vec4(v_Normal,1.0);
}
```


####Composition du Code Shader

Dans le Code**Assemblage**Shader, le Code de ce paragraphe a été ajouté à main.js.

> importer le Code colorateur par référence


```typescript

import simpleShaderFS from "./simpleShader.fs";
import simpleShaderVS from "./simpleShader.vs";
```


> initialiser le Shader


```typescript

//初始化我们的自定义shader
initShader() {
    
    //所有的attributeMap属性
    var attributeMap = {'a_Position': Laya.VertexMesh.MESH_POSITION0, 'a_Normal': Laya.VertexMesh.MESH_NORMAL0};
    
    //所有的uniform属性
    var uniformMap = {'u_MvpMatrix': Laya.Shader3D.PERIOD_SPRITE, 'u_WorldMat': Laya.Shader3D.PERIOD_SPRITE};
    
    //注册CustomShader 
    var customShader = Laya.Shader3D.add("CustomShader");
    
    //创建一个SubShader
    var subShader = new Laya.SubShader(attributeMap, uniformMap);
    
    //我们的自定义shader customShader中添加我们新创建的subShader
    customShader.addSubShader(subShader);
    
    //往新创建的subShader中添加shaderPass
    subShader.addShaderPass(simpleShaderVS, simpleShaderFS);
}
```


####Mise en place de matériaux personnalisés

Nous définissons le matériau et définissons le Shader pour son utilisation.


```typescript

export class CustomMaterial extends Laya.BaseMaterial {
    constructor() {
        super();
        //设置本材质使用的shader名字
        this.setShaderName("CustomShader");
    }
}
```


####Utilisation de matériaux personnalisés

Avant d 'utiliser un matériau personnalisé, rappelez - vous d' initialiser votre propre Shader.Le matériel de layaair va suivre.`Laya3D.init`Initialisation.Il faut qu'on l'appelle et qu'on l'écrive.`initShader`MéthodeIci, nous commençons notre Shader directement chez main.


```typescript

........	
	Laya.alertGlobalError = true;

	//初始化自定义Shader
    this.initShader();

    //激活资源版本控制，版本文件由发布功能生成
    Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
.......
```


Utilisez notre matériau personnalisé dans gameu.


```typescript

//添加自定义模型
var box = scene.addChild(new Laya.MeshSprite3D(PrimitiveMesh.createBox(1, 1, 1)));

//为了更好的表现该自定义shader我们去掉模型旋转,同时给摄影机添加了移动脚本
camera.addComponent(CameraMoveScript);
//box.transform.rotate(new Laya.Vector3(0, 45, 0), false, false);
// var material:BlinnPhongMaterial = new Laya.BlinnPhongMaterial();
// Texture2D.load("res/layabox.png", Laya.Handler.create(null, function(tex) {
// 	material.albedoTexture = tex;
// }));
// box.meshRenderer.material = material;

//创建一个自定义材质，并且添加给box
var _material = new CustomMaterial();
box.meshRenderer.material = _material;
```


Une fois que nous avons commencé à fonctionner, nous avons ajusté le diagramme de l 'effet de la vue:

[] (IMG / 2.png) <br > (Figure 2)

Dans ce colorateur, nous convertissons les coordonnées mondiales du point acquis en matrice tridimensionnelle multipliée par la loi.`v_Normal`Les valeurs sont affichées en tant que valeurs de couleur du point.Voilà le modèle.