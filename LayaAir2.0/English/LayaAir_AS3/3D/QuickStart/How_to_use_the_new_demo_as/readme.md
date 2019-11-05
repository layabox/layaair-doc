#How to Use DEMO Downloaded on Official Website

New official examples will not be released until all new examples have been tested and tested. So for the time being, the examples used in the new document cannot be viewed directly from the official website examples.

To solve this problem temporarily, the government will attach the GIT address of the source code where the new example is used, requiring developers to configure the address themselves.

Documents are updated synchronously after the new example is officially released.

Here's how to use the downloaded demo (skip the document if you know how to use it).

**Tip:**It is recommended that developers always use a project when running the download example. That way, you don't have to change the resource address many times. The resource address root directory used by the example:[资源地址](http://localhost/LayaAir2_Auto/%3Chttps://github.com/layabox/layaair-demo/tree/master/h5/res/threeDimen%3E)。

Here we use**Transform of Graphics Foundation**Example for example（[地址](http://localhost/LayaAir2_Auto/%3Chttps://github.com/layabox/layaair-demo/blob/master/h5/3d/as/LayaAir3D_Sprite3D/TransformDemo.as%3E))

When you get the code, open the sample project created by ide. We will download the resources to the`bin/res`Under the directory.

![] (img/1.png)<br> (Figure 1)

Then in`src/script`Create a new file under the folder. Note that the name needs to be from`地址中复制`。 (This is called TransformDemo. as)

![] (img/2.png)<br> (Figure 2)

Copy the copied code in, if used`git`Cloned files can be placed directly under the folder. Of course, there will be a lot of mistakes at this time.

![] (img/3.png) < br > (fig. 3)

Just like this one, the current package name is wrong, just change the package name to the correct one. The package name here is`script`。

![] (img/4.png)<br> (Figure 4)

There will be another mistake.

! [] (IMG / 5. PNG) < br > (Figure 5)

The simple solution is to comment out this line and run it directly. This script is a camera moving script, which is convenient for the opener to observe the examples from various angles. (w move forward, s move backward, a move left, d move right, the left mouse button can adjust the camera perspective)

Or we can find it under the common folder`CameraMoveScript.as`Copy it.

![] (img/6.png)<br> (fig. 6)

In the end, we just need to rewrite it.`Main.as`The file will run the example. Because demo comes with all kinds of initialization, you can directly ignore the previous Maine logic. Let's look at the modified Main.


```typescript

package {
	import script.TransformDemo;

	public class Main {
		public function Main() {
			var transformDemo:TransformDemo = new TransformDemo();
		}
	}
}
```


Then F5 runs to see the effect.

![] (img/7.png)<br> (fig. 7)

**To add a new example, you just need to continue adding the sample code under the script folder, and then use main to call it up.**