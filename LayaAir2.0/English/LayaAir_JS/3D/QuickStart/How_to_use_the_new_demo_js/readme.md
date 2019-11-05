# 	关于官网下载的DEMO如何使用

New official examples will not be released until all new examples have been tested and tested. So for the time being, the examples used in the new document cannot be viewed directly from the official website examples.

To solve this problem temporarily, the government will attach the GIT address of the source code where the new example is used, requiring developers to configure the address themselves.

Documents are updated synchronously after the new example is officially released.

Here's how to use the downloaded demo (skip the document if you know how to use it).

**Tip:**It is recommended that developers always use a project when running the downloaded example. That way, you don't have to change the resource address many times. The resource address root directory used by the example:[资源](http://localhost/LayaAir2_Auto/%3Chttps://github.com/layabox/layaair-demo/tree/master/h5/res/threeDimen%3E)。

Here we use**Transform of Graphics Foundation**Examples（[地址](http://localhost/LayaAir2_Auto/%3Chttps://github.com/layabox/layaair-demo/blob/master/h5/3d/js/LayaAir3D_Sprite3D/TransformDemo.js%3E))

When you get the code, open the sample project created by ide. We put the downloaded resources in`bin/res`Under the directory.

![] (img/1.png)<br> (Figure 1)

Then in`src/script`Create a new file under the folder. Note that the name needs to be from`地址中复制`。 (This is called TransformDemo. js)

![] (img/2.png)<br> (Figure 2)

And then we'll give it to you at this time.`TransformDemo`Add a default export type for easy reference elsewhere.


```javascript

export default class TransformDemo
//注意注释掉本js底端的这段代码
//new TransformDemo();
```


`CameraMoveScript`This script is a camera operation script for developers to watch the example. (w moves forward, s moves backward, a moves left, D moves right, holding the left button and dragging the mouse can adjust the angle of view). If you need to add scripts, you can see how to use them.**Camera script**。 Otherwise, just comment directly. (Camera scripts directly annotated here)

![] (img/3.png) < br > (fig. 3)

In this last step, we just need to rewrite it.`Main.js`The file will run the example. Because demo comes with all kinds of initialization, you can directly ignore the previous Maine logic. Let's look at the modified Main.


```typescript

import TransformDemo from "./script/TransformDemo"
class Main {
	constructor() {
		new TransformDemo();
	}
}
//激活启动类
new Main();
```


Then F5 runs to see the effect.

![] (img/4.png)<br> (Figure 4)

##Using camera scripts

To use camera scripts, you need to put the common folder under the`CameraMoveScript.js`The camera script is copied to`script`In the directory, the default export class is set for the camera script at the same time.


```typescript

export default class CameraMoveScript extends Laya.Script3D
```


![] (img/5.png)<br> (Fig. 5)

And then we're in`TransformDemo`Introduce in`CameraMoveScript`。


```javascript

import CameraMoveScript from "./CameraMoveScript"
export default class TransformDemo{
    //....省略
}
```


After adding, open the comment and you can test it.

**To add a new example, you just need to continue adding the sample code under the script folder, and then use main to call it up.**