# SubShader介绍

###### *version :2.7.0beta   Update:2020-6-9*

​	**SubShader 子着色器**可以理解为Shader的渲染方案。每个Shader至少1个subShader，可以有多个subShader。

**在LayaAir3D中的SubShader属性介绍：**

- 1.构造函数，需要两个参数，一个是attributeMap，一个是uniformMap，attributeMap定义了顶点的属性信息，对应的Shader中的attribute属性，attributeMap是一个映射，key是attribute属性的名称，value是一个索引值。uniformMap也是一个映射，key是uniform属性的名称，value是这个unifrom的提交周期。

  提交周期的说明：提交周期表示当前的uniform更新的一种时机。

  目前支持的周期类型：

  **Shader3D.PERIOD_CAMERA**     :shader变量提交周期，逐相机。

  **Shader3D.PERIOD_CUSTOM**     :shader变量提交周期，自定义。

  **Shader3D.PERIOD_MATERIAL**  :shader变量提交周期，逐材质。

  **Shader3D.PERIOD_SCENE**         :shader变量提交周期，逐场景。

  **Shader3D.PERIOD_SPRITE **       :shader变量提交周期，逐精灵和相机，注：因为精灵包含MVP矩阵，为复合属性，所以摄像机发生变化时也应提交。

  逐场景，逐相机，逐精灵和相机，这三种周期的uniform是引擎自动传入的值。即当场景，相机，精灵与相机任意一个的属性有变化时，引擎会自动提交相应的变动。

```typescript
constructor(attributeMap: any, uniformMap: any)
```

- 2.添加标记。

```typescript
setFlag(key: String, value: String)
```

- 3.获取标记

```typescript
getFlag(key: String)
```

- 4.添加着色器Pass：

  vs：该Pass使用的顶点着色器文件

  ps：该Pass使用的片元着色器文件

  stateMap:是一个映射，key为渲染状态的名称，value为其对应的索引，常用的渲染状态有Cull、Blend、BlendSrc、BlendDst、DepthTest、DepthWrite。

  pipelineMode：是最近几个版本引进的一个属性，它指的是当前使用的渲染管线，类似Unity中的渲染路径概念，目前截至到LayaAir 2.7.0beta，Laya支持"Forward"和"ShadowCaster"两种pipelineMode，

  "Forward"表示当前的渲染时前向渲染路径，"ShadowCaster"表示当前渲染是渲染阴影贴图的渲染路径(将物体的深度信息渲染到一张阴影贴图中或者深度纹理中)。后续版本或逐步增加Defered，延迟渲染路径。

  当SubShader中含有多个Pass的时候，那么每一个Pass都会对精灵进行一次渲染。

```typescript
addShaderPass(vs: String, ps: String, stateMap: Object = null, pipelineMode: String = "Forward")
```



**以引擎的BlinnPhongMaterial的Shader"BLINNPHONG"进行说明：**

```typescript
//引入Shader需要使用的其他库文件
Shader3D.addInclude("Lighting.glsl", LightingGLSL);
Shader3D.addInclude("ShadowSampleTent.glsl", ShadowSampleTentGLSL);
Shader3D.addInclude("GlobalIllumination.glsl", GlobalIllumination)
Shader3D.addInclude("Shadow.glsl", ShadowGLSL);
Shader3D.addInclude("ShadowCasterVS.glsl", ShadowCasterVSGLSL);
Shader3D.addInclude("ShadowCasterFS.glsl", ShadowCasterFSGLSL);
Shader3D.addInclude("Colors.glsl", ColorsGLSL);
Shader3D.addInclude("Sampling.glsl", SamplingGLSL);
Shader3D.addInclude("StdLib.glsl", StdLibGLSL);
Shader3D.addInclude("PBRVSInput.glsl", PBRVSInput);
Shader3D.addInclude("PBRFSInput.glsl", PBRFSInput);
Shader3D.addInclude("LayaPBRBRDF.glsl", LayaPBRBRDF);
Shader3D.addInclude("PBRCore.glsl", PBRCore);
Shader3D.addInclude("PBRVertex.glsl", PBRVertex);

//定义BLINNPHONG的attributeMap
var attributeMap = {
  'a_Position': VertexMesh.MESH_POSITION0,
  'a_Color': VertexMesh.MESH_COLOR0,
  'a_Normal': VertexMesh.MESH_NORMAL0,
  'a_Texcoord0': VertexMesh.MESH_TEXTURECOORDINATE0,
  'a_Texcoord1': VertexMesh.MESH_TEXTURECOORDINATE1,
  'a_BoneWeights': VertexMesh.MESH_BLENDWEIGHT0,
  'a_BoneIndices': VertexMesh.MESH_BLENDINDICES0,
  'a_Tangent0': VertexMesh.MESH_TANGENT0,
  'a_MvpMatrix': VertexMesh.MESH_MVPMATRIX_ROW0,
  'a_WorldMat': VertexMesh.MESH_WORLDMATRIX_ROW0
};
//定义BLINNPHONG的uniformMap
var uniformMap = {
  'u_Bones': Shader3D.PERIOD_CUSTOM,
  'u_DiffuseTexture': Shader3D.PERIOD_MATERIAL,
  'u_SpecularTexture': Shader3D.PERIOD_MATERIAL,
  'u_NormalTexture': Shader3D.PERIOD_MATERIAL,
  'u_AlphaTestValue': Shader3D.PERIOD_MATERIAL,
  'u_DiffuseColor': Shader3D.PERIOD_MATERIAL,
  'u_MaterialSpecular': Shader3D.PERIOD_MATERIAL,
  'u_Shininess': Shader3D.PERIOD_MATERIAL,
  'u_TilingOffset': Shader3D.PERIOD_MATERIAL,

  'u_WorldMat': Shader3D.PERIOD_SPRITE,
  'u_MvpMatrix': Shader3D.PERIOD_SPRITE,
  'u_LightmapScaleOffset': Shader3D.PERIOD_SPRITE,
  'u_LightMap': Shader3D.PERIOD_SPRITE,
  'u_LightMapDirection': Shader3D.PERIOD_SPRITE,

  'u_CameraPos': Shader3D.PERIOD_CAMERA,
  'u_Viewport': Shader3D.PERIOD_CAMERA,
  'u_ProjectionParams': Shader3D.PERIOD_CAMERA,
  'u_View': Shader3D.PERIOD_CAMERA,
  'u_ViewProjection': Shader3D.PERIOD_CAMERA,

  'u_ReflectTexture': Shader3D.PERIOD_SCENE,
  'u_ReflectIntensity': Shader3D.PERIOD_SCENE,
  'u_FogStart': Shader3D.PERIOD_SCENE,
  'u_FogRange': Shader3D.PERIOD_SCENE,
  'u_FogColor': Shader3D.PERIOD_SCENE,
  'u_DirationLightCount': Shader3D.PERIOD_SCENE,
  'u_LightBuffer': Shader3D.PERIOD_SCENE,
  'u_LightClusterBuffer': Shader3D.PERIOD_SCENE,
  'u_AmbientColor': Shader3D.PERIOD_SCENE,
  'u_ShadowBias': Shader3D.PERIOD_SCENE,
  'u_ShadowLightDirection': Shader3D.PERIOD_SCENE,
  'u_ShadowMap': Shader3D.PERIOD_SCENE,
  'u_ShadowParams': Shader3D.PERIOD_SCENE,
  'u_ShadowSplitSpheres': Shader3D.PERIOD_SCENE,
  'u_ShadowMatrices': Shader3D.PERIOD_SCENE,
  'u_ShadowMapSize': Shader3D.PERIOD_SCENE,
  'u_SpotShadowMap':Shader3D.PERIOD_SCENE,
  'u_SpotViewProjectMatrix':Shader3D.PERIOD_SCENE,
  'u_ShadowLightPosition':Shader3D.PERIOD_SCENE,

  //GI
  'u_AmbientSHAr': Shader3D.PERIOD_SCENE,
  'u_AmbientSHAg': Shader3D.PERIOD_SCENE,
  'u_AmbientSHAb': Shader3D.PERIOD_SCENE,
  'u_AmbientSHBr': Shader3D.PERIOD_SCENE,
  'u_AmbientSHBg': Shader3D.PERIOD_SCENE,
  'u_AmbientSHBb': Shader3D.PERIOD_SCENE,
  'u_AmbientSHC': Shader3D.PERIOD_SCENE,

  //legacy lighting
  'u_DirectionLight.color': Shader3D.PERIOD_SCENE,
  'u_DirectionLight.direction': Shader3D.PERIOD_SCENE,
  'u_PointLight.position': Shader3D.PERIOD_SCENE,
  'u_PointLight.range': Shader3D.PERIOD_SCENE,
  'u_PointLight.color': Shader3D.PERIOD_SCENE,
  'u_SpotLight.position': Shader3D.PERIOD_SCENE,
  'u_SpotLight.direction': Shader3D.PERIOD_SCENE,
  'u_SpotLight.range': Shader3D.PERIOD_SCENE,
  'u_SpotLight.spot': Shader3D.PERIOD_SCENE,
  'u_SpotLight.color': Shader3D.PERIOD_SCENE
};
//定义BLINNPHONG的uniformMap
var stateMap = {
  's_Cull': Shader3D.RENDER_STATE_CULL,
  's_Blend': Shader3D.RENDER_STATE_BLEND,
  's_BlendSrc': Shader3D.RENDER_STATE_BLEND_SRC,
  's_BlendDst': Shader3D.RENDER_STATE_BLEND_DST,
  's_DepthTest': Shader3D.RENDER_STATE_DEPTH_TEST,
  's_DepthWrite': Shader3D.RENDER_STATE_DEPTH_WRITE
}
//调用Shader3D的静态函数创建一个Shader3D
var shader: Shader3D = Shader3D.add("BLINNPHONG", null, null, true);
//创建一个SubShader
var subShader: SubShader = new SubShader(attributeMap, uniformMap);
//为Shader3D添加一个SubShader
shader.addSubShader(subShader);
//为SubShader添加一个ShaderPass，其中MeshBlinnPhongVS为顶点着色器文件，MeshBlinnPhongPS为片元着色器文件，stateMap为渲染状态数组，"Forward"指定该Pass使用前向渲染路径
subShader.addShaderPass(MeshBlinnPhongVS, MeshBlinnPhongPS, stateMap, "Forward");
//再创建一个ShaderPass，作为渲染阴影贴图的使用，MeshBlinnPhongShadowCasterVS是阴影贴图的顶点着色器文件，MeshBlinnPhongShadowCasterPS是阴影贴图的片元着色器文件"ShadowCaster"指定该Pass使用阴影贴图渲染路径。
var shaderPass: ShaderPass = subShader.addShaderPass(MeshBlinnPhongShadowCasterVS, MeshBlinnPhongShadowCasterPS, stateMap, "ShadowCaster");
```



