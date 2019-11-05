##Actionscript 3.0 Server



Traditionally, AS3.0 can only be used as the client of paging, but with Laya giving it new vitality and the popularity of nodejs, the development of servers with JS becomes more and more fast and efficient. However, the system is becoming larger and larger, ES5 process-oriented writing has become more and more difficult to maintain. It is particularly important to develop with object-oriented language. Noejs development can be developed in three languages, AS, TS, JS. Each of the three languages has its own advantages and characteristics, and there is no distinction between good and bad. In my opinion, the development of nodejs is very suitable. Let's briefly introduce how to develop nodejs with AS. Here we take websocket to explain. This tutorial is based on the win system. Mac developers can correct the differences themselves in different places.



####Environment building

Of course, the installation of nodejs is indispensable to the development of nodejs. From official website[https://nodejs.org/en/](https://nodejs.org/en/)Download a stable version of nodejs. Then the basic way to install next will do. After installation, open CMD input`node -v`If the corresponding version information is displayed, the installation is successful. Details about nodejs are not covered here.

New project, here we choose the traditional Flash Builder to build a new Actionscript project. The project is named GameSever. The startup class here should be changed to the following format.


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