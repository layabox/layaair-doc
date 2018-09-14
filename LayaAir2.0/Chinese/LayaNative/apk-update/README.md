
# android-APK更新

LayaNative的Android模板工程中开放了apk自动更新的代码，开发者可以根据项目需求自行修改代码，也可以关闭或删除该代码。

**TIPS：看懂这篇文档，需要具备android的基本开发知识**

## 1、代码介绍

1、自动更新的代码路径在`src\main\java\layaair\autoupdateversion`,这个目录为apk自动更新的代码，如下图1所示:
![图1](img/1.jpg)   

2、在MainActivity.java中的onCreate函数，会先调用checkApkUpdate，如果没有更新或者更新完成后，再回调到initEngine函数,如果开发者不想要apkUpdate功能，可以删除该函数，直接调用initEngine即可。

```java
protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().requestFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        /*
         * 如果不想使用更新流程，可以屏蔽checkApkUpdate函数，直接打开initEngine函数
         */
        checkApkUpdate(this);
        //initEngine();
    }
```

## 2、apk更新流程

更新代码流程如下：
1、程序启动后先通过读取config.ini，读取`IsHandleUpdateAPK`这个变量，如果值为0，代表不自己处理更新流程，直接启动游戏。如果值为1，则继续checkUpdate流程。  
2、继续读取config.ini，读取`ApkUpdateUrl`，这是一个xml文件，这个xml文件中记录了最新的版本号，以及最新版本的apk的地址。  
3、如果本地apk版本号小于线上的版本号，则提示是否更新最新版本，用户可以选择是或者否。  
4、如果选择“是”，程序会在外网下载最新的版本的apk，进行更新安装。  
5、如果选择“否”，则直接进入游戏。

**TIPS：如果开发者想要强制更新，选择“否”直接退出游戏，请自行debug原代码，并根据自己需求修改**

## 3、如何配置自动更新

1、在assets目录下打开config.ini,内容如下所示：
```
IsHandleUpdateAPK=0
ApkUpdateUrl=http://www.layabox.com/LayaNative/apk/update/conch-layaair/version.xml
UpdateDownloadPath=mnt/sdcard
UpdateAPKFileName=autoupdate.apk
CheckNetwork=1
```
设置`IsHandleUpdateAPK=1`  
将version.xml文件配置到自己的服务器上，并配置`ApkUpdateUrl`为正确路径。  

2、配置version.xml文件，内容如下所示：
```
<update>
  <versionCode>13</versionCode>
  <name>LayaBox</name>
  <version>2.0.0</version>
  <url>http://www.layabox.com/LayaNative/apk/update/conch-layaair/AutoUpdate_2.0.0.apk</url>
</update>
```
versionCode：是当前的版本号，类型为int类型  
name：应用名称  
version：版本号信息，类型为字符串  
url:apk的下载地址 **【注意：此行代码不允许有空格或回车】**   

3、正确设置你自己工程中的manifest.xml或者build.gradle中的versioncode,如下所示：
```
defaultConfig {
        applicationId "com.example.layaboxsdk_demo"
        minSdkVersion 9
        targetSdkVersion 22
        versionCode 1
        versionName "1.0"
    }
```

## 4、注意事项

1、更新下来的apk包，覆盖原有apk包，需要两个apk的包名和签名必须一致。  
2、apk的update功能并不属于LayaNative引擎的核心功能，此部分代码也是开放的，开发者可以根据自己的需求自行修改，如出现bug，LayaBox公司不负责查找问题。