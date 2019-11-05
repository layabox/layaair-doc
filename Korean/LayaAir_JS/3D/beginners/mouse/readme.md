#Layaiar3D 마우스 교호

###마우스 교호 개술

Layaiar2D 엔진에서 2D 디스플레이 대상에는 마우스 이벤트가 사용되며 논리를 작성하기 쉽습니다.Layaiair 3D 엔진에서 이러한 기능을 실현하지 못했습니다. 3D 공간이 더 복잡합니다. 공간에서 넓고 가깝고, 레이어링, 재단, 부자 등 관계와 공간이 계속 바뀌고 있습니다.따라서 3D 엔진은 충돌기, 층과 물리 사선 검출, 충돌 정보의 방식을 채택해 마우스를 판단하고, 다음은 그것들의 개념과 작용을 먼저 파악하도록 한다.



###충돌기 Collider

충돌기는 일종의 물리 구성 요소로 3D 디스플레이 대상에 첨가할 수 있으며, 주로 3D 공간의 물체에서 충돌 검사를 진행하며 3D 디스플레이 대상의 형태에 따라 다른 유형으로 나뉜다.

Layaiar3D 엔진이 지원하는 충돌기는 세 종류로 각각**구형 충돌기 Sphere Collider**,**박스 충돌기 보이스 컬렉터**,**격자 충돌기 MesshCollider**.따르다**충돌 검사 정확도**과**소모 성능**Sphere Collider — BoxCollider — MelshCollider; 게임에 따라 수요를 개발하고 적합한 충돌기를 선택할 수 있다.

3D 디스플레이 대상 코드가 충돌기 구성 요소를 추가하는 방법은 다음과 같습니다 (엔진 1.7.12 버전) 을 표시합니다. 개발자는 코드 첨가하지 말고, 귀찮아서 유니티에 충돌 요소를 추가하여 사용할 수 있습니다.

Tips: 충돌기는 Messprite3D 형식의 디스플레이 대상에 추가할 수 없습니다. 그렇지 않으면 효력을 잃습니다.


```typescript

/**
* 给3D精灵添加碰撞器组件
* BoxCollider    : 盒型碰撞器
* SphereCollider : 球型碰撞器
* MeshCollider   : 网格碰撞器
*/
//添加Mesh碰撞器组件并获取
var meshCollider=meshSprite3d1.addComponent(MeshCollider);
//设置mesh碰撞器网格属性（否则无法被检测）
meshCollider.mesh=meshSprite3d1.meshFilter.sharedMesh;

//添加球形碰撞器组件并获取
var sphereCollider = meshSprite3d2.addComponent(SphereCollider);
//设置球形碰撞器中心位置
sphereCollider.center = meshSprite3d2.meshFilter.sharedMesh.boundingSphere.center.clone();
//设置球形碰撞器半径
sphereCollider.radius = meshSprite3d2.meshFilter.sharedMesh.boundingSphere.radius;

//添加盒形碰撞器
var boxCollider =meshSprite3d3.addComponent(BoxCollider);
boxCollider.setFromBoundBox(meshSprite3d3.meshFilter.sharedMesh.boundingBox);
```


엔진 1.7.12와 내보내기 플러그인 1.7.0판부터 유닛에 3D 모형에 추가된 콜리더를 내보내며 엔진을 자동으로 가재합니다.하지만 당분간 MesshCollider 내보내지 않고 후속 버전에서 이 기능을 완성할 예정이다.

유니티에서 보이스콜리더와 SphereCollider 를 모형으로 추가한 뒤 충돌함 또는 충돌 볼의 크기에 따라 설정을 할 수 있으며, 충돌상자가 실제 모형보다 작거나 한쪽 크기가 작거나 위치를 변경할 수 있으며, 개발자들의 논리적으로 처리할 수 있다.

Tips: 유닛 편집기에서 3D 물체는 여러 충돌기를 지원할 수 있지만 Layair 내보내기 플러그인 (1.7.0 버전) 은 현재 첫 번째 충돌기만을 지원하고 있습니다.모형에 부딪치기를 많이 첨가하면, 모형을 만들 때 다신 커뮤니케이션 모형으로 분해, 패널 모형에 각각 충돌기를 추가하는 데 사용된다.후속된 1.7.13 버전에서 무자 격자를 지원하는 3D 물체가 여러 충돌기를 지원할 것입니다.

###층 Layer

기본 장면에는 32층, 3D 요정을 임의층 안에 버리는 것을 선택할 수 있다.카메라에 사용하면 카메라는 층급에 따라 재단할 수 있다;**충돌 검측에 사용하면 충돌이 어떤 층을 통제할 수 있고, 충돌하지 않는 것은 어떤 층을 맞물지 않는다**.

3D 요정층을 지정하는 방법은 다음과 같습니다:


```typescript

//指定3D精灵的层
meshSprite3d1.layer = Layer.getLayerByNumber(10);
meshSprite3d2.layer = Layer.getLayerByNumber(13);
```




###사선 레이

사선은 데이터 유형이며, 디스플레이 대상이 아니라, 원점 origin, 방향 direction 속성이 있다.

게임에서 보기 공간이 자주 바뀌기 때문에 마우스의 3D 공간 가운데 위치를 모의 레이야아아일드 엔진은 카메라 Camera 가 사선을 만드는 방법을 제공해 스크린과 세로 세로 선 하나를 만들어냈다.

카메라 복사선 만들기 방법 다음과 같습니다:


```typescript

//射线初始化（必须初始化）
var ray = new Laya.Ray(Laya.Vector3.ZERO,Laya.Vector3.ZERO);
//获取鼠标在屏幕空间位置
var point = new Laya.Vector2();
point.elements[0] = Laya.stage.mouseX;
point.elements[1] = Laya.stage.mouseY;
//详设计产生射线方法，通过2D坐标获取与屏幕垂直的一条射线
camera.viewportPointToRay(point, ray);
```




###물리선 검사

우리가 장면 중 3D 디스플레이 대상이 충돌기를 생성하고, 이들을 위해 계층 (기본적으로 0층에 설치하고 사선을 창건한 후 물리사선 충돌로 측정할 수 있으며, 개발자는 수요에 따라 자신의 논리적 판단을 할 수 있으며, 쥐가 주운, 선택, 창건 등을 할 수 있다.

물리 사선은 우리가 Physics 물리 유류를 사용했으며, 우리가 충돌이 발생한 최초의 충돌기 정보를 검출할 수 있는 RayCast () 와 충돌이 발생한 모든 충돌기 정보 rayCastAll () 방법을 검증하였으며, 개발자는 수요에 따라 사용하고, API (1)

![1](img/1.png)(1)</br>>



###충돌 정보 RayCasthit

사선 검사의 충돌 정보는 검사하기 전에 초기화되어야 한다. 사선과 3D 디스플레이 대상이 교차할 경우, 충돌 정보 RayCastHit 속성에서 상대, 교차된 공간 위치, 교차된 삼각 정점 등 다양한 정보를 얻을 수 있다.

sprite3D 는 사귀는 3D 디스플레이 대상이었고, 사귀지 않았다면 null.

포지션은 사선과 모형과 교차하는 공간의 위치다.

triangleposions 속성으로 교차된 삼각면 정점 위치 배열, 물론 전제는 충돌기라는 유형은 메시콜리드, 그렇지 않으면 정점 위치 속성이 0.



###마우스 습득 실례

이상의 개념과 방법에 따라 마우스 습득의 예를 만들어 다음 단계에 따라 진행합니다.

1, 유닛 장면에서 3D 물품을 만들고, 세 대의 자동차를 예를 들어 플러그인을 내보내기 위해 사용합니다.

2, 장면 세션의 실례, 장면 스크립트 제어 종류 Sccript, 그리고 스크립트를 다운로드할 때 addscript() 스크립트를 사용합니다.

2`_start()`방법, 설치층, 사선, 충돌 정보 만들기 등 장면 중 3D 물품에 충돌기를 첨가한다.

3. 스크립트 보카시 후기 처리 방법`_postRenderUpdate()`사선 원점에 근거하여 직선을 참고하여 관찰할 수 있으며 사선과 3D 물품이 교차되었는지 판단할 수 있다.

Tips: 스크립트 업데이트 방법`_update()`그러나 참고선은 모형 이후에 마우스가 위치를 클릭하는 참고선을 볼 수 없어서 렌징 후 방법을 사용했다`_postRenderUpdate()`스크린을 마친 뒤 벡터 참고선을 그린다는 뜻이다.

4, 마우스 클릭 이벤트 가입, 마우스를 클릭하고 3D 물품과 교차한다면, 3D 물품을 사라뜨리고 정보를 제시할 것이다.

주 코드 다음과 같습니다:


```typescript

var LayaAir3D = (function () 
{
    function LayaAir3D() 
    {

        //初始化引擎
        Laya3D.init(1000, 500,true);
        
        //适配模式
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
        
        //加载3D资源
        Laya.loader.create(["LayaScene_collider3D/collider3D.ls",
                        "LayaScene_truck/truck.lh",
                        "LayaScene_box/box.lh"],Laya.Handler.create(this,onComplete));
        
        //创建信息提示框
        LayaAir3D.txt=new Laya.Text();
        LayaAir3D.txt.text="还未获得汽车！！";
        LayaAir3D.txt.color="#ff0000";
        LayaAir3D.txt.bold=true;
        LayaAir3D.txt.fontSize=30;
        LayaAir3D.txt.pos(100,50);
        Laya.stage.addChild(LayaAir3D.txt);			
		
		function onComplete()
		{
			//添加3D场景
			var scene= Laya.loader.getRes("LayaScene_collider3D/collider3D.ls");
			Laya.stage.addChild(scene);
			//为场景添加控制脚本			
			scene.addScript(SceneScript);
		}
    }
    return LayaAir3D;
} ());

LayaAir3D();
```


스크립트 종류 Sccript 코드 다음과 같습니다:

* * Tips: 1.7.10 버전에서 자신의 업데이트 방법 및 렌더링 처리 레이더링() 등의 방법이 취소되었지만 스크립트 구성 요소 제어 기능이 추가되어 스크립트 구성 요소를 추가하여 스크립트 구성 방법, u postRenderupdate()를 통해 마우스 참고선을 실현할 수 있습니다.**.


```typescript

var SceneScript = (function(_super)
{
    function SceneScript()
    {
        SceneScript.super(this);
    }
    Laya.class(SceneScript,"SceneScript",_super);

    var scene;
    /**3D摄像机**/
    var camera;
    /**用于鼠标检测的射线**/
    var ray;
    /**画矢量线的3D显示对象**/
    var phasorSprite3D;
    /**碰撞信息**/
    var rayCastHit;	
    
    /**鼠标点击创建的3D对象**/
    var box;
    /***获得的物品***/
    var nameArray=[];

     /**
     * 覆写3D对象加载组件时执行的方法
     * @param owner 加载此组件的3D对象
     */	
     SceneScript.prototype._load=function(owner)
    {
        //获取脚本所属对象
        scene=owner;
    }

    /*初始化场景（摄像机、碰撞相关对象、添加碰撞器等）*/
    SceneScript.prototype._start = function(state)
    {
        //创建摄像机（纵横比，近距裁剪，远距裁剪）
        camera = new Laya.Camera(0,0.1,1000);
        camera.transform.position = new Laya.Vector3(1,7,10);
        camera.transform.rotate(new Laya.Vector3(-30,0,0),false,false);
        //加载到场景
        scene.addChild(camera);
        //加入摄像机移动控制脚本
        // this.camera.addComponent(CameraMoveScript);

        //创建一条射线
        ray = new Laya.Ray(new Laya.Vector3(),new Laya.Vector3());
        //创建矢量3D精灵
        phasorSprite3D = new Laya.PhasorSpriter3D();
        //创建碰撞信息
        rayCastHit = new Laya.RaycastHit();
        //为场景中3D对象添加组件
        for(var i = scene.numChildren-1;i>-1;i--)
        {
            //添加网格型碰撞器组件
            var boxCollider=meshSprite3D.addComponent(Laya.BoxCollider);
            //为盒形碰撞器设置盒子大小（否则没有尺寸，无法被射线检测）
            boxCollider.setFromBoundBox(meshSprite3D.meshFilter.sharedMesh.boundingBox);
        }            
        //鼠标点击事件回调
        Laya.stage.on(Laya.Event.MOUSE_DOWN,this,onMouseDown);
    }

    /****覆盖场景渲染后更新方法（相当于场景渲染完成后的帧循环）****/
    SceneScript.prototype._postRenderUpdate = function(state)
    {
        //画参考线、时行碰撞检测
        //根据鼠标屏幕2D座标修改生成射线数据 
        camera.viewportPointToRay(new Laya.Vector2(Laya.stage.mouseX,Laya.stage.mouseY),ray);        
        //射线检测，最近物体碰撞器信息，最大检测距离为300米，默认检测第0层
        Laya.Physics.rayCast(ray,rayCastHit,300);            
        //摄像机位置
        var position = new Laya.Vector3(camera.position.x, 0, camera.position.z);
        //开始绘制矢量3D精灵，类型为线型
        phasorSprite3D.begin(Laya.WebGLContext.LINES, camera);
        //根据射线的原点绘制参考直线（为了观察方便而绘制，但矢量线并不是射线真正的路径）
        phasorSprite3D.line(ray.origin, new Laya.Vector4(1,0,0,1), position , new Laya.Vector4(1,0,0,1));    
        //结束绘制
        phasorSprite3D.end();
    }

    /**
     * 鼠标点击拾取
     */
    function onMouseDown()
    {
        //如果碰撞信息中的模型不为空,删除模型
        if(rayCastHit.sprite3D)
        {
            //从场景中移除模型
            scene.removeChild(rayCastHit.sprite3D);
            //将模型名字存入数组
            nameArray.push(rayCastHit.sprite3D.name);
            //文件提示信息
            LayaAir3D.txt.text = "你获得了汽车"+rayCastHit.sprite3D.name+"!，现有的汽车为："+nameArray;
            //销毁物体(如不销毁还能被检测)
            rayCastHit.sprite3D.destroy();
        }
    }
    return SceneScript;
})(Laya.Script);
```


컴파일을 번역하면 다음의 효과를 얻을 수 있으며 마우스 클릭은 자동차의 모형을 제거할 수 있다.

![2](img/2.gif)(2)</br>>



###마우스 생성 물체

게임에서 마우스를 사용하여 게임을 설치하는 것을 자주 사용한다. 예를 들면 유형의 게임을 지면에서 건축, 역할, 도구 등을 배치한다.

마우스 방치물체와 물체의 대체적인 방법과 차이가 다르며, 마찬가지로 충돌기, 사선 검사, 충돌 정보 등 3D 원소와 방법을 사용해야 한다.

물건을 만들 때, 모형 사선과 교차한 후, 우리는 충돌 정보 rayCasthit.position 을 통해 클릭한 위치를 누르고, 창건한 물품을 방치할 수 있다.또한 물품을 창건할 때 우리는 복제방식을 사용하여 개발자들이 그 방법을 주의한다.

검색 예에서 Google은 상자형 충돌기 BoxCollider 를 사용했습니다. 생성 예례에서 Google 충돌기 Melcollider를 사용합니다. 더 정확하게, 모형상의 상교 삼각면 정점을 얻을 수 있습니다. 방법으로 rayCasthit.triangleposions, 정점에 근거하여 그것을 관찰할 수 있습니다.

주 코드 수정 다음과 같습니다:

트럭 모형을 만들고 트럭 차체에 격격 충돌기 부품을 추가합니다.


```typescript

var LayaAir3D = (function () 
{
    function LayaAir3D() 
    {
        //初始化引擎
        Laya3D.init(1000, 500,true);
        
        //适配模式
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
        
        //加载3D资源
        Laya.loader.create(["LayaScene_collider3D/collider3D.ls",
                        "LayaScene_truck/truck.lh",
                        "LayaScene_box/box.lh"],Laya.Handler.create(this,onComplete));
        
        //创建信息提示框
        LayaAir3D.txt=new Laya.Text();
        LayaAir3D.txt.text="还未获得汽车！！";
        LayaAir3D.txt.color="#ff0000";
        LayaAir3D.txt.bold=true;
        LayaAir3D.txt.fontSize=30;
        LayaAir3D.txt.pos(100,50);
        Laya.stage.addChild(LayaAir3D.txt);			
		
		function onComplete()
		{
			//添加3D场景
			var scene= new Laya.Scene();
			Laya.stage.addChild(scene);
			//为场景添加控制脚本			
			scene.addScript(SceneScript);

            //创建货车模型，加载到场景中
            var truck3D = Laya.loader.getRes("LayaScene_truck/truck.lh");
            scene.addChild(truck3D);
          
			//获取货车的车身（车头不进行装货）
			var meshSprite3D=truck3D.getChildAt(0).getChildByName("body");
          	//添加网格型碰撞器组件
          	var meshCollider=meshSprite3D.addComponent(Laya.MeshCollider);
          	//为Mesh碰撞器mesh网格（否则没有尺寸，无法被射线检测）
         	boxCollider.mesh=meshSprite3D.meshFilter.sharedMesh;
		}

    }
    return LayaAir3D;
} ());

LayaAir3D();
```


장면 종류 코드 수정 다음과 같습니다:


```typescript

var SceneScript = (function(_super)
{
    function SceneScript()
    {
        SceneScript.super(this);
    }
    Laya.class(SceneScript,"SceneScript",_super);
  
    var scene;
    /**3D摄像机**/
    var camera;
    /**用于鼠标检测的射线**/
    var ray;
    /**画矢量线的3D显示对象**/
    var phasorSprite3D;
    /**碰撞信息**/
    var rayCastHit;	    
    /**鼠标点击创建的3D对象**/
    var box;
    /***获得的物品***/
    var nameArray=[];


     /**
     * 覆写3D对象加载组件时执行的方法
     * @param owner 加载此组件的3D对象
     */	

     SceneScript.prototype._load=function(owner)
    {
        //获取脚本所属对象
        scene=owner;
    }

    /*初始化场景（摄像机、碰撞相关对象、添加碰撞器等）*/
    SceneScript.prototype._start = function(state)
    {
        //创建摄像机（纵横比，近距裁剪，远距裁剪）
        camera = new Laya.Camera(0,0.1,1000);
        camera.transform.position = new Laya.Vector3(1,7,10);
        camera.transform.rotate(new Laya.Vector3(-30,0,0),false,false);
        //加载到场景
        scene.addChild(camera);
        //加入摄像机移动控制脚本
        // this.camera.addComponent(CameraMoveScript);

        //创建一条射线
        ray = new Laya.Ray(new Laya.Vector3(),new Laya.Vector3());
        //创建矢量3D精灵
        phasorSprite3D = new Laya.PhasorSpriter3D();
        //创建碰撞信息
        rayCastHit = new Laya.RaycastHit();
 
        //鼠标点击需要创建的物品，用于克隆使用（火车上的货物）
        box = Laya.loader.getRes("LayaScene_box/box.lh");           
        //鼠标点击事件回调
        Laya.stage.on(Laya.Event.MOUSE_DOWN,this,onMouseDown);
    }

    /****覆盖场景渲染后更新方法（相当于场景渲染完成后的帧循环）****/
    SceneScript.prototype._postRenderUpdate = function(state)
    {
        //画参考线、时行碰撞检测
        //根据鼠标屏幕2D座标修改生成射线数据 
        camera.viewportPointToRay(new Laya.Vector2(Laya.stage.mouseX,Laya.stage.mouseY),ray);        
        //射线检测，最近物体碰撞器信息，最大检测距离为300米，默认检测第0层
        Laya.Physics.rayCast(ray,rayCastHit,300);            
        //摄像机位置
        var position = new Laya.Vector3(camera.position.x, 0, camera.position.z);
        //开始绘制矢量3D精灵，类型为线型
        phasorSprite3D.begin(Laya.WebGLContext.LINES, camera);

        //如果与物品相交，画三面边线
        if(rayCastHit.sprite3D){
            //从碰撞信息中获取碰撞处的三角面定点
            var trianglePositions = rayCastHit.trianglePositions;
            //矢量绘制三角面边线
            phasorSprite3D.line(trianglePositions[0], new Laya.Vector4(1,0,0,1),
                                trianglePositions[1], new Laya.Vector4(1,0,0,1));
            phasorSprite3D.line(trianglePositions[1], new Laya.Vector4(1,0,0,1),
                                trianglePositions[2], new Laya.Vector4(1,0,0,1));
            phasorSprite3D.line(trianglePositions[2], new Laya.Vector4(1,0,0,1),
                                trianglePositions[0], new Laya.Vector4(1,0,0,1));
        } 


        //根据射线的原点绘制参考直线（为了观察方便而绘制，但矢量线并不是射线真正的路径）
        phasorSprite3D.line(ray.origin, new Laya.Vector4(1,0,0,1), position , new Laya.Vector4(1,0,0,1));    
        //结束绘制
        phasorSprite3D.end();
    }

    /**
     * 鼠标点击拾取
     */
    function onMouseDown()
    {
        //如果碰撞信息中的模型不为空,删除模型
        if(rayCastHit.sprite3D)
        {
            //克隆一个货物模型 
            var cloneBox=Laya.Sprite3D.instantiate(box).getChildAt(0);

            //添加网格型碰撞器组件
            var meshCollider=meshSprite3D.addComponent(Laya.MeshCollider);
            //为Mesh碰撞器mesh网格（否则没有尺寸，无法被射线检测）
            meshCollider.mesh=meshSprite3D.meshFilter.sharedMesh;                   
            scene.addChild(cloneBox);
            //修改位置到碰撞点处
            cloneBox.transform.position = rayCastHit.position;
            //更新提示信息
            nameArray.push(cloneBox.name);
            LayaAir3D.txt.text = "您在货车上装载了 "+nameArray.length+" 件货物!";
        }
    }
    return SceneScript;
})(Laya.Script);
```


컴파일을 실행할 때, 마우스 클릭을 통해 물체를 만들 수 있는 것을 볼 수 있습니다. 또한 사선과 모형상교할 때 모형상교처의 삼각면을 보여줍니다.

![3](img/3.gif)(图3)</br>