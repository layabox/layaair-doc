#Shaderプリコンパイル

###### *version :2.3.0   Update:2019-10-8*

Shaderを使う時、エンジンはShaderをコンパイルします。したがって、Shaderが複雑な場合、カートンの表示を引き起こす可能性があります。これらのカートン問題を避けるために、Shaderをプリコンパイルする必要があります。

###1.コンパイルされたShaderリストを取得する

設定`Shader3D.debugMode = true `後でゲームを走って、コンソールの中で緑のフォントで出力されたsharerが関連情報をコンパイルしているのが見えます。

>使用している公式地形のsharerの例

！[](img/1.png)<br/>

###2.情報を抽出し、Shaderをプリコンパイルする

まず、プリコンパイルインターフェースを見てみます。Shader 3 Dにおける`compileShader`を選択します`compileShaderByDefineNames`


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


**注意:**前コンパイルsharder関連インターフェースは2.2.0 beta 4の前には、compleShader 1つのインターフェースだけがプレコンパイルsharderに使用されます。開発者はインターフェースに従って対応パラメータを記入すればいいです。

sharder.debugModeを開いてから、プリコンパイルに必要な情報を出力から抽出します。
>comppile ShaderByDefineNamesインターフェースを使用して、Shaderをプリコンパイルします。


```typescript

//初始化Shader
CustomTerrainMaterial.initShader();
//预编译Shader
Shader3D.compileShaderByDefineNames('CustomTerrainShader',0,0,[]);
Shader3D.compileShaderByDefineNames('CustomTerrainShader',0,0,['CUSTOM_DETAIL_NUM4']);
```


>使用するcompleShaderインターフェースプリコンパイルShader


```typescript

//初始化Shader
CustomTerrainMaterial.initShader();
//预编译Shader
Shader3D.compileShader('CustomTerrainShader',0,0,[]);
Shader3D.compileShader('CustomTerrainShader',0,0,[0,0,262144]);
```




二つのインターフェースの違い：

`compileShader`使用するマクロ定義のカバーセットをプリコンパイルし、後者はマクロ定義の名前セットをプリコンパイルします。前者の速度はより速くなりますが、開発者がマクロ定義の順序を調整すると、プリコンパイルのパラメータを同期して変更する必要があります。

`compileShaderByDefineNames`マクロ定義の名前セットを使用してプリコンパイルを行います。マクロ定義の順序調整に影響を受けないので、私達はもっと**おすすめ**開発者はこの方法を使ってsharerをプリコンパイルします。