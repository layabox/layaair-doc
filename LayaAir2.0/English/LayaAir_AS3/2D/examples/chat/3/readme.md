# 图文混排聊天室之客户端（下）

### 选择表情界面功能

聊天室中表情的使用必不可少，加强了聊天内容的丰富性和趣味性。之前我们在IDE中使用List组件方式制作了表情选择界面，下面开始逻辑代码的编写，请同学们注意list组件的代码逻辑用法，List组件在游戏界面中很常用。

新建ChatFaceView.as类，继承于ChatFaceUI。

```
package view
{
	import laya.events.Event;
	import laya.ui.Box;
	import laya.ui.Image;
	import laya.utils.Handler;
	
	import ui.ChatFaceUI;
	
	/**
	 * 聊天表情资源UI 
	 * @date 2016-12-09
	 */	
	public class ChatFaceView extends ChatFaceUI
	{
		/***存放表情的数组**/
		private var faceArray:Array=[];
		
		public function ChatFaceView()
		{
			//往数组中添加表情图片
			for (var i:int = 0; i < 20; i++ )
			{
				//添加url
				faceArray.push({url:"face/face"+i+".png"});
			}
			//给组件赋值（基本属性赋值）
			faceList.dataSource = faceArray;
			//单元格渲染,并为单元格重新赋值(图片)
			faceList.renderHandler = new Handler(this, this.onRender);
			
			//设置滚动条
			faceList.vScrollBarSkin = "";
			//设置点击状态
			faceList.selectEnable = true;
			//设置橡皮筋回弹时间
			faceList.scrollBar.elasticBackTime = 100;
			//设置橡皮筋回弹距离
			faceList.scrollBar.elasticDistance = 200;
		}
		/**
		 * 单元格渲染方法
		 * @param item 单元格
		 * @param index  单元格序号
		 */
		public function onRender(item:Box,index:int):void 
		{
			//获取单元格中图片
			var img:Image= item.getChildAt(0) as  Image;
			//给单元格中的图片更换皮肤（图片）
			img.skin = faceArray[index].url;
			//添加图片点击事件
			img.on(Event.CLICK, this, onFaceClick,[index]);
		}
		
		/** 选择表情后发出表情类型事件 **/
		private function onFaceClick(index:int):void
		{
			//发送表情数据事件
			this.event("faceType",["@" + index + "@"])
			//隐藏表情框
			this.visible=false;
		}
	}
}
```



### 聊天对话条

当收到对话消息后，我们需要在聊天框中显示对话条。聊天对话条并不是简单的文本，在我们的对话消息中，有头像、表情和文字组合。LayaAir引擎提供了HTMLDivElement组件来解决这种图文混排的问题，可以用html标签和样式直接转换成我们所需要的效果。

新建ChatLineView类，继承于Box类。

在代码中，我们实例了一个DIV标签对象。然后将消息三处文本进行了html标签格式转换

1.用户昵称html格式转换：定义了名字的颜色样式

`var clientName:String = "<span style='color:#ffcc00;'>"+msgObj.name+"：</span>";`

2.用户头像html格式转换：使用了img显示图片标签

```
"<img src='icon_head/head"+msgObj.head+".png' style='width:45px;height:45px'></img>"
```

3.表情标识html格式转换：我们用了字符串的replace()方法查找表情标识并替换成html显示图片标签

```
//将表情文本替换为html图片样式
newChatStr +=data.replace(/@0@/g,"<img src='face/face0.png' style='width:40px; height:40px'></img>")......
```

全部代码如下：

```
package view
{
	import laya.html.dom.HTMLDivElement;
	import laya.ui.Box;
	
	/**
	 * 聊天单条内容UI 
	 */	
	public class ChatLineView extends Box
	{
		/** 图文聊天内容框 **/
		private var textfiled:HTMLDivElement;
		
		public function ChatLineView()
		{
		}
		
		/**
		 * 转化服务器发送来的对话数据
		 * @param msgObj 聊天信息  name:用户名，head:头像id,data，对话数据
		 */		
		public function init(msgObj:Object):void
		{
			//位置
			this.pos(0,0);
			//实例化聊天内容框
			if(textfiled == null)
			{
				textfiled = new HTMLDivElement();
				addChild(textfiled);
			}
			//文本宽
			textfiled.width = 890;
			//文本颜色样式
			textfiled.style.color = "#10922a";
			//文本字体
			textfiled.style.fontFamily="黑体";
			//文本字体大小样式
			textfiled.style.fontSize = 26;
			//文本对齐样式
			textfiled.style.valign = "middle";
			//用户名字
			var clientName:String = "<span style='color:#ffcc00;'>"+msgObj.name+"：</span>";
			
			//转化用户头像与名字信息
			var clientInfo:String = "<span style='color:#ff9900;'>【世界】</span>"+ 
			"<img src='icon_head/head"+msgObj.head+".png' style='width:45px;height:45px'></img>" + clientName;
			
			//把消息转化成带表情的html图文混排
			var msgHtml:String = getFaceHtmlText(msgObj.data)
			
			//添加聊天内容
			textfiled.innerHTML= clientInfo  +  msgHtml;
			//聊天内容实际高度
			textfiled.height = textfiled.contextHeight + 10;
		} 
		
		
		/** 将聊天内容中的头像进行html格式替换 **/
		private function getFaceHtmlText(data:String):String 
		{
			var newChatStr:String = "";
			//将表情文本替换为html图片样式
			newChatStr +=
			data.replace(/@0@/g,"<img src='face/face0.png' style='width:40px; height:40px'></img>")
				.replace(/@1@/g,"<img src='face/face1.png' style='width:40px; height:40px'></img>")
				.replace(/@2@/g,"<img src='face/face2.png' style='width:40px; height:40px'></img>")
				.replace(/@3@/g,"<img src='face/face3.png' style='width:40px; height:40px'></img>")
				.replace(/@4@/g,"<img src='face/face4.png' style='width:40px; height:40px'></img>")
				.replace(/@5@/g,"<img src='face/face5.png' style='width:40px; height:40px'></img>")
				.replace(/@6@/g,"<img src='face/face6.png' style='width:40px; height:40px'></img>")
				.replace(/@7@/g,"<img src='face/face7.png' style='width:40px; height:40px'></img>")
				.replace(/@8@/g,"<img src='face/face8.png' style='width:40px; height:40px'></img>")
				.replace(/@9@/g,"<img src='face/face9.png' style='width:40px; height:40px'></img>")
				.replace(/@10@/g,"<img src='face/face10.png' style='width:40px; height:40px'></img>")
				.replace(/@11@/g,"<img src='face/face11.png' style='width:40px; height:40px'></img>")
				.replace(/@12@/g,"<img src='face/face12.png' style='width:40px; height:40px'></img>")
				.replace(/@13@/g,"<img src='face/face13.png' style='width:40px; height:40px'></img>")
				.replace(/@14@/g,"<img src='face/face14.png' style='width:40px; height:40px'></img>")
				.replace(/@15@/g,"<img src='face/face15.png' style='width:40px; height:40px'></img>")
				.replace(/@16@/g,"<img src='face/face16.png' style='width:40px; height:40px'></img>")
				.replace(/@17@/g,"<img src='face/face17.png' style='width:40px; height:40px'></img>")
				.replace(/@18@/g,"<img src='face/face18.png' style='width:40px; height:40px'></img>")
				.replace(/@19@/g,"<img src='face/face19.png' style='width:40px; height:40px'></img>");
			return newChatStr;
		}
	}
}
```



### 聊天界面功能

准备好了表情界面和聊天对话条功能，我们新建ChatView.as继承于ChatUI。开始实现聊天界面主要逻辑。

1.点击发送按钮，如果输入框中不为空，那么向服务器发送“对话消息”数据，onSendMsg()方法中实现。

2.接收网络对话消息，生成聊天对话条，加入聊天框中后再进行重新排版，msgReceive()、reChatLinePos()方法中实现。

3.点击选择表情按钮，显示或隐藏表情选择界面。点击选择表情后，界面隐藏，信息输入框中加入表情符。

全部代码如下

```
package view
{
	import laya.events.Event;
	import laya.utils.Ease;
	import laya.utils.Handler;
	import laya.utils.Pool;
	import laya.utils.Tween;
	
	import ui.ChatUI;
	
	public class ChatView extends ChatUI
	{
		/**聊天内容条目UI存放容器 **/
		private var chatLineArr:Array=[];
		/**聊天内容条目总高度 **/
		private var msgTotalHeight:Number= 0;
		/**表情容器UI **/
		private var chatFace:ChatFaceView;
		
		public function ChatView()
		{
			//显示用户昵称
			this.txt_name.text=ChatClient.clientName;
			//显示用户头像
			this.icon_head.skin="icon_head/head"+ChatClient.headIndex+".png"
			
			//监听发送信息事件
			this.btn_send.on(Event.CLICK,this,onSendMsg);
			//监听选择表情事件
			this.btn_face.on(Event.CLICK,this,onSelectFace);
			
			//为聊天内容条目容器加入滚动条
			//无滚动条皮肤
			chatPanel.vScrollBarSkin = "";
			//垂直滚动
			chatPanel.vScrollBar.isVertical = true;
			//滚动在头或底回弹时间
			chatPanel.vScrollBar.elasticBackTime = 600;
			//滚动在头或底最大距离
			chatPanel.vScrollBar.elasticDistance = 200;
			
			//表情选择UI
			chatFace =  new ChatFaceView;
			//监听选择的表情类型
			chatFace.on("faceType",this,onGetFaceType)
			//设置位置
			chatFace.pos(812,400);
			//加载到舞台
			addChild(chatFace);
			//暂时隐藏
			chatFace.visible = false;
		}
		
		/** 显示表情选择框 **/
		private function onSelectFace():void
		{
			//如果已显示就隐藏，否则显示
			chatFace.visible?chatFace.visible=false:chatFace.visible=true;
		}
			
		/** 获取点击的表情图片类型 **/
		private function onGetFaceType(type:String):void
		{
			chatInfo.text += type;
		}
		
		/** 发送当前数据 **/
		private function onSendMsg():void
		{
			//如果为空，不发送消息
			if(chatInfo.text=="") return;
			//用户聊天输入信息数据
			var  msg:Object =
            {"name":ChatClient.clientName,"head":ChatClient.headIndex,"data":chatInfo.text};
			//发送用户登录信息给服务器
			ChatClient.socket.send(JSON.stringify(msg));
			//发出消息后，输入框设置为空
			chatInfo.text = "";
		}
		
		/** 接收网络信息 **/
		public function msgReceive(msgObj:Object):void
		{
			//建立聊天信息条
			var chatLine:ChatLineView = Pool.getItemByClass("chatLine",ChatLineView);
			//初始化聊天信息条
			chatLine.init(msgObj);
			//加载到聊天框中
			chatPanel.addChild(chatLine);
			
			//大于15条后删除
			if(chatLineArr.length > 15)
			{
				//需要删除的信息
				var deleteChatLine:ChatLineView = chatLineArr.shift();
				//移除自己
				deleteChatLine.removeSelf(); 
				//回收到对象池
				Pool.recover("chatLine",deleteChatLine);
				//针对聊天条目进行重新排版
				reChatLinePos();
			}
			//y座标为现有聊天框高度
			chatLine.y = msgTotalHeight;
			//更新聊天框总高度
			msgTotalHeight += chatLine.height;
			//加入聊天框数组
			chatLineArr.push(chatLine);

			//更新滚动条最大滚动数值
			chatPanel.vScrollBar.max = chatPanel.contentHeight;
			//设置滚动条当前位置为最下
			chatPanel.vScrollBar.value=chatPanel.vScrollBar.max;
		}
		
		/** 重置chatlineUI的所有位置 **/
		private function reChatLinePos():void
		{
			//重置总高度
			msgTotalHeight = 0;
			var chatLine:ChatLineView
			//重置每个聊天信息条的位置
			for(var i:int = 0,sz:int = chatLineArr.length;i<sz;i++)
			{
				chatLine = chatLineArr[i] as ChatLineView;
				chatLine.y = msgTotalHeight;
				msgTotalHeight += chatLine.height;
			}
		}
	}
}
```


修改主类ChatClient.as代码。添加功能：登录后，显示聊天界面，当收到对话消息时，聊天界面接收并显示

全部代码如下

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
	
	import view.ChatView;
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
		/***聊天界面****/
		private var chatUI:ChatView; 
		
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
			//加载到舞台
//			Laya.stage.addChild(login);
			login.on("loginOK",this,onChatUI);
			//位置居中
			login.pos(Laya.stage.width - login.width>>1,Laya.stage.height - login.height>>1);
			
			//连接服务器
			socketInit();
		}
		
		/**登录设置成功后，打开聊天界面*/
		private function onChatUI():void
		{
			trace("用户昵称："+clientName+"  头像编号："+headIndex)
			//关闭登录界面
			login.close();
			//实例化聊天界面
			chatUI= new ChatView();
			//加载到舞台
			Laya.stage.addChild(chatUI);
			//位置居中
			chatUI.pos(Laya.stage.width - chatUI.width>>1,Laya.stage.height - chatUI.height>>1);
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
			//把JSON字符串转化成object
			var obj:Object=JSON.parse(msg);
			//是否是用户列表类型
			if(obj.hasOwnProperty("clients"))
			{
				//更新用户昵称列表
				clientNames=obj.clients;
				
			}//是否是聊天信息
			else if(obj.hasOwnProperty("name"))
			{
				this.chatUI.msgReceive(obj);
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



在此，聊天室逻辑代码全部完成。编译运行多个客户端，可以看到相互之前可以进行聊天了，图文混排的效果也不错。当然，还可以在此代码上进行扩展，修改客户端与服务器端增加私聊也不是很复杂的事！

![img](img/7.png)<br/>（图1）