#Scenario use

In 2.0 project development, whether it is Scene, View, Dialog, scene 3d, file type and suffix are scene. LayaAir 2.0 development ideas for component, scripting, scenario management development, the project uses scene management to manage scenarios, LayaAir has made a series of scenarios for scenes, so that developers do not need to consider scenarios, checkpoints, page resources, memory management, just a simple call interface, management scenarios, other delivery engines to do, just focus on the game logic open. Hair can be.



Create a new 2.0 project, open the edit mode, create two scenes in the project, and put a button in the Start scene as shown in the figure.



![1](img\1.png)(图1)




Create the second scenario box2d in the test directory

![1](img\2.png)(Fig. 1)

Start scenario and box2d scenario are both in pages folder under the Laya directory. To open the scenario, simply call Scene. open ("scenario name").

![1](img\3.png)(Fig. 1)

We mount the Start script on the button, select the button in the box 2 D scenario, click Add Component in the right property panel, and then select Start.js

The Start.js code is self-written by the reader as shown in the figure above.

Then in editing mode, press F9 in the preview window to select Start. scene as the startup scenario, and click OK.

![1](img\4.png)



Then, when you compile and run the project, you can see the following results. Click the start button in the startup scenario to switch the scenario.

For more information, please refer to API:

Https://layaair.ldc.layabox.com/api2/China/index.html?Category=Core&class=laya.display.Scene

Or visit the community http://ask.layabox.com

![1](img\ide.gif)