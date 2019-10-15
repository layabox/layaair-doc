#재질의 가재

###### *version :2.1.0beta   Update:2019-5-14*

위에 있는 예를 들어 표준 소재를 만들었지만 실제 항목 운용에서 모형 부품을 주는 방식으로 직접 3D 소프트웨어를 만들거나 유닛에 재질 창출한 후 리야아 형식을 사용하여 사용하지 않습니다.

"Layaiar3D의 자원 가재"편에서 모형 격격격과 재질 두 부분을 포함해 ls, lh 데이터를 가재할 때 자동으로 모형에 해당하는 소재를 가재합니다.

이때 내보내기 후 생기는 lmat 소재 파일을 사용하여 표준 소재를 가재해 모형에 부여해 모형과 유사하다.


```typescript

//材质加载
Laya.BaseMaterial.load("res/skyBox2/skyBox2.lmat",Laya.Handler.create(this,function(mat) {
		var skyRenderer = camera.skyRenderer;
		//创建天空盒的mesh
		skyRenderer.mesh = Laya.SkyBox.instance;
		//设置天空盒材质
		skyRenderer.material = mat;	
}));
```


[] (img/1.png)<br>(1)