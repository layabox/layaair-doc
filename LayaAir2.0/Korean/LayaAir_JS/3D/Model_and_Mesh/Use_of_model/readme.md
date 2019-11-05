#모델 기능 소개

###### *version :2.0.2beta   Update:2019-4-26*

3D 모형은 가끔씩 다신 모형 모델로 구성된다. 예를 들면 장면 모형 모형, 기본적으로 여러 개의 물체 모형과 소재로 구성돼 외부는 Sprite3D 용기이며 내부는 진정한 모형 Mesprite3D 혹은 SkinedMisprite 3D.또한 여러 겹으로 새겨질 수도 있다.

####가져오기 대상 모형 격자

게임 논리를 작성할 때, 어떤 모형은 수정되거나, 모형 삭제, 또는 모형 추가 구성 요소나 모형에 있는 애니메이션 구성 요소, 모형 구성 요소 및 개정 모형 재질 등을 교환한다.이것은 모두 가재된 모형에서 얻는 대상을 가져야 한다. 우리는 통과할 수 있다**getChildAt (), getChildByName**방법을 얻기 위해 하위 대상을 얻는 것은 2D 엔진 가져오기 상대 방법과 같다.

다음은 우리가 한 장면의 ls 파일을 첨가한 후에 그것을 가져온 대상.키보드 대상이 되기 전에 ls 파일을 열어 모형의 부자 계급을 확인하는 것을 건의합니다. 모델을 만들 때, 모델이 몇 개의 개체 모델로 구성되었는지, 그것들의 명명 규칙을 확인할 수 없습니다.

**Tips**3ds max 에서 모델 을 지을 때 모델 대상 에 이름 을 지어서 프로젝트 의 자원 이름 을 작성 규칙 을 기본 모델 이름 을 사용하지 않습니다.


```typescript

//初始化3D场景
var scene = Laya.stage.addChild(Laya.Loader.getRes("res/threeDimen/scene/ChangeMaterialDemo/Conventional/scene.ls"));
//获取球型精灵
var sphere = scene.getChildByName("Sphere");
//获取精灵的mesh
var sphereMesh = sphere.meshFilter.sharedMesh;
//此时已经拿到了场景中的球体的网格
```




####수정 대상 모형 격자

채취자 대상 중 한 가지 문제를 주의해야 한다. 바로 모형과 재질의 재질이 적용되지 않아 캐시 대상을 얻을 수 없는 것이므로 자원 가재 또는 비운로드 시 이벤트 감청을 완료해야 한다.이 데모에서 미리 사용했어요.`Laya.loader.create`자원을 미리 가재합니다.

게임에서 우리는 자주 캐릭터 환장 시스템을 만들어서 때로는 모형을 바꾸고 때로는 스티커를 바꾸고 때로는 서로 바꾸기도 한다.소재 스티커 부분은 후속 장절에서 설명하기 때문에 이 장절에는 모형 격자를 바꾸는 방법만 소개합니다.

모형 Mesprite3D나 SkinedMeshsprite3D 중**meshFilter**속성, 그것은 격자 필터 종류, 이 속성 중**sharedMesh**모형의 격자를 재건하고 소각할 수 있다.

아래에 예를 들어 우리는 버튼에 클릭 이벤트를 추가했다.index 값을 클릭할 때마다 index 값에 따라 클릭 ls 에서 얻은 모형 격자를 수정합니다.


```typescript

//新建四个mesh
var box = Laya.PrimitiveMesh.createBox(0.5, 0.5, 0.5);
var capsule = Laya.PrimitiveMesh.createCapsule(0.25, 1, 10, 20);
var cylinder = Laya.PrimitiveMesh.createCylinder(0.25, 1, 20);
var cone = Laya.PrimitiveMesh.createCone(0.25, 0.75);
var index = 0;

//.............按钮点击事件 监听
changeMeshButton.on(Laya.Event.CLICK, this, function(){
    index++;
    if (index % 5 === 1 ){
        //切换mesh
        sphere.meshFilter.sharedMesh = box;
    }
    else if (index % 5 === 2){
        //切换mesh
        sphere.meshFilter.sharedMesh = capsule;
    }
    else if(index % 5 === 3){
        //切换mesh
        sphere.meshFilter.sharedMesh = cylinder;
    }
    else if(index % 5 === 3){
        //切换mesh
        sphere.meshFilter.sharedMesh = cone;
    }
    else{
        //切换mesh
        sphere.meshFilter.sharedMesh = sphereMesh;
    }
});
```


효과 1:

[] (img/1.gif)<br>(1)