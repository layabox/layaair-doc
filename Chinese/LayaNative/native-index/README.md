
## LayaPlayer首页说明
LayaPlayer不是浏览器！
LayaPlayer不是浏览器！
LayaPlayer不是浏览器！
现在LayaPlayer是通过一个index.html来启动的，但是其实这样做只是为了方便，为了与浏览器统一。LayaPlayer并不是基于浏览器的，不是通过封装浏览器或者webkit之类的控件来执行html内容，LayaPlayer内部只是用js的正则表达式来简单解析这个html页面的内容，取出其中的配置和运行里面的脚本，由于html本身很复杂，而且我们的引擎也不需要html的渲染，所以LayaPlayer不打算兼容html，由此带来的问题是：  
1. LayaPlayer只关心html中的 `<meta>` 标签和， `<script>` 标签。其他标签都会被忽略。而`<meta>`标签现在只认包含`name='laya'`属性的，用来设置横竖屏和其他配置，例如:
    ```html
    <meta name='laya' screenorientation='landscape' >
    ```
2. script标签最好是src='xxx'的形式，因为内联形式的脚本比较复杂，无法用正则表达式解析，很可能会导致解析出错。
3. 其他的一切都不支持。所以依赖于DOM的jquery也不被支持。
4. 同理由于LayaPlayer也不是基于Node的，所以基于node的所有脚本也都不支持。

**提示:**  
LayaPlayer在运行的时候，如果遇到不支持的标签，会直接弹框报错。如图1  
![](img/1.png)  
图1


