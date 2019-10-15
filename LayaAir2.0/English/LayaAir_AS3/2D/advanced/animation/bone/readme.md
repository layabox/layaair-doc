#Skeletal Animation Template, Play Mode, Replacement, Switching Action

The use of skeleton animation in the engine is the same whether it is Spine or DragonBone, because the conversion tool converts both animations into the same format that the engine can use. This section will further introduce the use of skeletal animation.

**I. Skeletal Animation Template**

To make better use of skeleton animation, we must mention the concept of template, which is a special concept in LayaAir engine, representing a data structure that can be reused. Skeletal animation uses templates. For the same animation, you can create only one animation template and then exemplify multiple playing instances, so that there is only one animation data in memory, but multiple animations can be displayed on the stage.

Code example:


```java

package  
{
    import laya.ani.bone.Skeleton;
    import laya.ani.bone.Templet;
    import laya.events.Event;
    import laya.webgl.WebGL;
    /**
     * ...
     * @author ww
     */
    public class SkeletonTempletSample 
    {
        public var templet:Templet;
        public function SkeletonTempletSample() 
        {
            WebGL.enable();
            Laya.init(1000, 900);
            //创建动画模板
            templet = new Templet();
            templet.on(Event.COMPLETE, this, parseComplete);
            templet.on(Event.ERROR, this, onError);
            //加载动画文件
            templet.loadAni("res/spine/goblins/goblins.sk");
        }
        private function onError():void
        {
            trace("parse error");
        }
        private function parseComplete():void
        {
            //创建第一个动画
            var skeleton0:Skeleton;
            //从动画模板创建动画播放对象
            skeleton0 = templet.buildArmature(0);
            skeleton0.pos(200, 700);
            //切换动画皮肤
            skeleton0.showSkinByIndex(1);
            //播放
            skeleton0.play(0,true);
            Laya.stage.addChild(skeleton0);
             
            //创建第二个动画
            var skeleton1:Skeleton;
            skeleton1 = templet.buildArmature(0);
            skeleton1.pos(500, 700);
            skeleton1.showSkinByIndex(1);
            skeleton1.play(0,true);
            Laya.stage.addChild(skeleton1);
        }
    }
 
}
```




**2. Skeletal Animation Play Mode**

You can see this line of code in the example code in the previous section


```java

//从动画模板创建动画播放对象
skeleton0 = templet.buildArmature(0);
```


When we create an animation from a template, we pass a parameter 0, which represents the playback mode of the animation. Animation has three playback modes, which are described below.

0: Data buffered by templates, data buffered by templates, not allowed to be modified (memory overhead is small, computational overhead is small, do not support replacement)

1: Each animation will have its own buffer using its own buffer, which is quite memory-consuming. (High memory overhead, low computational overhead, support for replacement)

2: Use dynamic way to draw in real time (memory cost is small, computing cost is large, support for replacement, not recommended)

Among the three modes, 0:0 does not support changing, 1,2 supports changing.



**3. Skeletal Animation Replacement**

You can see this line of code in the previous example:


```java

//切换动画皮肤
skeleton0.showSkinByIndex(1);
```


Here we pass a parameter 1 to switch to Skin 1. In fact, this animation has three skins. No. 0 is the default skin, No. 1 is the male skin, No. 2 is the female skin. Let's give an example to show different skins.


```java

package  
{
    import laya.ani.bone.Skeleton;
    import laya.ani.bone.Templet;
    import laya.events.Event;
    import laya.webgl.WebGL;
    /**
     * ...
     * @author ww
     */
    public class SkeletonChangeSkinSample 
    {
        public var templet:Templet;
        public function SkeletonChangeSkinSample() 
        {
            WebGL.enable();
            Laya.init(1000, 900);
            //创建动画模板
            templet = new Templet();
            templet.on(Event.COMPLETE, this, parseComplete);
            templet.on(Event.ERROR, this, onError);
            //加载动画文件
            templet.loadAni("res/spine/goblins/goblins.sk");
        }
        private function onError():void
        {
            trace("parse error");
        }
        private function parseComplete():void
        {
            //创建第一个动画
            var skeleton0:Skeleton;
            //从动画模板创建动画播放对象
            skeleton0 = templet.buildArmature(0);
            skeleton0.pos(200, 700);
            //切换动画皮肤 使用标号为0的皮肤
            skeleton0.showSkinByIndex(0);
            //播放
            skeleton0.play(0,true);
            Laya.stage.addChild(skeleton0);
             
            //创建第二个动画
            var skeleton1:Skeleton;
            skeleton1 = templet.buildArmature(0);
            skeleton1.pos(450, 700);
            //切换动画皮肤 使用标号为1的皮肤
            skeleton1.showSkinByIndex(1);
            skeleton1.play(0,true);
            Laya.stage.addChild(skeleton1);
             
            //创建第三个动画
            var skeleton2:Skeleton;
            skeleton2 = templet.buildArmature(0);
            skeleton2.pos(700, 700);
            //切换动画皮肤 使用标号为2的皮肤
            skeleton2.showSkinByIndex(2);
            skeleton2.play(0,true);
            Laya.stage.addChild(skeleton2);
        }
         
    }
 
}
```




**4. Skeletal Animation Switching Action**

In addition to switching skin, skeletal animation can also switch animation actions when playing, such as running attacks and other actions can be placed in the same animation file, using only code switching action can be used.


```java

package  
{
    import laya.ani.bone.Skeleton;
    import laya.ani.bone.Templet;
    import laya.display.Text;
    import laya.events.Event;
    import laya.webgl.WebGL;
    /**
     * ...
     * @author ww
     */
    public class SkeletonChangeActionSample 
    {
         
        public function SkeletonChangeActionSample() 
        {
            WebGL.enable();
            Laya.init(1000, 900);
            test();
        }
        private var skeleton:Skeleton;
        private var text:Text;
        private function test():void
        {  
            skeleton = new Skeleton();
            skeleton.url = "res/spine/alien/alien.sk";
            skeleton.pos(300, 700);
            Laya.stage.addChild(skeleton);
             
            text = new Text();
            Laya.stage.addChild(text);
            text.color = "#00ff00";
            text.fontSize = 30;
            Laya.stage.addChild(text);
             
            Laya.stage.on(Event.MOUSE_DOWN, this, changeAction);
        }
        private var tActionID:int=0;
        private function changeAction():void
        {
            tActionID++;
            var aniCount:int;
            //获取动画动作数量
            aniCount = skeleton.getAnimNum();
            tActionID = tActionID % aniCount;
            //显示当前要播放的动画名
            text.text = skeleton.getAniNameByIndex(tActionID);
            //切换播放的动画
            skeleton.play(tActionID, true);
        }
    }
 
}
```
