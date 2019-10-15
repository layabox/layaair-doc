#Performance analyzer using chrome

> Profiles is part of the Chrome Developer Tool. You can open the Chrome Developer Tool by right-clicking the review element on the page or pressing F12 on the Google Browser page. Then click Profiles to switch to the Profiles panel.
>



 



###1. CPU Occupancy Analysis

####1.1 Start CPU Performance Analyzer

Selection`Record JavaScript CPU Profile`Click on the Start button or the solid dot in the upper left corner, and Chrome will start recording the execution of the method for the current page. As shown in Figure 1-1.

![图片1-1](img/1-1.png)<br/> (Fig. 1-1)



####1.2 End CPU Performance Analyzer Monitoring

To end the monitor record for this performance analyzer, you need to click the Stop button (or the red solid circle on the left). As shown in Figure 1-2.

![图片1-2](img/1-2.png)<br/> (Fig. 1-2)



###1.3 View CPU Performance Analyser Records

After the monitoring is finished, a monitoring result file will be listed under the left Profiles. Click to open the monitoring result file. As shown in Figure 1-3

![图片1-3](img/1-3.png)<br/> (Fig. 1-3)

The monitoring results are presented in the form of data tables. We can find the function name provided in Function according to the consumption ranking, and optimize where the performance consumption is high.



###2. Memory occupancy analysis

####2.1 Start Memory Analysis

Selection`Take Heap Snapshot`Click`Take Snapshot`Button (you can also click on the black solid circle on the left), as shown in Figure 2-1.



![图片2-1](img/2-1.png)<br/> (Figure 2-1)

The generated memory snapshot files are recorded in the form of data tables, the number of current web page objects, the size of memory occupied, and so on.



####2.2 Memory Snapshot Recording

After memory analysis is started, a snapshot record file of the current web page is generated under the Profiles column on the left. Click to view the relevant data, as shown in Figure 2-2.

![图片2-2](img/2-2.png)<br/>（图2-2）







####2.3 Memory Snapshot Analysis


After taking the first memory snapshot, click on the dot in the upper left corner to record a new memory snapshot. Click to select the second memory snapshot, and you can select Comparison mode to change between the second snapshot and the first snapshot. Through analysis, the web page is optimized.



​![图片1.png](img/5.png)<br/>
(Fig. 2-3)

​![图片1.png](img/6.png)<br/>
(Fig. 6)