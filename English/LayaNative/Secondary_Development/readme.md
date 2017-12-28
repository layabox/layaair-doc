# Realize secondary development with reflection mechanism

　　LayaNative by providing reflection mechanism to help developers can easily secondary development. Next, we will learn how to do two development through the implementation and use of reflection mechanism.

## 1. Bringing Reflection

　　With LayaNative, you can dynamically create the class or function written by the native development language of the mobile terminal under the Android (Java under iOS, Objective-C) on the JavaScript level.

LayaNative's reflections are mainly used by the following PlatformClass and PlatformObj.

```javascript
// 平台类.
class PlatformClass
{
  /**
   创建Java/OC的类, 脚本和平台对应
   className  包 + 类名
  */
  static createClass(className:string):PlatformClass;
  /**
     创建该类的对象
     args 构造函数的参数
  */
  newObject(...args):PlatformObj;
  /**
     调用该类的静态方法, 返回返回值
     (注: Java层可以直接返回返回值, OC不能, 返回值为空的, OC可以调用改方法)
     methodName 方法名
     args  参数
  */
  call(methodName:string,...args);   
  /**
     调用该类的静态方法, 通过异步返回给脚本, 此时需要平台(Java/OC)调用相应的接口
     Java : ExportJavaFunction.CallBackToJS(class|className,methodeName, result);
     返回给脚本:
     Callback  回调函数, 参数为返回值
     methodName 方法名
     args  参数
  */
  callWithBack(callback,methodName:string,...args);
}

```

```javascript
// 平台对象类.
class PlatformObj
{
  /**
     调用该对象的成员方法, 返回返回值
     (注: Java层可以直接返回返回值, OC不能, 返回值为空的, OC可以调用改方法)
     methodName 方法名
     args  参数
  */
  call(methodName:string,...args);
  /**
     调用该对象的成员方法, 通过异步返回给脚本, 此时需要平台(Java/OC)调用相应的接口
     Java : ExportJavaFunction.CallBackToJS(obj(this),methodeName, result ); // obj即该Java对象
     返回给脚本:
     Callback  回调函数, 参数为返回值
     methodName 方法名
     args  参数
  */
  callWithBack(callback,methodName:string,...args);
}
```

(Tips: All parameters are currently only supported by common  types: Numbers, strings, bool. In the OC layer: The number and bool correspond to NSNumber, String corresponds to NSString)



## 2. Use reflection
  Here are two simple examples of how to use the reflection mechanism for the secondary development.

###   2.1 Turn the flash on / off  is realized by calling the static function

**Function example:**

####     2.1.1 JavaScript layer:

The way to call the Android platform: 
```javascript
// a、创建Test类
var Test=Laya.PlatformClass.createClass("com.layabox.test.Test"); // 这个名字要与下面声明的Java的类名匹配.
var a=false;
// 注册手指按下事件
document.addEventListener("touchstart",function(e){
  a=!a;// 实现奇数次打开 偶数次关闭
// b、调用静态函数openlight 参数为a
  Test.call("openlight",a);
});
```

The way to call the iOS platform:
```javascript
// a、创建Test类
var Test=Laya.PlatformClass.createClass("Test"); // 这个名字要与下面声明的OC的类名匹配 iOS不用包名
var a=false;
// 注册手指按下事件
document.addEventListener("touchstart",function(e){
  a=!a;// 实现奇数次打开 偶数次关闭
// b、调用静态函数openlight 参数为a
Test.call("openlight:",a); // iOS注意函数签名为 "openlight:"
});
```

####     2.1.2 Android/Java layer declaration needs to create the class Test:

```javascript
package com.layabox.test;
import android.hardware.Camera;
import layaair.game.browser.ExportJavaFunction;
public class Test {
    public static Camera camera = Camera.open();
    public static Camera.Parameters parameter;
    public static void openlight(boolean bOpen) {
        if(bOpen) {
            camera.startPreview();
            parameter = camera.getParameters();
            parameter.setFlashMode(Camera.Parameters.FLASH_MODE_TORCH);
            camera.setParameters(parameter);
        }
        else {
            parameter = camera.getParameters();
            parameter.setFlashMode(Camera.Parameters.FLASH_MODE_OFF);
            camera.setParameters(parameter);
            camera.stopPreview();
        }
        // 静态函数回调通知js端
        // ExportJavaFunction.CallBackToJS(Test.class,"openlight","test");
    }
}
```

####     2.1.3 Android/JavaLayer modification Manifest:

```java
<uses-permission android:name="android.permission.FLASHLIGHT" />
 
<uses-permission android:name="android.permission.CAMERA"/>
 
<uses-feature android:name="android.hardware.camera" />
 
<uses-feature android:name="android.hardware.autofocus"/>

```

####     2.1.4 iOS/OC Layer declarations above that need to be created Test class:

```javascript
#import <AVFoundation/AVCaptureSession.h>
#import <Foundation/Foundation.h>
@interface Test : NSObject 
+(void) openlight:(NSNumber*)open; // 只支持对象类型bool类型用NSNumber
@end
```
```javascript
#import "test.h"
#import <AVFoundation/AVCaptureDevice.h>
#import <AVFoundation/AVMediaFormat.h>
#import <AVFoundation/AVCaptureInput.h>
#import <AVFoundation/AVCaptureVideoDataOutput.h>
#import <conchRuntime.h>
@implementation Test
static AVCaptureSession * session = nil;
+(void) openlight:(NSNumber*)open; // 只支持对象类型bool类型用NSNumber
{
    if (open.intValue){
        AVCaptureDevice * device = [AVCaptureDevice defaultDeviceWithMediaType:AVMediaTypeVideo];
        if (device.torchMode == AVCaptureTorchModeOff && [device isTorchModeSupported:AVCaptureTorchModeOn]) {
            session = [[AVCaptureSession alloc]init];
            AVCaptureDeviceInput * input = [AVCaptureDeviceInput deviceInputWithDevice:device error:nil];
            [session addInput:input];
            
            AVCaptureVideoDataOutput * output = [[AVCaptureVideoDataOutput alloc]init];
            [session addOutput:output];
            
            [session beginConfiguration];
            [device lockForConfiguration:nil];
            
            [device setTorchMode:AVCaptureTorchModeOn];
            
            [device unlockForConfiguration];
            [session commitConfiguration];
            
            [session startRunning];
        }
    }
    else{
        [session stopRunning];
    }
    // 静态函数回调通知JS层
    //[[conchRuntime GetIOSConchRuntime] callbackToJSWithClass:self.class methodName:@"openlight:" ret:@"test"];
    //[[conchRuntime GetIOSConchRuntime] callbackToJSWithClassName:NSStringFromClass(self.class) methodName:@"openlight:" ret:@"test"];
}
@end
```
If the run crashes , Info.plist add the Privacy - Camera Usage Description  
![www](img/1.png)  
Note: the source file suffix should be changed to.mm. Call the static function to pay attention to the call writing of the script. The method of OC is a static class method to use +.
If OC needs to return a parameter to a script or a notification script, you need to call callbackToJSWithClass or callbackToJSWithClassName
The script should be changed to Test.callWithBack(function(msg){alert(msg);},"openlight:",a);

####      It is achieved through the above steps. Odd number click to open the flash. Even click to turn off the function of the flash



###   2.2 By calling the function of the object to achieve a simple addition and subtraction

**Sample:**

####     2.2.1 JavaScript layer:

​      (Note:  Android platform supports the return value of the function and can also get the return value by the callback,  iOS platform only supports the return value obtained through a callback.)

​      way to call the Android platform: 

```javascript
//a. Create a Test class
var Test=Laya.PlatformClass.createClass("com.layabox.test.Test");
 
//b、创建Test对象
var testAdd=Test.newObject("+");
var testMinus=Test.newObject("-");
 
//c、调用成员函数
testAdd.callWithBack(function(n){ alert("2+3="+n); },"operator",2,3);
var n=testMinus.call("operator",2,3); // Android 才可以直接返回
alert("2-3="+n);
```

​      Way to call the iOS platform:

```javascript
//a、创建Test类
var Test=Laya.PlatformClass.createClass("Test");
 
//b、创建Test 对象
var testAdd=Test.newObject(); //不支持构造函数
testAdd.callWithBack(function(n){},"setOp:","+"); //单独设置属性
var testMinus=Test.newObject(); // 不支持构造函数
testMinus.callWithBack(function(n){},"setOp:","-"); //单独设置属性
 
//c、调用成员函数
testAdd.callWithBack(function(n){alert("2+3="+n);},"operatorWith:and:",2,3);
testMinus.callWithBack(function(n){alert("2-3="+n);},"operatorWith:and:",2,3);
```

####     2.2.2 Android/Java Layer declaration need to create a class Test:

```javascript
package com.layabox.test;
import layaair.game.browser.ExportJavaFunction;
public class Test {
    public String op;
    public Test(String op) {
        this .op=op ;
    }
       public int operator( int x,int y) {
           if ("+".equals( this.op )) {
               ExportJavaFunction.CallBackToJS (this, "operator", x + y);
               return x+y;
           }
           else if ("-".equals( this.op ))
               return x-y;
                
           // ExportJavaFunction.CallBackToJS(this,"operator",x-y);
 
           return 0;
    }
}
```

####     2.2.3 iOS/OC Layer declaration need to create a class Test:

```javascript
#import <Foundation/NSObject.h>
@interface Test: NSObject
@property (nonatomic) NSString* op;
-(void) operatorWith:(NSNumber*)x and:(NSNumber*)y;
@end
```
```javascript
#import "Test.h"
#import <conchRuntime.h>
#import <Foundation/NSString.h>
@implementation Test
-(void) operatorWith:(NSNumber*)x and:(NSNumber*)y
{
    int result = 0;
    if ([self.op isEqualToString:@"+"]){
        result = x.intValue + y.intValue;
    }
    else if ([self.op isEqualToString:@"-"]){
        result = x.intValue - y.intValue;
    }
    [[conchRuntime GetIOSConchRuntime] callbackToJSWithObject:self methodName:@"operatorWith:and:" ret:[NSNumber numberWithInt:result]];
}
@end
```
Note：The source file suffix to be changed to .mm. Call the instance method to pay attention to the call script. The OC method is used by the instance method. Callback use callbackToJSWithObject.
​    A simple addition and subtraction is completed through the above steps

  Through the above methods, we can easily carry out the two development of native code. In addition, LayaNative saves more time to help developers, encapsulates conchMarket global class, so that developers can more easily connect to channels.


##  3. Platform code（android/ios）initiatively executes the JS script

###     3.1 IOS/OC execute the JS script

```javascript
[[conchRuntime GetIOSConchRuntime] runJS:@"alert('hello')"];
```

###     3.2 Android/Java execute the JS script

```javascript
ConchJNI.RunJS("alert('hello world')");
```

