#Build a development environment (TS code compiler)

>*Author: Charley version: 2.0.1 update: 2019-4-8*

Because LayaAirIDE needs to install the TypeScript compilation environment, this article is used to guide the installation of the compilation environment. When there is a problem with the compilation environment, read the reference. If it has been installed, there is no need to repeat the installation.

##1. Download and install Node environment

####1.1 Check if node.js environment is installed

Developing with TypeScript requires a Node.js environment. If not installed, go to the official download (LTS version is recommended).

Before installation, if you are not sure whether there is an existing environment, you can first confirm whether the node environment has been installed, open the command line tool (windows is cmd), and enter instructions.`npm -h` 


```

npm -h
```


After pressing the Enter key, if you can see the NPM command description, version number, installation path and other information, as shown in Figure 1-1 (similar information can be), then the instructions have been installed, if not affecting the use, you can skip the steps of downloading and installing the node environment.

![图1-1](img/1-1.png) 


(Fig. 1-1)



####1.2 Node.js Official Website Download

If there is no installation environment, just go to the node official website to download and install. The recommended version of LTS is shown in Figure 1-2. The URL address is:[https://nodejs.org/en/](https://nodejs.org/en/)

![图1-2](img/1-2.png)(Figure 1-2) The above figure is only for reference. Open the link and download the LTS version directly.

> Note: The default link is window (x64), which is not a 64-bit computer. You can click Other Downloads to download the corresponding version.

####1.3. Install Node.js

Find the Node.js installation package you just downloaded and install it step by step. The interface when the installation is complete is shown in Figure 1-3.

![图1-3](img/1-3.png)<br/> (Fig. 1-3)

After the installation is complete, you can enter it from the command line in the way described in section 1.1.`npm -h`Check the installation status.



##2. Install the TypeScript environment with the NPM command

Now that the Node environment is okay, you can install the TypeScript compilation environment using npm.

####2.1 Download and Installation

Enter instructions directly into command line tools“`npm install -g typescript`Press the Enter key, as shown in Figure 2-1, to download and install the TypeScript environment. At this time, you must keep the network open.


```typescript

npm install -g typescript
```


![图2-1](img/2-1.png) <br/>

(Fig. 2-1)

If a developer encounters Figure 2-2 when installing, it is usually caused by a cache conflict. (skip this step directly if you don't encounter it.)

![图2-2](img/2-2.png)

(Fig. 2-2)

At this point, you can use the cache cleanup command`npm cache clean --force`Enter to execute the command and re-enter the installation instructions.


```

npm cache clean --force
```




####2.2 Installation Completed

When we see "-- typescrip@version number", we can confirm that the installation of the TypeScript environment has been completed, as shown in Figure 3-1, just close the command line tool.

![图3-1](img/3-1.png)
(Fig. 3-1)

The TSC directory in Figure 4 is the installation directory of our TypeScript compilation environment. With this, LayaAirIDE can compile TypeScript into JavaScript through this Compiler.

####2.3 Check the version of the TypeScript compilation environment

Enter the "tsc-v" command on the command line to view the current version of TypeScript compilation, as shown in Figure 3-2.


```typescript

tsc -v
```


![图3-2](img/3-2.png)  


(Fig. 3-2)

If the publication number is displayed, the TypeScript Compiler (tsc) installation is also successful.

> The actual version number in the figure is the latest screenshot, only for reference, so it is inconsistent with the previous version of the screenshot installed.