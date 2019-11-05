#Camera Background and Sky Box

###### *version :2.0.1beta   Update:2019-3-19*

####Background color

In the 3D scene, we use the camera to control the background color. We change the background color of the 3D space by setting the camera clearcolor attribute. The color is assigned and adjusted by using the three-dimensional vector vector3 (red, green, blue). The engine is set to pure black by default.


```typescript

//相机设置清楚标记,使用固定颜色
camera.clearFlag = Laya.BaseCamera.CLEARFLAG_SOLIDCOLOR;	
//设置背景颜色
camera.clearColor = new Laya.Vector4(0.5,0.5,0.6,1);
```


####Sky box

In most scenarios, sky visions, such as blue sky and white clouds, dusk and stars, are needed. In LayaAir 3D engine, sky box is created by adding SkyBox to camera attributes.

However, if the camera uses orthogonal projection, skybox will not achieve the desired effect, developers can try.

Skybox is made up of a cube model and six seamless texture maps, which is somewhat similar to 360 panoramic maps. With the rotation of the viewing angle, we can see that there are prospective effects in all directions.


```typescript

//天空盒代码
Laya.BaseMaterial.load("res/threeDimen/skyBox/skyBox1/skyBox.lmat", Laya.Handler.create(this, function(mat) {
    //设置相机的清除标识为天空盒
    camera.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;
    //获取相机的天空渲染器
    var skyRenderer = camera.skyRenderer;
    //创建天空盒的mesh
    skyRenderer.mesh = Laya.SkyBox.instance;
    //设置天空盒材质
    skyRenderer.material = mat;
}));
```


![] (img/1.png)<br> (Fig. 1) Skybox

>**Be careful:**When using background colors and sky boxes, be sure to ensure Camera's`clearFlag`Clear the tag attributes, and correspond to the effect you need.