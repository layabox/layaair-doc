#SWF 애니메이션 Layair 엔진에서 사용하기

###1. Layair 엔진에서 SWF 애니메이션 사용 전제

Flash 페이지 항목을 지원하기 위해 HTML5 항목에 빠르게 이식할 수 있도록 Layaaiaia 엔진에서 SWF 파일의 변환 도구를 제공합니다. 원생의 SWF 파일을 Layair 엔진으로 변환할 수 있는 형식으로 바꾸지만 도구를 바꾸기**SWF 파일에 텍스트, 형태 점변, 마스크, 코드 같은 특수한 내용을 포함하지 않습니다.**.이런 내용을 포함하면 원SWF 의 효과나 전환에 실패할 수 없습니다.



>개발자가 Flash 및 swf 애니메이션 파일의 제작과 관련 지식을 더이상 읽을 필요가 없다. LayairIDE 제작 애니메이션을 추천한다.
>>



###2, SWF 애니메이션을 Layair 엔진 식별 형식으로 바꾸기

SWF 전환 규범에 맞는 애니메이션 파일을 준비해 레이아아이디의 디자인 모드를 열기 위해 준비합니다.

메뉴 선택`工具`->`SWF转换`SWF 변환 도구 패널을 열 수 있습니다. 그림 1개처럼 보여집니다.

![图1](img/1.png) 


(그림 1)

새로 켰어요.`SWF转换`판넬 안에는 이동도 2가 보여 주어진 SWF 애니메이션이나 폴더를 끌어들인다.

![动图2](img/2.gif)  


(동도 2)

클릭`开始转换`동도 3 개처럼.기본값은 swf 동급 디렉터리에 생성됩니다`output`디렉토리, 성공한 후 output 디렉토리에 새로운 swf 및 그림 폴더 (* * 하청 패턴을 선택하면 그림 폴더를 사용하지 않고, 그림 폴더를 사용합니다.

![动图2](img/3.gif)   




(동도 3)

**Tips**：

-복잡한 swf 파일이 여러 개의 비트맵을 생성할 수 있기 때문에 제안합니다.`开始转换`전확인선`是否打包为图集`.

- output 디렉토리에서 기본 생성, 개발자는 경로 표시줄 입력, 클릭`更改`출력 디렉터리 변경.

-도구가 생성된 새 swf 다시 바꿀 수 없습니다.

​



###3, 변환 후 swf 애니메이션 사용

####3.1 복제 후 swf 자원 프로젝트

swf 애니메이션 사용하기 전에 우리는 먼저 도구를 바꾸어 생성할 것이다`.swf`형식 파일`图集文件`프로젝트의 자원 디렉토리 복사 (* 본례는 프로젝트 루트 디렉토리 아래에 있는 res/swf/swf/디렉토리 *), 동영상 4가 보여 줍니다.

![图4](img/4.gif)  


(동도 4)

**Tips**：

##-동영상 4 중 폴더는 본례의 동작에 따라 복제할 필요가 없습니다. 그림 방식을 사용하지 않으면 swf 및 그림 폴더만 생성할 수 있습니다. 이때 폴더를 복사해야 합니다.클래식에서 폴더를 복제하지 않으려면 시스템의 자원 관리자가 필요하며 시스템 내에서 붙여넣기 위해 복사할 것입니다.



####3.2 재생 swf 애니메이션 API:MovieClip

Layaiair 엔진에서 전환된 swf 애니메이션을 사용하려면 사용해야 합니다**MovieClip 종류**API 설명은 그림 5개, API 링크:[https://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ani.swf.MovieClip](https://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ani.swf.MovieClip)

![图5](img/5.png) 


(그림 5)

####3.3 코드 로 swf 애니메이션 재생

swf 애니메이션의 예례를 재생합니다. 아래 코드가 제시한 것처럼:

입구 종류 MovieClipsample.as


```java

package  
{
	import laya.ani.swf.MovieClip;
	
	public class MovieClipSample 
	{
		
		public function MovieClipSample() 
		{
			//初始化舞台
			Laya.init(1334, 750);
			
			//创建一个 MovieClip 实例
			var mc:MovieClip = new MovieClip();
			
			//添加到舞台
			Laya.stage.addChild(mc);
			
			//加载swf资源,load方法的第二个参数不设置为散图模式加载，设置为true是采用图集方式加载。
			mc.load("res/swf/monkey.swf",true);

		}
	}
}
```

