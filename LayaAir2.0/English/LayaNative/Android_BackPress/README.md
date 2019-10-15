#Back button to take over Android
These two functions, conch. setOnBackPressedFunction (onBack) and conch. exit (), can be used in LayaNative to take over the processing of pressing the Back Key. When the setOnBackPressedFunction is taken over, the function is executed when the user presses the Back key.

Once this function is invoked, the default function of pressing exit twice in the engine is blocked. At this time, if you want to exit the application, you can call exit () function.


**Tips**  
* 1. Conh can only be invoked in LayaNative environment. There is no conch definition in the web version, so we need to judge whether it exists or not. *
* 2. When developing in as language, conch objects can be obtained through Browser. window ['conch']. *
* 3. LayaNative only has these two functions in Android. *


The JS example is as follows:

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
