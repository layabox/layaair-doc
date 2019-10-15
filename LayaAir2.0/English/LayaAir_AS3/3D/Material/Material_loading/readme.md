# 材质的加载

###### *version :2.1.0beta   Update:2019-5-14*

In the above example, we created the standard material, but in the actual project application, we seldom use code to give material to the model, but directly create material in the 3D software or unit, and then export the LayaAir format through the tool and use it.

In the "LayaAir3D Resource Loading" section, we introduce that the model includes two parts: model grid and material. When loading. LS and. LH data, the material corresponding to the model will be automatically loaded.

At this time, you can use the. lmat material file generated after export to load and create standard material and assign it to the model in a way similar to model loading.


```typescript

//材质加载
BaseMaterial.load("res/skyBox2/skyBox2.lmat",Handler.create(this,function(mat:BaseMaterial):void {
		var skyRenderer:SkyRenderer = camera.skyRenderer;
		//创建天空盒的mesh
		skyRenderer.mesh = SkyBox.instance;
		//设置天空盒材质
		skyRenderer.material = mat;	
}));
```


! [] (IMG / 1. PNG) < br > (Figure 1)