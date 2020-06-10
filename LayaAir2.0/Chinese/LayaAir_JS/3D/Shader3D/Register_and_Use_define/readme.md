# 注册宏定义与使用宏

###### *version :2.7.0beta   Update:2020-6-9*

开发者如果在着色器代码中有使用到宏的话，开发者需要使用 Shader3D 的 `getDefineByName` 接口注册宏定义。

> 注册宏定义的接口统一到了Shader3D中，是在2.3.* 版本优化之后的。在这之前的版本，开发者需要使用 ShaderDefines 的 registerDefine 方法注册宏定义。

下方代码来自于官方示例（[demo地址](http://layaair2.ldc2.layabox.com/demo2/?language=ch&category=3d&group=Shader&name=Shader_Terrain)）：

> 新版本注册宏定义

```javascript
/**
 * @private
 */
static __init__() {
    SHADERDEFINE_DETAIL_NUM1 = Laya.Shader3D.getDefineByName("CUSTOM_DETAIL_NUM1");
    SHADERDEFINE_DETAIL_NUM2 = Laya.Shader3D.getDefineByName("CUSTOM_DETAIL_NUM2");
    SHADERDEFINE_DETAIL_NUM3 = Laya.Shader3D.getDefineByName("CUSTOM_DETAIL_NUM3");
    SHADERDEFINE_DETAIL_NUM4 = Laya.Shader3D.getDefineByName("CUSTOM_DETAIL_NUM4");
    SHADERDEFINE_DETAIL_NUM5 = Laya.Shader3D.getDefineByName("CUSTOM_DETAIL_NUM5");
}
```

> 老版本注册宏定义

```javascript
/**示例一个ShaderDefines**/
static shaderDefines 
/**注册宏函数**/
static __init__(){
    CustomTerrainMaterial.shaderDefines = new Laya.ShaderDefines(Laya.BaseMaterial.shaderDefines);
    //注册宏定义
    CustomTerrainMaterial.SHADERDEFINE_DETAIL_NUM1 = CustomTerrainMaterial.shaderDefines.registerDefine("CUSTOM_DETAIL_NUM1");
    
    CustomTerrainMaterial.SHADERDEFINE_DETAIL_NUM2 = CustomTerrainMaterial.shaderDefines.registerDefine("CUSTOM_DETAIL_NUM2");
    
    CustomTerrainMaterial.SHADERDEFINE_DETAIL_NUM3 = CustomTerrainMaterial.shaderDefines.registerDefine("CUSTOM_DETAIL_NUM3");
    
    CustomTerrainMaterial.SHADERDEFINE_DETAIL_NUM4 = CustomTerrainMaterial.shaderDefines.registerDefine("CUSTOM_DETAIL_NUM4");
    
    CustomTerrainMaterial.SHADERDEFINE_DETAIL_NUM5 = CustomTerrainMaterial.shaderDefines.registerDefine("CUSTOM_DETAIL_NUM5");
}
```

宏在注册完成后，开发者可以通过 **Material** 的 `_shaderValues:ShaderData` 属性中的 `addDefine`与 `removeDefine`  来添加与移除宏定义。

> 注意：添加与移除宏定义的操作整合进ShaderData是2.2.0版本的优化，在这之前的版本开发者需要使用         _defineDatas:DefineDatas 属性的 add 与 remove 方法。新版本也兼容使用 _defineDatas 添加移除宏。

下面的代码来自于官方示例（[demo地址](http://layaair2.ldc2.layabox.com/demo2/?language=ch&category=3d&group=Shader&name=Shader_Terrain)）:

> 新版本使用宏

```typescript
/**初始化材质**/
private static initShader(){
    	....
        /**注册宏**/
		CustomTerrainMaterial.__init__();
        ....
}

private  _setDetailNum(value){
    switch (value) {
		case 1:
            
 this._shaderValues.addDefine(CustomTerrainMaterial.SHADERDEFINE_DETAIL_NUM1);
            this._shaderValues.removeDefine(CustomTerrainMaterial.SHADERDEFINE_DETAIL_NUM2);
            this._shaderValues.removeDefine(CustomTerrainMaterial.SHADERDEFINE_DETAIL_NUM3);
            this._shaderValues.removeDefine(CustomTerrainMaterial.SHADERDEFINE_DETAIL_NUM4);
            this._shaderValues.removeDefine(CustomTerrainMaterial.SHADERDEFINE_DETAIL_NUM5);
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
private static initShader() {
    	......
    	//注册宏
		CustomTerrainMaterial.__init__();
		......
		var customTerrianShader = Laya.Shader3D.add("CustomTerrainShader");
		//将ShaderDefines传给 subShader
		var subShader = new Laya.SubShader(attributeMap, uniformMap, Laya.RenderableSprite3D.shaderDefines, CustomTerrainMaterial.shaderDefines);
		......
}

/**
* 在这个Shader中 需要根据宏来实现对不同 Textrue处理 ，所以在设置不同的贴图时，都会调用_setDetailNum来
* 调整宏。
*/
 private _setDetailNum(value) {
     switch (value) {
         case 1: 
             CustomTerrainMaterial._defineDatas.add(CustomTerrainMaterial.SHADERDEFINE_DETAIL_NUM1);
             CustomTerrainMaterial._defineDatas.remove(CustomTerrainMaterial.SHADERDEFINE_DETAIL_NUM2);
             CustomTerrainMaterial._defineDatas.remove(CustomTerrainMaterial.SHADERDEFINE_DETAIL_NUM3);
             CustomTerrainMaterial._defineDatas.remove(CustomTerrainMaterial.SHADERDEFINE_DETAIL_NUM4);
             CustomTerrainMaterial._defineDatas.remove(CustomTerrainMaterial.SHADERDEFINE_DETAIL_NUM5);
             break;
         case 2:
             ........
}
```

#### 宏的优缺点：

宏能使着色器的代码更精简，运行效率更高效。但是每一次宏的变动都需要重新编译着色器代码（需要消耗时间）。