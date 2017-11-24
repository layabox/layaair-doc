# layacmd
[TOC]

**layacmd** is **layaair** command-line tool that can be used **layacmd**  to open **layaair**  project compile and publish operations without opening the  **IDE**. It contains the following functions, each of which corresponds to a sub command.

| function             | Sub command             |
| -------------- | --------------- |
| Compile             | compile         |
| Release             | publish         |
| Export UI           | ui              |
| Resource versioning         | resourceVersion |
| Atlas packing          | atlas           |
| Using guetzli to compress jpg | guetzli         |
| Open static file server      | open            |



##  Install

```shell
$ npm install layacmd -g
```



## CLI

**layacmd* command is similar to the **git** command, and it is in the form of:

```shell
$ layacmd [command] [args]
```

For example, the compilation project ：

```shell
$ layacmd compile
```

Or view help information ：

```shell
$ layacmd --help
```

Not only the **layacmd** itself, all the commands have version information and help information, but also look at the sub command help information:

```shell
$ layacmd command -h
```

Most of the **layacmd** commands required current working directory contains the **layaair** project, a few commands can be specified manually enter the directory, such as `guetzl`, `atlas`  command is that can be directly `$ layacmd atlas`, you can also specify the input directory.



## Compile

```shell
$ layacmd compile -h

  Usage: layacmd-compile [options]

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```

If the current directory has a **layaair** project, the command generates the compiled **JavaScript** file. Compilation only **ActionScript** , **TypeScript** and **JavaScript**.

#### use

```shell
$ layacmd copmile
```



##  release

```shell
$ layacmd publish --help

  Usage: layacmd-publish [options]

  Options:

    -h, --help                      output usage information
    -V, --version                   output the version number
    -o --compressOptions <options>  Compress options. 'no' for no processing, 'c' for compress, 'cc' for compress and concat.
```

If the current directory has a **layaair** project, the command generates the published **JavaScript** file, and the published folder is called *release，* which can merge and compress files.

#### Use

```shell
$ layacmd publish -o cc # 指定了压缩选项为合并并压缩
```



## Export UI

```shell
$ layacmdui -h

  Usage: layacmd-ui [options]

  Options:

    -h, --help        output usage information
    -V, --version     output the version number
    -c --clear        clear will delete old ui code file.
    -m --mode <mode>  'normal' or 'release', specify 'release' will generate UI code files exclude unused resources.
```

If the current directory has a **layaair** project, the command exports the code for the UI page.

#### Use

```shell
$ layacmd ui -c -m release # 导出前清理，并且把mode设置为release
```



## Resource version control

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



#### Resource version

The folders named *1000*、*1001*、*1002* are the default resource version names, and the saved resources for the corresponding version are saved. According to the latest version of each resource obtained from *manifest.json* the corresponding version resources of *manifest.json* are read from these folders.



#### .record Record file

*.record* is a hidden file in the **Unix-like** system. This file holds the most recent version creation information,，**Resource version control** and thereby determines which files are modified when the new version is built. If the file is lost, the previous version will be lost, equivalent to re establishing the version.



#### manifest.json Resource list

Users according to *manifest.json*  for the latest resources. This file contains resource key-value pairs:

```json
{
    "res1": "1000",
    "res2": "1000",
    "res3": "1002",
    "sub\\res3": "1000",
    "sub\\res4": "1000"
}
```

When the user obtains the version number corresponding to the resource from the map, the URL of the resource is obtained by using the `Resource root directory / version number / relative file path` Get the url of the resource, load and use.



#### Resource version switching

Because *manifest.json*  saves the version number of each version of the file. So just save history  *manifest.json* and use the resources of the corresponding version.



## Atlas packing

**atlas packing** according to the input directory, generate all the files in the directory and the picture collection in the subdirectory. The picture set is a folder, and the same set of pictures may be divided into multiple sheets due to the size of the specified maximum.

This command can be executed under **layaair** project directory, or it can not be in, and then you need to specify the input path.

| parameter                 | Explain                                      |
| ------------------ | ---------------------------------------- |
| version            | Print version information                                 |
| help               | print the help information                                  |
| input, d           | The root directory of the picture to be packaged                         |
| output, o          | Packed picture collection and saved directory of configuration file                       |
| resDir, r          | The output directory of the file that can not be packaged                           |
| extrudeList, E     | A list of pictures that need pixel expansion, separated by commas                       |
| maxAtlasWidth, W   | The maximum allowable album width, the default 2048                        |
| maxAtlasHeight, H  | Allow the maximum height of the gallery, the default 2048                      |
| tileWidthLimit, w  | Allow the maximum width of the picture is packaged, the default 512                      |
| tileHeightLimit, h | Allow the maximum height of the picture to be packaged, the default 512                     |
| includeList, i     | No matter whether the conditions are met, will be packaged list of pictures, separated by commas                |
| excludeList, x     | Whether or not eligible, will not be packaged list of pictures, separated by commas                |
| shapePadding, p    | The spacing of each picture, the default is 2                             |
| force, f           | Ignoring whether the resource has been modified since the last package, are forced to repackage                  |
| powerOfTwo, 2      | When turned on, you try to arrange with the power of 2 as a whole and the minimum space (the exported set will not be the power of 2 |
| cropAlpha, c       | Whether to cut off the transparent area of the picture                             |
| textureFormat      | Default "png32", but also optional "png8"                     |
| config             | Use the parameters in the configuration file                           |
| init               | Generate a default profile                                 |

#### Use

##### Using global temporary configuration files

Implementing atlas packing in the **layaair**  project directory:

```shell
$ layacmd atlas
```

This command is packaged with the parameters specified in the *packParam.json* file of the temporary directory, such as ` %userprofile%\AppData\Roaming\LayaAirIDE\` in **windows**. This file will be rewritten when you open different projects using  **IDE**. Therefore, using **layacmd** does not recommend this approach.



##### Specify packing parameters on the command line

**Atlas packing** many parameters are provided for the command, which can be specified directly on the command line, such as:

```shell
$ layacmd atlas -d . -o ./bin/res/atlas --textFormat png8
# 指定当前目录为输入目录
# 指定输出目录
# 指定导出png8格式图片
```

For more parameters, see the above table.



##### Using configuration files generated for projects

Using `init` parameters to generate configuration files:

```shell
$ layacmd atlas --init
```

The default JSON file will be generated by atlasConfig.

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
All fields except `inputDir` have default values. You must specify the input directory. The rest of the parameters are consistent with those listed in the above table.

Then use the following command to recognize the configuration file and generate a photo collection:

```shell
$ layacmd atlas --config atlasConfig
```



## guetzli

**guetzli** is **google** an open source **jpeg** encoder for google. About its introduction, precautions, see the official https://github.com/google/guetzli。

**guetzli** compression process is slow, and it takes up a lot of resources, so it's possible to wait for some time.

It is best to use **guetzli** compression in the folder generated by the **Resource version control**, which ensures that you will not repeatedly compress a graph.

```shell
$ layacmd guetzli -h

  Usage: layacmd-guetzli [options]

  Options:

    -h, --help              output usage information
    -V, --version           output the version number
    -i --input <input>      resource directory.
    -q --quality <quality>  quality, more than 84.
```

This command does not require the current directory to contain the **layaair** project. Instead, you need to specify the input directory. After the compression is successful, the source file will be modified. The source file remains unchanged when the compression fails.

#### use

```shell
$ layacmd guetzli -i input_dir -q 95
# 指定了压缩率95
```



## Open the static file server

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

#####  use

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
