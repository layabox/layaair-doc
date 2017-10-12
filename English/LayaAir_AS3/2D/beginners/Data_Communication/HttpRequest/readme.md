# HttpRequest Methods

​	In the project, we will inevitably need to send HTTP requests. LayaAir engine can handle with HttpRequest basic class. Actually packages native is an abstract from `XMLHttpRequest ` , and for developers to get a better understanding of this class, let's start with 
XMLHttpRequest method.

## Native XMLHttpRequest

#### General overview

​	It provides the client with the ability to transfer data between the client and the server. It provides a simple way to get data through a URL and does not need refresh the entire page. This allows the page to update only a subset of the pages without disturbing the user (client side).

### Properties

| Attribute          | type                       | description                              |
| ------------------ | -------------------------- | ---------------------------------------- |
| onreadystatechange | function                   | JavaScript function object that is called when the readyState property changes.   |
| readyState         | unsigned short             | five states request                                 |
| response           | varies                     | type of response entity is made by `responseType spec,` can be `ArrayBuffer` ，`Blob`， [`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document)， JavaScript object ("json"), or string. If the request is incomplete or fails, the value is `null` |
| responseText       | DOMString                  | Response to this request is text, when is unsuccessful or has not been sent `null`**read-only.** |
| responseType       | XMLHttpRequestResponseType | Setting this value can change the response type. Tell the server the desired response format            |
| status             | `unsigned short`           | Response status code for this request (by example, `Status code`200 Represents a successful request).**read-only.** |
| `statusText`       | `DOMString`                | The request's response status information contains a status code and description(cf. "`200 OK`"). read-only. |
| `upload`           | `XMLHttpRequestUpload`     | You can add an event listener on the `upload to track the upload process. `           |
| `withCredentials`  | `boolean`                  | Showed in the cross site access control when requested, Whether to use authentication information(example, cookie or authorized header). Default set to `false。` |
| timeout            | number                     | Request timeout                                   |
​	`withCredentials` property generally used not too much. Here we introduce, in web, sending the same domain request  browser will automatically add `cookie`  in `request header`. However transmission cross domain requests it is not portable. This is because in the`CORS`  standard specifications. Browser cannot send any authentication information（`credentials`）, such as "`cookies`" and "`HTTP authentication schemes`", when sending cross domain requests. Unless `xhr.withCredentials` is set `true`（`xhr`object has an attribute called `withCredentials`, the default value is `false`）. So developers should refer to this if cross domain sending cannot carry cookie.

###method

####abort()

If the request has been sent, the request is aborted immediately.

#### getAllResponseHeaders()

Returns all the response headers information  (response and top value), or `null` if the response header has not been accepted.

#### getResponseHeader()

Returns the value of the specified response header. if the response header has not been accepted or does not exist, it return null.

#### open()

Initialize a request

###### parameter

- `method`

  Request the HTTP method used for example "GET", "POST", "PUT", "DELETE" and so on. If the next parameter is non HTTP (S) URL, the parameter is ignored.

- `url`

  The URL to which the request is to be accessed

- `async`

  An optional boolean parameter, set defaults to true, means whether to perform an asynchronous operation. If the value is false, the send () method does not return anything until the server returns the data. If the value is true, a transparent notification to the developer is sent to the relevant event listener. This value must be true, and if the multipart property is true, an unexpected event will occur.

- `user`

  User name, optional parameter, for authorization use; default parameter is null string.

- `password`
  Password, optional parameter for authorization use; default parameter is null string.
#### overrideMimeType()

  Overwrite the MIME type returned by the server. Can be used for example to force a response stream to be treated and parsed as "text/xml" even if the server does not specify the data type. Note that this method must be called before send ().

#### send()

Send the request. If the request is asynchronous mode (default), the method will return immediately. If the request is in synchronous mode, the method will not return until the requested response is fully accepted. The parameter type of send is as follows:

- `ArrayBuffer`

- `Blob`

- `Document`

- `DOMString`

- `FormData`

- `null`

#### setRequestHeader()

  Assign the specified HTTP request header. Before that, you must confirm that the [`open()`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest#open) method has been called opened with a url.

### event

​	The basic events are as follows:

- `onloadstart`

- `onprogress`

- `onabort`

- `ontimeout`

- `onerror`

- `onload`

- `onloadend`

  What we usually use is progress of events, complete events, errors events, and so on.

  Each `XMLHttpRequest` has an `upload`  attribute, and `upload` is an `XMLHttpRequestUpload` `XMLHttpRequest` object and `XMLHttpRequestUpload` inherited o the same `XMLHttpRequestEventTarget` interface. So upload also has the above events.

## How to use it in Laya

  	Laya uses HttpRequest to encapsulate XMLHttpRequest in a simple package, HttpRequest inherits EventDispatcher, with the event distribution function. Let's write a simple example to see how it works:

```java
package {
    import laya.events.Event;
    import laya.net.HttpRequest;

	public class LayaSample {
		
		public function LayaSample() {
			// Initialize the stage
			Laya.init(1136, 640);
            var xhr:HttpRequest = new HttpRequest();
            xhr.http.timeout = 10000;//Set timeout;
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

​	In the above example we sent a simple request. A form used to obtain a remote file in a text format. If we dynamically request remote data, we can be changed to the following format:

```
 xhr.send("http:xxx.xxx.com?a=xxxx&b=xxx","","get","text");//  get request is sent with the arguments a = XXXX, b=xxx
```

​	The following method uses the post method to request a data as follows:

```
 xhr.send("http:xxx.xxx.com","a=xxxx&b=xxx","post","text");
```

 Focus here is the send function, which is separated from the send of XMLHttpRequest. Look at the parameters

###### parameter

- `url`  Remote address of the URL request
- data to be sent ; general post method, to pass this parameter. get method parameters and url spliced together with the url.
- method sends data, by default is get
- responseType  The type of return message
- headers   assigns the specified HTTP request header


###### attribute

- `http`: http: native XMLHttpRequest reference, set some attributes of XMLHttpRequest can set this property, such as timeout, xhr.http.timeout = 10000, set the timeout 10 seconds.
- `data`: requests returned data.
- `url` : requested url.

### Extended HttpRequest

​	In the development process, HttpRequest may not meet our needs, such as uploading files, such as setting timeout time, such as operating form data, and so on. Extending HttpRequest is simple. You can inherit HttpRequest, or simply rewrite your own HttpRequest class. This looks at the developer's needs, and rewrites HttpRequest's recommendation to inherit EventDispatcher directly. Rewriting is wrapping the class "XMLHttpRequest". Here is an example of a simple inheritance:
  

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
                //Upload progress
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

The above is a file upload demonstration, add some events in XMLHttpRequest upload, where super.send with a simple method of the superclass, developers can not completely on my own to write another set to meet their own needs. 

## Conclusion

​	XMLHttpRequest native class is very large, powerful, Laya's package refer the basic needs, but your free to expand by your own according the need.

- Detailed `XMLHttpRequest`, see [W3C's xhr standard](https://www.w3.org/TR/XMLHttpRequest/);
- `XMLHttpRequest` send all kinds of data, you can refer to [send data](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Sending_and_Receiving_Binary_Data) and [html5rocks article](http://www.html5rocks.com/zh/tutorials/file/xhr2/)
- Understand the basic use of `XMLHttpRequest` , you can refer to the introduction of [XMLHttpRequest MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)；
- To go further with  cross domain requests, you can refer to the [W3C standard](https://www.w3.org/TR/cors/);




