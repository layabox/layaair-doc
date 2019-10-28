# LayaAir引擎放弃Canvas API，打造次世代3D引擎与云游戏引擎，提供AI赋能！


> 2019-04-28

LayaAir engine abandoning Canvas native API does not mean abandoning 2D, but for better development of 2D and 3D! So why give up the native API of Canvas and the future development plan of LayaAir engine? Let's talk with you here!

### **1. Poor performance of Canvas native API**

With the launch of Canvas, its API allows developers to quickly achieve dynamic effects, including making games. For a long time, HTML5 engines have been designed based on the 2D APIs of Canvas in browsers, but these APIs are not designed for high performance graphics rendering, so it also brings a problem that they can not meet the performance requirements of complex games. In order to achieve the image quality of APP, the game based on Canvas engine must be accelerated by Runtime plug-in to meet the performance requirements of the game. Even today, the performance gap between Canvas particles and WebGL particles is more than 100 times.

### **2. Compatibility with Canvas API will constrain engine functionality**

In 2015, when Layabox developed the second generation engine LayaAir, it took the lead in introducing a compatible model between WebGL and Canvas, and optimized the engine to a great extent. Therefore, the overall performance has been greatly improved. In the environment of supporting WebGL, without Runtime, it can also meet the performance requirements of APP-level games. In an environment that does not support WebGL, it will automatically switch to Canvas mode, which is compatible with Canvas mode.

Of course, compatibility comes at a cost, which limits the engine's functionality. For example, in WebGL mode, if you want to add some practical attributes to the texture in the engine, but Canvas native API does not support, you can not achieve compatibility between the two modes. Or you want to add custom shader to 2D, which needs to be discarded for compatibility. There are many application scenarios, not to mention one example. In short, in order to keep Canvas compatible with WebGL, the engine's ease of use and function expansion are constrained.

### **3. Embrace GPU Graphics API**

Once the upper Canvas 2D API is abandoned, the LayaAir engine will be able to design the development engine based on the underlying GPU graphics API without scruple, freeing the engine from constraints. Especially through the design of 3D space canvas, 2D and 3D scenes can be very friendly integration.

With the development of the times and the development of hardware devices, platforms that do not support WebGL environment are relatively rare. In addition, 3D can not run in Canvas mode, so for 3D games, compatibility with Canvas mode is of no value. So we weighed the advantages and disadvantages of compatibility with Canvas native API, and after careful consideration, we took the lead in discarding compatibility with Canvas native API.

Currently, in addition to reducing the overall engine size, abandoning the Canvas native API is insensitive to developers. Looking to the future, this will allow LayaAir to move towards a more free, powerful, easy-to-use, and widely applicable platform-wide game engine.

> In advance, Laaya Air 2.1 beta, which will be released in May, has completed the abandonment of Canvas's native API. If there are developers who need to be compatible with Canvas native API, use LayaAir version 2.1 or less.

### **4. Performance of Continuous Pressing Equipment**

Ultimate performance is always one of the cornerstones of LayaAir design and development. So, we will continue to squeeze device performance, in addition to the WebGL 1.0 currently supported by LayaAir, we are going to support WebGL 2.0 in the engine. And we have always been paying attention to WebGPU. Once WebGPU becomes mature, we will give engine support immediately.

On the performance optimization of engine functions, such as real-time rendering performance, skeleton animation model performance and so on, will continue to optimize and improve. In short, ultimate performance is the endless pursuit of the LayaAir engine!

# **5. Next Generation 3D Engine**

As we all know, besides performance, the maturity and leading edge of 3D is the biggest advantage of LayaAir engine. LayaAir engine will continue to invest more in 3D engine in the future. While enriching the engine's practical functions and enhancing the engine's usability, we focus on improving the rendering quality of the engine, such as the rendering effect of PBR material, multi-light source rendering and multi-light source shading effect, global lighting, delayed rendering, open post-process pipeline and post-processing effects such as HDR, SSAO and depth of field.

LayaAir engine positioning is a high-performance next-generation three-dimensional engine!

### **6,5G Cloud Game Engine and AI**

With the approaching of 5G era, cloud computing, 3D, AR, VR and AI are the most relevant to the game industry. As the engine side, layabox must take the first step, and has already launched the exploration and design of a new generation of cloud game engine.

One of the most obvious characteristics of 5G network is its fast speed. The download rate at Gbps level per second can undoubtedly make the engine do a lot of things. For example, we will put some pressure on hardware computing and rendering on the cloud, so that those low-performance 5G terminals, such as TV boxes, integrated computers, mobile devices, can run smoothly the next generation of 3D games with film-level picture quality without paying attention to the performance of the hardware itself.

5G era is an era of interconnection of all things. LayaAir engine will support all kinds of mainstream platforms in the future. After getting rid of the constraints of browser API, LayaAir engine pays more attention to the positioning of the whole platform engine. AR and VR are expected to develop at a high speed in the 5G era, and may even become the mainstream type. These are all supported by poor quality 3D engine. LayaAir engine can fully meet the R&D needs of AR and VR in the 5G era in the future. WebXR standards will be fully supported. Developers can use the products of LayaAir engine to login to famous platforms such as Steam.

Finally, I have to mention the AI module. AI is the trend of high-speed development of science and technology and social progress. Autonomous learning and automatic interaction enable players in the virtual game world to get more immersive experience. For example, game guidance, competitive play, basic social interaction, plot interaction and so on. Both are the pain points of the game, and the AI module is planned to become an optional feature of the LayaCloud framework in the future.

LayaCloud is a Server-Free game framework developed with LayaAir 2.0 engine. With this framework, we can easily create online games by using the server API provided by the framework without touching and managing the server. At present, the framework has provided APIs for user login and authentication, data storage and reading, creating and managing rooms, user matching and joining rooms, message broadcasting and frame synchronization, etc. Besides the AI module just mentioned, more networked server modules will be provided in the future. The goal is to enable developers to focus more on product business logic development, significantly reduce module development time, and reduce the threshold and cost of networking development.

### **7. Visual 3D Editing Tool**

In terms of visual 3D tools, we will maintain three main lines for a long time in the future. One line is the current plug-in mode based on Unity tools. Developers can edit 3D scenes by using the built-in materials of LayaAir plug-ins in Unity environment, and then export them for free through plug-ins.

Another line is LayaMaker, a programming-free 3D scene development tool released on April 26, which supports the visualization of interactive 3D products in specific industries (such as education). Users can easily get started without programming foundation at all. For more information about LayaMaker, click on the link to learn:[Layabox推出无编程3D教育制作工具LayaMaker，携手精锐教育集团进军新领域！](http://mp.weixin.qq.com/s?__biz=MzAxMjI4NjA1OA==&mid=2650584620&idx=1&sn=fcf341b4b53e1c3d4f8e500c75893a06&chksm=83bc3729b4cbbe3f52fd830e15be04e808ba43103113abef2474322979feae941731589f7fd2&scene=21%3Ch1%3Ewechat_redirect)

The third line is a visual 3D editing tool for LayaAir developers, which has been prototyped and was originally planned to be launched in 2.0. Because we have not achieved our expected goal, temporary shielding and satisfactory reconstruction will be introduced in the future with a more suitable visual 3D editing tool for LayaAir engine.

### **8. Switching Engine Development Language to TypeScript**

Although LayaAir engine supports AS3, TS and JS to develop products, the engine itself has always been based on AS3 language development. The core reason for supporting our language change is that the AS3 language has long been out of maintenance and can not support the new features of modern programming languages. To make the engine more user-friendly, the LayaAir engine plans to change the engine development language in the near future. This is imperceptible to the majority of developers, because developers can still use AS3, TS, JS to develop products. But in the long run, TS is more friendly to new features, LayaAirIDE support, and efficient development, so we recommend that developers try to use TS as the preferred development language when creating new projects.

Changing the engine development language is just a decision made by our engine developers based on the pursuit of the ultimate engine. This is an attitude!

### **9. Further Opening LayaAir Engine**

The LayaAir engine has been hosted on Github, but not based on Github. Only when the official website is updated every month will it be updated synchronously. In the future, the LayaAir engine development team will enhance the activity of Github. The engine will be developed based on Github on the public network, and the latest code will be submitted to Github at any time, so that more non-Layabox team elites can participate in the development of the LayaAir engine.

For developers who participate in LayaAir engine code submission, once the code is adopted, they will receive Layabox cash incentives. It also invites active contributors to join the LayaAir Global Development Group and participate in important technical decision-making discussions on the LayaAir engine.

###Write at the end

In the future, LayaAir engine will maintain the optimization and stability of 2D, focusing on the development of next generation 3D engine. For the ultimate pursuit of technology, we have never stopped. For the ease of use of products, we have had shortcomings. From LayaAir 2.0 onwards, we will always maintain sufficient attention and constantly improve the optimization. Every small step we take is inseparable from the support of the vast number of developers. Thank you for your support. Welcome friends to forward friends circles or Wechat groups, so that more developers can learn about our latest technological developments.