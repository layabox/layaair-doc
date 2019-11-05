#텍스트 기초 스타일 설정

Google의 일부 항목에서 텍스트는 자주 사용됩니다. 이 텍스트에 글꼴 크기, 글꼴, 텍스트 내용 등을 제외합니다.

기본적인 Demo 가 텍스트를 만들고 텍스트를 추가하고 글꼴 색상을 설정합니다.

laya.display.text 텍스트 스타일에 대한 API 인자:

![1](img/1.png)</br>>

![2](img/2.png)</br>>


```typescript

//初始化引擎
Laya.init(1136,640);

var txt = new Laya.Text();
//设置文本内容
txt.text = "hello_world";
//设置文本颜色
txt.color = "#ffffff";
Laya.stage.addChild(txt);
```


이 때 우리는 txt 가 무대에 첨가된 것을 볼 수 있다. txt 속 흰색의 hellou world.

이어 텍스트에 다른 글꼴 양식, 굵기, 사체, 글꼴, 글꼴 크기 등을 추가합니다.

![3](img/3.png)< br >>

![4](img/4.png)< br >>


```typescript

//初始化引擎
Laya.init(1136,640);

var txt = new Laya.Text();
//设置文本内容
txt.text = "hello_world";
//设置文本颜色
txt.color = "#ffffff";
//设置文本字体
txt.font = "Ya Hei";
//设置字体大小
txt.fontSize = 32;
//设置文本区背景
txt.bgColor = "#c30c30";
//设置文本框的颜色
txt.borderColor = "#23cfcf";
//设置粗体、斜体
txt.bold = true;
//设置斜体
txt.italic = true;
Laya.stage.addChild(txt);
```


![5](img/5.png)</br>>

여기에는 글꼴, 글꼴 크기가 뚜렷한 변화를 볼 수 있습니다. 텍스트 상자의 가장 외곽에는 옅은 파란색 테두리가 있고, 텍스트 지역의 배경은 붉은색으로 변한다.흥미가 있으면 그 중 수치를 수정할 수 있고, 이 속성을 더 깊이 이해하는 방법.