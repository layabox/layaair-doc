# 显示对象及相关概念

###Stage

Stage is a platform for displaying game elements. In game visual programming, all game elements must be added to the stage to be displayed. Therefore, the stage is also the final container for the display object.

At the same time, the stage is also a kind of object that can be displayed. From the programming point of view, any object has attributes and behavior. For example, the stage object has the properties of wide, high and frame frequency, and has the behavior of adding display objects.



###Display objects

What is the display object? An entry-level understanding is that everything visible on the stage can be called a display object. But in fact, the display object includes not only visible graphics, text, pictures, videos, but also invisible audio and display object containers.



###Display list

Before the display object is displayed on the stage, there is a process that needs to be added to the display list first. The function of the display list is to index the display objects, use them for the display order of the hierarchy (which is added at the top), and then display them on the stage.