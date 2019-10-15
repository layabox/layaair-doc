#Graphic Rendering Performance

### **I. Optimizing Sprite**

1. Try to reduce unnecessary nesting and Sprite number.

2. Objects in non-visible areas should be removed from the display list or set visible = false as far as possible.

3. For a container with a large amount of static content or content that does not change frequently (such as buttons), cacheAs can be set for the entire container, which can greatly reduce the number of Sprites and significantly improve performance. If you have dynamic content, it's best to separate it from static content so that only static content can be cached.

4. In Panel, the direct sub-objects (sub-objects of sub-objects can not be judged) outside the panel area are not rendered, and the sub-objects beyond the panel area are not consumed.

​

### **II. Optimizing DrawCall**

1. Setting cacheAs for complex static content can greatly reduce DrawCall, and using cacheAs well is the key to game optimization.

2. Make sure that the rendering order of the same atlas is next to each other as far as possible. If different atlases are rendered cross-wise, the number of DrawCalls will be increased.

3. Make sure that all resources in the same panel use one atlas as much as possible, which can reduce the number of submissions.

​

### **III. Optimizing Canvas**

When optimizing Canvas, we need to be careful not to use cacheAs in the following situations:

1. Objects are very simple, such as a word or a picture. Setting cacheAs= "bitmap" will not improve performance, but will lose performance.
2. Containers have constantly changing content, such as an animation or countdown in the container. If we set cacheAs="bitmap" on the container again, it will lose performance.

You can determine whether the Canvas cache has been refreshed by looking at the first value of the Canvas statistics.

### **IV. About CacheAs**

Setting cacheAs can cache the display object as a static image. When cacheAs changes, the sub-objects will be automatically re-cached. At the same time, the reCache method can be manually called to update the cache. It is suggested that the complex content which does not change frequently can be cached as static image, which can greatly improve the rendering performance. CacheAs have three optional values: none, normal and bitmap.

1. Default is "none" without any caching.
2. When the value is "normal", canvas is cached under Canvas and command is cached under webgl mode.
3. When the value is "bitmap", canvas caching is still used under Canvas, and renderTarget caching is used in webGL mode. It should be noted that the renderTarget caching mode under webGL has a size limit of 2048, which will increase the memory overhead if it exceeds 2048. In addition, the overhead of continuous redrawing is relatively high, but drawcall is reduced, rendering performance is the highest. The command caching mode under webGL can only reduce node traversal and command organization, and can not reduce drawcall, with moderate performance.

After setting cacheAs, you can also set staticCache = true to prevent automatic cache updates, and you can manually call the reCache method to update the cache.

CacheAs improves performance in two ways. One is to reduce node traversal and vertex computation; the other is to reduce drawCall. Making good use of cacheAs will be a powerful tool for optimizing engine performance.

The following example draws 10,000 text (depending on computer performance, this example is 10,000):


```javascript

Laya.init(550,400,Laya.WebGL);
Laya.Stat.show();
var textBox = new Laya.Sprite();
for(var i=0;i<10000;i++){
    txt=new Text();
    txt.text=(Math.random()*100).toFixed(0);
    txt.color="#CCCCCC";
    txt.x=Math.random()*550;
    txt.y=Math.random()*400;
    textBox.addChild(txt);
}
Laya.stage.addChild(textBox);
```


The following is a screenshot of the running time on my computer. FPS is stable at 52 or so.

![1](img/1.png)</br>

(Fig. 1)

When we set the container where the text is located to cacheAs, as shown in the following example, the performance has been greatly improved, and FPS has reached 60 frames.


```javascript

//...省略其他代码...
var textBox=new Laya.Sprite();
textBox.cacheAs="bitmap";
//...省略其他代码...
```


![2](img/2.png)</br>

(Fig. 2)

### **V. Character Description**

At runtime, the drawing instructions are invoked once more when the edged text is set than when the edged text is not. At this point, the text is proportional to the amount of CPU used and the number of text. Therefore, try to use alternatives to meet the same needs.

· For almost unchanged text content, cacheAs can be used to reduce performance consumption. See "Graphic Rendering Performance - About cacheAs".

· Bitmap fonts can be used for text fields where content is constantly changing, but the number of characters used is relatively small.

### **6. Skip text typesetting and render directly**

In most cases, many texts do not require complex typesetting, but simply display a line of words. To meet this requirement, Text provides a method called changeText that skips typesetting directly.


```javascript

var txt=new Laya.Text();
txt.text="text";
Laya.stage.addChild(txt);
//后面只是更新文字内容，使用changeText能提高性能
txt.changeText("text changed.");
```


Text. changeText directly modifies the last instruction of drawing text in the drawing instructions. The behavior of the previous drawing instructions still exists, which results in changeText being used only in the following situations:

· The text always has only one line.

· The style of the text remains unchanged (color, thickness, italics, alignment, etc.).

Even so, such needs are often used in practical programming.