#マクロの定義と使用

###### *version :2.3.0   Update:2019-10-8*

開発者が着色器コードにマクロを使用する場合、開発者はShader 3 Dを使用する必要があります。`getDefineByName`インターフェース登録マクロ定義。

>登録マクロ定義のインターフェースは、Shader 3 Dに統一されており、2.3.*バージョンの最適化後である。これまでのバージョンでは、開発者は、ShaderDefinesのregister Defineメソッドを使用してマクロ定義を登録する必要があります。

下のコードは公式の例から来ています。[demo地址](http://layaair2.ldc2.layabox.com/demo2/?language=ch&category=3d&group=Shader&name=Shader_Terrain))

>新規バージョン登録マクロ定義


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


>古いバージョンの登録マクロ定義


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


マクロは登録が完了したら、開発者が通過できます。**BaseMaterial**の`_shaderValues:ShaderData`属性の`addDefine`を選択します`removeDefine`を選択します。

>マクロ定義を除去する操作と統合したShaderDataを追加することは2.2.0バージョンの最適化であり、これまでのバージョン開発者は、_defineDatas:DefineDatas属性のaddとremove方法を使用する必要があります。新バージョンは、除去マクロの追加にも対応しています。

以下のコードは公式の例から来ています。[demo地址](http://layaair2.ldc2.layabox.com/demo2/?language=ch&category=3d&group=Shader&name=Shader_Terrain))

>新しいバージョンはマクロを使用します


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


>古いバージョンはマクロを使用します

従来のバージョンではマクロを使用しており、Sub Shader初期化時に導入される前提があった2つのパラメータも必要である。

`spriteDefines`精霊のマクロ定義セット。この値はエンジン内のデフォルトの精霊マクロ定義セットを使用できます。`RenderableSprite.shaderDefines`。

`materialDefines`材質のマクロ定義セット。この値は前に初期化されたものです。`shaderDefines`。


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


####マクロの長所と短所：

マクロは、スケジュレータのコードをより簡素化し、より効率的に実行することができます。しかし、マクロの変更ごとに、ディスペンサーコードを再コンパイルする必要があります（時間がかかります）。