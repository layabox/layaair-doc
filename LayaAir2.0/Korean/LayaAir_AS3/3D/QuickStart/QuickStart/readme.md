#빠른 속도로 Layair3D 프로젝트 시작

다음은 Layair 엔진으로 3D 프로젝트를 빠르게 시작하고 AS 언어를 가르치고 엔진 코드로 기본적인 3D 적용을 간단히 시사할 것입니다.

##IDE 생성 3D 예제 항목

LayaiarIDE 다운로드, 새 프로젝트 시작 3d 항목을 그림처럼 설정합니다.

![图](img/1.png)(그림 1)

여기요. 저희가 고르겠습니다.**자바스크립트**언어우리의 ide 가 우리에 3d의 템플릿을 세웠다.프로젝트에 대한 구조소개 개발자는 2D의 초보 과정을 참고할 수 있다.이곳은 군더더기가 없다.

##3D 장면 빠르게 보이기

Google은 직접 F6 (mac 시스템 사용자가 cmd + F6) 또는 실행 버튼을 클릭하면 예시 항목이 실행된 3D 장면을 볼 수 있습니다.

![图](img/2.png)(2)

GameUI.a의 시작된 페이지의 Runtime 종류에 3D의 세계를 구축하고 간단한 3D 세계를 추가하여 필요한 요소 몇 개 (장면, 카메라, 라이트, 모형, 소재) 를 추가했다.다음의 코드 선택은 GameUI.as 입니다.


```typescript

//添加3D场景
var scene:Scene3D = Laya.stage.addChild(new Scene3D()) as Scene3D;

//添加照相机
var camera:Camera = (scene.addChild(new Camera(0, 0.1, 100))) as Camera;
camera.transform.translate(new Vector3(0, 3, 3));
camera.transform.rotate(new Vector3(-30, 0, 0), true, false);

//添加方向光
var directionLight:DirectionLight = scene.addChild(new DirectionLight()) as DirectionLight;
directionLight.color = new Vector3(0.6, 0.6, 0.6);
directionLight.transform.worldMatrix.setForward(new Vector3(1, -1, 0));

//添加自定义模型
var box:MeshSprite3D = scene.addChild(new MeshSprite3D(PrimitiveMesh.createBox(1, 1, 1))) as MeshSprite3D;
box.transform.rotate(new Vector3(0, 45, 0), false, false);
var material:BlinnPhongMaterial = new BlinnPhongMaterial();
Texture2D.load("res/layabox.png", Handler.create(null, function(tex:Texture2D):void {
    material.albedoTexture = tex;
}));
box.meshRenderer.material = material;
```


##### 	