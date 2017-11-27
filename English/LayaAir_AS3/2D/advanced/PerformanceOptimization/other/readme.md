# Other optimization strategies

### 1. Reduce the number of particles used

As the particles belong to the vector drawing, a lot of use of particles on the CPU pressure, in the mobile platform Canvas mode, try not to use particles;

WebGL mode can use GPU operation, can reduce the pressure of CPU, but also try to control and reduce the amount used.



### 2. Canvas mode to minimize the use of rotation, scaling, alpha and other attributes

In Canvas mode, minimize the use of properties such as rotation, scaling, and alpha, which consume performance.

If you want to use, it is recommended to use in WebGL mode;



### 3. Do not create objects and complex calculations in the Timer loop

Because Timer's `loop()` and `frameLoop()` methods will continue to cycle execution, when creating objects and complex computing, will cause a large number of performance consumption in the loop, so as far as possible not to create objects in the loop and complex computing.



### 4. Use autoSize and getBounds as few as possible

`autoSize()` and `getBounds()` need a lot of calculation, which has great influence on performance, and uses less as much as possible.



### 5. Execution of functions by try catch can be very slow

Trying to minimize the use of `try catch`, in a project can be very slow when it is executed by `try catch` functions.

 
