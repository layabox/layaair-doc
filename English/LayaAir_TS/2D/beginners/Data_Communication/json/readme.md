# JSON数据详解

### 一、什么是JSON？

JSON（JavaScript Object Notation）指的是JavaScript对象表示法，是一种轻量级的数据交换格式。它基于ECMAScript的一个子集。JSON使用JavaScript语法来描述数据对象，但是JSON仍然独立于语言和平台。JSON解析器和JSON库支持许多种不同的编程语言。目前非常多的动态（PHP,JSP,.ENT）变成语言都支持JSON。它易于人阅读和编写，同时也易于机器解析和生成（一般用于提升网络传输速率）。



### 二、JSON语法规则

JSON语法是JavaScript对象表示法语法的子集。

- 数据在名称/值对中
- 数据由逗号分隔
- 花括号保存对象
- 方括号保存数组



### 三、JSON名称/值对

JSON数据的书写格式是：名称/值对。

名称/值对包括字段名称(在双引号中)，后面写一个冒号，然后是值：

“name”：“LayaAir教程”；

这个很容易理解，等同于这条JavaScript语句：

name=“LayaAir教程”；



### 四、JSON的值

JSON的值可以是：

- 数字（整数或浮点数）
- 字符串（在双引号中）
- 逻辑值（true或false）
- 数组（在方括号中）
- 对象（在花括号中）
- null



### 五、JSON对象

JSON对象在花括号中书写：

对象可以包含多个名称/值对：

{"name":"LayaAir教程","url":"http://layabox.com/"}

这一点也容易理解，等同于这句JavaScript语句：

name="LayaAir教程" url="http://layabox.com/"



### 六、JSON文件

- JSON文本的文件类型是".json"
- JSON文本的MIME类型是"application/json"



### 七、JSON的优势

- 基于纯文本，跨平台传递极其简单；
- JavaScript原生支持，后台语言几乎全部支持；
- 轻量级数据格式，占用字符数量极少，特别适合互联网的传递；
- 可读性较强，虽然比不上XML那么一目了然，但在合理的依次缩进之后还是很容易识别的；
- 容易编写和解析，当然前提是你要知道数据结构；

PS:说到这里可能会联想到XML。XML和JSON的大战犹如一场辩论，各说各的道理，既然是辩论，终究需要自己保持立场。但是就个人而言，更倾向于使用JSON，网络传输中JSON也有巨大的优势，而且在H5时代各个浏览器对XML的支持度和兼容性还有待考量，解析的效率更是千差万别，对于游戏开发者来说，JSON足够使用。



### 八、LayaAir与JSON

LayaAir引擎几乎离不开JSON，包括图集打包储存的格式，资源的加载，编辑器组件的描述，类的导出，语言包的支持等。