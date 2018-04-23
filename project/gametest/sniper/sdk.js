if (!window.BK) window.BK = {};

BK.Buffer = function(length, netOrder){
    this.length = 0;
    this.capacity = length;
    this.netOrder = netOrder;

    this.buffer = new ArrayBuffer(length);
    this.dataView = new DataView(this.buffer);

    this._pos_=0;
    return this;
}

BK.Buffer.prototype = {
    readStringBuffer:function(){
        var l3 = this.readUint8Buffer();
        var l2 = this.readUint8Buffer();
        var l1 = this.readUint8Buffer();
        var len = (l3<<16)+(l2<<8)+l1;
        var buf = new Uint16Array(len);
        for (var i=0;i<len;i++){
            buf[i] = this.readUint16Buffer();
        }
        return String.fromCharCode.apply(null, buf);
    },
    readUint8Buffer:function(){
        var r = this.dataView.getUint8(this._pos_);
        this._pos_ += Uint8Array.BYTES_PER_ELEMENT;
        return r;
    },
    readUint16Buffer:function(){
        var r = this.dataView.getUint16(this._pos_);
        this._pos_ += Uint16Array.BYTES_PER_ELEMENT;
        return r;
    },
    readUint32Buffer:function(){
        var r = this.dataView.getUint32(this._pos_);
        this._pos_ += Uint32Array.BYTES_PER_ELEMENT;
        return r;
    },
    readUint64Buffer:function(){
        //TODO:尚未实现
    },
    readInt8Buffer:function(){
        var r = this.dataView.getInt8(this._pos_);
        this._pos_ += Int8Array.BYTES_PER_ELEMENT;
        return r;
    },
    readInt16Buffer:function(){
        var r = this.dataView.getInt16(this._pos_);
        this._pos_ += Int16Array.BYTES_PER_ELEMENT;
        return r;
    },
    readInt32Buffer:function(){
        var r = this.dataView.getInt32(this._pos_);
        this._pos_ += Int32Array.BYTES_PER_ELEMENT;
        return r;
    },
    readInt64Buffer:function(){
        //TODO:尚未实现
    },
    readFloatBuffer:function(){
        var r = this.dataView.getFloat32(this._pos_);
        this._pos_ += Float32Array.BYTES_PER_ELEMENT;
        return r;
    },
    readDoubleBuffer:function(){
        var r = this.dataView.getFloat64(this._pos_);
        this._pos_ += Float64Array.BYTES_PER_ELEMENT;
        return r;
    },
    readBuffer:function(length){
        var buff = this.buffer.slice(this._pos_, this._pos_+length);
        this._pos_ += length;
        return buff;
    },
    writeBuffer:function(buffer){
        var array = new Uint8Array(buffer);
        for (var i=0;i<array.length;i++){
            this.writeUint8Buffer(array[0]);
        }
    },
    writeUint8Buffer:function(num){
        if (this.length+Uint8Array.BYTES_PER_ELEMENT>this.capacity){
            this.transfer();
        }

        this.dataView.setUint8(this._pos_, num);
        this._pos_ += Uint8Array.BYTES_PER_ELEMENT;
        this.length += Uint8Array.BYTES_PER_ELEMENT;
    },
    writeUint16Buffer:function(num){
        if (this.length+Uint16Array.BYTES_PER_ELEMENT>this.capacity){
            this.transfer();
        }

        this.dataView.setUint16(this._pos_, num);
        this._pos_ += Uint16Array.BYTES_PER_ELEMENT;
        this.length += Uint16Array.BYTES_PER_ELEMENT;
    },
    writeUint32Buffer:function(num){
        if (this.length+Uint32Array.BYTES_PER_ELEMENT>this.capacity){
            this.transfer();
        }

        this.dataView.setUint32(this._pos_, num);
        this._pos_ += Uint32Array.BYTES_PER_ELEMENT;
        this.length += Uint32Array.BYTES_PER_ELEMENT;
    },
    writeUint64Buffer:function(num){
        //TODO: 尚未实现
    },
    writeInt8Buffer:function(num){
        if (this.length+Int8Array.BYTES_PER_ELEMENT>this.capacity){
            this.transfer();
        }

        this.dataView.setInt8(this._pos_, num);
        this._pos_ += Int8Array.BYTES_PER_ELEMENT;
        this.length += Int8Array.BYTES_PER_ELEMENT;
    },
    writeInt16Buffer:function(num){
        if (this.length+Int16Array.BYTES_PER_ELEMENT>this.capacity){
            this.transfer();
        }

        this.dataView.setInt16(this._pos_, num);
        this._pos_ += Int16Array.BYTES_PER_ELEMENT;
        this.length += Int16Array.BYTES_PER_ELEMENT;
    },
    writeInt32Buffer:function(num){
        if (this.length+Int32Array.BYTES_PER_ELEMENT>this.capacity){
            this.transfer();
        }

        this.dataView.setInt32(this._pos_, num);
        this._pos_ += Int32Array.BYTES_PER_ELEMENT;
        this.length += Int32Array.BYTES_PER_ELEMENT;
    },
    writeInt64Buffer:function(num){
        //TODO: 尚未实现
    },
    writeFloatBuffer:function(num){
        if (this.length+Float32Array.BYTES_PER_ELEMENT>this.capacity){
            this.transfer();
        }

        this.dataView.setFloat32(this._pos_, num);
        this._pos_ += Float32Array.BYTES_PER_ELEMENT;
        this.length += Float32Array.BYTES_PER_ELEMENT;
    },
    writeDoubleBuffer:function(num){
        if (this.length+Float64Array.BYTES_PER_ELEMENT>this.capacity){
            this.transfer();
        }

        this.dataView.setFloat64(this._pos_, num);
        this._pos_ += Float64Array.BYTES_PER_ELEMENT;
        this.length += Float64Array.BYTES_PER_ELEMENT;
    },
    writeStringBuffer:function(str){
        var len = str.length;
        this.writeUint8Buffer(len>>>16 & 0xFF);
        this.writeUint8Buffer(len>>>8 & 0xFF);
        this.writeUint8Buffer(len & 0xFF);
        for(var i=0, strlen=str.length;i<strlen;i++){
            this.writeUint16Buffer(str.charCodeAt(i));
        }
    },
    releaseBuffer:function(){
        this.buffer = null;
        this.dataView = null;
        this._pos_ = -1;
    },
    bufferLength:function(){
        return this.length;
    },
    rewind:function(){
        this._pos_ = 0;
    },
    toBase64String:function(){
        var base64 = btoa(
            new Uint8Array(this.buffer)
                .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        return base64;
    },
    fromBase64String:function(base64str){
        var binary_string =  atob(base64str);
        var len = binary_string.length;
        var bytes = new Uint8Array( len );
        for (var i = 0; i < len; i++)        {
            bytes[i] = binary_string.charCodeAt(i);
        }
        this.buffer = bytes.buffer;
        this.dataView = new DataView(this.buffer);
        this.length = this.buffer.byteLength;
        this.rewind();

        return this;
    },
    transfer:function(){
        if (ArrayBuffer.transfer){
            this.buffer = ArrayBuffer.transfer(this.buffer, this.capacity*2);
        }else{
            var buffer = new ArrayBuffer(this.capacity*2);
            var dv = new DataView(buffer);

            var array = new Uint8Array(this.buffer);

            for (var i=0;i<array.length;i++){
                dv.setUint8(i, array[i]);
            }

            this.buffer = buffer;
            this.dataView = dv;
            this.capacity *= 2;
        }
    }
};


BK.Director = {};
BK.Director.ticker={
    handlers:[],
    add:function(func){
        this.handlers.push(func);
    },
    ontick:function(){
        var timestamp=parseInt(new Date().getTime()/1000);
        for (var i=0;i<this.handlers.length;i++){
            this.handlers[i].call(null, timestamp)
        }
    }
};

setInterval(function(){BK.Director.ticker.ontick();}, 1000/60);

var NormalRecommandRoomSvrHost = "192.168.0.112";//Linux上的服务器
// var NormalRecommandRoomSvrHost = "10.10.20.163";//-------------贾哥服务器
var NormalRecommandRoomSvrPort  = 7000;

BK.Room = function(){
    this.roomId;
	this.gameId;
    this.limixiuIp;
    this.limixiuPort;
	this.mId;
	this.ownerId;
	this.createTs;
	this.status;
	this.playerNum;
	this.ip0;
	this.ip1;
	this.msgSeq = 1;
	this.ackSeq;
	this.lastFrame = 0;
	this.createRoomCallBack;
	this.queryRoomInfoCallBack;
	this.joinRoomCallBack;
	this.leaveRoomCallBack;
	this.startGameCallBack;
	this.broadcastDataCallBack;
	this.setUserDataCallBack;
	this.getUserDataCallBack;
	this.sendSyncOptCallBack;
	this.forceStopGameCallBack;
	this.frameSyncListener;
	this.queryFrameDataCallBack;
	this.matchGameCallBack;
	this.queryMatchGameCallBack;
	this.disconnectNetCallBack;
	this.reJoinRoomCallBack;
	this.socket;
	this.reqArray = new Array();
	this.newJoinPlayers = [];
	this.currentPlayers = [];
	//this.isCreator = (GameStatusInfo.isMaster == 1)?true:false;
	//this.gameStatusInfo = GameStatusInfo;
	this.serverConnected;
    this.serverConnectedJC;
	this._isDebug = false;
	//this._environment = NETWORK_ENVIRONMENT_QQ_RELEASE;
	this.headerVersion = 0x0301;
	this.recommandRoomSvrHost = NormalRecommandRoomSvrHost;
    this.recommandRoomSvrPort = NormalRecommandRoomSvrPort;

    var that = this;
    var msgHandler = {
        game:{//-------------------------------测试
            created:function(params){//发送room.create，接收game.created
                this.roomId = params.roomid;
                this.createRoomCallBack && this.createRoomCallBack(params.code, this.roomId);
            },
            joined:function(params){
                console.log("***");
            }
        },
        user:{
            setUserData:function(params){
                this.setUserDataCallBack(params.code);
            },
            gotUserData:function(params){
                this.getUserDataCallBack(params.code, new BK.Buffer().fromBase64String(params.data));
            }
        },
        room:{
            created:function(params){
                this.roomId = params.roomId;
                this.createRoomCallBack && this.createRoomCallBack(params.code, params.roomId);
            },
            joined:function(params){//房间进入
                if (params.room){
                    var ownerId = params.room.ownerId;
                    var createTs = params.room.createTs;
                    var status = params.room.status;

                    var players= params.room.players;
            
                    this.ownerId = ownerId;
                    this.createTs = createTs;
                    this.status = status;
                    this.playerNum = players.length;
            
                    if(this.currentPlayers.length == 0){
                        for (var element in players){
                            this.newJoinPlayers.push(element);
                        }
                    }else{
                        var tmpArray = [];
                        for (var i = 0; i < players.length; i++) {
                            var player = players[i];
                            var isFormerJoin = false;
                            for (var j = 0; j < this.currentPlayers.length; j++) {
                                var formerNewJoinPlayer = this.currentPlayers[j];
                                if(formerNewJoinPlayer.openId == player.openId){
                                    isFormerJoin = true;
                                    break;
                                }
                            }
            
                            if(isFormerJoin == false){
                                tmpArray.push(player);
                            }
                        }
            
                        this.newJoinPlayers = tmpArray;
                    }
            
                    this.currentPlayers = players;
                }
                this.roomId=parseInt(params.room.roomId);
                this.joinRoomCallBack && this.joinRoomCallBack(params.code, this);
            },
            queried:function(params){

                var ownerId = params.room.ownerId;
                var createTs = params.room.createTs;
                var status = params.room.status;

                var players= params.room.players;
    
                var roomInfo = new Object();
    
                roomInfo.ownerId = ownerId;
                roomInfo.createTs = createTs;
                roomInfo.status = status;
                roomInfo.playerNum = players.length;

                this.ownerId = ownerId;
                this.createTs = createTs;
                this.status = status;
                this.playerNum = players.length;
                this.players = players;

                this.queryRoomInfoCallBack && this.queryRoomInfoCallBack(params.code,roomInfo);
            },
            gameStarted:function(params){
                this.startGameCallBack && this.startGameCallBack(params);
            },
            left:function(params){//离开房间
                var logOutId = params.openId;
                var reason = params.reason;
                var leaveInfo = new Object();
                leaveInfo.reason = reason;
                leaveInfo.logOutId = logOutId;
                this.currentPlayers.splice(this.currentPlayers.indexOf(logOutId));
                this.leaveRoomCallBack && this.leaveRoomCallBack(params.code,leaveInfo);
            },
            matched:function(params){
                this.matchGameCallBack && this.matchGameCallBack(params.code);
            },
            queriedMatch:function(params){
                this.roomId = params.roomId;
                this.queryMatchGameCallBack && this.queryMatchGameCallBack(params.code);
            },
            broadcast:function(params){
                this.broadcastDataCallBack && this.broadcastDataCallBack(params.code, new BK.Buffer().fromBase64String(params.data));
            },
            syncOpt:function(params){
                this.ackSeq = params.ack;
                this.sendSyncOptCallBack && this.sendSyncOptCallBack(params.code);
            },
            pushFrameSync:function(params){
                var needAck = params.needAck;
                var isFinish = params.isFinish;
                var frameData = params.frameData;
                var frameDataArr = new Array();
                for(var i=0;i<frameData.length;i++){
        
                    var frameSeq = frameData[i].frameSeq;
                    this.lastFrame = frameSeq;
                    var userDataArr = frameData[i].userDatas;
                  
                    for (var i=0;i<userDataArr.length;i++){
                        userDataArr[i].dataBuffer = new BK.Buffer().fromBase64String(userDataArr[i].dataBuffer);
                    }
                    userDataArr.frameSeq = frameSeq;
                    frameDataArr.push(userDataArr);
                }
                
                this.frameSyncListener && this.frameSyncListener(frameDataArr); 
            },
            queriedFrameSync:function(params){
                var frameData = params.frameData;
                var frameDataArr = new Array();
                for(var i=0;i<frameData.length;i++){
                    var userDataArr = frameData[i].userDatas;
                    frameDataArr.push(userDataArr);
                }
        
                this.queryFrameDataCallBack && this.queryFrameDataCallBack(frameDataArr); 
            }
        }
    };
    // 厘米秀服务器
    this.connect = function(ip, port){
        var that = this;
        var socket = new WebSocket('ws://'+ip+':'+port);
        socket.onopen=function(){
            that.serverConnected=1;
        }
        socket.onmessage=function(e){
            //console.log(e.data);
            var msg = JSON.parse(e.data);
            if (msg.url){
                var cmd = msg.url.split('.');
                msgHandler[cmd[0]][cmd[1]].call(that, msg.params);
            }
        }
        socket.onclose=function(){
            that.serverConnected=0;
        }
        socket.onerror=function(){
            that.serverConnected=-1;
        }
        this.socket = socket;
    }
    // 贾哥服务器，获取厘米秀ip，进行厘米秀服务器连接
    var username='testuser_'+parseInt(Math.random()*9999999999999);
    var aaaa=9998;
    // var aaaa=9999;
    var isLoging=0;
    this.connect2 = function(ip, port, obj){
        console.log("---------------"+username);
        var that = this;
        var socket = new WebSocket('ws://'+ip+':'+port);
        socket.onopen=function(){
        this.send(JSON.stringify(
            {"url":"user.login",
            "params":{
                "gameid":aaaa,
                "username":username,//----------------------------u
                "password":"",
                "source":"aabbcc",
                "unionid":"-4",
                "referee":0,
                "extendParams":"nip=&aip=&cver=V1.10.1.3&os=other&sw=732&sh=412&dpr=3.5"}}
        ));
            that.serverConnectedJC=1;
        }
        socket.onmessage=function(e){

            console.log(e.data);
            var msg = JSON.parse(e.data);
            if(isLoging!=1)
            {
                 if(msg.url=="user.datachg"&&msg.params.type=="2")//登陆成功，user.logined数据收到之后调用userLogin接口
                 {
                    isLoging=1;
                    that.userLogin(obj);
                 }
            }
           
            if(msg.url=="user.togame")//获取厘米秀ip地址成功
            {
                that.getLimixiuIP(obj,msg.params);
            }
            if(msg.url=="user.setClientObjectResult")
            {
                that.setUserDataCallBack&&that.setUserDataCallBack(msg.params.code);
            }
            if(msg.url=="user.getGameDataResult")
            {
                var dataBuff=
                that.getUserDataCallBack&&that.getUserDataCallBack(msg.params.code,new BK.Buffer().fromBase64String(JSON.parse(msg.params.results.fclient).a));
            }
        }
        socket.onclose=function(){
            that.serverConnectedJC=0;
        }
        socket.onerror=function(){
            that.serverConnectedJC=-1;
        }
        this.socket = socket;
    }

    this.send = function(cmd, params){
        var obj = {
            url:cmd,
            params:params
        };
        this.reqArray.push(obj);
    }

    this.updateSocket = function(){
        if (this.serverConnected==1){
            while (this.reqArray.length>0){
                var cmd = this.reqArray.shift();
                console.log('[send]', JSON.stringify(cmd));
                this.socket.send(JSON.stringify(cmd));
            }
        }
    }
    
	this.createAndJoinRoom = function(gameId,masterOpenId,callback)
    {
       this.connectJG7000({"gameId":gameId,"masterOpenId":masterOpenId,"callback":callback,"type":"createAndJoinRoom"});//链接贾哥服务器（调公用接口connectJG7000）
    }



     //创建并加入房间（用户登录）------------------------------------------------------------获取厘米秀ip start-----------------------------------------------------------

    // 开始链接贾哥服务器-公用函数（参数{接口所需参数，接口类型}）------------------------------------------
    this.connectJG7000=function(obj)
    {
        if(this.serverConnectedJC != 1){//链接贾哥服务器7000端口
            this.connect2(this.recommandRoomSvrHost,this.recommandRoomSvrPort,obj);
        }
        else//登陆成功回调(获取厘米秀ip)
        {
             this.userLogin(obj)
        }
    }
    //用户登录成功回调
    this.userLogin=function(obj)
    {
         isLoging=0;
         if(this.serverConnectedJC != 1)//避免重复链接服务器
         {
            this.connect2(this.recommandRoomSvrHost,this.recommandRoomSvrPort,obj);
         }
         if(obj.type=="createAndJoinRoom")//房主创建并加入房间
         {
            //发送请求：获取厘米秀ip地址
             this.socket.send(JSON.stringify({
                "url":'room.user.play',
                "params":{
                    "roomtype":1, 
                    "mustNew":1}}
             ));
         }
         if(obj.type=="queryAndJoinRoom")
         {
             this.socket.send(JSON.stringify({
                "url":'room.user.join',
                "params":
                        {
                             "roomid":obj.roomId
                         }}
             ));
         }
         if(obj.type=="matchGame")
         {
           //发送请求：获取厘米秀ip地址
             this.socket.send(JSON.stringify({
                "url":'room.user.play',
                "params":{
                    "roomtype":1, 
                    "mustNew":0}}//0代表陌生人匹配
             ));
         }
         if(obj.type=="setUserData")//设置云端存储
         {
            //发送请求：获取厘米秀ip地址
             this.socket.send(JSON.stringify({
                "url":'room.user.setClientObject',
                "params":{
                  value:{a:(obj.buff).toBase64String()}
                }}
             ));
         }
         if(obj.type=="getUserData")//获取云端存储
         {
            //发送请求：获取厘米秀ip地址
             this.socket.send(JSON.stringify({
                "url":'room.user.getGameData',
                "params":{
                  fclient:1
                }}
             ));
         }
    }
    // 获取厘米秀IP地址成功回调
    this.getLimixiuIP=function(obj,params)
    {
         
        // this.serverConnectedJC=0;
        if(obj.type=="createAndJoinRoom")//房主创建并加入房间
        {
            this.createAndJoinRoom2(obj,params);
        }
        if(obj.type=="queryAndJoinRoom")//参与者加入房间
        {
            this.queryAndJoinRoom2(obj,params)
        }
        if(obj.type=="matchGame")//陌生人匹配
        {
            this.matchGame2(obj,params);
        }
    }

    //说明：厘米秀接口函数用于登陆厘米秀服务器，需创建厘米秀接口函数2（参数改为obj.的格式），用于实现该接口的实际功能（在获取到厘米秀ip后，根据接口类型分别调用getLimixiuIP）
    //----------------------------------------------------------------获取厘米秀ip end-----------------------------------------------------------



    // 房主创建并进入房间
    this.createAndJoinRoom2=function(obj,params)
    {
         this.createRoom(obj.gameId, obj.masterOpenId,params.ip, function(code, roomId)
         {
            if (code==0)
            {
                this.joinRoom(params,function (statusCode,room)
                {
                   console.log("加入房间 statusCode:"+statusCode+" roomid is "+ room.roomId);
                   obj.callback(statusCode,this);
                });
            }
            else
            {
                  obj.callback(code, this);
            }
        })
    }
    // 创建房间
    this.createRoom = function (gameId,openId,ip,callback){
        console.log("createRoom");
        this.mId = openId;
        this.gameId = parseInt(gameId);
        var arr=ip.split(":");
        this.limixiuIp=arr[0];
        this.limixiuPort=arr[1];
        console.log(arr);
        if(this.serverConnected != 1){
            this.connect(arr[0],arr[1]);
        }
        
        this.createRoomCallBack = callback;
        
        this.send('room.create', {
            gameId:this.gameId,
            openId:username
        })
    }
    //加入房间
    this.joinRoom = function(params, callback){
        this.joinRoomCallBack = callback;
        this.send('room.join', {
            gameId:aaaa,
            roomId:params.id,
            openId:username
        })
    }
    //参与者加入房间
	this.queryAndJoinRoom = function (gameId,roomId,joinerOpenId,callback)
    {
        this.connectJG7000({"gameId":gameId,"roomId":roomId,"joinerOpenId":joinerOpenId,"callback":callback,"type":"queryAndJoinRoom"});//链接贾哥服务器（调公用接口connectJG7000）
    }
    //参与者加入房间2
    this.queryAndJoinRoom2=function(obj,params)
    {
        var arr=(params.ip).split(":");
        this.limixiuIp=arr[0];
        this.limixiuPort=arr[1];
        if(this.serverConnected != 1){
            this.connect(arr[0],arr[1]);
        }       

        this.queryRoom(obj.gameId,obj.roomId,obj.joinerOpenId,function(queryStatusCode,roomInfo){
            if(queryStatusCode==0){

                this.joinRoom(params,function (statusCode,room){
                    console.log(0,0,"加入房间 statusCode:"+statusCode+" roomid is "+ room.roomId);
        
                    obj.callback(statusCode,this);
                });

            }else{
                obj.callback(queryStatusCode,undefined);
            }
        });
    }
    //查找房间
    this.queryRoom = function (gameId,roomId,fromId,callback){
        this.mId = fromId;
        this.roomId = parseFloat(roomId);
        this.gameId = parseInt(gameId);;
        this.queryRoomInfoCallBack = callback;
        console.log("roomId:"+roomId);
        this.send('room.query', {
            gameId:aaaa,
            // openId:fromId,
            openId:username,
            roomId:roomId
        })
    }
    // 开始游戏
    this.startGame = function(callback){
        console.log("**************limixiuIp*******************");
        console.log(this.limixiuIp+"   "+this.limixiuPort);
        if(this.serverConnected != 1){
            this.connect(this.limixiuIp,this.limixiuPort);
        }	
        this.startGameCallBack = callback;
        this.send('room.startGame', {
            gameId:this.gameId,
            openId:username,
            roomId:this.roomId
        })
    }
    //开始游戏回调
    this.setStartGameCallback = function(callback){
		this.startGameCallBack = callback;
	}
    //离开房间
    this.leaveRoom = function(callback,reason ){
        if(this.serverConnected != 1){
            this.connect(this.limixiuIp,this.limixiuPort);
        }	
        if(reason == undefined){ reason = -1;};
        this.leaveRoomCallBack = callback;
        this.send('room.leave', {
            gameId:this.gameId,
            openId:username,
            roomId:this.roomId,
            reason:reason
        });
    }

    this.setLeaveRoomCallback = function (callback) {
		this.leaveRoomCallBack = callback;
	}
    //开始陌生人匹配
    this.matchGame = function(gameId,openId,callback){//匹配是7000端口来操作的
        this.connectJG7000({"gameId":gameId,"openId":openId,"callback":callback,"type":"matchGame"});//链接贾哥服务器（调公用接口connectJG7000）
    }
    this.matchGame2=function(obj,params){
        var arr=(params.ip).split(":");//得到厘米秀IP号
        this.limixiuIp=arr[0];
        this.limixiuPort=arr[1];
        if(this.serverConnected != 1){//连接厘米秀服务器
            this.connect(this.limixiuIp,this.limixiuPort);
        }   
        // this.mId = obj.openId;
        // this.gameId = parseInt(obj.gameId);
        // this.matchGameCallBack = obj.callback;
        // this.socket.send(JSON.stringify({
        //         "url":'room.match',
        //         "params":{
        //             "gameId":this.gameId, 
        //             "openId":username}}
        //      ));
         this.queryRoom(obj.gameId,params.id,obj.openId,function(queryStatusCode,roomInfo){
            if(queryStatusCode==0){

                this.joinRoom(params,function (statusCode,room){
                    console.log(0,0,"加入房间 statusCode:"+statusCode+" roomid is "+ room.roomId);
        
                    obj.callback(statusCode,this);
                });

            }else{
                obj.callback(queryStatusCode,undefined);
            }
        });
    }
    this.queryMatchGame = function(gameId,openId,callback){
		this.mId = openId;
		this.gameId = parseInt(gameId);
		this.queryMatchGameCallBack = callback;
		this.send('room.queryMatch', {
            gameId:this.gameId,
            openId:username
        });
    }
    
    this.setBroadcastDataCallBack = function(callback){
		this.broadcastDataCallBack = callback;
    }
    
    this.sendBroadcastData = function(buff){
		this.send('room.broadcast', {
            gameId:aaaa,
            openId:username,
            roomId:this.roomId,
            data:!buff?'':buff.toBase64String()
        });
    }
    
    this.syncOpt = function(statusBuf,optBuf,extendBuf,itemListBuf,callback){
        this.sendSyncOptCallBack = callback;
        this.send('room.syncOpt', {
            gameId:this.gameId,
            openId:username,
            roomId:this.roomId,
            status:!statusBuf?'':statusBuf.toBase64String(),
            opt:!optBuf?'':optBuf.toBase64String(),
            extend:!extendBuf?'':extendBuf.toBase64String(),
            item:!itemListBuf?'':itemListBuf.toBase64String(),
            msgSeq:this.msgSeq,
            lastFrame:this.lastFrame
        });
        this.msgSeq += 1;
    }
    
    this.sendSyncOpt = function (opt,callback){
		var status = new BK.Buffer(1,1);
		status.writeUint8Buffer(0);

		//预留字段
		var extend = new BK.Buffer(1,1);
		extend.writeUint8Buffer(0);
			
		//send 
		this.syncOpt(status,opt,extend,undefined,callback);
	}
    
    this.setFrameSyncListener = function(listener){
		this.frameSyncListener = listener;
    }

    this.queryFrameData = function(beginFrame,count,callback){
        this.queryFrameDataCallBack = callback;
        this.send('room.broadcast', {
            gameId:this.gameId,
            openId:username,
            roomId:this.roomId,
            beginFrame:beginFrame,
            count:count
        });
    }
    //设置云端存储（用户数据）
    this.setUserData = function(buff, callback){   
        this.setUserDataCallBack = callback;     
        this.connectJG7000({"buff":buff,"callback":callback,"type":"setUserData"});//链接贾哥服务器（调公用接口connectJG7000）
    }
    //获取云端存储（用户数据）
    this.getUserData = function(roomId,callback){
        this.getUserDataCallBack = callback;
		this.connectJG7000({"roomId":roomId,"callback":callback,"type":"getUserData"});//链接贾哥服务器（调公用接口connectJG7000）
	}
}