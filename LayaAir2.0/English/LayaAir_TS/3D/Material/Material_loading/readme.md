#Material loading

###### *version :2.1.0beta   Update:2019-5-14*

In the above example, we created the standard material, but in the actual project application, we seldom use code to give material to the model, but directly create material in the 3D software or unit, and then export the LayaAir format through the tool and use it.

In the "LayaAir3D Resource Loading" section, we introduce that the model includes two parts: model grid and material. When loading. LS and. LH data, the material corresponding to the model will be automatically loaded.

At this time, you can use the. lmat material file generated after export to load and create standard material and assign it to the model in a way similar to model loading.


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


![] (img/1.png)<br> (Figure 1)