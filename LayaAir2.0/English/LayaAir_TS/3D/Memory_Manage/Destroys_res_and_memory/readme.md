#Destroy resources and free memory

###### *version :2.0.2beta   Update:2019-5-8*

#####On why resources should be released:

In the development of LayaAir 3D games, resource release is very important. 3D resources include model, texture, material, animation, etc. In order to achieve good picture effect, the file will be much larger than 2D, and the basic resources of 3D engine will be put into GPU for computing and rendering, so it occupies a lot of memory. When the game level is constantly loaded, the game continues to deepen, and more and more resources are put into the display memory. If the resources are not released, the game will eventually collapse.

Unlike memory, there is a garbage collection mechanism in memory, but unlike display memory, it must be released manually, so the resource release of display memory must be taken seriously.

The examples used here are as follows:**Resource Loading Paper**Of**Resource loading**The example is simply modified.

To destroy a single resource and free memory, the resource object needs to be called`destroy()`Method.

> The grid example uses the same grid as the separate preset load, so before we write this example, we first copy the LayaMonkey folder, named LayaMonkey 2, to distinguish it from the preset load example. If a grid in use is destroyed, an error will be reported.


```typescript

//加载Mesh
Laya.Mesh.load("res/threeDimen/skinModel/LayaMonkey2/Assets/LayaMonkey/LayaMonkey-LayaMonkey.lm", Laya.Handler.create(this, function(mesh:Laya.Mesh):void {
  	........
    //上面省略，我们再网格加载完成3秒后对该网格进行销毁
    Laya.timer.once(3000,this,function ():void
    {
        //销毁了使用了该网格的精灵
        layaMonkey.destroy();
        //对网格进行销毁
        mesh.destroy();        
    });
}));
```


**Load complete**

After all the resources are loaded, we can see 67.26 M of memory and 10.13 M of memory.

If the wizard of the grid is simply destroyed and the grid resource itself is not processed, the display memory will not be reduced, and the grid resource is still in the display memory. (Developers can comment out the line of code that destroys the grid to see the effect on themselves)

![] (img/1.png)<br> (Figure 1)

**After execution of destruction**

![] (img/2.png)<br> (Figure 2)

After executing the destroyed code, it is obvious that there are still 67.5 M memory and 10.04 M memory. The grid model has been moved out and resources have been destroyed.

For other resource types, such as Mesh, Material, Texture 2D, etc., the same method can be used to destroy resources.
