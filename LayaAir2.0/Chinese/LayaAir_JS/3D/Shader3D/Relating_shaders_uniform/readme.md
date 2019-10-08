# 关联shader的uniform

###### *version :2.3.0   Update:2019-10-8*

这里我们使用官网示例（[demo地址](http://layaair2.ldc2.layabox.com/demo2/?language=ch&category=3d&group=Shader&name=Shader_MultiplePassOutline)）---**描边Shader（多Pass）** 中的shader作为案例来进行讲解。

我们首先来看下着色器代码：

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

### 1.定义自定义属性

**BaseMaterail** 是所有的材质的基类。BaseMaterail 的 `_shaderValues:ShaderData` 就是材质的属性。

在初始化Shader之后（该Shader的初始化在**SubShader介绍篇**有详细讲解），如果在该Shader中有 PERIOD_MATERIAL（逐材质）的提交的uniform值，开发者就需要使用 `_shaderValues` 来绑定Shader属性。绑定Shader属性之后，修改材质的属性引擎会自动关联到相关的Shader属性。

然后我们分析下前面的着色器代码与初始化Shader时的uniformMap：

> 初始化时的uniformMap

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

在该着色器中我们使用了6个 `uniform`：

`u_MvpMatrix` MVP矩阵

`u_WorldMat` 世界矩阵 

这两个值都是逐精灵的uniform，会由引擎处理并进行传入。如果没有需求的话，可以不用在自己的自定义shader中对这两个属性进行绑定设置。

`u_OutlineColor` 描边颜色

`u_OutlineLightness` 描边亮度 

`u_AlbedoTexture` 漫反射贴图

`u_OutlineWidth` 描边宽度

以上四个参数是我们设置的逐材质的uniform，这就需要开发者自己通过 _shaderValues 提交 uniform。

分析好shader中的uniform之后，就可以开始将材质的 _shaderValues 与 uniform关联起来。

> 使用 **Shader3D** 中的 `propertyNameToID` 方法关联 材质的 _shaderValues 与 shader uniform。

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

关联完成后，就可以通过获取到的ID就可以去修改对应的属性了。

下面是我们的自定义材质中对 _shaderValues 使用的封装。

> 封装 _shaderValues 实现修改材质属性

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

### 2.使用封装好的属性

封装好材质属性之后，我们就可以使用了。

> 使用自定义材质

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

