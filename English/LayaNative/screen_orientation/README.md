#  横竖屏设置
##  1.iOS

iOS项目构建成功后，打开resource/config.ini文件，修改`orientation=30`的值，如下图所示：
![图1](img/1.jpg)

参数的意义如下：
```
orientation=2   //竖屏：IOS home键在下   
orientation=4   //竖屏：IOS home键在上   
orientation=8   //横屏：IOS home键在左   
orientation=16  //横屏：IOS home键在右   
```
orientation的值可以使用`按位或`的方式进行设置，例如:
```   
orientation=6   //代表竖屏可以任意旋转  
orientation=24  //代表横屏可以任意旋转  
```

##  2.android

android项目构建成功，打开AndroidManifest.xml文件，在activity标签内有一个screenOrientation参数，开发者可以根据自己需求进行修改，如下图所示：
![图2](img/2.jpg)

可配置的参数是android的标准，在这不做过多解释，如下所示：

```
"landscape","portrait","full_sensor","sensor_landscape","sensor_portrait","reverse_landscape","reverse_portrait"
```

##  3.html中设置

在项目的启动xxx.html(通常为index.html)中设置屏幕方向，修改screenorientation的值即可
```
<meta name='laya' screenorientation='landscape' />
```

可配置的参数如下所示：

```
"landscape","portrait","full_sensor","sensor_landscape","sensor_portrait",
```
用LayaAir创建的项目默认增加了`<meta name='laya' screenorientation='landscape' />`的这个标签，所以开发者需要根据自己的需求手工修改。  

##  4.执行顺序

应用程序在启动的时候会先读取，iOS的config中设置了屏幕的方向或android的manifest中设置了屏幕的方向。当解析到index.html的时候在读取`<meta name='laya' screenorientation='landscape' />`这个标签，并进行重新设置屏幕方向。  

例如：android的manifest中设置为portrait，html中的标签设置为landscape，运行过程中就会发现android的屏幕会旋转一下，从竖屏旋转成了横屏。

**Tips：建议开发者把两个值设定一致，这样避免程序在执行过程中出现屏幕旋转的现象。**
