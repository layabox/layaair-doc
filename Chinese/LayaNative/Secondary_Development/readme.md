# 用反射机制实现二次开发

　　LayaNative通过提供反射机制来帮助开发者可以方便的进行二次开发, 下面通过反射机制的实现及使用来了解一下如何进行二次开发.

## 1. 实现反射

　　使用LayaNative, 可以在JavaScript层通过字符串动态创建移动端的原生开发语言(Android下Java, iOS下Objective-C)编写的类或函数.

LayaNative的反射主要通过下面的PlatformClass和PlatformObj来使用.

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

(Tips: 所有参数目前只支持普通类型: 数字, 字符串, bool; 在OC层: 数字和bool对应NSNumber, 字符串对应NSString)



## 2. 使用反射

  下面通过两个简单的示例来了解一下如何使用反射机制进行二次开发.

###   2.1 通过调用静态函数 实现闪光灯的打开/关闭

**功能示例:**

####     2.1.1 JavaScript层:

对Android平台的调用方式: 
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

对iOS平台的调用方式:
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

####     2.1.2 Android/Java层声明需要创建的类Test:

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

####     2.1.3 Android/Java层 修改Manifest:

```java
<uses-permission android:name="android.permission.FLASHLIGHT" />
 
<uses-permission android:name="android.permission.CAMERA"/>
 
<uses-feature android:name="android.hardware.camera" />
 
<uses-feature android:name="android.hardware.autofocus"/>

```

####     2.1.4 iOS/OC层声明上面需要创建的类Test:

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
如果运行崩溃在Info.plist中加入Privacy - Camera Usage Description  
![www](img/1.png)  
注意：源文件后缀要改成.mm 。调用静态函数注意脚本的调用写法。OC的方法是静态的类方法要用+。
如果OC需要返回参数给脚本或者通知脚本，需要调用callbackToJSWithClass或者callbackToJSWithClassName
脚本要改为Test.callWithBack(function(msg){alert(msg);},"openlight:",a);

####      通过上述步骤就实现了 奇数下点击一下打开闪光灯, 偶数下点击关闭闪光灯 的功能.



###   2.2 通过调用对象的函数实现简单的加法减法

**示例:**

####     2.2.1 JavaScript层:

​      (注: Android平台支持函数返回值也可以通过回调获取返回值, iOS平台只支持通过回调获取返回值.)

​      对Android平台的调用方式: 

```javascript
//a、创建Test类
var Test=Laya.PlatformClass.createClass("com.layabox.test.Test");
 
//b、创建Test对象
var testAdd=Test.newObject("+");
var testMinus=Test.newObject("-");
 
//c、调用成员函数
testAdd.callWithBack(function(n){ alert("2+3="+n); },"operator",2,3);
var n=testMinus.call("operator",2,3); // Android 才可以直接返回
alert("2-3="+n);
```

​      对iOS平台的调用方式:

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

####     2.2.2 Android/Java层声明需要创建的类Test:

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

####     2.2.3 iOS/OC层声明需要创建的类Test:

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
注意：源文件后缀要改成.mm 。调用实例方法注意脚本的调用写法。OC的方法是实例方法要用-。回调要用  callbackToJSWithObject。
​    通过上述步骤就完成了简单的加法减法。

  通过上述方法可以很方便的进行原生代码相关的二次开发, 此外, LayaNative为了帮助开发者节省更多的时间, 封装了conchMarket全局类, 让开发者可以更方便的对接渠道。


##  3.平台代码（android/ios）主动执行js脚本

###     3.1 IOS/OC执行JS脚本

```javascript
[[conchRuntime GetIOSConchRuntime] runJS:@"alert('hello')"];
```

###     3.2 Android/Java执行JS脚本

```javascript
ConchJNI.RunJS("alert('hello world')");
```

**附录:**

[二次开发demo for Eclipse(Android) 示例下载](http://ldc.layabox.com/download/tools/SampleForEclipse.zip)

[二次开发demo for AndroidStudio(Android) 示例下载](http://ldc.layabox.com/download/tools/SampleForAndroidStudio.zip)