#カスタムシャーダーを使う

ゲームやアプリケーションの開発においては、図形に対する処理は常に多様である。

本論文では、LayaAirIDEプロジェクトでカスタムのShaderを使用する方法を説明する。

Shaderには二つの種類があります。一つは、3 D表面格子を描画するために幾何学体の頂点を制御するための頂点着色器であり、もう一つは、ピクセルの色を制御するためのパッチ・カラーライターである。この二つの着色器は同時に使用できます。

###カスタムシャーダーを使う

**1.LayaAirIDEのType Scriptプロジェクトを新規作成します。プロジェクト出力ディレクトリに画像リソースを追加します。**

**2.カラーバリエーションを作成します。**

Src/sharserディレクトリの下に新しいクラスファイルmyShaderValue.jsを作成して、カラープログラムの変数クラスを作成します。

コードは以下の通りです


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


**3.カラーバリエーションを作成します。**

src/sharderディレクトリの下に新しいクラスのファイルを作成します。

コードは以下の通りです


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


**4.プロジェクトで作成したばかりのカラーライターを使用します。**

Srcディレクトリの下に新しいクラスのファイルmyShader Sprite.jsを作成し、Spriteクラスから引き継ぎ、カスタマイズしたカラーライターの使用コードを作成します。

このクラスでは、init関数を定義し、この関数にテクスチャオブジェクトを入力し、init関数内で頂点データのセットとこれらの頂点の索引からなる三角形のインデックスデータのセットを生成しました。

注意：カスタムカラーライターを使用する場合、この表示対象クラスのレンダリングモードを設定する必要があります。

コードは以下の通りです


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


**5.メイン文書クラスにmyShader Sprite表示オブジェクトを追加する**

Main.tsに1つの画像をロードし、リフレクト関数をロードした内で、myShader Sprite類を実例化し、ステージに追加して表示し、ロードされた画像テクスチャをmyShader Sprite類のinit方法に伝達する。コードは以下の通りです


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


**8.運行項目を調整し、効果を確認する。**

ページに三角形の画像を表示します。

私たちはmyShader Spriteのinit方法で頂点データvbArayを修正したり、ibArayにもう一つの三角データを追加して、最終的な表示効果を変えます。

![1](img\1.png)<br/>