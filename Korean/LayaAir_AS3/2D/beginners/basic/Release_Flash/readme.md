#Layair 프로젝트 플래시 버전 발표



###환경 준비

1. LayairirIDE 최신 안정 버전을 다운로드합니다.

홈페이지 주소:[http://ldc.layabox.com/index.php?m=content&c=index&a=lists&catid=27](http://ldc.layabox.com/index.php?m=content&c=index&a=lists&catid=27) 

2. 최신 Adobe Flex Sdk 을 다운로드합니다.

다운로드 주소:[https://www.adobe.com/devnet/flex/flex-sdk-download.html](https://www.adobe.com/devnet/flex/flex-sdk-download.html)

3. 디버그 디버그 디버그 디버깅에 필요한 플래쉬 debug player.

다운로드 주소:[https://fpdownload.macromedia.com/pub/flashplayer/updaters/22/flashplayer_22_sa_debug.exe](https://fpdownload.macromedia.com/pub/flashplayer/updaters/22/flashplayer_22_sa_debug.exe)



 







###배포 설정

####2.1 엔진 패키지와 플래시 운행 라이브러리 코드

　　**프로젝트에서 Layair의 Action Script3.0 버전 엔진 가방과 플래쉬 실행 라이브러리 코드 를 도입합니다.**

Layaiair의 AS3 버전 엔진 버젼 주소:[http://ldc.layabox.com/index.php?m=content&c=index&a=lists&catid=28](https://github.com/layabox/layaair/tree/master/bin/as/libs/src)

Flash 실행 라이브러리 코드 주소:[https://github.com/layabox/layaair/tree/master/bin/as/LayaAirFlash/flash/src](https://github.com/layabox/layaair/tree/master/bin/as/LayaAirFlash/flash/src)

　　*주의: 이 곳에서 패키지 경로를 도입할 때 Layair의 aair 버전 엔진 패키지를 도입하고 플래쉬 버전의 플래쉬 원코드를 도입해야 합니다.*

####2.2 glsl2agal.swc 프로젝트 추가

파일을 불러오는 디렉터리 목록을 찾았습니다. 디렉토리의 라이브러리 gl2agal.swc 항목에 추가합니다.
주소:[https://github.com/layabox/layaair/blob/master/bin/as/LayaAirFlash/flash/glsl2agal.swc](https://github.com/layabox/layaair/blob/master/bin/as/LayaAirFlash/flash/glsl2agal.swc)

####2.3 debug 시작 연결된 flash debug player 버전 설정

현재 flash debug player 버전은 최저 11.9 이상으로 요구된다.

FlashDevelop 설정, 그림 1의 보여 주기:

​![图片9.png](img/1.png)< br >>
그림 (1)

FlashBuilder 설정, 그림 2의 시범:

​![图片10.png](img/2.png)< br >>
그림 (2)

####2.4 playerglobal.swc 파일 추가 (제한 FB 환경)

프로젝트 번역은 많은 Stage3D 관련 종류를 사용해서 11.9 이상을 사용해야 한다`playerglobal.swc`파일, 이 단계는 FlashBuilder 환경에만 설정이 필요합니다.FlashBuBUUUUUUUUUUUUUULLLLSWC 경로를 찾았습니다. D D: Program Files AdobeFlashBUilder4.7 (64BBBBBBBABBUBBBUR 4 BBBBAR 4 BBBBBBBBAR R 4 Balbal. sddksssssssassasssssbilder                       _plagrogrogrogrogragragragragragragragragbal.swc, 12.0의 디렉토리를 11.9 디렉토리로 복사한 다음 playerglobal.swc:

​![图片11.png](img/3.png)< br >>
그림 (3)



###3. Flash 버전 발표

Layaiair가 제공한 samples 예를 새 프로젝트에 복사한 다음 문서가 시작된 종류를 새로 만들기 위해 Main.aaas를 예로 합니다.

Main.as 사례 코드:


```java

package
{
 import flash.display.Sprite;
 import laya.flash.Window;
 public class Main extends Sprite
 {
  public function Main(){
   //通过 Window.start 方法将测试例子Animation_Altas发布为Flash
   Window.start(this,Animation_Altas);
  }
 }
}
```




**주의:**이 프로젝트를 H5 버전으로 발표하려면 Main 류 정상에 추가해야 합니다`/*[IF-FLASH]*/`번역 매크로는 H5 버전을 발표할 때 이런 번역을 무시하는 것이다.

H5 버전을 발표할 때 원본 수정:


```java

/*[IF-FLASH]*/package
{
 import flash.display.Sprite;
 import laya.flash.Window;
 public class Main extends Sprite
 {
  public function Main(){
  //通过 Window.start 方法将测试例子Animation_Altas发布为Flash
   Window.start(this,Animation_Altas);
  }
 }
}
```




###넷, 주의사항과 흔히 볼 수 있는 오류:

4.1 프로젝트 안에 JS 라이브러리를 도입하면 현재 항목을 플래쉬 버전으로 출력할 수 없습니다.

4.2가 발표한 플래쉬 버전은 반드시 11.9 또는 높은 버전이다.그렇지 않으면 나타날 수 있다`Error: Definition flash.display3D:Context3D could not be found.`잘못 보고를 기다리다

4.3 실행 프로젝트에서 가끔 항목 내함수 호출 인자 수와 실제 인자 숫자가 일치하지 않는 경우가 있다.예:


```javascript

[Fault] exception, information=ArgumentError: Error #1063: Animation_Altas/createAnimation() 的参数数量不匹配。应该有 0 个，当前为 1 个。
```


이것은 함수 호출이 JS 보다 더 엄격한 제한이 있기 때문입니다. 우리는 많은 인자 곳에 e: X = null 같은 인자를 합류할 수 있기 때문입니다.

함수 대비 함수 원형 인자가 적은 곳에서 함수의 원형 인자를 기본 인자로 변경하고, 예를 들어 p = null.

4.4 (고급 기능) 항목에 사용자 정의 Layaiair GLSL Shader, 결정된 GSLS 파일 Embed FlashMain 파일로 연결되어 Window.start 전에 이 Shader 를 초기화하고 다음과 같은 코드:



```javascript

public class FlashMain extends Sprite {
 [Embed(source = "./display/MutiAni/shader/aniShader.vs", mimeType = "application/octet-stream")]
 public static var anishader_vs:Class;
 [Embed(source = "./display/MutiAni/shader/aniShader.ps", mimeType = "application/octet-stream")]
 public static var anishader_ps:Class;
  
 public function FlashMain() {
  // 加入项目依赖的shader ，第一个字符串参数与 __INCLUDESTR__ 的参数一致，使用扩展Shader必须使用。
  FlashIncludeStr.addExtraShader("shader/aniShader.vs", new anishader_vs);
  FlashIncludeStr.addExtraShader("shader/aniShader.ps", new anishader_ps);
   
  // 项目代码入口
  Window.start(this, Main);
 }
}
```


4.5 Layair의 laya.net.Socket 종류를 사용하여 WebSocket 을 사용할 때 응답 메시지 처리 함수 내의 인자 종류를 * 형식으로 설정해야 합니다:


```javascript

private function onMessage(e:Event=null):void {}
```


수정:


```javascript

private function onMessage(e:*=null):void {}
```


그렇지 않으면 실행 시 유형 변환 오류 표시

