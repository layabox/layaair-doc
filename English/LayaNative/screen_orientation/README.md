#  Horizontal and vertical screen settings
##  1.iOS

After the iOS project is successfully built, open the resource/config.ini file and modify the value of `orientation=30`, as shown in the following figure:
![图1](img/1.jpg)

The meaning of the parameter is as follows:
```
orientation=2   //竖屏：IOS home键在下   
orientation=4   //竖屏：IOS home键在上   
orientation=8   //横屏：IOS home键在左   
orientation=16  //横屏：IOS home键在右   
```
The values of the orientation can be set by using `bitwise`operations. by example:
```   
orientation=6   //The vertical screen can be arbitrary rotation
orientation=24  //The horizontal screen can be arbitrary rotation
```

##  2.android

android project build successfully. Open the AndroidManifest.xml file. There is a screenOrientation parameter in the activity tag. Developers can make modification according to their needs. As shown in the following figure:
![图2](img/2.jpg)

Configurable parameters are the standard android, which is not explained too much, as follows:

```
"landscape","portrait","full_sensor","sensor_landscape","sensor_portrait","reverse_landscape","reverse_portrait"
```

##  3. Set in html

Set the screen direction in the startup page xxx.html(usually index.html). Modify the value of the screenorientation
```
<meta name='laya' screenorientation='landscape' />
```

The configurable parameters are as follows:

```
"landscape","portrait","full_sensor","sensor_landscape","sensor_portrait",
```
Projects created with LayaAir add this tag by default to `<meta name='laya' screenorientation='landscape' />`, so developers need to manually modify it according to their needs.

##  4. Execution order

Application will be read at startup, iOS config set the direction of the screen or in the manifest of the Android. When parsing to index.html, read the tag `<meta name='laya' screenorientation='landscape' />` and reset the screen orientation. 

For example : Android's manifest set to portrait, html tags set landscape, the process of running will find the android screen will rotate a bit, and turn from vertical screen to horizontal screen

**Tips: It is suggested that the developer set the two values in order to avoid the phenomenon of screen rotation during the execution of the program.**
