# 其它优化策略

###1. Reduce the number of particles used

Because the particle belongs to vector rendering, a large number of particles are used in the CPU pressure, in the mobile platform Canvas mode, try not to use particles;

GPU operation can be used in WebGL mode, which can reduce the pressure of CPU, but it should be controlled as far as possible to reduce the usage.



###2. Canvas mode minimizes the use of rotation, scaling, alpha and other attributes.

In Canvas mode, minimize the use of rotation, scaling, alpha and other attributes, which will consume performance.

If you want to use it, it is recommended to use it in WebGL mode.



###3. Don't create objects and complex computations in Timer's loop

Because of Timer's`loop()`And`frameLoop()`Method will continue to cycle, when creating objects and complex computations, will lead to a lot of performance consumption in the cycle, so as far as possible do not create objects and complex computations in the cycle.



###4. Minimize the use of autoSize and getBounds

`autoSize()`And`getBounds()`It needs a lot of calculation, which has a great influence on the performance and is used as little as possible.



###5. Functions executed by try catch become very slow

Minimize the number of projects`try catch`Use, by`try catch`The execution of the function will be very slow.


 