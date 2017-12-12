
# android-APK update

LayaPlayer-0.9.7 or later,  android template project is open apk automatic update code，Developers can modify the code according to project needs. You can also close or delete the code.

**TIPS：Understand this document, you need to have the basic android development knowledge of Android**

## 1. Code introduction

1. Automatically updated code path at `src\main\java\layaair\autoupdateversion`, directory is APK automatically updated code. As shown in Figure 1 below :
![图1](img/1.jpg)   

2. The onCreate function in MainActivity.java calls checkApkUpdate first，If there is no update or update is complete, then call back initEngine function, if developers do not want apkUpdate function, you can delete the function. Call initEngine directly.

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

## 2. apk update process

Update code process is as follows:
1. After the program starts by reading config.ini, read `IsHandleUpdateAPK` variable, if the value is 0, does not process the update process by itself, and starts the game directly。If the value is 1, continue the checkUpdate process.
2. Continue reading config.ini, and read `ApkUpdateUrl`. This is a XML file, latest version number is recorded in this XML file，And the latest version of the APK address.  
3. If the local APK version number is smaller than the online version number，Is prompted to update the latest version. The user can choose yes or no.
4. If you choose "Yes", the program will download the latest version of apk in the external network to update the installation.  
5、If you choose "No", go directly into the game.

**TIPS：If the developer wants to force the update, select  "no" directly to exit the game, please debug the original code, and modify according to their needs**

## 3. How to configure automatic update

1、在assets目录下打开config.ini,内容如下所示：
```
IsHandleUpdateAPK=0
ApkUpdateUrl=http://www.layabox.com/layaplayer/apk/update/conch-layaair/version.xml
UpdateDownloadPath=mnt/sdcard
UpdateAPKFileName=autoupdate.apk
AppVersion=0.9.6
CheckNetwork=1
```
设置`IsHandleUpdateAPK=1`  
将version.xml文件配置到自己的服务器上，并配置`ApkUpdateUrl`为正确路径。  

2、配置version.xml文件，内容如下所示：
```
<update>
    <versionCode>13</versionCode>
    <name>LayaBox</name>
    <version>0.9.6</version>
    <url>
        http://www.layabox.com/layaplayer/apk/update/conch-layaair/AutoUpdate_0.9.6.apk
    </url>
</update>
```
versionCode：是当前的版本号，类型为int类型  
name：应用名称  
version：版本号信息，类型为字符串  
url:apk的下载地址    

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
