#Shader 미리 번역

###### *version :2.3.0   Update:2019-10-8*

Shader 를 사용할 때 엔진이 Shader를 편집할 수 있습니다.그래서 Shader 가 복잡할 때 카드를 보일 수도 있다.이 카드를 피하기 위해서는 Shader 편역이 필요하다.

###1. 컴파일을 가져온 Shader 목록

설치`Shader3D.debugMode = true `다음 게임을 한 번 뛰고 나서 콘솔에서 그린 글꼴로 출력한 shader 컴파일을 볼 수 있습니다.

> 공식 지형 shader 예례

[] (img/1.png)<br>

###2. 정보 추출, Shader 컴파일

미리 편집 인터페이스: Shader3D 중`compileShader`과`compileShaderByDefineNames`


```typescript

/**
 * 通过宏定义名字编译shader。
 * @param	shaderName Shader名称。
 * @param   subShaderIndex 子着色器索引。
 * @param   passIndex  通道索引。
 * @param	defineNames 宏定义名字集合。
 */
static compileShaderByDefineNames(shaderName: String, subShaderIndex: Number, passIndex: Number, defineNames: Array): void

/**
 * 通过宏定义遮罩编译shader。
 * @param	shaderName Shader名称。
 * @param   subShaderIndex 子着色器索引。
 * @param   passIndex  通道索引。
 * @param	defineMask 宏定义遮罩集合。
 */
static compileShader(shaderName: String, subShaderIndex: Number, passIndex: Number, defineMask: Array): void
```


**주의:**사용자 컴파일러가 2.2.0beta4를 편집하기 전까지 compilleShader 인터페이스만 shader 컴파일에 사용됩니다.개발자는 인터페이스에 따라 대응 인자를 기입하면 된다.

shader.debugMode 를 켜고 출력에서 필요한 정보를 찾을 수 있습니다.
>> compillshaderByDefineNames 인터페이스를 사용하여 Shader 편집했습니다.


```typescript

//初始化Shader
CustomTerrainMaterial.initShader();
//预编译Shader
Laya.Shader3D.compileShaderByDefineNames('CustomTerrainShader',0,0,[]);
Laya.Shader3D.compileShaderByDefineNames('CustomTerrainShader',0,0,['CUSTOM_DETAIL_NUM4']);
```


>> 사용하는 compill Shader 인터페이스 컴파일 Shader


```typescript

//初始化Shader
CustomTerrainMaterial.initShader();
//预编译Shader
Laya.Shader3D.compileShader('CustomTerrainShader',0,0,[]);
Laya.Shader3D.compileShader('CustomTerrainShader',0,0,[0,0,262144]);
```


두 인터페이스의 차이:

`compileShader`사용된 매크로 정의 마스크 집합 편집, 후자가 사용한 매크로 정의 이름 집합 편집.전자의 속도는 더 빨라지지만 개발자가 매크로 정의 순서를 조정하면 미리 편역하는 인자를 동시 수정해야 한다.

`compileShaderByDefineNames`매크로 정의 이름 집합 실현 예편집, 모든 것은 매크로 정의 순서 조정 영향을 받지 않기 때문에 더욱**추천**개발자는 이 방법을 사용하여 shader 컴파일을 번역한다.