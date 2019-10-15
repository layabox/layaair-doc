#골격 애니메이션 템플릿

엔진에서 골격 애니메이션을 사용하면 스폰이든 드래곤본은 모두 마찬가지다. 전환 과정에서 두 가지 애니메이션을 엔진에서 사용할 수 있는 같은 형식으로 전환하기 때문이다.이번 절은 골격 애니메이션의 용법을 더욱 소개할 것이다.

**골격 애니메이션 템플릿**

뼈 애니메이션 을 더 잘 사용하려면 템플릿의 개념을 들어야 한다. Layair 엔진 중 템플릿은 하나의 특별한 개념을 나타내며 데이터 구조가 복용될 수 있다.골격 애니메이션은 템플릿으로 사용되고 같은 애니메이션은 애니메이션 템플릿만 만들 수 있고, 그 다음에는 여러 가지 재생 사례가 있다. 이 메모리 중에는 한 통의 애니메이션 데이터가 하나 있지만 무대에서 여러 개의 애니메이션을 보여줄 수 있다.

코드 예제:


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




**2, 골격 애니메이션 방송 모드**

이전 부분의 사례 코드 는 이런 행 코드 를 볼 수 있다


```java

//从动画模板创建动画播放对象
skeleton0 = templet.buildArmature(0);
```


우리는 템플릿에서 애니메이션을 생성할 때 인자 0 이 전개되어 애니메이션의 재생 모드를 표시했다.애니메이션은 세 개의 방영 패턴이 있는데 아래는 각각 설명한다.

0: 템플릿 버퍼 데이터를 사용하고 템플릿 버퍼 버퍼 데이터를 사용하여 수정하지 않기 (메모리 지출이 작고 계산이 작고, 바꾸는 것을 지원하지 않습니다)

1: 애니메이션 자신의 완충구를 사용하면 모든 애니메이션은 자신의 완충구를 가지고 있으며, 상당한 비용을 사용한다.(메모리 지출이 커서, 계산이 작고, 환장 지원)

2: 동적 방식을 사용하여 실시간으로 그림 (메모리 지출이 작고, 계산 지출이 크고, 교환을 지원하고 사용하지 않습니다)

이 세 가지 모드 중 0:갈아입는 것을 지원하지 않습니다. 1, 2 환장을 지원합니다.



**뼈 애니메이션**

앞의 실례 중 이 줄 코드 를 볼 수 있습니다:


```java

//切换动画皮肤
skeleton0.showSkinByIndex(1);
```


우리는 이곳에서 1호 피부로 전환을 하자는 변수 1개를 보냈다.사실 이 애니메이션은 피부 세 개, 0호는 기본 피부, 1번은 남자 캐릭터, 2번은 여자 캐릭터 피부, 다음은 다른 피부를 보여준다.


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




**4. 골격 애니메이션 전환 동작**

피부 전환을 제외한 골격 애니메이션은 재생할 때 애니메이션 동작을 전환할 수 있다. 예를 들면 인물의 달리기 공격 등 동작을 같은 애니메이션 파일에 넣을 때 코드를 통해 동작을 바꾸면 된다.


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
