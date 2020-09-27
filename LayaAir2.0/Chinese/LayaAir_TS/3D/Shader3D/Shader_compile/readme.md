# Shader预编译

###### *version :2.7.0beta   Update:2020-6-10*

在使用Shader时，引擎才会去编译Shader。所以在Shader较为复杂时，就有可能会导致显示卡顿。为了避开这些卡顿问题，就需要去预编译Shader。

> 新版本预编译Shader优化

在2.4.0版本，我们提供了两个新的接口方便开发者预编译shader：

**ShaderVariant** 着色器变种属性介绍

1.当前ShaderVariant着色器变种对应的Shader3D

```typescript
public get shader(): Shader3D;
```

2.子着色器索引

```typescript
public get subShaderIndex(): number;
```

3.通道索引

```typescript
public get passIndex(): number;
```

4.宏定义集合

```typescript
public get defineNames(): Readonly<string[]>
```

5.判断两个着色器变种是否相等

```typescript
equal(other: ShaderVariant): boolean;
```

着色器变种记录了一个着色器变种所有的相关信息，即通过这个着色器变种即可以为创建一个着色器程序提供完整的信息。考虑一个着色器程序的差异，一般在于着色器中传递给Pass的顶点着色器和片元着色器以及编译这个着色器程序使用的特定宏(即使使用相同的顶点着色器和片元着色器源码，使用不同的宏便对应生成不同的着色器程序)。



**ShaderVariantCollection** 着色器变种集合属性介绍

1.是否已经全部编译

```typescript
get allCompiled(): boolean;
```

2.包含的变种数量

```typescript
get variantCount(): number
```

3.添加着色器变种

```typescript
add(variant: ShaderVariant): boolean;
```

4.移除着色器变种

```typescript
remove(variant: ShaderVariant): boolean;
```

5.是否包含着色器变种

```typescript
contatins(variant: ShaderVariant): boolean;
```

6.执行编译(compile会遍历着色器变种集合中的所有着色器变种，依据每个着色器变种的信息，分别编译出一个Shader)

```typescript
compile(): void;
```



**预编译的基本原理：**

ShaderVariantCollection记录了所有的ShaderVariant着色器变种，全局有一个Shader3D.debugShaderVariantCollection负责作为ShaderVariantCollection进行记录，只有通过Laya.Shader3D.debugMode = true;开启了Shader调试，Shader3D.debugShaderVariantCollection才会进行记录。在跑一遍游戏之后，开发者可以将收集到的数据(记录在Shader3D.debugShaderVariantCollection中的信息)导出生成一个JSON。在下次进入游戏时解析JSON，构建相关的ShaderVariant。再将该ShaderVariant添加到 Shader3D.debugShaderVariantCollection 中，添加完成后，执行 Shader3D.debugShaderVariantCollection.compile() 即可完成相关shader预编译。



> 当鼠标按下时，构建需要导出的Object。下方示例改自官方边缘光照(Shader_GlowingEdge)示例

```typescript
Laya.stage.on(Event.MOUSE_DOWN,this,function():void{
    let arr;
    for(let i = 0;i<Shader3D.debugShaderVariantCollection.variantCount;i++){
        let shadervariant:ShaderVariant = Shader3D.debugShaderVariantCollection.getByIndex(i);
        let shaderName:string = shadervariant.shader.name;
        if(!shaderObj[shaderName])shaderObj[shaderName] = [];
        arr = shaderObj[shaderName];
        let obj:any = {};
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
private initShader(): void {
    ......
    //加载获取得到shaderObj
    let arr :Array<any>= this.shaderObj["GlowingEdgeMaterial"];
	for (let index = 0; index < arr.length; index++) {
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

 **ShaderVariantCollection.compile** 也是基于 **compileShaderByDefineNames** 接口实现的预编译。 

两个接口的区别：

`compileShader`使用的宏定义遮罩集合预编译，后者使用的宏定义名字集合预编译。前者的速度会更快一些，但是如果开发者调整了宏定义的顺序就需要同步修改预编译的参数。

`compileShaderByDefineNames`使用的是宏定义名字集合实现预编译，所以不会受到宏定义顺序调整影响，所以我们更 **推荐** 开发者使用该方法预编译shader。