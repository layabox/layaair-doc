#カスタムシャーダーを使う

ゲームやアプリケーションの開発においては、図形に対する処理は常に多様である。

本論文では、LayaAirIDEプロジェクトでカスタムのShaderを使用する方法を説明する。

Shaderには二つの種類があります。一つは、3 D表面格子を描画するために幾何学体の頂点を制御するための頂点着色器であり、もう一つは、ピクセルの色を制御するためのパッチ・カラーライターである。この二つの着色器は同時に使用できます。

###カスタムシャーダーを使う

**1.LayaAirIDEのアクションScript 3.0空き項目を新規作成します。プロジェクト出力ディレクトリに画像リソースを追加します。**

**2.頂点スポイトプログラムを作成します。**

src/sharderディレクトリの下に、頂点カラーライタープログラムを作成するためのファイルmyShader.vsを新たに作成します。

コードは以下の通りです


```

attribute vec2 position;
attribute vec2 texcoord;
attribute vec4 color;
uniform vec2 size;
uniform mat4 mmat;
varying vec2 v_texcoord;
varying vec4 v_color;
void main(){
  vec4 pos =mmat*vec4(position.x,position.y,0,1);
  gl_Position = vec4((pos.x/size.x-0.5)*2.0, (0.5-pos.y/size.y)*2.0, pos.z, 1.0);
  v_color = color;
  v_texcoord = texcoord;
}
```


**3.パッチ・カラーライターのプログラムを作成します。**

src/sharderディレクトリの下にmyShader.psを新たに作成して、パッチ・カラー・プログラムを作成します。

コードは以下の通りです


```

precision mediump float;
varying vec2 v_texcoord;
varying vec4 v_color;
uniform sampler2D texture;
void main(){
  vec4 t_color = texture2D(texture, v_texcoord);
  gl_FragColor = t_color.rgba * v_color.rgba;
}
```


**4.カラーバリエーションを作成します。**

Src/sharserディレクトリの下に新しいクラスファイルmyShader Value.asを作成して、カラープログラムの変数クラスを作成します。

コードは以下の通りです


```typescript

package shader
{
	import laya.webgl.WebGLContext;
	import laya.webgl.shader.d2.value.Value2D;
	import laya.webgl.utils.CONST3D2D;
	/**
	 *着色器的变量定义 
	 * 
	 */
	public class myShaderValue extends Value2D
	{
		public var texcoord:*;
		public function myShaderValue()
		{
			super(0,0);
			var _vlen:int = 8*CONST3D2D.BYTES_PE;
			//设置在shader程序文件里定义的属性相关描述：【属性长度，属性类型，false，属性起始位置索引*CONST3D2D.BYTES_PE】
			this.position = [2,WebGLContext.FLOAT,false,_vlen,0];
			this.texcoord = [2,WebGLContext.FLOAT,false,_vlen,2*CONST3D2D.BYTES_PE];
			this.color = [4,WebGLContext.FLOAT,false,_vlen,4*CONST3D2D.BYTES_PE];
		}
	}
}
```


**5.カラーバリエーションを作成します。**

src/sharderディレクトリの下に新しいクラスのファイルを作成します。

コードは以下の通りです


```typescript

package shader
{
	
	import laya.webgl.shader.Shader;
	/**
	 *自定义着色器 
	 * 
	 */
	public class myShader extends Shader
	{
		/**
		 *当前着色器的一个实例对象 
		 */		
		public static var shader:myShader = new myShader();
		public function myShader()
		{
			//__INCLUDESTR__ ：包含一个文本文件到程序代码里。识别一个文本，并转换为字符串。
			//通过__INCLUDESTR__ 方法引入顶点着色器程序和片元着色器程序。
			var vs:String = __INCLUDESTR__("myShader.vs");
			var ps:String = __INCLUDESTR__("myShader.ps");
			super(vs,ps,"myShader");
		}
	}
}
```


**6.プロジェクトで作成したばかりのカラーライターを使用します。**

Srcディレクトリの下に新しいクラスのファイルmyShader Sprite.asを作成してSpriteクラスから継承します。カスタマイズしたカラーライターの使用コードを作成します。

このクラスでは、init関数を定義し、この関数にテクスチャオブジェクトを入力し、init関数内で頂点データのセットとこれらの頂点の索引からなる三角形のインデックスデータのセットを生成しました。

注意：カスタムカラーライターを使用する場合、この表示対象クラスのレンダリングモードを設定する必要があります。

コードは以下の通りです


```typescript

package
{
	import laya.display.Sprite;
	import laya.renders.RenderContext;
	import laya.renders.RenderSprite;
	import laya.resource.Texture;
	import laya.webgl.canvas.WebGLContext2D;
	import laya.webgl.utils.Buffer;
	import laya.webgl.utils.IndexBuffer2D;
	import laya.webgl.utils.VertexBuffer2D;
	
	import shader.myShader;
	import shader.myShaderValue;

	/**
	 *该类需继承自显示对象类
	 * 在此类中使用了自定义的着色器程序
	 * 注意：使用自定义着色器时，需要设置此显示对象类的渲染模式：this._renderType |= RenderSprite.CUSTOM;并且需要重写此类的渲染处理函数 
	 * 
	 */
	public class myShaderSprite extends Sprite
	{
		/**
		 *顶点缓冲区 
		 */		
		public var vBuffer:Buffer;
		/**
		 *片元缓冲区 
		 */		
		private var iBuffer:Buffer;
		private var vbData:Float32Array;
		private var ibData:Uint16Array;
		private var iNum:int = 0;
		/**
		 *着色器变量 
		 */		
		private var shaderValue:myShaderValue;
		public function myShaderSprite()
		{
		}
		/**
		 *初始化此类 
		 * @param texture 纹理对象
		 * @param vb顶点数组
		 * @param ib顶点索引数组
		 * 
		 */		
		public function init(texture:Texture,vb:Array = null,ib:Array = null):void{
			vBuffer = VertexBuffer2D.create();
			iBuffer = IndexBuffer2D.create();
			ibData = new Uint16Array();
			
			var vbArray:Array;
			var ibArray:Array;
			if(vb){
				vbArray = vb;
			}
			else{
				vbArray = [];
				var texWidth:Number = texture.width;
				var texHeight:Number = texture.height;
				//定义颜色值，取值范围0~1浮点
				var red:Number = 1;
				var greed:Number = 1;
				var blue:Number = 1;
				var alpha:Number = 1;
				
				//在顶点数组中放入4个顶点
				//每个顶点数据：（坐标x，坐标y，u,v,R,G,B,A）
				vbArray.push(0,0,0,0,red,greed,blue,alpha);
				vbArray.push(texWidth,0,1,0,red,greed,blue,alpha);
				vbArray.push(texWidth,texHeight,1,1,red,greed,blue,alpha);
				vbArray.push(0,texHeight,0,1,red,greed,blue,alpha);
			}
			
			if(ib){
				ibArray = ib;
			}
			else{
				ibArray = [];
				//在顶点索引数组中放入组成三角形的顶点索引
				//三角形的顶点索引对应顶点数组vbArray里的点索引，索引从0开始
				ibArray.push(0,1,3);//第一个三角形的顶点索引。
				//ibArray.push(3,1,2);//第二个三角形的顶点索引
			}
			iNum = ibArray.length;
			vbData = new Float32Array(vbArray);
			ibData = new Uint16Array(ibArray);
			
			vBuffer.append(vbData);
			iBuffer.append(ibData);
			
			shaderValue = new myShaderValue();
			shaderValue.textureHost = texture;
			this._renderType|=RenderSprite.CUSTOM;//设置当前显示对象的渲染模式为自定义渲染模式、
		}
		//重写渲染函数
		override public function customRender(context:RenderContext, x:Number, y:Number):void{
			(context.ctx as WebGLContext2D).setIBVB(x,y,iBuffer,vBuffer,iNum,null,myShader.shader,shaderValue,0,0);
		}
	}
}
```


**7.メイン文書クラスにmyShader Sprite表示オブジェクトを追加する**

Main.asには画像をロードし、リフレクト関数の実装を完了したmyShader Sprite類をステージに追加して表示し、ロードされたピクチャテクスチャをmyShader Sprite類のinit方法に伝える。コードは以下の通りです


```typescript

package
{
	import laya.net.Loader;
	import laya.resource.Texture;
	import laya.utils.Handler;
	import laya.webgl.WebGL;

	/**
	 *初始化LayaAir引擎
	 * 加载一个图片资源，加载完成后，创建一个使用了自定义着色器的显示对象类实例，将加载好的图片纹理对象传递给这个实例，然后将这个显示对象添加到舞台上进行显示 
	 * 
	 */	
	public class Main
	{
		public function Main()
		{
			//初始化引擎
			Laya.init(900,700,WebGL);
			Laya.stage.bgColor = "#cfcfcf";
			//加载一个图片
			Laya.loader.load("res/texture.png",Handler.create(this,loadComplete));
		}
		/**
		 *加载资源完成处理函数 
		 * 
		 */		
		private function loadComplete():void
		{
			var texture:Texture = Loader.getRes("res/texture.png");
			var spe:myShaderSprite = new myShaderSprite();
			spe.init(texture);
			spe.pos(50,50);
			Laya.stage.addChild(spe);
		}
	}
}
```


**8.運行項目を調整し、効果を確認する。**

ページに三角形の画像を表示します。

私たちはmyShader Spriteのinit方法で頂点データvbArayを修正したり、ibArayにもう一つの三角データを追加して、最終的な表示効果を変えます。

![1](img\1.png)<br/>