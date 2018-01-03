# 跨域的处理

很多新手开发者制作完成一个Demo运行的时候有几率会出现资源无法显示的问题（代码完全正确的情况下），这时打开浏览器的控制台会发现资源跨域了。

提示内容如下所示：

*No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'file://' is therefore not allowed access.*

**为什么会跨域？**

在浏览器默认的情况下，如果加载一个本地文件，会出现交叉域访问的问题。这就是**跨域**。

**如何解决跨域问题？**

跨域分为两种。一种是文件请求跨域，一种是数据请求跨域

##### 1.文件请求跨域

文件请求跨域的解决方法有两种，一种是给浏览器添加启动参数。在此以chrome为例；选中chrome浏览器快捷方式打开的图标——>右击打开属性——>打开快捷方式一栏——>目标末尾添加（前边有引号的话加在引号外） --allow-file-access-from-files。如下图所示：

![1](img\1.png)(图1)

这时将所有已打开的chrome浏览器页面全部关闭重新运行即可。

**以上方法只能解决本地调试的问题，无法解决其他主机存在的跨域问题**。想彻底解决文件跨域问题则需修改webServer（一般webserver大多数都是apache、nginx、tomcat等），在请求特定的域名下加上跨域标识，这里以nginx为例：

```
http {

  ......

  add_header Access-Control-Allow-Origin *;

  add_header Access-Control-Allow-Headers X-Requested-With;

  add_header Access-Control-Allow-Methods GET,POST,OPTIONS;

  ......

}

```

这样就可以实现GET,POST,OPTIONS跨域请求的支持，也可以 add_header Access-Control-Allow-Origin [http://www.layabox.com;](http://www.layabox.com%3B/) --指定允许的url；

##### 2.数据请求跨域

数据请求跨域需要后端配合修改，在请求里加上header标识，这里以php语言为例：

```
header("Access-Control-Allow-Origin: *");
```

不一定用*，它是允许所有的主机跨域访问，开发者也可以写指定域名下的主机才能进行访问



**关于微信头像跨域：**

可以在后台把图片下载到自己的服务器上，然后通过自己的服务器进行访问头像资源