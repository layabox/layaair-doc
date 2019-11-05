#LayaAir Engine Quickly Upper Finger Guide



The biggest problem for many novice developers is learning ideas. Faced with a new technology, if you do not know how to start, this is the most headache. This article provides some ideas for self-learning, which can be used as a reference. Developers with strong self-learning ability can skip this article and view the official website engine examples and APIs directly.



 



##Step 1: Choose the development language

Since the LayaAir engine supports ActionScript 3 (AS3), TypeScript (TS), JavaScript (JS), which language is better? Frequently confused newcomers who have just touched the engine. In fact, developers are more familiar with which language can be developed in which language, the API and performance of the engine are exactly the same.

It should be noted that JS language is easier to use, but as a weak type language, it is not as difficult to develop and debug as TS and AS3, which can detect type and grammar language in IDE, as well as the management of large-scale projects and multi-person collaboration. When the code is more and more, once JS accidentally writes incorrectly, there will be no hint in the IDE. Only when running, problems will be found. Often, developers spend a lot of time and cost in order to find a small error. So although it supports the development of JS language, it is not recommended to use this language as the development of medium-sized or large-scale projects.

As for the AS3 language, if you are very familiar with AS3 and do not need some new features of ES6, you can continue to develop in AS3 language. AS3 in FB and FD super development experience is not much to say, AS3 developers should know, do not know and do not need to know, can use TS. Finally, the advantage of AS3 is that LayaAir engine is also developed in AS3 language. The engine libraries of TS and JS are compiled in AS3 language. From the engine structure, AS3 is the best, when it comes to engine-level search. Projects that adopt AS3 are definitely more efficient, and the main disadvantage is that they can't support new JS features. Therefore, we do not fully recommend this language as the preferred language.

If you are not an AS3 programmer, we recommend TS as the preferred development language. There are two main reasons. The first is that TS supports new features of JS including ES6. The second is that TS can be developed friendly in LayaAirIDE, and can perform real-time syntax and type checking. The friendliness of AS3 in Laya AirIDE is far less than that of FB and FD.

Finally, I want to say that engine APIs are the same, language differences are not so important, the core is the experience of using and developing engine APIs. Don't be afraid of the choice of language, because you only need to learn the basic rules of language, language learning switching is very fast. Therefore, you developers can choose any language development supported by LayaAir engine according to the needs of the project.



 



##Step 2: Get ready for the development environment

If you are a TS and JS developer, just download LayaAir IDE, because LayaAir IDE integrates visual game development environments such as code debugging, UI editing, animation editing, particle editing and so on. If you are an AS3 developer, Flash Developer or Flash Builder is recommended as a more sophisticated tool for code writing. These two tools are the mainstream AS3 code editor, Flash Builder is more powerful from the aspects of grammar error correction, supporting Mac Apple system, but the tool installation package is very large, and belongs to the charging software. Flash Develop is lightweight, only tens of megabytes, and it's free software, but you need CrossOver to run on Apple.

Because the compiler environment needs to be configured for the development of TS or AS3, and the project code is compiled into JS code to run when the product is released, the developers of these two languages need to do some extra preparations.



##Step 3: Write the first LayaAir engine program "Hello Layabox";

Learning to write "Hello world" has become an international practice. LayaAir engine learning is no exception. When you see the first LayaAir engine program "Hello Layabox" displayed, it will not only bring a sense of success, but also show that your development environment configuration is no problem.



##Step 4: Experience the full Laaya Air example

After the text display of Hello Layabox is completed, we need to know about other APIs, but it is not recommended that novices go directly to APIs. Why? By simply looking at API documents to brain-fill the use of methods, new developers will feel more content and boring. Therefore, I recommend that you go to the official website developer center to experience and study all the online examples of LayaAir engine. In the process of experiencing the engine example, the API appearing in the example is deeply understood and the API document is opened for learning. Even if developers have limited time and can't fully delve into the APIs in each example for the time being, they need to look at the examples first, at least to know which engine examples are available and what functions can be implemented. Because the engine online example provided by the official website contains the engine API commonly used in game development. So when the experience completes all the examples, you will have a basic understanding of the API of the LayaAir engine, and you will have a good idea when you develop the game.

Additionally, in the code area of the engine example, the JavaScript version provides online editing and execution functions. You can learn and experience directly in browsers, other development languages or you want to experience engine examples in your local development environment, or you can go to GitHub to download the sample source code.



 



##Step 5: Learn the Tool Chain of LayaAir Engine

After experiencing and researching engine examples and APIs, you can actually use code tools to develop game functions directly. But for more complex games, if you want to be good at it, you must first use the right tools. Learning to master some visual development tools is the only way to greatly improve the efficiency of development. As a visual integrated development environment, LayaAirIDE includes UI editing, animation editing, particle editing, scene editing, etc. besides coding, which is recommended first.

Secondly, third-party support for LayaAir engine. Layabox has listed some mainstream tools to support LayaAir engine. These third-party tools form a powerful tool chain with LayaAirIDE, which enables developers to develop various types of games efficiently without worrying about the tool chain when using LayaAir engine. Here we will not introduce one by one. We recommend several third-party tools. The first is Spine, the editor for skeletal animation, the second is Tiled Map, and the third is Unity3D.



##Step 6: Debugging learning projects

Project debugging itself is not a difficult point, but some developers who have just come into contact with H5 development often raise various questions about project debugging. In the "2D Advanced Chapter" of LayaAir Technical Document, the debugging methods in the development environment and release environment will be introduced and explained.



##Step 7: Learn and memorize performance optimization principles

At present, the hardware performance of mobile devices is far inferior to PC hardware, especially the market share of low-end models is not low. Then engine performance optimization will become a very important choice factor. Does that mean that if you choose a high performance engine, the project will not have performance problems? That's not the case. Because engine optimization only provides a ceiling for project performance.

If the performance of the engine is not good, how to optimize the project can not break through the ceiling, leading to the end of the project development. It can only run on the model with excellent performance. At that time, if we change the engine or change the engine, the cost and cost will be very high. However, the engine performance can clearly achieve the fluency of APP level, if the process of project writing is not optimized or the wrong use of the engine. That's still the possibility of Carlton's problem. Therefore, after we learn the foundation of engine, we must carefully read the article of performance optimization, memorize the methods of performance optimization, and skillfully use them in the process of project preparation.



 



##Step 8: Validate learning outcomes with small games or projects

After learning all the documents in the above steps, developers with experience in game project development can use project practice to verify the results of learning. For developers who haven't recently established a game project or have no experience in game development, it is suggested that the learning results should be validated by fully experiencing the development process of a small game in a practical way.

Tencent classroom teaching has video teaching of small game development.

Tencent Classroom:[https://layabox.ke.qq.com/](https://layabox.ke.qq.com/)



##Step 9: How to Get Official Technical Answers and Guidance

In the process of developing practice, developers who are not very familiar with engines will inevitably encounter various engine usage problems. How can they get answers as soon as possible? First of all, don't ask questions directly in the QQ group, because when there are more messages in the QQ group, the questions are easily submerged, and will cause similar questions to be answered repeatedly. Our positioning of QQ group is also a self-help communication between developers and BUG feedback reminder.

We recommend that developers search in the Question and Answer Community (ask. layabox. com), and whether similar issues have been raised or resolved. If there are no similar questions, you can create questions in the community and describe them in detail. The more detailed information you provide, such as code, screenshots, phenomena of the problem, the better to minimize communication costs.

Our core positioning for the community is BUG feedback and processing, so developers have a reproducible BUG, which can be packaged and uploaded to the community. Official technical support personnel will give priority to the BUG issues in the community, and ensure that every BUG question will be answered. Of course, after asking questions, they can also paste the questions in the community into the developer group. And @Administrator.

Questions that have been answered but need to be followed up are easy to be missed due to the large number of community problems. At this time, the developers need to follow up actively, ask again in the original questions in the community, and check whether the questions are clearly described and uploaded with a reproducible DEMO, or paste the questions links in the community into the developer group and @administrator.

In the process of learning, if there are high-speed network conditions, we recommend that you look at video tutorials, follow-up operation throughout the process, will be more intuitive and easy to understand.

Video address:[https://layabox.ke.qq.com/](https://layabox.ke.qq.com/)