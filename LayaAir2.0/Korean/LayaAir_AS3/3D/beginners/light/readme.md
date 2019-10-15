##Layaiar3D의 광원

조명은 3D 세계에서 매우 중요합니다. 3차원 물체는 입체빛의 변화, 색조 변화, 투영 등 조명 설정을 사용하면 됩니다.

##불빛 종류

불빛의 종류는 다양하고 다른 광원이 나타나는 효과와 달리 인자를 설정할 수 있다.IDE 가 만든 3D 항목에서 다른 종류의 조명 효과를 수정할 수 있습니다.

###점광 (PointLight)

점광은 사방팔방으로 광선을 발사하는 광원이며, 전향광이나 구형의 빛이라 불리며, 현실의 점광원은 전구, 촛불, 촛불처럼, 약간의 광원이 강도, 색감 반경 속성을 느낄 수 있다.


```java

	//创建点光
	var light:PointLight = scene.addChild(new PointLight()) as PointLight;
	//移动灯光位置
	light.transform.translate(new Vector3(-3,5,0));
	//设置点光照亮范围
	light.range=6;
```

range 는 점광원 범위를 설정하기 위해 빛의 조명 범위에 해당하며 수치가 높을수록 빛의 범위가 넓을수록 그림 1중 빛의 범위 설정이 크지 않아 빛으로 비추지 않은 곳은 검은색, 사진 2중 빛과 모형의 거리를 넘어 모두 비춰져 있다.





  ![图片2](img/2.png)(그림 1)




###평행광 (Direction Light)

평행광과 점광 구별이 비교적 커서, 고정된 방향이 있으며, 호도치를 통해 설정할 수 있으며, 감축과 광선 범위도 없이 전 장면의 모든 모형에 대해 밝힐 수 있다.3D 세계에서 항상 고정 방향을 모의 태양광에 쓰인다.


```java

	//创建平行光
	var light:DirectionLight = scene.addChild(new DirectionLight()) as DirectionLight;
	//设置平行光方向
	light2.transform.worldMatrix.setForward(new Vector3(0, -1.0, 0));
```


setForward 평행광의 방향은 각각 x, y, z 축의 방향을 대표하고, 음수는 족축으로 정축이고, 값은 1-0-1, 1, 1, 1, 1, 1, 초학자들은 이 범위 내에서 관찰 방향의 변화를 볼 수 있다.



###라이트 (SpotLight)

스포트라이트는 특정 광원 방향에서 나오는 광선, 손전등 등.광조 구역은 거리 요인에 따라 점점 확대되고, 동시에 광광조 구역의 가장자리도 감퇴 현상이 있다.

```java

	//添加聚光
	var light:SpotLight=scene.addChild(new SpotLight()) as SpotLight;
	//设置聚光的位置
	light.transform.position=new Vector3(0,5,0)
	//设置聚光的方向
	light3.transform.worldMatrix.setForward(new Vector3(0,-1,0));
	//设置聚光范围
	light.range=5;
	//设置聚光锥形角度
	light3.spotAngle = 50;
```


attenuation 은 빛을 모으기 위해 설정된 가치가 작을수록 휘광권의 희미함이 작아지면서 반대의 빛이 커진다.

direction 은 빛을 모으는 방향으로, 방향의 값 설정 방식과 평행광과 일치한다.

range 는 빛을 비추는 범위로 빛과 유사하고, 빛은 빛을 띤 방향에 불과하고, 빛은 방향이 없다.

![图片3](img/3.png)(2)![图片4](img/4.png)(그림 3)



##광색 요소

장면에서 조명을 사용한 뒤 조명 범위 내의 3D 모형이 영향을 미치고, 레이야아 3D 엔진의 불빛은 아래의 요소를 포함해 광경의 밝기, 색깔 등을 조절하는 데 사용된다.

###환경 색상 (ambientColor)

**Tips: 엔진 1.7.9판 뒤 조명 색상 설정 취소, 오래된 버전 사용 가능.환경 색상은 소재 중 설정이 가능합니다.**

환경색은 장면의 분위기를 간단히 이해할 수 있다.장면의 모형에 대해서는 밝은 면과 어두운면이 동시에 환경색에 영향을 받아 환경색이 밝을수록 모형의 전체적인 밝기가 높아진다.물론 환경색도 색조 처리에 자주 쓰여 환경톤을 통해 홍황색 청록보라 같은 분위기를 완성할 수 있다.

코드 설치 환경색은 아래와 같이 노란색 빛을 내며 모형 전체에 노란색(사진 4)을 덧씌웠다.

앞서 수업에서 3차원 벡터가 색상 값을 설정할 수 있도록 한 번 다시 한 번 고려해 볼륨 중 3개의 원소는 레드, 녹색, 블루 컬러를 대표하며 천변만화된 색채를 조합해 모든 색상의 최고치를 1, 초과하면 노출된다.


```java

//设置灯光的环境色为纯黄色（计算机中，红+绿=黄）
light.ambientColor = new Vector3(1,1,0);
```


![图片5](img/5.png)(그림 4)



###만반사 색상 (difuseColor)

**Tips: 엔진 1.7.9판 이후 color 조명 색상 속성 설정을 추가하여 diffuseColor 역할과 동일한 상태입니다.**

광원색으로 불빛이 모형에 빛나는 밝은 빛과 색채의 영향을 미친다. 예를 들어 모의초 촛불은 광원색에 황색 조정을 할 수 있다. 그러면 모형은 빛을 받으면 노란색 색조가 들어간다.

아래 코드에 광원색 이 순수한 레드 컬러를 설치 하면 모형이 빛을 받게 되는 부분에 붉은 영향을 미칠 수 있기 때문이다. 우리는 그동안 환경광(소재 환경 빛이나 오래된 버전 조명 환경이 빛깔)이 노란색으로 빛깔이 되어 있어, 광면은 레드+옐로=오렌지 컬러의 혼합(도 5)을 받게 되기 때문이다.


```java

//设置灯光的漫反射色为纯红色
//light.diffuseColor = new Vector3(1,0,0);
//设置灯光颜色为纯红色(与diffuseColor作用相同)
light.color = new Vector3(1,0,0);
```


![图片6](img/6.png)(그림 5)

환경빛을 닫는 것은 노란색 환경의 영향이 없기 때문에 모형이 빛을 받으면 광원색으로 변한다.따라서 프로젝트 개발 과정에서 우리는 조명의 다양한 광색 속성의 혼합 영향을 종합적으로 고려해야 한다.

![图片7](img/7.png)(그림 6)



###하이라이트 색상 (specular Color)

**Tips: 엔진 1.7.9판 뒤 조명 색상 설정 취소, 오래된 버전 사용 가능.하이라이터 컬러는 소재에 설치 가능합니다.**

모형으로 광원 방향을 맞추고, 각도가 날카롭고 매끄러운 곳에 하이라이터가 생기고, 높은 빛의 밝기와 색상은 불빛의 하이라이트 컬러를 통해 조정할 수 있으며, 기본 하이라이트 컬러는 순백색이다.

모형을 조절하는 하이라이트는 두 가지 방법으로 조명에 빛을 맞추는 컬러를 사용해 재질에 하이라이트 스티커를 설치하는 경우가 대부분이 재질적으로 높은 빛깔을 조정해 처리해 처리가 편하고 효과적이다.

박스 모형은 하이라이트가 생기지 않기 때문에 우리는 비교적 매끄러운 구형 모형으로 관찰하며 7-1 중 코드에 하이라이트 색상을 설치하지 않았고 엔진은 기본값은 화이트 톤으로 드러났다.그리고 다음 코드에서는 하이라이트 컬러를 파란색, 7-2 중 또렷하게 볼 수 있는 스카이에서 파란색 하이라이터가 생기기 때문입니다.


```java

//修改材质的高光颜色
 material.specularColor = new Vector4(0.5,0.5,1);
```


![图片8-1](img/8-1.png)(7-1)![图片8-2](img/8-2.png)(7-2)



###투영 (shadow)

투영은 조명이 모형을 비출 때 발생하는 즉시 음영으로 조명 각도, 조명 강도, 모형 위치의 변화에 따라 변한다.투영은 3D 세계에서 가장 중요한 요소 중 하나로 더욱 강렬한 입체감을 일으킬 수 있다.

만약 음영은 성능을 너무 많이 소모할 수 없습니다. 특히 게임 장면은 모형이 비교적 커서, 일반적으로 우리는 즉시 투영을 사용하지 않고, 정적인 빛을 사용하여 사진을 사용합니다.

장면에서 투영을 하게 하려면, 우리는 불빛의 이하 속성을 알아야 한다.

**shadow:**투영을 시작할지 여부를 true 로 설정한 후 효과를 발생합니다.

**shadowDistance:**투영 범위는 카메라가 모형으로 가는 거리를 가리킨다.이 범위 모델이 투영과 투영을 받지 않을 것이며 개발자는 장면 크기에 따라 설정할 수 있다.

**shadowpsSMCount:**음영 스티커가 생기는 수량은 높을수록 음영이 섬세할수록 성능이 손실된다.

**shadowResolution:**투영의 품질, 투영 범위의 그림자 크기.수치 설정을 통해 품질이 높을수록 투영 품질이 높을수록 성능 손실도 따라서 높아진다.투영의 질량은 2의 N 차 단위 설정으로 기본 512로 1024, 2048.....

**shadowPCFType:**음영이 흐릿한 등급 0-3, 흐릿한 수치는 커질수록 부드럽고 효과는 좋지만 성능이 더 소모된다.



불빛만 설치하는 속성이 부족합니다. 모델에 투영속성을 수정하고 각각:

**receiveShadow:**투영을 받아들일지 여부는 이 속성이 true (true) 로 계산된 투영은 이 모형에 표시됩니다.게임에서 우리는 장면의 바닥과 장면에서 이동할 수 있는 모형 castShadow 속성을 true 로 설정할 수 있다.

**castShadow:**투영 여부, 이 속성은 true, 조명은 그림자가 생기는 모형 위치, 모형 격자 모양 크기, 조명 각도 등 투영 계산을 진행하고 음영을 받아들이는 모형상 에 투영된다.예를 들어 장면 속 캐릭터, NPC 등 이벤트 요소는 이 속성을 열어 줄 수 있다.

투영을 잘 이해할 수 있도록 다음 디스플레이 코드에서 평행광을 사용하고 박스 박스 박스 모형 및 구체 sphere 모형에 게재되며, 구체는 그림자가 생기고 상자에 투영된다.


```java

package {
	
	import laya.d3.core.BaseCamera;
	import laya.d3.core.Camera;
	import laya.d3.core.MeshSprite3D;
	import laya.d3.core.Sprite3D;
	import laya.d3.core.light.DirectionLight;
	import laya.d3.core.material.StandardMaterial;
	import laya.d3.core.scene.Scene;
	import laya.d3.math.Vector3;
	import laya.d3.math.Vector4;
	import laya.d3.resource.Texture2D;
	import laya.d3.resource.models.BoxMesh;
	import laya.d3.resource.models.SphereMesh;
	import laya.display.Stage;
	import laya.utils.Stat;

	public class LayaAir3D 
    {
		public function LayaAir3D()
        {
			//初始化引擎
			Laya3D.init(1000, 500,true);
			
			//适配模式
			Laya.stage.scaleMode = Stage.SCALE_FULL;
			Laya.stage.screenMode = Stage.SCREEN_NONE;

			//开启统计信息
			Stat.show();
			
			//添加3D场景
			var scene:Scene3D = Laya.stage.addChild(new Scene3D()) as Scene3D;
			 
			//创建摄像机(横纵比，近距裁剪，远距裁剪)
			var camera:Camera = new Camera( 0, 0.1, 100);
			//加载到场景
			scene.addChild(camera);
			//移动摄像机位置
			camera.transform.translate(new Vector3(0, 4, 8));
			//旋转摄像机角度
			camera.transform.rotate(new Vector3( -30, 0, 0), true, false);
			
			//创建方向光
		    var light:DirectionLight = scene.addChild(new DirectionLight()) as DirectionLight;
		    //移动灯光位置
		    light.transform.translate(new Vector3(0,5,0));
			//设置灯光方向
		    light.transform.worldMatrix.setForward(new Vector3(0.3,-1, 0));
			//设置灯光漫反射颜色
			light.diffuseColor = new Vector3(1, 0, 0);
          
          	//设置灯光环境色
//		    scene.ambientColor = new Vector3(1, 1, 0); 
		 
		    //添加灯光投影
		    light.shadow=true;
			//产生投影的范围（如过小将不会产生投影）
		    light.shadowDistance=45;
          	//生成阴影贴图数量
			light.shadowPSSMCount = 1;
			//模糊等级,越大越高,效果更好，更耗性能
          	light.shadowPCFType=1;
			//投影质量
		    light.shadowResolution=2048;

			 
			//创建盒子模型
			var box:MeshSprite3D = scene.addChild(new MeshSprite3D(new BoxMesh(1.5,1.5,1.5))) as MeshSprite3D;
			//自身y座标旋转
			box.transform.rotate(new Vector3(0,45,0),true,false);
			//接收阴影
			box.meshRenderer.receiveShadow=true;
			
			//创建球体模型
			var sphere:MeshSprite3D = scene.addChild(new MeshSprite3D(new SphereMesh())) as MeshSprite3D;
			//按父空间移动球体
			sphere.transform.translate(new Vector3(0,1.5,0),false);
			//产生阴影
			sphere.meshRenderer.castShadow=true;
			//创建材质
			var material:PBRSpecularMaterial = new PBRSpecularMaterial();
			//材质加载漫反射贴图
		Texture2D.load("h5/res/layabox.png",Handler.create(this,function(text:Texture2D):void{
          material.albedoTexture = text;
          //为模型赋材质（单个材质可赋给多个模型）
          sphere.meshRenderer.material = material;
          box.meshRenderer.material = material;
       	 }));
		}		
	}
}
```




![图片9](img/9.png)(그림 8)![图片10](img/10.png)(그림 9)

이 두 그림은 투영을 시작하기 전에 투영을 시작하는 후 효과: 조명과 모형에 모두 소개된 관련 속성을 설정해야 하며 제멋대로 에피소드가 없어도 그림자가 생기지 않는다.

