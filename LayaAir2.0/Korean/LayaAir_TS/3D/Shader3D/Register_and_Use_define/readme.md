#등록 매크로 정의 및 사용 매크로

###### *version :2.3.0   Update:2019-10-8*

개발자가 착색기 코드에 매크로 사용된다면 개발자는 Shader3D 를 사용해야 합니다`getDefineByName`인터페이스 등록 매크로 정의.

>> 매크로 정의된 인터페이스는 Shader3D 중 2.3.3 버전 최적화된 것이다.이 이전 버전에서 개발자는 ShaderDefines 의 registerDefine 방법으로 매크로 지정해야 합니다.

아래쪽 코드 는 공식 예제 () 에서 나온다[demo地址](http://layaair2.ldc2.layabox.com/demo2/?language=ch&category=3d&group=Shader&name=Shader_Terrain)）：

> 새 버전 등록 매크로 정의


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


> 오래된 버전 등록 매크로 정의


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


매크로 등록이 끝나면 개발자는 통과할 수 있다**Basematerial**의`_shaderValues:ShaderData`속성`addDefine`과`removeDefine`매크로 정의를 추가합니다.

주의: 매크로 정의된 조작 통합을 추가하여 ShaderData 는 2.2.0 버전의 최적화, 이 이전 버전 개발자는 'defineDatas: Definedatas 속성 있는 add 와 remove 방법으로 사용됩니다.새 버전도 호환 (# udefineDatas # 거창을 추가합니다.

아래의 코드 는 공식 예례 () 에서 나온다[demo地址](http://layaair2.ldc2.layabox.com/demo2/?language=ch&category=3d&group=Shader&name=Shader_Terrain)）:

> 새 버전 사용 매크로


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


> 오래된 버전 사용 매크로

기존 버전에서 매크로 사용했으며, SubShader 초기화에 전입되기 전에 언급한 두 개의 인자가 필요하다.

`spriteDefines`요정의 매크로 정의 집합.이 값은 엔진 중 기본 요정 매크로 정의 집합을 사용할 수 있다`RenderableSprite.shaderDefines`.

`materialDefines`소재의 매크로 정의 집합.이 수치는 바로 앞에서 초기화된 것이다`shaderDefines`.


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


####장단점:

매크로 착색기의 코드를 더욱 간소화하고 실행 효율을 더욱 높게 할 수 있다.하지만 매회 매크로 변동은 색기 코드 (소모 시간이 필요합니다.