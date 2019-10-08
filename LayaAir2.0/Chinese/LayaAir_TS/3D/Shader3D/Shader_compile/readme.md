# Shader预编译

###### *version :2.3.0   Update:2019-10-8*

在使用Shader时，引擎才会去编译Shader。所以在Shader较为复杂时，就有可能会导致显示卡顿。为了避开这些卡顿问题，就需要去预编译Shader。

### 1.获取编译的Shader列表

设置 `Shader3D.debugMode = true ` 后跑一遍游戏，之后在控制台中，我们就可以看到用绿色字体输出的shader编译相关信息了。

> 使用的官方地形shader示例

![](img/1.png)<br>

### 2.提取信息，预编译Shader

我们先来看下预编译接口：在 Shader3D 中的 `compileShader` 与 `compileShaderByDefineNames`

```typescript
/**
 * 通过宏定义名字编译shader。
 * @param	shaderName Shader名称。
 * @param   subShaderIndex 子着色器索引。
 * @param   passIndex  通道索引。
 * @param	defineNames 宏定义名字集合。
 */
static compileShaderByDefineNames(shaderName: string, subShaderIndex: number, passIndex: number, defineNames: Array<string>): void

/**
 * 通过宏定义遮罩编译shader。
 * @param	shaderName Shader名称。
 * @param   subShaderIndex 子着色器索引。
 * @param   passIndex  通道索引。
 * @param	defineMask 宏定义遮罩集合。
 */
static compileShader(shaderName: string, subShaderIndex: number, passIndex: number, defineMask: Array<number>): void
```

**注意：**预编译shader相关接口在2.2.0beta4之前只有compileShader一个接口用于预编译shader。开发者只需要按照接口填写对应参数即可。

开启 shader.debugMode 之后，从输出中提取预编译需要的信息。
> 使用compileShaderByDefineNames接口预编译Shader

```typescript
//初始化Shader
CustomTerrainMaterial.initShader();
//预编译Shader
Shader3D.compileShaderByDefineNames('CustomTerrainShader',0,0,[]);
Shader3D.compileShaderByDefineNames('CustomTerrainShader',0,0,['CUSTOM_DETAIL_NUM4']);
```

> 使用的compileShader接口预编译Shader

```typescript
//初始化Shader
CustomTerrainMaterial.initShader();
//预编译Shader
Shader3D.compileShader('CustomTerrainShader',0,0,[]);
Shader3D.compileShader('CustomTerrainShader',0,0,[0,0,262144]);
```



两个接口的区别：

`compileShader`使用的宏定义遮罩集合预编译，后者使用的宏定义名字集合预编译。前者的速度会更快一些，但是如果开发者调整了宏定义的顺序就需要同步修改预编译的参数。

`compileShaderByDefineNames`使用的是宏定义名字集合实现预编译，所有不会受到宏定义顺序调整影响，所以我们更 **推荐** 开发者使用该方法预编译shader。