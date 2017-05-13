## http劫持的保护
这里所说的http劫持是指网络服务提供商或者某一级路由设备通过dns劫持或者http劫持的方法，修改用户请求的结果，从而实现在页面中插入广告的行为。  
由于http劫持，用户获取的html数据会被动态修改，例如请求页面被插入一个`<script>`标签，来执行一段广告代码，这些代码通常都无法在LayaPlayer中执行，会导致app刚启动就弹框报错。  
对于这个问题，除了向ISP投诉以外，一个解决方法是在script标签中加特殊属性，这样就能与被插入的script标签区别开。  
*用法示例：*   
```html
<meta name='laya' layajsprotect='true' >

<script src='main.js' loader='laya' ></script>
```
`layajsprotect='true'` 表示打开这个保护。  
`loader='laya'` 表示这个是自己的js，可以执行。