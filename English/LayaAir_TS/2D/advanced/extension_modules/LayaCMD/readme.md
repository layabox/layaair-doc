# layair-cmd
[TOC]

**layair-cmd** is **layaair** command-line tool that can be used **layair-cmd**  to open **layaair**  project compile and publish operations without opening the  **IDE**. It contains the following functions, each of which corresponds to a sub command.

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
$ npm install layair-cmd -g
```



## CLI

**layair-cmd* command is similar to the **git** command, and it is in the form of:

```shell
$ layair-cmd [command] [args]
```

For example, the compilation project ：

```shell
$ layair-cmd compile
```

Or view help information ：

```shell
$ layair-cmd --help
```

Not only the **layair-cmd** itself, all the commands have version information and help information, but also look at the sub command help information:

```shell
$ layair-cmd command -h
```

Most of the **layair-cmd** commands required current working directory contains the **layaair** project, a few commands can be specified manually enter the directory, such as `guetzl`, `atlas`  command is that can be directly `$ layair-cmd atlas`, you can also specify the input directory.



## Compile

```shell
$ layair-cmd compile -h

  Usage: layair-cmd-compile [options]

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```

If the current directory has a **layaair** project, the command generates the compiled **JavaScript** file. Compilation only **ActionScript** , **TypeScript** and **JavaScript**.

#### use

```shell
$ layair-cmd compile
```



##  release

```shell
$ layair-cmd publish --help

  Usage: layair-cmd-publish [options]

  Options:

    -h, --help                      output usage information
    -V, --version                   output the version number
    -o --compressOptions <options>  Compress options. 'no' for no processing, 'c' for compress, 'cc' for compress and concat.
```

If the current directory has a **layaair** project, the command generates the published **JavaScript** file, and the published folder is called *release，* which can merge and compress files.

#### Use

```shell
$ layair-cmd publish -o cc # 指定了压缩选项为合并并压缩
```



## Export UI

```shell
$ layair-cmdui -h

  Usage: layair-cmd-ui [options]

  Options:

    -h, --help        output usage information
    -V, --version     output the version number
    -c --clear        clear will delete old ui code file.
    -m --mode <mode>  'normal' or 'release', specify 'release' will generate UI code files exclude unused resources.
```

If the current directory has a **layaair** project, the command exports the code for the UI page.

#### Use

```shell
$ layair-cmd ui -c -m release # 导出前清理，并且把mode设置为release
```



## Resource version control

**Resource version control**  is used to generate versions for resources. The version number defaults to increment from the number 1000. If the `--versionName` parameter is passed in, the user specified version name is used. Next time you build a version, if you don't specify the `--name` again, the version number is 1002, because every time the version is generated,  **resource version control** the internal version counter will increase.

When you build the version, the modified file or the new file will be recorded in the new version relative to the previous version. If there are no new files or no modified files, no new version will be generated.

```shell
$ layair-cmd resourceVersion -h

  Usage: layair-cmd-resourceVersion [options]

  Options:

    -h, --help                       output usage information
    -V, --version                    output the version number
    -i --input <input>               resource directory.
    -o --output <output>             output directory.
    -n --versionName <version name>  version name, default is numbers start from 1000.
```

This command does not require the current directory to contain the **layaair** project. Instead, you need to specify the input directory.



#### Use

```shell
$ layair-cmd resourceVersion -i input_dir -o output_dir -n 1.1.0
# 指定了输入目录、输出目录和版本名称
```



#### Generated files

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
$ layair-cmd atlas
```

This command is packaged with the parameters specified in the *packParam.json* file of the temporary directory, such as ` %userprofile%\AppData\Roaming\LayaAirIDE\` in **windows**. This file will be rewritten when you open different projects using  **IDE**. Therefore, using **layair-cmd** does not recommend this approach.



##### Specify packing parameters on the command line

**Atlas packing** many parameters are provided for the command, which can be specified directly on the command line, such as:

```shell
$ layair-cmd atlas -d . -o ./bin/res/atlas --textFormat png8
# 指定当前目录为输入目录
# 指定输出目录
# 指定导出png8格式图片
```

For more parameters, see the above table.



##### Using configuration files generated for projects

Using `init` parameters to generate configuration files:

```shell
$ layair-cmd atlas --init
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
$ layair-cmd atlas --config atlasConfig
```



## guetzli

**guetzli** is **google** an open source **jpeg** encoder for google. About its introduction, precautions, see the official https://github.com/google/guetzli。

**guetzli** compression process is slow, and it takes up a lot of resources, so it's possible to wait for some time.

It is best to use **guetzli** compression in the folder generated by the **Resource version control**, which ensures that you will not repeatedly compress a graph.

```shell
$ layair-cmd guetzli -h

  Usage: layair-cmd-guetzli [options]

  Options:

    -h, --help              output usage information
    -V, --version           output the version number
    -i --input <input>      resource directory.
    -q --quality <quality>  quality, more than 84.
```

This command does not require the current directory to contain the **layaair** project. Instead, you need to specify the input directory. After the compression is successful, the source file will be modified. The source file remains unchanged when the compression fails.

#### use

```shell
$ layair-cmd guetzli -i input_dir -q 95
# 指定了压缩率95
```



## Open the static file server

```shell
$ layair-cmd open --help

  Usage: layair-cmd-open [port] [args]

  Options:

    -h, --help      output usage information
    -V, --version   output the version number
    -p <port>       resource directory.
    -s              don't open browser
    -h <hostname>   with hostname, such as layair-cmd open -h localhost
    -d <directory>  with folder
    -f              enable html5 history
```

#####  use

```shell
$ layair-cmd open
# 带端口号
$ layair-cmd -p 8000
# 静默启动（不打开浏览器）
$ layair-cmd -s
# 使用hostname打开
$ layair-cmd -h localhost -p 8888
# 指定根目录
$ layair-cmd -d ~/git/anywhere
# enable html5 history
$ layair-cmd -f /index.html
```

This command needs to be used in a directory that has the same structure as the layaair project. For ActionScript projects, it will open static file servers in /bin/h5; for JavaScript and TypeScript projects, it will open static file servers in /bin.