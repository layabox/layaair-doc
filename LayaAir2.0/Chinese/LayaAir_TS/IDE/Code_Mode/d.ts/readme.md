## 编写`d.ts`声明文件

> Date：2021-01-14

### 1、d.ts文件干什么用的

我们在使用TypeScript语言开发的时候，可能会产生使用JavaScript库或者第三方平台（例如小游戏）的API需求。

无论是哪种需求，如果在本地没有定义静态类型。那在VSCode这种带语法检测的编辑器开发过程就会产生语法检测的警告以及编译报错。

此时，我们可以通过`d.ts`后缀的TypeScript语言声明文件来解决。

并且，声明文件还可以起到代码编写提示的作用。



### 2、使用说明

创建一个`.d.ts`后缀的声明文件，例如：`xxx.d.ts`。

然后在该文件中，按声明语法进行全局的声名，然后就可以在项目中直接使用了。

有时候引入的是第三方库或平台API，类和方法有很多，我们不必全都声明一下，通常是需要用到哪些就声明哪些。

> 如果第三方提供了js库的TS声明文件，那拿来直接用就好了。

#### 2.1 声明的概述

d.ts类型定义文件主要有以下几种语法：

- `declare var\let\const ` 声明全局变量或常量
- `declare enum` 声明全局枚举类型
- `declare function` 声明全局函数
- `declare class` 声明全局类
- `declare module`声明全局模块
- `declare namespace` 声明全局对象（含有子属性）
- `interface 和 type` 声明全局类型

通过以上语法，我们可以看出，类型定义文件里的声名基本上都是通过declare，它用于作用域的（模块、类、函数、等）最外层的声明。

#### 2.2 常用的声名方式

常用的声名方式，主要是`declare module`、`interface`、`declare class`、`declare namespace`。

##### 2.2.1声明全局模块：

`declare module`是最常用的声名方式，在外层声明全局模块后，模块里可以定义一切类型。那些常量、变量、函数、类、枚举、等等，都可以在模块里进行类型定义。

例如：

```typescript
//单模块
declare module '*.glsl' {
    const value: string;
    export default value;
}    
 
declare module CANNON {
    //在声名的模块里定义类型
    export class Demo {
        constructor( options: Object );        
        addScene( title: string, initfunc: Function ): void;
        restartCurrentScene(): void;
    }
}

//多级模块
declare module laya.ani.bone {
	class EventData  {
		name:string;
		intValue:number;
		floatValue:number;
		stringValue:string;
		audioValue:string;
		time:number;
		constructor();
	}
}

declare module laya.resource {    
    //在声名的模块里定义枚举类型
    enum FilterMode {
        /**点过滤。*/
        Point = 0,
        /**双线性过滤。*/
        Bilinear = 1,
        /**三线性过滤。*/
        Trilinear = 2
    }
}

```

##### 2.2.2声名类型：

在最外层，除了声名`declare`会经常使用，基于代码结构的需求，需要使用`interface`或者`type`来声明全局的类型。

例如：

```typescript
interface _setScreenBrightnessObject {
  /**
   * 屏幕亮度值，范围 0~1，0 最暗，1 最亮
   */
  value: number;

  /**
   * 接口调用成功
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}

declare namespace wx {
 /**
   * 设置屏幕亮度。
   */
  export function setScreenBrightness(object: _setScreenBrightnessObject): void;
}
```

`type` 与 `interface` 的使用方式类似，区别与非声名文件的语法区别是一样的，就不在这里展开了。在声名文件里，type并不太常用。

需要注意的是，暴露在最外层的 `interface` 或 `type` 会作为全局的类型，作用于整个项目中。我们应该尽可能的减少全局变量或全局类型的数量。所以，最好放到声名的namespace 或者module下。

例如：

```typescript
declare module CANNON {
   export interface IOctreeOptions {
        root: Octree;
        aabb: AABB;
    }
    
    export class Octree extends OctreeNode {
        maxDepth: number;
        constructor(aabb: AABB, options: IOctreeOptions);
        aabbQuery(aabb: AABB, result: Object[]): Object[];
        insert(aabb: AABB, elementData: Object): boolean;
        rayQuery(ray: Ray, treeTransform: Transform, result: Object[]): Object[];
        removeEmptyNodes(): void;
        subdivide(): void;
    }
}
```

##### 2.2.3 声明全局类：

有些时候，我们还是要用到全局的类，不能只放到模块里，所以全局类的声名`declare class`也是常用的。

例如：

```typescript
	/**
	 * Config 用于配置一些全局参数。如需更改，请在初始化引擎之前设置。
	 */
	declare class Config  {
		/**
		 * 设置是否抗锯齿，只对2D(WebGL)、3D有效。
		 */
		static isAntialias:boolean;

		/**
		 * 设置画布是否透明，只对2D(WebGL)、3D有效。
		 */
		static isAlpha:boolean;
	}
```

##### 2.2.4 声明命名空间：

`namespace` 是 TS 早期时为了解决模块化而创造的关键字，中文称为命名空间。

在日常的TS开发中，`namespace`已经被淘汰了，但是在声明文件中，`declare namespace` 还是比较常用的，它用来表示全局声名的是一个对象，包含很多子属性。在声明第三方平台的API时，会常见这种用法。

例如：

```typescript
declare namespace wx {
  /**
   * 批量添加卡券。
   */
  export function addCard(object: _addCardObject): void;
   /**
   * 清理本地数据缓存。
   */
  export function clearStorage(): void;

  /**
   * 同步清理本地数据缓存
   */
  export function clearStorageSync(): void;
}
```

#### 2.3 不常用的声名方式

声明全局变量有`declare var`和`declare let`，

与其相似的是声名常量 `declare const`，

还有声名全局函数`declare function`和声名全局枚举类型 `declare enum` ，

基于尽可能不用全局声明的原则，这些在最外层作用域的全局声明不是常用方式，简单了解一下即可。

### 3、自动生成声名文件

如果库的源码本身就是由TS 写的，那么在使用 `tsc` 脚本将 TS 编译为 js 的时候，添加 `declaration` 选项，就可以同时也生成 `.d.ts` 声明文件了。

我们可以在命令行中添加 `--declaration`（简写 `-d`），

或者在 `tsconfig.json` 中添加 `declaration` 选项。这里以 `tsconfig.json` 为例：

```
{
    "compilerOptions": {
        "module": "commonjs",
        "outDir": "lib",
        "declaration": true,
    }
}
```

上例中我们添加了 `outDir` 选项，将 ts 文件的编译结果输出到 `lib` 目录下，然后添加了 `declaration` 选项，设置为 `true`，表示将会由TS文件自动生成 `.d.ts` 声明文件，也会输出到 `lib` 目录下。

这时候，可能会出现`export`关键字，甚至是在出现在声名前`declare`，

例如下面的两个TS源码为：

```typescript
// src/index.ts
export * from './bar';
export default function foo() {
    return 'foo';
}


// src/bar/index.ts
export function bar() {
    return 'bar';
}
```

生成两个对应的d.ts声名文件为：

```typescript
// lib/index.d.ts
export * from './bar';
export default function foo(): string;


// lib/bar/index.d.ts
export declare function bar(): string;
```

对比上面源文件与声名文件的变化，自动生成的声明文件基本保持了源码的结构，而将具体实现去掉了，生成了对应的类型声明。

使用 `tsc` 自动生成声明文件时，每个 ts 文件都会对应一个 `.d.ts` 声明文件。这样的好处是，使用方不仅可以在使用 `import foo from 'foo'` 导入默认的模块时获得类型提示，还可以在使用 `import bar from 'foo/lib/bar'` 导入一个子模块时，也获得对应的类型提示。

### 4、写在最后

本文仅介绍了项目中的声名文件的入门级使用方式，

对于引用第三方JS库，以及使用小游戏平台API的声名，应该是足够了。

如果想了解更多，可以自行搜索查询相关文档介绍。

这里推荐一篇不错的文档链接：

https://github.com/xcatliu/typescript-tutorial/blob/master/basics/declaration-files.md