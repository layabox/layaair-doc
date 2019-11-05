#Embedded font

##1. Introduction to fonts

Because of the variety of Android devices and the different font files of Android, the default Chinese font paths of each system are different (and many domestic manufacturers customize individually), reading font. TTF is a difficult problem.

LayaNative's strategy is to enumerate the path of the font file according to Android's version number. If the loading is successful, the default font will be used. If the loading is unsuccessful, a font will be downloaded from LayaBox website and stored locally. When entering the second time, the local font will be read directly.

Developers can pack fonts into apps by default when packaging apps to avoid downloading 4MB TTF fonts on the network for the first time on some special devices, affecting the user experience.

##2. How to embed fonts

1. Build the Android project, find the assets directory, create a font directory, rename the font file to be implanted as "layabox. ttf", and put it in the directory. As shown in Figure 1:

![图1](img/1.jpg)


**Tips:** 

The default for template engineering is to have TTF fonts embedded, which will increase the size of the apk. If you care more about the size of the apk, you can delete the font file assets / font / layabox. ttf.

##3. iOS Embedded Font

1. LayaNative supports iOS embedding default fonts by creating font directory under resource and renaming the font to layabox. ttf, as shown in Figure 2 below.

![图2](img/2.png)