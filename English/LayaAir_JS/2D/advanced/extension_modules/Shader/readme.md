# Using custom shader

In the game or application development, the processing of graphics is always various.

This article shows step by step how to use a custom shader in a LayaAirIDE project.

There are two kinds of Shader. One is the vertex shader, which controls the vertices of the geometry to draw 3D surface meshes. The other is the chip shaders, which are used to control the color of pixels. These two kinds of shaders can be used at the same time.

### Using a custom shader

**1. Create a LayaAirIDE JavaScript empty project. And in the project output directory add a picture resource.**

**2. Write a vertex shader program**

In the src / shader directory create a new file myShader.vs,  is used to write the vertex  shader program.

The code is as follows:

```typescript
var myShaderValue = (function(_super){
    function myShaderValue(){
        myShaderValue.super(this,0,0);
        var _vlen = 8*Laya.CONST3D2D.BYTES_PE;
        //设置在shader程序文件里定义的属性相关描述：【属性长度，属性类型，false，属性起始位置索引*CONST3D2D.BYTES_PE】
        this.position = [2,Laya.WebGLContext.FLOAT,false,_vlen,0];
        this.texcoord = [2,Laya.WebGLContext.FLOAT,false,_vlen,2*Laya.CONST3D2D.BYTES_PE];
        this.color = [4,Laya.WebGLContext.FLOAT,false,_vlen,4*Laya.CONST3D2D.BYTES_PE];
    }
    Laya.class(myShaderValue,"myShaderValue",_super);
    return myShaderValue;
})(Laya.Value2D);
```

**3. Write a shader variable class.**

Create a new class file myShader.js in the src / shader directory, used to write the shader program's entry class

code show as below:

```typescript
/**
*自定义着色器
*
*/
var myShader = (function (_super) {
    function myShader() {
        //顶点着色器程序和片元着色器程序。
        var vs = "attribute vec2 position;attribute vec2 texcoord;attribute vec4 color;uniform vec2 size;uniform mat4 mmat;varying vec2 v_texcoord;varying vec4 v_color;void main(){vec4 pos =mmat*vec4(position.x,position.y,0,1);gl_Position = vec4((pos.x/size.x-0.5)*2.0, (0.5-pos.y/size.y)*2.0, pos.z, 1.0);v_color = color;v_texcoord = texcoord;}";
        var ps = "precision mediump float;varying vec2 v_texcoord;varying vec4 v_color;uniform sampler2D texture;void main(){vec4 t_color = texture2D(texture, v_texcoord);gl_FragColor = t_color.rgba * v_color.rgba;}";
        myShader.__super.call(this, vs, ps, "myShader");
        // return _this;
    }
    Laya.class(myShader, "myShader", _super);
    /**
     *当前着色器的一个实例对象
     */
    myShader.shader = new myShader();
    return myShader;
})(Laya.Shader);
```

**4. integrate newly written shader in the project.**

In the SRC directory, a new class file, myShaderSprite.as, is inherited from the Sprite class and is used to write code for the custom shader

In this class, the init function is defined, and a texture object is sent to the function. A set of vertex data and a set of triangular index data composed of these vertices are generated in the init function.

Note: when you use a custom shader, you need to set up the rendering mode for the display object class： this._renderType |= RenderSprite.CUSTOM;并且需要重写此类的渲染处理函数。

The code is as follows:

```typescript
/*
该类需继承自显示对象类
在该类中使用了自定义的着色器程序
注意：使用自定义着色器时，需要设置该显示对象类的渲染模式this._renderType |= Laya.RenderSprite.CUSTOM;并且需要重写该类的渲染处理函数
*/
var myShaderSprite = (function (_super) {
    this.iNum = 0;
    function myShaderSprite() {
        myShaderSprite.super(this);
    }
    Laya.class(myShaderSprite, "myShaderSprite", _super);
    /*
    初始化此类
    texture纹理对象
    vb顶点数组
    ib顶点索引数组
    */
    myShaderSprite.prototype.init = function(texture,vb,ib){
        this.vBuffer = Laya.VertexBuffer2D.create();
        this.iBuffer = Laya.IndexBuffer2D.create();
        this.ibData = new Uint16Array();
        if(vb){
            vbArray = vb;
        }
        else{
            vbArray = [];
            var texWidth = texture.width;
            var texHeight = texture.height;
            //定义颜色值，取值范围0~1浮点
            var red = 1;
            var greed = 1;
            var blue = 1;
            var alpha = 1;
            //在顶点数组中放入4个顶点
            //每个顶点的数据：（坐标x，坐标y，u，v，R,G,B,A）
            vbArray.push(0, 0, 0, 0, red, greed, blue, alpha);
            vbArray.push(texWidth, 0, 1, 0, red, greed, blue, alpha);
            vbArray.push(texWidth, texHeight, 1, 1, red, greed, blue, alpha);
            vbArray.push(0, texHeight, 0, 1, red, greed, blue, alpha);
        }
        if(ib){
            ibArray = ib;
        }
        else{
            ibArray = [];
            //在顶点索引数组中放入组成三角形的顶点索引
            //三角形的顶点索引对应顶点数组vbArray里的点索引，索引从0开始
            ibArray.push(0,1,3);//从第一个三角形的顶点索引
            //ibArray.push(3,1,2);第二个三角形的顶点索引
        }
        this.iNum = ibArray.length;
        this.vbData = new Float32Array(vbArray);
        this.ibData = new Uint16Array(ibArray);
        this.vBuffer.append(this.vbData);
        this.iBuffer.append(this.ibData);
        this.shaderValue = new myShaderValue();
        this.shaderValue.textureHost = texture;
        this._renderType |= Laya.RenderSprite.CUSTOM;//设置当前显示对象的渲染模式为自定义渲染模式
    }
    //重写渲染函数
    myShaderSprite.prototype.customRender = function(context,x,y){
        context.ctx.setIBVB(x, y, (this.iBuffer), (this.vBuffer), this.iNum, null, myShader.shader, this.shaderValue, 0, 0);
    }
    return myShaderSprite;
})(Laya.Sprite);
```

**5. add myShaderSprite display objects to the main document class**

Load a picture in Main.js, instantiate the myShaderSprite class in the completed callback function, and add it to the stage to show that the loaded image texture is passed to the init method of myShaderSprite class. The code is as follows:

```typescript
/*
* 初始化LayaAir 引擎。
* 加载一个图片资源，加载完成后，创建一个使用了自定义着色器的显示对象类实例，将加载好的图片纹理对象传递给这个实例，然后将这个显示对象添加到舞台上进行显示。
*/
//初始化引擎
Laya.init(900, 700, Laya.WebGL);
Laya.stage.bgColor = "#cfcfcf";
//加载一张图片
Laya.loader.load("res/texture.png", Laya.Handler.create(this, loadComplete));
function loadComplete() {
    var texture = Laya.Loader.getRes("res/texture.png");
    var spe = new myShaderSprite();
    spe.init(texture);
    spe.pos(50, 50);
    Laya.stage.addChild(spe);
}
```


**6. debug and run the project to see the effect.**

A triangle picture is displayed on the page

We can modify the vertex data vbArray in the myShaderSprite's init method or add a triangulation data to the ibArray to change the final display effect.

![1](img\1.png)</br>