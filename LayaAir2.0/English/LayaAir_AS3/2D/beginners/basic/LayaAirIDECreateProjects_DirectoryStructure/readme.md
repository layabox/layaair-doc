#Creating AS3 Project with LayaAirIDE and Detailing Directory Structure

>* author: Charley version: LayaAirIDE 2.0.0* update: 2019-02-18

Although it is currently recommended that AS3 developers develop HTML5 projects for LayaAir engines in Flash Develop and Flash Builder environments. However, it is recommended to create a project through layaairide first, and then open editing through flash development or flashbuilder. Creating projects through LayaAirIDE creates a clear directory structure by default. Let's start with the Laya air ide tool to create the AS3 empty project, lead you to create the project and introduce the structure of the project.



##I. Download and install LayaAirIDE

Using LayaAir IDE and LayaAir engine, you need to add engine logo to any visible position in the game: Powered by LayaAir Engine.
For those who carry the engine logo, they can use it free of charge. Otherwise, they need to contact Weichat 2-D code in the download terms to get payment authorization.

After accepting the terms, you can download and decompress them. The IDE is a green version without installation. The IDE already contains the corresponding engine version without additional download.

LayaAirIDE 2.0 Download Address: https://ldc2.layabox.com/layadownload/?Type=layaairide



##II. Creating AS3 Project with LayaAirIDE

####Step one:

Open LayaAirIDE and click`新建`Icons or text, as shown in Figure 1, can enter the new project interface.

![图片](img/1.png)  


(Fig. 1)



####Step two:

Choice`LayaAir 2D示例项目`After filling in the project name, project path, and selecting the programming language and engine version, click“`创建`” A new empty project can be established. As shown in Figure 2.

![图片](img/2.png) 


(Fig. 2)

####Additionally, there are options:

The following two options can be checked or unchecked, and developers can choose by themselves after understanding the function.

#####1. Quick debugging of bin directory in Weixin/Baidu mini-games

After checking this option, when creating the project, the project files of Weixin and Baidu will be created under the project debugging directory (bin), so that when Weixin or Baidu game development tools debug the project, the bin directory can be directly designated as the local debugging directory. This saves a lot of time for frequent debugging, because the official version of debugging will release only exported local packages, each export requires a certain release time, which will affect the efficiency of debugging and development.

#####2. Adding FB/FD Project Document

LayaAirIDE is an indispensable integrated development environment for LayaAir engine. But for the old programmers of AS3, the IDE coding mode is far less friendly to AS3 than Flash Builder (FB) and Flash Develop (FD), so AS3 defaults to check this item, after checking this item, it will create both FB and FD projects while creating IDE project files, which will facilitate the project import of FB and FD development environment.



####Step three:

After clicking "Create", you can see the structure of the project. The project folder structure is shown in Figure 3.

![图片](img/3.png) 

(Fig. 3)

So far, we have successfully created an AS3 project project.

*Tips:*

> For developers new to the LayaAir engine, we recommend creating sample projects to quickly understand the complete project structure. Of course, you can try to create other project types at the beginning of development.



##3. Introducing the project structure

Next, we will introduce the role of each directory in conjunction with the project structure created in the previous section.

###3.1 Project Configuration Directory (.laya folder)


 `.laya`The folder contains some configuration information of the project in development and operation, as shown in Figure 4.

![4](img/4.png) 


(Fig. 4)

#### `compile.js`Document introduction

`compile.js`Gulp is a script file that customizes the compilation process of gulp. If the developer is familiar with gulp, he can modify it. Otherwise, don't move here.

#### `launch.json`Document introduction

`launch.json`The file saves some configuration information of project debugging, which are LayaAirIDE debugging configuration and Chrome browser debugging configuration. Don't change it easily, it will affect the debugging of the project.

#### `layajs`And`layajs.exe`Document introduction

`layajs`And`layajs.exe`They are compilers for AS3 compiling js, layajs for Mac environment, layajs. exe for win environment. At the same time, the reservation is for multi-environment mixed adaptation in the mode of multi-person development cooperation.

#### `publish.js`Document introduction

`publish.js`Gulp is a script file for a project. Developers don't move here.

#### **Other instructions**

Some configuration files do not exist by default, but they are also saved to the. Laya directory when they are published. For example, the web version, Weixin, Baidu and other small games, will be released after each different type of survival of different JSON configuration files, such as wxgame. JSON is Weixin small game release configuration files, bdgame. JSON is Baidu small game release configuration files.

The old version of the release configuration file is called pubset. json.

All of these people have some understanding, usually, developers do not need to modify. Therefore, there is no need to understand in depth.



###3.2 output directory of the project (bin)


 `bin`The directory holds the output files of the current project. As shown in Figure 5.

![图5](img/5.png) 


(Fig. 5)

This directory is used to store the project running files such as js, HTML, game resources, etc. output from the project, as well as the game project files (if the quick debugging option of the game is checked when creating the project).

The default layaAir debugging or chrome debugging is to run the files in that directory.



###3.3 UI project directory (laya)

`laya`The directory is used to store LayaAirIDE's current UI projects.

![图6](img/6.png) 


(Fig. 6)

####"`assets`Catalog

Used to store the components pictures, audio files and other resources needed in UI scenarios.

####"`pages`Catalog

Used to store IDE scenarios, animations, presets and other configuration files.

####"`.laya`Document

Note that this. Laya is a file, not a directory, and the. Laya file is the UI project configuration file of LayaAirIDE.



###3.4 Project Library Directory (libs)

"`libs`”The directory is the Library Directory of the project, which is used to store the layaair library files used by the project.

LayaAir Engine Library File Specific Directory Existing in AS Language`libs/laya/src`Next. As shown in Figure 7.

![图7](img/7.png)(Fig. 7)



###3.5 Project Source Code Directory (src)

The source code files used in the project (AS3 language project is. as file) are stored in the SRC directory by default.

What needs to be said in particular is that`ui`Directory, which belongs to IDE automatic generation, developers do not change here, change will also be replaced by the next export. So don't store your own code in this directory, and don't modify the existing code.

Other developers can plan their own directory structure according to their actual needs. The source code project structure of the sample code is shown in Figure 8.

![图8](img/8.png) 


(Fig. 8)



###3.6 Project Profile

![图9](img/9.png)  


(Fig. 9)

####  `项目名.laya` 

In Figure 9`2D_DEMO_190218.laya`Is the project configuration file of the layaairide project, which records the project name of the current project, the version number of the class library used, etc.

For example:


```json

{"proName":"2D_DEMO_190218","engineType":1,"proType":0,"layaProType":1,"version":"2.0.0"}
```


#### `项目名.as3proj`

In Figure 9`2D_DEMO_190218.as3proj`The file is the project configuration file for the Flash Development project. When developing AS3 project with Flash Develop editor, in Flash Develop tool, you can find the project name in the menu bar by "File" - > "Open". The directory where as3proj is located.

#### `.actionScriptProperties`Document and`.project`file

`.actionScriptProperties`Document and`.project`The file is the configuration file for the Flash Builder project. When using Flash Builder, import the AS3 project created by LayaAirIDE through the menu bar "File" - > "Import Flash Builder Project".

#### `语言版本config.json`

In Figure 9`asconfig.json`Store the compilation configuration information of IDE, do not delete it.



###3.7 Publishing Directory

The publishing directory does not exist by default. You need to click the publishing button to generate the corresponding version directory after publishing the project, as shown in Figure 10. (There is a special publishing function documentation, not detailed here)

![图10](img/10.png) 


(FIG. 10)

The directory structure shown in Figure 10 is the corresponding released version directory.



###Concluding remarks

So far, the basic content of project creation has been introduced, if you want to know more about the introduction of IDE or IDE design patterns, you can see the IDE chapter.