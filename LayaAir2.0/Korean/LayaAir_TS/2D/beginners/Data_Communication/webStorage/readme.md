#웹 Stoorage 데이터 저장

HTML5 는 클라이언트 데이터를 저장하는 새 방법을 제공합니다:

**localstorage-시간 제한 없는 데이터 메모리**

**sessionstorage-session 에 대한 데이터 메모리**

sessionStoorage 안에 저장된 데이터는 브라우저 세션 (browsing sessssion) 이 끝나면 브라우저가 닫혀요.

그동안 쿠키로 완성된 것이다.그러나 쿠키의 크기는 4k에 제한되어 대량의 데이터의 저장에 적합하지 않으며, 모든 서버에 대한 요청이 전달돼 쿠키 속도가 느리고 효율도 높지 않다.쿠키의 역할은 서버와 교차하며 HTTP 규범의 일부로 존재하고 있으며 웹 스토어ge는 단지 로컬 저장된 데이터를 위한 것이다.

HTML5 에서 데이터는 서버마다 전달하는 것이 아니라 요청할 때만 데이터를 사용합니다.그것은 사이트의 성능에 영향을 주지 않는 상황에서 대량의 데이터를 저장할 수 있게 했다.

다른 사이트에 대한 데이터는 다른 영역에 저장되어 있고, 한 사이트는 자신의 데이터를 방문할 수 밖에 없다.이 때문에 로컬 데이터의 메모리는 LocalStoorage를 사용할 수 있습니다.Layaiair 엔진은 LocalStoorage에 대한 간단한 재킷을 진행했고, 대응하는 종류는 LocalStoorage다.다음은 간단한 예를 통해 그것을 어떻게 사용하는지 살펴본다.


```java

// 程序入口
class LayaSample{
    constructor()
    {
        Laya.init(100,100);
        Laya.LocalStorage.setItem("key","hello");
        var data:any = {"index":0,"index1":1};
        var str:string = JSON.stringify(data);
        Laya.LocalStorage.setItem("data","hello");
        Laya.LocalStorage.setItem("item",str);
    }
}
new LayaSample();
```


Crome 에서 실행 후 단축키 F12를 누르면 다음 그림에 표시됩니다:

![1](img/1.png)< br >>

사진에서 저희가 아까 데이터를 다 저장해 놨어요.

다음과 같이 Google은 이 데이터를 제거합니다.


```java

Laya.LocalStorage.setItem("key","hello");
var data:any = {"index":0,"index1":1};
var str:string = JSON.stringify(data);
Laya.LocalStorage.setItem("data","hello");
Laya.LocalStorage.setItem("item",str);
Laya.LocalStorage.removeItem("data");//清除数据
```


코드 러콜스토어.removeItem('data')를 추가하여 키를 data 의 데이터를 비우고 컴파일을 실행한 후 data 데이터를 발견할 수 없습니다.그림 아래에 제시한 것처럼:

![2](img/2.png)<br/>


Google은 모든 데이터를 다 지워야 한다면, 기존 코드를 마지막으로 추가하면 됩니다.


```java

Laya.LocalStorage.clear();
```


컴파일을 시작하면 이전 도메인 이름에 저장된 모든 데이터가 사라졌다. 그림 아래에 제시한 것처럼:

![3](img/3.png)< br >>

sessionstorage는 Layair 엔진에서 잠시 봉장을 하지 않았지만 그대로 사용할 수 있다.레이어에서 세션 스토어를 어떻게 사용할지 보여드릴게요.다음 이 예는 페이지 카운터입니다. 현재 세션에서 페이지를 방문하는 횟수:

LayairIDE를 열 때 빈 항목을 생성합니다.구체적인 코드 다음과 같습니다:


```java

// 程序入口
class LayaSample{
    constructor()
    {
        Laya.init(100,100);
        var sessionStorage:any = Laya.Browser.window.sessionStorage;
        if(sessionStorage.pagecount){
            sessionStorage.pagecount = parseInt(sessionStorage.pagecount)+1;
        }
        else{
            sessionStorage.pagecount = 1;
        }
        console.log(sessionStorage.pagecount);
        
    }
}
new LayaSample();
```


var sessionstorage:any = Laya.Browser.window.sesssionstorage; 이 말은 현재 페이지의 sesssionstorage 세션 대상을 얻는다는 뜻이다.



현재 세션 대상이 패키count 속성이 존재하는지 판단하는 논리입니다. 존재가 1로 열리는 것은 이미 열려 있는 것이고, 누가된 것입니다.그리고 출력 누적 횟수.이 파일을 번역한 후 구글로 운행하고 F12 는 컨트롤 콘솔을 열고 출력을 발견한 것은 1, 그리고 우리는 끊임없이 새 페이지에 출력하는 횟수가 늘어나고 있다.그리고 우리는 구글 브라우저를 닫고 이 페이지를 다시 열 때 출력은 또 1이고, 페이지 경신 횟수가 또 누적되었다.이로써 세션 스토어는 세션 레벨의 메모리 대상이다.브라우저를 닫으면 사라진다.