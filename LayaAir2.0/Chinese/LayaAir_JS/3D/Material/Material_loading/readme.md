# 材质的加载

###### *version :2.1.0beta   Update:2019-5-14*

在上面的例子中我们创建了标准材质，但在实际的项目运用中，我们很少用代码的方式给模型赋材质，而是直接在3D软件制作或在unity中创建材质，然后通过工具导出LayaAir格式后使用。

在“LayaAir3D之资源加载”篇中我们介绍了模型包括了模型网格与材质两部分，加载.ls、.lh数据时，会自动加载模型所对应的材质。

这时可以使用导出后产生的.lmat材质文件，加载创建标准材质并赋给模型，方式与模型加载类似。

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

![](img/1.png)<br>(图1)