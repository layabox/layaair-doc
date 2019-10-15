@- 1,271+0,0@@

#Layaair-cmd

[TOC]

**Layaair-cmd**yes**Layaair**The command line tool, which can be used**Layaair-cmd**Not open**IDE**In case of**Layaair**Compile and publish the project. It contains the following functions, which correspond to a subcommand.

| Function | Subcommand|
| ------------------------------------------------------------------------------------------------------------------------------------ -|
| Compile | compile|
| Publish | publish|
| Export UI | ui|
| Resource Version Control|
|Use guetzli to compress jpg | guetzli|
| Open static file server | open|



##install


```shell

$ npm install layaair-cmd -g
```




##CLI

**Layaair-cmd**The commands are similar**Git**Commands, in the form of:


```shell

$ layaair-cmd [command] [args]
```


For example, compile projects:


```shell

$ layaair-cmd compile
```


Or view help information:


```shell

$ layaair-cmd --help
```


Not only**Layaair-cmd**In itself, all subcommands have version information and help information to view subcommand help information:


```shell

$ layaair-cmd command -h
```


**Layaair-cmd**Most subcommands need to be included in the current working directory**Layaair**Items, a few commands can specify input directories manually, such as`guetzl`,`atlas`Orders are direct.`$ layaair-cmd atlas`You can also specify the input directory.



##Compile


```shell

$ layaair-cmd compile -h

  Usage: layaair-cmd compile [options]

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```


If the current directory has**Layaair**Project, which generates compiled**JavaScript**Papers. Compile only**ActionScript**and**TypeScript**Project needs, if yes**JavaScript**Do nothing.

####Use


```shell

$ layaair-cmd compile
```




##Release


```shell

$ layaair-cmd publish -h

  Usage: layaair-cmd publish [options]

  Options:

    -V, --version                   output the version number
    -o --compressOptions <options>  压缩选项。留空不处理，'c'表示压缩，'cc'表示压缩并合并
    -n --versionName <name>         version name
    --noCompile                     不重新编译项目
    --noUi                          不重新生成UI代码文件
    --noAtlas                       不重新生成图集
    -h, --help                      output usage information
```


If the current directory has**Layaair**Project, which generates the**JavaScript**File. The published folder is under * release *.

####Use


```shell

$ layaair-cmd publish -o cc # 指定了压缩选项为合并并压缩
```


##Export UI


```shell

$ layaair-cmd ui -h

  Usage: layaair-cmd ui [options]

  Options:

    -V, --version     output the version number
    -c --clear        clear will delete old ui code file.
    -a --atlas        generate atlas
    -d --code         generate ui code files
    -m --mode <mode>  'normal'或者'release'，指定'release'会生成除未使用资源外的UI代码文件
    -h, --help        output usage information
```


If the current directory has**Layaair**Item, which exports UI-related files for UI pages.

####Use


```shell

$ layaair-cmd ui -c -m release # 导出前清理，并且把mode设置为release
$ layaair-cmd ui -d # 导出UI代码文件
$ layaair-cmd ui -a # 导出图集文件
```




##Resource Version Control

**Resource Version Control**Used to generate versions for resources. The version number increases by default from the number 1000 if passed in`--versionName`The user-specified version name is used for the parameter. Next time you create a version, if you don't specify it again`--name`The version number is 1002, because each version is generated.**Resource Version Control**Internal version counters are incremented.

When building a version, the modified or added files will be recorded in the new version as opposed to the previous version. If there is no new file or no modification, no new version will be generated.

> In the final use of resources, the upper relative path is not allowed, that is, the path contains "...".


```shell

$ layaair-cmd resourceVersion -h

  Usage: layaair-cmd resourceVersion [options]

  Options:

    -h, --help                       output usage information
    -V, --version                    output the version number
    -i --input <input>               资源目录
    -o --output <output>             导出目录
    -n --versionName <version name>  版本名称，默认是从1000开始递增的数字
```


This command does not require the current directory to contain**Layaair**Projects, instead, you need to specify the input directory.



####Use


```shell

$ layaair-cmd resourceVersion -i input_dir -o output_dir -n 1.1.0
# 指定了输入目录、输出目录和版本名称
```




####Generated files

> 1000
>
>> Resources...
>
> 1001
>
>> Resources...
>
> 1002
>
>> Resources...
>
>.Record
>
> manifest.json



####Resource version

A folder named * 1000 *, * 1001 *, * 1002 * is the default resource version name, which holds the resources whose corresponding version has been modified. According to the latest version number of each resource obtained from * manifest. JSON *, the corresponding version resource of * manifest. JSON * is read from these folders.



####Record record file

*.record* in**Unix-like**The system is a hidden file. This file holds the latest version creation information.**Resource Version Control**To determine which files were modified when a new version was created. This file cannot be deleted. If this file is lost, the previous version will be lost, which is equivalent to restarting the version.



####Manifest. JSON resource list

Users get the latest resources according to * manifest. JSON *. This file contains resource key-value pairs:


```json

{
    "res1": "1000",
    "res2": "1000",
    "res3": "1002",
    "sub\\res3": "1000",
    "sub\\res4": "1000"
}
```


After the user obtains the corresponding version number of the resource from the mapping, he uses the`资源根目录/版本号/相对文件路径`Get the URL of the resource, load and use it.



####Resource version switching

Because * manifest. JSON * saves the version number of each version of the file. So you only need to keep the history * manifest. JSON * to use the resources of the corresponding version.


##Guetzli

**Guetzli**yes**Google**Open source**JPEG**Encoder. For its introduction and notes, see the official https://github.com/google/guetzli.

**Guetzli**The compression process is slow and resource intensive, so it may take some time.

Best in**Resource Version Control**Use in the generated folder**Guetzli**Compression, which ensures that a graph is not compressed repeatedly.


```shell

$ layaair-cmd guetzli -h

  Usage: layaair-cmd guetzli [options]

  Options:

    -h, --help              output usage information
    -V, --version           output the version number
    -i --input <input>      resource directory.
    -q --quality <quality>  quality, more than 84.
```


This command does not require the current directory to contain**Layaair**Instead, you need to specify the input directory. After successful compression, the source file will be modified. If compression fails, the source file remains unchanged.

####Use


```shell

$ layaair-cmd guetzli -i input_dir -q 95
# 指定了压缩率95
```




##Open static file server


```shell

$ layaair-cmd open -h

  Usage: layaair-cmd open [port] [args]

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
    -p <port>      resource directory.
    -s             don't open browser
```


The command needs to be in the**Layaair**The project has the same structure used in the directory. about**ActionScript**Project, it will open the static file server at *. / bin / h5*; for**JavaScript**and**TypeScript**Project, it will be in**./bin**Open static file server;