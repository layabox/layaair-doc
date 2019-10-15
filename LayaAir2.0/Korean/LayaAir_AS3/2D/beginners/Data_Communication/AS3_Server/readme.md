##Actionscript3.0 서버



전통적인 의미의 ASM3.0은 페이지 헤드헤드헤드헤드헤드헤드헤드헤드헤드헤드헤드헤드헤드헤드헤드헤드헤드헤드헤드헤드헤드헤드헤드헤드헤드헤드헤드헤드헤드헤드헤드헤드헤드헤드헤드헤드헤드헤드헤드헤드헤드헤드헤드헤드헤드헤드헤그러나 시스템이 점점 커지고 있다. ES5 가 과정을 향한 글은 점점 더 어려워지고, 상대를 향한 언어로 개발하는 것이 더욱 중요하다. 노dejs 개발은 3개 언어로 개발할 수 있다. AS, TS, JS.세 가지 언어는 각각 장점과 특징이 있고 우열을 가리지 않는다.필자 개발에 노dejs 모두 잘 어울려요.다음은 AS 로 No dejs 개발을 어떻게 하는지 간단하게 소개하겠습니다.여기에 우리는 웹소cket을 가지고 설명을 한다.이 교정은 모두 윈 시스템에 있으며, mac 개발자가 다른 곳에서 스스로 교정할 수 있다.



####환경 조립

nodejs 개발은 당연히 nodejs 설치가 빠질 수 없다.관공망[https://nodejs.org/en/](https://nodejs.org/en/)nodejs 안정 버전을 다운로드합니다.그리고 기본적으로 next 설치하면 됩니다.설치 완료, cmd 입력 열기`node -v`이 같은 버전 정보를 보여주면 설치 성공을 나타냅니다.nodejs 에 대한 자세한 정보는 여기에서 서술하지 않습니다.

새 프로젝트, 여기에서 전통적인 flashbuilder 새 Actionscript 항목을 선택합니다.프로젝트 이름 GameSever.이곳의 시작 종류는 아래와 같이 변경해야 한다.


```<code>[CODECONTENT]</code>
<p>

　　开发者可以发现这里的启动类是没有继承的，服务端运行不需要flash显示列表的东西，这里要去掉继承。</p>
<p>
　　网络模块的下载，node服务端的websocket模块需要用第三方模块，这里我们选用ws模块即可（模块开发者可换成自己熟悉的）。打开cmd ，cd进入项目的 *bin-debug/h5* 的目录,输入<code>[CODECONTENT]</code>回车。</p>

 <img src=

package
{
    public class GameSever
    {
        public function GameSever()
        {
            
        }
    }
}
```