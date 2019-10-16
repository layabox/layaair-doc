#반사 메커니즘으로 2차 개발을 실현하다

레이나티브는 반사 메커니즘을 통해 개발자를 편리하게 2차 개발할 수 있도록 돕고, 다음은 반사 메커니즘의 실현 및 사용을 통해 2차 개발을 진행할 수 있는지 알아본다.

##1. 반사 실현

LayaNative 사용하면 자바스크립트의 문자열 동태를 통해 모바일 모바일을 만드는 원생 개발 언어 (Android 아래에서 Java, iOS 아래에서 Objective-C) 작성한 종류나 함수.

LayaNative 의 반사는 주로 아래의 플래티포엠클라스와 플래티formObj를 통해 사용됩니다.


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


(Tips: 모든 인자가 일반 형식만 지원합니다: 숫자, 문자열, bool; OC 층: 숫자와 bool, NSNumber, 문자열 대응 NSSString)



##2. 반사 사용

다음은 두 개의 간단한 예시를 통해 반사체제를 어떻게 사용할지 알아보겠습니다.

###2.1 정적 함수를 통해 플래시 켜기 / 끄기

**기능 예제:**

####2.1.1 자바스크립트 층:

앤드로이드 플랫폼에 대한 호출 방식:

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


IOS 플랫폼에 대한 호출 방식:

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


####2.1.2 Android/자바 계열에서 만들어야 할 종류 Test:


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


####2.1.3 Android/자바 층 수정 마니fest:


```java

<uses-permission android:name="android.permission.FLASHLIGHT" />
 
<uses-permission android:name="android.permission.CAMERA"/>
 
<uses-feature android:name="android.hardware.camera" />
 
<uses-feature android:name="android.hardware.autofocus"/>

```


####2.1.4 iOS/OC 성명 위에 생성할 종류 Test:


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

만약 충돌이 실행되면 인fo.plist 에 Privacy - Camera Usage Description
![www](img/1.png)  

주의: 원본 파일 접미사가 mm 로 변경됩니다.정적 함수를 사용하여 스크립트의 호출법을 주의합니다.OC 의 방법은 정적인 방법으로 + 사용해야 한다.
OC 가 스크립트나 스크립트를 되돌려야 한다면 callbackToJSWithclas나 callbackToJSWithClassName
스크립트가 Test.call WithBack (function) {alert (msg);},,,, "openlight: a);

####이러한 절차를 통해 홀수 하에 플래시를 켜고, 우연히 플래시를 끄는 기능을 클릭했다.



###2.2 대상 의 함수 를 통해 간단한 가법 감법 을 실현 하다

**예시:**

####2.2.1 자바스크립트 층:

(주: Android 플랫폼 지원 함수 반환 값도 되돌아올 수 있고, iOS 플랫폼은 되돌아오는 값만 지원합니다.)

앤드로이드 플랫폼에 대한 호출 방식:


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


IOS 플랫폼에 대한 호출 방식:


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


####2.2.2. Android/자바 층 성명이 만들어야 할 종류 Test:


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


####2.2.3 iOS/OC 층 성명이 생성할 종류 Test:


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

주의: 원본 파일 접미사가 mm 로 변경됩니다.스크립트의 호출법을 유용합니다.OC 의 방법은 실례 방법으로 써야 한다. -.메아리는 카llbackToJSWithObject를 사용한다.
상술한 절차를 통해 간단한 가법 감법을 완성했다.

이 같은 방법으로 원생 코드 관련 2차 개발을 편리하게 할 수 있으며, 리야네이트는 개발자를 돕기 위해 더 많은 시간을 아끼기 위해 컨치마크 전국류를 봉쇄해 개발자를 더욱 편리하게 대합할 수 있다.


##3. 플랫폼 코드 (android / ios) 자발적으로 js 스크립트 실행

###3.1 IOS/OC JS 스크립트 실행


```javascript

[[conchRuntime GetIOSConchRuntime] runJS:@"alert('hello')"];
```


###3.2 앤드로이드/자바 집행 JS 스크립트


```javascript

ConchJNI.RunJS("alert('hello world')");
```


