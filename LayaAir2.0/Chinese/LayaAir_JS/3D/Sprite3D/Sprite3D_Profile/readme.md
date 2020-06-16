# Sprite3D的概述

###### *version :2.7.0beta   Update:2020-6-12*

Sprite3D 是3D的基本节点对象，是LayaAir3D中所有节点类型的父类，包含很多3D精灵基本的功能属性,除此之外还是所有3D组件和脚本的容器。

**Sprite3D 属性和功能介绍**

- 1.唯一id

```typescript
get id();
```

- 2.蒙版层，即精灵所在的图层，渲染相机可进行可视遮罩层的控制，对精灵的渲染与否进行控制

```typescript
set layer(value);
```

- 3.是否为静态精灵，静态精灵可进行静态核批（静态合批自动进行），精灵为静态对象是静态合批的基础，可在Unity中制作场景时，进行勾选，Laya的Unity插件将自动导出，LayaAir引擎并未开放set isStatic函数，旨在引导开发者在Unity中就完成相关的设置。

```typescript
get isStatic();
```

- 4.精灵变换，Transform3D：变换组件确定场景中每个对象的位置，旋转和缩放。同时和Node节点一样具备子父节点的关联关系，使变换操作更灵活，每个精灵都有一个Transform3D。

```typescript
get transform();
```

#### Sprite3D的子父级关系

Sprite3D继承自Node节点，是LayaAir3D中所有3D对象的父类。

关于子父级关系体现可以查看示例([demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Sprite3D&name=Sprite3DParent))

