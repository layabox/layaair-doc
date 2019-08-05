# 粒子属性详解

###### *version :2.1.1beta   Update:2019-8-2*

![](img/1.png)<br>(图1)

关于粒子系统详细的使用方法可以去查看[Unity官方文档](https://docs.unity3d.com/Manual/PartSysReference.html)。这里只简单介绍LayaAir导出工具支持导出的部分。

**注意:** 如果导出时有不支持的部分，导出后有可能会出现不可预知的错误。

------

**基础面板**

​	1、`Duration` 粒子持续时间

​	2、`Looping` 是否循环

​	3、`Startdelay` 粒子开始延迟      	  
​                (1)  *Constant*  常数
​                (2)  *Random Between two Constant*  最大最小常数

​	4、`StartLifetime` 粒子生命
​                (1)  *Constant*  常数
​                (2)  *Random Between two Constant* 随机在最大最小数中取常数

​	5、`StartSpeed` 粒子速度
​                (1)  *Constant*  常数              
​                (2)  *Random Between two Constant* 随机在最大最小数中取常数

​	6、`StartSize`
​                (1)  *Constant*  常数
​                (2)  *Random Between two Constant*  随机在最大最小数中取常数

​	7、`3DStartSize` 3D开始大小
​                (1)  *Constant*  常数
​                (2)  *Random Between two Constant*  随机在最大最小数中取常数

​	8、`StartRotation` 开始旋转
​                (1)  *Constant*  常数

   9、`3DRotaion` 3D 旋转参数
                (1)  *Constant*  常数
                (2)  *Random Between two Constant*  随机在最大最小数中取常数

​	10、`RandomizeRotation` 随机旋转的概率 

​	11、`StartColor` 开始颜色
​                (1)  *Color*  常数颜色
​                (2)  *random Between two Color*  随机在两个颜色中取值

​	12、`GravityModifier` 重力修正

​	13、`Simulation Space` 模拟空间 
​                (1)  *local*  模型
​                (2)  *Hierarchy*  世界

​	14、`ScalingMode` 缩放模式
​                (1)  *Hierarchy*  层级缩放
​                (2)  *local*  自身缩放

​	15、`Play On Awake` 开始时播放

​	16、`Max Partticles` 最大粒子数

​	17、`AutoRandomSeed` 自由旋转速度

------

**Emission** 发射模块

`Rate over Time` 发射粒子数

`Bursts` 发射粒子数

------

**Shape** 形状模块

该模块定义粒子发射器的体积和形状。

1、`Sphere` 球
			(1)  *Radius*  半径
			(2)  *Emit from shell*  根据壳发射
			(3)  *Randomize Direction*  随机化方向

 2、`Hemisphere` 半球形状
			(1)  *Radius* 半径
			(2)  *Emit from shell* 根据壳发射
			(3)  *Randomize Direction* 随机化方向

3、`cone` 锥形

​			(1)  *Angle*  角度

​			(2)  *Radius*  半径

​			(3)  *Emit from*  发射
​						1)  *Base*  基础
​						2)  *Base Shell*  基于壳
​						3)  *Volume*  体积
​						4)  *Volume Shell*  体积壳 

​			(4)  *Randomize Direction*  随机化方向 

4、`Box` 盒子形

​			(1)  *BoxX*  盒子X 

​			(2)  *BoxY*  盒子Y

​			(3)  *BoxZ*  盒子Z	

​			(4)  *Emitform*  发射
​						1)  *volume*

​			(5)  *Randomize Direction*  随机化方向

5、`circle` 环形

​			(1)  *Radius*  半径

​			(2)   *Arc*  角度

​			(3)  *Emit From Edge*  基于边缘发射

​			(4)  *Randomize Direction*  随机化方向

------

**Velocity over Lifetime**  基于生命的速度变化

1、

​			(1)  *Constant*  常数模式，速度是恒定的

​			(2)  *Curve*  线模式，粒子速度随着lifetime动

​			(3)  *Random from two Constant*  随机速度模式

2、`Space` 空间

​			(1)  *Local*  模型空间

​			(2)  *World*  世界空间

------

**Color over Lifetime** 基于生命的颜色变化

  1、`Color` 颜色
			(1)  *Gradient*  梯度
			(2)  *Random between two Gradient*  在两个梯度中随机取值

------

**Size over Lifetime** 基于生命的大小变化

 1、`Separate Axes`按轴分离
			(1)  *size*  大小
					1)  *Curve*  曲线
					2)  *Random Between Two Contants*  在两个常数中随机取值

2、`Separate Axes` 缩放轴选中
			(1)  *size*   大小
					1)  *Curve*  曲线
					2)  *Random Between Two Contants*  在两个常数中随机取值

------

**Texture Sheet Animation** 图片动画

1、`Tiles` 平铺

2、`Animation` 动画
			(1)  *Single Row*  单行
			(2)  *whole Sheet*  整表

3、`Random Row` 随机行

4、`Frame over Time` 动画帧随时间变化
			(1)  *contants* 常数
			(2)  *curves*  曲线
			(3)  *Random Between Two Contants*  在两个常数中随机取值

5、`Start Frame` 开始帧数
			(1)  *Contant*
			(2)  *Random Between Two Contants* 在两个常数中随机取值

6、`Cycles` 周期

7、`Flip U` 翻转U

8、`Flip V` 翻转V

------

**Rotation over Lifetime** 基于生命的旋转变化

1、`Separate Axes` 按轴分离未选中
			(1)  *Angular Velocity*  角速度
					1)  *Constant*  常数
					2)  *Curve*  曲线
					3)  *Random Between Two Contants*  在两个常数中随机取值



------

**Render** 渲染模式

这个模式按渲染模式支持

1、`RenderMode` 渲染模式
			(1)  *Billboard*  粒子总是面向相机
			(2)  *Stretched Billboard*
					1)  *Camera Scale*  相机比例
					2)  *Velocity Scale*  速度比例
					3)  *Length Scale*   长度比例
			(3)  *Horizontal Billboard*   粒子平面平行于XZ“底”平面
			(4)  *Vertical Billboard*  粒子在Y轴上是直立的，但是面向相机
			(5)  *Mesh*  粒子是从3D网格而不是纹理渲染的。
					(支持) 但是如果有面数特别大的模型，会报错，报错原因是index超出65536

2、`Sorting Fudge` 数值越小渲染优先级越大

