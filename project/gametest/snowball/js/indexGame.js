if(!window.conch)
{
	var splash = document.getElementById('splash');
	function onresize(){
		if (window.innerWidth<window.innerHeight){
			var sx=window.innerHeight/1280;
			var sy=window.innerWidth/720;
			var s = Math.max(sx,sy);
			splash.style.left=window.innerWidth+"px";
			splash.style.top =(window.innerHeight-1280*s)/2+'px';
			splash.style.transform=splash.style.webkitTransform="rotate(90deg) scale("+s+","+s+")";
		}else{
			var sx=window.innerWidth/1280;
			var sy=window.innerHeight/720;
			var s = Math.max(sx,sy);//alert('sx:'+sx+',sy:'+sy);
			splash.style.left=(window.innerWidth-1280*s)/2+'px';
			splash.style.top=(window.innerHeight-720*s)/2+'px';
			splash.style.transform=splash.style.webkitTransform="scale("+s+","+s+")";
		}
	}
	window.addEventListener('resize', onresize,false);
	window.addEventListener('load', onresize,false);
	onresize();

	var tm=6;
	function __showTime__()
	{
		var time = document.getElementById('TIME');
		if(!time) return;
		tm--;
		var s = '';
		try{				
			s += gmr.GetCurrentGame()._clientIsReady? '':'C';
			s += gmr.GetCurrentGame()._userDataIsReady? '':'U';
		}catch(e){
		}
		if(tm<1)
		{
			
			document.getElementById('TMTEXT').innerText="数据准备中"+(s==''?'':'('+s+')');
			time.style.display="none";
		}
		else
		{
			time.innerText=""+tm;	
			document.getElementById('TMTEXT').innerText="秒后立即开始"+(s==''?'':'('+s+')');
		}
		setTimeout(__showTime__, 1600);
	}
	setTimeout(__showTime__, 1200)

}



window._logtimeArray=[];
window.logtime=function(name){
	window._logtimeArray.push({name:name,tm:new Date().valueOf()})
}
window.alertTimeLog=function(){
	var s='';
	for (var i=0;i<window._logtimeArray.length;i++){
		if (i>0){
			s += window._logtimeArray[i]['name']+'耗时:'+(window._logtimeArray[i]['tm']-window._logtimeArray[i-1]['tm'])+'ms\n';
		}
	}
	console.log(s);
}
logtime('开始计时');
function makeUri(){
	var url = [];
	var search = window.location.search.substr(1);
	var searchs = search.split('&');
	url.push(window.location.protocol);
	url.push('//');
	url.push(window.location.host);
	url.push(window.location.pathname);
	url.push('?');
	for (var i=0;i<searchs.length;i++){
		var _param = searchs[i].split('=');
		if (_param[0]=='token'||_param[0]=='referee') continue;
		if (_param[0]!='gameid' && _param[0]!='spId') continue;
		if (i!=0)
		{
			url.push('&');
		}
		url.push(_param[0]+'='+_param[1]);
	}
	return url.join('');
}
window.shareObj = {
	title:'疯狂雪球H5',
	desc:'寻找全球变暖前的童年,2016原创轻竞技网游！',
	link:makeUri(),
	imgUrl:window.location.protocol+'//'+window.location.host+'/res/desktop/icon1111.png'
};
window.resetShareInfo=function(){
}
resetShareInfo();