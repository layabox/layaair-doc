# android文件扩展机制
LayaPlayer-0.9.7 버전 이전에 엔진은 자원을 asets 디렉터리에 포장해야 합니다.LayaPlayer-0.9.7 이후 버전으로 자원을 zip 파일로 포장하는 것을 지원하여 임의의 파일 경로로 내보내는 것을 지원합니다.LayaPlayer 파일 시스템은 먼저 asets 디렉토리에서 파일이 존재하는지 확인하고 지정한 zip 경로를 찾을 수 있습니다.이런 지프 메커니즘을 통해 googlePlayer 규정된 APK 의 size 가 100MB를 넘어 확장을 요구하는 문제를 해결할 수 있다.

##1. 메커니즘 자세
###1. DCC 생성
test 프로젝트는 DCC 도구로 자원을 포장한다
![图1](img/1.png)    

###2. 압축 파일
자원 가방을 확장 파일에 올려 cache 파일 압축, 파일은 zip 형식을 요구하고, 파일 구조는 DCC 도구가 생성된 구조를 유지해야 합니다. 다음과 같습니다:
![图1](img/2.png)  

###3. zip 파일을 장치 디렉터리에 복사
Android 휴대전화에 디렉토리를 건립하고 / storage/ emulated/0/Android/test/com.layabox.conch5, test.zip 이 디렉터리에 올립니다
###4. 코드 확장 경로 수정
RuntimeProxy.java 중`getExpansionMainPath`함수, 정확한 zip 경로를 설정합니다.

```

    public String getExpansionMainPath()
    {
        return "/storage/emulated/0/Android/test/com.layabox.conch5/test.zip";
    }
    public String getExpansionPatchPath()
    {
        return "";
    } 
```

###5. 외부 기억 권한을 열고
안탁의 6.0 이상의 기계는 외부 메모리를 읽을 수 없을 것이며 주동적 요청 권한이 필요하다.다음 코드나 Google 관련 해결 방안을 추가해 주세요.

```

    public static boolean isGrantExternalRW(Activity activity) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && activity.checkSelfPermission(
                Manifest.permission.WRITE_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED) {
            activity.requestPermissions(new String[]{
                    Manifest.permission.READ_EXTERNAL_STORAGE,
                    Manifest.permission.WRITE_EXTERNAL_STORAGE
            }, 1);
            return false;
        }
        return true;
    }
```

**TIPS:LayaPlayer 중 가장 많은 지지를 받았고 두 번째 zip 수정·getExpansion PatchPath·이 함수**

###5. 시험 실행
APP 실행, 다음 로그 설명은 주 확장 패키지로 자원 파일을 읽는 데 성공했습니다
![图1](img/3.png)  

##2. Google Play APK 확장 파일 메커니즘
(https://developer.android.com/google/play/expansion-files.html)
