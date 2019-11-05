#android-APK 업데이트

LayaPlayer-0.9.7 이후 버전, android 템플릿 프로젝트에서 apk 자동 갱신 코드를 개방하고 개발자는 프로젝트 수요에 따라 자체 수정 코드를 닫거나 삭제할 수 있다.

**TIPS: 이 문서를 알아볼 때 android 의 기본 개발 지식을 갖추어야 한다**

##1, 코드 소개

1, 자동 업데이트 코드 경로`src\main\java\layaair\autoupdateversion`이 디렉터리는 apk 자동 업데이트 코드, 다음 그림 1에 표시됩니다:
![图1](img/1.jpg)   


2, Mainactivity.java 의 onCreate 함수를 사용하여 checkApkupdate, 업데이트 또는 업데이트 완료가 없다면 initEngine 함수에 되돌려 개설자가 apkupdate 기능을 원하지 않으면 이 함수를 삭제할 수 있습니다.


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


##2, apk 업데이트 프로세스

코드 업데이트:
1, 프로그램 시작 후 config.ini 읽기`IsHandleUpdateAPK`이 변수는 0이면 자신의 업데이트 프로세스를 처리하지 않고 바로 게임을 시작하는 것이다.1이면 checkupdate 프로세스를 계속합니다.
2, 계속 config.ini, 읽기`ApkUpdateUrl`이것은 xml 파일입니다. 이 xml 파일에는 최신 버전 번호와 최신 버전의 apk 의 주소를 기록했습니다.
3. 로컬 apk 버전 번호가 온라인 버전 보다 작다면 최신 버전 업데이트 여부를 제시하면 사용자가 선택할 수 있습니다.
4. 만약 "예" 를 선택하면, 프로그램이 인터넷에서 최신 버전의 apk 을 다운로드하고 설치를 갱신합니다.
5. 만약'안'을 선택하면 바로 게임에 들어간다.

**TIPS: 개발자가 강제로 업데이트를 하려면 '부정' 을 선택하십시오. 직접 데스bug 원코드를 선택하십시오.**

##3. 자동 업데이트 어떻게 설정

1, asets 디렉토리 아래에서 config.ini 를 열면 다음과 같습니다:

```

IsHandleUpdateAPK=0
ApkUpdateUrl=http://www.layabox.com/layaplayer/apk/update/conch-layaair/version.xml
UpdateDownloadPath=mnt/sdcard
UpdateAPKFileName=autoupdate.apk
AppVersion=0.9.6
CheckNetwork=1
```

설치`IsHandleUpdateAPK=1`  
version.xml 파일을 서버에 설정하고 설정`ApkUpdateUrl`정확한 경로를 위하여.

2, version.xml 파일 설정, 내용은 다음과 같습니다:

```

<update>
  <versionCode>13</versionCode>
  <name>LayaBox</name>
  <version>0.9.6</version>
  <url>http://www.layabox.com/layaplayer/apk/update/conch-layaair/AutoUpdate_0.9.6.apk</url>
</update>
```

versionCode: 현재 버전 번호, 형식 int 형식
name: 응용 이름
version: 버전 정보, 형식 문자열
url:apk 다운로드 주소**[주의: 이 코드 는 빈 칸이나 회차 허용되지 않는다.]**   

3. 자신의 프로젝트에 있는 manifest.xml 또는 build.gradle 의 versioncode 를 정확히 설정합니다:

```

defaultConfig {
        applicationId "com.example.layaboxsdk_demo"
        minSdkVersion 9
        targetSdkVersion 22
        versionCode 1
        versionName "1.0"
    }
```


##4、주의사항

1, 업데이트된 apk 가방, 기존 apk 백팩을 덮어쓰기 위해서는 두 개의 apk 의 가방과 서명이 일치해야 합니다.
