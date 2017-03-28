# LayaAir3D 物理系统之鼠标拾取（射线拾取）



### 1、碰撞器Collider、层的概念

　　在引擎1.7.1版本之后，我们优化整合了鼠标拾取功能。介绍此功能之前，大家必须要知道两个知识点：碰撞器Collider、层的概念。

#### 1.1 碰撞器Collider

　　LayaAir3D现支持的碰撞器有三种，分别是， **球型碰撞器SphereCollider**，**盒型碰撞器BoxCollider**，**网格碰撞器MeshCollider**。从**碰撞检测精确度**和**消耗性能**从低到高依次为SphereCollider-BoxCollider-MeshCollider；可以根据游戏中开发需求，选择适合的碰撞器。

#### 1.2 层的概念

　　场景中共有32层，你可以选择把精灵扔在任意层内。用在照相机上，照相机可以根据层级进行裁剪；**用在碰撞检测上，可以控制碰撞什么，不碰撞什么**。

```java
   /**
    * 在场景中投下可与所有碰撞器碰撞的一条光线,获取发生碰撞的第一个碰撞器。
    * @param  ray        射线
    * @param  outHitInfo 与该射线发生碰撞的第一个碰撞器的碰撞信息
    * @param  distance   射线长度,默认为最大值 
    * @param  layer      选定制定层内的碰撞器,其他层内碰撞器忽略
    */

Physics.rayCast(ray:Ray, outHitInfo:RaycastHit, distance:Number = Number.MAX_VALUE, layer:int = 0)

  /**
   * 在场景中投下可与所有碰撞器碰撞的一条光线,获取发生碰撞的所有碰撞器。
   * @param  ray        射线
   * @param  outHitAllInfo 与该射线发生碰撞的所有碰撞器的碰撞信息
   * @param  distance   射线长度,默认为最大值 
   * @param  layer      选定制定层内的碰撞器,其他层内碰撞器忽略
   */
  
Physics.rayCastAll(ray:Ray, outHitAllInfo:Vector.<RaycastHit>, distance:Number = Number.MAX_VALUE, layer:int = 0)
```

**Tips: 两者的区别是第一个函数可得到检测碰撞到的第一个也是最近的碰撞器信息，第二个可得到所有与射线相交的碰撞器信息。**



### 2、鼠标拾取的应用

只说概念可能对一些初学者比较生疏， 以下列举3D游戏中最常用的三 鼠标拾取的应用 实例！这里只做简单讲解，具体的看示例代码！

#### **2.1  3D场景中拾取物体 --  捡拾装备**

　　首先，在 场景中添加了一些基本的3D几何体。注意看，我们给每个几何体添加的碰撞器，这里完全为了碰撞的精确，真实项目酌情考虑。

　　其次，我需要一条射线，这条射线是从照相机视角根据鼠标坐标生成。

　　最后，射线与所有几何物体检测碰撞，正常装备拾取功能是只捡最近的，由于下面两个演示的是rayCast这个函数，这里我们懂什么意思就可以，完全可以更改函数为rayCast，只选取最近的物体。由于我没有给任何模型添加层级，默认为第0层，这里最大检测碰撞距离为30米。
  [![2.png](http://img.layabox.com/questions/20170324/196562d2516afdec6138277906c2a096.png)](http://img.layabox.com/questions/20170324/196562d2516afdec6138277906c2a096.png)
  [![3.png](http://img.layabox.com/questions/20170324/a37c936b9bd5e51faf4a2eae85bd7882.png)](http://img.layabox.com/questions/20170324/a37c936b9bd5e51faf4a2eae85bd7882.png)



#### 2.2 3D场景中放置物体 -- 皇室战争中放置角色

​      这里直接说实现思路，3D场景中初始化地形，这里我们拿平面代替，为得到更精确的碰撞信息，地面必须用网格碰撞器，不懂3D中的Mesh自行百度。然后让屏幕中生成的射线与网格碰撞器发生碰撞，取出碰撞信息_outHitInfo.position就是射线与地形的相交点，这位置，就是新增放置角色的位置！ 
​    [![4.png](http://img.layabox.com/questions/20170324/8dfe3d40f56107f7d8c0cdedb01b40f3.png)](http://img.layabox.com/questions/20170324/8dfe3d40f56107f7d8c0cdedb01b40f3.png)

**三.  获取3D场景中的坐标 -- 人物跟随 鼠标行走**
​    此实现思路跟楼上一致。
  [![5.png](http://img.layabox.com/questions/20170324/5eee60584820907180f358275a11d226.png)](http://img.layabox.com/questions/20170324/5eee60584820907180f358275a11d226.png)


最后附上以上3个示例的 资源和源码！还有官网上的示例，[http://layaair.ldc.layabox.com/demo/?D3Advance_MousePickingSample](http://layaair.ldc.layabox.com/demo/?D3Advance_MousePickingSample)。