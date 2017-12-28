# Skeletal animation templates, playback mode, reloading, switching action

​        The use of skeletal animation in the engine, whether it's Spine or DragonBone, is the same thing, because in the conversion process, the conversion tool turns the two animations into the same format that the engine can use. This section will further introduce the use of skeletal animation.

**1. Skeleton animation template**

​        To better use skeletal animation, we must mention the concept of template, in the LayaAir engine, the template is a special concept, representing a data structure, this data structure can be reused. Skeletal animation uses templates, for the same animation, you can only create an animation template, and then examples of multiple playback examples, so that there is only one memory in the animation data, but it can display multiple animations on the stage.

Code example :

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



**2. skeletal animation playback mode**

You can see this line of code in the example code in the previous section

```java
// Creating animation objects from animation templates
skeleton0 = templet.buildArmature(0);
```

​        When we create animation from the template, we pass a parameter 0, which represents the playback mode of the animation. The animation has three playback modes, which are explained below.

​    0：Using template buffered data, template buffer data is not allowed to modify (memory overhead is small, computing overhead is small, not supporting reloading)

​    1：Using animation's own buffer, each animation has its own buffer, which is quite memory intensive. (large memory overhead, low computational overhead, and supporting reloading)

​    2：Using dynamic mode to draw in real time (small memory overhead, high computational overhead, support reloading, not recommended)

​    In these three modes, 0: does not support reloading, and 1,2 supports reloading.



**Third, the bones animation rehandling**

You can see this line of code in the previous example:

```java
// Switch animation skin
skeleton0.showSkinByIndex(1);
```

We've got a parameter 1 here, which means switching to No. 1 skin. In fact, this animation has three skins, 0 is the default skin, No. 1 is the male skin, and No. 2 is the female skin, and here we give an example of showing different skin.

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



**4. Skeletal animation switching action**

​        In addition to switching the skin, skeletal animation can also switch animation when playing, such as the characters can run, attack and other actions into the same animation file, the use of time as long as through code switching action can be.

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
