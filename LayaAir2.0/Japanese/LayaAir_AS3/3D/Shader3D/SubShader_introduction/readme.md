#Sub Shaderの紹介

###### *version :2.3.0   Update:2019-10-8*

​**Sub Shader着色器**Shaderのレンダリングスキームとして理解できる。各Shaderは少なくとも1つのsub Shaderであり、複数のsub Shaderを有してもよい。

LayaAir 3 DにおけるSub Shader属性の紹介：

​`setFlag`マークを追加します。

​`getFlag`マークを取得します。

​`addShaderPass`ShaderPassを追加します。

###1.Sub Shaderを作成する

前の簡単なカスタムsharerで使用しています。私たちはもう簡単にsubsharerに接触しました。そしてもう最も重要なものを使っています。`addShaderPass`ShaderPassインターフェースを追加します。


```typescript

 //所有的attributeMap属性
var attributeMap:Object = {
    'a_Position': VertexMesh.MESH_POSITION0,
    'a_Normal': VertexMesh.MESH_NORMAL0
};

//所有的uniform属性
var uniformMap:Object = {
    'u_MvpMatrix': Shader3D.PERIOD_SPRITE, 
    'u_WorldMat': Shader3D.PERIOD_SPRITE
};

//通过 __INCLUDESTR__ 方法引入顶点着色器程序和片元着色器程序。
var vs:String = __INCLUDESTR__("customShader/simpleShader.vs");
var ps:String = __INCLUDESTR__("customShader/simpleShader.ps");

//注册CustomShader 
var customShader:Shader3D = Shader3D.add("CustomShader");

//创建一个SubShader
var subShader:SubShader = new SubShader(attributeMap, uniformMap);

//我们的自定义shader customShader中添加我们新创建的subShader
customShader.addSubShader(subShader);

//往新创建的subShader中添加shaderPass
subShader.addShaderPass(vs, ps);
```


###2.atributeMapとuniformMap

ここではSub Shaderを作成する際に必要な二つの重要なパラメータについて重点的に説明します。`attributeMap`を選択します`uniformMap`。

>について`spriteDefines`を選択します`materialDefines`後ろにあります**Shaderマクロ定義**篇の解説同時に2.3.*バージョンでSub Shaderの作成を最適化しました。この二つの属性を再送信しなくてもいいです。

！[](img/1.png)<br/>

この二つ**Object**自分のShaderの中のatribute変数名またはuniflom変数名をkeyといいます。たとえばauPosition、uuumvpMatrix。

**atributeMap**のkeyに対応するvalueは、レンダリング時に対応する頂点チャネルである。

**uniformMap**のkeyに対応するvalueは、その属性の提出期間である。

`uniformMap`現在サポートされているサイクルタイプ:

＊Shader 3 D.PERIOD＿CAMERA**：sharder変数の提出周期は、カメラごとです。****
****
**Shader 3 D.PERIOD＿USTOM**：sharder変数の提出周期、カスタマイズ。****
****
**Shader 3 D.PERIOD＿Material**：sharder変数の提出周期は、材質ごとに。****
****
**Shader 3 D.PERIOD＿ENE**：sharder変数の提出周期は、シーンごとに。****
****
**Shader 3 D.PERIOD＿SPRITE＊：sharder変数の提出周期は、精霊とカメラを追うので、注：精霊はMVPマトリックスを含み、複合特性であるため、カメラが変化した時も提出してください。

シーンごとに、精霊とカメラを追う、この3つのサイクルのuniformはエンジンから自動的に入力された値です。

素材ごとにカスタム周期のuniformが開発者によって引き継がれてきました。公式の例の多いPassのように辺を描いてsharderの中で（[demo地址](http://layaair2.ldc2.layabox.com/demo2/?language=ch&category=3d&group=Shader&name=Shader_MultiplePassOutline)）開発者が自分で処理したもの**エッジの色**を選択します**線幅を引く**等uniform値。（開発者がどうやって自分で処理するかについてはuniform値は**シャダー関連のuniform**篇の中で解説する

エンジンサポートのアストラスクについては、エンジンによって処理されたuniformと対応テーブルを見ることができます。（atributeテーブル、uniformテーブル）


