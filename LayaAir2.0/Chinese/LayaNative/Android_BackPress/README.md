

# 接管android的后退按钮
在LayaNative中可以使用这两个函数， conch.setOnBackPressedFunction(onBack) 和conch.exit(), 接管按下“后退键”的处理方式。接管setOnBackPressedFunction后，当用户按下后退键时便会执行此函数。

一旦调用了这个函数，就屏蔽了引擎中默认按下两次退出的功能，这时候，如果想要退出应用的话，可以通过调用exit()函数来实现。


**Tips**  
*1、conch只能LayaNative环境下调用，在网页版本中是没有conch定义的，所以需要判断一下是否存在。*  
*2、如果使用as语言开发的时候，可以通过 Browser.window['conch']这种方式获得conch对象。*  
*3、LayaNative只有Android版有这两个函数。*  


js示例如下：  
```javascript
var n=3;
if(window.conch){
    window.conch.setOnBackPressedFunction(()=>{
        console.log('press back '+n);
        if(n-- <=0){
            window.conch.exit();
        }
        else{
            //用户自己的代码，例如返回上层页面
        }
    });
}
```