#애니메이션

###1. 애니메이션 개술 완화

게임 개발 중 유동 애니메이션이 비교적 흔하다. 게임 UI 체험을 높이는 중요한 요소 중 하나다. 예를 들어 대화상자를 닫고, 단추의 움직임이 사라지고, 도구가 배낭에 날아 들어가는 등, Layair 엔진이 제공하는 Tween 은 유동류와 Ease 종류를 그대로 사용하여 빨리 실현할 수 있다.

`Tween`유동류는 목표 대상 속성의 완화, 예를 들어 목표 대상의 x 혹은 y 축 의 완동 거리 등 목표 가치 설정, 유동 시작, 정지, 청소 등 설정을 사용한다.더 많은 Tween API

`Ease`종류 는 대량 의 완화 함수 를 정의하여 실현하기 위해 다량 의 완화 함수 를 정의했다`Tween`애니메이션의 구체적 완화 효과.Layair 엔진의 Tween 종류와 Ease 종류를 결합하여 사용하면 기본적으로 게임 개발의 완화 효과를 만족시킬 수 있다.링크 클릭 누르면 API 보기:[https://layaair.ldc.layabox.com/api/?category=Core&class=laya.utils.Tween](https://layaair.ldc.layabox.com/api/?category=Core&class=laya.utils.Tween)

`Ease`API 중 유동 함수에 대한 기초 소개를 하고 링크 링크를 클릭하면 API 를 직접 볼 수 있습니다:[https://layaair.ldc.layabox.com/api/?category=Core&class=laya.utils.Ease](https://layaair.ldc.layabox.com/api/?category=Core&class=laya.utils.Ease)

`Ease`종류의 API 의 모든 완화 함수 효과를 보여 줄 수 있습니다. 연결: httttps: //layair.ldc.layabox.com/demo? category = 2d & group = Tween& name = Easefunction Demo





###2. 유동류의 상용 API 소개

####2.1 Tween 유동류 상용 방법 from () 과 to ()

유동류 Tween 은 비교적 많은 방법 을 제공했으나, 우리 는 상용 하는 것 은 두 종류 로 나누어 쓰 고 있다`from()`과`to()`방법 이 두 가지 방법 의 인자 설정 은 완전히 같 지만 효과 는 다소 다르지만, from 은 목표 지점 에서 초기 위치 에 운동 (* 완화 목표 위치 에서 *) 을 이동 하는 위치 에서 이동 목표 를 지향 하는 위치 에서 운동 (* 을 유지 한다`到缓动目标位置去`) 뒤에는 실례가 결합돼 상세하게 설명하고 개발자는 이 두 방법의 기초설명을 먼저 알아볼 수 있다.

![图1](img/1.png) 


(그림 1)

####2.2 상용 인자 설명

`to()`과`from()`이 두 가지 방법은 모두 정적 방법을 지지하기 때문에 우리는 실례화된 Tween 종류를 사용하지 않아도 된다.

그림 1의 API 설명을 통해`to()`과`from()`그것들의 인자가 이해하기 쉽기 때문에, 이것은 props, duration, ease, complete, delay 인자를 강조합니다.

#####props

props 는 목표 대상이 바뀌어야 하며 효과의 속성을 유발한다.대상의 공공속성은 모두 설정할 수 있다. 예를 들면 가장 흔한 x, y 위치 속성, alpha 투명 속성, 회전, 축, 크기 등 다른 속성.

#####duration

duration 은 효과의 유예를 집행하는 데 시간이 걸릴 때, 단위는 호초로, 시간이 많을수록 느리게 움직인다.

#####ease

ease 는 유형 유형을 완화시키기 위해 Ease 종류에 대한 다양한 함수를 사용하여 애니메이션의 변화 과정을 바꿀 수 있으며, 레이야아 엔진은 매우 많은 유예 방법을 개발자들의 선택을 제공합니다.개발자는 API 또는 홈페이지의 엔진 예례에서 이동함수를 전환하고 완화 효과를 관찰하고 링크 주소:[https://layaair.ldc.layabox.com/demo/?Tween_EaseFunctionsDemo](https://layaair.ldc.layabox.com/demo/?Tween_EaseFunctionsDemo)

#####complete

complete 가 완화되기 위해 완료된 후 반전 방법.예를 들어 버튼이 나타난 완만하게 움직일 때 사용자가 클릭할 수 없습니다. 이 때 완화되어 되돌림 함수에 다시 가입 버튼 감청을 할 수 있습니다.

#####delay

delay 는 실행 지연 시간, 잠시 후 실례 중 텍스트 실행 완화의 파동 효과를 실행할 수 있습니다.



###3. 실례를 늦추다

####3.1 Tween.from () 의 실례

다음 코드에서 Tween.from () 방법을 통해 "Layabox" 문자의 텍스트를 완화합니다.

TweenDemo.as 문서류 만들기, 코드 작성:


```java

package 
{
	import laya.display.Text;
	import laya.utils.Tween;
	import laya.utils.Ease;
	import laya.webgl.WebGL;
	
	public class TweenDemo
	{
		
		public function TweenDemo() 
		{
			// 初始化舞台
			Laya.init(1334,750, WebGL);

			//背景颜色
			Laya.stage.bgColor = "#1b2436";
			
			//创建缓动文本
			createTween();
		}
		
		//创建缓动文本
		private function createTween():void 
		{	
			
			//"LayaBox"字符串总宽度
			var w:int = 800;
			
			//文本创建时的起始x位置(>>在此使用右移运算符，相当于/2 用>>效率更高)
			var offsetX:int = Laya.stage.width - w >> 1;

			//显示的字符串
			var demoString:String = "LayaBox";
			
			var letterText:Text;
			
			//根据"LayaBox"字符串长度创建单个字符，并对每个单独字符使用缓动动画
			for (var i:int = 0, len:int = demoString.length; i < len; ++i)
			{
				//从"LayaBox"字符串中逐个提出单个字符创建文本
				letterText = createLetter(demoString.charAt(i));
				letterText.x = w / len * i + offsetX;
				
				//文本的初始y属性
				letterText.y = 300;

				//对象letterText属性y从缓动目标的100向初始的y属性300运动，每次执行缓动效果需要3000毫秒，缓类型采用elasticOut函数方式，延迟间隔i*100毫秒执行。
				Tween.from(letterText, { y : 100 }, 3000, Ease.elasticOut, null, i * 1000);
			}
		}
		
		
		//创建单个字符文本，并加载到舞台
		private function createLetter(char:String):Text
		{
			var letter:Text = new Text();
			letter.text = char;
			letter.color = "#FFFFFF";
			letter.font = "Impact";
			letter.fontSize = 180;
			Laya.stage.addChild(letter);			
			return letter;
		}
	}
}
```


실행 효과

![动图2.gif](img/2.gif)< br / > (동영상 2)

실제 코드 를 결합 한 뒤 도 2 의 운동 효과 를 알 수 있 는 텍스트 'Layabox' 는 초기 위치 (* y 축 300 *) 가 나타난 후 순간 사라진 후, 유동 방법 Tween.from 설정 의 목표`{ y : 100 }`(*y 축 100*) 초기 위치에 운동 (위에서 아래까지 완화 효과)

이 방법은 초기 위치에서 나타났기 때문에 순간적으로 움직이는 목표 위치에서 사라지고 초기 위치로 운동을 한다.시각차가 생기면 더욱 반탄 효과를 느낄 수 있다.그래서 Tween.to 의 효과를 계속 파악하고 개발자는 어떤 유예 방법을 선택해야 할지 선택할 수 있다.

####3.2 Tween.to 의 실례

우리는 계속 윗부분의 실례를 채택할 수 있습니다. 다만 Tween.from 을 Tween.to 로 바꾸고 실행 효과를 먼저 보십시오.


```java

//文本的初始y属性
letterText.y = 300;
//Tween.from(letterText, { y : 100 }, 3000, Ease.elasticOut, null, i * 1000);//注释本行改为将Tween.from改变为Tween.to
Tween.to(letterText, { y : 100 }, 3000, Ease.elasticOut, null, i * 1000);
```


실행 효과는 동도 3의 시사와 같다

![动图3.gif](img/3.gif)< br / > (동영상 3)

코드를 결합하면 동영상 3의 효과를 보고 Tween.to (Tween.to) 는 더욱 직관적으로 볼 수 있다.초기 속성 y 300, 유동 방법 속성 중 y 100`{ y : 100 }`)그래서 동영상 3은 아래로부터 유동 운동 효과가 발생한다(솔직하게 말하면 탄기 완동 효과)다.

####3.3 props 인자 이해

Tween.from, Tween.to, 두 번째 인자 Props(속성)가 효과적인 운동 궤적 등에 영향을 미칠 수 있다.

Tween.from 과 Tween.to 의 완화 효과는 본래 반대이기 때문에 Tween.from은 하락적인 느낌으로 3의 Tween.to는 위로 튀어나온 느낌을 준다.

우리가 초기 y 의 속성가치와 완만하게 목표를 달성하는 y 속성값을 맞추고 다시 한 번 살펴보면 Tween.to 가 실현한 하락효과는 Tween.from 과 무엇이 다를까.

계속 이어지기 전의 예례를 계속 이어가며 코드 수정은 다음과 같습니다.


```java

//文本的初始y属性
letterText.y = 100;
//Tween.from(letterText, { y : 100 }, 3000, Ease.elasticOut, null, i * 1000);//注释本行改为将Tween.from改变为Tween.to
Tween.to(letterText, { y : 300 }, 3000, Ease.elasticOut, null, i * 1000);
```


실행 효과 는 동도 4 개 의 보여 준다

![动图4.gif](img/4.gif)< br / > (동영상 4)

애니메이션 4 중 첫 y 속성은 100, Tween.to 의 효과는 초기 속성에서 목표를 완화시키는 속성으로 운동을 한다.그래서 목표를 늦추는 Y 속성은 300 시 초초y 축에서 100은 Y 축 300으로 운동하는 것도 떨어지는 효과다.Tween.from 과 떨어지는 효과가 뚜렷하게 달라진다.그래서 개발자는 운용할 때 양자의 효과 차이를 주의해야 한다.

####3.4 이해완화 시간 (* duration *) 지연 실행 (* * delay *)

앞의 예를 계속 사용하면 세 번째 인자 duration 을 1000밀리초로 수정하고, 여섯 번째 인자 delay 를 100밀리초로 수정하고, 효과는 동영상 5개와 같이 표시됩니다.완만한 속도나 하락간격의 속도도 뚜렷한 변화가 생길 수 있다.따라서 지속 시간 또는 지연 시간 조정을 통해 다른 애니메이션 효과를 실현할 수 있다는 것을 알 수 있다.여기에는 더 이상 깊이 들어가지 않고 개발자는 스스로 체험을 조절할 수 있다.

![动图5.gif](img/5.gif)< br / > (동영상 5)

그림 5효과 수정 코드 다음과 같습니다:


```java

//文本的初始y属性
letterText.y = 100;
//Tween.from(letterText, { y : 100 }, 3000, Ease.elasticOut, null, i * 1000);//注释本行改为将Tween.from改变为Tween.to
Tween.to(letterText, { y : 300 }, 1000, Ease.elasticOut, null, i * 100);
```


####3.5 이해 ease 인자

네 번째 인자 대응`laya.utils.Ease`종류의 각 방법은 홈페이지의 엔진 예례에서 이런 방법에 대해 모두 효과를 보여 준다.개발자 링크 클릭[https://layaair.ldc.layabox.com/demo/?Tween_EaseFunctionsDemo](https://layaair.ldc.layabox.com/demo/?Tween_EaseFunctionsDemo)) 한 명씩 살펴볼 수 있고 이 예의 효과를 바꾸어 체험할 수 있다.

이번 절에서 우리는 변경하였다.`Ease.bounceIn`효과는 동도 6 개처럼 보인다.

![动图6.gif](img/6.gif)< br / > (동영상 6)

그림 6 효과 수정 코드 다음과 같습니다:


```java

//文本的初始y属性
letterText.y = 100;
//Tween.from(letterText, { y : 100 }, 3000, Ease.elasticOut, null, i * 1000);//注释本行改为将Tween.from改变为Tween.to
Tween.to(letterText, { y : 300 }, 1000, Ease.bounceIn, null, i * 100);
```





####3.6 이해 완료(*complete*) 인자

다섯 번째 인자 complete 는 완화 효과를 수행한 후 반전에 사용된다.Google은 이전의 예를 그대로 사용하여 완화되고 나면 글꼴 색깔을 붉게 만드는 반전 방법을 추가합니다.

사용 실례:


```java

Tween.to(letterText, { y : 300 }, 1000, Ease.bounceIn, Handler.create(this,changeColor,[letterText]), i * 100);
```


새로운 인용을 늘려야 하기 때문에, 이번에 전부된 사례 코드.

TweenDemo.as:


```java

package 
{
	import laya.display.Text;
	import laya.utils.Ease;
	import laya.utils.Handler;
	import laya.utils.Tween;
	import laya.webgl.WebGL;
	
	public class TweenDemo
	{
		
		public function TweenDemo() 
		{
			// 初始化舞台
			Laya.init(1334,750, WebGL);

			//背景颜色
			Laya.stage.bgColor = "#1b2436";
			
			//创建缓动文本
			createTween();
		}
		
		/**
		 * 创建缓动文本
		 */	
		private function createTween():void 
		{	
			
			//"LayaBox"字符串总宽度
			var w:int = 800;
			
			//文本创建时的起始x位置(>>在此使用右移运算符，相当于/2 用>>效率更高)
			var offsetX:int = Laya.stage.width - w >> 1;

			//显示的字符串
			var demoString:String = "LayaBox";
			
			var letterText:Text;
			
			//根据"LayaBox"字符串长度创建单个字符，并对每个单独字符使用缓动动画
			for (var i:int = 0, len:int = demoString.length; i < len; ++i)
			{
				//从"LayaBox"字符串中逐个提出单个字符创建文本
				letterText = createLetter(demoString.charAt(i));
				letterText.x = w / len * i + offsetX;
				
				//文本的初始y属性
				letterText.y = 100;

				/**
				* 对象letterText属性y从100缓动到300的位置
				* 用1000毫秒完成缓动效果
				* 缓动类型采用bounceIn
				* 单个字符的缓动效果结束后，使用changeColor回调函数将字符改变为红色
				* 延迟间隔i*100毫秒执行
				*/
				Tween.to(letterText, { y : 300 }, 1000, Ease.bounceIn, Handler.create(this,changeColor,[letterText]), i * 100);
			}
		}
				
		/**
		 * 缓动完成后的回调方法
		 * @param txt  缓动对象
		 */		
		private function changeColor(txt:Text):void
		{
			//将文本字体改变成红色
			txt.color="#FF0000";			
		}		
		
		/**
		 * 创建单个字符文本，并加载到舞台
		 */		
		private function createLetter(char:String):Text
		{
			var letter:Text = new Text();
			letter.text = char;
			letter.color = "#FFFFFF";
			letter.font = "Impact";
			letter.fontSize = 180;
			Laya.stage.addChild(letter);			
			return letter;
		}
	}
}
```


코드 실행 효과

![动图7](img/7.gif) 







####3.7 Props 인자를 통해 프로세스 전환 과정

complete (* 메아리 *) 인자를 완성할 수 있으며, 다섯 번째 인자에서 이루어질 수 있을 뿐만 아니라 두 번째 인자 Props 에서 이루어질 수 있습니다.하지만 코드를 더 또렷하게 읽기 위해 Props 에 되돌릴 것을 제안하지 않는다.

여기에는 Props 에서 update 업데이트 재생 을 소개합니다.만약 우리가 유동 과정에서 조정 방법을 집행하고 싶다면 5번째 인자 중 실현이 불가능하다는 것이다. 5번째 인자가 완화되고 나서야 집행되기 때문이다.그래서 우리는 기존 예시를 따라 Props 인자에 글꼴 색상의 업데이트 조정을 추가합니다.

사용 실례:


```java


/**
* 对象letterText属性y从100缓动到300的位置，每一帧都通过回调方法更新颜色
* 用1000毫秒完成缓动效果
* 缓动类型采用bounceIn
* 单个字符的缓动效果结束后，使用changeColor回调函数将字符改变为红色
* 延迟间隔i*100毫秒执行
*/

Tween.to(letterText, { y : 300, update: new Handler(this, updateColor,[letterText])}, 1000, Ease.bounceIn, Handler.create(this,changeColor,[letterText]), i * 100);
```


모든 예시 코드, TweenDemo.as:


```java

package 
{
	import laya.d3.math.Rand;
	import laya.display.Text;
	import laya.utils.Ease;
	import laya.utils.Handler;
	import laya.utils.Tween;
	import laya.webgl.WebGL;
	
	public class TweenDemo
	{
		public function TweenDemo() 
		{
			// 初始化舞台
			Laya.init(1334,750, WebGL);

			//背景颜色
			Laya.stage.bgColor = "#1b2436";
			
			//创建缓动文本
			createTween();
		}
		
		/**
		 * 创建缓动文本
		 */	
		private function createTween():void 
		{	
			
			//"LayaBox"字符串总宽度
			var w:int = 800;
			
			//文本创建时的起始x位置(>>在此使用右移运算符，相当于/2 用>>效率更高)
			var offsetX:int = Laya.stage.width - w >> 1;

			//显示的字符串
			var demoString:String = "LayaBox";
			
			var letterText:Text;
			
			//根据"LayaBox"字符串长度创建单个字符，并对每个单独字符使用缓动动画
			for (var i:int = 0, len:int = demoString.length; i < len; ++i)
			{
				//从"LayaBox"字符串中逐个提出单个字符创建文本
				letterText = createLetter(demoString.charAt(i));
				letterText.x = w / len * i + offsetX;
				
				//文本的初始y属性
				letterText.y = 100;

				/**
				 * 对象letterText属性y从100缓动到300的位置，每一帧都通过回调方法更新颜色
				 * 用1000毫秒完成缓动效果
				 * 缓动类型采用bounceIn
				 * 单个字符的缓动效果结束后，使用changeColor回调函数将字符改变为红色
				 * 延迟间隔i*100毫秒执行
				 */
			
				Tween.to(letterText, { y : 300, update: new Handler(this, updateColor,[letterText])}, 1000, Ease.bounceIn, Handler.create(this,changeColor,[letterText]), i * 100);
			}
		}
		
		/**
		 * 缓动进行时的回调更新方法
		 * @param txt  缓动对象
		 */			
		private function updateColor(txt:Text):void
		{
			
			var c:int = parseInt(Math.random()*3);
			switch(c)
			{
				case 0:
				{
					txt.color="#EEE000";
					break;
				}
				case 1:	
				{
					txt.color="#FFFFFF";
					break;
				}
				case 2:	
				{
					txt.color="#FF0000";
					break;
				}
				default:
				{					
					txt.color="#EEE000";
					break;
				}
			}
		}		
		
		/**
		 * 缓动完成后的回调方法
		 * @param txt  缓动对象
		 */		
		private function changeColor(txt:Text):void
		{
			//将文本字体改变成红色
			txt.color="#FF0000";
		}		
		
		/**
		 * 创建单个字符文本，并加载到舞台
		 */		
		private function createLetter(char:String):Text
		{
			var letter:Text = new Text();
			letter.text = char;
			letter.color = "#FFFFFF";
			letter.font = "Impact";
			letter.fontSize = 180;
			Laya.stage.addChild(letter);			
			return letter;
		}
	}
}
```


부호 운행시 update 반향은 매 프레임마다 실행 중이기 때문에 천천히 움직이는 과정에서 플래시 글래시 효과가 있다.동도 8 개.

![动图8](img/8.gif) 


(동도 8)



LayaiairIDE의 시간축 애니메이션 편집도 대상 속성 설정 완화 효과를 볼 수 있다.IDE 내 유동 효과 설정 방식을 알고 싶다면 '시간축 애니메이션 편집기 자세한 설명을 읽을 수 있다.