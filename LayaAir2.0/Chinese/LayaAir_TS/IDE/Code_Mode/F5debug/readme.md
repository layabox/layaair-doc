# 2.2版本的F5调试开启

LayaAirIDE内置的代码编辑工具是VScode，

F5调试是VScode自带的调试工具。

但由于2.2版本编译方式的改变，会导致支持F5调试，导致bin目录会变大。所以关闭了F5调试，推荐采用F6运行，激活chrome调试。（MAC系统的开发者需要注意，采用F6运行前，不要打开chrome进程，否则会影响F6调起chrome进程）

chrome是一直以来推荐的首选调试模式，建议开发者采用Chrome来调试项目。

如果开发者有特定的需求，请按以下方式，自行开启LayaAirIDE的F5调试的支持。

### 一、module模式TS项目（实验版 ）如何开启F5调试

#### 1、修改 `.laya/compile.js`

找到`sourceMap: false` 修改为  `sourcemap: true`

一共有两个`sourcemap`的地方，都要修改设置为`true` 。

#### 2、修改 `.laya/launch.json`

找到`"sourceMaps": false,` 修改为 `"sourceMaps": true,`

这里也有两处，一处是layaAir调试，一处是chrome调试。

由于我们建议是用chrome调试，改chrome调试就可以了。如果需要用layaAir调试的，也可以都改掉，或者只看layaAir调试，这个看自己的需求。

#### 3、修改 `src/tsconfig.json`

在compilerOptions下增加 “sourceMap”:true

修改后的tsconfig.json如下：

```json
{
  "compilerOptions": {
    "module": "es6",
    "target": "es6",
    "baseUrl": "../libs",
    "outDir": "../build/src",
    "sourceMap": true
  },
  "references": [
    {"path":"../libs"},
  ],
  "exclude": [
    "../node_modules"
  ]
}
```



### 二、bundle模式TS项目，如何开启F5调试

#### 1、修改 `.laya/compile.js`

找到`sourceMap: false` 修改为  `sourcemap: true`

一共有两个`sourcemap`的地方，都要修改设置为`true` 。

#### 2、修改 `src/tsconfig.json`

将`"sourceMap": false` 修改为 `"sourceMap": true`

修改后的tsconfig.json如下：

```json
{
  "compilerOptions": {
    "module": "es6",
    "target": "es6",
    "noEmitHelpers": true,
    "sourceMap": true
  },
  "exclude": [
    "node_modules"
  ]
}
```



### 三、JS项目，如何开启F5调试

找到`sourceMap: false` 修改为  `sourcemap: true`

一共有两个`sourcemap`的地方，都要修改设置为`true` 。

> 只改第二个也可以，建议两个都改。