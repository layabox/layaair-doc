# HttpRequest详解

在项目中我们难免会有发送http请求的需求，在LayaAir引擎中HttpRequest就是我们发送请求的基本类。HttpRequest类其实包装的就是原生的`XMLHttpRequest`，为了开发者更深入的了解这个类，我们先从XMLHttpRequest 开始。

## 原生XMLHttpRequest

**简述**

 XMLHttpRequest中文可以解释为可扩展超文本传输请求。它为客户端提供了在客户端和服务器之间传输数据的功能。它提供了一个通过 URL 来获取数据的简单方式，并且不会使整个页面刷新。这使得网页只更新一部分页面而不会打扰到用户。

**属性**

| 属性                 | 类型                         | 描述                                       |
| ------------------ | -------------------------- | ---------------------------------------- |
| onreadystatechange | function                   | 一个JavaScript函数对象，当readyState属性改变时会调用它。   |
| readyState         | unsigned short             | 请求的五种状态                                  |
| response           | varies                     | 响应实体的类型由 `responseType 来指定，` 可以是 `ArrayBuffer` ，`Blob`， [`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document)， JavaScript 对象 (即 “json”)， 或者是字符串。如果请求未完成或失败，则该值为 `null` |
| responseText       | DOMString                  | 此次请求的响应为文本，或是当请求未成功或还未发送时为 `null`**只读。** |
| responseType       | XMLHttpRequestResponseType | 设置该值能够改变响应类型。就是告诉服务器你期望的响应格式。            |
| status             | `unsigned short`           | 该请求的响应状态码 (例如, `状态码`200 表示一个成功的请求).**只读.** |
| ` statusText`      | ` DOMString`               | 该请求的响应状态信息,包含一个状态码和原因短语 (例如 “`200 OK`“). 只读. |
| ` upload`          | ` XMLHttpRequestUpload`    | 可以在 `upload 上添加一个事件监听来跟踪上传过程。`           |
| ` withCredentials` | ` boolean`                 | 表明在进行跨站(cross-site)的访问控制(Access-Control)请求时，是否使用认证信息(例如cookie或授权的header)。 默认为 `false。` |
| timeout            | number                     | 请求超时时间                                   |

 `withCredentials`这个属性一般用到不多，这里我们简单介绍下，在web中，发送同域的请求浏览器会将`cookie`自动加在`request header`中，但是在发送跨域请求时候是不会携带。这是因为在`CORS`标准中做了规定，默认情况下，浏览器在发送跨域请求时不能发送任何认证信息（`credentials`）如”`cookies`“和”`HTTP authentication schemes`“。除非`xhr.withCredentials`为`true`（`xhr`对象有一个属性叫`withCredentials`，默认值为`false`）。所以开发者假如遇到跨域发送不能携带cookie时候请参考这个。

### 方法

#### abort()

如果请求已经被发送,则立刻中止请求.

#### getAllResponseHeaders()

返回所有响应头信息(响应头名和值), 如果响应头还没接受,则返回`null`.

#### getResponseHeader()

返回指定的响应头的值, 如果响应头还没被接受,或该响应头不存在,则返回null.

#### open()

初始化一个请求.

###### 参数

- `method`

  请求所使用的HTTP方法; 例如 “GET”, “POST”, “PUT”, “DELETE”等. 如果下个参数是非HTTP(S)的URL,则忽略该参数.

- `url`

  该请求所要访问的URL

- `async`

  一个可选的布尔值参数，默认为true,意味着是否执行异步操作，如果值为false,则send()方法不会返回任何东西，直到接受到了服务器的返回数据。如果为值为true，一个对开发者透明的通知会发送到相关的事件监听者。这个值必须是true,如果multipart 属性是true，否则将会出现一个意外。

- `user`

  用户名,可选参数,为授权使用;默认参数为空string.

- `password`
  密码,可选参数,为授权使用;默认参数为空string.密码,可选参数,为授权使用;默认参数为空string.

  #### overrideMimeType()

  重写由服务器返回的MIME type。这个可用于, 例如，强制把一个响应流当作“text/xml”来处理和解析,即使服务器没有指明数据是这个类型。注意，这个方法必须在send()之前被调用。

#### send()

发送请求. 如果该请求是异步模式(默认),该方法会立刻返回. 相反,如果请求是同步模式,则直到请求的响应完全接受以后,该方法才会返回.其中send的参数类型如下：

- `ArrayBuffer`
- `Blob`
- `Document`
- `DOMString`
- `FormData`
- `null`

#### setRequestHeader()

给指定的HTTP请求头赋值.在这之前,你必须确认已经调用 [`open()`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest#open) 方法打开了一个url.

### 事件

 基本的事件大致有如下几种：

- `onloadstart`

- `onprogress`

- `onabort`

- `ontimeout`

- `onerror`

- `onload`

- `onloadend`

  我们常用的基本就是进度事件，完成事件，错误事件等

  每一个`XMLHttpRequest`里面都有一个`upload`属性，而`upload`是一个`XMLHttpRequestUpload`对象`XMLHttpRequest`和`XMLHttpRequestUpload`都继承了同一个`XMLHttpRequestEventTarget`接口所以upload也具有上述事件。

  ​

  ## 在laya中怎么使用

  laya中用HttpRequest对XMLHttpRequest进行了简单的封装，HttpRequest继承的是EventDispatcher，具有事件派发的功能。我们写个简单的例子来看下用法：

  ```typescript
  class LayaSample {
      constructor() {
          //初始化引擎
          Laya.init(1136, 640);
          var xhr: Laya.HttpRequest = new Laya.HttpRequest();
          xhr.http.timeout = 10000;//设置超时时间；
          xhr.once(Laya.Event.COMPLETE, this, this.completeHandler);
          xhr.once(Laya.Event.ERROR, this, this.errorHandler);
          xhr.on(Laya.Event.PROGRESS, this, this.processHandler);
          xhr.send("res/data.data", "", "get", "text");
          console.log("aaaa");
      }
      private processHandler(data:any): void {
          console.log(data);
      }
      private errorHandler(data:any): void {

      }
      private completeHandler(e:any): void {

      }
  }
  new LayaSample();
  ```

上面这个示例我们发送了一个简单的请求，方式是get方式。用来获取一个远端的文件，格式为文本的格式。假如我们动态请求远端数据可以改成如下格式：

```javascript
 xhr.send("http:xxx.xxx.com?a=xxxx&b=xxx","","get","text");//发送了一个get请求，携带的参数为a = xxxx,b=xxx
```

下面用post方法请求一个数据方式如下：

```javascript
xhr.send("http:xxx.xxx.com","a=xxxx&b=xxx","post","text");
```

这里的重点是send函数,这个send函数要和XMLHttpRequest的send区分开。看下参数：

###### 参数

- `url` 请求的远端地址
- data 发送的数据 ；一般post方法，要传递这个参数。get方法参数和url拼接在一起。
- method 发送数据的方法 默认为 get
- responseType 消息返回的类型
- headers 给指定的HTTP请求头赋值

###### 属性

- `http`: 原生XMLHttpRequest的引用，设置XMLHttpRequest的一些属性可以设置这个属性，比如timeout，xhr.http.timeout = 10000，设置超时10秒。

- `data`: 请求返回的数据。

- `url` :请求的url。

- ### 扩展HttpRequest

   在开发过程中HttpRequest可能不能满足我们的需求，比如上传文件，比如设置超时时间，比如操作表单数据等等。扩展HttpRequest很简单，你继承HttpRequest，或者干脆自己重写HttpRequest这个类都可以，这个看开发者的需求，重写HttpRequest建议直接继承EventDispatcher。重写就是重新包装XMLHttpRequest这个类。下面是一个简单的继承的示范：

   ```typescript
   class HttpRequestExtension extends Laya.HttpRequest {
       constructor() {
           super();
       }
       public send(url:string,data:any=null,method:string="get", responseType:string="text", headers:any=null):void{
           super.send(url,data,method,responseType,headers);
               this._http.upload.onprogress= function(e:any):void
               {
                   //上传进度
               }
               this._http.upload.onload= function(e:any):void
               {
               }
               this._http.upload.onerror= function(e:any):void
               {
               }
               this._http.upload.onabort = function(e:any):void
               {
               }
       }
   }
   ```

上面是一个上传文件的示范，添加了XMLHttpRequest的upload的一些事件，这里的super.send简单的用了父类的方法，开发者可以不用，完全自己另写一套来满足自己的需求。

## 结语

 XMLHttpRequest这个原生的类其实很庞大，功能很强大，laya的封装只是满足基本的需求，一些特殊的需求，需要自己进行扩展。

- 详细的`XMLHttpRequest`，请看 [W3C的xhr 标准](https://www.w3.org/TR/XMLHttpRequest/);
- `XMLHttpRequest`发各种类型的数据，可以参考[发送数据](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Sending_and_Receiving_Binary_Data)和[html5rocks上的这篇文章](http://www.html5rocks.com/zh/tutorials/file/xhr2/)
- 了解`XMLHttpRequest`的基本使用，可以参考[MDN的XMLHttpRequest介绍](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)；
- 想了解跨域请求，则可以参考[W3C的 cors 标准](https://www.w3.org/TR/cors/);