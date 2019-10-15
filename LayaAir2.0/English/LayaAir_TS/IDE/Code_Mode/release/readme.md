# 项目发布2.0详解

> author: Charley version: LayaAir IDE 2.0.0 official update: 2019-1-16

The publishing function of Project menu is a very core function, which is usually used for JS merging, JS compression and confusion, picture compression, version management, adaptation of different game platforms, etc. The function of project publishing is usually used when the project is completed, or the development is completed in stages and ready for submission to the production environment for testing.

![1](img/1.png)   


(Fig. 1)



In the project menu, the interface to open the project publishing function is shown in Figure 1, which will be introduced one by one below.

###1. Publishing Platform

There are currently four options in the publishing platform, namely web/Native, Wechat games, QQ games and Baidu games. As shown in Figure 1.

`web/Native`Published as HTML5, running in browser environment or LayaNative APP environment.

`微信小游戏`It refers to the project published as an adapted Wechat game, which can run in the Wechat developer tool (related documents about the Wechat game can be read).

`QQ轻游戏`It refers to the light game project published as mobile QQ (once called play), which runs in the light game platform of mobile QQ.

`百度小游戏`It refers to the project that has been released as an adaptation of Baidu mini-games, and the released project can run in Baidu developer tools (about Baidu mini-games can read relevant documents).

###2. Source Catalogue

The source directory is the published version file.**Source directory**By default, the bin directory is unchanged.

###3. Publishing Directory

Publishing directory is to be published to**Target directory**By default, in the release directory, you can either target the project or a directory unrelated to the project.

###4. Whether to recompile the project

Check if the developer is worried that the released code is not the latest code because he forgot to compile it.`是否重新编译项目`After checking, the project is compiled before the release process is executed at each release. Errors can be avoided after project release due to forgetting compilation.

###5. Wechat/Baidu Open Data Domain Project

The default entry files of small game open domain projects such as Weixin and Baidu are different from those of the main domain, so check`是否为微信/百度开放数据域项目`After that, the problem of entry will be handled automatically, without the need for developers to handle it manually after each release. Greatly increased the developer's ease of release of small games.

####Whether to merge all JS files in index. HTML (web version)

After checking, JS in index. HTML are analyzed and all JS in index. HTML are merged into one JS.

> Based on the special mechanism of Weixin small game, the small game must be selected, so the item is not displayed in the release of the small game.
>

###6. Copy only JS files referenced in index. HTML

After checking, copy only the JS engine library files referenced in index. HTML to the LIBS directory of release. Otherwise, all the unused things under LIBS will be copied.

###7. Compression of resources

####Exclusion compression

To exclude some directories or files from the source directory, if there are more than one, use semicolons.`;`Separate.
Note: Compression exclusion is only used to exclude directories related to compression

####Compression of PNG

After checking, PNG resources will be compressed, quality can be controlled by parameters, the default value at the time of publication, if developers feel that the effect has not reached the goal, they can adjust their own attempts.

####Compression of JPG

After checking, JPG resources will be compressed, quality can be controlled by parameters, the default value at the time of publication, if developers feel that the effect has not reached the goal, they can adjust their own attempts.

####Compression of JSON

After checking, it's not just JSON suffixes. By default, it lists some common JSON file formats that may need to be compressed (e.g. json, atlas, ls, lh, lmat, lav). If the suffixes meet these ranges, compression will begin. If there is no need to compress the suffix format, you can remove the suffix directly.

####Whether to confuse compressed JS

After checking, JS will be compressed and confused.

###Version Management

####Whether version management is enabled

When this option is checked, version management is enabled.

When a developer has version management enabled, the file name with hash strings will be automatically generated at publication time, and a version. JSON file name mapping file will be generated at the same time. Automatically associate the actual file name in the code with the renamed version management controlled file through the version management class ResourceVersion. As long as the file with version management is changed, the hash string in the changed file name will be updated automatically when it is released. This is equivalent to calling a new file in the running environment, so there will be no caching problem.

In the process of development, developers do not need to pay attention to what the final file name generated by version management is. Even since LayaAirIDE 2.0 automatically integrates version management class ResourceVersion into the code when creating a project, developers don't even need to pay attention to how to use the ResourceVersion class. They just need to check whether to enable version management in the project release interface when they plan to enable version management.

####Whether to delete old resource files

When version management is enabled, even if a file changes and a new version file is generated, the old version file is retained by default.

`勾选是否删除旧的资源文件`After the option, when a file changes, the old version file is deleted while the new version file is generated.

###9. File Extraction

The main purpose of the file extraction function is to facilitate the extraction of local packages in small games.

####Replication Selection List

click`复制选择列表`The right browse pops up the structure tree of the bin directory. The developer checks the code or resources to be used in the local package. click**Determine**After that, the selected directories and files are saved to facilitate the publishing tool to filter and copy the specified local package content.

####Where to Copy Files

click`复制文件到哪`Right browse can specify a directory, as a small game project directory, just`复制选择列表`The extracted local package content is copied to the directory specified here.

####Follow-up execution script

This specifies a file that can be executed directly from the command line (for example, exe or bat under windows), which will call the executable specified here at publication time.

Where is it specifically used? For example, some developers think that the compression function of IDE is not working well. You can write a program by yourself or find an executable program from the command line on the Internet. Called directly at publication time. Instead of checking use IDE's own compression function.