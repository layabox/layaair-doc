#Shader precompiler

###### *version :2.3.0   Update:2019-10-8*

Quand on utilise Shader, le moteur compile Shader.Donc, lorsque Shader est plus complexe, il y a un risque que cela entraîne l 'affichage de karton.Pour éviter ces problèmes, il faut préparer Shader.

###Accès à la liste de shader compilée

Set`Shader3D.debugMode = true `Après avoir fait le tour du jeu, on verra sur la console que le Shader produit les informations pertinentes en utilisant la police verte.

> exemples de terrain officiel utilisé

[] (IMG / 1.png) <br >

###Extraction d'informations et préformation de Shader

Nous allons d'abord voir l'interface de précompilation: dans shader3d.`compileShader`Et`compileShaderByDefineNames`


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


**Attention:**Avant 2.2.0beta4, l 'interface de corrélation Shader précompiler n' avait qu 'une seule interface pour le Shader précompiler.L 'développeur doit simplement remplir les paramètres correspondants conformément à l' interface.

Après l 'ouverture de shader.debugmode, les informations nécessaires à la précompilation sont extraites de la sortie.
> préformer shader à l 'aide de l' interface compileshaderbydefinenames


```typescript

//初始化Shader
CustomTerrainMaterial.initShader();
//预编译Shader
Shader3D.compileShaderByDefineNames('CustomTerrainShader',0,0,[]);
Shader3D.compileShaderByDefineNames('CustomTerrainShader',0,0,['CUSTOM_DETAIL_NUM4']);
```


> précompiler shader à l 'aide de l' interface compileshader


```typescript

//初始化Shader
CustomTerrainMaterial.initShader();
//预编译Shader
Shader3D.compileShader('CustomTerrainShader',0,0,[]);
Shader3D.compileShader('CustomTerrainShader',0,0,[0,0,262144]);
```




Distinction entre deux interfaces:

`compileShader`Les macro - définitions utilisées pour précompiler les ensembles de masques, ceux - ci utilisant les macro - définitions pour précompiler les ensembles de noms.La première vitesse peut être plus rapide, mais si l 'développeur ajuste l' ordre de macro défini, les paramètres précompilés doivent être modifiés de manière synchrone.

`compileShaderByDefineNames`Nous utilisons un ensemble de noms de macro - définition pour réaliser la précompilation, tout n 'est pas affecté par le réglage de macro - Définition.**Recommander**Les développeurs utilisent ce procédé pour précompiler le Shader.