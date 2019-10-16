#도문 혼합 채팅 룸 클라이언트 (상)

###클라이언트 단순 수요 분석

지난 수업에 우리는 AS3 로 웹소cket 채팅 서버를 개발하는 과정을 설명했다. 이 수업은 클라이언트 부분의 연구를 시작한다.우선 수요에 대한 정리를 하고, 사고의 방향을 정리해!(그림 1)

![img](img/60.png)< br / > (그림 1)

사유 지도도에 따르면 클라이언트의 내용은 주류 (socket 연결, 프로세스 관리), 로그인, 채팅 인터페이스, 표정 인터페이스, 대화 면으로 일부 내용은 UI 인터페이스 제작 및 프로그램 논리적 실현을 포함한다.참고도 및 논리 다음과 같습니다:

로그인 인터페이스
게이머 닉네임이 입력되며 서버에 보내는 사용자 목록 체크, 새 단추를 누르면 사용자 정의 프로필을 누르고, 단추 로그인 채팅 인터페이스를 누르고 서버에 로그인 정보를 보낼 수 있습니다.



 ![img](img/6.png)< br / >2)

메신저 인터페이스
사용자 입력 내용 입력 내용 선택 이모티콘 표시, 발송 단추, 클릭 클릭, 클라이언트 발송 서버 방송의 메신저에 대한 대화 메시지 생성

![img](img/7.png)< br / > (그림 3)

표정 선택 인터페이스
이모티콘을 누르고 대화 인터페이스 입력 상자를 생성합니다.이 성명: 사용된 자원은 모두 원개발자 소유입니다. 본례는 연구용만 하고, 원본 코드와 자원은 상용하지 마십시오.

![img](img/8.png)< br / > (그림 4)



###프로젝트 생성 및 WebSocket 서버 연결

Layaiair IDE 열기, 새 프로젝트를 설정하고, 형식은 Action Script3.0 프로젝트, 항목 이름은 ChaatClient입니다.그리고 Flash Buider 프로젝트를 통해 항목 (Flash Buider 환경 설정을 통해 "기술 문서-2D 기초편" 을 보세요.새 Chat Client.a는 laya 엔진의 Sprite 종류를 계승하고 기본 프로그램으로 설정합니다.

![img](img/9.png)< br / > (그림 5)

우리는 클래스에서 먼저 엔진을 초기화하고, socketInit () 방법을 세우고, 지난 수업에 설치된 서버와 IP 와 포트 번호를 통해 연결합니다.

Layaiair 엔진 중 socket 은 브라우저 webSocket 의 재킷입니다. Flash 버전의 Socket 을 사용하지 않도록 주의하십시오. 그렇지 않으면 컴파일이 잘못되었습니다.

socket 실례화 후 우리는 세 가지 사건을 감청했다.

Event.OPEN, 서버 연결 여부, 연결 후 이 이벤트 발생

Event.MESSAGE, 모니터링 메시지를 받은 후 접수한 후 접수된 데이터에 따라 더 논리적으로 처리할 수 있습니다.

서버 가설 과정 중 우리는 채팅실에서 주로 세 가지 메시지를 사용하여 로그인 메시지, 대화 메시지와 사용자 이름 목록 메시지를 언급했다.로그인 메시지는 서버에서 접수되었기 때문에 클라이언트 접수 소식에서 "대화 메시지" 와 "사용자 별명 목록 메시지만 인식하면 됩니다.

Event.ERRRRRor, 연결이 잘못되었는지 확인하고 연결이 끊기면 커튼 힌트를 할 수 있습니다.

구체적인 코드 는 다음과 같다


```

package
{
	
	import laya.display.Sprite;
	import laya.display.Stage;
	import laya.events.Event;
	import laya.net.Socket;
	import laya.webgl.WebGL;
	
	/**
	 *聊天系统客户端 
	 * @author CHENZHENG
	 * 
	 */	
	public class ChatClient extends Sprite
	{

		/***客户端webSocket****/
		public static var socket:Socket;
		
		/***是否连接上webSocket服务器****/
		public static var isConnect:Boolean=false;
		
		public function ChatClient()
		{
			//初始化引擎
			Laya.init(1280, 768,WebGL);
			//最小比例缩放
			Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
			//自动横屏
			Laya.stage.screenMode = Stage.SCREEN_HORIZONTAL;
			
			//连接服务器
			socketInit();
		}
		
		/**初始化webSocket,连接服务器*/
		private function socketInit():void
		{
			//实例化客户端socket
			socket = new Socket();
			//监听是否连接服务器
			socket.on(Event.OPEN,this,socketOpen);
			//监听服务器发送的消息
			socket.on(Event.MESSAGE,this,socketMessage);
			//监听连错误
			socket.on(Event.ERROR,this,socketError);
			
			//连接服务器
			socket.connect("10.10.20.51",8999);
			//方法2：socket.connectByUrl("ws://10.10.20.51:8999");
		}
		
		/**webSocket错误,服务器断开*/
		private function socketError():void 
		{
			//服务器连接中断
			isConnect=false;
		}
		
		/**收到webSocket消息*/
		private function socketMessage(msg:String):void
		{
			//接收消息分为两类：用户昵称列表消息，对话消息
			trace("收到消息："+msg);
			//把JSON字符串转化成object
			var obj:Object=JSON.parse(msg);
			//是否用户列表类型
			if(obj.hasOwnProperty("clients"))
			{
				trace("用户昵称列表-----"+obj.clientNames);
			}//是否聊天信息
			else if(obj.hasOwnProperty("name"))
			{
				trace("用户消息-----"+obj.name+obj.head+obj.data);
			}
		}
		
		/**webSocket已连接**/
		private function socketOpen():void
		{
			trace("服务端连接成功！")
			//服务器已连接
			isConnect=true;
		}
	}
}
```


cmd 에서 node 실행 서버를 실행한 후에 클라이언트에 대한 컴파일링을 실행할 수 있습니다. 서버 cmd 콘솔에서 출력을 나타낼 수 있습니다. "플레이어가 상위권이 있습니다!" 라고 합니다.

클라이언트 실행 중인 구글 브라우저 페이지에 F12 에 따라 디버그 도구를 열 수 있습니다. Google은 "사용자 목록" 을 받았습니다. 다른 사용자가 로그인할 수 없었기 때문에 서버에 로그인을 보내지 않았기 때문에 사용자 목록이 비어있습니다.

![img](img/90.png)< br / > (그림 6)



###시각화 인터페이스 만들기

서버는 연결이 성공한 후, 채팅 클라이언트 UI 인터페이스를 만들기 시작하여 로그인, 채팅, 표정 선택을 포함합니다.

우선 Layaiair IDE 에서 자원을 가져오기 위해 좋은 미술자원을 복사할 것입니다. ChatClientlaya세 개의 폴더를 포함해서 UI 자원, face 에서 채팅 표정으로 iconu head 에서 사용자 프로필 (7)

주: 표정과 프로필 사진은 도문 어설수에 사용되므로 도화를 포장할 수 없다.폴더에 오른쪽 단추를 누르고 기본 속성 설정을 켜고, 팝업 '디렉터리 속성 설정' 인터페이스에서 '패키지' 를 선택하십시오.

![img](img/91.png)< br / > (7)

인터페이스 제작은 간단하게 소개하고 디테일하게 지도하지 않습니다!자세한 교정은 "기술 문서 — Layaiaiair IDE 편" 을 찾아보세요.

프로젝트 관리자 중 Login.ui, 형식은 Dialog 대화상자 (애니메이션 효과가 있다.chat 에서 상응하는 구성 요소, 자원 조합이 하도상에서 효과를 보여 준다.선택한 컨트롤에 대한 변수를 바꾸고, var 변수 이름은 각각: txt warning, txt _ name, icon head, btn btn ok

![img](img/92.png)< br / > (그림 8)



프로젝트 관리자 중 Chat.ui, 형식은 View 페이지입니다.chat 에서 상응하는 구성 요소, 자원 조합이 하도상에서 효과를 보여 준다.var 변수명은 각각: iconu head, txtu name, chatpanel, chatinfo, btnu face, btnu send.

![img](img/93.png)< br / > (그림 9)



프로젝트 관리자에서 새 chatFace.ui, chat 에서 표정을 끌어들인 그림으로, 최종 List 구성 요소가 다음 그림에 표시된 효과 (그림 10)var 변수는 faceList 입니다.

![img](img/94.png)< br / > (그림 10)



단축키 F12를 발표하여 '코드 모드' 에서 항목을 보기, 항목에서 유이 폴더가 생성되었으며, 안에 세 개의 UI 디스플레이: ChatUI.as, ChaatFaceUI.as, LoginUI.as.이 세 종류에서는 논리적 코드를 직접 첨가하지 말고 파생류에서 논리를 실현할 수 있기 때문이다. IDE 에서 인터페이스를 수정하면 원래의 종류를 다시 개정하고, 이전에 쓴 논리적 코드가 모두 사라질 수 있기 때문이다.



###로그인 인터페이스 기능

로그인 인터페이스의 주요 기능은 클라이언트 이름과 프로필 선택, 로그인 메시지를 보내며 서버를 받은 후 사용자 목록을 갱신할 것입니다.LoginView.a가 LoginUI 에 상속된다.
구체적인 논리는 다음과 같다:

1. 재명 검사 방법

우선 서버에서 온라인의 닉네임 목록을 얻고 입력된 별명을 통해 판단해야 합니다.

주: 클라이언트와 서버가 접속할 때 서버의 클라이언트 렌즈는 닉네임이 없고 로그인 메시지가 있는 후 부위를 해상하고 새로운 별명 목록을 모든 사용자에게 발송합니다.따라서 첫 번째 사용자가 연결된 후 서버에서 보낸 별명 목록이 비어 있습니다.

재명 검사: 닉네임 입력 상자를 통해 초점 판단을 할 때 입력 중 중명 검사를 실행하지 않는다고 밝혔고, 설명을 잃고, 중명 검사를 수행하고, 경고 메시지를 표시합니다.

2. 프로필 기능을 바꾸는 것이 비교적 간단합니다. 프로필 이미지를 클라이언트에 선택하면 클라이언트에 저장됩니다. 매번 대화 메시지를 보낼 때마다 이 메시지가 있습니다.

3. 로그인 소식을 발송하다.메시지 형식은: {{login ':': 'name': 'ChaatClient.client};} 이름이나 이름이 비어 있지 않거나, socket 연결할 때 로그인할 수 없고 메시지를 보낼 수 없고 경고 메시지를 표시합니다.

코드 다음과 같습니다:


```

package view
{
	import laya.events.Event;	
	import ui.LoginUI;

	/**
	 * 登录界面及功能
	 * @author CHENZHENG
	 * 
	 */	
	public class LoginView extends LoginUI
	{
		/**是否重名*/
		private var isSameName:Boolean=false;
		
		public function LoginView()
		{
			//警告暂时隐藏
			this.txt_warning.visible=false;
			//限制字符输入
//			this.txt_name.restrict="a-zA-Z\u4e00-\u9fa5";
			//监听文本输入
			this.txt_name.on(Event.INPUT,this,onInput)
			//监听输入文本框是否焦点是否离开
			this.txt_name.on(Event.BLUR,this,onIsName)
			//确定按钮监听
			this.btn_ok.on(Event.MOUSE_DOWN,this,onLogin)
			//头像刷新按钮监听	
			this.btn_head.on(Event.MOUSE_DOWN,this,onChangeHead)
		}
		
		/**修改用户头像*/
		private function onChangeHead():void
		{
			//头像编号增加
			ChatClient.headIndex++;
			//最多到编号15，否则重新开始
			if(ChatClient.headIndex>15) ChatClient.headIndex=0
			//改变玩家头像
			this.icon_head.skin="icon_head/head"+ChatClient.headIndex+".png"
		}
		
		/**正在输入文本*/
		private function onInput():void
		{
			//输入文本时警告不显示
			this.txt_warning.visible=false;
			//初始化警告文本
			this.txt_warning.text="您的昵称已被占用，请重新输入"
			//无重名
			this.isSameName=false;
		}
		
		/**检查是否重名*/
		private function onIsName():void
		{
			//名字输入框中文本
			var txt:String=txt_name.text;
			//检测是否重名
			if(ChatClient.clientNames.indexOf(txt)!=-1)
			{
				//有重名时显示警告
				this.txt_warning.visible=true;
				this.isSameName=true;
			}else
			{
				//无重名时用户取名成功
				ChatClient.clientName=txt;
			}
		}
		
		/**登录*/
		private function onLogin():void
		{
			//注：登录时如焦点从文本输入框移动直接点击按钮，引擎会先激发失去焦点事件，然后才激发鼠标事件！
			//如果有重名且未连接服务器，不允许登录
			if(isSameName||!ChatClient.isConnect) return;
			
			//如果没有用户昵称
			if(ChatClient.clientName=="")
			{
				//修改警告信息
				this.txt_warning.text="登录前必须输入用户昵称！"
				//显示警告
				this.txt_warning.visible=true;
				//退出登录 
				return;
			}
			
			//用户登录信息数据
			var  msgLogin:Object ={"login":"","name":ChatClient.clientName};
			//发送用户登录信息给服务器
			ChatClient.socket.send(JSON.stringify(msgLogin));
			//发送可以登录事件
			this.event("loginOK");
		}
	}
}
```




메인 Chat Client.as 를 수정하고 사용자 이름 목록, 사용자 별명, 프로필 번호, 로그인 인터페이스 등 속성 등을 추가합니다.자원을 싣고 로그인 인터페이스를 실제로 표시합니다.주: 선례적으로 인터페이스를 표시한 후 socket 연결을 진행하고, 그렇지 않으면 메시지를 받은 후 일부 논리가 틀리게 보고되고, 대상이 비어 있다.

수정된 후 주 코드 다음과 같습니다:


```

package
{
	import laya.display.Sprite;
	import laya.display.Stage;
	import laya.events.Event;
	import laya.net.Loader;
	import laya.net.Socket;
	import laya.utils.Handler;
	import laya.webgl.WebGL;

	import view.LoginView;
	
	/**
	 *聊天系统客户端 
	 * @author CHENZHENG
	 * 
	 */	
	public class ChatClient extends Sprite
	{
		/***登录界面****/
		private var login:LoginView;
		
		/***游戏所需资源数组****/
		private var assetArr:Array=[{url: "res/atlas/chat.atlas"}];
		/***客户端webSocket****/
		public static var socket:Socket;
		/***是否连接上webSocket服务器****/
		public static var isConnect:Boolean=false;
		
		/***用户昵称（用户昵称）****/
		public static var clientName:String="";
		/***用户昵称列表****/
		public static var clientNames:Array=[];
		/**用户头像编号*/
		public static var headIndex:int=0;
		
		public function ChatClient()
		{
			//初始化引擎
			Laya.init(1280, 768,WebGL);
			//最小比例缩放
			Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
			//自动横屏
			Laya.stage.screenMode = Stage.SCREEN_HORIZONTAL;
			
			//加载引擎需要的资源
			Laya.loader.load(assetArr, Handler.create(this, onLogin));
			
		}
		/**加载完资源，实例化登录UI*/		
		private function onLogin():void 
		{
			//实例化登录界面
			login=new LoginView();
			//弹出登录界面
			login.popup();
			//监听登录成功事件
			login.on("loginOK",this,onChatUI);
			//位置居中
			login.pos(Laya.stage.width - login.width>>1,Laya.stage.height - login.height>>1);
			
			//连接服务器
			socketInit();
		}
		
		/**登录设置成功后，打开聊天界面*/
		private function onChatUI():void
		{		
        	//关闭登录界面
			login.close();
		}
		
		/**初始化webSocket,连接服务器*/
		private function socketInit():void
		{
			//实例化客户端socket
			socket = new Socket();
			//监听是否连接服务器
			socket.on(Event.OPEN,this,socketOpen);
			//监听服务器发送的消息
			socket.on(Event.MESSAGE,this,socketMessage);
			//监听连错误
			socket.on(Event.ERROR,this,socketError);
			
			//连接服务器
			socket.connect("10.10.20.51",8999);
			//socket.connectByUrl("ws://10.10.20.51:8999");
		}
		
		/**webSocket错误,可能接服务器断开*/
		private function socketError():void 
		{
			//服务器连接中断
			isConnect=false;
			//错误提示
			login.txt_warning.text="服务器断开，无法登录！！"
			//显示提示
			login.txt_warning.visible=true;
		}
		
		/**收到webSocket消息*/
		private function socketMessage(msg:String):void
		{
			//接收消息分为两类：用户昵称列表消息，对话消息
			trace(msg)
			//把JSON字符串转化成object
			var obj:Object=JSON.parse(msg);
			//是否是用户列表类型
			if(obj.hasOwnProperty("clients"))
			{
				//更新用户昵称列表
				clientNames=obj.clients;
				trace("用户昵称列表-----"+ChatClient.clientNames);
			}//是否是聊天信息
			else if(obj.hasOwnProperty("name"))
			{
				trace("用户消息-----"+obj.name+obj.head+obj.data);
			}
		}
		
		/**webSocket已连接**/
		private function socketOpen():void
		{
			//服务器已连接
			isConnect=true;
			//警告信息不显示
			login.txt_warning.visible=false;
		}
	}
}
			
```




인터페이스 인터페이스 컴파일을 실행할 때 로그인 인터페이스가 이미 나타났고, 이름과 이미지 전환 기능이 정상입니다.닉네임을 작성한 후 로그인 버튼을 누르는 것은 중명이 되지 않았기 때문에 메시지를 제출하고 인터페이스를 닫았다.구글 브라우저에서 F12 디버그 도구를 누르면 컨트롤 콘솔에서 '로그인 정보' 를 보며 서버의 회답을 받았습니다. 새로운 사용자 닉네임 목록과 환영 소식입니다.



![img](img/95.png)< br / > (그림 11)



