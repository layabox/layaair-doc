#androidの後退ボタンを引き継ぎます。
LayaNativeではこの2つの関数を使用して、conch.set OnBackPresedFunctionとconch.exit()を押して、「後退キー」を押す処理を引き継ぐことができます。set OnBackPresedFunctionを引き継ぎ、ユーザーが後退ボタンを押すとこの関数が実行されます。

この関数を呼出したら、デフォルトで2回押して終了する機能を遮断します。この場合、アプリケーションを終了するには、exit（）関数を呼び出すことで実現できます。


**Tips**  
*1、conchはLayaNative環境でしか呼び出しができません。ウェブページのバージョンにはconchの定義がないので、存在するかどうかを判断する必要があります。＊
*2、as言語を使って開発する場合は、Browser.window['conch']という方式でconchオブジェクトを獲得することができます。＊
*3、LayaNativeはAndroid版だけこの二つの関数があります。＊


jsの例は以下の通りです

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
