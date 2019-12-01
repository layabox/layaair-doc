#Utiliser un Shader personnalisé

Le traitement des images est toujours varié dans le jeu ou dans le développement d 'applications.

Ce document décrira en détail comment le Shader personnalisé est utilisé dans le projet layaairide.

Il y a deux sortes de shader.L 'invention concerne également un colorateur de pointe destiné à commander le sommet d' une géométrie afin de créer une grille de surface 3D, et un colorateur de plaques destiné à commander la couleur des pixels.Ces deux colorants peuvent être utilisés simultanément.

###Utiliser un Shader personnalisé

**Création d 'un nouveau projet d' actionscript3.0 à layaairide.Et ajoute une ressource d 'image au Répertoire de sortie du projet.**

**Élaboration d'un programme de chromatographie topographique.**

Crée un nouveau fichier, myshader.vs, sous le catalogue src / Shader, pour l 'élaboration d' un programme de teinture de Sommet.

Code:


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


**Élaboration d'un programme de colorants à puces.**

Crée un nouveau fichier, myshader.ps, sous le catalogue src / Shader, pour l 'élaboration d' un programme de colorateur à puces.

Code:


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


**Élaboration de variables pour les colorateurs.**

Crée une nouvelle catégorie de fichiers, myshadervalue.as, sous le catalogue src / shaser, pour établir une catégorie de variables pour les programmes de colorants.

Code:


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


**Établissement de catégories d'entrée pour les colorants.**

Création d 'une nouvelle catégorie de fichiers sous le catalogue src / Shader, myshader.as, pour l' élaboration d 'une catégorie d' entrée d 'un programme de colorants

Code:


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


**Utilisation de colorants nouvellement élaborés dans le cadre du projet.**

Création d 'un nouveau type de fichier dans le répertoire SRC, myshadersprite.as succédant à la classe Sprite, pour l' élaboration d 'un code d' utilisation d 'un colorateur personnalisé

Dans cette catégorie, la fonction init est définie, un objet Texture (texture) est introduit à cette fonction, et un ensemble de données de sommet et un ensemble de données d 'indexation triangulaire comprenant un index de ces sommets sont générés dans la fonction init.

Remarque: lors de l 'utilisation d' un colorateur personnalisé, il est nécessaire de définir le mode de rendu de cette catégorie d 'objet d' affichage: ceci. & u rendertype \ \ 124 trep = rendersprite.custom; et de réécrire ces fonctions de rendu.

Code:


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


**Ajout d 'objets d' affichage myshadersprite dans la catégorie des documents principaux**

Une image est ajoutée à main.as pour personnaliser la classe myshadersprite à l 'intérieur de la fonction de retour de remplissage et l' ajouter à la scène, ce qui permet de transmettre la texture d 'image chargée à un procédé init de type myshadersprite.Code:


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


**Mise à l'essai des éléments opérationnels pour en vérifier l'efficacité.**

Afficher un triangle sur la page

On peut modifier les données de Sommet vbarray ou ajouter une autre donnée triangulaire à ibarray dans le procédé d 'init de myshadersprite pour modifier l' effet d 'affichage final.

![1](img\1.png)< / BR >