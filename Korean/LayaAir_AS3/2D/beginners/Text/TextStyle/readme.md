#텍스트 기초 스타일 설정

Google의 일부 항목에서 텍스트는 자주 사용됩니다. 이 텍스트에 글꼴 크기, 글꼴, 텍스트 내용 등을 제외합니다.

이 텍스트를 텍스트 내용을 추가하고 글꼴 색상을 설정합니다.

Laya.display.text 텍스트 스타일에 대한 API 인자:

![1.png](img/1.png)

![2.png](img/2.png)


```java

package {
  import laya.display.Text;
  public class LayaSample {
   
  public function LayaSample() {
  //初始化引擎
  Laya.init(1136, 640);
   
  var  txt:Text = new Text();
  txt.text = "hello_world";
  txt.color = "#ffffff";
   
  Laya.stage.addChild(txt);
  }  
  }
}
```


이 때 우리는 txt 가 무대에 첨가된 것을 볼 수 있다. txt 속 흰색의 hellou world.

이어 우리가 우리에게 주는 텍스트에 다른 글꼴 양식, 굵기, 사체, 글꼴, 글꼴 크기 등을 추가합니다.

![3](img/3.png) 



![3](img/4.png) 








```java

package {
  import laya.display.Text;
  public class LayaSample {
   
  public function LayaSample() {
  //初始化引擎
  Laya.init(1136, 640);
   
  var  txt:Text = new Text();
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
  txt.italic = true;
   
   
  Laya.stage.addChild(txt);
  }  
  }
}
```


![5](img/5.png)

여기에는 글꼴, 글꼴 크기가 뚜렷한 변화를 볼 수 있습니다. 텍스트 상자의 가장 바깥 둘레와 옅은 파란색 테두리, 텍스트 지역의 배경은 붉은색으로 변합니다.흥미가 있는 것은 개정할 수 있는 수치를 한 걸음 더 깊이 이해하는 이 속성 사용 방법이다.