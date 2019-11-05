#마우스 스크립트

###### *version :2.1.1   Update:2019-8-2*

레이야에르2.0에서 개발자를 편리하게 하기 위해 마우스 스크립트---Script3D 의 마우스 이벤트를 제공합니다.마우스 스크립트를 사용하려면 스크립트 owner 에서 물리적 충돌기가 필요하다.

**Tips**마우스 스크립트가 사선 검출에 의존하는 것은 개방자가 직접 사선을 만들지 않아도 된다.

**마우스 스크립트 내용:**

> Method

`onMouseClick():void`마우스 클릭 시 실행

`onMouseDown():void`마우스 눌렀을 때 실행

`onMouseDrag():void`마우스 끌 때 실행

`onMouseEnter():void`마우스 실행

`onMouseOut():void`마우스 실행

`onMouseOver():void`마우스 경과시 실행

`onMouseUp():void`마우스 팝업 시 실행

위의 방법은 모두 허술한 방법으로 사용할 때 다시 쓰면 된다.

위에서 예를 들어 우리는 마우스 스크립트를 만들었고, 원숭이 4개를 모두 스크립트를 첨가했다.

>>**스크립트 클래스**：


```typescript

class MouseScript extends Script3D{
		private var meshsp:MeshSprite3D;
		public function MouseScript() {}
		/**
		* 覆写3D对象组件被激活后执行，此时所有节点和组件均已创建完毕，此方法只执行一次
		*/
		override public function onAwake():void{
			//获取脚本的拥有者
			meshsp = this.owner as MeshSprite3D;
		}
		//物体必须拥有碰撞组件（Collider）
		//当被鼠标点击
		override public function onMouseDown(e:Event):void{
			//trace("点击到了我box",owner.name);
			//从父容器销毁我自己
			meshsp.removeSelf();
		}
	}
```


>>**주류**:


```typescript

//给四个猴子添加脚本
staticLayaMonkey.addComponent(MouseScript);
layaMonkey_clone1.addComponent(MouseScript);
layaMonkey_clone2.addComponent(MouseScript);
layaMonkey_clone3.addComponent(MouseScript);
```


마우스 스크립트의 효과를 그림 1과 같이 보여 줍니다:

[] (img/1.gif)<br>(1)
