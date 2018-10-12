#  横竖屏设置

## 一、项目构建前横竖屏的设置

### 1.在index.js或是runtime.json中设置

* index.js

如果使用index.js设置屏幕方向，修改screenOrientation的值即可：

```javascript
window.screenOrientation = "sensor_landscape";
```

可配置的参数如下所示：

|取值|屏幕方向|
|:--:|:-----:|
|landscape|横屏|
|portrait |竖屏|
|sensor_landscape或者sensorLandscape|横屏(双方向)|
|sensor_portrait或者sensorPortrait|竖屏(双方向)|

* runtime.json

如果使用runtime.json设置屏幕方向，修改screenOrientation的值即可：

```json
"screenOrientation":"sensor_landscape"
```

screenOrientation的取值和index.js里的window.screenOrientation取值相同。

## 二、项目构建后横竖屏的设置

### 1.iOS

iOS项目构建成功后，打开resource/config.ini文件，修改`orientation=16`的值，如下图所示：

![图1](img/1.png)

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

**注意：** iOS工程项目内的横竖屏设置最好和config.ini设置一致。如果设置的不一致可能会导致未知的情况发生。设置如下图： 

![图](img/2.png)

### 2.android

android项目构建成功，打开AndroidManifest.xml文件，在activity标签内有一个screenOrientation参数，开发者可以根据自己需求进行修改，如下图所示：
![图2](img/3.jpg)

可配置的参数是android的标准，在这不做过多解释，如下所示：

```
"landscape","portrait","full_sensor","sensor_landscape","sensor_portrait","reverse_landscape","reverse_portrait"
```

## 三、执行顺序

应用程序在启动的时候会先读取iOS的config.ini中设置的屏幕方向或android的AndroidManifest.xml中设置的屏幕方向。当解析到index.js或runtime.json的时候再读取屏幕横竖屏设置的值，并重新设置屏幕方向。  

例如：android的AndroidManifest.xml中设置为portrait，index.js中的标签设置为landscape，运行过程中就会发现在android设备上，屏幕会旋转一下，从竖屏旋转成了横屏。

**Tips：建议开发者把两个值设定一致，这样避免程序在执行过程中出现屏幕旋转的现象。**