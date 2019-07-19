# 	Config3D介绍

###### *version :2.1.1   Update:2019-7-19*

### Config3D相关介绍

该类用于创建3D初始化设置

| 属性                |                          | 数据类型 | 默认值  |
| ------------------- | ------------------------ | -------- | ------- |
| isAntialias         | 是否开启抗锯齿           | Boolean  | true    |
| isAlpha             | 画布是否透明             | Boolean  | false   |
| premultipliedAlpha  | 设置画布是否预乘         | Boolean  | true    |
| isStencil           | 设置画布是否开启模板缓冲 | Boolean  | true    |
| octreeCulling       | 是否开启八叉树裁剪       | Boolean  | false   |
| octreeInitialSize   | 八叉树初始化尺寸         | Number   | 64.0    |
| octreeInitialCenter | 八叉树初始化中心         | Vector3  | (0,0,0) |
| octreeMinNodeSize   | 八叉树最小尺寸           | Number   | 2.0     |
| octreeLooseness     | 八叉树松散值             | Number   | 1.25    |
| debugFrustumCulling | 是否开启视锥裁剪调试     | Boolean  | false   |

**注意：**

如果开启八叉树裁剪,使用红色绘制高层次八叉树节点包围盒,使用蓝色绘制低层次八叉节点包围盒,精灵包围盒和八叉树节点包围盒颜色一致,但Alpha为半透明。如果视锥完全包含八叉树节点,八叉树节点包围盒和精灵包围盒变为蓝色,同样精灵包围盒的Alpha为半透明。

如果不开启八叉树裁剪,使用绿色像素线绘制精灵包围盒。



> Method Detail

 `defaultPhysicsMemory` 物理功能初始化内存，单位为M。

注意：内存必须大于16M

​		**Implementation**

​		public  function  set  defaultPhysicsMemory( value : int ) : void

​		public  function  get  defaultPhysicsMemory() : int



### 如何设置Config3D

首先创建好一个config3D，设置好需要的参数后，在Laya3D初始化时使用。

```typescript
//创建一个config3D
var _config = new Config3D();
//设置不开启抗锯齿
_config.isAntialias = false;
//设置画布不透明
_config.isAlpha = false;
//使用创建的config3d
Laya3D.init(0, 0, _config);
```

**注意：Config一旦设置好后就不能再修改了。必须在一开始就设置好。**