#Horizontal and Vertical Screen Settings

##I. Setting up the horizontal and vertical screen before the construction of the project

###1. Set in index.js or runtime.json

* index.js

If you use index.js to set the screen orientation, you can modify the value of screen Orientation:


```javascript

window.screenOrientation = "sensor_landscape";
```


The configurable parameters are as follows:

| Value | Screen Direction|
|:::: |: ---::|
|Landscape|
|Portrait|
| sensor_landscape or sensor Landscape | horizontal screen (both directions)|
| sensor_portrait or sensor portrait | vertical screen (both directions)|

* runtime.json

If you use runtime.json to set the orientation of the screen, you can modify the value of screen Orientation:


```json

"screenOrientation":"sensor_landscape"
```


ScreOrientation takes the same value as window. screenOrientation in index. js.

##2. Setting up of horizontal and vertical screen after project construction

###1.iOS

After the iOS project is successfully built, open the resource/config.ini file and modify it`orientation=16`The values are shown in the following figure:

![图1](img/1.png)

The significance of the parameters is as follows:

```

orientation=2   //竖屏：IOS home键在下   
orientation=4   //竖屏：IOS home键在上   
orientation=8   //横屏：IOS home键在左   
orientation=16  //横屏：IOS home键在右   
```

The orientation value can be used`按位或`For example:

```

orientation=6   //代表竖屏可以任意旋转  
orientation=24  //代表横屏可以任意旋转  
```


**Be careful:**The horizontal and vertical screen settings in iOS project are best consistent with config.ini settings. If the settings are inconsistent, an unknown situation may occur. Set as follows:

![图](img/2.png)

###2.android

The Android project is successfully built. Open the Android Manifest. XML file and have a screenOrientation parameter in the activity tag. The developer can modify it according to his own needs, as shown in the following figure:
![图2](img/3.jpg)

Configurable parameters are the Android standard, which is not explained too much here, as follows:


```

"landscape","portrait","full_sensor","sensor_landscape","sensor_portrait","reverse_landscape","reverse_portrait"
```


##III. Order of execution

When the application starts, it reads the screen orientation set in iOS config. ini or Android Manifest. xml. When parsing to index. JS or runtime. json, read the values set by the screen's horizontal and vertical screen and reset the screen orientation.

For example: Android Android Manifest. XML is set to portrait, index. JS is set to landscape, running process will find in the Android device, the screen will rotate, from the vertical screen to the horizontal screen.

**Tips: It is recommended that developers set the two values in the same order to avoid screen rotation during the execution of the program.**