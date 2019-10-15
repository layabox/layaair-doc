#Définition et utilisation de macros d 'enregistrement

###### *version :2.3.0   Update:2019-10-8*

Si un développeur utilise une macro dans le Code de colorateur, il doit utiliser shader3d.`getDefineByName`Interface Registration macro definition

> l 'interface définie par la macro d' enregistrement est harmonisée dans shader3d, après optimisation de la version 2.3 *.Dans une version antérieure, le développeur doit enregistrer la macro - définition en utilisant la méthode registerdefine des shaderdefines.

Le Code inférieur provient de l'exemple officiel.[demo地址](http://layaair2.ldc2.layabox.com/demo2/?language=ch&category=3d&group=Shader&name=Shader_Terrain)):

> nouvelle version


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


> définition de la macro d 'enregistrement de l' ancienne version


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


Après l 'enregistrement, l' développeur peut passer**Base Material**A`_shaderValues:ShaderData`Attribut`addDefine`Et`removeDefine`Pour ajouter et supprimer des macro - définitions.

> Note: l 'intégration des opérations d' ajout et d 'élimination de macro - définitions dans la version shaderdata est l' optimisation de la version 2.2.0 dans laquelle les développeurs de versions antérieures doivent utiliser des méthodes add et remove pour les attributs \ \ definedatas: definedatas.La nouvelle version est également compatible avec l 'ajout de macros de suppression à l' aide de \ \ definedatas.

Le code ci - dessous est issu de l 'exemple officiel.[demo地址](http://layaair2.ldc2.layabox.com/demo2/?language=ch&category=3d&group=Shader&name=Shader_Terrain)):

> nouvelle version utilise la macro


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


> l 'ancienne version utilise la macro

Les macros sont utilisées dans l 'ancienne version et les deux paramètres préalables à l' entrée doivent être introduits lors de l 'initialisation de subshader.

`spriteDefines`La macro des Elfes définit l 'ensemble.Cette valeur peut définir un ensemble de macros elfe par défaut dans un moteur`RenderableSprite.shaderDefines`".

`materialDefines`Macro - définit un ensemble de matériaux.La valeur est initialisée devant.`shaderDefines`".


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


####Avantages et inconvénients de la macro:

Macro permet de simplifier le Code du colorateur et d 'améliorer l' efficacité de fonctionnement.Cependant, chaque macro - changement nécessite une refonte du Code du colorateur (ce qui prend du temps).