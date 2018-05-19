(function(){
	//var qd=window._lyqd="laya";
	//var ww=window._lyww=window.location.protocol+"//"+"abc.layabox.com";
	var version=window.version="";
	var jsVersion=111154;
	var isRelease=window.isRelease=false;
	(function chkMemUpdate(){
		var navigator=window.navigator;
		if (navigator.serviceWorker&&window.location.protocol=='https:'){
			navigator.serviceWorker.register('worker/sw.js').then(function(registration){
				console.log('sw 注册成功');
				}).catch (function(err){
				console.log('sw 注册失败');
			});
			if (navigator.serviceWorker.controller){
				var channel=new MessageChannel;
				channel.port1.onmessage=handleMessage;
				function handleMessage (event){
					console.log("------>sw port1.onmessage 页面接收到service worker的回传消息: "+event.data.msg);
				}
				navigator.serviceWorker.controller.postMessage({verNum:version},[channel.port2]);
			}
		}
		else{
		}
	})();
	var dones=0;
	var contents=[];
	var ljUrl,mjUrl;
	var sp=""//"\n//@ sourceURL=";
	var downloadjs=function(src)
	{
		if(!src)return;
		var xmlreq=new XMLHttpRequest();
		xmlreq.open("get", src, true);
		xmlreq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xmlreq.responseType = "text";
		xmlreq._src=src;
		xmlreq.onerror = function(e) {
			downloadjs(e.target._src);
		}
		xmlreq.onabort = function(e) {
			downloadjs(e.target._src);
		}
		xmlreq.onload = function(e) {
			var a=e.target;
			var status=a.status;
			if(status === 200 || status === 204 || status === 0)
			{
				dones++;
				var sc=a.response||a.responseText;
				if(a._src.indexOf(ljUrl)==-1)
				{
					contents[1]=sc;
					if(dones==2)
					{
						eval(contents[1]);
					}
				}
				else
				{
					contents[0]=sc;
					if(dones==2)
					{
						eval(contents[0]);
						eval(contents[1]);
					}
					else
					{
						eval(contents[0]);
					}
				}
			}
		}
		xmlreq.send(null);
	}
	//var mj =  document.getElementById("crazy");  //document.createElement("script");
	//var layajs=document.getElementById("layajs"); //document.createElement("script");
	//document.body.appendChild(mj);
	//document.body.appendChild(layajs);
	if(isRelease)
	{
		window.wxSSL=true;
		window.imagePath="";//"https://client.fkxq.layabox.com/laya/";
		ljUrl=window.imagePath+version+"/laya.js?"+jsVersion;
		mjUrl=window.imagePath+version+"/CrazySnowball.max.js?"+jsVersion;
		downloadjs(ljUrl);
		downloadjs(mjUrl);
	}else{
		window.wxSSL=false;
		var mj =  document.createElement("script");
		ljUrl="laya.js";
		mjUrl="CrazySnowball.max.js?"+"11";// (window.location.href.indexOf("&debug=true")>0?version:Date.now());
		document.body.appendChild(mj);
		mj.src=mjUrl;
	}
	//layajs.src=ljUrl;
	//mj.src=mjUrl;
	
})(window,document)

