#反射機構で二次開発を実現

LayaNativeは反射機構を提供することによって開発者が便利に二次開発を行うことができます。次に反射機構の実現と使用によって、二次開発の方法を調べてみます。

##1.反射を実現する

LayaNativeを使用して、JavaScript層で文字列動的にモバイル端末の原生開発言語（AndroidでJava、iOSでObjective-C）を作成することができます。

LayaNativeの反射は主に以下のPlatformClassとPlatformObjによって使います。


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


（Tips：すべてのパラメータは現在普通のタイプしかサポートされていません。数字、文字列、book。OC層では、デジタルとbookはNSNumberに対応し、文字列はNSStringに対応します。）



##2.反射を使う

以下では二つの簡単な例を通して、反射機構を用いた二次開発の方法を調べてみよう。

###2.1静的関数を呼び出してフラッシュのオン／オフを実現する

**機能例:**

####2.1.1 JavaScript層：

Androidプラットフォームへの呼び出し方法：

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


iOSプラットフォームへの呼び出し方式：

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


####2.1.2 Android/Java層声明は、クラスTestを作成する必要がある：


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


####2.1.3 Android/Java層修正Manifest：


```java

<uses-permission android:name="android.permission.FLASHLIGHT" />
 
<uses-permission android:name="android.permission.CAMERA"/>
 
<uses-feature android:name="android.hardware.camera" />
 
<uses-feature android:name="android.hardware.autofocus"/>

```


####2.1.4 iOS/OC層声明上で作成するクラスTest:


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

運行が崩壊したらInfo.plistにPrivacy-Camera Usage Descriptionを入れます。
![www](img/1.png)  

注意：ソースファイルの拡張子を.mmに変更します。静的関数の呼び出しは、スクリプトの呼び出しの書き方に注意します。OCの方法は静的な種類の方法で＋を使います。
OCがパラメータを返してスクリプトまたはスクリプトに通知する必要がある場合は、コールバックToJSWECTH ClassまたはcalbackToJSWith Class Nameを呼び出す必要があります。
脚本はTest.call WithBack（function（msg）｛alert（msg）｝に変更します。

####上記の手順により、奇数でフラッシュを点灯し、偶数でフラッシュをオフにする機能を実現しました。



###2.2オブジェクトの関数を呼び出して簡単な足し算減算を行う

**例:**

####2.2.1 JavaScript層：

（注：Androidプラットフォームのサポート関数の戻り値は、コールバックにより戻り値を取得することもできます。iOSプラットフォームは、コールバックによる戻り値のみを取得することができます。）

Androidプラットフォームへの呼び出し方法：


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


iOSプラットフォームへの呼び出し方式：


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


####2.2.2 Android/Java層宣言は、作成するクラスTestを必要とする：


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


####2.2.3 iOS/OC層宣言作成が必要な類Test：


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

注意：ソースファイルの拡張子を.mmに変更します。例のメソッドを呼び出します。スクリプトの呼び出しの書き方に注意してください。OCの方法は、例示的な方法を使用することである。コールバックToJSWEThObjectを使います。
上記の手順で簡単な足し算減算ができました。

上記の方法により、元のコードに関する二次開発が容易にできます。また、LayaNativeは開発者のためにより多くの時間を節約するために、conchMarketグローバルクラスをカプセル化して、開発者により便利なドッキングチャネルを提供します。


##3.プラットフォームコード（android/ios）自主的にjsスクリプトを実行する

###3.1 IOS/OCはJSスクリプトを実行する


```javascript

[[conchRuntime GetIOSConchRuntime] runJS:@"alert('hello')"];
```


###3.2 Android/JavaがJSスクリプトを実行する


```javascript

ConchJNI.RunJS("alert('hello world')");
```


