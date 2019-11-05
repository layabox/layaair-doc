# 引擎常见问题Frequently Asked Questions



###1. Differences between the four release modes of the engine


 **Embedded Mode**Embedded mode generates a scene-like code file from the editor's UI content. The code script contains the information of the UI scene created by IDE. When small games and light games are not available, the size of JS is not taken into account. Normally, the most commonly used choice for developing H5 is to open the page without asynchronous loading.

**Loading mode**Loading mode also generates scene classes, other UI data information will be placed in a ui.json, which needs to be loaded when using. Similarly, this JSON is not often used in the era of no small games. Scene information can not be in js, which can save the size of JS package and more space for 4m package of small games. When used, it can be loaded as a resource.

**Separation mode**: the separation mode is based on the loading mode, which also generates scene classes. However, it will generate a separate scene data file for each scene and load the scene file separately each time, which is different from the loading mode that loads all scenes at one time. After 2.0, the development of small games or light games, in order to reduce the size of the main package and improve the loading speed are commonly used mode.

**File mode**File mode is unique to 2.0. It is created for the development of small games. It does not generate scene classes, that is to say, it can further reduce the size of JS packages. It is loaded in Scene. load mode. The biggest difference between the first three modes is that file mode can not directly call variables in the scene, and it needs getchild to get them and then operate. Variables are declared in the first three scenario classes, and code prompts allow you to manipulate internal variables directly.



####2. The use of scripting and runtime

If a developer is not familiar with these two concepts, he can refer to runtime and scripted documents, and then create a sample project with an engine. He will drag a runtime script into the scene, which can directly manipulate the content of the scene. It is very convenient. This is a unique way of adding script components to the mainstream engine, which belongs to LayaAir. He likes 1. Developers of the.0 development model can use this approach more often.

Scripting development is to treat scripts as a component of objects. The scripts provide methods that can be overwritten to write development logic in these methods. A large number of operations that need to be done by the main program are taken over by the engine.



####3. Code usage preset


```

下面采用伪代码：
先声明一个预设变量
{Laya.loader.create("prefab/预设名字.json",Handler.create(this,onComplete));
}
private function onComplete(obj:Object):Void{
  一个预设变量.json = ojb
  一个sprite = Pool.getItemByCreateFun("自己起一个名字", this.一个预设变量.create, this.一个预设变量);
}
```


