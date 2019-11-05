#사용자 정의

게임이나 응용 개발에서 도형에 대한 처리는 항상 다양하다.

이 글은 LayairIDE 프로젝트에서 사용자 정의 Shader (착색기).

Shader (착색기) 는 두 가지가 있다.한 종류는 극점 착색기, 기하학체의 최고점을 제어하기 위해 3D 표면 격자를 그립니다. 또 한 가지는 원원색 색기이며, 화소의 색을 제어하는 데 사용합니다.이 두 종류의 착색기는 동시에 사용할 수 있다.

###사용자 정의

**1. LayaiairIDE Typescript 빈 항목을 새로 지었다.프로젝트 출력 디렉토리에 그림 자원을 추가합니다.**

**2. 착색기 변수 종류를 편찬합니다.**

src/shaster 디렉토리에 새 파일 my Shadervalue.ts 를 작성하여 색기 프로그램의 변수 종류를 작성합니다.

코드 다음과 같습니다:


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


**3. 색기 입구를 작성합니다.**

src/shader 디렉토리에 새 파일 my Shader.ts, 색기 프로그램을 작성하는 입구 클래스

코드 다음과 같습니다:


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


**4. 프로젝트에서 방금 작성한 색기를 사용한다.**

src 디렉토리 아래에 새 파일 my Shadersprite.ts 상속된 Sprite 종류, 사용자 정의 착색기 사용 코드 쓰기

이 종류에서 init 함수를 정의하여 이 함수에 텍스트 (Texture) 의 상대로 init 함수에서 1조 정상 데이터와 1조의 색인으로 구성된 삼각형 인덱스 데이터가 발생했습니다.

주의: 사용자 정의 착색기를 사용할 때, 이 디스플레이 종류의 렌더링 모드를 설정해야 합니다: this.  u rendertype + 1 = Rendersprite. CUSTOM; 그리고 이러한 과장 처리 함수를 다시 써야 합니다.

코드 다음과 같습니다:


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


**5. 메인 문서에 my Shadersprite 디스플레이 대상 추가**

Main.ts 에서 한 그림을 불러오기 위해 재생 함수 안에 실례화된 my Shadersprite 종류를 추가하고 무대에 올려 올릴 수 있는 그림 텍스트를 my Shadersprite 종류의 init 에 전달합니다.코드 다음과 같습니다:


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


**8. 디버그 실행 항목, 효과 보기.**

페이지 에 삼각형 사진 이 하나 나타났다

Google은 my Shadersprite의 init 방법에서 정점 데이터 vbArray 또는 ibArray 에 삼각형 데이터를 추가하여 최종 디스플레이 효과를 변경할 수 있습니다.

![1](img\1.png)</br>>