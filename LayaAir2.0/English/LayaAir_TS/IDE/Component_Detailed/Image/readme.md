#Image component reference



##I. Creating Image Components through LayaAirIDE

###1.1 Create image

Image is the most common component for displaying images in UI, which is used to display bitmap images. The skin property of the Image component can be set to change the image rendered by the Image component. The image component supports the setting of nine-grid data, which is used to achieve the effect of undistorted image display after image enlargement.

Click on the Image component in the resource panel and drag it into the page editing area to add the Image component to the page. By clicking on Image, you can set the values of common properties of Image in the Properties Panel.
Refer to the script interface of the Image component[Image API](http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ui.Image)。

​**Examples of resources for an Image component:**

​![图片0.png](img/1.png)<br/>
(Fig. 1)

​**Drag and drop the Image component into the edit area to display the effect:**

​![图片0.png](img/2.png)<br/>
(Figure 2)

###1.2 Common attributes of Image components

​![图片0.png](img/3.png)<br/>
(Figure 3)

A kind of**attribute**A kind of**Function description**A kind of
| -----------------------------------------------------------------------------------------------------------------------------------------|
| SizeGrid | Bitmap effectively scales grid data (nine-grid data). A kind of
| Skin | bitmap resources. A kind of

After adding the Image component, you can modify the display resource image of the Image component by dragging and dropping the image resource from the resource panel to the skin property box of the Image.

##II. Creating Image Components through Code

When we write code, we inevitably control the UI through code and create it.`UI_Image`Class, which sets image-related properties through code.

**Run the example effect:**
​![5](img/4.png)<br/>
(Figure 5) Create an Image through Code

Other properties of Image can also be set by code. The following sample code demonstrates how to create different skin (style) images through code.

Interested readers can set up their own images through code, creating pictures that meet their needs.

**Sample code:**


```javascript

module laya {
	import Stage = Laya.Stage;
	import Image = Laya.Image;
	import WebGL = Laya.WebGL;

	export class UI_Image {
		constructor() {
			// 不支持WebGL时自动切换至Canvas
			Laya.init(550, 400, WebGL);

			Laya.stage.alignV = Stage.ALIGN_MIDDLE;
			Laya.stage.alignH = Stage.ALIGN_CENTER;

			Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
			Laya.stage.bgColor = "#232628";

			this.setup();
		}

		private setup(): void {
			var dialog: Image = new Image("res/ui/dialog (3).png");
			dialog.pos(165, 62.5);
			Laya.stage.addChild(dialog);
		}
	}
}
new laya.UI_Image();
```


