# 组件资源命名规则

在LayaAirIDE中，图片及组件，编辑器会根据资源前缀识别成对应的组件。比如命名为btn_xxx会被识别为按钮，命名为tab_xxx的会被识别为Tab组件。

### 基础组件命名规则：

下面列举编辑器默认的组件资源对应规则（不区分大小写）：

`Label`组件（文本框）：label_xxx；

`TextInput`组件（输入框）：input_xxx或textinput_xxx；

`TextArea`组件（文本域，带滚动条）：area_xxx或textarea_xxx；

`Button`组件（按钮）：btn_xxx或button_xxx；

`CheckBox`组件（多选框）：check_xxx或checkbox_xxx；

`Radio`组件（单选框）：radio或radio_xxx；

`Tab`组件（标签组）：tab_xxx；

`RadioGroup`组件（单选框按钮组）：radiogroup_xxx；

`VSlider`组件（垂直滑动条）：vslider_xxx；

`HSlider`组件（水平滑动条）：hslider_xxx；

`Clip`组件（位图切片）：clip_xxx；

`ProgressBar`组件（进度条）：progress_xxx或progressbar_xxx；

`ComboBox`组件（下拉框）：combo_xxx 或 combobox_xxx；

`VScrollBar`组件（垂直滚动条）：vscroll_xxx 或 vscrollbar_xxx；

`HScrollBar`组件（水平滚动条）：hscroll_xxx 或 hscrollbar_xxx；

`Image`组件（图形组件）：不是以上规则的，都会被识别为Image组件。



下面是示例组件图片：

![1](img\1.png)(图1)

对应在资源管理器中显示为：

![2](img\2.png)(图2)



### 特殊组件：

特殊组件需要多张图片组成，命名规则在遵守上面规则的基础上，增加了$进行区分，主要有三个组件：ScrollBar , ProgressBar , Slider。

特殊组件命名规则如下图所示：

![3](img\3.png)(图3)

![4](img\4.png)(图4)

![5](img\5.png)(图5)



### 容器组件

容器组件（Box、 List、 Tab、RadioGroup、ViewStack、 Panel、HBox、VBox、Tree）默认无需对应资源，可以通过快捷键Ctrl+B进行转换而来。如下图所示：

![6](img\6.png)(图6)

