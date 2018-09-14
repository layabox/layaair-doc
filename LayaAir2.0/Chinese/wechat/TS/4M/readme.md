# 微信小游戏的4M本地包与动态资源加载

> author: charley

通常我们开发项目的时候，会直接使用本地路径，比如示例中引用的就是本地路径，

```json
Laya.Texture2D.load("res/layabox.png");
```

如果项目的目录中，全部大小加起来不超过4M的话，只要能找到本地的资源，怎么写也没问题。

但是，

微信小游戏的本地包有4M的限制，一旦超过这个限制，那就不允许上传，不允许真机预览。

所以，我们的**项目要是大于4M后，怎么处理呢？**

一种方案是分包，从小游戏基础库的2.0版本开始，可以通过配置分包，达到8M。关于分包，会另外文档进行详细介绍。这里讲另一种方案。

另一种方案就是网络动态加载，

我们在本地包内，JS代码是必须要放进去的，因为JS是不允许网络加载动态创建的。所以如果本地包内JS超过4M，首先考虑的是如何优化JS体积，比如混淆压缩，和UI代码分离。还是不行的话，只能是通过小游戏的分包方案解决。如果JS没有超过4M，那还可以视情况再放一些预加载用的基础资源。

总之，对于绝大多数小游戏而言，网络动态加载是必须使用的方式。

那**网络动态加载的路径怎么处理呢**。在本地加载的`load()`方法之后使用`URL.basePath`方法。

例如：

```java
material.diffuseTexture = Laya.Texture2D.load("res/layabox.png");
box.meshRender.material = material;
Laya.URL.basePath = "https://XXXX.com";//请把XXXX换成自己的真实网址；
//在此之下，再使用load加载资源，都会自动加入URL网址。从网络上动态加载。
```

使用`URL.basePath`方法后，再使用load加载本地路径，都会自动加上URL.basePath里的网址。这样就实现了本地与网络加载的结合。

**这样就结束了吗？并没有！**

按刚刚的写法，`res/layabox.png`明明已经上传到微信小游戏的本地目录，但是如果在使用`URL.basePath`之后，再次加载`res/layabox.png`并不会从本地加载使用，而是从网络动态加载使用。这并不是我们要的结果。

所以，引擎针对使用`URL.basePath`之后，如何再次使用本地加载，进行了**特殊目录和文件的处理**，也就是本地包白名单机制。如下例所示：

```json
MiniAdpter.nativefiles =  [
    "wxlocal",
    "res/atlas/houzi.atlas",
    "res/atlas/houzi.png",
    "common/tishi.png",
    "common/bg.png",
    "ui.json",
    "newLb/bg031.png"
];
```

**只要是MiniAdpter.nativefiles里存在的目录名或文件，引擎会自动将该目录视为本地目录**，即便使用了URL.basePath，对于包含在nativefiles白名单内的目录名或文件，都不会从网络动态加载，只会从本地加载。



如果对本篇文档有疑问，请前往官网社区提问，也可以将社区中的链接发到官方QQ群中 @ 管理员 charley

社区网址：https://ask.layabox.com/



## 本文赞赏

如果您觉得本文对您有帮助，欢迎扫码赞赏作者，您的激励是我们写出更多优质文档的动力。

![wechatPay](../../../wechatPay.jpg)