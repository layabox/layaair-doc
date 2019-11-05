@- 1,271 + 0 @@

#layair-cmd

[TOC]

**layair-cmd**예**layair**명령 줄 도구 사용 가능**layair-cmd**열리지 않음**IDE**상황 하에**layair**프로젝트 번역 발표 등의 조작을 진행하다.이 기능은 다음과 같은 기능을 포함하고, 이 기능은 모두 한 개의 명령에 대응한다.

124대 기능
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
124대 번역
124대 발표
124사 내보내기 UI
리소스 컨트롤
guetzli 를 사용하여 jpg 압축
정적 파일 서버 열기



##설치하다


```shell

$ npm install layaair-cmd -g
```




##클리

**layair-cmd**명령 유사**git**명령, 그 형식은:


```shell

$ layaair-cmd [command] [args]
```


편집 항목:


```shell

$ layaair-cmd compile
```


도움말 정보 보기:


```shell

$ layaair-cmd --help
```


뿐만 아니라**layair-cmd**그 자체, 모든 하위 명령은 버전 정보와 도움말 메시지, 하위 명령 도움말 보기:


```shell

$ layaair-cmd command -h
```


**layair-cmd**대부분의 하위 명령은 현재 작업 디렉토리 아래 포함되어 있습니다**layair**항목, 소수 명령은 수동적으로 입력 디렉토리를 지정할 수 있습니다.`guetzl`,`atlas`명령은 바로 직접적으로 할 수 있다`$ layaair-cmd atlas`디렉토리를 지정할 수도 있습니다.



##컴파일러


```shell

$ layaair-cmd compile -h

  Usage: layaair-cmd compile [options]

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```


하면, 만약, 만약...**layair**프로젝트, 이 명령은 번역 후 생성될 것이다**자바스크립트**서류.컴파일러리**Action Script**과**Typescript**하면, 만약, 만약...**자바스크립트**아무것도 하지 않는다.

####사용하다


```shell

$ layaair-cmd compile
```




##발포


```shell

$ layaair-cmd publish -h

  Usage: layaair-cmd publish [options]

  Options:

    -V, --version                   output the version number
    -o --compressOptions <options>  压缩选项。留空不处理，'c'表示压缩，'cc'表示压缩并合并
    -n --versionName <name>         version name
    --noCompile                     不重新编译项目
    --noUi                          不重新生成UI代码文件
    --noAtlas                       不重新生成图集
    -h, --help                      output usage information
```


하면, 만약, 만약...**layair**프로젝트, 이 명령은 발표 후 생성될 것이다**자바스크립트**파일, 배포된 폴더는 * release * 아래에 있습니다.

####사용하다


```shell

$ layaair-cmd publish -o cc # 指定了压缩选项为合并并压缩
```


##내보내기 UI


```shell

$ layaair-cmd ui -h

  Usage: layaair-cmd ui [options]

  Options:

    -V, --version     output the version number
    -c --clear        clear will delete old ui code file.
    -a --atlas        generate atlas
    -d --code         generate ui code files
    -m --mode <mode>  'normal'或者'release'，指定'release'会生成除未使用资源外的UI代码文件
    -h, --help        output usage information
```


하면, 만약, 만약...**layair**항목은 UI 페이지와 UI 관련 파일을 내보내기 명령입니다.

####사용하다


```shell

$ layaair-cmd ui -c -m release # 导出前清理，并且把mode设置为release
$ layaair-cmd ui -d # 导出UI代码文件
$ layaair-cmd ui -a # 导出图集文件
```




##자원 버전 제어

**자원 버전 제어**자원 생성 버전에 사용합니다.버전 번호 기본값은 숫자 1,000부터 증가, 만약 전입되면`--versionName`인자, 사용자가 지정한 버전 이름을 사용합니다.다음 버전 건립할 때 다시 지정하지 않으면`--name`버전은 1002 버전으로 생성될 때마다**자원 버전 제어**내부 버전 카운터 모두 늘어난다.

버전을 수립할 때, 지난번 버전에 대한 수정된 파일이나 새로 추가된 파일은 새 버전에 기록된다.신규 파일이 없거나 파일을 수정하지 않으면 새 버전이 생성되지 않습니다.

> 최종적으로 자원을 사용할 때 상위 상대 경로를 사용할 수 없습니다. 즉 경로에 '."


```shell

$ layaair-cmd resourceVersion -h

  Usage: layaair-cmd resourceVersion [options]

  Options:

    -h, --help                       output usage information
    -V, --version                    output the version number
    -i --input <input>               资源目录
    -o --output <output>             导出目录
    -n --versionName <version name>  版本名称，默认是从1000开始递增的数字
```


이 명령은 현재 디렉토리 포함이 필요 없습니다**layair**항목, 대신 디렉토리를 지정해야 합니다.



####사용하다


```shell

$ layaair-cmd resourceVersion -i input_dir -o output_dir -n 1.1.0
# 指定了输入目录、输出目录和版本名称
```




####생성 파일

>1000
>>
>> resourcess...
>>
> 1001
>>
>> resourcess...
>>
> 1002
>>
>> resourcess...
>>
>>record
>>
> manifest.json



####자원 버전

*1000 * * * 1001 * * * 1002 * 폴더는 기본 자원 버전 이름으로 저장된 소스를 저장합니다.*manifest.json*에서 얻은 모든 자원의 최신 버전 번호에 따라 * manifest.json*에 대한 버전 자원을 읽습니다.



####레코드 파일

*.record*에 있습니다**Unix-like**시스템 중 숨은 파일입니다.이 파일은 최근 버전을 보존하고 정보를 건립하고,**자원 버전 제어**새로운 버전을 세울 때 어떤 파일이 수정되었는지 판정합니다.이 파일을 삭제할 수 없습니다. 만약 이 파일이 잃어버리면 기존 버전이 분실되어 다시 버전을 만들기 시작하는 것과 같습니다.



####manifest.json 자원 목록

사용자는 *manifest.json*에 따라 최신 자원을 얻습니다.이 파일은 자원 키를 포함합니다:


```json

{
    "res1": "1000",
    "res2": "1000",
    "res3": "1002",
    "sub\\res3": "1000",
    "sub\\res4": "1000"
}
```


사용자는 이 맵에서 자원 대응 버전 번호를 가져온 후 사용합니다`资源根目录/版本号/相对文件路径`자원의 url 을 얻고 사용합니다.



####자원 버전 전환

*manifest.json*버전 번호를 저장하기 때문입니다.그래서 역사 *manifest.json*을 보류할 수 있습니다.


##guetzli

**guetzli**예**google**기원**jpeg**인코더.그것에 대한 소개, 주의사항 등 공식 https://github.com/google/guetzli 를 참고합니다.

**guetzli**압축 과정은 느리고 자원을 점용할 수 있기 때문에 시간을 기다려야 한다.

가장 좋다**자원 버전 제어**생성된 폴더에서 사용하기**guetzli**압축, 이것은 다시 압축도를 반복하지 않을 것을 보장할 수 있다.


```shell

$ layaair-cmd guetzli -h

  Usage: layaair-cmd guetzli [options]

  Options:

    -h, --help              output usage information
    -V, --version           output the version number
    -i --input <input>      resource directory.
    -q --quality <quality>  quality, more than 84.
```


이 명령은 현재 디렉토리 포함이 필요 없습니다**layair**항목, 대신 디렉토리를 지정해야 합니다.압축이 성공한 후 원본 파일이 수정됩니다.압축 실패는 원본 파일이 변함없이 유지됩니다.

####사용하다


```shell

$ layaair-cmd guetzli -i input_dir -q 95
# 指定了压缩率95
```




##정적 파일 서버 열기


```shell

$ layaair-cmd open -h

  Usage: layaair-cmd open [port] [args]

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
    -p <port>      resource directory.
    -s             don't open browser
```


이 명령은 재결합해야 한다**layair**항목은 같은 구조의 디렉토리에 사용된다.대하다**Action Script**프로젝트, 그것은 *. / bin/ h5 * 정적 파일 서버에서 열립니다**자바스크립트**과**Typescript**프로젝트**./bin**정적 파일 서버 열기