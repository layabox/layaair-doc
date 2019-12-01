#Mise au point secondaire au moyen d 'un mécanisme de réflexion

Layanative aide le developpeur en mettant en place un mécanisme de réflexion pour faciliter le deuxieme developpement.

##Réalisation des réflexes

Au moyen de layanative, une classe ou une fonction peut être créée dans la couche JavaScript par le biais d 'un langage de développement original (Java sous Android, objective - C sous iOS) d' un terminal mobile par l 'intermédiaire d' une chaîne de caractères.

Les réflexes de layanative sont principalement utilisés par platformclass et platformobj ci - dessous.


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


(Tips: pour le moment, tous les paramètres ne couvrent que les types ordinaires: nombres, chaînes de caractères, bool; au niveau oc: nombre et bool correspondant au nsnumber, chaîne de caractères correspondant au nsstring)



##Utilisation de réflexes

On trouvera ci - après deux exemples de la manière dont le mécanisme de réflexion est utilisé pour le développement secondaire.

###2.1 allumage / désactivation d 'un flash au moyen d' une fonction statique

**Exemples de fonctions:**

####2.1.1 couche javascript:

Pour la plate - forme Android:

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


Pour la plate - forme IOS:

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


####2.1.2 Catégories devant être créées pour les déclarations au niveau Android / java:


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


####2.1.3 modification de manifest au niveau Android / java:


```java

<uses-permission android:name="android.permission.FLASHLIGHT" />
 
<uses-permission android:name="android.permission.CAMERA"/>
 
<uses-feature android:name="android.hardware.camera" />
 
<uses-feature android:name="android.hardware.autofocus"/>

```


####2.1.4 Catégories devant être créées au - dessus des déclarations de couche iOS / OC:


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

Si l'opération s'effondre, insérer Privacy - Camera usage description dans info.plist
![www](img/1.png)  

Note: le suffixe du fichier source doit être remplacé par.Appelle la fonction statique pour noter la calligraphie du script.La méthode oc consiste à utiliser +.
Si l 'oc doit renvoyer un paramètre à un script ou à un script de notification, il faut appeler Callback tojswithclass ou callbacktojswithclassname.
Remplacer le texte du script par le texte suivant: "(Function (MSG) {Alert (MSG);", "openlight:", a) ";

####Les étapes ci - dessus permettent d 'obtenir la fonction d' un clic impair pour allumer le flash et d 'un clic pair pour éteindre le flash.



###2.2 addition et soustraction simples par fonction d 'objet d' appel

**Exemples:**

####2.2.1 couche javascript:

(Note: la valeur de retour de la fonction de support de la plate - forme Android peut également être obtenue par la régression, et la plate - forme iOS ne prend en charge que la valeur de retour par la régression.

Pour la plate - forme Android:


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


Pour la plate - forme IOS:


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


####2.2.2 Catégories devant être créées pour les déclarations au niveau Android / java:


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


####2.2.3 Catégories devant être créées pour les déclarations de couche iOS / OC:


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

Note: le suffixe du fichier source doit être remplacé par.Notez l 'écriture du script à l' aide d 'exemples.La méthode oc est un exemple de méthode à utiliser -Rappelez - vous.
Une simple addition et soustraction est effectuée par les étapes ci - dessus.

En outre, layanative a encapsulé la classe globale de conchmarket afin d 'aider le développeur à gagner plus de temps, ce qui lui permet d' accéder plus facilement aux canaux d 'accès.


##Mise en œuvre active des scripts JS par le Code de la plate - forme Android / iOS

###3.1 Mise en œuvre des scripts JS de l'IOS / OC


```javascript

[[conchRuntime GetIOSConchRuntime] runJS:@"alert('hello')"];
```


###3.2 exécution du script JS par Android / java


```javascript

ConchJNI.RunJS("alert('hello world')");
```


