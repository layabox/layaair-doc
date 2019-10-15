#Overview of Screen Adaptation API



With the increase of mobile devices (mobile phones, tablets, televisions), the degree of device fragmentation and screen fragmentation is also increasing. What we are going to discuss today is the screen fragmentation which has a greater impact on game display.

In order to get a deeper understanding of screen adaptation, let's start with the development of screen resolution in Iphone.

In earlier mobile devices, screen pixels were relatively low, such as Iphone3, which had a resolution of 320 x 480. On Iphone3, one pixel was equal to one screen physical pixel. Later, with the increasing pixel density of device screens, starting with the iPhone 4, Apple launched the Retina screen with a resolution of 640 x 960, doubling, but the screen size remained unchanged, which meant that on the same screen, the pixels were doubled, which was increased by device Pixel Ratio, similar to other Android mobile devices.

So we come up with a formula:`物理分辨率=像素分辨率*devicePixelRatio`;

The engine encapsulates the above two resolutions.

Device pixel resolution: Laya. Browser. clientWidth, Laya. Browser. clientHeight;

Device physical resolution: Laya. Browser. width, Laya. Browser. height;

Pixel Ratio: Laya. Browser. Pixel Ratio;

ClientWidth acquired by default from browser is not the pixel resolution, but the scaled resolution. To get the correct resolution, you need to set the viewport meta tag in the HTML page and the content value.“`width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no`".

In the LayaAir engine, if the page has not set the viewport tag, the engine automatically generates one to ensure the correct width and height.

Screen adaptation is used in every game. For mobile devices, especially the screen adaptation of mobile phones, how to implement the LayaAir engine, let's first learn about the relevant APIs“`laya.display.stage`"



##I. Setting of Scaling Mode for Screen Adaptation

There are seven zooming modes for screen adaptation. The related descriptions are shown in Fig. 1, Fig. 2 and Fig. 3.

​![图片](img/1.png)<br/>
Figure (1) Scaling mode for screen adaptation

​![图片](img/2.png)<br/>
Figure (2) Scaling mode for screen adaptation

​![图片](img/3.png)<br/>
Figure (3) Scaling mode for screen adaptation



##Setting of Alignment Mode

For alignment mode, it is the conventional horizontal alignment and vertical alignment. The relevant API parameters are shown in Figures 4, 5 and 6.
​![图片](img/4.png)<br/>
Figure (4) Screen alignment mode

​![图片](img/5.png)<br/>
Figure (5) Screen alignment mode

​![图片](img/6.png)<br/>
Figure (6) Attributes in alignment patterns



##3. Intelligent Adaptation Settings for Screen Direction

LayaAir engine can set up automatic horizontal screen or vertical screen according to the proportion of browser display, which is not affected by system lock screen. The relevant API settings are shown in Figures 7 and 8.

​![图片](img/7.png)<br/>
Figure (7) Screen orientation adaptation

​![图片](img/8.png)<br/>
Figure (8) Screen orientation adaptation



More about`laya.display.stage`For API instructions, please go to the API documentation to see: http://layaair.ldc.layabox.com/api/index.html? Category=Core&class=laya.display.Stage