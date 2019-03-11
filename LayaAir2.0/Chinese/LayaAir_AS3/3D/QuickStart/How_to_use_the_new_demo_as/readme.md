# 	关于官网下载的DEMO如何使用

​	在新的示例全部测试并且检测过之后才会发布新的官方示例。所以新文档所使用到的示例暂时无法直接在官网示例处查看。

​	为了暂时性解决该问题，官方将在使用新示例的处将源码的git地址附带上，需要开发者自行配置地址。

​	在新示例正式发布后文档会同步再更新。

此处将讲解下载到的demo如何使用(如果知道如何使用可以直接跳过该文档)。

**Tip:**建议开发者在运行下载的示例一直使用一个项目。那样就不用再多次修改资源地址。示例所使用的的资源地址根目录：[资源地址](https://github.com/layabox/layaair-demo/tree/master/h5/3d/newDemo/res/threeDimen)。

这里我们使用**图形基础篇的Transform**示例来做例子([地址](https://github.com/layabox/layaair-demo/tree/master/h5/3d/newDemo/newas/LayaAir3D_Graphics/TransformDemo.as))。

拿到代码后，打开ide创建的示例项目。我们将下载到的资源放到`bin/res`目录下。

![](img/1.png)<br>(图1)

然后在`src/script`文件夹下创建一个新文件。注意名字需要从`地址中复制`。(这里命名为TransformDemo.as)

![](img/2.png)<br>(图2)

将复制的代码复制进去，如果是使用`git`克隆获取的文件可以直接放到该文件夹下。当然这时候会有不少报错。

![](img/3.png)<br>(图3)

像这个只是当前的包名不对，只需要将包名改为正确的包名即可。此处的包名为`script`。

![](img/4.png)<br>(图4)

这时候还会有一个错误

![](img/5.png)<br>(图5)

简单的处理方案是直接注释掉这一行，就可以直接运行了。这个脚本是摄影机移动脚本，是方便开放者从各种角度观察示例。（w前进移动，s后退移动，a向左移动，d向右移动，鼠标左键按下拖动可以调整摄影机视角）

或者我们从common文件夹下找到`CameraMoveScript.as`拷贝过来。

![](img/6.png)<br>(图6)

在这最后，我们只需要重写`Main.as`文件就能运行示例了。因为在demo是自带各种初始化的，所以可以直接不用管之前的Main逻辑。我们来看下修改后的Main。

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

然后F5运行就能看到效果了。

![](img/7.png)<br>(图7)

**新增新的示例只需要在script文件夹下继续新增示例代码，然后使用main去调起即可。**