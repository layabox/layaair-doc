**AS与JS混合编码**

​        关于AS中调用JS方法，LayaAir提供了一个公有方法__JS__()来和外部JS相互调用。这个方法接受的参数是JS的脚本。下面通过例子来看下这个方法的使用。

​        假设我们创建了一个名为JSDemo.as的启动类文件，示例代码如下：

```typescript
package
{
	public class JSDemo
	{
		public function JSDemo()
		{
			Laya.init(0, 0);
			__JS__('alert("浏览器高：" + window.innerHeight + "浏览器宽："+ window.innerWidth)');
		}
	}
}
```
**编译运行后如图1所示：**
![](1.jpg)
(图1)

​	通过图1的浏览器弹出窗，我们看到，这是JS的原生alert脚本被成功执行。通过__JS__方法在AS3代码里编码，我们已经成功的实现了。下面，我们继续深入介绍AS代码编程里嵌套JS代码。

​        代码示例如下：





![](2.jpg)
（图2）

