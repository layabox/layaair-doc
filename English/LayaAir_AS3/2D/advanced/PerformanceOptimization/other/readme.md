# Other optimization strategies

### 1. Reduce the number of particles used

As the particles belong to the vector drawing, a lot of use of particles on the CPU pressure, in the mobile platform Canvas mode, try not to use particles;

WebGL mode can use GPU operation, can reduce the pressure of CPU, but also try to control and reduce the amount used.



### 2. Canvas mode to minimize the use of rotation, scaling, alpha and other attributes

In Canvas mode, minimize the use of properties such as rotation, scaling, and alpha, which consume performance.

If you want to use, it is recommended to use in WebGL mode;



### 3. Do not create objects and complex calculations in the Timer loop

由于Timer的`loop()`与`frameLoop()`方法里会不断的循环执行，当创建对象及复杂计算时，会导致大量的性能消耗出现在循环里，因此，尽可能不要在循环里创建对象及复杂计算。



### 4. Use autoSize and getBounds as few as possible

`autoSize()`与`getBounds()`需要大量计算，对性能的影响较大，尽量少用。



### 5. Execution of functions by try catch can be very slow

项目中尽量减少`try catch`的使用，被`try catch`的函数执行会变得非常慢。

 
