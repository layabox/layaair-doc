# LayaAir引擎播放DragonBone动画

LayaAir引擎支持DragonBone动画,但需要先通过LayaAirIDE将动画转换为LayaAir引擎支持的格式。

### 一、DragonBone动画转换

第一步：菜单【工具】【龙骨动画转换】打开转换工具

![blob.png](http://old.ldc.layabox.com/uploadfile/image/20170120/1484918936409893.png)

第二步：将要转换的文件夹拖入到输入框中

![blob.png](http://old.ldc.layabox.com/uploadfile/image/20170120/1484918965894939.png)

第三步：点击确定开始转换

![blob.png](http://old.ldc.layabox.com/uploadfile/image/20170120/1484919052761674.png)

第四步：转换生成的文件，播放只需要.png .sk的文件就可以了

![blob.png](http://old.ldc.layabox.com/uploadfile/image/20170120/1484919113730767.png)

### 二、DragonBone动画的应用

转换后的DragonBone动画可使用LayaAir引擎的Skeleton类进行播放

代码示例：

```java
package  
{
    import laya.ani.bone.Skeleton;
    import laya.webgl.WebGL;
 
    public class DragonBoneSample 
    {
         
        public function DragonBoneSample() 
        {
            WebGL.enable();
            Laya.init(1000, 900);
            test();
        }
        private function test():void
        {
            var skeleton:Skeleton;
            skeleton = new Skeleton();
            skeleton.url = "res/dragonbone/Bicycle/Bicycle.sk";
            skeleton.pos(300, 700);
            Laya.stage.addChild(skeleton);
        }
         
    }
 
}
```