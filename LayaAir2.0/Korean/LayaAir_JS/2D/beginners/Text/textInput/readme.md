#textInput 의 일방적인 입력 & 다렬 입력

텍스트 입력 상자는 게임에서 자주 사용하는 UI 구성 요소입니다. 언제 입력할 때 textInput 이런 종류를 사용해야 합니다. TextInput 이런 종류의 API 를 먼저 살펴보겠습니다.

laya.ui.textInput 중 모든 API 인자:

![1](img/1.png)</br>>

여기에서 텍스트의 일방적인 입력과 여러 줄 입력을 설정합니다. 일렬 입력은 한 줄 안에 입력할 수 있습니다. 여러 줄로 되돌릴 수 있는 경우 다음 줄에 입력할 수 있습니다.


```javascript

//初始化引擎,不支持WebGL时自动切换到Canvas
Laya.init(640,800,Laya.WebGL);
//设置画布的背景颜色
Laya.stage.bgColor = "#efefef";
Text_InputSingleline();
Text_InputMultiline();

function Text_InputSingleline(){
    var textInput = new Laya.TextInput("单行输入");//创建一个 TextInput 类的实例对象 textInput 。
    textInput.wordWrap = true;//设置 textInput 的文本自动换行。
    textInput.fontSize = 30;//设置 textInput 的字体大小。
    textInput.x = 0;//设置 textInput 对象的属性 x 的值，用于控制 textInput 对象的显示位置。
    textInput.y = 0;//设置 textInput 对象的属性 y 的值，用于控制 textInput 对象的显示位置。
    textInput.width = 300;//设置 textInput 的宽度。
    textInput.height = 200;//设置 textInput 的高度。
    textInput.bgColor = "#aabbcc";
    Laya.stage.addChild(textInput);//将 textInput 添加到显示列表。
}
function Text_InputMultiline(){
    var textInput = new Laya.TextInput("多行输入");//创建一个 TextInput 类的实例对象 textInput 。
    textInput.fontSize = 30;//设置 textInput 的字体大小。
    textInput.wordWrap = true;//设置 textInput 的文本自动换行。
    textInput.multiline = true;//设置textInput的多行输入
    textInput.x = 0;//设置 textInput 对象的属性 x 的值，用于控制 textInput 对象的显示位置。
    textInput.y = 300//设置 textInput 对象的属性 y 的值，用于控制 textInput 对象的显示位置。
    textInput.width = 300;//设置 textInput 的宽度。
    textInput.height = 200;//设置 textInput 的高度。
    textInput.bgColor = "#aabbcc";
    Laya.stage.addChild(textInput);//将 textInput 添加到显示列表。
}
```


실행 결과:

![2](img/2.png)</br>>

multiline 을 통해 true 로 여러 줄 입력을 열고, Google의 효과를 실현합니다.다른 인자 와 설정 Text 텍스트는 기본적으로 크기의 글꼴과 스타일과 Text 설정을 설정하는 방법과 같이 이 같은 예시의 인자 체험을 수정할 수 있습니다.