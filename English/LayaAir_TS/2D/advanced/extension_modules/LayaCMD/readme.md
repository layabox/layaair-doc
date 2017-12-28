# layacmd

[TOC]

**layacmd**是**layaair**的命令行工具，可以使用**layacmd**不打开**IDE**的情况下对**layaair**项目进行编译发布等操作。它包含以下功能，这些功能都对应一个子命令。

| 功能             | 子命令             |
| -------------- | --------------- |
| 编译             | compile         |
| 发布             | publish         |
| 导出UI           | ui              |
| 资源版本控制         | resourceVersion |
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
$ layacmd publish -h

  Usage: layacmd-publish [options]

  Options:

    -V, --version                   output the version number
    -o --compressOptions <options>  压缩选项。留空不处理，'c'表示压缩，'cc'表示压缩并合并
    -n --versionName <name>         version name
    --noCompile                     不重新编译项目
    --noUi                          不重新生成UI代码文件
    --noAtlas                       不重新生成图集
    -h, --help                      output usage information
```

如果当前目录有**layaair**项目，该命令会生成发布后的**JavaScript**文件，发布的文件夹在*release*下面。

#### 使用

```shell
$ layacmd publish -o cc # 指定了压缩选项为合并并压缩
```

## 导出UI

```shell
$ layacmd ui -h

  Usage: layacmd-ui [options]

  Options:

    -V, --version     output the version number
    -c --clear        clear will delete old ui code file.
    -a --atlas        generate atlas
    -d --code         generate ui code files
    -m --mode <mode>  'normal'或者'release'，指定'release'会生成除未使用资源外的UI代码文件
    -h, --help        output usage information
```

如果当前目录有**layaair**项目，该命令为UI页面导出与UI相关的文件。

#### 使用

```shell
$ layacmd ui -c -m release # 导出前清理，并且把mode设置为release
$ layacmd ui -d # 导出UI代码文件
$ layacmd ui -a # 导出图集文件
```



## 资源版本控制

**资源版本控制**用于为资源生成版本。版本号默认从数字1000开始递增，如果传入`--versionName`参数，则使用用户指定的版本名称。下次建立建立版本时如果没有再次指定`--name`，版本号为1002，因为每次生成版本，**资源版本控制**内部版本计数器都会递增。

在建立版本时，相对于上次版本建立，修改了的文件或者新增的文件会被记录在新版本中。如果没有新增文件或者没有修改文件，不会有新版本生成。

> 在最终使用资源时，不允许使用上层相对路径，即路径中包含“..”。

```shell
$ layacmd resourceVersion -h

  Usage: layacmd-resourceVersion [options]

  Options:

    -h, --help                       output usage information
    -V, --version                    output the version number
    -i --input <input>               资源目录
    -o --output <output>             导出目录
    -n --versionName <version name>  版本名称，默认是从1000开始递增的数字
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
$ layacmd open -h

  Usage: layacmd-open [port] [args]

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
    -p <port>      resource directory.
    -s             don't open browser
```

该命令需要在与**layaair**项目拥有同样结构的目录中使用。对于**ActionScript**项目，它会在*./bin/h5*开启静态文件服务器；对于**JavaScript**和**TypeScript**项目，它会在**./bin**开启静态文件服务器；