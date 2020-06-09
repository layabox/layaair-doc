# ShaderPass介绍

###### *version :2.7.0beta   Update:2020-6-9*

​	SubShader 中定义了一系列的 **Pass（通道）** 。每个Pass定义了一次完整的渲染流程。注意Pass数目过多会造成渲染性能的下降。

​**ShaderPass中比较重要的属性：**

获取渲染状态。获取后还能对此进行修改。

```typescript
renderState(): RenderState
```

### 1.多ShaderPass简单示例

下方示例来自于官方多Pass描边示例（[demo示例](http://layaair2.ldc2.layabox.com/demo2/?language=ch&category=3d&group=Shader&name=Shader_MultiplePassOutline)）。

##### 第一个Pass使用的着色器：

顶点着色器 `outline.vs` 代码如下：

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

片元着色器 `outline.fs` 代码如下:

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

##### 第二个Pass使用的着色器：

顶点着色器 `outline02.vs` 代码如下：

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

片元着色器 `outline02.fs` 代码如下:

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

##### 初始化自定义Shader

> 导入着色器代码

```javascript
let OutlineVS = `
  attribute vec4 a_Position;
  attribute vec3 a_Normal;

  uniform mat4 u_MvpMatrix; 
  uniform float u_OutlineWidth;


  void main() 
  {
  vec4 position = vec4(a_Position.xyz + a_Normal * u_OutlineWidth, 1.0);
  gl_Position = u_MvpMatrix * position;
  }`;

let OutlineFS = `
  #ifdef FSHIGHPRECISION
  precision highp float;
  #else
  precision mediump float;
  #endif
  uniform vec4 u_OutlineColor; 
  uniform float u_OutlineLightness;

  void main()
  {
  vec3 finalColor = u_OutlineColor.rgb * u_OutlineLightness;
  gl_FragColor = vec4(finalColor,0.0); 
}`;
 let Outline02VS = `
  #include "Lighting.glsl"

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
  }`;
let Outline02FS = `
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
}`; 
```

> 初始化Shader

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
	//注册多Pass描边Shader
    var customShader = Laya.Shader3D.add("MultiplePassOutlineShader");
    //创建一个subShader
    var subShader = new Laya.SubShader(attributeMap, uniformMap);
    customShader.addSubShader(subShader);
    
    //添加一个Pass
    var pass1 = subShader.addShaderPass(OutlineVS, OutlineFS);
    //设置渲染状态，剔除正面
    pass1.renderState.cull = Laya.RenderState.CULL_FRONT;

    //添加第二个Pass
    subShader.addShaderPass(Outline02VS, Outline02FS);
}
```

##### 使用自定义shader

在前面的步骤中，我们已经构成了一个使用多Pass描边Shader的材质。然后只需要和以前一样使用材质就行。不过记得在使用前初始化材质。

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

![](img/1.gif)<br>

### 2. stateMap

在 `subShader` 添加通道时，除了顶点着色器与片段着色器之外，还有第三个可选参数：**stateMap** 渲染状态表，这个参数可以修改这Shader的渲染状态。

**注意：**

**1.** 在没有stateMap时，该材质是逐Shader提交。即修改一个材质的渲染状态，所有使用这个shader的材质对应渲染状态都会修改(这是默认状态)。

**2.** 在设置 stateMap 之后该材质是逐材质实例提交。即修改了一个材质的渲染状态，仅对自己本身的渲染状态修改。

![](img/2.png)<br>

我们可以看下Blinnphong材质添加 `stateMap` 的代码。

> BLINNPHONG材质初始化

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

> BLINNPHONG材质关联渲染通道，这里只用剔除举例

```typescript
//关联剔除通道
static CULL = Laya.Shader3D.propertyNameToID("s_Cull");
/**
 * 设置剔除方式。
 * @param value 剔除方式。
 */
set cull(value) {
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

在没有 stateMap 时，只能通过对应修改 ShaderPass 的 renderState 来修改。

> 多Pass描边shader中使用Pass的renderStat修改渲染状态

```typescript
var pass1 = subShader.addShaderPass(OutlineVS, OutlineFS);
//修改渲染状态
pass1.renderState.cull = Laya.RenderState.CULL_FRONT;
```

在stateMap中key代表的是不同的渲染状态。key的值是对应的渲染通道。key名可以按照开发者习惯自行书写。

| 属性名       | 通道                                       |
| --------- | ---------------------------------------- |
| 剔除        | Shader3D.RENDER_STATE_CULL               |
| 深度测试      | Shader3D.RENDER_STATE_DEPTH_TEST         |
| 深度写入      | Shader3D.RENDER_STATE_DEPTH_WRITE        |
| 混合        | Shader3D.RENDER_STATE_BLEND              |
| 混合源       | Shader3D.RENDER_STATE_BLEND_SRC          |
| 混合目标      | Shader3D.RENDER_STATE_BLEND_DST          |
| 混合源RGB    | Shader3D.RENDER_STATE_BLEND_SRC_RGB      |
| 混合目标RGB   | Shader3D.RENDER_STATE_BLEND_DST_RGB      |
| 混合源ALPHA  | Shader3D.RENDER_STATE_BLEND_SRC_ALPHA    |
| 混合目标ALPHA | Shader3D.RENDER_STATE_BLEND_DST_ALPHA    |
| 混合常量颜色    | Shader3D.RENDER_STATE_BLEND_CONST_COLOR  |
| 混合方程      | Shader3D.RENDER_STATE_BLEND_EQUATION     |
| RGB混合方程   | Shader3D.RENDER_STATE_BLEND_EQUATION_RGB |
| ALPHA混合方程 | Shader3D.RENDER_STATE_BLEND_EQUATION_ALPHA |

关于各渲染状态可选项，可以查看`RenderState`中的枚举（[地址](https://layaair2.ldc2.layabox.com/api2/Chinese/index.html?category=&class=_laya_d3_core_material_renderstate_.renderstate#srcblendrgb)）。

![](img/3.png)<br>

框选部分为渲染状态，可以通过这些值修改渲染状态。

非框选部分为渲染状态枚举。

**注意**：如果设置了 stateMap ，可以通过 `_shaderValues`  覆盖RenderState中设置的渲染状态。

