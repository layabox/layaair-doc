
# 嵌入字体

## 1. 字体介绍

由于andriod设备种类繁多、android的字体文件不统一，每个系统默认的中文字体路径有差异（再加之国内很多厂商个性化定制），读取font.ttf是一个难题。

LayaNative的策略是根据android的系统版本号，枚举出字体文件的路径，如果加载成功，则使用系统默认字体，如果加载不成功，就从LayaBox网站下载一个字体存储到本地，第二次进入时，直接读取本地字体。

开发者在打包app的时候，要默认将字体打包到app中，如果在网络上下载4MB的TTF字体，会影响用户体验。

## 2.如何嵌入字体

1、构建好android项目，找到assets目录，再创建一个font目录，把要植入的字体文件改名为“layabox.ttf”，放到该目录下。如图1所示：

![图1](img/1.jpg)


**Tips:** 

模板工程默认是内嵌了ttf字体，这样会导致apk体积增加，如果你比较在乎apk大小，可以删除assets/font/layabox.ttf这个字体文件。

## 3.iOS嵌入字体

1、LayaNative支持iOS嵌入默认字体，具体做法同android，在resource下创建font目录，把要嵌入的字体改名为layabox.ttf即可，如下图2所示：   

![图2](img/2.png)