# LayaAir引擎播放Spine骨骼动画



LayaAir引擎支持使用Spine骨骼动画，但需要先通过LayaAirIDE将Spine转换为LayaAir引擎支持的格式。

### 一、Spine动画转换

第一步：菜单【工具】【Spine动画转换】打开转换工具

![blob.png](http://old.ldc.layabox.com/uploadfile/image/20170120/1484914652928395.png)

第二步：将要转换的文件夹拖动到输入框中

![blob.png](http://old.ldc.layabox.com/uploadfile/image/20170120/1484914674863783.png)

第三步：点击确定进行转换

![blob.png](http://old.ldc.layabox.com/uploadfile/image/20170120/1484914709706312.png)

第四步：转换后生成的问题，播放时只需要.png .sk的文件就可以了

![blob.png](http://old.ldc.layabox.com/uploadfile/image/20170120/1484914733930079.png)

### 二、Spine动画的应用

使用Skeleton类进行Spine动画文件的播放

代码示例：

```java
package  
{
    import laya.ani.bone.Skeleton;
    import laya.webgl.WebGL;

    public class SpineSample 
    {
         
        public function SpineSample() 
        {
            WebGL.enable();
            Laya.init(1000, 900);
            test();
        }
        private function test():void
        {
            var skeleton:Skeleton;
            skeleton = new Skeleton();
            skeleton.url = "res/spine/vine/vine.sk";
            skeleton.pos(300, 300);
            Laya.stage.addChild(skeleton);
        }
         
    }
 
}
```