# Shader预编译

###### *version :2.4.0   Update:2019-11-12*

在使用Shader时，引擎才会去编译Shader。所以在Shader较为复杂时，就有可能会导致显示卡顿。为了避开这些卡顿问题，就需要去预编译Shader。

> 新版本预编译Shader优化

在2.4.0版本，我们提供了两个新的接口方便开发者预编译shader：

**ShaderVariant** 着色器变种 

![](img/new_1.png)<br>

**ShaderVariantCollection** 着色器变种集合。

![](img/new_2.png)<br>

前者记录了一个着色器变种所有的相关信息，后者用于记录所有的着色器变种。

开发者可以通过 **Shader3D.debugShaderVariantCollection** [readonly] 获取到目前已有的着色器变种集合。

在跑一遍游戏之后，开发者可以将收集到的数据导出生成一个JSON。在下次进入游戏时解析JSON，构建相关的ShaderVariant。再将该ShaderVariant添加到 **Shader3D.debugShaderVariantCollection** 中，添加完成后，执行 **Shader3D.debugShaderVariantCollection.compile()** 即可完成相关shader预编译。

> 当鼠标按下时，构建需要导出的Object。下方示例改自官方边缘光照(Shader_GlowingEdge)示例

```typescript
Laya.stage.on(Event.MOUSE_DOWN,this,function(){
    let arr;
    for(let i = 0;i<Shader3D.debugShaderVariantCollection.variantCount;i++){
        let shadervariant = Shader3D.debugShaderVariantCollection.getByIndex(i);
        let shaderName = shadervariant.shader.name;
        if(!shaderObj[shaderName])shaderObj[shaderName] = [];
        arr = shaderObj[shaderName];
        let obj = {};
        obj.defineNames = shadervariant.defineNames;
        obj.passIndex= shadervariant.passIndex;
        obj.subShaderIndex= shadervariant.subShaderIndex;
        arr.push(obj);
    }
});
```

> 生成的相关数据

```typescript
{
    "GlowingEdgeMaterial":[
        {
            "defineNames":["DIRECTIONLIGHT"],
            "passIndex":0,
            "subShaderIndex":0
        },
        {
            "defineNames":["DIRECTIONLIGHT","BONE"],
            "passIndex":0,
            "subShaderIndex":0
        }
    ],
    "BLINNPHONG":[
        {
            "defineNames":["DIFFUSEMAP","DIRECTIONLIGHT","NORMALMAP","UV","UV1","BONE"],
            "passIndex":0,
			"subShaderIndex":0
        }
    ]
};
```

> 解析JSON，并且预编译Shader。修改initShader方法

```typescript
//初始化shader
initShader() {
    ......
    //加载获取得到shaderObj
    let arr= this.shaderObj["GlowingEdgeMaterial"];
	for (let = 0; index < arr.length; index++) {
    	let obj = arr[index];
    	let shadervariant = new ShaderVariant(glowingEdgeShader,obj.subShaderIndex,obj.passIndex,obj.defineNames);
        //将构建的shadervariant添加到debugShaderVariantCollection中
    	Shader3D.debugShaderVariantCollection.add(shadervariant);
	}
	//预编译shader
	Shader3D.debugShaderVariantCollection.compile();
}
```



------

### 1.查看Shader编译信息

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
static compileShaderByDefineNames(shaderName, subShaderIndex, passIndex, defineNames)

/**
 * 通过宏定义遮罩编译shader。
 * @param	shaderName Shader名称。
 * @param   subShaderIndex 子着色器索引。
 * @param   passIndex  通道索引。
 * @param	defineMask 宏定义遮罩集合。
 */
static compileShader(shaderName, subShaderIndex, passIndex, defineMask)
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

 **ShaderVariantCollection.compile** 也是基于 **compileShaderByDefineNames** 接口实现的预编译。 

两个接口的区别：

`compileShader`使用的宏定义遮罩集合预编译，后者使用的宏定义名字集合预编译。前者的速度会更快一些，但是如果开发者调整了宏定义的顺序就需要同步修改预编译的参数。

`compileShaderByDefineNames`使用的是宏定义名字集合实现预编译，所有不会受到宏定义顺序调整影响，所以我们更 **推荐** 开发者使用该方法预编译shader。