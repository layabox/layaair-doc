# 使用自定义shader

在游戏或应用开发中，对图形的处理总是多种多样的。

本文将一步步说明如何在LayaAirIDE项目中使用自定义的Shader（着色器）。

Shader（着色器）有两种。一种是顶点着色器，用于控制几何体的顶点以便绘制出3D表面网格；另外一种是片元着色器，用于控制像素的颜色。这两种着色器可以同时使用。

### 使用自定义shader

**1.新建一个LayaAirIDE的TypeScript空项目。并在项目输出目录下添加一个图片资源。**

**2.编写着色器变量类。**

在src/shader目录下新建一个类文件myShaderValue.ts，用于编写着色器程序的变量类。

代码如下：

```typescript
class myShaderValue extends Laya.Value2D {
    public texcoord:any;
    constructor() {
        super(0,0);
        var _vlen:number = 8*Laya.CONST3D2D.BYTES_PE;
        //设置在shader程序文件里定义的属性相关描述：【属性长度，属性类型，false，属性起始位置索引*CONST3D2D.BYTES_PE】
        this.position = [2,Laya.WebGLContext.FLOAT,false,_vlen,0];
        this.texcoord = [2,Laya.WebGLContext.FLOAT,false,_vlen,2*Laya.CONST3D2D.BYTES_PE];
        this.color = [4,Laya.WebGLContext.FLOAT,false,_vlen,4*Laya.CONST3D2D.BYTES_PE];
    }
}
```

**3.编写着色器入口类。**

在src/shader目录下新建一个类文件myShader.ts，用于编写着色器程序的入口类

代码如下：

```typescript
/*
自定义着色器
*/
class myShader extends Laya.Shader {
/**
 *当前着色器的一个实例对象 
 */
public static shader: myShader = new myShader();
    constructor() {
        //顶点着色器程序和片元着色器程序。
        var vs: string = "attribute vec2 position;attribute vec2 texcoord;attribute vec4 color;uniform vec2 size;uniform mat4 mmat;varying vec2 v_texcoord;varying vec4 v_color;void main(){vec4 pos =mmat*vec4(position.x,position.y,0,1);gl_Position = vec4((pos.x/size.x-0.5)*2.0, (0.5-pos.y/size.y)*2.0, pos.z, 1.0);v_color = color;v_texcoord = texcoord;}"
        var ps: string = "precision mediump float;varying vec2 v_texcoord;varying vec4 v_color;uniform sampler2D texture;void main(){vec4 t_color = texture2D(texture, v_texcoord);gl_FragColor = t_color.rgba * v_color.rgba;}";
        super(vs, ps, "myShader");
    }
}
```

**4.在项目中使用刚编写的着色器。**

在src目录下新建一个类文件myShaderSprite.ts继承自Sprite类，用于编写对自定义的着色器的使用代码

在这个类中，定义了init函数，给此函数传入一个纹理（Texture）对象，在init函数内生成了一组顶点数据和一组由这些顶点的索引组成的三角形索引数据。

注意：使用自定义着色器时，需要设置此显示对象类的渲染模式： this._renderType |= RenderSprite.CUSTOM;并且需要重写此类的渲染处理函数。

代码如下：

```typescript
/*
该类需继承自显示对象类
在该类中使用了自定义的着色器程序
注意：使用自定义着色器时，需要设置该显示对象类的渲染模式this._renderType |= Laya.RenderSprite.CUSTOM;并且需要重写该类的渲染处理函数
*/
class myShaderSprite extends Laya.Sprite {
    /** 顶点缓冲区。      */
    private vBuffer: Laya.Buffer;
    /** 片元缓冲区。      */
    private iBuffer: Laya.Buffer;
    private vbData: Float32Array;
    private ibData: Uint16Array;
    private iNum: number = 0;
    /** 着色器变量。      */
    private shaderValue: myShaderValue;
    constructor() {
        super();
    }
    /*
    初始化此类
    texture 纹理对象
    vb 顶点数组
    ib 顶点索引数组
    */
    public init(texture: Laya.Texture, vb: Array<any> = null, ib: Array<any> = null): void {
        this.vBuffer = Laya.VertexBuffer2D.create();
        this.iBuffer = Laya.IndexBuffer2D.create();
        this.ibData = new Uint16Array([]);
        var vbArray: Array<any>;
        var ibArray: Array<any>;
        if (vb) {
            vbArray = vb;
        }
        else {
            vbArray = [];
            var texWidth: number = texture.width;
            var texHeight: number = texture.height;

            //定义颜色值，取值范围0~1浮点
            var red: number = 1;
            var greed: number = 1;
            var blue: number = 1;
            var alpha: number = 1;

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
    public customRender(context:Laya.RenderContext,x:number,y:number):void{
        (context.ctx as Laya.WebGLContext2D).setIBVB(x,y,(this.iBuffer) as Laya.IndexBuffer2D,(this.vBuffer) as Laya.VertexBuffer2D,this.iNum,null,myShader.shader,this.shaderValue,0,0);
    }
}
```

**5.在主文档类添加myShaderSprite显示对象**

在Main.ts中加载一个图片，在加载完成回调函数内实例化myShaderSprite类并添加到舞台上显示，将加载好的图片纹理传递给myShaderSprite类的init方法。代码如下：

```typescript
/*
* 初始化LayaAir 引擎。
* 加载一个图片资源，加载完成后，创建一个使用了自定义着色器的显示对象类实例，将加载好的图片纹理对象传递给这个实例，然后将这个显示对象添加到舞台上进行显示。
*/
class Main {
    constructor() {
        //初始化引擎
        Laya.init(900,700,Laya.WebGL);
        Laya.stage.bgColor = "#cfcfcf";
        //加载一张图片
        Laya.loader.load("res/texture.png",Laya.Handler.create(this,this.loadComplete));
    }
    private loadComplete():void{
        var texture:Laya.Texture = Laya.Loader.getRes("res/texture.png");
        var spe:myShaderSprite = new myShaderSprite();
        spe.init(texture);
        spe.pos(50,50);
        Laya.stage.addChild(spe);
    }
}
new Main();
```

**8.调试运行项目，查看效果。**

在页面里显示了一个三角形图片

我们可以在myShaderSprite的init方法里修改顶点数据vbArray或给ibArray再添加一个三角形数据，来改变最终的显示效果。

![1](img\1.png)</br>