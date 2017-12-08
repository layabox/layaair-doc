
# Embedded font

## 1. Font introduction

Due to the wide variety of Android devices, android font files are not uniform, the default Chinese font path of each system is different (plus many domestic manufacturers customize), so reading font.ttf is a difficult problem.

The strategy is based on the LayaPlayer system version number Android, path enumeration of the font file, if loaded successfully, use the system default font,if unsuccessful loading from the LayaBox website to download a font stored locally, the second entry, direct Read the local font.

Later versions of LayaPlayer-0.9.5, developers can package the fonts into app by default when they pack app, avoiding the need to download 4MB TTF fonts on the network, affect user experience on some special devices.

## 2. How to embed fonts

1. Build a good Android project, find the assets directory, create a font directory, and put the font file to be implants, renamed “layabox.ttf”. As shown in Figure 1:

![图1](img/1.jpg)

2. Only LayaPlayer-0.9.5 and later versions are supported.

3. LayaPlayer-0.9.5  later version, template engineering default is embedded TTF font, which will lead to apk volume increasee.  if you are more concerned about the size of apk,  you can assets/font/layabox.ttf font file.

## 3.iOS embedded font

1. LayaPlayer-0.9.7 later versions support iOS to embed the default font. With the specific way is to create font directory with resource under Android and rename the embedded font to layabox.ttf, as shown in Figure 2 below :   


![图2](img/2.png)




