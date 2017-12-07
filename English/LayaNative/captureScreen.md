# Screenshots

There are often screenshots in the project development process, such as : Intercept the content on the screen to share or draw two times.

### 1.Screen capture function

Screen capture function is a LayaPlayer specific function, and all needs to be called through the conch object, and the code is as follows:
```javascript
if( windoow.conch )
{
    window.conch.captureScreen(function(arrayBuff,width,height){

    }
}
```
**Function description**：captureScreen need to pass in a callback function, the callback function has three parameters, respectively: picture ImageData, type is arrayBuffer, width and height of the picture.

**Tips**  
*1. Conch can only be called under the LayaPlayer environment, and there is no conch definition in the web version.*  
*2. If you use the as language development, you can get `Browser.window['conch'] ` this way conch object*

### 2. Save image function

When the screen capture callback function is applied, you can save the picture by conch saveAsPng stored locally, the specific function is as follows:

```javascript
conch.saveAsPng( arrayBuff,width,height,conch.getCachePath()+"/test.png" );
//存储后便可以通过 file:///的方式直接进行访问了
var image = window.document.createElement("img");
image.onload=function()
{	
	
}
image.src="file:///" + conch.getCachePath()+"/test.png";
```
**Function description**：saveAsPng needs to import three parameters. The first parameter is the ImageData data of the picture, the second and third parameters are wide and high, and the third parameter is to store the complete path and file name.

**Tips**：  
*The complete path of storage can be completed by developers according to their needs, but the path must be guaranteed. In the code instances, the cache directory of the application is stored directory by `conch.getCachePath()`*


### 3. Generating pictures directly through putImageData
In addition to the screen shots can be saved to the outside of the picture, you can also putImageData way, put the imageData data to the image object, the code is as follows: 
```javascript
var image = window.document.createElement("img");
image.putImageData(arrayBuff,width,height);
```
**Function description**: The putImageData function needs to have three parameters, the binary data, the width and the height of the picture.

**Tips**  
*The putImageData function is a synchronization function, and the putImageData can be used directly after the image, without waiting for the onload function*

### 4. Simple code examples

```javascript
if( window.conch )
{
    window.conch.captureScreen(function(arrayBuff,width,height){
        /*
        //存储文件的方式
        conch.saveAsPng( arrayBuff,width,height,conch.getCachePath()+"/test.png" );
        window.globalImage = window.document.createElement("img");
		window.globalImage.onload=function()
		{
			...使用image对象
		}
		window.globalImage.src = "file:///" + conch.getCachePath()+"/test.png";
        */

        //
        window.image = window.document.createElement("img");
        image.putImageData(arrayBuff,width,height);
        //...使用image对象
    }
}

```
