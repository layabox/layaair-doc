#List 구성 요소 참조



##하나, LayairIDE 로 List 구성 요소 만들기

List 구성 요소는 프로젝트 목록을 표시할 수 있습니다.기본 수직 방향 목록입니다.UI 편집기를 통해 사용자 정의 목록을 찾을 수 있습니다.List 목록의 모든 목록은 일반적으로 같은 것이며 편집기 사용자가 다른 스타일의 목록을 사용자 정의 할 수 있습니다.
List 는 보통 두 부분으로 구성되어 있습니다: 목록 렌더링 항목 (단원격), 스크롤
List 구성 요소의 스크립트 인터페이스 참고해주세요.[List API](http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ui.List).



 



###1.1 List 구성 요소 만들기

####1. 목록 항목 편집.

목록 항목은 Box 대상이나 View (페이지) 또는 다른 사용자 정의 페이지 대상이다.여기에는 박스 대상을 예로 한다.
​**a.**자원 판넬에서 Label 구성 요소를 끌어들이고 편집구의 인터페이스에 Label 속성 name 값을 m u label 설정합니다.또 Label 디스플레이 관련 속성을 설정해 더욱 보기 좋게 한다.
​**b.**Label 대상, 단축키 Ctrl + B 또는 선택**메뉴 표시줄 -> 편집-> 용기로 변환**옵션, 용기 설정 판넬로 전환하고 용기 종류를 박스로 선택하고, 확인 단추를 누르면 박스 용기의 추가를 추가합니다.

​![图片0.png](img/1.png)< br >>
(그림 1)





 ####2. List 용기로 전환한다.

목록 렌더링 대상 선택, 단축키 Ctrl + B 또는 선택**메뉴 표시줄 -> 편집-> 용기로 변환**옵션, 용기 설정 패널 설정으로 전환하고, 용기 형식을 List 형식으로 바꾸고, 확인 단추를 누르면 용기 List 의 추가를 클릭합니다.
​![图片0.png](img/2.png)< br >>
(2)
####3. List 의 목록을 지정합니다.
방법 1: List 대상을 쌍으로 누르고 List 내부에 들어가서 List 목록 렌더를 설정하는 속성 name 값은 render 입니다.**주의: 이 목록 렌더의 속성 name 값은 render 입니다.**

방법 2: List 대상, List 내부에 들어가서 List 목록 렌더를 설정하는 속성 renderType 의 값은 render 입니다.


​![图片0.png](img/3.png)< br >>
(그림 3)

####4. List 에 롤러 구성 요소를 추가합니다.
방법 1: 자원 판넬에서 VScrollbar 구성 요소를 끌어 List 구성 요소로 구성된 내부에 VScrollbar 구성 요소를 설정하고 있는 속성 name 의 값은 scrollbar 입니다.***주의: 활성 줄기의 속성name 값은 scrollbar 입니다.***

방법 2: list 구성 요소 선택, 오른쪽 속성 패널 상용으로 vScroll BarSkin, 자원 패널에서 VScroll Barrr 구성 요소에서 이 skin 속성으로 즉시 스크롤러를 생성할 수 있습니다

​![图片0.png](img/4.png)< br >>
(그림 4)

####5. 레벨 설정 List 의 넓이
속성 repetX 값을 1 으로 설정합니다. repety의 값은 6입니다.List 대상을 설정하는 전역 인용 이름입니다. 속성 var 의 값을 mulist 입니다.
​![图片0.png](img/5.png)< br >>
(그림 5)

####6. 코드에서 List 대상 부과를 준다.



```javascript

 var data:Array =[];

   for(var m:int =0;m<20;m++){

        data.push({m_label:"No."+m});
}
m_list.array = data;
```



####7. 프로그램에서 모니터링을 실행합니다.
​![图片0.gif](gif/1.gif)< br >>
(그림 6)

####8. 코드에 스크립트를 추가하고 롤러를 숨기고 슬라이드를 설치하는 고무줄 효과입니다.

```javascript

 m_list.scrollBar.hide = true;//隐藏列表的滚动条。
 m_list.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
 m_list.scrollBar.elasticDistance = 50;//设置橡皮筋极限距离。
```


####9. 프로그램에서 모니터링을 실행합니다.
​![图片0.gif](gif/2.gif)< br >>
(그림 7)


###1.2 List 구성 속성

​![图片0.png](img/6.png)< br >>
(그림 8)

124대**기능 설명**124대**속성**124대
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
124대 수평 방향으로 나타난 단원격 수량.124대 리페atX
124대 수직 방향으로 표시된 단원격 수량.124대 리페aty
사진 단위.124코스
124대 수직 방향으로 나타난 단원격 사이의 간격 (픽셀 단위) 이다.124코스
124대 수직 방향으로 가물거리는 피부.124대 vScroll Barskin
124대 수준 방향으로 가물거리는 피부.124대, hcrollbarskin



  



###1.3 Tips:

1. List 에 스크롤바를 추가하는 방식은 2가지 방식: List 내부에서 드라이브를 직접 끌어내며 스크롤바를 설치하는 이름으로 scrollbar, 다른 방식은 List 속성 vScrollbarSkin, hcroll BarSkin, hcroll BarSkin의 값으로 스크롤 주소입니다.

2. List 의 리스트 렌더가 보스 대상이자 페이지 대상이다.

​


##2, 코드 로 List 구성 요소 만들기

우리가 작성 코드를 쓸 때, 코드 제어 UI, UI, u List 종류를 만들 수 없습니다`laya.ui.List`가방은 코드 설정을 통해 List 관련 속성을 설정합니다.

**실행 실례 효과:**
​![5](gif/3.gif)< br >>
(그림 9) 코드 로 List 만들기

List 의 다른 속성도 코드 를 통해 설정할 수 있으며, 이 같은 사례 코드 코드 를 통해 다른 피부(스타일)를 만들 수 있는 List, 흥미가 있는 독자들은 코드 설정을 통해 List 를 만들 수 있으며, 자신에 맞는 목록을 만들 수 있다.

**예시 코드:**


```javascript

package
{
	import laya.display.Stage;
	import laya.ui.Box;
	import laya.ui.Image;
	import laya.ui.List;
	import laya.utils.Handler;
	import laya.webgl.WebGL;
	
	public class UI_List
	{
		//列表对应图片的路径
		private var data:Array = [  "../../../../res/ui/listskins/1.jpg",
									"../../../../res/ui/listskins/2.jpg",
									"../../../../res/ui/listskins/3.jpg",
									"../../../../res/ui/listskins/4.jpg",
									"../../../../res/ui/listskins/5.jpg",
									"../../../../res/ui/listskins/1.jpg",
									"../../../../res/ui/listskins/2.jpg",
									"../../../../res/ui/listskins/3.jpg",
									"../../../../res/ui/listskins/4.jpg",
									"../../../../res/ui/listskins/5.jpg",
									"../../../../res/ui/listskins/1.jpg",
									"../../../../res/ui/listskins/2.jpg",
									"../../../../res/ui/listskins/3.jpg",
									"../../../../res/ui/listskins/4.jpg",
									"../../../../res/ui/listskins/5.jpg"];
		
		public function UI_List()
		{
			// 不支持WebGL时自动切换至Canvas
			Laya.init(800, 600, WebGL);
			//画布垂直居中对齐
			Laya.stage.alignV = Stage.ALIGN_MIDDLE;
			//画布水平居中对齐
			Laya.stage.alignH = Stage.ALIGN_CENTER;
			//等比缩放
			Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
			//背景颜色
			Laya.stage.bgColor = "#232628";

			//创建列表
			createList();			
		}
		
		/***创建list列表**/
		private function createList():void
		{
			//实例化列表
			var list:List = new List();
			//设置列表渲染单元格为Item类（注：必须是类，不能是实例化对象，Item需类继承于Box）
			list.itemRender =Item;
			//列表显示区单元格的列数
			list.repeatX = 1;
			//列表显示区单元格的行数
			list.repeatY = 4;
			//设置列表位置
			list.x = (Laya.stage.width - Item.WID) / 2;
			list.y = (Laya.stage.height - Item.HEI * list.repeatY) / 2;
			
			// 使用但隐藏垂直滚动条
			list.vScrollBarSkin = "";
			//滚动在头或底回弹时间
			list.scrollBar.elasticBackTime = 500;
			//滚动在头或底最大距离
			list.scrollBar.elasticDistance = 200;
			
			//设置为可以选择
			list.selectEnable = true;
			//选择单元格时回调方法
			list.selectHandler = new Handler(this, onSelect);
			//渲染单元格时的回调方法
			list.renderHandler = new Handler(this, updateItem);
			//为列表赋值
			list.array = data;
			//加载到舞台
			Laya.stage.addChild(list);
		}
		
		/***渲染单元格时的回调方法***/
		private function updateItem(cell:Item, index:int):void 
		{
			//用获得的数据给图片更换皮肤
			cell.img.skin=cell.dataSource;
		}
		
		/***选择单元格回调***/
		private function onSelect(index:int):void
		{
			trace("当前选择的索引：" + index);
		}
	}
}


//单元格类，继承于Box
import laya.ui.Box;
import laya.ui.Image;

class Item extends Box
{
	/***单元格宽***/
	public static var WID:int = 375;
	/***单元格高***/
	public static var HEI:int = 85;
	/***单元格中图片***/
	public var img:Image;
	
	public function Item()
	{
		//设置大小宽高
		size(WID, HEI);
		//实例化图片
		img = new Image();
		//加载到单元格中
		addChild(img);
	}
}

```


