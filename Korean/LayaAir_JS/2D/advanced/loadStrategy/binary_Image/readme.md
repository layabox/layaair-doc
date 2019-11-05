# 图片与二进制

페이지 유휴 시대에는 자원이 도출되는 것을 방지하기 위해 일반적인 방법은 그림 등 자원을 암호화하는 것이다.암호화란 자원의 본래의 기억 바이트를 혼란시키거나, 약간의 물건을 삽입하는 것이다.그러나 html5 시대가 되면 기본적으로 바로 가재된 그림인데 왜 페이지 시대와 다르지?html5 가 아니라 디코딩 디코딩 바이너로 불러올 수 없나요?물론 아니다.이 단계를 암호화하지 않는 것은 주로 우리 프로젝트의 원코드가 브라우저 엔드에 완전히 노출돼 비밀이 없다. 암호화되어도 스크립트 실행 후에는 너의 원코드를 받을 수 있다.하지만 개발자의 요구를 만족시키기 위해, html5 의 2진제 사진을 어떻게 진행할 것인지를 간단히 말해 보자.

###할 수 없는 XMLHttpRequest

파일을 불러오기 시작하면 어쩔 수 없이 말하는 것은`XMLHttpRequest`여기에서 우리는 간단히 소개하고 자세한 교정을 옮겨 주십시오`HTTPRequest`장절.XMLHttpRequest 는 브라우저 인터페이스의 인터페이스와 HTTP (S) 통신이 가능합니다.이것이 우리가 자주 언급하는 Ajax 의 핵심이다.XMLHTPRequest 표준은 Level1, Level2. 여기에서는 html5 의 범위를 말하므로 Level1 은 의미가 크지 않습니다. 여기에서 html4, html5, html5로 주목합니다.개발자가 이해하기 위해 우리는 이 두 표준에 대해 대조한다.

**Level 의 주요 단점:**

##-동원적 전략의 제한을 받고, 다역 요청을 보낼 수 없습니다;바이너리 파일을 보낼 수 없습니다. (그림, 영상, 오디오 등) 일반 텍스트 데이터를 보낼 수 없습니다.
- 발송과 데이터 가져오는 과정에서 실시간 진행 정보를 찾을 수 없음을 판단할 수 있습니다;

**Level2 Level 이 개선된 곳에 대한 Level2:**

##- 다역 요청을 보낼 수 있으며 서버에서 허용되는 경우;송신 및 이진 데이터 수신 지원
##- 추가 formData 대상, 서킷 발송 데이터 지원데이터를 보내거나 가져올 때 진도 정보를 얻을 수 있습니다.
-요청을 할 수 있는 시간을 설정합니다.

위에서 대비해서 우리가 가장 주목하는 점은 바로.**송신 및 접수 지원**이것은 중대한 돌파다. 이것은 우리가 원격 2진제 사진을 태우게 하는 것이 가능하다.

###어떻게 추가

이에 대해 우리가 먼저 원생부터 Layair 엔진으로 가재할 수 있습니다. 이 개발자는 그 뜻을 이해할 수 있습니다.2진류 방식으로 불러오기 위해 XMLHttpRequest 2진류 방식을 적용합니다.XMLHtttpRequest에 대한 작업은 우리가 더 이상 진술하지 않으며, 단독 문서에 넣어 설명할 것입니다.우리는 우선 2진제 방식에 따라 가재해 보자.여기에 우리는 먼저 js 스크립트를 사용해서 조작한다.코드 다음과 같습니다:


```JavaScript

var xhr = new XMLHttpRequest();
xhr.open("get", "res/atlas/comp.png", true);
xhr.responseType = "arraybuffer";
xhr.onload = function () {
    if (this.status == 200) {
        var blob = new Blob([this.response], { type: "image/png" });
        var img = document.createElement("img");
        img.onload = function (e) {
            window.URL.revokeObjectURL(img.src); // 清除释放;
        };
        img.src = window.URL.createObjectURL(blob);
        document.body.appendChild(img);
    }
}
xhr.send();
```


이 방법은 브라우저 자체로 제공하는 방법으로 2진vas를 그림으로 바꾸고, 2진제가 그림으로 바꾸는 방법도 많습니다. 예를 들어 2진제가 들어가면 Base64로 분해, 다시 값은 Base64, 또는 2진제 데이터를 canvas 로 제작한 후 todataURL의 부득점을 img 에 줄 수 있는 src 등입니다.방법이 많습니다. 여기에서는 가장 간단한 방법으로 그림을 전환합니다.

그림 불러오기 후 ZMLHttpRequest 대상 xhr`responseType`속성 설정`arraybuffer`블러비 대상`blob`img 태그 만들기 위해`window.URL.createObjectURL(blob)`이 인자 대상을 가리키는 URL 을 생성하여 만든 img 대상을 웹 페이지에 추가하는 body 에 표시합니다.이 부분의 코드를 index.html 파일에 새겨서 웹 페이지가 정상적으로 표시된 그림을 볼 수 있습니다.

###Laya 중 어떻게 사용하나요?

위쪽의 간단한 예는 우리가 쓰는 js 스크립트를 썼는데, 그렇다면 종목에서 도m 원소의 img 을 어떻게 사용합니까?다음은 우리가 설명한다.

다음 코드 작성:


```javascript

//初始化引擎
Laya.init(1136,640);
var sp = new Laya.Sprite();
var xhr = new Laya.HttpRequest();
xhr.once(Laya.Event.COMPLETE,this,completeHandler);
xhr.once(Laya.Event.ERROR,this,errorHandler);
xhr.send("res/monkey2.png","","get","arraybuffer");
function completeHandler(data){
  	//加载完成返回的data是arraybuffer；
    //.......这里处理我们加密的图片数据，假设我们的图片加密数据是在图片的前面写入了四个字节的数据
    //.......解密逻辑开始处理数据。
  	var byte = new Laya.Byte(data);//Byte数组接收arraybuffer
    byte.writeArrayBuffer(data,4);//从第四个字节开始读取数据
    var blob = new Laya.Browser.window.Blob([data], { type: "image/png" });
    var url = Laya.Browser.window.URL.createObjectURL(blob);//创建一个url对象；
    ////我们先用第一种方式显示图片到舞台；
    var sp = new Laya.Sprite();
    sp.loadImage(url);
    Laya.stage.addChild(sp);//添加到舞台
}
function errorHandler(url){

}
```


두 번째 텍스처를 그려 볼 수 있습니다:


```JavaScript

function completeHandler(data){
  	//加载完成返回的data是arraybuffer；
    //.......这里处理我们加密的图片数据，假设我们的图片加密数据是在图片的前面写入了四个字节的数据
    //.......解密逻辑开始处理数据。
    var byte = new Laya.Byte(data);//Byte数组接收arraybuffer
    byte.writeArrayBuffer(data,4);//从第四个字节开始读取数据
    var blob = new Laya.Browser.window.Blob([data], { type: "image/png" });
    var url = Laya.Browser.window.URL.createObjectURL(blob);//创建一个url对象；
    ////我们先用第一种方式显示图片到舞台；
    var sp = new Laya.Sprite();
    sp.loadImage(url);
    Laya.stage.addChild(sp);//添加到舞台 //用loader来加载url
    Laya.loader.load(url,Laya.Handler.create(this,showImg,[url]),null,Laya.Loader.IMAGE);
}
function errorHandler(url){
    var t = new Laya.loader.getRes(url);
    var ape = new Laya.Sprite();
    ape.graphics.drawTexture(t,0,0);
    Laya.stage.addChild(ape);
    ape.pos(200,0);
}
```


세 번째는 바로 텍스처를 만들기:


```javascript

function completeHandler(data){
    //加载完成返回的data是arraybuffer
    //......这里处理我们加密的图片数据，假设我们的图片加密数据是在图片前面写入了四个字节的数据
    //......解密逻辑开始处理数据
    var byte = new Laya.Byte(data);//Byte数组接收arraybuffer
    byte.writeArrayBuffer(data,4);//从第四个字节开始读取数据
    var blob = new Laya.Browser.window.Blob([byte.buffer],{type:"image/png"});
    var url = Laya.Browser.window.URL.createObjectURL(blob);//创建一个url对象
    var htmlImg = Laya.HTMLImage.create(url);//这里创建HTMLImage，这里要用HTMLImage.create
    htmlImg.onload = function(){
        var t = new Laya.Texture(htmlImg);
        var ape = new Laya.Sprite();
        ape.graphics.drawTexture(t,0,0);
        Laya.stage.addChild(ape);
        ape.pos(200,0);
    }
}
```


이 방법은 이진제가 처리되는 방법인데, 원격 그림자원이 base64 + 데이터로 처리되어 있으며 앞부분에 다운로드 완료되어 직접 섞인 데이터를 제거하는 방법들이 많습니다.다음으로 우리는 그 중 한 가지 방법으로 무대에 나타난다.


```javascript

//初始化引擎
Laya.init(1336, 640);
var sp = new Laya.Sprite();
var xhr = new Laya.HttpRequest();
xhr.once(Laya.Event.COMPLETE,this,completeHandler);
xhr.once(Laya.Event.ERROR,this,errorHandler);
xhr.send("res/data.data","","get","text");

function completeHandler(data){
    //......加载完成，把base64字符串的图片数据提取出来；
    //......提取base64字符串；
    //......假设得到的数据是data；
    var sp = new Laya.Sprite();
    sp.loadImage(data);
    Laya.stage.addChild(sp);//添加到舞台
}
function errorHandler(e){

}
```


이상의 예는 우리가 쓰는 것은 모두`HttpRequest`가재 를 하면 개발자 도 쓸 수 있다`Laya.loader.load`방법 불러오기`Laya.loader.load`자세하게 사용하면 관련 교과서 문서로 이동하십시오.이곳은 진술하지 않는다.

위에 있는 예는 저희가 썼어요.`HttpRequest`싱글 라인과 가재, html5 에는 사실 여러 라인이 있으며, 페이지의 카튼의 무응답을 방지하기 위해 사용자 체험을 높일 수 있습니다. Worker를 사용하여 다운로드할 수 있습니다. 관련 교정은 Worker 장절에서 설명합니다.