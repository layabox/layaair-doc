#게임 자동 세로 화면 및 세로 화면 상태 유지



Layaiair의 자동 세로 화면 설정을 통해 휴대전화를 어떻게 회전하든 게임의 수평방향과 브라우저에 표시할 수 있습니다.

화면 방향에 대한 API 인자가 다음 그림처럼 표시됩니다:







​	![blob.png](img/1.png)< br >>
그림 (1) 화면 방향의 적합

​![blob.png](img/2.png)< br >>
그림 (2) screenMode 설정 속성



Layair 자동 세로 화면 표시 코드:


```javascript

(function()
{
 var Stage = Laya.Stage;
 var Text  = Laya.Text;
 var WebGL = Laya.WebGL;
 (function()
 {
  // 不支持WebGL时自动切换至Canvas
  Laya.init(200, 300, WebGL);
   
  Laya.stage.alignV = "middle";
  Laya.stage.alignH = "center";
  Laya.stage.scaleMode = "showall";
   
  //自动竖屏，让游戏的水平方向始终与浏览器显示屏幕的最长边保持垂直。   
  Laya.stage.screenMode = "vertical";
   
  Laya.stage.bgColor = "#232628";
  showText();
 })();
  
 function showText()
 {
  var text = new Text();
  text.text = "游戏的水平方向";
  text.color = "gray";
  text.fontSize = 20;
   
  text.x = Laya.stage.width - text.width >> 1;
  text.y = Laya.stage.height - text.height >> 1;
   
  Laya.stage.addChild(text);
 }
})();
```




휴대폰 세로 상태의 Layaiair 자동 세로 화면 실행 효과는 아래그림처럼 표시됩니다:



​	![blob.png](img/3.png)< br >>
그림 (3) 세로 화면 다음 실행 결과 설정



휴대폰 가로등 상태의 Layaiair 자동 세로 화면 실행 효과가 하도화처럼 표시됩니다:

​![blob.png](img/4.png)< br >>
그림 (4) 최장변 이후 실행 결과 변경

