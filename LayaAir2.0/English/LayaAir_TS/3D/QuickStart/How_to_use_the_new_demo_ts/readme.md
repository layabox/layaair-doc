#How to Use DEMO Downloaded on Official Website

New official examples will not be released until all new examples have been tested and tested. So for the time being, the examples used in the new document cannot be viewed directly from the official website examples.

To solve this problem temporarily, the government will attach the GIT address of the source code where the new example is used, requiring developers to configure the address themselves.

Documents are updated synchronously after the new example is officially released.

Here's how to use the downloaded demo (skip the document if you know how to use it).

**Tip:**It is recommended that developers always use a project when running the downloaded example. That way, you don't have to change the resource address many times. The resource address root directory used by the example:[资源](http://localhost/LayaAir2_Auto/%3Chttps://github.com/layabox/layaair-demo/tree/master/h5/res/threeDimen%3E)。

Here we use**Transform of Graphics Foundation**Examples（[地址](http://localhost/LayaAir2_Auto/%3Chttps://github.com/layabox/layaair-demo/blob/master/h5/3d/ts/LayaAir3D_Sprite3D/TransformDemo.ts%3E))

When you get the code, open the sample project created by ide. We put the downloaded resources in`bin/res`Under the directory.

![] (img/1.png)<br> (Figure 1)

Then in`src/script`Create a new file under the folder. Note that the name needs to be from**Replication in Address**。 (This is called TransformDemo. ts)

![] (img/2.png)<br> (Figure 2)

Copy the copied code in, if used`git`Cloned files can be placed directly under the folder. Of course, there will be a lot of mistakes at this time.

Set a default export for TransformDemo first.


```typescript

export default class TransformDemo
    
    ///同时需要注释掉最顶层的
    // new TransformDemo();
```


After correcting, we found another mistake.

![] (img/3.png) < br > (fig. 3)

The simple solution is to comment out this line and Figure 4 directly and run it directly. This script is a camera moving script, which is convenient for the opener to observe the examples from various angles. (w move forward, s move backward, a move left, d move right, the left mouse button can adjust the perspective.

![] (img/4.png)<br> (Figure 4)

Or we can find it under the common folder`CameraMoveScript.ts`copy to`scrpit/common`Under the folder.

![] (img/5.png)<br> (figure)

In the end, we just need to rewrite it.`Main.ts`The file will run the example. Because demo comes with all kinds of initialization, you can directly ignore the previous Maine logic. Let's look at the modified Main.


```typescript

import TransformDemo from "./script/TransformDemo";
class Main {
	constructor() {
		new TransformDemo();
	}

}
//激活启动类
new Main();
```


Then F5 runs to see the effect.

![] (img/6.png)<br> (fig. 6)

**To add a new example, you just need to continue adding the sample code under the script folder, and then use main to call it up.**