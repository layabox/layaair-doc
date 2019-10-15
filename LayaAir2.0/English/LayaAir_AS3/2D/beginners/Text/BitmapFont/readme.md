#The Making and Use of Bitmap Font



If you have used Starling or Cocos, or even Unity, you will surely not be unfamiliar with the bitmap font. A simple picture, put in a custom text, can make a good text display effect in the project. The LayaAir also supports the use and display of bitmap fonts. Below is the use of bitmap fonts in LayaAir.



 



###Making Bitmap Fonts

1. Write the text to be exported in a TXT text.
​![图片1.png](http://ldc.layabox.com/uploadfile/image/20160518/1463538920512897.png)

2. Select File - > Save as a Unicode encoded TXT file.
​![图片1.png](http://ldc.layabox.com/uploadfile/image/20160518/1463538942170528.png)

3. Download and install Bitmap Font Generator, a free bitmap font making tool under Windows.
Download address:[http://www.angelcode.com/products/bmfont/](http://www.angelcode.com/products/bmfont/install_bmfont_1.13.exe)

4. Open the software, select operation - > fontsetting to set the general settings of the font to be exported, and then click OK to save.

![blob.png](http://ldc.layabox.com/uploadfile/image/20170104/1483527761311236.png)        

**Important parameters:**

Font: The font used for the exported bitmap font.
Size: Set the font size used for the exported bitmap font. It is recommended to set the same size of fonts here when using them.
Height: Set the stretch height of the font and keep it at 100% by default.
​*Note: The value of Charset is Unicode.*

​![图片1.png](http://ldc.layabox.com/uploadfile/image/20160518/1463538956945255.png)

5. In the menu bar Edit - > Select chars from file, select the txt file you just created. If the prompt fails, check whether the txt file is unicode-coded and whether the font contains the font in the text.

​![图片1.png](http://ldc.layabox.com/uploadfile/image/20160518/1463538965101975.png)

6. Set export style, select Options - > Export Options in the menu bar, open Export Options to set export options, and click OK button to save after setting.

Padding: How much space is left in the inner border of a text, or in the periphery of a text. This property is very important when making late style. It needs to reserve space for edge tracing, lighting and other special effects. For example, it is expected to add a 2px border and a 2px projection effect in the lower right corner, so padding: 2px 4PX 4PX 2px is set.
Bit depth: Must be 32 bits, otherwise there is no transparent layer.
Presets: Font initialization default color channel settings, that is, what the initial color settings of the font are, it is recommended to use white characters, can be directly set to white text with alpha, that is, white transparent bottom.
Font descriptor: Font description file, select xml.
Textures: Texture image format, select png.

​![图片1.png](http://ldc.layabox.com/uploadfile/image/20160518/1463538975736762.png)
7. Export bitmap font. Select Options - > Save bitmap font as... in the menu bar, and export a font description file (. fnt format) and a font texture map file (. png format).



 



###Use bitmap fonts in LayaAir projects

1. Put resources in the output directory of the project.
Modify the output bitmap file to the same name (. FNT file and. png file) and place it in the bin directory of the LayaAir project.

​![1.png](http://ldc.layabox.com/uploadfile/image/20160627/1467013751154102.png)

As shown in the figure: change the name of test_0.png to test.png, and ensure that it has the same name as the FNT file. Then put the test. PNG and test. FNT files in the bin directory.


 



**Bitmap fonts are commonly used in LayaAir projects:**

1. Create bitmap font objects.

2. Load bitmap fonts and listen for completion.

3. Register bitmap fonts.

4. Use fonts.

The following is a complete example of the effect of running.

![8.png](img/8.png)

The complete code is as follows:



 




```java

package
{
    import laya.display.Stage;
    import laya.display.Text;
    import laya.resource.Texture;
    import laya.utils.Handler;
    import laya.display.BitmapFont;
    public class TestBitmapFont
    {
        //自定义文件名称
        private var mFontName:String = "diyFont";
        private var mBitmapFont:BitmapFont;
        public function TestBitmapFont()
        {
            Laya.init(550, 400);
            mBitmapFont = new BitmapFont();
            //这里不需要扩展名，外部保证fnt与png文件同名
            mBitmapFont.loadFont("layabmfont.fnt",new Handler(this,onLoaded));
        }
        private function onLoaded():void
        {
            init();
        }
        private function init():void
        { 
            //如果位图字体中，没放空格，最好设置一个空格宽度
            mBitmapFont.setSpaceWidth(10);
            Text.registerBitmapFont(mFontName, mBitmapFont);
            var txt:Text = new Text();
            txt.text = "这是测试";
            //设置宽度，高度自动匹配
            txt.width = 250;
            //自动换行
            txt.wordWrap = true;
            txt.align = "center";
            //使用我们注册的字体
            txt.font = this.mFontName;
            txt.fontSize = 50;
            txt.leading = 5;
            Laya.stage.addChild(txt);
        }
    }
}
```





 



### **Related interfaces in the Text class:**


 **RegisterBitmapFont () method**  

Public static function register BitmapFont (name: String, bitmap Font: BitmapFont): void

Register bitmap fonts.

parameter

Name: String - the name of the bitmap font.
Bitmapfont: bitmapfont - bitmap font file.


 



**UnregisterBitmapFont () method** 

Public static function unregisterBitmapFont (name: String, destory: Boolean = true): void

Remove the registered bitmap font file.

parameter

Name: String - The name of the bitmap font.
Destory: Boolean (default = true) - Whether to destroy the current font file.



  



###Relevant interfaces in the BitmapFont class:


 **LoadFont () method** 

Public function loadFont (path: String, complete: Handler): void

Load the bitmap font file by specifying the path of the bitmap font file.

parameter
Path: String - Path of Bitmap Font File.
Complete: Handler - Callback after loading informs the upper font file that loading and parsing have been completed.


 



**ParseFont () method** 

Public function parseFont (xml: XmlDom, texture: Texture): void

Resolve font files.

parameter

Xml: XmlDom - Font file XML.
Texture: Texture - Texture of fonts.


 

 



**Destory () method**

Public function destory (): void

Destroy the bitmap font and call Text. unregisterBitmapFont by default.


  



**SetSpaceWidth () method**

Public function setSpaceWidth (space Width: Number): void

Set the width of the space (if there are spaces in the font library, you don't need to set them here).

parameter

SpaceWidth: Number - width, in pixels.



 

  



###Use bitmap fonts in LayaAir IDE

1. Place the font file in the resource directory (laya/assets/) of the LayaAir IDE project to ensure that the two file names are identical, such as test.fnt and test.png, so that the bitmap font named test is automatically registered.

![9.png](img/9.png)

2. Set the font property value of the text component to set the bitmap font to the name of the bitmap font imported into the editor.

![10.png](img/10.png)

3. Before instantiating the page with bitmap font in the program code, you need to create and register the bitmap font used in the page.


 