#Layaiair 엔진 스피드 골격 애니메이션

"LayairierIDE 2.0 버전 캡처 설명을 통해 최신 안정된 버전을 다운로드하는 LayairIDE, 최신 버전을 최신 버전으로 다운로드해 주세요.

Spine 골격 애니메이션은 게임에서 자주 사용하는 골격 애니메이션 중 하나로 레이에이에이어이드 자체 전환 도구를 통해 Spine 골격 애니메이션 형식을 Layair 엔진에서 지원하는 골격 애니메이션 형식으로 바꿀 수 있다.



###1, 원판 Spine 골격 애니메이션 내보낼 때 주의사항

원판 Spinne 골격 애니메이션이 나올 때 몇 가지 사항이 주의해야 한다. 그렇지 않으면 전환할 수 없다.

####1.1은 JSON 형식의 전환만을 지원합니다

Spine 골격 애니메이션 지원은 JSON 과 2진수 양의 데이터 내보내기 방식을 지원할 수 있으며, Layairide의 Spine 변환 도구는 JSON 형식의 변환만을 지원한다.JSON 형식으로 내보내십시오.

####1.2 내보내는 중 그림 만들기

LayaiairIDE Spine 변환 도구는 도집 모드만 지원하는 Spinne 골격 애니메이션 전환을 위해 Spine 골격 애니메이션 편집 도구를 사용할 때 반드시 골라야 한다`创建图集`그림 1 개.

![图1](img/1.png) 


(도 1) Spine 골격 애니메이션 편집 도구의 인터페이스

####1.3 도화 포장 설정 항목에서 회전 옵션을 선택할 수 없다

Spine 골격 애니메이션 편집 도구의 도집 오른쪽 만들기, 클릭`设置`단추를 패키지 설정 (Pack Settings) 인터페이스를 입력합니다.구역 설정에 있는 거 확인하셔야 돼요.`旋转`옵션은 미취 상태에 있다.고르다`旋转`선택한 후 LayairierID에서 Spine 도구를 바꾸어 성공할 수 없습니다.

![图2](img/2.png) 


(도 2) 스핀 골격 애니메이션 내보내는 그림 패키지 설정 인터페이스

####1.4 내보내는 Spine 버전을 주의해야 합니다.

Layaiairide는 모든 스핀 버전이 바뀌는 것이 아닙니다.지원하는 버전 번호는 Spine 변환 도구 패널에 표시되어 있습니다.본편 문서를 마감할 때, Spin은 3.4.0.2 버전부터 3.6.16버전까지 지원했다.후속으로 LayairierID는 정기적으로 Spinne 버전의 업데이트를 진행하며 개발자는 도구 판넬의 버전 지원 상태를 주목할 수 있습니다.

####전체 내보내기 디렉터리

생성 파일을 내보내기`atlas,json,png`형식의 문서는 그림 3시에 제시하는 것과 같다.변환 도구를 사용할 때 파일을 직접 연결하지 말고, 전체 부급 디렉토리 (* 그림 3의 spine 디렉토리 *) 를 변환 패널로 끌어들이는 것을 주의해야 합니다.

![图3](img/3.png) 


(그림 3)



###2, Spine 애니메이션을 Layair 엔진 식별 형식으로 바꾸기

####2.1 변환 도구 패널 열기

LayairIDE에서.`设计模式`메뉴 표시줄 클릭`工具`->`Spine动画转换`만일 4 시 시 면 열 수 있다`Spine格式转换`도구.

![图4](img/4.png) 


(그림 4)


열고 있어.`Spine格式转换`도구 패널에서는 톱Spine 뒤의 괄호 내에서 변환을 지원하는 spine 버전 번호로 현재 Spine 3.4.0.2, 3.6.6.16 버전 및 두 버전 사이의 Spine 골격 애니메이션이 리야아 엔진 지원하는 형식으로 변환됩니다.

![图5](img/5.png) 


(그림 5)




####2.2 생성 sk 접미사 골격 애니메이션 파일

열다`Spine格式转换`도구 패널 뒤에 spine 내보내는 자원 디렉터리를 변환판으로 끌어들이거나 브라우징 단추를 누르면 spine 내보내는 자원 디렉터리를 선택하십시오.그리고 클릭.`确定`원자원 목록 아래에서 새로운 sk 접미사 골격 애니메이션 파일을 생성할 수 있다.6 시에 제시하는 대로.

![图6](img/6.png) 


(그림 6)



###3, 스피린 애니메이션

####3.1은 프로젝트에 대응하는 디렉터리로 전환 후 spine 애니메이션 자원을 복사할 것이다.

생성된 sk 형식 파일을 제외하고, png 후두의 도집 자원도 프로젝트 목록에 복사해야 한다.(* 기타 내보내는 파일은 상관하지 않고 변환 도구만 사용합니다.*)

![图7](img/7.png) 


(그림 7)

####3.2 spine 애니메이션

아래의 예례가 사용될 것이다`laya.ani.bone.Skeleton`종류, 구체적인 API 설명은 직접 링크 열기:[https://layaair.ldc.layabox.com/api/?category=Bone&class=laya.ani.bone.Skeleton](https://layaair.ldc.layabox.com/api/?category=Bone&class=laya.ani.bone.Skeleton)

문서류 SpineDemo.a를 만들기, 코드 작성은 다음과 같습니다:


```java

package
{
	import laya.ani.bone.Skeleton;

	public class SpineDemo
	{
		public function SpineDemo()
		{
			//初始化舞台
			Laya.init(1334, 750);
			
			//创建一个Skeleton对象
			var skeleton:Skeleton = new Skeleton();
			//添加到舞台
			Laya.stage.addChild(skeleton);
			
			skeleton.pos(600,700);
			
			//通过加载直接创建动画
			skeleton.load("res/spine/spineboy/spineboy.sk");
		}
	}
}
```

실행 효과 는 동도 8 시 의 제시 와 같다

![动图8](img/8.gif) 


(동도 8)

