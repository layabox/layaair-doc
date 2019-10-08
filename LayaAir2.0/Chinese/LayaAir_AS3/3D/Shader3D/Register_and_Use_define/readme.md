# 注册宏定义与使用宏

###### *version :2.3.0   Update:2019-10-8*

开发者如果在着色器代码中有使用到宏的话，开发者需要使用 Shader3D 的 `getDefineByName` 接口注册宏定义。

> 注册宏定义的接口统一到了Shader3D中，是在2.3.* 版本优化之后的。在这之前的版本，开发者需要使用 ShaderDefines 的 registerDefine 方法注册宏定义。

下方代码来自于官方示例（[demo地址](http://layaair2.ldc2.layabox.com/demo2/?language=ch&category=3d&group=Shader&name=Shader_Terrain)）：

> 新版本注册宏定义

```typescript
/**
 * @private
 */
public static function __init__(): void {
    SHADERDEFINE_DETAIL_NUM1 = Shader3D.getDefineByName("CUSTOM_DETAIL_NUM1");
    SHADERDEFINE_DETAIL_NUM2 = Shader3D.getDefineByName("CUSTOM_DETAIL_NUM2");
    SHADERDEFINE_DETAIL_NUM3 = Shader3D.getDefineByName("CUSTOM_DETAIL_NUM3");
    SHADERDEFINE_DETAIL_NUM4 = Shader3D.getDefineByName("CUSTOM_DETAIL_NUM4");
    SHADERDEFINE_DETAIL_NUM5 = Shader3D.getDefineByName("CUSTOM_DETAIL_NUM5");
}
```

> 老版本注册宏定义

```typescript
/**示例一个ShaderDefines**/
public static var shaderDefines:ShaderDefines 
/**注册宏函数**/
public static function __init__():void {
    shaderDefines = new ShaderDefines(BaseMaterial.shaderDefines);
    //注册宏定义
    SHADERDEFINE_DETAIL_NUM1 = shaderDefines.registerDefine("CUSTOM_DETAIL_NUM1");
    SHADERDEFINE_DETAIL_NUM2 = shaderDefines.registerDefine("CUSTOM_DETAIL_NUM2");
    SHADERDEFINE_DETAIL_NUM3 = shaderDefines.registerDefine("CUSTOM_DETAIL_NUM3");
    SHADERDEFINE_DETAIL_NUM4 = shaderDefines.registerDefine("CUSTOM_DETAIL_NUM4");
    SHADERDEFINE_DETAIL_NUM5 = shaderDefines.registerDefine("CUSTOM_DETAIL_NUM5");
}
```

宏在注册完成后，开发者可以通过 **BaseMaterial** 的 `_shaderValues:ShaderData` 属性中的 `addDefine`与 `removeDefine`  来添加与移除宏定义。

> 注意：添加与移除宏定义的操作整合进ShaderData是2.2.0版本的优化，在这之前的版本开发者需要使用         _defineDatas:DefineDatas 属性的 add 与 remove 方法。新版本也兼容使用 _defineDatas 添加移除宏。

下面的代码来自于官方示例（[demo地址](http://layaair2.ldc2.layabox.com/demo2/?language=ch&category=3d&group=Shader&name=Shader_Terrain)）:

> 新版本使用宏

```typescript
/**初始化材质**/
private static function initShader(): void {
    	....
        /**注册宏**/
		CustomTerrainMaterial.__init__();
        ....
}

private function _setDetailNum(value: number): void {
    switch (value) {
		case 1:
            _shaderValues.addDefine(CustomTerrainMaterial.SHADERDEFINE_DETAIL_NUM1);
            _shaderValues.removeDefine(CustomTerrainMaterial.SHADERDEFINE_DETAIL_NUM2);
            _shaderValues.removeDefine(CustomTerrainMaterial.SHADERDEFINE_DETAIL_NUM3);
            _shaderValues.removeDefine(CustomTerrainMaterial.SHADERDEFINE_DETAIL_NUM4);
            _shaderValues.removeDefine(CustomTerrainMaterial.SHADERDEFINE_DETAIL_NUM5);
		break;
        case 2:
            ......
    }
}
```

> 老版本使用宏

在老版本中使用了宏，还需要在 SubShader 初始化时，传入之前提过的两个参数。

`spriteDefines` 精灵的宏定义集合。该值可以使用引擎中默认的精灵宏定义集合，即`RenderableSprite.shaderDefines`。

`materialDefines` 材质的宏定义集合。该值就是在前面初始化的 `shaderDefines` 。

```typescript
/**
 * 老版本如果需要使用宏，在初始化Shader的时候需要将 shaderDefines 传给队友的 subShader 
 **/
private static function initShader(): void {
    	......
    	//注册宏
		CustomTerrainMaterial.__init__();
		......
		var customTerrianShader: Shader3D = Shader3D.add("CustomTerrainShader");
		//将ShaderDefines传给 subShader
		var subShader: SubShader = new SubShader(attributeMap, uniformMap, RenderableSprite3D.shaderDefines, CustomTerrainMaterial.shaderDefines);
		......
}

/**
* 在这个Shader中 需要根据宏来实现对不同 Textrue处理 ，所以在设置不同的贴图时，都会调用_setDetailNum来
* 调整宏。
*/
 private function _setDetailNum(value:int):void {
     switch (value) {
         case 1: 
             _defineDatas.add(CustomTerrainMaterial.SHADERDEFINE_DETAIL_NUM1);
             _defineDatas.remove(CustomTerrainMaterial.SHADERDEFINE_DETAIL_NUM2);
             _defineDatas.remove(CustomTerrainMaterial.SHADERDEFINE_DETAIL_NUM3);
             _defineDatas.remove(CustomTerrainMaterial.SHADERDEFINE_DETAIL_NUM4);
             _defineDatas.remove(CustomTerrainMaterial.SHADERDEFINE_DETAIL_NUM5);
             break;
         case 2:
             ........
}
```

#### 宏的优缺点：

宏能使着色器的代码更精简，运行效率更高效。但是每一次宏的变动都需要重新编译着色器代码（需要消耗时间）。