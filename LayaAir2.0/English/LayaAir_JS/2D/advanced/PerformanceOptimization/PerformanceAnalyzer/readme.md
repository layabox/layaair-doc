#Using Google browser's performance analyzer

### 

### **Profiles**

Profiles is part of the Chrome Developer Tool. You can open the Chrome Developer Tool by right-clicking the review element on the page or pressing F12 on the Google Browser page. Then click Profiles to switch to the Profiles panel.



 



###Two.**CPU Occupancy Analysis**

Select Collect JavaScript CPU Profile and click the Start button (or the black solid circle on the left), at which point Chrome will start recording the execution of the method for the current page. To finish this monitoring, you need to click the Stop button (or the red solid circle on the left). After the monitoring is finished, a monitoring result file will be listed under the left Profiles. Click to open the monitoring result file.
The monitoring results are presented in the form of data tables. In this table, the time of function execution, the sequence and inclusion relationship of function execution, and the CPU trend are recorded. The result of analysis is a pertinent optimization function.

​![图片1.png](img/1.png)<br/>
(Fig. 1)

​![图片1.png](img/2.png)<br/>
(Figure 2)

​![图片1.png](img/3.png)<br/>
(Figure 3)



 



### **3. Memory occupancy analysis**

Select Take Heap Snapshot, click the Take Snapshot button (or click on the black solid circle on the left), and a memory snapshot record file of the current web page will be generated under the Profiles column on the left.
The generated memory snapshot files are recorded in the form of data tables, the number of current web page objects, the size of memory occupied, and so on.
After taking a snapshot of memory, operate the page, and then take a snapshot of memory. Click to select the second memory snapshot, and you can select Comparison mode to change between the second snapshot and the first snapshot. Through analysis, the web page is optimized.

​![图片1.png](img/4.png)<br/>
(Figure 4)

​![图片1.png](img/5.png)<br/>
(Fig. 5)

​![图片1.png](img/6.png)<br/>
(Fig. 6)