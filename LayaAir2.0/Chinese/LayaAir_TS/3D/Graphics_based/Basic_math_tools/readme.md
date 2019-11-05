# LayaAir3D基础数学工具	

说完了坐标系，下面在介绍下在3D中一些常用的数学工具。（本篇提到的示例为快速开始篇的示例项目）

**向量**

​	**Vector2**二维向量 ， **Vector3** 三维向量， **Vector4 **四维向量，这几个向量在LayaAir 3D引擎中使用非常频繁，从二维向量到四维向量到处都会看到它们的身影。最基础的用法就是示例中用于赋值使用。

​	代码中3D对象的移动、旋转、缩放等变换都是使用Vector3作为了它的x、y、z轴向坐标赋值。更详细的使用可以查看 [API](https://layaair2.ldc2.layabox.com/api2/Chinese/index.html?category=Core&class=laya.d3.math.Vector3) 。

**颜色**

​	那么在各种颜色属性赋值上，三维向量中的值又分别代表了R、G、B三种颜色，分别为红、绿、蓝。还有些地方使用四维向量作为颜色参数，Vector4的w值代表的Alpha值。LayaAir 3D引擎中，三个颜色的最大值为1，是按百分比的方式设置，整体值越大，颜色越亮，越小颜色越暗，如果值超过1将会产生曝光效果。

​	至于红、绿、蓝能组合成什么样的颜色，初学者们可以向游戏美术设计师们咨询学习，比如红加绿为黄、红加蓝为紫等等，一般在项目开发过程中，程序员需要反复调整颜色值去试验好的效果。

​	示例中以下代码运用了向量作为颜色赋值：

```typescript
	//设置方向光的颜色
	directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
```

**四元数（Quaternion）**

​	四元数在LayaAir中用于计算旋转。它们计算紧凑高效，不受万向节锁的困扰，并且可以很方便快速地进行球面插值。

关于四元数的使用有需求的可以自行了解。这里仅提供 [API](https://layaair2.ldc2.layabox.com/api2/Chinese/index.html?category=Core&class=laya.d3.math.Quaternion) 。

**包围盒（BoundBox）**

​	包围盒算法是一种求解离散点集最优包围空间的方法,基本思想是用体积稍大且特性简单的几何体（称为包围盒）来近似地代替复杂的几何对象。LayaAir3D支持3中包围盒,更详细的接口说明可以查看 [API](https://layaair2.ldc2.layabox.com/api2/Chinese/index.html?category=Core&class=laya.d3.math.BoundBox) 。

**矩阵（Matrix）**

​	矩阵是一个按照长方阵列排列的复数或实数集合。LayaAir3D中支持 **3X3矩阵（[API](https://layaair2.ldc2.layabox.com/api2/Chinese/index.html?category=Core&class=laya.d3.math.Matrix3x3)）**和 **4X4矩阵（[API](https://layaair2.ldc2.layabox.com/api2/Chinese/index.html?category=Core&class=laya.d3.math.Matrix4x4)）**的矩阵两种。

**射线（Ray）**

​	射线具有 **原点origin** 与 **方向direction** 两个属性 。

![图](img/1.png)<br>(图1)
