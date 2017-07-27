# layacmd
[TOC]

**layacmd**是**layaair**的命令行工具，可以使用**layacmd**不打开**IDE**的情况下对**layaair**项目进行编译发布等操作。它包含以下功能，这些功能都对应一个子命令。

| 功能             | 子命令             |
| -------------- | --------------- |
| 编译             | compile         |
| 发布             | publish         |
| 导出UI           | ui              |
| 资源版本控制         | resourceVersion |
| 图集打包           | atlas           |
| 使用guetzli压缩jpg | guetzli         |
| 打开静态文件服务器      | open            |



##  安装

```shell
$ npm install layacmd -g
```



## CLI

**layacmd**的命令类似**git**命令，它的形式是：

```shell
$ layacmd [command] [args]
```

比如编译项目：

```shell
$ layacmd compile
```

或者查看帮助信息：

```shell
$ layacmd --help
```

不仅**layacmd**本身，所有的子命令都有版本信息和帮助信息，查看子命令帮助信息：

```shell
$ layacmd command -h
```

**layacmd**的大部分子命令都需要当前工作目录下包含**layaair**项目，少数命令可以手动指定输入目录，如`guetzl`，`atlas`命令则是即可以直接`$ layacmd atlas`，也可以指定输入目录。



## 编译

```shell
$ layacmd compile -h

  Usage: layacmd-compile [options]

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```

如果当前目录有**layaair**项目，该命令会生成编译后的**JavaScript**文件。编译只有**ActionScript**和**TypeScript**项目需要，如果是**JavaScript**，则什么也不做。

#### 使用

```shell
$ layacmd copmile
```



##  发布

```shell
$ layacmd publish --help

  Usage: layacmd-publish [options]

  Options:

    -h, --help                      output usage information
    -V, --version                   output the version number
    -o --compressOptions <options>  Compress options. 'no' for no processing, 'c' for compress, 'cc' for compress and concat.
```

如果当前目录有**layaair**项目，该命令会生成发布后的**JavaScript**文件，发布的文件夹名为*release，*可以对文件进行合并压缩。

#### 使用

```shell
$ layacmd publish -o cc # 指定了压缩选项为合并并压缩
```



## 导出UI

```shell
$ layacmdui -h

  Usage: layacmd-ui [options]

  Options:

    -h, --help        output usage information
    -V, --version     output the version number
    -c --clear        clear will delete old ui code file.
    -m --mode <mode>  'normal' or 'release', specify 'release' will generate UI code files exclude unused resources.
```

如果当前目录有**layaair**项目，该命令为UI页面导出代码。

#### 使用

```shell
$ layacmd ui -c -m release # 导出前清理，并且把mode设置为release
```



## 资源版本控制

**资源版本控制**用于为资源生成版本。版本号默认从数字1000开始递增，如果传入`--versionName`参数，则使用用户指定的版本名称。下次建立建立版本时如果没有再次指定`--name`，版本号为1002，因为每次生成版本，**资源版本控制**内部版本计数器都会递增。

在建立版本时，相对于上次版本建立，修改了的文件或者新增的文件会被记录在新版本中。如果没有新增文件或者没有修改文件，不会有新版本生成。

```shell
$ layacmd resourceVersion -h

  Usage: layacmd-resourceVersion [options]

  Options:

    -h, --help                       output usage information
    -V, --version                    output the version number
    -i --input <input>               resource directory.
    -o --output <output>             output directory.
    -n --versionName <version name>  version name, default is numbers start from 1000.
```

该命令不需要当前目录包含**layaair**项目，取而代之的是，你需要指定输入目录。



#### 使用

```shell
$ layacmd resourceVersion -i input_dir -o output_dir -n 1.1.0
# 指定了输入目录、输出目录和版本名称
```



#### 生成的文件

> 1000
>
> > resources...
>
> 1001
>
> > resources...
>
> 1002
>
> > resources...
>
> .record
>
> manifest.json



#### 资源版本

名为*1000*、*1001*、*1002*的文件夹是默认资源版本名称，里面保存的是对应版本被修改了的资源。根据从*manifest.json*中得到的每个资源的最新版本号，从这些文件夹读取*manifest.json*对应的版本资源。



#### .record记录文件

*.record*在**Unix-like**系统中是隐藏文件。这个文件保存最近的版本建立信息，**资源版本控制**由此来判定建立新版本时哪些文件被修改。这个文件不能被删除，如果这个文件丢失，之前建立的版本就会丢失，相当于重新开始建立版本。



#### manifest.json资源清单

用户根据*manifest.json*获取最新的资源。该文件包含资源键值对：

```json
{
    "res1": "1000",
    "res2": "1000",
    "res3": "1002",
    "sub\\res3": "1000",
    "sub\\res4": "1000"
}
```

用户从该映射中获取资源对应的版本号后，使用`资源根目录/版本号/相对文件路径`得到资源的url，加载并使用。



#### 资源版本切换

由于*manifest.json*保存各版本的文件版本号。所以只需要保留历史*manifest.json*即可使用对应版本的资源。



## 图集打包

**图集打包**根据输入目录，生成该目录下所有文件及子目录内的图片的图片集合。图片集合以文件夹为单位，同一张图片集合可能因为超出指定最大尺寸而被分为多张。

该命令可以在**layaair**项目目录下执行，也可以不在，这时需要指定输入路径。

| 参数                 | 说明                                       |
| ------------------ | ---------------------------------------- |
| version            | 打印版本信息                                   |
| help               | 打印帮助信息                                   |
| input, d           | 将被打包的图片集合根目录（可以                          |
| output, o          | 打包后的图片集合和配置文件的保存目录                       |
| resDir, r          | 无法被打包的文件的输出目录                            |
| extrudeList, E     | 需要像素扩展的图片列表，逗号分隔                         |
| maxAtlasWidth, W   | 允许的图集最大宽度，默认2048                         |
| maxAtlasHeight, H  | 允许的图集最大高度，默认2048                         |
| tileWidthLimit, w  | 允许被打包的图片的最大宽度，默认512                      |
| tileHeightLimit, h | 允许被打包的图片的最大高度，默认512                      |
| includeList, i     | 无论是否符合条件，都会被打包的图片列表，逗号分隔                 |
| excludeList, x     | 无论是否符合条件，都不会被打包的图片列表，逗号分隔                |
| shapePadding, p    | 每张图片的间距，默认为2                             |
| force, f           | 无视是否距上次打包后修改过资源，都强制重新打包                  |
| powerOfTwo, 2      | 开启后，会尽量以2的整次幂为前提并保持最小空间来排列（导出的图集不会是2的整次幂尺寸 |
| cropAlpha, c       | 是否裁减掉图片的透明区域                             |
| textureFormat      | 默认"png32"，还可选为"png8"                     |
| config             | 使用配置文件中的参数                               |
| init               | 生成默认配置文件                                 |

#### 使用

##### 使用全局的临时配置文件

在**layaair**项目目录中执行图集打包：

```shell
$ layacmd atlas
```

这个命令会使用位于临时目录，如**windows**的` %userprofile%\AppData\Roaming\LayaAirIDE\`的*packParam.json*文件中指定的参数打包。这个文件在使用**IDE**打开不同的项目打包时会被改写。因此使用**layacmd**不推荐这种方式。



##### 在命令行指定打包参数

**图集打包**为命令提供了众多参数，可以直接在命令行指定，如：

```shell
$ layacmd atlas -d . -o ./bin/res/atlas --textFormat png8
# 指定当前目录为输入目录
# 指定输出目录
# 指定导出png8格式图片
```

更多参数见上面表格。



##### 使用为项目生成的配置文件

使用`init`参数生成配置文件：

```shell
$ layacmd atlas --init
```

将会生成默认名为atlasConfig的json文件：

```json
{
    "inputDir": "required.",
    "outputDir": "",
    "resDir": "",
    "force": true,
    "extrudeList": [
        ""
    ],
    "includeList": [
        ""
    ],
    "excludeList": [
        ""
    ],
    "atlas": {
        "width": 2048,
        "height": 2048,
        "powerOfTwo": false,
        "textureFormat": "png32"
    },
    "sprite": {
        "width": 512,
        "height": 512,
        "padding": 2,
        "cropAlpha": true
    }
}
```
以上字段除了`inputDir`外全都有默认值，你必须指定输入目录。其余各参数的说明和上列表格所述一致。

之后使用以下命令识别配置文件以及生成图片集合：

```shell
$ layacmd atlas --config atlasConfig
```



## guetzli

**guetzli**是**google**的开源**jpeg**编码器。关于它的介绍、注意事项等参见官方https://github.com/google/guetzli。

**guetzli**的压缩过程很慢，而且占用资源大，所以可能要等待些时间。

最好在**资源版本控制**生成的文件夹中使用**guetzli**压缩，这可以保证不会重复压缩一张图。

```shell
$ layacmd guetzli -h

  Usage: layacmd-guetzli [options]

  Options:

    -h, --help              output usage information
    -V, --version           output the version number
    -i --input <input>      resource directory.
    -q --quality <quality>  quality, more than 84.
```

该命令不需要当前目录包含**layaair**项目，取而代之的是，你需要指定输入目录。压缩成功后，源文件会被修改。压缩失败则源文件保持不变。

#### 使用

```shell
$ layacmd guetzli -i input_dir -q 95
# 指定了压缩率95
```



## 打开静态文件服务器

```shell
$ layacmd open --help

  Usage: layacmd-open [port] [args]

  Options:

    -h, --help      output usage information
    -V, --version   output the version number
    -p <port>       resource directory.
    -s              don't open browser
    -h <hostname>   with hostname, such as layacmd open -h localhost
    -d <directory>  with folder
    -f              enable html5 history
```

#####  使用

```shell
$ layacmd open
# 带端口号
$ layacmd -p 8000
# 静默启动（不打开浏览器）
$ layacmd -s
# 使用hostname打开
$ layacmd -h localhost -p 8888
# 指定根目录
$ layacmd -d ~/git/anywhere
# enable html5 history
$ layacmd -f /index.html
```
