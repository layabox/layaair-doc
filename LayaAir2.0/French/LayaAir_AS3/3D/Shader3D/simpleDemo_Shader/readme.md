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


Colorateur de plaques`simpleShader.ps`Code:


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


Structure de Table des matières

[] (IMG / 1.png) <br > (Figure 1)

####Composition du Code Shader

Dans ce code, nous utilisons une fonction de macro - compilation fournie par un compilateur layacompiler.`__INCLUDESTR__`, la fonction comprend un fichier texte dans le Code de programme.Identifie un texte et convertit en chaîne de caractères.

Dans le Code**Assemblage**Shader, le Code de ce paragraphe a été ajouté à main.as.


```typescript

//初始化我们的自定义shader
public function initShader():void {
    
    //所有的attributeMap属性
    var attributeMap:Object = {'a_Position': VertexMesh.MESH_POSITION0, 'a_Normal': VertexMesh.MESH_NORMAL0};
    
    //所有的uniform属性
    var uniformMap:Object = {'u_MvpMatrix': Shader3D.PERIOD_SPRITE, 'u_WorldMat': Shader3D.PERIOD_SPRITE};
    
    //通过 __INCLUDESTR__ 方法引入顶点着色器程序和片元着色器程序。
    var vs:String = __INCLUDESTR__("customShader/simpleShader.vs");
    var ps:String = __INCLUDESTR__("customShader/simpleShader.ps");
    
    //注册CustomShader 
    var customShader:Shader3D = Shader3D.add("CustomShader");
    
    //创建一个SubShader
    var subShader:SubShader = new SubShader(attributeMap, uniformMap);
    
    //我们的自定义shader customShader中添加我们新创建的subShader
    customShader.addSubShader(subShader);
    
    //往新创建的subShader中添加shaderPass
    subShader.addShaderPass(vs, ps);
}
```


####Mise en place de matériaux personnalisés

Nous définissons le matériau et définissons le Shader pour son utilisation.


```typescript

package material {
	import laya.d3.core.material.BaseMaterial;
	
	public class CustomMaterial extends BaseMaterial {
		public function CustomMaterial() {
			super();
			//设置本材质使用的shader名字
			setShaderName("CustomShader");
		}
	}
}
```


####Utilisation de matériaux personnalisés

Avant d 'utiliser un matériau personnalisé, rappelez - vous d' initialiser votre propre Shader.Le matériel de layaair va suivre.`Laya3D.init`Initialisation.Il faut qu'on l'appelle et qu'on l'écrive.`initShader`MéthodeIci, nous commençons notre Shader directement chez main.


```typescript

........	
	Laya.alertGlobalError = true;

	//初始化自定义Shader
    initShader();

    //激活资源版本控制，版本文件由发布功能生成
    ResourceVersion.enable("version.json", Handler.create(this, this.onVersionLoaded), ResourceVersion.FILENAME_VERSION);
.......
```


Utilisez notre matériau personnalisé dans gameu.


```typescript

//添加自定义模型
var box:MeshSprite3D = scene.addChild(new MeshSprite3D(PrimitiveMesh.createBox(1, 1, 1))) as MeshSprite3D;

//为了更好的表现该自定义shader我们去掉模型旋转,同时给摄影机添加了移动脚本
camera.addComponent(CameraMoveScript);
//box.transform.rotate(new Vector3(0, 45, 0), false, false);
// var material:BlinnPhongMaterial = new BlinnPhongMaterial();
// Texture2D.load("res/layabox.png", Handler.create(null, function(tex:Texture2D):void {
// 	material.albedoTexture = tex;
// }));
// box.meshRenderer.material = material;

//创建一个自定义材质，并且添加给box
var _material : CustomMaterial = new CustomMaterial();
box.meshRenderer.material = _material;
```


Une fois que nous avons commencé à fonctionner, nous avons ajusté le diagramme de l 'effet de la vue:

[] (IMG / 2.png) <br > (Figure 2)

Dans ce colorateur, nous convertissons les coordonnées mondiales du point acquis en matrice tridimensionnelle multipliée par la loi.`v_Normal`Les valeurs sont affichées en tant que valeurs de couleur du point.Voilà le modèle.