#Camera background color and sky box

###### *version :2.0.1beta   Update:2019-3-19*

####Background color

In 3D scene, background color is controlled by camera, and the background color in 3D space is changed by setting clearColor attribute of camera. The color is assigned and adjusted by three-dimensional vector Vector 3 (red, green, blue), and the engine is set to pure black by default.


```typescript

//相机设置清楚标记,使用固定颜色
camera.clearFlag = BaseCamera.CLEARFLAG_SOLIDCOLOR;	
//设置背景颜色
camera.clearColor = new Vector4(0.5,0.5,0.6,1);
```


####Sky box

In most scenarios, sky visions, such as blue sky and white clouds, dusk and stars, are needed. In LayaAir 3D engine, sky box is created by adding SkyBox to camera attributes.

But if the camera uses orthographic projection, sky box will not achieve the desired effect, developers can try.

Skybox is made up of a cube model and six seamless texture maps, which is somewhat similar to 360 panoramic maps. With the rotation of the viewing angle, we can see that there are prospective effects in all directions.


```typescript

//天空盒代码
BaseMaterial.load("res/threeDimen/skyBox/skyBox1/skyBox.lmat", Handler.create(this, function(mat:BaseMaterial):void {
    //设置相机的清除标识为天空盒
    camera.clearFlag = BaseCamera.CLEARFLAG_SKY;
    //获取相机的天空渲染器
    var skyRenderer:SkyRenderer = camera.skyRenderer;
    //创建天空盒的mesh
    skyRenderer.mesh = SkyBox.instance;
    //设置天空盒材质
    skyRenderer.material = mat;
}));
```


![] (img/1.png)<br> (Fig. 1) Skybox

>**Be careful:**When using background colors and sky boxes, be sure to ensure Camera's`clearFlag`Clear the tag attribute, corresponding to the effect you need.