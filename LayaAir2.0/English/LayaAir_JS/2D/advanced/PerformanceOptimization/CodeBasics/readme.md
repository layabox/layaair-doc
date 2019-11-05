#Runtime code execution Fundamentals

​

LayaAir engine supports AS3, TypeScript, JavaScript development, but no matter which language is used, the final execution is JavaScript code. All the pictures we see are drawn by the engine. The update frequency depends on the FPS specified by the developer. For example, if the frame frequency is 60FPS, the execution time of each frame is one-sixtieth of a second. Therefore, the higher the frame speed, the more fluent the visual sense, and the 60 frames are full.

Since the actual operating environment is in the browser, the performance also depends on the efficiency of the JavaScript interpreter. The specified frame speed of FPS may not be achieved in the low performance interpreter, so this part is not decided by the developer. What the developer can do is to improve the frame speed of FPS in low-end devices or low performance browsers by optimizing as far as possible.

LayaAir engine redraws every frame. In performance optimization, besides CPU consumption caused by logic code execution per frame, attention should also be paid to the number of drawing instructions invoked per frame and the number of texture submissions of GPU.


 

 