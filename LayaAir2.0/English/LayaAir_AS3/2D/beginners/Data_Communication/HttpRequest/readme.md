#HttpRequest Explanation

In the project, we will inevitably have the need to send http requests. In the LayaAir engine, HttpRequest is the basic class of our requests. Httprequest class actually wraps the native`XMLHttpRequest `To give developers a deeper understanding of this class, let's start with XMLHttpRequest.

##Native XMLHttpRequest

####Sketch

XMLHttpRequest can be interpreted in Chinese as an Extensible HyperText Transfer request. It provides the client with the function of transferring data between the client and the server. It provides a simple way to get data through a URL without refreshing the entire page. This allows the page to update only part of the page without disturbing the user.

###attribute

| Attribute | Type | Description|
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| onreadystatechange | function | A JavaScript function object is called when the readyState property changes. A kind of
| ReadyState | unsigned short | Five states of the request|
| The type of response | varies | response entity is determined by`responseType 来指定，`Could be`ArrayBuffer`,`Blob`[`Document`] (https://developer.mozilla.org/zh-CN/docs/Web/API/Document), JavaScript objects (that is, "json"), or strings. If the request is incomplete or fails, the value is`null`A kind of
| ResponsseText | DOMString | The response to this request is text, or when the request is unsuccessful or has not yet been sent.`null`**Read-only.**A kind of
| ResponsseType | XMLHttpRequestResponseType | Setting this value can change the response type. That's to tell the server what response format you expect. A kind of
| status|`unsigned short`|The response status code of the request (for example,`状态码`200 represents a successful request.**Read-only.**A kind of
A kind of`statusText`A kind of`DOMString`| The response status information of the request contains a status code and a cause phrase (for example“`200 OK`"). Read only.|
A kind of`upload`A kind of`XMLHttpRequestUpload`Yes, you can.`upload 上添加一个事件监听来跟踪上传过程。`A kind of
A kind of`withCredentials`A kind of`boolean`| Indicates whether authentication information (such as cookies or authorized headers) is used for cross-site access control requests. Default is`false。`A kind of
| timeout | number | request timeout|
​`withCredentials`This attribute is rarely used. Here we briefly introduce that in the web, the browser sending requests from the same domain will`cookie`Automatic addition`request header`However, it will not be carried when sending cross-domain requests. This is because`CORS`The standard stipulates that by default, browsers cannot send any authentication information when sending cross-domain requests.（`credentials`Such as "`cookies`"And"`HTTP authentication schemes`". Unless`xhr.withCredentials`by`true`(`xhr`Object has an attribute called`withCredentials`, default is`false`) So if a developer encounters cross-domain sending that cannot carry cookies, please refer to this.

###Method

####Abort ()

If the request has been sent, the request is terminated immediately.

####Getallresponseheaders()

Return all response header information (response header name and value), if the response header has not been accepted, return`null`.

####GetResponseHeader ()

Returns the value of the specified response header, or null if the response header is not accepted or does not exist.

####Open ()

Initialize a request.

###### 参数

-`method`

The HTTP method used in the request; for example, "GET", "POST", "PUT", "DELETE". If the next parameter is a non-HTTP (S) URL, the parameter is ignored.

-`url`

The URL to be accessed by the request

-`async`

An optional Boolean parameter, which defaults to true, means whether to perform an asynchronous operation, and if the value is false, the send () method does not return anything until it receives the return data from the server. If the value is true, a transparent notification to the developer will be sent to the relevant event listener. This value must be true, otherwise an accident will occur if the multipart attribute is true.

-`user`

User name, optional parameter, for authorized use; default parameter is empty string.

-`password`
Password, optional parameter, for authorization; default parameter is empty string. Password, optional parameter, for authorization; default parameter is empty string.
####OverrideMimeType ()

Rewrite the MIME type returned by the server. This can be used, for example, to force a response flow to be processed and parsed as "text/xml", even if the server does not specify that the data is of this type. Note that this method must be called before sending ().

####Send ()

Send a request. If the request is in asynchronous mode (default), the method returns immediately. Conversely, if the request is in synchronous mode, the method will not return until the response to the request is fully accepted. The parameter type of send is as follows:

-`ArrayBuffer`

-`Blob`

-`Document`

-`DOMString`

-`FormData`

-`null`

####Setrequestheader()



  给指定的HTTP请求头赋值.在这之前,你必须确认已经调用 [`open()`] (https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest#The open method opens a url.

###Event

The basic events are as follows:

-`onloadstart`

-`onprogress`

-`onabort`

-`ontimeout`

-`onerror`

-`onload`

-`onloadend`

We usually use progress events, completion events, error events, etc.

Every last`XMLHttpRequest`There's one inside.`upload`Properties, and`upload`It is a`XMLHttpRequestUpload`object`XMLHttpRequest`and`XMLHttpRequestUpload`They all inherited the same`XMLHttpRequestEventTarget`So upload also has the aforementioned events.

##How to use it in LAYA

In laya, XMLHttpRequest is simply encapsulated with HttpRequest. HttpRequest inherits Event Dispatcher and has the function of event dispatch. Let's write a simple example to see the usage:


```java

package {
    import laya.events.Event;
    import laya.net.HttpRequest;

	public class LayaSample {
		
		public function LayaSample() {
			//初始化引擎
			Laya.init(1136, 640);
            var xhr:HttpRequest = new HttpRequest();
            xhr.http.timeout = 10000;//设置超时时间；
            xhr.once(Event.COMPLETE,this,completeHandler);
            xhr.once(Event.ERROR,this,errorHandler);
            xhr.on(Event.PROGRESS,this,processHandler);
            xhr.send("res/data.data","","get","text");
		}
        private function processHandler(data:Object):void
        {
            trace(data);
        }
        private function completeHandler(data:Object):void
        {
            
        }
        private function errorHandler(e:Object):void
        {
            
        }
	}
}
```


In the example above, we sent a simple request in get mode. Used to retrieve a remote file in text format. If we request remote data dynamically, we can change it to the following format:


```

 xhr.send("http:xxx.xxx.com?a=xxxx&b=xxx","","get","text");//发送了一个get请求，携带的参数为a = xxxx,b=xxx
```


The following is how to request a data with the post method:


```

 xhr.send("http:xxx.xxx.com","a=xxxx&b=xxx","post","text");
```


The emphasis here is on the send function, which should be distinguished from the send of XMLHttpRequest. Look at the parameters: Look at it.

###### 参数

##-`url`Request remote addressThe data sent by data; the general post method passes this parameter. Get method parameters and URLs are stitched together.
##- Method sends data by default to getThe type returned by the responseType message
- Headers assign a value to the specified HTTP request header


###### 属性

##-`http`Reference to native XMLHttpRequest. Setting some attributes of XMLHttpRequest can set this attribute, such as timeout, xhr. http. timeout = 10,000, setting a timeout of 10 seconds. `data`: 请求返回的数据。

-`url`The URL requested.

###Extending HttpRequest

In the development process, HttpRequest may not meet our needs, such as uploading files, setting timeout, manipulating form data, etc. Extending HttpRequest is very simple. You can inherit HttpRequest or simply rewrite the class itself. This depends on the needs of developers. Rewriting HttpRequest suggests directly inheriting EventDispatcher. Rewriting is to repackage the class XMLHttpRequest. Here is a simple example of inheritance:


```java

package
{
    import laya.net.HttpRequest;
    
    public class HttpRequestExtension extends HttpRequest
    {
        public function HttpRequestExtension()
        {
            super();
        }
        public override function send(url:String, data:*=null, method:String="get", responseType:String="text", headers:Array=null):void
        {
            super.send(url,data,method,responseType,headers);
            this._http.upload.onprogress= function(e:Object):void
            {
                //上传进度
            }
            this._http.upload.onload= function(e:Object):void
            {
                
            }
            this._http.upload.onerror= function(e:Object):void
            {
                
            }
            this._http.upload.onabort = function(e:Object):void
            {
                
            }
        }
    }
}
```


Above is a demonstration of uploading files, adding some upload events of XMLHttpRequest. Here super. send simply uses the method of parent class, developers can write another set to meet their own needs without using it.

##epilogue

The native class of XMLHttpRequest is very large and powerful. The encapsulation of Laya only meets the basic needs, and some special needs need to be extended by itself.

##- detailed`XMLHttpRequest`Please look at it.[W3C的xhr 标准](https://www.w3.org/TR/XMLHttpRequest/); `XMLHttpRequest`Send various types of data, you can refer to[发送数据](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Sending_and_Receiving_Binary_Data)and[html5rocks上的这篇文章](http://www.html5rocks.com/zh/tutorials/file/xhr2/)
##- Understanding`XMLHttpRequest`You can refer to[MDN的XMLHttpRequest介绍](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest);For cross-domain requests, you can refer to[W3C的 cors 标准](https://www.w3.org/TR/cors/);




