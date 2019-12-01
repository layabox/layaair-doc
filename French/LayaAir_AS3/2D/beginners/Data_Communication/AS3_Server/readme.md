##Active script 3.0



Traditionnellement, l'as3.0 ne peut être qu'un client de défilé de pages, mais avec Laya, qui lui a donné une nouvelle vitalité et la popularité de nodejs, le développement de serveurs à l'aide de JS devient de plus en plus rapide et efficace.Cependant, le système devient de plus en plus vaste, et l 'expression es5 axée sur le processus devient de plus en plus difficile à gérer.Chacune des trois langues a ses avantages et ses caractéristiques, sans distinction de mérite ou de défauts.Pour l 'auteur, le développement de nodejs est tout à fait approprié.On trouvera ci - après une brève description de la manière dont les nodejs sont exploités avec les as.On va faire un exposé avec websocket.Ce cours est dans le système Win, les concepteurs de Mac peuvent corriger les différences entre eux.



####Environnement

Le développement de nodejs n 'est certainement pas sans l' installation de nodejs.De l 'Internet[https://nodejs.org/en/](https://nodejs.org/en/)Téléchargez la version stable de nodejs.Ensuite, il suffit de l 'installer sur la route suivante.Installation terminée. Entrée CMD ouverte.`node -v`L 'affichage des informations de mise en page correspondantes indique que l' installation a bien fonctionné.Des détails sur nodejs ne sont pas fournis ici.

Nouveau projet, où nous choisissons le projet traditionnel flashbuilder pour créer un nouveau projet ActionScript.Le projet s'appelle gamesever.La classe de démarrage doit être modifiée comme suit.


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