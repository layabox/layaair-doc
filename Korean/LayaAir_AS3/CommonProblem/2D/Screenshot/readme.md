#어떻게 캡처

프로젝트가 개발하는 과정에서 캡처할 수 있는 수요가 많습니다. 예를 들면, 스크린의 내용을 캡처, 공유, 두 번 그리기 등의 내용입니다.

Layair 속 Sprite 종류에서 drawTocanvas 방법으로 캡처할 수 있는 수요를 제공했다.API 그림 1의 보이기:

![1](img\1.png)(그림 1)

API 에서 드래wToCanvas는 총 두 가지 사용방식을 알 수 있습니다.하나**그림 원본으로 그림 그리기**네, 그것도 좋아요.**원시 그림 데이터를 가져오고 인터넷으로 나누고 캡처 효과를 실현하다**.다음 우리는 이 두 가지 기능을 코드 사례로 표시할 것이다.

###1. 캡처한 그림을 다른 Sprite 에 그립니다

stage 에서 두 개의 Sprite, 원시적인 그림을 보여 줍니다. 모든 코드를 아래와 같이 표시합니다.


```typescript

package
{
	import laya.display.Sprite;
	import laya.events.Event;
	import laya.resource.HTMLCanvas;
	import laya.resource.Texture;
	import laya.webgl.WebGL;

	/**
	 *截屏 
	 * @author mengjia
	 * 
	 */	
	public class ScreenshotMain
	{
		private var sp:Sprite;
		public function ScreenshotMain()
		{
			//初始化引擎
			Laya.init(800,600,WebGL);
			//实例化一个sprite，用来显示原始图片
			sp = new Sprite();
			sp.loadImage("res/a.png");
			Laya.stage.addChild(sp);
			
			//给stage添加一个点击事件，点击之后截取原始图片中的一部分
			Laya.stage.on(Event.CLICK,this,onClick);
		}
		
		private function onClick():void
		{
			//定义一个HTMLCanvas来接收截屏返回的HTMLCanvas对象；截取原始图片中从0,0坐标开始的100*100部分图片
			var htmlC:HTMLCanvas = sp.drawToCanvas(100,100,0,0);
			//获取截屏区域的texture
			var interceptT:Texture = new Texture(htmlC);
			var spDeposit:Sprite = new Sprite();
			//绘制截取的纹理
			spDeposit.graphics.drawTexture(interceptT,0,0,100,100);
			//设置显示容器的坐标
			spDeposit.x = 300;
			Laya.stage.addChild(spDeposit);
		}
	}
}
```


실행 효과는 동도 2의 보여 주기:

![2](img\2.gif)(2)



###2, 공유 캡처 데이터 저장

그림 데이터를 서버에 보존하여 보내십시오.모든 코드 다음과 같이:


```typescript

package
{
	import laya.display.Sprite;
	import laya.events.Event;
	import laya.resource.HTMLCanvas;
	import laya.webgl.WebGL;

	/**
	 *截屏 
	 * @author mengjia
	 * 
	 */	
	public class ScreenshotMain
	{
		private var sp:Sprite;
		public function ScreenshotMain()
		{
			//初始化引擎
			Laya.init(800,600,WebGL);
			//实例化一个sprite，用来显示原始图片
			sp = new Sprite();
			sp.loadImage("res/a.png");
			Laya.stage.addChild(sp);
			
			//给stage添加一个点击事件，点击之后截取原始图片中的一部分
			Laya.stage.on(Event.CLICK,this,onClick);
		}
		
		private function onClick():void
		{
			//定义一个HTMLCanvas来接收截屏返回的HTMLCanvas对象；截取原始图片中从0,0坐标开始的100*100部分图片
			var htmlC:HTMLCanvas = sp.drawToCanvas(100,100,0,0);
			//获取原生的canvas对象
			var canvas:* = htmlC.getCanvas();
			//打印图片base64信息，可以发给服务器或者保存为图片
			trace(canvas.toDataURL("image/png"));
		}
	}
}
```


stage 를 누르면 출력하는 base64 정보를 볼 수 있습니다. 동작 그림 3에 보여 줄 수 있습니다.

![3](img\3.gif)(그림 3)



LayaNative 아래 캡처를 실현해서 넘어갈게요.[这里](https://ldc.layabox.com/doc/?nav=zh-as-7-2-7)